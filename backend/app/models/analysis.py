from datetime import datetime, timezone
from decimal import Decimal

from sqlalchemy import Integer, BigInteger, String, Text, DateTime, Numeric, JSON
from sqlalchemy.orm import Mapped, mapped_column
from app.database.connection import Base

from sqlalchemy.dialects.postgresql import JSONB

class Analysis(Base):
    __tablename__ = "analyses"

    id: Mapped[int] = mapped_column(
        Integer, 
        primary_key=True
    )
    
    filename: Mapped[str] = mapped_column(
        String(255),
        nullable=False
    )
    
    total_records: Mapped[int] = mapped_column(
        Integer,
        nullable=False 
    )
    
    total_quantity: Mapped[int] = mapped_column(
        BigInteger,
        nullable=False
    )
    
    total_revenue: Mapped[Decimal] = mapped_column(
        Numeric(20, 2),
        nullable=False
    )
    
    average_value: Mapped[Decimal] = mapped_column(
        Numeric(20, 2),
        nullable=False
    )
    
    revenue_by_category: Mapped[list] = mapped_column(
        JSONB
    )
    
    top_products: Mapped[list] = mapped_column(
        JSONB
    )
    
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        nullable=False
    )