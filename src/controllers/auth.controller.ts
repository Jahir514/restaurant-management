import { Request, Response, NextFunction } from "express";
import authService from "../services/auth.service";

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userData = req.body;
    const result = await authService.register(userData);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;
    const result = await authService.login(data);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const sendOTP = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { phone } = req.body;
    const result = await authService.sendPhoneOtp(phone);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const verifyOtpRegister = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { phone, otp, password } = req.body;
    const result = await authService.completePhoneRegistration({ phone, otp, password });
    res.json(result);
  } catch (error) {
    next(error);
  }
};
