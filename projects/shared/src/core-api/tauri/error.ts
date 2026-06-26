export interface AppError {
  type: ErrorType;
  message: string;
  entity?: string;
  details?: Record<string, unknown>;
}

export enum ErrorType {
  NotFound = "notFound",
  ValidationError = "validationError",
  Duplicate = "duplicate",
  Unauthorized = "unauthorized",
  Forbidden = "forbidden",
  Internal = "internal",
  Database = "database",
  Network = "network",
}

export function isNotFoundError(error: AppError): boolean {
  return error.type === ErrorType.NotFound;
}

export function isValidationError(error: AppError): boolean {
  return error.type === ErrorType.ValidationError;
}

export function isDuplicateError(error: AppError): boolean {
  return error.type === ErrorType.Duplicate;
}

export function isUnauthorizedError(error: AppError): boolean {
  return error.type === ErrorType.Unauthorized;
}

export function isForbiddenError(error: AppError): boolean {
  return error.type === ErrorType.Forbidden;
}

export function isInternalError(error: AppError): boolean {
  return error.type === ErrorType.Internal;
}

export function isDatabaseError(error: AppError): boolean {
  return error.type === ErrorType.Database;
}

export function isNetworkError(error: AppError): boolean {
  return error.type === ErrorType.Network;
}

export function parseError(error: unknown): AppError {
  if (
    error &&
    typeof error === "object" &&
    "type" in error &&
    "message" in error
  ) {
    return error as AppError;
  }

  if (error instanceof Error) {
    return {
      type: ErrorType.Internal,
      message: error.message,
    };
  }

  return {
    type: ErrorType.Internal,
    message: String(error),
  };
}

export function formatError(error: AppError): string {
  switch (error.type) {
    case ErrorType.NotFound:
      return error.entity ? `${error.entity} not found` : error.message;
    case ErrorType.ValidationError:
      return `Validation error: ${error.message}`;
    case ErrorType.Duplicate:
      return error.entity ? `${error.entity} already exists` : error.message;
    case ErrorType.Unauthorized:
      return "Unauthorized access";
    case ErrorType.Forbidden:
      return "Access forbidden";
    case ErrorType.Internal:
      return `Internal error: ${error.message}`;
    case ErrorType.Database:
      return `Database error: ${error.message}`;
    case ErrorType.Network:
      return `Network error: ${error.message}`;
    default:
      return error.message;
  }
}
