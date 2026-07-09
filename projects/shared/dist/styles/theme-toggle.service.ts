import { Injectable, inject } from "@angular/core";
import { StyleThemeService } from "./theme.service";

@Injectable({ providedIn: "root" })
export class ThemeToggleService {
  private themeService = inject(StyleThemeService);
  private mediaQuery: MediaQueryList | null = null;

  init(): void {
    if (typeof window === "undefined") return;

    this.mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    if (!this.themeService.isDarkMode()) {
      const prefersDark = this.mediaQuery.matches;
      if (prefersDark) {
        this.themeService.setDarkMode(true);
      }
    }

    this.mediaQuery.addEventListener("change", this._onSystemThemeChange);
  }

  private _onSystemThemeChange = (e: MediaQueryListEvent): void => {
    if (!this.themeService.isDarkMode()) {
      this.themeService.setDarkMode(e.matches);
    }
  };

  isDark(): boolean {
    return this.themeService.isDarkMode();
  }

  enable(): void {
    this.themeService.setDarkMode(true);
  }

  disable(): void {
    this.themeService.setDarkMode(false);
  }

  toggle(): void {
    this.themeService.toggleDarkMode();
  }
}
