import { Injectable, signal, inject } from "@angular/core";
import { GridPosition, ComponentDef, Layout, Page, LayoutElement, AppSchema, CanvasElement } from "../types";
import { SignalStoreService } from "../signal-store/signal-store.service";
import { EventBusService } from "../events/event-bus.service";
import { CrudService } from "../crud/crud.service";
import { ComponentRegistryService } from "../component-registry.service";
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

export type { CanvasElement } from "../types";

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

  private dataStore = inject(SignalStoreService);
  private crudService = inject(CrudService);
  private eventBus = inject(EventBusService);
  private componentRegistry = inject(ComponentRegistryService);
  private dataBindingResolver = inject(DataBindingResolverService);
  private layoutEngine = new LayoutEngineService();

  private componentResolver:
    ((selector: string) => ComponentDef | undefined) | null = null;
  private routeResolver: ((route: string) => string | null) | null = null;

  // Schema-level handlers and stores
  private _handlers: Record<string, unknown> = {};
  private _stores: Record<string, unknown> = {};
  private _layoutRegions: LayoutElement[] = [];
  private _currentRoute = signal<string>("");

  pages = this._pages.asReadonly();
  currentPageId = this._currentPageId.asReadonly();

  registerComponent(def: ComponentDef): void {
    this.componentRegistry.registerComponent(def);
  }

  registerComponents(defs: ComponentDef[]): void {
    this.componentRegistry.registerComponents(defs);
  }

  getComponent(selector: string): ComponentDef | undefined {
    return this.componentRegistry.getComponent(selector);
  }

  loadSchema(schema: AppSchema | { pages: Page[]; app?: { variant?: string; size?: string } }): void {
    // Support both AppSchema and legacy Page[] format
    const pages = schema.pages;
    this._pages.set(pages || []);
    this.componentRegistry.loadComponentsFromSchema(pages || []);

    // Extract app config
    const appConfig = 'app' in schema ? schema.app : ('app' in schema ? (schema as any).app : undefined);
    this._appConfig = {
      variant: appConfig?.variant,
      size: appConfig?.size,
    };

    // Extract layout regions (AppSchema only)
    if ('layoutRegions' in schema && Array.isArray(schema.layoutRegions)) {
      this._layoutRegions = schema.layoutRegions;
    } else {
      this._layoutRegions = [];
    }

    // Extract handlers (AppSchema only)
    if ('handlers' in schema && schema.handlers) {
      this._handlers = schema.handlers;
    }

    // Extract stores (AppSchema only)
    if ('stores' in schema && schema.stores) {
      this._stores = schema.stores;
      // Register stores in data store
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
    return this._layoutRegions;
  }

  isElementVisible(element: { routes?: { include?: string[]; exclude?: string[] }; visible?: boolean | { when?: string; equals?: unknown } }): boolean {
    const route = this._currentRoute();

    // Check explicit visible prop
    if (element.visible !== undefined) {
      if (typeof element.visible === 'boolean') {
        return element.visible;
      }
      // visible: { when: "{{role}}", equals: "admin" }
      if (typeof element.visible === 'object' && element.visible.when) {
        // Simple equality check for now
        const binding = element.visible.when;
        const expected = element.visible.equals;
        // TODO: Implement proper data binding resolution
        const current = this.dataBindingResolver.resolveProps({ value: binding }, '');
        return current['value'] === expected;
      }
    }

    // Check route visibility
    if (element.routes) {
      const { include, exclude } = element.routes;

      // If include is set and doesn't contain "*" or current route, hide
      if (include && include.length > 0 && !include.includes("*") && !include.some(r => route.match(new RegExp(r.replace('*', '.*'))))) {
        return false;
      }

      // If exclude contains current route, hide
      if (exclude && exclude.some(r => route.match(new RegExp(r.replace('*', '.*'))))) {
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
            setTimeout(() => reject(new Error(`Timeout: ${finalSelector}`)), 2000)
          ),
        ]);
      } catch (e) {
        console.warn(`[SchemaRenderer] Element not ready: ${finalSelector}`, e);
      }
    }

    // Create the element
    const el = document.createElement(finalSelector);

    // Apply grid position
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

    const resolvedClasses = this.resolveClasses(data.classes, def?.defaultClasses || "");
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
        // JSON.stringify arrays/objects since Lit components expect string props like JSON
        let finalValue: unknown = value;
        if (value !== null && typeof value === "object" && !Array.isArray(value)) {
          finalValue = JSON.stringify(value);
        } else if (Array.isArray(value)) {
          finalValue = JSON.stringify(value);
        }
        (el as any)[key] = finalValue;
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

  async render(container: HTMLElement, pageSchema: PageSchema, currentRoute?: string): Promise<void> {
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

  private async renderNestedChildren(parent: HTMLElement, element: CanvasElement): Promise<void> {
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

    const region = this._layoutRegions.find(r => r.id === regionId);
    if (!region) {
      console.warn(`Layout region not found: ${regionId}`);
      return;
    }

    // Check visibility
    if (!this.isElementVisible(region)) {
      container.style.display = 'none';
      return;
    }

    // Create the region element
    const el = await this.createElement(region as unknown as CanvasElement);
    if (!el) return;

    // Render nested children directly
    if (region.children && region.children.length > 0) {
      for (const child of region.children) {
        if (this.isElementVisible(child as unknown as CanvasElement)) {
          const childEl = await this.createElement(child as unknown as CanvasElement);
          if (childEl) {
            // Recursively render nested children
            await this.renderNestedChildren(childEl, child as unknown as CanvasElement);
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

    // 14. Flex wrap
    const flexWrap = props["flexWrap"] as string | undefined;
    if (flexWrap === "wrap") classes.push("flex-wrap");
    else if (flexWrap === "nowrap") classes.push("flex-nowrap");
    else if (flexWrap === "wrap-reverse") classes.push("flex-wrap-reverse");

    // 15. Flex grow
    const flexGrow = props["flexGrow"] as boolean | undefined;
    if (flexGrow === true) classes.push("flex-grow");
    else if (flexGrow === false) classes.push("flex-grow-0");

    // 16. Flex shrink
    const flexShrink = props["flexShrink"] as boolean | undefined;
    if (flexShrink === true) classes.push("flex-shrink");
    else if (flexShrink === false) classes.push("flex-shrink-0");

    // 17. Flex basis
    const flexBasis = props["flexBasis"] as string | undefined;
    if (flexBasis === "auto") classes.push("basis-auto");
    else if (flexBasis === "full") classes.push("basis-full");
    else if (flexBasis === "half") classes.push("basis-1/2");
    else if (flexBasis === "third") classes.push("basis-1/3");
    else if (flexBasis === "quarter") classes.push("basis-1/4");

    // 18. Align items (container-level)
    const alignItems = props["alignItems"] as string | undefined;
    if (alignItems === "start") classes.push("items-start");
    else if (alignItems === "center") classes.push("items-center");
    else if (alignItems === "end") classes.push("items-end");
    else if (alignItems === "stretch") classes.push("items-stretch");
    else if (alignItems === "baseline") classes.push("items-baseline");

    // 19. Align content (container-level, multi-row)
    const alignContent = props["alignContent"] as string | undefined;
    if (alignContent === "start") classes.push("content-start");
    else if (alignContent === "center") classes.push("content-center");
    else if (alignContent === "end") classes.push("content-end");
    else if (alignContent === "between") classes.push("content-between");
    else if (alignContent === "around") classes.push("content-around");
    else if (alignContent === "evenly") classes.push("content-evenly");

    // 20. Justify items
    const justifyItems = props["justifyItems"] as string | undefined;
    if (justifyItems === "start") classes.push("justify-items-start");
    else if (justifyItems === "center") classes.push("justify-items-center");
    else if (justifyItems === "end") classes.push("justify-items-end");
    else if (justifyItems === "stretch") classes.push("justify-items-stretch");

    // 21. Justify self (item-level)
    const justifySelf = props["justifySelf"] as string | undefined;
    if (justifySelf === "start") classes.push("justify-self-start");
    else if (justifySelf === "center") classes.push("justify-self-center");
    else if (justifySelf === "end") classes.push("justify-self-end");
    else if (justifySelf === "stretch") classes.push("justify-self-stretch");
    else if (justifySelf === "auto") classes.push("justify-self-auto");

    // 22. Align self (item-level)
    const alignSelf = props["alignSelf"] as string | undefined;
    if (alignSelf === "start") classes.push("self-start");
    else if (alignSelf === "center") classes.push("self-center");
    else if (alignSelf === "end") classes.push("self-end");
    else if (alignSelf === "stretch") classes.push("self-stretch");
    else if (alignSelf === "auto") classes.push("self-auto");

    // 23. Row gap (gap-y)
    const rowGap = props["rowGap"] as string | undefined;
    if (rowGap === "xs") classes.push("gap-y-1");
    else if (rowGap === "sm") classes.push("gap-y-2");
    else if (rowGap === "md") classes.push("gap-y-4");
    else if (rowGap === "lg") classes.push("gap-y-6");
    else if (rowGap === "xl") classes.push("gap-y-8");

    // 24. Column gap (gap-x)
    const colGap = props["colGap"] as string | undefined;
    if (colGap === "xs") classes.push("gap-x-1");
    else if (colGap === "sm") classes.push("gap-x-2");
    else if (colGap === "md") classes.push("gap-x-4");
    else if (colGap === "lg") classes.push("gap-x-6");
    else if (colGap === "xl") classes.push("gap-x-8");

    // 25. Width
    const width = props["width"] as string | undefined;
    if (width === "full") classes.push("w-full");
    else if (width === "auto") classes.push("w-auto");
    else if (width === "screen") classes.push("w-screen");
    else if (width === "fit") classes.push("w-fit");

    // 26. Height
    const height = props["height"] as string | undefined;
    if (height === "full") classes.push("h-full");
    else if (height === "auto") classes.push("h-auto");
    else if (height === "screen") classes.push("h-screen");
    else if (height === "fit") classes.push("h-fit");

    // 27. Margin X (mx)
    const marginX = props["marginX"] as string | undefined;
    if (marginX === "auto") classes.push("mx-auto");
    else if (marginX === "xs") classes.push("mx-1");
    else if (marginX === "sm") classes.push("mx-2");
    else if (marginX === "md") classes.push("mx-4");
    else if (marginX === "lg") classes.push("mx-6");
    else if (marginX === "xl") classes.push("mx-8");

    // 28. Margin Y (my)
    const marginY = props["marginY"] as string | undefined;
    if (marginY === "xs") classes.push("my-1");
    else if (marginY === "sm") classes.push("my-2");
    else if (marginY === "md") classes.push("my-4");
    else if (marginY === "lg") classes.push("my-6");
    else if (marginY === "xl") classes.push("my-8");

    // 29. Padding X (px)
    const paddingX = props["paddingX"] as string | undefined;
    if (paddingX === "xs") classes.push("px-1");
    else if (paddingX === "sm") classes.push("px-2");
    else if (paddingX === "md") classes.push("px-4");
    else if (paddingX === "lg") classes.push("px-6");
    else if (paddingX === "xl") classes.push("px-8");

    // 30. Padding Y (py)
    const paddingY = props["paddingY"] as string | undefined;
    if (paddingY === "xs") classes.push("py-1");
    else if (paddingY === "sm") classes.push("py-2");
    else if (paddingY === "md") classes.push("py-4");
    else if (paddingY === "lg") classes.push("py-6");
    else if (paddingY === "xl") classes.push("py-8");

    // 31. Responsive breakpoints (sm:, md:, lg:)
    const responsive = props["responsive"] as Record<string, Record<string, unknown>> | undefined;
    if (responsive) {
      const gapMap: Record<string, string> = { xs: "1", sm: "2", md: "4", lg: "6", xl: "8" };

      // sm: breakpoint (640px+)
      if (responsive["sm"]) {
        const sm = responsive["sm"];
        if (sm["layout"] === "flex") classes.push("sm:flex");
        if (sm["layout"] === "grid") classes.push("sm:grid");
        if (sm["direction"] === "row") classes.push("sm:flex-row");
        if (sm["direction"] === "col") classes.push("sm:flex-col");
        if (sm["gap"] && gapMap[sm["gap"] as string]) classes.push(`sm:gap-${gapMap[sm["gap"] as string]}`);
        if (sm["align"] === "center") classes.push("sm:items-center");
        if (sm["align"] === "start") classes.push("sm:items-start");
        if (sm["align"] === "end") classes.push("sm:items-end");
        if (sm["justify"] === "center") classes.push("sm:justify-center");
        if (sm["justify"] === "start") classes.push("sm:justify-start");
        if (sm["justify"] === "end") classes.push("sm:justify-end");
        if (sm["flexWrap"] === "wrap") classes.push("sm:flex-wrap");
        if (sm["padding"] === "md") classes.push("sm:p-4");
        if (sm["padding"] === "lg") classes.push("sm:p-6");
      }

      // md: breakpoint (768px+)
      if (responsive["md"]) {
        const md = responsive["md"];
        if (md["layout"] === "flex") classes.push("md:flex");
        if (md["layout"] === "grid") classes.push("md:grid");
        if (md["direction"] === "row") classes.push("md:flex-row");
        if (md["direction"] === "col") classes.push("md:flex-col");
        if (md["gap"] && gapMap[md["gap"] as string]) classes.push(`md:gap-${gapMap[md["gap"] as string]}`);
        if (md["align"] === "center") classes.push("md:items-center");
        if (md["align"] === "start") classes.push("md:items-start");
        if (md["align"] === "end") classes.push("md:items-end");
        if (md["justify"] === "center") classes.push("md:justify-center");
        if (md["justify"] === "start") classes.push("md:justify-start");
        if (md["justify"] === "end") classes.push("md:justify-end");
        if (md["justify"] === "between") classes.push("md:justify-between");
        if (md["flexWrap"] === "wrap") classes.push("md:flex-wrap");
        if (md["padding"] === "md") classes.push("md:p-4");
        if (md["padding"] === "lg") classes.push("md:p-6");
      }

      // lg: breakpoint (1024px+)
      if (responsive["lg"]) {
        const lg = responsive["lg"];
        if (lg["layout"] === "flex") classes.push("lg:flex");
        if (lg["layout"] === "grid") classes.push("lg:grid");
        if (lg["direction"] === "row") classes.push("lg:flex-row");
        if (lg["direction"] === "col") classes.push("lg:flex-col");
        if (lg["gap"] && gapMap[lg["gap"] as string]) classes.push(`lg:gap-${gapMap[lg["gap"] as string]}`);
        if (lg["align"] === "center") classes.push("lg:items-center");
        if (lg["justify"] === "center") classes.push("lg:justify-center");
        if (lg["justify"] === "between") classes.push("lg:justify-between");
        if (lg["padding"] === "md") classes.push("lg:p-4");
        if (lg["padding"] === "lg") classes.push("lg:p-6");
      }
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
