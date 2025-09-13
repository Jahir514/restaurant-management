/**
 * @swagger
 * tags:
 *   name: Food
 *   description: Foods/package menu management endpoints
 */

import { Router } from "express";
import { foodController } from "../controllers/foods.controller";
const router = Router();

/**
 * @swagger
 * /foods:
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
 *         description: Food created successfully
 *       400:
 *         description: Invalid input
 */
router.post("/", foodController.create.bind(foodController));
/**
 * @swagger
 * /foods:
 *   get:
 *     summary: Get all foods/package menus
 *     tags: [Food]
 *     responses:
 *       200:
 *         description: List of foods/package menus
 */
router.get("/", foodController.getAll.bind(foodController));
/**
 * @swagger
 * /foods/{id}:
 *   get:
 *     summary: Get a single food/package menu by ID
 *     tags: [Food]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Food/package menu ID
 *     responses:
 *       200:
 *         description: Food found
 *       404:
 *         description: Food not found
 */
router.get("/:id", foodController.getOne.bind(foodController));
/**
 * @swagger
 * /foods/{id}:
 *   patch:
 *     summary: Update a food/package menu by ID
 *     tags: [Food]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Food/package menu ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Food'
 *     responses:
 *       200:
 *         description: Food updated
 *       404:
 *         description: Food not found
 */
router.patch("/:id", foodController.update.bind(foodController));
/**
 * @swagger
 * /foods/{id}:
 *   delete:
 *     summary: Delete a food/package menu by ID
 *     tags: [Food]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Food/package menu ID
 *     responses:
 *       200:
 *         description: Food deleted
 *       404:
 *         description: Food not found
 */
router.delete("/:id", foodController.delete.bind(foodController));

export default router;
