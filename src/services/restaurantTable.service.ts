import {
  ICreateRestaurantTable,
  IRestaurantTable,
  IUpdateRestaurantTable,
} from "../interfaces/restaurantTable.interface";
import { DataResponse, PaginatedResponse } from "../types/response.types";
import RestaurantTable from "../models/restaurantTable.model";
import { BaseError } from "../errors/BaseError";

export const createRestaurantTable = async (data: ICreateRestaurantTable): Promise<DataResponse<IRestaurantTable>> => {
  const { name } = data;
  if (!name) throw new BaseError("VALIDATION_ERROR", 400, "Please provide a table name.");
  const tableInfo = { ...data };
  const savedTable = await new RestaurantTable(tableInfo).save();
  if (savedTable) {
    return {
      success: true,
      message: "Successfully created restaurant table",
      data: savedTable,
    };
  } else {
    throw new BaseError("DATABASE_ERROR", 400, "Failed to create restaurant table");
  }
};

export const getAllRestaurantTables = async (): Promise<PaginatedResponse<IRestaurantTable>> => {
  const items = await RestaurantTable.find();
  const total = await RestaurantTable.countDocuments();
  const page = 1;
  const limit = items.length;
  return {
    success: true,
    message: items.length === 0 ? "No restaurant table found." : "",
    data: items,
    pagination: {
      total,
      page,
      limit,
      pages: 1,
    },
  };
};

export const getSingleRestaurantTable = async (tableId: string): Promise<DataResponse<IRestaurantTable>> => {
  const table = await RestaurantTable.findById(tableId);
  if (table) {
    return {
      success: true,
      message: "",
      data: table,
    };
  } else {
    throw new BaseError("NOT_FOUND", 400, "No restaurant table found.");
  }
};

export const updateRestaurantTable = async (
  tableId: string,
  data: IUpdateRestaurantTable
): Promise<DataResponse<IRestaurantTable>> => {
  const updatedTable = await RestaurantTable.findByIdAndUpdate(tableId, data, { new: true });
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
};

export const deleteRestaurantTable = async (tableId: string): Promise<DataResponse<null>> => {
  const deleted = await RestaurantTable.findByIdAndDelete(tableId);
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
};
