import { Component, Input, Output, EventEmitter } from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";
import { ApplyThemeDirective } from "../../styles/theme-integration/apply-theme.directive";
import { parseJsonOrDefault } from "../../utils/json";

@Component({
  selector: "app-select",
  standalone: true,
  imports: [ApplyThemeDirective],
  templateUrl: "./select.component.html",
  styleUrls: ["./select.component.css"],
})
export class SelectComponent {
  @Input() options: string | string[] = "[]";
  @Input() value = "";
  @Input() placeholder = "Select an option";
  @Input() disabled = false;
  @Output() changed = new EventEmitter<string>();

  get parsedOptions(): string[] {
    return parseJsonOrDefault<string>(this.options);
  }

  handleChange(e: Event) {
    this.value = (e.target as HTMLSelectElement).value;
    this.changed.emit(this.value);
  }
}

registerSchemaComponent("app-select", SelectComponent);
