import { Request, Response, NextFunction } from "express";
import * as ingridientsCategoryService from "../services/ingridientsCategory.service";

export const createIngridientsCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;
    const result = await ingridientsCategoryService.createIngridientsCategory(data);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const getAllIngridientsCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await ingridientsCategoryService.getAllIngridientsCategory();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const getSingleIngridientsCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categoryId = req.params.id;
    const result = await ingridientsCategoryService.getSingleIngridientsCategory(categoryId);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const updateIngridientsCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categoryId = req.params.id;
    const data = req.body;
    const result = await ingridientsCategoryService.updateIngridientsCategory(categoryId, data);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const deleteIngridientsCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categoryId = req.params.id;
    const result = await ingridientsCategoryService.deleteIngridientsCategory(categoryId);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
