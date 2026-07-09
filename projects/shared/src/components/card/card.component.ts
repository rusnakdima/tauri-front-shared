import { Component, Input } from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";

@Component({
  selector: "app-card",
  standalone: true,
  template: `
    <div
      class="card"
      [class.card-elevated]="elevated"
      [style.borderRadius.px]="borderRadius"
    >
      @if (title) {
        <div class="card-header">
          <h3 class="card-title">{{ title }}</h3>
        </div>
      }
      <div class="card-content" [style.padding.px]="padding">
        <ng-content></ng-content>
        @if (!content) {
          {{ content }}
        }
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
      .card {
        background-color: var(--bg-elevated);
        border: 1px solid var(--border-color);
        border-radius: 0.5rem;
        overflow: hidden;
        transition: box-shadow 0.15s;
      }
      .card-elevated {
        box-shadow:
          0 4px 6px -1px rgba(0, 0, 0, 0.1),
          0 2px 4px -1px rgba(0, 0, 0, 0.06);
      }
      .card-header {
        padding: 1rem;
        border-bottom: 1px solid var(--border-color);
      }
      .card-title {
        margin: 0;
        font-size: 1rem;
        font-weight: 600;
        color: var(--text-primary);
      }
      .card-content {
        padding: 1rem;
        color: var(--text-secondary);
        font-size: 0.875rem;
        line-height: 1.5;
      }
    `,
  ],
})
export class CardComponent {
  @Input() title = "";
  @Input() content = "";
  @Input() elevated = false;
  @Input() borderRadius = 8;
  @Input() padding = 16;
}

registerSchemaComponent("app-card", CardComponent);
