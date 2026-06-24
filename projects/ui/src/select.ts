import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

@customElement("app-select")
export class AppSelect extends LitElement {
  @property() options: SelectOption[] = [];
  @property() value: string | null = null;
  @property() placeholder = "Select...";
  @property({ type: Boolean }) searchable = false;
  @property({ type: Boolean }) disabled = false;
  @property() error: string | null = null;

  @state() private _isOpen = false;
  @state() private _searchQuery = "";

  static override styles = css`
    :host {
      display: block;
    }

    .app-select-wrapper {
      @apply relative flex flex-col gap-1;
    }

    .app-select {
      @apply flex items-center justify-between px-3 py-2 rounded-lg border cursor-pointer;
      @apply bg-[var(--bg-primary)] text-[var(--text-primary)];
      border: 1px solid var(--border-color);
      box-sizing: border-box;
    }

    .app-select:hover:not(.app-select-disabled) {
      @apply border-[var(--accent)];
    }

    .app-select-open {
      @apply border-[var(--accent)] ring-1 ring-[var(--accent)];
    }

    .app-select-error {
      @apply border-[var(--error)] ring-1 ring-[var(--error)];
    }

    .app-select-disabled {
      @apply opacity-50 cursor-not-allowed;
    }

    .app-select-value {
      @apply text-sm;
    }

    .app-select-placeholder {
      @apply text-[var(--text-muted)];
    }

    .app-select-icon {
      @apply text-xl text-[var(--text-muted)];
    }

    .app-select-dropdown {
      @apply absolute top-full left-0 right-0 mt-1 z-50;
      @apply bg-[var(--bg-elevated)] border border-[var(--border-color)] rounded-lg shadow-lg;
    }

    .app-select-search {
      @apply flex items-center gap-2 px-3 py-2 border-b border-[var(--border-color)];
    }

    .app-select-search i {
      @apply text-[var(--text-muted)] text-xl;
    }

    .app-select-search-input {
      @apply flex-1 bg-transparent outline-none text-sm text-[var(--text-primary)];
      border: none;
    }

    .app-select-options {
      @apply max-h-60 overflow-y-auto;
    }

    .app-select-option {
      @apply px-3 py-2 text-sm cursor-pointer;
      @apply hover:bg-[var(--bg-hover)] transition-colors;
    }

    .app-select-option-selected {
      @apply bg-[var(--accent-100)] text-[var(--accent-700)];
    }

    .app-select-option-disabled {
      @apply opacity-50 cursor-not-allowed;
    }

    .app-select-empty {
      @apply px-3 py-2 text-sm text-[var(--text-muted)] text-center;
    }

    .app-select-error {
      @apply text-xs text-[var(--error)];
    }
  `;

  private get filteredOptions(): SelectOption[] {
    if (!this.searchable || !this._searchQuery) return this.options;
    return this.options.filter((o) =>
      o.label.toLowerCase().includes(this._searchQuery.toLowerCase()),
    );
  }

  private get selectedOption(): SelectOption | undefined {
    return this.options.find((o) => o.value === this.value);
  }

  private _toggle() {
    if (this.disabled) return;
    this._isOpen = !this._isOpen;
    if (this._isOpen) this._searchQuery = "";
  }

  private _selectOption(option: SelectOption) {
    if (option.disabled) return;
    this.value = option.value;
    this._isOpen = false;
    this.dispatchEvent(
      new CustomEvent("value-change", {
        detail: this.value,
        bubbles: true,
        composed: true,
      }),
    );
  }

  private _handleSearchInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this._searchQuery = target.value;
  }

  private _getStateClass(): string {
    if (this.error) return "app-select-error";
    if (this._isOpen) return "app-select-open";
    return "";
  }

  override render() {
    return html`
      <div class="app-select-wrapper">
        <div
          class="app-select ${this._getStateClass()} ${this.disabled
            ? "app-select-disabled"
            : ""}"
          @click="${this._toggle}"
        >
          <span class="app-select-value">
            ${this.selectedOption
              ? this.selectedOption.label
              : html`<span class="app-select-placeholder"
                  >${this.placeholder}</span
                >`}
          </span>
          <i class="material-icons app-select-icon"
            >${this._isOpen ? "expand_less" : "expand_more"}</i
          >
        </div>

        ${this._isOpen
          ? html`
              <div class="app-select-dropdown">
                ${this.searchable
                  ? html`
                      <div class="app-select-search">
                        <i class="material-icons">search</i>
                        <input
                          type="text"
                          class="app-select-search-input"
                          placeholder="Search..."
                          .value="${this._searchQuery}"
                          @input="${this._handleSearchInput}"
                        />
                      </div>
                    `
                  : ""}
                <div class="app-select-options">
                  ${this.filteredOptions.length > 0
                    ? this.filteredOptions.map(
                        (option) => html`
                          <div
                            class="app-select-option ${option.value ===
                            this.value
                              ? "app-select-option-selected"
                              : ""} ${option.disabled
                              ? "app-select-option-disabled"
                              : ""}"
                            @click="${() => this._selectOption(option)}"
                          >
                            ${option.label}
                          </div>
                        `,
                      )
                    : html`<div class="app-select-empty">
                        No options found
                      </div>`}
                </div>
              </div>
            `
          : ""}
        ${this.error
          ? html`<span class="app-select-error">${this.error}</span>`
          : ""}
      </div>
    `;
  }
}
