from pydantic import  BaseModel, Field, validator
from datetime import datetime

class PostModel(BaseModel):
    title: str
    content: str

class PostDetailsModel(BaseModel):
    id: int
    created_at: datetime
    title: str
    content: str
