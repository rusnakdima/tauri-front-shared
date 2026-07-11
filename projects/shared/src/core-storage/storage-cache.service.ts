import { Injectable, signal, Signal } from "@angular/core";

export interface CacheEntry<T> {
  value: T;
  timestamp: number;
  ttl?: number;
}

const DEFAULT_CACHE_TTL_MS = 5 * 60 * 1000;
const MAX_CACHE_SIZE = 100;

@Injectable({ providedIn: "root" })
export class StorageCacheService {
  private cache: Map<string, CacheEntry<unknown>> = new Map();
  private reactiveCache = new Map<string, Signal<unknown>>();
  private cacheTimestamps = new Map<string, number>();
  private inFlightRequests = new Map<string, Promise<unknown>>();
  private defaultTtl = DEFAULT_CACHE_TTL_MS;
  readonly cacheInvalidated = signal(false);

  // ─── Basic TTL cache ────────────────────────────────────────────────

  get<T>(key: string): T | null {
    const entry = this.cache.get(key) as CacheEntry<T> | undefined;
    if (!entry) return null;
    if (entry.ttl && Date.now() - entry.timestamp > entry.ttl) {
      this.cache.delete(key);
      return null;
    }
    return entry.value;
  }

  set<T>(key: string, value: T, ttl?: number): void {
    this.cache.set(key, {
      value,
      timestamp: Date.now(),
      ttl: ttl ?? this.defaultTtl,
    });
  }

  setDefaultTtl(ttl: number): void {
    this.defaultTtl = ttl;
  }

  invalidate(key: string): void {
    this.cache.delete(key);
  }

  invalidateAll(): void {
    this.cache.clear();
  }

  has(key: string): boolean {
    const entry = this.cache.get(key);
    if (!entry) return false;
    if (entry.ttl && Date.now() - entry.timestamp > entry.ttl) {
      this.cache.delete(key);
      return false;
    }
    return true;
  }

  delete(key: string): void {
    this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  clearPattern(pattern: string): void {
    const regex = new RegExp(pattern);
    for (const key of this.cache.keys()) {
      if (regex.test(key)) {
        this.cache.delete(key);
      }
    }
  }

  // ─── Reactive cache ──────────────────────────────────────────────────

  hasCachedData(key: string): boolean {
    return this.reactiveCache.has(key);
  }

  getReactiveCache<T>(key: string): Signal<T> | undefined {
    return this.reactiveCache.get(key) as Signal<T> | undefined;
  }

  setReactiveCache<T>(key: string, value: Signal<T>): void {
    this.reactiveCache.set(key, value);
  }

  // ─── Timestamp tracking ─────────────────────────────────────────────

  getCacheTimestamp(key: string): number | undefined {
    return this.cacheTimestamps.get(key);
  }

  setCacheTimestamp(key: string, timestamp: number): void {
    this.cacheTimestamps.set(key, timestamp);
  }

  isCacheValid(key: string, ttlMs: number = DEFAULT_CACHE_TTL_MS): boolean {
    const timestamp = this.cacheTimestamps.get(key);
    if (!timestamp) return false;
    return Date.now() - timestamp < ttlMs;
  }

  // ─── Cache size management ──────────────────────────────────────────

  isCacheFull(): boolean {
    return this.reactiveCache.size >= MAX_CACHE_SIZE;
  }

  evictOldestCache(): void {
    const sortedKeys = Array.from(this.cacheTimestamps.entries())
      .sort((a, b) => a[1] - b[1])
      .slice(0, 10)
      .map(([key]) => key);
    for (const key of sortedKeys) {
      this.reactiveCache.delete(key);
      this.cacheTimestamps.delete(key);
    }
  }

  // ─── Invalidation ───────────────────────────────────────────────────

  invalidateCache(): void {
    this.reactiveCache.clear();
    this.cacheTimestamps.clear();
    this.cacheInvalidated.set(true);
    setTimeout(() => this.cacheInvalidated.set(false), 0);
  }

  clearAll(): void {
    this.reactiveCache.clear();
    this.cacheTimestamps.clear();
    this.cacheInvalidated.set(true);
    setTimeout(() => this.cacheInvalidated.set(false), 0);
  }

  // ─── Request deduplication ──────────────────────────────────────────

  getOrFetch<T>(
    key: string,
    fetchFn: () => Promise<T>,
    ttl = DEFAULT_CACHE_TTL_MS,
  ): Promise<T> {
    const existing = this.inFlightRequests.get(key);
    if (existing) return existing as Promise<T>;
    const requestPromise = (async () => {
      try {
        const result = await fetchFn();
        this.setCacheTimestamp(key, Date.now());
        return result;
      } finally {
        this.inFlightRequests.delete(key);
      }
    })();
    this.inFlightRequests.set(key, requestPromise);
    return requestPromise;
  }

  hasInFlightRequest(key: string): boolean {
    return this.inFlightRequests.has(key);
  }

  getInFlightRequest<T>(key: string): Promise<T> | undefined {
    return this.inFlightRequests.get(key) as Promise<T> | undefined;
  }
}
