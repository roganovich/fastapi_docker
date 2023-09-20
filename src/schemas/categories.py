from typing import List, Optional
from pydantic import  BaseModel, Field

class CategoryModel(BaseModel):
    parent_id: int
    title: str = Field(max_length=100)
    content: str

class CategoryParentModel(BaseModel):
    id: int
    title: str
    content: str

class CategoryDetailsModel(BaseModel):
    id: int
    title: str
    content: str
    parent_id: int
    parent: Optional[CategoryParentModel]


class CategoryList(BaseModel):
    total_count: int
    results: List[CategoryDetailsModel]