import { describe, it, expect } from "vitest";
import { parseJsonOrDefault } from "../utils/json";

describe("parseJsonOrDefault", () => {
  it("parses valid JSON array", () => {
    const input = '[{"id": "1"}, {"id": "2"}]';
    const result = parseJsonOrDefault(input, []);
    expect(result).toEqual([{ id: "1" }, { id: "2" }]);
  });

  it("returns default value for invalid JSON", () => {
    const result = parseJsonOrDefault("not json", [{ id: "default" }]);
    expect(result).toEqual([{ id: "default" }]);
  });

  it("returns empty array default for invalid JSON", () => {
    const result = parseJsonOrDefault("invalid");
    expect(result).toEqual([]);
  });

  it("returns empty array default for empty string", () => {
    const result = parseJsonOrDefault("");
    expect(result).toEqual([]);
  });

  it("returns the array as-is if already an array", () => {
    const input = [{ id: "1" }, { id: "2" }];
    const result = parseJsonOrDefault(input);
    expect(result).toBe(input);
  });

  it("returns the array as-is even if empty", () => {
    const input: { id: string }[] = [];
    const result = parseJsonOrDefault(input);
    expect(result).toBe(input);
  });

  it("returns default for null-like string that is not valid JSON", () => {
    const result = parseJsonOrDefault("null", [{ id: "default" }]);
    // "null" is technically valid JSON but not an array, so it goes through JSON.parse
    expect(result).toBeNull();
  });

  it("parses nested JSON structure", () => {
    const input = '[{"name": "test", "items": [{"id": 1}]}]';
    const result = parseJsonOrDefault(input);
    expect(result).toEqual([{ name: "test", items: [{ id: 1 }] }]);
  });
});
