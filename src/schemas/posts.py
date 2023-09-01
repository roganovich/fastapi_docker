from typing import List, Optional
from pydantic import  BaseModel, Field
from datetime import datetime

from schemas.users import UsersDetailsModel

class PostModel(BaseModel):
    title: str = Field(max_length=5)
    content: str

class PostDetailsModel(BaseModel):
    id: int
    created_at: datetime
    title: str
    content: str
    user: Optional[UsersDetailsModel]

class PostList(BaseModel):
    total_count: int
    results: List[PostDetailsModel]