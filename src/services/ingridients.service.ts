import { ICreateIngridients, IIngridients, IUpdateIngridients } from "../interfaces/ingridients.interface";
import { DataResponse, PaginatedResponse } from "../types/response.types";
import Ingridients from "../models/ingridients.model";
import { BaseError } from "../errors/BaseError";

export const createIngridients = async (data: ICreateIngridients): Promise<DataResponse<IIngridients>> => {
  const { name, supplier, category, costPrice, salePrice, stock, unit } = data;
  if (!name || !category || !costPrice || !salePrice || !stock || !unit)
    throw new BaseError("VALIDATION_ERROR", 400, "Please provide correct ingridients information.");
  // Serial number logic
  let serialNo: number = 1000;
  const lastIngridientsInfo: IIngridients | null = await Ingridients.findOne().sort({ create: -1 });
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
  const savedIngridents = await new Ingridients(ingridientsInfo).save();
  if (savedIngridents) {
    return {
      success: true,
      message: "Successfully create ingridients",
      data: savedIngridents,
    };
  } else {
    throw new BaseError("DATABASE_ERROR", 400, "Failed to create ingridients");
  }
};

export const getAllIngridients = async (): Promise<PaginatedResponse<IIngridients>> => {
  const items = await Ingridients.find();
  const total = await Ingridients.countDocuments();
  const page = 1;
  const limit = items.length;
  return {
    success: true,
    message: items.length === 0 ? "No ingridients found." : "",
    data: items,
    pagination: {
      total,
      page,
      limit,
      pages: 1,
    },
  };
};

export const getSingleIngridients = async (ingridientsId: string): Promise<DataResponse<IIngridients>> => {
  const ingridients = await Ingridients.findById(ingridientsId);
  if (ingridients) {
    return {
      success: true,
      message: "",
      data: ingridients,
    };
  } else {
    throw new BaseError("NOT_FOUND", 400, "No ingridients found.");
  }
};

export const updateIngridients = async (
  ingridientsId: string,
  data: IUpdateIngridients
): Promise<DataResponse<IIngridients>> => {
  const updatedIngridients = await Ingridients.findByIdAndUpdate(ingridientsId, data, { new: true });
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
};

export const deleteIngridients = async (ingridientsId: string): Promise<DataResponse<null>> => {
  const deleted = await Ingridients.findByIdAndDelete(ingridientsId);
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
};
