from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from app.api.v1.router import router 

from pathlib import Path

import uvicorn 

BASE_DIR = Path(__file__).resolve().parent
MEDIA_DIR = BASE_DIR / "public" / "media"

app = FastAPI()
app.mount("/public/media", StaticFiles(directory=MEDIA_DIR), name="media")

app.include_router(router, prefix="/api")

if __name__ == "__main__":
    uvicorn.run("app.main:app", reload=True, host="localhost", port=8000)
    