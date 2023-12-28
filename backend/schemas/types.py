from pydantic import  BaseModel
from typing import List

class TypesDetailsModel(BaseModel):
    id: int
    name: str

class TypesList(BaseModel):
    results: List[TypesDetailsModel]