import mongoose, { Schema, Model } from 'mongoose'
import { ICategory } from '../interfaces/category.interface'
//create schema
const categorySchema = new Schema<ICategory>(
  {
    serialNo: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      retquired: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
)

//index
categorySchema.index({})

//create model
const Category: Model<ICategory> = mongoose.model<ICategory>(
  'Category',
  categorySchema
)
export default Category
