import { Component, Input, Output, EventEmitter } from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";

@Component({
  selector: "app-checkbox",
  standalone: true,
  template: `
    <label>
      <input
        type="checkbox"
        [checked]="checked"
        [disabled]="disabled"
        (change)="handleChange($event)"
      />
      @if (label) {
        <span class="checkbox-label">{{ label }}</span>
      }
    </label>
  `,
  styles: [
    `
      :host {
        display: inline-flex;
        align-items: center;
      }
      label {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        cursor: pointer;
      }
      input[type="checkbox"] {
        width: 1rem;
        height: 1rem;
        accent-color: var(--accent);
        cursor: pointer;
      }
      input[type="checkbox"]:disabled {
        cursor: not-allowed;
        opacity: 0.5;
      }
      .checkbox-label {
        color: var(--text-primary);
        font-size: 0.875rem;
        user-select: none;
      }
    `,
  ],
})
export class CheckboxComponent {
  @Input() checked = false;
  @Input() label = "";
  @Input() disabled = false;
  @Output() changed = new EventEmitter<boolean>();

  handleChange(e: Event) {
    this.changed.emit((e.target as HTMLInputElement).checked);
  }
}

registerSchemaComponent("app-checkbox", CheckboxComponent);
