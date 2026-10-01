from pydantic import BaseModel, ConfigDict, Field, UUID4
from datetime import datetime


class VisitCreate(BaseModel):
    """Schema para registrar una visita desde el beacon público.

    Solo identidad anónima: nunca IP ni user-agent (el endpoint
    tampoco los lee, así que nada personal llega a persistirse).
    """

    visitor_id: UUID4 = Field(..., example="123e4567-e89b-12d3-a456-426614174000")
    path: str = Field(default="/", min_length=1, max_length=255, example="/blog/mi-post")


class VisitEventResponse(BaseModel):
    """Schema de respuesta tras registrar una visita."""

    model_config = ConfigDict(from_attributes=True)

    id: int
    visitor_id: UUID4
    path: str
    seen_at: datetime


class VisitDayPoint(BaseModel):
    """Unicos de un día concreto (fecha UTC, formato YYYY-MM-DD)."""

    date: str = Field(..., example="2026-09-30")
    uniques: int = Field(..., example=12)


class VisitStats(BaseModel):
    """Agregados de usuarios únicos + serie diaria de 30 días."""

    today: int = 0
    last_7d: int = 0
    last_30d: int = 0
    series: list[VisitDayPoint] = Field(default_factory=list)
