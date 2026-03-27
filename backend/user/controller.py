
from fastapi import APIRouter, Depends
from .service import UserService
from auth.deps import JWTBearer

router = APIRouter(prefix="/users", tags=["users"])

@router.get("/", dependencies=[Depends(JWTBearer())])
async def list_users():
    return await UserService().list_users()
 