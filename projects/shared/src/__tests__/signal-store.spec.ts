import { describe, it, expect, beforeEach } from "vitest";
import { SignalStore, createSignalStore } from "../utils/legacy/signal-store";

describe("SignalStore", () => {
  let store: SignalStore;

  beforeEach(() => {
    store = new SignalStore();
  });

  describe("set and get", () => {
    it("sets and gets a value", () => {
      store.set("key", "value");
      expect(store.get("key")).toBe("value");
    });

    it("returns undefined for unknown key", () => {
      expect(store.get("unknown")).toBeUndefined();
    });

    it("overwrites existing value", () => {
      store.set("key", "first");
      store.set("key", "second");
      expect(store.get("key")).toBe("second");
    });

    it("handles different value types", () => {
      store.set("string", "text");
      store.set("number", 42);
      store.set("object", { nested: true });
      store.set("array", [1, 2, 3]);

      expect(store.get("string")).toBe("text");
      expect(store.get("number")).toBe(42);
      expect(store.get("object")).toEqual({ nested: true });
      expect(store.get("array")).toEqual([1, 2, 3]);
    });
  });

  describe("update", () => {
    it("updates value using function", () => {
      store.set("count", 0);
      store.update("count", (prev) => (prev as number) + 1);
      expect(store.get("count")).toBe(1);
    });

    it("passes current value to update function", () => {
      store.set("text", "hello");
      store.update("text", (prev) => (prev as string) + " world");
      expect(store.get("text")).toBe("hello world");
    });
  });

  describe("delete", () => {
    it("removes a key", () => {
      store.set("key", "value");
      store.delete("key");
      expect(store.get("key")).toBeUndefined();
    });

    it("deleting non-existent key does not error", () => {
      expect(() => store.delete("unknown")).not.toThrow();
    });
  });

  describe("keys", () => {
    it("returns all keys", () => {
      store.set("a", 1);
      store.set("b", 2);
      store.set("c", 3);
      expect(store.keys()).toEqual(["a", "b", "c"]);
    });

    it("returns empty array for empty store", () => {
      expect(store.keys()).toEqual([]);
    });
  });

  describe("toJSON and fromJSON", () => {
    it("exports all entries as JSON object", () => {
      store.set("a", 1);
      store.set("b", 2);
      const json = store.toJSON();
      expect(json).toEqual({ a: 1, b: 2 });
    });

    it("imports entries from JSON object", () => {
      store.fromJSON({ x: 10, y: 20 });
      expect(store.get("x")).toBe(10);
      expect(store.get("y")).toBe(20);
    });

    it("fromJSON clears existing entries first", () => {
      store.set("existing", true);
      store.fromJSON({ new: "data" });
      expect(store.keys()).toEqual(["new"]);
    });
  });

  describe("subscribe", () => {
    it("notifies subscriber on set", () => {
      const calls: Array<[string, unknown]> = [];
      store.subscribe((key, value) => calls.push([key, value]));

      store.set("key", "value");

      expect(calls).toEqual([["key", "value"]]);
    });

    it("notifies subscriber on update", () => {
      const calls: Array<[string, unknown]> = [];
      store.subscribe((key, value) => calls.push([key, value]));
      store.set("key", "original");

      calls.length = 0;
      store.update("key", () => "updated");

      expect(calls).toEqual([["key", "updated"]]);
    });

    it("notifies subscriber on delete", () => {
      const calls: Array<[string, unknown]> = [];
      store.subscribe((key, value) => calls.push([key, value]));
      store.set("key", "value");

      calls.length = 0;
      store.delete("key");

      expect(calls).toEqual([["key", undefined]]);
    });

    it("returns unsubscribe function", () => {
      let callCount = 0;
      const unsubscribe = store.subscribe(() => callCount++);

      store.set("a", 1);
      unsubscribe();
      store.set("b", 2);

      expect(callCount).toBe(1);
    });

    it("notifies all subscribers", () => {
      const calls1: string[] = [];
      const calls2: string[] = [];
      store.subscribe((key) => calls1.push(key));
      store.subscribe((key) => calls2.push(key));

      store.set("x", 1);

      expect(calls1).toEqual(["x"]);
      expect(calls2).toEqual(["x"]);
    });
  });

  describe("signal", () => {
    it("creates a signal for a key", () => {
      const sig = store.signal("count", 0);

      expect(sig()).toBe(0);

      sig.set(5);
      expect(sig()).toBe(5);

      sig.update((n) => (n as number) + 1);
      expect(sig()).toBe(6);
    });

    it("uses initial value for new key", () => {
      const sig = store.signal("newKey", "default");
      expect(sig()).toBe("default");
    });

    it("keeps existing value for existing key", () => {
      store.set("existing", "persisted");
      const sig = store.signal("existing", "default");
      expect(sig()).toBe("persisted");
    });

    it("set updates both signal and store", () => {
      const sig = store.signal("key", 0);
      sig.set(100);
      expect(store.get("key")).toBe(100);
    });

    it("update updates both signal and store", () => {
      const sig = store.signal("key", 10);
      sig.update((n) => (n as number) * 2);
      expect(store.get("key")).toBe(20);
    });
  });

  describe("createSignalStore", () => {
    it("creates a new SignalStore instance", () => {
      const store = createSignalStore();
      store.set("test", "value");
      expect(store.get("test")).toBe("value");
    });
  });
});
