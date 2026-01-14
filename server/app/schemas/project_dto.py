from pydantic import BaseModel, Field, field_validator
from datetime import datetime


class ProjectDTO(BaseModel):
    id: int = Field(
        gt=0, description="The unique identifier for the project", default=None)
    title: str
    media: str
    description: str
    tech_stack: str
    github_link: str
    demo_link: str
    category: str
    created_at: str

    @field_validator('created_at')
    def validate_created_at(cls, value):
        try:
            datetime.strptime(value, "%d/%m/%Y")
        except ValueError:
            raise ValueError("created_at must be in the format DD/MM/YYYY")
        return value
