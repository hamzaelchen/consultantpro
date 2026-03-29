import uuid
from sqlalchemy import String, Integer, Date, DateTime, Enum as SAEnum, ForeignKey, func
from sqlalchemy.orm import Mapped, mapped_column, relationship
import enum
from app.database import Base


class MissionStatus(str, enum.Enum):
    en_attente = "en_attente"
    en_cours   = "en_cours"
    terminee   = "terminee"
    annulee    = "annulee"


class Mission(Base):
    __tablename__ = "missions"

    id: Mapped[str]          = mapped_column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    title: Mapped[str]       = mapped_column(String(255), nullable=False)
    client: Mapped[str]      = mapped_column(String(255), nullable=False)
    description: Mapped[str | None] = mapped_column(String(2000))
    tjm: Mapped[int | None]  = mapped_column(Integer)
    start_date: Mapped[Date | None] = mapped_column(Date)
    end_date: Mapped[Date | None]   = mapped_column(Date)
    status: Mapped[MissionStatus] = mapped_column(
        SAEnum(MissionStatus), default=MissionStatus.en_attente
    )
    consultant_id: Mapped[str | None] = mapped_column(
        String(36), ForeignKey("consultants.id", ondelete="SET NULL"), nullable=True
    )
    consultant: Mapped["Consultant"] = relationship("Consultant", lazy="select")  # type: ignore
    created_at: Mapped[DateTime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at: Mapped[DateTime] = mapped_column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
