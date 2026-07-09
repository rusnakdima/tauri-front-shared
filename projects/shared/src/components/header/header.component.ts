import { Component, Input, Output, EventEmitter } from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";

interface Breadcrumb {
  label: string;
  href?: string;
}

@Component({
  selector: "app-header",
  standalone: true,
  template: `
    <header>
      @if (showBack) {
        <button
          class="back-btn"
          (click)="navigateBack.emit()"
          aria-label="Back"
        >
          &larr;
        </button>
      }
      <div class="title-area">
        <h1>{{ title }}</h1>
        @if (parsedBreadcrumbs.length) {
          <div class="breadcrumbs">
            @for (
              crumb of parsedBreadcrumbs;
              track crumb.label;
              let last = $last
            ) {
              @if (!last && crumb.href) {
                <a [href]="crumb.href">{{ crumb.label }}</a>
              } @else {
                <span>{{ crumb.label }}</span>
              }
              @if (!last) {
                <span class="breadcrumb-separator">/</span>
              }
            }
          </div>
        }
      </div>
      <ng-content></ng-content>
    </header>
  `,
  styles: [
    `
      :host {
        display: block;
      }
      header {
        display: flex;
        align-items: center;
        padding: 1rem 1.5rem;
        background: var(--bg-header, var(--bg-elevated));
        border-bottom: 1px solid var(--border-color);
        min-height: 56px;
        gap: 1rem;
      }
      .back-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 36px;
        height: 36px;
        border: 1px solid var(--border-color);
        border-radius: 0.5rem;
        background: var(--bg-elevated);
        color: var(--text-primary);
        cursor: pointer;
        transition: all 0.15s;
        padding: 0;
        font-size: 1.25rem;
      }
      .back-btn:hover {
        background: var(--bg-hover);
      }
      .title-area {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
      }
      h1 {
        margin: 0;
        font-size: 1.25rem;
        font-weight: 600;
        color: var(--text-primary);
      }
      .breadcrumbs {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.875rem;
        color: var(--text-secondary);
      }
      .breadcrumb-separator {
        color: var(--text-secondary);
        opacity: 0.5;
      }
    `,
  ],
})
export class HeaderComponent {
  @Input() title = "";
  @Input() subtitle = "";
  @Input() icon = "";
  @Input() showBack = false;
  @Input() breadcrumbs: string | Breadcrumb[] = "[]";
  @Output() navigateBack = new EventEmitter<void>();

  get parsedBreadcrumbs(): Breadcrumb[] {
    if (Array.isArray(this.breadcrumbs)) return this.breadcrumbs;
    try {
      return JSON.parse(this.breadcrumbs);
    } catch {
      return [];
    }
  }
}

registerSchemaComponent("app-header", HeaderComponent);
