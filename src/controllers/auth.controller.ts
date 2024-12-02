import { Request, Response, NextFunction } from 'express';

//user register controller
export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userData = req.body;
    //const userRegisterResponse = await
  } catch (error) {
    next(error);
  }
};

//user login controller
export const login = async (req: Request, res: Response, next: NextFunction) => {};
