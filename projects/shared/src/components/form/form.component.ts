import { Component, Input, Output, EventEmitter } from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";

@Component({
  selector: "app-form",
  standalone: true,
  template: `
    <form (submit)="handleSubmit($event)">
      @if (heading) {
        <h3 class="form-heading">{{ heading }}</h3>
      }
      <ng-content></ng-content>
      @if (showActions) {
        <div class="form-actions">
          <button type="submit" class="btn-submit">{{ submitText }}</button>
          <button type="button" class="btn-cancel" (click)="handleCancel()">
            {{ cancelText }}
          </button>
        </div>
      }
    </form>
  `,
  styles: [
    `
      :host {
        display: block;
      }
      .form-heading {
        font-size: 1.125rem;
        font-weight: 600;
        color: var(--text-primary);
        margin: 0 0 1rem;
      }
      .form-actions {
        display: flex;
        gap: 0.75rem;
        justify-content: flex-end;
        margin-top: 1.5rem;
      }
      .btn-submit {
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
        border: 1px solid var(--accent);
        background: var(--accent);
        color: var(--text-on-accent);
        font-weight: 500;
        cursor: pointer;
      }
      .btn-submit:hover {
        background: var(--accent-hover);
      }
      .btn-cancel {
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
        border: 1px solid var(--border-color);
        background: transparent;
        color: var(--text-secondary);
        cursor: pointer;
      }
      .btn-cancel:hover {
        background: var(--bg-hover);
        color: var(--text-primary);
      }
    `,
  ],
})
export class FormComponent {
  @Input() heading = "";
  @Input() showActions = true;
  @Input() submitText = "Submit";
  @Input() cancelText = "Cancel";
  @Output() submitted = new EventEmitter<Event>();
  @Output() cancelled = new EventEmitter<void>();

  handleSubmit(e: Event) {
    e.preventDefault();
    this.submitted.emit(e);
  }

  handleCancel() {
    this.cancelled.emit();
  }
}

registerSchemaComponent("app-form", FormComponent);
