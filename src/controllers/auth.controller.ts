import { Request, Response, NextFunction } from 'express';
import authService from '../services/auth.service';

//user register controller
export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userData = req.body;
    const userRegisterResponse = await authService.register(userData);
    res.status(200).json(userRegisterResponse);
  } catch (error) {
    next(error);
  }
};

//user login controller
export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;
    const userLoginResponse = await authService.login(data);
    res.status(200).json(userLoginResponse);
  } catch (error) {
    next(error);
  }
};
