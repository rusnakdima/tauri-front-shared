import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";
import { DesignerCanvasService } from "../../core/lib/designer/designer-canvas.service";
import type { CanvasElement } from "../../core/lib/types";
import { ApplyThemeDirective } from "../../styles/theme-integration/apply-theme.directive";

interface DropIndicator {
  parentId: string | null;
  index: number;
  y: number;
}

@Component({
  selector: "app-canvas",
  standalone: true,
  imports: [CommonModule, ApplyThemeDirective],
  templateUrl: "./canvas.component.html",
  styleUrls: ["./canvas.component.css"],
})
export class CanvasComponent {
  protected designer = inject(DesignerCanvasService);

  get elements(): CanvasElement[] {
    return this.designer.elements();
  }

  get gridCells(): number[] {
    return Array(this.designer.gridColumns * 6).fill(0);
  }

  protected dropIndicator: DropIndicator | null = null;

  getGridColumn(el: CanvasElement): string {
    const gp = el.gridPosition;
    if (!gp) return "auto";
    return `${gp.column || 1} / span ${gp.colSpan || 1}`;
  }

  getGridRow(el: CanvasElement): string {
    const gp = el.gridPosition;
    if (!gp) return "auto";
    return `${gp.row || 1} / span ${gp.rowSpan || 1}`;
  }

  getIcon(_el: CanvasElement): string {
    const icons: Record<string, string> = {
      "app-button": "▣",
      "app-text": "A",
      "app-block": "⊞",
      "app-icon": "◇",
      "app-text-input": "✎",
      "app-translation-output": "📄",
      "app-language-selector": "🌐",
    };
    return icons[_el.componentId] || "⊡";
  }

  deleteElement(e: Event, id: string) {
    e.stopPropagation();
    this.designer.deleteElement(id);
  }

  editElement(el: CanvasElement) {
    this.designer.selectElement(el.id);
  }

  onElementDragStart(e: DragEvent, el: CanvasElement) {
    e.dataTransfer?.setData(
      "text/plain",
      JSON.stringify({ type: "move", id: el.id }),
    );
    if (e.dataTransfer) e.dataTransfer.effectAllowed = "move";
  }

  onDragOver(e: DragEvent) {
    e.preventDefault();
    if (e.dataTransfer) e.dataTransfer.dropEffect = "move";
  }

  onDragLeave() {
    this.dropIndicator = null;
  }

  onElementDragOver(e: DragEvent, el: CanvasElement) {
    e.preventDefault();
    e.stopPropagation();
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const y = e.clientY - rect.top;
    const index = y > rect.height / 2 ? 1 : 0;
    this.dropIndicator = { parentId: el.id, index, y: 0 };
  }

  onElementDragLeave(_el: CanvasElement) {
    if (this.dropIndicator?.parentId === _el.id) {
      this.dropIndicator = null;
    }
  }

  onDrop(e: DragEvent) {
    e.preventDefault();
    const raw = e.dataTransfer?.getData("text/plain");
    if (!raw) return;
    try {
      const data = JSON.parse(raw);
      if (data.type === "component") {
        this.designer.addElement(
          data.componentId,
          this.dropIndicator?.parentId ?? null,
        );
      } else if (data.type === "move" && data.id) {
        this.designer.moveElement(
          data.id,
          this.dropIndicator?.parentId ?? null,
          this.dropIndicator?.index,
        );
      }
    } catch {
      /* ignore parse errors */
    }
    this.dropIndicator = null;
  }
}

registerSchemaComponent("app-canvas", CanvasComponent);
