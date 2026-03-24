from typing import Annotated

from fastapi import APIRouter, status, Depends
from sqlalchemy.orm import Session

from app.db.schemas.user_dto import UserDTO_Response
from app.db.config import get_db, metadata_obj_var
from app.repositories.user_repo import UserRepository

metadata_obj_var

db_depends = Annotated[Session, Depends(get_db)]

router = APIRouter()
service = UserRepository()

@router.get("/", include_in_schema=False, name="users")
def read_users(db:db_depends):
    return service.get_users(db)

@router.get("/{user_id}", include_in_schema=False, name="specific_user")
def read_user(user_id: int, db:db_depends):
    return service.get_user(db, user_id)

@router.post("/", response_model=UserDTO_Response, name="create_user", status_code=status.HTTP_201_CREATED)
def create_user(user: UserDTO_Response, db:db_depends):
    return service.create_user(db, user)