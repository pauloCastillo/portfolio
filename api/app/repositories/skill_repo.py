from domain.generic_repository import GenericRepository
from db.models.skills import Skill


class SkillRepository(GenericRepository[Skill]):
    """
    Repository Pattern - Implementación específica para Skill.
    """

    def __init__(self):
        super().__init__(Skill)

    def get_by_level(self, db, level: int):
        """Método específico del dominio para obtener skills por nivel."""
        from sqlalchemy import select

        result = db.execute(
            select(self.model).where(self.model.level == level)
        )
        return result.scalars().all()
