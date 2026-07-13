import {
  Component,
  Input,
  inject,
  AfterViewInit,
  OnChanges,
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

@Component({
  selector: "app-schema-element",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./schema-element.component.html",
  styleUrl: "./schema-element.component.css",
})
export class SchemaElementComponent
  implements AfterViewInit, OnChanges
{
  private rendererService = inject(SchemaRendererService);
  private appRef = inject(ApplicationRef);
  private injector = inject(Injector);

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
    if (!this.element.props) return base;
    const theme = getCurrentStyle();
    const mapped = this.rendererService.mapPropsToClasses(
      this.element.componentId,
      this.element.props,
      theme,
    );
    const mappedStr = mapped.join(" ").trim();
    return mappedStr ? `${base} ${mappedStr}` : base;
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
    console.log(
      `[SchemaElement] ngOnChanges for "${this.element?.id}":`,
      Object.keys(changes),
    );
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
    for (const [key, value] of Object.entries(this.props)) {
      this.componentRef.setInput(key, value);
    }

    this.componentRef.changeDetectorRef.detectChanges();
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
