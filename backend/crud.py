from sqlalchemy.orm import Session
from fastapi import HTTPException, status

from models import Consultant
from schemas import ConsultantCreate, ConsultantUpdate


def get_all(db: Session) -> list[Consultant]:
    return db.query(Consultant).order_by(Consultant.created_at.desc()).all()


def get_by_id(db: Session, consultant_id: str) -> Consultant:
    consultant = db.get(Consultant, consultant_id)
    if not consultant:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Consultant '{consultant_id}' introuvable",
        )
    return consultant


def create(db: Session, payload: ConsultantCreate) -> Consultant:
    # Vérifier l'unicité de l'email
    existing = db.query(Consultant).filter(Consultant.email == payload.email).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=f"L'email '{payload.email}' est déjà utilisé",
        )
    consultant = Consultant(**payload.model_dump())
    db.add(consultant)
    db.commit()
    db.refresh(consultant)
    return consultant


def update(db: Session, consultant_id: str, payload: ConsultantUpdate) -> Consultant:
    consultant = get_by_id(db, consultant_id)
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


def delete(db: Session, consultant_id: str) -> None:
    consultant = get_by_id(db, consultant_id)
    db.delete(consultant)
    db.commit()
