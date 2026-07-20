import { Component, ChangeDetectionStrategy, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SchemaElementComponent } from "../../../core/lib/schema-router/schema-element.component";
import { registerSchemaComponent } from "../../../core/lib/schema-component.registry";

@Component({
  selector: "app-divider",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, SchemaElementComponent],
  templateUrl: "./divider.component.html",
  styleUrl: "./divider.component.css",
})
export class DividerComponent {
  @Input() direction: "horizontal" | "vertical" = "horizontal";
  @Input() thickness: number = 1;
  @Input() color: string = "";
  @Input() margin: number = 16;

  get dividerClasses(): string {
    if (this.direction === "vertical") {
      return "h-full";
    }
    return "w-full";
  }

  get thicknessStyle(): string {
    return `${this.thickness}px`;
  }

  get marginStyle(): string {
    return `${this.margin}px`;
  }

  get colorStyle(): string {
    return this.color || "var(--divider-color, var(--border-color))";
  }
}

registerSchemaComponent("app-divider", DividerComponent);
