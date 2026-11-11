from fastapi import APIRouter, Depends, HTTPException, Response
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
    ans = AnalysisService(db)
    return ans.create_analysis(data)
    
@router.get("/")
def get_analyses_endpoint(
    db: Session = Depends(get_db)
):
    ans = AnalysisService(db)
    return ans.get_analyses()

@router.get("/{id}")
def get_analysis_by_id_endpoint(
    id: int,
    db: Session = Depends(get_db)
):
    ans = AnalysisService(db)
    analysis = ans.get_analysis_by_id(id)
    
    if analysis is None:
        raise HTTPException(
            status_code=404, 
            detail="Registro de Análise não encontrado"
        )
    return analysis
    
    
@router.delete("/{id}", status_code=204)
def delete_analysis_by_id_endpoint(
    id: int,
    db: Session = Depends(get_db)
):
    service = AnalysisService(db)

    deleted = service.delete_analysis_by_id(id)

    if not deleted:
        raise HTTPException(
            status_code=404,
            detail="Registro de análise não encontrado"
        )

    return Response(status_code=204)