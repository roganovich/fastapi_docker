from fastapi import APIRouter, Depends
from schemas.operations import OperationsList, OperationsModel
from schemas.users import User

from service import operations as operations_service
from service.dependencies import get_current_user

router = APIRouter()


@router.get("/financial/operations", response_model=OperationsList, tags=["Financial"])
async def get_types_result(
        current_user: User = Depends(get_current_user)
):
    operations = await operations_service.get_list(current_user)
    return {"user": current_user, "results": operations}


@router.get("/financial/operations/add", tags=["Financial"])
async def get_types_result(
        operations_data: OperationsModel,
        current_user: User = Depends(get_current_user)
):
    await operations_service.add(current_user, operations_data)
    return {"status": "200"}
