import { IPagination } from './common.interface';

export type ApiSuccessResponse<T> = {
  success: true;
  message: string;
  data: T;
  pagination?: IPagination;
};

export type ApiErrorResponse = {
  success: false;
  message: string;
  error: {
    code: string;
    details?: any;
  };
};

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

// Common response types
export type CreateResponse<T> = ApiResponse<T>;
export type UpdateResponse<T> = ApiResponse<T>;
export type DeleteResponse = ApiResponse<{ deleted: boolean }>;
export type GetOneResponse<T> = ApiResponse<T>;
export type GetManyResponse<T> = ApiResponse<{
  items: T[];
  pagination: IPagination;
}>;