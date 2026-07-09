import { Component, Input, Output, EventEmitter } from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";

@Component({
  selector: "app-designer-sidebar",
  standalone: true,
  template: `
    <div class="sidebar-wrapper">
      <aside
        class="designer-sidebar"
        [class.collapsed]="collapsed"
        [style.borderRight]="
          position === 'left' ? '1px solid var(--border-color)' : 'none'
        "
        [style.borderLeft]="
          position === 'right' ? '1px solid var(--border-color)' : 'none'
        "
      >
        <div
          class="sidebar-header"
          [style.flexDirection]="position === 'right' ? 'row-reverse' : 'row'"
        >
          <span class="sidebar-header-title">{{ header }}</span>
        </div>
        <div class="sidebar-content">
          <ng-content select="[slot=content]"></ng-content>
        </div>
        <div class="sidebar-footer">
          <ng-content select="[slot=footer]"></ng-content>
        </div>
      </aside>
      <div
        class="sidebar-toggle-container"
        [style.right]="position === 'left' ? '-12px' : 'auto'"
        [style.left]="position === 'right' ? '-12px' : 'auto'"
      >
        <button class="sidebar-toggle" (click)="toggleCollapse()">
          {{
            collapsed
              ? position === "left"
                ? "▶"
                : "◀"
              : position === "left"
                ? "◀"
                : "▶"
          }}
        </button>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        height: 100%;
      }
      .sidebar-wrapper {
        position: relative;
        height: 100%;
        display: flex;
      }
      .sidebar-toggle-container {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        z-index: 10;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 48px;
        background: var(--bg-secondary);
        border: 1px solid var(--border-color);
        border-radius: 4px;
        transition: all var(--transition-fast, 150ms);
        cursor: pointer;
      }
      .sidebar-toggle-container:hover {
        background: var(--bg-hover);
      }
      .sidebar-toggle {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 28px;
        padding: 0;
        background: transparent;
        border: none;
        border-radius: 4px;
        color: var(--text-secondary);
        cursor: pointer;
        transition: all var(--transition-fast, 150ms);
      }
      .sidebar-toggle:hover {
        color: var(--text-primary);
      }
      .designer-sidebar {
        display: flex;
        flex-direction: column;
        height: 100%;
        background: var(--bg-secondary);
        transition:
          width var(--transition-normal, 200ms) ease,
          opacity var(--transition-normal, 200ms) ease;
        overflow: hidden;
        flex-shrink: 0;
      }
      .designer-sidebar.collapsed {
        width: 0;
        visibility: hidden;
      }
      .sidebar-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.75rem 1rem;
        border-bottom: 1px solid var(--border-color);
        min-height: 48px;
        background: var(--bg-secondary);
        flex-shrink: 0;
      }
      .sidebar-header-title {
        font-size: 0.875rem;
        font-weight: 600;
        color: var(--text-primary);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .sidebar-content {
        flex: 1;
        overflow: auto;
        min-height: 0;
      }
      .sidebar-footer {
        padding: 0.75rem 1rem;
        border-top: 1px solid var(--border-color);
        flex-shrink: 0;
      }
    `,
  ],
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
