import { Injectable, signal } from "@angular/core";
import {
  GridPosition,
  ComponentDef,
  Layout,
  Page,
  LayoutElement,
  AppSchema,
  CanvasElement,
} from "../types";
import { SignalStoreService } from "../signal-store/signal-store.service";
import { EventBusService } from "../events/event-bus.service";
import { ComponentRegistryService } from "../component-registry.service";
import { DataBindingResolverService } from "./data-binding-resolver";
import { LayoutEngineService, GridTemplate } from "./layout-engine";
import { I18nService } from "../i18n/i18n.service";
import { logger } from "../../../utils/legacy/logger";
import {
  StyleVariant,
  getCurrentStyle,
  getComponentStyleClasses,
  GlobalStyleContext,
} from "../../../styles/style-registry";
import { mapPropsToClasses } from "./prop-mapper";
import { getNestedValue } from "../../../utils/object";

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

  constructor(
    private dataStore: SignalStoreService,
    private eventBus: EventBusService,
    private componentRegistry: ComponentRegistryService,
    private dataBindingResolver: DataBindingResolverService,
    private layoutEngine: LayoutEngineService,
    private i18n: I18nService,
  ) {}

  private componentResolver:
    ((selector: string) => ComponentDef | undefined) | null = null;
  private routeResolver: ((route: string) => string | null) | null = null;

  // Schema-level handlers and stores
  private _layoutRegions = signal<LayoutElement[]>([]);
  private _currentRoute = signal<string>("");

  pages = this._pages.asReadonly();
  currentPageId = this._currentPageId.asReadonly();
  layoutRegions = this._layoutRegions.asReadonly();

  registerComponent(def: ComponentDef): void {
    this.componentRegistry.registerComponent(def);
  }

  registerComponents(defs: ComponentDef[]): void {
    this.componentRegistry.registerComponents(defs);
  }

  getComponent(selector: string): ComponentDef | undefined {
    return this.componentRegistry.getComponent(selector);
  }

  loadSchema(
    schema:
      AppSchema | { pages: Page[]; app?: { variant?: string; size?: string } },
  ): void {
    logger.log(
      "[SchemaRenderer] loadSchema() called, pages:",
      schema?.pages?.length ?? 0,
    );
    // Support both AppSchema and legacy Page[] format
    const pages = schema.pages;
    this._pages.set(pages || []);
    this.componentRegistry.loadComponentsFromSchema(pages || []);

    // Extract app config
    const appConfig =
      "app" in schema
        ? schema.app
        : "app" in schema
          ? (schema as any).app
          : undefined;
    this._appConfig = {
      variant: appConfig?.variant,
      size: appConfig?.size,
    };

    // Initialize locale from schema settings
    const settings =
      appConfig && "settings" in appConfig
        ? (appConfig as any).settings
        : undefined;
    if (settings?.defaultLocale) {
      this.i18n.setLocale(settings.defaultLocale);
    }

    // Extract layout regions (AppSchema only)
    if ("layoutRegions" in schema && Array.isArray(schema.layoutRegions)) {
      this._layoutRegions.set(schema.layoutRegions);
    } else {
      this._layoutRegions.set([]);
    }

    // Extract stores (AppSchema only) and register in data store
    if ("stores" in schema && schema.stores) {
      for (const [key, value] of Object.entries(schema.stores)) {
        this.dataStore.set(key, value);
      }
    }
  }

  setCurrentRoute(route: string): void {
    this._currentRoute.set(route);
    this.dataBindingResolver.setParams({});
  }

  setParams(params: Record<string, string>): void {
    this.dataBindingResolver.setParams(params);
  }

  registerFunction(name: string, fn: Function): void {
    this.dataBindingResolver.registerFunction(name, fn);
  }

  registerFunctions(fns: Record<string, Function>): void {
    this.dataBindingResolver.registerFunctions(fns);
  }

  getLayoutRegions(): LayoutElement[] {
    return this._layoutRegions();
  }

  isElementVisible(element: {
    routes?: { include?: string[]; exclude?: string[] };
    visible?: boolean | { when?: string; equals?: unknown };
  }): boolean {
    const route = this._currentRoute();

    // Check explicit visible prop
    if (element.visible !== undefined) {
      if (typeof element.visible === "boolean") {
        return element.visible;
      }
      // visible: { when: "{{role}}", equals: "admin" }
      if (typeof element.visible === "object" && element.visible.when) {
        // Simple equality check for now
        const binding = element.visible.when;
        const expected = element.visible.equals;
        // TODO: Implement proper data binding resolution
        const current = this.dataBindingResolver.resolveProps(
          { value: binding },
          "",
        );
        return current["value"] === expected;
      }
    }

    // Check route visibility
    if (element.routes) {
      const { include, exclude } = element.routes;

      // If include is set and doesn't contain "*" or current route, hide
      if (
        include &&
        include.length > 0 &&
        !include.includes("*") &&
        !include.some((r) => route.match(new RegExp(r.replace("*", ".*"))))
      ) {
        return false;
      }

      // If exclude contains current route, hide
      if (
        exclude &&
        exclude.some((r) => route.match(new RegExp(r.replace("*", ".*"))))
      ) {
        return false;
      }
    }

    return true;
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

  async renderGridLayout(
    container: HTMLElement,
    layout: Layout,
  ): Promise<void> {
    this.layoutEngine.renderGridLayout(container, layout);
    await this.layoutEngine.applyLayoutStyles(
      container,
      layout,
      layout.children || [],
      (childId) =>
        this.getCurrentPage()?.components?.find((c) => c.id === childId),
      (l, childId) => this.layoutEngine.resolveGridPosition(l, childId),
    );
  }

  async renderFlexLayout(
    container: HTMLElement,
    layout: Layout,
  ): Promise<void> {
    this.layoutEngine.renderFlexLayout(container, layout);
    container.innerHTML = "";

    if (layout.children) {
      for (const childId of layout.children) {
        const component = this.getCurrentPage()?.components?.find(
          (c) => c.id === childId,
        );
        if (component) {
          const selector = component.selector;
          // Wait for custom element to be defined if it's a custom element
          if (selector.includes("-")) {
            try {
              await Promise.race([
                customElements.whenDefined(selector),
                new Promise((_, reject) =>
                  setTimeout(
                    () => reject(new Error(`Timeout: ${selector}`)),
                    2000,
                  ),
                ),
              ]);
            } catch (e) {
              logger.warn(`[SchemaRenderer] Element not ready: ${selector}`, e);
            }
          }
          const el = document.createElement(selector);
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

  /**
   * Resolves responsive grid position based on current window width.
   * Merges breakpoint overrides (sm, md, lg) into base position.
   */
  private resolveResponsiveGridPosition(pos: GridPosition): GridPosition {
    if (!pos.sm && !pos.md && !pos.lg) return pos;
    const width = window.innerWidth;
    if (width < 640 && pos.sm) return { ...pos, ...pos.sm };
    if (width < 1024 && pos.md) return { ...pos, ...pos.md };
    if (pos.lg) return { ...pos, ...pos.lg };
    return pos;
  }

  getComponentProps(componentId: string): Record<string, unknown> {
    const page = this.getCurrentPage();
    if (!page) return {};

    const component = (page.components ?? []).find((c) => c.id === componentId);
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
      components: page.components || [],
    };
  }

  setComponentResolver(
    resolver: (selector: string) => ComponentDef | undefined,
  ): void {
    this.componentResolver = resolver;
  }

  async createElement(data: CanvasElement): Promise<HTMLElement | null> {
    const selector = data.componentId;

    // Try to get component definition from registry
    const def = this.componentResolver
      ? this.componentResolver(selector)
      : this.getComponent(selector);

    // Determine final selector (use def.selector if available, otherwise use selector)
    const finalSelector = def?.selector ?? selector;

    // Wait for custom element to be defined if it's a custom element
    if (finalSelector.includes("-")) {
      try {
        await Promise.race([
          customElements.whenDefined(finalSelector),
          new Promise((_, reject) =>
            setTimeout(
              () => reject(new Error(`Timeout: ${finalSelector}`)),
              2000,
            ),
          ),
        ]);
      } catch (e) {
        logger.warn(`[SchemaRenderer] Element not ready: ${finalSelector}`, e);
      }
    }

    // Create the element
    const el = document.createElement(finalSelector);

    // Apply grid position
    if (data.gridPosition) {
      const resolved = this.resolveResponsiveGridPosition(data.gridPosition);
      el.style.gridColumn = `${resolved.column} / span ${resolved.colSpan || 1}`;
      el.style.gridRow = `${resolved.row} / span ${resolved.rowSpan || 1}`;
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
    const globalContext: GlobalStyleContext = {
      variant: this._appConfig.variant || theme,
      size: this._appConfig.size,
    };
    const explicitVariant = data.props?.["variant"] as string | undefined;
    const explicitSize = data.props?.["size"] as string | undefined;
    const mappedClasses = this.mapPropsToClasses(
      data.componentId,
      data.props ?? {},
      theme,
      explicitVariant,
      explicitSize,
      globalContext,
    );
    const mappedClassStr = mappedClasses.join(" ");

    const resolvedClasses = this.resolveClasses(
      data.classes ?? "",
      def?.defaultClasses || "",
    );
    const finalClasses = mappedClassStr
      ? this.resolveClasses(resolvedClasses, mappedClassStr)
      : resolvedClasses;
    // Use setAttribute instead of className for Lit shadow DOM compatibility
    if (finalClasses) {
      el.setAttribute("class", finalClasses);
    }

    // Merge default values, then def.props, then data.props (data.props wins)
    const mergedProps = {
      ...(data.defaults || {}),
      ...(def?.props || {}),
      ...data.props,
    };

    const resolvedProps = this.dataBindingResolver.resolveProps(
      mergedProps,
      data.id,
    );

    // Handle text / i18nKey / label props
    // i18nKey takes precedence over text, text takes precedence over label
    const i18nKey = resolvedProps["i18nKey"];
    const textValue = resolvedProps["text"];
    const labelValue = resolvedProps["label"];

    if (i18nKey !== undefined) {
      (el as any)["label"] = this.i18n.t(String(i18nKey));
    } else if (textValue !== undefined) {
      // Native HTML elements get textContent; custom elements get label property
      const isCustom = el.tagName.includes("-");
      if (isCustom) {
        (el as any)["label"] = String(textValue);
      } else {
        el.textContent = String(textValue);
      }
    } else if (labelValue !== undefined) {
      (el as any)["label"] = String(labelValue);
    }

    // Handle placeholder_i18n prop: resolve via I18nService and set as placeholder
    const placeholderI18n = resolvedProps["placeholder_i18n"];
    if (placeholderI18n !== undefined) {
      (el as any)["placeholder"] = this.i18n.t(String(placeholderI18n));
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
        // Use property assignment for component inputs
        // Skip props that don't exist as inputs to avoid NG0303 errors
        if ((el as any)[key] === undefined) {
          continue;
        }
        let finalValue: unknown = value;
        if (
          value !== null &&
          typeof value === "object" &&
          !Array.isArray(value)
        ) {
          finalValue = JSON.stringify(value);
        } else if (Array.isArray(value)) {
          finalValue = JSON.stringify(value);
        }
        try {
          (el as any)[key] = finalValue;
        } catch (e) {
          // Skip properties that can't be set
        }
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

  async render(
    container: HTMLElement,
    pageSchema: PageSchema,
    currentRoute?: string,
  ): Promise<void> {
    logger.log(
      `[SchemaRenderer] render() called: page="${pageSchema?.name}", elements=${pageSchema?.elements?.length ?? 0}, currentRoute="${currentRoute}"`,
    );
    container.innerHTML = "";

    // Update current route for visibility checks
    if (currentRoute) {
      this.setCurrentRoute(currentRoute);
    }

    if (pageSchema.gridTemplate) {
      const template = this.layoutEngine.parseGridTemplate(
        pageSchema.gridTemplate,
      );
      container.style.display = "grid";
      container.style.gridTemplateColumns = template.gridTemplateColumns;
      container.style.gridTemplateRows = template.gridTemplateRows;
      container.style.gap = template.gap;
    }

    // Render root elements with their nested children
    for (const element of pageSchema.elements) {
      if (this.isElementVisible(element)) {
        const el = await this.createElement(element);
        if (el) {
          // Recursively render nested children
          await this.renderNestedChildren(el, element);
          container.appendChild(el);
        }
      }
    }
  }

  private async renderNestedChildren(
    parent: HTMLElement,
    element: CanvasElement,
  ): Promise<void> {
    if (!element.children || element.children.length === 0) return;

    for (const child of element.children) {
      if (this.isElementVisible(child)) {
        const childEl = await this.createElement(child);
        if (childEl) {
          // Recursively render nested children
          await this.renderNestedChildren(childEl, child);
          parent.appendChild(childEl);
        }
      }
    }
  }

  // Render layout regions (header, footer, sidebar) to shell containers
  async renderLayoutRegion(
    container: HTMLElement,
    regionId: string,
    currentRoute?: string,
  ): Promise<void> {
    container.innerHTML = "";

    if (currentRoute) {
      this.setCurrentRoute(currentRoute);
    }

    const region = this._layoutRegions().find((r) => r.id === regionId);
    if (!region) {
      logger.warn(`Layout region not found: ${regionId}`);
      return;
    }

    // Check visibility
    if (!this.isElementVisible(region)) {
      container.style.display = "none";
      return;
    }

    // Create the region element
    const el = await this.createElement(region as unknown as CanvasElement);
    if (!el) return;

    // Render nested children directly
    if (region.children && region.children.length > 0) {
      for (const child of region.children) {
        if (this.isElementVisible(child as unknown as CanvasElement)) {
          const childEl = await this.createElement(
            child as unknown as CanvasElement,
          );
          if (childEl) {
            // Recursively render nested children
            await this.renderNestedChildren(
              childEl,
              child as unknown as CanvasElement,
            );
            el.appendChild(childEl);
          }
        }
      }
    }

    container.appendChild(el);
  }

  bindEvents(
    el: HTMLElement,
    events: Record<string, string | Function>,
    _elementId: string,
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
    return mapPropsToClasses(
      componentId,
      props,
      theme,
      explicitVariant,
      explicitSize,
      globalContext,
    );
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

  private getDataBindingValue(path: string): unknown {
    const parts = this.parseBindingPath(path);
    let current: unknown = this.dataStore.get(parts[0]);

    for (let i = 1; i < parts.length; i++) {
      if (current === null || current === undefined) return undefined;

      const part = parts[i];
      const arrayMatch = part.match(/^(\w+)\[(\d+)\]$/);

      if (arrayMatch) {
        const [, arrayKey, indexStr] = arrayMatch;
        const arr = getNestedValue(current, arrayKey);
        if (Array.isArray(arr)) {
          const index = parseInt(indexStr, 10);
          current = arr[index];
        } else {
          current = undefined;
        }
      } else {
        current = getNestedValue(current, part);
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
}
