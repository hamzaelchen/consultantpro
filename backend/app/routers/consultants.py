from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.consultant import Consultant
from app.models.user import User
from app.schemas.consultant import ConsultantCreate, ConsultantOut, ConsultantUpdate, ConsultantList
from app.core.deps import get_current_user

router = APIRouter()


@router.get("/", response_model=ConsultantList)
def list_consultants(
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
    search: str | None = Query(None),
    db: Session = Depends(get_db),
    _: User = Depends(get_current_user),
):
    q = db.query(Consultant)
    if search:
        q = q.filter(
            Consultant.full_name.ilike(f"%{search}%")
            | Consultant.role.ilike(f"%{search}%")
        )
    total = q.count()
    items = q.offset(skip).limit(limit).all()
    return ConsultantList(total=total, items=items)


@router.get("/{consultant_id}", response_model=ConsultantOut)
def get_consultant(
    consultant_id: str,
    db: Session = Depends(get_db),
    _: User = Depends(get_current_user),
):
    c = db.get(Consultant, consultant_id)
    if not c:
        raise HTTPException(status_code=404, detail="Consultant introuvable")
    return c


@router.post("/", response_model=ConsultantOut, status_code=status.HTTP_201_CREATED)
def create_consultant(
    payload: ConsultantCreate,
    db: Session = Depends(get_db),
    _: User = Depends(get_current_user),
):
    if db.query(Consultant).filter(Consultant.email == payload.email).first():
        raise HTTPException(status_code=400, detail="Email déjà utilisé")
    c = Consultant(**payload.model_dump())
    db.add(c)
    db.commit()
    db.refresh(c)
    return c


@router.put("/{consultant_id}", response_model=ConsultantOut)
def update_consultant(
    consultant_id: str,
    payload: ConsultantUpdate,
    db: Session = Depends(get_db),
    _: User = Depends(get_current_user),
):
    c = db.get(Consultant, consultant_id)
    if not c:
        raise HTTPException(status_code=404, detail="Consultant introuvable")
    for k, v in payload.model_dump(exclude_unset=True).items():
        setattr(c, k, v)
    db.commit()
    db.refresh(c)
    return c


@router.delete("/{consultant_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_consultant(
    consultant_id: str,
    db: Session = Depends(get_db),
    _: User = Depends(get_current_user),
):
    c = db.get(Consultant, consultant_id)
    if not c:
        raise HTTPException(status_code=404, detail="Consultant introuvable")
    db.delete(c)
    db.commit()
