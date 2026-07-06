import { Injectable, signal, computed, inject } from "@angular/core";
import type { UiSchema, Page, Layout } from "../types";
import { GuardService } from "./guard.service";

export interface RouteConfig {
  path: string;
  pageId?: string;
  guards?: Array<{ type: string; params?: Record<string, unknown> }>;
}

export interface NavigationOptions {
  replaceUrl?: boolean;
  queryParams?: Record<string, string>;
}

@Injectable({ providedIn: "root" })
export class SchemaRouterService {
  private guardService = inject(GuardService, { optional: true });

  private readonly _schema = signal<UiSchema | null>(null);
  private readonly _currentPage = signal<Page | null>(null);
  private readonly _currentLayout = signal<Layout | null>(null);
  private readonly _currentRoute = signal<string>("");
  private readonly _params = signal<Record<string, string>>({});
  private readonly _queryParams = signal<Record<string, string>>({});
  private readonly _isLoading = signal<boolean>(false);
  private readonly _error = signal<string | null>(null);

  readonly schema = this._schema.asReadonly();
  readonly currentPage = this._currentPage.asReadonly();
  readonly currentLayout = this._currentLayout.asReadonly();
  readonly currentRoute = this._currentRoute.asReadonly();
  readonly params = this._params.asReadonly();
  readonly queryParams = this._queryParams.asReadonly();
  readonly isLoading = this._isLoading.asReadonly();
  readonly error = this._error.asReadonly();

  readonly hasSchema = computed(() => this._schema() !== null);
  readonly currentPageId = computed(() => this._currentPage()?.id ?? null);
  readonly currentPageTitle = computed(() => this._currentPage()?.meta?.title ?? "");

  setSchema(schema: UiSchema): void {
    this._schema.set(schema);
    this._error.set(null);
  }

  clearSchema(): void {
    this._schema.set(null);
    this._currentPage.set(null);
    this._currentLayout.set(null);
    this._params.set({});
    this._queryParams.set({});
  }

  async navigate(
    route: string,
    options: NavigationOptions = {}
  ): Promise<boolean> {
    this._isLoading.set(true);
    this._error.set(null);

    try {
      const matched = this.resolveRoute(route);
      if (!matched) {
        this._error.set(`Route not found: ${route}`);
        return false;
      }

      const { page, params } = matched;

      // Run guards if configured
      if (page && this.guardService) {
        const pageGuards = (page as unknown as Record<string, unknown>).guards as RouteConfig["guards"] | undefined;
        if (pageGuards?.length) {
          for (const guard of pageGuards) {
            const allowed = await this.guardService.canActivateWithConfig(guard as unknown as Parameters<typeof this.guardService.canActivateWithConfig>[0]);
            if (!allowed) {
              this._error.set(`Navigation blocked by guard: ${guard.type}`);
              return false;
            }
          }
        }
      }

      if (options.queryParams) {
        this._queryParams.set(options.queryParams);
      }

      this._currentRoute.set(route);
      this._params.set(params);

      if (page) {
        this._currentPage.set(page);

        // Load layout if specified
        if (page.layout && this._schema()) {
          const layout = this._schema()!.layouts.find((l) => l.id === page.layout);
          this._currentLayout.set(layout ?? null);
        } else {
          this._currentLayout.set(null);
        }
      }

      return true;
    } catch (err) {
      this._error.set(err instanceof Error ? err.message : "Navigation failed");
      return false;
    } finally {
      this._isLoading.set(false);
    }
  }

  resolveRoute(
    route: string
  ): { page: Page | null; layout: Layout | null; params: Record<string, string> } | null {
    const schema = this._schema();
    if (!schema) return null;

    // Exact match first
    let page = schema.pages.find((p) => p.route === route || p.id === route);
    if (page) {
      return { page, layout: null, params: {} };
    }

    // Try pattern matching with params
    for (const p of schema.pages) {
      const { match, params } = this.matchRoute(p.route, route);
      if (match) {
        const layout = p.layout ? schema.layouts.find((l) => l.id === p.layout) ?? null : null;
        return { page: p, layout, params };
      }
    }

    return null;
  }

  private matchRoute(
    pattern: string,
    path: string
  ): { match: boolean; params: Record<string, string> } {
    const patternParts = pattern.split("/").filter(Boolean);
    const pathParts = path.split("/").filter(Boolean);
    const params: Record<string, string> = {};

    if (patternParts.length !== pathParts.length) {
      return { match: false, params: {} };
    }

    for (let i = 0; i < patternParts.length; i++) {
      const p = patternParts[i];
      const a = pathParts[i];

      if (p.startsWith(":")) {
        // Parameter
        params[p.slice(1)] = a;
      } else if (p !== a) {
        return { match: false, params: {} };
      }
    }

    return { match: true, params };
  }

  getPage(pageId: string): Page | null {
    const schema = this._schema();
    if (!schema) return null;
    return schema.pages.find((p) => p.id === pageId) ?? null;
  }

  getLayout(layoutId: string): Layout | null {
    const schema = this._schema();
    if (!schema) return null;
    return schema.layouts.find((l) => l.id === layoutId) ?? null;
  }

  getAllPages(): Page[] {
    return this._schema()?.pages ?? [];
  }

  getAllLayouts(): Layout[] {
    return this._schema()?.layouts ?? [];
  }

  updateQueryParams(params: Record<string, string>): void {
    this._queryParams.set(params);
  }

  reset(): void {
    this._currentRoute.set("");
    this._currentPage.set(null);
    this._currentLayout.set(null);
    this._params.set({});
    this._queryParams.set({});
    this._isLoading.set(false);
    this._error.set(null);
  }
}
