from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import Base, engine
from routers import consultants, auth

# Creation automatique des tables au demarrage
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="ConsultantPro API",
    version="1.0.0",
    description="API de gestion de consultants",
    docs_url="/docs",
    redoc_url="/redoc",
)

# CORS ouvert pour toutes les origines
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Inclusion des routers
app.include_router(auth.router)
app.include_router(consultants.router)


@app.get("/", tags=["Health"])
def root():
    return {"status": "ok", "message": "ConsultantPro API operationnelle"}
