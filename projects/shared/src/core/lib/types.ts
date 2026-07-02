export type ColorMode = "light" | "dark" | "system";

export interface Theme {
  mode: ColorMode;
  accentColor?: string;
  cssVariables?: Record<string, string>;
}

export interface UiSchema {
  version: string;
  pages: Page[];
  layouts: Layout[];
  theme?: Theme;
}

export interface ComponentBehavior {
  selfMethods?: Record<string, string>;
  classSetters?: Record<string, unknown>;
  eventHandlers?: ElementEvents;
}

export interface ElementEvents {
  [eventName: string]: Array<{
    handler: string;
    params?: Record<string, unknown>;
  }>;
}

export interface RenderContext {
  schema: UiSchema;
  page: Page | null;
  layout: Layout | null;
  data: Record<string, Record<string, unknown>>;
  params: Record<string, string>;
}

export interface ElementConfig {
  id: string;
  componentId: string;
  componentDef: ComponentDef | null;
  gridPosition: GridPosition;
  classes: string;
}

export interface ToastNotification {
  id: string;
  message: string;
  type: "success" | "error" | "warning" | "info";
  duration: number;
  icon?: string;
}

export interface ThemeConfig {
  mode: ColorMode;
  accentColor?: string;
  cssVariables?: Record<string, string>;
}

export interface SharedPropDef {
  name: string;
  type: "string" | "number" | "boolean" | "select";
  default?: unknown;
  options?: string[];
}

export interface SharedComponentDef {
  id: string;
  name: string;
  selector: string;
  packageType: "ui" | "feedback" | "data" | "layout";
  category: string;
  icon?: string;
  defaultClasses?: string;
  props: SharedPropDef[];
  template: string;
  css: string;
}

export interface GridPosition {
  column: number;
  row: number;
  colSpan?: number;
  rowSpan?: number;
  colStart?: number;
  rowStart?: number;
}

export interface ComponentDef {
  id: string;
  name: string;
  selector: string;
  packageType: string;
  category: string;
  props: Record<string, unknown>;
  template?: string;
  css?: string;
  defaultClasses?: string;
}

export interface Layout {
  id: string;
  type: "grid" | "flex" | "stack";
  direction?: "row" | "column";
  gap?: number;
  class?: string;
  style?: Record<string, string>;
  positions?: GridPosition[];
  children?: string[];
}

export interface Page {
  id: string;
  name: string;
  layouts: Layout[];
  // components: for generated apps, canvasElements: for Designer
  components?: ComponentDef[];
  canvasElements?: ComponentDef[];
}

export interface CanvasElement {
  id: string;
  componentId: string;
  gridPosition?: GridPosition;
  classes?: string;
  children?: string[];
}
