from fastapi import APIRouter
from app.schemas.project_dto import ProjectDTO

router = APIRouter()


class Project:
    def __init__(self, id: int, title: str, media: str, description: str, tech_stack: str,
                 github_link: str, demo_link: str, category: str, created_at: str):
        self.id = id
        self.title = title
        self.media = media
        self.description = description
        self.tech_stack = tech_stack
        self.github_link = github_link
        self.demo_link = demo_link
        self.category = category
        self.created_at = created_at


projects = [
    Project(1, "proyecto 1", "imagen", "descripcion del proyecto 1",
            "tecnologias usadas", "enlace al proyecto en el sitio github", "enlace al demo1", "categoria1", "13/12/2025"),
    Project(2, "proyecto 2", "video", "descripcion del proyecto 2",
            "tecnologias", "enlace al proyecto de github", "enlace al demo2", "categoria2", "25/05/2023"),
    Project(3, "proyecto 3", "video", "descripcion del proyecto 3",
            "stack tech", "enlace al proyecto", "enlace al  demo3", "categoria3", "25/05/2022"),
    Project(4, "proyecto 4", "imagen", "descripcion del proyecto 4",
            "stack frameworks", "enlace al proyecto en github", "enlace al demo4", "categoria4", "25/05/2021"),
    Project(5, "proyecto 5", "imagen y video", "descripcion del proyecto 5",
            "tecnologias usadas", "enlace al proyecto en github", "enlace al demo5", "categoria5", "25/05/2020"),
]


@router.get("/")
async def read_root():
    return {"message": "Welcome to the Portfolio API!"}


@router.get("/projects")
async def read_all_projects():
    return projects


@router.post("/projects/create")
async def create_project(request_project: ProjectDTO):
    new_project = Project(**request_project.dict())
    projects.append(new_project)
    return {"message": "Project created successfully", "project": new_project}
