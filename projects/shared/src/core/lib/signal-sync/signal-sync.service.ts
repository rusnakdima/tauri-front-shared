import { Injectable, signal, computed } from "@angular/core";
import { HttpClient } from "@angular/common/http";

export type SyncStatus = "idle" | "syncing" | "error" | "offline";

@Injectable({ providedIn: "root" })
export class SignalSyncService {
  constructor(private http: HttpClient) {}

  private _syncStatus = signal<SyncStatus>("idle");
  private _lastSyncTime = signal<Date | null>(null);
  private _pendingChanges = signal<number>(0);
  private _syncEndpoint = signal<string>("");

  syncStatus = computed(() => this._syncStatus());
  lastSyncTime = computed(() => this._lastSyncTime());
  pendingChanges = computed(() => this._pendingChanges());
  syncEndpoint = computed(() => this._syncEndpoint());

  setEndpoint(endpoint: string): void {
    this._syncEndpoint.set(endpoint);
  }

  setStatus(status: SyncStatus): void {
    this._syncStatus.set(status);
  }

  incrementPending(): void {
    this._pendingChanges.update((n) => n + 1);
  }

  decrementPending(): void {
    this._pendingChanges.update((n) => Math.max(0, n - 1));
  }

  markSynced(): void {
    this._lastSyncTime.set(new Date());
    this._pendingChanges.set(0);
    this._syncStatus.set("idle");
  }

  markError(): void {
    this._syncStatus.set("error");
  }

  markOffline(): void {
    this._syncStatus.set("offline");
  }

  async syncToCloud(): Promise<void> {
    if (this._syncStatus() === "syncing") return;
    if (!this._syncEndpoint()) {
      this.markOffline();
      return;
    }

    this._syncStatus.set("syncing");
    try {
      const state = this._pendingChanges();
      if (state > 0) {
        await this.performSync();
      }
      this.markSynced();
    } catch (error) {
      this.markError();
      throw error;
    }
  }

  private async performSync(): Promise<void> {
    const endpoint = this._syncEndpoint();
    if (!endpoint) return;

    try {
      await this.http
        .post(`${endpoint}/sync`, {
          timestamp: new Date().toISOString(),
        })
        .toPromise();
    } catch (error) {
      console.error("Sync failed:", error);
      throw error;
    }
  }
}
