import { Component, Input } from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";
import { ApplyThemeDirective } from "../../styles/theme-integration/apply-theme.directive";

@Component({
  selector: "app-tooltip",
  standalone: true,
  imports: [ApplyThemeDirective],
  templateUrl: "./tooltip.component.html",
  styleUrls: ["./tooltip.component.css"],
})
export class TooltipComponent {
  @Input() text = "";
  /** Alias for `text` */
  @Input() content = "";
  @Input() position: "top" | "bottom" | "left" | "right" = "top";
  @Input() delay = 200;
  show = false;
}

registerSchemaComponent("app-tooltip", TooltipComponent);
