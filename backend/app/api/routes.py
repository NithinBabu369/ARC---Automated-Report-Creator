from fastapi import APIRouter,HTTPException
from pydantic import BaseModel
from fastapi.responses import FileResponse
from app.utils.chromadb import vectordb, process_questions
from app.utils.report_generator import response_generator
from app.utils.report_generator import response_generator, generate_pdf, generate_docx
from app.utils.model_client import refine_report
from fastapi import APIRouter, HTTPException, File
from fastapi.responses import FileResponse

router = APIRouter()

# Data models
class QuestionData(BaseModel):
    qa_dict: dict

class FeedbackData(BaseModel):
    current_report: str
    feedback: str
    questions: list
    responses: list

@router.post("/generate_report/")
def generate_report(data: QuestionData):
    print("Received request to generate report")
    print("Received data:", data.qa_dict)
    
    try:
        matching_docs = process_questions(data.qa_dict, vectordb)
        questions, responses = list(data.qa_dict.keys()), list(data.qa_dict.values())
        report = response_generator(questions, responses, matching_docs)
        print("Report generated successfully")
        return {"report": report}
    except Exception as e:
        print(f"Error in generate_report: {e}")
        return {"error": str(e)}, 500  # Explicitly return a 500 status code

@router.post("/refine_report/")
async def refine_report_endpoint(data: FeedbackData):
    try:
        refined_report = refine_report(
            data.current_report, 
            data.feedback, 
            data.responses, 
            data.questions,
            vectordb
        )
        return {"refined_report": refined_report}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))



@router.post("/download_report/")
async def download_report(data: dict):
    try:
        report_content = data.get('report', '')
        file_format = data.get('format', 'pdf')
        
        if file_format == 'pdf':
            file_path = generate_pdf(report_content)
            return FileResponse(file_path, filename="report.pdf", media_type="application/pdf")
        elif file_format == 'docx':
            file_path = generate_docx(report_content)
            return FileResponse(file_path, filename="report.docx", media_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document")
        else:
            raise HTTPException(status_code=400, detail="Invalid file format")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))