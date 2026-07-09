import { Component, Input, Output, EventEmitter } from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";

export interface SidebarItem {
  label: string;
  icon?: string;
  id?: string;
  children?: SidebarItem[];
}

@Component({
  selector: "app-sidebar",
  standalone: true,
  template: `
    <aside [class.collapsed]="collapsed" [style.--sidebar-width.px]="width">
      <div class="sidebar-header">
        <button
          class="collapse-btn"
          (click)="toggleCollapse()"
          aria-label="Toggle sidebar"
        >
          {{ collapsed ? "→" : "←" }}
        </button>
      </div>
      <nav>
        <ul>
          @for (item of parsedItems; track item.label) {
            <li>
              <div class="nav-item" (click)="handleItemClick(item)">
                @if (item.icon) {
                  <span class="nav-item-icon">{{ item.icon }}</span>
                }
                <span class="nav-item-label">{{ item.label }}</span>
              </div>
              @if (item.children?.length) {
                <ul class="nav-item-children">
                  @for (child of item.children; track child.label) {
                    <li>
                      <div
                        class="nav-item nav-item-child"
                        (click)="handleItemClick(child)"
                      >
                        @if (child.icon) {
                          <span class="nav-item-icon">{{ child.icon }}</span>
                        }
                        <span class="nav-item-label">{{ child.label }}</span>
                      </div>
                    </li>
                  }
                </ul>
              }
            </li>
          }
        </ul>
      </nav>
      <ng-content></ng-content>
    </aside>
  `,
  styles: [
    `
      :host {
        display: block;
      }
      aside {
        display: flex;
        flex-direction: column;
        width: var(--sidebar-width, 240px);
        min-width: var(--sidebar-width, 240px);
        height: 100%;
        background: var(--bg-elevated);
        border-right: 1px solid var(--border-color);
        transition:
          width 0.2s,
          min-width 0.2s;
        overflow: hidden;
      }
      aside.collapsed {
        width: 64px;
        min-width: 64px;
      }
      .sidebar-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1rem;
        border-bottom: 1px solid var(--border-color);
        min-height: 56px;
      }
      .collapse-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        border: 1px solid var(--border-color);
        border-radius: 0.5rem;
        background: transparent;
        color: var(--text-secondary);
        cursor: pointer;
        transition: all 0.15s;
        padding: 0;
        font-size: 1.25rem;
      }
      .collapse-btn:hover {
        background: var(--bg-hover);
        color: var(--text-primary);
      }
      nav {
        flex: 1;
        overflow-y: auto;
        overflow-x: hidden;
        padding: 0.5rem;
      }
      ul {
        list-style: none;
        margin: 0;
        padding: 0;
      }
      li {
        margin: 0;
      }
      .nav-item {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.625rem 0.75rem;
        border-radius: 0.5rem;
        color: var(--text-secondary);
        text-decoration: none;
        cursor: pointer;
        transition: all 0.15s;
        white-space: nowrap;
        overflow: hidden;
      }
      .nav-item:hover {
        background: var(--bg-hover);
        color: var(--text-primary);
      }
      .nav-item.active {
        background: var(--accent);
        color: var(--text-on-accent);
      }
      .nav-item-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 20px;
        height: 20px;
        font-size: 1.25rem;
        flex-shrink: 0;
      }
      .nav-item-label {
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .nav-item-children {
        margin-left: 1.25rem;
        border-left: 1px solid var(--border-color);
        padding-left: 0.5rem;
      }
    `,
  ],
})
export class SidebarComponent {
  @Input() collapsed = false;
  @Input() items: string | SidebarItem[] = "[]";
  @Input() width = 240;
  @Input() collapsedWidth = 64;
  @Output() collapseChanged = new EventEmitter<{ collapsed: boolean }>();
  @Output() itemClicked = new EventEmitter<SidebarItem>();

  get parsedItems(): SidebarItem[] {
    if (Array.isArray(this.items)) return this.items;
    try {
      return JSON.parse(this.items);
    } catch {
      return [];
    }
  }

  toggleCollapse() {
    this.collapsed = !this.collapsed;
    this.collapseChanged.emit({ collapsed: this.collapsed });
  }

  handleItemClick(item: SidebarItem) {
    this.itemClicked.emit(item);
  }
}

registerSchemaComponent("app-sidebar", SidebarComponent);
