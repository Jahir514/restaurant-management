/**
 * @swagger
 * tags:
 *   name: IngredientCategory
 *   description: Ingredient category management endpoints
 */

import { Router } from "express";
import {
  createIngridientsCategory,
  getAllIngridientsCategory,
  getSingleIngridientsCategory,
  updateIngridientsCategory,
  deleteIngridientsCategory,
} from "../controllers/ingridientsCategory.controller";
const router = Router();

/**
 * @swagger
 * /ingredients-category:
 *   post:
 *     summary: Create a new ingredient category
 *     tags: [IngredientCategory]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/IngredientCategory'
 *     responses:
 *       201:
 *         description: Ingredient category created successfully
 *       400:
 *         description: Invalid input
 */
router.post("/", createIngridientsCategory);
/**
 * @swagger
 * /ingredients-category:
 *   get:
 *     summary: Get all ingredient categories
 *     tags: [IngredientCategory]
 *     responses:
 *       200:
 *         description: List of ingredient categories
 */
router.get("/", getAllIngridientsCategory);
/**
 * @swagger
 * /ingredients-category/{id}:
 *   get:
 *     summary: Get a single ingredient category by ID
 *     tags: [IngredientCategory]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Ingredient category ID
 *     responses:
 *       200:
 *         description: Ingredient category found
 *       404:
 *         description: Ingredient category not found
 */
router.get("/:id", getSingleIngridientsCategory);
/**
 * @swagger
 * /ingredients-category/{id}:
 *   patch:
 *     summary: Update an ingredient category by ID
 *     tags: [IngredientCategory]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Ingredient category ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/IngredientCategory'
 *     responses:
 *       200:
 *         description: Ingredient category updated
 *       404:
 *         description: Ingredient category not found
 */
router.patch("/:id", updateIngridientsCategory);
/**
 * @swagger
 * /ingredients-category/{id}:
 *   delete:
 *     summary: Delete an ingredient category by ID
 *     tags: [IngredientCategory]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Ingredient category ID
 *     responses:
 *       200:
 *         description: Ingredient category deleted
 *       404:
 *         description: Ingredient category not found
 */
router.delete("/:id", deleteIngridientsCategory);

export default router;
