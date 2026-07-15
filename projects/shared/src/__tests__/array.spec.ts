import { describe, it, expect } from "vitest";
import {
  findById,
  findByIdOrThrow,
  upsertEntity,
  deduplicateById,
  groupByField,
} from "../utils/array";

describe("array utils", () => {
  const items = [
    { id: "1", name: "Alice" },
    { id: "2", name: "Bob" },
    { id: "3", name: "Charlie" },
  ];

  describe("findById", () => {
    it("returns the item when found", () => {
      expect(findById(items, "2")).toEqual({ id: "2", name: "Bob" });
    });

    it("returns undefined when not found", () => {
      expect(findById(items, "99")).toBeUndefined();
    });

    it("returns first match when duplicate ids exist", () => {
      const dupes = [
        { id: "1", name: "First" },
        { id: "1", name: "Second" },
      ];
      expect(findById(dupes, "1")).toEqual({ id: "1", name: "First" });
    });
  });

  describe("findByIdOrThrow", () => {
    it("returns the item when found", () => {
      expect(findByIdOrThrow(items, "2")).toEqual({
        id: "2",
        name: "Bob",
      });
    });

    it("throws when item not found", () => {
      expect(() => findByIdOrThrow(items, "99")).toThrow("Item 99 not found");
    });
  });

  describe("upsertEntity", () => {
    it("inserts a new entity when id does not exist", () => {
      const newEntity = { id: "4", name: "David" };
      const result = upsertEntity(items, newEntity);
      expect(result).toHaveLength(4);
      expect(result[3]).toEqual(newEntity);
    });

    it("updates an existing entity when id matches", () => {
      const updated = { id: "2", name: "Bobby" };
      const result = upsertEntity(items, updated);
      expect(result).toHaveLength(3);
      expect(result[1]).toEqual(updated);
      expect(result[1].name).toBe("Bobby");
    });

    it("does not mutate original array", () => {
      const original = [...items];
      upsertEntity(items, { id: "4", name: "David" });
      expect(items).toEqual(original);
    });
  });

  describe("deduplicateById", () => {
    it("removes duplicates by id, keeping first occurrence", () => {
      const dupes = [
        { id: "1", name: "First" },
        { id: "2", name: "One" },
        { id: "1", name: "Second" },
        { id: "3", name: "Three" },
        { id: "2", name: "Two" },
      ];
      const result = deduplicateById(dupes);
      expect(result).toHaveLength(3);
      expect(result[0].id).toBe("1");
      expect(result[1].id).toBe("2");
      expect(result[2].id).toBe("3");
    });

    it("returns same array when no duplicates", () => {
      const result = deduplicateById(items);
      expect(result).toHaveLength(3);
    });

    it("does not mutate original array", () => {
      const original = [...items];
      deduplicateById(items);
      expect(items).toEqual(original);
    });
  });

  describe("groupByField", () => {
    it("groups items by string field", () => {
      const users = [
        { name: "Alice", role: "admin" },
        { name: "Bob", role: "user" },
        { name: "Charlie", role: "admin" },
      ];
      const result = groupByField(users, "role");
      expect(result["admin"]).toHaveLength(2);
      expect(result["user"]).toHaveLength(1);
    });

    it("groups items by number field", () => {
      const items = [
        { label: "a", priority: 1 },
        { label: "b", priority: 2 },
        { label: "c", priority: 1 },
      ];
      const result = groupByField(items, "priority");
      expect(result["1"]).toHaveLength(2);
      expect(result["2"]).toHaveLength(1);
    });

    it("returns empty object for empty array", () => {
      const result = groupByField([], "id");
      expect(result).toEqual({});
    });

    it("converts non-string keys to strings", () => {
      const items = [
        { label: "x", priority: 1 },
        { label: "y", priority: 2 },
      ];
      const result = groupByField(items, "priority");
      expect(result["1"]).toBeDefined();
      expect(result["2"]).toBeDefined();
    });
  });
});
