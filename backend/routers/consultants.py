from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

import crud
from database import get_db
from schemas import ConsultantCreate, ConsultantOut, ConsultantUpdate
from routers.auth import get_current_user

router = APIRouter(prefix="/consultants", tags=["Consultants"])


@router.post(
    "/",
    response_model=ConsultantOut,
    status_code=status.HTTP_201_CREATED,
    summary="Créer un consultant",
)
def create_consultant(
    payload: ConsultantCreate,
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user),
):
    return crud.create(db, payload)


@router.get(
    "/",
    response_model=list[ConsultantOut],
    status_code=status.HTTP_200_OK,
    summary="Lister tous les consultants",
)
def list_consultants(
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user),
):
    return crud.get_all(db)


@router.get(
    "/{consultant_id}",
    response_model=ConsultantOut,
    status_code=status.HTTP_200_OK,
    summary="Profil d'un consultant",
)
def get_consultant(
    consultant_id: str,
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user),
):
    return crud.get_by_id(db, consultant_id)


@router.put(
    "/{consultant_id}",
    response_model=ConsultantOut,
    status_code=status.HTTP_200_OK,
    summary="Modifier un consultant",
)
def update_consultant(
    consultant_id: str,
    payload: ConsultantUpdate,
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user),
):
    return crud.update(db, consultant_id, payload)


@router.delete(
    "/{consultant_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Supprimer un consultant",
)
def delete_consultant(
    consultant_id: str,
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user),
):
    crud.delete(db, consultant_id)
