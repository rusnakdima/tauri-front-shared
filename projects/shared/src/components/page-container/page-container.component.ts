import { Component, Input } from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";

@Component({
  selector: "app-page-container",
  standalone: true,
  template: `
    @if (title) {
      <div class="page-header">
        <h1 class="page-title">{{ title }}</h1>
        <ng-content select="[slot=header-actions]"></ng-content>
      </div>
    }
    <div
      class="page-content"
      [style.padding.px]="padding"
      [style.maxWidth]="maxWidth ? maxWidth + 'px' : null"
    >
      <ng-content></ng-content>
    </div>
  `,
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
        height: 100%;
      }
      .page-header {
        display: flex;
        align-items: center;
        padding: 1rem 1.5rem;
        background: var(--bg-elevated);
        border-bottom: 1px solid var(--border-color);
        min-height: 56px;
        gap: 1rem;
      }
      .page-title {
        margin: 0;
        font-size: 1.25rem;
        font-weight: 600;
        color: var(--text-primary);
      }
      .page-content {
        flex: 1;
        overflow: auto;
      }
    `,
  ],
})
export class PageContainerComponent {
  @Input() title = "";
  @Input() padding = 24;
  @Input() maxWidth = 0;
  @Input() width = "";
}

registerSchemaComponent("app-page-container", PageContainerComponent);
