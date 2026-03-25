"""
Schema Tests - Tests unitarios para los schemas de Pydantic.
"""

import pytest
from pydantic import ValidationError
from datetime import datetime, UTC

from app.db.schemas.project_dto import ProjectCreate, ProjectResponse, ProjectUpdate
from app.db.schemas.user_dto import UserCreate, UserResponse, UserUpdate
from app.db.schemas.post_dto import PostCreate, PostResponse, PostUpdate
from app.db.schemas.skill_dto import SkillCreate, SkillResponse, SkillUpdate
from app.db.schemas.tech_dto import TechCreate, TechResponse, TechUpdate
from app.db.schemas.experience_dto import ExperienceCreate, ExperienceResponse, ExperienceUpdate


class TestProjectSchema:
    """Tests para Project schemas."""

    def test_project_create_valid(self):
        """Test que ProjectCreate valida datos correctos."""
        from uuid import uuid4
        project = ProjectCreate(
            user_id=uuid4(),
            title="My Project",
            description="Description",
            tech_stack="Python, FastAPI",
        )
        assert project.title == "My Project"
        assert project.description == "Description"

    def test_project_create_missing_title(self):
        """Test que ProjectCreate falla sin título."""
        from uuid import uuid4
        with pytest.raises(ValidationError) as exc_info:
            ProjectCreate(
                user_id=uuid4(),
                title="",
                description="Description",
                tech_stack="Python",
            )
        assert "string_too_short" in str(exc_info.value)

    def test_project_response_valid(self):
        """Test que ProjectResponse valida datos correctos."""
        from uuid import uuid4
        project = ProjectResponse(
            id=1,
            user_id=uuid4(),
            title="My Project",
            description="Description",
            tech_stack="Python",
            published=True,
        )
        assert project.id == 1
        assert project.title == "My Project"

    def test_project_update_partial(self):
        """Test que ProjectUpdate acepta campos opcionales."""
        update = ProjectUpdate(title="Updated")
        assert update.title == "Updated"
        assert update.description is None


class TestUserSchema:
    """Tests para User schemas."""

    def test_user_create_valid(self):
        """Test que UserCreate valida datos correctos."""
        user = UserCreate(
            username="testuser",
            email="test@example.com",
            password="securepassword123",
            phone="+1234567890",
        )
        assert user.username == "testuser"
        assert user.email == "test@example.com"

    def test_user_create_invalid_email(self):
        """Test que UserCreate falla con email inválido."""
        with pytest.raises(ValidationError) as exc_info:
            UserCreate(
                username="testuser",
                email="invalid-email",
                password="securepassword123",
                phone="+1234567890",
            )
        assert "email" in str(exc_info.value).lower()

    def test_user_create_short_password(self):
        """Test que UserCreate falla con password corto."""
        with pytest.raises(ValidationError) as exc_info:
            UserCreate(
                username="testuser",
                email="test@example.com",
                password="short",
                phone="+1234567890",
            )
        assert "string_too_short" in str(exc_info.value)

    def test_user_response_valid(self):
        """Test que UserResponse valida datos correctos."""
        from uuid import uuid4
        user = UserResponse(
            id=uuid4(),
            username="testuser",
            email="test@example.com",
            phone="+1234567890",
        )
        assert user.username == "testuser"


class TestPostSchema:
    """Tests para Post schemas."""

    def test_post_create_valid(self):
        """Test que PostCreate valida datos correctos."""
        from uuid import uuid4
        post = PostCreate(
            author_id=uuid4(),
            title="My Post",
            content="Content here",
        )
        assert post.title == "My Post"
        assert post.content == "Content here"

    def test_post_create_missing_content(self):
        """Test que PostCreate falla sin contenido."""
        from uuid import uuid4
        with pytest.raises(ValidationError):
            PostCreate(
                author_id=uuid4(),
                title="My Post",
                content="",
            )


class TestSkillSchema:
    """Tests para Skill schemas."""

    def test_skill_create_valid(self):
        """Test que SkillCreate valida datos correctos."""
        skill = SkillCreate(
            name="Python",
            level=80,
        )
        assert skill.name == "Python"
        assert skill.level == 80

    def test_skill_create_level_out_of_range(self):
        """Test que SkillCreate falla con nivel fuera de rango."""
        with pytest.raises(ValidationError) as exc_info:
            SkillCreate(
                name="Python",
                level=150,
            )
        assert "le" in str(exc_info.value) or "less than or equal" in str(exc_info.value).lower()

    def test_skill_create_negative_level(self):
        """Test que SkillCreate falla con nivel negativo."""
        with pytest.raises(ValidationError):
            SkillCreate(
                name="Python",
                level=-10,
            )


class TestTechSchema:
    """Tests para Tech schemas."""

    def test_tech_create_valid(self):
        """Test que TechCreate valida datos correctos."""
        tech = TechCreate(
            name="FastAPI",
            icon_tech="fastapi.png",
        )
        assert tech.name == "FastAPI"

    def test_tech_create_missing_name(self):
        """Test que TechCreate falla sin nombre."""
        with pytest.raises(ValidationError):
            TechCreate(
                name="",
                icon_tech="fastapi.png",
            )


class TestExperienceSchema:
    """Tests para Experience schemas."""

    def test_experience_create_valid(self):
        """Test que ExperienceCreate valida datos correctos."""
        from uuid import uuid4
        from datetime import datetime, timedelta
        exp = ExperienceCreate(
            user_id=uuid4(),
            company="Test Company",
            role="Developer",
            description="Description",
            start_date=datetime.now() - timedelta(days=365),
            published=True,
        )
        assert exp.company == "Test Company"
        assert exp.role == "Developer"

    def test_experience_invalid_url(self):
        """Test que ExperienceCreate falla con URL inválida."""
        from uuid import uuid4
        from datetime import datetime, timedelta
        with pytest.raises(ValueError) as exc_info:
            ExperienceCreate(
                user_id=uuid4(),
                company="Test Company",
                role="Developer",
                description="Description",
                start_date=datetime.now() - timedelta(days=365),
                url="invalid-url",
            )
        assert "http" in str(exc_info.value).lower() or "url" in str(exc_info.value).lower()
