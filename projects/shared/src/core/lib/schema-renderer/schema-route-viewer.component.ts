import { Component, OnInit, inject, ElementRef, ViewChild, AfterViewInit, OnDestroy, CUSTOM_ELEMENTS_SCHEMA, effect, Injector, runInInjectionContext } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchemaRendererService, CanvasElement } from './schema-renderer.service';
import { SchemaRouterService } from './schema-router.service';

@Component({
  selector: 'lib-schema-route-viewer',
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <div class="schema-viewer">
      <div class="header-slot">
        <app-header [attr.data]="headerProps"></app-header>
      </div>
      <div class="sidebar-slot">
        <app-sidebar [attr.data]="sidebarProps"></app-sidebar>
      </div>
      <div class="content-slot" #contentContainer>
        <!-- Content elements render here -->
      </div>
    </div>
  `,
  styles: [`
    .schema-viewer {
      display: contents;
    }
    .header-slot {
      display: contents;
    }
    .sidebar-slot {
      display: contents;
    }
    .content-slot {
      display: contents;
    }
  `]
})
export class SchemaRouteViewerComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('contentContainer') contentContainer!: ElementRef<HTMLElement>;

  headerProps: Record<string, unknown> = {};
  sidebarProps: Record<string, unknown> = {};

  private schemaRenderer = inject(SchemaRendererService);
  private schemaRouter = inject(SchemaRouterService);
  private injector = inject(Injector);

  private routeEffect: any;

  ngOnInit(): void {
    // React to route changes by re-rendering when currentPageId changes
    // effect() must be called within an injection context, so use runInInjectionContext
    this.routeEffect = runInInjectionContext(this.injector, () => {
      effect(() => {
        const pageId = this.schemaRouter.currentPageId();
        if (pageId) {
          this.schemaRenderer.setCurrentPage(pageId);
          this.renderCurrentPage();
        }
      });
    });
  }

  ngAfterViewInit(): void {
    // Initial render
    const pageId = this.schemaRouter.currentPageId();
    if (pageId) {
      this.schemaRenderer.setCurrentPage(pageId);
      this.renderCurrentPage();
    }
  }

  ngOnDestroy(): void {
    if (this.routeEffect) {
      this.routeEffect.destroy();
    }
  }

  private renderCurrentPage(): void {
    const page = this.schemaRenderer.getCurrentPage();
    if (!page || !this.contentContainer) return;

    // Clear previous content
    this.contentContainer.nativeElement.innerHTML = '';

    // Extract header and sidebar props if defined at page level
    if ((page as any).headerProps) {
      this.headerProps = (page as any).headerProps;
    }
    if ((page as any).sidebarProps) {
      this.sidebarProps = (page as any).sidebarProps;
    }

    // Render elements from canvasElements or elements
    const elements: CanvasElement[] = (page as any).canvasElements || (page as any).elements || [];

    // Build element map and handle hierarchy
    const elementMap = new Map<string, HTMLElement>();
    for (const element of elements) {
      const el = this.createElementNode(element);
      if (el) {
        elementMap.set(element.id, el);
      }
    }

    // Collect child IDs to identify roots
    const childIds = new Set(
      elements.reduce<string[]>((acc, e) => acc.concat(e.children || []), [])
    );

    // Append children to parents, roots to container
    for (const element of elements) {
      const el = elementMap.get(element.id);
      if (!el) continue;
      if (element.children) {
        for (const childId of element.children) {
          const childEl = elementMap.get(childId);
          if (childEl) {
            el.appendChild(childEl);
          }
        }
      }
      if (!childIds.has(element.id)) {
        this.contentContainer.nativeElement.appendChild(el);
      }
    }
  }

  private createElementNode(element: CanvasElement): HTMLElement | null {
    const el = document.createElement(element.componentId);

    // Set properties directly (NOT attributes for Lit components)
    for (const [key, value] of Object.entries(element.props || {})) {
      (el as any)[key] = value;
    }

    // Set grid position if present (for grid-based layouts)
    if (element.gridPosition) {
      el.style.gridColumn = `${element.gridPosition.column} / span ${element.gridPosition.colSpan || 1}`;
      el.style.gridRow = `${element.gridPosition.row} / span ${element.gridPosition.rowSpan || 1}`;
    } else if (element.position) {
      // Fallback to absolute positioning
      el.style.position = 'absolute';
      el.style.left = `${element.position.x}px`;
      el.style.top = `${element.position.y}px`;
      el.style.width = `${element.position.width}px`;
      el.style.height = `${element.position.height}px`;
    }

    // Apply z-index if defined
    if (element.zIndex) {
      el.style.zIndex = `${element.zIndex}`;
    }

    // Apply custom classes
    if (element.classes) {
      el.className = element.classes;
    }

    // Set element ID for tracking
    el.dataset['elementId'] = element.id;
    el.dataset['componentId'] = element.componentId;

    // Handle data binding if present
    if (element.dataBinding) {
      el.dataset['dataEntity'] = element.dataBinding.entity;
      if (element.dataBinding.field) {
        el.dataset['dataField'] = element.dataBinding.field;
      }
    }

    return el;
  }
}
