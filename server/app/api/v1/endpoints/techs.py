from typing import Annotated

from fastapi import APIRouter, status, Depends
from sqlalchemy.orm import Session

from app.db.schemas.tech_dto import TechDTO_Response
from app.db.config import get_db, metadata_obj_var
from app.repositories.tech_repo import TechRepository

metadata_obj_var

db_depends = Annotated[Session, Depends(get_db)]

router = APIRouter()
service = TechRepository()

@router.get("/", include_in_schema=False, name="techs")
def read_techs(db:db_depends):
    return service.get_technologies(db)

@router.get("/{tech_id}", include_in_schema=False, name="specific_tech")
def read_user(tech_id: int, db:db_depends):
    return service.get_technology(db, tech_id)

@router.post("/", response_model=TechDTO_Response, name="create_tech", status_code=status.HTTP_201_CREATED)
def create_user(tech: TechDTO_Response, db:db_depends):
    return service.create_technology(db, tech)