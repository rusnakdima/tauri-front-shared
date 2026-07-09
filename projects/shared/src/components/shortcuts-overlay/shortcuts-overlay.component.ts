import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostListener,
} from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";

interface Shortcut {
  key: string;
  description: string;
}

@Component({
  selector: "app-shortcuts-overlay",
  standalone: true,
  template: `
    @if (visible) {
      <div class="overlay" (click)="close()">
        <div class="shortcuts-panel" (click)="$event.stopPropagation()">
          <div class="panel-header">
            <h3>{{ title || "Keyboard Shortcuts" }}</h3>
            <button class="close-btn" (click)="close()" aria-label="Close">
              &times;
            </button>
          </div>
          <div class="shortcuts-list">
            @for (shortcut of parsedShortcuts; track shortcut.key) {
              <div class="shortcut-row">
                <kbd>{{ shortcut.key }}</kbd>
                <span class="shortcut-desc">{{ shortcut.description }}</span>
              </div>
            }
          </div>
        </div>
      </div>
    }
  `,
  styles: [
    `
      :host {
        display: block;
      }
      .overlay {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.6);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
      }
      .shortcuts-panel {
        background: var(--bg-elevated);
        border: 1px solid var(--border-color);
        border-radius: 1rem;
        width: 480px;
        max-width: 90vw;
        max-height: 80vh;
        overflow-y: auto;
        box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
      }
      .panel-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1.25rem 1.5rem;
        border-bottom: 1px solid var(--border-color);
      }
      .panel-header h3 {
        margin: 0;
        font-size: 1.125rem;
        font-weight: 600;
        color: var(--text-primary);
      }
      .close-btn {
        background: none;
        border: none;
        cursor: pointer;
        padding: 0.25rem;
        border-radius: 0.25rem;
        color: var(--text-secondary);
        font-size: 1.5rem;
        line-height: 1;
      }
      .close-btn:hover {
        background: var(--bg-hover);
        color: var(--text-primary);
      }
      .shortcuts-list {
        padding: 1rem 1.5rem;
      }
      .shortcut-row {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 0.5rem 0;
      }
      kbd {
        padding: 0.25rem 0.5rem;
        border-radius: 0.25rem;
        border: 1px solid var(--border-color);
        background: var(--bg-primary);
        color: var(--text-primary);
        font-family: monospace;
        font-size: 0.875rem;
        min-width: 60px;
        text-align: center;
      }
      .shortcut-desc {
        color: var(--text-secondary);
        font-size: 0.875rem;
      }
    `,
  ],
})
export class ShortcutsOverlayComponent {
  @Input() visible = false;
  @Input() title = "Keyboard Shortcuts";
  @Input() shortcuts: string | Shortcut[] = "[]";
  @Output() closed = new EventEmitter<void>();
  @Input() trigger = "";

  get parsedShortcuts(): Shortcut[] {
    if (Array.isArray(this.shortcuts)) return this.shortcuts;
    try {
      return JSON.parse(this.shortcuts);
    } catch {
      return [];
    }
  }

  close() {
    this.visible = false;
    this.closed.emit();
  }

  @HostListener("window:keydown.escape")
  onEscape() {
    if (this.visible) this.close();
  }

  open() {
    this.visible = true;
  }
}

registerSchemaComponent("app-shortcuts-overlay", ShortcutsOverlayComponent);
