from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class MenteeBase(BaseModel):
    name: str
    goal: Optional[str] = None

class MenteeCreate(MenteeBase):
    pass

class Mentee(MenteeBase):
    id: int
    created_at: datetime
    class Config:
        orm_mode = True

class SessionBase(BaseModel):
    start_time: datetime
    duration_minutes: int = 60
    memo: Optional[str] = None
    status: Optional[str] = "scheduled"

class SessionCreate(SessionBase):
    mentee_id: int

class SessionUpdate(BaseModel):
    start_time: Optional[datetime] = None
    duration_minutes: Optional[int] = None
    memo: Optional[str] = None
    status: Optional[str] = None

class Session(SessionBase):
    id: int
    mentee_id: int
    # mentee: Optional[Mentee] = None # Avoiding circular dependency for now or simple return
    class Config:
        orm_mode = True
