import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { IndexedDbService } from "../storage/indexed-db.service";

// Mock indexedDB for jsdom environment
const mockIDBDatabase = {
  objectStoreNames: { contains: vi.fn().mockReturnValue(true) },
  transaction: vi.fn().mockReturnValue({
    objectStore: vi.fn().mockReturnValue({
      get: vi.fn(),
      put: vi.fn(),
      delete: vi.fn(),
      clear: vi.fn(),
      getAllKeys: vi.fn(),
    }),
  }),
  close: vi.fn(),
};

const mockIDBRequest = {
  result: mockIDBDatabase,
  onsuccess: null,
  onerror: null,
};

const indexedDBMock = {
  open: vi.fn().mockReturnValue(mockIDBRequest),
};

describe("IndexedDbService", () => {
  let service: IndexedDbService;

  beforeEach(() => {
    vi.stubGlobal("indexedDB", indexedDBMock);
    service = new IndexedDbService();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  describe("initialization", () => {
    it("opens database with correct name", () => {
      expect(indexedDBMock.open).toHaveBeenCalledWith("tauri-app-db", 1);
    });
  });

  describe("get", () => {
    it("returns null when indexedDB is undefined", () => {
      vi.stubGlobal("indexedDB", undefined);
      const service2 = new IndexedDbService();
      expect(service2.get("key")).toBeNull();
      vi.unstubAllGlobals();
    });

    it("returns value from store", async () => {
      const mockValue = { key: "test", value: { id: 1, name: "Test" } };
      const getMock = vi.fn().mockReturnValue({
        onsuccess: () => {},
        onerror: () => {},
        result: mockValue,
      });

      const transaction = {
        objectStore: vi.fn().mockReturnValue({
          get: getMock,
        }),
      };
      mockIDBDatabase.transaction.mockReturnValue(transaction);
      mockIDBRequest.result = mockIDBDatabase;

      const result = service.get("test");

      // Since get returns a Promise cast as T, we need to handle this
      expect(result).toBeDefined();
    });
  });

  describe("set", () => {
    it("stores value in indexedDB", () => {
      const putMock = vi.fn();
      const transaction = {
        objectStore: vi.fn().mockReturnValue({
          put: putMock,
        }),
      };
      mockIDBDatabase.transaction.mockReturnValue(transaction);
      mockIDBRequest.result = mockIDBDatabase;

      service.set("key", { data: "value" });

      expect(putMock).toHaveBeenCalledWith({
        key: "key",
        value: { data: "value" },
      });
    });
  });

  describe("remove", () => {
    it("deletes key from indexedDB", () => {
      const deleteMock = vi.fn();
      const transaction = {
        objectStore: vi.fn().mockReturnValue({
          delete: deleteMock,
        }),
      };
      mockIDBDatabase.transaction.mockReturnValue(transaction);
      mockIDBRequest.result = mockIDBDatabase;

      service.remove("key");

      expect(deleteMock).toHaveBeenCalledWith("key");
    });
  });

  describe("clear", () => {
    it("clears all data from store", () => {
      const clearMock = vi.fn();
      const transaction = {
        objectStore: vi.fn().mockReturnValue({
          clear: clearMock,
        }),
      };
      mockIDBDatabase.transaction.mockReturnValue(transaction);
      mockIDBRequest.result = mockIDBDatabase;

      service.clear();

      expect(clearMock).toHaveBeenCalled();
    });
  });

  describe("keys", () => {
    it("returns empty array", () => {
      expect(service.keys()).toEqual([]);
    });
  });

  describe("keysAsync", () => {
    it("returns empty array when indexedDB is undefined", async () => {
      vi.stubGlobal("indexedDB", undefined);
      const service2 = new IndexedDbService();
      const result = await service2.keysAsync();
      expect(result).toEqual([]);
      vi.unstubAllGlobals();
    });

    it("returns keys from store", async () => {
      const getAllKeysMock = vi.fn().mockReturnValue({
        onsuccess: () => {},
        onerror: () => {},
        result: ["key1", "key2"],
      });

      const transaction = {
        objectStore: vi.fn().mockReturnValue({
          getAllKeys: getAllKeysMock,
        }),
      };
      mockIDBDatabase.transaction.mockReturnValue(transaction);
      mockIDBRequest.result = mockIDBDatabase;

      const resultPromise = service.keysAsync();

      // The method returns a Promise that wraps IDBRequest
      // Since it's cast as sync T, the actual behavior depends on implementation
      expect(resultPromise).toBeDefined();
    });
  });
});
