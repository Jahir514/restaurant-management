import { Request, Response, NextFunction } from 'express';
import ingridientsCategoryService from '../services/ingridientsCategory.service';
//ingridients category create controller
export const createIngridientsCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;
    const ingridentsCategoryCreateRes = await ingridientsCategoryService.createIngridientsCategory(data);
    res.status(200).json(ingridentsCategoryCreateRes);
  } catch (error) {
    next(error);
  }
};
//get all ingridients category controller
export const getAllIngridientsCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const ingridentsCategoryGetRes = await ingridientsCategoryService.getAllIngridientsCategory();
    res.status(200).json(ingridentsCategoryGetRes);
  } catch (error) {
    next(error);
  }
};
//get single ingridients category controller
export const getSingleIngridientsCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const ingredientsCategoryId = req.params.id;
    const ingridentsCategoryGetRes = await ingridientsCategoryService.getSingleIngridientsCategory(ingredientsCategoryId);
    res.status(200).json(ingridentsCategoryGetRes);
  } catch (error) {
    next(error);
  }
};
//ingridients category update controller
export const updateIngridientsCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const ingredientsCategoryId = req.params.id;
    const data = req.body;
    const ingridentsCategoryUpdateRes = await ingridientsCategoryService.updateIngridientsCategory(ingredientsCategoryId, data);
    res.status(200).json(ingridentsCategoryUpdateRes);
  } catch (error) {
    next(error);
  }
};
//ingridients category delete controller
export const deleteIngridientsCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const ingredientsCategoryId = req.params.id;
    const ingridentsCategoryDeleteRes = await ingridientsCategoryService.deleteIngridientsCategory(ingredientsCategoryId);
    res.status(200).json(ingridentsCategoryDeleteRes);
  } catch (error) {
    next(error);
  }
};
