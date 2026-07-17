import { Component, Input, Output, EventEmitter } from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";
import { parseJsonOrDefault } from "../../utils/json";

export interface SidebarItem {
  label: string;
  icon?: string;
  id?: string;
  children?: SidebarItem[];
}

export interface SidebarGroup {
  groupLabel: string;
  items: SidebarItem[];
}

@Component({
  selector: "app-sidebar",
  standalone: true,
  imports: [],
  template: `
    <aside
      class="h-full px-4 py-5 overflow-y-auto flex flex-col justify-between"
    >
      <ng-content />
    </aside>
  `,
})
export class SidebarComponent {
  @Input() collapsed = false;
  @Input() items: string | SidebarItem[] = "[]";
  @Input() width = 240;
  @Input() collapsedWidth = 64;
  @Input() activeId = "";
  @Input() groupedItems: string | SidebarGroup[] = "[]";
  @Output() collapseChanged = new EventEmitter<{ collapsed: boolean }>();
  @Output() itemClicked = new EventEmitter<SidebarItem>();
  @Output() sectionScroll = new EventEmitter<string>();

  get parsedItems(): SidebarItem[] {
    return parseJsonOrDefault<SidebarItem>(this.items);
  }

  get parsedGroups(): SidebarGroup[] {
    return parseJsonOrDefault<SidebarGroup>(this.groupedItems);
  }

  get hasGroups(): boolean {
    return this.parsedGroups.length > 0;
  }

  toggleCollapse() {
    this.collapsed = !this.collapsed;
    this.collapseChanged.emit({ collapsed: this.collapsed });
  }

  handleItemClick(item: SidebarItem) {
    this.itemClicked.emit(item);
    if (item.id) {
      this.sectionScroll.emit(item.id);
    }
  }

  isActive(item: SidebarItem): boolean {
    return !!this.activeId && !!item.id && item.id === this.activeId;
  }
}

registerSchemaComponent("app-sidebar", SidebarComponent);
