import { SignalStore } from "./signal-store";
import { StorageCacheService } from "./storage-cache.service";
import { StorageQueryService, type QueryFilter } from "./storage-query.service";

export class UnifiedStorageService {
  private signalStore: SignalStore;
  private cache: StorageCacheService;
  private query: StorageQueryService;

  constructor() {
    this.signalStore = new SignalStore();
    this.cache = new StorageCacheService();
    this.query = new StorageQueryService();
  }

  async get<T>(key: string): Promise<T | null> {
    const cached = this.cache.get<T>(key);
    if (cached !== null) return cached;

    const value = this.signalStore.get(key) as T | null;
    if (value !== null) {
      this.cache.set(key, value);
    }
    return value;
  }

  async set<T>(key: string, value: T): Promise<void> {
    this.signalStore.set(key, value);
    this.cache.set(key, value);
  }

  async find<T>(filter: QueryFilter[]): Promise<T[]> {
    const all = this.signalStore
      .keys()
      .map((k) => this.signalStore.get(k) as T);
    return this.query.query(all, filter);
  }

  async remove(key: string): Promise<void> {
    this.signalStore.delete(key);
    this.cache.invalidate(key);
  }
}
