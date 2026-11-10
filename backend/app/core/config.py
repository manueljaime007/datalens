from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    APP_NAME: str = "DataLens API"
    APP_DESCRIPTION: str = "API para Análise de ficheiros CSV"
    APP_VERSION: str = "1.0.0"
    APP_PREFIX: str = "/api"
    
    class Config:
        env_file = ".env"

settings = Settings()