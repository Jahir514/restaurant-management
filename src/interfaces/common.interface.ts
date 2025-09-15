export interface ITimestamps {
  createdAt: Date;
  updatedAt: Date;
}

export interface IPagination {
  page: number;
  limit: number;
  total: number;
}

export interface IQueryFilters {
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  page?: number;
  limit?: number;
  isActive?: boolean;
  sort?: Record<string, 1 | -1>;
}
