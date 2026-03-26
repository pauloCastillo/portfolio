
from pydantic import BaseModel, Field, ConfigDict, field_validator, UUID4
from datetime import datetime, UTC


class PostBase(BaseModel):
    """Schema base para Post - campos compartidos."""
    title: str = Field(..., min_length=1, max_length=255, example="My Awesome Post")
    content: str = Field(..., min_length=1, example="Post content here")
    image_file: str | None = Field(None, example="post_image.jpg")


class PostCreate(PostBase):
    """Schema para crear post."""
    author_id: UUID4 = Field(..., example="123e4567-e89b-12d3-a456-426614174000")
    published: bool = Field(default=True, example=True)


class PostResponse(PostBase):
    """Schema para respuesta de post."""
    model_config = ConfigDict(from_attributes=True)

    author_id: UUID4 = Field(..., example="123e4567-e89b-12d3-a456-426614174000")
    published: bool = Field(default=True, example=True)
    published_date: datetime = Field(default_factory=lambda: datetime.now(UTC))

    @field_validator("image_file")
    @classmethod
    def ensure_image_path(cls, value: str | None) -> str | None:
        """Validador para asegurar path correcto de imágenes."""
        if value and not value.startswith("/public/media/"):
            return f"/public/media/{value}"
        return value


class PostUpdate(BaseModel):
    """Schema para actualizar post - todos los campos opcionales."""
    title: str | None = Field(None, min_length=1, max_length=255)
    content: str | None = Field(None, min_length=1)
    image_file: str | None = None
    published: bool | None = None
