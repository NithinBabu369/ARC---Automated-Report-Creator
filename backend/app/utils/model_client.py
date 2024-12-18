import os
from groq import Groq
from dotenv import load_dotenv

load_dotenv()


# Initialize Groq client

client = Groq(api_key=os.environ.get("GROQ_API_KEY"))

def refine_report(current_report, feedback, responses, questions, vectordb):
    """
    Refine the report based on user feedback.
    """
    # Convert lists to dictionary
    qa_dict = dict(zip(questions, responses))
    matching_docs = []
    for question, answer in qa_dict.items():
        results = vectordb.similarity_search(answer)
        matching_docs.append(results[0].page_content if results else "No relevant document found.")

    qa_with_docs = []
    for question, answer, doc in zip(questions, responses, matching_docs):
        qa_with_docs.append(f"Q: {question}\nA: {answer}\nSupporting Document: {doc}")

    qa_content_with_docs = "\n\n".join(qa_with_docs)

    chat_completion = client.chat.completions.create(
        messages=[{
            "role": "user",
            "content": f"""Refine the following business report with these specific improvement instructions:
            Current Report: {current_report}
            
            User Feedback: {feedback}
            
            Additional Context:
            {qa_content_with_docs}
            
            Modify the report to address the feedback while maintaining the original structure and key insights."""
        }],
        model="llama-3.3-70b-versatile",
    )

    return chat_completion.choices[0].message.content
