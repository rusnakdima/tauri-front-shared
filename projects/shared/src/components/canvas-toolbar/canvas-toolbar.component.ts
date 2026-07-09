import { Component, Input, Output, EventEmitter } from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";

@Component({
  selector: "app-canvas-toolbar",
  standalone: true,
  template: `
    <div class="toolbar-group">
      <button
        class="toolbar-btn"
        [disabled]="!canUndo"
        (click)="emit('undo')"
        title="Undo"
      >
        <span class="tb-icon">↩</span>
      </button>
      <button
        class="toolbar-btn"
        [disabled]="!canRedo"
        (click)="emit('redo')"
        title="Redo"
      >
        <span class="tb-icon">↪</span>
      </button>
    </div>
    <div class="toolbar-group">
      <button class="toolbar-btn" (click)="emit('zoom-out')" title="Zoom Out">
        <span class="tb-icon">−</span>
      </button>
      <span class="zoom-label">{{ zoomLevel }}%</span>
      <button class="toolbar-btn" (click)="emit('zoom-in')" title="Zoom In">
        <span class="tb-icon">+</span>
      </button>
      <button
        class="toolbar-btn"
        (click)="emit('zoom-reset')"
        title="Reset Zoom"
      >
        <span class="tb-icon">⊡</span>
      </button>
    </div>
    <div class="toolbar-group">
      <button
        class="toolbar-btn"
        [class.active]="showGrid"
        (click)="emit('toggle-grid')"
        title="Toggle Grid"
      >
        <span class="tb-icon">▦</span>
      </button>
    </div>
  `,
  styles: [
    `
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
      .tb-icon {
        font-size: 18px;
        line-height: 1;
      }
    `,
  ],
})
export class CanvasToolbarComponent {
  @Input() zoomLevel = 100;
  @Input() showGrid = false;
  @Input() canUndo = false;
  @Input() canRedo = false;
  @Output() action = new EventEmitter<string>();

  emit(name: string) {
    this.action.emit(name);
  }
}

registerSchemaComponent("app-canvas-toolbar", CanvasToolbarComponent);
