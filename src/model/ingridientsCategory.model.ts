import mongoose, { Schema, Model } from 'mongoose';
import { IIngridientsCategory } from '../interfaces/ingridientsCategory.interface';
//create schema
const ingridientsCategorySchema = new Schema<IIngridientsCategory>(
  {
    serialNo: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      retquired: true,
      unique: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

//index
ingridientsCategorySchema.index({});

//create model
const IngridientsCategory: Model<IIngridientsCategory> = mongoose.model<IIngridientsCategory>('IngridentsCategory', ingridientsCategorySchema);
export default IngridientsCategory;
