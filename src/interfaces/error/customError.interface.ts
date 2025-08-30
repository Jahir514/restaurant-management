import { ERROR_NAMES } from '../../constants/http.constants';

export interface CustomError extends Error {
  name: keyof typeof ERROR_NAMES;
  httpCode: number;
  isOperational: boolean;
  details?: Record<string, unknown>;
}

export interface ICustomError {
  status: number;
  code: string;
  message: string;
  details?: any;
}
