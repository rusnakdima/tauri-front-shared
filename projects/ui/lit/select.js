import { __decorate } from "tslib";
import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
let AppSelect = class AppSelect extends LitElement {
    constructor() {
        super();
        this._isOpen = false;
        this._searchQuery = "";
        for (const key of ["options", "value", "placeholder", "searchable", "disabled", "error"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                const val = this[key];
                delete this[key];
                this[key] = val;
            }
        }
    }
    connectedCallback() {
        const saved = {};
        for (const key of ["options", "value", "placeholder", "searchable", "disabled", "error"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                saved[key] = this[key];
                delete this[key];
            }
        }
        super.connectedCallback();
        for (const [key, value] of Object.entries(saved)) {
            this[key] = value;
        }
    }
    static { this.styles = css `
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
  `; }
    get filteredOptions() {
        if (!this.searchable || !this._searchQuery)
            return this.options;
        return this.options.filter((o) => o.label.toLowerCase().includes(this._searchQuery.toLowerCase()));
    }
    get selectedOption() {
        return this.options.find((o) => o.value === this.value);
    }
    _toggle() {
        if (this.disabled)
            return;
        this._isOpen = !this._isOpen;
        if (this._isOpen)
            this._searchQuery = "";
    }
    _selectOption(option) {
        if (option.disabled)
            return;
        this.value = option.value;
        this._isOpen = false;
        this.dispatchEvent(new CustomEvent("value-change", {
            detail: this.value,
            bubbles: true,
            composed: true,
        }));
    }
    _handleSearchInput(event) {
        const target = event.target;
        this._searchQuery = target.value;
    }
    _getStateClass() {
        if (this.error)
            return "app-select-error";
        if (this._isOpen)
            return "app-select-open";
        return "";
    }
    render() {
        return html `
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
            : html `<span class="app-select-placeholder"
                  >${this.placeholder}</span
                >`}
          </span>
          <i class="material-icons app-select-icon"
            >${this._isOpen ? "expand_less" : "expand_more"}</i
          >
        </div>

        ${this._isOpen
            ? html `
              <div class="app-select-dropdown">
                ${this.searchable
                ? html `
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
                ? this.filteredOptions.map((option) => html `
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
                        `)
                : html `<div class="app-select-empty">
                        No options found
                      </div>`}
                </div>
              </div>
            `
            : ""}
        ${this.error
            ? html `<span class="app-select-error">${this.error}</span>`
            : ""}
      </div>
    `;
    }
};
__decorate([
    property()
], AppSelect.prototype, "options", void 0);
__decorate([
    property()
], AppSelect.prototype, "value", void 0);
__decorate([
    property()
], AppSelect.prototype, "placeholder", void 0);
__decorate([
    property({ type: Boolean })
], AppSelect.prototype, "searchable", void 0);
__decorate([
    property({ type: Boolean })
], AppSelect.prototype, "disabled", void 0);
__decorate([
    property()
], AppSelect.prototype, "error", void 0);
__decorate([
    state()
], AppSelect.prototype, "_isOpen", void 0);
__decorate([
    state()
], AppSelect.prototype, "_searchQuery", void 0);
AppSelect = __decorate([
    customElement("app-select")
], AppSelect);
export { AppSelect };
//# sourceMappingURL=select.js.map