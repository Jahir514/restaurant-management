import { BaseResponse } from './common.types';

export type DataResponse<T> = BaseResponse & {
  data: T | null;
};

export type PaginatedResponse<T> = DataResponse<T[]> & {
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
};