from datetime import datetime
from pydantic import BaseModel, EmailStr
from app.models.consultant import ConsultantStatus


class ConsultantBase(BaseModel):
    full_name: str
    email: EmailStr
    phone: str | None = None
    role: str
    tjm: int | None = None
    status: ConsultantStatus = ConsultantStatus.disponible
    bio: str | None = None


class ConsultantCreate(ConsultantBase):
    pass


class ConsultantUpdate(BaseModel):
    full_name: str | None = None
    email: EmailStr | None = None
    phone: str | None = None
    role: str | None = None
    tjm: int | None = None
    status: ConsultantStatus | None = None
    bio: str | None = None


class ConsultantOut(ConsultantBase):
    id: str
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}


class ConsultantList(BaseModel):
    total: int
    items: list[ConsultantOut]
