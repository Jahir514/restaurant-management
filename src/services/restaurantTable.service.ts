import {
  ICreateRestaurantTable,
  IRestaurantTable,
  IUpdateRestaurantTable,
} from "../interfaces/restaurantTable.interface";
import { DataResponse, PaginatedResponse } from "../types/response.types";
import RestaurantTable from "../models/restaurantTable.model";
import { BaseError } from "../errors/BaseError";
import { BaseService } from "./base.service";

class RestaurantTableService extends BaseService<IRestaurantTable> {
  constructor() {
    super(RestaurantTable);
  }

  async createRestaurantTable(
    data: ICreateRestaurantTable
  ): Promise<DataResponse<IRestaurantTable>> {
    const { name } = data;
    if (!name)
      throw new BaseError(
        "VALIDATION_ERROR",
        400,
        "Please provide a table name."
      );
    const tableInfo = {
      ...data,
    };
    const savedTable = await this.create(tableInfo);
    if (savedTable) {
      return {
        success: true,
        message: "Successfully created restaurant table",
        data: savedTable,
      };
    } else {
      throw new BaseError(
        "DATABASE_ERROR",
        400,
        "Failed to create restaurant table"
      );
    }
  }

  async getAllRestaurantTable(): Promise<PaginatedResponse<IRestaurantTable>> {
    const result = await this.findAll();
    return {
      success: true,
      message: result.items.length === 0 ? "No restaurant table found." : "",
      data: result.items,
      pagination: {
        total: result.total,
        page: result.page,
        limit: result.limit,
        pages: Math.ceil(result.total / result.limit),
      },
    };
  }

  async getSingleRestaurantTable(
    tableId: string
  ): Promise<DataResponse<IRestaurantTable>> {
    const table = await this.findById(tableId);
    if (table) {
      return {
        success: true,
        message: "",
        data: table,
      };
    } else {
      throw new BaseError("NOT_FOUND", 400, "No restaurant table found.");
    }
  }

  async updateRestaurantTable(
    tableId: string,
    data: IUpdateRestaurantTable
  ): Promise<DataResponse<IRestaurantTable>> {
    const updatedTable = await this.update(tableId, data);
    if (updatedTable) {
      return {
        success: true,
        message: "Successfully updated restaurant table",
        data: updatedTable,
      };
    } else {
      return {
        success: false,
        message: "Failed to update restaurant table",
        data: updatedTable,
      };
    }
  }

  async deleteRestaurantTable(tableId: string): Promise<DataResponse<null>> {
    const deleted = await this.delete(tableId);
    if (deleted) {
      return {
        success: true,
        message: "Successfully deleted restaurant table",
        data: null,
      };
    } else {
      return {
        success: false,
        message: "Failed to delete restaurant table",
        data: null,
      };
    }
  }
}

const restaurantTableService = new RestaurantTableService();
export default restaurantTableService;
