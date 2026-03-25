from uuid import uuid4
from sqlalchemy import DateTime, String, Text, Boolean, Integer, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.dialects.mysql import UUID as MySQLUUID

from datetime import datetime, UTC

from app.core.database import Base

class User(Base):

    __tablename__ = "user"

    id: Mapped[uuid4] = mapped_column(MySQLUUID(as_uuid=True), default=uuid4, primary_key=True, index=True)
    username: Mapped[str] = mapped_column(String(255), nullable=False)
    email: Mapped[str] = mapped_column(String, nullable=False, unique=True)
    password: Mapped[str] = mapped_column(String(128), nullable=False)
    phone: Mapped[str] = mapped_column(String(20), nullable=False)
    bio: Mapped[str] = mapped_column(Text, nullable=True, deferred=True)
    isActive: Mapped[bool] = mapped_column(Boolean, default=True)
    avatar_url: Mapped[str] = mapped_column(String(200), nullable=True)
    last_login: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda:datetime.now(UTC))
    

    