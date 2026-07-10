import { Component, Input, Output, EventEmitter } from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";
import { ApplyThemeDirective } from "../../styles/theme-integration/apply-theme.directive";
import { IconComponent } from "../icons/icons.component";

@Component({
  selector: "app-swap-button",
  standalone: true,
  imports: [IconComponent, ApplyThemeDirective],
  templateUrl: "./swap-button.component.html",
})
export class SwapButtonComponent {
  @Input() ariaLabel = "";
  @Input() align = "";
  @Input() direction = "";
  @Input() height = "";
  @Input() justify = "";
  @Input() layout = "";
  @Input() width = "";
  @Output() clicked = new EventEmitter<Event>();
  hovered = false;
}

registerSchemaComponent("app-swap-button", SwapButtonComponent);
