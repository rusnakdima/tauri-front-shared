import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("app-bottom-panel")
export class BottomPanel extends LitElement {
  static override styles = css`
    :host {
      display: block;
      height: 100%;
      position: relative;
    }

    .bottom-panel-wrapper {
      position: relative;
      height: 100%;
    }

    .bottom-panel {
      height: 100%;
      background: var(--bg-secondary);
      border-top: 1px solid var(--border-color);
      border-radius: 12px 12px 0 0;
      box-shadow: var(--shadow-lg);
      display: flex;
      flex-direction: column;
      transition:
        height var(--transition-normal, 200ms) ease,
        opacity var(--transition-normal, 200ms) ease;
      overflow: hidden;
    }

    .bottom-panel.collapsed {
      height: 0;
      visibility: hidden;
    }

    .panel-tabs {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      padding: 0.5rem 1rem;
      border-bottom: 1px solid var(--border-color);
      transition: background-color 0.2s ease;
      flex-shrink: 0;
    }
    .panel-tab {
      padding: 0.375rem 0.75rem;
      border-radius: 0.25rem;
      cursor: pointer;
      font-size: 0.75rem;
      color: var(--text-secondary);
      background: transparent;
      border: none;
      transition: all 0.15s;
    }
    .panel-tab:hover {
      background: var(--bg-elevated);
      color: var(--text-primary);
    }
    .panel-tab.active {
      background: var(--accent);
      color: var(--text-on-accent);
    }
    .panel-content {
      flex: 1;
      padding: 1rem;
      overflow: auto;
    }
    .collapse-toggle {
      position: absolute;
      top: 8px;
      right: 8px;
      padding: 0.25rem;
      background: var(--bg-elevated);
      border: 1px solid var(--border-color);
      cursor: pointer;
      color: var(--text-secondary);
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 0.25rem;
      transition: all 0.15s;
      z-index: 10;
    }
    .collapse-toggle:hover {
      background: var(--bg-hover);
      color: var(--text-primary);
    }
    .collapse-toggle material-icon {
      font-size: 1.25rem;
    }
  `;

  @property({ type: Array }) declare tabs: string[];
  @property({ type: String }) declare activeTab: string;
  @property({ type: Boolean, reflect: true }) declare collapsed: boolean;
  @property({ type: Number }) declare collapsedHeight: number;
  constructor() {
    super();
    for (const key of ["tabs", "activeTab", "collapsed", "collapsedHeight"]) {
      if (Object.prototype.hasOwnProperty.call(this, key)) {
        const val = (this as Record<string, unknown>)[key];
        delete (this as Record<string, unknown>)[key];
        (this as Record<string, unknown>)[key] = val;
      }
    }
  }

  override connectedCallback(): void {
    const saved: Record<string, unknown> = {};
    for (const key of ["tabs", "activeTab", "collapsed", "collapsedHeight"]) {
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


  private _toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.dispatchEvent(
      new CustomEvent("collapsed-change", {
        detail: this.collapsed,
        bubbles: true,
        composed: true,
      }),
    );
  }

  override render() {
    return html`
      <div class="bottom-panel-wrapper">
        <aside class="bottom-panel ${this.collapsed ? "collapsed" : ""}">
          <div class="panel-tabs">
            ${this.tabs.map(
              (tab) => html`
                <button
                  class="panel-tab ${this.activeTab === tab ? "active" : ""}"
                  @click=${() => {
                    this.activeTab = tab;
                    this.dispatchEvent(
                      new CustomEvent("tab-change", {
                        detail: { tab },
                        bubbles: true,
                        composed: true,
                      }),
                    );
                  }}
                >
                  ${tab}
                </button>
              `,
            )}
          </div>
          <div class="panel-content">
            <slot></slot>
          </div>
        </aside>
        <button class="collapse-toggle" @click=${this._toggleCollapse}>
          <material-icon
            >${this.collapsed ? "expand_more" : "expand_less"}</material-icon
          >
        </button>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "app-bottom-panel": BottomPanel;
  }
}
