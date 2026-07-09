import { Component, Input } from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";

export type DividerOrientation = "horizontal" | "vertical";
export type DividerSpacing = "none" | "sm" | "md" | "lg" | "xl";

@Component({
  selector: "app-divider",
  standalone: true,
  template: `<div
    class="line"
    [style.background]="color || null"
    role="separator"
  ></div>`,
  styles: [
    `
      :host {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      :host([orientation="vertical"]) {
        display: inline-flex;
        align-items: stretch;
        height: 100%;
      }
      .line {
        background: var(--divider-color, var(--border-color, #e5e7eb));
        width: 100%;
        height: 1px;
      }
      :host([orientation="vertical"]) .line {
        width: 1px;
        height: 100%;
      }
      :host([spacing="none"]) {
        margin: 0;
      }
      :host([spacing="sm"]) {
        margin: 0.5rem 0;
      }
      :host([spacing="md"]) {
        margin: 1rem 0;
      }
      :host([spacing="lg"]) {
        margin: 1.5rem 0;
      }
      :host([spacing="xl"]) {
        margin: 2.5rem 0;
      }
      :host([orientation="vertical"][spacing="none"]) {
        margin: 0;
      }
      :host([orientation="vertical"][spacing="sm"]) {
        margin: 0 0.5rem;
      }
      :host([orientation="vertical"][spacing="md"]) {
        margin: 0 1rem;
      }
      :host([orientation="vertical"][spacing="lg"]) {
        margin: 0 1.5rem;
      }
      :host([orientation="vertical"][spacing="xl"]) {
        margin: 0 2.5rem;
      }
    `,
  ],
})
export class DividerComponent {
  @Input() orientation: DividerOrientation = "horizontal";
  @Input() spacing: DividerSpacing = "md";
  @Input() color = "";
}

registerSchemaComponent("app-divider", DividerComponent);
