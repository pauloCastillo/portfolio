"""
Service Tests - Tests unitarios para la capa de servicios.
"""

import pytest

from app.services.project_service import ProjectService
from app.services.user_service import UserService
from app.services.post_service import PostService
from app.services.skill_service import SkillService
from app.services.tech_service import TechService
from app.services.experience_service import ExperienceService


class TestProjectService:
    """Tests para ProjectService."""

    def test_get_all_returns_list(self, db_session, test_project):
        """Test que get_all retorna una lista de proyectos."""
        service = ProjectService()
        result = service.get_all(db_session)
        assert isinstance(result, list)
        assert len(result) == 1
        assert result[0].title == "Test Project"

    def test_get_by_id_returns_project(self, db_session, test_project):
        """Test que get_by_id retorna el proyecto correcto."""
        service = ProjectService()
        result = service.get_by_id(db_session, test_project.id)
        assert result is not None
        assert result.id == test_project.id

    def test_get_published_projects(self, db_session, test_project):
        """Test que get_published_projects retorna proyectos publicados."""
        service = ProjectService()
        result = service.get_published_projects(db_session)
        assert isinstance(result, list)
        assert len(result) == 1

    def test_create_project(self, db_session, test_user):
        """Test que create crea un nuevo proyecto."""
        from app.db.schemas.project_dto import ProjectCreate

        service = ProjectService()
        project_data = ProjectCreate(
            user_id=test_user.id,
            title="New Project",
            description="New Description",
            tech_stack="Python, Django",
        )
        result = service.create(db_session, project_data)
        assert result.title == "New Project"

    def test_update_project(self, db_session, test_project):
        """Test que update modifica un proyecto existente."""
        from app.db.schemas.project_dto import ProjectUpdate

        service = ProjectService()
        update_data = ProjectUpdate(title="Updated Title")
        result = service.update(db_session, test_project.id, update_data)
        assert result.title == "Updated Title"

    def test_delete_project(self, db_session, test_project):
        """Test que delete elimina un proyecto."""
        service = ProjectService()
        result = service.delete(db_session, test_project.id)
        assert result is True


class TestUserService:
    """Tests para UserService."""

    def test_get_all_returns_list(self, db_session, test_user):
        """Test que get_all retorna una lista de usuarios."""
        service = UserService()
        result = service.get_all(db_session)
        assert isinstance(result, list)
        assert len(result) == 1

    def test_get_by_id_returns_user(self, db_session, test_user):
        """Test que get_by_id retorna el usuario correcto."""
        service = UserService()
        result = service.get_by_id(db_session, test_user.id)
        assert result is not None
        assert result.username == "testuser"

    def test_get_active_users(self, db_session, test_user):
        """Test que get_active_users retorna usuarios activos."""
        service = UserService()
        result = service.get_active_users(db_session)
        assert isinstance(result, list)
        assert len(result) == 1

    def test_get_by_email(self, db_session, test_user):
        """Test que get_by_email retorna el usuario correcto."""
        service = UserService()
        result = service.get_by_email(db_session, "test@example.com")
        assert result is not None
        assert result.email == "test@example.com"

    def test_create_user(self, db_session):
        """Test que create crea un nuevo usuario."""
        from app.db.schemas.user_dto import UserCreate

        service = UserService()
        user_data = UserCreate(
            username="newuser",
            email="new@example.com",
            password="securepassword",
            phone="+1234567890",
        )
        result = service.create(db_session, user_data)
        assert result.username == "newuser"
        assert result.email == "new@example.com"


class TestPostService:
    """Tests para PostService."""

    def test_get_all_returns_list(self, db_session, test_post):
        """Test que get_all retorna una lista de posts."""
        service = PostService()
        result = service.get_all(db_session)
        assert isinstance(result, list)
        assert len(result) == 1

    def test_get_by_id_returns_post(self, db_session, test_post):
        """Test que get_by_id retorna el post correcto."""
        service = PostService()
        result = service.get_by_id(db_session, test_post.id)
        assert result is not None
        assert result.title == "Test Post"

    def test_get_published_posts(self, db_session, test_post):
        """Test que get_published_posts retorna posts publicados."""
        service = PostService()
        result = service.get_published_posts(db_session)
        assert isinstance(result, list)
        assert len(result) == 1

    def test_get_by_author(self, db_session, test_post, test_user):
        """Test que get_by_author retorna posts del autor."""
        service = PostService()
        result = service.get_by_author(db_session, test_user.id)
        assert isinstance(result, list)
        assert len(result) == 1


class TestSkillService:
    """Tests para SkillService."""

    def test_get_all_returns_list(self, db_session, test_skill):
        """Test que get_all retorna una lista de skills."""
        service = SkillService()
        result = service.get_all(db_session)
        assert isinstance(result, list)
        assert len(result) == 1

    def test_get_by_id_returns_skill(self, db_session, test_skill):
        """Test que get_by_id retorna el skill correcto."""
        service = SkillService()
        result = service.get_by_id(db_session, test_skill.id)
        assert result is not None
        assert result.name == "Python"

    def test_get_by_level(self, db_session, test_skill):
        """Test que get_by_level retorna skills del nivel especificado."""
        service = SkillService()
        result = service.get_by_level(db_session, 80)
        assert isinstance(result, list)
        assert len(result) == 1


class TestTechService:
    """Tests para TechService."""

    def test_get_all_returns_list(self, db_session, test_tech):
        """Test que get_all retorna una lista de tecnologías."""
        service = TechService()
        result = service.get_all(db_session)
        assert isinstance(result, list)
        assert len(result) == 1

    def test_get_by_id_returns_tech(self, db_session, test_tech):
        """Test que get_by_id retorna la tecnología correcta."""
        service = TechService()
        result = service.get_by_id(db_session, test_tech.id)
        assert result is not None
        assert result.name == "FastAPI"


class TestExperienceService:
    """Tests para ExperienceService."""

    def test_get_all_returns_list(self, db_session, test_experience):
        """Test que get_all retorna una lista de experiencias."""
        service = ExperienceService()
        result = service.get_all(db_session)
        assert isinstance(result, list)
        assert len(result) == 1

    def test_get_by_id_returns_experience(self, db_session, test_experience):
        """Test que get_by_id retorna la experiencia correcta."""
        service = ExperienceService()
        result = service.get_by_id(db_session, test_experience.id)
        assert result is not None
        assert result.company == "Test Company"

    def test_get_current_experiences(self, db_session, test_experience):
        """Test que get_current_experiences retorna experiencias actuales."""
        service = ExperienceService()
        result = service.get_current_experiences(db_session)
        assert isinstance(result, list)
        assert len(result) == 1
