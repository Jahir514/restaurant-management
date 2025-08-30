import { BaseError } from './BaseError';

export class ValidationError extends BaseError {
  constructor(message: string, details?: any) {
    super('VALIDATION_ERROR', 400, message, true, details);
  }
}