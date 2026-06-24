import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("app-properties-panel")
export class PropertiesPanel extends LitElement {
  static override styles = css`
    :host {
      display: block;
      height: 100%;
    }
    .properties-panel {
      height: 100%;
      background: var(--bg-secondary, #252525);
      padding: 1rem;
      overflow-y: auto;
    }
    .panel-header {
      font-size: 0.875rem;
      font-weight: 600;
      color: var(--text-primary, #fff);
      margin-bottom: 1rem;
      padding-bottom: 0.5rem;
      border-bottom: 1px solid var(--border-color, #333);
    }
    .property-group {
      margin-bottom: 1rem;
    }
    .property-label {
      font-size: 0.75rem;
      color: var(--text-secondary, #888);
      margin-bottom: 0.25rem;
    }
    .property-value {
      font-size: 0.875rem;
      color: var(--text-primary, #fff);
      padding: 0.375rem 0.5rem;
      background: var(--bg-elevated, #333);
      border-radius: 0.25rem;
    }
    .empty-state {
      text-align: center;
      padding: 2rem 1rem;
      color: var(--text-secondary, #888);
    }
    .empty-icon {
      font-size: 2rem;
      opacity: 0.3;
      margin-bottom: 0.5rem;
    }
  `;

  @property({ type: Object }) element: Record<string, any> | null = null;

  override render() {
    if (!this.element) {
      return html`
        <div class="properties-panel">
          <div class="empty-state">
            <div class="empty-icon">⚙</div>
            <div>Select an element to view properties</div>
          </div>
        </div>
      `;
    }

    return html`
      <div class="properties-panel">
        <div class="panel-header">Properties</div>
        ${Object.entries((this.element as any)['props'] || {}).map(
          ([key, value]) => html`
            <div class="property-group">
              <div class="property-label">${key}</div>
              <div class="property-value">${JSON.stringify(value)}</div>
            </div>
          `
        )}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "app-properties-panel": PropertiesPanel;
  }
}
