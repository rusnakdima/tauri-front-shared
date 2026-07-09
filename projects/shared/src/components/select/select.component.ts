import { Component, Input, Output, EventEmitter } from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";

@Component({
  selector: "app-select",
  standalone: true,
  template: `
    <select
      [value]="value"
      [disabled]="disabled"
      (change)="handleChange($event)"
    >
      <option value="" disabled selected hidden>{{ placeholder }}</option>
      @for (opt of parsedOptions; track opt) {
        <option [value]="opt" [selected]="opt === value">{{ opt }}</option>
      }
    </select>
  `,
  styles: [
    `
      :host {
        display: inline-flex;
      }
      select {
        display: inline-flex;
        align-items: center;
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
        border: 1px solid var(--border-color);
        background-color: var(--bg-elevated);
        color: var(--text-primary);
        font-size: 1rem;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.15s;
        min-width: 150px;
      }
      select:hover:not(:disabled) {
        background-color: var(--bg-hover);
      }
      select:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
      select:focus {
        outline: none;
        border-color: var(--accent);
      }
    `,
  ],
})
export class SelectComponent {
  @Input() options: string | string[] = "[]";
  @Input() value = "";
  @Input() placeholder = "Select an option";
  @Input() disabled = false;
  @Output() changed = new EventEmitter<string>();

  get parsedOptions(): string[] {
    if (Array.isArray(this.options)) return this.options;
    try {
      return JSON.parse(this.options);
    } catch {
      return [];
    }
  }

  handleChange(e: Event) {
    this.value = (e.target as HTMLSelectElement).value;
    this.changed.emit(this.value);
  }
}

registerSchemaComponent("app-select", SelectComponent);
