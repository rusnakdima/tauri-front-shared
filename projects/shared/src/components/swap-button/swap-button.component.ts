import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";
import { IconComponent } from "../icons/icons.component";

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
}

registerSchemaComponent("app-swap-button", SwapButtonComponent);
