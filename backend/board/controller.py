
from fastapi import APIRouter, Depends
from .service import BoardService
from auth.deps import JWTBearer

router = APIRouter(prefix="/boards", tags=["boards"])


from fastapi import HTTPException
from models.schemas import Board
from pydantic import BaseModel
from typing import List, Optional

class BoardCreate(BaseModel):
    name: str
    owner_id: int

class BoardUpdate(BaseModel):
    name: Optional[str] = None
    owner_id: Optional[int] = None

@router.get("/", response_model=List[Board], dependencies=[Depends(JWTBearer())])
async def list_boards():
    return await BoardService().list_boards()

@router.get("/{board_id}", response_model=Board, dependencies=[Depends(JWTBearer())])
async def get_board(board_id: int):
    board = await BoardService().get_board(board_id)
    if not board:
        raise HTTPException(status_code=404, detail="Board not found")
    return board

@router.post("/", response_model=Board, dependencies=[Depends(JWTBearer())])
async def create_board(data: BoardCreate):
    return await BoardService().create_board(data)

@router.put("/{board_id}", response_model=Board, dependencies=[Depends(JWTBearer())])
async def update_board(board_id: int, data: BoardUpdate):
    board = await BoardService().update_board(board_id, data)
    if not board:
        raise HTTPException(status_code=404, detail="Board not found")
    return board

@router.delete("/{board_id}", status_code=204, dependencies=[Depends(JWTBearer())])
async def delete_board(board_id: int):
    deleted = await BoardService().delete_board(board_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Board not found")
