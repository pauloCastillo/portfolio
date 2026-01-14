from fastapi import APIRouter
from app.api.v1.router import Project

api_router = APIRouter()
api_router.include_router(
    projects.router, prefix="/projects", tags=["projects"])
