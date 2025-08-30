import { BaseError } from './BaseError';

export class DatabaseError extends BaseError {
  constructor(description: string) {
    super('DATABASE_ERROR', 500, description, false);
  }
}