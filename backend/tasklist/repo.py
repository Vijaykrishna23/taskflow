import os
from dotenv import load_dotenv
from sqlalchemy import select

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

from database.session import Database
from models.tables import TaskList
from typing import List

from sqlalchemy import select
from datetime import datetime, timezone

class TaskListRepository:
    async def get_all_tasklists(self) -> List[TaskList]:
        async with Database().get_session() as session:
            result = await session.execute(select(TaskList).where(TaskList.deleted_at == None))
            return list(result.scalars().all())

    async def get_tasklist(self, tasklist_id: int):
        async with Database().get_session() as session:
            result = await session.execute(select(TaskList).where(TaskList.id == tasklist_id, TaskList.deleted_at == None))
            return result.scalar_one_or_none()

    async def create_tasklist(self, name, board_id):
        async with Database().get_session() as session:
            tasklist = TaskList(name=name, board_id=board_id)
            session.add(tasklist)
            await session.commit()
            await session.refresh(tasklist)
            return tasklist

    async def update_tasklist(self, tasklist_id: int, data):
        async with Database().get_session() as session:
            result = await session.execute(select(TaskList).where(TaskList.id == tasklist_id, TaskList.deleted_at == None))
            tasklist = result.scalar_one_or_none()
            if not tasklist:
                return None
            if data.name is not None:
                tasklist.name = data.name
            if data.board_id is not None:
                tasklist.board_id = data.board_id
            tasklist.updated_at = datetime.now(tz=timezone.utc)
            await session.commit()
            await session.refresh(tasklist)
            return tasklist

    async def soft_delete_tasklist(self, tasklist_id: int) -> bool:
        async with Database().get_session() as session:
            result = await session.execute(select(TaskList).where(TaskList.id == tasklist_id, TaskList.deleted_at == None))
            tasklist = result.scalar_one_or_none()
            if not tasklist:
                return False
            now = datetime.now(tz=timezone.utc)
            tasklist.deleted_at = now
            for card in tasklist.taskcards:
                card.deleted_at = now
            await session.commit()
            return True
