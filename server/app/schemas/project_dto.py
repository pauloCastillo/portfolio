from pydantic import BaseModel, Field, ConfigDict, field_validator
from datetime import datetime, UTC


class Projects_DTO(BaseModel): 
    title: str = Field(..., example="My Awesome Project")
    description: str = Field(..., example="A brief description of the project")
    tech_stack: str = Field(..., example="Python, React, PostgreSQL")
    github_link: str = Field(..., example="https://github.com/user/project")
    demo_link: str = Field(..., example="https://demo.example.com")
    category: str = Field(..., example="Web Development")

class Project_Create(Projects_DTO):
    pass

class Project_Response(Projects_DTO):
    model_config = ConfigDict(from_attributes=True)

    id: int = Field(..., example=1)
    media: str | None = Field(None, example="project_image.jpg")
    created_at: datetime = Field(default_factory=lambda: datetime.now(UTC).strftime("%d/%m/%Y")) 
    updated_at: datetime = Field(default_factory=lambda: datetime.now(UTC).strftime("%d/%m/%Y"))

    @field_validator("media", check_fields=True)
    @classmethod
    def ensure_path_images(cls, value):
        if value is not None and not value.startswith("static/media"):
            return f"static/media/{value}"
        return value

class Project_Update(Projects_DTO):
    pass