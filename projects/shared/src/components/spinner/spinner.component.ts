import { Component, Input } from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";

@Component({
  selector: "app-spinner",
  standalone: true,
  template: `<div
      [class]="'spinner spinner-' + size"
      [style.borderTopColor]="color || null"
    ></div>
    @if (label) {
      <span class="spinner-label">{{ label }}</span>
    }`,
  styles: [
    `
      :host {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
      }
      .spinner {
        border: 2px solid var(--border-color);
        border-top-color: var(--accent);
        border-radius: 50%;
        animation: spin 0.7s linear infinite;
      }
      .spinner-sm {
        width: 16px;
        height: 16px;
        border-width: 2px;
      }
      .spinner-md {
        width: 32px;
        height: 32px;
        border-width: 3px;
      }
      .spinner-lg {
        width: 48px;
        height: 48px;
        border-width: 4px;
      }
      .spinner-xl {
        width: 64px;
        height: 64px;
        border-width: 5px;
      }
      .spinner-label {
        font-size: 0.875rem;
        color: var(--text-secondary);
      }
      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }
    `,
  ],
})
export class SpinnerComponent {
  @Input() size: "sm" | "md" | "lg" | "xl" = "md";
  @Input() color = "";
  @Input() label = "";
}

registerSchemaComponent("app-spinner", SpinnerComponent);
