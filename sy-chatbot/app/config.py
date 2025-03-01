from pydantic_settings import BaseSettings
import os


class Settings(BaseSettings):
    # API settings
    app_name: str = "Chatbot agent API"
    debug: bool = True

    # OpenAI settings
    openai_api_key: str
    openai_model: str = "gpt-3.5-turbo"

    # Vector database settings
    vector_db_path: str = "./data/vectorstore"

    # Cors settings
    cors_origins: list = ["http://localhost:8000"]

    class Config:
        env_file = ".env"


settings = Settings()