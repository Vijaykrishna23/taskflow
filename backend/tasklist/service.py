from .repo import TaskListRepository
from models.schemas import TaskList
from typing import List, Optional
from pydantic import BaseModel

class TaskListService:
    def __init__(self):
        self.repo = TaskListRepository()

    async def list_tasklists(self) -> List[TaskList]:
        tasklists = await self.repo.get_all_tasklists()
        return [TaskList.from_orm(tl) for tl in tasklists]

    async def get_tasklist(self, tasklist_id: int) -> Optional[TaskList]:
        tasklist = await self.repo.get_tasklist(tasklist_id)
        return TaskList.from_orm(tasklist) if tasklist else None

    async def create_tasklist(self, data: BaseModel) -> TaskList:
        tasklist = await self.repo.create_tasklist(data.name, data.board_id)
        return TaskList.from_orm(tasklist)

    async def update_tasklist(self, tasklist_id: int, data: BaseModel) -> Optional[TaskList]:
        tasklist = await self.repo.update_tasklist(tasklist_id, data)
        return TaskList.from_orm(tasklist) if tasklist else None

    async def delete_tasklist(self, tasklist_id: int) -> bool:
        return await self.repo.soft_delete_tasklist(tasklist_id)
