import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostListener,
} from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";

@Component({
  selector: "app-confirm-dialog",
  standalone: true,
  template: `
    @if (open) {
      <div class="overlay" (click)="cancel()">
        <div class="dialog" (click)="$event.stopPropagation()">
          <header>
            <h2>{{ title || "Confirm" }}</h2>
            <button class="close-btn" (click)="cancel()" aria-label="Close">
              &times;
            </button>
          </header>
          <div class="content">{{ message }}</div>
          <footer>
            <button class="cancel-btn" (click)="cancel()">
              {{ cancelText || "Cancel" }}
            </button>
            <button class="confirm-btn" (click)="confirm()">
              {{ confirmText || "Confirm" }}
            </button>
          </footer>
        </div>
      </div>
    }
  `,
  styles: [
    `
      :host {
        display: block;
      }
      .overlay {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.6);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
      }
      .dialog {
        background: var(--bg-elevated);
        border: 1px solid var(--border-color);
        border-radius: 1rem;
        width: 400px;
        max-width: 90vw;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4);
      }
      header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1.25rem 1.5rem;
        border-bottom: 1px solid var(--border-color);
      }
      header h2 {
        margin: 0;
        font-size: 1.125rem;
        font-weight: 600;
        color: var(--text-primary);
      }
      .close-btn {
        background: transparent;
        border: none;
        cursor: pointer;
        padding: 0.25rem;
        border-radius: 0.25rem;
        color: var(--text-secondary);
        font-size: 1.25rem;
        line-height: 1;
      }
      .close-btn:hover {
        background: var(--bg-hover);
        color: var(--text-primary);
      }
      .content {
        padding: 1.5rem;
        color: var(--text-secondary);
        font-size: 0.9375rem;
        line-height: 1.5;
      }
      footer {
        display: flex;
        gap: 0.75rem;
        padding: 1rem 1.5rem;
        border-top: 1px solid var(--border-color);
        justify-content: flex-end;
      }
      .cancel-btn {
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
        border: 1px solid var(--border-color);
        background: transparent;
        color: var(--text-secondary);
        font-weight: 500;
        cursor: pointer;
      }
      .cancel-btn:hover {
        background: var(--bg-hover);
        color: var(--text-primary);
      }
      .confirm-btn {
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
        border: 1px solid var(--accent);
        background: var(--accent);
        color: var(--text-on-accent);
        font-weight: 500;
        cursor: pointer;
      }
      .confirm-btn:hover {
        background: var(--accent-hover);
      }
    `,
  ],
})
export class ConfirmDialogComponent {
  @Input() open = false;
  @Input() title = "Confirm";
  @Input() message = "";
  @Input() confirmText = "Confirm";
  @Input() cancelText = "Cancel";
  @Output() confirmed = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  confirm() {
    this.open = false;
    this.confirmed.emit();
  }
  cancel() {
    this.open = false;
    this.cancelled.emit();
  }

  @HostListener("window:keydown.escape")
  onEscape() {
    if (this.open) this.cancel();
  }
}

registerSchemaComponent("app-confirm-dialog", ConfirmDialogComponent);
