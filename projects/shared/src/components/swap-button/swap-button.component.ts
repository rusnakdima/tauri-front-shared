import { Component, Input, Output, EventEmitter } from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";
import { IconComponent } from "../icons/icons.component";

@Component({
  selector: "app-swap-button",
  standalone: true,
  imports: [IconComponent],
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
  @Input() classes = "";
  @Output() clicked = new EventEmitter<Event>();
  hovered = false;
}

registerSchemaComponent("app-swap-button", SwapButtonComponent);
