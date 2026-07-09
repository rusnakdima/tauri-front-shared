import { Component, Input, Output, EventEmitter } from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";

interface CanvasElementDef {
  id: string;
  componentId: string;
  name?: string;
  icon?: string;
  gridPosition?: {
    column: number;
    row: number;
    colSpan?: number;
    rowSpan?: number;
  };
}

@Component({
  selector: "app-canvas",
  standalone: true,
  template: `
    <div class="canvas-area" [style.--grid-cols]="gridColumns">
      @if (showGrid) {
        <div class="grid visible">
          @for (cell of gridCells; track cell) {
            <div class="grid-cell"></div>
          }
        </div>
      }
      @if (parsedElements.length > 0) {
        @for (el of parsedElements; track el.id) {
          <div
            class="canvas-element"
            [class.selected]="selectedId === el.id"
            [style.gridColumn]="
              (el.gridPosition?.column || 1) +
              ' / span ' +
              (el.gridPosition?.colSpan || 1)
            "
            [style.gridRow]="
              (el.gridPosition?.row || 1) +
              ' / span ' +
              (el.gridPosition?.rowSpan || 1)
            "
            (click)="selectElement(el.id)"
          >
            <span>{{ el.icon || "⊡" }}</span>
            <span>{{ el.name || el.componentId }}</span>
          </div>
        }
      } @else {
        <div class="canvas-placeholder">
          <ng-content></ng-content>
        </div>
      }
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
        height: 100%;
        background-color: var(--bg-primary);
        position: relative;
        overflow: auto;
      }
      .canvas-area {
        min-width: 100%;
        min-height: 100%;
        position: relative;
        display: grid;
        grid-template-columns: repeat(var(--grid-cols, 12), 1fr);
      }
      .grid {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;
        display: grid;
        grid-template-columns: repeat(var(--grid-cols), 1fr);
        gap: 0;
      }
      .grid-cell {
        border-right: 1px solid var(--border-color);
        border-bottom: 1px solid var(--border-color);
        min-height: 4rem;
      }
      .canvas-element {
        border: 2px dashed transparent;
        border-radius: 0.5rem;
        padding: 0.5rem;
        cursor: move;
        transition: border-color 0.15s;
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
      .canvas-element:hover {
        border-color: var(--accent);
      }
      .canvas-element.selected {
        border-color: var(--accent);
        border-style: solid;
        box-shadow: 0 0 0 2px rgba(var(--accent-rgb, 99, 102, 241), 0.2);
      }
      .canvas-placeholder {
        border: 2px dashed var(--border-color);
        border-radius: 0.5rem;
        background-color: var(--bg-secondary);
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--text-muted);
        font-size: 0.875rem;
        min-height: 200px;
      }
    `,
  ],
})
export class CanvasComponent {
  @Input() elements: CanvasElementDef[] | null = null;
  @Input() gridColumns = 12;
  @Input() showGrid = false;
  @Input() selectedId: string | null = null;
  @Output() elementSelected = new EventEmitter<string>();

  get parsedElements(): CanvasElementDef[] {
    return this.elements || [];
  }

  get gridCells(): number[] {
    return Array(this.gridColumns * 6).fill(0);
  }

  selectElement(id: string) {
    this.selectedId = id;
    this.elementSelected.emit(id);
  }
}

registerSchemaComponent("app-canvas", CanvasComponent);
