"""
Dependency Injection - Inversión de Dependencias
Factory para obtener servicios con inyección de dependencias.
"""

from functools import lru_cache
from typing import Annotated
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session

from services.project_service import ProjectService
from services.user_service import UserService
from services.post_service import PostService
from services.skill_service import SkillService
from services.tech_service import TechService
from services.experience_service import ExperienceService
from core.database import get_db
from core.security.jwt import verify_token
from db.models.users import User

# OAuth2 scheme for token extraction
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/auth/login")


@lru_cache
def get_project_service() -> ProjectService:
    """
    Factory con cache para ProjectService.
    Sigue el Singleton Pattern para reutilizar instancias.
    """
    return ProjectService()


@lru_cache
def get_user_service() -> UserService:
    """Factory con cache para UserService."""
    return UserService()


@lru_cache
def get_post_service() -> PostService:
    """Factory con cache para PostService."""
    return PostService()


@lru_cache
def get_skill_service() -> SkillService:
    """Factory con cache para SkillService."""
    return SkillService()


@lru_cache
def get_tech_service() -> TechService:
    """Factory con cache para TechService."""
    return TechService()


@lru_cache
def get_experience_service() -> ExperienceService:
    """Factory con cache para ExperienceService."""
    return ExperienceService()


def get_current_user(
    token: Annotated[str, Depends(oauth2_scheme)],
    db: Annotated[Session, Depends(get_db)]
) -> User:
    """
    Dependency to get current authenticated user from JWT token.
    
    Args:
        token: JWT token from Authorization header
        db: Database session
        
    Returns:
        Current authenticated user
        
    Raises:
        HTTPException: If token is invalid or user not found
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    # Verify token
    payload = verify_token(token)
    if payload is None:
        raise credentials_exception
    
    # Get user email from token
    email: str = payload.get("sub")
    if email is None:
        raise credentials_exception
    
    # Get user from database
    from ..services.user_service import UserService
    user_service = UserService()
    user = user_service.get_by_email(db, email)
    if user is None:
        raise credentials_exception
    
    return user
