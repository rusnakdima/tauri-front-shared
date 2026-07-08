import { Component, OnInit, Input, signal, computed, CUSTOM_ELEMENTS_SCHEMA, HostListener } from "@angular/core";
import { CommonModule } from "@angular/common";
import { InvokeWrapperService } from "../../../core-api/invoke-wrapper.service";
import { SchemaRouterService } from "./schema-router.service";
import { SchemaRendererService } from "../schema-renderer/schema-renderer.service";
import { StyleThemeService } from "../../../styles/theme.service";
import { FallbackService } from "../fallback/fallback.service";
import type { StyleVariant } from "../../../styles/style-registry";
import { SchemaRouteViewerComponent } from "./schema-route-viewer.component";
import { SchemaElementComponent } from "./schema-element.component";
import type { LayoutElement, UiSchema } from "../types";

@Component({
  selector: "lib-schema-shell",
  standalone: true,
  imports: [CommonModule, SchemaRouteViewerComponent, SchemaElementComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: "./schema-shell.component.html",
})
export class SchemaShellComponent implements OnInit {
  @Input() appId = "";
  @Input() commandName = "get_ui_schema";
  @Input() defaultTheme: StyleVariant = "material-design-v3";
  @Input() initialRoute = "";
  @Input() errorFallbackCommandName = "";

  readonly loading = signal(true);
  readonly error = signal<string | null>(null);
  readonly layoutRegions = computed<LayoutElement[]>(() => this.renderer.getLayoutRegions());

  constructor(
    private invokeWrapper: InvokeWrapperService,
    private schemaRouter: SchemaRouterService,
    private renderer: SchemaRendererService,
    private themeService: StyleThemeService,
    private fallbackService: FallbackService,
  ) {}

  async ngOnInit() {
    if (!this.appId) return;
    this.themeService.loadTheme(this.defaultTheme);
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
    this.loading.set(true);
    this.error.set(null);
    try {
      const response = await this.invokeWrapper.invoke<any>(this.commandName, { id: this.appId });
      const schema = response?.data;
      if (!schema?.pages?.length) {
        this.error.set("Schema not found. Create it in the Designer and sync.");
        return;
      }
      this.schemaRouter.setSchema(schema);
      this.renderer.loadSchema(schema);
      this.renderer.registerFunction("toggleThemeDark", () => {
        this.themeService.toggleDarkMode();
      });
      this.themeService.loadTheme(schema.app?.style ?? this.defaultTheme);
      const route = this.initialRoute || schema.pages[0].route || `/${schema.pages[0].id}`;
      await this.schemaRouter.navigate(route);
    } catch (err) {
      const originalMessage = err instanceof Error
        ? err.message
        : typeof err === "object" && err
          ? String(
              (err as Record<string, unknown>)["message"] ??
              Object.values(err as Record<string, unknown>)[0] ??
              String(err)
            )
          : String(err);

      // Try fallback schema if errorFallbackCommandName is provided
      if (this.errorFallbackCommandName) {
        try {
          const fallbackResponse = await this.invokeWrapper.invoke<any>(this.errorFallbackCommandName, { id: this.appId });
          const fallbackSchema = fallbackResponse?.data;
          if (fallbackSchema?.pages?.length) {
            this.schemaRouter.setSchema(fallbackSchema);
            this.renderer.loadSchema(fallbackSchema);
            await this.schemaRouter.navigate("/schema-error");
            this.loading.set(false);
            return;
          }
        } catch (fallbackErr) {
          console.error("SchemaShell: Fallback schema also failed:", fallbackErr);
        }
      }

      // Last resort: use fallback service to generate error schema and navigate to /schema-error
      // Don't set this.error() so the schema renders the error page instead of error UI
      const fallbackSchema = this.fallbackService.getFallbackSchema(originalMessage) as UiSchema;
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
