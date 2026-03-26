
from pydantic import BaseModel, Field, ConfigDict, field_validator, UUID4
from datetime import datetime, UTC


class ExperienceBase(BaseModel):
    """Schema base para Experience - campos compartidos."""
    company: str = Field(..., min_length=1, max_length=255, example="My Company")
    role: str = Field(..., min_length=1, max_length=255, example="Software Engineer")
    description: str = Field(..., min_length=1, example="Job description")
    start_date: datetime = Field(..., example="2022-01-01")
    end_date: datetime | None = Field(None, example="2022-12-31")
    url: str | None = Field(None, example="https://example.com")

    @field_validator("url")
    @classmethod
    def validate_url(cls, value: str | None) -> str | None:
        """Validador para URLs."""
        if value and not value.startswith(("http://", "https://")):
            raise ValueError("URL must start with http:// or https://")
        return value


class ExperienceCreate(ExperienceBase):
    """Schema para crear experiencia."""
    user_id: UUID4 = Field(..., example="123e4567-e89b-12d3-a456-426614174000")
    published: bool = Field(default=True, example=True)


class ExperienceResponse(ExperienceBase):
    """Schema para respuesta de experiencia."""
    model_config = ConfigDict(from_attributes=True)

    user_id: UUID4 = Field(..., example="123e4567-e89b-12d3-a456-426614174000")
    published: bool = Field(default=True, example=True)
    updated_at: datetime = Field(default_factory=lambda: datetime.now(UTC))


class ExperienceUpdate(BaseModel):
    """Schema para actualizar experiencia - todos los campos opcionales."""
    company: str | None = Field(None, min_length=1, max_length=255)
    role: str | None = Field(None, min_length=1, max_length=255)
    description: str | None = Field(None, min_length=1)
    start_date: datetime | None = None
    end_date: datetime | None = None
    url: str | None = None
    published: bool | None = None
