import { Component, Input } from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";

@Component({
  selector: "app-progress-bar",
  standalone: true,
  template: `
    <div class="progress-container">
      <div
        [class]="'progress-fill ' + fillClass"
        [style.width.%]="percentage"
      ></div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
      .progress-container {
        width: 100%;
        height: 0.5rem;
        background-color: var(--bg-elevated);
        border-radius: 0.25rem;
        overflow: hidden;
        border: 1px solid var(--border-color);
      }
      .progress-fill {
        height: 100%;
        border-radius: 0.25rem;
        transition: width 0.3s ease;
      }
      .progress-fill.low {
        background-color: var(--warning);
      }
      .progress-fill.medium {
        background-color: var(--accent);
      }
      .progress-fill.high {
        background-color: var(--success);
      }
    `,
  ],
})
export class ProgressBarComponent {
  @Input() value = 0;
  @Input() max = 100;

  get percentage(): number {
    return (this.value / this.max) * 100;
  }

  get fillClass(): string {
    const pct = this.percentage;
    if (pct < 40) return "low";
    if (pct < 75) return "medium";
    return "high";
  }
}

registerSchemaComponent("app-progress-bar", ProgressBarComponent);
