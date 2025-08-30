import {
  ICreateIngridientsCategory,
  ICreateIngridientsCategoryResponse,
  IDeleteIngridientsCategoryResponse,
  IGetIngridientsCategoryResponse,
  IIngridientsCategory,
  IUpdateIngridientsCategory,
  IUpdateIngridientsCategoryResponse,
} from '../interfaces/ingridientsCategory.interface';
import IngridientsCategory from '../model/ingridientsCategory.model';
import { BaseError } from '../errors/BaseError';

//ingridients category create service
const createIngridientsCategory = async (data: ICreateIngridientsCategory): Promise<ICreateIngridientsCategoryResponse> => {
  const { name } = data;
  if (!name) throw new BaseError('VALIDATION_ERROR', 400, 'Please provide a ingridients category name');
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
  };
  //save to database
  const ingridentsCategory = new IngridientsCategory(ingridientsCategoryInfo);
  const savedIngridentsCategory = await ingridentsCategory.save();
  //handle response
  if (savedIngridentsCategory) {
    const ingridentsCategoryData = await IngridientsCategory.findOne({ _id: savedIngridentsCategory._id });
    return {
      success: true,
      message: 'Successfully create ingridients category',
      ingridientsCategory: ingridentsCategoryData,
    };
  } else {
    throw new BaseError('DATABASE_ERROR', 400, 'Failed to create ingridients category');
  }
};

//all ingridients category get service
const getAllIngridientsCategory = async (): Promise<IGetIngridientsCategoryResponse> => {
  const ingridientsCategory: IIngridientsCategory[] = await IngridientsCategory.find();
  if (ingridientsCategory.length == 0) {
    return {
      message: 'No ingridients category found.',
      ingridientsCategory,
    };
  } else {
    return {
      message: '',
      ingridientsCategory,
    };
  }
};
//single ingridients category get service
const getSingleIngridientsCategory = async (ingridientsCategoryId: string): Promise<IGetIngridientsCategoryResponse> => {
  const ingridientsCategory: IIngridientsCategory | null = await IngridientsCategory.findOne({ _id: ingridientsCategoryId });
  if (ingridientsCategory) {
    return {
      message: '',
      ingridientsCategory,
    };
  } else {
    throw new BaseError('NOT_FOUND', 400, 'No ingridients category found.');
  }
};

//ingridients category update service
const updateIngridientsCategory = async (ingridientsCategoryId: string, data: IUpdateIngridientsCategory): Promise<IUpdateIngridientsCategoryResponse> => {
  // get ingridients category that need to update
  const ingridientsCategory: IIngridientsCategory | null = await IngridientsCategory.findOne({ _id: ingridientsCategoryId });
  //throw error if not exist
  if (!ingridientsCategory) {
    throw new BaseError('NOT_FOUND', 400, 'No ingridents category found');
  }
  //update when it exist
  const option = { new: true, runValidator: true };
  const updatedIngridientsCategory: IIngridientsCategory | null = await IngridientsCategory.findByIdAndUpdate(
    ingridientsCategoryId,
    { $set: data },
    option
  ).select('name serialNo');
  if (updatedIngridientsCategory) {
    return {
      success: true,
      message: 'Successfully update ingridients category',
      ingridientsCategory: updatedIngridientsCategory,
    };
  } else {
    return {
      success: false,
      message: 'Failed to update ingridients category',
      ingridientsCategory: updatedIngridientsCategory,
    };
  }
};
//ingridients category delete service
const deleteIngridientsCategory = async (ingridientsCategoryId: string): Promise<IDeleteIngridientsCategoryResponse> => {
  // get ingridients category that needs to delete
  const ingridientsCategory: IIngridientsCategory | null = await IngridientsCategory.findOne({ _id: ingridientsCategoryId });
  //throw error if not exist
  if (!ingridientsCategory) {
    throw new BaseError('NOT_FOUND', 400, 'No ingridents category found');
  }
  //delete when it exist
  const deletedIngridientsCategory: IIngridientsCategory | null = await IngridientsCategory.findByIdAndDelete(ingridientsCategoryId).select('name serialNo');
  //handle response
  if (deletedIngridientsCategory) {
    return {
      success: true,
      message: 'Successfully delete ingridients category',
    };
  } else {
    return {
      success: false,
      message: 'Failed to delete ingridients category',
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
