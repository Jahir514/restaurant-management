import {
  ICreateFoodsCategory,
  IFoodsCategory,
  IUpdateFoodsCategory,
} from "../interfaces/foodsCategory.interface";
import { DataResponse, PaginatedResponse } from "../types/response.types";
import FoodsCategory from "../models/foodsCategory.model";
import { BaseError } from "../errors/BaseError";
import { BaseService } from "./base.service";

class FoodsCategoryService extends BaseService<IFoodsCategory> {
  constructor() {
    super(FoodsCategory);
  }

  async createFoodsCategory(
    data: ICreateFoodsCategory
  ): Promise<DataResponse<IFoodsCategory>> {
    const { category_name, slug, description } = data;
    if (!category_name || !slug || !description)
      throw new BaseError(
        "VALIDATION_ERROR",
        400,
        "Please provide correct foods category information."
      );
    const categoryInfo = {
      ...data,
    };
    const savedCategory = await this.create(categoryInfo);
    if (savedCategory) {
      return {
        success: true,
        message: "Successfully created foods category",
        data: savedCategory,
      };
    } else {
      throw new BaseError(
        "DATABASE_ERROR",
        400,
        "Failed to create foods category"
      );
    }
  }

  async getAllFoodsCategory(): Promise<PaginatedResponse<IFoodsCategory>> {
    const result = await this.findAll();
    return {
      success: true,
      message: result.items.length === 0 ? "No foods category found." : "",
      data: result.items,
      pagination: {
        total: result.total,
        page: result.page,
        limit: result.limit,
        pages: Math.ceil(result.total / result.limit),
      },
    };
  }

  async getSingleFoodsCategory(
    categoryId: string
  ): Promise<DataResponse<IFoodsCategory>> {
    const category = await this.findById(categoryId);
    if (category) {
      return {
        success: true,
        message: "",
        data: category,
      };
    } else {
      throw new BaseError("NOT_FOUND", 400, "No foods category found.");
    }
  }

  async updateFoodsCategory(
    categoryId: string,
    data: IUpdateFoodsCategory
  ): Promise<DataResponse<IFoodsCategory>> {
    const updatedCategory = await this.update(categoryId, data);
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
  }

  async deleteFoodsCategory(categoryId: string): Promise<DataResponse<null>> {
    const deleted = await this.delete(categoryId);
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
  }
}

const foodsCategoryService = new FoodsCategoryService();
export default foodsCategoryService;
