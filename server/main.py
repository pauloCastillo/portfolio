from fastapi import FastAPI
from app.api.v1.router import router 

import uvicorn 

app = FastAPI()
app.include_router(router, prefix="/api")

if __name__ == "__main__":
    uvicorn.run("app.main:app", reload=True, host="localhost", port=8000)
    