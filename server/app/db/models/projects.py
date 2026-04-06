
from uuid import uuid4

from sqlalchemy import DateTime, Integer, ForeignKey, String, Boolean, Text, JSON 
from sqlalchemy.orm import Mapped, mapped_column

from datetime import datetime, UTC

from core.database import Base

class Project(Base):
    
    __tablename__ = "project"
    
    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    user_id: Mapped[str] = mapped_column(String, ForeignKey("user.id"), nullable=False)
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=False)
    content: Mapped[str | None] = mapped_column(Text, nullable=True, default=None)
    image_file: Mapped[str | None] = mapped_column(String(200), nullable=True, default=None)
    project_link: Mapped[str | None] = mapped_column(String(200), nullable=True)
    github_link: Mapped[str | None] = mapped_column(String(200), nullable=True)
    tech_stack: Mapped[str | None] = mapped_column(Text, nullable=True, default=None)
    published: Mapped[bool] = mapped_column(Boolean, default=False)
    published_date: Mapped[datetime] = mapped_column(DateTime, default=datetime.now(UTC))
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=datetime.now(UTC), onupdate=datetime.now(UTC))


    