import { Injectable, signal, effect } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import {
  setCurrentStyle,
  getCurrentStyle,
  type StyleVariant,
} from "./style-registry";

const DARK_MODE_STORAGE_KEY = "tauri-front-dark-mode";

@Injectable({ providedIn: "root" })
export class StyleThemeService {
  private readonly _themeChanged$ = new BehaviorSubject<{
    variant: StyleVariant;
    isDark: boolean;
  }>({
    variant: getCurrentStyle(),
    isDark: this.loadDarkModePreference(),
  });

  readonly themeChanged$: Observable<{
    variant: StyleVariant;
    isDark: boolean;
  }> = this._themeChanged$.asObservable();

  readonly theme = signal<StyleVariant>("material-design-v3");

  constructor() {
    effect(() => {
      document.documentElement.setAttribute("data-theme", this.theme());
    });
    this.initializeDarkMode();
  }

  /** No-op for API compatibility; initialization runs in the constructor. */
  init(): void {}

  async loadTheme(variant: StyleVariant): Promise<void> {
    this.theme.set(variant);
    setCurrentStyle(variant);
    this.persistDarkModePreference(variant);
    this._themeChanged$.next({ variant, isDark: this.isDarkMode() });
  }

  private persistDarkModePreference(_variant: StyleVariant): void {
    this.saveDarkModePreference(this.isDarkMode());
  }

  /** Convenience alias for apps that use simple theme names (e.g. "light", "dark"). */
  async setTheme(theme: string): Promise<void> {
    const variant = this.resolveThemeVariant(theme);
    await this.loadTheme(variant);
  }

  private resolveThemeVariant(theme: string): StyleVariant {
    const map: Record<string, StyleVariant> = {
      "material-design-v3": "material-design-v3",
      neumorphism: "neumorphism",
      claymorphism: "claymorphism",
      glassmorphism: "glassmorphism",
      brutalism: "brutalism",
      skeuomorphism: "skeuomorphism",
      "neo-brutalism": "neo-brutalism",
    };
    if (map[theme]) return map[theme];
    return "material-design-v3";
  }

  /** Alias for toggleDarkMode() — used by ZenithDB. */
  toggle(): void {
    this.toggleDarkMode();
  }

  /** Returns 'dark' or 'light' based on current dark mode state — used by ZenithDB. */
  effectiveColorMode(): string {
    return this.isDarkMode() ? "dark" : "light";
  }

  toggleDarkMode(): void {
    this.setDarkMode(!this.isDarkMode());
  }

  isDarkMode(): boolean {
    return document.body.getAttribute("data-theme-mode") === "dark";
  }

  setDarkMode(enabled: boolean): void {
    document.body.setAttribute("data-theme-mode", enabled ? "dark" : "light");
    this.saveDarkModePreference(enabled);
    this._themeChanged$.next({
      variant: this.getCurrentTheme(),
      isDark: enabled,
    });
  }

  private static readonly THEMES: StyleVariant[] = [
    "material-design-v3",
    "glassmorphism",
    "neumorphism",
    "claymorphism",
    "brutalism",
    "skeuomorphism",
    "neo-brutalism",
  ];

  cycle(): void {
    const idx = StyleThemeService.THEMES.indexOf(this.theme());
    const next =
      StyleThemeService.THEMES[(idx + 1) % StyleThemeService.THEMES.length];
    this.loadTheme(next);
  }

  getCurrentTheme(): StyleVariant {
    return getCurrentStyle();
  }

  private initializeDarkMode(): void {
    const savedDarkMode = this.loadDarkModePreference();
    document.body.setAttribute(
      "data-theme-mode",
      savedDarkMode ? "dark" : "light",
    );
    this._themeChanged$.next({
      variant: this.getCurrentTheme(),
      isDark: savedDarkMode,
    });
  }

  private loadDarkModePreference(): boolean {
    try {
      const stored = localStorage.getItem(DARK_MODE_STORAGE_KEY);
      if (stored !== null) {
        return stored === "true";
      }
    } catch {
      // localStorage not available
    }
    return false;
  }

  private saveDarkModePreference(enabled: boolean): void {
    try {
      localStorage.setItem(DARK_MODE_STORAGE_KEY, String(enabled));
    } catch {
      // localStorage not available
    }
  }
}
