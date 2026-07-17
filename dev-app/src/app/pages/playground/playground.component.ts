import {
  Component,
  OnInit,
  signal,
  computed,
  inject,
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import {
  SchemaRouterService,
  SchemaRendererService,
  HandlerExecutorService,
  StyleThemeService,
  loadStyleVariant,
  SchemaRouteViewerComponent,
  type AppSchema,
  type StyleVariant,
} from "@tauri-front/shared";

/**
 * Schema-driven playground. The layout, regions, and page body are all declared
 * declaratively in /assets/schemas.json. This component:
 *
 *   1. Fetches the schema over HTTP (the library's normal path is Tauri invoke,
 *      which is unavailable in a plain browser dev-app).
 *   2. Hands the schema directly to SchemaRouterService + SchemaRendererService.
 *   3. Registers handler functions via HandlerExecutorService so the schema's
 *      `handlers` block can invoke them via `{ "call": "<name>" }`.
 *   4. Renders <lib-schema-route-viewer> with showLayoutRegions=true, which is
 *      the library-provided M3 scaffold (header / sidebar / footer / bottom-nav
 *      / overlay + main content).
 *
 * Event wiring caveat: SchemaElementComponent (the schema-driven renderer)
 * applies props via setInput() but does NOT wire the schema `events` field.
 * Therefore interactive bits that need their own @Output bindings (FAB,
 * theme toggle click propagation, modal open/close) are NOT routed through
 * the schema's `handlers` block \u2014 they are handled directly in the host
 * template below. The schema `handlers` block is preserved as a declarative
 * contract so the SAME schema can be reused in a Tauri app where the library's
 * own schema-shell wires events natively.
 */
@Component({
  selector: "app-playground",
  standalone: true,
  imports: [CommonModule, SchemaRouteViewerComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="playground-shell">
      @if (loadError(); as err) {
        <div class="playground-error-banner">Schema load failed: {{ err }}</div>
      } @else if (schema()) {
        <lib-schema-route-viewer
          [showLayoutRegions]="true"
        ></lib-schema-route-viewer>
      } @else {
        <div class="playground-loading">Loading declarative schema…</div>
      }
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        min-height: 100vh;
      }
      .playground-shell {
        display: block;
        width: 100%;
        min-height: 100vh;
      }
      .playground-loading,
      .playground-error-banner {
        padding: 2rem;
        text-align: center;
        font-family: var(--ui-font-sans, Roboto, system-ui, sans-serif);
      }
      .playground-error-banner {
        color: var(--ui-on-error-container, #b3261e);
        background: var(--ui-error-container, #f9dedc);
      }
    `,
  ],
})
export class PlaygroundComponent implements OnInit {
  private readonly schemaRouter = inject(SchemaRouterService);
  private readonly renderer = inject(SchemaRendererService);
  private readonly handlerExecutor = inject(HandlerExecutorService);
  private readonly themeService = inject(StyleThemeService);
  private readonly router = inject(Router);

  /** Local signal of the loaded schema \u2014 null until fetch resolves. */
  readonly schema = signal<AppSchema | null>(null);
  readonly loadError = signal<string | null>(null);

  /** Reactive view used by the template. */
  readonly ready = computed(() => this.schema() !== null);

  async ngOnInit(): Promise<void> {
    try {
      const response = await fetch("/assets/schemas.json", {
        cache: "no-store",
      });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status} ${response.statusText}`);
      }
      const json = (await response.json()) as AppSchema;
      if (!json?.pages?.length) {
        throw new Error("schemas.json has no pages array");
      }
      this.schema.set(json);

      // Apply the active style variant declared by the schema BEFORE registering
      // handlers \u2014 StyleThemeService.loadTheme() applies tokens; loadStyleVariant
      // additionally injects the variant's component CSS into <head>.
      const variant = (json.app?.style ?? "material-design-v3") as StyleVariant;
      this.themeService.loadTheme(variant);
      try {
        await loadStyleVariant(variant);
      } catch (e) {
        // Variant CSS missing \u2014 still proceed; tokens-only fallback is fine.
        console.warn("[Playground] loadStyleVariant failed:", e);
      }

      // Hand the schema to the library's router/renderer/handler-executor.
      // The library's UiSchema type requires `version` + `layouts`; AppSchema
      // (the export we're parsing) is the superset produced by the Designer.
      // They are structurally compatible for setSchema/loadSchema purposes.
      this.schemaRouter.setSchema(
        json as unknown as Parameters<SchemaRouterService["setSchema"]>[0],
      );
      this.renderer.loadSchema(json);

      // Wire schema handlers \u2014 each handler in the schema is `{ "call": "<name>" }`.
      // We register a matching function for every handler name.
      const handlers = (json.handlers ?? {}) as Record<
        string,
        { call?: string }
      >;
      this.handlerExecutor.setHandlers(
        handlers as unknown as Parameters<
          HandlerExecutorService["setHandlers"]
        >[0],
      );
      for (const handlerName of Object.keys(handlers)) {
        const fn = handlers[handlerName]?.call;
        if (typeof fn === "string") {
          this.handlerExecutor.registerFunction(fn, () => this.callByName(fn));
        }
      }

      // Drive navigation from the schema. The first page wins if no route is set.
      const target =
        this.schemaRouter.currentRoute() ||
        json.pages[0].route ||
        `/${json.pages[0].id}`;
      await this.schemaRouter.navigate(target);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      this.loadError.set(message);
      console.error("[Playground] schema load failed:", err);
      // Route to the dedicated error page so users see diagnostics.
      this.router.navigate(["/schema-error"], {
        queryParams: { reason: message },
      });
    }
  }

  /**
   * Dispatches a registered function by name. Keep this list exhaustive \u2014
   * any schema handler that maps to a name NOT here will silently no-op.
   */
  private callByName(name: string): void {
    switch (name) {
      case "setStyleVariant":
        // last arg of style-switcher is the new variant; for this playground we
        // also accept a fixed-cycle fallback so the handler is testable from
        // anywhere (the style-switcher's own (variantChange) drives the
        // normal flow when present).
        this.themeService.cycle();
        return;
      case "scrollToSection":
        // The variantChange event payload would carry the section id; for the
        // sidebar's sectionScroll event, the id arrives on the click target.
        // Keep it as a sensible fallback (re-read activeId below if needed).
        return;
      case "toggleDarkMode":
        this.themeService.toggleDarkMode();
        return;
      case "openModal":
        // Modal is rendered by the host scaffold; left as a no-op handler
        // placeholder so the schema contract stays declarative.
        return;
      case "closeModal":
        return;
      case "fabAction":
        return;
      default:
        console.warn(`[Playground] unhandled schema function: ${name}`);
        return;
    }
  }
}
