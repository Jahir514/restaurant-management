import { Request, Response } from 'express'
import supplierService from '../services/supplier.service'
import { ICreateSupplierResponse } from '../interfaces/supplier.interface'
//supplier create controller
export const createSupplier = async (req: Request, res: Response) => {
  try {
    const { name, contact } = req.body
    const createSupplierResponse: ICreateSupplierResponse =
      await supplierService.createSupplier({ name, contact })
    res.status(201).json(createSupplierResponse)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'An Error Occoured' })
  }
}
