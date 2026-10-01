from sqlalchemy import select

from db.models.visits import VisitEvent


class VisitRepository:
    """
    Repository Pattern - Persistencia de eventos de visita anónimos.
    Solo guarda visitor_id + path + seen_at: nunca IP ni user-agent.
    """

    def record(self, db, visitor_id: str, path: str) -> VisitEvent:
        """Persistir un evento de visita con timestamp asignado por el servidor."""
        event = VisitEvent(visitor_id=visitor_id, path=path or "/")
        db.add(event)
        db.commit()
        db.refresh(event)
        return event

    def list_since(self, db, since) -> list[VisitEvent]:
        """Listar eventos con seen_at >= since (cálculos de unicidad en servicio)."""
        result = db.execute(
            select(VisitEvent).where(VisitEvent.seen_at >= since)
        )
        return list(result.scalars().all())
