from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.mission import Mission
from app.models.user import User
from app.schemas.mission import MissionCreate, MissionOut, MissionUpdate, MissionList
from app.core.deps import get_current_user

router = APIRouter()


@router.get("/", response_model=MissionList)
def list_missions(
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
    status_filter: str | None = Query(None, alias="status"),
    db: Session = Depends(get_db),
    _: User = Depends(get_current_user),
):
    q = db.query(Mission)
    if status_filter:
        q = q.filter(Mission.status == status_filter)
    total = q.count()
    items = q.offset(skip).limit(limit).all()
    return MissionList(total=total, items=items)


@router.get("/{mission_id}", response_model=MissionOut)
def get_mission(
    mission_id: str,
    db: Session = Depends(get_db),
    _: User = Depends(get_current_user),
):
    m = db.get(Mission, mission_id)
    if not m:
        raise HTTPException(status_code=404, detail="Mission introuvable")
    return m


@router.post("/", response_model=MissionOut, status_code=status.HTTP_201_CREATED)
def create_mission(
    payload: MissionCreate,
    db: Session = Depends(get_db),
    _: User = Depends(get_current_user),
):
    m = Mission(**payload.model_dump())
    db.add(m)
    db.commit()
    db.refresh(m)
    return m


@router.put("/{mission_id}", response_model=MissionOut)
def update_mission(
    mission_id: str,
    payload: MissionUpdate,
    db: Session = Depends(get_db),
    _: User = Depends(get_current_user),
):
    m = db.get(Mission, mission_id)
    if not m:
        raise HTTPException(status_code=404, detail="Mission introuvable")
    for k, v in payload.model_dump(exclude_unset=True).items():
        setattr(m, k, v)
    db.commit()
    db.refresh(m)
    return m


@router.delete("/{mission_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_mission(
    mission_id: str,
    db: Session = Depends(get_db),
    _: User = Depends(get_current_user),
):
    m = db.get(Mission, mission_id)
    if not m:
        raise HTTPException(status_code=404, detail="Mission introuvable")
    db.delete(m)
    db.commit()
