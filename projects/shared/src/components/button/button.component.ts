import { Component, Input, Output, EventEmitter, inject } from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";
import { I18nService } from "../../core/lib/i18n/i18n.service";
import { IconComponent } from "../icons/icons.component";

export type ButtonStyle = "solid" | "outline" | "soft" | "ghost";
export type ButtonVariant =
  "primary" | "danger" | "warning" | "success" | "info";
export type ButtonSize = "sm" | "md" | "lg";

@Component({
  selector: "app-button",
  standalone: true,
  imports: [IconComponent],
  templateUrl: "./button.component.html",
  styleUrls: ["./button.component.css"],
})
export class ButtonComponent {
  private i18n = inject(I18nService);

  @Input() variant: ButtonVariant = "primary";
  @Input() buttonStyle: ButtonStyle = "solid";
  @Input() size: ButtonSize = "md";
  @Input() disabled = false;
  @Input() loading = false;
  @Input() icon: string | null = null;
  @Input() iconPosition: "left" | "right" = "left";
  @Input() fullWidth = false;
  @Input() type: "button" | "submit" | "reset" = "button";
  @Input() label = "";
  @Input() set i18nKey(value: string | undefined) {
    if (value !== undefined && value !== null) {
      this.label = this.i18n.t(value);
    }
  }
  @Input() classes = "";
  @Input() ariaLabel = "";
  @Input() align = "";
  @Input() direction = "";
  @Input() height = "";
  @Input() justify = "";
  @Input() layout = "";
  @Input() width = "";

  @Output() clicked = new EventEmitter<MouseEvent>();

  handleClick(e: MouseEvent) {
    if (this.disabled || this.loading) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    this.clicked.emit(e);
  }

  getButtonClass(): string {
    const sizeClass =
      this.size === "sm"
        ? "py-1 px-2 text-sm"
        : this.size === "lg"
          ? "py-3 px-6 text-lg"
          : "";
    return [sizeClass, this.fullWidth ? "w-full" : ""]
      .filter(Boolean)
      .join(" ");
  }
}

registerSchemaComponent("app-button", ButtonComponent);
