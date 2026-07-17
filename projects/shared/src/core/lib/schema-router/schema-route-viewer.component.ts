import { CommonModule } from "@angular/common";
import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
  computed,
  effect,
  CUSTOM_ELEMENTS_SCHEMA,
} from "@angular/core";
import { SchemaRouterService } from "./schema-router.service";
import { SchemaRendererService } from "../schema-renderer/schema-renderer.service";
import { SchemaElementComponent } from "./schema-element.component";
import type { Layout, LayoutElement, RegionType } from "../types";

@Component({
  selector: "lib-schema-route-viewer",
  standalone: true,
  imports: [CommonModule, SchemaElementComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: "./schema-route-viewer.component.html",
})
export class SchemaRouteViewerComponent implements OnInit, OnChanges {
  @Input() route = "";
  /** When true, renders schema layoutRegions (header, footer, bottom-nav, overlay) */
  @Input() showLayoutRegions = false;
  readonly page = computed(() => {
    const p = this.router.currentPage();
    if (p) {
      console.log(
        `[SchemaRouteViewer] page() computed: id="${p.id}", name="${p.name}", canvasElements=${p.canvasElements?.length ?? 0}, layouts=${p.layouts?.length ?? 0}`,
      );
    }
    return p;
  });

  /** CSS grid properties to apply via ngStyle */
  readonly gridStyles = computed(() => {
    const p = this.page();
    const layout: Layout | undefined = p?.layouts?.[0];
    if (!layout) return {};

    // For "stack" layouts, use flex column
    if (layout.type === "stack") {
      return { display: "flex", "flex-direction": "column" };
    }

    // For "flex" layouts
    if (layout.type === "flex") {
      const styles: Record<string, string> = { display: "flex" };
      styles["flex-direction"] =
        layout.direction === "column" ? "column" : "row";
      if (layout.gap) styles["gap"] = `${layout.gap * 0.25}rem`;
      if (layout.flexWrap) styles["flex-wrap"] = layout.flexWrap;
      return styles;
    }

    // For "grid" layouts
    const styles: Record<string, string> = { display: "grid" };

    // Normalize gridTemplateColumns: "12" → "repeat(12, 1fr)"
    if (layout.gridTemplateColumns) {
      const val = layout.gridTemplateColumns;
      if (/^\d+$/.test(val)) {
        styles["grid-template-columns"] = `repeat(${val}, 1fr)`;
      } else {
        styles["grid-template-columns"] = val;
      }
    }

    // Normalize gridTemplateRows: "6" → "repeat(6, auto)"
    if (layout.gridTemplateRows) {
      const val = layout.gridTemplateRows;
      if (/^\d+$/.test(val)) {
        styles["grid-template-rows"] = `repeat(${val}, auto)`;
      } else {
        styles["grid-template-rows"] = val;
      }
    }

    // Gap: schema value is a spacing token (4 = 1rem)
    const rowGap = layout.rowGap ?? layout.gap;
    const colGap = layout.colGap ?? layout.gap;
    if (rowGap !== undefined || colGap !== undefined) {
      const rg = rowGap ? `${rowGap * 0.25}rem` : "0";
      const cg = colGap ? `${colGap * 0.25}rem` : "0";
      styles["gap"] = `${rg} ${cg}`;
    }

    // Padding
    const px = layout.paddingX;
    const py = layout.paddingY;
    if (px !== undefined || py !== undefined) {
      styles["padding"] = `${py ? py * 0.25 : 0}rem ${px ? px * 0.25 : 0}rem`;
    }

    // Width
    if (layout.width === "full") styles["width"] = "100%";

    return styles;
  });

  /** CSS classes: schema-page + layout class */
  readonly containerClass = computed(() => {
    const layoutCls = this.page()?.layouts?.[0]?.class ?? "";
    return layoutCls ? `schema-page ${layoutCls}` : "schema-page";
  });

  // ── Layout region support ───────────────────────────────────────

  /** All layout regions from the renderer, re-computed when route changes */
  private readonly rawRegions = computed<LayoutElement[]>(() => {
    this.router.currentRoute();
    return this.renderer.getLayoutRegions();
  });

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

  readonly headerRegion = computed(() =>
    this.showLayoutRegions ? this.regionByType("header") : null,
  );
  readonly footerRegion = computed(() =>
    this.showLayoutRegions ? this.regionByType("footer") : null,
  );
  readonly bottomNavRegion = computed(() =>
    this.showLayoutRegions ? this.regionByType("bottom-nav") : null,
  );
  readonly overlayRegions = computed(() =>
    this.showLayoutRegions
      ? this.rawRegions().filter(
          (r) => this.isRegionVisible(r) && this.getRegionType(r) === "overlay",
        )
      : [],
  );

  constructor(
    public router: SchemaRouterService,
    private renderer: SchemaRendererService,
  ) {
    // Sync router params to the data binding resolver when params change
    effect(() => {
      const params = this.router.params();
      if (Object.keys(params).length > 0) {
        this.renderer.setParams(params);
      }
    });
  }

  /** Returns a comma-separated list of available page routes for the error message */
  getAvailableRoutes(): string {
    const schema = this.router.schema();
    if (!schema?.pages?.length) return "";
    return schema.pages.map((p) => p.route || p.id).join(", ");
  }

  ngOnInit() {
    console.log(
      `[SchemaRouteViewer] ngOnInit, route="${this.route}", currentRoute="${this.router.currentRoute()}"`,
    );
    if (this.route) {
      this.router.navigate(this.route);
    } else if (!this.router.currentRoute()) {
      const firstPage = this.router.schema()?.pages?.[0];
      if (firstPage?.route) {
        console.log(
          `[SchemaRouteViewer] auto-navigating to first page: "${firstPage.route}"`,
        );
        this.router.navigate(firstPage.route);
      }
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["route"]) this.router.navigate(this.route);
  }
}
