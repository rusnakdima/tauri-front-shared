import { Injectable, signal, Signal } from "@angular/core";

export interface CacheEntry<T> {
  value: T;
  timestamp: number;
  ttl?: number;
}

const DEFAULT_CACHE_TTL_MS = 5 * 60 * 1000;
const MAX_CACHE_SIZE = 100;

/** Internal Maps container — allows sub-caches to share storage */
interface SharedMaps {
  cache: Map<string, CacheEntry<unknown>>;
  reactiveCache: Map<string, Signal<unknown>>;
  cacheTimestamps: Map<string, number>;
  inFlightRequests: Map<string, Promise<unknown>>;
}

@Injectable({ providedIn: "root" })
export class StorageCacheService {
  private shared: SharedMaps;
  private namespace: string;
  private defaultTtl = DEFAULT_CACHE_TTL_MS;
  readonly cacheInvalidated = signal(false);

  constructor() {
    this.shared = {
      cache: new Map(),
      reactiveCache: new Map(),
      cacheTimestamps: new Map(),
      inFlightRequests: new Map(),
    };
    this.namespace = "";
  }

  private ns(key: string): string {
    return this.namespace ? `${this.namespace}:${key}` : key;
  }

  // ─── Basic TTL cache ────────────────────────────────────────────────

  get<T>(key: string): T | null {
    const k = this.ns(key);
    const entry = this.shared.cache.get(k) as CacheEntry<T> | undefined;
    if (!entry) return null;
    if (entry.ttl && Date.now() - entry.timestamp > entry.ttl) {
      this.shared.cache.delete(k);
      return null;
    }
    return entry.value;
  }

  set<T>(key: string, value: T, ttl?: number): void {
    const k = this.ns(key);
    this.shared.cache.set(k, {
      value,
      timestamp: Date.now(),
      ttl: ttl ?? this.defaultTtl,
    });
  }

  setDefaultTtl(ttl: number): void {
    this.defaultTtl = ttl;
  }

  invalidate(key: string): void {
    this.shared.cache.delete(this.ns(key));
  }

  invalidateAll(): void {
    if (this.namespace) {
      const prefix = `${this.namespace}:`;
      for (const key of this.shared.cache.keys()) {
        if (key.startsWith(prefix)) this.shared.cache.delete(key);
      }
    } else {
      this.shared.cache.clear();
    }
  }

  has(key: string): boolean {
    const k = this.ns(key);
    const entry = this.shared.cache.get(k);
    if (!entry) return false;
    if (entry.ttl && Date.now() - entry.timestamp > entry.ttl) {
      this.shared.cache.delete(k);
      return false;
    }
    return true;
  }

  delete(key: string): void {
    this.shared.cache.delete(this.ns(key));
  }

  clear(): void {
    if (this.namespace) {
      const prefix = `${this.namespace}:`;
      for (const key of this.shared.cache.keys()) {
        if (key.startsWith(prefix)) this.shared.cache.delete(key);
      }
    } else {
      this.shared.cache.clear();
    }
  }

  clearPattern(pattern: string): void {
    const nsPrefix = this.namespace ? `^${this.namespace}:` : "";
    const regex = new RegExp(nsPrefix + pattern);
    for (const key of this.shared.cache.keys()) {
      if (regex.test(key)) {
        this.shared.cache.delete(key);
      }
    }
  }

  // ─── Reactive cache ──────────────────────────────────────────────────

  hasCachedData(key: string): boolean {
    return this.shared.reactiveCache.has(this.ns(key));
  }

  getReactiveCache<T>(key: string): Signal<T> | undefined {
    return this.shared.reactiveCache.get(this.ns(key)) as Signal<T> | undefined;
  }

  setReactiveCache<T>(key: string, value: Signal<T>): void {
    this.shared.reactiveCache.set(this.ns(key), value);
  }

  // ─── Timestamp tracking ─────────────────────────────────────────────

  getCacheTimestamp(key: string): number | undefined {
    return this.shared.cacheTimestamps.get(this.ns(key));
  }

  setCacheTimestamp(key: string, timestamp: number): void {
    this.shared.cacheTimestamps.set(this.ns(key), timestamp);
  }

  isCacheValid(key: string, ttlMs: number = DEFAULT_CACHE_TTL_MS): boolean {
    const timestamp = this.shared.cacheTimestamps.get(this.ns(key));
    if (!timestamp) return false;
    return Date.now() - timestamp < ttlMs;
  }

  // ─── Cache size management ──────────────────────────────────────────

  isCacheFull(): boolean {
    return this.shared.reactiveCache.size >= MAX_CACHE_SIZE;
  }

  evictOldestCache(): void {
    const entries = Array.from(this.shared.cacheTimestamps.entries());
    const nsPrefix = this.namespace ? `${this.namespace}:` : "";
    const filtered = nsPrefix
      ? entries.filter(([key]) => key.startsWith(nsPrefix))
      : entries;
    const sortedKeys = filtered
      .sort((a, b) => a[1] - b[1])
      .slice(0, 10)
      .map(([key]) => key);
    for (const key of sortedKeys) {
      this.shared.reactiveCache.delete(key);
      this.shared.cacheTimestamps.delete(key);
    }
  }

  // ─── Invalidation ───────────────────────────────────────────────────

  invalidateCache(): void {
    if (this.namespace) {
      const prefix = `${this.namespace}:`;
      for (const key of this.shared.reactiveCache.keys()) {
        if (key.startsWith(prefix)) this.shared.reactiveCache.delete(key);
      }
      for (const key of this.shared.cacheTimestamps.keys()) {
        if (key.startsWith(prefix)) this.shared.cacheTimestamps.delete(key);
      }
    } else {
      this.shared.reactiveCache.clear();
      this.shared.cacheTimestamps.clear();
    }
    this.cacheInvalidated.set(true);
    setTimeout(() => this.cacheInvalidated.set(false), 0);
  }

  clearAll(): void {
    if (this.namespace) {
      const prefix = `${this.namespace}:`;
      for (const key of this.shared.reactiveCache.keys()) {
        if (key.startsWith(prefix)) this.shared.reactiveCache.delete(key);
      }
      for (const key of this.shared.cacheTimestamps.keys()) {
        if (key.startsWith(prefix)) this.shared.cacheTimestamps.delete(key);
      }
    } else {
      this.shared.reactiveCache.clear();
      this.shared.cacheTimestamps.clear();
    }
    this.cacheInvalidated.set(true);
    setTimeout(() => this.cacheInvalidated.set(false), 0);
  }

  // ─── Request deduplication ───────────────────────────────────────────

  getOrFetch<T>(key: string, fetchFn: () => Promise<T>): Promise<T> {
    const k = this.ns(key);
    const existing = this.shared.inFlightRequests.get(k);
    if (existing) return existing as Promise<T>;
    const requestPromise = (async () => {
      try {
        const result = await fetchFn();
        this.setCacheTimestamp(key, Date.now());
        return result;
      } finally {
        this.shared.inFlightRequests.delete(k);
      }
    })();
    this.shared.inFlightRequests.set(k, requestPromise);
    return requestPromise;
  }

  hasInFlightRequest(key: string): boolean {
    return this.shared.inFlightRequests.has(this.ns(key));
  }

  getInFlightRequest<T>(key: string): Promise<T> | undefined {
    return this.shared.inFlightRequests.get(this.ns(key)) as
      Promise<T> | undefined;
  }

  // ─── Sub-cache namespacing ───────────────────────────────────────────

  /**
   * Returns a sub-cache that shares the same underlying storage as this cache
   * but isolates keys under the given namespace.
   *
   * Usage:
   *   const tasksCache = cache.getSubCache('tasks');
   *   const chatsCache = cache.getSubCache('chats');
   *   tasksCache.set('todo:1', data);   // stored as 'tasks:todo:1'
   *   chatsCache.set('msg:1', data);    // stored as 'chats:msg:1'
   */
  getSubCache(name: string): StorageCacheService {
    const subNamespace = this.namespace ? `${this.namespace}:${name}` : name;
    const sub = new StorageCacheService();
    sub.shared = this.shared;
    sub.namespace = subNamespace;
    return sub;
  }
}
