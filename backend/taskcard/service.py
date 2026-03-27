from .repo import TaskCardRepository
from models.schemas import TaskCard
from typing import List, Optional
from pydantic import BaseModel

class TaskCardService:
    def __init__(self):
        self.repo = TaskCardRepository()

    async def list_taskcards(self) -> List[TaskCard]:
        taskcards = await self.repo.get_all_taskcards()
        return [TaskCard.from_orm(tc) for tc in taskcards]

    async def get_taskcard(self, taskcard_id: int) -> Optional[TaskCard]:
        card = await self.repo.get_taskcard(taskcard_id)
        return TaskCard.from_orm(card) if card else None

    async def create_taskcard(self, data: BaseModel) -> TaskCard:
        card = await self.repo.create_taskcard(data)
        return TaskCard.from_orm(card)

    async def update_taskcard(self, taskcard_id: int, data: BaseModel) -> Optional[TaskCard]:
        card = await self.repo.update_taskcard(taskcard_id, data)
        return TaskCard.from_orm(card) if card else None

    async def delete_taskcard(self, taskcard_id: int) -> bool:
        return await self.repo.soft_delete_taskcard(taskcard_id)
