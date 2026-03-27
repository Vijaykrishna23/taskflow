import os
from sqlalchemy import select
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

from database.session import Database
from models.tables import Board
from typing import List

from sqlalchemy import select
from datetime import datetime, timezone

class BoardRepository:
    async def get_all_boards(self) -> List[Board]:
        async with Database().get_session() as session:
            result = await session.execute(select(Board).where(Board.deleted_at == None))
            return list(result.scalars().all())

    async def get_board(self, board_id: int):
        async with Database().get_session() as session:
            result = await session.execute(select(Board).where(Board.id == board_id, Board.deleted_at == None))
            return result.scalar_one_or_none()

    async def create_board(self, name, owner_id):
        async with Database().get_session() as session:
            board = Board(name=name, owner_id=owner_id)
            session.add(board)
            await session.commit()
            await session.refresh(board)
            return board

    async def update_board(self, board_id: int, data):
        async with Database().get_session() as session:
            result = await session.execute(select(Board).where(Board.id == board_id, Board.deleted_at == None))
            board = result.scalar_one_or_none()
            if not board:
                return None
            if data.name is not None:
                board.name = data.name
            if data.owner_id is not None:
                board.owner_id = data.owner_id
            board.updated_at = datetime.now(tz=timezone.utc)
            await session.commit()
            await session.refresh(board)
            return board

    async def soft_delete_board(self, board_id: int) -> bool:
        async with Database().get_session() as session:
            result = await session.execute(select(Board).where(Board.id == board_id, Board.deleted_at == None))
            board = result.scalar_one_or_none()
            if not board:
                return False
            now = datetime.now(tz=timezone.utc)
            board.deleted_at = now
            # Cascade soft delete to tasklists and taskcards
            for tasklist in board.tasklists:
                tasklist.deleted_at = now
                for card in tasklist.taskcards:
                    card.deleted_at = now
            await session.commit()
            return True
