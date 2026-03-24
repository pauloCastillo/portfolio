from fastapi import APIRouter

from .endpoints.projects import router as projects_router
from .endpoints.users import router as users_router
from .endpoints.posts import router as posts_router
from .endpoints.skills import router as skills_router
from .endpoints.techs import router as techs_router
from .endpoints.experiences import router as experiences_router


router = APIRouter()

router.include_router(projects_router, prefix="/projects", tags=["projects"])
router.include_router(users_router, prefix="/users", tags=["users"])
router.include_router(posts_router, prefix="/posts", tags=["posts"])
router.include_router(skills_router, prefix="/skills", tags=["skills"])
router.include_router(techs_router, prefix="/techs", tags=["techs"])
router.include_router(experiences_router, prefix="/experiences", tags=["experiences"])