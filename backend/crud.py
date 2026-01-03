from sqlalchemy.orm import Session
from sqlalchemy import func
import models, schemas
from datetime import datetime

# Mentees
def get_mentees(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Mentee).offset(skip).limit(limit).all()

def create_mentee(db: Session, mentee: schemas.MenteeCreate):
    db_mentee = models.Mentee(name=mentee.name, goal=mentee.goal)
    db.add(db_mentee)
    db.commit()
    db.refresh(db_mentee)
    return db_mentee

def get_mentee(db: Session, mentee_id: int):
    return db.query(models.Mentee).filter(models.Mentee.id == mentee_id).first()

def delete_mentee(db: Session, mentee_id: int):
    db_mentee = db.query(models.Mentee).filter(models.Mentee.id == mentee_id).first()
    if db_mentee:
        db.delete(db_mentee)
        db.commit()
    return db_mentee

# Sessions
def get_sessions(db: Session, start_date: datetime = None, end_date: datetime = None):
    query = db.query(models.Session)
    if start_date:
        query = query.filter(models.Session.start_time >= start_date)
    if end_date:
        query = query.filter(models.Session.start_time <= end_date)
    return query.order_by(models.Session.start_time).all()

def create_session(db: Session, session: schemas.SessionCreate):
    db_session = models.Session(**session.dict())
    db.add(db_session)
    db.commit()
    db.refresh(db_session)
    return db_session

def get_session(db: Session, session_id: int):
    return db.query(models.Session).filter(models.Session.id == session_id).first()

def update_session(db: Session, session_id: int, session_update: schemas.SessionUpdate):
    db_session = get_session(db, session_id)
    if not db_session:
        return None
    
    update_data = session_update.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_session, key, value)
    
    db.add(db_session)
    db.commit()
    db.refresh(db_session)
    return db_session

def delete_session(db: Session, session_id: int):
    db_session = get_session(db, session_id)
    if db_session:
        db.delete(db_session)
        db.commit()
    return db_session

# Stats
def get_stats(db: Session):
    total_mentees = db.query(models.Mentee).count()
    # Simple logic: count sessions in current month
    now = datetime.utcnow()
    month_start = datetime(now.year, now.month, 1)
    upcoming_sessions = db.query(models.Session).filter(
        models.Session.start_time >= now,
        models.Session.status == 'scheduled'
    ).count()
    
    return {
        "total_mentees": total_mentees,
        "upcoming_sessions": upcoming_sessions,
        "active_mentees": total_mentees # Simplifying for now
    }
