import { Injectable, WritableSignal, signal } from "@angular/core";

const DEFAULT_CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes
const MAX_CACHE_SIZE = 100;
const EVICT_BATCH_SIZE = 10;

export interface QueryFilter {
  field: string;
  op: "eq" | "ne" | "gt" | "gte" | "lt" | "lte" | "contains" | "in";
  value: unknown;
}

@Injectable({ providedIn: "root" })
export class StorageMapService {
  // Map<entityName, Map<groupKey, T[]>>
  private cache = new Map<string, Map<string, unknown[]>>();
  private timestamps = new Map<string, number>();
  // Use WritableSignal so we can call .set()
  private signals = new Map<string, WritableSignal<unknown[]>>();
  private inFlight = new Map<string, Promise<unknown[]>>();

  private cacheKey(entity: string, groupKey: string): string {
    return `${entity}::${groupKey}`;
  }

  /** Get cached data for entity+groupKey */
  get<T>(entity: string, groupKey: string): T[] | undefined {
    return this.cache.get(entity)?.get(groupKey) as T[] | undefined;
  }

  /** Set data for entity+groupKey */
  set<T>(entity: string, groupKey: string, data: T[]): void {
    if (!this.cache.has(entity)) this.cache.set(entity, new Map());
    this.cache.get(entity)!.set(groupKey, data);
    const k = this.cacheKey(entity, groupKey);
    this.timestamps.set(k, Date.now());
    const existing = this.signals.get(k);
    if (existing) {
      existing.set(data as unknown[]);
    }
  }

  /** Reactive signal for entity+groupKey. Auto-creates with empty array. */
  watch<T>(entity: string, groupKey: string): WritableSignal<T[]> {
    const k = this.cacheKey(entity, groupKey);
    if (!this.signals.has(k)) {
      const existing = this.get<T>(entity, groupKey) ?? ([] as T[]);
      this.signals.set(k, signal(existing) as WritableSignal<unknown[]>);
    }
    return this.signals.get(k) as WritableSignal<T[]>;
  }

  /** Check if cache entry is still valid */
  isValid(
    entity: string,
    groupKey: string,
    ttlMs = DEFAULT_CACHE_TTL_MS,
  ): boolean {
    const k = this.cacheKey(entity, groupKey);
    const ts = this.timestamps.get(k);
    if (!ts) return false;
    return Date.now() - ts < ttlMs;
  }

  /** Invalidate specific groupKey, or all of entity if groupKey omitted */
  invalidate(entity: string, groupKey?: string): void {
    if (groupKey !== undefined) {
      const k = this.cacheKey(entity, groupKey);
      this.cache.get(entity)?.delete(groupKey);
      this.timestamps.delete(k);
      this.signals.get(k)?.set([]);
    } else {
      for (const k of [...this.timestamps.keys()].filter((k) =>
        k.startsWith(entity + "::"),
      )) {
        this.timestamps.delete(k);
      }
      this.cache.delete(entity);
    }
  }

  /** Invalidate everything */
  invalidateAll(): void {
    this.cache.clear();
    this.timestamps.clear();
    this.inFlight.clear();
    for (const sig of this.signals.values()) sig.set([]);
  }

  /** LRU eviction — removes EVICT_BATCH_SIZE oldest when over MAX_CACHE_SIZE */
  private evictLRU(): void {
    let totalEntries = 0;
    for (const m of this.cache.values()) totalEntries += m.size;
    if (totalEntries < MAX_CACHE_SIZE) return;
    const sorted = [...this.timestamps.entries()].sort((a, b) => a[1] - b[1]);
    for (const [k] of sorted.slice(0, EVICT_BATCH_SIZE)) {
      const [ent, gk] = k.split("::");
      this.cache.get(ent)?.delete(gk);
      this.timestamps.delete(k);
      this.signals.get(k)?.set([]);
    }
  }

  /** Fetch with deduplication — prevents duplicate in-flight requests */
  getOrFetch<T>(
    entity: string,
    groupKey: string,
    fetchFn: () => Promise<T[]>,
  ): Promise<T[]> {
    const k = this.cacheKey(entity, groupKey);
    if (this.isValid(entity, groupKey)) {
      const cached = this.get<T>(entity, groupKey);
      if (cached) return Promise.resolve(cached);
    }
    if (this.inFlight.has(k)) return this.inFlight.get(k) as Promise<T[]>;
    const promise = fetchFn()
      .then((data) => {
        this.set(entity, groupKey, data);
        this.inFlight.delete(k);
        return data;
      })
      .catch((err) => {
        this.inFlight.delete(k);
        throw err;
      });
    this.inFlight.set(k, promise as Promise<unknown[]>);
    return promise;
  }

  /** Query cached data with filter conditions */
  query<T>(entity: string, groupKey: string, filter: QueryFilter[]): T[] {
    const data = this.get<T>(entity, groupKey) ?? [];
    return data.filter((item: unknown) => {
      return filter.every((f) => {
        const val = (item as Record<string, unknown>)[f.field];
        switch (f.op) {
          case "eq":
            return val === f.value;
          case "ne":
            return val !== f.value;
          case "gt":
            return (val as number) > (f.value as number);
          case "gte":
            return (val as number) >= (f.value as number);
          case "lt":
            return (val as number) < (f.value as number);
          case "lte":
            return (val as number) <= (f.value as number);
          case "contains":
            return String(val).includes(String(f.value));
          case "in":
            return (f.value as unknown[]).includes(val);
          default:
            return true;
        }
      });
    }) as T[];
  }

  /** Sort cached data by field */
  sortBy<T>(
    entity: string,
    groupKey: string,
    field: string,
    dir: "asc" | "desc" = "asc",
  ): T[] {
    const data = [...((this.get<T>(entity, groupKey) ?? []) as T[])];
    data.sort((a, b) => {
      const va = (a as Record<string, unknown>)[field] as string | number;
      const vb = (b as Record<string, unknown>)[field] as string | number;
      const cmp = va < vb ? -1 : va > vb ? 1 : 0;
      return dir === "asc" ? cmp : -cmp;
    });
    return data;
  }
}
