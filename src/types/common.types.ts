export type ResponseStatus = 'success' | 'error' | 'fail';

export type BaseResponse = {
  success: boolean;
  message: string;
};

export type PaginationParams = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
};