import { Component, Input, Output, EventEmitter } from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";
import { parseJsonOrDefault } from "../../utils/json";

@Component({
  selector: "app-tabs",
  standalone: true,
  imports: [],
  template: `
    <div class="flex gap-1 border-b border-neutral-200 dark:border-neutral-700">
      @for (tab of parsedTabs; track tab) {
        <button
          class="px-4 py-2 text-sm font-medium transition-colors rounded-t-lg"
          [class.text-indigo-600]="tab === activeTab"
          [class.border-b-2]="tab === activeTab"
          [class.border-indigo-600]="tab === activeTab"
          [class.text-neutral-500]="tab !== activeTab"
          [class.hover:text-neutral-700]="tab !== activeTab"
          (click)="selectTab(tab)"
        >
          {{ tab }}
        </button>
      }
    </div>
  `,
})
export class TabsComponent {
  @Input() tabs: string | string[] = "[]";
  @Input() activeTab = "";
  @Output() tabChanged = new EventEmitter<string>();

  get parsedTabs(): string[] {
    return parseJsonOrDefault<string>(this.tabs);
  }

  selectTab(tab: string) {
    this.activeTab = tab;
    this.tabChanged.emit(tab);
  }
}

registerSchemaComponent("app-tabs", TabsComponent);
