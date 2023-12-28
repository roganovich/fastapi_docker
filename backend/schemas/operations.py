from pydantic import  BaseModel
from typing import List, Optional
from schemas.types import TypesDetailsModel
from schemas.users import UsersDetailsModel
from datetime import datetime

class OperationsModel(BaseModel):
    type_id: int
    amount: float

class OperationsDetailsModel(BaseModel):
    id: int
    type: Optional[TypesDetailsModel]
    amount: float
    created_at: datetime
    updated_at: datetime

class OperationsList(BaseModel):
    user: UsersDetailsModel
    results: List[OperationsDetailsModel]