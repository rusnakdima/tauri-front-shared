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

// Component metadata exports (from components.ts - static definitions)
export {
  components,
  uiComponents,
  layoutComponents,
  feedbackComponents,
  dataComponents,
} from "./components";

// Side-effect import: registers ALL Lit custom elements via @customElement decorators
// MUST be imported before any component usage
import "./register-components";

// Core SDUI services (core/lib/)
export { SchemaRendererService } from "./core/lib/schema-renderer/schema-renderer.service";
export { ComponentRegistryService } from "./core/lib/schema-renderer/component-registry";
export { DataBindingResolverService } from "./core/lib/schema-renderer/data-binding-resolver";
export type { DataBinding } from "./core/lib/schema-renderer/data-binding-resolver";
export { LayoutEngineService } from "./core/lib/schema-renderer/layout-engine";
export type { GridTemplate } from "./core/lib/schema-renderer/layout-engine";
export { SchemaRouterService } from "./core/lib/schema-renderer/schema-router.service";
export { SchemaRouteViewerComponent } from "./core/lib/schema-renderer/schema-route-viewer.component";
export { GuardService } from "./core/lib/schema-router/guard.service";
export { ThemeService } from "./core/lib/theme/theme.service";
export { EventBusService } from "./core/lib/events/event-bus.service";
export { ShortcutService } from "./core/lib/shortcuts/shortcut.service";
export type { Shortcut } from "./core/lib/shortcuts/shortcut.service";
export { I18nService } from "./core/lib/i18n/i18n.service";
export { GlobalStateService } from "./core/lib/global-state/global-state.service";

// Existing working services
export { InvokeWrapperService } from "./core-api/invoke-wrapper.service";
export { CrudService } from "./core-crud/crud.service";

// Core API types
export { ResponseStatus } from "./core-api/tauri/response";
export type { Response } from "./core-api/tauri/response";
export { isSuccess, isError, getErrorMessage, unwrapResponse, mapResponse } from "./core-api/tauri/response";
export { ErrorType, parseError, formatError } from "./core-api/tauri/error";
export type { AppError } from "./core-api/tauri/error";

// Types from core/lib
export type {
  UiSchema,
  Page,
  Layout,
  ComponentDef,
  GridPosition,
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

// Algorithms
export { quickSort, mergeSort, bubbleSort, insertionSort } from "./algorithms/sorting";
export type { CompareFn } from "./algorithms/sorting";
export { createGraph, addNode, addEdge, dijkstra } from "./algorithms/graph";
export type { Graph, GraphEdge } from "./algorithms/graph";

// Style system
export {
  loadStyleVariant,
  setCurrentStyle,
  getCurrentStyle,
  getAllStyleVariants,
  getStyleClassPrefix,
  getComponentStyleClasses,
} from "./styles/style-registry";
export type { StyleVariant, ComponentStyleMap } from "./styles/style-registry";
export { ThemeService as StyleThemeService } from "./styles/theme.service";

// UI Showcase
export { UiShowcaseComponent } from "./ui-showcase/ui-showcase.component";
