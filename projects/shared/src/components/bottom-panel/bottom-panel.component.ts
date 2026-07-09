import { Component, Input, Output, EventEmitter } from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";

export interface BottomPanelTab {
  id: string;
  label: string;
}

@Component({
  selector: "app-bottom-panel",
  standalone: true,
  template: `
    <div class="panel-tabs">
      @for (tab of parsedTabs; track tab.id) {
        <div
          class="panel-tab"
          [class.active]="activeTab === tab.id"
          (click)="handleTabClick(tab.id)"
        >
          {{ tab.label }}
        </div>
      }
    </div>
    <div class="panel-content">
      <ng-content></ng-content>
      @if (!parsedTabs.length) {
        <div class="empty-state">No tabs available</div>
      }
    </div>
  `,
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
        background-color: var(--bg-elevated);
        border-top: 1px solid var(--border-color);
        height: 100%;
      }
      .panel-tabs {
        display: flex;
        gap: 0;
        border-bottom: 1px solid var(--border-color);
        padding: 0 0.5rem;
      }
      .panel-tab {
        padding: 0.75rem 1rem;
        font-size: 0.875rem;
        font-weight: 500;
        color: var(--text-secondary);
        cursor: pointer;
        border-bottom: 2px solid transparent;
        margin-bottom: -1px;
        transition: all 0.15s;
      }
      .panel-tab:hover {
        color: var(--text-primary);
      }
      .panel-tab.active {
        color: var(--accent);
        border-bottom-color: var(--accent);
      }
      .panel-content {
        flex: 1;
        overflow: auto;
        padding: 1rem;
      }
      .empty-state {
        color: var(--text-muted);
        font-size: 0.875rem;
        text-align: center;
        padding: 2rem;
      }
    `,
  ],
})
export class BottomPanelComponent {
  @Input() tabs: string | BottomPanelTab[] = "[]";
  @Input() activeTab = "";
  @Input() position = "bottom";
  @Input() fullWidth = false;
  @Input() floating = false;
  @Input() borderRadius = 0;
  @Output() tabChange = new EventEmitter<string>();

  get parsedTabs(): BottomPanelTab[] {
    if (Array.isArray(this.tabs)) return this.tabs;
    try {
      return JSON.parse(this.tabs);
    } catch {
      return [];
    }
  }

  handleTabClick(tabId: string) {
    this.activeTab = tabId;
    this.tabChange.emit(tabId);
  }
}

registerSchemaComponent("app-bottom-panel", BottomPanelComponent);
