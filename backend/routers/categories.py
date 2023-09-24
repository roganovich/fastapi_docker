from schemas.categories import CategoryModel, CategoryList, CategoryDetailsModel
from service import categories as categories_service
from fastapi import APIRouter, Depends, HTTPException, status
router = APIRouter()

@router.post("/categories", response_model=CategoryDetailsModel, status_code=201, tags=["Posts"])
async def create_category(
    category: CategoryModel
):
    return await categories_service.create_category(category)

@router.get("/categories", response_model=CategoryList, tags=["Categories"])
async def get_categories(page: int = 1):
    total_cout = await categories_service.get_categories_count()
    categories = await categories_service.get_categories(page)
    return {"total_count": total_cout, "results": categories}

@router.get("/categories/{category_id}", response_model=CategoryDetailsModel, tags=["Categories"])
async def get_category(category_id: int):
    return await categories_service.get_category(category_id)

@router.delete("/categories/{category_id}", tags=["Categories"])
async def get_category(category_id: int):
    return await categories_service.delete_category(category_id)

@router.put("/categories/{category_id}", response_model=CategoryDetailsModel, tags=["Categories"])
async def update_category(
    category_id: int, category_data: CategoryModel
):
    await categories_service.update_category(category_id=category_id, post=category_data)
    return await categories_service.get_category(category_id)