import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

export interface Segment {
  value: string;
  label: string;
  icon?: string;
}

@customElement("data-segment-selector")
export class DataSegmentSelector extends LitElement {
  @property({ type: Array }) declare segments: Segment[];
  @property() declare selected: string;
  constructor() {
    super();
    for (const key of ["segments", "selected"]) {
      if (Object.prototype.hasOwnProperty.call(this, key)) {
        const val = (this as Record<string, unknown>)[key];
        delete (this as Record<string, unknown>)[key];
        (this as Record<string, unknown>)[key] = val;
      }
    }
  }

  override connectedCallback(): void {
    const saved: Record<string, unknown> = {};
    for (const key of ["segments", "selected"]) {
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


  private select(value: string): void {
    this.dispatchEvent(
      new CustomEvent("selected-change", {
        detail: value,
        bubbles: true,
        composed: true,
      }),
    );
  }

  private isActive(seg: Segment): boolean {
    return seg.value === this.selected;
  }

  static override styles = css`
    :host {
      display: inline-block;
    }

    .app-segment-selector {
      display: inline-flex;
      background: var(--bg-secondary);
      border: 1px solid var(--border-color);
      border-radius: 0.5rem;
      padding: 0.25rem;
      gap: 0.25rem;
    }

    .app-segment-selector__btn {
      display: flex;
      align-items: center;
      gap: 0.375rem;
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 0.375rem;
      background: transparent;
      color: var(--text-secondary);
      font-size: 0.875rem;
      font-weight: 500;
      cursor: pointer;
      transition:
        background 150ms ease,
        color 150ms ease;
      white-space: nowrap;
    }

    .app-segment-selector__btn:hover:not(.app-segment-selector__btn--active) {
      background: var(--bg-hover);
      color: var(--text-primary);
    }

    .app-segment-selector__btn--active {
      background: var(--accent);
      color: var(--accent-50);
    }

    .app-segment-selector__icon {
      font-size: 1rem;
    }
  `;

  override render() {
    return html`
      <div class="app-segment-selector">
        ${this.segments.map(
          (seg) => html`
            <button
              type="button"
              class="app-segment-selector__btn ${this.isActive(seg)
                ? "app-segment-selector__btn--active"
                : ""}"
              @click=${() => this.select(seg.value)}
            >
              ${seg.icon
                ? html`
                    <span class="material-icons app-segment-selector__icon"
                      >${seg.icon}</span
                    >
                  `
                : ""}
              ${seg.label}
            </button>
          `,
        )}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "data-segment-selector": DataSegmentSelector;
  }
}
