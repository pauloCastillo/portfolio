from sqlalchemy import DateTime, Integer, String
from sqlalchemy.orm import Mapped, mapped_column

from datetime import datetime, UTC

from core.database import Base


class VisitEvent(Base):

    __tablename__ = "visit_event"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    visitor_id: Mapped[str] = mapped_column(String(36), nullable=False, index=True)
    path: Mapped[str] = mapped_column(String(255), nullable=False, default="/")
    seen_at: Mapped[datetime] = mapped_column(DateTime, default=lambda: datetime.now(UTC), index=True)
