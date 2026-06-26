import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("app-empty-state")
export class AppEmptyState extends LitElement {
  @property() icon: string | null = null;
  @property() title = "";
  @property() message = "";
  @property() actionLabel: string | null = null;
  @property() variant: "default" | "danger" | "success" = "default";

  static override styles = css`
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 2rem;
      gap: 1rem;
    }

    .icon-container {
      width: 64px;
      height: 64px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--bg-elevated);
      border: 2px solid var(--border-color);
    }

    .icon-container.danger {
      background: var(--error);
      border-color: var(--error);
    }

    .icon-container.success {
      background: var(--success);
      border-color: var(--success);
    }

    .icon {
      font-size: 2rem;
      width: 2rem;
      height: 2rem;
    }

    .icon-container.danger .icon,
    .icon-container.success .icon {
      color: var(--text-on-error);
    }

    .title {
      font-size: 1.5rem;
      font-weight: 600;
      color: var(--text-primary);
      margin: 0;
    }

    .message {
      font-size: 1rem;
      color: var(--text-secondary);
      margin: 0;
      max-width: 400px;
    }

    .action {
      margin-top: 0.5rem;
    }

    button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      border: 1px solid var(--accent);
      background: var(--accent);
      color: var(--text-on-accent);
      font-weight: 500;
      cursor: pointer;
      transition: all 0.15s;
    }

    button:hover {
      background: var(--accent-hover);
      border-color: var(--accent-hover);
    }
  `;

  private _handleAction() {
    this.dispatchEvent(
      new CustomEvent("action", { bubbles: true, composed: true }),
    );
  }

  override render() {
    return html`
      <div class="icon-container ${this.variant}">
        ${this.icon
          ? html`<span class="icon">${this.icon}</span>`
          : html`<span class="icon">📦</span>`}
      </div>
      ${this.title ? html`<h2 class="title">${this.title}</h2>` : ""}
      ${this.message ? html`<p class="message">${this.message}</p>` : ""}
      ${this.actionLabel
        ? html`
            <div class="action">
              <button @click="${this._handleAction}">
                ${this.actionLabel}
              </button>
            </div>
          `
        : ""}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "app-empty-state": AppEmptyState;
  }
}
