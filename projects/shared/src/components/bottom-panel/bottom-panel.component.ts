import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

export interface BottomPanelTab {
  id: string;
  label: string;
}

@customElement("app-bottom-panel")
export class AppBottomPanel extends LitElement {
  @property() declare tabs: string;
  @property() declare activeTab: string;
  @property() declare position: string;
  @property({ type: Boolean }) declare fullWidth: boolean;
  @property({ type: Boolean }) declare floating: boolean;
  @property({ type: Number }) declare borderRadius: number;
  constructor() {
    super();
    for (const key of ["tabs", "activeTab", "position", "fullWidth", "floating", "borderRadius"]) {
      if (Object.prototype.hasOwnProperty.call(this, key)) {
        const val = (this as Record<string, unknown>)[key];
        delete (this as Record<string, unknown>)[key];
        (this as Record<string, unknown>)[key] = val;
      }
    }
  }

  override connectedCallback(): void {
    const saved: Record<string, unknown> = {};
    for (const key of ["tabs", "activeTab", "position", "fullWidth", "floating", "borderRadius"]) {
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


  private _getTabs(): BottomPanelTab[] {
    try {
      return JSON.parse(this.tabs);
    } catch {
      return [];
    }
  }

  private _handleTabClick(tabId: string) {
    this.dispatchEvent(
      new CustomEvent("tabChange", {
        detail: { tabId },
        bubbles: true,
        composed: true,
      }),
    );
  }

  static override styles = css`
    :host {
      display: flex;
      flex-direction: column;
      background-color: var(--bg-elevated);
      border-top: 1px solid var(--border-color);
      height: 100%;
    }

    .panel-tabs {
      display: flex;
      gap: 0;
      border-bottom: 1px solid var(--border-color);
      padding: 0 0.5rem;
    }

    .panel-tab {
      padding: 0.75rem 1rem;
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--text-secondary);
      cursor: pointer;
      border-bottom: 2px solid transparent;
      margin-bottom: -1px;
      transition: all 0.15s;
    }

    .panel-tab:hover {
      color: var(--text-primary);
    }

    .panel-tab.active {
      color: var(--accent);
      border-bottom-color: var(--accent);
    }

    .panel-content {
      flex: 1;
      overflow: auto;
      padding: 1rem;
    }

    .empty-state {
      color: var(--text-muted);
      font-size: 0.875rem;
      text-align: center;
      padding: 2rem;
    }
  `;

  override render() {
    const tabsList = this._getTabs();

    return html`
      <div class="panel-tabs">
        ${tabsList.map(
          (tab) => html`
            <div
              class="panel-tab ${this.activeTab === tab.id ? "active" : ""}"
              @click="${() => this._handleTabClick(tab.id)}"
            >
              ${tab.label}
            </div>
          `,
        )}
      </div>
      <div class="panel-content">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "app-bottom-panel": AppBottomPanel;
  }
}