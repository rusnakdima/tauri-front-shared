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

@Injectable({ providedIn: "root" })
export class InvokeWrapperService {
  async invoke<T>(
    cmd: string,
    args?: Record<string, unknown>,
    options?: InvokeOptions,
  ): Promise<T> {
    try {
      return await invoke<T>(cmd, args);
    } catch (err) {
      if (options?.suppressError) {
        return undefined as T;
      }
      throw err;
    }
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
      return Promise.race([invoke<T>(cmd, args), doTimeout, doAbort]);
    }
    return Promise.race([invoke<T>(cmd, args), doTimeout]);
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
