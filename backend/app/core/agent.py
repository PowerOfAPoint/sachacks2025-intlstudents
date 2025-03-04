import os
from typing import List

from langchain_core.documents import Document
from langchain_core.messages import SystemMessage
from langchain_openai import ChatOpenAI
from langgraph.checkpoint.memory import MemorySaver
from langgraph.graph import MessagesState, StateGraph, END
from langgraph.prebuilt import ToolNode, tools_condition

from .tools import search_and_retrieve_from_web


class MessagesStateWithContext(MessagesState):
    context: List[Document]


def tool_or_respond(state: MessagesStateWithContext):
    """
    Generate tool calls to search and retrieve from webpages, or respond to the prompt.
    """
    llm_with_tools = llm.bind_tools([search_and_retrieve_from_web])
    response = llm_with_tools.invoke(state['messages'])
    return {'messages': [response], 'context': []}


tools = ToolNode([search_and_retrieve_from_web])


def generate(state: MessagesStateWithContext):
    """
    Generate an answer given retrieved content and prior message history.
    """
    # Get tool messages from previous node
    recent_tool_messages = []
    for message in reversed(state['messages']):
        if message.type == 'tool':
            recent_tool_messages.append(message)
        else:
            break
    tool_messages = recent_tool_messages[::-1]

    # Create message history + new system prompt specifically for RAG
    docs_content = '\n\n'.join([doc.content for doc in tool_messages])
    system_prompt = SystemMessage(f'''
    You are an assistant for question-answering tasks. 
    Use the following pieces of retrieved context to answer the question(s) as thoroughly and accurately as possible. 
    If you don't know the answer, just say that you don't know.
    Use a friendly, approachable tone when answering questions, as if you were a college guidance counselor.

    Context: {docs_content}
    ''')  # Prompt adapted from rlm/rag-prompt

    conversation_messages = [
        message for message in state['messages'] if
        message.type in ('human', 'system')
        or
        (message.type == 'ai' and not message.tool_calls)
    ]

    all_messages = [system_prompt] + conversation_messages

    # Get response and source documents
    response = llm.invoke(all_messages)
    context = []
    for tool_message in tool_messages:
        context += [tool_message.artifact]

    return {'messages': [response], 'context': context}


def init_agent():
    global llm
    openai_api_key = os.getenv("OPENAI_API_KEY")

    if not openai_api_key:
        raise ValueError("OpenAI API key not found in environment variables")

    llm = ChatOpenAI(temperature=0.1, api_key=openai_api_key)

    graph_builder = StateGraph(MessagesStateWithContext)

    graph_builder.add_node(tool_or_respond)
    graph_builder.add_node(tools)
    graph_builder.add_node(generate)

    graph_builder.set_entry_point('tool_or_respond')
    graph_builder.add_conditional_edges(
        'tool_or_respond',
        tools_condition,
        {END: END, 'tools': 'tools'},
    )
    graph_builder.add_edge('tools', 'generate')
    graph_builder.add_edge('generate', END)

    memory = MemorySaver()
    graph = graph_builder.compile(checkpointer=memory)

    return graph
