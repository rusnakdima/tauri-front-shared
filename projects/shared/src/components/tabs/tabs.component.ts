import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("app-tabs")
export class AppTabs extends LitElement {
  @property() declare tabs: string;
  @property() declare activeTab: string;
  constructor() {
    super();
    for (const key of ["tabs", "activeTab"]) {
      if (Object.prototype.hasOwnProperty.call(this, key)) {
        const val = (this as Record<string, unknown>)[key];
        delete (this as Record<string, unknown>)[key];
        (this as Record<string, unknown>)[key] = val;
      }
    }
  }

  override connectedCallback(): void {
    const saved: Record<string, unknown> = {};
    for (const key of ["tabs", "activeTab"]) {
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

    .tabs {
      display: flex;
      border-bottom: 1px solid var(--border-color);
    }

    .tab {
      padding: 0.75rem 1.25rem;
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--text-secondary);
      cursor: pointer;
      border-bottom: 2px solid transparent;
      margin-bottom: -1px;
      transition: color 0.15s, border-color 0.15s;
    }

    .tab:hover {
      color: var(--text-primary);
    }

    .tab.active {
      color: var(--accent);
      border-bottom-color: var(--accent);
    }
  `;

  private get _parsedTabs(): string[] {
    try {
      return JSON.parse(this.tabs);
    } catch {
      return [];
    }
  }

  private _selectTab(tab: string) {
    if (tab === this.activeTab) return;
    this.dispatchEvent(
      new CustomEvent("tabChange", { detail: { tab }, bubbles: true, composed: true }),
    );
  }

  override render() {
    const tabs = this._parsedTabs;
    return html`
      <div class="tabs">
        ${tabs.map(
          (tab) => html`
            <div
              class="tab ${tab === this.activeTab ? "active" : ""}"
              @click="${() => this._selectTab(tab)}"
            >
              ${tab}
            </div>
          `,
        )}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "app-tabs": AppTabs;
  }
}