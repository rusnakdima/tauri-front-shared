import { Component, ChangeDetectionStrategy, Input } from "@angular/core";
import { SchemaElementComponent } from "../../../core/lib/schema-router/schema-element.component";
import { registerSchemaComponent } from "../../../core/lib/schema-component.registry";

@Component({
  selector: "app-column",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SchemaElementComponent],
  templateUrl: "./column.component.html",
})
export class ColumnComponent {
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

  get layoutClasses(): string {
    const classes: string[] = ["flex", "flex-col"];

    // Gap
    if (this.gap) {
      classes.push(`gap-${this.gap}`);
    }

    // Cross-axis alignment (Flutter-style, with align as alias)
    const crossAxisValue = this.crossAxis ?? this.align;
    if (crossAxisValue) {
      const crossAxisMap: Record<string, string> = {
        start: "items-start",
        center: "items-center",
        end: "items-end",
        stretch: "items-stretch",
        baseline: "items-baseline",
      };
      if (crossAxisMap[crossAxisValue]) {
        classes.push(crossAxisMap[crossAxisValue]);
      }
    }

    // Main-axis justification (Flutter-style, with justify as alias)
    const mainAxisValue = this.mainAxis ?? this.justify;
    if (mainAxisValue) {
      const mainAxisMap: Record<string, string> = {
        start: "justify-start",
        center: "justify-center",
        end: "justify-end",
        between: "justify-between",
        around: "justify-around",
        evenly: "justify-evenly",
      };
      if (mainAxisMap[mainAxisValue]) {
        classes.push(mainAxisMap[mainAxisValue]);
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

registerSchemaComponent("app-column", ColumnComponent);
