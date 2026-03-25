from app.domain.generic_repository import GenericRepository
from app.db.models.projects import Project


class ProjectRepository(GenericRepository[Project]):
    """
    Repository Pattern - Implementación específica para Project.
    Hereda toda la lógica CRUD del GenericRepository (DRY principle).
    """

    def __init__(self):
        super().__init__(Project)

    def get_published_projects(self, db):
        """Método específico del dominio para obtener proyectos publicados."""
        from sqlalchemy import select
        from sqlalchemy import true

        result = db.execute(
            select(self.model).where(self.model.published == True)
        )
        return result.scalars().all()
