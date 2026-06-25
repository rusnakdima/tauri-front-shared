import { Injectable, signal, inject } from "@angular/core";
import { GridPosition, ComponentDef, Layout, Page } from '../types';
import { SignalStoreService } from '../signal-store/signal-store.service';

export interface CanvasElement {
  id: string;
  componentId: string;
  name: string;
  icon: string;
  position?: { x: number; y: number; width: number; height: number };
  gridPosition?: {
    column: number;
    row: number;
    colSpan?: number;
    rowSpan?: number;
  };
  props: Record<string, unknown>;
  classes: string;
  children: string[];
  zIndex: number;
  dataBinding?: { entity: string; field: string };
}

export interface GridTemplate {
  columns: string[];
  rows: string[];
  gap: string;
}

export interface PageSchema {
  id: string;
  name: string;
  elements: CanvasElement[];
  gridTemplate?: GridTemplate;
}

export interface ElementEvents {
  [eventName: string]: string | ((...args: unknown[]) => void);
}

export interface DataBinding {
  entity: string;
  field?: string;
  path?: string;
}

@Injectable({ providedIn: "root" })
export class SchemaRendererService {
  private _pages = signal<Page[]>([]);
  private _currentPageId = signal<string | null>(null);
  private _componentRegistry = signal<Map<string, ComponentDef>>(new Map());

  private dataStore = inject(SignalStoreService);
  private componentResolver: ((selector: string) => ComponentDef | undefined) | null = null;

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

  getComponentProps(componentId: string): Record<string, unknown> {
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

  setComponentResolver(resolver: (selector: string) => ComponentDef | undefined): void {
    this.componentResolver = resolver;
  }

  async createElement(data: CanvasElement): Promise<HTMLElement | null> {
    const def = this.componentResolver
      ? this.componentResolver(data.componentId)
      : this.getComponent(data.componentId);

    if (!def) {
      console.warn(`Component not found: ${data.componentId}`);
      return null;
    }

    await customElements.whenDefined(def.selector);
    const el = document.createElement(def.selector);

    if (data.gridPosition) {
      el.style.gridColumn = `${data.gridPosition.column} / span ${data.gridPosition.colSpan || 1}`;
      el.style.gridRow = `${data.gridPosition.row} / span ${data.gridPosition.rowSpan || 1}`;
    } else if (data.position) {
      el.style.position = "absolute";
      el.style.left = `${data.position.x}px`;
      el.style.top = `${data.position.y}px`;
      el.style.width = `${data.position.width}px`;
      el.style.height = `${data.position.height}px`;
    }

    if (data.zIndex) {
      el.style.zIndex = `${data.zIndex}`;
    }

    el.className = this.resolveClasses(data.classes, def.defaultClasses || "");

    const resolvedProps = this.resolveProps({
      ...def.props,
      ...data.props,
    }, data.id);

    for (const [key, value] of Object.entries(resolvedProps)) {
      if (key === "class" || key === "style" || key === "id") continue;

      if (key.startsWith("on") && typeof value === "function") {
        const eventName = key[2].toLowerCase() + key.slice(3);
        el.addEventListener(eventName, value as EventListener);
      } else {
        el.setAttribute(key, String(value));
      }
    }

    el.dataset["elementId"] = data.id;
    el.dataset["componentId"] = data.componentId;

    if (data.dataBinding) {
      el.dataset["dataEntity"] = data.dataBinding.entity;
      if (data.dataBinding.field) {
        el.dataset["dataField"] = data.dataBinding.field;
      }
    }

    return el;
  }

  async render(container: HTMLElement, pageSchema: PageSchema): Promise<void> {
    container.innerHTML = "";

    if (pageSchema.gridTemplate) {
      container.style.display = "grid";
      container.style.gridTemplateColumns = pageSchema.gridTemplate.columns.join(" ");
      container.style.gridTemplateRows = pageSchema.gridTemplate.rows.join(" ");
      container.style.gap = pageSchema.gridTemplate.gap;
    }

    for (const element of pageSchema.elements) {
      const el = await this.createElement(element);
      if (el) {
        container.appendChild(el);
      }
    }
  }

  bindEvents(el: HTMLElement, events: Record<string, string | Function>, elementId: string): void {
    for (const [eventName, handler] of Object.entries(events)) {
      if (typeof handler === "function") {
        el.addEventListener(eventName, handler as EventListener);
      } else if (typeof handler === "string") {
        const resolvedHandler = this.resolveDataBinding(handler);
        if (typeof resolvedHandler === "string" && resolvedHandler.startsWith("{{data.")) {
          const dataPath = resolvedHandler.replace(/\{\{|\}\}/g, "").replace("data.", "");
          const dataValue = this.getDataBindingValue(dataPath);
          if (typeof dataValue === "function") {
            el.addEventListener(eventName, dataValue as EventListener);
          }
        }
      }
    }
  }

  resolveClasses(elementClasses: string, defaultClasses: string): string {
    const classes = new Set<string>();

    if (defaultClasses) {
      defaultClasses.split(" ").forEach((c) => classes.add(c));
    }

    if (elementClasses) {
      elementClasses.split(" ").filter((c) => c.trim()).forEach((c) => classes.add(c));
    }

    return Array.from(classes).join(" ");
  }

  resolveProps(props: Record<string, unknown>, componentId: string): Record<string, unknown> {
    const resolved: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(props)) {
      resolved[key] = this.resolveDataBinding(value);
    }
    return resolved;
  }

  resolveDataBinding(binding: unknown): unknown {
    if (typeof binding !== "string") return binding;

    const pattern = /\{\{data\.([^}]+)\}\}/g;
    const result = binding.replace(pattern, (_, path) => {
      const value = this.getDataBindingValue(path);
      return value !== undefined ? String(value) : binding;
    });

    return result;
  }

  private getDataBindingValue(path: string): unknown {
    const parts = this.parseBindingPath(path);
    let current: unknown = this.dataStore.get(parts[0]);

    for (let i = 1; i < parts.length; i++) {
      if (current === null || current === undefined) return undefined;

      const part = parts[i];
      const arrayMatch = part.match(/^(\w+)\[(\d+)\]$/);

      if (arrayMatch) {
        const [, arrayKey, indexStr] = arrayMatch;
        const arr = this.getNestedValue(current, arrayKey);
        if (Array.isArray(arr)) {
          const index = parseInt(indexStr, 10);
          current = arr[index];
        } else {
          current = undefined;
        }
      } else {
        current = this.getNestedValue(current, part);
      }
    }

    return current;
  }

  private parseBindingPath(path: string): string[] {
    const result: string[] = [];
    const regex = /([^\.]+)\[(\d+)\]|([^\.\[\]]+)/g;
    let match;

    while ((match = regex.exec(path)) !== null) {
      if (match[1] && match[2]) {
        result.push(`${match[1]}[${match[2]}]`);
      } else if (match[3]) {
        result.push(match[3]);
      }
    }

    return result;
  }

  private getNestedValue(obj: unknown, key: string): unknown {
    if (obj === null || obj === undefined) return undefined;
    if (typeof obj !== "object") return undefined;
    return (obj as Record<string, unknown>)[key];
  }
}
