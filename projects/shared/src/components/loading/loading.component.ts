import { Component, Input } from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";

@Component({
  selector: "app-loading",
  standalone: true,
  template: `<div [class]="'spinner spinner-' + size"></div>`,
  styles: [
    `
      :host {
        display: inline-flex;
        align-items: center;
        justify-content: center;
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
      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }
    `,
  ],
})
export class LoadingComponent {
  @Input() size: "sm" | "md" | "lg" = "md";
}

registerSchemaComponent("app-loading", LoadingComponent);
