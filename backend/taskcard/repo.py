import os
from dotenv import load_dotenv
from sqlalchemy import select

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

from database.session import Database
from models.tables import TaskCard
from typing import List

from sqlalchemy import select
from datetime import datetime, timezone

class TaskCardRepository:
    async def get_all_taskcards(self) -> List[TaskCard]:
        async with Database().get_session() as session:
            result = await session.execute(select(TaskCard).where(TaskCard.deleted_at == None))
            return list(result.scalars().all())

    async def get_taskcard(self, taskcard_id: int):
        async with Database().get_session() as session:
            result = await session.execute(select(TaskCard).where(TaskCard.id == taskcard_id, TaskCard.deleted_at == None))
            return result.scalar_one_or_none()

    async def create_taskcard(self, data):
        async with Database().get_session() as session:
            card = TaskCard(
                title=data.title,
                description=data.description,
                tasklist_id=data.tasklist_id,
                assigned_to=data.assigned_to,
                position=data.position
            )
            session.add(card)
            await session.commit()
            await session.refresh(card)
            return card

    async def update_taskcard(self, taskcard_id: int, data):
        async with Database().get_session() as session:
            result = await session.execute(select(TaskCard).where(TaskCard.id == taskcard_id, TaskCard.deleted_at == None))
            card = result.scalar_one_or_none()
            if not card:
                return None
            if data.title is not None:
                card.title = data.title
            if data.description is not None:
                card.description = data.description
            if data.tasklist_id is not None:
                card.tasklist_id = data.tasklist_id
            if data.assigned_to is not None:
                card.assigned_to = data.assigned_to
            if data.position is not None:
                card.position = data.position
            card.updated_at = datetime.now(tz=timezone.utc)
            await session.commit()
            await session.refresh(card)
            return card

    async def soft_delete_taskcard(self, taskcard_id: int) -> bool:
        async with Database().get_session() as session:
            result = await session.execute(select(TaskCard).where(TaskCard.id == taskcard_id, TaskCard.deleted_at == None))
            card = result.scalar_one_or_none()
            if not card:
                return False
            card.deleted_at = datetime.now(tz=timezone.utc)
            await session.commit()
            return True
