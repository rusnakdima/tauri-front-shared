import { Injectable } from "@angular/core";
import type { Theme, ThemeColors } from "../types";

export interface ResolvedStyles {
  classes: string[];
  inlineStyles: Record<string, string>;
  cssVariables: Record<string, string>;
}

export interface StyleResolutionOptions {
  applyThemeVariables: boolean;
  extractTailwind: boolean;
  prefix?: string;
}

@Injectable({ providedIn: "root" })
export class StyleResolver {
  private theme: Theme | null = null;
  private colorMode: "light" | "dark" | "system" = "system";

  private tailwindClassPattern =
    /^(?:w-|h-|p-|m-|mt-|mb-|ml-|mr-|px-|py-|pt-|pb-|pl-|pr-|gap-|space-|flex|grid|block|inline|hidden|static|relative|absolute|fixed|sticky|inset-|top-|right-|bottom-|left-|z-|text-|bg-|border-|rounded|shadow|opacity|font-|leading-|tracking-|whitespace|overflow|truncate|uppercase|lowercase|capitalize|normal-case|italic|oblique|underline|line-through|no-underline|resize|select|cursor|pointer|not-allowed|animate|transition|transform|rotate|scale|skew|origin|from-|to-|via-|gradient|animate-|duration-|ease-|delay-|repeat|reverse|ping-|pulse-|visible|invisible|opacity-|scale-|rotate-|translate-|skew-|ring-|outline-|appearance-|list-|backdrop-|placeholder-|fill-|stroke-|sr-)/;

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

    const tailwindClasses: string[] = [];
    const customClasses: string[] = [];

    for (const cls of classes) {
      if (this.isTailwindClass(cls)) {
        tailwindClasses.push(cls);
      } else if (cls.startsWith("--")) {
        const [varName, value] = this.parseCssVariable(cls);
        cssVariables[varName] = value;
      } else {
        customClasses.push(cls);
      }
    }

    if (this.theme) {
      const themeVars = this.resolveCssVariables({}, this.theme);
      Object.assign(cssVariables, themeVars);
    }

    return {
      classes: [...customClasses, ...tailwindClasses],
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
      resolved["--theme-name"] = theme.name;
      this.applyThemeColors(resolved, theme.colors);
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

  extractTailwindClasses(classString: string): string[] {
    const parsed = this.parseClasses(classString);
    return parsed.filter((cls) => this.isTailwindClass(cls));
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

  private isTailwindClass(className: string): boolean {
    if (!className) return false;
    if (this.tailwindClassPattern.test(className)) return true;
    if (className.includes(":")) {
      const [base] = className.split(":");
      return this.tailwindClassPattern.test(base);
    }
    return false;
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
    dest["--color-bg-primary"] = colors.bgPrimary;
    dest["--color-bg-secondary"] = colors.bgSecondary;
    dest["--color-bg-tertiary"] = colors.bgTertiary;
    dest["--color-bg-elevated"] = colors.bgElevated;
    dest["--color-bg-hover"] = colors.bgHover;
    dest["--color-text-primary"] = colors.textPrimary;
    dest["--color-text-secondary"] = colors.textSecondary;
    dest["--color-text-muted"] = colors.textMuted;
    dest["--color-border"] = colors.border;
    dest["--color-border-light"] = colors.borderLight;
    dest["--color-primary"] = colors.primary;
    dest["--color-secondary"] = colors.secondary;
    dest["--color-accent"] = colors.accent;
    dest["--color-accent-hover"] = colors.accentHover;
    dest["--color-success"] = colors.success;
    dest["--color-warning"] = colors.warning;
    dest["--color-error"] = colors.error;
  }
}
