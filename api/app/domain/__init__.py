"""
Domain Layer - Capa de Dominio
Contiene las reglas de negocio y contratos de repositorios.
"""

from domain.abc_repository import IRepository
from domain.generic_repository import GenericRepository

__all__ = ["IRepository", "GenericRepository"]
