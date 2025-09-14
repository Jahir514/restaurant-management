import mongoose, { Schema, Model } from "mongoose";
import { IRestaurantTable } from "../interfaces/restaurantTable.interface";

const restaurantTableSchema = new Schema<IRestaurantTable>({
  name: { type: String, required: true, trim: true, index: true },
  description: { type: String, default: null },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

restaurantTableSchema.index({ name: 1 });

restaurantTableSchema.pre("save", function (next) {
  this.updated_at = new Date();
  next();
});

const RestaurantTable: Model<IRestaurantTable> =
  mongoose.model<IRestaurantTable>("RestaurantTable", restaurantTableSchema);
export default RestaurantTable;
