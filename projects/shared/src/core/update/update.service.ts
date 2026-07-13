import { invoke } from "@tauri-apps/api/core";

export interface UpdateInfo {
  current_version: string;
  latest_version: string;
  download_url: string;
  asset_name: string;
  asset_size: number;
  release_notes?: string;
}

export interface DownloadProgress {
  bytes_downloaded: number;
  total_bytes: number;
  progress_pct: number;
}

/**
 * Update service for checking, downloading, and installing app updates via Tauri backend.
 */
export class UpdateService {
  /**
   * Check for available updates.
   * Returns UpdateInfo if an update is available, null otherwise.
   */
  async checkForUpdates(): Promise<UpdateInfo | null> {
    try {
      const result = await invoke<UpdateInfo | null>("check_for_update");
      return result;
    } catch {
      return null;
    }
  }

  /**
   * Download an update with optional progress callback.
   * Returns the path to the downloaded installer.
   */
  async downloadUpdate(
    info: UpdateInfo,
    onProgress?: (p: DownloadProgress) => void,
  ): Promise<string> {
    if (onProgress) {
      // Subscribe to download progress events if the backend supports them
      await invoke<() => void>("subscribe_download_progress", {});
      // The Rust backend should emit progress events that the frontend listens to
      // For now, we invoke the download command which may stream progress
      const path = await invoke<string>("download_update", {
        url: info.download_url,
        assetName: info.asset_name,
      });
      return path;
    }
    return invoke<string>("download_update", {
      url: info.download_url,
      assetName: info.asset_name,
    });
  }

  /**
   * Install the update from the given installer path.
   */
  async installUpdate(path: string): Promise<void> {
    await invoke("install_update", { installerPath: path });
  }

  /**
   * Get the current app version.
   */
  async getCurrentVersion(): Promise<string> {
    return invoke<string>("get_current_version");
  }
}
