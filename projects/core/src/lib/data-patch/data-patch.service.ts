import { Injectable, signal } from "@angular/core";
import { StorageService } from "@tauri-front/storage";

@Injectable({ providedIn: "root" })
export class DataPatchService {
  private storage = signal<StorageService | null>(null);

  init(storage: StorageService): void {
    this.storage.set(storage);
  }

  private getStorage(): StorageService {
    const s = this.storage();
    if (!s) throw new Error("DataPatchService not initialized");
    return s;
  }

  private getCollection<T>(collection: string): T[] {
    const data = this.getStorage().get<T[]>(collection);
    return data || [];
  }

  private saveCollection<T>(collection: string, data: T[]): void {
    this.getStorage().set(collection, data);
  }

  create<T extends { id: string }>(
    collection: string,
    item: T,
  ): void {
    const data = this.getCollection<T>(collection);
    const timestamp = Date.now();
    const entity = {
      ...item,
      created_at: timestamp,
      updated_at: timestamp,
    } as T;
    data.push(entity);
    this.saveCollection(collection, data);
  }

  find<T>(collection: string, id: string): T | null {
    const data = this.getCollection<T>(collection);
    return data.find((item: unknown) => (item as { id: string }).id === id) || null;
  }

  findAll<T>(collection: string): T[] {
    return this.getCollection<T>(collection);
  }

  findWhere<T>(
    collection: string,
    predicate: (item: T) => boolean,
  ): T[] {
    return this.getCollection<T>(collection).filter(predicate);
  }

  update<T extends { id: string }>(
    collection: string,
    id: string,
    changes: Partial<T>,
  ): void {
    const data = this.getCollection<T>(collection);
    const index = data.findIndex((item: unknown) => (item as { id: string }).id === id);
    if (index === -1) return;

    const updated = {
      ...data[index],
      ...changes,
      updated_at: Date.now(),
    } as T;
    data[index] = updated;
    this.saveCollection(collection, data);
  }

  delete(collection: string, id: string): void {
    const data = this.getCollection<{ id: string }>(collection);
    const filtered = data.filter((item: unknown) => (item as { id: string }).id !== id);
    this.saveCollection(collection, filtered);
  }

  batchUpdate<T extends { id: string }>(
    collection: string,
    updates: Array<{ id: string; changes: Partial<T> }>,
  ): void {
    const data = this.getCollection<T>(collection);
    const now = Date.now();
    for (const { id, changes } of updates) {
      const index = data.findIndex((item: unknown) => (item as { id: string }).id === id);
      if (index !== -1) {
        data[index] = {
          ...data[index],
          ...changes,
          updated_at: now,
        } as T;
      }
    }
    this.saveCollection(collection, data);
  }

  batchDelete<T extends { id: string }>(
    collection: string,
    ids: string[],
  ): void {
    const data = this.getCollection<T>(collection);
    const filtered = data.filter((item: unknown) => !ids.includes((item as { id: string }).id));
    this.saveCollection(collection, filtered);
  }

  count(collection: string): number {
    return this.getCollection(collection).length;
  }

  exists(collection: string, id: string): boolean {
    return this.getCollection<{ id: string }>(collection).some((item: unknown) => (item as { id: string }).id === id);
  }

  clearCollection(collection: string): void {
    this.saveCollection(collection, []);
  }
}
