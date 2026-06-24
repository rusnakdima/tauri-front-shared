import { __decorate } from "tslib";
import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
let AppModal = class AppModal extends LitElement {
    static styles = css `
    :host {
      display: contents;
    }

    .app-modal-backdrop {
      position: fixed;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: rgb(0 0 0 / 50%);
      backdrop-filter: blur(4px);
      animation: fadeIn 0.15s ease-out;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    .app-modal-container {
      width: 100%;
      max-height: calc(100vh - 4rem);
      display: flex;
      flex-direction: column;
      background-color: var(--bg-elevated, #fff);
      border-radius: 0.75rem;
      box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);
      overflow: hidden;
      animation: slideUp 0.2s ease-out;
    }

    @keyframes slideUp {
      from {
        transform: translateY(20px);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }

    .app-modal-container.sm {
      max-width: 320px;
    }
    .app-modal-container.md {
      max-width: 480px;
    }
    .app-modal-container.lg {
      max-width: 640px;
    }
    .app-modal-container.xl {
      max-width: 800px;
    }
    .app-modal-container.full {
      max-width: 100vw;
      max-height: 100vh;
      height: 100vh;
      width: 100vw;
      border-radius: 0;
    }

    .app-modal-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem 1.5rem;
      border-bottom: 1px solid var(--border-subtle, #e5e7eb);
      flex-shrink: 0;
    }

    .app-modal-title {
      margin: 0;
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--text-primary, #111827);
    }

    .app-modal-close {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0.25rem;
      border: none;
      border-radius: 0.5rem;
      background: transparent;
      color: var(--text-muted, #6b7280);
      cursor: pointer;
      transition:
        background-color 0.15s,
        color 0.15s;
    }

    .app-modal-close:hover {
      background-color: var(--bg-hover, #f3f4f6);
      color: var(--text-primary, #111827);
    }

    .app-modal-close i {
      font-size: 1.25rem;
    }

    .app-modal-body {
      padding: 1.5rem;
      overflow-y: auto;
      flex: 1;
    }

    .app-modal-footer {
      padding: 1rem 1.5rem;
      border-top: 1px solid var(--border-subtle, #e5e7eb);
      background-color: var(--bg-secondary, #f9fafb);
      flex-shrink: 0;
    }
  `;
    open = false;
    title = "";
    size = "md";
    closeOnBackdrop = true;
    closeOnEscape = true;
    showHeader = true;
    showFooter = true;
    zIndex = 1050;
    _previousActiveElement = null;
    _modalContent;
    _handleKeydown = this._onKeyDown.bind(this);
    updated(changedProps) {
        if (changedProps.has("open")) {
            if (this.open) {
                this._handleBodyOverflow();
                requestAnimationFrame(() => this._focusFirstElement());
            }
            else {
                this._restoreBodyOverflow();
            }
        }
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this._restoreBodyOverflow();
    }
    _handleBodyOverflow() {
        this._previousActiveElement = document.activeElement;
        document.body.style.overflow = "hidden";
        document.addEventListener("keydown", this._handleKeydown);
    }
    _restoreBodyOverflow() {
        document.body.style.overflow = "";
        document.removeEventListener("keydown", this._handleKeydown);
        if (this._previousActiveElement) {
            this._previousActiveElement.focus();
            this._previousActiveElement = null;
        }
    }
    _onKeyDown(event) {
        if (event.key === "Escape" && this.closeOnEscape) {
            event.preventDefault();
            this._close();
            return;
        }
        if (event.key === "Tab") {
            this._trapFocus(event);
        }
    }
    _trapFocus(event) {
        if (!this._modalContent)
            return;
        const focusable = this._modalContent.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (focusable.length === 0)
            return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
        }
        else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
        }
    }
    _focusFirstElement() {
        if (!this._modalContent)
            return;
        const first = this._modalContent.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        first?.focus();
    }
    _onBackdropClick() {
        if (this.closeOnBackdrop) {
            this._close();
        }
    }
    _close() {
        this.dispatchEvent(new CustomEvent("closed", { bubbles: true, composed: true }));
    }
    _stopPropagation(e) {
        e.stopPropagation();
    }
    render() {
        if (!this.open)
            return null;
        return html `
      <div
        class="app-modal-backdrop"
        style="z-index: ${this.zIndex}"
        @click="${this._onBackdropClick}"
      >
        <div
          class="app-modal-container ${this.size}"
          role="dialog"
          aria-modal="true"
          aria-labelledby="${this.showHeader
            ? "modal-title"
            : "modal-description"}"
          @click="${this._stopPropagation}"
        >
          ${this.showHeader
            ? html `
                <div class="app-modal-header">
                  <h2 id="modal-title" class="app-modal-title">
                    ${this.title}
                  </h2>
                  <button
                    type="button"
                    class="app-modal-close"
                    @click="${this._close}"
                    aria-label="Close modal"
                  >
                    <i class="material-icons">close</i>
                  </button>
                </div>
              `
            : ""}

          <div class="app-modal-body" id="modal-description">
            <slot></slot>
          </div>

          ${this.showFooter
            ? html `
                <div class="app-modal-footer">
                  <slot name="footer"></slot>
                </div>
              `
            : ""}
        </div>
      </div>
    `;
    }
};
__decorate([
    property({ type: Boolean })
], AppModal.prototype, "open", void 0);
__decorate([
    property({ type: String })
], AppModal.prototype, "title", void 0);
__decorate([
    property({ type: String })
], AppModal.prototype, "size", void 0);
__decorate([
    property({ type: Boolean })
], AppModal.prototype, "closeOnBackdrop", void 0);
__decorate([
    property({ type: Boolean })
], AppModal.prototype, "closeOnEscape", void 0);
__decorate([
    property({ type: Boolean })
], AppModal.prototype, "showHeader", void 0);
__decorate([
    property({ type: Boolean })
], AppModal.prototype, "showFooter", void 0);
__decorate([
    property({ type: Number })
], AppModal.prototype, "zIndex", void 0);
__decorate([
    state()
], AppModal.prototype, "_previousActiveElement", void 0);
AppModal = __decorate([
    customElement("app-modal")
], AppModal);
export { AppModal };
//# sourceMappingURL=modal.js.map