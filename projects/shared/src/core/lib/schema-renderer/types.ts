import type { ComponentDef, CanvasElement, GridPosition } from "../types";
import type { DataBinding } from "./data-binding-resolver";

export interface SchemaRendererConfig {
  strictMode: boolean;
  enableDataBinding: boolean;
  enableEventHandling: boolean;
  defaultGridGap: string;
}

export interface CanvasElementExtended extends CanvasElement {
  resolvedProps: Record<string, unknown>;
  resolvedClasses: string;
  resolvedStyles: Record<string, string>;
  boundData: unknown;
}

export interface GridTemplate {
  columns: string[];
  rows: string[];
  gap: string;
  areas: string[] | null;
}

export interface ElementCreationOptions {
  parentId?: string;
  slotName?: string;
  insertIndex?: number;
  classes?: string;
  styles?: Record<string, string>;
}

export interface DataBindingContext {
  entity: string;
  field: string | null;
  transform?: string;
  format?: string;
}

export interface EventHandlerConfig {
  event: string;
  action: "emit" | "navigate" | "callService" | "setState";
  payload?: Record<string, unknown>;
  serviceName?: string;
  methodName?: string;
}

export interface PropResolutionResult {
  value: unknown;
  resolved: boolean;
  source: "default" | "dataBinding" | "param" | "computed";
}

export interface ClassResolutionResult {
  classes: string;
  styles: Record<string, string>;
  source: "defaultClasses" | "override" | "theme";
}
