import { ICreateFoodsCategory, IFoodsCategory, IUpdateFoodsCategory } from "../interfaces/foodsCategory.interface";
import { DataResponse, PaginatedResponse } from "../types/response.types";
import FoodsCategory from "../models/foodsCategory.model";
import { BaseError } from "../errors/BaseError";

export const createFoodsCategory = async (data: ICreateFoodsCategory): Promise<DataResponse<IFoodsCategory>> => {
  const { category_name, slug, description } = data;
  if (!category_name || !slug || !description)
    throw new BaseError("VALIDATION_ERROR", 400, "Please provide correct foods category information.");
  const categoryInfo = { ...data };
  const savedCategory = await new FoodsCategory(categoryInfo).save();
  if (savedCategory) {
    return {
      success: true,
      message: "Successfully created foods category",
      data: savedCategory,
    };
  } else {
    throw new BaseError("DATABASE_ERROR", 400, "Failed to create foods category");
  }
};

export const getAllFoodsCategory = async (): Promise<PaginatedResponse<IFoodsCategory>> => {
  const items = await FoodsCategory.find();
  const total = await FoodsCategory.countDocuments();
  const page = 1;
  const limit = items.length;
  return {
    success: true,
    message: items.length === 0 ? "No foods category found." : "",
    data: items,
    pagination: {
      total,
      page,
      limit,
      pages: 1,
    },
  };
};

export const getSingleFoodsCategory = async (categoryId: string): Promise<DataResponse<IFoodsCategory>> => {
  const category = await FoodsCategory.findById(categoryId);
  if (category) {
    return {
      success: true,
      message: "",
      data: category,
    };
  } else {
    throw new BaseError("NOT_FOUND", 400, "No foods category found.");
  }
};

export const updateFoodsCategory = async (
  categoryId: string,
  data: IUpdateFoodsCategory
): Promise<DataResponse<IFoodsCategory>> => {
  const updatedCategory = await FoodsCategory.findByIdAndUpdate(categoryId, data, { new: true });
  if (updatedCategory) {
    return {
      success: true,
      message: "Successfully updated foods category",
      data: updatedCategory,
    };
  } else {
    return {
      success: false,
      message: "Failed to update foods category",
      data: updatedCategory,
    };
  }
};

export const deleteFoodsCategory = async (categoryId: string): Promise<DataResponse<null>> => {
  const deleted = await FoodsCategory.findByIdAndDelete(categoryId);
  if (deleted) {
    return {
      success: true,
      message: "Successfully deleted foods category",
      data: null,
    };
  } else {
    return {
      success: false,
      message: "Failed to delete foods category",
      data: null,
    };
  }
};
