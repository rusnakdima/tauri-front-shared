import { Component, Input } from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";

@Component({
  selector: "app-tooltip",
  standalone: true,
  template: `
    <div
      class="tooltip-trigger"
      (mouseenter)="show = true"
      (mouseleave)="show = false"
      (focus)="show = true"
      (blur)="show = false"
      tabindex="0"
    >
      <ng-content></ng-content>
      @if (show) {
        <div class="tooltip-bubble" [class]="position || 'top'">{{ text }}</div>
      }
    </div>
  `,
  styles: [
    `
      :host {
        display: inline-flex;
        position: relative;
      }
      .tooltip-trigger {
        display: inline-flex;
        position: relative;
        cursor: pointer;
      }
      .tooltip-bubble {
        position: absolute;
        z-index: 1000;
        padding: 0.375rem 0.75rem;
        border-radius: 0.375rem;
        background: var(--bg-elevated);
        color: var(--text-primary);
        font-size: 0.75rem;
        white-space: nowrap;
        border: 1px solid var(--border-color);
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        pointer-events: none;
      }
      .tooltip-bubble.top {
        bottom: 100%;
        left: 50%;
        transform: translateX(-50%);
        margin-bottom: 0.5rem;
      }
      .tooltip-bubble.bottom {
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        margin-top: 0.5rem;
      }
      .tooltip-bubble.left {
        right: 100%;
        top: 50%;
        transform: translateY(-50%);
        margin-right: 0.5rem;
      }
      .tooltip-bubble.right {
        left: 100%;
        top: 50%;
        transform: translateY(-50%);
        margin-left: 0.5rem;
      }
    `,
  ],
})
export class TooltipComponent {
  @Input() text = "";
  @Input() position: "top" | "bottom" | "left" | "right" = "top";
  @Input() delay = 200;
  show = false;
}

registerSchemaComponent("app-tooltip", TooltipComponent);
