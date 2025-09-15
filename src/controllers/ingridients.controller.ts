import { Request, Response, NextFunction } from "express";
import * as ingridientsService from "../services/ingridients.service";

export const createIngridient = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;
    const result = await ingridientsService.createIngridients(data);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const getAllIngridients = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await ingridientsService.getAllIngridients();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const getSingleIngridient = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const ingridientId = req.params.id;
    const result = await ingridientsService.getSingleIngridients(ingridientId);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const updateIngridient = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const ingridientId = req.params.id;
    const data = req.body;
    const result = await ingridientsService.updateIngridients(ingridientId, data);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const deleteIngridient = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const ingridientId = req.params.id;
    const result = await ingridientsService.deleteIngridients(ingridientId);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
