import {
  Component,
  ChangeDetectionStrategy,
  inject,
  computed,
} from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";
import { DesignerCanvasService } from "../../core/lib/designer/designer-canvas.service";
import {
  DesignerTreeNodeComponent,
  type TreeNode,
} from "./designer-tree-node.component";
import type { CanvasElement } from "../../core/lib/types";

@Component({
  selector: "app-designer-tree",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DesignerTreeNodeComponent],
  templateUrl: "./designer-tree.component.html",
})
export class DesignerTreeComponent {
  protected designer = inject(DesignerCanvasService);

  readonly treeNodes = computed<TreeNode[]>(() =>
    this.elementsToTree(this.designer.elements(), this.designer.selectedId()),
  );

  private elementsToTree(
    els: CanvasElement[],
    selectedId: string | null,
  ): TreeNode[] {
    return els.map((el) => ({
      id: el.id,
      label: el.componentId,
      icon: this.getIcon(el.componentId),
      expanded: true,
      selected: el.id === selectedId,
      children: el.children
        ? this.elementsToTree(el.children, selectedId)
        : undefined,
    }));
  }

  selectNode(node: TreeNode) {
    this.designer.selectElement(node.id);
  }

  getIcon(componentId: string): string {
    const icons: Record<string, string> = {
      "app-button": "▣",
      "app-text": "A",
      "app-block": "⊞",
      "app-icon": "◇",
      "app-language-selector": "🌐",
    };
    return icons[componentId] || "⊡";
  }
}

registerSchemaComponent("app-designer-tree", DesignerTreeComponent);
