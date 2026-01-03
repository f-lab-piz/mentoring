from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from database import Base
import datetime

class Mentee(Base):
    __tablename__ = "mentees"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    goal = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    
    sessions = relationship("Session", back_populates="mentee")

class Session(Base):
    __tablename__ = "sessions"

    id = Column(Integer, primary_key=True, index=True)
    mentee_id = Column(Integer, ForeignKey("mentees.id"))
    start_time = Column(DateTime)
    duration_minutes = Column(Integer, default=60)
    status = Column(String, default="scheduled") # scheduled, completed, cancelled, postponed
    memo = Column(Text, nullable=True)
    
    mentee = relationship("Mentee", back_populates="sessions")
