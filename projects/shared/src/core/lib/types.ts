export type ColorMode = "light" | "dark" | "system";

export interface DataBinding {
  entity: string;
  field?: string;
  path?: string;
  operation?: "find" | "create" | "update" | "delete";
  params?: Record<string, unknown>;
}

export interface ValidationError {
  path: string;
  message: string;
  severity?: "error" | "warning";
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
}

export interface Theme {
  mode: ColorMode;
  name?: string;
  colors?: ThemeColors;
  accentColor?: string;
  cssVariables?: Record<string, string>;
}

export interface ThemeColors {
  primary?: string;
  secondary?: string;
  background?: string;
  foreground?: string;
  bgPrimary?: string;
  bgSecondary?: string;
  bgTertiary?: string;
  bgElevated?: string;
  bgHover?: string;
  textPrimary?: string;
  textSecondary?: string;
  textMuted?: string;
  border?: string;
  borderLight?: string;
  accent?: string;
  accentHover?: string;
  success?: string;
  warning?: string;
  error?: string;
}

export interface UiSchema {
  version: string;
  schemaVersion?: string;
  pages: Page[];
  layouts: Layout[];
  theme?: Theme;
  /** @deprecated Use layouts or canvasElements in Page instead */
  components?: unknown[];
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
  packageType: "ui" | "feedback" | "data" | "layout" | "shared";
  category: string;
  icon?: string;
  defaultClasses?: string;
  props?: SharedPropDef[];
  template?: string;
  css?: string;
}

export interface GridPosition {
  column: number;
  row: number;
  colSpan?: number;
  rowSpan?: number;
  colStart?: number;
  rowStart?: number;
  /** Responsive override for screens < 640px */
  sm?: Partial<GridPosition>;
  /** Responsive override for screens 640–1023px */
  md?: Partial<GridPosition>;
  /** Responsive override for screens >= 1024px */
  lg?: Partial<GridPosition>;
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

  // Flex wrap
  flexWrap?: "wrap" | "nowrap" | "wrap-reverse";

  // Flex grow/shrink
  flexGrow?: boolean;
  flexShrink?: boolean;
  flexBasis?: "auto" | "full" | "half" | "third" | "quarter";

  // Container-level alignment
  alignItems?: "start" | "center" | "end" | "stretch" | "baseline";
  alignContent?: "start" | "center" | "end" | "between" | "around" | "evenly";
  justifyItems?: "start" | "center" | "end" | "stretch";

  // Item-level alignment
  justifySelf?: "start" | "center" | "end" | "stretch" | "auto";
  alignSelf?: "start" | "center" | "end" | "stretch" | "auto";

  // Grid template
  gridTemplateColumns?: string;
  gridTemplateRows?: string;

  // Gap (row/col separate)
  rowGap?: number;
  colGap?: number;

  // Sizing
  width?: "full" | "auto" | "screen" | "fit";
  height?: "full" | "auto" | "screen" | "fit";

  // Margin/Padding shorthands
  marginX?: "auto" | number;
  marginY?: number;
  paddingX?: number;
  paddingY?: number;

  // Responsive layout variants
  responsive?: Record<string, Partial<Layout>>;
}

export interface Page {
  id: string;
  name: string;
  route?: string;
  meta?: { title?: string; icon?: string };
  // Reference to a specific layout by ID (optional, defaults to first layout)
  layout?: string;
  layouts: Layout[];
  // components: for generated apps, canvasElements: for Designer
  components?: ComponentDef[];
  canvasElements?: CanvasElement[];
}

export interface CanvasElement {
  id: string;
  componentId: string;
  gridPosition?: GridPosition;
  classes?: string;
  // Nested children elements (hierarchical structure)
  children?: CanvasElement[];
  // Layout props
  props?: Record<string, unknown>;
  // Route-based visibility
  routes?: {
    include?: string[];
    exclude?: string[];
  };
  // Default values for component props
  defaults?: Record<string, unknown>;
  // Conditional visibility
  visible?: boolean | { when?: string; equals?: unknown };
  // Data binding
  bind?: { store?: string; field?: string };
  // Event handlers
  events?: Record<string, string>;
  position?: { x: number; y: number; width: number; height: number };
  zIndex?: number;
  dataBinding?: { entity: string; field: string };
  // Per-element theme override (e.g. "material-design-v3")
  theme?: string;
  styles?: {
    custom?: Record<string, string>;
    states?: {
      hover?: Record<string, string>;
      focus?: Record<string, string>;
      disabled?: Record<string, string>;
    };
  };
  // Variative UI element metainfo
  variants?: {
    options: Array<{
      id: string;
      label: string;
      default?: boolean;
      preview?: string;
    }>;
    active?: string;
  };
  layout?: {
    headerWidth?: "full" | "container";
    bottomNavStyle?: "full" | "floating";
    sidebarMode?: "collapsed" | "expanded" | "overlay";
    fabBehavior?: "fixed" | "scroll";
    contentOverflow?: "scroll" | "fixed";
    footerBehavior?: "sticky" | "static";
  };
}

export type RegionType =
  | "header"
  | "sidebar"
  | "sidebar-left"
  | "sidebar-right"
  | "footer"
  | "bottom-nav"
  | "nav"
  | "overlay"
  | "other";

// Layout element for global layout regions (header, footer, sidebar)
export interface LayoutElement {
  id: string;
  componentId: string;
  /** Explicit region type — tells the shell where to place this region in the layout grid */
  region?: RegionType;
  classes?: string;
  props?: Record<string, unknown>;
  // Nested children elements (hierarchical structure)
  children?: LayoutElement[];
  routes?: {
    include?: string[];
    exclude?: string[];
  };
  defaults?: Record<string, unknown>;
  visible?: boolean | { when?: string; equals?: unknown };
  bind?: { store?: string; field?: string };
  events?: Record<string, string>;
  styles?: {
    custom?: Record<string, string>;
    states?: {
      hover?: Record<string, string>;
      focus?: Record<string, string>;
      disabled?: Record<string, string>;
    };
  };
}

// Root app schema with layout regions
export interface AppSchema {
  id: string;
  theme?: string;
  schemaVersion?: string;
  app?: { id?: string; name?: string; style?: string };
  layout?: LayoutElement;
  layoutRegions?: LayoutElement[];
  pages: Page[];
  handlers?: Record<string, unknown>;
  stores?: Record<string, unknown>;
}
