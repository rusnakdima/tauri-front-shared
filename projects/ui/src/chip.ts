import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("app-chip")
export class AppChip extends LitElement {
  @property() declare label: string;
  @property() declare icon: string | null;
  @property({ type: Boolean }) declare removable: boolean;
  @property({ type: Boolean }) declare selected: boolean;
  constructor() {
    super();
    for (const key of ["label", "icon", "removable", "selected"]) {
      if (Object.prototype.hasOwnProperty.call(this, key)) {
        const val = (this as Record<string, unknown>)[key];
        delete (this as Record<string, unknown>)[key];
        (this as Record<string, unknown>)[key] = val;
      }
    }
  }

  override connectedCallback(): void {
    const saved: Record<string, unknown> = {};
    for (const key of ["label", "icon", "removable", "selected"]) {
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
      display: inline-flex;
    }

    .app-chip {
      @apply inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium;
      @apply bg-[var(--bg-tertiary)] text-[var(--text-secondary)] border border-transparent;
      @apply transition-all cursor-pointer;
    }

    .app-chip:hover {
      @apply bg-[var(--bg-hover)];
    }

    .app-chip-selected {
      @apply bg-[var(--accent-100)] text-[var(--accent-700)] border-[var(--accent)];
    }

    .app-chip-icon {
      @apply text-base;
    }

    .app-chip-label {
      @apply text-inherit;
    }

    .app-chip-remove {
      @apply ml-1 p-0.5 rounded-full hover:bg-black/10 transition-colors;
      @apply flex items-center justify-center;
      background: transparent;
      border: none;
      cursor: pointer;
      padding: 0;
    }

    .app-chip-remove i {
      @apply text-xs;
    }
  `;

  private _handleRemove(e: Event) {
    e.stopPropagation();
    this.dispatchEvent(
      new CustomEvent("remove", { bubbles: true, composed: true }),
    );
  }

  private _handleClick() {
    this.selected = !this.selected;
    this.dispatchEvent(
      new CustomEvent("selected-change", {
        detail: this.selected,
        bubbles: true,
        composed: true,
      }),
    );
  }

  override render() {
    const classes = ["app-chip", this.selected ? "app-chip-selected" : ""].join(
      " ",
    );

    return html`
      <span class="${classes}" @click="${this._handleClick}">
        ${this.icon
          ? html`<i class="material-icons app-chip-icon">${this.icon}</i>`
          : ""}
        <span class="app-chip-label">${this.label}</span>
        ${this.removable
          ? html`
              <button class="app-chip-remove" @click="${this._handleRemove}">
                <i class="material-icons">close</i>
              </button>
            `
          : ""}
      </span>
    `;
  }
}
