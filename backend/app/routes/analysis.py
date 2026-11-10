from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.services.analysis import AnalysisService
from app.schemas.analysis import AnalysisCreate, AnalysisResponse

router = APIRouter(
    prefix="/analyses",
    tags=["Analyses"]
)

@router.post("/", response_model=AnalysisResponse)
def create_analysis_endpoint(
    data: AnalysisCreate,
    db: Session = Depends(get_db)
):
    analysis_service = AnalysisService(db)
    return analysis_service.create_analysis(data)
    
@router.get("/")
def get_analyses():
    
    return {
        "message": "List of analyses"
    }
    
@router.get("/{analysis_id}", )
def get_analysis(analysis_id: int):
    return {
        "id": analysis_id,
        "message": "Analysis details"
    }

