import mongoose, { Schema, Model } from "mongoose";
import { IIngridients } from "../interfaces/ingridients.interface";

import config from "../config/app.config";

// Improved schema for ingredients
const ingridientsSchema = new Schema<IIngridients>(
  {
    serialNo: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "IngridientsCategory",
      required: true,
    },
    supplier: {
      type: [Schema.Types.ObjectId],
      ref: "Supplier",
      required: false,
    },
    branch: {
      type: Schema.Types.ObjectId,
      ref: "Branch",
      required: config.MULTI_BRANCH,
    },
    costPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    salePrice: {
      type: Number,
      required: true,
      min: 0,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
    minStockLevel: {
      type: Number,
      required: false,
      default: 0,
      min: 0,
    },
    reorderLevel: {
      type: Number,
      required: false,
      default: 0,
      min: 0,
    },
    unit: {
      type: String,
      required: true,
      enum: ["kg", "g", "l", "ml", "pcs", "pack", "other"],
      default: "pcs",
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    stockHistory: [
      {
        date: { type: Date, default: Date.now },
        change: { type: Number, required: true },
        reason: { type: String },
        user: { type: Schema.Types.ObjectId, ref: "User" },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Indexes for performance
ingridientsSchema.index({ name: 1, branch: 1 }, { unique: true });
ingridientsSchema.index({ category: 1 });
ingridientsSchema.index({ supplier: 1 });
ingridientsSchema.index({ branch: 1 });
ingridientsSchema.index({ status: 1 });

// Static method for branch-aware queries
ingridientsSchema.statics.branchFilter = function (branchId?: string) {
  // If multi-branch is enabled, filter by branch; otherwise, return all
  if (config.MULTI_BRANCH && branchId) {
    return { branch: branchId };
  }
  return {};
};

// Create model
const Ingridients: Model<IIngridients> = mongoose.model<IIngridients>("Ingridients", ingridientsSchema);
export default Ingridients;

/**
 * Usage pattern for branch-aware queries:
 *
 * import Ingridients from '../model/ingridients.model';
 * const branchFilter = Ingridients.branchFilter(req.branch);
 * const ingredients = await Ingridients.find({ ...branchFilter, ...otherFilters });
 *
 * This pattern should be used throughout the project for all branch-specific models.
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Ingridients:
 *       type: object
 *       required:
 *         - serialNo
 *         - name
 *         - category
 *         # - supplier (optional)
 *         - costPrice
 *         - salePrice
 *         - stock
 *         - unit
 *       properties:
 *         serialNo:
 *           type: number
 *         name:
 *           type: string
 *         category:
 *           type: string
 *         supplier:
 *           type: array
 *           items:
 *             type: string
 *         branch:
 *           type: string
 *         costPrice:
 *           type: number
 *         salePrice:
 *           type: number
 *         stock:
 *           type: number
 *         minStockLevel:
 *           type: number
 *         reorderLevel:
 *           type: number
 *         unit:
 *           type: string
 *           enum: ["kg", "g", "l", "ml", "pcs", "pack", "other"]
 *         status:
 *           type: string
 *           enum: ["active", "inactive"]
 *         stockHistory:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 format: date-time
 *               change:
 *                 type: number
 *               reason:
 *                 type: string
 *               user:
 *                 type: string
 *       example:
 *         serialNo: 1
 *         name: "Tomato"
 *         category: "64f1c2e2a1b2c3d4e5f6a7b8"
 *         supplier: ["64f1c2e2a1b2c3d4e5f6a7b9"]
 *         branch: "64f1c2e2a1b2c3d4e5f6a7c0"
 *         costPrice: 10
 *         salePrice: 15
 *         stock: 100
 *         minStockLevel: 10
 *         reorderLevel: 20
 *         unit: "kg"
 *         status: "active"
 *         stockHistory:
 *           - date: "2025-08-31T12:00:00.000Z"
 *             change: 50
 *             reason: "Initial stock"
 *             user: "64f1c2e2a1b2c3d4e5f6a7c1"
 */

/**
 * @swagger
 * tags:
 *   - name: Ingridients
 *     description: API endpoints for managing ingridients
 */

/**
 * @swagger
 * /ingridients:
 *   get:
 *     summary: Get all ingridients
 *     tags: [Ingridients]
 *     responses:
 *       200:
 *         description: A list of ingridients
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Ingridients'
 *   post:
 *     summary: Create a new ingridient
 *     tags: [Ingridients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Ingridients'
 *     responses:
 *       201:
 *         description: The created ingridient
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ingridients'
 */

/**
 * @swagger
 * /ingridients/{id}:
 *   get:
 *     summary: Get an ingridient by ID
 *     tags: [Ingridients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the ingridient
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The ingridient
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ingridients'
 *       404:
 *         description: Ingridient not found
 *   put:
 *     summary: Update an ingridient by ID
 *     tags: [Ingridients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the ingridient
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Ingridients'
 *     responses:
 *       200:
 *         description: The updated ingridient
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ingridients'
 *       404:
 *         description: Ingridient not found
 *   delete:
 *     summary: Delete an ingridient by ID
 *     tags: [Ingridients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the ingridient
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Ingridient deleted
 *       404:
 *         description: Ingridient not found
 */
