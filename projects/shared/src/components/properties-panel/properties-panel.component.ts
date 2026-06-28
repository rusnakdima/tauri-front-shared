import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";

export interface ElementProperty {
  key: string;
  label: string;
  value: unknown;
  type: "string" | "number" | "boolean" | "select";
  options?: string[];
}

@customElement("app-properties-panel")
export class AppPropertiesPanel extends LitElement {
  @property() declare element: string;
  constructor() {
    super();
    for (const key of ["element", "_properties", "_elementId"]) {
      if (Object.prototype.hasOwnProperty.call(this, key)) {
        const val = (this as Record<string, unknown>)[key];
        delete (this as Record<string, unknown>)[key];
        (this as Record<string, unknown>)[key] = val;
      }
    }
    if (!this._properties) (this as any)._properties = [];
    if (!this._elementId) (this as any)._elementId = null;
  }

  override connectedCallback(): void {
    const saved: Record<string, unknown> = {};
    for (const key of ["element"]) {
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


  @state() private declare _properties: ElementProperty[];
  @state() private declare _elementId: string | null;

  private _parseElement() {
    try {
      const parsed = JSON.parse(this.element);
      this._elementId = parsed.id || null;
      this._properties = parsed.properties || [];
    } catch {
      this._properties = [];
      this._elementId = null;
    }
  }

  updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has("element")) {
      this._parseElement();
    }
  }

  private _handlePropertyChange(key: string, value: unknown) {
    this.dispatchEvent(
      new CustomEvent("propertyChange", {
        detail: { key, value },
        bubbles: true,
        composed: true,
      }),
    );
  }

  static override styles = css`
    :host {
      display: block;
      background-color: var(--bg-elevated);
      border-left: 1px solid var(--border-color);
      height: 100%;
      overflow-y: auto;
    }

    .panel-header {
      padding: 1rem;
      border-bottom: 1px solid var(--border-color);
    }

    .panel-title {
      font-size: 0.875rem;
      font-weight: 600;
      color: var(--text-primary);
      margin-bottom: 0.25rem;
    }

    .element-id {
      font-size: 0.75rem;
      color: var(--text-muted);
      font-family: monospace;
    }

    .properties-section {
      padding: 1rem;
    }

    .section-title {
      font-size: 0.75rem;
      font-weight: 600;
      color: var(--text-secondary);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 0.75rem;
    }

    .property-row {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      margin-bottom: 0.75rem;
    }

    .property-label {
      font-size: 0.875rem;
      color: var(--text-primary);
    }

    .property-input {
      padding: 0.5rem 0.75rem;
      border: 1px solid var(--border-color);
      border-radius: 0.5rem;
      background-color: var(--bg-primary);
      color: var(--text-primary);
      font-size: 0.875rem;
    }

    .property-input:focus {
      outline: none;
      border-color: var(--accent);
    }

    .property-input[type="checkbox"] {
      width: 1rem;
      height: 1rem;
    }

    select.property-input {
      cursor: pointer;
    }

    .empty-state {
      padding: 2rem 1rem;
      text-align: center;
      color: var(--text-muted);
      font-size: 0.875rem;
    }
  `;

  override render() {
    return html`
      <div class="panel-header">
        <div class="panel-title">Properties</div>
        ${this._elementId
          ? html`<div class="element-id">${this._elementId}</div>`
          : ""}
      </div>
      ${this._properties.length > 0
        ? html`
            <div class="properties-section">
              <div class="section-title">Properties</div>
              ${this._properties.map(
                (prop) => html`
                  <div class="property-row">
                    <label class="property-label">${prop.label}</label>
                    ${prop.type === "boolean"
                      ? html`
                          <input
                            type="checkbox"
                            class="property-input"
                            ?checked="${Boolean(prop.value)}"
                            @change="${(e: Event) =>
                              this._handlePropertyChange(
                                prop.key,
                                (e.target as HTMLInputElement).checked,
                              )}"
                          />
                        `
                      : prop.type === "select"
                        ? html`
                            <select
                              class="property-input"
                              .value="${String(prop.value)}"
                              @change="${(e: Event) =>
                                this._handlePropertyChange(
                                  prop.key,
                                  (e.target as HTMLSelectElement).value,
                                )}"
                            >
                              ${(prop.options || []).map(
                                (opt) => html`
                                  <option value="${opt}">${opt}</option>
                                `,
                              )}
                            </select>
                          `
                        : html`
                            <input
                              type="${prop.type === "number"
                                ? "number"
                                : "text"}"
                              class="property-input"
                              .value="${String(prop.value)}"
                              @input="${(e: Event) =>
                                this._handlePropertyChange(
                                  prop.key,
                                  prop.type === "number"
                                    ? Number(
                                        (e.target as HTMLInputElement).value,
                                      )
                                    : (e.target as HTMLInputElement).value,
                                )}"
                            />
                          `}
                  </div>
                `,
              )}
            </div>
          `
        : html`<div class="empty-state">No element selected</div>`}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "app-properties-panel": AppPropertiesPanel;
  }
}