import { BaseError } from './BaseError';

export class AuthError extends BaseError {
  constructor(message: string) {
    super('AUTH_ERROR', 401, message);
  }
}