import { Injectable } from "@angular/core";

export interface StyleResolution {
  classes: string;
  inlineStyles: Record<string, string>;
}

@Injectable({ providedIn: "root" })
export class StyleResolver {
  private readonly DARK_MODE_PREFIX = "dark:";
  private readonly RESPONSIVE_PREFIXES = ["sm:", "md:", "lg:", "xl:", "2xl:"];
  private readonly IMPORTANT_PREFIX = "!";

  resolveClasses(
    classes: string,
    options: {
      colorMode?: "light" | "dark" | "system";
      extraClasses?: string;
    } = {},
  ): StyleResolution {
    const { extraClasses = "" } = options;
    const allClasses = `${classes} ${extraClasses}`.trim();

    return {
      classes: this.processClasses(allClasses),
      inlineStyles: {},
    };
  }

  private processClasses(classes: string): string {
    const resolved: string[] = [];
    const classList = classes.split(/\s+/).filter(Boolean);

    for (const cls of classList) {
      const processed = this.processClass(cls);
      if (processed) {
        resolved.push(processed);
      }
    }

    return resolved.join(" ");
  }

  private processClass(cls: string): string {
    // Handle !important prefix (TailwindCSS v4)
    let important = false;
    let className = cls;

    if (className.startsWith(this.IMPORTANT_PREFIX)) {
      important = true;
      className = className.slice(1);
    }

    // If important, wrap in ! prefix (for TailwindCSS v4)
    // But also convert to proper format
    const result = important ? `!${className}` : className;
    return result;
  }

  resolveGridPosition(position: {
    column?: number | null;
    row?: number | null;
    colSpan?: number | null;
    rowSpan?: number | null;
    colStart?: number | null;
    rowStart?: number | null;
  }): string {
    const gridClasses: string[] = [];

    if (position.colStart != null) {
      gridClasses.push(`!col-start-${position.colStart}`);
    }
    if (position.rowStart != null) {
      gridClasses.push(`!row-start-${position.rowStart}`);
    }
    if (position.colSpan != null) {
      gridClasses.push(`!col-span-${position.colSpan}`);
    }
    if (position.rowSpan != null) {
      gridClasses.push(`!row-span-${position.rowSpan}`);
    }
    if (position.column != null) {
      gridClasses.push(`!col-${position.column}`);
    }
    if (position.row != null) {
      gridClasses.push(`!row-${position.row}`);
    }

    return gridClasses.join(" ");
  }

  composeClasses(...classGroups: (string | undefined | null)[]): string {
    return classGroups.filter(Boolean).join(" ");
  }

  getVariantClasses(baseClass: string, variant: string): string {
    return `${baseClass}-${variant}`;
  }

  resolveResponsiveClasses(
    classes: string,
    breakpoint: "sm" | "md" | "lg" | "xl" | "2xl",
  ): string {
    const classList = classes.split(/\s+/).filter(Boolean);
    const prefix = `${breakpoint}:`;

    return classList
      .map((cls) => {
        // If already has a responsive prefix, don't add another
        if (this.RESPONSIVE_PREFIXES.some((p) => cls.startsWith(p))) {
          return cls;
        }
        return `${prefix}${cls}`;
      })
      .join(" ");
  }

  resolveDarkModeClasses(classes: string): string {
    const classList = classes.split(/\s+/).filter(Boolean);

    return classList
      .map((cls) => {
        // If already has dark: prefix, return as-is
        if (cls.startsWith(this.DARK_MODE_PREFIX)) {
          return cls;
        }
        // If it's a color-related class, add dark: variant
        if (this.isColorClass(cls)) {
          return `${this.DARK_MODE_PREFIX}${cls}`;
        }
        return cls;
      })
      .join(" ");
  }

  private isColorClass(cls: string): boolean {
    const colorPrefixes = [
      "text-",
      "bg-",
      "border-",
      "fill-",
      "stroke-",
      "text-",
      "bg-",
      "ring-",
      "shadow-",
      "decoration-",
    ];
    return colorPrefixes.some((prefix) => cls.startsWith(prefix));
  }

  buildCssVariables(vars: Record<string, string>): string {
    return Object.entries(vars)
      .map(([k, v]) => `--${k}: ${v}`)
      .join("; ");
  }
}
