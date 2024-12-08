import { Request, Response, NextFunction } from 'express';
import ingridientsService from '../services/ingridients.service';
//ingridients  create controller
export const createIngridients = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;
    const ingridentsCreateRes = await ingridientsService.createIngridients(data);
    res.status(200).json(ingridentsCreateRes);
  } catch (error) {
    next(error);
  }
};
//get all ingridients  controller
export const getAllIngridients = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const ingridentsGetRes = await ingridientsService.getAllIngridients();
    res.status(200).json(ingridentsGetRes);
  } catch (error) {
    next(error);
  }
};
//get single ingridients  controller
export const getSingleIngridients = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const ingredientsId = req.params.id;
    const ingridentsGetRes = await ingridientsService.getSingleIngridients(ingredientsId);
    res.status(200).json(ingridentsGetRes);
  } catch (error) {
    next(error);
  }
};
//ingridients  update controller
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
//ingridients  delete controller
export const deleteIngridients = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const ingredientsId = req.params.id;
    const ingridentsDeleteRes = await ingridientsService.deleteIngridients(ingredientsId);
    res.status(200).json(ingridentsDeleteRes);
  } catch (error) {
    next(error);
  }
};
