from fastapi import FastAPI

from user.controller import router as user_router
from board.controller import router as board_router
from tasklist.controller import router as tasklist_router
from taskcard.controller import router as taskcard_router
from auth.controller import router as auth_router

app = FastAPI()


app.include_router(auth_router)
app.include_router(user_router)
app.include_router(board_router)
app.include_router(tasklist_router)
app.include_router(taskcard_router)

@app.get("/")
def read_root():
    return {"Hello": "World"}
