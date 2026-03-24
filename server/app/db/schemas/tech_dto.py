
from pydantic import BaseModel, Field, ConfigDict, field_validator
from datetime import datetime, UTC

class Tech_Schema(BaseModel):
    name: str = Field(..., example="Python")
    icon_tech: str | None = Field(..., example="python.png")

class TechDTO_Response(Tech_Schema):
    model_config = ConfigDict(from_attributes=True)

    id: int = Field(..., example=1)
    update_at: datetime = Field(default_factory=lambda: datetime.now(UTC))

    @field_validator("icon_tech", check_fields=True)
    @classmethod
    def ensure_path_images(cls, value):
        if value is not None and not value.startswith("/public/media/imgs/"):
            return f"/public/media/imgs/{value}"
        return value

class TechDTO_Update(Tech_Schema):
    pass

class TechDTO_Delete(Tech_Schema):
    pass