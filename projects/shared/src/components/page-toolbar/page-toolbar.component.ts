import { Component, Input, Output, EventEmitter } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";

interface ToolbarAction {
  label: string;
  icon?: string;
  variant?: "primary" | "danger" | "ghost";
  action?: string;
}

@Component({
  selector: "app-page-toolbar",
  standalone: true,
  imports: [MatIconModule],
  template: `
    <div class="toolbar">
      <div class="toolbar-title-area">
        <h2 class="toolbar-title">{{ title }}</h2>
        <ng-content select="[slot=subtitle]"></ng-content>
      </div>
      <div class="toolbar-actions">
        @for (action of parsedActions; track action.label) {
          <button
            [class]="'action-btn ' + (action.variant || '')"
            (click)="handleAction(action)"
          >
            @if (action.icon) {
              <mat-icon class="action-icon" [fontIcon]="action.icon" />
            }
            {{ action.label }}
          </button>
        }
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
      .toolbar {
        display: flex;
        align-items: center;
        padding: 1rem 1.5rem;
        background: var(--bg-elevated);
        border-bottom: 1px solid var(--border-color);
        gap: 1rem;
        flex-wrap: wrap;
      }
      .toolbar-title-area {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
        min-width: 200px;
      }
      .toolbar-title {
        margin: 0;
        font-size: 1.125rem;
        font-weight: 600;
        color: var(--text-primary);
      }
      .toolbar-actions {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        flex-wrap: wrap;
      }
      .action-btn {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
        border: 1px solid var(--border-color);
        background: var(--bg-elevated);
        color: var(--text-primary);
        font-weight: 500;
        cursor: pointer;
        transition: all 0.15s;
        font-size: 0.875rem;
      }
      .action-btn:hover {
        background: var(--bg-hover);
      }
      .action-btn.primary {
        border-color: var(--accent);
        background: var(--accent);
        color: var(--text-on-accent);
      }
      .action-btn.primary:hover {
        background: var(--accent-hover);
        border-color: var(--accent-hover);
      }
      .action-btn.danger {
        border-color: var(--error);
        background: var(--error);
        color: var(--text-on-error);
      }
      .action-btn.ghost {
        border-color: transparent;
        background: transparent;
        color: var(--text-secondary);
      }
      .action-btn.ghost:hover {
        background: var(--bg-hover);
        color: var(--text-primary);
      }
      .action-icon {
        font-size: 1.125rem;
      }
    `,
  ],
})
export class PageToolbarComponent {
  @Input() title = "";
  @Input() actions: string | ToolbarAction[] = "[]";
  @Output() actionClicked = new EventEmitter<string>();

  get parsedActions(): ToolbarAction[] {
    if (Array.isArray(this.actions)) return this.actions;
    try {
      return JSON.parse(this.actions);
    } catch {
      return [];
    }
  }

  handleAction(action: ToolbarAction) {
    this.actionClicked.emit(action.action || action.label);
  }
}

registerSchemaComponent("app-page-toolbar", PageToolbarComponent);
