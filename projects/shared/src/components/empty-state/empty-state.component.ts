import { Component, Input, Output, EventEmitter } from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";

@Component({
  selector: "app-empty-state",
  standalone: true,
  template: `
    <div class="icon-container" [class]="variant">
      @if (icon) {
        <span class="icon">{{ icon }}</span>
      }
    </div>
    @if (title) {
      <h3 class="title">{{ title }}</h3>
    }
    @if (message) {
      <p class="message">{{ message }}</p>
    }
    @if (action) {
      <div class="action">
        <button (click)="actionClicked.emit($event)">{{ action }}</button>
      </div>
    }
  `,
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        padding: 2rem;
        gap: 1rem;
      }
      .icon-container {
        width: 64px;
        height: 64px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--bg-elevated);
        border: 2px solid var(--border-color);
      }
      .icon-container.danger {
        background: var(--error);
        border-color: var(--error);
      }
      .icon-container.success {
        background: var(--success);
        border-color: var(--success);
      }
      .icon {
        font-size: 2rem;
        width: 2rem;
        height: 2rem;
      }
      .icon-container.danger .icon,
      .icon-container.success .icon {
        color: var(--text-on-error);
      }
      .title {
        font-size: 1.5rem;
        font-weight: 600;
        color: var(--text-primary);
        margin: 0;
      }
      .message {
        font-size: 1rem;
        color: var(--text-secondary);
        margin: 0;
        max-width: 400px;
      }
      .action {
        margin-top: 0.5rem;
      }
      button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
        border: 1px solid var(--accent);
        background: var(--accent);
        color: var(--text-on-accent);
        font-weight: 500;
        cursor: pointer;
        transition: all 0.15s;
      }
      button:hover {
        background: var(--accent-hover);
        border-color: var(--accent-hover);
      }
    `,
  ],
})
export class EmptyStateComponent {
  @Input() title = "";
  @Input() message = "";
  @Input() icon = "";
  @Input() variant: "default" | "danger" | "success" = "default";
  @Input() action = "";
  @Output() actionClicked = new EventEmitter<Event>();
}

registerSchemaComponent("app-empty-state", EmptyStateComponent);
