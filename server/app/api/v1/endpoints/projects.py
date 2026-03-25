from typing import Annotated

from fastapi import APIRouter, status, Depends
from sqlalchemy.orm import Session

from app.db.schemas.project_dto import ProjectCreate, ProjectResponse, ProjectUpdate
from app.core.database import get_db
from app.services.project_service import ProjectService
from app.core.dependencies import get_project_service


db_depends = Annotated[Session, Depends(get_db)]
service_dep = Annotated[ProjectService, Depends(get_project_service)]

router = APIRouter()


@router.get("/", name="projects")
def read_projects(db: db_depends, service: service_dep):
    """Obtener todos los proyectos."""
    return service.get_all(db)


@router.get("/published", name="published_projects")
def read_published_projects(db: db_depends, service: service_dep):
    """Obtener solo proyectos publicados."""
    return service.get_published_projects(db)


@router.get("/{project_id}", name="specific_project")
def read_project(project_id: int, db: db_depends, service: service_dep):
    """Obtener proyecto por ID."""
    return service.get_by_id(db, project_id)


@router.post("/", response_model=ProjectResponse, name="create_project", status_code=status.HTTP_201_CREATED)
def create_project(project: ProjectCreate, db: db_depends, service: service_dep):
    """Crear nuevo proyecto."""
    return service.create(db, project)


@router.put("/{project_id}", response_model=ProjectResponse, name="update_project")
def update_project(project_id: int, project: ProjectUpdate, db: db_depends, service: service_dep):
    """Actualizar proyecto existente."""
    return service.update(db, project_id, project)


@router.delete("/{project_id}", name="delete_project", status_code=status.HTTP_204_NO_CONTENT)
def delete_project(project_id: int, db: db_depends, service: service_dep):
    """Eliminar proyecto."""
    service.delete(db, project_id)
