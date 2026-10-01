from typing import Annotated

from fastapi import APIRouter, status, Depends
from sqlalchemy.orm import Session

from db.schemas.visit_dto import VisitCreate, VisitEventResponse, VisitStats
from core.database import get_db
from services.visit_service import VisitService
from core.dependencies import get_visit_service, get_current_user
from db.models.users import User


db_depends = Annotated[Session, Depends(get_db)]
service_dep = Annotated[VisitService, Depends(get_visit_service)]
current_user_dep = Annotated[User, Depends(get_current_user)]


router = APIRouter()


@router.post("/", response_model=VisitEventResponse, name="record_visit", status_code=status.HTTP_201_CREATED)
def record_visit(visit: VisitCreate, db: db_depends, service: service_dep):
    """Registrar una visita anónima. Endpoint público (sin auth).

    Solo se acepta visitor_id + path; el timestamp lo asigna el
    servidor. Nunca se lee ni persiste IP o user-agent.
    """
    return service.record_visit(db, visit.visitor_id, visit.path)


@router.get("/stats", response_model=VisitStats, name="visit_stats")
def visit_stats(db: db_depends, service: service_dep, current_user: current_user_dep):
    """Agregados de usuarios únicos (hoy / 7d / 30d + serie). Solo admin."""
    return service.get_stats(db)
