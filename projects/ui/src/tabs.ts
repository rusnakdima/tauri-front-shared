import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

export interface Tab {
  id: string;
  label: string;
  icon?: string;
  disabled?: boolean;
}

export type TabOrientation = "horizontal" | "vertical";

@customElement("app-tabs")
export class AppTabs extends LitElement {
  @property() declare tabs: Tab[];
  @property() declare activeTab: string | null;
  @property() declare orientation: TabOrientation;
  constructor() {
    super();
    for (const key of ["tabs", "activeTab", "orientation"]) {
      if (Object.prototype.hasOwnProperty.call(this, key)) {
        const val = (this as Record<string, unknown>)[key];
        delete (this as Record<string, unknown>)[key];
        (this as Record<string, unknown>)[key] = val;
      }
    }
  }

  override connectedCallback(): void {
    const saved: Record<string, unknown> = {};
    for (const key of ["tabs", "activeTab", "orientation"]) {
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
      display: block;
    }

    .app-tabs {
      @apply flex;
    }

    .app-tabs-vertical {
      @apply flex-row;
    }

    .app-tabs-list {
      @apply flex border-b border-[var(--border-color)];
    }

    .app-tabs-list-vertical {
      @apply flex-col border-b-0 border-r border-[var(--border-color)] pr-4;
    }

    .app-tab {
      @apply flex items-center gap-2 px-4 py-2 text-sm font-medium text-[var(--text-secondary)];
      @apply border-b-2 border-transparent transition-all cursor-pointer;
      @apply hover:text-[var(--text-primary)];
      background: transparent;
      border-left: none;
      border-right: none;
      border-top: none;
    }

    .app-tabs-list-vertical .app-tab {
      @apply border-b-0 border-l-2 border-transparent pl-3 pr-4;
    }

    .app-tab-active {
      @apply text-[var(--accent)] border-b-2 border-[var(--accent)];
    }

    .app-tabs-list-vertical .app-tab-active {
      @apply border-b-0 border-l-2 border-[var(--accent)];
    }

    .app-tab-disabled {
      @apply opacity-50 cursor-not-allowed;
    }

    .app-tab-icon {
      @apply text-base;
    }

    .app-tabs-content {
      @apply flex-1 p-4;
    }
  `;

  private _selectTab(tabId: string, disabled?: boolean) {
    if (disabled) return;
    this.activeTab = tabId;
    this.dispatchEvent(
      new CustomEvent("tab-change", {
        detail: tabId,
        bubbles: true,
        composed: true,
      }),
    );
  }

  private _isActive(tabId: string): boolean {
    return this.activeTab === tabId;
  }

  override render() {
    return html`
      <div
        class="app-tabs ${this.orientation === "vertical"
          ? "app-tabs-vertical"
          : ""}"
      >
        <div
          class="app-tabs-list ${this.orientation === "vertical"
            ? "app-tabs-list-vertical"
            : ""}"
        >
          ${this.tabs.map(
            (tab) => html`
              <button
                class="app-tab ${this._isActive(tab.id)
                  ? "app-tab-active"
                  : ""} ${tab.disabled ? "app-tab-disabled" : ""}"
                @click="${() => this._selectTab(tab.id, tab.disabled)}"
              >
                ${tab.icon
                  ? html`<i class="material-icons app-tab-icon">${tab.icon}</i>`
                  : ""}
                <span>${tab.label}</span>
              </button>
            `,
          )}
        </div>
        <div class="app-tabs-content">
          <slot></slot>
        </div>
      </div>
    `;
  }
}
