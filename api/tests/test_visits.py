"""Tests unitarios de VisitService: unicidad por día y agregados."""

from datetime import datetime, timedelta, UTC
from uuid import uuid4

from db.models.visits import VisitEvent
from services.visit_service import VisitService


def _seed(db_session, visitor_id: str, seen_at: datetime, path: str = "/"):
    event = VisitEvent(
        visitor_id=visitor_id,
        path=path,
        seen_at=seen_at.replace(tzinfo=None),
    )
    db_session.add(event)
    db_session.commit()
    return event


class TestVisitService:
    def test_empty_history_returns_zero_stats(self, db_session):
        stats = VisitService().get_stats(db_session)

        assert stats.today == 0
        assert stats.last_7d == 0
        assert stats.last_30d == 0
        assert len(stats.series) == 30
        assert all(point.uniques == 0 for point in stats.series)

    def test_repeat_beacon_same_day_counts_once(self, db_session):
        service = VisitService()
        visitor = str(uuid4())
        now = datetime.now(UTC)

        service.record_visit(db_session, visitor, "/")
        service.record_visit(db_session, visitor, "/blog")
        service.record_visit(db_session, visitor, "/")

        stats = service.get_stats(db_session, now=now)

        assert stats.today == 1
        assert stats.last_7d == 1
        assert stats.last_30d == 1

    def test_distinct_visitors_counted_each(self, db_session):
        service = VisitService()
        now = datetime.now(UTC)

        for _ in range(3):
            service.record_visit(db_session, str(uuid4()), "/")

        stats = service.get_stats(db_session, now=now)

        assert stats.today == 3
        assert stats.last_7d == 3
        assert stats.last_30d == 3

    def test_visitor_across_days_counts_once_in_window(self, db_session):
        service = VisitService()
        visitor = str(uuid4())
        now = datetime.now(UTC)

        _seed(db_session, visitor, now - timedelta(days=2))
        _seed(db_session, visitor, now - timedelta(days=1))
        _seed(db_session, visitor, now)

        stats = service.get_stats(db_session, now=now)

        assert stats.today == 1
        assert stats.last_7d == 1
        assert stats.last_30d == 1
        assert sum(point.uniques for point in stats.series) == 3

    def test_old_visits_fall_outside_30d_window(self, db_session):
        service = VisitService()
        now = datetime.now(UTC)

        _seed(db_session, str(uuid4()), now - timedelta(days=60))

        stats = service.get_stats(db_session, now=now)

        assert stats.today == 0
        assert stats.last_7d == 0
        assert stats.last_30d == 0

    def test_record_persists_only_anonymous_fields(self, db_session):
        service = VisitService()

        event = service.record_visit(db_session, str(uuid4()), "/projects/x")

        assert event.id is not None
        assert event.seen_at is not None
        assert set(event.__dict__) - {"_sa_instance_state"} == {
            "id",
            "visitor_id",
            "path",
            "seen_at",
        }
