import { Injectable } from "@angular/core";
import { invoke } from "@tauri-apps/api/core";

export interface RetryOptions {
  maxAttempts: number;
  initialDelayMs: number;
  maxDelayMs: number;
}

export interface InvokeOptions {
  suppressError?: boolean;
  signal?: AbortSignal;
}

export async function invokeWithRetry<T>(
  fn: () => Promise<T>,
  options: RetryOptions,
): Promise<T> {
  const { maxAttempts, initialDelayMs, maxDelayMs } = options;
  let lastError: Error;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      if (attempt < maxAttempts - 1) {
        const delay = Math.min(
          initialDelayMs * Math.pow(2, attempt),
          maxDelayMs,
        );
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }
  throw lastError!;
}

interface ResponseWrapper<T> {
  status: string;
  message: string;
  data: T;
}

const SUCCESS_STATUSES = new Set(["success", "created", "updated", "deleted"]);
const ERROR_STATUSES = new Set([
  "error",
  "notFound",
  "validationError",
  "unauthorized",
  "forbidden",
]);

@Injectable({ providedIn: "root" })
export class InvokeWrapperService {
  /**
   * Invoke a Tauri command and always unwrap the Response<T> wrapper.
   * - If the response has a `status` field (Response wrapper), returns response.data on success
   * - Throws an error with the message for error statuses
   * - If no `status` field (raw T), returns the raw result
   */
  async invoke<T>(
    cmd: string,
    args?: Record<string, unknown>,
    options?: InvokeOptions,
  ): Promise<T> {
    try {
      const response = await invoke<ResponseWrapper<T>>(cmd, args);

      if (response && typeof response === "object" && "status" in response) {
        if (SUCCESS_STATUSES.has(response.status)) {
          return response.data as T;
        }
        if (ERROR_STATUSES.has(response.status)) {
          throw new Error(response.message || `Command ${cmd} failed`);
        }
      }

      // No status field - raw T result
      return response as T;
    } catch (err) {
      if (options?.suppressError) {
        return undefined as T;
      }
      throw err;
    }
  }

  /**
   * Invoke without unwrapping - returns the raw Response<T> wrapper.
   * Use this when you need to inspect the response status.
   */
  async invokeRaw<T>(cmd: string, args?: Record<string, unknown>): Promise<T> {
    return invoke<T>(cmd, args);
  }

  async invokeWithRetry<T>(
    cmd: string,
    args?: Record<string, unknown>,
    retryOptions: RetryOptions = {
      maxAttempts: 3,
      initialDelayMs: 1000,
      maxDelayMs: 30000,
    },
  ): Promise<T> {
    return invokeWithRetry(
      () => this.invokeWithTimeout<T>(cmd, args, retryOptions.maxDelayMs),
      retryOptions,
    );
  }

  async timeout<T>(
    ms: number,
    cmd: string,
    args?: Record<string, unknown>,
    options?: InvokeOptions,
  ): Promise<T> {
    const { signal } = options ?? {};
    const doTimeout = new Promise<never>((_, reject) =>
      setTimeout(
        () => reject(new Error(`Invoke ${cmd} timed out after ${ms}ms`)),
        ms,
      ),
    );
    if (signal) {
      const doAbort = new Promise<never>((_, reject) => {
        if (signal.aborted) {
          reject(signal.reason);
          return;
        }
        signal.addEventListener("abort", () => reject(signal.reason), {
          once: true,
        });
      });
      return Promise.race([this.invokeRaw<T>(cmd, args), doTimeout, doAbort]);
    }
    return Promise.race([this.invokeRaw<T>(cmd, args), doTimeout]);
  }

  private async invokeWithTimeout<T>(
    cmd: string,
    args: Record<string, unknown> | undefined,
    timeoutMs: number,
  ): Promise<T> {
    return Promise.race([
      this.invoke<T>(cmd, args),
      new Promise<never>((_, reject) =>
        setTimeout(
          () =>
            reject(new Error(`Invoke ${cmd} timed out after ${timeoutMs}ms`)),
          timeoutMs,
        ),
      ),
    ]);
  }
}
