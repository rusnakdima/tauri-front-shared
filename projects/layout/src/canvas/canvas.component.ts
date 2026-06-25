import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

export interface CanvasElement {
  id: string;
  componentId: string;
  name: string;
  icon?: string;
  gridPosition?: {
    column: number;
    row: number;
    colSpan?: number;
    rowSpan?: number;
  };
  props?: Record<string, unknown>;
  classes?: string;
  children?: string[];
  zIndex?: number;
}

@customElement("app-canvas")
export class SchemaCanvas extends LitElement {
  @property({ type: Array }) elements: CanvasElement[] = [];
  @property({ type: Number }) gridColumns = 12;
  @property({ type: Boolean }) showGrid = true;
  @property({ type: String }) selectedId = "";

  static override styles = css`
    :host {
      display: block;
      height: 100%;
      width: 100%;
      background-image:
        linear-gradient(var(--border-color) 1px, transparent 1px),
        linear-gradient(90deg, var(--border-color) 1px, transparent 1px);
      background-size: 20px 20px;
    }

    :host(.drag-over) {
      background-color: rgba(88, 166, 255, 0.1);
      outline: 2px dashed var(--accent);
      outline-offset: -2px;
    }

    .canvas-wrapper {
      position: relative;
      height: 100%;
      width: 100%;
      overflow: auto;
      background: var(--bg-primary);
    }

    .canvas-grid {
      display: grid;
      grid-template-columns: repeat(var(--grid-cols), 1fr);
      gap: 0;
      min-height: 100%;
      padding: 1rem;
      position: relative;
    }

    .canvas-grid.show-grid {
      background-image: linear-gradient(
          to right,
var(--border-color) 1px,
          transparent 1px
        ),
        linear-gradient(to bottom, var(--border-color) 1px, transparent 1px);
      background-size: calc(100% / var(--grid-cols)) 60px;
    }

    .canvas-drop-zone {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      pointer-events: none;
      z-index: 0;
    }

    .canvas-placeholder {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      border: 2px dashed var(--border-color);
      border-radius: 8px;
      color: var(--text-muted);
      text-align: center;
      pointer-events: auto;
      transition: all 0.2s;
    }

    .canvas-placeholder.drag-over {
      border-color: var(--accent);
      background: rgba(233, 69, 96, 0.05);
    }

    .placeholder-icon {
      font-size: 3rem;
      opacity: 0.4;
      margin-bottom: 0.5rem;
    }

    .placeholder-text {
      font-size: 0.875rem;
      max-width: 200px;
    }

    .canvas-element {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--bg-secondary);
      border: 2px solid var(--border-color);
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.15s;
      min-height: 60px;
      padding: 0.75rem;
    }

    .canvas-element:hover {
      border-color: var(--accent-secondary);
      box-shadow: 0 0 0 2px rgba(83, 52, 131, 0.3);
    }

    .canvas-element.selected {
      border-color: var(--accent);
      box-shadow: 0 0 0 2px rgba(233, 69, 96, 0.3);
    }

    .canvas-element.dragging {
      opacity: 0.5;
    }

    .element-label {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.25rem;
      text-align: center;
    }

    .element-icon {
      font-size: 1.5rem;
color: var(--accent);
    }

    .element-name {
      font-size: 0.75rem;
      color: var(--text-primary);
    }

    .element-selector {
      font-size: 0.625rem;
      color: var(--text-muted);
      font-family: monospace;
    }

    .resize-handle {
      position: absolute;
      width: 10px;
      height: 10px;
      background: var(--accent);
      border-radius: 2px;
      opacity: 0;
      transition: opacity 0.15s;
    }

    .canvas-element:hover .resize-handle,
    .canvas-element.selected .resize-handle {
      opacity: 1;
    }

    .resize-handle.se {
      bottom: -5px;
      right: -5px;
      cursor: se-resize;
    }

    .resize-handle.sw {
      bottom: -5px;
      left: -5px;
      cursor: sw-resize;
    }

    .resize-handle.ne {
      top: -5px;
      right: -5px;
      cursor: ne-resize;
    }

    .resize-handle.nw {
      top: -5px;
      left: -5px;
      cursor: nw-resize;
    }
  `;

  private _dragOverCounter = 0;

  override render() {
    const gridStyle = `--grid-cols: ${this.gridColumns}`;

    return html`
      <div
        class="canvas-wrapper"
        @dragover=${this._onDragOver}
        @dragleave=${this._onDragLeave}
        @drop=${this._onDrop}
      >
        <div
          class="canvas-grid ${this.showGrid ? "show-grid" : ""}"
          style=${gridStyle}
        >
          ${this.elements.length === 0
            ? html`
                <div class="canvas-drop-zone">
                  <div
                    class="canvas-placeholder ${this._dragOverCounter > 0 ? "drag-over" : ""}"
                  >
                    <div class="placeholder-icon">⊞</div>
                    <div class="placeholder-text">
                      Drag components here to build your UI
                    </div>
                  </div>
                </div>
              `
            : this.elements.map((el) => this._renderElement(el))}
        </div>
      </div>
    `;
  }

  private _renderElement(el: CanvasElement) {
    const col = el.gridPosition?.column || 1;
    const row = el.gridPosition?.row || 1;
    const colSpan = el.gridPosition?.colSpan || 1;
    const rowSpan = el.gridPosition?.rowSpan || 1;

    return html`
      <div
        class="canvas-element ${this.selectedId === el.id ? "selected" : ""}"
        style="
          grid-column: ${col} / span ${colSpan};
          grid-row: ${row} / span ${rowSpan};
          ${el.classes ? el.classes : ""}
        "
        @click=${() => this._onElementClick(el)}
        draggable="true"
        @dragstart=${(e: DragEvent) => this._onElementDragStart(e, el)}
        @dragend=${this._onElementDragEnd}
      >
        <div class="element-label">
          <div class="element-icon">${el.icon || "⊡"}</div>
          <div class="element-name">${el.name}</div>
          <div class="element-selector">${el.componentId}</div>
        </div>
        <div class="resize-handle se"></div>
        <div class="resize-handle sw"></div>
        <div class="resize-handle ne"></div>
        <div class="resize-handle nw"></div>
      </div>
    `;
  }

  private _onElementClick(el: CanvasElement) {
    this.selectedId = el.id;
    this.dispatchEvent(
      new CustomEvent("elementSelect", {
        detail: { element: el },
        bubbles: true,
        composed: true,
      })
    );
  }

  private _onDragOver(e: DragEvent) {
    e.preventDefault();
    this._dragOverCounter++;
  }

  private _onDragLeave(_e: DragEvent) {
    this._dragOverCounter--;
  }

  private _onDrop(e: DragEvent) {
    e.preventDefault();
    this._dragOverCounter = 0;

    const data = e.dataTransfer?.getData("application/json");
    if (data) {
      try {
        const comp = JSON.parse(data);
        const newElement: CanvasElement = {
          id: `el-${Date.now()}`,
          componentId: comp.selector || comp.componentId,
          name: comp.name,
          icon: comp.icon,
          gridPosition: {
            column: 1,
            row: this.elements.length + 1,
            colSpan: 2,
            rowSpan: 1,
          },
          props: {},
        };

        this.elements = [...this.elements, newElement];
        this.dispatchEvent(
          new CustomEvent("elementAdd", {
            detail: { element: newElement },
            bubbles: true,
            composed: true,
          })
        );
      } catch {
        // Invalid JSON
      }
    }
  }

  private _onElementDragStart(e: DragEvent, el: CanvasElement) {
    e.dataTransfer?.setData("application/json", JSON.stringify(el));
    (e.target as HTMLElement).classList.add("dragging");
  }

  private _onElementDragEnd(e: DragEvent) {
    (e.target as HTMLElement).classList.remove("dragging");
  }

  public addElement(element: CanvasElement): void {
    this.elements = [...this.elements, element];
  }

  public removeElement(id: string): void {
    this.elements = this.elements.filter((el) => el.id !== id);
  }

  public updateElement(id: string, updates: Partial<CanvasElement>): void {
    this.elements = this.elements.map((el) =>
      el.id === id ? { ...el, ...updates } : el
    );
  }

  public getElements(): CanvasElement[] {
    return this.elements;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "app-canvas": SchemaCanvas;
  }
}
