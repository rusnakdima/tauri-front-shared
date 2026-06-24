import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import "../dialog/dialog.js";

export type ConfirmVariant = "primary" | "danger";

@customElement("app-confirm-dialog")
export class AppConfirmDialog extends LitElement {
  static override styles = css`
    :host {
      display: contents;
    }

    .confirm-body {
      margin-bottom: 1.5rem;
    }

    .confirm-message {
      margin: 0;
      font-size: 0.875rem;
      color: var(--text-secondary, #6b7280);
    }

    .confirm-footer {
      display: flex;
      justify-content: flex-end;
      gap: 0.75rem;
    }

    .confirm-btn {
      padding: 0.5rem 1rem;
      font-size: 0.875rem;
      font-weight: 500;
      border-radius: 0.5rem;
      border: none;
      cursor: pointer;
      transition: opacity 0.15s;
    }

    .confirm-btn:hover {
      opacity: 0.9;
    }

    .confirm-btn-cancel {
      color: var(--text-secondary, #6b7280);
      background: transparent;
    }

    .confirm-btn-cancel:hover {
      color: var(--text-primary, #111827);
      background-color: var(--bg-hover, #f3f4f6);
    }

    .confirm-btn-primary {
      background-color: var(--accent, #3b82f6);
      color: white;
    }

    .confirm-btn-danger {
      background-color: var(--error, #ef4444);
      color: white;
    }
  `;

  @property({ type: Boolean }) isOpen = false;
  @property({ type: String }) override title = "";
  @property({ type: String }) message = "";
  @property({ type: String }) confirmText = "Confirm";
  @property({ type: String }) cancelText = "Cancel";
  @property({ type: String }) confirmVariant: ConfirmVariant = "danger";

  private _onConfirm(): void {
    this.dispatchEvent(
      new CustomEvent("confirm", { bubbles: true, composed: true }),
    );
    this.isOpen = false;
  }

  private _onCancel(): void {
    this.dispatchEvent(
      new CustomEvent("cancel", { bubbles: true, composed: true }),
    );
    this.isOpen = false;
  }

  private _onClosed(): void {
    this._onCancel();
  }

  open(): void {
    this.isOpen = true;
  }

  close(): void {
    this.isOpen = false;
  }

  override render() {
    return html`
      <app-dialog
        .show="${this.isOpen}"
        .title="${this.title}"
        size="sm"
        .showHeader="${true}"
        .backdropClose="${false}"
        .showClose="${false}"
        @closed="${this._onClosed}"
      >
        <div class="confirm-body">
          ${this.message
            ? html`<p class="confirm-message">${this.message}</p>`
            : ""}
        </div>
        <div class="confirm-footer">
          <button
            type="button"
            class="confirm-btn confirm-btn-cancel"
            @click="${this._onCancel}"
          >
            ${this.cancelText}
          </button>
          <button
            type="button"
            class="confirm-btn ${this.confirmVariant === "primary"
              ? "confirm-btn-primary"
              : "confirm-btn-danger"}"
            @click="${this._onConfirm}"
          >
            ${this.confirmText}
          </button>
        </div>
      </app-dialog>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "app-confirm-dialog": AppConfirmDialog;
  }
}
