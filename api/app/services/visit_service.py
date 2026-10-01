from datetime import datetime, timedelta, UTC

from db.schemas.visit_dto import VisitDayPoint, VisitStats
from repositories.visit_repo import VisitRepository

SERIES_DAYS = 30


def _as_utc(value: datetime) -> datetime:
    """Normalizar a aware-UTC (SQLite devuelve datetimes naive)."""
    if value.tzinfo is None:
        return value.replace(tzinfo=UTC)
    return value.astimezone(UTC)


class VisitService:
    """
    Service Pattern - Lógica de negocio para visitas anónimas.
    Unicidad = COUNT(DISTINCT visitor_id) en ventana; días en UTC.
    """

    def __init__(self):
        self.repository = VisitRepository()

    def record_visit(self, db, visitor_id, path: str):
        """Registrar un evento de visita (el timestamp lo pone el servidor)."""
        return self.repository.record(db, str(visitor_id), path or "/")

    def get_stats(self, db, now: datetime | None = None) -> VisitStats:
        """Agregados de únicos: hoy, últimos 7/30 días + serie diaria de 30 días."""
        now = _as_utc(now) if now is not None else datetime.now(UTC)
        today_start = now.replace(hour=0, minute=0, second=0, microsecond=0)
        window_start = today_start - timedelta(days=SERIES_DAYS - 1)

        events = self.repository.list_since(db, window_start.replace(tzinfo=None))

        # (fecha UTC, visitor_id) únicos por día
        seen: set[tuple[str, str]] = set()
        for event in events:
            day = _as_utc(event.seen_at).date().isoformat()
            seen.add((day, event.visitor_id))

        by_day: dict[str, set[str]] = {}
        for day, visitor_id in seen:
            by_day.setdefault(day, set()).add(visitor_id)

        today_key = today_start.date().isoformat()
        week_keys = {
            (today_start - timedelta(days=offset)).date().isoformat()
            for offset in range(7)
        }

        visitors_7d: set[str] = set()
        visitors_30d: set[str] = set()
        for day, visitor_id in seen:
            visitors_30d.add(visitor_id)
            if day in week_keys:
                visitors_7d.add(visitor_id)

        series = [
            VisitDayPoint(
                date=(today_start - timedelta(days=offset)).date().isoformat(),
                uniques=len(
                    by_day.get(
                        (today_start - timedelta(days=offset)).date().isoformat(),
                        set(),
                    )
                ),
            )
            for offset in range(SERIES_DAYS - 1, -1, -1)
        ]

        return VisitStats(
            today=len(by_day.get(today_key, set())),
            last_7d=len(visitors_7d),
            last_30d=len(visitors_30d),
            series=series,
        )
