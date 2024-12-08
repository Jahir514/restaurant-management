import {
  ICreateIngridients,
  ICreateIngridientsResponse,
  IDeleteIngridientsResponse,
  IGetIngridientsResponse,
  IIngridients,
  IUpdateIngridients,
  IUpdateIngridientsResponse,
} from '../interfaces/ingridients.interface';
import Ingridients from '../model/ingridients.model';
import { AppError } from '../utils/AppError';

//ingridients create service
const createIngridients = async (data: ICreateIngridients): Promise<ICreateIngridientsResponse> => {
  const { name, supplier, category, costPrice, salePrice, stock, unit } = data;
  if (!name || !supplier || !category || !costPrice || !salePrice || !stock || !unit)
    throw new AppError('Please provide correct ingridients information.', 400);
  //create serial no based on last ingridients serial no
  //if no ingridients then serial start from 1000
  let serialNo: number = 1000;
  const lastIngridientsInfo: IIngridients | null = await Ingridients.findOne().sort({
    create: -1,
  });
  if (lastIngridientsInfo) {
    serialNo = lastIngridientsInfo.serialNo + 1;
  } else {
    serialNo += 1;
  }
  //create ingridents instance
  const ingridientsInfo = {
    name,
    serialNo,
    supplier,
    category,
    costPrice,
    salePrice,
    stock,
    unit,
  };
  //save to database
  const ingridents = new Ingridients(ingridientsInfo);
  const savedIngridents = await ingridents.save();
  //handle response
  if (savedIngridents) {
    const ingridentsData = await Ingridients.findOne({ _id: savedIngridents._id });
    return {
      success: true,
      message: 'Successfully create ingridients',
      ingridients: ingridentsData,
    };
  } else {
    throw new AppError('Failed to create ingridients', 400);
  }
};

//all ingridients get service
const getAllIngridients = async (): Promise<IGetIngridientsResponse> => {
  const ingridients: IIngridients[] = await Ingridients.find();
  if (ingridients.length == 0) {
    return {
      message: 'No ingridients found.',
      ingridients,
    };
  } else {
    return {
      message: '',
      ingridients,
    };
  }
};
//single ingridients get service
const getSingleIngridients = async (ingridientsId: string): Promise<IGetIngridientsResponse> => {
  const ingridients: IIngridients | null = await Ingridients.findOne({ _id: ingridientsId });
  if (ingridients) {
    return {
      message: '',
      ingridients,
    };
  } else {
    throw new AppError('No ingridients found.', 400);
  }
};

//ingridients update service
const updateIngridients = async (ingridientsId: string, data: IUpdateIngridients): Promise<IUpdateIngridientsResponse> => {
  // get ingridients that need to update
  const ingridients: IIngridients | null = await Ingridients.findOne({ _id: ingridientsId });
  //throw error if not exist
  if (!ingridients) {
    throw new AppError('No ingridents found', 400);
  }
  //update when it exist
  const option = { new: true, runValidator: true };
  const updatedIngridients: IIngridients | null = await Ingridients.findByIdAndUpdate(ingridientsId, { $set: data }, option).select(
    'name serialNo supplier category stock costPrice salePrice unit'
  );
  if (updatedIngridients) {
    return {
      success: true,
      message: 'Successfully update ingridients ',
      ingridients: updatedIngridients,
    };
  } else {
    return {
      success: false,
      message: 'Failed to update ingridients ',
      ingridients: updatedIngridients,
    };
  }
};
//ingridients  delete service
const deleteIngridients = async (ingridientsId: string): Promise<IDeleteIngridientsResponse> => {
  // get ingridients  that needs to delete
  const ingridients: IIngridients | null = await Ingridients.findOne({ _id: ingridientsId });
  //throw error if not exist
  if (!ingridients) {
    throw new AppError('No ingridents  found', 400);
  }
  //delete when it exist
  const deletedIngridients: IIngridients | null = await Ingridients.findByIdAndDelete(ingridientsId).select('name serialNo');
  //handle response
  if (deletedIngridients) {
    return {
      success: true,
      message: 'Successfully delete ingridients ',
    };
  } else {
    return {
      success: false,
      message: 'Failed to delete ingridients ',
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
