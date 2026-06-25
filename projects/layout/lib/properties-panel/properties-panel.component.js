import { __decorate } from "tslib";
import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
let PropertiesPanel = class PropertiesPanel extends LitElement {
    constructor() {
        super(...arguments);
        this.element = null;
        this.componentDef = null;
    }
    static { this.styles = css `
    :host {
      display: block;
      height: 100%;
    }

    .properties-panel {
      display: flex;
      flex-direction: column;
      height: 100%;
      padding: 0.75rem;
      overflow: hidden;
    }

    .panel-header {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding-bottom: 0.75rem;
      margin-bottom: 0.75rem;
      border-bottom: 1px solid var(--border-color);
    }

    .panel-icon {
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--bg-tertiary);
      border-radius: 6px;
      font-size: 1.25rem;
color: var(--accent);
    }

    .panel-title {
      flex: 1;
      min-width: 0;
    }

    .panel-title-name {
      font-size: 0.875rem;
      font-weight: 600;
      color: var(--text-primary);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .panel-title-selector {
      font-size: 0.6875rem;
      color: var(--text-muted);
      font-family: monospace;
    }

    .panel-content {
      flex: 1;
      overflow-y: auto;
      min-height: 0;
    }

    .property-section {
      margin-bottom: 1rem;
    }

    .section-title {
      font-size: 0.6875rem;
      font-weight: 600;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 0.5rem;
    }

    .property-row {
      margin-bottom: 0.75rem;
    }

    .property-label {
      display: block;
      font-size: 0.75rem;
      color: var(--text-secondary);
      margin-bottom: 0.25rem;
    }

    .property-input {
      width: 100%;
      padding: 0.375rem 0.5rem;
      background: var(--bg-tertiary);
      border: 1px solid var(--border-color);
      border-radius: 4px;
      color: var(--text-primary);
      font-size: 0.8125rem;
      outline: none;
      transition: border-color 0.15s;
    }

    .property-input:focus {
      border-color: var(--accent);
    }

    .property-input[type="checkbox"] {
      width: auto;
      margin-right: 0.5rem;
    }

    .property-select {
      width: 100%;
      padding: 0.375rem 0.5rem;
      background: var(--bg-tertiary);
      border: 1px solid var(--border-color);
      border-radius: 4px;
      color: var(--text-primary);
      font-size: 0.8125rem;
      outline: none;
      cursor: pointer;
    }

    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      text-align: center;
      padding: 2rem 1rem;
    }

    .empty-icon {
      font-size: 2.5rem;
      opacity: 0.3;
      margin-bottom: 0.75rem;
    }

    .empty-title {
      font-size: 0.875rem;
      font-weight: 600;
      color: var(--text-secondary);
      margin-bottom: 0.25rem;
    }

    .empty-text {
      font-size: 0.75rem;
      color: var(--text-muted);
    }
  `; }
    render() {
        if (!this.element) {
            return html `
        <div class="empty-state">
          <div class="empty-icon">⚙</div>
          <div class="empty-title">No element selected</div>
          <div class="empty-text">Select an element to edit its properties</div>
        </div>
      `;
        }
        const props = this.componentDef?.props || [];
        const elementProps = (this.element['props'] || {});
        return html `
      <div class="properties-panel">
        <div class="panel-header">
          <div class="panel-icon">${this.element.icon || "⊡"}</div>
          <div class="panel-title">
            <div class="panel-title-name">${this.element.name || "Element"}</div>
            <div class="panel-title-selector">${this.element.componentId}</div>
          </div>
        </div>

        <div class="panel-content">
          <div class="property-section">
            <div class="section-title">Properties</div>
            ${props.map((prop) => html `
                <div class="property-row">
                  <label class="property-label">${prop.name}</label>
                  ${this._renderInput(prop, elementProps[prop.name])}
                </div>
              `)}
            ${props.length === 0
            ? html `
                  <div class="empty-text" style="padding: 0.5rem 0;">
                    No configurable properties
                  </div>
                `
            : ""}
          </div>

          <div class="property-section">
            <div class="section-title">Position</div>
            <div class="property-row">
              <label class="property-label">Column</label>
              <input
                type="number"
                class="property-input"
                .value=${String(this.element.gridPosition?.column || 1)}
                @input=${(e) => this._updateGridPosition("column", e)}
              />
            </div>
            <div class="property-row">
              <label class="property-label">Row</label>
              <input
                type="number"
                class="property-input"
                .value=${String(this.element.gridPosition?.row || 1)}
                @input=${(e) => this._updateGridPosition("row", e)}
              />
            </div>
            <div class="property-row">
              <label class="property-label">Col Span</label>
              <input
                type="number"
                class="property-input"
                .value=${String(this.element.gridPosition?.colSpan || 1)}
                @input=${(e) => this._updateGridPosition("colSpan", e)}
              />
            </div>
            <div class="property-row">
              <label class="property-label">Row Span</label>
              <input
                type="number"
                class="property-input"
                .value=${String(this.element.gridPosition?.rowSpan || 1)}
                @input=${(e) => this._updateGridPosition("rowSpan", e)}
              />
            </div>
          </div>
        </div>
      </div>
    `;
    }
    _renderInput(prop, value) {
        switch (prop.type) {
            case "boolean":
                return html `
          <label style="display: flex; align-items: center;">
            <input
              type="checkbox"
              class="property-input"
              ?checked=${Boolean(value)}
              @change=${(e) => this._onPropChange(prop.name, e.target.checked)}
            />
            <span>${value ? "true" : "false"}</span>
          </label>
        `;
            case "select":
                return html `
          <select
            class="property-select"
            .value=${String(value || prop.default || "")}
            @change=${(e) => this._onPropChange(prop.name, e.target.value)}
          >
            ${(prop.options || []).map((opt) => html `<option value=${opt} ?selected=${opt === value}>${opt}</option>`)}
          </select>
        `;
            case "number":
                return html `
          <input
            type="number"
            class="property-input"
            .value=${String(value ?? prop.default ?? 0)}
            @input=${(e) => this._onPropChange(prop.name, Number(e.target.value))}
          />
        `;
            default:
                return html `
          <input
            type="text"
            class="property-input"
            .value=${String(value ?? prop.default ?? "")}
            @input=${(e) => this._onPropChange(prop.name, e.target.value)}
          />
        `;
        }
    }
    _onPropChange(name, value) {
        const props = { ...this.element.props, [name]: value };
        this._emitUpdate({ props });
    }
    _updateGridPosition(key, e) {
        const value = Number(e.target.value);
        const gridPosition = {
            ...(this.element.gridPosition || {}),
            [key]: value,
        };
        this._emitUpdate({ gridPosition });
    }
    _emitUpdate(updates) {
        this.dispatchEvent(new CustomEvent("property-change", {
            detail: { id: this.element.id, updates },
            bubbles: true,
            composed: true,
        }));
    }
};
__decorate([
    property({ type: Object })
], PropertiesPanel.prototype, "element", void 0);
__decorate([
    property({ type: Object })
], PropertiesPanel.prototype, "componentDef", void 0);
PropertiesPanel = __decorate([
    customElement("app-properties-panel")
], PropertiesPanel);
export { PropertiesPanel };
//# sourceMappingURL=properties-panel.component.js.map