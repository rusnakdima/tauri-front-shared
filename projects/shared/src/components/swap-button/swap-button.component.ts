import { Component, Input, Output, EventEmitter } from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";
import { IconComponent } from "../icons/icons.component";

@Component({
  selector: "app-swap-button",
  standalone: true,
  imports: [IconComponent],
  template: `
    <button
      type="button"
      [disabled]="disabled"
      [attr.aria-label]="ariaLabel || 'Swap'"
      (click)="clicked.emit($event)"
      class="w-10 h-10 rounded-full flex items-center justify-center bg-surface-container-low border border-outline text-on-surface transition-all duration-200 hover:bg-surface-container hover:shadow-1 active:bg-surface-container-high disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <app-icon icon="chevron-down" [size]="20" class="rotate-90" />
    </button>
  `,
  styles: [`
    :host {
      display: inline-flex;
    }
  `],
})
export class SwapButtonComponent {
  @Input() ariaLabel = "";
  @Input() disabled = false;
  @Input() align = "";
  @Input() direction = "";
  @Input() height = "";
  @Input() justify = "";
  @Input() layout = "";
  @Input() width = "";
  @Input() classes = "";
  @Output() clicked = new EventEmitter<Event>();
}

registerSchemaComponent("app-swap-button", SwapButtonComponent);
