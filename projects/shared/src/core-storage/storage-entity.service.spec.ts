import { describe, it, expect, beforeEach } from "vitest";
import { StorageEntityService } from "./storage-entity.service";

describe("StorageEntityService", () => {
  let service: StorageEntityService;

  beforeEach(() => {
    service = new StorageEntityService();
  });

  describe("setEntities / getEntity", () => {
    it("should store and retrieve entities by id", () => {
      service.setEntities("todos", [
        { id: "1", title: "One" },
        { id: "2", title: "Two" },
      ]);
      expect(service.getEntity("todos", "1")).toEqual({
        id: "1",
        title: "One",
      });
      expect(service.getEntity("todos", "2")).toEqual({
        id: "2",
        title: "Two",
      });
    });

    it("should return undefined for missing entity", () => {
      expect(service.getEntity("todos", "missing")).toBeUndefined();
    });
  });

  describe("upsertEntity", () => {
    it("should upsert a new entity", () => {
      service.upsertEntity("todos", { id: "1", title: "New" });
      expect(service.getEntity("todos", "1")).toEqual({
        id: "1",
        title: "New",
      });
    });

    it("should update existing entity", () => {
      service.setEntities("todos", [{ id: "1", title: "Old", done: false }]);
      service.upsertEntity("todos", { id: "1", title: "Updated" });
      expect(service.getEntity("todos", "1")).toEqual({
        id: "1",
        title: "Updated",
      });
    });
  });

  describe("upsertBulk", () => {
    it("should upsert multiple entities", () => {
      service.setEntities("todos", [{ id: "1", title: "One" }]);
      service.upsertBulk("todos", [
        { id: "2", title: "Two" },
        { id: "3", title: "Three" },
      ]);
      expect(service.getAll("todos")).toHaveLength(3);
    });

    it("should update existing via upsertBulk", () => {
      service.setEntities("todos", [{ id: "1", title: "Old" }]);
      service.upsertBulk("todos", [{ id: "1", title: "Updated" }]);
      expect(service.getEntity("todos", "1")).toEqual({
        id: "1",
        title: "Updated",
      });
    });
  });

  describe("upsertEntityBulk (static helper)", () => {
    it("should merge two arrays, updating existing", () => {
      const existing = [
        { id: "1", title: "One", extra: "keep" },
        { id: "2", title: "Two" },
      ];
      const incoming = [
        { id: "1", title: "Updated" },
        { id: "3", title: "Three" },
      ];
      const result = service.upsertEntityBulk(existing, incoming);
      expect(result).toHaveLength(3);
      const updated = result.find((e) => e.id === "1");
      expect(updated!.title).toBe("Updated");
      expect((updated as unknown as { extra: string }).extra).toBe("keep"); // preserved
    });

    it("should not overwrite existing when updateExisting=false", () => {
      const existing = [{ id: "1", title: "One" }];
      const incoming = [{ id: "1", title: "Two" }];
      const result = service.upsertEntityBulk(existing, incoming, false);
      expect(result[0].title).toBe("One"); // kept original
    });
  });

  describe("deleteEntity", () => {
    it("should remove entity", () => {
      service.setEntities("todos", [{ id: "1", title: "One" }]);
      service.deleteEntity("todos", "1");
      expect(service.getEntity("todos", "1")).toBeUndefined();
    });
  });

  describe("clearEntity", () => {
    it("should clear all of one entity type", () => {
      service.setEntities("todos", [{ id: "1" }]);
      service.setEntities("tasks", [{ id: "2" }]);
      service.clearEntity("todos");
      expect(service.getAll("todos")).toHaveLength(0);
      expect(service.getAll("tasks")).toHaveLength(1);
    });
  });

  describe("clearAll", () => {
    it("should clear everything", () => {
      service.setEntities("todos", [{ id: "1" }]);
      service.setEntities("tasks", [{ id: "2" }]);
      service.clearAll();
      expect(service.getAll("todos")).toHaveLength(0);
      expect(service.getAll("tasks")).toHaveLength(0);
    });
  });

  describe("getSignal", () => {
    it("should return reactive signal", () => {
      service.setEntities("todos", [{ id: "1", title: "One" }]);
      const sig = service.getSignal("todos");
      expect(sig!()).toEqual([{ id: "1", title: "One" }]);
    });
  });
});
