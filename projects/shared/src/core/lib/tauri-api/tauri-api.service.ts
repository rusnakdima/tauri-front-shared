import { Injectable } from "@angular/core";
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

@Injectable({ providedIn: "root" })
export class TauriApiService {
  async invoke<T>(command: string, args?: Record<string, unknown>): Promise<T> {
    const response = await invoke<Response>(command, args);
    if (
      response.status === "success" ||
      response.status === "created" ||
      response.status === "updated" ||
      response.status === "deleted"
    ) {
      return response.data as T;
    }
    throw new Error(response.message || `Operation failed: ${command}`);
  }
}
