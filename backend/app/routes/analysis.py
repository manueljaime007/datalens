from fastapi import APIRouter

router = APIRouter(
    prefix="/analyses",
    tags=["Analyses"]
)

@router.get("/")
def get_analyses():
    return {
        "message": "List of analyses"
    }
    
@router.post("/")
def create_analyses():
    return {
        "message": "List of analyses"
    }
    
@router.get("/{analysis_id}")
def get_analysis(analysis_id: int):
    return {
        "id": analysis_id,
        "message": "Analysis details"
    }