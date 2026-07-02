import { ComponentDef } from "../types";

export class ComponentRegistryService {
  private _componentRegistry = new Map<string, ComponentDef>();
  private _componentModules = new Map<string, Record<string, unknown>>();

  registerComponent(def: ComponentDef): void {
    this._componentRegistry.set(def.selector, def);
  }

  registerComponents(defs: ComponentDef[]): void {
    for (const def of defs) {
      this.registerComponent(def);
    }
  }

  getComponent(selector: string): ComponentDef | undefined {
    return this._componentRegistry.get(selector);
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
      const constructor = (
        cached as Record<string, CustomElementConstructor>
      )["default"];
      if (constructor) return constructor;
    }

    const def = this.getComponent(selector);
    if (!def) {
      throw new Error(`Component not found: ${selector}`);
    }

    const module = (await import(/* @vite-ignore */ def.selector)) as Record<
      string,
      unknown
    >;
    this.registerComponentModule(selector, module);

    const constructor = (
      module as Record<string, CustomElementConstructor>
    )["default"];
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

  loadComponentsFromSchema(
    pages: { components?: ComponentDef[]; canvasElements?: ComponentDef[] }[],
  ): void {
    const registry = new Map<string, ComponentDef>();
    for (const page of pages) {
      const comps = page.canvasElements || page.components || [];
      for (const comp of comps) {
        registry.set(comp.selector, comp);
      }
    }
    this._componentRegistry = registry;
  }

  hasComponent(selector: string): boolean {
    return this._componentRegistry.has(selector);
  }

  getRegisteredSelectors(): string[] {
    return Array.from(this._componentRegistry.keys());
  }
}
