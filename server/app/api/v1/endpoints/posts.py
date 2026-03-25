from typing import Annotated

from fastapi import APIRouter, status, Depends
from sqlalchemy.orm import Session

from app.db.schemas.post_dto import PostCreate, PostResponse, PostUpdate
from app.core.database import get_db
from app.core.dependencies import get_post_service
from app.services.post_service import PostService


db_depends = Annotated[Session, Depends(get_db)]
service_dep = Annotated[PostService, Depends(get_post_service)]

router = APIRouter()


@router.get("/", name="posts")
def read_posts(db: db_depends, service: service_dep):
    """Obtener todos los posts."""
    return service.get_all(db)


@router.get("/published", name="published_posts")
def read_published_posts(db: db_depends, service: service_dep):
    """Obtener solo posts publicados."""
    return service.get_published_posts(db)


@router.get("/{post_id}", name="specific_post")
def read_post(post_id: int, db: db_depends, service: service_dep):
    """Obtener post por ID."""
    return service.get_by_id(db, post_id)


@router.post("/", response_model=PostResponse, name="create_post", status_code=status.HTTP_201_CREATED)
def create_post(post: PostCreate, db: db_depends, service: service_dep):
    """Crear nuevo post."""
    return service.create(db, post)


@router.put("/{post_id}", response_model=PostResponse, name="update_post")
def update_post(post_id: int, post: PostUpdate, db: db_depends, service: service_dep):
    """Actualizar post existente."""
    return service.update(db, post_id, post)


@router.delete("/{post_id}", name="delete_post", status_code=status.HTTP_204_NO_CONTENT)
def delete_post(post_id: int, db: db_depends, service: service_dep):
    """Eliminar post."""
    service.delete(db, post_id)
