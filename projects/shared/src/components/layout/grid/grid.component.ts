import { Component, ChangeDetectionStrategy, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SchemaElementComponent } from "../../../core/lib/schema-router/schema-element.component";
import { registerSchemaComponent } from "../../../core/lib/schema-component.registry";
import type { CanvasElement } from "../../../core/lib/types";

@Component({
  selector: "app-grid",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, SchemaElementComponent],
  templateUrl: "./grid.component.html",
  styleUrl: "./grid.component.css",
})
export class GridComponent {
  @Input() classes = "";
  @Input() children: CanvasElement[] = [];
  @Input() columns: number = 12;
  @Input() gap: number = 16;
  @Input() rowGap: number | undefined;
  @Input() colGap: number | undefined;
  @Input() alignItems: "start" | "center" | "end" | "stretch" | undefined;
  @Input() justifyItems: "start" | "center" | "end" | "stretch" | undefined;
  @Input() flow: "row" | "column" | undefined;

  get layoutClasses(): string {
    const classes: string[] = ["grid"];

    // Columns
    classes.push(`grid-cols-${this.columns}`);

    // Gap (divided by 4 since Tailwind uses 1-96 scale)
    const gapVal = Math.round(this.gap / 4);
    if (gapVal > 0) {
      classes.push(`gap-${gapVal}`);
    }

    // Separate row/col gaps override the combined gap
    if (this.rowGap !== undefined) {
      const rowGapVal = Math.round(this.rowGap / 4);
      if (rowGapVal > 0) {
        classes.push(`gap-y-${rowGapVal}`);
      }
    }
    if (this.colGap !== undefined) {
      const colGapVal = Math.round(this.colGap / 4);
      if (colGapVal > 0) {
        classes.push(`gap-x-${colGapVal}`);
      }
    }

    // Align items
    if (this.alignItems) {
      const alignMap: Record<string, string> = {
        start: "items-start",
        center: "items-center",
        end: "items-end",
        stretch: "items-stretch",
      };
      if (alignMap[this.alignItems]) {
        classes.push(alignMap[this.alignItems]);
      }
    }

    // Justify items
    if (this.justifyItems) {
      const justifyMap: Record<string, string> = {
        start: "justify-items-start",
        center: "justify-items-center",
        end: "justify-items-end",
        stretch: "justify-items-stretch",
      };
      if (justifyMap[this.justifyItems]) {
        classes.push(justifyMap[this.justifyItems]);
      }
    }

    // Grid flow direction
    if (this.flow) {
      const flowMap: Record<string, string> = {
        row: "grid-flow-row",
        column: "grid-flow-col",
      };
      if (flowMap[this.flow]) {
        classes.push(flowMap[this.flow]);
      }
    }

    return classes.join(" ");
  }
}

registerSchemaComponent("app-grid", GridComponent);
