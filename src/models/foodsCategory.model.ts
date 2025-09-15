import mongoose, { Schema, Model } from "mongoose";
import { IFoodsCategory } from "../interfaces/foodsCategory.interface";

const foodsCategorySchema = new Schema<IFoodsCategory>({
  category_name: { type: String, required: true, trim: true },
  slug: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  parent_id: { type: String, default: null },
  menu: { type: String, enum: ["0", "1"], default: "0" },
  image: { type: String, default: null },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

foodsCategorySchema.index({ slug: 1 });
foodsCategorySchema.index({ category_name: 1 });
foodsCategorySchema.index({ menu: 1 });

foodsCategorySchema.pre("save", function (next) {
  this.updated_at = new Date();
  next();
});

const FoodsCategory: Model<IFoodsCategory> = mongoose.model<IFoodsCategory>("FoodsCategory", foodsCategorySchema);
export default FoodsCategory;
