import { Component, Input, Output, EventEmitter } from "@angular/core";
import { CommonModule } from "@angular/common";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";
import { parseJsonOrDefault } from "../../utils/json";

export interface TreeNode {
  id: string;
  label: string;
  icon?: string;
  children?: TreeNode[];
  expanded?: boolean;
  selected?: boolean;
}

@Component({
  selector: "app-tree-node",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./tree-node.component.html",
})
export class TreeNodeComponent {
  @Input() node!: TreeNode;
  @Input() depth = 0;
  @Output() selected = new EventEmitter<TreeNode>();

  toggleExpand(e: Event) {
    e.stopPropagation();
    this.node.expanded = !this.node.expanded;
  }

  handleClick() {
    if (this.node.children?.length && this.node.expanded === undefined) {
      this.node.expanded = true;
    }
    this.selected.emit(this.node);
  }

  onChildSelected(node: TreeNode) {
    this.selected.emit(node);
  }
}

@Component({
  selector: "app-tree",
  standalone: true,
  imports: [CommonModule, TreeNodeComponent],
  templateUrl: "./tree.component.html",
})
export class TreeComponent {
  @Input() nodes: string | TreeNode[] = "[]";
  @Input() selectable = false;
  @Output() selected = new EventEmitter<TreeNode>();

  get parsedNodes(): TreeNode[] {
    return parseJsonOrDefault<TreeNode>(this.nodes);
  }

  onNodeSelected(node: TreeNode) {
    this.selected.emit(node);
  }
}

registerSchemaComponent("app-tree", TreeComponent);
