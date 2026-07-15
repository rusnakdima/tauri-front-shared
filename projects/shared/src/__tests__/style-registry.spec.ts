import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import {
  STYLE_VARIANTS,
  loadStyleVariant,
  unloadStyleVariant,
  getCurrentStyle,
  getStyleConfig,
  getStyleClassPrefix,
  getAllStyleVariants,
  getStyleClass,
} from "../styles/style-registry";

describe("style-registry", () => {
  beforeEach(() => {
    // Clean up any existing style elements
    const existingStyles = document.querySelectorAll('style[id^="style-"]');
    existingStyles.forEach((el) => el.remove());
    vi.stubGlobal("localStorage", {
      getItem: vi.fn().mockReturnValue(null),
      setItem: vi.fn(),
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    // Clean up styles added during tests
    const existingStyles = document.querySelectorAll('style[id^="style-"]');
    existingStyles.forEach((el) => el.remove());
  });

  describe("STYLE_VARIANTS", () => {
    it("contains all expected variants", () => {
      expect(STYLE_VARIANTS["claymorphism"]).toBeDefined();
      expect(STYLE_VARIANTS["glassmorphism"]).toBeDefined();
      expect(STYLE_VARIANTS["neumorphism"]).toBeDefined();
      expect(STYLE_VARIANTS["material-design-v3"]).toBeDefined();
      expect(STYLE_VARIANTS["brutalism"]).toBeDefined();
      expect(STYLE_VARIANTS["skeuomorphism"]).toBeDefined();
    });

    it("each variant has required properties", () => {
      for (const variant of Object.values(STYLE_VARIANTS)) {
        expect(variant.id).toBeDefined();
        expect(variant.name).toBeDefined();
        expect(variant.cssString).toBeDefined();
        expect(variant.classPrefix).toBeDefined();
        expect(variant.description).toBeDefined();
        expect(variant.componentStyles).toBeDefined();
      }
    });

    it("each variant has unique classPrefix", () => {
      const prefixes = Object.values(STYLE_VARIANTS).map((v) => v.classPrefix);
      const uniquePrefixes = new Set(prefixes);
      expect(uniquePrefixes.size).toBe(prefixes.length);
    });
  });

  describe("loadStyleVariant", () => {
    it("creates and appends style element to document", async () => {
      await loadStyleVariant("glassmorphism");

      const styleEl = document.getElementById("style-glassmorphism");
      expect(styleEl).not.toBeNull();
      expect(styleEl?.tagName).toBe("STYLE");
    });

    it("sets style variant data attribute", async () => {
      await loadStyleVariant("neumorphism");

      const styleEl = document.getElementById("style-neumorphism");
      expect(styleEl?.dataset["styleVariant"]).toBe("neumorphism");
    });

    it("warns for unknown variant", async () => {
      const consoleWarn = vi
        .spyOn(console, "warn")
        .mockImplementation(() => {});

      await loadStyleVariant("nonexistent" as any);

      expect(consoleWarn).toHaveBeenCalledWith(
        "Unknown style variant: nonexistent",
      );
    });
  });

  describe("unloadStyleVariant", () => {
    it("removes style element from document", async () => {
      await loadStyleVariant("skeuomorphism");
      expect(document.getElementById("style-skeuomorphism")).not.toBeNull();

      unloadStyleVariant("skeuomorphism");

      expect(document.getElementById("style-skeuomorphism")).toBeNull();
    });

    it("does nothing for unloaded variant", () => {
      expect(() => unloadStyleVariant("claymorphism")).not.toThrow();
    });
  });

  describe("getCurrentStyle", () => {
    it("returns current style variant", () => {
      // Just check it returns a valid variant
      const style = getCurrentStyle();
      expect(Object.keys(STYLE_VARIANTS)).toContain(style);
    });
  });

  describe("getStyleConfig", () => {
    it("returns config for valid variant", () => {
      const config = getStyleConfig("glassmorphism");
      expect(config.id).toBe("glassmorphism");
      expect(config.name).toBe("Glassmorphism");
    });

    it("returns material-design-v3 config for unknown variant", () => {
      const config = getStyleConfig("nonexistent" as any);
      expect(config.id).toBe("material-design-v3");
    });
  });

  describe("getStyleClassPrefix", () => {
    it("returns correct prefix for each variant", () => {
      expect(getStyleClassPrefix("glassmorphism")).toBe("glass-");
      expect(getStyleClassPrefix("neumorphism")).toBe("neu-");
      expect(getStyleClassPrefix("claymorphism")).toBe("clay-");
      expect(getStyleClassPrefix("material-design-v3")).toBe("m3-");
      expect(getStyleClassPrefix("brutalism")).toBe("brut-");
      expect(getStyleClassPrefix("skeuomorphism")).toBe("skeu-");
    });

    it("returns m3- for unknown variant", () => {
      expect(getStyleClassPrefix("unknown" as any)).toBe("m3-");
    });
  });

  describe("getAllStyleVariants", () => {
    it("returns all variant configs", () => {
      const variants = getAllStyleVariants();
      expect(variants).toHaveLength(6);
    });
  });

  describe("getStyleClass", () => {
    it("returns prefixed class name", () => {
      const result = getStyleClass("glassmorphism", "button");
      expect(result).toBe("glass-button");
    });

    it("strips existing prefixes from base class", () => {
      const result = getStyleClass("neumorphism", "neu-button");
      expect(result).toBe("neu-button");
    });
  });
});
