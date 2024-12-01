import { NextFunction, Request, Response } from 'express'
import supplierService from '../services/supplier.service'
import { ICreateSupplierResponse, IGetSupplierResponse, IUpdateSupplier, IUpdateSupplierResponse } from '../interfaces/supplier.interface'
//supplier create controller
export const createSupplier = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, contact } = req.body
    const createSupplierResponse: ICreateSupplierResponse = await supplierService.createSupplier({ name, contact })
    res.status(201).json(createSupplierResponse)
  } catch (error) {
    next(error)
  }
}
//get all supplier controller
export const getAllSupplier = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const getAllSupplierResponse: IGetSupplierResponse = await supplierService.getAllSupplier()
    res.status(200).json(getAllSupplierResponse)
  } catch (error) {
    next(error)
  }
}
//get single supplier
export const getSingleSupplier = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id: string = req.params.id
    const getSingleSupplierResponse: IGetSupplierResponse = await supplierService.getSingleSupplier(id)
    res.status(200).json(getSingleSupplierResponse)
  } catch (error) {
    next(error)
  }
}
//update supplier
export const updateSupplier = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const supplierId: string = req.params.id
    const data: IUpdateSupplier = req.body
    const supplierUpdateResponse: IUpdateSupplierResponse = await supplierService.updateSupplier(supplierId, data)
    res.status(200).json(supplierUpdateResponse)
  } catch (error) {
    next(error)
  }
}
//delete supplier
export const deleteSupplier = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const supplierId: string = req.params.id
    const supplierDeleteResposne = await supplierService.deleteSupplier(supplierId)
    res.status(200).json(supplierDeleteResposne)
  } catch (error) {
    next(error)
  }
}
