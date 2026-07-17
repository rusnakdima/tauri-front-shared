import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";

@Component({
  selector: "app-canvas-toolbar",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: "./canvas-toolbar.component.html",
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
