from pydantic import BaseModel, Field, ConfigDict, field_validator
from datetime import datetime, UTC


class TechBase(BaseModel):
    """Schema base para Technology - campos compartidos."""
    name: str = Field(..., min_length=1, max_length=255, example="Python")
    icon_tech: str | None = Field(None, example="python.png")


class TechCreate(TechBase):
    """Schema para crear tecnología."""
    pass


class TechResponse(TechBase):
    """Schema para respuesta de tecnología."""
    model_config = ConfigDict(from_attributes=True)

    id: int = Field(..., example=1)
    updated_at: datetime = Field(default_factory=lambda: datetime.now(UTC))

    @field_validator("icon_tech")
    @classmethod
    def ensure_image_path(cls, value: str | None) -> str | None:
        """Validador para asegurar path correcto de imágenes."""
        if value and not value.startswith("/public/media/"):
            return f"/public/media/{value}"
        return value


class TechUpdate(BaseModel):
    """Schema para actualizar tecnología - todos los campos opcionales."""
    name: str | None = Field(None, min_length=1, max_length=255)
    icon_tech: str | None = None
