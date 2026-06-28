import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";

export type ModalSize = "sm" | "md" | "lg" | "xl" | "full";

@customElement("app-modal")
export class AppModal extends LitElement {
  static override styles = css`
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

  @property({ type: Boolean }) declare open: boolean;
  @property({ type: String }) override title = "";
  @property({ type: String }) declare size: ModalSize;
  @property({ type: Boolean }) declare closeOnBackdrop: boolean;
  @property({ type: Boolean }) declare closeOnEscape: boolean;
  @property({ type: Boolean }) declare showHeader: boolean;
  @property({ type: Boolean }) declare showFooter: boolean;
  @property({ type: Number }) declare zIndex: number;
  constructor() {
    super();
    for (const key of ["open", "override", "size", "closeOnBackdrop", "closeOnEscape", "showHeader", "showFooter", "zIndex"]) {
      if (Object.prototype.hasOwnProperty.call(this, key)) {
        const val = (this as Record<string, unknown>)[key];
        delete (this as Record<string, unknown>)[key];
        (this as Record<string, unknown>)[key] = val;
      }
    }
  }


  @state() private _previousActiveElement: HTMLElement | null = null;

  private _modalContent?: HTMLElement;
  private _handleKeydown = this._onKeyDown.bind(this);

  override updated(changedProps: Map<string, unknown>): void {
    if (changedProps.has("open")) {
      if (this.open) {
        this._handleBodyOverflow();
        requestAnimationFrame(() => this._focusFirstElement());
      } else {
        this._restoreBodyOverflow();
      }
    }
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._restoreBodyOverflow();
  }

  private _handleBodyOverflow(): void {
    this._previousActiveElement = document.activeElement as HTMLElement;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", this._handleKeydown);
  }

  private _restoreBodyOverflow(): void {
    document.body.style.overflow = "";
    document.removeEventListener("keydown", this._handleKeydown);
    if (this._previousActiveElement) {
      this._previousActiveElement.focus();
      this._previousActiveElement = null;
    }
  }

  private _onKeyDown(event: KeyboardEvent): void {
    if (event.key === "Escape" && this.closeOnEscape) {
      event.preventDefault();
      this._close();
      return;
    }

    if (event.key === "Tab") {
      this._trapFocus(event);
    }
  }

  private _trapFocus(event: KeyboardEvent): void {
    if (!this._modalContent) return;

    const focusable = this._modalContent.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );

    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  private _focusFirstElement(): void {
    if (!this._modalContent) return;
    const first = this._modalContent.querySelector<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    first?.focus();
  }

  private _onBackdropClick(): void {
    if (this.closeOnBackdrop) {
      this._close();
    }
  }

  private _close(): void {
    this.dispatchEvent(
      new CustomEvent("closed", { bubbles: true, composed: true }),
    );
  }

  private _stopPropagation(e: Event): void {
    e.stopPropagation();
  }

  override render() {
    if (!this.open) return null;

    return html`
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
            ? html`
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
            ? html`
                <div class="app-modal-footer">
                  <slot name="footer"></slot>
                </div>
              `
            : ""}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "app-modal": AppModal;
  }
}
