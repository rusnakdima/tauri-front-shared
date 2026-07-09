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

export type SnackbarType = "default" | "success" | "error" | "warning" | "info";

@Component({
  selector: "app-snackbar",
  standalone: true,
  template: `
    @if (open) {
      <div [class]="'bar ' + type" role="status">
        <span class="message">{{ message }}</span>
        @if (action) {
          <button class="action-btn" (click)="handleAction()">
            {{ action }}
          </button>
        }
        <button class="close-btn" (click)="dismiss()" aria-label="Dismiss">
          &times;
        </button>
      </div>
    }
  `,
  styles: [
    `
      :host {
        position: fixed;
        bottom: 1.5rem;
        left: 50%;
        transform: translateX(-50%);
        z-index: 9999;
        display: block;
      }
      .bar {
        display: inline-flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.75rem 1rem;
        border-radius: 0.5rem;
        background: var(--bg-elevated, #1f2937);
        color: var(--text-on-accent, #ffffff);
        font-size: 0.875rem;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        min-width: 280px;
        max-width: 560px;
        border-left: 4px solid var(--accent, #3b82f6);
      }
      .bar.success {
        border-left-color: var(--success, #10b981);
      }
      .bar.error {
        border-left-color: var(--error, #ef4444);
      }
      .bar.warning {
        border-left-color: var(--warning, #f59e0b);
      }
      .bar.info {
        border-left-color: var(--info, #3b82f6);
      }
      .message {
        flex: 1;
      }
      .action-btn {
        background: transparent;
        border: none;
        color: var(--accent, #3b82f6);
        font-weight: 600;
        cursor: pointer;
        padding: 0.25rem 0.5rem;
        border-radius: 0.25rem;
        text-transform: uppercase;
        font-size: 0.75rem;
      }
      .action-btn:hover {
        background: rgba(255, 255, 255, 0.1);
      }
      .close-btn {
        background: transparent;
        border: none;
        color: inherit;
        cursor: pointer;
        padding: 0.125rem 0.25rem;
        opacity: 0.7;
        font-size: 1.125rem;
        line-height: 1;
      }
      .close-btn:hover {
        opacity: 1;
      }
    `,
  ],
})
export class SnackbarComponent implements OnChanges, OnDestroy {
  @Input() message = "";
  @Input() action = "";
  @Input() duration = 4000;
  @Input() type: SnackbarType = "default";
  @Input() open = false;
  @Output() dismissed = new EventEmitter<void>();
  @Output() actioned = new EventEmitter<void>();

  private timer: number | null = null;

  ngOnChanges(changes: SimpleChanges) {
    if (changes["open"] && this.open) {
      this.startTimer();
    }
  }

  ngOnDestroy() {
    this.clearTimer();
  }

  private startTimer() {
    this.clearTimer();
    this.timer = window.setTimeout(() => this.dismiss(), this.duration);
  }

  private clearTimer() {
    if (this.timer !== null) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  dismiss() {
    this.open = false;
    this.clearTimer();
    this.dismissed.emit();
  }

  handleAction() {
    this.actioned.emit();
    this.dismiss();
  }
}

registerSchemaComponent("app-snackbar", SnackbarComponent);
