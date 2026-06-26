import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("app-switch")
export class AppSwitch extends LitElement {
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) checked = false;

  static override styles = css`
    :host {
      display: inline-flex;
    }

    .app-switch {
      @apply w-11 h-6 rounded-full border-2 border-[var(--border-color)] cursor-pointer;
      @apply transition-all relative;
      background: transparent;
      border-style: solid;
    }

    .app-switch-checked {
      @apply bg-[var(--accent)] border-[var(--accent)];
    }

    .app-switch-disabled {
      @apply opacity-50 cursor-not-allowed;
    }

    .app-switch-thumb {
      @apply absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform;
    }

    .app-switch-checked .app-switch-thumb {
      transform: translateX(20px);
    }
  `;

  private _toggle() {
    if (this.disabled) return;
    this.checked = !this.checked;
    this.dispatchEvent(
      new CustomEvent("checked-change", {
        detail: this.checked,
        bubbles: true,
        composed: true,
      }),
    );
  }

  override render() {
    return html`
      <div
        class="app-switch ${this.checked ? "app-switch-checked" : ""} ${this
          .disabled
          ? "app-switch-disabled"
          : ""}"
        @click="${this._toggle}"
      >
        <span class="app-switch-thumb"></span>
      </div>
    `;
  }
}
