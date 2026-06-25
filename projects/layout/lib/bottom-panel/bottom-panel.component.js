import { __decorate } from "tslib";
import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
let BottomPanel = class BottomPanel extends LitElement {
  constructor() {
    super(...arguments);
    this.tabs = ["pages", "layouts", "components", "services", "i18n", "json"];
    this.activeTab = "pages";
    this.collapsed = false;
    this.collapsedHeight = 48;
  }
  static {
    this.styles = css`
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
  }
  _toggleCollapse() {
    this.collapsed = !this.collapsed;
    this.dispatchEvent(
      new CustomEvent("collapsed-change", {
        detail: this.collapsed,
        bubbles: true,
        composed: true,
      }),
    );
  }
  render() {
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
};
__decorate([property({ type: Array })], BottomPanel.prototype, "tabs", void 0);
__decorate(
  [property({ type: String })],
  BottomPanel.prototype,
  "activeTab",
  void 0,
);
__decorate(
  [property({ type: Boolean, reflect: true })],
  BottomPanel.prototype,
  "collapsed",
  void 0,
);
__decorate(
  [property({ type: Number })],
  BottomPanel.prototype,
  "collapsedHeight",
  void 0,
);
BottomPanel = __decorate([customElement("app-bottom-panel")], BottomPanel);
export { BottomPanel };
//# sourceMappingURL=bottom-panel.component.js.map
