import { Component, Input, Output, EventEmitter } from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";

// Use internal registry to avoid circular dependency with schema-component.registry

@Component({
  selector: "app-nav-item",
  standalone: true,
  template: `
    <a
      class="nav-item"
      [class.active]="active"
      [class.disabled]="disabled"
      (click)="handleClick()"
    >
      @if (icon) {
        <span class="nav-icon">{{ icon }}</span>
      }
      <span class="nav-label"><ng-content></ng-content></span>
    </a>
  `,
  styles: [
    `
      :host {
        display: block;
      }
      .nav-item {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.5rem 0.75rem;
        border-radius: 0.375rem;
        color: var(--text-secondary);
        text-decoration: none;
        cursor: pointer;
        transition: all 0.15s;
      }
      .nav-item:hover {
        background: var(--bg-hover);
        color: var(--text-primary);
      }
      .nav-item.active {
        background: var(--accent);
        color: var(--text-on-accent);
      }
      .nav-item.disabled {
        opacity: 0.4;
        cursor: not-allowed;
      }
      .nav-icon {
        display: flex;
        align-items: center;
        font-size: 1.25rem;
      }
      .nav-label {
        flex: 1;
      }
    `,
  ],
})
export class NavItemComponent {
  @Input() icon = "";
  @Input() label = "";
  @Input() active = false;
  @Input() disabled = false;
  @Output() clicked = new EventEmitter<void>();

  handleClick() {
    if (!this.disabled) {
      this.clicked.emit();
    }
  }
}

registerSchemaComponent("app-nav-item", NavItemComponent);
