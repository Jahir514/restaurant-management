import { Request, Response, NextFunction } from "express";
import * as foodsCategoryService from "../services/foodsCategory.service";

export const createFoodsCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;
    const result = await foodsCategoryService.createFoodsCategory(data);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const getAllFoodsCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await foodsCategoryService.getAllFoodsCategory();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const getSingleFoodsCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categoryId = req.params.id;
    const result = await foodsCategoryService.getSingleFoodsCategory(categoryId);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const updateFoodsCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categoryId = req.params.id;
    const data = req.body;
    const result = await foodsCategoryService.updateFoodsCategory(categoryId, data);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const deleteFoodsCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categoryId = req.params.id;
    const result = await foodsCategoryService.deleteFoodsCategory(categoryId);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
