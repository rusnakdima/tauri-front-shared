import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { StyleThemeService } from "../styles/theme.service";
import { setCurrentStyle } from "../styles/style-registry";

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();
Object.defineProperty(window, "localStorage", { value: localStorageMock });

describe("StyleThemeService", () => {
  let service: StyleThemeService;

  beforeEach(() => {
    // Reset DOM state
    document.documentElement.classList.remove("dark");
    localStorageMock.clear();

    // Remove any injected styles
    const injected = document.getElementById("dark-mode-variables");
    if (injected) injected.remove();

    // Reset style registry
    setCurrentStyle("material-design-v3");

    service = new StyleThemeService();
  });

  afterEach(() => {
    // Cleanup
    const injected = document.getElementById("dark-mode-variables");
    if (injected) injected.remove();
    document.documentElement.classList.remove("dark");
  });

  describe("dark mode state", () => {
    it("should start with dark mode disabled by default", () => {
      expect(service.isDarkMode()).toBe(false);
    });

    it("should toggle dark mode on", () => {
      service.toggleDarkMode();
      expect(service.isDarkMode()).toBe(true);
    });

    it("should toggle dark mode off", () => {
      service.toggleDarkMode();
      service.toggleDarkMode();
      expect(service.isDarkMode()).toBe(false);
    });

    it("should set dark mode explicitly to true", () => {
      service.setDarkMode(true);
      expect(service.isDarkMode()).toBe(true);
    });

    it("should set dark mode explicitly to false", () => {
      service.setDarkMode(true);
      service.setDarkMode(false);
      expect(service.isDarkMode()).toBe(false);
    });

    it("should add 'dark' class to html element when dark mode is on", () => {
      service.setDarkMode(true);
      expect(document.documentElement.classList.contains("dark")).toBe(true);
    });

    it("should remove 'dark' class from html element when dark mode is off", () => {
      service.setDarkMode(true);
      service.setDarkMode(false);
      expect(document.documentElement.classList.contains("dark")).toBe(false);
    });
  });

  describe("CSS variable injection", () => {
    it("should inject dark mode variables when dark mode is enabled", () => {
      service.setDarkMode(true);
      const styleEl = document.getElementById("dark-mode-variables");
      expect(styleEl).not.toBeNull();
      expect(styleEl?.textContent).toContain("--warning");
      expect(styleEl?.textContent).toContain("--success");
    });

    it("should remove dark mode variables when dark mode is disabled", () => {
      service.setDarkMode(true);
      service.setDarkMode(false);
      const styleEl = document.getElementById("dark-mode-variables");
      expect(styleEl).toBeNull();
    });

    it("should have warning color defined in dark mode", () => {
      service.setDarkMode(true);
      const styleEl = document.getElementById("dark-mode-variables");
      expect(styleEl?.textContent).toContain("--warning");
      expect(styleEl?.textContent).toMatch(/--warning:\s*[^;]+;/);
    });

    it("should have text-on-warning color defined in dark mode", () => {
      service.setDarkMode(true);
      const styleEl = document.getElementById("dark-mode-variables");
      expect(styleEl?.textContent).toContain("--text-on-warning");
      expect(styleEl?.textContent).toMatch(/--text-on-warning:\s*[^;]+;/);
    });

    it("should have text-on-success color defined in dark mode", () => {
      service.setDarkMode(true);
      const styleEl = document.getElementById("dark-mode-variables");
      expect(styleEl?.textContent).toContain("--text-on-success");
      expect(styleEl?.textContent).toMatch(/--text-on-success:\s*[^;]+;/);
    });

    it("should have success color defined in dark mode", () => {
      service.setDarkMode(true);
      const styleEl = document.getElementById("dark-mode-variables");
      expect(styleEl?.textContent).toContain("--success");
      expect(styleEl?.textContent).toMatch(/--success:\s*[^;]+;/);
    });
  });

  describe("localStorage persistence", () => {
    it("should persist dark mode preference to localStorage", () => {
      service.setDarkMode(true);
      expect(localStorageMock.getItem("tauri-front-dark-mode")).toBe("true");
    });

    it("should restore dark mode preference from localStorage", () => {
      localStorageMock.setItem("tauri-front-dark-mode", "true");
      const newService = new StyleThemeService();
      expect(newService.isDarkMode()).toBe(true);
    });

    it("should clear localStorage when dark mode is disabled", () => {
      service.setDarkMode(true);
      service.setDarkMode(false);
      expect(localStorageMock.getItem("tauri-front-dark-mode")).toBe("false");
    });
  });

  describe("theme loading", () => {
    it("should load a theme variant", async () => {
      await service.loadTheme("glassmorphism");
      expect(service.getCurrentTheme()).toBe("glassmorphism");
    });

    it("should resolve simple theme names", async () => {
      await service.setTheme("neumorphism");
      expect(service.getCurrentTheme()).toBe("neumorphism");
    });

    it("should default to material-design-v3 for unknown themes", async () => {
      await service.setTheme("nonexistent-theme");
      expect(service.getCurrentTheme()).toBe("material-design-v3");
    });

    it("should inject dark mode variables when loading theme with dark mode on", async () => {
      service.setDarkMode(true);
      await service.loadTheme("neumorphism");
      const styleEl = document.getElementById("dark-mode-variables");
      expect(styleEl).not.toBeNull();
    });
  });

  describe("effectiveColorMode", () => {
    it("should return 'dark' when dark mode is on", () => {
      service.setDarkMode(true);
      expect(service.effectiveColorMode()).toBe("dark");
    });

    it("should return 'light' when dark mode is off", () => {
      service.setDarkMode(false);
      expect(service.effectiveColorMode()).toBe("light");
    });
  });

  describe("themeChanged observable", () => {
    it("should emit when dark mode is toggled", async () => {
      const emissions: Array<{ variant: string; isDark: boolean }> = [];
      service.themeChanged$.subscribe((val) => emissions.push(val));

      service.toggleDarkMode();
      service.toggleDarkMode();

      expect(emissions.length).toBeGreaterThanOrEqual(2);
    });
  });
});

describe("StyleThemeService - all variants have required CSS variables", () => {
  const variants = [
    "material-design-v3",
    "neumorphism",
    "claymorphism",
    "glassmorphism",
    "brutalism",
    "skeuomorphism",
  ] as const;

  beforeEach(() => {
    document.documentElement.classList.remove("dark");
    const injected = document.getElementById("dark-mode-variables");
    if (injected) injected.remove();
    localStorageMock.clear();
  });

  for (const variant of variants) {
    describe(`${variant} dark mode`, () => {
      it(`should define --warning CSS variable`, () => {
        const service = new StyleThemeService();
        setCurrentStyle(variant);
        service.setDarkMode(true);

        const styleEl = document.getElementById("dark-mode-variables");
        expect(styleEl?.textContent).toContain("--warning");
      });

      it(`should define --text-on-warning CSS variable`, () => {
        const service = new StyleThemeService();
        setCurrentStyle(variant);
        service.setDarkMode(true);

        const styleEl = document.getElementById("dark-mode-variables");
        expect(styleEl?.textContent).toContain("--text-on-warning");
      });

      it(`should define --success CSS variable`, () => {
        const service = new StyleThemeService();
        setCurrentStyle(variant);
        service.setDarkMode(true);

        const styleEl = document.getElementById("dark-mode-variables");
        expect(styleEl?.textContent).toContain("--success");
      });

      it(`should define --text-on-success CSS variable`, () => {
        const service = new StyleThemeService();
        setCurrentStyle(variant);
        service.setDarkMode(true);

        const styleEl = document.getElementById("dark-mode-variables");
        expect(styleEl?.textContent).toContain("--text-on-success");
      });
    });
  }
});
