import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from "@angular/core";

export interface TreeNode {
  id: string;
  label: string;
  icon: string;
  children?: TreeNode[];
  expanded: boolean;
  selected: boolean;
}

@Component({
  selector: "app-designer-tree-node",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: "./designer-tree-node.component.html",
})
export class DesignerTreeNodeComponent {
  @Input({ required: true }) node!: TreeNode;
  @Input() depth = 0;
  @Output() select = new EventEmitter<TreeNode>();

  toggle(e: Event) {
    e.stopPropagation();
    this.node.expanded = !this.node.expanded;
  }
}
