import { invoke } from "@tauri-apps/api/core";
export class TauriApiService {
    async invoke(cmd, args) {
        const response = await invoke(cmd, args);
        if (response.status === "success" ||
            response.status === "created" ||
            response.status === "updated" ||
            response.status === "deleted") {
            return response.data;
        }
        throw new Error(response.message || `Operation failed: ${cmd}`);
    }
    async invokeRaw(cmd, args) {
        return invoke(cmd, args);
    }
}
