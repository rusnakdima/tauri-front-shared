import { Component, Input, Output, EventEmitter } from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";
import { parseJsonOrDefault } from "../../utils/json";

@Component({
  selector: "app-select",
  standalone: true,
  imports: [],
  template: `
    <div>
      @if (label) {
        <label
          class="block mb-2 text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider"
          >{{ label }}</label
        >
      }
      <select
        class="bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white text-sm rounded-2xl focus:ring-indigo-500 focus:border-indigo-500 block w-full p-3.5"
      >
        @for (opt of parsedOptions; track opt) {
          <option [value]="opt">{{ opt }}</option>
        }
      </select>
    </div>
  `,
})
export class SelectComponent {
  @Input() options: string | string[] = "[]";
  @Input() value = "";
  @Input() label = "";
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
