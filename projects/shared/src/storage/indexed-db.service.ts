import { Injectable } from "@angular/core";
import { StorageService } from "./storage.service";

@Injectable({ providedIn: "root" })
export class IndexedDbService implements StorageService {
  private readonly dbName: string;
  private readonly storeName: string;
  private db: IDBDatabase | null = null;

  constructor() {
    this.dbName = "tauri-app-db";
    this.storeName = "key-value-store";
    this.initDb();
  }

  private initDb(): void {
    if (typeof indexedDB === "undefined") return;

    const request = indexedDB.open(this.dbName, 1);

    request.onerror = () => {
      console.error("IndexedDB error:", request.error);
    };

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(this.storeName)) {
        db.createObjectStore(this.storeName, { keyPath: "key" });
      }
    };

    this.db = request.result;
  }

  private getStore(): IDBObjectStore | null {
    if (!this.db) return null;
    const transaction = this.db.transaction(this.storeName, "readwrite");
    return transaction.objectStore(this.storeName);
  }

  get<T>(key: string): T | null {
    if (typeof indexedDB === "undefined") return null;

    const store = this.getStore();
    if (!store) return null;

    const request = store.get(key);
    return new Promise<T | null>((resolve) => {
      request.onsuccess = () => {
        resolve(request.result?.value ?? null);
      };
      request.onerror = () => {
        resolve(null);
      };
    }) as unknown as T;
  }

  set<T>(key: string, value: T): void {
    if (typeof indexedDB === "undefined") return;

    const store = this.getStore();
    if (!store) return;

    store.put({ key, value });
  }

  remove(key: string): void {
    if (typeof indexedDB === "undefined") return;

    const store = this.getStore();
    if (!store) return;

    store.delete(key);
  }

  clear(): void {
    if (typeof indexedDB === "undefined") return;

    const store = this.getStore();
    if (!store) return;

    store.clear();
  }

  keys(): string[] {
    return [];
  }

  async keysAsync(): Promise<string[]> {
    if (typeof indexedDB === "undefined") return [];

    const store = this.getStore();
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
