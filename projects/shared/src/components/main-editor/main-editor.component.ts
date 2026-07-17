import {
  Component,
  ChangeDetectionStrategy,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
} from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";
import { DesignerCanvasService } from "../../core/lib/designer/designer-canvas.service";
import { CanvasComponent } from "../canvas/canvas.component";
import { IconComponent } from "../icons/icons.component";

@Component({
  selector: "app-main-editor",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CanvasComponent, IconComponent],
  templateUrl: "./main-editor.component.html",
})
export class MainEditorComponent {
  protected designer = inject(DesignerCanvasService);

  zoomIn() {
    this.designer.setZoom(this.designer.zoom() + 10);
  }

  zoomOut() {
    this.designer.setZoom(this.designer.zoom() - 10);
  }

  deleteSelected() {
    const id = this.designer.selectedId();
    if (id) this.designer.deleteElement(id);
  }

  onCanvasClick(e: MouseEvent) {
    const target = e.target as HTMLElement;
    if (target.closest(".canvas-element")) return;
    this.designer.selectElement(null);
  }
}

registerSchemaComponent("app-main-editor", MainEditorComponent);
