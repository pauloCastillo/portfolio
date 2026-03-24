from typing import Annotated

from fastapi import APIRouter, status, Depends
from sqlalchemy.orm import Session

from app.db.schemas.project_dto import ProjectDTO_Response
from app.db.config import get_db, metadata_obj_var
from app.repositories.project_repository import ProjectRepository

metadata_obj_var

db_depends = Annotated[Session, Depends(get_db)]

router = APIRouter()
service = ProjectRepository()

@router.get("/", include_in_schema=False, name="projects")
def read_projects(db:db_depends):
    return service.get_projects(db)

@router.get("/{project_id}", include_in_schema=False, name="specific_project")
def read_project(project_id: int, db:db_depends):
    return service.get_project(db, project_id)

@router.post("/", response_model=ProjectDTO_Response, name="create_project", status_code=status.HTTP_201_CREATED)
def create_project(project: ProjectDTO_Response, db:db_depends):
    return service.create_project(db, project)