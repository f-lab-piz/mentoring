from fastapi import FastAPI, Depends, HTTPException, status
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional
from datetime import datetime

import models, schemas, crud
from database import engine, get_db

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Mentoring Management System API")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, set to frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Welcome to Mentoring System API"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}

# Mentee Endpoints
@app.post("/api/v1/mentees", response_model=schemas.Mentee)
def create_mentee(mentee: schemas.MenteeCreate, db: Session = Depends(get_db)):
    return crud.create_mentee(db=db, mentee=mentee)

@app.get("/api/v1/mentees", response_model=List[schemas.Mentee])
def read_mentees(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud.get_mentees(db, skip=skip, limit=limit)

@app.get("/api/v1/mentees/{mentee_id}", response_model=schemas.Mentee)
def read_mentee(mentee_id: int, db: Session = Depends(get_db)):
    db_mentee = crud.get_mentee(db, mentee_id=mentee_id)
    if db_mentee is None:
        raise HTTPException(status_code=404, detail="Mentee not found")
    return db_mentee

@app.delete("/api/v1/mentees/{mentee_id}")
def delete_mentee(mentee_id: int, db: Session = Depends(get_db)):
    crud.delete_mentee(db, mentee_id=mentee_id)
    return {"detail": "Mentee deleted"}

# Session Endpoints
@app.post("/api/v1/sessions", response_model=schemas.Session)
def create_session(session: schemas.SessionCreate, db: Session = Depends(get_db)):
    return crud.create_session(db=db, session=session)

@app.get("/api/v1/sessions", response_model=List[schemas.Session])
def read_sessions(start_date: Optional[datetime] = None, end_date: Optional[datetime] = None, db: Session = Depends(get_db)):
    return crud.get_sessions(db, start_date=start_date, end_date=end_date)

@app.put("/api/v1/sessions/{session_id}", response_model=schemas.Session)
def update_session(session_id: int, session: schemas.SessionUpdate, db: Session = Depends(get_db)):
    db_session = crud.update_session(db, session_id=session_id, session_update=session)
    if not db_session:
        raise HTTPException(status_code=404, detail="Session not found")
    return db_session

@app.delete("/api/v1/sessions/{session_id}")
def delete_session(session_id: int, db: Session = Depends(get_db)):
    crud.delete_session(db, session_id=session_id)
    return {"detail": "Session deleted"}

# Stats
@app.get("/api/v1/stats")
def read_stats(db: Session = Depends(get_db)):
    return crud.get_stats(db)
