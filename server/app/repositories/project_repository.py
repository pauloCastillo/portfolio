from fastapi import HTTPException, status
from sqlalchemy import select

from app.db.models.projects import Project

class ProjectRepository:
    
    @classmethod
    def get_projects(cls, db):
        if not db:
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Database connection error")
        
        result = db.execute(select(Project))
        projects = result.scalars().all()
        if not projects:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No projects found")
        return projects
    
    @classmethod
    def get_project(cls, db, project_id: int):
        if not db:
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Database connection error")
        
        result = db.execute(select(Project).where(Project.id == project_id))
        project = result.scalars().first()

        if not project:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found")
        return project
    
    @classmethod
    def create_project(cls, db, project):
        if not db:
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Database connection error")
        
        new_project = Project(**project.model_dump())
        db.add(new_project)
        db.commit()
        db.refresh(new_project)
        return new_project