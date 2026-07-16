import { Component, Input } from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";

export type DividerOrientation = "horizontal" | "vertical";
export type DividerSpacing = "none" | "sm" | "md" | "lg" | "xl";

@Component({
  selector: "app-divider",
  standalone: true,
  imports: [],
  templateUrl: "./divider.component.html",
  styleUrls: ["./divider.component.scss"],
})
export class DividerComponent {
  @Input() orientation: DividerOrientation = "horizontal";
  @Input() spacing: DividerSpacing = "md";
  @Input() color = "";
}

registerSchemaComponent("app-divider", DividerComponent);
