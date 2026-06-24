import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("app-bottom-panel")
export class BottomPanel extends LitElement {
  static override styles = css`
    :host {
      display: block;
      height: 100%;
    }
    .bottom-panel {
      height: 100%;
      background: var(--bg-secondary, #252525);
      border-top: 1px solid var(--border-color, #333);
      display: flex;
      flex-direction: column;
    }
    .panel-tabs {
      display: flex;
      gap: 0.25rem;
      padding: 0.5rem 1rem;
      border-bottom: 1px solid var(--border-color, #333);
    }
    .panel-tab {
      padding: 0.375rem 0.75rem;
      border-radius: 0.25rem;
      cursor: pointer;
      font-size: 0.75rem;
      color: var(--text-secondary, #888);
      background: transparent;
      border: none;
      transition: all 0.15s;
    }
    .panel-tab:hover {
      background: var(--bg-elevated, #333);
      color: var(--text-primary, #fff);
    }
    .panel-tab.active {
      background: var(--accent-color, #6366f1);
      color: white;
    }
    .panel-content {
      flex: 1;
      padding: 1rem;
      overflow: auto;
    }
  `;

  @property({ type: Array }) tabs: string[] = ["pages", "layouts", "components", "services", "i18n", "json"];
  @property({ type: String }) activeTab: string = "pages";

  override render() {
    return html`
      <div class="bottom-panel">
        <div class="panel-tabs">
          ${this.tabs.map(
            (tab) => html`
              <button
                class="panel-tab ${this.activeTab === tab ? "active" : ""}"
                @click=${() => {
                  this.activeTab = tab;
                  this.dispatchEvent(
                    new CustomEvent("tab-change", { detail: { tab }, bubbles: true, composed: true })
                  );
                }}
              >
                ${tab}
              </button>
            `
          )}
        </div>
        <div class="panel-content">
          <slot></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "app-bottom-panel": BottomPanel;
  }
}
