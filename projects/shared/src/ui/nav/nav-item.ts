import { Component, Input, Output, EventEmitter } from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";

// Use internal registry to avoid circular dependency with schema-component.registry

@Component({
  selector: "app-nav-item",
  standalone: true,
  templateUrl: "./nav-item.component.html",
  styleUrls: ["./nav-item.component.css"],
})
export class NavItemComponent {
  @Input() icon = "";
  @Input() label = "";
  @Input() active = false;
  @Input() disabled = false;
  @Output() clicked = new EventEmitter<void>();

  handleClick() {
    if (!this.disabled) {
      this.clicked.emit();
    }
  }
}

registerSchemaComponent("app-nav-item", NavItemComponent);
