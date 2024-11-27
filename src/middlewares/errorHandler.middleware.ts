import { Request, Response, NextFunction } from 'express'
import { CustomError } from '../interfaces/error/customError.interface'

export const errorHandler = (
  error: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error.status) {
    res.status(error.status).json(error.message)
  }
  res.status(500).json({ message: 'something went wrong.' })
}
