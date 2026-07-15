import { describe, it, expect, vi, beforeEach } from "vitest";
import { ResponseStatus } from "../core-api/tauri/response";
import type { RetryOptions, CrudFilter } from "../core-api/api-crud.service";

describe("ApiCrudService types and interfaces", () => {
  // Type-level tests to verify the service contract

  describe("RetryOptions", () => {
    it("accepts valid retry options", () => {
      const options: RetryOptions = {
        maxAttempts: 3,
        initialDelayMs: 1000,
        maxDelayMs: 30000,
      };
      expect(options.maxAttempts).toBe(3);
    });

    it("accepts custom retry options", () => {
      const options: RetryOptions = {
        maxAttempts: 5,
        initialDelayMs: 500,
        maxDelayMs: 60000,
      };
      expect(options.initialDelayMs).toBe(500);
    });
  });

  describe("CrudFilter", () => {
    it("accepts 'eq' operator", () => {
      const filter: CrudFilter = { field: "name", op: "eq", value: "test" };
      expect(filter.op).toBe("eq");
    });

    it("accepts 'ne' operator", () => {
      const filter: CrudFilter = { field: "id", op: "ne", value: "123" };
      expect(filter.op).toBe("ne");
    });

    it("accepts 'gt' operator", () => {
      const filter: CrudFilter = { field: "age", op: "gt", value: 18 };
      expect(filter.op).toBe("gt");
    });

    it("accepts 'contains' operator", () => {
      const filter: CrudFilter = {
        field: "name",
        op: "contains",
        value: "search",
      };
      expect(filter.op).toBe("contains");
    });

    it("accepts 'in' operator with array value", () => {
      const filter: CrudFilter = {
        field: "status",
        op: "in",
        value: ["active", "pending"],
      };
      expect(filter.op).toBe("in");
    });
  });

  describe("ResponseStatus values", () => {
    it("has all expected CRUD status values", () => {
      expect(ResponseStatus.Created).toBe("created");
      expect(ResponseStatus.Updated).toBe("updated");
      expect(ResponseStatus.Deleted).toBe("deleted");
      expect(ResponseStatus.Success).toBe("success");
      expect(ResponseStatus.Error).toBe("error");
    });
  });
});
