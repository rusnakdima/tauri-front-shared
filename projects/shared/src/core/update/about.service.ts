import {
  UpdateService,
  type UpdateInfo,
  type DownloadProgress,
} from "./update.service";

interface GitHubRelease {
  tag_name: string;
  name: string;
  published_at: string;
  body: string;
  assets: Array<{
    name: string;
    browser_download_url: string;
    size: number;
  }>;
}

/**
 * Reusable about/check-update pattern for apps that distribute via GitHub Releases.
 * Fetches release info from GitHub API and uses UpdateService for download/install.
 */
export class AboutService {
  appName: string;
  owner: string;
  repo: string;

  private updateService: UpdateService;

  constructor(appName: string, owner: string, repo: string) {
    this.appName = appName;
    this.owner = owner;
    this.repo = repo;
    this.updateService = new UpdateService();
  }

  /**
   * Check for updates by fetching the latest GitHub release.
   * Returns UpdateInfo if a newer version is available, null otherwise.
   */
  async checkUpdate(): Promise<UpdateInfo | null> {
    try {
      const response = await fetch(
        `https://api.github.com/repos/${this.owner}/${this.repo}/releases/latest`,
      );
      if (!response.ok) {
        return null;
      }

      const release: GitHubRelease = await response.json();
      const latestVersion = release.tag_name.startsWith("v")
        ? release.tag_name.slice(1)
        : release.tag_name;

      const currentVersion = await this.updateService.getCurrentVersion();

      // Compare versions - simple semver comparison
      if (this.isNewerVersion(latestVersion, currentVersion)) {
        // Find the primary asset (first non-source asset)
        const asset = release.assets.find(
          (a) => !a.name.endsWith(".tar.gz") && !a.name.endsWith(".zip"),
        );
        const downloadUrl =
          asset?.browser_download_url ??
          `https://github.com/${this.owner}/${this.repo}/releases/download/${release.tag_name}/${asset?.name ?? ""}`;
        const assetSize = asset?.size ?? 0;

        return {
          current_version: currentVersion,
          latest_version: latestVersion,
          download_url: downloadUrl,
          asset_name: asset?.name ?? "",
          asset_size: assetSize,
          release_notes: release.body ?? undefined,
        };
      }

      return null;
    } catch {
      return null;
    }
  }

  /**
   * Download and install the latest update.
   * Requires checkUpdate() to have been called first to populate cached info.
   */
  async downloadAndInstall(
    onProgress?: (p: DownloadProgress) => void,
  ): Promise<void> {
    const info = await this.checkUpdate();
    if (!info) {
      throw new Error("No update available");
    }

    const path = await this.updateService.downloadUpdate(info, onProgress);
    await this.updateService.installUpdate(path);
  }

  private isNewerVersion(latest: string, current: string): boolean {
    const latestParts = latest.split(".").map(Number);
    const currentParts = current.split(".").map(Number);

    for (
      let i = 0;
      i < Math.max(latestParts.length, currentParts.length);
      i++
    ) {
      const l = latestParts[i] ?? 0;
      const c = currentParts[i] ?? 0;
      if (l > c) return true;
      if (l < c) return false;
    }
    return false;
  }
}
