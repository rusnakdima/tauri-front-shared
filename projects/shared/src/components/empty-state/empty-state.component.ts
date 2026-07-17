import { Component, Input, Output, EventEmitter } from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";

@Component({
  selector: "app-empty-state",
  standalone: true,
  imports: [],
  templateUrl: "./empty-state.component.html",
})
export class EmptyStateComponent {
  @Input() title = "";
  @Input() message = "";
  @Input() icon = "";
  @Input() variant: "default" | "danger" | "success" = "default";
  @Input() action = "";
  @Input() classes = "";
  @Output() actionClicked = new EventEmitter<Event>();
}

registerSchemaComponent("app-empty-state", EmptyStateComponent);
