from app.services.base_service import BaseService
from app.repositories.project_repository import ProjectRepository


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
