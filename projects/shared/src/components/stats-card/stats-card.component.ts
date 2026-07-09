import { Component, Input } from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";

@Component({
  selector: "app-stats-card",
  standalone: true,
  template: `
    <div class="stats-card">
      @if (icon) {
        <div class="stats-icon">{{ icon }}</div>
      }
      <div class="stats-value">{{ value }}{{ unit }}</div>
      @if (label) {
        <div class="stats-label">{{ label }}</div>
      }
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
      .stats-card {
        background-color: var(--bg-elevated);
        border: 1px solid var(--border-color);
        border-radius: 0.75rem;
        padding: 1.5rem;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }
      .stats-icon {
        font-size: 1.5rem;
        color: var(--accent);
      }
      .stats-value {
        font-size: 1.75rem;
        font-weight: 700;
        color: var(--text-primary);
        line-height: 1;
      }
      .stats-label {
        font-size: 0.875rem;
        color: var(--text-secondary);
      }
    `,
  ],
})
export class StatsCardComponent {
  @Input() label = "";
  @Input() value: string | number = "";
  @Input() unit = "";
  @Input() icon = "";
}

registerSchemaComponent("app-stats-card", StatsCardComponent);
