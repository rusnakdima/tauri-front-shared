export interface GeneratorOptions {
  schemaPath?: string;
  outputPath: string;
  appName: string;
  identifier: string;
  version: string;
  templateDir?: string;
  dryRun?: boolean;
  watch?: boolean;
}

export interface UiSchema {
  id: string;
  name: string;
  version?: string;
  updatedAt?: string;
  pages: PageSchema[];
  sharedComponents?: string[];
  modules?: ModuleConfig;
  i18n?: Record<string, Record<string, string>>;
  layouts?: LayoutSchema[];
  components?: ComponentSchema[];
  services?: ServiceSchema[];
}

export interface PageSchema {
  id: string;
  name: string;
  route?: string;
  elements: CanvasElement[];
  layout?: LayoutSlots | { type: string; direction: string };
}

export interface CanvasElement {
  id: string;
  componentId: string;
  name: string;
  icon: string;
  position: { x: number; y: number; width: number; height: number };
  gridPosition?: {
    column: number;
    row: number;
    colSpan?: number;
    rowSpan?: number;
  };
  props: Record<string, unknown>;
  classes: string;
  children: string[];
  dataBinding?: { entity: string; field: string };
  zIndex: number;
}

export interface LayoutSlots {
  header?: string;
  sidebar?: string;
  content?: string;
  footer?: string;
}

export interface ModuleConfig {
  storage: boolean;
  logger: boolean;
  api: boolean;
  i18n: boolean;
  auth: boolean;
}

export interface LayoutSchema {
  id: string;
  name: string;
  schema: unknown;
}

export interface ComponentSchema {
  id: string;
  name: string;
  schema: unknown;
}

export interface ServiceSchema {
  id: string;
  name: string;
  code: string;
}

export interface TemplateContext {
  appName: string;
  kebabName: string;
  pascalName: string;
  snakeName: string;
  identifier: string;
  version: string;
  schema: UiSchema;
  pages: PageContext[];
  entities: EntityContext[];
}

export interface PageContext {
  id: string;
  name: string;
  route: string;
  kebabName: string;
  pascalName: string;
  elements: CanvasElement[];
  gridColumns: string;
  gridRows: string;
  gridGap: string;
}

export interface EntityContext {
  name: string;
  kebabName: string;
  pascalName: string;
  snakeName: string;
  fields: EntityField[];
}

export interface EntityField {
  name: string;
  type: string;
  optional: boolean;
}
