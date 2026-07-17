import { Component, Input, Output, EventEmitter } from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";
@Component({
  selector: "app-designer-sidebar",
  standalone: true,
  imports: [],
  templateUrl: "./designer-sidebar.component.html",
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
