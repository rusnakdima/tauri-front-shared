export type ResponseStatus = "success" | "info" | "warning" | "error" | "created" | "updated" | "deleted" | "validationError" | "notFound" | "unauthorized" | "forbidden";
export interface Response<T = unknown> {
    status: ResponseStatus;
    message: string;
    data: T;
}
export declare class TauriApiService {
    invoke<T>(cmd: string, args?: Record<string, unknown>): Promise<T>;
    invokeRaw(cmd: string, args?: Record<string, unknown>): Promise<unknown>;
}
