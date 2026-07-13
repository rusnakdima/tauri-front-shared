import { Injectable } from "@angular/core";
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

  constructor() {
    this.initializeDarkMode();
  }

  /** No-op for API compatibility; initialization runs in the constructor. */
  init(): void {}

  async loadTheme(variant: StyleVariant): Promise<void> {
    setCurrentStyle(variant);
    if (this.isDarkMode()) {
      this.injectDarkModeVariables(variant);
    }
    this._themeChanged$.next({
      variant,
      isDark: this.isDarkMode(),
    });
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
    const html = document.documentElement;
    const isCurrentlyDark = html.classList.contains("dark");
    if (isCurrentlyDark) {
      html.classList.remove("dark");
      this.removeDarkModeVariables();
    } else {
      html.classList.add("dark");
      this.injectDarkModeVariables(this.getCurrentTheme());
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
      this.injectDarkModeVariables(this.getCurrentTheme());
    } else {
      html.classList.remove("dark");
      this.removeDarkModeVariables();
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

  private injectDarkModeVariables(variant: StyleVariant): void {
    this.removeDarkModeVariables();
    const style = document.createElement("style");
    style.id = "dark-mode-variables";
    // Both mechanisms are needed: :root {} variables AND .dark .{prefix}* class selectors
    style.textContent =
      this.getDarkModeVariablesCSS(variant) +
      this.getDarkModeCSSForVariant(variant);
    document.head.appendChild(style);
  }

  private removeDarkModeVariables(): void {
    const existing = document.getElementById("dark-mode-variables");
    if (existing) existing.remove();
  }

  private getDarkModeVariablesCSS(variant: StyleVariant): string {
    const isDark = document.documentElement.classList.contains("dark");
    if (!isDark) return "";

    const vars: Record<StyleVariant, string> = {
      "material-design-v3": `
:root {
  --accent: #d0bcff;
  --accent-hover: #b69df8;
  --text-on-accent: #381e72;
  --text-primary: #e6e1e5;
  --text-secondary: #cac4d0;
  --text-muted: #938f99;
  --text-on-error: #f2b8b5;
  --text-on-warning: #3e2723;
  --text-on-success: #1b4332;
  --bg-elevated: #2b2930;
  --border-color: #49454f;
  --error: #f2b8b5;
  --success: #6ee7b7;
  --warning: #ffab40;
  --bg-primary: #1c1b1f;
  --bg-secondary: #2b2930;
  --bg-tertiary: #49454f;
  --border-subtle: #49454f;
  --info: #82b1ff;
  --bg-hover: rgba(187, 184, 201, 0.08);
  --bg-header: #1c1b1f;
}`,
      neumorphism: `
:root {
  --accent: #a78bfa;
  --accent-hover: #8b7cf7;
  --text-on-accent: #1e1b2e;
  --text-primary: #e2e8f0;
  --text-secondary: #94a3b8;
  --text-muted: #64748b;
  --text-on-error: #1e1b2e;
  --text-on-warning: #1a1a2e;
  --text-on-success: #1a1a2e;
  --bg-elevated: #2d3748;
  --border-color: #4a5568;
  --error: #fc8181;
  --success: #68d391;
  --warning: #ffb74d;
  --bg-primary: #1a202c;
  --bg-secondary: #1e2533;
  --bg-tertiary: #171923;
  --border-subtle: #4a5568;
  --info: #4299e1;
  --bg-hover: #3d4758;
  --bg-header: #2d3748;
}`,
      claymorphism: `
:root {
  --accent: #a78bfa;
  --accent-hover: #8b7cf7;
  --text-on-accent: #1e1b2e;
  --text-primary: #e2e8f0;
  --text-secondary: #94a3b8;
  --text-muted: #64748b;
  --text-on-error: #1e1b2e;
  --text-on-warning: #1a1a2e;
  --text-on-success: #1a1a2e;
  --bg-elevated: #2d3748;
  --border-color: #4a5568;
  --error: #fc8181;
  --success: #68d391;
  --warning: #ffb74d;
  --bg-primary: #1a202c;
  --bg-secondary: #1e2533;
  --bg-tertiary: #171923;
  --border-subtle: #4a5568;
  --info: #4299e1;
  --bg-hover: #3d4758;
  --bg-header: #2d3748;
}`,
      glassmorphism: `
:root {
  --accent: rgba(167, 139, 250, 0.8);
  --accent-hover: rgba(187, 159, 250, 0.9);
  --text-on-accent: #1e1b2e;
  --text-primary: #e2e8f0;
  --text-secondary: #94a3b8;
  --text-muted: #64748b;
  --text-on-error: #fce4ec;
  --text-on-warning: #1a1a2e;
  --text-on-success: #1a1a2e;
  --bg-elevated: rgba(30, 30, 50, 0.7);
  --border-color: rgba(255, 255, 255, 0.15);
  --error: #ff6b6b;
  --success: #51cf66;
  --warning: #ffb74d;
  --bg-primary: rgba(15, 15, 30, 0.9);
  --bg-secondary: rgba(25, 25, 45, 0.75);
  --bg-tertiary: rgba(10, 10, 20, 0.95);
  --border-subtle: rgba(255, 255, 255, 0.15);
  --info: #4299e1;
  --bg-hover: rgba(50, 50, 80, 0.4);
  --bg-header: rgba(20, 20, 40, 0.8);
}`,
      brutalism: `
:root {
  --color-brut-base: #1a1a1a;
  --color-brut-ink: #f5f5f0;
  --color-brut-accent: #ff3b30;
  --color-brut-accent-2: #ffd60a;
  --color-brut-success: #00c853;
  --bg-primary: #1a1a1a;
  --bg-elevated: #2a2a2a;
  --bg-hover: #3a3a3a;
  --bg-tertiary: #404040;
  --text-primary: #f5f5f0;
  --text-secondary: #c0c0c0;
  --text-muted: #909090;
  --border-color: #f5f5f0;
  --accent: var(--color-brut-accent);
  --accent-hover: #d62b22;
  --text-on-accent: #ffffff;
  --text-on-error: #ffffff;
  --text-on-warning: #0a0a0a;
  --text-on-success: #ffffff;
  --error: var(--color-brut-accent);
  --warning: var(--color-brut-accent-2);
  --success: var(--color-brut-success);
}`,
      skeuomorphism: `
:root {
  --color-skeu-base: #2b1f14;
  --color-skeu-leather: #3a2a18;
  --color-skeu-leather-dark: #1a1009;
  --color-skeu-paper: #3a2e1f;
  --color-skeu-ink: #f5e6c8;
  --color-skeu-accent: #d4a017;
  --color-skeu-accent-dark: #b8860b;
  --bg-primary: #2b1f14;
  --bg-elevated: #3a2e1f;
  --bg-hover: #4a3e2f;
  --bg-tertiary: #5a4e3f;
  --text-primary: #f5e6c8;
  --text-secondary: #d4b890;
  --text-muted: #a8916b;
  --border-color: #1a1009;
  --accent: var(--color-skeu-accent);
  --accent-hover: var(--color-skeu-accent-dark);
  --text-on-accent: #faf3e0;
  --text-on-error: #fff5e6;
  --text-on-warning: #2b1810;
  --text-on-success: #f5e6c8;
  --error: #8b0000;
  --warning: #c47700;
  --success: #2d5016;
}`,
    };
    return vars[variant] ?? "";
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
      case "brutalism":
        return this.brutalismDarkCSS();
      case "skeuomorphism":
        return this.skeuomorphismDarkCSS();
      default:
        return "";
    }
  }

  private brutalismDarkCSS(): string {
    return `
:root {
  --color-brut-base: #1a1a1a;
  --color-brut-ink: #f5f5f0;
  --color-brut-accent: #ff3b30;
  --color-brut-accent-2: #ffd60a;
  --color-brut-success: #00e676;
  --color-brut-border: #f5f5f0;
  --shadow-brut-sm: 4px 4px 0 0 #f5f5f0;
  --shadow-brut-md: 6px 6px 0 0 #f5f5f0;
  --shadow-brut-lg: 8px 8px 0 0 #f5f5f0;
  --bg-primary: #1a1a1a;
  --bg-elevated: #2a2a2a;
  --bg-hover: #3a3a3a;
  --bg-tertiary: #404040;
  --text-primary: #f5f5f0;
  --text-secondary: #c0c0c0;
  --text-muted: #909090;
  --text-on-accent: #ffffff;
  --text-on-error: #ffffff;
  --text-on-warning: #0a0a0a;
  --text-on-success: #ffffff;
  --border-color: #f5f5f0;
  --border-subtle: #c0c0c0;
  --accent: #ff3b30;
  --accent-hover: #d62b22;
  --error: #ff3b30;
  --warning: #ffd60a;
  --success: #00e676;
  --info: #60a5fa;
}

.dark .brut-card {
  background: #2a2a2a;
  border-color: #f5f5f0;
  color: #f5f5f0;
}
.dark .brut-btn {
  background: #2a2a2a;
  border-color: #f5f5f0;
  color: #f5f5f0;
}
.dark .brut-btn:hover { background: #3a3a3a; }
.dark .brut-btn-primary { background: #ff3b30; color: #ffffff; border-color: #f5f5f0; }
.dark .brut-btn-sm {
  background: #2a2a2a;
  border-color: #f5f5f0;
  color: #f5f5f0;
}
.dark .brut-btn-lg {
  background: #2a2a2a;
  border-color: #f5f5f0;
  color: #f5f5f0;
}
.dark .brut-input {
  background: #2a2a2a;
  border-color: #f5f5f0;
  color: #f5f5f0;
}
.dark .brut-input:focus { background: #3a3a3a; outline: none; }
.dark .brut-modal {
  background: #2a2a2a;
  border-color: #f5f5f0;
  color: #f5f5f0;
}
.dark .brut-chip { background: #ffd60a; color: #0a0a0a; border-color: #f5f5f0; }
.dark .brut-badge { background: #ff3b30; color: #ffffff; border-color: #f5f5f0; }
.dark .brut-tabs { border-bottom-color: #f5f5f0; }
.dark .brut-tab { background: #2a2a2a; border-color: #f5f5f0; color: #f5f5f0; }
.dark .brut-tab.active { background: #ff3b30; color: #ffffff; }
.dark .brut-divider { background: #f5f5f0; }
.dark .brut-spinner { border-color: #f5f5f0; border-top-color: #ff3b30; }

/* Layout components dark mode */
.dark .brut-data-table { background: #2a2a2a; border-color: #f5f5f0; box-shadow: 6px 6px 0 0 #f5f5f0; }
.dark .brut-sidebar { background: #2a2a2a; border-right-color: #f5f5f0; }
.dark .brut-header, .dark .brut-footer { background: #2a2a2a; border-bottom-color: #f5f5f0; color: #f5f5f0; }
.dark .brut-page-container { background: #1a1a1a; }
.dark .brut-panel { background: #2a2a2a; border-color: #f5f5f0; box-shadow: 6px 6px 0 0 #f5f5f0; color: #f5f5f0; }
.dark .brut-segment-selector { background: #2a2a2a; border-color: #f5f5f0; }
.dark .brut-split-view { background: #1a1a1a; }
.dark .brut-stats-card { background: #2a2a2a; border-color: #f5f5f0; box-shadow: 8px 8px 0 0 #f5f5f0; color: #f5f5f0; }
.dark .brut-table { background: #2a2a2a; border-color: #f5f5f0; }
.dark .brut-tree { background: #2a2a2a; color: #f5f5f0; }
.dark .brut-canvas { background: #1a1a1a; border-color: #f5f5f0; color: #f5f5f0; }
.dark .brut-main-editor { background: #1a1a1a; color: #f5f5f0; }
.dark .brut-canvas-toolbar, .dark .brut-page-toolbar { background: #2a2a2a; border-bottom-color: #f5f5f0; color: #f5f5f0; }
.dark .brut-command-palette { background: #2a2a2a; border-color: #f5f5f0; box-shadow: 8px 8px 0 0 #f5f5f0; color: #f5f5f0; }
.dark .brut-component-palette { background: #2a2a2a; border-color: #f5f5f0; box-shadow: 6px 6px 0 0 #f5f5f0; }
.dark .brut-locale-switcher { background: #2a2a2a; border-color: #f5f5f0; }
.dark .brut-json-view { background: #2a2a2a; border-color: #f5f5f0; color: #f5f5f0; }
.dark .brut-form { background: #2a2a2a; border-color: #f5f5f0; color: #f5f5f0; }
.dark .brut-properties-panel { background: #2a2a2a; border-color: #f5f5f0; box-shadow: 6px 6px 0 0 #f5f5f0; }
.dark .brut-bottom-panel { background: #2a2a2a; border-top-color: #f5f5f0; color: #f5f5f0; }
.dark .brut-designer-tree { background: #2a2a2a; border-color: #f5f5f0; color: #f5f5f0; }
.dark .brut-designer-sidebar { background: #2a2a2a; border-right-color: #f5f5f0; }
.dark .brut-block { background: #2a2a2a; border-color: #f5f5f0; box-shadow: 6px 6px 0 0 #f5f5f0; color: #f5f5f0; }
`;
  }

  private skeuomorphismDarkCSS(): string {
    return `
:root {
  --color-skeu-base: #2b1f14;
  --color-skeu-leather: #3a2a18;
  --color-skeu-leather-dark: #1a1009;
  --color-skeu-paper: #3a2e1f;
  --color-skeu-ink: #f5e6c8;
  --color-skeu-accent: #d4a017;
  --color-skeu-accent-dark: #b8860b;
  --color-skeu-cream: #faf3e0;
  --gradient-leather: linear-gradient(180deg, #3a2a18 0%, #1a1009 100%);
  --gradient-paper: linear-gradient(180deg, #3a2e1f 0%, #2b2218 100%);
  --gradient-paper-light: linear-gradient(180deg, #3a2e1f 0%, #2b2218 100%);
  --gradient-input: linear-gradient(180deg, #4a3e2f 0%, #3a3025 100%);
  --gradient-tab: linear-gradient(180deg, #4a3a28 0%, #2d2015 100%);
  --gradient-accent: linear-gradient(180deg, #d4a017 0%, #8b6508 100%);
  --gradient-divider: linear-gradient(90deg, transparent 0%, #1a1009 50%, transparent 100%);
  --shadow-skeu-outset:
    0 1px 0 rgba(255,255,255,0.1) inset,
    0 2px 4px rgba(0,0,0,0.4),
    0 4px 8px rgba(0,0,0,0.3),
    0 8px 16px rgba(0,0,0,0.2);
  --shadow-skeu-inset:
    inset 0 2px 4px rgba(0,0,0,0.5),
    inset 0 4px 8px rgba(0,0,0,0.4);
  --bg-primary: #2b1f14;
  --bg-elevated: #3a2e1f;
  --bg-hover: #4a3e2f;
  --bg-tertiary: #5a4e3f;
  --text-primary: #f5e6c8;
  --text-secondary: #d4b890;
  --text-muted: #a8916b;
  --text-on-accent: #faf3e0;
  --text-on-error: #fff5e6;
  --text-on-warning: #2b1810;
  --text-on-success: #f5e6c8;
  --border-color: #1a1009;
  --border-subtle: #4a2e18;
  --accent: #d4a017;
  --accent-hover: #8b6508;
  --error: #ff6b6b;
  --warning: #ffd60a;
  --success: #4ade80;
  --info: #60a5fa;
}

.dark .skeu-card {
  background: linear-gradient(180deg, #3a2a18 0%, #1a1009 100%);
  border-color: #1a1009;
  color: #f5e6c8;
}
.dark .skeu-card.paper {
  background: linear-gradient(180deg, #3a2e1f 0%, #2b2218 100%);
  color: #f5e6c8;
  border-color: #5a4e3f;
}
.dark .skeu-btn {
  background: linear-gradient(180deg, #4a3a28 0%, #1a1009 100%);
  border-color: #1a1009;
  color: #f5e6c8;
}
.dark .skeu-btn:hover { filter: brightness(1.15); }
.dark .skeu-btn-primary {
  background: linear-gradient(180deg, #d4a017 0%, #8b6508 100%);
  color: #f5e6c8;
}
.dark .skeu-input {
  background: linear-gradient(180deg, #4a3e2f 0%, #3a3025 100%);
  border-color: #1a1009;
  color: #f5e6c8;
}
.dark .skeu-modal {
  background: linear-gradient(180deg, #3a2e1f 0%, #2b2218 100%);
  border-color: #1a1009;
  color: #f5e6c8;
}
.dark .skeu-chip {
  background: linear-gradient(180deg, #4a3a28 0%, #1a1009 100%);
  border-color: #1a1009;
  color: #f5e6c8;
}
.dark .skeu-badge {
  background: linear-gradient(180deg, #d4a017 0%, #8b6508 100%);
  color: #f5e6c8;
}
.dark .skeu-tab {
  background: linear-gradient(180deg, #4a3a28 0%, #2d2015 100%);
  color: #f5e6c8;
  border-color: #1a1009;
}
.dark .skeu-tab.active {
  background: linear-gradient(180deg, #3a2e1f 0%, #2b2218 100%);
  color: #f5e6c8;
}
.dark .skeu-divider { background: linear-gradient(90deg, transparent 0%, #1a1009 50%, transparent 100%); }
.dark .skeu-spinner { border-color: #1a1009; border-top-color: #d4a017; }

/* Layout components dark mode */
.dark .skeu-data-table { background: linear-gradient(180deg, #3a2a18 0%, #1a1009 100%); border-color: #1a1009; }
.dark .skeu-sidebar { background: linear-gradient(180deg, #3a2a18 0%, #1a1009 100%); border-right-color: #1a1009; }
.dark .skeu-header, .dark .skeu-footer { background: linear-gradient(180deg, #3a2e1f 0%, #2b2218 100%); border-bottom-color: #1a1009; color: #f5e6c8; }
.dark .skeu-page-container { background: #2b1f14; }
.dark .skeu-panel { background: linear-gradient(180deg, #3a2e1f 0%, #2b2218 100%); border-color: #1a1009; color: #f5e6c8; }
.dark .skeu-segment-selector { background: linear-gradient(180deg, #3a2a18 0%, #1a1009 100%); border-color: #1a1009; }
.dark .skeu-split-view { background: #2b1f14; }
.dark .skeu-stats-card { background: linear-gradient(180deg, #3a2e1f 0%, #2b2218 100%); border-color: #1a1009; color: #f5e6c8; }
.dark .skeu-table { background: linear-gradient(180deg, #3a2e1f 0%, #2b2218 100%); border-color: #1a1009; }
.dark .skeu-tree { background: #3a2e1f; color: #f5e6c8; }
.dark .skeu-canvas { background: #2b1f14; border-color: #1a1009; color: #f5e6c8; }
.dark .skeu-main-editor { background: #2b1f14; color: #f5e6c8; }
.dark .skeu-canvas-toolbar, .dark .skeu-page-toolbar { background: linear-gradient(180deg, #3a2a18 0%, #1a1009 100%); border-bottom-color: #1a1009; color: #f5e6c8; }
.dark .skeu-command-palette { background: linear-gradient(180deg, #3a2e1f 0%, #2b2218 100%); border-color: #1a1009; color: #f5e6c8; }
.dark .skeu-component-palette { background: linear-gradient(180deg, #3a2a18 0%, #1a1009 100%); border-color: #1a1009; }
.dark .skeu-locale-switcher { background: linear-gradient(180deg, #3a2a18 0%, #1a1009 100%); border-color: #1a1009; color: #f5e6c8; }
.dark .skeu-json-view { background: linear-gradient(180deg, #4a3e2f 0%, #3a3025 100%); border-color: #1a1009; color: #f5e6c8; }
.dark .skeu-form { background: #3a2e1f; border-color: #1a1009; color: #f5e6c8; }
.dark .skeu-properties-panel { background: linear-gradient(180deg, #3a2a18 0%, #1a1009 100%); border-color: #1a1009; }
.dark .skeu-bottom-panel { background: #2b1f14; border-top-color: #1a1009; color: #f5e6c8; }
.dark .skeu-designer-tree { background: #3a2e1f; border-color: #1a1009; color: #f5e6c8; }
.dark .skeu-designer-sidebar { background: linear-gradient(180deg, #3a2a18 0%, #1a1009 100%); border-right-color: #1a1009; }
.dark .skeu-block { background: linear-gradient(180deg, #3a2e1f 0%, #2b2218 100%); border-color: #1a1009; color: #f5e6c8; }
`;
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
