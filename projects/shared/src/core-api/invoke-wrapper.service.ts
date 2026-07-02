import { Injectable } from "@angular/core";
import { invoke } from "@tauri-apps/api/core";
import { invokeWithRetry, type RetryOptions } from "./retry.service";

export { type RetryOptions };

@Injectable({ providedIn: "root" })
export class InvokeWrapperService {
  async invoke<T>(cmd: string, args?: Record<string, unknown>): Promise<T> {
    return invoke<T>(cmd, args);
  }

  async invokeWithRetry<T>(
    cmd: string,
    args?: Record<string, unknown>,
    options: RetryOptions = { maxAttempts: 3, initialDelayMs: 1000, maxDelayMs: 30000 },
  ): Promise<T> {
    return invokeWithRetry(
      () => this.invokeWithTimeout<T>(cmd, args, options.maxDelayMs),
      options,
    );
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