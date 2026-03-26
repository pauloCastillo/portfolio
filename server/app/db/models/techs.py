
from sqlalchemy import DateTime, String, Integer
from sqlalchemy.orm import Mapped, mapped_column

from datetime import datetime, UTC

from app.core.database import Base

class Technology(Base):
    
    __tablename__ = "technology"
    
    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    icon_tech: Mapped[str] = mapped_column(String(255), nullable=True)
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda:datetime.now(UTC))
    

    