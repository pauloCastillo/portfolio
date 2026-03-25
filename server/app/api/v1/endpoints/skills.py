from typing import Annotated

from fastapi import APIRouter, status, Depends
from sqlalchemy.orm import Session

from app.db.schemas.skill_dto import SkillCreate, SkillResponse, SkillUpdate
from app.core.database import get_db
from app.core.dependencies import get_skill_service, get_current_user
from app.services.skill_service import SkillService
from app.db.models.users import User


db_depends = Annotated[Session, Depends(get_db)]
service_dep = Annotated[SkillService, Depends(get_skill_service)]
current_user_dep = Annotated[User, Depends(get_current_user)]


router = APIRouter()


@router.get("/", name="skills")
def read_skills(db: db_depends, service: service_dep, current_user: current_user_dep):
    """Obtener todos los skills."""
    return service.get_all(db)


@router.get("/level/{level}", name="skills_by_level")
def read_skills_by_level(level: int, db: db_depends, service: service_dep, current_user: current_user_dep):
    """Obtener skills por nivel."""
    return service.get_by_level(db, level)


@router.get("/{skill_id}", name="specific_skill")
def read_skill(skill_id: int, db: db_depends, service: service_dep, current_user: current_user_dep):
    """Obtener skill por ID."""
    return service.get_by_id(db, skill_id)


@router.post("/", response_model=SkillResponse, name="create_skill", status_code=status.HTTP_201_CREATED)
def create_skill(skill: SkillCreate, db: db_depends, service: service_dep, current_user: current_user_dep):
    """Crear nuevo skill."""
    return service.create(db, skill)


@router.put("/{skill_id}", response_model=SkillResponse, name="update_skill")
def update_skill(skill_id: int, skill: SkillUpdate, db: db_depends, service: service_dep, current_user: current_user_dep):
    """Actualizar skill existente."""
    return service.update(db, skill_id, skill)


@router.delete("/{skill_id}", name="delete_skill", status_code=status.HTTP_204_NO_CONTENT)
def delete_skill(skill_id: int, db: db_depends, service: service_dep, current_user: current_user_dep):
    """Eliminar skill."""
    service.delete(db, skill_id)
