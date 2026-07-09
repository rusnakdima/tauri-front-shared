export class StorageCacheService {
    constructor() {
        this.cache = new Map();
    }
    get(key) {
        const entry = this.cache.get(key);
        if (!entry)
            return null;
        if (entry.ttl && Date.now() - entry.timestamp > entry.ttl) {
            this.cache.delete(key);
            return null;
        }
        return entry.value;
    }
    set(key, value, ttl) {
        this.cache.set(key, {
            value,
            timestamp: Date.now(),
            ttl,
        });
    }
    invalidate(key) {
        this.cache.delete(key);
    }
    invalidateAll() {
        this.cache.clear();
    }
    has(key) {
        const entry = this.cache.get(key);
        if (!entry)
            return false;
        if (entry.ttl && Date.now() - entry.timestamp > entry.ttl) {
            this.cache.delete(key);
            return false;
        }
        return true;
    }
}
//# sourceMappingURL=storage-cache.service.js.map