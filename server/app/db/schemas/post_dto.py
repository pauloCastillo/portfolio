from pydantic import BaseModel, Field, ConfigDict, field_validator
from datetime import datetime, UTC

class Post_Schema(BaseModel):
    title: str = Field(..., example="My Awesome Post")
    description: str = Field(..., example="A brief description of the post")
    image_file: str | None = Field(None, example="post_image.jpg")
    post_link: str | None = Field(None, example="https://example.com/post")
    tech_stack: str = Field(..., example="Python, React, PostgreSQL")

class PostDTO_Response(Post_Schema):
    model_config = ConfigDict(from_attributes=True)

    id: int = Field(..., example=1)
    author_id: str = Field(..., example="uuid")
    published: bool = Field(default=True, example=True)
    updated_at: datetime = Field(default_factory=lambda: datetime.now(UTC))

    @field_validator("image_file", check_fields=True)
    @classmethod
    def ensure_path_images(cls, value):
        if value is not None and not value.startswith("public/media"):
            return f"public/media/{value}"
        return value

class PostDTO_Update(Post_Schema):
    pass

class PostDTO_Delete(Post_Schema):
    pass    
