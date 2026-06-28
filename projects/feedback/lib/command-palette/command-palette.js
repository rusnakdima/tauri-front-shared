import { __decorate } from "tslib";
import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
let AppCommandPalette = class AppCommandPalette extends LitElement {
    static { this.styles = css `
    :host {
      display: contents;
    }

    .app-command-palette-backdrop {
      position: fixed;
      inset: 0;
      display: flex;
      align-items: flex-start;
      justify-content: center;
      padding-top: 15vh;
      background-color: rgb(0 0 0 / 50%);
      backdrop-filter: blur(4px);
      z-index: 9999;
      animation: fadeIn 0.15s ease-out;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    .app-command-palette-container {
      width: 100%;
      max-width: 560px;
      background-color: var(--bg-elevated, #fff);
      border-radius: 0.75rem;
      box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);
      border: 1px solid var(--border-subtle, #e5e7eb);
      overflow: hidden;
      animation: slideDown 0.15s ease-out;
    }

    @keyframes slideDown {
      from {
        transform: translateY(-20px);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }

    .app-command-palette-header {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.75rem 1rem;
      border-bottom: 1px solid var(--border-subtle, #e5e7eb);
    }

    .app-command-palette-search-icon {
      font-size: 1.25rem;
      color: var(--text-muted, #6b7280);
      flex-shrink: 0;
    }

    .app-command-palette-input {
      flex: 1;
      background: transparent;
      border: none;
      outline: none;
      font-size: 1rem;
      color: var(--text-primary, #111827);
    }

    .app-command-palette-input::placeholder {
      color: var(--text-muted, #6b7280);
    }

    .app-command-palette-kbd {
      padding: 0.25rem 0.5rem;
      font-size: 0.75rem;
      border-radius: 0.25rem;
      background-color: var(--bg-tertiary, #f3f4f6);
      color: var(--text-muted, #6b7280);
      border: 1px solid var(--border-subtle, #e5e7eb);
    }

    .app-command-palette-results {
      max-height: 320px;
      overflow-y: auto;
    }

    .app-command-palette-empty {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 3rem 0;
      gap: 0.5rem;
      color: var(--text-muted, #6b7280);
    }

    .app-command-palette-empty i {
      font-size: 2.5rem;
    }

    .app-command-palette-group {
      padding: 0.5rem 0;
    }

    .app-command-palette-group-label {
      padding: 0.25rem 1rem;
      font-size: 0.75rem;
      font-weight: 500;
      color: var(--text-muted, #6b7280);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .app-command-palette-item {
      width: 100%;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.625rem 1rem;
      text-align: left;
      font-size: 0.875rem;
      color: var(--text-primary, #111827);
      background: transparent;
      border: none;
      cursor: pointer;
      transition: background-color 0.1s;
    }

    .app-command-palette-item:hover {
      background-color: var(--bg-hover, #f3f4f6);
    }

    .app-command-palette-item-selected {
      background-color: var(--accent-50, #eff6ff);
    }

    .app-command-palette-item-selected:hover {
      background-color: var(--accent-100, #dbeafe);
    }

    .app-command-palette-item-disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .app-command-palette-item-disabled:hover {
      background-color: transparent;
    }

    .app-command-palette-item-icon {
      font-size: 1.25rem;
      color: var(--text-muted, #6b7280);
      flex-shrink: 0;
    }

    .app-command-palette-item-label {
      flex: 1;
    }

    .app-command-palette-item-shortcut {
      padding: 0.125rem 0.5rem;
      font-size: 0.75rem;
      border-radius: 0.25rem;
      background-color: var(--bg-tertiary, #f3f4f6);
      color: var(--text-muted, #6b7280);
      border: 1px solid var(--border-subtle, #e5e7eb);
    }

    .app-command-palette-footer {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 0.5rem 1rem;
      border-top: 1px solid var(--border-subtle, #e5e7eb);
      background-color: var(--bg-secondary, #f9fafb);
    }

    .app-command-palette-hint {
      display: flex;
      align-items: center;
      gap: 0.375rem;
      font-size: 0.75rem;
      color: var(--text-muted, #6b7280);
    }

    .app-command-palette-hint kbd {
      padding: 0.125rem 0.375rem;
      font-size: 0.625rem;
      border-radius: 0.25rem;
      background-color: var(--bg-tertiary, #f3f4f6);
      color: var(--text-secondary, #6b7280);
      border: 1px solid var(--border-subtle, #e5e7eb);
    }
  `; }
    constructor() {
        super();
        this._isOpen = false;
        this._searchQuery = "";
        this._selectedIndex = 0;
        this._handleGlobalKeyDown = this._onGlobalKeyDown.bind(this);
        for (const key of ["commands", "placeholder", "triggerShortcut"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                const val = this[key];
                delete this[key];
                this[key] = val;
            }
        }
    }
    connectedCallback() {
        super.connectedCallback();
        document.addEventListener("keydown", this._handleGlobalKeyDown);
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        document.removeEventListener("keydown", this._handleGlobalKeyDown);
        this._restoreBodyOverflow();
    }
    _onGlobalKeyDown(event) {
        if ((event.ctrlKey || event.metaKey) && event.key === "k") {
            event.preventDefault();
            this._toggle();
            return;
        }
        if (!this._isOpen)
            return;
        switch (event.key) {
            case "Escape":
                event.preventDefault();
                this._close();
                break;
            case "ArrowDown":
                event.preventDefault();
                this._moveSelection(1);
                break;
            case "ArrowUp":
                event.preventDefault();
                this._moveSelection(-1);
                break;
            case "Enter":
                event.preventDefault();
                this._selectCurrent();
                break;
        }
    }
    _toggle() {
        if (this._isOpen) {
            this._close();
        }
        else {
            this._open();
        }
    }
    _open() {
        this._isOpen = true;
        this._searchQuery = "";
        this._selectedIndex = 0;
        document.body.style.overflow = "hidden";
    }
    _close() {
        this._isOpen = false;
        this._searchQuery = "";
        this._selectedIndex = 0;
        this._restoreBodyOverflow();
        this.dispatchEvent(new CustomEvent("closed", { bubbles: true, composed: true }));
    }
    _restoreBodyOverflow() {
        document.body.style.overflow = "";
    }
    _onBackdropClick() {
        this._close();
    }
    _onSearchInput(e) {
        this._searchQuery = e.target.value;
        this._selectedIndex = 0;
    }
    _selectCommand(command) {
        if (command.disabled)
            return;
        this.dispatchEvent(new CustomEvent("command-selected", {
            detail: command,
            bubbles: true,
            composed: true,
        }));
        this._close();
    }
    _moveSelection(delta) {
        const filtered = this._filteredCommands;
        if (filtered.length === 0)
            return;
        let newIndex = this._selectedIndex + delta;
        if (newIndex < 0)
            newIndex = filtered.length - 1;
        if (newIndex >= filtered.length)
            newIndex = 0;
        const cmd = filtered[newIndex];
        if (cmd?.disabled) {
            newIndex += delta > 0 ? 1 : -1;
            if (newIndex < 0)
                newIndex = filtered.length - 1;
            if (newIndex >= filtered.length)
                newIndex = 0;
        }
        this._selectedIndex = newIndex;
    }
    _selectCurrent() {
        const commands = this._filteredCommands;
        const command = commands[this._selectedIndex];
        if (command && !command.disabled) {
            this._selectCommand(command);
        }
    }
    _isSelected(command) {
        return this._filteredCommands[this._selectedIndex]?.id === command.id;
    }
    _stopPropagation(e) {
        e.stopPropagation();
    }
    get _filteredCommands() {
        const query = this._searchQuery.toLowerCase().trim();
        if (!query)
            return this.commands;
        return this.commands.filter((cmd) => cmd.label.toLowerCase().includes(query) ||
            cmd.category?.toLowerCase().includes(query));
    }
    get _groupedCommands() {
        const grouped = new Map();
        for (const cmd of this._filteredCommands) {
            const category = cmd.category || "General";
            if (!grouped.has(category)) {
                grouped.set(category, []);
            }
            grouped.get(category).push(cmd);
        }
        return grouped;
    }
    render() {
        if (!this._isOpen)
            return null;
        return html `
      <div
        class="app-command-palette-backdrop"
        @click="${this._onBackdropClick}"
      >
        <div
          class="app-command-palette-container"
          @click="${this._stopPropagation}"
        >
          <div class="app-command-palette-header">
            <i class="material-icons app-command-palette-search-icon">search</i>
            <input
              type="text"
              class="app-command-palette-input"
              placeholder="${this.placeholder}"
              .value="${this._searchQuery}"
              @input="${this._onSearchInput}"
              autofocus
            />
            <kbd class="app-command-palette-kbd">Esc</kbd>
          </div>

          <div class="app-command-palette-results">
            ${this._filteredCommands.length === 0
            ? html `
                  <div class="app-command-palette-empty">
                    <i class="material-icons">search_off</i>
                    <span>No commands found</span>
                  </div>
                `
            : html `
                  ${Array.from(this._groupedCommands.entries()).map(([category, cmds]) => html `
                      <div class="app-command-palette-group">
                        <div class="app-command-palette-group-label">
                          ${category}
                        </div>
                        ${cmds.map((command) => html `
                            <button
                              type="button"
                              class="app-command-palette-item ${this._isSelected(command)
                ? "app-command-palette-item-selected"
                : ""} ${command.disabled
                ? "app-command-palette-item-disabled"
                : ""}"
                              ?disabled="${command.disabled}"
                              @click="${() => this._selectCommand(command)}"
                            >
                              ${command.icon
                ? html `
                                    <i
                                      class="material-icons app-command-palette-item-icon"
                                      >${command.icon}</i
                                    >
                                  `
                : ""}
                              <span class="app-command-palette-item-label"
                                >${command.label}</span
                              >
                              ${command.shortcut
                ? html `
                                    <kbd
                                      class="app-command-palette-item-shortcut"
                                      >${command.shortcut}</kbd
                                    >
                                  `
                : ""}
                            </button>
                          `)}
                      </div>
                    `)}
                `}
          </div>

          <div class="app-command-palette-footer">
            <span class="app-command-palette-hint">
              <kbd>↑↓</kbd> Navigate
            </span>
            <span class="app-command-palette-hint"> <kbd>↵</kbd> Select </span>
            <span class="app-command-palette-hint"> <kbd>Esc</kbd> Close </span>
          </div>
        </div>
      </div>
    `;
    }
};
__decorate([
    property({ type: Array })
], AppCommandPalette.prototype, "commands", void 0);
__decorate([
    property({ type: String })
], AppCommandPalette.prototype, "placeholder", void 0);
__decorate([
    property({ type: String })
], AppCommandPalette.prototype, "triggerShortcut", void 0);
__decorate([
    state()
], AppCommandPalette.prototype, "_isOpen", void 0);
__decorate([
    state()
], AppCommandPalette.prototype, "_searchQuery", void 0);
__decorate([
    state()
], AppCommandPalette.prototype, "_selectedIndex", void 0);
AppCommandPalette = __decorate([
    customElement("app-command-palette")
], AppCommandPalette);
export { AppCommandPalette };
//# sourceMappingURL=command-palette.js.map