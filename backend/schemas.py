from datetime import datetime
from pydantic import BaseModel, EmailStr


# ── Création ──
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
