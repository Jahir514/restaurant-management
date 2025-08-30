export class BaseError extends Error {
  public readonly name: string;
  public readonly httpCode: number;
  public readonly isOperational: boolean;
  public readonly details: any;

  constructor(name: string, httpCode: number, description: string, isOperational: boolean = true, details?: any) {
    super(description);

    Object.setPrototypeOf(this, new.target.prototype);

    this.name = name;
    this.httpCode = httpCode;
    this.isOperational = isOperational;
    this.details = details;

    Error.captureStackTrace(this);
  }
}


// Usage example:
/*
throw new ValidationError('Invalid email format', { field: 'email' });
throw new AuthenticationError('Invalid token');
throw new NotFoundError('User not found');
throw new DatabaseError('Connection failed');
*/