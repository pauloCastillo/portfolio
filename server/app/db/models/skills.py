
from sqlalchemy import DateTime, UUID, String, Integer, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from datetime import datetime, UTC

from ..config import Base

class Skill(Base):
    
    __tablename__ = "skill"
    
    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    # user_id: Mapped[UUID] = mapped_column(UUID, ForeignKey("user.id"), nullable=False, index=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    level: Mapped[int] = mapped_column(Integer, nullable=False)
    update_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda:datetime.now(UTC))

    