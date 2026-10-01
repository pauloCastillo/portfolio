"""Tests de endpoints de visitas: beacon público y stats solo-admin."""

from fastapi import status
from uuid import uuid4


class TestVisitEndpoints:
    def test_public_beacon_records_visit(self, client):
        response = client.post(
            "/api/v1/visits/",
            json={"visitor_id": str(uuid4()), "path": "/blog/mi-post"},
        )

        assert response.status_code == status.HTTP_201_CREATED
        body = response.json()
        assert body["path"] == "/blog/mi-post"
        assert "seen_at" in body

    def test_repeat_beacon_same_visitor_keeps_unique_count(self, client, auth_client):
        visitor_id = str(uuid4())

        client.post("/api/v1/visits/", json={"visitor_id": visitor_id, "path": "/"})
        client.post("/api/v1/visits/", json={"visitor_id": visitor_id, "path": "/"})

        stats = auth_client.get("/api/v1/visits/stats")
        assert stats.status_code == status.HTTP_200_OK
        assert stats.json()["today"] == 1

    def test_malformed_visitor_id_is_rejected(self, client):
        response = client.post(
            "/api/v1/visits/",
            json={"visitor_id": "not-a-uuid", "path": "/"},
        )

        assert response.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY

    def test_missing_visitor_id_is_rejected(self, client):
        response = client.post("/api/v1/visits/", json={"path": "/"})

        assert response.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY

    def test_stats_unauthenticated_is_rejected(self, client):
        response = client.get("/api/v1/visits/stats")

        assert response.status_code in (
            status.HTTP_401_UNAUTHORIZED,
            status.HTTP_403_FORBIDDEN,
        )

    def test_stats_empty_history_returns_zeros(self, auth_client):
        response = auth_client.get("/api/v1/visits/stats")

        assert response.status_code == status.HTTP_200_OK
        body = response.json()
        assert body["today"] == 0
        assert body["last_7d"] == 0
        assert body["last_30d"] == 0
        assert len(body["series"]) == 30

    def test_stats_reflects_three_distinct_visitors(self, client, auth_client):
        for _ in range(3):
            client.post(
                "/api/v1/visits/",
                json={"visitor_id": str(uuid4()), "path": "/"},
            )

        response = auth_client.get("/api/v1/visits/stats")

        assert response.status_code == status.HTTP_200_OK
        body = response.json()
        assert body["today"] == 3
        assert body["last_7d"] == 3
        assert body["last_30d"] == 3
