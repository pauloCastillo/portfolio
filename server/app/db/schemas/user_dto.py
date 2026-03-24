import uuid
from pydantic import UUID4, BaseModel, Field, ConfigDict, field_validator, EmailStr
from datetime import datetime, UTC


class User_Schema(BaseModel): 
    username: str = Field(..., example="john_doe", capitalized=True)
    email:EmailStr = Field(..., example="johndoe@gmail.com")
    password:str = Field(...,example="password123")
    phone:str = Field(..., example="77777777")
    avatar_url: str | None = Field(None, example="avatar_image.jpg")

class UserDTO_Response(User_Schema):
    model_config = ConfigDict(from_attributes=True)

    id:UUID4 = Field(default_factory=lambda:uuid.uuid4().hex)
    isActive: bool = Field(default=True)
    # created_at: datetime = Field(default_factory=lambda:datetime.now(UTC).strftime("%d/%m/%Y"))
    # updated_at: datetime = Field(default_factory=lambda:datetime.now(UTC).strftime("%d/%m/%Y"))
    last_login: datetime = Field(default_factory=lambda:datetime.now(UTC))

    @field_validator("avatar_url", check_fields=True)
    @classmethod
    def ensure_path_images(cls, value):
        if value is not None and not value.startswith("/public/media/imgs/"):
            return f"/public/media/imgs/{value}"
        return value

class ProjectDTO_Update(User_Schema):
    pass

class ProjectDTO_Delete(User_Schema):
    pass