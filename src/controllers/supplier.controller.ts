import { Request, Response, NextFunction } from "express";
import * as supplierService from "../services/supplier.service";

export const createSupplier = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;
    const result = await supplierService.createSupplier(data);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const getAllSupplier = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await supplierService.getAllSupplier();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const getSingleSupplier = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const supplierId = req.params.id;
    const result = await supplierService.getSingleSupplier(supplierId);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const updateSupplier = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const supplierId = req.params.id;
    const data = req.body;
    const result = await supplierService.updateSupplier(supplierId, data);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const deleteSupplier = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const supplierId = req.params.id;
    const result = await supplierService.deleteSupplier(supplierId);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
