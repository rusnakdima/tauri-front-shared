import { Type } from "@angular/core";

export const SCHEMA_COMPONENT_MAP = new Map<string, Type<any>>();

export function registerSchemaComponent(
  selector: string,
  component: Type<any>,
) {
  SCHEMA_COMPONENT_MAP.set(selector, component);
}
