// Note: Response.data uses T | null (not Option<T>).
// Rust's Option<T> serializes as null in JSON for None values,
// which TypeScript correctly interprets as T | null.
// This avoids breaking changes for TypeScript consumers.

export enum ResponseStatus {
  Success = "success",
  Created = "created",
  Updated = "updated",
  Deleted = "deleted",
  Error = "error",
  ValidationError = "validationError",
  NotFound = "notFound",
  Unauthorized = "unauthorized",
  Forbidden = "forbidden",
  Info = "info",
  Warning = "warning",
  Duplicate = "duplicate",
}

export interface Response<T = unknown> {
  status: ResponseStatus;
  message: string;
  data: T | null;
}

export function isSuccess<T>(response: Response<T>): boolean {
  return (
    response.status === ResponseStatus.Success ||
    response.status === ResponseStatus.Created ||
    response.status === ResponseStatus.Updated ||
    response.status === ResponseStatus.Deleted
  );
}

export function isError<T>(response: Response<T>): boolean {
  return (
    response.status === ResponseStatus.Error ||
    response.status === ResponseStatus.ValidationError ||
    response.status === ResponseStatus.NotFound ||
    response.status === ResponseStatus.Unauthorized ||
    response.status === ResponseStatus.Forbidden
  );
}

export function getErrorMessage<T>(response: Response<T>): string | null {
  if (isError(response)) {
    return response.message;
  }
  return null;
}

export function unwrapResponse<T>(response: Response<T>): T {
  if (isError(response)) {
    throw new Error(response.message || "Unknown error");
  }
  if (response.data === null) {
    throw new Error("No data in response");
  }
  return response.data;
}

export function mapResponse<U, T>(
  response: Response<T>,
  mapper: (data: T) => U,
): Response<U> {
  return {
    ...response,
    data: response.data !== null ? mapper(response.data) : null,
  };
}
