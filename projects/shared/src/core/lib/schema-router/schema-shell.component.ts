import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
  Input,
  signal,
  computed,
  effect,
  CUSTOM_ELEMENTS_SCHEMA,
  HostListener,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { Subscription } from "rxjs";
import { InvokeWrapperService } from "../../../core-api/invoke-wrapper.service";
import { SchemaRouterService } from "./schema-router.service";
import { SchemaRendererService } from "../schema-renderer/schema-renderer.service";
import { StyleThemeService } from "../../../styles/theme.service";
import { LayoutRegionService } from "../layout-region.service";
import { FallbackService } from "../fallback/fallback.service";
import { HandlerExecutorService } from "../handler-executor/handler-executor.service";
import { SignalStoreService } from "../signal-store/signal-store.service";
import { ToastContainerComponent } from "../toast/toast-container.component";
import type { StyleVariant } from "../../../styles/style-registry";
import {
  loadStyleVariant,
  getCurrentStyle,
} from "../../../styles/style-registry";
import { SchemaRouteViewerComponent } from "./schema-route-viewer.component";
import { SchemaElementComponent } from "./schema-element.component";
import type { LayoutElement, UiSchema } from "../types";
import { logger } from "../../../utils/legacy/logger";

@Component({
  selector: "lib-schema-shell",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    SchemaRouteViewerComponent,
    SchemaElementComponent,
    ToastContainerComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: "./schema-shell.component.html",
})
export class SchemaShellComponent implements OnInit, OnDestroy {
  @Input() appId = "";
  @Input() defaultTheme: StyleVariant = "material-design-v3";
  @Input() initialRoute = "";
  /** When true, auto-renders app-toast-container and a full-screen loading overlay */
  @Input() includeOverlays = true;

  readonly loading = signal(true);
  readonly error = signal<string | null>(null);

  private themeSubscription?: Subscription;

  /** All raw layout regions from the renderer (unfiltered) */
  private readonly rawRegions = computed<LayoutElement[]>(() => {
    this.schemaRouter.currentRoute();
    return this.renderer.getLayoutRegions();
  });

  readonly headerRegion = computed(() =>
    this.layoutRegions.regionByType(
      this.rawRegions(),
      (r) => this.renderer.isElementVisible(r),
      "header",
    ),
  );
  readonly sidebarLeftRegion = computed(
    () =>
      this.layoutRegions.regionByType(
        this.rawRegions(),
        (r) => this.renderer.isElementVisible(r),
        "sidebar",
      ) ??
      this.layoutRegions.regionByType(
        this.rawRegions(),
        (r) => this.renderer.isElementVisible(r),
        "sidebar-left",
      ),
  );
  readonly sidebarRightRegion = computed(() =>
    this.layoutRegions.regionByType(
      this.rawRegions(),
      (r) => this.renderer.isElementVisible(r),
      "sidebar-right",
    ),
  );
  readonly footerRegion = computed(() =>
    this.layoutRegions.regionByType(
      this.rawRegions(),
      (r) => this.renderer.isElementVisible(r),
      "footer",
    ),
  );
  readonly bottomNavRegion = computed(() =>
    this.layoutRegions.regionByType(
      this.rawRegions(),
      (r) => this.renderer.isElementVisible(r),
      "bottom-nav",
    ),
  );
  readonly overlayRegions = computed(() =>
    this.layoutRegions.regionsByType(
      this.rawRegions(),
      (r) => this.renderer.isElementVisible(r),
      "overlay",
    ),
  );

  /** Unrecognized regions rendered in an extra row below the main layout */
  readonly otherRegions = computed<LayoutElement[]>(() => {
    return this.layoutRegions.regionsByType(
      this.rawRegions(),
      (r) => this.renderer.isElementVisible(r),
      "other",
    );
  });

  constructor(
    private invokeWrapper: InvokeWrapperService,
    private schemaRouter: SchemaRouterService,
    private renderer: SchemaRendererService,
    private themeService: StyleThemeService,
    private layoutRegions: LayoutRegionService,
    private fallbackService: FallbackService,
    private handlerExecutor: HandlerExecutorService,
    private signalStore: SignalStoreService,
  ) {
    this.handlerExecutor.setRouter(this.schemaRouter);
    effect(() => {
      const route = this.schemaRouter.currentRoute();
      if (route) this.renderer.setCurrentRoute(route);
    });
  }

  async ngOnInit() {
    if (!this.appId) return;
    this.setupThemeStoreSync();
    this.themeService.loadTheme(this.defaultTheme);
    this.themeService.initSystemThemeListener();
    await this.loadSchema();
  }

  private setupThemeStoreSync() {
    this.themeSubscription = this.themeService.themeChanged$.subscribe(
      ({ isDark }) => {
        const settings = this.signalStore.get("translator-settings") as Record<
          string,
          unknown
        >;
        if (settings && settings["darkMode"] !== isDark) {
          settings["darkMode"] = isDark;
          this.signalStore.set("translator-settings", settings);
        }
      },
    );
  }

  ngOnDestroy() {
    this.themeSubscription?.unsubscribe();
  }

  @HostListener("window:toggle-dark", ["$event"])
  onWindowToggleDark(event: Event): void {
    const e = event as CustomEvent<{ isDark: boolean }>;
    if (e.detail?.isDark !== undefined) {
      this.themeService.setDarkMode(e.detail.isDark);
    }
  }

  @HostListener("window:keydown", ["$event"])
  onKeyDown(event: KeyboardEvent): void {
    if ((event.ctrlKey || event.metaKey) && event.key === ",") {
      event.preventDefault();
      this.schemaRouter.navigate("/settings");
    }
  }

  private async loadSchema() {
    logger.log(
      `[SchemaShell] loadSchema() starting, appId="${this.appId}"`,
    );
    this.loading.set(true);
    this.error.set(null);
    try {
      const response = await this.invokeWrapper.invoke<any>("get_schema", {
        id: this.appId,
      });
      logger.log(
        `[SchemaShell] invoke("get_schema") response:`,
        response ? `data.pages=${response?.data?.pages?.length}` : "null",
      );

      // Handle both Response envelope (response.data) and direct schema (response.pages)
      let schema: any;
      if (response?.data !== undefined) {
        schema = response.data; // Response envelope
      } else if (response?.pages) {
        schema = response; // Direct schema (no envelope)
      } else {
        logger.error(`[SchemaShell] Unexpected response structure:`, response);
        schema = null;
      }
      if (!schema?.pages?.length) {
        logger.warn(`[SchemaShell] schema has no pages, schema=`, schema);
        this.error.set("Schema not found. Create it in the Designer and sync.");
        return;
      }
      logger.log(
        `[SchemaShell] setSchema() pages=${schema.pages.length}, loadSchema() pages=${schema.pages.length}`,
      );
      this.schemaRouter.setSchema(schema);
      this.renderer.loadSchema(schema);
      if ((schema as any).stores) {
        this.signalStore.patch((schema as any).stores as Record<string, unknown>);
      }
      this.renderer.registerFunction("toggleThemeDark", () => {
        this.themeService.toggleDarkMode();
      });
      if (schema.handlers) {
        this.handlerExecutor.setHandlers(schema.handlers as any);
      }
      this.renderer.registerFunction(
        "reloadSchema",
        () => void this.loadSchema(),
      );
      this.themeService.loadTheme(schema.app?.style ?? this.defaultTheme);
      // Load the variant CSS into <head> so CSS variables and class selectors are available
      const variant = schema.app?.style ?? this.defaultTheme;
      await loadStyleVariant(variant);
      // Re-inject dark mode CSS for the newly loaded variant if dark mode is active
      if (this.themeService.isDarkMode()) {
        this.themeService.setDarkMode(true);
      }
      const route =
        this.initialRoute || schema.pages[0].route || `/${schema.pages[0].id}`;
      logger.log(`[SchemaShell] navigate("${route}")`);
      await this.schemaRouter.navigate(route);
    } catch (err) {
      const originalMessage =
        err instanceof Error
          ? err.message
          : typeof err === "object" && err
            ? String(
                (err as Record<string, unknown>)["message"] ??
                  Object.values(err as Record<string, unknown>)[0] ??
                  String(err),
              )
            : String(err);

      logger.warn(
        `[SchemaShell] Schema loading failed, using fallback error schema. Error: ${originalMessage}`,
      );
      const fallbackSchema = this.fallbackService.getFallbackSchema(
        originalMessage,
      ) as UiSchema;
      this.schemaRouter.setSchema(fallbackSchema);
      this.renderer.loadSchema(fallbackSchema);
      await this.schemaRouter.navigate("/schema-error");
    } finally {
      this.loading.set(false);
    }
  }

  retry() {
    this.loadSchema();
  }

  /**
   * Returns CSS classes for a region container by mapping its props to sf-prefixed classes.
   * Uses the same mapPropsToClasses() logic as schema elements for consistent styling.
   */
  getRegionClasses(region: LayoutElement | null): string {
    if (!region?.props) return "";
    const theme = getCurrentStyle();
    return this.renderer
      .mapPropsToClasses(region.componentId || "div", region.props, theme)
      .join(" ");
  }
}
