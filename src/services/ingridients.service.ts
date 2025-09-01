
import { ICreateIngridients, IIngridients, IUpdateIngridients } from "../interfaces/ingridients.interface";
import { DataResponse, PaginatedResponse } from "../types/response.types";
import Ingridients from "../model/ingridients.model";
import { BaseError } from "../errors/BaseError";
import { BaseService } from "./base.service";

class IngridientsService extends BaseService<IIngridients> {
  constructor() {
    super(Ingridients);
  }

  // Business logic for creating a new ingredient
  async createIngridients(data: ICreateIngridients): Promise<DataResponse<IIngridients>> {
    const { name, supplier, category, costPrice, salePrice, stock, unit } = data;
    if (!name || !category || !costPrice || !salePrice || !stock || !unit)
      throw new BaseError("VALIDATION_ERROR", 400, "Please provide correct ingridients information.");
    // Serial number logic
    let serialNo: number = 1000;
    const lastIngridientsInfo: IIngridients | null = await this.model.findOne().sort({
      create: -1,
    });
    if (lastIngridientsInfo) {
      serialNo = lastIngridientsInfo.serialNo + 1;
    } else {
      serialNo += 1;
    }
    const ingridientsInfo = {
      name,
      serialNo,
      ...(supplier && { supplier }),
      category,
      costPrice,
      salePrice,
      stock,
      unit,
    };
    // Use base service to create and save
    const savedIngridents = await this.create(ingridientsInfo);
    if (savedIngridents) {
      return {
        success: true,
        message: "Successfully create ingridients",
        data: savedIngridents,
      };
    } else {
      throw new BaseError("DATABASE_ERROR", 400, "Failed to create ingridients");
    }
  }

  // Business logic for getting all ingredients
  async getAllIngridients(): Promise<PaginatedResponse<IIngridients>> {
    // You can add business logic for filtering, pagination, etc. here
    // For now, just use the base service's findAll
    const result = await this.findAll();
    return {
      success: true,
      message: result.items.length === 0 ? "No ingridients found." : "",
      data: result.items,
      pagination: {
        total: result.total,
        page: result.page,
        limit: result.limit,
        pages: Math.ceil(result.total / result.limit),
      },
    };
  }

  // Business logic for getting a single ingredient
  async getSingleIngridients(ingridientsId: string): Promise<DataResponse<IIngridients>> {
    const ingridients = await this.findById(ingridientsId);
    if (ingridients) {
      return {
        success: true,
        message: "",
        data: ingridients,
      };
    } else {
      throw new BaseError("NOT_FOUND", 400, "No ingridients found.");
    }
  }

  // Business logic for updating an ingredient
  async updateIngridients(
    ingridientsId: string,
    data: IUpdateIngridients
  ): Promise<DataResponse<IIngridients>> {
    // Optionally add business logic here
    const updatedIngridients = await this.update(ingridientsId, data);
    if (updatedIngridients) {
      return {
        success: true,
        message: "Successfully update ingridients",
        data: updatedIngridients,
      };
    } else {
      return {
        success: false,
        message: "Failed to update ingridients",
        data: updatedIngridients,
      };
    }
  }

  // Business logic for deleting an ingredient
  async deleteIngridients(ingridientsId: string): Promise<DataResponse<null>> {
    // Optionally add business logic here
    const deleted = await this.delete(ingridientsId);
    if (deleted) {
      return {
        success: true,
        message: "Successfully delete ingridients",
        data: null,
      };
    } else {
      return {
        success: false,
        message: "Failed to delete ingridients",
        data: null,
      };
    }
  }
}

const ingridientsService = new IngridientsService();
export default ingridientsService;
