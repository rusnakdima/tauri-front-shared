import { Component, Input } from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";

@Component({
  selector: "app-footer",
  standalone: true,
  template: `
    <footer>
      @if (text) {
        <p class="footer-text">{{ text }}</p>
      }
      <ng-content></ng-content>
    </footer>
  `,
  styles: [
    `
      :host {
        display: block;
      }
      footer {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 1rem;
        background: var(--bg-elevated);
        border-top: 1px solid var(--border-color);
        min-height: 48px;
      }
      .footer-text {
        margin: 0;
        font-size: 0.875rem;
        color: var(--text-secondary);
        text-align: center;
      }
    `,
  ],
})
export class FooterComponent {
  @Input() text = "";
}

registerSchemaComponent("app-footer", FooterComponent);
