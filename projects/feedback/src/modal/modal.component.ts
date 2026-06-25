import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("app-modal")
export class Modal extends LitElement {
  static override styles = css`
    :host {
      display: contents;
    }
    .modal-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.6);
      backdrop-filter: blur(4px);
      z-index: 1000;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.2s ease;
    }
    :host([open]) .modal-overlay {
      opacity: 1;
      pointer-events: auto;
    }
    .modal-content {
      background: var(--bg-elevated, #21262d);
      border-radius: 12px;
      box-shadow: var(--shadow-lg, 0 10px 15px rgba(0, 0, 0, 0.5));
      width: 90%;
      max-width: var(--modal-width, 600px);
      max-height: 80vh;
      overflow: auto;
      display: flex;
      flex-direction: column;
    }
    .modal-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 20px;
      border-bottom: 1px solid var(--border-color, #30363d);
    }
    .modal-title {
      font-size: 18px;
      font-weight: 600;
      color: var(--text-primary, #e6edf3);
      margin: 0;
    }
    .modal-close {
      background: none;
      border: none;
      cursor: pointer;
      padding: 4px;
      color: var(--text-secondary, #8b949e);
    }
    .modal-close:hover {
      color: var(--text-primary, #e6edf3);
    }
    .modal-body {
      padding: 20px;
      flex: 1;
      overflow: auto;
    }
    /* Size variants */
    :host([size="sm"]) .modal-content {
      max-width: 400px;
    }
    :host([size="lg"]) .modal-content {
      max-width: 800px;
    }
    :host([size="xl"]) .modal-content {
      max-width: 1000px;
    }
  `;

  @property({ type: Boolean, reflect: true }) open = false;
  @property({ type: String }) modalTitle = "";
  @property({ type: Boolean }) closable = true;
  @property({ type: String }) size: "sm" | "md" | "lg" | "xl" = "md";

  private _close(): void {
    this.open = false;
    this.dispatchEvent(
      new CustomEvent("close", { bubbles: true, composed: true }),
    );
  }

  private _handleOverlayClick(e: MouseEvent): void {
    if (e.target === e.currentTarget && this.closable) {
      this._close();
    }
  }

  override render() {
    return html`
      <div class="modal-overlay" @click="${this._handleOverlayClick}">
        <div class="modal-content">
          ${this.modalTitle
            ? html`
                <div class="modal-header">
                  <h3 class="modal-title">${this.modalTitle}</h3>
                  ${this.closable
                    ? html`
                        <button class="modal-close" @click="${this._close}">
                          <mat-icon>close</mat-icon>
                        </button>
                      `
                    : ""}
                </div>
              `
            : ""}
          <div class="modal-body">
            <slot></slot>
          </div>
        </div>
      </div>
    `;
  }
}
