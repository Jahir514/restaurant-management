import { ICreateFood, IFood, IUpdateFood } from "../interfaces/foods.interface";
import { DataResponse, PaginatedResponse } from "../types/response.types";
import Food from "../models/foods.model";
import { BaseError } from "../errors/BaseError";
import { BaseService } from "./base.service";

class FoodService extends BaseService<IFood> {
  constructor() {
    super(Food);
  }

  // Business logic for creating a new food/package menu
  async createFood(data: ICreateFood): Promise<DataResponse<IFood>> {
    const { name, slug, description, price, discount_price, status, featured } =
      data;
    if (!name || !slug || !description || !price)
      throw new BaseError(
        "VALIDATION_ERROR",
        400,
        "Please provide correct food information."
      );
    // Serial number logic (optional, if needed)
    // const lastFoodInfo: IFood | null = await this.model.findOne().sort({ create: -1 });
    // let serialNo = lastFoodInfo ? lastFoodInfo.serialNo + 1 : 1001;
    const foodInfo = {
      name,
      slug,
      description,
      price,
      discount_price: discount_price ?? null,
      status: status ?? "1",
      featured: featured ?? "0",
    };
    // Use base service to create and save
    const savedFood = await this.create(foodInfo);
    if (savedFood) {
      return {
        success: true,
        message: "Successfully created food/package menu",
        data: savedFood,
      };
    } else {
      throw new BaseError(
        "DATABASE_ERROR",
        400,
        "Failed to create food/package menu"
      );
    }
  }

  // Business logic for getting all foods/package menus
  async getAllFood(): Promise<PaginatedResponse<IFood>> {
    // You can add business logic for filtering, pagination, etc. here
    const result = await this.findAll();
    return {
      success: true,
      message: result.items.length === 0 ? "No food/package menu found." : "",
      data: result.items,
      pagination: {
        total: result.total,
        page: result.page,
        limit: result.limit,
        pages: Math.ceil(result.total / result.limit),
      },
    };
  }

  // Business logic for getting a single food/package menu
  async getSingleFood(foodId: string): Promise<DataResponse<IFood>> {
    const food = await this.findById(foodId);
    if (food) {
      return {
        success: true,
        message: "",
        data: food,
      };
    } else {
      throw new BaseError("NOT_FOUND", 400, "No food/package menu found.");
    }
  }

  // Business logic for updating a food/package menu
  async updateFood(
    foodId: string,
    data: IUpdateFood
  ): Promise<DataResponse<IFood>> {
    const updatedFood = await this.update(foodId, data);
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
  }

  // Business logic for deleting a food/package menu
  async deleteFood(foodId: string): Promise<DataResponse<null>> {
    const deleted = await this.delete(foodId);
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
  }
}

const foodService = new FoodService();
export default foodService;
