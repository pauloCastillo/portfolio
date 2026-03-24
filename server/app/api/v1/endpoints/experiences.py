from typing import Annotated

from fastapi import APIRouter, status, Depends
from sqlalchemy.orm import Session

from app.db.schemas.experience_dto import ExperienceDTO_Response
from app.db.config import get_db, metadata_obj_var
from app.repositories.experience_repo import ExperienceRepository

metadata_obj_var

db_depends = Annotated[Session, Depends(get_db)]

router = APIRouter()
service = ExperienceRepository()

@router.get("/", include_in_schema=False, name="experiences")
def read_techs(db:db_depends):
    return service.get_experiences(db)

@router.get("/{experience_id}", include_in_schema=False, name="specific_experience")
def read_user(experience_id: int, db:db_depends):
    return service.get_experience(db, experience_id)

@router.post("/", response_model=ExperienceDTO_Response, name="create_experience", status_code=status.HTTP_201_CREATED)
def create_user(experience: ExperienceDTO_Response, db:db_depends):
    return service.create_technology(db, experience)