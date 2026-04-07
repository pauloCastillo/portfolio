from pydantic import UUID4, BaseModel, Field, ConfigDict, field_validator, EmailStr
from datetime import datetime, UTC


class UserBase(BaseModel):
    """Schema base para User - campos compartidos."""
    username: str = Field(..., min_length=1, max_length=255, example="john_doe")
    email: EmailStr = Field(..., example="johndoe@gmail.com")
    phone: str = Field(..., min_length=10, max_length=20, example="+1234567890")
    avatar_url: str | None = Field(None, example="avatar.jpg")


class UserCreate(UserBase):
    """Schema para crear usuario."""
    password: str = Field(..., min_length=8, max_length=20, example="SecurePass123!")


class UserLogin(BaseModel):
    """Schema para inicio de sesión de usuario."""
    email: EmailStr = Field(..., example="johndoe@gmail.com")
    password: str = Field(..., min_length=8, max_length=20, example="SecurePass123!")


class UserResponse(UserBase):
    """Schema para respuesta de usuario."""
    model_config = ConfigDict(from_attributes=True)

    id: UUID4 = Field(default_factory=UUID4.hex)
    isActive: bool = Field(default=True)
    last_login: datetime = Field(default_factory=lambda: datetime.now(UTC))

    @field_validator("avatar_url")
    @classmethod
    def ensure_image_path(cls, value: str | None) -> str | None:
        """Validador para asegurar path correcto de imágenes."""
        if value and not value.startswith("/public/media/"):
            return f"/public/media/{value}"
        return value

class Token(BaseModel):
    """Schema para token de acceso."""
    access_token: str
    token_type: str


class UserUpdate(BaseModel):
    """Schema para actualizar usuario - todos los campos opcionales."""
    username: str | None = Field(None, min_length=1, max_length=255)
    email: EmailStr | None = None
    phone: str | None = Field(None, min_length=10, max_length=20)
    avatar_url: str | None = None
    isActive: bool | None = None
