from decimal import Decimal
from datetime import datetime
from pydantic import BaseModel, Field, ConfigDict


class AnalysisCreate(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    
    id: int
    filename: str
    total_records: int
    total_quantity: int
    total_revenue: Decimal
    average_value: Decimal
    revenue_by_category: list[dict] = []
    top_products: list[dict] = []
    created_at: datetime
class AnalysisResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    
    id: int
    filename: str
    total_records: int
    total_quantity: int
    total_revenue: Decimal
    average_value: Decimal
    revenue_by_category: list[dict] = []
    top_products: list[dict] = []