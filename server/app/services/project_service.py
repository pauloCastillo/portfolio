from services.base_service import BaseService
from repositories.project_repo import ProjectRepository


class ProjectService(BaseService[ProjectRepository]):
    """
    Service Pattern - Lógica de negocio para Project.
    Sigue el principio de Single Responsibility (SRP).
    """

    def __init__(self):
        super().__init__(ProjectRepository())

    def get_published_projects(self, db):
        """Obtener solo proyectos publicados."""
        return self.repository.get_published_projects(db)
    
    def get_published_project_by_id(self, db, id: int):
        """Obtener proyecto publicado por ID."""
        return self.repository.get_published_project_by_id(db, id)
