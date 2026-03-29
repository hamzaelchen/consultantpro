from datetime import date, datetime
from pydantic import BaseModel
from app.models.mission import MissionStatus
from app.schemas.consultant import ConsultantOut


class MissionBase(BaseModel):
    title: str
    client: str
    description: str | None = None
    tjm: int | None = None
    start_date: date | None = None
    end_date: date | None = None
    status: MissionStatus = MissionStatus.en_attente
    consultant_id: str | None = None


class MissionCreate(MissionBase):
    pass


class MissionUpdate(BaseModel):
    title: str | None = None
    client: str | None = None
    description: str | None = None
    tjm: int | None = None
    start_date: date | None = None
    end_date: date | None = None
    status: MissionStatus | None = None
    consultant_id: str | None = None


class MissionOut(MissionBase):
    id: str
    consultant: ConsultantOut | None = None
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}


class MissionList(BaseModel):
    total: int
    items: list[MissionOut]
