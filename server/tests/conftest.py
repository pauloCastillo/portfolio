"""
Pytest Configuration - Fixtures compartidas para todos los tests.
"""

import os
import sys
from pathlib import Path

# Set environment variables for Settings before importing the app
os.environ["SECRET_KEY"] = "test-secret-key-for-testing"
os.environ["ALGORITHM"] = "HS256"
os.environ["ACCESS_TOKEN_EXPIRE_MINUTES"] = "30"

# Add app/ to path so bare imports (from core.xxx, from services.xxx) work
sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "app"))

import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from core.database import Base, get_db
from db.models.users import User
from db.models.projects import Project
from db.models.posts import Post
from db.models.skills import Skill
from db.models.techs import Technology
from db.models.experience import Experience
from fastapi.testclient import TestClient
from main import app
from uuid import uuid4

from core.security.password import get_password_hash
from core.dependencies import get_email_service
from services.email_service import EmailService


# Crear base de datos en memoria para tests
# Usamos SQLite pero con adaptadores para UUID
TEST_DATABASE_URL = "sqlite:///:memory:"

engine = create_engine(
    TEST_DATABASE_URL,
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
    echo=False,
)

# Adaptador para UUID en SQLite
import uuid
from sqlalchemy import TypeDecorator, String

class GUID(TypeDecorator):
    """Platform-independent GUID type."""
    impl = String
    cache_ok = True

    def process_bind_param(self, value, dialect):
        if value is None:
            return value
        if isinstance(value, uuid.UUID):
            return value.hex
        return value

    def process_result_value(self, value, dialect):
        if value is None:
            return value
        return uuid.UUID(value)

class MockEmailService(EmailService):
    """EmailService que no envía correos reales (mock para tests)."""
    def __init__(self):
        pass

    async def send_password_reset_email(self, email: str, name: str, reset_url: str):
        return None


TestingSessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
)


@pytest.fixture(scope="function")
def db_session():
    """
    Fixture para crear sesión de base de datos de prueba.
    Crea las tablas antes y las elimina después de cada test.
    """
    Base.metadata.create_all(bind=engine)
    session = TestingSessionLocal()
    yield session
    session.close()
    Base.metadata.drop_all(bind=engine)


@pytest.fixture(scope="function")
def client(db_session):
    """
    Fixture para crear cliente de test de FastAPI.
    Override la dependencia de get_db para usar la sesión de prueba.
    """
    def override_get_db():
        try:
            yield db_session
        finally:
            pass

    app.dependency_overrides[get_db] = override_get_db

    def override_get_email_service():
        return MockEmailService()

    app.dependency_overrides[get_email_service] = override_get_email_service

    yield TestClient(app)
    app.dependency_overrides.clear()


@pytest.fixture
def test_user(db_session):
    """Fixture para crear usuario de prueba."""
    hashed_password = get_password_hash("testpassword123")
    user = User(
        username="testuser",
        email="test@example.com",
        password=hashed_password,
        phone="+1234567890",
    )
    db_session.add(user)
    db_session.commit()
    db_session.refresh(user)
    return user


@pytest.fixture
def token(client, test_user):
    """Fixture para obtener un token de autenticación para el usuario de prueba."""
    response = client.post(
        "/api/v1/auth/login",
        json={"email": test_user.email, "password": "testpassword123"},
    )
    return response.json()["access_token"]


@pytest.fixture
def auth_client(client, token):
    """Fixture para crear un cliente de test con autenticación."""
    client.headers = {"Authorization": f"Bearer {token}"}
    return client


@pytest.fixture
def test_user_uuid():
    """Fixture para generar UUID de usuario."""
    return uuid4()


@pytest.fixture
def test_project(db_session, test_user):
    """Fixture para crear proyecto de prueba."""
    project = Project(
        user_id=test_user.id,
        title="Test Project",
        description="Test Description",
    )
    db_session.add(project)
    db_session.commit()
    db_session.refresh(project)
    return project


@pytest.fixture
def test_post(db_session, test_user):
    """Fixture para crear post de prueba."""
    post = Post(
        author_id=test_user.id,
        title="Test Post",
        content="Test Content",
    )
    db_session.add(post)
    db_session.commit()
    db_session.refresh(post)
    return post


@pytest.fixture
def test_skill(db_session):
    """Fixture para crear skill de prueba."""
    skill = Skill(
        name="Python",
        level=80,
    )
    db_session.add(skill)
    db_session.commit()
    db_session.refresh(skill)
    return skill


@pytest.fixture
def test_tech(db_session):
    """Fixture para crear tecnología de prueba."""
    tech = Technology(
        name="FastAPI",
        icon_tech="fastapi.png",
    )
    db_session.add(tech)
    db_session.commit()
    db_session.refresh(tech)
    return tech


@pytest.fixture
def test_experience(db_session, test_user):
    """Fixture para crear experiencia de prueba."""
    from datetime import datetime, timedelta
    experience = Experience(
        user_id=test_user.id,
        company="Test Company",
        role="Software Developer",
        description="Test Description",
        start_date=datetime.now() - timedelta(days=365),
        published=True,
    )
    db_session.add(experience)
    db_session.commit()
    db_session.refresh(experience)
    return experience