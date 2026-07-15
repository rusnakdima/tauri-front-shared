import { describe, it, expect } from "vitest";
import {
  ResponseStatus,
  isSuccess,
  isError,
  getErrorMessage,
  unwrapResponse,
  mapResponse,
} from "../core-api/tauri/response";

describe("response utilities", () => {
  describe("ResponseStatus", () => {
    it("has all expected status values", () => {
      expect(ResponseStatus.Success).toBe("success");
      expect(ResponseStatus.Created).toBe("created");
      expect(ResponseStatus.Updated).toBe("updated");
      expect(ResponseStatus.Deleted).toBe("deleted");
      expect(ResponseStatus.Error).toBe("error");
      expect(ResponseStatus.ValidationError).toBe("validationError");
      expect(ResponseStatus.NotFound).toBe("notFound");
      expect(ResponseStatus.Unauthorized).toBe("unauthorized");
      expect(ResponseStatus.Forbidden).toBe("forbidden");
      expect(ResponseStatus.Info).toBe("info");
      expect(ResponseStatus.Warning).toBe("warning");
      expect(ResponseStatus.Duplicate).toBe("duplicate");
    });
  });

  describe("isSuccess", () => {
    it("returns true for Success status", () => {
      const response = {
        status: ResponseStatus.Success,
        message: "ok",
        data: null,
      };
      expect(isSuccess(response)).toBe(true);
    });

    it("returns true for Created status", () => {
      const response = {
        status: ResponseStatus.Created,
        message: "ok",
        data: null,
      };
      expect(isSuccess(response)).toBe(true);
    });

    it("returns true for Updated status", () => {
      const response = {
        status: ResponseStatus.Updated,
        message: "ok",
        data: null,
      };
      expect(isSuccess(response)).toBe(true);
    });

    it("returns true for Deleted status", () => {
      const response = {
        status: ResponseStatus.Deleted,
        message: "ok",
        data: null,
      };
      expect(isSuccess(response)).toBe(true);
    });

    it("returns false for Error status", () => {
      const response = {
        status: ResponseStatus.Error,
        message: "fail",
        data: null,
      };
      expect(isSuccess(response)).toBe(false);
    });

    it("returns false for ValidationError status", () => {
      const response = {
        status: ResponseStatus.ValidationError,
        message: "fail",
        data: null,
      };
      expect(isSuccess(response)).toBe(false);
    });

    it("returns false for NotFound status", () => {
      const response = {
        status: ResponseStatus.NotFound,
        message: "not found",
        data: null,
      };
      expect(isSuccess(response)).toBe(false);
    });
  });

  describe("isError", () => {
    it("returns true for Error status", () => {
      const response = {
        status: ResponseStatus.Error,
        message: "fail",
        data: null,
      };
      expect(isError(response)).toBe(true);
    });

    it("returns true for ValidationError status", () => {
      const response = {
        status: ResponseStatus.ValidationError,
        message: "fail",
        data: null,
      };
      expect(isError(response)).toBe(true);
    });

    it("returns true for NotFound status", () => {
      const response = {
        status: ResponseStatus.NotFound,
        message: "not found",
        data: null,
      };
      expect(isError(response)).toBe(true);
    });

    it("returns true for Unauthorized status", () => {
      const response = {
        status: ResponseStatus.Unauthorized,
        message: "unauthorized",
        data: null,
      };
      expect(isError(response)).toBe(true);
    });

    it("returns true for Forbidden status", () => {
      const response = {
        status: ResponseStatus.Forbidden,
        message: "forbidden",
        data: null,
      };
      expect(isError(response)).toBe(true);
    });

    it("returns false for Success status", () => {
      const response = {
        status: ResponseStatus.Success,
        message: "ok",
        data: null,
      };
      expect(isError(response)).toBe(false);
    });

    it("returns false for Warning status", () => {
      const response = {
        status: ResponseStatus.Warning,
        message: "warn",
        data: null,
      };
      expect(isError(response)).toBe(false);
    });
  });

  describe("getErrorMessage", () => {
    it("returns message for error response", () => {
      const response = {
        status: ResponseStatus.Error,
        message: "Something broke",
        data: null,
      };
      expect(getErrorMessage(response)).toBe("Something broke");
    });

    it("returns null for success response", () => {
      const response = {
        status: ResponseStatus.Success,
        message: "ok",
        data: "result",
      };
      expect(getErrorMessage(response)).toBeNull();
    });

    it("returns null for info response", () => {
      const response = {
        status: ResponseStatus.Info,
        message: "info",
        data: null,
      };
      expect(getErrorMessage(response)).toBeNull();
    });
  });

  describe("unwrapResponse", () => {
    it("returns data for success response", () => {
      const response = {
        status: ResponseStatus.Success,
        message: "ok",
        data: "my-data",
      };
      expect(unwrapResponse(response)).toBe("my-data");
    });

    it("throws for error response", () => {
      const response = {
        status: ResponseStatus.Error,
        message: "fail",
        data: null,
      };
      expect(() => unwrapResponse(response)).toThrow("fail");
    });

    it("throws when data is null even on success", () => {
      const response = {
        status: ResponseStatus.Success,
        message: "ok",
        data: null,
      };
      expect(() => unwrapResponse(response)).toThrow("No data in response");
    });

    it("throws with default message for error without message", () => {
      const response = {
        status: ResponseStatus.Error,
        message: "",
        data: null,
      };
      expect(() => unwrapResponse(response)).toThrow("Unknown error");
    });
  });

  describe("mapResponse", () => {
    it("maps data through function", () => {
      const response = {
        status: ResponseStatus.Success,
        message: "ok",
        data: 5,
      };
      const mapped = mapResponse(response, (n) => n * 2);
      expect(mapped.data).toBe(10);
    });

    it("preserves status and message", () => {
      const response = {
        status: ResponseStatus.Created,
        message: "created",
        data: "x",
      };
      const mapped = mapResponse(response, (s) => s.toUpperCase());
      expect(mapped.status).toBe(ResponseStatus.Created);
      expect(mapped.message).toBe("created");
    });

    it("handles null data", () => {
      const response = {
        status: ResponseStatus.Success,
        message: "ok",
        data: null,
      };
      const mapped = mapResponse(response, (n) => (n ?? 0) + 1);
      expect(mapped.data).toBeNull();
    });
  });
});
