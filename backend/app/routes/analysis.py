from fastapi import APIRouter
from datetime import datetime

from app.schemas.analysis import *

router = APIRouter(
    prefix="/analyses",
    tags=["Analyses"]
)


@router.post("/", response_model=AnalysisResponse)
def create_analysis(data: AnalysiCreate):
    return {
        "id": 1,
        "name": data.name,
        "description": data.description,
        "created_at": datetime.now(),
    }
    
@router.get("/")
def get_analyses():
    return {
        "message": "List of analyses"
    }
    
@router.get("/{analysis_id}")
def get_analysis(analysis_id: int):
    return {
        "id": analysis_id,
        "message": "Analysis details"
    }

