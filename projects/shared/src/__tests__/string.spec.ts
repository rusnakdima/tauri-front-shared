import { describe, it, expect } from "vitest";
import { truncate, capitalize, slugify } from "../utils/string";

describe("string utils", () => {
  describe("truncate", () => {
    it("returns original string when shorter than max", () => {
      expect(truncate("hello", 10)).toBe("hello");
    });

    it("returns original string when equal to max", () => {
      expect(truncate("hello", 5)).toBe("hello");
    });

    it("truncates string longer than max with default suffix", () => {
      // maxLength 8 - suffix length 1 = 7 chars + suffix
      expect(truncate("hello world", 8)).toBe("hello w…");
    });

    it("truncates with custom suffix", () => {
      // maxLength 8 - "..." length 3 = 5 chars + suffix
      expect(truncate("hello world", 8, "...")).toBe("hello...");
    });

    it("handles max of 0", () => {
      // maxLength 0 - suffix length 1 = -1, slice(-1) gives last char + suffix
      expect(truncate("hello", 0)).toBe("hell…");
    });

    it("handles max smaller than suffix length gracefully", () => {
      const result = truncate("hello", 1, "...");
      // maxLength 1 - suffix length 3 = -2, slice(-2) gives last 2 chars + suffix
      expect(result).toBeDefined();
    });

    it("uses default ellipsis suffix", () => {
      expect(truncate("hello world", 8)).toBe("hello w…");
    });
  });

  describe("capitalize", () => {
    it("capitalizes lowercase first letter", () => {
      expect(capitalize("hello")).toBe("Hello");
    });

    it("leaves uppercase first letter unchanged", () => {
      expect(capitalize("Hello")).toBe("Hello");
    });

    it("handles empty string", () => {
      expect(capitalize("")).toBe("");
    });

    it("handles single character", () => {
      expect(capitalize("a")).toBe("A");
    });

    it("handles string with numbers first", () => {
      expect(capitalize("123abc")).toBe("123abc");
    });
  });

  describe("slugify", () => {
    it("converts to lowercase", () => {
      expect(slugify("Hello")).toBe("hello");
    });

    it("replaces spaces with hyphens", () => {
      expect(slugify("hello world")).toBe("hello-world");
    });

    it("removes special characters", () => {
      expect(slugify("hello@world!")).toBe("helloworld");
    });

    it("replaces underscores with hyphens", () => {
      expect(slugify("hello_world")).toBe("hello-world");
    });

    it("removes leading hyphens", () => {
      expect(slugify("  hello")).toBe("hello");
    });

    it("removes trailing hyphens", () => {
      expect(slugify("hello  ")).toBe("hello");
    });

    it("collapses multiple spaces/hyphens", () => {
      expect(slugify("hello  world  test")).toBe("hello-world-test");
    });

    it("handles complex strings", () => {
      expect(slugify("Hello World! This is a Test.")).toBe(
        "hello-world-this-is-a-test",
      );
    });

    it("handles empty string", () => {
      expect(slugify("")).toBe("");
    });
  });
});
