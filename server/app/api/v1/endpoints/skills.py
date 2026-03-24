from typing import Annotated

from fastapi import APIRouter, status, Depends
from sqlalchemy.orm import Session

from app.db.schemas.skill_dto import SkillDTO_Response
from app.db.config import get_db, metadata_obj_var
from app.repositories.skill_repo import SkillRepository

metadata_obj_var

db_depends = Annotated[Session, Depends(get_db)]

router = APIRouter()
service = SkillRepository()

@router.get("/", include_in_schema=False, name="skills")
def read_techs(db:db_depends):
    return service.get_skills(db)

@router.get("/{skill_id}", include_in_schema=False, name="specific_skill")
def read_user(skill_id: int, db:db_depends):
    return service.get_skill(db, skill_id)

@router.post("/", response_model=SkillDTO_Response, name="create_skill", status_code=status.HTTP_201_CREATED)
def create_user(skill: SkillDTO_Response, db:db_depends):
    return service.create_skill(db, skill)