import { Injectable, inject } from "@angular/core";
import { Layout, GridPosition } from "../types";
import { ThemeService } from "../theme/theme.service";

export interface GridTemplate {
  columns: string[];
  rows: string[];
  gap: string;
}

@Injectable({ providedIn: "root" })
export class LayoutEngineService {
  private themeService = inject(ThemeService, { optional: true });

  resolveClass(layout: Layout): string {
    if (layout.class) return layout.class;

    const classes: string[] = [];
    if (layout.type === "grid") {
      classes.push("grid");
      if (layout.direction === "row") classes.push("grid-flow-col");
      else classes.push("grid-flow-row");
      if (layout.gap) classes.push(`gap-${layout.gap}`);
      if (layout.rowGap) classes.push(`gap-y-${layout.rowGap}`);
      if (layout.colGap) classes.push(`gap-x-${layout.colGap}`);
      if (layout.alignItems) {
        const map: Record<string, string> = {
          start: "items-start", center: "items-center", end: "items-end",
          stretch: "items-stretch", baseline: "items-baseline",
        };
        if (map[layout.alignItems]) classes.push(map[layout.alignItems]);
      }
      if (layout.justifyItems) {
        const map: Record<string, string> = {
          start: "justify-items-start", center: "justify-items-center",
          end: "justify-items-end", stretch: "justify-items-stretch",
        };
        if (map[layout.justifyItems]) classes.push(map[layout.justifyItems]);
      }
    } else if (layout.type === "flex") {
      classes.push("flex");
      if (layout.direction === "column") classes.push("flex-col");
      else classes.push("flex-row");
      if (layout.gap) classes.push(`gap-${layout.gap}`);
      if (layout.rowGap) classes.push(`gap-y-${layout.rowGap}`);
      if (layout.colGap) classes.push(`gap-x-${layout.colGap}`);
      if (layout.flexWrap === "wrap") classes.push("flex-wrap");
      else if (layout.flexWrap === "nowrap") classes.push("flex-nowrap");
      else if (layout.flexWrap === "wrap-reverse") classes.push("flex-wrap-reverse");
      if (layout.flexGrow === true) classes.push("flex-grow");
      else if (layout.flexGrow === false) classes.push("flex-grow-0");
      if (layout.flexShrink === true) classes.push("flex-shrink");
      else if (layout.flexShrink === false) classes.push("flex-shrink-0");
      if (layout.alignItems) {
        const map: Record<string, string> = {
          start: "items-start", center: "items-center", end: "items-end",
          stretch: "items-stretch", baseline: "items-baseline",
        };
        if (map[layout.alignItems]) classes.push(map[layout.alignItems]);
      }
      if (layout.alignContent) {
        const map: Record<string, string> = {
          start: "content-start", center: "content-center", end: "content-end",
          between: "content-between", around: "content-around", evenly: "content-evenly",
        };
        if (map[layout.alignContent]) classes.push(map[layout.alignContent]);
      }
    } else if (layout.type === "stack") {
      classes.push("flex");
      classes.push("flex-col");
      if (layout.gap) classes.push(`gap-${layout.gap}`);
      if (layout.rowGap) classes.push(`gap-y-${layout.rowGap}`);
    }

    // Common sizing
    if (layout.width === "full") classes.push("w-full");
    else if (layout.width === "auto") classes.push("w-auto");
    if (layout.height === "full") classes.push("h-full");
    else if (layout.height === "auto") classes.push("h-auto");

    // Margin X (auto for centering)
    if (layout.marginX === "auto") classes.push("mx-auto");

    return classes.join(" ");
  }

  /**
   * Applies theme CSS custom properties to a layout container element.
   * Uses ThemeService to get the current accent color and computed shades,
   * then sets them as inline CSS variables on the container.
   */
  applyThemeVariables(container: HTMLElement): void {
    if (!this.themeService) return;

    const root = document.documentElement;
    const accent = this.themeService.accentColor();

    // Copy theme CSS variables from root to the container
    // This ensures layout containers have explicit theme values even if
    // they are inside shadow DOM or have custom styling contexts
    const themeVars = [
      "--text-primary",
      "--text-secondary",
      "--text-muted",
      "--bg-primary",
      "--bg-elevated",
      "--bg-hover",
      "--bg-tertiary",
      "--border-color",
      "--error",
      "--warning",
      "--success",
      "--info",
      "--accent",
    ];

    for (const varName of themeVars) {
      const value = root.style.getPropertyValue(varName);
      if (value) {
        container.style.setProperty(varName, value);
      }
    }

    // Apply accent shades if available
    const shades = this.themeService.accentShades();
    if (shades) {
      for (const [key, value] of Object.entries(shades)) {
        container.style.setProperty(`--accent-${key}`, value);
      }
    }
  }

  renderGridLayout(container: HTMLElement, layout: Layout): void {
    container.style.display = "grid";

    const layoutClasses = this.resolveClass(layout);
    if (layoutClasses) {
      container.className = layoutClasses;
    } else {
      const classes = ["grid"];
      if (layout.direction === "row") classes.push("grid-flow-col");
      else classes.push("grid-flow-row");
      if (layout.gap) classes.push(`gap-${layout.gap}`);
      container.className = classes.join(" ");
    }

    if (layout.gridTemplateColumns) {
      container.style.gridTemplateColumns = layout.gridTemplateColumns;
    }
    if (layout.gridTemplateRows) {
      container.style.gridTemplateRows = layout.gridTemplateRows;
    }

    this.applyThemeVariables(container);

    if (layout.style) {
      Object.assign(container.style, layout.style);
    }

    container.innerHTML = "";
  }

  renderFlexLayout(container: HTMLElement, layout: Layout): void {
    container.style.display = "flex";

    const layoutClasses = this.resolveClass(layout);
    if (layoutClasses) {
      container.className = layoutClasses;
    } else {
      const classes = ["flex"];
      if (layout.direction === "column") classes.push("flex-col");
      else classes.push("flex-row");
      if (layout.gap) classes.push(`gap-${layout.gap}`);
      container.className = classes.join(" ");
    }

    this.applyThemeVariables(container);

    if (layout.style) {
      Object.assign(container.style, layout.style);
    }

    container.innerHTML = "";
  }

  resolveGridPosition(
    layout: Layout | undefined,
    componentId: string,
  ): GridPosition | null {
    if (!layout || !layout.positions) return null;

    const pos = layout.positions.find(
      (p) => p[componentId as keyof GridPosition] !== undefined,
    );
    if (!pos) return null;

    const position = pos as unknown as GridPosition;
    return {
      column: position.column || 1,
      row: position.row || 1,
      colSpan: position.colSpan || 1,
      rowSpan: position.rowSpan || 1,
    };
  }

  resolveGridPositionFromPositions(
    positions: GridPosition[] | undefined,
    componentId: string,
  ): GridPosition | null {
    if (!positions) return null;

    const pos = positions.find(
      (p) => p[componentId as keyof GridPosition] !== undefined,
    );
    if (!pos) return null;

    const position = pos as unknown as GridPosition;
    return {
      column: position.column || 1,
      row: position.row || 1,
      colSpan: position.colSpan || 1,
      rowSpan: position.rowSpan || 1,
    };
  }

  calculateGridSpan(colSpan: number | undefined, rowSpan: number | undefined): {
    gridColumn: string;
    gridRow: string;
  } {
    return {
      gridColumn: `1 / span ${colSpan || 1}`,
      gridRow: `1 / span ${rowSpan || 1}`,
    };
  }

  applyLayoutStyles(
    container: HTMLElement,
    layout: Layout,
    children: string[],
    getComponentById: (id: string) => { selector: string } | undefined,
    resolvePosition: (layout: Layout, childId: string) => GridPosition | null,
  ): void {
    if (layout.children) {
      for (const childId of layout.children) {
        const component = getComponentById(childId);
        if (component) {
          const el = document.createElement(component.selector);
          const position = resolvePosition(layout, childId);
          if (position) {
            el.style.gridColumn = `${position.column} / span ${position.colSpan || 1}`;
            el.style.gridRow = `${position.row} / span ${position.rowSpan || 1}`;
          }
          container.appendChild(el);
        }
      }
    }
  }

  createGridTemplateString(columns: string[], rows: string[]): string {
    return {
      gridTemplateColumns: columns.join(" "),
      gridTemplateRows: rows.join(" "),
    } as unknown as string;
  }

  parseGridTemplate(template: GridTemplate): {
    gridTemplateColumns: string;
    gridTemplateRows: string;
    gap: string;
  } {
    return {
      gridTemplateColumns: template.columns.join(" "),
      gridTemplateRows: template.rows.join(" "),
      gap: template.gap,
    };
  }
}
