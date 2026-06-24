import { Injectable, signal } from "@angular/core";

export interface GridPosition {
  column: number;
  row: number;
  colSpan?: number;
  rowSpan?: number;
}

export interface ComponentDef {
  id: string;
  name: string;
  selector: string;
  packageType: string;
  category: string;
  props: Record<string, unknown>;
  template?: string;
  css?: string;
}

export interface Layout {
  id: string;
  type: "grid" | "flex" | "stack";
  direction?: "row" | "column";
  gap?: number;
  class?: string;
  style?: Record<string, string>;
  positions?: GridPosition[];
  children?: string[];
}

export interface Page {
  id: string;
  name: string;
  layouts: Layout[];
  components: ComponentDef[];
}

@Injectable({ providedIn: "root" })
export class SchemaRendererService {
  private _pages = signal<Page[]>([]);
  private _currentPageId = signal<string | null>(null);
  private _componentRegistry = signal<Map<string, ComponentDef>>(new Map());

  pages = this._pages.asReadonly();
  currentPageId = this._currentPageId.asReadonly();

  registerComponent(def: ComponentDef): void {
    const registry = new Map(this._componentRegistry());
    registry.set(def.selector, def);
    this._componentRegistry.set(registry);
  }

  registerComponents(defs: ComponentDef[]): void {
    for (const def of defs) {
      this.registerComponent(def);
    }
  }

  getComponent(selector: string): ComponentDef | undefined {
    return this._componentRegistry().get(selector);
  }

  loadSchema(schema: { pages: Page[] }): void {
    this._pages.set(schema.pages || []);
    const allComponents: ComponentDef[] = [];
    for (const page of schema.pages || []) {
      allComponents.push(...page.components);
    }
    const registry = new Map<string, ComponentDef>();
    for (const comp of allComponents) {
      registry.set(comp.selector, comp);
    }
    this._componentRegistry.set(registry);
  }

  getCurrentPage(): Page | null {
    const id = this._currentPageId();
    if (!id) return null;
    return this._pages().find((p) => p.id === id) || null;
  }

  setCurrentPage(pageId: string): void {
    this._currentPageId.set(pageId);
  }

  resolveGridPosition(layoutId: string, componentId: string): GridPosition | null {
    const page = this.getCurrentPage();
    if (!page) return null;

    const layout = page.layouts.find((l) => l.id === layoutId);
    if (!layout || !layout.positions) return null;

    const pos = layout.positions.find((p) => p[componentId as keyof GridPosition] !== undefined);
    if (!pos) return null;

    const position = pos as unknown as GridPosition;
    return {
      column: position.column || 1,
      row: position.row || 1,
      colSpan: position.colSpan || 1,
      rowSpan: position.rowSpan || 1,
    };
  }

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

  resolveProps(componentId: string): Record<string, unknown> {
    const page = this.getCurrentPage();
    if (!page) return {};

    const component = page.components.find((c) => c.id === componentId);
    return component?.props || {};
  }

  generatePage(pageId: string): { layouts: Layout[]; components: ComponentDef[] } {
    const page = this._pages().find((p) => p.id === pageId);
    if (!page) return { layouts: [], components: [] };

    return {
      layouts: page.layouts,
      components: page.components,
    };
  }
}
