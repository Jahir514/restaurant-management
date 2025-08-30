import { Document, FilterQuery, UpdateQuery } from 'mongoose';
import { IQueryFilters } from './common.interface';

export interface ICrudOperations<T extends Document> {
  create(data: Partial<T>): Promise<T>;
  findById(id: string): Promise<T | null>;
  findOne(filter: FilterQuery<T>): Promise<T | null>;
  findAll(filters?: IQueryFilters): Promise<{
    items: T[];
    total: number;
    page: number;
    limit: number;
  }>;
  update(id: string, data: UpdateQuery<T>): Promise<T | null>;
  delete(id: string): Promise<boolean>;
}