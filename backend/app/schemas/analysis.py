from datetime import datetime
from pydantic import BaseModel, Field


class AnalysiCreate (BaseModel):
    name: str =  Field(
        min_length=3,
        max_length=100    
    )
    
    description: str | None = None
    
class AnalysisResponse(BaseModel):
    id: int
    name: str
    description: str | None
    created_at: datetime