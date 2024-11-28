import {
  ICreateSupplier,
  ICreateSupplierResponse,
  ISupplier,
} from '../interfaces/supplier.interface'
import Supplier from '../model/supplier.model'

//create supplier service
const createSupplier = async (
  data: ICreateSupplier
): Promise<ICreateSupplierResponse> => {
  try {
    const { name, contact } = data
    //create serial no based on last supplier serial no
    //if no supplier then serial start from 1000
    let serialNo: number = 1000
    const lastSupplierInfo: ISupplier | null = await Supplier.findOne().sort({
      create: -1,
    })
    if (lastSupplierInfo) {
      serialNo = lastSupplierInfo.serialNo + 1
    } else {
      serialNo += 1
    }
    //create supplier object
    const supplierInfo = {
      serialNo,
      name,
      contact,
    }
    //save supplier to database
    const supplier = new Supplier(supplierInfo)
    const savedSupplier = await supplier.save()
    //get specific data to pass on response
    const supplierData = await Supplier.findById(savedSupplier._id).select(
      'name serialNo contact'
    )
    return {
      success: true,
      message: 'Successfully create a supplier',
      supplier: supplierData,
    }
  } catch (error) {
    console.error(error)
    return {
      success: false,
      message: 'Failed to create a supplier',
      supplier: null,
    }
  }
}

export default {
  createSupplier,
}
