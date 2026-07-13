import { Injectable } from "@angular/core";
import type { ComponentBehavior, ElementEvents, ComponentDef } from "./types";

export interface ComponentDefinition {
  selector: string;
  module?: string;
  behaviors?: ComponentBehavior;
}

@Injectable({ providedIn: "root" })
export class ComponentRegistryService {
  private registry = new Map<string, ComponentDefinition>();
  private componentManifest: Record<string, unknown> = {};
  private _schemaComponents = new Map<string, ComponentDef>();
  private _componentModules = new Map<string, Record<string, unknown>>();

  constructor() {
    this.registerBuiltInComponents();
    this.loadComponentManifest();
  }

  private registerBuiltInComponents(): void {
    // Built-in UI components
    const components: Record<string, ComponentDefinition> = {
      // Layout
      header: { selector: "app-header" },
      footer: { selector: "app-footer" },
      sidebar: { selector: "app-sidebar" },
      "page-container": { selector: "app-page-container" },
      "page-toolbar": { selector: "app-page-toolbar" },
      "split-view": { selector: "app-split-view" },
      "main-editor": { selector: "app-main-editor" },

      // UI
      button: { selector: "app-button" },
      input: { selector: "app-input" },
      textarea: { selector: "app-textarea" },
      select: { selector: "app-select" },
      checkbox: { selector: "app-checkbox" },
      radio: { selector: "app-radio" },
      switch: { selector: "app-switch" },
      slider: { selector: "app-slider" },
      badge: { selector: "app-badge" },
      avatar: { selector: "app-avatar" },
      chip: { selector: "app-chip" },
      tabs: { selector: "app-tabs" },
      "empty-state": { selector: "app-empty-state" },
      loading: { selector: "app-loading" },
      "progress-bar": { selector: "app-progress-bar" },
      pagination: { selector: "app-pagination" },
      tooltip: { selector: "app-tooltip" },

      // Data
      card: { selector: "app-card" },
      "stats-card": { selector: "app-stats-card" },
      "table-view": { selector: "app-table-view" },
      "data-table": { selector: "app-data-table" },
      "json-view": { selector: "app-json-view" },
      "segment-selector": { selector: "app-segment-selector" },

      // Feedback
      dialog: { selector: "app-dialog" },
      "confirm-dialog": { selector: "app-confirm-dialog" },
      toast: { selector: "app-toast" },
      snackbar: { selector: "app-snackbar" },
      modal: { selector: "app-modal" },
      "command-palette": { selector: "app-command-palette" },

      // Grid
      "grid-container": { selector: "app-grid-container" },
      "grid-item": { selector: "app-grid-item" },
      "grid-area": { selector: "app-grid-area" },

      // Designer
      "designer-sidebar": { selector: "app-designer-sidebar" },
      "component-palette": { selector: "app-component-palette" },
      canvas: { selector: "app-canvas" },
      "canvas-toolbar": { selector: "app-canvas-toolbar" },
      "properties-panel": { selector: "app-properties-panel" },
      "bottom-panel": { selector: "app-bottom-panel" },
    };

    Object.entries(components).forEach(([id, def]) => {
      this.register(id, def);
    });
  }

  private async loadComponentManifest(): Promise<void> {
    try {
      const response = await fetch("/assets/component-manifest.json");
      if (response.ok) {
        this.componentManifest = await response.json();
      }
    } catch {
      // Manifest not found, use built-in registry only
    }
  }

  register(componentId: string, definition: ComponentDefinition): void {
    this.registry.set(componentId, definition);
  }

  unregister(componentId: string): void {
    this.registry.delete(componentId);
  }

  get(componentId: string): ComponentDefinition | undefined {
    return this.registry.get(componentId);
  }

  getSelector(componentId: string): string {
    const def = this.registry.get(componentId);
    if (!def) {
      console.warn(
        `ComponentRegistry: Unknown component "${componentId}", using fallback selector`,
      );
      return `app-${componentId}`;
    }
    return def.selector;
  }

  has(componentId: string): boolean {
    return this.registry.has(componentId);
  }

  resolveBehavior(componentId: string): ComponentBehavior | undefined {
    const def = this.registry.get(componentId);
    return def?.behaviors;
  }

  mergeBehavior(
    componentId: string,
    schemaBehavior?: ComponentBehavior,
  ): ComponentBehavior {
    const registered = this.resolveBehavior(componentId) ?? {};
    if (!schemaBehavior) return registered;

    return {
      selfMethods: { ...registered.selfMethods, ...schemaBehavior.selfMethods },
      classSetters: {
        ...registered.classSetters,
        ...schemaBehavior.classSetters,
      },
      eventHandlers: this.mergeEventHandlers(
        registered.eventHandlers,
        schemaBehavior.eventHandlers,
      ),
    };
  }

  private mergeEventHandlers(
    base?: ElementEvents,
    override?: ElementEvents,
  ): ElementEvents | undefined {
    if (!base && !override) return undefined;
    if (!base) return override;
    if (!override) return base;

    const merged: ElementEvents = { ...base };
    Object.entries(override).forEach(([event, handlers]) => {
      const existing = merged[event] ?? [];
      merged[event] = [...existing, ...handlers];
    });
    return merged;
  }

  getAllComponentIds(): string[] {
    return Array.from(this.registry.keys());
  }

  getComponentsByCategory(category: string): string[] {
    // Filter components by category from manifest
    const manifest = this.componentManifest[category] as
      Record<string, unknown> | undefined;
    if (!manifest) return [];
    return Object.keys(manifest);
  }

  // Schema-based component registration (delegated from schema-renderer/component-registry.ts)

  registerComponent(def: ComponentDef): void {
    this._schemaComponents.set(def.selector, def);
  }

  registerComponents(defs: ComponentDef[]): void {
    for (const def of defs) {
      this.registerComponent(def);
    }
  }

  getComponent(selector: string): ComponentDef | undefined {
    return this._schemaComponents.get(selector);
  }

  registerComponentModule(
    selector: string,
    module: Record<string, unknown>,
  ): void {
    const modules = new Map(this._componentModules);
    modules.set(selector, module);
    this._componentModules = modules;
  }

  async loadComponentModule(
    selector: string,
  ): Promise<CustomElementConstructor> {
    const cached = this._componentModules.get(selector);
    if (cached) {
      const constructor = (cached as Record<string, CustomElementConstructor>)[
        "default"
      ];
      if (constructor) return constructor;
    }

    const def = this._schemaComponents.get(selector) as
      ComponentDef | undefined;
    if (!def) {
      throw new Error(`Component not found: ${selector}`);
    }

    const module = (await import(/* @vite-ignore */ def.selector)) as Record<
      string,
      unknown
    >;
    this.registerComponentModule(selector, module);

    const constructor = (module as Record<string, CustomElementConstructor>)[
      "default"
    ];
    if (!constructor) {
      throw new Error(
        `Module ${selector} does not export a default CustomElementConstructor`,
      );
    }

    return constructor;
  }

  getComponentModules(): Map<string, Record<string, unknown>> {
    return this._componentModules;
  }

  loadComponentsFromSchema(pages: { components?: ComponentDef[] }[]): void {
    const registry = new Map<string, ComponentDef>();
    for (const page of pages) {
      for (const comp of page.components || []) {
        registry.set(comp.selector, comp);
      }
    }
    this._schemaComponents = registry;
  }

  hasComponent(selector: string): boolean {
    return this._schemaComponents.has(selector);
  }

  getRegisteredSelectors(): string[] {
    return Array.from(this._schemaComponents.keys());
  }
}
