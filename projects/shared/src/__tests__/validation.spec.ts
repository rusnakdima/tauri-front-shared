import { describe, it, expect } from "vitest";
import {
  isNullOrUndefined,
  isPresent,
  isValidEmail,
  isValidBase64Image,
} from "../utils/validation";

describe("validation", () => {
  describe("isNullOrUndefined", () => {
    it("returns true for null", () => {
      expect(isNullOrUndefined(null)).toBe(true);
    });

    it("returns true for undefined", () => {
      expect(isNullOrUndefined(undefined)).toBe(true);
    });

    it("returns false for empty string", () => {
      expect(isNullOrUndefined("")).toBe(false);
    });

    it("returns false for zero", () => {
      expect(isNullOrUndefined(0)).toBe(false);
    });

    it("returns false for false", () => {
      expect(isNullOrUndefined(false)).toBe(false);
    });

    it("returns false for object", () => {
      expect(isNullOrUndefined({})).toBe(false);
    });
  });

  describe("isPresent", () => {
    it("returns false for null", () => {
      expect(isPresent(null)).toBe(false);
    });

    it("returns false for undefined", () => {
      expect(isPresent(undefined)).toBe(false);
    });

    it("returns true for empty string", () => {
      expect(isPresent("")).toBe(true);
    });

    it("returns true for zero", () => {
      expect(isPresent(0)).toBe(true);
    });

    it("returns true for false", () => {
      expect(isPresent(false)).toBe(true);
    });

    it("returns true for object", () => {
      expect(isPresent({})).toBe(true);
    });
  });

  describe("isValidEmail", () => {
    it("returns true for valid simple email", () => {
      expect(isValidEmail("test@example.com")).toBe(true);
    });

    it("returns true for email with dot in local part", () => {
      expect(isValidEmail("first.last@example.com")).toBe(true);
    });

    it("returns true for email with plus", () => {
      expect(isValidEmail("test+filter@example.com")).toBe(true);
    });

    it("returns false for email without @", () => {
      expect(isValidEmail("testexample.com")).toBe(false);
    });

    it("returns false for email without domain", () => {
      expect(isValidEmail("test@")).toBe(false);
    });

    it("returns false for email without local part", () => {
      expect(isValidEmail("@example.com")).toBe(false);
    });

    it("returns false for email with spaces", () => {
      expect(isValidEmail("test @example.com")).toBe(false);
    });

    it("returns false for empty string", () => {
      expect(isValidEmail("")).toBe(false);
    });
  });

  describe("isValidBase64Image", () => {
    it("returns true for valid base64 PNG image", () => {
      // "iVBORw0KGgo=" is valid base64 for a small PNG
      const valid =
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";
      expect(isValidBase64Image(valid)).toBe(true);
    });

    it("returns true for valid base64 JPEG image", () => {
      const valid = "data:image/jpeg;base64,/9j/4AAQSkZJRg==";
      expect(isValidBase64Image(valid)).toBe(true);
    });

    it("returns true for valid base64 GIF image", () => {
      const valid = "data:image/gif;base64,R0lGODlhAQ==";
      expect(isValidBase64Image(valid)).toBe(true);
    });

    it("returns false for data URL without base64", () => {
      expect(isValidBase64Image("data:image/png")).toBe(false);
    });

    it("returns false for data URL without comma", () => {
      expect(isValidBase64Image("data:image/png;base64")).toBe(false);
    });

    it("returns false for unsupported mime type", () => {
      expect(isValidBase64Image("data:image/tiff;base64,SGVsbG8=")).toBe(false);
    });

    it("returns false for non-data URL", () => {
      expect(isValidBase64Image("not a data URL")).toBe(false);
    });

    it("returns false for invalid base64 content", () => {
      expect(isValidBase64Image("data:image/png;base64,!!!")).toBe(false);
    });

    it("returns false for empty string", () => {
      expect(isValidBase64Image("")).toBe(false);
    });
  });
});
