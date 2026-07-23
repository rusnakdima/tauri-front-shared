import { Injectable, Type } from "@angular/core";
import { ComponentRegistryService } from "./component-registry.service";

/**
 * @deprecated Use ComponentRegistryService directly.
 * Kept for backward compatibility with template-tauri-app.
 */
export const SCHEMA_COMPONENT_MAP = new Map<string, Type<any>>();

/**
 * @deprecated Use ComponentRegistryService directly.
 * Kept for backward compatibility with template-tauri-app.
 */
export function registerSchemaComponent(
  selector: string,
  component: Type<any>,
) {
  SCHEMA_COMPONENT_MAP.set(selector, component);
  // Also register in ComponentRegistryService for consolidated registry
  const service = (globalThis as Record<string, unknown>)["__componentRegistryService"] as ComponentRegistryService | undefined;
  if (service) {
    service.registerComponent({ selector, module: component.name } as any);
  }
}
