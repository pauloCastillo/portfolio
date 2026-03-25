
from sqlalchemy import DateTime, UUID, Integer, ForeignKey, String, Boolean, Text 
from sqlalchemy.orm import Mapped, mapped_column, relationship

from datetime import datetime, UTC

from app.core.database import Base

class Project(Base):
    
    __tablename__ = "project"
    
    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    user_id: Mapped[uuid4] = mapped_column(MySQLUUID(as_uuid=True), default=uuid4, ForeignKey("user.id"), nullable=False, index=True)
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=False)
    image_file: Mapped[str | None] = mapped_column(String(200), nullable=True, default=None)
    project_link: Mapped[str | None] = mapped_column(String(200), nullable=True)
    github_link: Mapped[str | None] = mapped_column(String(200), nullable=True)
    tech_stack: Mapped[str] = mapped_column(String(200), nullable=False)
    published: Mapped[bool] = mapped_column(Boolean, default=True)
    published_date: Mapped[datetime] = mapped_column(DateTime, default=datetime.now(UTC))
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=datetime.now(UTC), onupdate=datetime.now(UTC))


    