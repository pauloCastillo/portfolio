"""
Repository Tests - Tests unitarios para la capa de repositorios.
"""

import pytest
from sqlalchemy import select

from app.repositories.project_repository import ProjectRepository
from app.repositories.user_repo import UserRepository
from app.repositories.post_repo import PostRepository
from app.repositories.skill_repo import SkillRepository
from app.repositories.tech_repo import TechRepository
from app.repositories.experience_repo import ExperienceRepository

from app.db.models.projects import Project
from app.db.models.users import User
from app.db.models.posts import Post
from app.db.models.skills import Skill
from app.db.models.techs import Technology
from app.db.models.experience import Experience


class TestProjectRepository:
    """Tests para ProjectRepository."""

    def test_get_all_returns_list(self, db_session, test_project):
        """Test que get_all retorna una lista de proyectos."""
        repo = ProjectRepository()
        result = repo.get_all(db_session)
        assert isinstance(result, list)
        assert len(result) == 1
        assert result[0].title == "Test Project"

    def test_get_by_id_returns_project(self, db_session, test_project):
        """Test que get_by_id retorna el proyecto correcto."""
        repo = ProjectRepository()
        result = repo.get_by_id(db_session, test_project.id)
        assert result is not None
        assert result.id == test_project.id
        assert result.title == "Test Project"

    def test_get_by_id_not_found(self, db_session):
        """Test que get_by_id lanza 404 cuando no existe."""
        repo = ProjectRepository()
        with pytest.raises(Exception) as exc_info:
            repo.get_by_id(db_session, 9999)
        assert exc_info.value.status_code == 404

    def test_create_project(self, db_session, test_user):
        """Test que create crea un nuevo proyecto."""
        from app.db.schemas.project_dto import ProjectCreate
        from uuid import uuid4

        repo = ProjectRepository()
        project_data = ProjectCreate(
            user_id=test_user.id,
            title="New Project",
            description="New Description",
            tech_stack="Python, Django",
        )
        result = repo.create(db_session, project_data)
        assert result.title == "New Project"
        assert result.description == "New Description"

    def test_update_project(self, db_session, test_project):
        """Test que update modifica un proyecto existente."""
        from app.db.schemas.project_dto import ProjectUpdate

        repo = ProjectRepository()
        update_data = ProjectUpdate(title="Updated Title")
        result = repo.update(db_session, test_project.id, update_data)
        assert result.title == "Updated Title"

    def test_delete_project(self, db_session, test_project):
        """Test que delete elimina un proyecto."""
        repo = ProjectRepository()
        result = repo.delete(db_session, test_project.id)
        assert result is True
        # Verificar que fue eliminado
        stmt = select(Project).where(Project.id == test_project.id)
        deleted = db_session.execute(stmt).scalars().first()
        assert deleted is None


class TestUserRepository:
    """Tests para UserRepository."""

    def test_get_all_returns_list(self, db_session, test_user):
        """Test que get_all retorna una lista de usuarios."""
        repo = UserRepository()
        result = repo.get_all(db_session)
        assert isinstance(result, list)
        assert len(result) == 1
        assert result[0].username == "testuser"

    def test_get_by_id_returns_user(self, db_session, test_user):
        """Test que get_by_id retorna el usuario correcto."""
        repo = UserRepository()
        result = repo.get_by_id(db_session, test_user.id)
        assert result is not None
        assert result.id == test_user.id
        assert result.username == "testuser"

    def test_get_by_email(self, db_session, test_user):
        """Test que get_by_email retorna el usuario correcto."""
        repo = UserRepository()
        result = repo.get_by_email(db_session, "test@example.com")
        assert result is not None
        assert result.id == test_user.id
        assert result.email == "test@example.com"

    def test_get_by_email_not_found(self, db_session):
        """Test que get_by_email retorna None cuando no existe."""
        repo = UserRepository()
        result = repo.get_by_email(db_session, "nonexistent@example.com")
        assert result is None

    def test_get_active_users(self, db_session, test_user):
        """Test que get_active_users retorna usuarios activos."""
        repo = UserRepository()
        result = repo.get_active_users(db_session)
        assert isinstance(result, list)
        assert len(result) == 1
        assert result[0].isActive is True


class TestPostRepository:
    """Tests para PostRepository."""

    def test_get_all_returns_list(self, db_session, test_post):
        """Test que get_all retorna una lista de posts."""
        repo = PostRepository()
        result = repo.get_all(db_session)
        assert isinstance(result, list)
        assert len(result) == 1
        assert result[0].title == "Test Post"

    def test_get_by_id_returns_post(self, db_session, test_post):
        """Test que get_by_id retorna el post correcto."""
        repo = PostRepository()
        result = repo.get_by_id(db_session, test_post.id)
        assert result is not None
        assert result.id == test_post.id
        assert result.title == "Test Post"

    def test_get_published_posts(self, db_session, test_post):
        """Test que get_published_posts retorna posts publicados."""
        repo = PostRepository()
        result = repo.get_published_posts(db_session)
        assert isinstance(result, list)
        assert len(result) == 1

    def test_get_by_author(self, db_session, test_post, test_user):
        """Test que get_by_author retorna posts del autor."""
        repo = PostRepository()
        result = repo.get_by_author(db_session, test_user.id)
        assert isinstance(result, list)
        assert len(result) == 1
        assert result[0].author_id == test_user.id


class TestSkillRepository:
    """Tests para SkillRepository."""

    def test_get_all_returns_list(self, db_session, test_skill):
        """Test que get_all retorna una lista de skills."""
        repo = SkillRepository()
        result = repo.get_all(db_session)
        assert isinstance(result, list)
        assert len(result) == 1
        assert result[0].name == "Python"

    def test_get_by_id_returns_skill(self, db_session, test_skill):
        """Test que get_by_id retorna el skill correcto."""
        repo = SkillRepository()
        result = repo.get_by_id(db_session, test_skill.id)
        assert result is not None
        assert result.id == test_skill.id
        assert result.name == "Python"

    def test_get_by_level(self, db_session, test_skill):
        """Test que get_by_level retorna skills del nivel especificado."""
        repo = SkillRepository()
        result = repo.get_by_level(db_session, 80)
        assert isinstance(result, list)
        assert len(result) == 1
        assert result[0].level == 80


class TestTechRepository:
    """Tests para TechRepository."""

    def test_get_all_returns_list(self, db_session, test_tech):
        """Test que get_all retorna una lista de tecnologías."""
        repo = TechRepository()
        result = repo.get_all(db_session)
        assert isinstance(result, list)
        assert len(result) == 1
        assert result[0].name == "FastAPI"

    def test_get_by_id_returns_tech(self, db_session, test_tech):
        """Test que get_by_id retorna la tecnología correcta."""
        repo = TechRepository()
        result = repo.get_by_id(db_session, test_tech.id)
        assert result is not None
        assert result.id == test_tech.id
        assert result.name == "FastAPI"


class TestExperienceRepository:
    """Tests para ExperienceRepository."""

    def test_get_all_returns_list(self, db_session, test_experience):
        """Test que get_all retorna una lista de experiencias."""
        repo = ExperienceRepository()
        result = repo.get_all(db_session)
        assert isinstance(result, list)
        assert len(result) == 1
        assert result[0].company == "Test Company"

    def test_get_by_id_returns_experience(self, db_session, test_experience):
        """Test que get_by_id retorna la experiencia correcta."""
        repo = ExperienceRepository()
        result = repo.get_by_id(db_session, test_experience.id)
        assert result is not None
        assert result.id == test_experience.id
        assert result.company == "Test Company"

    def test_get_current_experiences(self, db_session, test_experience):
        """Test que get_current_experiences retorna experiencias actuales."""
        repo = ExperienceRepository()
        result = repo.get_current_experiences(db_session)
        assert isinstance(result, list)
        assert len(result) == 1
        assert result[0].id == test_experience.id
