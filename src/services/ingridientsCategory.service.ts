import {
  ICreateIngridientsCategory,
  IIngridientsCategory,
  IUpdateIngridientsCategory,
} from "../interfaces/ingridientsCategory.interface";
// Response types: use DataResponse<IIngridientsCategory> and PaginatedResponse<IIngridientsCategory> from '../types/response.types'
import { DataResponse, PaginatedResponse } from "../types/response.types";
import IngridientsCategory from "../model/ingridientsCategory.model";
import { BaseError } from "../errors/BaseError";

//ingridients category create service
const createIngridientsCategory = async (
  data: ICreateIngridientsCategory
): Promise<DataResponse<IIngridientsCategory>> => {
  const { name, status } = data;
  if (!name) throw new BaseError("VALIDATION_ERROR", 400, "Please provide a ingridients category name");
  //create serial no based on last ingridients category serial no
  //if no ingridients category then serial start from 1000
  let serialNo: number = 1000;
  const lastIngridientsCategoryInfo: IIngridientsCategory | null = await IngridientsCategory.findOne().sort({
    create: -1,
  });
  if (lastIngridientsCategoryInfo) {
    serialNo = lastIngridientsCategoryInfo.serialNo + 1;
  } else {
    serialNo += 1;
  }
  //create ingridents category instance
  const ingridientsCategoryInfo = {
    name,
    serialNo,
    ...(status && { status }),
  };
  //save to database
  const ingridentsCategory = new IngridientsCategory(ingridientsCategoryInfo);
  const savedIngridentsCategory = await ingridentsCategory.save();
  //handle response
  if (savedIngridentsCategory) {
    const ingridentsCategoryData = await IngridientsCategory.findOne({ _id: savedIngridentsCategory._id });
    return {
      success: true,
      message: "Successfully create ingridients category",
      data: ingridentsCategoryData,
    };
  } else {
    throw new BaseError("DATABASE_ERROR", 400, "Failed to create ingridients category");
  }
};

//all ingridients category get service
const getAllIngridientsCategory = async (): Promise<PaginatedResponse<IIngridientsCategory>> => {
  const ingridientsCategory: IIngridientsCategory[] = await IngridientsCategory.find();
  return {
    success: true,
    message: ingridientsCategory.length === 0 ? "No ingridients category found." : "",
    data: ingridientsCategory,
    pagination: {
      total: ingridientsCategory.length,
      page: 1,
      limit: ingridientsCategory.length,
      pages: 1,
    },
  };
};
//single ingridients category get service
const getSingleIngridientsCategory = async (
  ingridientsCategoryId: string
): Promise<DataResponse<IIngridientsCategory>> => {
  const ingridientsCategory: IIngridientsCategory | null = await IngridientsCategory.findOne({
    _id: ingridientsCategoryId,
  });
  if (ingridientsCategory) {
    return {
      success: true,
      message: "",
      data: ingridientsCategory,
    };
  } else {
    throw new BaseError("NOT_FOUND", 400, "No ingridients category found.");
  }
};

//ingridients category update service
const updateIngridientsCategory = async (
  ingridientsCategoryId: string,
  data: IUpdateIngridientsCategory
): Promise<DataResponse<IIngridientsCategory>> => {
  // get ingridients category that need to update
  const ingridientsCategory: IIngridientsCategory | null = await IngridientsCategory.findOne({
    _id: ingridientsCategoryId,
  });
  //throw error if not exist
  if (!ingridientsCategory) {
    throw new BaseError("NOT_FOUND", 400, "No ingridents category found");
  }
  //update when it exist
  const option = { new: true, runValidator: true };
  const updatedIngridientsCategory: IIngridientsCategory | null = await IngridientsCategory.findByIdAndUpdate(
    ingridientsCategoryId,
    { $set: data },
    option
  ).select("name serialNo status");
  if (updatedIngridientsCategory) {
    return {
      success: true,
      message: "Successfully update ingridients category",
      data: updatedIngridientsCategory,
    };
  } else {
    return {
      success: false,
      message: "Failed to update ingridients category",
      data: updatedIngridientsCategory,
    };
  }
};
//ingridients category delete service
const deleteIngridientsCategory = async (ingridientsCategoryId: string): Promise<DataResponse<null>> => {
  // get ingridients category that needs to delete
  const ingridientsCategory: IIngridientsCategory | null = await IngridientsCategory.findOne({
    _id: ingridientsCategoryId,
  });
  //throw error if not exist
  if (!ingridientsCategory) {
    throw new BaseError("NOT_FOUND", 400, "No ingridents category found");
  }
  //delete when it exist
  const deletedIngridientsCategory: IIngridientsCategory | null = await IngridientsCategory.findByIdAndDelete(
    ingridientsCategoryId
  ).select("name serialNo");
  //handle response
  if (deletedIngridientsCategory) {
    return {
      success: true,
      message: "Successfully delete ingridients category",
      data: null,
    };
  } else {
    return {
      success: false,
      message: "Failed to delete ingridients category",
      data: null,
    };
  }
};

export default {
  createIngridientsCategory,
  getAllIngridientsCategory,
  getSingleIngridientsCategory,
  updateIngridientsCategory,
  deleteIngridientsCategory,
};
