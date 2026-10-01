"""
Endpoint Tests - Tests de integración para los endpoints de la API.
"""

from uuid import uuid4

import pytest
from fastapi import status


class TestProjectEndpoints:
    """Tests para endpoints de proyectos."""

    def test_read_projects(self, auth_client, test_project):
        """Test que GET /projects retorna lista de proyectos."""
        response = auth_client.get("/api/v1/projects/")
        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        assert isinstance(data, list)
        assert len(data) == 1
        assert data[0]["title"] == "Test Project"

    def test_read_project_by_id(self, auth_client, test_project):
        """Test que GET /projects/{id} retorna proyecto específico."""
        response = auth_client.get(f"/api/v1/projects/{test_project.id}")
        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        assert data["id"] == test_project.id
        assert data["title"] == "Test Project"

    def test_read_project_not_found(self, auth_client):
        """Test que GET /projects/{id} retorna 404 cuando no existe."""
        response = auth_client.get("/api/v1/projects/9999")
        assert response.status_code == status.HTTP_404_NOT_FOUND

    def test_create_project(self, auth_client, test_user):
        """Test que POST /projects crea nuevo proyecto."""
        payload = {
            "user_id": str(test_user.id),
            "title": "New Project",
            "description": "New Description",
            "tech_stack": "Python, Django",
        }
        response = auth_client.post("/api/v1/projects/", json=payload)
        assert response.status_code == status.HTTP_201_CREATED
        data = response.json()
        assert data["title"] == "New Project"

    def test_create_project_without_user_id_uses_session_owner(self, auth_client, test_user):
        """Test que POST /projects sin user_id asigna el dueño de la sesión."""
        payload = {
            "title": "Ownerless Project",
            "description": "Sin user_id",
            "published": False,
        }
        response = auth_client.post("/api/v1/projects/", json=payload)
        assert response.status_code == status.HTTP_201_CREATED
        data = response.json()
        assert data["user_id"] == str(test_user.id)

    def test_create_project_ignores_client_user_id(self, auth_client, test_user):
        """Test que POST /projects ignora el user_id enviado por el cliente."""
        payload = {
            "user_id": str(uuid4()),
            "title": "Spoofed Project",
            "description": "user_id ajeno",
        }
        response = auth_client.post("/api/v1/projects/", json=payload)
        assert response.status_code == status.HTTP_201_CREATED
        data = response.json()
        assert data["user_id"] == str(test_user.id)

    def test_create_project_unauthenticated(self, client):
        """Test que POST /projects sin credenciales responde 401."""
        payload = {"title": "No Auth", "description": "Sin token"}
        response = client.post("/api/v1/projects/", json=payload)
        assert response.status_code == status.HTTP_401_UNAUTHORIZED

    def test_update_project(self, auth_client, test_project):
        """Test que PUT /projects/{id} actualiza proyecto."""
        payload = {"title": "Updated Title"}
        response = auth_client.put(f"/api/v1/projects/{test_project.id}", json=payload)
        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        assert data["title"] == "Updated Title"

    def test_delete_project(self, auth_client, test_project):
        """Test que DELETE /projects/{id} elimina proyecto."""
        response = auth_client.delete(f"/api/v1/projects/{test_project.id}")
        assert response.status_code == status.HTTP_204_NO_CONTENT


class TestUserEndpoints:
    """Tests para endpoints de usuarios."""

    def test_read_users(self, auth_client, test_user):
        """Test que GET /users retorna lista de usuarios."""
        response = auth_client.get("/api/v1/users/")
        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        assert isinstance(data, list)
        assert len(data) == 1
        assert data[0]["username"] == "testuser"

    def test_read_user_by_id(self, auth_client, test_user):
        """Test que GET /users/{id} retorna usuario específico."""
        response = auth_client.get(f"/api/v1/users/{test_user.id}")
        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        assert data["username"] == "testuser"

    def test_read_user_not_found(self, auth_client):
        """Test que GET /users/{id} retorna 404 cuando no existe."""
        response = auth_client.get("/api/v1/users/9999")
        assert response.status_code == status.HTTP_404_NOT_FOUND

    def test_create_user(self, auth_client):
        """Test que POST /users crea nuevo usuario (requiere auth)."""
        payload = {
            "username": "newuser",
            "email": "new@example.com",
            "password": "securepassword123",
            "phone": "+1234567890",
        }
        response = auth_client.post("/api/v1/users/", json=payload)
        assert response.status_code == status.HTTP_201_CREATED
        data = response.json()
        assert data["username"] == "newuser"
        assert data["email"] == "new@example.com"

    def test_create_user_without_phone(self, auth_client):
        """Test que POST /users acepta payload sin phone (phone opcional)."""
        payload = {
            "username": "nophone",
            "email": "nophone@example.com",
            "password": "123456",
        }
        response = auth_client.post("/api/v1/users/", json=payload)
        assert response.status_code == status.HTTP_201_CREATED
        data = response.json()
        assert data["username"] == "nophone"
        assert data["phone"] is None

    def test_login_inactive_user_rejected(self, client, test_user, db_session):
        """Test que POST /auth/login rechaza usuarios desactivados con 401."""
        test_user.isActive = False
        db_session.commit()
        response = client.post(
            "/api/v1/auth/login",
            json={"email": test_user.email, "password": "testpassword123"},
        )
        assert response.status_code == status.HTTP_401_UNAUTHORIZED

    def test_inactive_user_api_rejected(self, client, test_user, db_session, token):
        """Test que un token existente deja de autorizar tras desactivar."""
        test_user.isActive = False
        db_session.commit()
        response = client.get(
            "/api/v1/users/",
            headers={"Authorization": f"Bearer {token}"},
        )
        assert response.status_code == status.HTTP_401_UNAUTHORIZED

    def test_create_user_unauthenticated(self, client):
        """Test que POST /users sin token retorna 401/403."""
        payload = {
            "username": "anon",
            "email": "anon@example.com",
            "password": "123456",
        }
        response = client.post("/api/v1/users/", json=payload)
        assert response.status_code in (status.HTTP_401_UNAUTHORIZED, status.HTTP_403_FORBIDDEN)

    def test_update_user(self, auth_client, test_user):
        """Test que PUT /users/{id} actualiza usuario."""
        payload = {"username": "updateduser"}
        response = auth_client.put(f"/api/v1/users/{test_user.id}", json=payload)
        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        assert data["username"] == "updateduser"

    def test_delete_user(self, auth_client, test_user):
        """Test que DELETE /users/{id} elimina usuario."""
        response = auth_client.delete(f"/api/v1/users/{test_user.id}")
        assert response.status_code == status.HTTP_204_NO_CONTENT

    def test_read_active_users(self, auth_client, test_user):
        """Test que GET /users/active retorna usuarios activos."""
        response = auth_client.get("/api/v1/users/active")
        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        assert isinstance(data, list)
        assert len(data) == 1


class TestPostEndpoints:
    """Tests para endpoints de posts."""

    def test_read_posts(self, auth_client, test_post):
        """Test que GET /posts retorna lista de posts."""
        response = auth_client.get("/api/v1/posts/")
        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        assert isinstance(data, list)
        assert len(data) == 1
        assert data[0]["title"] == "Test Post"

    def test_read_post_by_id(self, auth_client, test_post):
        """Test que GET /posts/{id} retorna post específico."""
        response = auth_client.get(f"/api/v1/posts/{test_post.id}")
        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        assert data["title"] == "Test Post"

    def test_create_post(self, auth_client, test_user):
        """Test que POST /posts crea nuevo post."""
        payload = {
            "author_id": str(test_user.id),
            "title": "New Post",
            "content": "New Content",
        }
        response = auth_client.post("/api/v1/posts/", json=payload)
        assert response.status_code == status.HTTP_201_CREATED
        data = response.json()
        assert data["title"] == "New Post"

    def test_create_post_without_author_id_uses_session_author(self, auth_client, test_user):
        """Test que POST /posts sin author_id asigna el autor de la sesión."""
        payload = {
            "title": "Authorless Post",
            "content": "Sin author_id",
            "published": False,
        }
        response = auth_client.post("/api/v1/posts/", json=payload)
        assert response.status_code == status.HTTP_201_CREATED
        data = response.json()
        assert data["author_id"] == str(test_user.id)

    def test_create_post_ignores_client_author_id(self, auth_client, test_user):
        """Test que POST /posts ignora el author_id enviado por el cliente."""
        payload = {
            "author_id": str(uuid4()),
            "title": "Spoofed Post",
            "content": "author_id ajeno",
        }
        response = auth_client.post("/api/v1/posts/", json=payload)
        assert response.status_code == status.HTTP_201_CREATED
        data = response.json()
        assert data["author_id"] == str(test_user.id)

    def test_create_post_unauthenticated(self, client):
        """Test que POST /posts sin credenciales responde 401."""
        payload = {"title": "No Auth", "content": "Sin token"}
        response = client.post("/api/v1/posts/", json=payload)
        assert response.status_code == status.HTTP_401_UNAUTHORIZED


class TestSkillEndpoints:
    """Tests para endpoints de skills."""

    def test_read_skills(self, auth_client, test_skill):
        """Test que GET /skills retorna lista de skills."""
        response = auth_client.get("/api/v1/skills/")
        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        assert isinstance(data, list)
        assert len(data) == 1
        assert data[0]["name"] == "Python"

    def test_read_skill_by_id(self, auth_client, test_skill):
        """Test que GET /skills/{id} retorna skill específico."""
        response = auth_client.get(f"/api/v1/skills/{test_skill.id}")
        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        assert data["name"] == "Python"

    def test_create_skill(self, auth_client):
        """Test que POST /skills crea nuevo skill."""
        payload = {
            "name": "JavaScript",
            "level": 75,
        }
        response = auth_client.post("/api/v1/skills/", json=payload)
        assert response.status_code == status.HTTP_201_CREATED
        data = response.json()
        assert data["name"] == "JavaScript"
        assert data["level"] == 75

    def test_read_skills_by_level(self, auth_client, test_skill):
        """Test que GET /skills/level/{level} retorna skills por nivel."""
        response = auth_client.get("/api/v1/skills/level/80")
        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        assert isinstance(data, list)
        assert len(data) == 1


class TestTechEndpoints:
    """Tests para endpoints de tecnologías."""

    def test_read_techs(self, auth_client, test_tech):
        """Test que GET /techs retorna lista de tecnologías."""
        response = auth_client.get("/api/v1/techs/")
        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        assert isinstance(data, list)
        assert len(data) == 1
        assert data[0]["name"] == "FastAPI"

    def test_read_tech_by_id(self, auth_client, test_tech):
        """Test que GET /techs/{id} retorna tecnología específica."""
        response = auth_client.get(f"/api/v1/techs/{test_tech.id}")
        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        assert data["name"] == "FastAPI"

    def test_create_tech(self, auth_client):
        """Test que POST /techs crea nueva tecnología."""
        payload = {
            "name": "Docker",
            "icon_tech": "docker.png",
        }
        response = auth_client.post("/api/v1/techs/", json=payload)
        assert response.status_code == status.HTTP_201_CREATED
        data = response.json()
        assert data["name"] == "Docker"


class TestExperienceEndpoints:
    """Tests para endpoints de experiencias."""

    def test_read_experiences(self, auth_client, test_experience):
        """Test que GET /experiences retorna lista de experiencias."""
        response = auth_client.get("/api/v1/experiences/")
        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        assert isinstance(data, list)
        assert len(data) == 1
        assert data[0]["company"] == "Test Company"

    def test_read_experience_by_id(self, auth_client, test_experience):
        """Test que GET /experiences/{id} retorna experiencia específica."""
        response = auth_client.get(f"/api/v1/experiences/{test_experience.id}")
        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        assert data["company"] == "Test Company"

    def test_create_experience(self, auth_client, test_user):
        """Test que POST /experiences crea nueva experiencia."""
        from datetime import datetime, timedelta
        payload = {
            "user_id": str(test_user.id),
            "company": "New Company",
            "role": "Tech Lead",
            "description": "Description",
            "start_date": (datetime.now() - timedelta(days=365)).isoformat(),
            "published": True,
        }
        response = auth_client.post("/api/v1/experiences/", json=payload)
        assert response.status_code == status.HTTP_201_CREATED
        data = response.json()
        assert data["company"] == "New Company"

    def test_read_current_experiences(self, auth_client, test_experience):
        """Test que GET /experiences/current retorna experiencias actuales."""
        response = auth_client.get("/api/v1/experiences/current")
        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        assert isinstance(data, list)
        assert len(data) == 1


class TestHealthEndpoint:
    """Tests para endpoint de health check."""

    def test_health_check(self, client):
        """Test que GET /health retorna estado saludable."""
        response = client.get("/health")
        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        assert data["status"] == "healthy"
        assert "version" in data
