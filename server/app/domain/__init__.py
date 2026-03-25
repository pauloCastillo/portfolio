"""
Domain Layer - Capa de Dominio
Contiene las reglas de negocio y contratos de repositorios.
"""

from app.domain.abc_repository import IRepository
from app.domain.generic_repository import GenericRepository

__all__ = ["IRepository", "GenericRepository"]
