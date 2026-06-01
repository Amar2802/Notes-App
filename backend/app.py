from fastapi import FastAPI, Depends, HTTPException, Header
from sqlalchemy.orm import Session
from database import engine, get_db
from models import Base, User, Note 
from schemas import UserCreate, UserLogin, NoteCreate
from auth import (hash_password, verify_password, create_access_token, verify_token)

Base.metadata.create_all(bind=engine)
def get_current_user(authorization: str = Header(None)):
    if not authorization:
        raise HTTPException(status_code=401, detail="Authorization header missing")
    token = authorization.split(" ")[1] if " " in authorization else authorization
    payload = verify_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")
    return payload["user_id"]

app = FastAPI()

@app.get("/")
def home():
    return {"message": "Welcome to the Notes App API!"}

@app.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter((User.username == user.username) | (User.email == user.email)).first()
    if existing_user:
        return {"error": "Email already exists"}
    new_user = User(username=user.username, email=user.email, password=hash_password(user.password))
    db.add(new_user)
    db.commit()
    return {"message": "User registered successfully"}

@app.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()
    if not db_user:
        return {"error": "Invalid email or password"}
    if not verify_password(user.password, db_user.password):
        return {"error": "Invalid email or password"}
    token = create_access_token({"user_id": db_user.id})
    return {"access_token": token}

@app.post("/notes")
def create_note(note: NoteCreate, db: Session = Depends(get_db), user_id: int = Depends(get_current_user)):
    new_note = Note(title=note.title, content=note.content, user_id=user_id)
    db.add(new_note)
    db.commit()
    return {"message": "Note created successfully"}

@app.get("/notes")
def get_notes(db: Session = Depends(get_db), user_id: int = Depends(get_current_user)):
    notes = db.query(Note).filter(Note.user_id == user_id).all()
    return notes

@app.put("/notes/{note_id}")
def update_note(note_id: int, note: NoteCreate, db: Session = Depends(get_db), user_id: int = Depends(get_current_user)):
    db_note = db.query(Note).filter(Note.id == note_id, Note.user_id == user_id).first()
    if not db_note:
        raise HTTPException(status_code=404, detail="Note not found")
    db_note.title = note.title
    db_note.content = note.content
    db.commit()
    return {"message": "Note updated successfully"}

@app.delete("/notes/{note_id}")
def delete_note(note_id: int, db: Session = Depends(get_db), user_id: int = Depends(get_current_user)):
    db_note = db.query(Note).filter(Note.id == note_id, Note.user_id == user_id).first()
    if not db_note:
        raise HTTPException(status_code=404, detail="Note not found")
    db.delete(db_note)
    db.commit()
    return {"message": "Note deleted successfully"}
