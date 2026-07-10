import { Component, Input } from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";
import { ApplyThemeDirective } from "../../styles/theme-integration/apply-theme.directive";

@Component({
  selector: "app-loading",
  standalone: true,
  imports: [ApplyThemeDirective],
  templateUrl: "./loading.component.html",
  styleUrls: ["./loading.component.css"],
})
export class LoadingComponent {
  @Input() size: "sm" | "md" | "lg" = "md";
  @Input() color = "";
}

registerSchemaComponent("app-loading", LoadingComponent);
