import { Component, ChangeDetectionStrategy, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SchemaElementComponent } from "../../../core/lib/schema-router/schema-element.component";
import { registerSchemaComponent } from "../../../core/lib/schema-component.registry";

@Component({
  selector: "app-row",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, SchemaElementComponent],
  templateUrl: "./row.component.html",
})
export class RowComponent {
  @Input() classes = "";
  @Input() children: any[] = [];
  @Input() gap: number | undefined;
  @Input() align:
    "start" | "center" | "end" | "stretch" | "baseline" | undefined;
  @Input() justify:
    "start" | "center" | "end" | "between" | "around" | "evenly" | undefined;
  @Input() crossAxis:
    "start" | "center" | "end" | "stretch" | "baseline" | undefined;
  @Input() mainAxis:
    "start" | "center" | "end" | "between" | "around" | "evenly" | undefined;
  @Input() width: "full" | "auto" | undefined;
  @Input() height: "full" | "auto" | undefined;
  @Input() responsive: boolean = true;

  get layoutClasses(): string {
    const classes: string[] = ["flex"];

    // Row direction (horizontal by default)
    classes.push("flex-row");

    // Gap
    if (this.gap) {
      classes.push(`gap-${this.gap}`);
    }

    // Alignment (crossAxis Flutter prop takes precedence, align is backward-compatible alias)
    const crossAxisValue = this.crossAxis ?? this.align;
    if (crossAxisValue) {
      const alignMap: Record<string, string> = {
        start: "items-start",
        center: "items-center",
        end: "items-end",
        stretch: "items-stretch",
        baseline: "items-baseline",
      };
      if (alignMap[crossAxisValue]) {
        classes.push(alignMap[crossAxisValue]);
      }
    }

    // Justify (mainAxis Flutter prop takes precedence, justify is backward-compatible alias)
    const mainAxisValue = this.mainAxis ?? this.justify;
    if (mainAxisValue) {
      const justifyMap: Record<string, string> = {
        start: "justify-start",
        center: "justify-center",
        end: "justify-end",
        between: "justify-between",
        around: "justify-around",
        evenly: "justify-evenly",
      };
      if (justifyMap[mainAxisValue]) {
        classes.push(justifyMap[mainAxisValue]);
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

  // Mobile: switch to column layout at md breakpoint
  get mobileLayoutClasses(): string {
    if (!this.responsive) return "";
    return "md:flex-col";
  }
}

registerSchemaComponent("app-row", RowComponent);
