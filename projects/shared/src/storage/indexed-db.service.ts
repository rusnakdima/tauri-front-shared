import { Injectable } from "@angular/core";
import { StorageService } from "./storage.service";

@Injectable({ providedIn: "root" })
export class IndexedDbService implements StorageService {
  private readonly dbName: string;
  private readonly storeName: string;
  private dbPromise: Promise<IDBDatabase> | null = null;

  constructor() {
    this.dbName = "tauri-app-db";
    this.storeName = "key-value-store";
    this.initDb();
  }

  private initDb(): void {
    if (typeof indexedDB === "undefined") return;

    this.dbPromise = new Promise<IDBDatabase>((resolve, reject) => {
      const request = indexedDB.open(this.dbName, 1);

      request.onerror = () => {
        console.error("IndexedDB error:", request.error);
        reject(request.error);
      };

      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(this.storeName)) {
          db.createObjectStore(this.storeName, { keyPath: "key" });
        }
      };

      request.onsuccess = () => {
        resolve(request.result);
      };
    });
  }

  private async getDb(): Promise<IDBDatabase | null> {
    if (typeof indexedDB === "undefined") return null;
    if (!this.dbPromise) return null;
    try {
      return await this.dbPromise;
    } catch {
      return null;
    }
  }

  private async getStore(): Promise<IDBObjectStore | null> {
    const db = await this.getDb();
    if (!db) return null;
    const transaction = db.transaction(this.storeName, "readwrite");
    return transaction.objectStore(this.storeName);
  }

  async get<T>(key: string): Promise<T | null> {
    if (typeof indexedDB === "undefined") return null;

    const store = await this.getStore();
    if (!store) return null;

    return new Promise<T | null>((resolve) => {
      const request = store.get(key);
      request.onsuccess = () => {
        resolve(request.result?.value ?? null);
      };
      request.onerror = () => {
        resolve(null);
      };
    });
  }

  async set<T>(key: string, value: T): Promise<void> {
    if (typeof indexedDB === "undefined") return;

    const store = await this.getStore();
    if (!store) return;

    store.put({ key, value });
  }

  async remove(key: string): Promise<void> {
    if (typeof indexedDB === "undefined") return;

    const store = await this.getStore();
    if (!store) return;

    store.delete(key);
  }

  async clear(): Promise<void> {
    if (typeof indexedDB === "undefined") return;

    const store = await this.getStore();
    if (!store) return;

    store.clear();
  }

  keys(): string[] {
    return [];
  }

  async keysAsync(): Promise<string[]> {
    if (typeof indexedDB === "undefined") return [];

    const store = await this.getStore();
    if (!store) return [];

    return new Promise<string[]>((resolve) => {
      const request = store.getAllKeys();
      request.onsuccess = () => {
        resolve(request.result as string[]);
      };
      request.onerror = () => {
        resolve([]);
      };
    });
  }
}
