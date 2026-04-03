from services.base_service import BaseService
from repositories.skill_repo import SkillRepository


class SkillService(BaseService[SkillRepository]):
    """
    Service Pattern - Lógica de negocio para Skill.
    """

    def __init__(self):
        super().__init__(SkillRepository())

    def get_by_level(self, db, level: int):
        """Obtener skills por nivel."""
        return self.repository.get_by_level(db, level)
