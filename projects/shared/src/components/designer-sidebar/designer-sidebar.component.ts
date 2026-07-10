import { Component, Input, Output, EventEmitter } from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";
import { ApplyThemeDirective } from "../../styles/theme-integration/apply-theme.directive";

@Component({
  selector: "app-designer-sidebar",
  standalone: true,
  imports: [ApplyThemeDirective],
  templateUrl: "./designer-sidebar.component.html",
  styleUrls: ["./designer-sidebar.component.css"],
})
export class DesignerSidebarComponent {
  @Input() position: "left" | "right" = "left";
  @Input() collapsed = false;
  @Input() header = "";
  @Output() collapsedChange = new EventEmitter<boolean>();

  toggleCollapse() {
    this.collapsed = !this.collapsed;
    this.collapsedChange.emit(this.collapsed);
  }
}

registerSchemaComponent("app-designer-sidebar", DesignerSidebarComponent);
