from typing import Annotated

from fastapi import APIRouter, status, Depends
from sqlalchemy.orm import Session

from app.db.schemas.user_dto import UserCreate, UserResponse, UserUpdate
from app.core.database import get_db
from app.core.dependencies import get_user_service
from app.services.user_service import UserService


db_depends = Annotated[Session, Depends(get_db)]
service_dep = Annotated[UserService, Depends(get_user_service)]

router = APIRouter()


@router.get("/", name="users")
def read_users(db: db_depends, service: service_dep):
    """Obtener todos los usuarios."""
    return service.get_all(db)


@router.get("/active", name="active_users")
def read_active_users(db: db_depends, service: service_dep):
    """Obtener solo usuarios activos."""
    return service.get_active_users(db)


@router.get("/{user_id}", name="specific_user")
def read_user(user_id: int, db: db_depends, service: service_dep):
    """Obtener usuario por ID."""
    return service.get_by_id(db, user_id)


@router.post("/", response_model=UserResponse, name="create_user", status_code=status.HTTP_201_CREATED)
def create_user(user: UserCreate, db: db_depends, service: service_dep):
    """Crear nuevo usuario."""
    return service.create(db, user)


@router.put("/{user_id}", response_model=UserResponse, name="update_user")
def update_user(user_id: int, user: UserUpdate, db: db_depends, service: service_dep):
    """Actualizar usuario existente."""
    return service.update(db, user_id, user)


@router.delete("/{user_id}", name="delete_user", status_code=status.HTTP_204_NO_CONTENT)
def delete_user(user_id: int, db: db_depends, service: service_dep):
    """Eliminar usuario."""
    service.delete(db, user_id)
