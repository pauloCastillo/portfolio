import secrets
from io import BytesIO
from typing import Annotated
from pathlib import Path

from fastapi import APIRouter, status, Depends, UploadFile, File, HTTPException
from PIL import Image
from sqlalchemy.orm import Session

from db.schemas.project_dto import ProjectCreate, ProjectResponse, ProjectUpdate
from core.database import get_db
from services.project_service import ProjectService
from core.dependencies import get_project_service, get_current_user
from db.models.users import User

Image.MAX_IMAGE_PIXELS = 50_000_000

MAX_IMAGE_BYTES = 30 * 1024 * 1024

# Formato Pillow -> extensión segura (nunca se conserva la del cliente)
ALLOWED_FORMATS = {"PNG": ".png", "JPEG": ".jpg", "WEBP": ".webp"}


db_depends = Annotated[Session, Depends(get_db)]
service_dep = Annotated[ProjectService, Depends(get_project_service)]
current_user_dep = Annotated[User, Depends(get_current_user)]


router = APIRouter()


@router.get("/", name="projects")
def read_projects(db: db_depends, service: service_dep, current_user: current_user_dep):
    """Obtener todos los proyectos."""
    return service.get_all(db)


@router.get("/published", name="published_projects")
def read_published_projects(db: db_depends, service: service_dep):
    """Obtener solo proyectos publicados. Endpoint público."""
    return service.get_published_projects(db)


@router.get("/{project_id}", name="specific_project")
def read_project(project_id: int, db: db_depends, service: service_dep):
    """Obtener proyecto por ID. Endpoint público."""
    return service.get_by_id(db, project_id)


UPLOAD_DIR = Path(__file__).resolve().parent.parent.parent.parent.parent / "public" / "media"


@router.post("/upload/image", name="upload_image", status_code=status.HTTP_201_CREATED)
async def upload_image(current_user: current_user_dep, file: UploadFile = File(...)):
    """Subir imagen de proyecto.

    Validación estricta: sin SVG, verifica contenido real con Pillow,
    mide tamaño por bytes leídos (nunca `file.size`) y guarda con
    nombre aleatorio.
    """
    if file.content_type == "image/svg+xml":
        raise HTTPException(status_code=400, detail="Invalid image type")
    if file.content_type not in ["image/png", "image/jpeg", "image/jpg", "image/webp"]:
        raise HTTPException(status_code=400, detail="Invalid image type")

    # Tamaño medido de los bytes reales: UploadFile.size es None
    # en varias versiones de Starlette y el cliente lo puede omitir.
    content = await file.read()
    if len(content) > MAX_IMAGE_BYTES:
        raise HTTPException(status_code=400, detail="File too large (max 30MB)")
    if not content:
        raise HTTPException(status_code=400, detail="Empty file")

    try:
        image = Image.open(BytesIO(content))
        image.verify()
        fmt = image.format
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid image content")
    if fmt not in ALLOWED_FORMATS:
        raise HTTPException(status_code=400, detail="Invalid image type")

    UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
    filename = f"{secrets.token_hex(16)}{ALLOWED_FORMATS[fmt]}"
    filepath = UPLOAD_DIR / filename

    with open(filepath, "wb") as f:
        f.write(content)

    return {"filename": filename, "path": f"/public/media/{filename}"}


@router.post("/", response_model=ProjectResponse, name="create_project", status_code=status.HTTP_201_CREATED)
def create_project(project: ProjectCreate, db: db_depends, service: service_dep, current_user: current_user_dep):
    """Crear nuevo proyecto.

    El propietario se deriva siempre de la sesión y cualquier `user_id`
    enviado por el cliente se ignora. Se asigna como `str` (sin revalidación
    de pydantic en asignación) para que el repositorio persista el mismo tipo
    que la columna `String` espera.
    """
    project.user_id = str(current_user.id)
    return service.create(db, project)


@router.put("/{project_id}", response_model=ProjectResponse, name="update_project")
def update_project(project_id: int, project: ProjectUpdate, db: db_depends, service: service_dep, current_user: current_user_dep):
    """Actualizar proyecto existente."""
    return service.update(db, project_id, project)


@router.delete("/{project_id}", name="delete_project", status_code=status.HTTP_204_NO_CONTENT)
def delete_project(project_id: int, db: db_depends, service: service_dep, current_user: current_user_dep):
    """Eliminar proyecto."""
    service.delete(db, project_id)
