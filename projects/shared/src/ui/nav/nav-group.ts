import { Component, Input } from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";

@Component({
  selector: "app-nav-group",
  standalone: true,
  template: `
    <div class="nav-group">
      @if (label) {
        <div class="nav-group-title">{{ label }}</div>
      }
      <ng-content></ng-content>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
      .nav-group {
        margin-bottom: 0.5rem;
      }
      .nav-group-title {
        padding: 0.5rem 0.75rem;
        font-size: 0.75rem;
        font-weight: 600;
        color: var(--text-secondary);
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }
    `,
  ],
})
export class NavGroupComponent {
  @Input() label = "";
}

registerSchemaComponent("app-nav-group", NavGroupComponent);
