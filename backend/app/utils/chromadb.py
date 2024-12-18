from langchain.vectorstores import Chroma
from langchain.embeddings import SentenceTransformerEmbeddings

persist_directory = "./chroma_db"
embeddings = SentenceTransformerEmbeddings(model_name="all-MiniLM-L6-v2")
vectordb = Chroma(persist_directory=persist_directory, embedding_function=embeddings)

def process_questions(qa_dict, vectordb):
    matching_docs = []
    for question, answer in qa_dict.items():
        results = vectordb.similarity_search(answer,k=3)
        matching_docs.append(results[0].page_content if results else "No relevant document found.")
    return matching_docs