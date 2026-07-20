import { Injectable } from "@angular/core";
import { StorageService } from "./storage.service";

export type StorageValidator<T> = (value: unknown) => value is T;

@Injectable({ providedIn: "root" })
export class LocalStorageService implements StorageService {
  private prefix: string = "";

  /**
   * Configure a prefix for namespacing keys.
   * Call before using get/set/remove/has with prefixed keys.
   */
  setPrefix(prefix: string): void {
    this.prefix = prefix;
  }

  private makeKey(key: string): string {
    return `${this.prefix}${key}`;
  }

  async get<T>(
    key: string,
    defaultValue?: T,
    validator?: StorageValidator<T>,
  ): Promise<T | null> {
    const item = localStorage.getItem(this.makeKey(key));
    if (!item) return defaultValue ?? null;
    try {
      const parsed = JSON.parse(item);
      if (validator && validator(parsed)) {
        return parsed;
      }
      if (!validator) {
        return parsed as T;
      }
      return defaultValue ?? null;
    } catch {
      return defaultValue ?? null;
    }
  }

  async set<T>(key: string, value: T): Promise<void> {
    localStorage.setItem(this.makeKey(key), JSON.stringify(value));
  }

  async remove(key: string): Promise<void> {
    localStorage.removeItem(this.makeKey(key));
  }

  async clear(): Promise<void> {
    if (!this.prefix) {
      localStorage.clear();
    } else {
      const keysToRemove: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k?.startsWith(this.prefix)) {
          keysToRemove.push(k);
        }
      }
      keysToRemove.forEach((k) => localStorage.removeItem(k));
    }
  }

  keys(): string[] {
    if (!this.prefix) {
      return Object.keys(localStorage);
    }
    const result: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k?.startsWith(this.prefix)) {
        result.push(k.substring(this.prefix.length));
      }
    }
    return result;
  }

  has(key: string): boolean {
    return localStorage.getItem(this.makeKey(key)) !== null;
  }
}
