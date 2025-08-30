import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { BaseError } from '../errors/BaseError';

export const errorHandler: ErrorRequestHandler = (
  err: Error | BaseError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (err instanceof BaseError) {
    res.status(err.httpCode).json({
      status: 'error',
      message: err.message,
      details: err.details || null
    });
    return;
  }

  // Handle unexpected errors
  console.error('Unexpected error:', err);
  res.status(500).json({
    status: 'error',
    message: 'Internal server error'
  });
};