import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

export interface ShortcutEntry {
  key: string;
  description: string;
}

@customElement("app-shortcuts-overlay")
export class AppShortcutsOverlay extends LitElement {
  @property({ type: Boolean }) declare open: boolean;
  @property() declare shortcuts: string;

  constructor() {
    super();
    for (const key of ["open", "shortcuts"]) {
      if (Object.prototype.hasOwnProperty.call(this, key)) {
        const val = (this as Record<string, unknown>)[key];
        delete (this as Record<string, unknown>)[key];
        (this as Record<string, unknown>)[key] = val;
      }
    }
  }

  override connectedCallback(): void {
    const saved: Record<string, unknown> = {};
    for (const key of ["open", "shortcuts"]) {
      if (Object.prototype.hasOwnProperty.call(this, key)) {
        saved[key] = (this as Record<string, unknown>)[key];
        delete (this as Record<string, unknown>)[key];
      }
    }
    super.connectedCallback();
    for (const [key, value] of Object.entries(saved)) {
      (this as Record<string, unknown>)[key] = value;
    }
  }

  static override styles = css`
    :host {
      display: block;
    }

    .overlay {
      position: fixed;
      inset: 0;
      z-index: 10000;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: rgba(0, 0, 0, 0.5);
      opacity: 1;
      transition: opacity 0.2s ease;
    }

    .overlay.hidden {
      opacity: 0;
      pointer-events: none;
    }

    .modal {
      background-color: var(--bg-elevated);
      border: 1px solid var(--border-color);
      border-radius: 0.75rem;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
      width: 100%;
      max-width: 28rem;
      max-height: 80vh;
      overflow-y: auto;
      padding: 1.5rem;
    }

    .modal-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1rem;
    }

    .modal-title {
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--text-primary);
      margin: 0;
    }

    .close-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 2rem;
      height: 2rem;
      border-radius: 0.375rem;
      border: none;
      background: transparent;
      color: var(--text-muted);
      cursor: pointer;
      transition: all 0.15s;
      padding: 0;
    }

    .close-btn:hover {
      background-color: var(--bg-hover);
      color: var(--text-primary);
    }

    .close-btn svg {
      width: 1rem;
      height: 1rem;
    }

    .shortcut-list {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .shortcut-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
    }

    .shortcut-desc {
      font-size: 0.875rem;
      color: var(--text-secondary);
    }

    kbd {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 1.75rem;
      height: 1.75rem;
      padding: 0 0.375rem;
      border-radius: 0.25rem;
      border: 1px solid var(--border-color);
      background-color: var(--bg-tertiary);
      color: var(--text-primary);
      font-family: inherit;
      font-size: 0.75rem;
      font-weight: 500;
      white-space: nowrap;
    }

    .shortcut-keys {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      flex-shrink: 0;
    }

    .shortcut-plus {
      font-size: 0.75rem;
      color: var(--text-muted);
    }
  `;

  private _getParsedShortcuts(): ShortcutEntry[] {
    try {
      return JSON.parse(this.shortcuts || "[]");
    } catch {
      return [];
    }
  }

  private _handleBackdropClick(e: MouseEvent) {
    if (e.target === e.currentTarget) {
      this._close();
    }
  }

  private _close() {
    this.open = false;
    this.dispatchEvent(
      new CustomEvent("close", {
        bubbles: true,
        composed: true,
      }),
    );
  }

  private _parseKeys(key: string): string[] {
    return key.split("+").map((k) => k.trim());
  }

  override render() {
    const shortcuts = this._getParsedShortcuts();
    return html`
      <div class="overlay ${this.open ? "" : "hidden"}" @click="${this._handleBackdropClick}">
        <div class="modal">
          <div class="modal-header">
            <h2 class="modal-title">Keyboard Shortcuts</h2>
            <button class="close-btn" type="button" @click="${this._close}">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          <ul class="shortcut-list">
            ${shortcuts.map(
              (s) => html`
                <li class="shortcut-item">
                  <span class="shortcut-desc">${s.description}</span>
                  <span class="shortcut-keys">
                    ${this._parseKeys(s.key).map(
                      (k, i, arr) => html`
                        <kbd>${k}</kbd>
                        ${i < arr.length - 1
                          ? html`<span class="shortcut-plus">+</span>`
                          : ""}
                      `,
                    )}
                  </span>
                </li>
              `,
            )}
          </ul>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "app-shortcuts-overlay": AppShortcutsOverlay;
  }
}
