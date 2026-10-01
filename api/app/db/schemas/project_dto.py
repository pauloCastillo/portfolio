from uuid import UUID
from pydantic import BaseModel, Field, ConfigDict, field_validator
from datetime import datetime, UTC

from pytest import mark


class ProjectBase(BaseModel):
    """Schema base para Project - campos compartidos."""
    title: str = Field(..., min_length=1, max_length=255, example="My Awesome Project")
    description: str = Field(..., min_length=1, example="A brief description of the project")
    content: str | None = Field(None, example="# Project Title\n\nMarkdown content here...")
    image_file: str | None = Field(None, example="project_image.jpg")
    project_link: str | None = Field(None, example="https://example.com/project")
    github_link: str | None = Field(None, example="https://github.com/user/project")
    tech_stack: str | None = Field(None, example="Python, React, PostgreSQL")


class ProjectCreate(ProjectBase):
    """Schema para crear proyecto.

    `user_id` es opcional en el contrato cliente-servidor: el endpoint lo
    resuelve siempre desde la sesión (`current_user`) e ignora el valor
    que envíe el cliente. Se normaliza a `str` porque las columnas
    (`String` FK) y el repositorio (`Model(**data.model_dump())`) esperan
    texto plano, no objetos `UUID`.
    """
    user_id: str | None = Field(default=None, example="123e4567-e89b-12d3-a456-426614174000")
    published: bool = Field(default=True, example=True)

    @field_validator("user_id", mode="before")
    @classmethod
    def coerce_user_id(cls, value: UUID | str | None) -> str | None:
        """Acepta `UUID` o `str` y normaliza siempre a `str`."""
        if value is None:
            return None
        return str(value)


class ProjectResponse(ProjectBase):
    """Schema para respuesta de proyecto."""
    model_config = ConfigDict(from_attributes=True)

    id: int = Field(..., example=1)
    user_id: UUID = Field(..., example="123e4567-e89b-12d3-a456-426614174000")
    published: bool = Field(default=True, example=True)
    published_date: datetime = Field(default_factory=lambda: datetime.now(UTC))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(UTC))

    @field_validator("image_file")
    @classmethod
    def ensure_image_path(cls, value: str | None) -> str | None:
        """Validador para asegurar path correcto de imágenes."""
        if value and not value.startswith("/public/media/"):
            return f"/public/media/{value}"
        return value


class ProjectUpdate(BaseModel):
    """Schema para actualizar proyecto - todos los campos opcionales."""
    title: str | None = Field(None, min_length=1, max_length=255, markdown_description="# Title of the project")
    description: str | None = Field(None, min_length=1)
    content: str | None = Field(None, description="Markdown content of the project")
    image_file: str | None = None
    project_link: str | None = None
    github_link: str | None = None
    tech_stack: str | None = None
    published: bool | None = None
