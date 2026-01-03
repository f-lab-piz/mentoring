from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from database import Base, get_db
from main import app
import pytest

# Use in-memory SQLite for testing
SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"

engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base.metadata.create_all(bind=engine)

def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db

client = TestClient(app)

def test_read_main():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Welcome to Mentoring System API"}

def test_create_mentee():
    response = client.post(
        "/api/v1/mentees",
        json={"name": "Test Mentee", "goal": "Become a senior dev"},
    )
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == "Test Mentee"
    assert "id" in data

def test_read_mentees():
    response = client.get("/api/v1/mentees")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_create_session():
    # First create a mentee
    mentee_res = client.post(
        "/api/v1/mentees",
        json={"name": "Session Mentee", "goal": "Testing"},
    )
    mentee_id = mentee_res.json()["id"]
    
    response = client.post(
        "/api/v1/sessions",
        json={
            "mentee_id": mentee_id,
            "start_time": "2023-11-20T10:00:00",
            "duration_minutes": 60
        }
    )
    assert response.status_code == 200
    data = response.json()
    assert data["mentee_id"] == mentee_id
    assert data["status"] == "scheduled"
