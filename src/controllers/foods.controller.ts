import { Request, Response, NextFunction } from "express";
import * as foodService from "../services/foods.service";

export const createFood = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;
    const result = await foodService.createFood(data);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const getAllFood = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await foodService.getAllFood();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const getSingleFood = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const foodId = req.params.id;
    const result = await foodService.getSingleFood(foodId);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const updateFood = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const foodId = req.params.id;
    const data = req.body;
    const result = await foodService.updateFood(foodId, data);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const deleteFood = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const foodId = req.params.id;
    const result = await foodService.deleteFood(foodId);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
