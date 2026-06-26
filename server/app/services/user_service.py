import secrets
import hashlib
from dataclasses import dataclass
from datetime import datetime, timedelta, UTC

from services.base_service import BaseService
from repositories.user_repo import UserRepository
from core.security.password import get_password_hash, verify_password
from core.config import get_settings


@dataclass
class ResetTokenResult:
    email: str
    username: str
    token: str


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
        if hasattr(data, 'password') and data.password:
            hashed_password = get_password_hash(data.password)
            data_dict = data.model_dump(exclude={'password'})
            data_dict['password'] = hashed_password
            from db.schemas.user_dto import UserCreateStored
            hashed_data = UserCreateStored(**data_dict)
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

    def initiate_password_reset(self, db, email: str) -> ResetTokenResult | None:
        """
        Iniciar proceso de reseteo de contraseña.
        
        Genera un token seguro, almacena su hash en DB y retorna los datos
        necesarios para enviar el email. Retorna None si el usuario no existe
        o está inactivo (para prevenir enumeración).
        """
        user = self.get_by_email(db, email)
        if not user or not user.isActive:
            return None

        settings = get_settings()
        token = secrets.token_urlsafe(32)
        token_hash = hashlib.sha256(token.encode()).hexdigest()
        expires_at = datetime.now(UTC) + timedelta(
            minutes=settings.reset_token_expire_minutes
        )

        user.reset_token_hash = token_hash
        user.reset_token_expires_at = expires_at
        db.commit()

        return ResetTokenResult(
            email=user.email, username=user.username, token=token
        )

    def reset_password(self, db, token: str, new_password: str) -> bool:
        """
        Ejecutar reseteo de contraseña usando un token.
        
        1. Hashea el token con SHA-256
        2. Busca usuario por el hash
        3. Verifica expiración
        4. Actualiza contraseña y limpia campos de reseteo
        
        Returns:
            True si el reseteo fue exitoso, False si el token es inválido/expirado
        """
        token_hash = hashlib.sha256(token.encode()).hexdigest()
        user = self.repository.get_by_reset_token_hash(db, token_hash)

        if not user:
            return False

        hashed_password = get_password_hash(new_password)
        user.password = hashed_password
        user.reset_token_hash = None
        user.reset_token_expires_at = None
        db.commit()

        return True
