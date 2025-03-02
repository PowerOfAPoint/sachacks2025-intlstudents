from typing import List, Any

import uvicorn
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from langchain_core.messages import SystemMessage, HumanMessage
from pydantic import BaseModel, Field

from backend.app.core import agent

load_dotenv(override=True)
app = FastAPI(title="Flock LLM chatbot", description="For SacHacks 2025. API for Flock's LLM chatbot.")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
chat_agent = agent.init_agent()


class Request(BaseModel):
    query: str = Field(..., description="User question")
    thread_id: str = Field(..., description="Thread ID for stateful memory")


class Response(BaseModel):
    response: str = Field(..., description="API response")
    sources: List[Any] = Field(default_factory=list)


# Endpoints
@app.get("/chat_api")
async def root():
    return {"status": "online", "message": "API is online"}


@app.post("/chat_api/query", response_model=Response)
async def process_query(
        request: Request
):
    try:
        messages = [
            SystemMessage('''
            You are a helpful tool-calling agent who specializes in assisting international college students living in the United States.
            Please use the provided search and retrieval tools to answer the prompt as accurately as possible.
            Append keywords such as "for international students" to the search query to get results tailored to international students studying abroad.
            Unless specified in the prompt, assume that the user needs official information rather than the most current information.
            '''),
            HumanMessage(request.query)
        ]
        config = {'configurable': {'thread_id': request.thread_id}}
        for step in chat_agent.stream(
                {'messages': messages}, config, stream_mode='values'
        ):
            pass

        return Response(
            response=step['messages'][-1].content,
            sources=[doc for docs in [docs for docs in step['context'] if docs is not None] for doc in docs] if len(
                step['context']) > 0 else []
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# Run the core
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
