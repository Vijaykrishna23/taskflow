
from fastapi import APIRouter, Depends
from .service import TaskCardService
from auth.deps import JWTBearer

router = APIRouter(prefix="/taskcards", tags=["taskcards"])


from fastapi import HTTPException, status
from models.schemas import TaskCard
from pydantic import BaseModel
from typing import List, Optional

class TaskCardCreate(BaseModel):
    title: str
    description: Optional[str] = None
    tasklist_id: int
    assigned_to: Optional[int] = None
    position: float

class TaskCardUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    tasklist_id: Optional[int] = None
    assigned_to: Optional[int] = None
    position: Optional[float] = None

@router.get("/", response_model=List[TaskCard], dependencies=[Depends(JWTBearer())])
async def list_taskcards():
    return await TaskCardService().list_taskcards()

@router.get("/{taskcard_id}", response_model=TaskCard, dependencies=[Depends(JWTBearer())])
async def get_taskcard(taskcard_id: int):
    card = await TaskCardService().get_taskcard(taskcard_id)
    if not card:
        raise HTTPException(status_code=404, detail="TaskCard not found")
    return card

@router.post("/", response_model=TaskCard, dependencies=[Depends(JWTBearer())])
async def create_taskcard(data: TaskCardCreate):
    return await TaskCardService().create_taskcard(data)

@router.put("/{taskcard_id}", response_model=TaskCard, dependencies=[Depends(JWTBearer())])
async def update_taskcard(taskcard_id: int, data: TaskCardUpdate):
    card = await TaskCardService().update_taskcard(taskcard_id, data)
    if not card:
        raise HTTPException(status_code=404, detail="TaskCard not found")
    return card

@router.delete("/{taskcard_id}", status_code=204, dependencies=[Depends(JWTBearer())])
async def delete_taskcard(taskcard_id: int):
    deleted = await TaskCardService().delete_taskcard(taskcard_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="TaskCard not found")
