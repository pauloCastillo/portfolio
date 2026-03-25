from app.domain.generic_repository import GenericRepository
from app.db.models.users import User


class UserRepository(GenericRepository[User]):
    """
    Repository Pattern - Implementación específica para User.
    """

    def __init__(self):
        super().__init__(User)

    def get_by_email(self, db, email: str):
        """Método específico del dominio para buscar usuario por email."""
        from sqlalchemy import select

        result = db.execute(
            select(self.model).where(self.model.email == email)
        )
        return result.scalars().first()

    def get_active_users(self, db):
        """Método específico del dominio para obtener usuarios activos."""
        from sqlalchemy import select

        result = db.execute(
            select(self.model).where(self.model.isActive == True)
        )
        return result.scalars().all()
