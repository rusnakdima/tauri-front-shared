import {
  Component,
  Input,
  inject,
  AfterViewInit,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
  ViewContainerRef,
  ComponentRef,
  ApplicationRef,
  Injector,
  Type,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { SCHEMA_COMPONENT_MAP } from "../schema-component.registry";
import type { CanvasElement } from "../types";
import { SchemaRendererService } from "../schema-renderer/schema-renderer.service";
import { getCurrentStyle } from "../../../styles/style-registry";
import { StyleThemeService } from "../../../styles/theme.service";

@Component({
  selector: "app-schema-element",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./schema-element.component.html",
})
export class SchemaElementComponent
  implements AfterViewInit, OnChanges, OnInit
{
  private rendererService = inject(SchemaRendererService);
  private appRef = inject(ApplicationRef);
  private injector = inject(Injector);
  private styleThemeService = inject(StyleThemeService);

  @Input({ required: true }) element!: CanvasElement;
  @Input({ required: true }) elements: CanvasElement[] = [];

  @ViewChild("dynamicHost", { read: ViewContainerRef })
  private dynamicHost!: ViewContainerRef;
  private componentRef: ComponentRef<any> | null = null;

  get componentType(): Type<any> | null {
    return SCHEMA_COMPONENT_MAP.get(this.tag) ?? null;
  }

  get tag(): string {
    return this.element.componentId;
  }

  get classes(): string {
    const base = this.element.classes ?? "";
    if (!this.element.props) return this.normalizeClasses(base);
    const theme = getCurrentStyle();
    const mapped = this.rendererService.mapPropsToClasses(
      this.element.componentId,
      this.element.props,
      theme,
    );
    const mappedStr = mapped.join(" ").trim();
    return this.normalizeClasses(mappedStr ? `${base} ${mappedStr}` : base);
  }

  /**
   * Normalizes schema element classes: trims, deduplicates, and warns on
   * legacy sf-* patterns. Acts as a safety net for schemas that haven't yet
   * been migrated to ui-* tokens.
   */
  private normalizeClasses(classes: string): string {
    const seen = new Set<string>();
    return classes
      .trim()
      .split(/\s+/)
      .filter((cls) => {
        if (cls.startsWith("sf-")) {
          console.warn(
            `[SchemaElement] legacy sf-* class "${cls}" found in schema element "${this.element.id}" — migrate to ui-*`,
          );
          return false; // drop legacy classes
        }
        if (seen.has(cls)) return false; // deduplicate
        seen.add(cls);
        return true;
      })
      .join(" ");
  }

  ngOnInit() {
    const schemaTheme = this.element.theme;
    if (schemaTheme && !(this.element as any)["parentId"]) {
      this.styleThemeService.loadTheme(schemaTheme as any);
    }
  }

  get childElements(): CanvasElement[] {
    return this.element.children ?? [];
  }

  get props(): Record<string, unknown> {
    return this.element.props ?? {};
  }

  ngAfterViewInit() {
    this.createDynamicComponent();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["element"] && this.dynamicHost) {
      this.createDynamicComponent();
    }
  }

  private createDynamicComponent() {
    if (!this.dynamicHost) {
      console.warn(
        `[SchemaElement] createDynamicComponent: no dynamicHost for "${this.element.id}"`,
      );
      return;
    }

    if (this.componentRef) {
      this.componentRef.destroy();
      this.componentRef = null;
    }

    const componentType = this.componentType;
    if (!componentType) {
      console.warn(
        `[SchemaElement] createDynamicComponent: componentType is null for "${this.element.id}", componentId="${this.element.componentId}", tag="${this.tag}"`,
      );
      return;
    }

    console.log(
      `[SchemaElement] Creating dynamic component "${this.element.componentId}" for "${this.element.id}"`,
    );
    this.componentRef = this.dynamicHost.createComponent(componentType, {
      injector: this.injector,
    });

    // Use setInput on ComponentRef for proper Angular input binding + change detection
    this.componentRef.setInput("classes", this.classes);
    for (const [key, value] of Object.entries(this.props)) {
      this.componentRef.setInput(key, value);
    }
    // Pass children to container components (e.g., app-block with nested elements)
    if (this.element.children && this.element.children.length > 0) {
      this.componentRef.setInput("children", this.element.children);
    }

    // Use microtask to allow child ngOnInit to run before change detection.
    // Without this, the child's @if (isDark) in ThemeToggleComponent evaluates
    // before ngOnInit sets isDark, rendering an empty container.
    Promise.resolve().then(() => {
      this.componentRef?.changeDetectorRef.detectChanges();
    });
  }

  get gridStyle(): Partial<CSSStyleDeclaration> {
    const gp = this.element.gridPosition;
    if (!gp) return {};
    const col = `${gp.column} / span ${gp.colSpan || 1}`;
    const row = `${gp.row} / span ${gp.rowSpan || 1}`;
    return { gridColumn: col, gridRow: row } as Partial<CSSStyleDeclaration>;
  }

  get elementStyles(): Record<string, string> {
    return {};
  }

  get isNativeHtml(): boolean {
    return [
      "div",
      "span",
      "h1",
      "h2",
      "h3",
      "p",
      "footer",
      "header",
      "section",
      "article",
      "main",
      "aside",
      "nav",
      "ul",
      "li",
      "a",
      "img",
      "label",
      "small",
      "strong",
      "em",
      "i",
      "b",
      "code",
      "pre",
      "blockquote",
      "figure",
      "figcaption",
    ].includes(this.tag);
  }
}
