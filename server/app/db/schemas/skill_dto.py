from pydantic import BaseModel, Field, ConfigDict, field_validator
from datetime import datetime, UTC


class SkillBase(BaseModel):
    """Schema base para Skill - campos compartidos."""
    name: str = Field(..., min_length=1, max_length=255, example="Python")
    level: int = Field(..., ge=1, le=100, example=80)


class SkillCreate(SkillBase):
    """Schema para crear skill."""
    pass


class SkillResponse(SkillBase):
    """Schema para respuesta de skill."""
    model_config = ConfigDict(from_attributes=True)

    updated_at: datetime = Field(default_factory=lambda: datetime.now(UTC))



class SkillUpdate(BaseModel):
    """Schema para actualizar skill - todos los campos opcionales."""
    name: str | None = Field(None, min_length=1, max_length=255)
    level: int | None = Field(None, ge=1, le=100)
