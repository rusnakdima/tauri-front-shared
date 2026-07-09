// @tauri-front/shared - Unified shared library
// Explicit re-exports to avoid name collisions

// Side-effect import: registers ALL Angular components in SCHEMA_COMPONENT_MAP
// MUST be imported before any schema rendering
import "./register-components";

// Core SDUI services (core/lib/)
export { BaseDestroyableComponent } from "./core/lib/base-destroyable.component";
export { SchemaRendererService } from "./core/lib/schema-renderer/schema-renderer.service";
export { ComponentRegistryService } from "./core/lib/component-registry.service";
export { DataBindingResolverService } from "./core/lib/schema-renderer/data-binding-resolver";
export type { DataBinding } from "./core/lib/schema-renderer/data-binding-resolver";
export { LayoutEngineService } from "./core/lib/schema-renderer/layout-engine";
export type { GridTemplate } from "./core/lib/schema-renderer/layout-engine";
export { SchemaRouterService } from "./core/lib/schema-router/schema-router.service";
export { SchemaRouteViewerComponent } from "./core/lib/schema-router/schema-route-viewer.component";
export { SchemaShellComponent } from "./core/lib/schema-router/schema-shell.component";
export { SchemaFetcherService } from "./core/lib/schema-fetcher/schema-fetcher.service";
export { GuardService } from "./core/lib/schema-router/guard.service";
export { EventBusService } from "./core/lib/events/event-bus.service";
export { ShortcutService } from "./core/lib/shortcuts/shortcut.service";
export type { Shortcut } from "./core/lib/shortcuts/shortcut.service";
export { I18nService } from "./core/lib/i18n/i18n.service";
export { GlobalStateService } from "./core/lib/global-state/global-state.service";
export { ErrorHandlerService } from "./core/lib/error-handler/error-handler.service";
export type {
  ErrorLogEntry,
  RetryConfig,
} from "./core/lib/error-handler/error-handler.service";

// Missing services
export { SignalStoreService } from "./core/lib/signal-store/signal-store.service";
export { SignalSyncService } from "./core/lib/signal-sync/signal-sync.service";
export { SignalLoggerService } from "./core/lib/signal-logger/signal-logger.service";
export { DataPatchService } from "./core/lib/data-patch/data-patch.service";
export { ToastService } from "./core/lib/toast/toast.service";
export { SchemaElementComponent } from "./core/lib/schema-router/schema-element.component";

// Storage services
export { StorageService } from "./storage/storage.service";
export { UnifiedStorageService } from "./core-storage/unified-storage.service";

// Existing working services
export { InvokeWrapperService } from "./core-api/invoke-wrapper.service";
export { CrudService as RemoteCrudService } from "./core-crud/crud.service";

// Core API types
export { ResponseStatus } from "./core-api/tauri/response";
export type { Response } from "./core-api/tauri/response";
export {
  isSuccess,
  isError,
  getErrorMessage,
  unwrapResponse,
  mapResponse,
} from "./core-api/tauri/response";
export { ErrorType, parseError, formatError } from "./core-api/tauri/error";
export type { AppError } from "./core-api/tauri/error";

// Types from core/lib
export type {
  UiSchema,
  AppSchema,
  Page,
  Layout,
  LayoutElement,
  CanvasElement,
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

// Utilities
export { sortBy } from "./utils/sorting";
export { clamp } from "./utils/math";
export { timeAgo } from "./utils/time";

// Algorithms
export * from "./algorithms";

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
export { StyleThemeService } from "./styles/theme.service";
export { StyleThemeService as ThemeService } from "./styles/theme.service";
export { ThemeToggleService } from "./styles/theme-toggle.service";

// RBAC / Permission Service
export { PermissionService } from "./core/lib/rbac/permission.service";
export type {
  Permission,
  Role,
  User,
  PermissionCheckResult,
  TodoPermissionContext,
  FieldPermissionContext,
} from "./core/lib/rbac/permission.service";
export { TodoPermission } from "./core/lib/rbac/permission.service";
export { rbacGuard, rbacRoleGuard } from "./core/lib/rbac/rbac.guard";
export {
  RbacHasPermissionDirective,
  RbacHasRoleDirective,
} from "./core/lib/rbac/rbac-has-permission.directive";
