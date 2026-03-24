from typing import Annotated

from fastapi import APIRouter, status, Depends
from sqlalchemy.orm import Session

from app.db.schemas.post_dto import PostDTO_Response
from app.db.config import get_db, metadata_obj_var
from app.repositories.post_repo import PostRepository

metadata_obj_var

db_depends = Annotated[Session, Depends(get_db)]

router = APIRouter()
service = PostRepository()

@router.get("/", include_in_schema=False, name="posts")
def read_techs(db:db_depends):
    return service.get_posts(db)

@router.get("/{post_id}", include_in_schema=False, name="specific_post")
def read_user(post_id: int, db:db_depends):
    return service.get_post(db, post_id)

@router.post("/", response_model=PostDTO_Response, name="create_post", status_code=status.HTTP_201_CREATED)
def create_user(post: PostDTO_Response, db:db_depends):
    return service.create_technology(db, post)