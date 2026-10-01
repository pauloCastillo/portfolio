from fastapi import HTTPException, status

from domain.generic_repository import GenericRepository
from db.models.projects import Project


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

        result = db.execute(
            select(self.model).where(self.model.published == True)
        )
        return result.scalars().all()
    
    def get_published_project_by_id(self, db, id: int):
        """Obtener proyecto publicado por ID con manejo uniforme de errores."""
        from sqlalchemy import select

        try:
            result = db.execute(
                select(self.model).where(self.model.id == id, self.model.published == True)
            )
            item = result.scalars().first()

            if not item:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail=f"Published {self.model.__name__} not found"
                )
            return item
        except HTTPException:
            raise
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Database error: {str(e)}"
            )