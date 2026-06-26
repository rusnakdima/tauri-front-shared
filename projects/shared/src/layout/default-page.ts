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

export interface PageSchema {
  id: string;
  name: string;
  elements: CanvasElement[];
  layout?: LayoutSlots | { type: string; direction: string };
}

export interface UISchema {
  id: string;
  name: string;
  version?: string;
  updatedAt?: string;
  pages: PageSchema[];
  sharedComponents?: string[];
  modules?: ModuleConfig;
  i18n?: Record<string, Record<string, string>>;
  layouts?: Array<{ id: string; name: string; schema: any }>;
  components?: Array<{ id: string; name: string; schema: any }>;
  services?: Array<{ id: string; name: string; code: string }>;
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
  props: Record<string, any>;
  classes: string;
  children: string[];
  dataBinding?: { entity: string; field: string };
  zIndex: number;
}

export function getDefaultSchema(): UISchema {
  const welcomePage: PageSchema = {
    id: "welcome",
    name: "Welcome",
    elements: [
      {
        id: "welcome-header",
        componentId: "page-container",
        name: "Page Container",
        icon: "▦",
        position: { x: 0, y: 0, width: 800, height: 80 },
        props: {
          title: "Welcome to Designer",
          subtitle: "Create your first project to get started",
        },
        classes: "p-6",
        children: [],
        zIndex: 1,
      },
      {
        id: "welcome-empty-state",
        componentId: "empty-state",
        name: "Empty State",
        icon: "○",
        position: { x: 200, y: 150, width: 400, height: 200 },
        props: {
          icon: "add_circle",
          title: "No projects yet",
          message: "Create a new project to get started",
          actionLabel: "Create Project",
        },
        classes: "flex flex-col items-center justify-center p-8",
        children: [],
        zIndex: 1,
      },
    ],
  };

  return {
    id: "designer-default",
    name: "Designer",
    version: "3.0.0",
    pages: [welcomePage],
  };
}
