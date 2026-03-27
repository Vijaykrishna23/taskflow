import asyncpg
import os
from dotenv import load_dotenv
from sqlalchemy import select

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

from database.session import Database
from models.tables import User
from typing import List

class UserRepository:
    async def get_all_users(self) -> List[dict]:
        async with Database().get_session() as session:
            result = await session.execute(select(User))
            users = result.scalars().all()
            return [u.dict() for u in users]
