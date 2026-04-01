import uuid
from datetime import datetime
from sqlalchemy import String, Boolean, DateTime, ForeignKey, func
from sqlalchemy.orm import Mapped, mapped_column, relationship
from database import Base


class User(Base):
    __tablename__ = "users"

    id: Mapped[str] = mapped_column(
        String(36), primary_key=True, default=lambda: str(uuid.uuid4())
    )
    nom: Mapped[str]        = mapped_column(String(100), nullable=False)
    prenom: Mapped[str]     = mapped_column(String(100), nullable=False)
    email: Mapped[str]      = mapped_column(String(255), unique=True, nullable=False, index=True)
    password: Mapped[str]   = mapped_column(String(255), nullable=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )
    consultants: Mapped[list["Consultant"]] = relationship("Consultant", back_populates="owner", cascade="all, delete-orphan")


class Consultant(Base):
    __tablename__ = "consultants"

    id: Mapped[str] = mapped_column(
        String(36), primary_key=True, default=lambda: str(uuid.uuid4())
    )
    nom: Mapped[str]        = mapped_column(String(100), nullable=False)
    prenom: Mapped[str]     = mapped_column(String(100), nullable=False)
    email: Mapped[str]      = mapped_column(String(255), unique=True, nullable=False, index=True)
    telephone: Mapped[str | None] = mapped_column(String(20), nullable=True)
    specialite: Mapped[str] = mapped_column(String(150), nullable=False)
    disponible: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )
    user_id: Mapped[str] = mapped_column(String(36), ForeignKey("users.id"), nullable=False)
    owner: Mapped["User"] = relationship("User", back_populates="consultants")
