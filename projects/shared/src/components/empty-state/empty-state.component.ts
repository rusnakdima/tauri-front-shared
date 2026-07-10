import { Component, Input, Output, EventEmitter } from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";
import { ApplyThemeDirective } from "../../styles/theme-integration/apply-theme.directive";

@Component({
  selector: "app-empty-state",
  standalone: true,
  imports: [ApplyThemeDirective],
  templateUrl: "./empty-state.component.html",
  styleUrls: ["./empty-state.component.css"],
})
export class EmptyStateComponent {
  @Input() title = "";
  @Input() message = "";
  @Input() icon = "";
  @Input() variant: "default" | "danger" | "success" = "default";
  @Input() action = "";
  @Output() actionClicked = new EventEmitter<Event>();
}

registerSchemaComponent("app-empty-state", EmptyStateComponent);
