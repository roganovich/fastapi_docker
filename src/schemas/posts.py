from typing import List, Optional
from pydantic import  BaseModel, Field
from datetime import datetime

from schemas.users import UsersDetailsModel
from schemas.categories import CategoryParentModel

class PostModel(BaseModel):
    title: str = Field(max_length=100)
    content: str

class PostDetailsModel(BaseModel):
    id: int
    created_at: datetime
    title: str
    content: str
    user: Optional[UsersDetailsModel]
    category: Optional[CategoryParentModel]

class PostList(BaseModel):
    total_count: int
    results: List[PostDetailsModel]