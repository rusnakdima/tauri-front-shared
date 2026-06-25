export type ToastType = "error" | "warning" | "info" | "success";

export class ErrorHandlerService {
  handleError(
    error: Error | { message: string; status?: number },
    context?: string,
  ): void {
    const message = error instanceof Error ? error.message : error.message;
    const fullMessage = context ? `[${context}] ${message}` : message;
    console.error(`Error: ${fullMessage}`, error);
    this.showToast(fullMessage, "error");
  }

  showToast(message: string, type: ToastType = "error"): void {
    console.warn(`[${type.toUpperCase()}] ${message}`);
  }
}
