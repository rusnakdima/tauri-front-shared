import { SignalStore } from "./signal-store";
import { StorageCacheService } from "./storage-cache.service";
import { StorageQueryService } from "./storage-query.service";
export class UnifiedStorageService {
    constructor() {
        this.signalStore = new SignalStore();
        this.cache = new StorageCacheService();
        this.query = new StorageQueryService();
    }
    async get(key) {
        const cached = this.cache.get(key);
        if (cached !== null)
            return cached;
        const value = this.signalStore.get(key);
        if (value !== null) {
            this.cache.set(key, value);
        }
        return value;
    }
    async set(key, value) {
        this.signalStore.set(key, value);
        this.cache.set(key, value);
    }
    async find(filter) {
        const all = this.signalStore
            .keys()
            .map((k) => this.signalStore.get(k));
        return this.query.query(all, filter);
    }
    async remove(key) {
        this.signalStore.delete(key);
        this.cache.invalidate(key);
    }
}
//# sourceMappingURL=unified-storage.service.js.map