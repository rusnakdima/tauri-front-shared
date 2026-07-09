import { Component, Input, Output, EventEmitter } from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";

@Component({
  selector: "app-radio",
  standalone: true,
  template: `
    <label>
      <input
        type="radio"
        [name]="name"
        [value]="value"
        [checked]="checked"
        [disabled]="disabled"
        (change)="handleChange($event)"
      />
      <span class="radio-label"><ng-content></ng-content></span>
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
      input[type="radio"] {
        width: 1rem;
        height: 1rem;
        accent-color: var(--accent);
        cursor: pointer;
      }
      input[type="radio"]:disabled {
        cursor: not-allowed;
        opacity: 0.5;
      }
      .radio-label {
        color: var(--text-primary);
        font-size: 0.875rem;
        user-select: none;
      }
    `,
  ],
})
export class RadioComponent {
  @Input() name = "";
  @Input() value = "";
  @Input() checked = false;
  @Input() disabled = false;
  @Output() changed = new EventEmitter<string>();
  @Input() label = "";

  handleChange(e: Event) {
    this.checked = true;
    this.changed.emit(this.value);
  }
}

registerSchemaComponent("app-radio", RadioComponent);
