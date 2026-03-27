from fastapi import APIRouter, Depends, HTTPException
from auth.deps import JWTBearer
import asyncio
from database.session import engine, Base
import models.tables

router = APIRouter(prefix="/database", tags=["database"])

@router.get("/init")
async def init_db_endpoint():
    try:
        async with engine.begin() as conn:
            await conn.run_sync(Base.metadata.create_all)
        return {"status": "success", "message": "Database tables created."}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
