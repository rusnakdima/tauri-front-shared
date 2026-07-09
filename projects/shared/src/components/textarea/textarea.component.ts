import { Component, Input, Output, EventEmitter } from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";

@Component({
  selector: "app-textarea",
  standalone: true,
  template: `
    @if (label) {
      <label class="textarea-label">{{ label }}</label>
    }
    <textarea
      [placeholder]="placeholder"
      [disabled]="disabled"
      (input)="handleInput($event)"
    ></textarea>
  `,
  styles: [
    `
      :host {
        display: block;
      }
      .textarea-label {
        display: block;
        font-size: 0.875rem;
        font-weight: 500;
        color: var(--text-primary);
        margin-bottom: 0.25rem;
      }
      textarea {
        width: 100%;
        padding: 0.5rem 0.75rem;
        border-radius: 0.5rem;
        border: 1px solid var(--border-color);
        background-color: var(--bg-primary);
        color: var(--text-primary);
        box-sizing: border-box;
        outline: none;
        font-family: inherit;
        resize: vertical;
        min-height: 80px;
      }
      textarea:focus {
        border-color: var(--accent);
      }
      textarea::placeholder {
        color: var(--text-muted);
      }
      textarea:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    `,
  ],
})
export class TextareaComponent {
  @Input() label = "";
  @Input() placeholder = "";
  @Input() disabled = false;
  @Input() value = "";
  @Output() input = new EventEmitter<string>();

  handleInput(e: Event) {
    this.value = (e.target as HTMLTextAreaElement).value;
    this.input.emit(this.value);
  }
}

registerSchemaComponent("app-textarea", TextareaComponent);
