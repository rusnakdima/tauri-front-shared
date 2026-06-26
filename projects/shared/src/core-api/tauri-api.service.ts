import { invoke } from "@tauri-apps/api/core";

export type ResponseStatus =
  | "success"
  | "info"
  | "warning"
  | "error"
  | "created"
  | "updated"
  | "deleted"
  | "validationError"
  | "notFound"
  | "unauthorized"
  | "forbidden";

export interface Response<T = unknown> {
  status: ResponseStatus;
  message: string;
  data: T;
}

export class TauriApiService {
  async invoke<T>(cmd: string, args?: Record<string, unknown>): Promise<T> {
    const response = await invoke<Response<T>>(cmd, args);
    if (
      response.status === "success" ||
      response.status === "created" ||
      response.status === "updated" ||
      response.status === "deleted"
    ) {
      return response.data as T;
    }
    throw new Error(response.message || `Operation failed: ${cmd}`);
  }

  async invokeRaw(
    cmd: string,
    args?: Record<string, unknown>,
  ): Promise<unknown> {
    return invoke(cmd, args);
  }
}
