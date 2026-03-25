"""
Core Layer - Infraestructura
Configuración y dependencias externas.
"""

from app.core.database import Base, get_db, engine, SessionLocal

__all__ = ["Base", "get_db", "engine", "SessionLocal"]
