
from email.mime import image

from sqlalchemy import DateTime, Integer, ForeignKey, String, Boolean, Text 
from sqlalchemy.orm import Mapped, mapped_column, relationship

from datetime import datetime, UTC

from ..config import Base

class Project(Base):
    
    __tablename__ = "projects"
    
    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=False)
    image_file: Mapped[str | None] = mapped_column(String(200), nullable=True, default=None)
    published: Mapped[bool] = mapped_column(Boolean, default=True)
    published_date: Mapped[datetime] = mapped_column(DateTime, default=datetime.now(UTC)) 
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=datetime.now(UTC), onupdate=datetime.now(UTC))

    @property
    def image_path(self) -> str:
        if self.image_file:
            return f"/public/media/imgs/{self.image_file}"
        return f"/public/media/imgs/default.jpg"

    