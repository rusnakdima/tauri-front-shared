import { Component, Input, Output, EventEmitter } from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";

@Component({
  selector: "app-segment-selector",
  standalone: true,
  template: `
    <div class="segment-container">
      @for (opt of parsedOptions; track opt) {
        <div
          class="segment"
          [class.selected]="opt === selected"
          (click)="selectOption(opt)"
        >
          {{ opt }}
        </div>
      }
    </div>
  `,
  styles: [
    `
      :host {
        display: inline-flex;
      }
      .segment-container {
        display: inline-flex;
        border: 1px solid var(--border-color);
        border-radius: 0.5rem;
        overflow: hidden;
        background-color: var(--bg-elevated);
      }
      .segment {
        padding: 0.5rem 1rem;
        font-size: 0.875rem;
        font-weight: 500;
        color: var(--text-secondary);
        cursor: pointer;
        transition:
          background-color 0.15s,
          color 0.15s;
        border-right: 1px solid var(--border-color);
      }
      .segment:last-child {
        border-right: none;
      }
      .segment:hover:not(.selected) {
        background-color: var(--bg-hover);
        color: var(--text-primary);
      }
      .segment.selected {
        background-color: var(--accent);
        color: var(--text-on-accent);
      }
    `,
  ],
})
export class SegmentSelectorComponent {
  @Input() options: string | string[] = "[]";
  @Input() selected = "";
  @Output() changed = new EventEmitter<string>();

  get parsedOptions(): string[] {
    if (Array.isArray(this.options)) return this.options;
    try {
      return JSON.parse(this.options);
    } catch {
      return [];
    }
  }

  selectOption(opt: string) {
    this.selected = opt;
    this.changed.emit(opt);
  }
}

registerSchemaComponent("app-segment-selector", SegmentSelectorComponent);
