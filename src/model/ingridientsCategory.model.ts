import mongoose, { Schema, Model } from "mongoose";
import { IIngridientsCategory } from "../interfaces/ingridientsCategory.interface";
//create schema
const ingridientsCategorySchema = new Schema<IIngridientsCategory>(
  {
    serialNo: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
ingridientsCategorySchema.index({ name: 1 }, { unique: true });
ingridientsCategorySchema.index({ status: 1 });
/**
 * @swagger
 * components:
 *   schemas:
 *     IngridientsCategory:
 *       type: object
 *       required:
 *         - serialNo
 *         - name
 *       properties:
 *         serialNo:
 *           type: number
 *         name:
 *           type: string
 *         status:
 *           type: string
 *           enum: ["active", "inactive"]
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *       example:
 *         serialNo: 1
 *         name: "Vegetables"
 *         status: "active"
 *         createdAt: "2025-09-01T12:00:00.000Z"
 *         updatedAt: "2025-09-01T12:00:00.000Z"
 *
 * tags:
 *   - name: IngridientsCategory
 *     description: API endpoints for managing ingridients categories
 */

//create model
const IngridientsCategory: Model<IIngridientsCategory> = mongoose.model<IIngridientsCategory>(
  "IngridentsCategory",
  ingridientsCategorySchema
);
export default IngridientsCategory;
