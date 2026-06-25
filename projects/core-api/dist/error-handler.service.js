export class ErrorHandlerService {
    handleError(error, context) {
        const message = error instanceof Error ? error.message : error.message;
        const fullMessage = context ? `[${context}] ${message}` : message;
        console.error(`Error: ${fullMessage}`, error);
        this.showToast(fullMessage, "error");
    }
    showToast(message, type = "error") {
        console.warn(`[${type.toUpperCase()}] ${message}`);
    }
}
