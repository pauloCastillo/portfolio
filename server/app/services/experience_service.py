from services.base_service import BaseService
from repositories.experience_repo import ExperienceRepository


class ExperienceService(BaseService[ExperienceRepository]):
    """
    Service Pattern - Lógica de negocio para Experience.
    """

    def __init__(self):
        super().__init__(ExperienceRepository())

    def get_by_company(self, db, company: str):
        """Buscar experiencias por compañía."""
        return self.repository.get_by_company(db, company)

    def get_current_experiences(self, db):
        """Obtener experiencias actuales."""
        return self.repository.get_current_experiences(db)
