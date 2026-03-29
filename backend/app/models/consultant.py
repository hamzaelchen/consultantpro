import uuid
from sqlalchemy import String, Integer, DateTime, Enum as SAEnum, func
from sqlalchemy.orm import Mapped, mapped_column
import enum
from app.database import Base


class ConsultantStatus(str, enum.Enum):
    disponible = "disponible"
    en_mission = "en_mission"
    conge      = "conge"
    inactif    = "inactif"


class Consultant(Base):
    __tablename__ = "consultants"

    id: Mapped[str]     = mapped_column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    full_name: Mapped[str]   = mapped_column(String(255), nullable=False)
    email: Mapped[str]       = mapped_column(String(255), unique=True, index=True, nullable=False)
    phone: Mapped[str | None]= mapped_column(String(50))
    role: Mapped[str]        = mapped_column(String(120), nullable=False)
    tjm: Mapped[int | None]  = mapped_column(Integer)          # tarif journalier moyen
    status: Mapped[ConsultantStatus] = mapped_column(
        SAEnum(ConsultantStatus), default=ConsultantStatus.disponible
    )
    bio: Mapped[str | None]  = mapped_column(String(1000))
    created_at: Mapped[DateTime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at: Mapped[DateTime] = mapped_column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
