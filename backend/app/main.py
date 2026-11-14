from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.routes.analysis import router as analysis_router
from app.database.connection import Base, engine

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(
    analysis_router,
    prefix=settings.API_PREFIX
)

@app.get("/")
def home():
    return {
        "message": "Welcome to DataLens API",
        "routes": {
            "documentation": "/docs"
        }
    }

@app.get("/health")
def health_check():
    return {
        "status": "healthy"
    }