import { Component, Input, Output, EventEmitter } from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";

@Component({
  selector: "app-switch",
  standalone: true,
  template: `
    <label class="switch" [class.switch-checked]="checked">
      <input
        type="checkbox"
        [checked]="checked"
        [disabled]="disabled"
        (change)="handleChange($event)"
      />
      <span class="slider"></span>
      @if (label) {
        <span class="switch-label">{{ label }}</span>
      }
    </label>
  `,
  styles: [
    `
      :host {
        display: inline-flex;
        align-items: center;
      }
      .switch {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        cursor: pointer;
        position: relative;
      }
      .switch input {
        position: absolute;
        opacity: 0;
        width: 0;
        height: 0;
      }
      .slider {
        width: 2.5rem;
        height: 1.25rem;
        background-color: var(--border-color);
        border-radius: 1rem;
        transition: background-color 0.2s;
        position: relative;
      }
      .slider::before {
        content: "";
        position: absolute;
        width: 1rem;
        height: 1rem;
        left: 2px;
        top: 2px;
        background-color: white;
        border-radius: 50%;
        transition: transform 0.2s;
      }
      .switch-checked .slider {
        background-color: var(--accent);
      }
      .switch-checked .slider::before {
        transform: translateX(1.25rem);
      }
      .switch-label {
        color: var(--text-primary);
        font-size: 0.875rem;
        user-select: none;
      }
      input:disabled ~ .slider {
        opacity: 0.5;
        cursor: not-allowed;
      }
    `,
  ],
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
