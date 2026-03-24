
from pydantic import BaseModel, Field, ConfigDict
from datetime import datetime, UTC

class Skill_Schema(BaseModel):
    name: str = Field(..., example="Python")
    level: str | None = Field(..., example="medium")

class SkillDTO_Response(Skill_Schema):
    model_config = ConfigDict(from_attributes=True)

    id: int = Field(..., example=1)
    # user_id: str = Field(..., example="uuid")
    update_at: datetime = Field(default_factory=lambda: datetime.now(UTC))

class SkillDTO_Update(Skill_Schema):
    pass

class SkillDTO_Delete(Skill_Schema):
    pass