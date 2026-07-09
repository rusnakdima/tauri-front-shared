import { Component, Input, Output, EventEmitter } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";

@Component({
  selector: "app-input",
  standalone: true,
  imports: [MatIconModule],
  template: `
    <div class="app-input-wrapper">
      @if (label) {
        <label class="app-input-label">{{ label }}</label>
      }
      <div class="app-input-container" [class.app-input-focused]="focused">
        @if (icon) {
          <mat-icon class="app-input-icon" [fontIcon]="icon" />
        }
        <input
          #inputEl
          [attr.type]="type"
          class="app-input"
          [class.app-input-with-icon]="!!icon"
          [class.app-input-error]="!!error"
          [placeholder]="placeholder"
          [disabled]="disabled"
          [value]="value"
          (input)="handleInput($event)"
          (focus)="focused = true"
          (blur)="focused = false"
        />
      </div>
      @if (error) {
        <span class="app-input-error-text">{{ error }}</span>
      }
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
      .app-input-wrapper {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
      }
      .app-input-label {
        font-size: 0.875rem;
        font-weight: 500;
        color: var(--text-primary);
      }
      .app-input-container {
        position: relative;
        display: flex;
        align-items: center;
      }
      .app-input {
        width: 100%;
        padding: 0.5rem 0.75rem;
        border-radius: 0.5rem;
        border: 1px solid var(--border-color);
        background-color: var(--bg-primary);
        color: var(--text-primary);
        box-sizing: border-box;
        transition: all 0.15s;
        outline: none;
      }
      .app-input::placeholder {
        color: var(--text-muted);
      }
      .app-input:focus {
        border-color: var(--accent);
        box-shadow: 0 0 0 1px var(--accent);
      }
      .app-input-error {
        border-color: var(--error);
        box-shadow: 0 0 0 1px var(--error);
      }
      .app-input-with-icon {
        padding-left: 2.5rem;
      }
      .app-input-icon {
        position: absolute;
        left: 0.75rem;
        font-size: 1.25rem;
        color: var(--text-muted);
      }
      .app-input-focused .app-input-icon {
        color: var(--accent);
      }
      .app-input:disabled {
        opacity: 0.5;
        cursor: not-allowed;
        background-color: var(--bg-tertiary);
      }
      .app-input-error-text {
        font-size: 0.75rem;
        color: var(--error);
      }
    `,
  ],
})
export class InputComponent {
  @Input() type = "text";
  @Input() placeholder = "";
  @Input() label = "";
  @Input() icon = "";
  @Input() disabled = false;
  @Input() value = "";
  @Input() error = "";
  @Output() input = new EventEmitter<string>();
  @Output() blurred = new EventEmitter<void>();
  focused = false;

  handleInput(e: Event) {
    this.value = (e.target as HTMLInputElement).value;
    this.input.emit(this.value);
  }
}

registerSchemaComponent("app-input", InputComponent);
