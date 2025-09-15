/**
 * @swagger
 * tags:
 *   name: Supplier
 *   description: Supplier management endpoints
 */

import { Router } from "express";
import {
  createSupplier,
  getAllSupplier,
  getSingleSupplier,
  updateSupplier,
  deleteSupplier,
} from "../controllers/supplier.controller";
const router = Router();

/**
 * @swagger
 * /supplier:
 *   post:
 *     summary: Create a new supplier
 *     tags: [Supplier]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Supplier'
 *     responses:
 *       201:
 *         description: Supplier created successfully
 *       400:
 *         description: Invalid input
 */
router.post("/", createSupplier);
/**
 * @swagger
 * /supplier:
 *   get:
 *     summary: Get all suppliers
 *     tags: [Supplier]
 *     responses:
 *       200:
 *         description: List of suppliers
 */
router.get("/", getAllSupplier);
/**
 * @swagger
 * /supplier/{id}:
 *   get:
 *     summary: Get a single supplier by ID
 *     tags: [Supplier]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Supplier ID
 *     responses:
 *       200:
 *         description: Supplier found
 *       404:
 *         description: Supplier not found
 */
router.get("/:id", getSingleSupplier);
/**
 * @swagger
 * /supplier/{id}:
 *   patch:
 *     summary: Update a supplier by ID
 *     tags: [Supplier]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Supplier ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Supplier'
 *     responses:
 *       200:
 *         description: Supplier updated
 *       404:
 *         description: Supplier not found
 */
router.patch("/:id", updateSupplier);
/**
 * @swagger
 * /supplier/{id}:
 *   delete:
 *     summary: Delete a supplier by ID
 *     tags: [Supplier]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Supplier ID
 *     responses:
 *       200:
 *         description: Supplier deleted
 *       404:
 *         description: Supplier not found
 */
router.delete("/:id", deleteSupplier);

export default router;
