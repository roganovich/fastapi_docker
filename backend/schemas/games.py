from pydantic import  BaseModel

class GameTableResult(BaseModel):
    status: str
    result: str