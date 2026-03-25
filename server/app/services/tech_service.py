from app.services.base_service import BaseService
from app.repositories.tech_repo import TechRepository


class TechService(BaseService[TechRepository]):
    """
    Service Pattern - Lógica de negocio para Technology.
    """

    def __init__(self):
        super().__init__(TechRepository())
