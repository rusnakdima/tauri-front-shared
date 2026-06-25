import { invoke } from "@tauri-apps/api/core";

export interface RetryOptions {
  retries?: number;
  delayMs?: number;
  timeoutMs?: number;
}

export class InvokeWrapperService {
  async invoke<T>(cmd: string, args?: Record<string, unknown>): Promise<T> {
    return invoke<T>(cmd, args);
  }

  async invokeWithRetry<T>(
    cmd: string,
    args?: Record<string, unknown>,
    options: RetryOptions = {},
  ): Promise<T> {
    const { retries = 3, delayMs = 1000, timeoutMs = 30000 } = options;
    let lastError: Error;

    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        return await this.invokeWithTimeout<T>(cmd, args, timeoutMs);
      } catch (error) {
        lastError = error as Error;
        if (attempt < retries) {
          await this.delay(delayMs * Math.pow(2, attempt));
        }
      }
    }
    throw lastError!;
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

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
