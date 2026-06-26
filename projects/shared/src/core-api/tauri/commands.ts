import { invoke } from "@tauri-apps/api/core";
import { Response, ResponseStatus } from "./response";
import { AppError, ErrorType } from "./error";

export interface InvokeOptionsWithRetry {
  timeout?: number;
  retryCount?: number;
  retryDelay?: number;
}

export interface CommandResult<T> {
  success: boolean;
  data: T | null;
  error: AppError | null;
}

async function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function parseErrorFromInvoke(error: unknown): AppError {
  if (error && typeof error === "object") {
    const e = error as Record<string, unknown>;
    if ("type" in e && "message" in e) {
      return e as unknown as AppError;
    }
    if ("message" in e) {
      return {
        type: ErrorType.Internal,
        message: String(e.message),
      };
    }
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

export async function invokeCommand<T>(
  command: string,
  args?: Record<string, unknown>,
  options?: InvokeOptionsWithRetry,
): Promise<CommandResult<T>> {
  const { timeout = 30000, retryCount = 0, retryDelay = 1000 } = options || {};

  let lastError: AppError | null = null;

  for (let attempt = 0; attempt <= retryCount; attempt++) {
    try {
      const result = await invoke<T>(command, args);
      return {
        success: true,
        data: result,
        error: null,
      };
    } catch (error) {
      lastError = parseErrorFromInvoke(error);

      if (attempt < retryCount) {
        await delay(retryDelay * Math.pow(2, attempt));
      }
    }
  }

  return {
    success: false,
    data: null,
    error: lastError,
  };
}

export async function invokeCommandWithResponse<T>(
  command: string,
  args?: Record<string, unknown>,
  options?: InvokeOptionsWithRetry,
): Promise<Response<T>> {
  const { timeout = 30000, retryCount = 0, retryDelay = 1000 } = options || {};

  let lastResponse: Response<T> = {
    status: ResponseStatus.Error,
    message: "Unknown error",
    data: null,
  };

  for (let attempt = 0; attempt <= retryCount; attempt++) {
    try {
      const result = await invoke<Response<T>>(command, args);
      lastResponse = result;

      if (
        result.status !== ResponseStatus.Error &&
        result.status !== ResponseStatus.ValidationError
      ) {
        return result;
      }

      if (attempt < retryCount) {
        await delay(retryDelay * Math.pow(2, attempt));
      }
    } catch (error) {
      lastResponse = {
        status: ResponseStatus.Error,
        message: error instanceof Error ? error.message : String(error),
        data: null,
      };

      if (attempt < retryCount) {
        await delay(retryDelay * Math.pow(2, attempt));
      }
    }
  }

  return lastResponse;
}

export async function invokeVoid(
  command: string,
  args?: Record<string, unknown>,
  options?: InvokeOptionsWithRetry,
): Promise<void> {
  const result = await invokeCommand<void>(command, args, options);
  if (!result.success) {
    throw new Error(result.error?.message || "Command failed");
  }
}

export async function invokeWithError<T>(
  command: string,
  args?: Record<string, unknown>,
  options?: InvokeOptionsWithRetry,
): Promise<T> {
  const result = await invokeCommand<T>(command, args, options);
  if (!result.success || result.data === null) {
    const errorMsg = result.error?.message || "Command failed";
    throw new Error(errorMsg);
  }
  return result.data;
}
