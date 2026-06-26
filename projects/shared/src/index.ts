// @tauri-front/shared - Unified shared library
// Explicit re-exports to avoid name collisions

// Lit web components (registered as custom elements)
export * from "./components/index";

// Core services
export { SchemaRendererService } from "./core/lib/schema-renderer/schema-renderer.service";
export { InvokeWrapperService } from "./core-api/invoke-wrapper.service";
export { CrudService } from "./core-crud/crud.service";
export { ThemeService } from "./core/lib/theme/theme.service";
export { EventBusService } from "./core/lib/events/event-bus.service";
export { SignalStoreService } from "./core/lib/signal-store/signal-store.service";
export { SignalLoggerService } from "./core/lib/signal-logger/signal-logger.service";
export { SignalSyncService } from "./core/lib/signal-sync/signal-sync.service";

// Component metadata
export {
  components,
  uiComponents,
  layoutComponents,
  feedbackComponents,
  dataComponents,
} from "./components";

// Type definitions
export type {
  GridPosition,
  ComponentDef,
  Layout,
  Page,
} from "./core/lib/types";
export type { CanvasElement } from "./core/lib/schema-renderer/schema-renderer.service";
export type { DataBinding } from "./core/lib/schema-renderer/data-binding-resolver";

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
  getCurrentStyle,
  getStyleClassPrefix,
} from "./styles/style-registry";
export type { StyleVariant } from "./styles/style-registry";
