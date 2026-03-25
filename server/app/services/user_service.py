from app.services.base_service import BaseService
from app.repositories.user_repo import UserRepository


class UserService(BaseService[UserRepository]):
    """
    Service Pattern - Lógica de negocio para User.
    """

    def __init__(self):
        super().__init__(UserRepository())

    def get_active_users(self, db):
        """Obtener solo usuarios activos."""
        return self.repository.get_active_users(db)

    def get_by_email(self, db, email: str):
        """Buscar usuario por email."""
        return self.repository.get_by_email(db, email)
