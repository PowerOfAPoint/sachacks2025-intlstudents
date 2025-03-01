import os
from typing import List
from dotenv import load_dotenv

import uvicorn
from fastapi import FastAPI, HTTPException, Depends, BackgroundTasks
from langchain.tools import DuckDuckGoSearchRun
from fastapi.middleware.cors import CORSMiddleware
from langchain_chroma import Chroma
from langchain_community.document_loaders import WebBaseLoader
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_text_splitters import RecursiveCharacterTextSplitter
from pydantic import BaseModel, Field

app = FastAPI(title="SacHacks 2025: LLM chatbot for international students")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # TODO: Replace with frontend url
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Pydantic models
class QueryRequest(BaseModel):
    question: str = Field(..., description="User question")


class QueryResponse(BaseModel):
    answer: str = Field(..., description="Agent's response")
    sources: List[str] = Field(default_factory=list)


# Dependencies
def get_openai_api_key():
    load_dotenv()
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        raise ValueError("OPENAI_API_KEY not found in environment variables")
    return api_key


def get_vectorstore(
        web_paths: list[str],
        openai_model: str = 'o3-mini',
        openai_api_key=Depends(get_openai_api_key)
):
    embeddings = OpenAIEmbeddings(api_key=openai_api_key)
    vector_store = Chroma(embedding_function=embeddings)
    llm = ChatOpenAI(model=openai_model, temperature=0, api_key=openai_api_key)

    loader = WebBaseLoader(
        web_paths=web_paths,
    )
    docs = loader.load()
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
    all_splits = text_splitter.split_documents(docs)
    vector_store.add_documents(documents=all_splits)

    return vector_store


def get_agent(vector_store=Depends(get_vectorstore), api_key=Depends(get_openai_api_key)):
    llm = ChatOpenAI(temperature=0, api_key=api_key)

    return agent


# Endpoints
@app.get("/")
async def root():
    return {"status": "online", "message": "API is running"}


@app.post("/query", response_model=QueryResponse)
async def process_query(
    request: QueryRequest,
    qa_chain=Depends(get_agent)
):
    try:
        # Process the query through the RAG chain
        result = qa_chain.run(request.question)

        # In a real implementation, you'd extract sources from the chain
        return QueryResponse(
            answer=result,
            sources=["knowledge-base"]  # Placeholder
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/query/async")
async def process_query_async(
    request: QueryRequest,
    background_tasks: BackgroundTasks,
    qa_chain=Depends(get_agent)
):
    query_id = f"query_{id(request)}"
    background_tasks.add_task(process_async_query, query_id, request.question, qa_chain)
    return {"query_id": query_id, "status": "processing"}


# Helper functions
async def process_async_query(query_id: str, question: str, qa_chain):
    # In a real app, you'd store the result in a database or cache
    result = qa_chain.run(question)
    print(f"Completed {query_id}: {result[:100]}...")


# Run the app
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)