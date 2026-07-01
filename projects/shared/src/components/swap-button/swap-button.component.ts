import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("app-swap-button")
export class AppSwapButton extends LitElement {
  constructor() {
    super();
  }

  static override styles = css`
    :host {
      display: inline-flex;
    }

    button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 50%;
      border: 1px solid var(--border-color);
      background-color: var(--bg-elevated);
      color: var(--text-primary);
      cursor: pointer;
      transition: all 0.15s;
      padding: 0;
    }

    button:hover {
      background-color: var(--accent);
      color: var(--text-on-accent);
      border-color: var(--accent);
    }

    svg {
      width: 1.25rem;
      height: 1.25rem;
    }
  `;

  private _handleClick() {
    this.dispatchEvent(
      new CustomEvent("click", {
        bubbles: true,
        composed: true,
      }),
    );
  }

  override render() {
    return html`
      <button type="button" @click="${this._handleClick}" title="Swap">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="17 1 21 5 17 9"></polyline>
          <path d="M3 11V9a4 4 0 0 1 4-4h14"></path>
          <polyline points="7 23 3 19 7 15"></polyline>
          <path d="M21 13v2a4 4 0 0 1-4 4H3"></path>
        </svg>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "app-swap-button": AppSwapButton;
  }
}
