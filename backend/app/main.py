from fastapi import FastAPI

from app.core.config import settings
from app.routes.analysis import router as analysis_router


app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION
)


app.include_router(
    analysis_router,
    prefix=settings.APP_PREFIX
)


@app.get("/")
def home():
    return {
        "message": "Welcome to DataLens API"
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy"
    }