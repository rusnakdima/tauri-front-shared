import { Component, Input } from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";

@Component({
  selector: "app-badge",
  standalone: true,
  template: `<span [class]="'badge badge-' + variant + ' badge-' + size">{{
    label
  }}</span>`,
  styles: [
    `
      :host {
        display: inline-flex;
      }
      .badge {
        display: inline-flex;
        align-items: center;
        border-radius: 0.25rem;
        font-weight: 500;
        line-height: 1;
      }
      .badge-default {
        background-color: var(--bg-elevated);
        color: var(--text-primary);
        border: 1px solid var(--border-color);
      }
      .badge-primary {
        background-color: var(--accent);
        color: var(--text-on-accent);
      }
      .badge-success {
        background-color: var(--success);
        color: var(--text-on-success);
      }
      .badge-warning {
        background-color: var(--warning);
        color: var(--text-on-warning);
      }
      .badge-danger {
        background-color: var(--error);
        color: var(--text-on-error);
      }
      .badge-sm {
        padding: 0.125rem 0.25rem;
        font-size: 0.625rem;
      }
      .badge-md {
        padding: 0.25rem 0.5rem;
        font-size: 0.75rem;
      }
      .badge-lg {
        padding: 0.375rem 0.75rem;
        font-size: 0.875rem;
      }
    `,
  ],
})
export class BadgeComponent {
  @Input() variant: "default" | "primary" | "success" | "warning" | "danger" =
    "default";
  @Input() size: "sm" | "md" | "lg" = "md";
  @Input() label = "";
}

registerSchemaComponent("app-badge", BadgeComponent);
