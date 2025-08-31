import { Request, Response, NextFunction } from "express";
import ingridientsService from "../services/ingridients.service";

// Controller for creating a new ingredient
// Supports optional supplier field
export const createIngridients = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;
    // If supplier is not provided, allow creation (supplier is optional)
    const ingridentsCreateRes = await ingridientsService.createIngridients(data);
    res.status(201).json(ingridentsCreateRes);
  } catch (error) {
    next(error);
  }
};

// Controller for getting all ingredients (supports branch-aware queries)
export const getAllIngridients = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Optionally, pass branch info if your service supports it: req.branch
    const ingridentsGetRes = await ingridientsService.getAllIngridients();
    res.status(200).json(ingridentsGetRes);
  } catch (error) {
    next(error);
  }
};

// Controller for getting a single ingredient by ID
export const getSingleIngridients = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const ingredientsId = req.params.id;
    const ingridentsGetRes = await ingridientsService.getSingleIngridients(ingredientsId);
    res.status(200).json(ingridentsGetRes);
  } catch (error) {
    next(error);
  }
};

// Controller for updating an ingredient (supplier remains optional)
export const updateIngridients = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const ingredientsId = req.params.id;
    const data = req.body;
    const ingridentsUpdateRes = await ingridientsService.updateIngridients(ingredientsId, data);
    res.status(200).json(ingridentsUpdateRes);
  } catch (error) {
    next(error);
  }
};

// Controller for deleting an ingredient
export const deleteIngridients = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const ingredientsId = req.params.id;
    const ingridentsDeleteRes = await ingridientsService.deleteIngridients(ingredientsId);
    res.status(200).json(ingridentsDeleteRes);
  } catch (error) {
    next(error);
  }
};
