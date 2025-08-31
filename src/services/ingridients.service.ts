import { ICreateIngridients, IIngridients, IUpdateIngridients } from "../interfaces/ingridients.interface";
// Response types: use DataResponse<IIngridients> and PaginatedResponse<IIngridients> from '../types/response.types'
import { DataResponse, PaginatedResponse } from "../types/response.types";
import Ingridients from "../model/ingridients.model";
import { BaseError } from "../errors/BaseError";

// Service for creating a new ingredient
// Supports optional supplier field
const createIngridients = async (data: ICreateIngridients): Promise<DataResponse<IIngridients>> => {
  const { name, supplier, category, costPrice, salePrice, stock, unit } = data;
  // Only require fields that are always needed; supplier is optional
  if (!name || !category || !costPrice || !salePrice || !stock || !unit)
    throw new BaseError("VALIDATION_ERROR", 400, "Please provide correct ingridients information.");
  // Create serial no based on last ingridients serial no
  // If no ingridients then serial start from 1000
  let serialNo: number = 1000;
  const lastIngridientsInfo: IIngridients | null = await Ingridients.findOne().sort({
    create: -1,
  });
  if (lastIngridientsInfo) {
    serialNo = lastIngridientsInfo.serialNo + 1;
  } else {
    serialNo += 1;
  }
  // Create ingridents instance
  const ingridientsInfo = {
    name,
    serialNo,
    // Only add supplier if provided
    ...(supplier && { supplier }),
    category,
    costPrice,
    salePrice,
    stock,
    unit,
  };
  // Save to database
  const ingridents = new Ingridients(ingridientsInfo);
  const savedIngridents = await ingridents.save();
  // Handle response
  if (savedIngridents) {
    const ingridentsData = await Ingridients.findOne({ _id: savedIngridents._id });
    return {
      success: true,
      message: "Successfully create ingridients",
      data: ingridentsData,
    };
  } else {
    throw new BaseError("DATABASE_ERROR", 400, "Failed to create ingridients");
  }
};

//all ingridients get service
const getAllIngridients = async (): Promise<PaginatedResponse<IIngridients>> => {
  const ingridients: IIngridients[] = await Ingridients.find();
  return {
    success: true,
    message: ingridients.length === 0 ? "No ingridients found." : "",
    data: ingridients,
    pagination: {
      total: ingridients.length,
      page: 1,
      limit: ingridients.length,
      pages: 1,
    },
  };
};
//single ingridients get service
const getSingleIngridients = async (ingridientsId: string): Promise<DataResponse<IIngridients>> => {
  const ingridients: IIngridients | null = await Ingridients.findOne({ _id: ingridientsId });
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

//ingridients update service
const updateIngridients = async (
  ingridientsId: string,
  data: IUpdateIngridients
): Promise<DataResponse<IIngridients>> => {
  // get ingridients that need to update
  const ingridients: IIngridients | null = await Ingridients.findOne({ _id: ingridientsId });
  //throw error if not exist
  if (!ingridients) {
    throw new BaseError("NOT_FOUND", 400, "No ingridents found");
  }
  //update when it exist
  const option = { new: true, runValidator: true };
  const updatedIngridients: IIngridients | null = await Ingridients.findByIdAndUpdate(
    ingridientsId,
    { $set: data },
    option
  ).select("name serialNo supplier category stock costPrice salePrice unit");
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
//ingridients  delete service
const deleteIngridients = async (ingridientsId: string): Promise<DataResponse<null>> => {
  // get ingridients  that needs to delete
  const ingridients: IIngridients | null = await Ingridients.findOne({ _id: ingridientsId });
  //throw error if not exist
  if (!ingridients) {
    throw new BaseError("NOT_FOUND", 400, "No ingridents  found");
  }
  //delete when it exist
  const deletedIngridients: IIngridients | null = await Ingridients.findByIdAndDelete(ingridientsId).select(
    "name serialNo"
  );
  //handle response
  if (deletedIngridients) {
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

export default {
  createIngridients,
  getAllIngridients,
  getSingleIngridients,
  updateIngridients,
  deleteIngridients,
};
