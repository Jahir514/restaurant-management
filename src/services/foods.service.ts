import { ICreateFood, IFood, IUpdateFood } from "../interfaces/foods.interface";
import { DataResponse, PaginatedResponse } from "../types/response.types";
import Food from "../models/foods.model";
import { BaseError } from "../errors/BaseError";
import { logger } from "../config/logger.config";

export const createFood = async (data: ICreateFood): Promise<DataResponse<IFood>> => {
  const { name, slug, description, price, discount_price, status, featured } = data;
  if (!name || !slug || !description || !price)
    throw new BaseError("VALIDATION_ERROR", 400, "Please provide correct food information.");
  const foodInfo = {
    name,
    slug,
    description,
    price,
    discount_price: discount_price ?? null,
    status: status ?? "1",
    featured: featured ?? "0",
  };
  const savedFood = await new Food(foodInfo).save();
  if (savedFood) {
    return {
      success: true,
      message: "Successfully created food/package menu",
      data: savedFood,
    };
  } else {
    throw new BaseError("DATABASE_ERROR", 400, "Failed to create food/package menu");
  }
};

export const getAllFood = async (): Promise<PaginatedResponse<IFood>> => {
  const items = await Food.find().sort({ created_at: -1 });
  const total = await Food.countDocuments();
  const page = 1;
  const limit = items.length;
  return {
    success: true,
    message: items.length === 0 ? "No food/package menu found." : "",
    data: items,
    pagination: {
      total,
      page,
      limit,
      pages: 1,
    },
  };
};

export const getSingleFood = async (foodId: string): Promise<DataResponse<IFood>> => {
  const food = await Food.findById(foodId);
  if (food) {
    return {
      success: true,
      message: "",
      data: food,
    };
  } else {
    throw new BaseError("NOT_FOUND", 400, "No food/package menu found.");
  }
};

export const updateFood = async (foodId: string, data: IUpdateFood): Promise<DataResponse<IFood>> => {
  const updatedFood = await Food.findByIdAndUpdate(foodId, data, { new: true });
  if (updatedFood) {
    return {
      success: true,
      message: "Successfully updated food/package menu",
      data: updatedFood,
    };
  } else {
    return {
      success: false,
      message: "Failed to update food/package menu",
      data: updatedFood,
    };
  }
};

export const deleteFood = async (foodId: string): Promise<DataResponse<null>> => {
  const deleted = await Food.findByIdAndDelete(foodId);
  if (deleted) {
    return {
      success: true,
      message: "Successfully deleted food/package menu",
      data: null,
    };
  } else {
    return {
      success: false,
      message: "Failed to delete food/package menu",
      data: null,
    };
  }
};
