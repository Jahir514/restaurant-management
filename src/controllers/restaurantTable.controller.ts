import { Request, Response, NextFunction } from "express";
import * as restaurantTableService from "../services/restaurantTable.service";

export const createRestaurantTable = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;
    const result = await restaurantTableService.createRestaurantTable(data);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const getAllRestaurantTables = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await restaurantTableService.getAllRestaurantTables();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const getSingleRestaurantTable = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tableId = req.params.id;
    const result = await restaurantTableService.getSingleRestaurantTable(tableId);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const updateRestaurantTable = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tableId = req.params.id;
    const data = req.body;
    const result = await restaurantTableService.updateRestaurantTable(tableId, data);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const deleteRestaurantTable = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tableId = req.params.id;
    const result = await restaurantTableService.deleteRestaurantTable(tableId);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
