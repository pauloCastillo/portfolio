"""Alembic environment: esquema como código desde los modelos SQLAlchemy.

Uso (con cwd `api/`):
    alembic upgrade head                  # aplicar pendientes
    alembic revision --autogenerate -m "" # nueva migración tras cambiar modelos
    alembic stamp head                     # marcar BD ya migrada (baseline)
"""

import sys
from logging.config import fileConfig
from pathlib import Path

from sqlalchemy import engine_from_config, pool
from alembic import context

# app/ al path para los bare imports (from core.xxx, from db.xxx...)
sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "app"))

from app.core.database import Base, DATABASE_URL  # noqa: E402
import app.db.models.users  # noqa: F401,E402
import app.db.models.projects  # noqa: F401,E402
import app.db.models.posts  # noqa: F401,E402
import app.db.models.skills  # noqa: F401,E402
import app.db.models.techs  # noqa: F401,E402
import app.db.models.experience  # noqa: F401,E402
import app.db.models.visits  # noqa: F401,E402

config = context.config

if config.config_file_name is not None:
    fileConfig(config.config_file_name)

config.set_main_option("sqlalchemy.url", DATABASE_URL)

target_metadata = Base.metadata


def run_migrations_offline() -> None:
    context.configure(
        url=config.get_main_option("sqlalchemy.url"),
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
        compare_type=True,
    )
    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online() -> None:
    connectable = engine_from_config(
        config.get_section(config.config_ini_section, {}),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )
    with connectable.connect() as connection:
        context.configure(
            connection=connection,
            target_metadata=target_metadata,
            compare_type=True,
        )
        with context.begin_transaction():
            context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
