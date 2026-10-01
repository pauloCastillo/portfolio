"""
Portfolio Server - FastAPI REST API
Arquitectura: Clean Architecture + Repository Pattern + Service Pattern
"""

from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware

from pathlib import Path
from slowapi.errors import RateLimitExceeded   # type: ignore

import uvicorn
import sys

# Ensure app/ is on the path so bare imports (from core.xxx, from services.xxx) work
sys.path.insert(0, str(Path(__file__).resolve().parent / "app"))

from app.api.v1.router import router
from app.core.config import get_cors_origins, get_settings, should_enable_docs
from app.core.rate_limit import limiter

settings = get_settings()


def _rate_limit_handler(request: Request, exc: RateLimitExceeded) -> JSONResponse:
    return JSONResponse(
        status_code=429,
        content={"detail": "Too many requests"},
        headers={"Retry-After": "60"},
    )


docs_enabled = should_enable_docs(settings)

app = FastAPI(
    title="Portfolio API",
    description="REST API para gestión de portfolio profesional",
    version="1.0.0",
    docs_url="/api/docs" if docs_enabled else None,
    redoc_url="/api/redoc" if docs_enabled else None,
    openapi_url="/api/openapi.json" if docs_enabled else None,
)

app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_handler)


@app.middleware("http")
async def security_headers(request: Request, call_next):
    response = await call_next(request)
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["Referrer-Policy"] = "no-referrer"
    return response


# Middleware CORS por entorno (prod cerrado + opt-in localhost:3000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=get_cors_origins(settings),
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["Authorization", "Content-Type", "Accept"],
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
