import { Component, Input, Output, EventEmitter } from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";

@Component({
  selector: "app-swap-button",
  standalone: true,
  template: `<button
    class="swap-btn"
    (click)="clicked.emit($event)"
    aria-label="Swap"
  >
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <polyline points="17 1 21 5 17 9"></polyline>
      <path d="M3 11V9a4 4 0 0 1 4-4h14"></path>
      <polyline points="7 23 3 19 7 15"></polyline>
      <path d="M21 13v2a4 4 0 0 1-4 4H3"></path>
    </svg>
  </button>`,
  styles: [
    `
      :host {
        display: inline-flex;
      }
      .swap-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: 1px solid var(--border-color);
        background: var(--bg-elevated);
        color: var(--text-secondary);
        cursor: pointer;
        transition: all 0.15s;
        padding: 0;
      }
      .swap-btn:hover {
        background: var(--bg-hover);
        color: var(--text-primary);
      }
    `,
  ],
})
export class SwapButtonComponent {
  @Input() ariaLabel = "";
  @Input() align = "";
  @Input() direction = "";
  @Input() height = "";
  @Input() justify = "";
  @Input() layout = "";
  @Input() width = "";
  @Output() clicked = new EventEmitter<Event>();
}

registerSchemaComponent("app-swap-button", SwapButtonComponent);
