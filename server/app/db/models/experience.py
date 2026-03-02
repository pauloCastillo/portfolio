from os import link

from sqlalchemy import DateTime, UUID, String, Text, Integer, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column

from datetime import datetime, UTC

from ..config import Base

class Experience(Base):
    
    __tablename__ = "experience"
    
    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    user_id: Mapped[UUID] = mapped_column(UUID, ForeignKey("user.id"), nullable=False)
    company: Mapped[str] = mapped_column(String(255), nullable=False)
    role: Mapped[str] = mapped_column(String(255), nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=False)
    start_date: Mapped[datetime] = mapped_column(DateTime, nullable=False)
    end_date: Mapped[datetime] = mapped_column(DateTime, nullable=True)
    url: Mapped[str | None] = mapped_column(String(200), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda:datetime.now(UTC))
    update_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda:datetime.now(UTC), onupdate=datetime.now(UTC))
    