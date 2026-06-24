import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("app-empty-state")
export class AppEmptyState extends LitElement {
  @property() icon: string | null = null;
  @property() override title = "";
  @property() message = "";
  @property() actionLabel: string | null = null;

  static override styles = css`
    :host {
      display: block;
    }

    .app-empty-state {
      @apply flex flex-col items-center justify-center text-center p-8;
    }

    .app-empty-state-icon {
      @apply text-6xl text-[var(--text-muted)] mb-4;
    }

    .app-empty-state-title {
      @apply text-lg font-semibold text-[var(--text-primary)] mb-2;
    }

    .app-empty-state-message {
      @apply text-sm text-[var(--text-secondary)] mb-4 max-w-sm;
    }

    .app-empty-state-action {
      @apply px-4 py-2 rounded-lg bg-[var(--accent)] text-white text-sm font-medium;
      @apply hover:opacity-90 transition-opacity;
      border: none;
      cursor: pointer;
    }
  `;

  private _handleAction() {
    this.dispatchEvent(
      new CustomEvent("action", { bubbles: true, composed: true }),
    );
  }

  override render() {
    return html`
      <div class="app-empty-state">
        ${this.icon
          ? html`<i class="material-icons app-empty-state-icon"
              >${this.icon}</i
            >`
          : ""}
        ${this.title
          ? html`<h3 class="app-empty-state-title">${this.title}</h3>`
          : ""}
        ${this.message
          ? html`<p class="app-empty-state-message">${this.message}</p>`
          : ""}
        ${this.actionLabel
          ? html`
              <button
                class="app-empty-state-action"
                @click="${this._handleAction}"
              >
                ${this.actionLabel}
              </button>
            `
          : ""}
      </div>
    `;
  }
}
