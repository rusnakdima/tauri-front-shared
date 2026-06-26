import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("data-stats-card")
export class DataStatsCard extends LitElement {
  @property() label = "";
  @property() value = "";
  @property() icon = "";
  @property() iconBgClass = "bg-accent";

  static override styles = css`
    :host {
      display: block;
    }

    .app-stats-card {
      background: var(--bg-elevated);
      border: 1px solid var(--border-color);
      border-radius: 0.5rem;
      padding: 1rem;
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .app-stats-card__icon-wrap {
      width: 3rem;
      height: 3rem;
      border-radius: 0.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .app-stats-card__icon {
      font-size: 1.5rem;
      color: var(--accent);
    }

    .app-stats-card__content {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      min-width: 0;
    }

    .app-stats-card__label {
      margin: 0;
      font-size: 0.75rem;
      font-weight: 500;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .app-stats-card__value {
      margin: 0;
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--text-primary);
      line-height: 1.2;
    }
  `;

  override render() {
    return html`
      <div class="app-stats-card">
        <div class="app-stats-card__icon-wrap ${this.iconBgClass}">
          <span class="material-icons app-stats-card__icon">${this.icon}</span>
        </div>
        <div class="app-stats-card__content">
          <p class="app-stats-card__label">${this.label}</p>
          <p class="app-stats-card__value">${this.value}</p>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "data-stats-card": DataStatsCard;
  }
}
