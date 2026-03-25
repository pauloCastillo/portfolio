"""
Portfolio Server - FastAPI REST API
Arquitectura: Clean Architecture + Repository Pattern + Service Pattern
"""

from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware

from pathlib import Path

import uvicorn

from app.api.v1.router import router

# Configurar CORS para permitir solicitudes desde el cliente
origins = [
    "http://localhost:3000",
    "http://localhost:8080",
    "http://localhost:3306",
]

app = FastAPI(
    title="Portfolio API",
    description="REST API para gestión de portfolio profesional",
    version="1.0.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc",
)

# Middleware CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

# Configurar directorio de archivos estáticos
BASE_DIR = Path(__file__).resolve().parent
MEDIA_DIR = BASE_DIR / "public" / "media"

# Montar directorio de medios
app.mount("/public/media", StaticFiles(directory=MEDIA_DIR), name="media")

# Incluir router de API v1
app.include_router(router, prefix="/api/v1")

# Health check endpoint
@app.get("/health", tags=["health"])
def health_check():
    """Verificar estado del servidor."""
    return {"status": "healthy", "version": "1.0.0"}


if __name__ == "__main__":
    uvicorn.run("main:app", reload=True, host="0.0.0.0", port=8000)
    