import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";
import { IconComponent } from "../icons/icons.component";

const DEFAULT_CLASSES =
  "w-10 h-10 rounded-full flex items-center justify-center bg-surface-container-low border border-outline text-on-surface transition-all duration-200 hover:bg-surface-container hover:shadow-1 active:bg-surface-container-high disabled:opacity-50 disabled:cursor-not-allowed";

@Component({
  selector: "app-swap-button",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent],
  templateUrl: "./swap-button.component.html",
  styles: [
    `
      :host {
        display: inline-flex;
      }
    `,
  ],
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

  get combinedClasses(): string {
    return this.classes
      ? `${DEFAULT_CLASSES} ${this.classes}`
      : DEFAULT_CLASSES;
  }
}

registerSchemaComponent("app-swap-button", SwapButtonComponent);
