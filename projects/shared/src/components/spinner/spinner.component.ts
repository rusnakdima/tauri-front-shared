import { Component, Input } from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";
import { ApplyThemeDirective } from "../../styles/theme-integration/apply-theme.directive";

@Component({
  selector: "app-spinner",
  standalone: true,
  imports: [ApplyThemeDirective],
  templateUrl: "./spinner.component.html",
  styleUrls: ["./spinner.component.css"],
})
export class SpinnerComponent {
  @Input() size: "sm" | "md" | "lg" | "xl" = "md";
  @Input() color = "";
  @Input() label = "";
}

registerSchemaComponent("app-spinner", SpinnerComponent);
