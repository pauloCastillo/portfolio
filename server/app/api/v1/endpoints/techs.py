from typing import Annotated

from fastapi import APIRouter, status, Depends
from sqlalchemy.orm import Session

from db.schemas.tech_dto import TechCreate, TechResponse, TechUpdate
from core.database import get_db
from core.dependencies import get_tech_service, get_current_user
from services.tech_service import TechService
from db.models.users import User


db_depends = Annotated[Session, Depends(get_db)]
service_dep = Annotated[TechService, Depends(get_tech_service)]
current_user_dep = Annotated[User, Depends(get_current_user)]


router = APIRouter()


@router.get("/", name="techs")
def read_techs(db: db_depends, service: service_dep, current_user: current_user_dep):
    """Obtener todas las tecnologías."""
    return service.get_all(db)


@router.get("/{tech_id}", name="specific_tech")
def read_tech(tech_id: int, db: db_depends, service: service_dep, current_user: current_user_dep):
    """Obtener tecnología por ID."""
    return service.get_by_id(db, tech_id)


@router.post("/", response_model=TechResponse, name="create_tech", status_code=status.HTTP_201_CREATED)
def create_tech(tech: TechCreate, db: db_depends, service: service_dep, current_user: current_user_dep):
    """Crear nueva tecnología."""
    return service.create(db, tech)


@router.put("/{tech_id}", response_model=TechResponse, name="update_tech")
def update_tech(tech_id: int, tech: TechUpdate, db: db_depends, service: service_dep, current_user: current_user_dep):
    """Actualizar tecnología existente."""
    return service.update(db, tech_id, tech)


@router.delete("/{tech_id}", name="delete_tech", status_code=status.HTTP_204_NO_CONTENT)
def delete_tech(tech_id: int, db: db_depends, service: service_dep, current_user: current_user_dep):
    """Eliminar tecnología."""
    service.delete(db, tech_id)
