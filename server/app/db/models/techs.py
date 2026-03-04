
from sqlalchemy import DateTime, UUID, String, Text, Integer, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column

from datetime import datetime, UTC

from ..config import Base

class Technology(Base):
    
    __tablename__ = "technology"
    
    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    icon_tech: Mapped[str] = mapped_column(String(255), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda:datetime.now(UTC))
    update_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda:datetime.now(UTC))
    
    @property
    def image_path(self) -> str:
        if self.icon_tech:
            return f"/public/media/imgs/{self.image_file}"
        return f"/public/media/imgs/default_iconTech.jpg"

    