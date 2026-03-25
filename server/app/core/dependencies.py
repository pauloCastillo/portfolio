"""
Dependency Injection - Inversión de Dependencias
Factory para obtener servicios con inyección de dependencias.
"""

from functools import lru_cache

from app.services.project_service import ProjectService
from app.services.user_service import UserService
from app.services.post_service import PostService
from app.services.skill_service import SkillService
from app.services.tech_service import TechService
from app.services.experience_service import ExperienceService


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
