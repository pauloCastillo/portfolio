from sqlalchemy import Boolean, DateTime, UUID, String, Text, Integer, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from datetime import datetime, UTC

from app.core.database import Base

class Experience(Base):
    
    __tablename__ = "experience"
    
    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    user_id: Mapped[uuid4] = mapped_column(MySQLUUID(as_uuid=True), default=uuid4, ForeignKey("user.id"), nullable=False)
    company: Mapped[str] = mapped_column(String(255), nullable=False)
    role: Mapped[str] = mapped_column(String(255), nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=False)
    start_date: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
    end_date: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    url: Mapped[str | None] = mapped_column(String(200), nullable=True)
    published: Mapped[bool] = mapped_column(Boolean, default=True)
    update_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda:datetime.now(UTC))
    