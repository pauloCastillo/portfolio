
from sqlalchemy import Boolean, DateTime, UUID, String, Text, Integer, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from datetime import datetime, UTC

from ..config import Base
from .users import User

class Post(Base):
    
    __tablename__ = "post"
    
    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    author_id: Mapped[UUID] = mapped_column(UUID, ForeignKey("user.id"), nullable=False, index=True)
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    content: Mapped[str] = mapped_column(Text, nullable=False)
    image_file: Mapped[str | None] = mapped_column(String(200), nullable=True)
    published: Mapped[bool] = mapped_column(Boolean, default=True)
    published_date: Mapped[datetime] = mapped_column(DateTime, default=datetime.now(UTC))                         

    author: Mapped[User] = relationship("User", back_populates="post", cascade="all, delete-orphan")

    @property
    def image_path(self) -> str:
        if self.image_file:
            return f"/public/media/imgs/{self.image_file}"
        return f"/public/media/imgs/default_post.jpg"

    