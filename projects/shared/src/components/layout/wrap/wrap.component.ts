import { Component, ChangeDetectionStrategy, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SchemaElementComponent } from "../../../core/lib/schema-router/schema-element.component";
import { registerSchemaComponent } from "../../../core/lib/schema-component.registry";

@Component({
  selector: "app-layout-wrap",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, SchemaElementComponent],
  templateUrl: "./wrap.component.html",
  styleUrl: "./wrap.component.css",
})
export class LayoutWrapComponent {
  @Input() classes = "";
  @Input() children: unknown[] = [];
  @Input() gap: number = 16;
  @Input() runGap: number | undefined;
  @Input() alignItems:
    "start" | "center" | "end" | "stretch" | "baseline" | undefined;
  @Input() justify:
    "start" | "center" | "end" | "between" | "around" | "evenly" | undefined;

  get layoutClasses(): string {
    const classes: string[] = ["flex", "flex-wrap"];

    // Gap between wrapped items (divided by 4 for Tailwind scale)
    if (this.gap !== undefined) {
      classes.push(`gap-${this.gap / 4}`);
    }

    // Row/column gap (gap-y for wrap)
    if (this.runGap !== undefined) {
      classes.push(`gap-y-${this.runGap / 4}`);
    }

    // Align items
    if (this.alignItems) {
      const alignMap: Record<string, string> = {
        start: "items-start",
        center: "items-center",
        end: "items-end",
        stretch: "items-stretch",
        baseline: "items-baseline",
      };
      if (alignMap[this.alignItems]) {
        classes.push(alignMap[this.alignItems]);
      }
    }

    // Justify content
    if (this.justify) {
      const justifyMap: Record<string, string> = {
        start: "justify-start",
        center: "justify-center",
        end: "justify-end",
        between: "justify-between",
        around: "justify-around",
        evenly: "justify-evenly",
      };
      if (justifyMap[this.justify]) {
        classes.push(justifyMap[this.justify]);
      }
    }

    return classes.join(" ");
  }
}

registerSchemaComponent("app-layout-wrap", LayoutWrapComponent);
