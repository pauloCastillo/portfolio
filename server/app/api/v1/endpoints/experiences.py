from typing import Annotated

from fastapi import APIRouter, status, Depends
from sqlalchemy.orm import Session

from app.db.schemas.experience_dto import ExperienceCreate, ExperienceResponse, ExperienceUpdate
from app.core.database import get_db
from app.core.dependencies import get_experience_service, get_current_user
from app.services.experience_service import ExperienceService
from app.db.models.users import User


db_depends = Annotated[Session, Depends(get_db)]
service_dep = Annotated[ExperienceService, Depends(get_experience_service)]
current_user_dep = Annotated[User, Depends(get_current_user)]


router = APIRouter()


@router.get("/", name="experiences")
def read_experiences(db: db_depends, service: service_dep, current_user: current_user_dep):
    """Obtener todas las experiencias."""
    return service.get_all(db)


@router.get("/current", name="current_experiences")
def read_current_experiences(db: db_depends, service: service_dep, current_user: current_user_dep):
    """Obtener experiencias actuales."""
    return service.get_current_experiences(db)


@router.get("/{experience_id}", name="specific_experience")
def read_experience(experience_id: int, db: db_depends, service: service_dep, current_user: current_user_dep):
    """Obtener experiencia por ID."""
    return service.get_by_id(db, experience_id)


@router.post("/", response_model=ExperienceResponse, name="create_experience", status_code=status.HTTP_201_CREATED)
def create_experience(experience: ExperienceCreate, db: db_depends, service: service_dep, current_user: current_user_dep):
    """Crear nueva experiencia."""
    return service.create(db, experience)


@router.put("/{experience_id}", response_model=ExperienceResponse, name="update_experience")
def update_experience(experience_id: int, experience: ExperienceUpdate, db: db_depends, service: service_dep, current_user: current_user_dep):
    """Actualizar experiencia existente."""
    return service.update(db, experience_id, experience)


@router.delete("/{experience_id}", name="delete_experience", status_code=status.HTTP_204_NO_CONTENT)
def delete_experience(experience_id: int, db: db_depends, service: service_dep, current_user: current_user_dep):
    """Eliminar experiencia."""
    service.delete(db, experience_id)
