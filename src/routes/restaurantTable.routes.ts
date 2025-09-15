/**
 * @swagger
 * tags:
 *   name: RestaurantTable
 *   description: Restaurant table management endpoints
 */

import { Router } from "express";
import {
  createRestaurantTable,
  getAllRestaurantTables,
  getSingleRestaurantTable,
  updateRestaurantTable,
  deleteRestaurantTable,
} from "../controllers/restaurantTable.controller";
const router = Router();

/**
 * @swagger
 * /restaurant-table:
 *   post:
 *     summary: Create a new restaurant table
 *     tags: [RestaurantTable]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RestaurantTable'
 *     responses:
 *       201:
 *         description: Restaurant table created successfully
 *       400:
 *         description: Invalid input
 */
router.post("/", createRestaurantTable);
/**
 * @swagger
 * /restaurant-table:
 *   get:
 *     summary: Get all restaurant tables
 *     tags: [RestaurantTable]
 *     responses:
 *       200:
 *         description: List of restaurant tables
 */
router.get("/", getAllRestaurantTables);
/**
 * @swagger
 * /restaurant-table/{id}:
 *   get:
 *     summary: Get a single restaurant table by ID
 *     tags: [RestaurantTable]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Restaurant table ID
 *     responses:
 *       200:
 *         description: Restaurant table found
 *       404:
 *         description: Restaurant table not found
 */
router.get("/:id", getSingleRestaurantTable);
/**
 * @swagger
 * /restaurant-table/{id}:
 *   patch:
 *     summary: Update a restaurant table by ID
 *     tags: [RestaurantTable]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Restaurant table ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RestaurantTable'
 *     responses:
 *       200:
 *         description: Restaurant table updated
 *       404:
 *         description: Restaurant table not found
 */
router.patch("/:id", updateRestaurantTable);
/**
 * @swagger
 * /restaurant-table/{id}:
 *   delete:
 *     summary: Delete a restaurant table by ID
 *     tags: [RestaurantTable]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Restaurant table ID
 *     responses:
 *       200:
 *         description: Restaurant table deleted
 *       404:
 *         description: Restaurant table not found
 */
router.delete("/:id", deleteRestaurantTable);

export default router;
