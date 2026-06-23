"""
Core Layer - Infraestructura
Configuración y dependencias externas.
"""

from core.database import Base, get_db, engine, SessionLocal

__all__ = ["Base", "get_db", "engine", "SessionLocal"]
