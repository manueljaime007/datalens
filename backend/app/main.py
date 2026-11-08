from fastapi import FastAPI

app = FastAPI(
    title="Datalens API",
    description="API para análise de ficheiros CSV",
    version = "1.0.0"
)

@app.get("/")
def home(): 
    return {
        "message": "Hello, Guana!"
    }
    
@app.get("/health")
def health_check():
    return {
        "status": "ok"
    }