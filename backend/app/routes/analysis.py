
from fastapi import APIRouter, Body, Depends, File, HTTPException, UploadFile
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError

from app.database.connection import get_db
from app.schemas.analysis import AnalysisResponse
from app.services.analysis import AnalysisService
from app.services.csv_analyzer import CSVAnalyzer

router = APIRouter(
    prefix="/analyses",
    tags=["Analyses"]
)

MAX_FILE_SIZE = 5 * 1024 * 1024


@router.post("/upload", response_model=AnalysisResponse)
def upload_csv_endpoint(
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    try:
        if not file.filename or not file.filename.lower().endswith(".csv"):
            raise HTTPException(
                status_code=400,
                detail="Apenas ficheiros CSV são permitidos."
            )

        file.file.seek(0, 2)
        file_size = file.file.tell()
        file.file.seek(0)

        if file_size > MAX_FILE_SIZE:
            raise HTTPException(
                status_code=413,
                detail="O ficheiro não pode ultrapassar 5 MB."
            )

        analyzer = CSVAnalyzer()

        try:
            data = analyzer.analyze(file.file)
        except ValueError as error:
            raise HTTPException(
                status_code=422,
                detail=str(error)
            )

        service = AnalysisService(db)

        try:
            return service.create_analysis(
                filename=file.filename,
                data=data
            )
        except SQLAlchemyError:
            db.rollback()
            raise HTTPException(
                status_code=500,
                detail="Não foi possível guardar a análise."
            )

    finally:
        file.file.close()


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
            detail="Registo de análise não encontrado."
        )

    return analysis


@router.delete("/bulk")
def delete_analyses_bulk_endpoint(
    ids: list[int] = Body(..., embed=True),
    db: Session = Depends(get_db)
):
    service = AnalysisService(db)
    unique_ids = list(dict.fromkeys(ids))

    if any(
        service.get_analysis_by_id(analysis_id) is None for analysis_id in unique_ids
    ):
        raise HTTPException(
            status_code=404,
            detail="Registo de análise não encontrado."
        )

    try:
        for analysis_id in unique_ids:
            service.delete_analysis_by_id(analysis_id)
    except SQLAlchemyError:
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail="Não foi possível eliminar as análises."
        )

    return {"deleted": len(unique_ids)}


@router.delete("/bulk")
def delete_analyses_bulk_endpoint(
    ids: list[int] = Body(..., embed=True),
    db: Session = Depends(get_db),
):
    service = AnalysisService(db)
    try:
        deleted_count = service.delete_analyses_bulk(ids)
        if deleted_count is None:
            raise HTTPException(
                status_code=404,
                detail="Registo de análise não encontrado.",
            )
    except SQLAlchemyError:
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail="Não foi possível eliminar as análises.",
        )

    return {"deleted": deleted_count}

