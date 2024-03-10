import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .routers import predict

app = FastAPI()
app.include_router(predict.router)


# Allow CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def start():
    """Launched with `poetry run start` at root level"""
    uvicorn.run("fastapi_ner_app.main:app", reload=True)
