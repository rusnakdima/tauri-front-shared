import { Component, Input } from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";
import { ApplyThemeDirective } from "../../styles/theme-integration/apply-theme.directive";

export type TextSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
export type TextWeight = "normal" | "medium" | "semibold" | "bold";
export type TextAlign = "left" | "center" | "right" | "justify";
export type TextTransform = "none" | "uppercase" | "lowercase" | "capitalize";
export type TextColor =
  | "primary"
  | "secondary"
  | "muted"
  | "accent"
  | "error"
  | "success"
  | "warning"
  | "info";

const FONT_SIZE_MAP: Record<TextSize, string> = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
  "3xl": "text-3xl",
  "4xl": "text-4xl",
};

const FONT_WEIGHT_MAP: Record<TextWeight, string> = {
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
};

const COLOR_MAP: Record<TextColor, string> = {
  primary: "text-[color:var(--text-primary)]",
  secondary: "text-[color:var(--text-secondary)]",
  muted: "text-[color:var(--text-muted)]",
  accent: "text-[color:var(--accent)]",
  error: "text-[color:var(--error)]",
  success: "text-[color:var(--success)]",
  warning: "text-[color:var(--warning)]",
  info: "text-[color:var(--info)]",
};

const TEXT_ALIGN_MAP: Record<TextAlign, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
  justify: "text-justify",
};

const TEXT_TRANSFORM_MAP: Record<TextTransform, string> = {
  none: "normal-case",
  uppercase: "uppercase",
  lowercase: "lowercase",
  capitalize: "capitalize",
};

@Component({
  selector: "app-text",
  standalone: true,
  imports: [ApplyThemeDirective],
  templateUrl: "./text.component.html",
})
export class TextComponent {
  @Input() text = "";
  @Input() tag: "span" | "p" = "span";
  @Input() size: TextSize = "md";
  @Input() weight: TextWeight = "normal";
  @Input() color: TextColor | "" = "";
  @Input() textAlign: TextAlign = "left";
  @Input() textTransform: TextTransform = "none";
  @Input() lineHeight = "";
  @Input() letterSpacing = "";
  @Input() whiteSpace = "";
  @Input() truncate = false;

  get fontSizeClass(): string {
    return FONT_SIZE_MAP[this.size] || "text-base";
  }

  get fontWeightClass(): string {
    return FONT_WEIGHT_MAP[this.weight] || "font-normal";
  }

  get colorClass(): string {
    if (this.color && COLOR_MAP[this.color]) return COLOR_MAP[this.color];
    return "";
  }

  get textAlignClass(): string {
    return TEXT_ALIGN_MAP[this.textAlign] || "text-left";
  }

  get textTransformClass(): string {
    return TEXT_TRANSFORM_MAP[this.textTransform] || "normal-case";
  }
}

registerSchemaComponent("app-text", TextComponent);
