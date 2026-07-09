import { Component, Input } from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";

@Component({
  selector: "app-avatar",
  standalone: true,
  template: `
    @if (src && !imgError) {
      <img [src]="src" [alt]="alt" (error)="imgError = true" />
    } @else {
      <span class="initials">{{ initials }}</span>
    }
  `,
  styles: [
    `
      :host {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        overflow: hidden;
        background-color: var(--bg-elevated);
        border: 1px solid var(--border-color);
      }
      :host([size="sm"]) {
        width: 2rem;
        height: 2rem;
        font-size: 0.75rem;
      }
      :host([size="md"]) {
        width: 2.5rem;
        height: 2.5rem;
        font-size: 0.875rem;
      }
      :host([size="lg"]) {
        width: 3.5rem;
        height: 3.5rem;
        font-size: 1.25rem;
      }
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .initials {
        font-weight: 600;
        color: var(--text-secondary);
        text-transform: uppercase;
      }
    `,
  ],
})
export class AvatarComponent {
  @Input() src = "";
  @Input() alt = "";
  @Input() size: "sm" | "md" | "lg" = "md";
  imgError = false;

  get initials(): string {
    return (this.alt || "").substring(0, 2).toUpperCase();
  }
}

registerSchemaComponent("app-avatar", AvatarComponent);
