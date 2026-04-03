from services.base_service import BaseService
from repositories.user_repo import UserRepository
from core.security.password import get_password_hash, verify_password


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

    def create(self, db, data):
        """
        Crear nuevo usuario con hashing de contraseña.
        """
        # Hash the password before creating the user
        if hasattr(data, 'password') and data.password:
            hashed_password = get_password_hash(data.password)
            # Create a copy of the data with the hashed password
            data_dict = data.model_dump()
            data_dict['password'] = hashed_password
            # We need to reconstruct the data object since UserCreate doesn't have a constructor from dict
            from db.schemas.user_dto import UserCreate
            hashed_data = UserCreate(**data_dict)
            return self.repository.create(db, hashed_data)
        return self.repository.create(db, data)

    def authenticate(self, db, email: str, password: str):
        """
        Autenticar usuario verificando email y contraseña.
        
        Args:
            db: Sesión de base de datos
            email: Email del usuario
            password: Contraseña en texto plano
            
        Returns:
            Usuario si la autenticación es exitosa, None en caso contrario
        """
        user = self.get_by_email(db, email)
        if not user:
            return None
        if not verify_password(password, user.password):
            return None
        return user
