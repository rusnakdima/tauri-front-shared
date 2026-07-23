import { Component, ChangeDetectionStrategy, Input } from "@angular/core";
import { SchemaElementComponent } from "../../../core/lib/schema-router/schema-element.component";
import { registerSchemaComponent } from "../../../core/lib/schema-component.registry";
import type { CanvasElement } from "../../../core/lib/types";

@Component({
  selector: "app-stack",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SchemaElementComponent],
  templateUrl: "./stack.component.html",
})
export class StackComponent {
  @Input() classes = "";
  @Input() children: CanvasElement[] = [];
  @Input() gap: number | undefined;
  @Input() align:
    "start" | "center" | "end" | "stretch" | "baseline" | undefined;
  @Input() width: "full" | "auto" | undefined;
  @Input() height: "full" | "auto" | undefined;

  get layoutClasses(): string {
    const classes: string[] = ["flex", "flex-col"];

    // Gap
    if (this.gap) {
      classes.push(`gap-${this.gap}`);
    }

    // Alignment
    if (this.align) {
      const alignMap: Record<string, string> = {
        start: "items-start",
        center: "items-center",
        end: "items-end",
        stretch: "items-stretch",
        baseline: "items-baseline",
      };
      if (alignMap[this.align]) {
        classes.push(alignMap[this.align]);
      }
    }

    // Width
    if (this.width === "full") classes.push("w-full");
    else if (this.width === "auto") classes.push("w-auto");

    // Height
    if (this.height === "full") classes.push("h-full");
    else if (this.height === "auto") classes.push("h-auto");

    return classes.join(" ");
  }
}

registerSchemaComponent("app-stack", StackComponent);
