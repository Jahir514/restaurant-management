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
 *         - supplier
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
 *           type: string
 *         costPrice:
 *           type: number
 *         salePrice:
 *           type: number
 *         stock:
 *           type: number
 *         unit:
 *           type: string
 *       example:
 *         serialNo: 1
 *         name: "Tomato"
 *         category: "Vegetables"
 *         supplier: "Supplier A"
 *         costPrice: 10
 *         salePrice: 15
 *         stock: 100
 *         unit: "kg"
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
