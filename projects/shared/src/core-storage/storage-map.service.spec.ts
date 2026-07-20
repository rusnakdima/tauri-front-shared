import { describe, it, expect, beforeEach, vi } from "vitest";
import { StorageMapService } from "./storage-map.service";

describe("StorageMapService", () => {
  let service: StorageMapService;

  beforeEach(() => {
    service = new StorageMapService();
  });

  describe("get/set", () => {
    it("should store and retrieve data", () => {
      service.set("todos", "default", [{ id: "1", title: "Test" }]);
      expect(service.get("todos", "default")).toEqual([
        { id: "1", title: "Test" },
      ]);
    });

    it("should return undefined for missing data", () => {
      expect(service.get("missing", "default")).toBeUndefined();
    });

    it("should overwrite existing data for same key", () => {
      service.set("todos", "default", [{ id: "1" }]);
      service.set("todos", "default", [{ id: "2" }]);
      expect(service.get("todos", "default")).toEqual([{ id: "2" }]);
    });
  });

  describe("TTL", () => {
    it("should be valid immediately after set", () => {
      service.set("todos", "default", [{ id: "1" }]);
      expect(service.isValid("todos", "default")).toBe(true);
    });

    it("should be invalid after TTL expires", () => {
      service.set("todos", "default", [{ id: "1" }]);
      const k = "todos::default";
      (
        service as unknown as { timestamps: Map<string, number> }
      ).timestamps.set(k, Date.now() - 10 * 60 * 1000);
      expect(service.isValid("todos", "default")).toBe(false);
    });

    it("should be invalid for unknown key", () => {
      expect(service.isValid("missing", "default")).toBe(false);
    });
  });

  describe("invalidate", () => {
    it("should invalidate single groupKey", () => {
      service.set("todos", "default", [{ id: "1" }]);
      service.set("todos", "other", [{ id: "2" }]);
      service.invalidate("todos", "default");
      expect(service.get("todos", "default")).toBeUndefined();
      expect(service.get("todos", "other")).toEqual([{ id: "2" }]);
    });

    it("should invalidate all of entity when groupKey omitted", () => {
      service.set("todos", "default", [{ id: "1" }]);
      service.set("todos", "other", [{ id: "2" }]);
      service.invalidate("todos");
      expect(service.get("todos", "default")).toBeUndefined();
      expect(service.get("todos", "other")).toBeUndefined();
    });

    it("should invalidateAll clears everything", () => {
      service.set("todos", "default", [{ id: "1" }]);
      service.set("tasks", "default", [{ id: "2" }]);
      service.invalidateAll();
      expect(service.get("todos", "default")).toBeUndefined();
      expect(service.get("tasks", "default")).toBeUndefined();
    });
  });

  describe("getOrFetch", () => {
    it("should return cached data without calling fetchFn", async () => {
      service.set("todos", "default", [{ id: "1" }]);
      const fetchFn = vi.fn().mockResolvedValue([{ id: "2" }]);
      const result = await service.getOrFetch("todos", "default", fetchFn);
      expect(result).toEqual([{ id: "1" }]);
      expect(fetchFn).not.toHaveBeenCalled();
    });

    it("should call fetchFn and cache result on cache miss", async () => {
      const fetchFn = vi.fn().mockResolvedValue([{ id: "1" }]);
      const result = await service.getOrFetch("todos", "default", fetchFn);
      expect(result).toEqual([{ id: "1" }]);
      expect(fetchFn).toHaveBeenCalledTimes(1);
      // Now cached
      const result2 = await service.getOrFetch("todos", "default", fetchFn);
      expect(result2).toEqual([{ id: "1" }]);
      expect(fetchFn).toHaveBeenCalledTimes(1); // still 1, not called again
    });

    it("should deduplicate concurrent requests", async () => {
      let resolve!: (val: unknown[]) => void;
      const fetchFn = vi
        .fn()
        .mockImplementation(() => new Promise((r) => (resolve = r)));
      const [r1, r2] = [
        service.getOrFetch("todos", "default", fetchFn),
        service.getOrFetch("todos", "default", fetchFn),
      ];
      resolve([{ id: "1" }]);
      const [res1, res2] = await Promise.all([r1, r2]);
      expect(res1).toEqual([{ id: "1" }]);
      expect(res2).toEqual([{ id: "1" }]);
      expect(fetchFn).toHaveBeenCalledTimes(1); // deduplicated
    });
  });

  describe("query", () => {
    beforeEach(() => {
      service.set("tasks", "default", [
        { id: "1", priority: 1, status: "open", title: "Alpha" },
        { id: "2", priority: 2, status: "done", title: "Beta" },
        { id: "3", priority: 1, status: "open", title: "Gamma" },
      ]);
    });

    it("should filter by eq", () => {
      const result = service.query("tasks", "default", [
        { field: "status", op: "eq", value: "open" },
      ]);
      expect(result).toHaveLength(2);
    });

    it("should filter by gt", () => {
      const result = service.query("tasks", "default", [
        { field: "priority", op: "gt", value: 1 },
      ]);
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe("2");
    });

    it("should filter by contains", () => {
      const result = service.query("tasks", "default", [
        { field: "title", op: "contains", value: "lt" },
      ]);
      expect(result).toHaveLength(2);
    });

    it("should filter by in", () => {
      const result = service.query("tasks", "default", [
        { field: "id", op: "in", value: ["1", "3"] },
      ]);
      expect(result).toHaveLength(2);
    });

    it("should filter by multiple conditions (AND)", () => {
      const result = service.query("tasks", "default", [
        { field: "status", op: "eq", value: "open" },
        { field: "priority", op: "eq", value: 1 },
      ]);
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe("1");
    });
  });

  describe("sortBy", () => {
    beforeEach(() => {
      service.set("items", "default", [
        { id: "1", value: 30 },
        { id: "2", value: 10 },
        { id: "3", value: 20 },
      ]);
    });

    it("should sort asc", () => {
      const result = service.sortBy("items", "default", "value", "asc");
      expect(result[0].id).toBe("2");
      expect(result[1].id).toBe("3");
      expect(result[2].id).toBe("1");
    });

    it("should sort desc", () => {
      const result = service.sortBy("items", "default", "value", "desc");
      expect(result[0].id).toBe("1");
      expect(result[1].id).toBe("3");
      expect(result[2].id).toBe("2");
    });
  });

  describe("watch", () => {
    it("should return reactive signal for entity/group", () => {
      service.set("todos", "default", [{ id: "1" }]);
      const sig = service.watch("todos", "default");
      expect(sig()).toEqual([{ id: "1" }]);
      // Signal updates when data changes
      service.set("todos", "default", [{ id: "2" }]);
      expect(sig()).toEqual([{ id: "2" }]);
    });

    it("should create signal with empty array if not cached", () => {
      const sig = service.watch("missing", "default");
      expect(sig()).toEqual([]);
    });
  });
});
