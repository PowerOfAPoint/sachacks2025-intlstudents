from typing import Tuple, Any

import chromadb.api.client
from langchain_chroma import Chroma
from langchain_community.document_loaders import WebBaseLoader
from langchain_community.tools import DuckDuckGoSearchResults
from langchain_core.tools import tool
from langchain_openai import OpenAIEmbeddings
from langchain_text_splitters import RecursiveCharacterTextSplitter


@tool(response_format='content_and_artifact')
def search_urls(query: str, news_backend: bool = False) -> Tuple[str, Any]:
    """
    Retrieve URLs of relevant websites for the given search query, using DuckDuckGo.
    Set news_backend variable to True to retrieve URLs from news sites, in cases where the absolute most current information is required.
    Otherwise, set news_backend to False to retrieve only site URLs from .edu and .gov websites, for the most official information.
    """
    search = DuckDuckGoSearchResults(output_format='list', num_results=5, keys_to_include=['link'])
    results = search.invoke(query, backend='news') if news_backend else search.invoke(f'{query} site:(.gov | .edu)')
    results_serialized = '\n'.join([f'URL: {result['link']}' for result in results])

    return results_serialized, results


@tool(response_format='content_and_artifact')
def retrieve_from_urls(query: str, web_paths: list[str]):
    """
    Retrieve content from a provided list of URLs that are related to a query.
    """
    chromadb.api.client.SharedSystemClient.clear_system_cache()
    vector_store = Chroma(embedding_function=OpenAIEmbeddings())

    loader = WebBaseLoader(
        web_paths=web_paths,
    )
    docs = loader.load()
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
    all_splits = text_splitter.split_documents(docs)
    vector_store.add_documents(documents=all_splits)

    retrieved_docs = vector_store.similarity_search(query, k=5)
    serialized = '\n'.join([f'Source: {doc.metadata}\tContent: {doc.page_content}' for doc in retrieved_docs])

    return serialized, retrieved_docs


@tool(response_format='content_and_artifact')
def search_and_retrieve_from_web(query: str, news_backend: bool = False) -> Tuple[str, Any]:
    """
    Retrieve most relevant content from websites given a query, using DuckDuckGo.
    Set news_backend variable to True to retrieve URLs from news sites, in cases where the absolute most current information is required.
    Otherwise, set news_backend to False to retrieve only site URLs from .edu and .gov websites, for the most official information.
    """
    search = DuckDuckGoSearchResults(output_format='list', num_results=5, keys_to_include=['link'])
    results = search.invoke(query, backend='news') if news_backend else search.invoke(f'{query} site:(.gov | .edu)')

    chromadb.api.client.SharedSystemClient.clear_system_cache()
    vector_store = Chroma(embedding_function=OpenAIEmbeddings())

    loader = WebBaseLoader(
        web_paths=[result['link'] for result in results],
    )
    docs = loader.load()
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
    all_splits = text_splitter.split_documents(docs)
    vector_store.add_documents(documents=all_splits)

    retrieved_docs = vector_store.similarity_search(query, k=5)
    serialized = '\n'.join([f'Source: {doc.metadata}\tContent: {doc.page_content}' for doc in retrieved_docs])

    return serialized, retrieved_docs
