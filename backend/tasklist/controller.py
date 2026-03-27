
from fastapi import APIRouter, Depends
from .service import TaskListService
from auth.deps import JWTBearer

router = APIRouter(prefix="/tasklists", tags=["tasklists"])


from fastapi import HTTPException
from models.schemas import TaskList
from pydantic import BaseModel
from typing import List, Optional

class TaskListCreate(BaseModel):
    name: str
    board_id: int

class TaskListUpdate(BaseModel):
    name: Optional[str] = None
    board_id: Optional[int] = None

@router.get("/", response_model=List[TaskList], dependencies=[Depends(JWTBearer())])
async def list_tasklists():
    return await TaskListService().list_tasklists()

@router.get("/{tasklist_id}", response_model=TaskList, dependencies=[Depends(JWTBearer())])
async def get_tasklist(tasklist_id: int):
    tasklist = await TaskListService().get_tasklist(tasklist_id)
    if not tasklist:
        raise HTTPException(status_code=404, detail="TaskList not found")
    return tasklist

@router.post("/", response_model=TaskList, dependencies=[Depends(JWTBearer())])
async def create_tasklist(data: TaskListCreate):
    return await TaskListService().create_tasklist(data)

@router.put("/{tasklist_id}", response_model=TaskList, dependencies=[Depends(JWTBearer())])
async def update_tasklist(tasklist_id: int, data: TaskListUpdate):
    tasklist = await TaskListService().update_tasklist(tasklist_id, data)
    if not tasklist:
        raise HTTPException(status_code=404, detail="TaskList not found")
    return tasklist

@router.delete("/{tasklist_id}", status_code=204, dependencies=[Depends(JWTBearer())])
async def delete_tasklist(tasklist_id: int):
    deleted = await TaskListService().delete_tasklist(tasklist_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="TaskList not found")
