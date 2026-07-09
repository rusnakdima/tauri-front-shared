export interface RetryOptions {
  retries?: number;
  delayMs?: number;
  timeoutMs?: number;
}
export declare class InvokeWrapperService {
  invoke<T>(cmd: string, args?: Record<string, unknown>): Promise<T>;
  invokeWithRetry<T>(
    cmd: string,
    args?: Record<string, unknown>,
    options?: RetryOptions,
  ): Promise<T>;
  private invokeWithTimeout;
  private delay;
}
