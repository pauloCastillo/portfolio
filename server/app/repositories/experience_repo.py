from domain.generic_repository import GenericRepository
from db.models.experience import Experience


class ExperienceRepository(GenericRepository[Experience]):
    """
    Repository Pattern - Implementación específica para Experience.
    """

    def __init__(self):
        super().__init__(Experience)

    def get_by_company(self, db, company: str):
        """Método específico del dominio para buscar experiencias por compañía."""
        from sqlalchemy import select

        result = db.execute(
            select(self.model).where(self.model.company == company)
        )
        return result.scalars().first()

    def get_current_experiences(self, db):
        """Método específico del dominio para obtener experiencias actuales."""
        from sqlalchemy import select
        from datetime import datetime

        result = db.execute(
            select(self.model).where(
                (self.model.end_date == None) |
                (self.model.end_date >= datetime.now())
            )
        )
        return result.scalars().all()
