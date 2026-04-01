from sqlalchemy.orm import Session
from fastapi import HTTPException, status

from models import Consultant
from schemas import ConsultantCreate, ConsultantUpdate


def get_all(db: Session, user_id: str) -> list[Consultant]:
    return db.query(Consultant).filter(Consultant.user_id == user_id).order_by(Consultant.created_at.desc()).all()


def get_by_id(db: Session, consultant_id: str, user_id: str) -> Consultant:
    consultant = db.query(Consultant).filter(Consultant.id == consultant_id, Consultant.user_id == user_id).first()
    if not consultant:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Consultant introuvable ou accès non autorisé",
        )
    return consultant


def create(db: Session, payload: ConsultantCreate, user_id: str) -> Consultant:
    # Vérifier l'unicité de l'email au sein de l'application (ou par utilisateur selon le besoin, ici global)
    existing = db.query(Consultant).filter(Consultant.email == payload.email).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=f"L'email '{payload.email}' est déjà utilisé",
        )
    consultant = Consultant(**payload.model_dump(), user_id=user_id)
    db.add(consultant)
    db.commit()
    db.refresh(consultant)
    return consultant


def update(db: Session, consultant_id: str, payload: ConsultantUpdate, user_id: str) -> Consultant:
    consultant = get_by_id(db, consultant_id, user_id)
    data = payload.model_dump(exclude_unset=True)

    # Vérifier l'unicité si l'email change
    if "email" in data and data["email"] != consultant.email:
        existing = db.query(Consultant).filter(Consultant.email == data["email"]).first()
        if existing:
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail=f"L'email '{data['email']}' est déjà utilisé",
            )

    for key, value in data.items():
        setattr(consultant, key, value)

    db.commit()
    db.refresh(consultant)
    return consultant


def delete(db: Session, consultant_id: str, user_id: str) -> None:
    consultant = get_by_id(db, consultant_id, user_id)
    db.delete(consultant)
    db.commit()
