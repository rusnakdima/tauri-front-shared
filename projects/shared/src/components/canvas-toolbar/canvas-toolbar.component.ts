import { Component, Input, Output, EventEmitter } from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";
import { ApplyThemeDirective } from "../../styles/theme-integration/apply-theme.directive";

@Component({
  selector: "app-canvas-toolbar",
  standalone: true,
  imports: [ApplyThemeDirective],
  templateUrl: "./canvas-toolbar.component.html",
  styleUrls: ["./canvas-toolbar.component.css"],
})
export class CanvasToolbarComponent {
  @Input() zoomLevel = 100;
  @Input() showGrid = false;
  @Input() canUndo = false;
  @Input() canRedo = false;
  @Output() action = new EventEmitter<string>();

  emit(name: string) {
    this.action.emit(name);
  }
}

registerSchemaComponent("app-canvas-toolbar", CanvasToolbarComponent);
