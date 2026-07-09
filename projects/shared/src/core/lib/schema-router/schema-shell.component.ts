import {
  Component,
  OnInit,
  Input,
  signal,
  computed,
  effect,
  CUSTOM_ELEMENTS_SCHEMA,
  HostListener,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { InvokeWrapperService } from "../../../core-api/invoke-wrapper.service";
import { SchemaRouterService } from "./schema-router.service";
import { SchemaRendererService } from "../schema-renderer/schema-renderer.service";
import { StyleThemeService } from "../../../styles/theme.service";
import { ThemeToggleService } from "../../../styles/theme-toggle.service";
import { FallbackService } from "../fallback/fallback.service";
import type { StyleVariant } from "../../../styles/style-registry";
import { SchemaRouteViewerComponent } from "./schema-route-viewer.component";
import { SchemaElementComponent } from "./schema-element.component";
import type { LayoutElement, RegionType, UiSchema } from "../types";

@Component({
  selector: "lib-schema-shell",
  standalone: true,
  imports: [CommonModule, SchemaRouteViewerComponent, SchemaElementComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: "./schema-shell.component.html",
  styleUrl: "./schema-shell.component.css",
})
export class SchemaShellComponent implements OnInit {
  @Input() appId = "";
  @Input() commandName = "get_ui_schema";
  @Input() defaultTheme: StyleVariant = "material-design-v3";
  @Input() initialRoute = "";
  @Input() errorFallbackCommandName = "";

  readonly loading = signal(true);
  readonly error = signal<string | null>(null);

  /** All raw layout regions from the renderer (unfiltered) */
  private readonly rawRegions = computed<LayoutElement[]>(() => {
    this.schemaRouter.currentRoute();
    return this.renderer.getLayoutRegions();
  });

  /** Infer region type from explicit `region` property or fall back to ID pattern matching */
  private getRegionType(region: LayoutElement): RegionType {
    if (region.region) return region.region;
    const id = region.id.toLowerCase();
    if (id.includes("header")) return "header";
    if (id.includes("sidebar-right")) return "sidebar-right";
    if (id.includes("sidebar")) return "sidebar";
    if (id.includes("footer")) return "footer";
    if (
      id.includes("bottom-nav") ||
      (id.includes("bottom") && !id.includes("nav"))
    )
      return "bottom-nav";
    if (id.includes("nav")) return "nav";
    if (id.includes("overlay")) return "overlay";
    return "other";
  }

  private isRegionVisible(region: LayoutElement): boolean {
    return this.renderer.isElementVisible(region);
  }

  private regionByType(type: RegionType): LayoutElement | null {
    return (
      this.rawRegions().find(
        (r) => this.isRegionVisible(r) && this.getRegionType(r) === type,
      ) ?? null
    );
  }

  private regionsByType(type: RegionType): LayoutElement[] {
    return this.rawRegions().filter(
      (r) => this.isRegionVisible(r) && this.getRegionType(r) === type,
    );
  }

  readonly headerRegion = computed(() => this.regionByType("header"));
  readonly sidebarLeftRegion = computed(
    () => this.regionByType("sidebar") ?? this.regionByType("sidebar-left"),
  );
  readonly sidebarRightRegion = computed(() =>
    this.regionByType("sidebar-right"),
  );
  readonly footerRegion = computed(() => this.regionByType("footer"));
  readonly bottomNavRegion = computed(() => this.regionByType("bottom-nav"));
  readonly overlayRegions = computed(() => this.regionsByType("overlay"));

  /** Unrecognized regions rendered in an extra row below the main layout */
  readonly otherRegions = computed<LayoutElement[]>(() => {
    return this.rawRegions().filter(
      (r) => this.isRegionVisible(r) && this.getRegionType(r) === "other",
    );
  });

  /** CSS grid-template-columns — always 3 columns, hidden sidebars get 0px */
  readonly gridColumns = computed(() => {
    const leftWidth = this.sidebarLeftRegion() ? "auto" : "0px";
    const rightWidth = this.sidebarRightRegion() ? "auto" : "0px";
    return `${leftWidth} 1fr ${rightWidth}`;
  });

  /** CSS grid-template-rows — hidden regions get 0px */
  readonly gridRows = computed(() => {
    const headerH = this.headerRegion() ? "auto" : "0px";
    const footerH = this.footerRegion() ? "auto" : "0px";
    const bottomH = this.bottomNavRegion() ? "auto" : "0px";
    const otherH = this.otherRegions().length ? "auto" : "0px";
    return `${headerH} 1fr ${footerH} ${bottomH} ${otherH}`;
  });

  /** CSS grid-template-areas — always 5 rows with 3 columns */
  readonly gridAreas = computed(() => {
    const header = this.headerRegion() ? '"header header header"' : '". . ."';
    const left = this.sidebarLeftRegion() ? "sidebar-left" : ".";
    const right = this.sidebarRightRegion() ? "sidebar-right" : ".";
    const middle = `"${left} content ${right}"`;
    const footer = this.footerRegion() ? '"footer footer footer"' : '". . ."';
    const bottom = this.bottomNavRegion()
      ? '"bottom-nav bottom-nav bottom-nav"'
      : '". . ."';
    const other = this.otherRegions().length
      ? '"other other other"'
      : '". . ."';
    return `${header} ${middle} ${footer} ${bottom} ${other}`;
  });

  constructor(
    private invokeWrapper: InvokeWrapperService,
    private schemaRouter: SchemaRouterService,
    private renderer: SchemaRendererService,
    private themeService: StyleThemeService,
    private themeToggle: ThemeToggleService,
    private fallbackService: FallbackService,
  ) {
    effect(() => {
      const route = this.schemaRouter.currentRoute();
      if (route) this.renderer.setCurrentRoute(route);
    });
  }

  async ngOnInit() {
    if (!this.appId) return;
    this.themeService.loadTheme(this.defaultTheme);
    this.themeToggle.init();
    await this.loadSchema();
  }

  @HostListener("window:toggle-dark", ["$event"])
  onWindowToggleDark(event: Event): void {
    const e = event as CustomEvent<{ isDark: boolean }>;
    if (e.detail?.isDark !== undefined) {
      this.themeService.setDarkMode(e.detail.isDark);
    }
  }

  private async loadSchema() {
    console.log(
      `[SchemaShell] loadSchema() starting, appId="${this.appId}", command="${this.commandName}"`,
    );
    this.loading.set(true);
    this.error.set(null);
    try {
      const response = await this.invokeWrapper.invoke<any>(this.commandName, {
        id: this.appId,
      });
      console.log(
        `[SchemaShell] invoke("${this.commandName}") response:`,
        response ? `data.pages=${response?.data?.pages?.length}` : "null",
      );
      const schema = response?.data;
      if (!schema?.pages?.length) {
        console.warn(`[SchemaShell] schema has no pages, schema=`, schema);
        this.error.set("Schema not found. Create it in the Designer and sync.");
        return;
      }
      console.log(
        `[SchemaShell] setSchema() pages=${schema.pages.length}, loadSchema() pages=${schema.pages.length}`,
      );
      this.schemaRouter.setSchema(schema);
      this.renderer.loadSchema(schema);
      this.renderer.registerFunction("toggleThemeDark", () => {
        this.themeService.toggleDarkMode();
      });
      this.themeService.loadTheme(schema.app?.style ?? this.defaultTheme);
      const route =
        this.initialRoute || schema.pages[0].route || `/${schema.pages[0].id}`;
      console.log(`[SchemaShell] navigate("${route}")`);
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

      if (this.errorFallbackCommandName) {
        try {
          const fallbackResponse = await this.invokeWrapper.invoke<any>(
            this.errorFallbackCommandName,
            { id: this.appId },
          );
          const fallbackSchema = fallbackResponse?.data;
          if (fallbackSchema?.pages?.length) {
            console.warn(
              "[SchemaShell] Primary schema failed, using fallback schema",
            );
            this.schemaRouter.setSchema(fallbackSchema);
            this.renderer.loadSchema(fallbackSchema);
            await this.schemaRouter.navigate("/schema-error");
            this.loading.set(false);
            return;
          }
        } catch (fallbackErr) {
          console.error(
            "[SchemaShell] Fallback schema also failed:",
            fallbackErr,
          );
        }
      }

      console.warn(
        `[SchemaShell] All schema loading failed, using fallback error schema. Original error: ${originalMessage}`,
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
}
