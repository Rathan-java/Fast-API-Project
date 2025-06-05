from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Dict

app = FastAPI()

class User(BaseModel):
    id: int
    name: str
    email: str

# simple in-memory storage
users: Dict[int, User] = {}

@app.post('/users', response_model=User, status_code=201)
def create_user(user: User):
    if user.id in users:
        raise HTTPException(status_code=400, detail='User already exists')
    users[user.id] = user
    return user

@app.get('/users/{user_id}', response_model=User)
def get_user(user_id: int):
    if user_id not in users:
        raise HTTPException(status_code=404, detail='User not found')
    return users[user_id]

@app.put('/users/{user_id}', response_model=User)
def update_user(user_id: int, user: User):
    if user_id not in users:
        raise HTTPException(status_code=404, detail='User not found')
    users[user_id] = user
    return user

@app.delete('/users/{user_id}')
def delete_user(user_id: int):
    if user_id not in users:
        raise HTTPException(status_code=404, detail='User not found')
    del users[user_id]
    return {"message": "User deleted"}

@app.get('/users', response_model=list[User])
def list_users():
    return list(users.values())
