"""
Auth Reset Tests - Tests de integración para forgot/reset password.
"""

import pytest
from fastapi import status
from datetime import datetime, UTC, timedelta
import secrets
import hashlib


class TestForgotPassword:
    """Tests para POST /api/v1/auth/forgot-password."""

    def test_valid_email_returns_200(self, client, test_user):
        """Escenario: Email válido registrado retorna 200."""
        response = client.post(
            "/api/v1/auth/forgot-password",
            json={"email": test_user.email},
        )
        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        assert "message" in data

    def test_unknown_email_returns_200(self, client):
        """Escenario: Email no registrado retorna mismo 200."""
        response = client.post(
            "/api/v1/auth/forgot-password",
            json={"email": "unknown@example.com"},
        )
        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        assert "message" in data

    def test_invalid_email_format_returns_422(self, client):
        """Escenario: Email malformado retorna 422."""
        response = client.post(
            "/api/v1/auth/forgot-password",
            json={"email": "not-an-email"},
        )
        assert response.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY

    def test_consecutive_requests_refresh_token(self, client, test_user, db_session):
        """Escenario: Solicitudes consecutivas refrescan el token."""
        client.post(
            "/api/v1/auth/forgot-password",
            json={"email": test_user.email},
        )
        first_hash = test_user.reset_token_hash

        client.post(
            "/api/v1/auth/forgot-password",
            json={"email": test_user.email},
        )
        db_session.refresh(test_user)
        second_hash = test_user.reset_token_hash

        assert first_hash is not None
        assert second_hash is not None
        assert first_hash != second_hash


class TestResetPassword:
    """Tests para POST /api/v1/auth/reset-password."""

    def test_valid_token_resets_password(self, client, test_user, db_session):
        """Escenario: Token válido resetea la contraseña."""
        token = secrets.token_urlsafe(32)
        token_hash = hashlib.sha256(token.encode()).hexdigest()
        expires_at = datetime.now(UTC) + timedelta(minutes=15)

        test_user.reset_token_hash = token_hash
        test_user.reset_token_expires_at = expires_at
        db_session.commit()

        response = client.post(
            "/api/v1/auth/reset-password",
            json={"token": token, "new_password": "newsecurepass456"},
        )
        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        assert data["message"] == "Password reset successful"

        db_session.refresh(test_user)
        assert test_user.reset_token_hash is None
        assert test_user.reset_token_expires_at is None

    def test_expired_token_returns_400(self, client, test_user, db_session):
        """Escenario: Token expirado retorna 400."""
        token = secrets.token_urlsafe(32)
        token_hash = hashlib.sha256(token.encode()).hexdigest()
        expires_at = datetime.now(UTC) - timedelta(minutes=1)

        test_user.reset_token_hash = token_hash
        test_user.reset_token_expires_at = expires_at
        db_session.commit()

        response = client.post(
            "/api/v1/auth/reset-password",
            json={"token": token, "new_password": "newsecurepass456"},
        )
        assert response.status_code == status.HTTP_400_BAD_REQUEST
        assert response.json()["detail"] == "Invalid or expired reset token"

    def test_already_used_token_returns_400(self, client, test_user, db_session):
        """Escenario: Token ya usado retorna 400."""
        token = secrets.token_urlsafe(32)
        token_hash = hashlib.sha256(token.encode()).hexdigest()
        expires_at = datetime.now(UTC) + timedelta(minutes=15)

        test_user.reset_token_hash = token_hash
        test_user.reset_token_expires_at = expires_at
        db_session.commit()

        client.post(
            "/api/v1/auth/reset-password",
            json={"token": token, "new_password": "newsecurepass456"},
        )

        response = client.post(
            "/api/v1/auth/reset-password",
            json={"token": token, "new_password": "anotherpass789"},
        )
        assert response.status_code == status.HTTP_400_BAD_REQUEST

    def test_invalid_token_returns_400(self, client):
        """Escenario: Token inválido retorna 400."""
        response = client.post(
            "/api/v1/auth/reset-password",
            json={"token": "invalidtoken123", "new_password": "newsecurepass456"},
        )
        assert response.status_code == status.HTTP_400_BAD_REQUEST

    def test_weak_password_returns_422(self, client):
        """Escenario: Contraseña débil retorna 422."""
        response = client.post(
            "/api/v1/auth/reset-password",
            json={"token": "sometoken", "new_password": "short"},
        )
        assert response.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY


class TestAuthRemainsUnchanged:
    """Tests que la autenticación existente sigue funcionando."""

    def test_login_still_works(self, client, test_user):
        """Escenario: Login sigue funcionando."""
        response = client.post(
            "/api/v1/auth/login",
            json={"email": test_user.email, "password": "testpassword123"},
        )
        assert response.status_code == status.HTTP_200_OK
        assert "access_token" in response.json()

    def test_login_after_password_reset(self, client, test_user, db_session):
        """Escenario: Login funciona con nueva contraseña tras reseteo."""
        token = secrets.token_urlsafe(32)
        token_hash = hashlib.sha256(token.encode()).hexdigest()
        expires_at = datetime.now(UTC) + timedelta(minutes=15)

        test_user.reset_token_hash = token_hash
        test_user.reset_token_expires_at = expires_at
        db_session.commit()

        new_password = "newsecurepass456"
        client.post(
            "/api/v1/auth/reset-password",
            json={"token": token, "new_password": new_password},
        )

        response = client.post(
            "/api/v1/auth/login",
            json={"email": test_user.email, "password": new_password},
        )
        assert response.status_code == status.HTTP_200_OK
        assert "access_token" in response.json()

    def test_validate_token_still_works(self, token, client):
        """Escenario: Validación de token sigue funcionando."""
        response = client.post(
            "/api/v1/auth/validate",
            headers={"Authorization": f"Bearer {token}"},
        )
        assert response.status_code == status.HTTP_200_OK
        assert response.json()["valid"] is True
