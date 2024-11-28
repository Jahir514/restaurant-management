import mongoose, { Schema, Model } from 'mongoose'
import { ISupplier } from '../interfaces/supplier.interface'
//create schema
const supplierSchema = new Schema(
  {
    serialNo: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    contact: {
      phone: [
        {
          type: Number,
        },
      ],
      address: String,
    },
  },
  { timestamps: true }
)

//index
supplierSchema.index({})

//create model
const Supplier: Model<ISupplier> = mongoose.model<ISupplier>(
  'Supplier',
  supplierSchema
)
export default Supplier
