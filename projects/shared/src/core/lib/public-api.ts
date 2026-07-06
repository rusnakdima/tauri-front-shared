// Angular-specific services (keep local implementations)
export { ErrorHandlerService, type ErrorLogEntry, type RetryConfig } from "./error-handler/error-handler.service";
export { BaseDestroyableComponent } from "./base-destroyable.component";
export { SignalStoreService } from "./signal-store/signal-store.service";
export { SignalSyncService } from "./signal-sync/signal-sync.service";
export { SignalLoggerService } from "./signal-logger/signal-logger.service";
export { CrudService } from "./crud/crud.service";
export { DataPatchService } from "./data-patch/data-patch.service";
export { SchemaRendererService } from "./schema-renderer/schema-renderer.service";
export { ThemeService } from "./theme/theme.service";
export { EventBusService } from "./events/event-bus.service";
export { I18nService } from "./i18n/i18n.service";
export { GlobalStateService } from "./global-state/global-state.service";

// Missing exports - ADDED 2026-06-30
export { ComponentRegistryService } from "./component-registry.service";
export { DataBindingResolverService } from "./schema-renderer/data-binding-resolver";
export { LayoutEngineService } from "./schema-renderer/layout-engine";
export { SchemaRouterService } from "./schema-router/schema-router.service";
export { SchemaRouteViewerComponent } from "./schema-router/schema-route-viewer.component";

export * from "./rbac/permission.service";
export * from "./rbac/rbac.guard";
export * from "./rbac/rbac-has-permission.directive";

export * from "./types";
