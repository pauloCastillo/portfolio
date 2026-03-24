from pydantic import BaseModel, Field, ConfigDict, field_validator
from datetime import datetime, UTC

class Experience_Schema(BaseModel):
    company:str = Field(..., example="My Company")
    role:str = Field(..., example="Software Engineer")
    description:str = Field(..., example="A brief description of the experience")
    start_date:datetime = Field(..., example="2022-01-01")
    end_date:datetime = Field(..., example="2022-12-31")
    url:str | None = Field(None, example="https://example.com/experience")
    tech_stack: str = Field(..., example="Python, React, PostgreSQL")

class ExperienceDTO_Response(Experience_Schema):
    model_config = ConfigDict(from_attributes=True)

    id: int = Field(..., example=1)
    author_id: str = Field(..., example="uuid")
    published: bool = Field(default=True, example=True)
    updated_at: datetime = Field(default_factory=lambda: datetime.now(UTC))

    @field_validator("url", check_fields=True)
    @classmethod
    def ensure_path_images(cls, value):
        if value is not None and not value.startswith("http://"|"https://"):
            return f"{value} url not valid, try again with http:// or https://"
        return value

class ExperienceDTO_Update(Experience_Schema):
    pass

class ExperienceDTO_Delete(Experience_Schema):
    pass    
