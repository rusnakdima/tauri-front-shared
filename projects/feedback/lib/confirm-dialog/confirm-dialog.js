import { __decorate } from "tslib";
import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import "../dialog/dialog.js";
let AppConfirmDialog = class AppConfirmDialog extends LitElement {
    static { this.styles = css `
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
  `; }
    constructor() {
        super();
        this.title = "";
        for (const key of ["isOpen", "override", "message", "confirmText", "cancelText", "confirmVariant"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                const val = this[key];
                delete this[key];
                this[key] = val;
            }
        }
    }
    connectedCallback() {
        const saved = {};
        for (const key of ["isOpen", "override", "message", "confirmText", "cancelText", "confirmVariant"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                saved[key] = this[key];
                delete this[key];
            }
        }
        super.connectedCallback();
        for (const [key, value] of Object.entries(saved)) {
            this[key] = value;
        }
    }
    _onConfirm() {
        this.dispatchEvent(new CustomEvent("confirm", { bubbles: true, composed: true }));
        this.isOpen = false;
    }
    _onCancel() {
        this.dispatchEvent(new CustomEvent("cancel", { bubbles: true, composed: true }));
        this.isOpen = false;
    }
    _onClosed() {
        this._onCancel();
    }
    open() {
        this.isOpen = true;
    }
    close() {
        this.isOpen = false;
    }
    render() {
        return html `
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
            ? html `<p class="confirm-message">${this.message}</p>`
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
};
__decorate([
    property({ type: Boolean })
], AppConfirmDialog.prototype, "isOpen", void 0);
__decorate([
    property({ type: String })
], AppConfirmDialog.prototype, "title", void 0);
__decorate([
    property({ type: String })
], AppConfirmDialog.prototype, "message", void 0);
__decorate([
    property({ type: String })
], AppConfirmDialog.prototype, "confirmText", void 0);
__decorate([
    property({ type: String })
], AppConfirmDialog.prototype, "cancelText", void 0);
__decorate([
    property({ type: String })
], AppConfirmDialog.prototype, "confirmVariant", void 0);
AppConfirmDialog = __decorate([
    customElement("app-confirm-dialog")
], AppConfirmDialog);
export { AppConfirmDialog };
//# sourceMappingURL=confirm-dialog.js.map