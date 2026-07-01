import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from "@angular/core";
import { CommonModule } from "@angular/common";

export type ButtonStyle = "solid" | "outline" | "soft" | "ghost";
export type ButtonVariant =
  | "primary"
  | "danger"
  | "warning"
  | "success"
  | "info";
export type ButtonSize = "sm" | "md" | "lg";

@Component({
  selector: "app-button",
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./button.component.html",
  styleUrl: "./button.component.css",
})
export class ButtonComponent {
  @Input() variant: ButtonVariant = "primary";
  @Input() style: ButtonStyle = "solid";
  @Input() size: ButtonSize = "md";
  @Input() disabled = false;
  @Input() loading = false;
  @Input() icon: string | null = null;
  @Input() iconPosition: "left" | "right" = "left";
  @Input() fullWidth = false;
  @Input() type: "button" | "submit" | "reset" = "button";

  @Output() clicked = new EventEmitter<MouseEvent>();

  get buttonClass(): string {
    // Build class string: app-btn + style-variant + size + modifiers
    // Examples: app-btn-solid-primary, app-btn-outline-danger, app-btn-soft-success
    const styleVariant = this.style === "solid" && this.variant === "primary"
      ? "" // Default, just app-btn
      : `app-btn-${this.style}${this.variant !== "primary" ? `-${this.variant}` : ""}`;

    const classes = [
      "app-btn",
      styleVariant,
      `app-btn-${this.size}`,
    ].filter(Boolean);

    if (this.fullWidth) classes.push("app-btn-full");
    if (this.disabled || this.loading) classes.push("app-btn-disabled");

    return classes.join(" ");
  }

  get showSpinner(): boolean {
    return this.loading;
  }

  onClick(event: MouseEvent): void {
    if (!this.disabled && !this.loading) {
      this.clicked.emit(event);
    }
  }
}
