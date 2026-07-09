import { Injectable, signal, computed } from "@angular/core";
import { ToastService, ToastType } from "../toast/toast.service";
import {
  parseError,
  formatError,
  type AppError,
  ErrorType,
} from "../../../core-api/tauri/error";

export interface ErrorLogEntry {
  id: string;
  timestamp: Date;
  message: string;
  context?: string;
  error: AppError;
  dismissed: boolean;
}

export interface RetryConfig {
  maxAttempts: number;
  initialDelayMs: number;
  maxDelayMs: number;
}

const DEFAULT_RETRY_CONFIG: RetryConfig = {
  maxAttempts: 3,
  initialDelayMs: 1000,
  maxDelayMs: 30000,
};

const MAX_ERROR_LOG_ENTRIES = 100;

@Injectable({ providedIn: "root" })
export class ErrorHandlerService {
  private errorLogSignal = signal<ErrorLogEntry[]>([]);
  private onlineSignal = signal<boolean>(navigator.onLine);
  private retryCounter = 0;

  readonly errorLog = computed(() => this.errorLogSignal());
  readonly isOnline = computed(() => this.onlineSignal());
  readonly errorCount = computed(
    () => this.errorLogSignal().filter((e) => !e.dismissed).length,
  );

  constructor(private toastService: ToastService) {
    this.setupOnlineOfflineListeners();
  }

  private setupOnlineOfflineListeners(): void {
    window.addEventListener("online", () => this.onlineSignal.set(true));
    window.addEventListener("offline", () => this.onlineSignal.set(false));
  }

  handleError(error: unknown, context?: string): AppError {
    const appError = this.normalizeError(error);
    const message = formatError(appError);
    const fullMessage = context ? `[${context}] ${message}` : message;

    console.error(`Error${context ? ` [${context}]` : ""}: ${message}`, error);

    this.addToErrorLog(appError, fullMessage, context);
    this.showToast(fullMessage, "error");

    return appError;
  }

  normalizeError(error: unknown): AppError {
    if (this.isHttpError(error)) {
      return this.convertHttpError(error);
    }
    return parseError(error);
  }

  private isHttpError(
    error: unknown,
  ): error is { status?: number; message?: string; statusText?: string } {
    return (
      typeof error === "object" &&
      error !== null &&
      "status" in error &&
      typeof (error as { status?: number }).status === "number"
    );
  }

  private convertHttpError(httpError: {
    status?: number;
    message?: string;
    statusText?: string;
  }): AppError {
    const status = httpError.status ?? 0;
    const message = httpError.message || httpError.statusText || "HTTP error";

    switch (status) {
      case 400:
        return { type: ErrorType.ValidationError, message };
      case 401:
        return { type: ErrorType.Unauthorized, message };
      case 403:
        return { type: ErrorType.Forbidden, message };
      case 404:
        return { type: ErrorType.NotFound, message };
      case 409:
        return { type: ErrorType.Duplicate, message };
      case 500:
      case 502:
      case 503:
      case 504:
        return { type: ErrorType.Internal, message };
      default:
        if (status >= 500) {
          return { type: ErrorType.Internal, message };
        }
        if (status >= 400) {
          return { type: ErrorType.ValidationError, message };
        }
        return { type: ErrorType.Network, message };
    }
  }

  showToast(message: string, type: ToastType = "error"): void {
    this.toastService.show({ type, message });
  }

  private addToErrorLog(
    error: AppError,
    message: string,
    context?: string,
  ): void {
    const entry: ErrorLogEntry = {
      id: `error-${++this.retryCounter}-${Date.now()}`,
      timestamp: new Date(),
      message,
      context,
      error,
      dismissed: false,
    };

    this.errorLogSignal.update((log) => {
      const updated = [entry, ...log];
      return updated.slice(0, MAX_ERROR_LOG_ENTRIES);
    });
  }

  dismissError(id: string): void {
    this.errorLogSignal.update((log) =>
      log.map((entry) =>
        entry.id === id ? { ...entry, dismissed: true } : entry,
      ),
    );
  }

  clearErrorLog(): void {
    this.errorLogSignal.set([]);
  }

  getActiveErrors(): ErrorLogEntry[] {
    return this.errorLogSignal().filter((entry) => !entry.dismissed);
  }

  async retryWithBackoff<T>(
    fn: () => Promise<T>,
    config: Partial<RetryConfig> = {},
  ): Promise<T> {
    const { maxAttempts, initialDelayMs, maxDelayMs } = {
      ...DEFAULT_RETRY_CONFIG,
      ...config,
    };
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

  handleAndRetry<T>(
    fn: () => Promise<T>,
    context?: string,
    retryConfig?: Partial<RetryConfig>,
  ): Promise<T> {
    return this.retryWithBackoff(fn, retryConfig).catch((error) => {
      this.handleError(error, context);
      throw error;
    });
  }
}
