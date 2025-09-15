/**
 * @swagger
 * tags:
 *   name: Ingredients
 *   description: Ingredients management endpoints
 */

import { Router } from "express";
import {
  createIngridient,
  getAllIngridients,
  getSingleIngridient,
  updateIngridient,
  deleteIngridient,
} from "../controllers/ingridients.controller";
const router = Router();

/**
 * @swagger
 * /ingredients:
 *   post:
 *     summary: Create a new ingredient
 *     tags: [Ingredients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Ingredient'
 *     responses:
 *       201:
 *         description: Ingredient created successfully
 *       400:
 *         description: Invalid input
 */
router.post("/", createIngridient);
/**
 * @swagger
 * /ingredients:
 *   get:
 *     summary: Get all ingredients
 *     tags: [Ingredients]
 *     responses:
 *       200:
 *         description: List of ingredients
 */
router.get("/", getAllIngridients);
/**
 * @swagger
 * /ingredients/{id}:
 *   get:
 *     summary: Get a single ingredient by ID
 *     tags: [Ingredients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Ingredient ID
 *     responses:
 *       200:
 *         description: Ingredient found
 *       404:
 *         description: Ingredient not found
 */
router.get("/:id", getSingleIngridient);
/**
 * @swagger
 * /ingredients/{id}:
 *   patch:
 *     summary: Update an ingredient by ID
 *     tags: [Ingredients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Ingredient ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Ingredient'
 *     responses:
 *       200:
 *         description: Ingredient updated
 *       404:
 *         description: Ingredient not found
 */
router.patch("/:id", updateIngridient);
/**
 * @swagger
 * /ingredients/{id}:
 *   delete:
 *     summary: Delete an ingredient by ID
 *     tags: [Ingredients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Ingredient ID
 *     responses:
 *       200:
 *         description: Ingredient deleted
 *       404:
 *         description: Ingredient not found
 */
router.delete("/:id", deleteIngridient);

export default router;
