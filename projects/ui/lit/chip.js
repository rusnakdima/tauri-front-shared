import { __decorate } from "tslib";
import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
let AppChip = class AppChip extends LitElement {
    label = "";
    icon = null;
    removable = false;
    selected = false;
    static styles = css `
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
    _handleRemove(e) {
        e.stopPropagation();
        this.dispatchEvent(new CustomEvent("remove", { bubbles: true, composed: true }));
    }
    _handleClick() {
        this.selected = !this.selected;
        this.dispatchEvent(new CustomEvent("selected-change", {
            detail: this.selected,
            bubbles: true,
            composed: true,
        }));
    }
    render() {
        const classes = ["app-chip", this.selected ? "app-chip-selected" : ""].join(" ");
        return html `
      <span class="${classes}" @click="${this._handleClick}">
        ${this.icon
            ? html `<i class="material-icons app-chip-icon">${this.icon}</i>`
            : ""}
        <span class="app-chip-label">${this.label}</span>
        ${this.removable
            ? html `
              <button class="app-chip-remove" @click="${this._handleRemove}">
                <i class="material-icons">close</i>
              </button>
            `
            : ""}
      </span>
    `;
    }
};
__decorate([
    property()
], AppChip.prototype, "label", void 0);
__decorate([
    property()
], AppChip.prototype, "icon", void 0);
__decorate([
    property({ type: Boolean })
], AppChip.prototype, "removable", void 0);
__decorate([
    property({ type: Boolean })
], AppChip.prototype, "selected", void 0);
AppChip = __decorate([
    customElement("app-chip")
], AppChip);
export { AppChip };
//# sourceMappingURL=chip.js.map