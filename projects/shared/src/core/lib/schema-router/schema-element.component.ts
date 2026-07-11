import { Component, Input, inject } from "@angular/core";
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
export class SchemaElementComponent {
  private renderer = inject(SchemaRendererService);

  @Input({ required: true }) element!: CanvasElement;
  @Input({ required: true }) elements: CanvasElement[] = [];

  get componentType() {
    const type = SCHEMA_COMPONENT_MAP.get(this.tag);
    return type ?? null;
  }

  get tag(): string {
    return this.element.componentId;
  }

  get classes(): string {
    const base = this.element.classes ?? "";
    if (!this.element.props) return base;
    const theme = getCurrentStyle();
    const mapped = this.renderer.mapPropsToClasses(
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
