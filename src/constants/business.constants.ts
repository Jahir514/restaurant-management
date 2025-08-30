export const UNITS = {
  KG: 'kg',
  GRAM: 'g',
  LITER: 'l',
  PIECE: 'pc',
  DOZEN: 'dozen',
} as const;

export const OTP_CONFIG = {
  LENGTH: 6,
  EXPIRY_MINUTES: 5,
  MAX_ATTEMPTS: 3,
} as const;