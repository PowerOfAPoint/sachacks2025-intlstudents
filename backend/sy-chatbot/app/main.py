from typing import List

import uvicorn
from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

app = FastAPI(title="SacHacks 2025: LLM chatbot for international students")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Pydantic models
class Request(BaseModel):
    query: str = Field(..., description="User question")


class Response(BaseModel):
    response: str = Field(..., description="API response")
    sources: List[str] = Field(default_factory=list)


def get_agent():
    class Test:
        def __init__(self):
            pass

        def run(self):
            print('Test')

    return Test()


# Endpoints
@app.get("/")
async def root():
    return {"status": "online", "message": "API is online"}


@app.post("/query", response_model=Response)
async def process_query(
    request: Request,
    agent=Depends(get_agent)
):
    try:
        # Process the query through the RAG chain
        result = agent.run(request.query)

        # In a real implementation, you'd extract sources from the chain
        return Response(
            response=result,
            sources=["knowledge-base"]  # Placeholder
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# Run the app
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)