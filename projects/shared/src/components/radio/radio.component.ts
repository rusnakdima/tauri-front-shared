import { Component, Input, Output, EventEmitter } from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";
import { ApplyThemeDirective } from "../../styles/theme-integration/apply-theme.directive";

@Component({
  selector: "app-radio",
  standalone: true,
  imports: [ApplyThemeDirective],
  templateUrl: "./radio.component.html",
  styleUrls: ["./radio.component.css"],
})
export class RadioComponent {
  @Input() name = "";
  @Input() value = "";
  @Input() checked = false;
  @Input() disabled = false;
  @Output() changed = new EventEmitter<string>();
  @Input() label = "";

  handleChange(_e: Event) {
    this.checked = true;
    this.changed.emit(this.value);
  }
}

registerSchemaComponent("app-radio", RadioComponent);
