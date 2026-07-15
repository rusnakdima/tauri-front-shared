import { Component, Input, Output, EventEmitter } from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";
import { parseJsonOrDefault } from "../../utils/json";

export interface SidebarItem {
  label: string;
  icon?: string;
  id?: string;
  children?: SidebarItem[];
}

@Component({
  selector: "app-sidebar",
  standalone: true,
  imports: [],
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"],
})
export class SidebarComponent {
  @Input() collapsed = false;
  @Input() items: string | SidebarItem[] = "[]";
  @Input() width = 240;
  @Input() collapsedWidth = 64;
  @Output() collapseChanged = new EventEmitter<{ collapsed: boolean }>();
  @Output() itemClicked = new EventEmitter<SidebarItem>();

  get parsedItems(): SidebarItem[] {
    return parseJsonOrDefault<SidebarItem>(this.items);
  }

  toggleCollapse() {
    this.collapsed = !this.collapsed;
    this.collapseChanged.emit({ collapsed: this.collapsed });
  }

  handleItemClick(item: SidebarItem) {
    this.itemClicked.emit(item);
  }
}

registerSchemaComponent("app-sidebar", SidebarComponent);
