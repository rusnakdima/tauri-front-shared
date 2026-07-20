import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";
import { IconComponent } from "../icons/icons.component";

export type ButtonVariant =
  "primary" | "danger" | "warning" | "success" | "info" | "tonal" | "outlined";

@Component({
  selector: "app-button",
  standalone: true,
  imports: [IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./button.component.html",
})
export class ButtonComponent {
  @Input() variant: ButtonVariant = "primary";
  @Input() disabled = false;
  @Input() loading = false;
  @Input() icon: string | null = null;
  @Input() iconPosition: "left" | "right" = "left";
  @Input() fullWidth = false;
  @Input() type: "button" | "submit" | "reset" = "button";
  @Input() label = "";
  @Input() classes = "";
  @Input() ariaLabel = "";

  @Output() clicked = new EventEmitter<MouseEvent>();

  handleClick(e: MouseEvent) {
    if (this.disabled || this.loading) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    this.clicked.emit(e);
  }
}

registerSchemaComponent("app-button", ButtonComponent);
