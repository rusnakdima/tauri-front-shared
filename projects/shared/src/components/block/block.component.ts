import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";
import { SchemaElementComponent } from "../../core/lib/schema-router/schema-element.component";
import type { CanvasElement } from "../../core/lib/types";

export type BlockDirection =
  "row" | "column" | "row-reverse" | "column-reverse";
export type BlockAlign = "start" | "center" | "end" | "stretch" | "baseline";
export type BlockJustify =
  "start" | "center" | "end" | "between" | "around" | "evenly";
export type BlockWrap = "nowrap" | "wrap" | "wrap-reverse";

@Component({
  selector: "app-block",
  standalone: true,
  imports: [CommonModule, SchemaElementComponent],
  templateUrl: "./block.component.html",
})
export class BlockComponent {
  @Input() display: "flex" | "grid" | "block" = "flex";
  @Input() direction: BlockDirection = "column";
  @Input() align: BlockAlign = "stretch";
  @Input() justify: BlockJustify = "start";
  @Input() wrap: BlockWrap = "nowrap";
  @Input() gap = "";
  @Input() padding = "";
  @Input() width = "";
  @Input() height = "";
  @Input() flex = "";
  @Input() overflow = "";
  @Input() inline = false;
  @Input() children: CanvasElement[] = [];
  @Input() classes = "";

  get alignCss(): string {
    const map: Record<string, string> = {
      start: "flex-start",
      center: "center",
      end: "flex-end",
      stretch: "stretch",
      baseline: "baseline",
    };
    return map[this.align] || "stretch";
  }

  get justifyCss(): string {
    const map: Record<string, string> = {
      start: "flex-start",
      center: "center",
      end: "flex-end",
      between: "space-between",
      around: "space-around",
      evenly: "space-evenly",
    };
    return map[this.justify] || "flex-start";
  }

  get gapCss(): string {
    if (!this.gap) return "";
    if (/^\d+$/.test(this.gap)) return `${this.gap}px`;
    return this.gap;
  }

  get paddingCss(): string {
    if (!this.padding) return "";
    if (/^\d+$/.test(this.padding)) return `${this.padding}px`;
    return this.padding;
  }

  get widthCss(): string {
    if (!this.width) return "";
    if (this.width === "full") return "100%";
    if (this.width === "screen") return "100vw";
    if (/^\d+$/.test(this.width)) return `${this.width}px`;
    return this.width;
  }

  get heightCss(): string {
    if (!this.height) return "";
    if (this.height === "full") return "100%";
    if (this.height === "screen") return "100vh";
    if (/^\d+$/.test(this.height)) return `${this.height}px`;
    return this.height;
  }
}

registerSchemaComponent("app-block", BlockComponent);
