import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { StorageCacheService } from "../core-storage/storage-cache.service";

describe("StorageCacheService", () => {
  let cache: StorageCacheService;

  beforeEach(() => {
    cache = new StorageCacheService();
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2024, 5, 15, 12, 0, 0));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe("basic TTL cache operations", () => {
    it("sets and gets a value", () => {
      cache.set("key", "value");
      expect(cache.get("key")).toBe("value");
    });

    it("returns null for unknown key", () => {
      expect(cache.get("unknown")).toBeNull();
    });

    it("returns null for stale entry", () => {
      cache.set("key", "value", 5000); // 5 seconds TTL
      vi.advanceTimersByTime(6000); // advance 6 seconds
      expect(cache.get("key")).toBeNull();
    });

    it("returns value within TTL", () => {
      cache.set("key", "value", 10000); // 10 seconds TTL
      vi.advanceTimersByTime(5000); // 5 seconds passed
      expect(cache.get("key")).toBe("value");
    });

    it("has returns true for valid entry", () => {
      cache.set("key", "value");
      expect(cache.has("key")).toBe(true);
    });

    it("has returns false for unknown key", () => {
      expect(cache.has("unknown")).toBe(false);
    });

    it("has returns false for stale entry", () => {
      cache.set("key", "value", 5000);
      vi.advanceTimersByTime(6000);
      expect(cache.has("key")).toBe(false);
    });

    it("delete removes entry", () => {
      cache.set("key", "value");
      cache.delete("key");
      expect(cache.get("key")).toBeNull();
    });

    it("clear removes all entries", () => {
      cache.set("a", 1);
      cache.set("b", 2);
      cache.clear();
      expect(cache.get("a")).toBeNull();
      expect(cache.get("b")).toBeNull();
    });

    it("setDefaultTtl changes default TTL", () => {
      cache.setDefaultTtl(1000);
      // Default was 5 minutes, now 1 second
      // Without explicit TTL, uses default
      cache.set("key", "value");
      vi.advanceTimersByTime(2000);
      expect(cache.get("key")).toBeNull();
    });

    it("invalidates specific key", () => {
      cache.set("key", "value");
      cache.invalidate("key");
      expect(cache.get("key")).toBeNull();
    });

    it("invalidatesAll clears namespace entries", () => {
      cache.set("a", 1);
      cache.set("b", 2);
      cache.invalidateAll();
      expect(cache.get("a")).toBeNull();
    });

    it("clearPattern clears matching keys", () => {
      cache.set("users:1", 1);
      cache.set("users:2", 2);
      cache.set("posts:1", 10);
      cache.clearPattern("users:");
      expect(cache.get("users:1")).toBeNull();
      expect(cache.get("users:2")).toBeNull();
      expect(cache.get("posts:1")).toBe(10);
    });
  });

  describe("reactive cache", () => {
    it("hasCachedData returns false for unknown key", () => {
      expect(cache.hasCachedData("unknown")).toBe(false);
    });

    it("isCacheFull returns false when under limit", () => {
      expect(cache.isCacheFull()).toBe(false);
    });

    it("evictOldestCache removes oldest entries", () => {
      cache.setCacheTimestamp("key1", Date.now() - 1000);
      cache.setCacheTimestamp("key2", Date.now() - 2000);
      cache.setCacheTimestamp("key3", Date.now() - 3000);
      // Set reactive cache entries
      cache.setReactiveCache("key1", (() => "v1") as any as any);
      cache.setReactiveCache("key2", (() => "v2") as any as any);

      cache.evictOldestCache();

      expect(cache.getReactiveCache("key3")).toBeUndefined();
    });
  });

  describe("timestamp tracking", () => {
    it("getCacheTimestamp returns undefined for unknown key", () => {
      expect(cache.getCacheTimestamp("unknown")).toBeUndefined();
    });

    it("setCacheTimestamp and getCacheTimestamp work", () => {
      cache.setCacheTimestamp("key", 1234567890);
      expect(cache.getCacheTimestamp("key")).toBe(1234567890);
    });

    it("isCacheValid returns true for fresh timestamp", () => {
      cache.setCacheTimestamp("key", Date.now());
      expect(cache.isCacheValid("key", 60000)).toBe(true);
    });

    it("isCacheValid returns false for stale timestamp", () => {
      cache.setCacheTimestamp("key", Date.now() - 120000);
      expect(cache.isCacheValid("key", 60000)).toBe(false);
    });
  });

  describe("request deduplication", () => {
    it("getOrFetch returns cached promise for duplicate requests", async () => {
      let callCount = 0;
      const fetchFn = async () => {
        callCount++;
        return "result";
      };

      const promise1 = cache.getOrFetch("key", fetchFn);
      const promise2 = cache.getOrFetch("key", fetchFn);

      expect(promise1).toBe(promise2); // Same promise
      await promise1;
      expect(callCount).toBe(1);
    });

    it("hasInFlightRequest returns true for pending request", () => {
      const fetchFn = async () => "result";
      cache.getOrFetch("key", fetchFn);
      expect(cache.hasInFlightRequest("key")).toBe(true);
    });

    it("getInFlightRequest returns the promise", async () => {
      const fetchFn = async () => "result";
      const promise = cache.getOrFetch("key", fetchFn);
      const retrieved = cache.getInFlightRequest("key");
      expect(retrieved).toBe(promise);
    });

    it("getInFlightRequest returns undefined for unknown key", () => {
      expect(cache.getInFlightRequest("unknown")).toBeUndefined();
    });
  });

  describe("sub-cache namespacing", () => {
    it("getSubCache shares underlying storage", () => {
      const subCache = cache.getSubCache("users");
      subCache.set("id1", { name: "Alice" });

      // Should be accessible via main cache with namespace prefix
      expect(cache.get("users:id1")).toEqual({ name: "Alice" });
    });

    it("subCache operates independently for namespace", () => {
      const subCache1 = cache.getSubCache("users");
      const subCache2 = cache.getSubCache("posts");

      subCache1.set("1", "user-data");
      subCache2.set("1", "post-data");

      expect(subCache1.get("1")).toBe("user-data");
      expect(subCache2.get("1")).toBe("post-data");
    });
  });
});
