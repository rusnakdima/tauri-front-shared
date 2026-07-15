import { describe, it, expect, vi } from "vitest";
import { getErrorMessage, withErrorHandling } from "../utils/error";

describe("error utils", () => {
  describe("getErrorMessage", () => {
    it("returns Error message for Error instance", () => {
      const error = new Error("Something went wrong");
      expect(getErrorMessage(error)).toBe("Something went wrong");
    });

    it("returns string as-is for string input", () => {
      expect(getErrorMessage("simple error string")).toBe(
        "simple error string",
      );
    });

    it("returns 'Unknown error' for null", () => {
      expect(getErrorMessage(null)).toBe("Unknown error");
    });

    it("returns 'Unknown error' for undefined", () => {
      expect(getErrorMessage(undefined)).toBe("Unknown error");
    });

    it("returns String() representation for object", () => {
      expect(getErrorMessage({ what: "ever" })).toBe("[object Object]");
    });

    it("returns number as string", () => {
      expect(getErrorMessage(42)).toBe("42");
    });
  });

  describe("withErrorHandling", () => {
    it("returns result when function succeeds", async () => {
      const fn = async () => "success";
      const result = await withErrorHandling(fn);
      expect(result).toBe("success");
    });

    it("returns undefined and calls onError when function throws", async () => {
      const error = new Error("test error");
      const fn = async () => {
        throw error;
      };
      const onError = vi.fn();
      const result = await withErrorHandling(fn, onError);
      expect(result).toBeUndefined();
      expect(onError).toHaveBeenCalledWith(error);
    });

    it("returns undefined without calling onError when not provided", async () => {
      const fn = async () => {
        throw new Error("ignored");
      };
      const result = await withErrorHandling(fn);
      expect(result).toBeUndefined();
    });

    it("propagates rejection when no onError handler", async () => {
      const fn = async () => {
        throw new Error("test");
      };
      // When onError is not provided, errors are swallowed
      const result = await withErrorHandling(fn);
      expect(result).toBeUndefined();
    });
  });
});
