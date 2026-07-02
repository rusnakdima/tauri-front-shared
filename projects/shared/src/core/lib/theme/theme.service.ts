import { Injectable, signal, effect, computed } from "@angular/core";

export type ThemeMode = "light" | "dark" | "system";

export interface AccentShades {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
}

export interface ThemeColors {
  [variable: string]: string;
}

@Injectable({ providedIn: "root" })
export class ThemeService {
  private _mode = signal<ThemeMode>("system");
  private _accentColor = signal<string>("#3b82f6");
  private _accentShades = signal<AccentShades | null>(null);
  private _registeredThemes = new Map<string, ThemeColors>();

  mode = this._mode.asReadonly();
  accentColor = this._accentColor.asReadonly();
  accentShades = this._accentShades.asReadonly();
  effectiveColorMode = computed(() => {
    const m = this._mode();
    if (m === "system") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    return m;
  });

  constructor() {
    effect(() => {
      this.applyTheme(this._mode(), this._accentColor());
    });
  }

  setMode(mode: ThemeMode): void {
    this._mode.set(mode);
    localStorage.setItem("theme-mode", mode);
  }

  setTheme(theme: ThemeMode): void {
    this.setMode(theme);
  }

  setAccentColor(color: string): void {
    this._accentColor.set(color);
    localStorage.setItem("theme-accent", color);
    this.applyAccentShades(color);
  }

  registerTheme(name: string, colors: ThemeColors): void {
    this._registeredThemes.set(name, colors);
  }

  init(): void {
    const savedMode = localStorage.getItem("theme-mode") as ThemeMode | null;
    const savedAccent = localStorage.getItem("theme-accent");

    if (savedMode) this._mode.set(savedMode);
    if (savedAccent) this._accentColor.set(savedAccent);

    const shades = this.calculateShades(savedAccent || "#3b82f6");
    this._accentShades.set(shades);
    this.applyTheme(this._mode(), savedAccent || "#3b82f6");
  }

  toggle(): void {
    const current = document.documentElement.classList.contains("dark")
      ? "dark"
      : "light";
    this.setMode(current === "dark" ? "light" : "dark");
  }

  private applyTheme(mode: ThemeMode, accent: string): void {
    const root = document.documentElement;
    root.classList.remove("light", "dark");

    const effectiveMode =
      mode === "system"
        ? window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
        : mode;

    root.classList.add(effectiveMode);
    this.applyAccentShades(accent);
  }

  private applyAccentShades(accent: string): void {
    const root = document.documentElement;
    root.style.setProperty("--accent", accent);

    const shades: AccentShades = {
      50: `color-mix(in srgb, var(--accent) 10%, white)`,
      100: `color-mix(in srgb, var(--accent) 20%, white)`,
      200: `color-mix(in srgb, var(--accent) 40%, white)`,
      300: `color-mix(in srgb, var(--accent) 60%, white)`,
      400: `color-mix(in srgb, var(--accent) 80%, white)`,
      500: accent,
      600: `color-mix(in srgb, var(--accent) 80%, black)`,
      700: `color-mix(in srgb, var(--accent) 60%, black)`,
      800: `color-mix(in srgb, var(--accent) 40%, black)`,
      900: `color-mix(in srgb, var(--accent) 20%, black)`,
    };

    for (const [key, value] of Object.entries(shades)) {
      root.style.setProperty(`--accent-${key}`, value);
    }

    const computedShades: AccentShades = { ...shades };
    computedShades[500] = accent;
    this._accentShades.set(computedShades);
  }

  calculateShades(hex: string): AccentShades {
    const rgb = this.hexToRgb(hex);
    if (!rgb) {
      return {
        50: "#f0f9ff",
        100: "#e0f2fe",
        200: "#bae6fd",
        300: "#7dd3fc",
        400: "#38bdf8",
        500: "#0ea5e9",
        600: "#0284c7",
        700: "#0369a1",
        800: "#075985",
        900: "#0c4a6e",
      };
    }

    const shades: AccentShades = {
      50: this.rgbToHex(
        Math.round(rgb.r * 0.95 + 255 * 0.05),
        Math.round(rgb.g * 0.95 + 255 * 0.05),
        Math.round(rgb.b * 0.95 + 255 * 0.05),
      ),
      100: this.rgbToHex(
        Math.round(rgb.r * 0.9 + 255 * 0.1),
        Math.round(rgb.g * 0.9 + 255 * 0.1),
        Math.round(rgb.b * 0.9 + 255 * 0.1),
      ),
      200: this.rgbToHex(
        Math.round(rgb.r * 0.8 + 255 * 0.2),
        Math.round(rgb.g * 0.8 + 255 * 0.2),
        Math.round(rgb.b * 0.8 + 255 * 0.2),
      ),
      300: this.rgbToHex(
        Math.round(rgb.r * 0.7 + 255 * 0.3),
        Math.round(rgb.g * 0.7 + 255 * 0.3),
        Math.round(rgb.b * 0.7 + 255 * 0.3),
      ),
      400: this.rgbToHex(
        Math.round(rgb.r * 0.6 + 255 * 0.4),
        Math.round(rgb.g * 0.6 + 255 * 0.4),
        Math.round(rgb.b * 0.6 + 255 * 0.4),
      ),
      500: hex,
      600: this.rgbToHex(
        Math.round(rgb.r * 0.8),
        Math.round(rgb.g * 0.8),
        Math.round(rgb.b * 0.8),
      ),
      700: this.rgbToHex(
        Math.round(rgb.r * 0.6),
        Math.round(rgb.g * 0.6),
        Math.round(rgb.b * 0.6),
      ),
      800: this.rgbToHex(
        Math.round(rgb.r * 0.4),
        Math.round(rgb.g * 0.4),
        Math.round(rgb.b * 0.4),
      ),
      900: this.rgbToHex(
        Math.round(rgb.r * 0.2),
        Math.round(rgb.g * 0.2),
        Math.round(rgb.b * 0.2),
      ),
    };

    return shades;
  }

  private hexToRgb(hex: string): { r: number; g: number; b: number } | null {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  }

  private rgbToHex(r: number, g: number, b: number): string {
    return (
      "#" +
      [r, g, b]
        .map((x) => {
          const hex = Math.max(0, Math.min(255, x)).toString(16);
          return hex.length === 1 ? "0" + hex : hex;
        })
        .join("")
    );
  }

  hexToRgba(hex: string, alpha: number): string {
    const rgb = this.hexToRgb(hex);
    if (!rgb) return `rgba(0, 0, 0, ${alpha})`;
    return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
  }
}
