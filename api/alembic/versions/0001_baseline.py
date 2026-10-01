"""Baseline del esquema existente (no-op).

La BD ya contiene las 8 tablas (user, project, post, skill, technology,
experience, project_tech, visit_event) creadas con DDL manual previo a
Alembic. Esta revisión vacía marca el punto de partida: a partir de aquí
cada cambio de modelos viaja en su propia migración.

Revision ID: 0001_baseline
"""

revision: str = "0001_baseline"
down_revision: str | None = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
