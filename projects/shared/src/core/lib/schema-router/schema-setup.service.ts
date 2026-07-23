import { Injectable, inject, signal } from "@angular/core";
import { Router, type Routes } from "@angular/router";
import { InvokeWrapperService } from "../../../core-api/invoke-wrapper.service";
import { SchemaRouterService } from "./schema-router.service";
import { SchemaRendererService } from "../schema-renderer/schema-renderer.service";
import { StyleThemeService } from "../../../styles/theme.service";
import {
  loadStyleVariant,
  type StyleVariant,
} from "../../../styles/style-registry";
import { FallbackService } from "../fallback/fallback.service";
import {
  HandlerExecutorService,
  type HandlerDefinition,
} from "../handler-executor/handler-executor.service";
import type { UiSchema } from "../types";
import { logger } from "../../../utils/legacy/logger";

export interface SchemaSetupOptions {
  /** Initial route to navigate to after schema loads */
  initialRoute?: string;
  /** Theme variant to apply (default: 'material-design-v3') */
  themeVariant?: StyleVariant;
  /** Schema handler definitions */
  handlers?: Record<string, HandlerDefinition>;
  /** Whether to auto-register schema pages as Angular routes (default: false) */
  autoRegisterRoutes?: boolean;
  /** Called after schema loads successfully */
  onSchemaLoaded?: (schema: UiSchema) => void;
  /** Called if schema loading fails */
  onError?: (error: Error) => void;
}

@Injectable({ providedIn: "root" })
export class SchemaSetupService {
  private invokeWrapper = inject(InvokeWrapperService);
  private schemaRouter = inject(SchemaRouterService);
  private renderer = inject(SchemaRendererService);
  private themeService = inject(StyleThemeService);
  private fallbackService = inject(FallbackService);
  private handlerExecutor = inject(HandlerExecutorService);

  private router: Router | null = null;

  readonly schemaLoaded = signal(false);
  readonly setupError = signal<string | null>(null);

  /**
   * Complete schema setup: load, validate, register, navigate.
   * This replaces per-app schema loading boilerplate.
   */
  async setup(
    appId: string,
    options?: SchemaSetupOptions,
  ): Promise<UiSchema | null> {
    this.schemaLoaded.set(false);
    this.setupError.set(null);
    this.handlerExecutor.setRouter(this.schemaRouter);

    const themeVariant = options?.themeVariant ?? "material-design-v3";

    try {
      this.themeService.loadTheme(themeVariant);

      const schema = await this.loadSchema(appId);

      if (!schema) return null;

      this.registerFunctions(options);
      this.applyTheme(schema, themeVariant, options);

      const route =
        options?.initialRoute ||
        schema.pages?.[0]?.route ||
        `/${schema.pages?.[0]?.id || ""}`;
      logger.log(`[SchemaSetup] navigating to "${route}"`);
      await this.schemaRouter.navigate(route);

      if (options?.autoRegisterRoutes === true) {
        this.registerRouter();
      }

      options?.onSchemaLoaded?.(schema);
      this.schemaLoaded.set(true);
      return schema;
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      this.setupError.set(message);
      options?.onError?.(err instanceof Error ? err : new Error(message));
      return null;
    }
  }

  /**
   * Set the Angular Router instance for route registration.
   * Called automatically if Router is available via DI.
   */
  setRouter(router: Router): void {
    this.router = router;
  }

  /**
   * Register all schema pages as Angular Routes pointing to SchemaRouteViewerComponent.
   * Must be called AFTER schema is loaded.
   */
  registerRouter(): void {
    const activeRouter = this.router ?? inject(Router, { optional: true });
    if (!activeRouter) {
      logger.warn("[SchemaSetup] Router not available for route registration");
      return;
    }

    const routes = this.toAngularRoutes();
    if (routes.length === 0) return;

    logger.log(
      `[SchemaSetup] registering ${routes.length} Angular routes from schema`,
    );
    activeRouter.resetConfig(routes);
  }

  /**
   * Convert all schema pages to Angular Routes.
   * Delegates to SchemaRouterService.toAngularRoutes().
   */
  toAngularRoutes(): Routes {
    return this.schemaRouter.toAngularRoutes();
  }

  private async loadSchema(appId: string): Promise<UiSchema | null> {
    const response = await this.invokeWrapper.invoke<any>("get_schema", {
      id: appId,
    });
    logger.log(
      `[SchemaSetup] invoke("get_schema") response:`,
      response ? `pages=${response?.data?.pages?.length}` : "null",
    );

    const schema: UiSchema = response?.data ?? response;
    if (!schema?.pages?.length) {
      this.setupError.set(
        "Schema has no pages. Create it in Designer and sync.",
      );
      return null;
    }

    this.schemaRouter.setSchema(schema);
    this.renderer.loadSchema(schema);

    if ((schema as any).handlers) {
      this.handlerExecutor.setHandlers((schema as any).handlers as any);
    }

    return schema;
  }

  private registerFunctions(options?: SchemaSetupOptions): void {
    this.renderer.registerFunction("toggleThemeDark", () => {
      this.themeService.toggleDarkMode();
    });
    this.renderer.registerFunction("reloadSchema", () => {
      this.setupError.set(null);
    });
    if (options?.handlers) {
      this.handlerExecutor.setHandlers(options.handlers as any);
    }
  }

  private applyTheme(
    schema: UiSchema,
    defaultVariant: string,
    _options?: SchemaSetupOptions,
  ): void {
    const variant = (schema as any).app?.style ?? defaultVariant;
    this.themeService.loadTheme(variant);
    loadStyleVariant(variant).then(() => {
      if (this.themeService.isDarkMode()) {
        this.themeService.setDarkMode(true);
      }
    });
  }
}
