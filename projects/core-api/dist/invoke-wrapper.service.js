import { invoke } from "@tauri-apps/api/core";
export class InvokeWrapperService {
  async invoke(cmd, args) {
    return invoke(cmd, args);
  }
  async invokeWithRetry(cmd, args, options = {}) {
    const { retries = 3, delayMs = 1000, timeoutMs = 30000 } = options;
    let lastError;
    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        return await this.invokeWithTimeout(cmd, args, timeoutMs);
      } catch (error) {
        lastError = error;
        if (attempt < retries) {
          await this.delay(delayMs * Math.pow(2, attempt));
        }
      }
    }
    throw lastError;
  }
  async invokeWithTimeout(cmd, args, timeoutMs) {
    return Promise.race([
      this.invoke(cmd, args),
      new Promise((_, reject) =>
        setTimeout(
          () =>
            reject(new Error(`Invoke ${cmd} timed out after ${timeoutMs}ms`)),
          timeoutMs,
        ),
      ),
    ]);
  }
  delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
