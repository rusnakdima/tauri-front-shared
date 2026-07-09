import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  OnDestroy,
  SimpleChanges,
} from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";

export type ToastType = "success" | "error" | "info" | "warning";

@Component({
  selector: "app-toast",
  standalone: true,
  template: `
    <div [class]="'toast toast-' + (type || 'info')" [class.hidden]="!visible">
      @if (type === "success") {
        <svg
          class="toast-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      } @else if (type === "error") {
        <svg
          class="toast-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="15" y1="9" x2="9" y2="15"></line>
          <line x1="9" y1="9" x2="15" y2="15"></line>
        </svg>
      } @else if (type === "warning") {
        <svg
          class="toast-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path
            d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
          ></path>
          <line x1="12" y1="9" x2="12" y2="13"></line>
          <line x1="12" y1="17" x2="12.01" y2="17"></line>
        </svg>
      } @else {
        <svg
          class="toast-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="16" x2="12" y2="12"></line>
          <line x1="12" y1="8" x2="12.01" y2="8"></line>
        </svg>
      }
      <span class="toast-message">{{ message }}</span>
      <button class="close-btn" type="button" (click)="handleClose()">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
  `,
  styles: [
    `
      :host {
        position: fixed;
        bottom: 1.5rem;
        right: 1.5rem;
        z-index: 9999;
      }
      .toast {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.75rem 1rem;
        border-radius: 0.5rem;
        background-color: var(--bg-elevated);
        color: var(--text-primary);
        border: 1px solid var(--border-color);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        font-size: 0.875rem;
        transform: translateY(0);
        opacity: 1;
        transition: all 0.3s ease;
        max-width: 24rem;
      }
      .toast.hidden {
        transform: translateY(1rem);
        opacity: 0;
        pointer-events: none;
      }
      .toast-success {
        border-color: var(--success);
        border-left-width: 3px;
      }
      .toast-error {
        border-color: var(--error);
        border-left-width: 3px;
      }
      .toast-info {
        border-color: var(--info);
        border-left-width: 3px;
      }
      .toast-warning {
        border-color: var(--warning);
        border-left-width: 3px;
      }
      .toast-icon {
        width: 1.25rem;
        height: 1.25rem;
        flex-shrink: 0;
      }
      .toast-success .toast-icon {
        color: var(--success);
      }
      .toast-error .toast-icon {
        color: var(--error);
      }
      .toast-info .toast-icon {
        color: var(--info);
      }
      .toast-warning .toast-icon {
        color: var(--warning);
      }
      .toast-message {
        flex: 1;
      }
      .close-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 1.25rem;
        height: 1.25rem;
        border: none;
        background: transparent;
        color: var(--text-muted);
        cursor: pointer;
        padding: 0;
        flex-shrink: 0;
      }
      .close-btn:hover {
        color: var(--text-primary);
      }
      .close-btn svg {
        width: 0.75rem;
        height: 0.75rem;
      }
    `,
  ],
})
export class ToastComponent implements OnChanges, OnDestroy {
  @Input() message = "";
  @Input() visible = false;
  @Input() type: ToastType = "info";
  @Output() dismissed = new EventEmitter<void>();

  private timeout: ReturnType<typeof setTimeout> | null = null;

  ngOnChanges(changes: SimpleChanges) {
    if (changes["visible"] && this.visible) {
      this.clearTimeout();
      this.timeout = setTimeout(() => this.handleClose(), 4000);
    }
  }

  ngOnDestroy() {
    this.clearTimeout();
  }

  private clearTimeout() {
    if (this.timeout !== null) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
  }

  handleClose() {
    this.visible = false;
    this.clearTimeout();
    this.dismissed.emit();
  }
}

registerSchemaComponent("app-toast", ToastComponent);
