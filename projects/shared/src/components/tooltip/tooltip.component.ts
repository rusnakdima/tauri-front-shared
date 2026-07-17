import { Component, ChangeDetectionStrategy, Input } from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";

@Component({
  selector: "app-tooltip",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: "./tooltip.component.html",
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
