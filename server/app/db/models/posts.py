
from sqlalchemy import Boolean, DateTime, UUID, String, Text, Integer, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column

from datetime import datetime, UTC

from ...core.database import Base

class Post(Base):

    __tablename__ = "post"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    author_id: Mapped[str] = mapped_column(String, ForeignKey("user.id"), nullable=False, index=True)
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    content: Mapped[str] = mapped_column(Text, nullable=False)
    image_file: Mapped[str | None] = mapped_column(String(200), nullable=True)
    published: Mapped[bool] = mapped_column(Boolean, default=True)
    published_date: Mapped[datetime] = mapped_column(DateTime, default=datetime.now(UTC))


    