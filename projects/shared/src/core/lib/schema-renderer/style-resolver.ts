import { Injectable } from "@angular/core";
import type { Theme, ThemeColors } from "../types";

export interface ResolvedStyles {
  classes: string[];
  inlineStyles: Record<string, string>;
  cssVariables: Record<string, string>;
}

export interface StyleResolutionOptions {
  applyThemeVariables: boolean;
  prefix?: string;
}

@Injectable({ providedIn: "root" })
export class StyleResolver {
  private theme: Theme | null = null;
  private colorMode: "light" | "dark" | "system" = "system";

  setTheme(theme: Theme): void {
    this.theme = theme;
  }

  setColorMode(mode: "light" | "dark" | "system"): void {
    this.colorMode = mode;
  }

  extractStyles(classString: string): ResolvedStyles {
    const classes = this.parseClasses(classString);
    const inlineStyles: Record<string, string> = {};
    const cssVariables: Record<string, string> = {};

    const resolvedClasses: string[] = [];

    for (const cls of classes) {
      if (cls.startsWith("--")) {
        const [varName, value] = this.parseCssVariable(cls);
        cssVariables[varName] = value;
      } else {
        resolvedClasses.push(cls);
      }
    }

    if (this.theme) {
      const themeVars = this.resolveCssVariables({}, this.theme);
      Object.assign(cssVariables, themeVars);
    }

    return {
      classes: resolvedClasses,
      inlineStyles,
      cssVariables,
    };
  }

  resolveClasses(
    baseClasses: string,
    overrideClasses?: string,
    options?: StyleResolutionOptions,
  ): ResolvedStyles {
    const base = this.extractStyles(baseClasses);

    if (!overrideClasses) {
      return base;
    }

    const override = this.extractStyles(overrideClasses);

    const mergedClasses = this.mergeClassLists(base.classes, override.classes);
    const mergedStyles = { ...base.inlineStyles, ...override.inlineStyles };
    const mergedVars = { ...base.cssVariables, ...override.cssVariables };

    return {
      classes: options?.prefix
        ? mergedClasses.map((c) => `${options.prefix}${c}`)
        : mergedClasses,
      inlineStyles: mergedStyles,
      cssVariables: mergedVars,
    };
  }

  resolveCssVariables(
    css: Record<string, string>,
    theme?: Theme,
  ): Record<string, string> {
    const resolved: Record<string, string> = { ...css };

    if (theme) {
      if (theme.name) resolved["--theme-name"] = theme.name;
      if (theme.colors) this.applyThemeColors(resolved, theme.colors);
    }

    return resolved;
  }

  applyStylesToElement(element: HTMLElement, resolved: ResolvedStyles): void {
    element.className = "";
    if (resolved.classes.length > 0) {
      element.classList.add(...resolved.classes);
    }

    for (const [property, value] of Object.entries(resolved.inlineStyles)) {
      element.style.setProperty(property, value);
    }

    for (const [variable, value] of Object.entries(resolved.cssVariables)) {
      element.style.setProperty(variable, value);
    }
  }

  buildClassString(classes: string[], prefix?: string): string {
    const finalClasses = prefix
      ? classes.map((c) => (c.startsWith(prefix) ? c : `${prefix}${c}`))
      : classes;
    return finalClasses.join(" ");
  }

  private parseClasses(classString: string): string[] {
    if (!classString) return [];
    return classString.trim().split(/\s+/).filter(Boolean);
  }

  private parseCssVariable(varString: string): [string, string] {
    const match = varString.match(/^(--[^:]+):\s*(.+)$/);
    if (match) {
      return [match[1], match[2]];
    }
    return [varString, ""];
  }

  private mergeClassLists(base: string[], override: string[]): string[] {
    const result = [...base];
    const overrideSet = new Set(override);

    for (let i = 0; i < result.length; i++) {
      const baseClass = result[i];
      const baseBase = baseClass.split(":")[0];

      const overrideIdx = override.findIndex((oc) => {
        const ocBase = oc.split(":")[0];
        return ocBase === baseBase;
      });

      if (overrideIdx !== -1) {
        result[i] = override[overrideIdx];
        overrideSet.delete(override[overrideIdx]);
      }
    }

    for (const remaining of overrideSet) {
      result.push(remaining);
    }

    return result;
  }

  private applyThemeColors(
    dest: Record<string, string>,
    colors: ThemeColors,
  ): void {
    if (colors.bgPrimary) dest["--color-bg-primary"] = colors.bgPrimary;
    if (colors.bgSecondary) dest["--color-bg-secondary"] = colors.bgSecondary;
    if (colors.bgTertiary) dest["--color-bg-tertiary"] = colors.bgTertiary;
    if (colors.bgElevated) dest["--color-bg-elevated"] = colors.bgElevated;
    if (colors.bgHover) dest["--color-bg-hover"] = colors.bgHover;
    if (colors.textPrimary) dest["--color-text-primary"] = colors.textPrimary;
    if (colors.textSecondary)
      dest["--color-text-secondary"] = colors.textSecondary;
    if (colors.textMuted) dest["--color-text-muted"] = colors.textMuted;
    if (colors.border) dest["--color-border"] = colors.border;
    if (colors.borderLight) dest["--color-border-light"] = colors.borderLight;
    if (colors.primary) dest["--color-primary"] = colors.primary;
    if (colors.secondary) dest["--color-secondary"] = colors.secondary;
    if (colors.accent) dest["--color-accent"] = colors.accent;
    if (colors.accentHover) dest["--color-accent-hover"] = colors.accentHover;
    if (colors.success) dest["--color-success"] = colors.success;
    if (colors.warning) dest["--color-warning"] = colors.warning;
    if (colors.error) dest["--color-error"] = colors.error;
  }
}
