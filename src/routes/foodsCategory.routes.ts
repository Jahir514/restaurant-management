/**
 * @swagger
 * tags:
 *   name: FoodsCategory
 *   description: Foods category management endpoints
 */

import { Router } from "express";
import { foodsCategoryController } from "../controllers/foodsCategory.controller";
const router = Router();

/**
 * @swagger
 * /foods-category:
 *   post:
 *     summary: Create a new foods category
 *     tags: [FoodsCategory]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FoodsCategory'
 *     responses:
 *       201:
 *         description: Foods category created successfully
 *       400:
 *         description: Invalid input
 */
router.post("/", foodsCategoryController.create.bind(foodsCategoryController));
/**
 * @swagger
 * /foods-category:
 *   get:
 *     summary: Get all foods categories
 *     tags: [FoodsCategory]
 *     responses:
 *       200:
 *         description: List of foods categories
 */
router.get("/", foodsCategoryController.getAll.bind(foodsCategoryController));
/**
 * @swagger
 * /foods-category/{id}:
 *   get:
 *     summary: Get a single foods category by ID
 *     tags: [FoodsCategory]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Foods category ID
 *     responses:
 *       200:
 *         description: Foods category found
 *       404:
 *         description: Foods category not found
 */
router.get(
  "/:id",
  foodsCategoryController.getOne.bind(foodsCategoryController)
);
/**
 * @swagger
 * /foods-category/{id}:
 *   patch:
 *     summary: Update a foods category by ID
 *     tags: [FoodsCategory]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Foods category ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FoodsCategory'
 *     responses:
 *       200:
 *         description: Foods category updated
 *       404:
 *         description: Foods category not found
 */
router.patch(
  "/:id",
  foodsCategoryController.update.bind(foodsCategoryController)
);
/**
 * @swagger
 * /foods-category/{id}:
 *   delete:
 *     summary: Delete a foods category by ID
 *     tags: [FoodsCategory]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Foods category ID
 *     responses:
 *       200:
 *         description: Foods category deleted
 *       404:
 *         description: Foods category not found
 */
router.delete(
  "/:id",
  foodsCategoryController.delete.bind(foodsCategoryController)
);

export default router;
