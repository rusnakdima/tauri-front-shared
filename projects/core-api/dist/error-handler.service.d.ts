export type ToastType = "error" | "warning" | "info" | "success";
export declare class ErrorHandlerService {
    handleError(error: Error | {
        message: string;
        status?: number;
    }, context?: string): void;
    showToast(message: string, type?: ToastType): void;
}
