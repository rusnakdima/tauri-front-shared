import { __decorate } from "tslib";
import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
let AppDialog = class AppDialog extends LitElement {
  constructor() {
    super(...arguments);
    this.show = false;
    this.title = "";
    this.size = "md";
    this.zIndex = 1050;
    this.backdropClose = true;
    this.showClose = true;
    this.showHeader = true;
  }
  static {
    this.styles = css`
      :host {
        display: contents;
      }

      .app-dialog-backdrop {
        position: fixed;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgb(0 0 0 / 50%);
      }

      .app-dialog-container {
        width: 100%;
        max-height: calc(100vh - 4rem);
        display: flex;
        flex-direction: column;
        background-color: var(--bg-elevated, #fff);
        border-radius: 0.75rem;
        box-shadow:
          0 20px 25px -5px rgb(0 0 0 / 0.1),
          0 8px 10px -6px rgb(0 0 0 / 0.1);
        overflow: hidden;
      }

      .app-dialog-container.sm {
        max-width: 320px;
      }
      .app-dialog-container.md {
        max-width: 480px;
      }
      .app-dialog-container.lg {
        max-width: 640px;
      }
      .app-dialog-container.xl {
        max-width: 800px;
      }

      .app-dialog-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1rem 1.5rem;
        border-bottom: 1px solid var(--border-subtle, #e5e7eb);
      }

      .app-dialog-title {
        margin: 0;
        font-size: 1.125rem;
        font-weight: 600;
        color: var(--text-primary, #111827);
      }

      .app-dialog-close {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0.25rem;
        border-radius: 0.5rem;
        border: none;
        background: transparent;
        color: var(--text-muted, #6b7280);
        cursor: pointer;
        transition:
          background-color 0.15s,
          color 0.15s;
      }

      .app-dialog-close:hover {
        background-color: var(--bg-hover, #f3f4f6);
        color: var(--text-primary, #111827);
      }

      .app-dialog-close i {
        font-size: 1.25rem;
      }

      .app-dialog-content {
        padding: 1.5rem;
        overflow-y: auto;
        flex: 1;
      }
    `;
  }
  _handleBackdropClick() {
    if (this.backdropClose) {
      this._close();
    }
  }
  _handleCloseClick() {
    this._close();
  }
  _close() {
    this.dispatchEvent(
      new CustomEvent("closed", { bubbles: true, composed: true }),
    );
  }
  _stopPropagation(e) {
    e.stopPropagation();
  }
  render() {
    if (!this.show) return null;
    return html`
      <div
        class="app-dialog-backdrop"
        style="z-index: ${this.zIndex}"
        @click="${this._handleBackdropClick}"
      >
        <div
          class="app-dialog-container ${this.size}"
          style="max-width: ${this._getMaxWidth()}"
          @click="${this._stopPropagation}"
        >
          ${this.showHeader
            ? html`
                <div class="app-dialog-header">
                  <h3 class="app-dialog-title">${this.title}</h3>
                  ${this.showClose
                    ? html`
                        <button
                          type="button"
                          class="app-dialog-close"
                          @click="${this._handleCloseClick}"
                          aria-label="Close dialog"
                        >
                          <i class="material-icons">close</i>
                        </button>
                      `
                    : ""}
                </div>
              `
            : ""}
          <div class="app-dialog-content">
            <slot></slot>
          </div>
        </div>
      </div>
    `;
  }
  _getMaxWidth() {
    switch (this.size) {
      case "sm":
        return "320px";
      case "md":
        return "480px";
      case "lg":
        return "640px";
      case "xl":
        return "800px";
      default:
        return "480px";
    }
  }
};
__decorate([property({ type: Boolean })], AppDialog.prototype, "show", void 0);
__decorate([property({ type: String })], AppDialog.prototype, "title", void 0);
__decorate([property({ type: String })], AppDialog.prototype, "size", void 0);
__decorate([property({ type: Number })], AppDialog.prototype, "zIndex", void 0);
__decorate(
  [property({ type: Boolean })],
  AppDialog.prototype,
  "backdropClose",
  void 0,
);
__decorate(
  [property({ type: Boolean })],
  AppDialog.prototype,
  "showClose",
  void 0,
);
__decorate(
  [property({ type: Boolean })],
  AppDialog.prototype,
  "showHeader",
  void 0,
);
AppDialog = __decorate([customElement("app-dialog")], AppDialog);
export { AppDialog };
//# sourceMappingURL=dialog.js.map
