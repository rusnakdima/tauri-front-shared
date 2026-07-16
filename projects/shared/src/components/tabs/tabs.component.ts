import { Component, Input, Output, EventEmitter } from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";
import { parseJsonOrDefault } from "../../utils/json";

@Component({
  selector: "app-tabs",
  standalone: true,
  imports: [],
  templateUrl: "./tabs.component.html",
  styleUrls: ["./tabs.component.scss"],
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
