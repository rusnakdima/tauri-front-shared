import { Component, Input, Output, EventEmitter } from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";

@Component({
  selector: "app-tabs",
  standalone: true,
  template: `
    <div class="tabs">
      @for (tab of parsedTabs; track tab) {
        <div
          class="tab"
          [class.active]="tab === activeTab"
          (click)="selectTab(tab)"
        >
          {{ tab }}
        </div>
      }
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
      .tabs {
        display: flex;
        gap: 0;
        border-bottom: 1px solid var(--border-color);
      }
      .tab {
        padding: 0.75rem 1.25rem;
        font-size: 0.875rem;
        font-weight: 500;
        color: var(--text-secondary);
        cursor: pointer;
        border-bottom: 2px solid transparent;
        margin-bottom: -1px;
        transition: all 0.15s;
      }
      .tab:hover {
        color: var(--text-primary);
      }
      .tab.active {
        color: var(--accent);
        border-bottom-color: var(--accent);
      }
    `,
  ],
})
export class TabsComponent {
  @Input() tabs: string | string[] = "[]";
  @Input() activeTab = "";
  @Output() tabChanged = new EventEmitter<string>();

  get parsedTabs(): string[] {
    if (Array.isArray(this.tabs)) return this.tabs;
    try {
      return JSON.parse(this.tabs);
    } catch {
      return [];
    }
  }

  selectTab(tab: string) {
    this.activeTab = tab;
    this.tabChanged.emit(tab);
  }
}

registerSchemaComponent("app-tabs", TabsComponent);
