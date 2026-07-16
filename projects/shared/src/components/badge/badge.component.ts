import { Component, Input } from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";

@Component({
  selector: "app-badge",
  standalone: true,
  imports: [],
  templateUrl: "./badge.component.html",
  styleUrls: ["./badge.component.scss"],
})
export class BadgeComponent {
  @Input() variant: "default" | "primary" | "success" | "warning" | "danger" =
    "default";
  @Input() size: "sm" | "md" | "lg" = "md";
  @Input() label = "";

  get badgeSizeClass(): string {
    const sizeClasses: Record<string, string> = {
      sm: "px-1 py-0.5 text-xs",
      md: "px-2 py-1 text-sm",
      lg: "px-3 py-1.5 text-base",
    };
    return sizeClasses[this.size] || sizeClasses["md"];
  }

  get badgeVariantClass(): string {
    const variantClasses: Record<string, string> = {
      default:
        "bg-[var(--bg-elevated)] text-[var(--text-primary)] border-[var(--border-color)]",
      primary: "bg-[var(--accent)] text-[var(--text-on-accent)]",
      success: "bg-[var(--success)] text-[var(--text-on-success)]",
      warning: "bg-[var(--warning)] text-[var(--text-on-warning)]",
      danger: "bg-[var(--error)] text-[var(--text-on-error)]",
    };
    return variantClasses[this.variant] || variantClasses["default"];
  }
}

registerSchemaComponent("app-badge", BadgeComponent);
