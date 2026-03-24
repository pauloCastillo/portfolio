from uuid import uuid4
from sqlalchemy import DateTime, String, Text, Boolean, Integer, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from datetime import datetime, UTC

from ..config import Base
# from .projects import Project
# from .experience import Experience
# from .posts import Post

class User(Base):
    
    __tablename__ = "user"
    
    id: Mapped[uuid4] = mapped_column(String, default=lambda:str(uuid4().hex), primary_key=True, index=True)
    username: Mapped[str] = mapped_column(String(255), nullable=False)
    email: Mapped[str] = mapped_column(String, nullable=False, unique=True)
    password: Mapped[str] = mapped_column(String(20), nullable=False, unique=True)
    phone: Mapped[str] = mapped_column(String(20), nullable=False, unique=True)
    # post_id: Mapped[int] = mapped_column(Integer, ForeignKey("post.id"), nullable=False, index=True)
    # project_id: Mapped[int] = mapped_column(Integer, ForeignKey("project.id"), nullable=False, index=True)
    # experience_id: Mapped[int] = mapped_column(Integer, ForeignKey("experience.id"), nullable=False,index=True)
    bio: Mapped[str] = mapped_column(Text, nullable=True, deferred=True)
    isActive: Mapped[bool] = mapped_column(Boolean, default=True)
    avatar_url: Mapped[str] = mapped_column(String(200), nullable=True) 
    # created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda:datetime.now(UTC).strftime("%d/%m/%Y"))
    # updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda:datetime.now(UTC).strftime("%d/%m/%Y"))
    last_login: Mapped[datetime] = mapped_column(DateTime(timezone=True),default=lambda:datetime.now(UTC))

    # project: Mapped[list[Project]] = relationship("Project", back_populates="user", cascade="all, delete-orphan")  
    # post: Mapped[list[Post]] = relationship("Post", back_populates="user", cascade="all, delete-orphan")
    # experience: Mapped[list[Experience]] = relationship("Experience", back_populates="user", cascade="all, delete-orphan")
    
    @property
    def image_path(self) -> str:
        if self.avatar_url:
            return f"/public/media/imgs/{self.avatar_url}"
        return f"/public/media/imgs/default_user.jpg"

    