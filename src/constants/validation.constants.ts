export const VALIDATION_MESSAGES = {
  REQUIRED_FIELD: (field: string) => `${field} is required`,
  INVALID_PHONE: 'Invalid phone number format',
  INVALID_EMAIL: 'Invalid email format',
  MIN_LENGTH: (field: string, length: number) => `${field} must be at least ${length} characters`,
  MAX_LENGTH: (field: string, length: number) => `${field} must not exceed ${length} characters`,
} as const;

export const REGEX_PATTERNS = {
  PHONE_BD: /^(?:\+88|88)?(01[3-9]\d{8})$/,
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
} as const;