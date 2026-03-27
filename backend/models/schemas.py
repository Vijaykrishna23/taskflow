from pydantic import BaseModel
from typing import Optional

class User(BaseModel):
    id: int
    username: str
    email: str
    full_name: Optional[str]

    class Config:
        from_attributes = True

class Board(BaseModel):
    id: int
    name: str
    owner_id: int

    class Config:
        from_attributes = True

class TaskList(BaseModel):
    id: int
    name: str
    board_id: int

    class Config:
        from_attributes = True

class TaskCard(BaseModel):
    id: int
    title: str
    description: Optional[str]
    tasklist_id: int
    assigned_to: Optional[int]

    class Config:
        from_attributes = True
