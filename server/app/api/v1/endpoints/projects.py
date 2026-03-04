from typing import Annotated

from fastapi import APIRouter, status, Depends
from sqlalchemy.orm import Session

from app.db.schemas.project_dto import ProjectDTO_Response
from app.db.config import get_db, Base, engine
from app.repositories.project_repository import ProjectRepository

Base.metadata.create_all(bind=engine)

router = APIRouter()
service_project = ProjectRepository()

@router.get("/", include_in_schema=False, name="projects")
def read_projects(db:Annotated[Session, Depends(get_db)]):
    return service_project.get_projects(db)

@router.get("/{project_id}", include_in_schema=False, name="specific_project")
def read_project(project_id: int, db:Annotated[Session, Depends(get_db)]):
    return service_project.get_project(db, project_id)

@router.post("/", response_model=ProjectDTO_Response, name="create_project", status_code=status.HTTP_201_CREATED)
def create_project(project: ProjectDTO_Response, db:Annotated[Session, Depends(get_db)]):
    return service_project.create_project(db, project)