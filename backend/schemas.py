from datetime import datetime
from pydantic import BaseModel, EmailStr


# ── Authentification ──
class UserCreate(BaseModel):
    nom: str
    prenom: str
    email: EmailStr
    password: str


class UserOut(BaseModel):
    id: str
    nom: str
    prenom: str
    email: str
    created_at: datetime

    model_config = {"from_attributes": True}


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str
    user: UserOut


# ── Consultants ──
class ConsultantCreate(BaseModel):
    nom: str
    prenom: str
    email: EmailStr
    telephone: str | None = None
    specialite: str
    disponible: bool = True


# ── Mise à jour (tous les champs optionnels) ──
class ConsultantUpdate(BaseModel):
    nom: str | None = None
    prenom: str | None = None
    email: EmailStr | None = None
    telephone: str | None = None
    specialite: str | None = None
    disponible: bool | None = None


# ── Réponse ──
class ConsultantOut(BaseModel):
    id: str
    nom: str
    prenom: str
    email: str
    telephone: str | None
    specialite: str
    disponible: bool
    created_at: datetime

    model_config = {"from_attributes": True}
