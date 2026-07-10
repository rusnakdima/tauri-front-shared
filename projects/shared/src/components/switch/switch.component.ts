import { Component, Input, Output, EventEmitter } from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";
import { ApplyThemeDirective } from "../../styles/theme-integration/apply-theme.directive";

@Component({
  selector: "app-switch",
  standalone: true,
  imports: [ApplyThemeDirective],
  templateUrl: "./switch.component.html",
  styleUrls: ["./switch.component.css"],
})
export class SwitchComponent {
  @Input() checked = false;
  @Input() label = "";
  @Input() disabled = false;
  @Output() changed = new EventEmitter<boolean>();

  handleChange(e: Event) {
    this.changed.emit((e.target as HTMLInputElement).checked);
  }
}

registerSchemaComponent("app-switch", SwitchComponent);
