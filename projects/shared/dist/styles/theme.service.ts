import { Injectable, inject } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import {
  loadStyleVariant,
  setCurrentStyle,
  getCurrentStyle,
  type StyleVariant,
} from "./style-registry";

const DARK_MODE_STORAGE_KEY = "tauri-front-dark-mode";

@Injectable({ providedIn: "root" })
export class ThemeService {
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

  constructor() {
    this.initializeDarkMode();
  }

  async loadTheme(variant: StyleVariant): Promise<void> {
    await loadStyleVariant(variant);
    setCurrentStyle(variant);
    this.injectThemeStyles(variant);
    this._themeChanged$.next({
      variant,
      isDark: this.isDarkMode(),
    });
  }

  toggleDarkMode(): void {
    const html = document.documentElement;
    const isCurrentlyDark = html.classList.contains("dark");
    if (isCurrentlyDark) {
      html.classList.remove("dark");
    } else {
      html.classList.add("dark");
    }
    this.saveDarkModePreference(!isCurrentlyDark);
    this._themeChanged$.next({
      variant: this.getCurrentTheme(),
      isDark: !isCurrentlyDark,
    });
  }

  isDarkMode(): boolean {
    return document.documentElement.classList.contains("dark");
  }

  setDarkMode(enabled: boolean): void {
    const html = document.documentElement;
    if (enabled) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
    this.saveDarkModePreference(enabled);
    this._themeChanged$.next({
      variant: this.getCurrentTheme(),
      isDark: enabled,
    });
  }

  getCurrentTheme(): StyleVariant {
    return getCurrentStyle();
  }

  private injectThemeStyles(variant: StyleVariant): void {
    let existing = document.getElementById("theme-styles");
    if (existing) {
      existing.remove();
    }

    const style = document.createElement("style");
    style.id = "theme-styles";
    style.textContent = this.getDarkModeCSS(variant);
    document.head.appendChild(style);
  }

  private getDarkModeCSS(variant: StyleVariant): string {
    return this.getDarkModeCSSForVariant(variant);
  }

  private getDarkModeCSSForVariant(variant: StyleVariant): string {
    switch (variant) {
      case "material-design-v3":
        return this.materialDesignV3DarkCSS();
      case "neumorphism":
        return this.neumorphismDarkCSS();
      case "claymorphism":
        return this.claymorphismDarkCSS();
      case "glassmorphism":
        return this.glassmorphismDarkCSS();
      default:
        return "";
    }
  }

  private materialDesignV3DarkCSS(): string {
    return `
.dark .m3 {
  color: #e6e1e5;
}

.dark .m3-btn-filled {
  background: #d0bcff;
  color: #381e72;
}

.dark .m3-btn-outlined {
  color: #d0bcff;
  border-color: #938f99;
}

.dark .m3-btn-text {
  color: #d0bcff;
}

.dark .m3-btn-tonal {
  background: #4f378b;
  color: #e8def8;
}

.dark .m3-input-outlined {
  border-color: #938f99;
  color: #e6e1e5;
}

.dark .m3-card-elevated {
  background: #1c1b1f;
  box-shadow: 0 2px 4px rgba(0,0,0,0.4);
}

.dark .m3-card-filled {
  background: #211f26;
}

.dark .m3-card-outlined {
  background: #1c1b1f;
  border-color: #938f99;
}

.dark .m3-surface-dim {
  background: #141218;
}

.dark .m3-surface-container {
  background: #211f26;
}

.dark .m3-surface-container-low {
  background: #1d1b20;
}

.dark .m3-surface-container-high {
  background: #2b2930;
}

.dark .m3-surface-container-highest {
  background: #36343b;
}

.dark .m3-progress-linear {
  background: #49454f;
}

.dark .m3-progress-circular-track {
  border-color: #49454f;
}

.dark .m3-nav-rail {
  background: #1c1b1f;
}

.dark .m3-nav-bar {
  background: #1c1b1f;
}

.dark .m3-snackbar {
  background: #d0bcff;
  color: #381e72;
}

.dark .m3-tooltip {
  background: #e6e1e5;
  color: #1c1b1f;
}

.dark .m3-chip-assist {
  background: #4f378b;
  color: #e8def8;
}

.dark .m3-chip-filter {
  border-color: #938f99;
  color: #e6e1e5;
}

.dark .m3-chip-filter-selected {
  background: #4f378b;
  color: #e8def8;
}

.dark .m3-tabs {
  background: #1c1b1f;
}

.dark .m3-tab {
  color: #cac4d0;
}

.dark .m3-tab-selected {
  color: #d0bcff;
}

.dark .m3-tab-indicator {
  background: #d0bcff;
}

.dark .m3-switch {
  background: #49454f;
}

.dark .m3-switch:checked {
  background: #4f378b;
}

.dark .m3-checkbox {
  border-color: #938f99;
}

.dark .m3-checkbox:checked {
  background: #d0bcff;
  border-color: #d0bcff;
}

.dark .m3-radio {
  border-color: #938f99;
}

.dark .m3-radio:checked {
  border-color: #d0bcff;
}

.dark .m3-slider-track {
  background: #49454f;
}

.dark .m3-slider-thumb {
  background: #d0bcff;
}

.dark .m3-divider,
.dark .m3-divider-vertical {
  background: #49454f;
}
`;
  }

  private neumorphismDarkCSS(): string {
    return `
.dark .neu {
  background: #2d3748;
}

.dark .neu-raised {
  background: #2d3748;
}

.dark .neu-pressed {
  background: #2d3748;
}

.dark .neu-btn {
  background: #2d3748;
  color: #e2e8f0;
}

.dark .neu-btn-primary {
  background: linear-gradient(145deg, #3d4758, #1f2937);
  color: #a78bfa;
}

.dark .neu-input {
  background: #2d3748;
  color: #e2e8f0;
  box-shadow: inset 6px 6px 12px #1f2937, inset -6px -6px 12px #3d4758;
}

.dark .neu-card,
.dark .neu-card-hoverable {
  background: #2d3748;
}

.dark .neu-text {
  color: #e2e8f0;
}

.dark .neu-text-primary {
  color: #f8fafc;
}

.dark .neu-text-accent {
  color: #a78bfa;
}

.dark .neu-tooltip {
  background: #2d3748;
  color: #e2e8f0;
}

.dark .neu-modal {
  background: #2d3748;
}

.dark .neu-nav {
  background: #2d3748;
}

.dark .neu-nav-item {
  color: #e2e8f0;
}

.dark .neu-nav-item-active {
  color: #a78bfa;
}

.dark .neu-tabs {
  background: #2d3748;
  box-shadow: inset 4px 4px 8px #1f2937, inset -4px -4px 8px #3d4758;
}

.dark .neu-tab {
  color: #94a3b8;
}

.dark .neu-tab-active {
  color: #a78bfa;
}

.dark .neu-icon-btn {
  background: #2d3748;
  color: #e2e8f0;
}

.dark .neu-toggle {
  background: #2d3748;
}

.dark .neu-toggle-active .neu-toggle-knob {
  background: #a78bfa;
}

.dark .neu-progress {
  background: #2d3748;
}

.dark .neu-progress-bar {
  background: linear-gradient(90deg, #a78bfa, #7c3aed);
}

.dark .neu-checkbox {
  background: #2d3748;
}

.dark .neu-checkbox-check {
  background: #a78bfa;
}

.dark .neu-radio-dot {
  background: #a78bfa;
}

.dark .neu-slider {
  background: #2d3748;
}
`;
  }

  private claymorphismDarkCSS(): string {
    return `
.dark .clay {
  background: #2d3748;
}

.dark .clay-raised {
  background: linear-gradient(145deg, #3d4758, #1f2937);
}

.dark .clay-inset {
  background: #1f2937;
}

.dark .clay-btn {
  background: #2d3748;
}

.dark .clay-card {
  background: #2d3748;
}

.dark .clay-input {
  background: #1f2937;
  color: #e2e8f0;
}

.dark .clay-text {
  color: #e2e8f0;
}

.dark .clay-text-primary {
  color: #f8fafc;
}

.dark .clay-text-accent {
  color: #a78bfa;
}

.dark .clay-toggle {
  background: #1f2937;
}

.dark .clay-toggle-active .clay-toggle-knob {
  background: #a78bfa;
}

.dark .clay-progress {
  background: #1f2937;
}

.dark .clay-progress-bar {
  background: linear-gradient(90deg, #a78bfa, #7c3aed);
}

.dark .clay-checkbox {
  background: #1f2937;
}

.dark .clay-checkbox:checked {
  background: #a78bfa;
}

.dark .clay-modal {
  background: #2d3748;
}

.dark .clay-tooltip {
  background: #2d3748;
  color: #e2e8f0;
}

.dark .clay-badge {
  background: linear-gradient(145deg, #3d4758, #1f2937);
  color: #e2e8f0;
}

.dark .clay-avatar {
  background: #2d3748;
}

.dark .clay-divider {
  background: linear-gradient(90deg, transparent, #49454f, transparent);
}
`;
  }

  private glassmorphismDarkCSS(): string {
    return `
.dark .glass {
  background: rgba(30, 30, 50, 0.6);
  border-color: rgba(255, 255, 255, 0.1);
}

.dark .glass-surface {
  background: linear-gradient(135deg, rgba(30, 30, 50, 0.7) 0%, rgba(20, 20, 40, 0.7) 100%);
  border-color: rgba(255, 255, 255, 0.15);
}

.dark .glass-light {
  background: rgba(50, 50, 80, 0.3);
  border-color: rgba(255, 255, 255, 0.15);
}

.dark .glass-dark {
  background: rgba(0, 0, 0, 0.5);
  border-color: rgba(255, 255, 255, 0.08);
}

.dark .glass-btn {
  background: rgba(30, 30, 50, 0.5);
  border-color: rgba(255, 255, 255, 0.15);
  color: #e2e8f0;
}

.dark .glass-btn:hover {
  background: rgba(50, 50, 80, 0.6);
  border-color: rgba(255, 255, 255, 0.25);
}

.dark .glass-btn-primary {
  background: linear-gradient(135deg, rgba(167, 139, 250, 0.8) 0%, rgba(124, 58, 237, 0.8) 100%);
  border-color: rgba(255, 255, 255, 0.3);
}

.dark .glass-card {
  background: linear-gradient(135deg, rgba(30, 30, 50, 0.6) 0%, rgba(20, 20, 40, 0.6) 100%);
  border-color: rgba(255, 255, 255, 0.12);
}

.dark .glass-input {
  background: rgba(20, 20, 40, 0.5);
  border-color: rgba(255, 255, 255, 0.15);
  color: #e2e8f0;
}

.dark .glass-input::placeholder {
  color: rgba(255, 255, 255, 0.4);
}

.dark .glass-input:focus {
  border-color: rgba(167, 139, 250, 0.6);
}

.dark .glass-badge {
  background: rgba(30, 30, 50, 0.6);
  border-color: rgba(255, 255, 255, 0.15);
  color: #e2e8f0;
}

.dark .glass-avatar {
  background: linear-gradient(135deg, rgba(50, 50, 80, 0.5) 0%, rgba(30, 30, 50, 0.5) 100%);
  border-color: rgba(255, 255, 255, 0.2);
}

.dark .glass-checkbox {
  background: rgba(20, 20, 40, 0.5);
  border-color: rgba(255, 255, 255, 0.15);
}

.dark .glass-checkbox:checked {
  background: rgba(167, 139, 250, 0.8);
  border-color: rgba(167, 139, 250, 0.8);
}

.dark .glass-toggle {
  background: rgba(30, 30, 50, 0.5);
  border-color: rgba(255, 255, 255, 0.15);
}

.dark .glass-toggle-active {
  background: rgba(167, 139, 250, 0.6);
  border-color: rgba(167, 139, 250, 0.6);
}

.dark .glass-modal {
  background: linear-gradient(135deg, rgba(30, 30, 50, 0.8) 0%, rgba(20, 20, 40, 0.8) 100%);
  border-color: rgba(255, 255, 255, 0.12);
}

.dark .glass-tooltip {
  background: linear-gradient(135deg, rgba(200, 200, 220, 0.9) 0%, rgba(180, 180, 200, 0.9) 100%);
  color: #1c1b1f;
}

.dark .glass-progress {
  background: rgba(30, 30, 50, 0.5);
  border-color: rgba(255, 255, 255, 0.1);
}

.dark .glass-progress-bar {
  background: linear-gradient(90deg, rgba(167, 139, 250, 0.8), rgba(124, 58, 237, 0.8), rgba(167, 139, 250, 0.8));
}

.dark .glass-nav {
  background: linear-gradient(90deg, rgba(30, 30, 50, 0.6) 0%, rgba(20, 20, 40, 0.6) 100%);
  border-color: rgba(255, 255, 255, 0.1);
}

.dark .glass-nav-item {
  color: rgba(200, 200, 220, 0.7);
}

.dark .glass-nav-item:hover {
  color: #e2e8f0;
  background: rgba(50, 50, 80, 0.4);
}

.dark .glass-nav-item-active {
  color: #e2e8f0;
  background: rgba(50, 50, 80, 0.5);
  border-color: rgba(167, 139, 250, 0.6);
}

.dark .glass-text {
  color: rgba(200, 200, 220, 0.9);
}

.dark .glass-text-primary {
  color: #e2e8f0;
}

.dark .glass-text-accent {
  color: rgba(167, 139, 250, 0.9);
}

.dark .glass-divider {
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
}
`;
  }

  private initializeDarkMode(): void {
    const savedDarkMode = this.loadDarkModePreference();
    if (savedDarkMode) {
      document.documentElement.classList.add("dark");
    }
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
