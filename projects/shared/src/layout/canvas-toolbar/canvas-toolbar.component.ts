import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("app-canvas-toolbar")
export class CanvasToolbar extends LitElement {
  static override styles = css`
    :host {
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }
    .toolbar-group {
      display: flex;
      align-items: center;
      gap: 2px;
      padding: 0 4px;
    }
    .toolbar-group:not(:last-child) {
      border-right: 1px solid var(--border-color);
    }
    .toolbar-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      border: none;
      background: transparent;
      border-radius: 6px;
      cursor: pointer;
      color: var(--text-secondary);
      transition:
        background-color 0.15s ease,
        color 0.15s ease;
    }
    .toolbar-btn:hover {
      background: var(--bg-hover);
      color: var(--text-primary);
    }
    .toolbar-btn:active {
      background: var(--bg-tertiary);
    }
    .toolbar-btn.active {
      background: var(--accent);
      color: white;
    }
    .toolbar-btn[disabled] {
      opacity: 0.4;
      cursor: not-allowed;
    }
    .zoom-label {
      font-size: 12px;
      color: var(--text-secondary);
      min-width: 48px;
      text-align: center;
    }
    mat-icon {
      font-size: 20px;
      width: 20px;
      height: 20px;
    }
  `;

  @property({ type: Number }) zoomLevel = 100;
  @property({ type: Boolean }) showGrid = true;
  @property({ type: Boolean }) canUndo = true;
  @property({ type: Boolean }) canRedo = true;

  private _emit(name: string): void {
    this.dispatchEvent(
      new CustomEvent(name, { bubbles: true, composed: true }),
    );
  }

  override render() {
    return html`
      <div class="toolbar-group">
        <button
          class="toolbar-btn"
          @click="${() => this._emit("undo")}"
          ?disabled="${!this.canUndo}"
          title="Undo"
        >
          <mat-icon>undo</mat-icon>
        </button>
        <button
          class="toolbar-btn"
          @click="${() => this._emit("redo")}"
          ?disabled="${!this.canRedo}"
          title="Redo"
        >
          <mat-icon>redo</mat-icon>
        </button>
      </div>
      <div class="toolbar-group">
        <button
          class="toolbar-btn"
          @click="${() => this._emit("zoom-out")}"
          title="Zoom Out"
        >
          <mat-icon>remove</mat-icon>
        </button>
        <span class="zoom-label">${this.zoomLevel}%</span>
        <button
          class="toolbar-btn"
          @click="${() => this._emit("zoom-in")}"
          title="Zoom In"
        >
          <mat-icon>add</mat-icon>
        </button>
        <button
          class="toolbar-btn"
          @click="${() => this._emit("zoom-reset")}"
          title="Reset Zoom"
        >
          <mat-icon>fit_screen</mat-icon>
        </button>
      </div>
      <div class="toolbar-group">
        <button
          class="toolbar-btn ${this.showGrid ? "active" : ""}"
          @click="${() => this._emit("toggle-grid")}"
          title="Toggle Grid"
        >
          <mat-icon>grid_on</mat-icon>
        </button>
      </div>
    `;
  }
}
