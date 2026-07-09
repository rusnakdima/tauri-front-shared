import { Component, Input, Output, EventEmitter } from "@angular/core";
import { CommonModule } from "@angular/common";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";

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
  template: `
    <div
      class="tree-node"
      [style.paddingLeft.px]="depth * 20"
      [class.selected]="node.selected"
      (click)="handleClick()"
    >
      @if (node.children?.length) {
        <span class="toggle" (click)="toggleExpand($event)">{{
          node.expanded ? "▼" : "▶"
        }}</span>
      } @else {
        <span class="toggle-placeholder"></span>
      }
      @if (node.icon) {
        <span class="node-icon">{{ node.icon }}</span>
      }
      <span class="node-label">{{ node.label }}</span>
    </div>
    @if (node.expanded && node.children?.length) {
      @for (child of node.children; track child.id) {
        <app-tree-node
          [node]="child"
          [depth]="depth + 1"
          (selected)="onChildSelected($event)"
        ></app-tree-node>
      }
    }
  `,
  styles: [
    `
      :host {
        display: block;
      }
      .tree-node {
        display: flex;
        align-items: center;
        gap: 0.375rem;
        padding: 0.25rem 0.5rem;
        cursor: pointer;
        border-radius: 0.25rem;
        transition: background-color 0.15s;
      }
      .tree-node:hover {
        background-color: var(--bg-hover);
      }
      .tree-node.selected {
        background-color: var(--accent);
        color: var(--text-on-accent);
      }
      .toggle {
        font-size: 0.625rem;
        width: 1rem;
        text-align: center;
        flex-shrink: 0;
        cursor: pointer;
        color: var(--text-secondary);
      }
      .toggle-placeholder {
        width: 1rem;
        flex-shrink: 0;
      }
      .node-icon {
        font-size: 1rem;
        flex-shrink: 0;
        color: var(--text-secondary);
      }
      .node-label {
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    `,
  ],
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
  template: `
    <div class="tree-container">
      @for (node of parsedNodes; track node.id) {
        <app-tree-node
          [node]="node"
          [depth]="0"
          (selected)="onNodeSelected($event)"
        ></app-tree-node>
      }
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
      .tree-container {
        font-size: 0.875rem;
      }
    `,
  ],
})
export class TreeComponent {
  @Input() nodes: string | TreeNode[] = "[]";
  @Input() selectable = false;
  @Output() selected = new EventEmitter<TreeNode>();

  get parsedNodes(): TreeNode[] {
    if (Array.isArray(this.nodes)) return this.nodes;
    try {
      return JSON.parse(this.nodes);
    } catch {
      return [];
    }
  }

  onNodeSelected(node: TreeNode) {
    this.selected.emit(node);
  }
}

registerSchemaComponent("app-tree", TreeComponent);
