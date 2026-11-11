from fastapi import APIRouter, Depends, HTTPException, Response, File, UploadFile
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.services.analysis import AnalysisService
from app.schemas.analysis import AnalysisCreate, AnalysisResponse
from app.services.csv_analyzer import CSVAnalyzer

router = APIRouter(
    prefix="/analyses",
    tags=["Analyses"]
)

@router.post("/", response_model=AnalysisResponse)
def create_analysis_endpoint(
    data: AnalysisCreate,
    db: Session = Depends(get_db)
):
    service = AnalysisService(db)
    return service.create_analysis(data)
    
@router.post("/upload", response_model=AnalysisResponse)    
async def upload_csv_endpoint(
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    if not file.filename.lower().endswith(".csv"):
        raise HTTPException(
            status_code=400,
            detail="Apenas ficheiros CSV são permitidos."
        )
    # try:
    #     an = CSVAnalyzer()
    #     data = an.analyze(file.file)
        
    #     service = AnalysisService(db)
    #     return service.create_analysis(
    #         filename=file.filename,
    #         data=data
    #     )
        
    # except ValueError as error:
    #     raise HTTPException(
    #         status_code=422,
    #         detail=str(error)
    #     )
        
    # finally: 
    #     await file.close()
    try:
        an = CSVAnalyzer()
        data = an.analyze(file.file)

    except ValueError as error:
        raise HTTPException(
            status_code=422,
            detail=str(error)
        )

    service = AnalysisService(db)

    return service.create_analysis(
        filename=file.filename,
        data=data
    )
    
@router.get("/", response_model=list[AnalysisResponse])
def get_analyses_endpoint(
    db: Session = Depends(get_db)
):
    service = AnalysisService(db)
    return service.get_analyses()

@router.get("/{id}", response_model=AnalysisResponse) 
def get_analysis_by_id_endpoint(
    id: int,
    db: Session = Depends(get_db)
):
    service = AnalysisService(db)
    analysis = service.get_analysis_by_id(id)
    
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