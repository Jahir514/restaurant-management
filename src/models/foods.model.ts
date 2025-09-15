import mongoose, { Schema, Model } from "mongoose";
import { IFood } from "../interfaces/foods.interface";

// Improved schema for foods (package menu)
const foodSchema = new Schema<IFood>(
  {
    name: { type: String, required: true, trim: true },
    slug: {
      type: String,
      required: true,
      trim: true,
    },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    discount_price: { type: Number, default: null, min: 0 },
    status: { type: String, enum: ["0", "1"], default: "1" },
    featured: { type: String, enum: ["0", "1"], default: "0" },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
  },
  {
    timestamps: false,
  }
);

// Indexes for performance
foodSchema.index({ slug: 1 });
foodSchema.index({ name: 1 });
foodSchema.index({ status: 1 });
foodSchema.index({ featured: 1 });

// Update updated_at on save
foodSchema.pre("save", function (next) {
  this.updated_at = new Date();
  next();
});

// Create model
const Food: Model<IFood> = mongoose.model<IFood>("Food", foodSchema);
export default Food;

/**
 * Usage pattern for querying foods:
 *
 * import Food from '../models/foods.model';
 * const foods = await Food.find({ status: "1", featured: "1" });
 *
 * This pattern should be used throughout the project for all food/package menu queries.
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Food:
 *       type: object
 *       required:
 *         - name
 *         - slug
 *         - description
 *         - price
 *         - status
 *         - featured
 *       properties:
 *         name:
 *           type: string
 *         slug:
 *           type: string
 *         description:
 *           type: string
 *         price:
 *           type: number
 *         discount_price:
 *           type: number
 *         status:
 *           type: string
 *           enum: ["0", "1"]
 *         featured:
 *           type: string
 *           enum: ["0", "1"]
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *       example:
 *         name: "Package Menu 1"
 *         slug: "package-menu-1"
 *         description: "Tahari, Salad, Drinks"
 *         price: 260.00
 *         discount_price: null
 *         status: "1"
 *         featured: "1"
 *         created_at: "2022-10-23T23:01:12.000Z"
 *         updated_at: "2023-10-04T15:43:13.000Z"
 */

/**
 * @swagger
 * tags:
 *   - name: Food
 *     description: API endpoints for managing foods/package menus
 */

/**
 * @swagger
 * /foods:
 *   get:
 *     summary: Get all foods/package menus
 *     tags: [Food]
 *     responses:
 *       200:
 *         description: A list of foods/package menus
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Food'
 *   post:
 *     summary: Create a new food/package menu
 *     tags: [Food]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Food'
 *     responses:
 *       201:
 *         description: The created food/package menu
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Food'
 */

/**
 * @swagger
 * /foods/{id}:
 *   get:
 *     summary: Get a food/package menu by ID
 *     tags: [Food]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the food/package menu
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The food/package menu
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Food'
 *       404:
 *         description: Food not found
 *   put:
 *     summary: Update a food/package menu by ID
 *     tags: [Food]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the food/package menu
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Food'
 *     responses:
 *       200:
 *         description: The updated food/package menu
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Food'
 *       404:
 *         description: Food not found
 *   delete:
 *     summary: Delete a food/package menu by ID
 *     tags: [Food]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the food/package menu
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Food deleted
 *       404:
 *         description: Food not found
 */
