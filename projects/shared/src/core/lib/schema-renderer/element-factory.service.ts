import { Injectable } from "@angular/core";
import { LitElement } from "lit";
import type { GridPosition } from "../types";
import { I18nService } from "../i18n/i18n.service";

// Extended config with fields used by this service
interface ElementFactoryConfig {
  id: string;
  componentId: string;
  gridPosition?: GridPosition;
  classes?: string;
  styles?: Record<string, string>;
  props?: Record<string, unknown>;
  children?: string[];
}
import {
  StyleVariant,
  getCurrentStyle,
  getComponentStyleClasses,
  GlobalStyleContext,
} from "../../../styles/style-registry";

export interface ComponentRegistry {
  getSelector(componentId: string): string | undefined;
  getInputs(componentId: string): string[];
  getOutputs(componentId: string): string[];
  getDefinition?(
    componentId: string,
  ): { children?: Array<{ key: string; [key: string]: unknown }> } | undefined;
}

@Injectable({ providedIn: "root" })
export class ElementFactoryService {
  private registry: ComponentRegistry | null = null;

  constructor(private i18n: I18nService) {}

  setRegistry(registry: ComponentRegistry): void {
    this.registry = registry;
  }

  async createElement(
    config: ElementFactoryConfig,
    componentRegistry: ComponentRegistry,
  ): Promise<HTMLElement | null> {
    const selector = componentRegistry.getSelector(config.componentId);
    if (!selector) {
      console.warn(`Component not registered: ${config.componentId}`);
      return this.createFallbackElement(config);
    }

    // Wait for custom element to be defined
    if (selector.includes("-")) {
      try {
        await Promise.race([
          customElements.whenDefined(selector),
          new Promise((_, reject) =>
            setTimeout(() => reject(new Error(`Timeout: ${selector}`)), 2000),
          ),
        ]);
      } catch (e) {
        console.warn(`[ElementFactory] Element not ready: ${selector}`, e);
      }
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

    // Handle i18nKey resolution
    const i18nKey = config.props?.["i18nKey"];
    if (i18nKey !== undefined) {
      const translated = this.i18n.t(String(i18nKey));
      const isCustom = element.tagName.includes("-");
      if (isCustom) {
        (element as any)["label"] = translated;
      } else {
        element.textContent = translated;
      }
    }

    // Handle styleName CSS class mapping
    const styleName = config.props?.["styleName"] as string | undefined;
    if (styleName) {
      const theme = getCurrentStyle();
      const classesStr = getComponentStyleClasses(
        theme,
        config.componentId,
        styleName,
      );
      if (classesStr) {
        const existing = element.getAttribute("class") || "";
        element.setAttribute(
          "class",
          existing ? `${existing} ${classesStr}` : classesStr,
        );
      }
    }

    for (const childId of config.children ?? []) {
      const childConfig = this.getChildConfig(config.componentId, childId);
      if (childConfig) {
        const childElement = await this.createElement(
          childConfig,
          componentRegistry,
        );
        if (childElement) {
          element.appendChild(childElement);
        }
      }
    }

    return element;
  }

  private applyGridPosition(
    element: HTMLElement,
    position: GridPosition,
  ): void {
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

  private createFallbackElement(config: ElementFactoryConfig): HTMLElement {
    const fallback = document.createElement("div");
    fallback.setAttribute("data-sdui-fallback", config.componentId);
    fallback.setAttribute("data-element-id", config.id);
    if (config.classes) fallback.className = config.classes;

    const i18nKey = config.props?.["i18nKey"];
    if (i18nKey !== undefined) {
      fallback.textContent = this.i18n.t(String(i18nKey));
    }

    return fallback;
  }

  getChildConfig(
    parentType: string,
    childKey: string,
  ): ElementFactoryConfig | null {
    if (!this.registry?.getDefinition) return null;
    const parentDef = this.registry.getDefinition(parentType);
    if (!parentDef || !parentDef.children) return null;
    for (const child of parentDef.children as unknown as ElementFactoryConfig[]) {
      if ((child as unknown as { key: string }).key === childKey) return child;
    }
    return null;
  }
}
