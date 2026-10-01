from domain.generic_repository import GenericRepository
from db.models.techs import Technology


class TechRepository(GenericRepository[Technology]):
    """
    Repository Pattern - Implementación específica para Technology.
    """

    def __init__(self):
        super().__init__(Technology)
