from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.database import Base, engine
from app.routers import auth, consultants, missions, users

# ── Create tables (use Alembic in production) ──
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="ConsultantPro API",
    version="1.0.0",
    description="API de gestion de consultants — FastAPI + PostgreSQL",
    docs_url="/docs",
    redoc_url="/redoc",
)

# ── CORS ──
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Routers ──
app.include_router(auth.router,        prefix="/api/v1/auth",        tags=["Auth"])
app.include_router(users.router,       prefix="/api/v1/users",       tags=["Users"])
app.include_router(consultants.router, prefix="/api/v1/consultants", tags=["Consultants"])
app.include_router(missions.router,    prefix="/api/v1/missions",    tags=["Missions"])


@app.get("/", tags=["Health"])
def root():
    return {"status": "ok", "app": "ConsultantPro API", "version": "1.0.0"}


@app.get("/health", tags=["Health"])
def health():
    return {"status": "healthy"}
