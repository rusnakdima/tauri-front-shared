import { Injectable } from "@angular/core";
import { LitElement } from "lit";
import type { ElementConfig, GridPosition, DataBinding } from "./types";

export interface ComponentRegistry {
  getSelector(componentId: string): string | undefined;
  getInputs(componentId: string): string[];
  getOutputs(componentId: string): string[];
  getDefinition?(componentId: string): { children?: Array<{ key: string; [key: string]: unknown }> } | undefined;
}

@Injectable({ providedIn: "root" })
export class ElementFactoryService {
  private registry: ComponentRegistry | null = null;

  setRegistry(registry: ComponentRegistry): void {
    this.registry = registry;
  }

  createElement(config: ElementConfig, componentRegistry: ComponentRegistry): HTMLElement | null {
    const selector = componentRegistry.getSelector(config.componentId);
    if (!selector) {
      console.warn(`Component not registered: ${config.componentId}`);
      return this.createFallbackElement(config);
    }

    const element = document.createElement(selector);

    if (config.gridPosition) {
      this.applyGridPosition(element, config.gridPosition);
    }

    if (config.classes) {
      element.className = config.classes;
    }

    for (const [key, value] of Object.entries(config.styles || {})) {
      element.style.setProperty(key, String(value));
    }

    for (const [key, value] of Object.entries(config.props || {})) {
      if (element instanceof LitElement) {
        (element as unknown as Record<string, unknown>)[key] = value;
      } else if (typeof value === "string") {
        element.setAttribute(key, value);
      }
    }

    for (const childId of config.children) {
      const childConfig = this.getChildConfig(config.componentId, childId);
      if (childConfig) {
        const childElement = this.createElement(childConfig, componentRegistry);
        if (childElement) {
          element.appendChild(childElement);
        }
      }
    }

    return element;
  }

  private applyGridPosition(element: HTMLElement, position: GridPosition): void {
    const style = element.style;

    if (position.colStart !== null) {
      style.gridColumnStart = String(position.colStart);
    } else {
      style.gridColumn = `${position.column} / span ${position.colSpan}`;
    }

    if (position.rowStart !== null) {
      style.gridRowStart = String(position.rowStart);
    } else {
      style.gridRow = `${position.row} / span ${position.rowSpan}`;
    }
  }

  private createFallbackElement(config: ElementConfig): HTMLElement {
    const fallback = document.createElement("div");
    fallback.setAttribute("data-sdui-fallback", config.componentId);
    fallback.setAttribute("data-element-id", config.id);
    fallback.className = config.classes;
    return fallback;
  }

  getChildConfig(parentType: string, childKey: string): ElementConfig | null {
    if (!this.registry?.getDefinition) return null;
    const parentDef = this.registry.getDefinition(parentType);
    if (!parentDef || !parentDef.children) return null;
    for (const child of parentDef.children as unknown as ElementConfig[]) {
      if ((child as unknown as { key: string }).key === childKey) return child;
    }
    return null;
  }
}
