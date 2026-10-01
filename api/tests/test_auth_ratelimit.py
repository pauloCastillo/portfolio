"""Task 3.2: rate-limit en auth (marca: unit)."""

import pytest


@pytest.mark.unit
def test_login_brute_force_is_throttled(client):
    for _ in range(5):
        r = client.post(
            "/api/v1/auth/login",
            json={"email": "nobody@example.com", "password": "wrongpass1"},
        )
        assert r.status_code == 401
    r = client.post(
        "/api/v1/auth/login",
        json={"email": "nobody@example.com", "password": "wrongpass1"},
    )
    assert r.status_code == 429
    assert "Retry-After" in r.headers


@pytest.mark.unit
def test_forgot_password_is_throttled(client):
    for _ in range(3):
        r = client.post(
            "/api/v1/auth/forgot-password",
            json={"email": "nobody@example.com"},
        )
        assert r.status_code == 200
    r = client.post(
        "/api/v1/auth/forgot-password",
        json={"email": "nobody@example.com"},
    )
    assert r.status_code == 429


@pytest.mark.unit
def test_normal_auth_traffic_passes(client, test_user):
    r = client.post(
        "/api/v1/auth/login",
        json={"email": test_user.email, "password": "testpassword123"},
    )
    assert r.status_code == 200
    assert "access_token" in r.json()
