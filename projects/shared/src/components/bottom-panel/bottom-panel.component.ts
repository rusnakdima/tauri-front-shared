import { Component, Input, Output, EventEmitter } from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";
import { ApplyThemeDirective } from "../../styles/theme-integration/apply-theme.directive";
import { parseJsonOrDefault } from "../../utils/json";

export interface BottomPanelTab {
  id: string;
  label: string;
}

@Component({
  selector: "app-bottom-panel",
  standalone: true,
  imports: [ApplyThemeDirective],
  templateUrl: "./bottom-panel.component.html",
  styleUrls: ["./bottom-panel.component.css"],
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
    return parseJsonOrDefault<BottomPanelTab>(this.tabs);
  }

  handleTabClick(tabId: string) {
    this.activeTab = tabId;
    this.tabChange.emit(tabId);
  }
}

registerSchemaComponent("app-bottom-panel", BottomPanelComponent);
