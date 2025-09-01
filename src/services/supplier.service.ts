import {
  ICreateSupplier,
  ICreateSupplierResponse,
  IDeleteSupplierResponse,
  IGetSupplierResponse,
  ISupplier,
  IUpdateSupplier,
  IUpdateSupplierResponse,
} from '../interfaces/supplier.interface';
import Supplier from '../models/supplier.model';
import { BaseError } from '../errors/BaseError';

//create supplier service
const createSupplier = async (data: ICreateSupplier): Promise<ICreateSupplierResponse> => {
  const { name, contact } = data;
  if (!name) {
    throw new BaseError('VALIDATION_ERROR', 400, 'Please Provide a supplier Name');
  }
  //create serial no based on last supplier serial no
  //if no supplier then serial start from 1000
  let serialNo: number = 1000;
  const lastSupplierInfo: ISupplier | null = await Supplier.findOne().sort({
    create: -1,
  });
  if (lastSupplierInfo) {
    serialNo = lastSupplierInfo.serialNo + 1;
  } else {
    serialNo += 1;
  }
  //create supplier object
  const supplierInfo = {
    serialNo,
    name,
    contact,
  };
  //save supplier to database
  const supplier = new Supplier(supplierInfo);
  const savedSupplier: ISupplier | null = await supplier.save();
  //get specific data to pass on response
  if (savedSupplier) {
    const supplierData = await Supplier.findById(savedSupplier._id).select('name serialNo contact');
    return {
      success: true,
      message: 'Successfully create a supplier',
      supplier: supplierData,
    };
  } else {
    throw new BaseError('DATABASE_ERROR', 400, 'Failed to create a supplier');
  }
};

//get all supplier service
const getAllSupplier = async (): Promise<IGetSupplierResponse> => {
  //get all supplier
  const suppliers: ISupplier[] | null = await Supplier.find();
  //check if supplier exist or not
  if (suppliers && suppliers.length) {
    return {
      message: '',
      supplier: suppliers,
    };
  } else {
    throw new BaseError('NOT_FOUND', 400, 'No Supplier Found.');
  }
};

//get single supplier service
const getSingleSupplier = async (supplierId: string): Promise<IGetSupplierResponse> => {
  //get supplier that is searched
  const supplier: ISupplier | null = await Supplier.findOne({
    _id: supplierId,
  });
  //check if supplier is found or not
  if (supplier) {
    return {
      message: '',
      supplier,
    };
  } else {
    throw new BaseError('NOT_FOUND', 400, 'No Supplier Found.');
  }
};

//update supplier service
const updateSupplier = async (supplierId: string, data: IUpdateSupplier): Promise<IUpdateSupplierResponse> => {
  //get supplier that needs to update
  const supplier: ISupplier | null = await Supplier.findOne({
    _id: supplierId,
  });
  //if supplier not exist
  if (!supplier) {
    throw new BaseError('NOT_FOUND', 400, 'No supplier found.');
  }
  //if supplier exist, update supplier
  const option = { new: true, runValidators: true };
  const updatedSupplier: ISupplier | null = await Supplier.findByIdAndUpdate(supplierId, { $set: data }, option).select('name serialNo contact');
  //handle success or failure of update
  if (updatedSupplier) {
    return {
      success: true,
      message: `Successfully update the supplier - ${updateSupplier.name}`,
      supplier: updatedSupplier,
    };
  } else {
    throw new BaseError('DATABASE_ERROR', 400, 'Failed to update supplier.');
  }
};

//delete supplier service
const deleteSupplier = async (supplierId: string): Promise<IDeleteSupplierResponse> => {
  //get supplier that needs to delete
  const supplier: ISupplier | null = await Supplier.findOne({
    _id: supplierId,
  });
  //if supplier not exist
  if (!supplier) {
    throw new BaseError('NOT_FOUND', 400, 'No supplier found.');
  }
  //delete supplier
  const deletedSupplier = await Supplier.findOneAndDelete({ _id: supplierId });
  //check if supplier is deleted or not
  if (!deletedSupplier) {
    return {
      success: false,
      message: `failed delete the supplier - ${supplier.name}`,
    };
  } else {
    return {
      success: true,
      message: `Successfully delete the supplier - ${supplier.name}`,
    };
  }
};
export default {
  createSupplier,
  getAllSupplier,
  getSingleSupplier,
  updateSupplier,
  deleteSupplier,
};
