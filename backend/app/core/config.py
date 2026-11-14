from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):

    APP_NAME: str = "DataLens API"
    APP_VERSION: str = "1.0.0"
    API_PREFIX: str = "/api"

    DATABASE_URL: str
    
    cors_origins : list[str] = [
        "http://localhost:3000",
        "http://localhost:4077",
        "http://localhost:8080",
        "http://127.0.0.1:3000"
    ]
    
    max_upload_bytes: int = 5 * 1024 * 1024
    max_rows: int = 50_000

    model_config = SettingsConfigDict(
        extra="ignore",
        env_file=".env",
        env_file_encoding="utf-8",
    )

settings = Settings()
