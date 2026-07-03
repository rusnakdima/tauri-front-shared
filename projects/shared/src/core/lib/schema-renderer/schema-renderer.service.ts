import { Injectable, signal, inject } from "@angular/core";
import { GridPosition, ComponentDef, Layout, Page } from "../types";
import { SignalStoreService } from "../signal-store/signal-store.service";
import { EventBusService } from "../events/event-bus.service";
import { CrudService } from "../crud/crud.service";
import { ComponentRegistryService } from "./component-registry";
import { DataBindingResolverService } from "./data-binding-resolver";
import { LayoutEngineService, GridTemplate } from "./layout-engine";
import { I18nService } from "../i18n/i18n.service";
import {
  StyleVariant,
  getStyleClassPrefix,
  getCurrentStyle,
  getComponentStyleClasses,
  GlobalStyleContext,
} from "../../../styles/style-registry";

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
  private _appConfig: { variant?: string; size?: string } = {};

  private componentRegistry: ComponentRegistryService;
  private dataBindingResolver: DataBindingResolverService;
  private layoutEngine: LayoutEngineService;

  private dataStore: SignalStoreService;
  private crudService: CrudService;
  private eventBus: EventBusService;

  private componentResolver:
    ((selector: string) => ComponentDef | undefined) | null = null;
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

  loadSchema(schema: {
    pages: Page[];
    app?: { variant?: string; size?: string };
  }): void {
    this._pages.set(schema.pages || []);
    this.componentRegistry.loadComponentsFromSchema(schema.pages || []);
    this._appConfig = {
      variant: schema.app?.variant,
      size: schema.app?.size,
    };
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
      (childId) =>
        this.getCurrentPage()?.components.find((c) => c.id === childId),
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

    // Only wait for custom elements (names with hyphens), not native HTML elements like div/span/p/footer
    // Wrap in Promise.race to prevent indefinite hang if component never loads
    if (def.selector.includes("-")) {
      try {
        await Promise.race([
          customElements.whenDefined(def.selector),
          new Promise((_, reject) =>
            setTimeout(
              () => reject(new Error(`Timeout: ${def.selector}`)),
              2000,
            ),
          ),
        ]);
      } catch (e) {
        console.warn(`[SchemaRenderer] Element not ready: ${def.selector}`, e);
      }
    }
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

    // Get mapped classes from props (variant, size, etc.)
    const theme = getCurrentStyle();
    const globalContext: GlobalStyleContext | undefined =
      this._appConfig.variant || this._appConfig.size
        ? { variant: this._appConfig.variant, size: this._appConfig.size }
        : undefined;
    const explicitVariant = data.props?.["variant"] as string | undefined;
    const explicitSize = data.props?.["size"] as string | undefined;
    const mappedClasses = this.mapPropsToClasses(
      data.componentId,
      data.props,
      theme,
      explicitVariant,
      explicitSize,
      globalContext,
    );
    const mappedClassStr = mappedClasses.join(" ");

    el.className = this.resolveClasses(data.classes, def.defaultClasses || "");
    if (mappedClassStr) {
      el.className = this.resolveClasses(el.className, mappedClassStr);
    }

    const resolvedProps = this.dataBindingResolver.resolveProps(
      {
        ...def.props,
        ...data.props,
      },
      data.id,
    );

    // Handle text / i18nKey prop for native HTML elements
    // i18nKey takes precedence over text
    const i18nKey = resolvedProps["i18nKey"];
    const textValue = resolvedProps["text"];

    if (i18nKey !== undefined) {
      const translated = I18nService.instance.t(String(i18nKey));
      if (!el.shadowRoot) {
        el.textContent = translated;
      } else {
        (el as any)["label"] = translated;
      }
    } else if (textValue !== undefined) {
      if (!el.shadowRoot) {
        el.textContent = String(textValue);
      } else {
        (el as any)["label"] = String(textValue);
      }
    }

    // Handle placeholder_i18n prop: resolve via I18nService and set as placeholder
    const placeholderI18n = resolvedProps["placeholder_i18n"];
    if (placeholderI18n !== undefined) {
      (el as any)["placeholder"] = I18nService.instance.t(
        String(placeholderI18n),
      );
    }

    for (const [key, value] of Object.entries(resolvedProps)) {
      if (
        key === "class" ||
        key === "style" ||
        key === "id" ||
        key === "label" ||
        key === "text" ||
        key === "i18nKey" ||
        key === "placeholder_i18n"
      )
        continue;

      if (key.startsWith("on") && typeof value === "function") {
        const eventName = key[2].toLowerCase() + key.slice(3);
        el.addEventListener(eventName, value as EventListener);
      } else if (
        key === "disabled" ||
        key === "checked" ||
        key === "readonly"
      ) {
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
              this.eventBus.emit(`${data.id}:${eventName}`, {
                elementId: data.id,
                event: e,
              });
            } else if (typeof h === "object" && h !== null && "handler" in h) {
              // Schema format: { handler: "onShortcutsOpen", params?: ... }
              this.eventBus.emit(`${data.id}:${h.handler}`, {
                elementId: data.id,
                event: e,
              });
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

    // 1. Create all elements and track them by ID
    const elementMap = new Map<string, HTMLElement>();
    for (const element of pageSchema.elements) {
      const el = await this.createElement(element);
      if (el) {
        elementMap.set(element.id, el);
      }
    }

    // 2. Collect all child IDs to identify root elements
    const childIds = new Set(
      pageSchema.elements.reduce<string[]>(
        (acc, e) => acc.concat(e.children || []),
        [],
      ),
    );

    // 3. Append children to parents, then append roots to container
    for (const element of pageSchema.elements) {
      const el = elementMap.get(element.id)!;
      if (!el) continue;

      // Append children to this element
      if (element.children) {
        for (const childId of element.children) {
          const childEl = elementMap.get(childId);
          if (childEl) {
            el.appendChild(childEl);
          }
        }
      }

      // Append root elements (not a child of anyone) to container
      if (!childIds.has(element.id)) {
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
        const resolvedHandler =
          this.dataBindingResolver.resolveDataBinding(handler);
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

  // Maps semantic props to theme CSS classes using global style registry
  // Supports:
  //   - styleName: named style lookup in componentStyles registry
  //   - layout: "flex" | "grid" → Tailwind flex/grid classes
  //   - direction: "row" | "col" → flex-direction
  //   - gap: "xs"|"sm"|"md"|"lg"|"xl" → gap spacing
  //   - align: "start"|"center"|"end"|"stretch" → align-items
  //   - justify: "start"|"center"|"end"|"between"|"around" → justify-content
  //   - padding: "none"|"xs"|"sm"|"md"|"lg"|"xl" → padding
  //   - marginTop|marginBottom: "none"|"xs"|"sm"|"md"|"lg"|"xl"
  //   - maxWidth: "sm"|"md"|"lg"|"xl"|"2xl"|... → max-width
  //   - mx: "auto" → mx-auto
  //   - fullHeight: true → h-full
  //   - rounded: true → rounded-lg
  //   - elevation: "low"|"medium"|"high" → elevation classes (theme-specific)
  mapPropsToClasses(
    componentId: string,
    props: Record<string, unknown>,
    theme: StyleVariant,
    explicitVariant?: string,
    explicitSize?: string,
    globalContext?: GlobalStyleContext,
  ): string[] {
    const classes: string[] = [];
    if (!props) return classes;

    // 1. Named style from variant/size (explicit props OR globalContext fallback)
    const hasStyle =
      explicitVariant ||
      explicitSize ||
      globalContext?.variant ||
      globalContext?.size;
    if (hasStyle) {
      const classesStr = getComponentStyleClasses(
        theme,
        componentId,
        explicitVariant,
        explicitSize,
        globalContext,
      );
      if (classesStr) {
        classes.push(...classesStr.split(" ").filter((c) => c.trim()));
      }
    }

    // 2. Layout type (flex/grid)
    const layout = props["layout"] as string | undefined;
    if (layout === "flex") classes.push("flex");
    else if (layout === "grid") classes.push("grid");
    else if (layout === "stack") classes.push("flex", "flex-col");

    // 3. Flex direction
    const direction = props["direction"] as string | undefined;
    if (direction === "row") classes.push("flex-row");
    else if (direction === "col") classes.push("flex-col");
    else if (direction === "row-reverse") classes.push("flex-row-reverse");
    else if (direction === "col-reverse") classes.push("flex-col-reverse");

    // 4. Gap spacing
    const gap = props["gap"] as string | undefined;
    if (gap === "xs") classes.push("gap-1");
    else if (gap === "sm") classes.push("gap-2");
    else if (gap === "md") classes.push("gap-4");
    else if (gap === "lg") classes.push("gap-6");
    else if (gap === "xl") classes.push("gap-8");

    // 5. Align items
    const align = props["align"] as string | undefined;
    if (align === "start") classes.push("items-start");
    else if (align === "center") classes.push("items-center");
    else if (align === "end") classes.push("items-end");
    else if (align === "stretch") classes.push("items-stretch");

    // 6. Justify content
    const justify = props["justify"] as string | undefined;
    if (justify === "start") classes.push("justify-start");
    else if (justify === "center") classes.push("justify-center");
    else if (justify === "end") classes.push("justify-end");
    else if (justify === "between") classes.push("justify-between");
    else if (justify === "around") classes.push("justify-around");

    // 7. Padding
    const padding = props["padding"] as string | undefined;
    if (padding === "xs") classes.push("p-1");
    else if (padding === "sm") classes.push("p-2");
    else if (padding === "md") classes.push("p-4");
    else if (padding === "lg") classes.push("p-6");
    else if (padding === "xl") classes.push("p-8");

    // 8. Margin top/bottom
    const marginTop = props["marginTop"] as string | undefined;
    if (marginTop === "xs") classes.push("mt-1");
    else if (marginTop === "sm") classes.push("mt-2");
    else if (marginTop === "md") classes.push("mt-4");
    else if (marginTop === "lg") classes.push("mt-6");
    else if (marginTop === "xl") classes.push("mt-8");

    const marginBottom = props["marginBottom"] as string | undefined;
    if (marginBottom === "xs") classes.push("mb-1");
    else if (marginBottom === "sm") classes.push("mb-2");
    else if (marginBottom === "md") classes.push("mb-4");
    else if (marginBottom === "lg") classes.push("mb-6");
    else if (marginBottom === "xl") classes.push("mb-8");

    // 9. Max width
    const maxWidth = props["maxWidth"] as string | undefined;
    if (maxWidth === "sm") classes.push("max-w-sm");
    else if (maxWidth === "md") classes.push("max-w-md");
    else if (maxWidth === "lg") classes.push("max-w-lg");
    else if (maxWidth === "xl") classes.push("max-w-xl");
    else if (maxWidth === "2xl") classes.push("max-w-2xl");
    else if (maxWidth === "6xl") classes.push("max-w-6xl");

    // 10. MX auto
    const mx = props["mx"] as string | undefined;
    if (mx === "auto") classes.push("mx-auto");

    // 11. Full height
    const fullHeight = props["fullHeight"] as boolean | undefined;
    if (fullHeight) classes.push("h-full");

    // 12. Rounded
    const rounded = props["rounded"] as boolean | undefined;
    if (rounded) classes.push("rounded-lg");

    // 13. Columns (grid)
    const columns = props["columns"] as string | undefined;
    if (columns) {
      // Support CSS grid column strings like "1fr auto 1fr"
      classes.push(`grid-cols-${columns.replace(/\s+/g, "-")}`);
    }

    return classes;
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
