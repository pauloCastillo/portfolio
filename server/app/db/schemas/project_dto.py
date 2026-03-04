
from uuid import UUID

from pydantic import BaseModel, Field, ConfigDict, field_validator
from datetime import datetime, UTC


class Projects_Schema(BaseModel): 
    title: str = Field(..., example="My Awesome Project")
    description: str = Field(..., example="A brief description of the project")
    image_file: str | None = Field(None, example="project_image.jpg")
    project_link: str | None = Field(None, example="https://example.com/project")
    github_link: str = Field(..., example="https://github.com/user/project")
    tech_stack: str = Field(..., example="Python, React, PostgreSQL")

class ProjectDTO_Create(Projects_Schema):
    pass

class ProjectDTO_Response(Projects_Schema):
    model_config = ConfigDict(from_attributes=True)

    id: int = Field(..., example=1)
    user_id: UUID = Field(..., example="123e4567-e89b-12d3-a456-426614174000")
    published: bool = Field(default=True, example=True)
    created_at: datetime = Field(default_factory=lambda: datetime.now(UTC).strftime("%d/%m/%Y")) 
    updated_at: datetime = Field(default_factory=lambda: datetime.now(UTC).strftime("%d/%m/%Y"))

    @field_validator("image_file", check_fields=True)
    @classmethod
    def ensure_path_images(cls, value):
        if value is not None and not value.startswith("public/media"):
            return f"public/media/{value}"
        return value

class ProjectDTO_Update(Projects_Schema):
    pass

class ProjectDTO_Delete(Projects_Schema):
    pass