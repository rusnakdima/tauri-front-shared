// @tauri-front/shared - Unified shared library
// Explicit re-exports to avoid name collisions

// Side-effect import: registers ALL Angular components in SCHEMA_COMPONENT_MAP
// MUST be imported before any schema rendering
import "./register-components";

// Component arrays for designer use
export {
  uiComponents,
  layoutComponents,
  feedbackComponents,
  dataComponents,
} from "./components";

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
export { GuardService } from "./core/lib/schema-router/guard.service";
export { EventBusService } from "./core/lib/events/event-bus.service";
export { I18nService } from "./core/lib/i18n/i18n.service";
export { ErrorHandlerService } from "./core/lib/error-handler/error-handler.service";
export { ApiException } from "./core/lib/api-exception";
export {
  HandlerExecutorService,
  type HandlerDefinition,
} from "./core/lib/handler-executor/handler-executor.service";

// Missing services
export { SignalStoreService } from "./core/lib/signal-store/signal-store.service";
export { SignalLoggerService } from "./core/lib/signal-logger/signal-logger.service";
export { SignalSyncService } from "./core/lib/signal-sync/signal-sync.service";
export { ToastService } from "./core/lib/toast/toast.service";
export { SchemaElementComponent } from "./core/lib/schema-router/schema-element.component";
export {
  SCHEMA_COMPONENT_MAP,
  registerSchemaComponent,
} from "./core/lib/schema-component.registry";

// Storage services
export { StorageService } from "./storage/storage.service";
export { LocalStorageService } from "./storage/local-storage.service";
export type { StorageValidator } from "./storage/local-storage.service";
export { IndexedDbService } from "./storage/indexed-db.service";
export { UnifiedStorageService } from "./core-storage/unified-storage.service";
export {
  StorageCacheService,
  type CacheEntry,
} from "./core-storage/storage-cache.service";
export {
  StorageQueryService,
  type QueryFilter,
} from "./core-storage/storage-query.service";
export { SignalStore, createSignalStore } from "./core-storage/signal-store";

// Existing working services
export { InvokeWrapperService } from "./core-api/invoke-wrapper.service";
export { CrudService as RemoteCrudService } from "./core-crud/crud.service";

// Unified CRUD service — maps to Rust define_crud_routes! commands
export { ApiCrudService, type CrudFilter } from "./core-api/api-crud.service";

// Schema setup — unified schema loading and Angular route registration
export {
  SchemaSetupService,
  type SchemaSetupOptions,
} from "./core/lib/schema-router/schema-setup.service";

// Unified app configuration providers
export {
  provideUnifiedApp,
  type UnifiedAppConfig,
  type AppProvider,
} from "./core/providers/unified-config";

// Base CRUD service
export {
  BaseCrudService,
  type BaseEntity,
  type BaseServiceConfig,
} from "./core-crud/base-crud.service";

// Core API types
export type { Response } from "./core-api/tauri/response";
export {
  ResponseStatus,
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
export * from "./utils/math";
export * from "./utils/string";
export {
  formatDateRelative,
  formatLocaleDate,
  generateCalendarDays,
  isSameDay,
  formatTime as formatTimeFromDate,
  compareByTimestamp,
  getLatestTimestamp,
} from "./utils/date";
export * from "./utils/json";
export {
  findById,
  findByIdOrThrow,
  upsertEntity,
  deduplicateById,
  groupByField,
} from "./utils/array";
export { trackByRow, trackByIndex, groupByKey } from "./utils/collection";
export { evictLRU, evictLRUInPlace, isStale } from "./utils/cache";
export {
  generateId,
  generateTransactionId,
  generateBatchId,
  generateLogId,
  generateQueryId,
  generateTabId,
} from "./utils/id";
export { formatBytes, formatCompactNumber } from "./utils/bytes";
export {
  isNullOrUndefined,
  isPresent,
  isValidEmail,
  isValidBase64Image,
} from "./utils/validation";
export { escapeSqlValue, escapeCsvValue } from "./utils/escape";
export * from "./utils/object";
export * from "./utils/async";
export * from "./utils/state";
export * from "./utils/events";
export { filterBySearch } from "./utils/filter";
export {
  getErrorMessage as getErrorMessageFromUnknown,
  withErrorHandling,
} from "./utils/error";

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
export {
  PermissionService,
  TodoPermission,
  Permission,
  Role,
  User,
  PermissionCheckResult,
  TodoPermissionContext,
} from "./core/lib/rbac/permission.service";
export { rbacGuard, rbacRoleGuard } from "./core/lib/rbac/rbac.guard";
export {
  RbacHasPermissionDirective,
  RbacHasRoleDirective,
} from "./core/lib/rbac/rbac-has-permission.directive";

// Components
export { PaginationComponent } from "./components/pagination/pagination.component";

// Update services
export {
  UpdateService,
  type UpdateInfo,
  type DownloadProgress,
} from "./core/update/update.service";
export { AboutService } from "./core/update/about.service";
