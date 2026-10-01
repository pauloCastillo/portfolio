"""
Core Layer - Infraestructura y Configuración
Configuración de base de datos y dependencias externas.
"""
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, DeclarativeBase
from dotenv import load_dotenv
from pathlib import Path
import os

# .env.local vive en la raíz del repo (hermano de /api); resolver con ruta
# absoluta para que funcione con cwd api/ o raíz del repo.
REPO_ROOT = Path(__file__).resolve().parent.parent.parent.parent
load_dotenv(REPO_ROOT / ".env.local")

DB_USER = os.getenv("USER_DB")
DB_PASSWORD = os.getenv("PASSWORD_DB")
DB_HOST = os.getenv("HOST_DB")
DB_PORT = os.getenv("PORT_DB")
DB_NAME = os.getenv("NAME_DB")

DATABASE_URL = f"mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}?charset=utf8mb4&collation=utf8mb4_unicode_ci"

engine = create_engine(DATABASE_URL, echo=os.getenv("ENV", "dev") != "prod")

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

class Base(DeclarativeBase):
    pass

def get_db():
    with SessionLocal() as db:
        yield db


# Esquema gestionado con Alembic (api/alembic/): `alembic upgrade head`.
# No crear tablas al importar: el import debe funcionar sin MySQL vivo
# (el engine solo conecta al usarse) y sin efectos laterales.