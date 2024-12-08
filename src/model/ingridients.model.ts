import mongoose, { Schema, Model } from 'mongoose';
import { IIngridients } from '../interfaces/ingridients.interface';
//create schema
const ingridientsSchema = new Schema<IIngridients>(
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
    category: {
      type: Schema.Types.ObjectId,
      ref: 'IngridentsCategory',
      required: true,
    },
    supplier: {
      type: Schema.Types.ObjectId,
      ref: 'Supplier',
      required: true,
    },
    costPrice: {
      type: Number,
      required: true,
    },
    salePrice: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    unit: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

//index
ingridientsSchema.index({});

//create model
const Ingridients: Model<IIngridients> = mongoose.model<IIngridients>('Ingridents', ingridientsSchema);
export default Ingridients;
