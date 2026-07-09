import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";

export interface ElementProperty {
  key: string;
  label: string;
  value: unknown;
  type: "string" | "number" | "boolean" | "select";
  options?: string[];
}

interface ParsedElement {
  id: string;
  properties: ElementProperty[];
}

@Component({
  selector: "app-properties-panel",
  standalone: true,
  template: `
    <div class="panel-header">
      <div class="panel-title">Properties</div>
      @if (elementId) {
        <div class="element-id">{{ elementId }}</div>
      }
    </div>
    @if (properties.length > 0) {
      <div class="properties-section">
        <div class="section-title">Properties</div>
        @for (prop of properties; track prop.key) {
          <div class="property-row">
            <label class="property-label">{{ prop.label }}</label>
            @if (prop.type === "boolean") {
              <input
                type="checkbox"
                class="property-input"
                [checked]="prop.value"
                (change)="handleChange(prop.key, $event)"
              />
            } @else if (prop.type === "select") {
              <select
                class="property-input"
                [value]="prop.value"
                (change)="handleChange(prop.key, $event)"
              >
                @for (opt of prop.options || []; track opt) {
                  <option [value]="opt" [selected]="opt === prop.value">
                    {{ opt }}
                  </option>
                }
              </select>
            } @else {
              <input
                [type]="prop.type === 'number' ? 'number' : 'text'"
                class="property-input"
                [value]="prop.value"
                (input)="handleInputChange(prop, $event)"
              />
            }
          </div>
        }
      </div>
    } @else {
      <div class="empty-state">No element selected</div>
    }
  `,
  styles: [
    `
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
    `,
  ],
})
export class PropertiesPanelComponent implements OnChanges {
  @Input() element = "";
  @Output() propertyChange = new EventEmitter<{
    key: string;
    value: unknown;
  }>();

  elementId: string | null = null;
  properties: ElementProperty[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes["element"]) {
      this.parseElement();
    }
  }

  private parseElement() {
    try {
      const parsed: ParsedElement = JSON.parse(this.element);
      this.elementId = parsed.id || null;
      this.properties = parsed.properties || [];
    } catch {
      this.properties = [];
      this.elementId = null;
    }
  }

  handleChange(key: string, e: Event) {
    const checked = (e.target as HTMLInputElement).checked;
    this.propertyChange.emit({ key, value: checked });
  }

  handleInputChange(prop: ElementProperty, e: Event) {
    const input = e.target as HTMLInputElement;
    this.propertyChange.emit({
      key: prop.key,
      value: prop.type === "number" ? Number(input.value) : input.value,
    });
  }
}

registerSchemaComponent("app-properties-panel", PropertiesPanelComponent);
