/**
 * Centralized logging utility.
 * Allows silencing in production and redirecting to external loggers.
 */
export const logger = {
  log: (message: string, ...args: unknown[]) =>
    console.log(`[SCHEMA] ${message}`, ...args),
  warn: (message: string, ...args: unknown[]) =>
    console.warn(`[SCHEMA] ${message}`, ...args),
  error: (message: string, ...args: unknown[]) =>
    console.error(`[SCHEMA] ${message}`, ...args),
};
