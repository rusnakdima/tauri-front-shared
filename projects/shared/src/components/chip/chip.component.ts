import { Component, Input, Output, EventEmitter } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";

@Component({
  selector: "app-chip",
  standalone: true,
  imports: [MatIconModule],
  template: `
    <span class="chip">
      @if (icon) {
        <mat-icon class="chip-icon" [fontIcon]="icon" />
      }
      <span>{{ label }}</span>
      @if (removable) {
        <button
          class="remove-btn"
          (click)="handleRemove($event)"
          aria-label="Remove"
        >
          &times;
        </button>
      }
    </span>
  `,
  styles: [
    `
      :host {
        display: inline-flex;
      }
      .chip {
        display: inline-flex;
        align-items: center;
        gap: 0.375rem;
        padding: 0.25rem 0.75rem;
        border-radius: 1rem;
        background-color: var(--bg-elevated);
        border: 1px solid var(--border-color);
        color: var(--text-primary);
        font-size: 0.875rem;
        font-weight: 500;
        transition: background-color 0.15s;
      }
      .chip:hover {
        background-color: var(--bg-hover);
      }
      .chip-icon {
        font-size: 1rem;
      }
      .remove-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 1rem;
        height: 1rem;
        padding: 0;
        border: none;
        background: transparent;
        color: var(--text-secondary);
        cursor: pointer;
        border-radius: 50%;
        transition: background-color 0.15s;
        margin-left: 0.125rem;
      }
      .remove-btn:hover {
        background-color: var(--border-color);
        color: var(--text-primary);
      }
    `,
  ],
})
export class ChipComponent {
  @Input() label = "";
  @Input() icon = "";
  @Input() removable = false;
  @Output() removed = new EventEmitter<void>();

  handleRemove(e: Event) {
    e.stopPropagation();
    this.removed.emit();
  }
}

registerSchemaComponent("app-chip", ChipComponent);
