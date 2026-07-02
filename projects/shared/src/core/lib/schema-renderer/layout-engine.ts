import { Layout, GridPosition } from "../types";

export interface GridTemplate {
  columns: string[];
  rows: string[];
  gap: string;
}

export class LayoutEngineService {
  resolveClass(layout: Layout): string {
    if (layout.class) return layout.class;

    const classes: string[] = [];
    if (layout.type === "grid") {
      classes.push("grid");
      if (layout.direction === "row") classes.push("grid-flow-col");
      else classes.push("grid-flow-row");
      if (layout.gap) classes.push(`gap-${layout.gap}`);
    } else if (layout.type === "flex") {
      classes.push("flex");
      if (layout.direction === "column") classes.push("flex-col");
      else classes.push("flex-row");
      if (layout.gap) classes.push(`gap-${layout.gap}`);
    } else if (layout.type === "stack") {
      classes.push("flex");
      classes.push("flex-col");
      if (layout.gap) classes.push(`gap-${layout.gap}`);
    }
    return classes.join(" ");
  }

  renderGridLayout(container: HTMLElement, layout: Layout): void {
    container.style.display = "grid";

    if (layout.class) {
      container.className = layout.class;
    } else {
      const classes = ["grid"];
      if (layout.direction === "row") classes.push("grid-flow-col");
      else classes.push("grid-flow-row");
      if (layout.gap) classes.push(`gap-${layout.gap}`);
      container.className = classes.join(" ");
    }

    if (layout.style) {
      Object.assign(container.style, layout.style);
    }

    container.innerHTML = "";
  }

  renderFlexLayout(container: HTMLElement, layout: Layout): void {
    container.style.display = "flex";

    if (layout.class) {
      container.className = layout.class;
    } else {
      const classes = ["flex"];
      if (layout.direction === "column") classes.push("flex-col");
      else classes.push("flex-row");
      if (layout.gap) classes.push(`gap-${layout.gap}`);
      container.className = classes.join(" ");
    }

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
