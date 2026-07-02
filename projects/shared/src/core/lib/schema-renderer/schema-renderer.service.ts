import { Injectable, signal, inject } from "@angular/core";
import {
  GridPosition,
  ComponentDef,
  Layout,
  Page,
} from "../types";
import { SignalStoreService } from "../signal-store/signal-store.service";
import { EventBusService } from "../events/event-bus.service";
import { CrudService } from "../crud/crud.service";
import { ComponentRegistryService } from "./component-registry";
import { DataBindingResolverService } from "./data-binding-resolver";
import { LayoutEngineService, GridTemplate } from "./layout-engine";

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
  events?: Record<string, string>;
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

@Injectable({ providedIn: "root" })
export class SchemaRendererService {
  private _pages = signal<Page[]>([]);
  private _currentPageId = signal<string | null>(null);
  private _navigationStack = signal<string[]>([]);

  private componentRegistry: ComponentRegistryService;
  private dataBindingResolver: DataBindingResolverService;
  private layoutEngine: LayoutEngineService;

  private dataStore: SignalStoreService;
  private crudService: CrudService;
  private eventBus: EventBusService;

  private componentResolver:
    | ((selector: string) => ComponentDef | undefined)
    | null = null;
  private routeResolver: ((route: string) => string | null) | null = null;

  pages = this._pages.asReadonly();
  currentPageId = this._currentPageId.asReadonly();

  constructor() {
    this.dataStore = inject(SignalStoreService);
    this.crudService = inject(CrudService);
    this.eventBus = inject(EventBusService);
    this.componentRegistry = new ComponentRegistryService();
    this.dataBindingResolver = new DataBindingResolverService(
      this.dataStore,
      this.crudService,
    );
    this.layoutEngine = new LayoutEngineService();
  }

  registerComponent(def: ComponentDef): void {
    this.componentRegistry.registerComponent(def);
  }

  registerComponents(defs: ComponentDef[]): void {
    this.componentRegistry.registerComponents(defs);
  }

  getComponent(selector: string): ComponentDef | undefined {
    return this.componentRegistry.getComponent(selector);
  }

  loadSchema(schema: { pages: Page[] }): void {
    this._pages.set(schema.pages || []);
    this.componentRegistry.loadComponentsFromSchema(schema.pages || []);
  }

  getCurrentPage(): Page | null {
    const id = this._currentPageId();
    if (!id) return null;
    return this._pages().find((p) => p.id === id) || null;
  }

  setCurrentPage(pageId: string): void {
    this._currentPageId.set(pageId);
    const stack = [...this._navigationStack()];
    if (stack[stack.length - 1] !== pageId) {
      stack.push(pageId);
      this._navigationStack.set(stack);
    }
  }

  navigateToPage(route: string): void {
    const resolvedPageId = this.routeResolver
      ? this.routeResolver(route)
      : null;
    if (resolvedPageId) {
      this.setCurrentPage(resolvedPageId);
    }
  }

  getNavigationStack(): string[] {
    return [...this._navigationStack()];
  }

  setRouteResolver(resolver: (route: string) => string | null): void {
    this.routeResolver = resolver;
  }

  renderGridLayout(container: HTMLElement, layout: Layout): void {
    this.layoutEngine.renderGridLayout(container, layout);
    this.layoutEngine.applyLayoutStyles(
      container,
      layout,
      layout.children || [],
      (childId) => this.getCurrentPage()?.components.find((c) => c.id === childId),
      (l, childId) => this.layoutEngine.resolveGridPosition(l, childId),
    );
  }

  renderFlexLayout(container: HTMLElement, layout: Layout): void {
    this.layoutEngine.renderFlexLayout(container, layout);
    container.innerHTML = "";

    if (layout.children) {
      for (const childId of layout.children) {
        const component = this.getCurrentPage()?.components.find(
          (c) => c.id === childId,
        );
        if (component) {
          const el = document.createElement(component.selector);
          container.appendChild(el);
        }
      }
    }
  }

  async loadComponentModule(
    selector: string,
  ): Promise<CustomElementConstructor> {
    return this.componentRegistry.loadComponentModule(selector);
  }

  registerComponentModule(
    selector: string,
    module: Record<string, unknown>,
  ): void {
    this.componentRegistry.registerComponentModule(selector, module);
  }

  resolveGridPosition(
    layoutId: string,
    componentId: string,
  ): GridPosition | null {
    const page = this.getCurrentPage();
    if (!page) return null;

    const layout = page.layouts.find((l) => l.id === layoutId);
    return this.layoutEngine.resolveGridPosition(layout, componentId);
  }

  resolveClass(layout: Layout): string {
    return this.layoutEngine.resolveClass(layout);
  }

  getComponentProps(componentId: string): Record<string, unknown> {
    const page = this.getCurrentPage();
    if (!page) return {};

    const component = page.components.find((c) => c.id === componentId);
    return component?.props || {};
  }

  generatePage(pageId: string): {
    layouts: Layout[];
    components: ComponentDef[];
  } {
    const page = this._pages().find((p) => p.id === pageId);
    if (!page) return { layouts: [], components: [] };

    return {
      layouts: page.layouts,
      // Support both canvasElements (Designer) and components (generated apps)
      components: page.canvasElements || page.components || [],
    };
  }

  setComponentResolver(
    resolver: (selector: string) => ComponentDef | undefined,
  ): void {
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

    const resolvedProps = this.dataBindingResolver.resolveProps(
      {
        ...def.props,
        ...data.props,
      },
      data.id,
    );

    for (const [key, value] of Object.entries(resolvedProps)) {
      if (key === "class" || key === "style" || key === "id") continue;

      if (key.startsWith("on") && typeof value === "function") {
        const eventName = key[2].toLowerCase() + key.slice(3);
        el.addEventListener(eventName, value as EventListener);
      } else if (key === "disabled" || key === "checked" || key === "readonly") {
        // Boolean properties: set as property for Lit compatibility
        (el as any)[key] = value === true || value === "true" || value === key;
      } else {
        // For Lit web components, use property assignment instead of setAttribute
        // This properly triggers the component's property setter
        (el as any)[key] = value;
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

    if (data.events) {
      for (const [eventName, handlers] of Object.entries(data.events)) {
        el.addEventListener(eventName, (e: Event) => {
          // handlers can be string, function, or array of {handler, params?}
          const handlerList = Array.isArray(handlers) ? handlers : [handlers];
          for (const h of handlerList) {
            if (typeof h === "function") {
              this.eventBus.emit(eventName, { elementId: data.id, event: e });
            } else if (typeof h === "string") {
              // Emit a descriptive event name: "elementId:eventName"
              this.eventBus.emit(`${data.id}:${eventName}`, { elementId: data.id, event: e });
            } else if (typeof h === "object" && h !== null && "handler" in h) {
              // Schema format: { handler: "onShortcutsOpen", params?: ... }
              this.eventBus.emit(`${data.id}:${h.handler}`, { elementId: data.id, event: e });
            }
          }
        });
      }
    }

    return el;
  }

  async render(container: HTMLElement, pageSchema: PageSchema): Promise<void> {
    container.innerHTML = "";

    if (pageSchema.gridTemplate) {
      const template = this.layoutEngine.parseGridTemplate(
        pageSchema.gridTemplate,
      );
      container.style.display = "grid";
      container.style.gridTemplateColumns = template.gridTemplateColumns;
      container.style.gridTemplateRows = template.gridTemplateRows;
      container.style.gap = template.gap;
    }

    for (const element of pageSchema.elements) {
      const el = await this.createElement(element);
      if (el) {
        container.appendChild(el);
      }
    }
  }

  bindEvents(
    el: HTMLElement,
    events: Record<string, string | Function>,
    elementId: string,
  ): void {
    for (const [eventName, handler] of Object.entries(events)) {
      if (typeof handler === "function") {
        el.addEventListener(eventName, handler as EventListener);
      } else if (typeof handler === "string") {
        const resolvedHandler = this.dataBindingResolver.resolveDataBinding(
          handler,
        );
        if (
          typeof resolvedHandler === "string" &&
          resolvedHandler.startsWith("{{data.")
        ) {
          const dataPath = resolvedHandler
            .replace(/\{\{|\}\}/g, "")
            .replace("data.", "");
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
      elementClasses
        .split(" ")
        .filter((c) => c.trim())
        .forEach((c) => classes.add(c));
    }

    return Array.from(classes).join(" ");
  }

  resolveDataBinding(binding: unknown): unknown {
    return this.dataBindingResolver.resolveDataBinding(binding);
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
