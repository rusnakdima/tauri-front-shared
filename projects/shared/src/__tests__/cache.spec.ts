import { describe, it, expect, beforeEach, vi } from "vitest";
import { evictLRU, evictLRUInPlace, isStale } from "../utils/cache";

describe("cache utils", () => {
  describe("evictLRU", () => {
    it("returns same cache when size is at or below max", () => {
      const cache = new Map<string, { lastAccessed: number }>([
        ["a", { lastAccessed: 1 }],
        ["b", { lastAccessed: 2 }],
      ]);
      const result = evictLRU(cache, 2);
      expect(result.size).toBe(2);
    });

    it("evicts least recently accessed entries", () => {
      const cache = new Map<string, { lastAccessed: number }>([
        ["a", { lastAccessed: 1 }],
        ["b", { lastAccessed: 2 }],
        ["c", { lastAccessed: 3 }],
      ]);
      const result = evictLRU(cache, 2);
      expect(result.size).toBe(2);
      expect(result.has("a")).toBe(false);
      expect(result.has("b")).toBe(true);
      expect(result.has("c")).toBe(true);
    });

    it("evicts correct number of entries", () => {
      const cache = new Map<string, { lastAccessed: number }>([
        ["a", { lastAccessed: 1 }],
        ["b", { lastAccessed: 2 }],
        ["c", { lastAccessed: 3 }],
        ["d", { lastAccessed: 4 }],
        ["e", { lastAccessed: 5 }],
      ]);
      const result = evictLRU(cache, 2);
      expect(result.size).toBe(2);
      expect(result.has("a")).toBe(false);
      expect(result.has("b")).toBe(false);
    });

    it("does not mutate original map", () => {
      const cache = new Map<string, { lastAccessed: number }>([
        ["a", { lastAccessed: 1 }],
        ["b", { lastAccessed: 2 }],
      ]);
      evictLRU(cache, 1);
      expect(cache.size).toBe(2);
    });
  });

  describe("evictLRUInPlace", () => {
    it("does nothing when size is at or below max", () => {
      const map = new Map<string, { lastAccessed: number }>([
        ["a", { lastAccessed: 1 }],
        ["b", { lastAccessed: 2 }],
      ]);
      evictLRUInPlace(map, 2);
      expect(map.size).toBe(2);
    });

    it("evicts least recently accessed entries in place", () => {
      const map = new Map<string, { lastAccessed: number }>([
        ["a", { lastAccessed: 1 }],
        ["b", { lastAccessed: 2 }],
        ["c", { lastAccessed: 3 }],
      ]);
      evictLRUInPlace(map, 2);
      expect(map.size).toBe(2);
      expect(map.has("a")).toBe(false);
    });
  });

  describe("isStale", () => {
    it("returns false for fresh entry (just now)", () => {
      const timestamp = Date.now();
      expect(isStale(timestamp, 60000)).toBe(false);
    });

    it("returns false for entry within TTL", () => {
      const timestamp = Date.now() - 30000; // 30 seconds ago
      expect(isStale(timestamp, 60000)).toBe(false);
    });

    it("returns true for stale entry (beyond TTL)", () => {
      const timestamp = Date.now() - 120000; // 2 minutes ago
      expect(isStale(timestamp, 60000)).toBe(true);
    });

    it("returns true for very old entry", () => {
      const timestamp = Date.now() - 3600000; // 1 hour ago
      expect(isStale(timestamp, 60000)).toBe(true);
    });

    it("handles zero TTL as immediately stale", () => {
      const timestamp = Date.now() - 1; // 1ms in the past
      // With TTL 0, stale if Date.now() - timestamp > 0
      expect(isStale(timestamp, 0)).toBe(true);
    });
  });
});
