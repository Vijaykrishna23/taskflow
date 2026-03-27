from .repo import UserRepository

from models.schemas import User
from typing import List

class UserService:
    def __init__(self):
        self.repo = UserRepository()

    async def list_users(self) -> List[User]:
        users = await self.repo.get_all_users()
        return [User.from_orm(u) for u in users]
