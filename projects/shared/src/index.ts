// @tauri-front/shared - Unified shared library
// Explicit re-exports to avoid name collisions

// Disable Lit dev mode warnings and class field shadowing errors
// Must be set before Lit imports
const global = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : {};
Object.defineProperty(global, 'litDevMode', { value: false, writable: true, configurable: true });

// Suppress unhandled promise rejections from Lit class field warnings
if (typeof window !== 'undefined') {
  const originalHandler = (window as any).onunhandledrejection;
  (window as any).onunhandledrejection = (event: PromiseRejectionEvent) => {
    const reason = event?.reason;
    if (reason?.message?.includes('class fields') || reason?.message?.includes('Lit is in dev mode')) {
      event.preventDefault();
      return;
    }
    if (originalHandler) originalHandler(event);
  };
}

// Lit web components (registered as custom elements)
export * from "./components/index";

// Core SDUI services (core/lib/)
export { SchemaRendererService } from "./core/lib/schema-renderer/schema-renderer.service";
export { ComponentRegistryService } from "./core/lib/component-registry.service";
export { DataBindingResolver } from "./core/lib/data-binding-resolver";
export { StyleResolver } from "./core/lib/style-resolver";
export { SchemaRouterService } from "./core/lib/schema-router/schema-router.service";
export { GuardService } from "./core/lib/schema-router/guard.service";
export { SchemaRouteViewerComponent } from "./core/lib/schema-router/schema-route-viewer.component";
export { SchemaFetcherService } from "./core/lib/schema-fetcher/schema-fetcher.service";
export { ThemeService } from "./core/lib/theme/theme.service";
export { EventBusService } from "./core/lib/events/event-bus.service";

// Existing working services
export { InvokeWrapperService } from "./core-api/invoke-wrapper.service";
export { CrudService } from "./core-crud/crud.service";

// Component metadata
export {
  components,
  uiComponents,
  layoutComponents,
  feedbackComponents,
  dataComponents,
} from "./components";

// Types from core/lib
export type {
  UiSchema,
  Page,
  Layout,
  ComponentDef,
  CanvasElement,
  GridPosition,
  DataBinding,
  Theme,
  ColorMode,
  ElementEvents,
  RenderContext,
  ElementConfig,
  ComponentBehavior,
  ToastNotification,
  ThemeConfig,
} from "./core/lib/types";

// Invoke command wrappers
export {
  invokeCommand,
  invokeCommandWithResponse,
  invokeVoid,
  invokeWithError,
} from "./core-api/tauri/commands";

// Style system
export {
  loadStyleVariant,
  setCurrentStyle,
  getCurrentStyle,
  getAllStyleVariants,
  getStyleClassPrefix,
} from "./styles/style-registry";
export type { StyleVariant } from "./styles/style-registry";

// UI Showcase
export { UiShowcaseComponent } from "./ui-showcase/ui-showcase.component";
