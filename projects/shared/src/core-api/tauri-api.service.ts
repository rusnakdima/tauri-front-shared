import { invoke } from "@tauri-apps/api/core";
import { Response, ResponseStatus } from "./tauri/response";

export type { Response, ResponseStatus };

export class TauriApiService {
  async invoke<T>(cmd: string, args?: Record<string, unknown>): Promise<T> {
    const response = await invoke<Response<T>>(cmd, args);
    if (
      response.status === ResponseStatus.Success ||
      response.status === ResponseStatus.Created ||
      response.status === ResponseStatus.Updated ||
      response.status === ResponseStatus.Deleted
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