from .repo import BoardRepository
from models.schemas import Board
from typing import List, Optional
from pydantic import BaseModel

class BoardService:
    def __init__(self):
        self.repo = BoardRepository()

    async def list_boards(self) -> List[Board]:
        boards = await self.repo.get_all_boards()
        return [Board.from_orm(b) for b in boards]

    async def get_board(self, board_id: int) -> Optional[Board]:
        board = await self.repo.get_board(board_id)
        return Board.from_orm(board) if board else None

    async def create_board(self, data: BaseModel) -> Board:
        board = await self.repo.create_board(data.name, data.owner_id)
        return Board.from_orm(board)

    async def update_board(self, board_id: int, data: BaseModel) -> Optional[Board]:
        board = await self.repo.update_board(board_id, data)
        return Board.from_orm(board) if board else None

    async def delete_board(self, board_id: int) -> bool:
        return await self.repo.soft_delete_board(board_id)
