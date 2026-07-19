import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  signal,
  ChangeDetectorRef,
  inject,
  CUSTOM_ELEMENTS_SCHEMA,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { listen, UnlistenFn } from "@tauri-apps/api/event";
import {
  SchemaRouterService,
  SchemaRendererService,
  HandlerExecutorService,
  StyleThemeService,
  loadStyleVariant,
  SchemaRouteViewerComponent,
  type AppSchema,
  type StyleVariant,
} from "../../index";

@Component({
  selector: "lib-schema-app",
  standalone: true,
  imports: [CommonModule, SchemaRouteViewerComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    @if (loadError(); as err) {
      <div style="padding: 2rem; text-align: center; color: var(--ui-on-error-container, #b3261e); background: var(--ui-error-container, #f9dedc);">
        Schema load failed: {{ err }}
      </div>
    } @else if (schema()) {
      <lib-schema-route-viewer [showLayoutRegions]="true"></lib-schema-route-viewer>
    } @else {
      <div style="padding: 2rem; text-align: center;">Loading schema…</div>
    }
  `,
})
export class LibSchemaApp implements OnInit, OnDestroy {
  @Input() schemaUrl = "/assets/schema.json";

  private schemaRouter: SchemaRouterService;
  private renderer: SchemaRendererService;
  private handlerExecutor: HandlerExecutorService;
  private themeService: StyleThemeService;
  private router: Router;
  private cdr: ChangeDetectorRef;

  private unlistenDarkMode?: UnlistenFn;
  private unlistenToggle?: UnlistenFn;

  readonly schema = signal<AppSchema | null>(null);
  readonly loadError = signal<string | null>(null);

  constructor(
    schemaRouter: SchemaRouterService,
    renderer: SchemaRendererService,
    handlerExecutor: HandlerExecutorService,
    themeService: StyleThemeService,
    router: Router,
    cdr: ChangeDetectorRef
  ) {
    this.schemaRouter = schemaRouter;
    this.renderer = renderer;
    this.handlerExecutor = handlerExecutor;
    this.themeService = themeService;
    this.router = router;
    this.cdr = cdr;
    console.log("[LibSchemaApp] constructed");
  }

  async ngOnInit(): Promise<void> {
    console.log("[LibSchemaApp] ngOnInit starting");
    try {
      this.unlistenDarkMode = await listen<boolean>("theme:set-dark-mode", (event) => {
        this.themeService.setDarkMode(event.payload);
      });
      this.unlistenToggle = await listen("theme:toggle", () => {
        this.themeService.toggleDarkMode();
      });
    } catch {
      console.log("[LibSchemaApp] Not in Tauri context");
    }
    await this.loadSchema();
  }

  ngOnDestroy(): void {
    this.unlistenDarkMode?.();
    this.unlistenToggle?.();
  }

  async loadSchema(): Promise<void> {
    try {
      const response = await fetch(this.schemaUrl, { cache: "no-store" });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const json = (await response.json()) as AppSchema;
      if (!json?.pages?.length) throw new Error("Schema has no pages");

      this.schema.set(json);
      const variant = (json.app?.style ?? "material-design-v3") as StyleVariant;
      this.themeService.loadTheme(variant);
      try { await loadStyleVariant(variant); } catch (e) { /* ignore */ }

      this.schemaRouter.setSchema(json as any);
      this.renderer.loadSchema(json);

      if (json.handlers) {
        this.handlerExecutor.setHandlers(json.handlers as any);
      }

      const target = json.pages[0].route || `/${json.pages[0].id}`;
      await this.schemaRouter.navigate(target);

      this.cdr.detectChanges();
      console.log("[LibSchemaApp] Schema loaded successfully");
    } catch (err) {
      this.loadError.set(err instanceof Error ? err.message : String(err));
      console.error("[LibSchemaApp] loadSchema failed:", this.loadError());
      this.cdr.detectChanges();
    }
  }
}
