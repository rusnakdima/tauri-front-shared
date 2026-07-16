import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";
import { IconComponent } from "../icons/icons.component";

export type ButtonStyle = "solid" | "outline" | "soft" | "ghost";
export type ButtonVariant = "primary" | "danger" | "warning" | "success" | "info";
export type ButtonSize = "sm" | "md" | "lg";

@Component({
  selector: "app-button",
  standalone: true,
  imports: [IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      [type]="type || 'button'"
      [disabled]="disabled || loading"
      [class]="getButtonClasses()"
      (click)="handleClick($event)"
      [attr.aria-label]="ariaLabel || null"
    >
      @if (loading) {
        <span class="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full"></span>
      } @else {
        @if (icon && iconPosition === "left") {
          <app-icon class="w-5 h-5 flex-shrink-0" [icon]="icon" [size]="20" />
        }
        @if (label) {
          <span>{{ label }}</span>
        } @else {
          <ng-content></ng-content>
        }
        @if (icon && iconPosition === "right") {
          <app-icon class="w-5 h-5 flex-shrink-0" [icon]="icon" [size]="20" />
        }
      }
    </button>
  `,
  styles: [`
    :host {
      display: inline-flex;
    }
    :host(.full-width) {
      width: 100%;
    }
  `],
})
export class ButtonComponent {
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

  getButtonClasses(): string {
    const base = 'inline-flex items-center justify-center gap-2 font-medium rounded-md transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed';

    // Size classes
    const sizeClasses = {
      sm: 'h-8 px-3 text-sm',
      md: 'h-10 px-4 text-base',
      lg: 'h-12 px-6 text-lg',
    };

    // Variant + style classes for solid style
    const solidVariants = {
      primary: 'bg-primary text-on-primary hover:brightness-110 active:brightness-90 shadow-1 hover:shadow-2',
      danger: 'bg-error text-on-error hover:brightness-110 active:brightness-90 shadow-1 hover:shadow-2',
      warning: 'bg-warning text-on-error hover:brightness-110 active:brightness-90 shadow-1 hover:shadow-2',
      success: 'bg-success text-white hover:brightness-110 active:brightness-90 shadow-1 hover:shadow-2',
      info: 'bg-info text-white hover:brightness-110 active:brightness-90 shadow-1 hover:shadow-2',
    };

    // Outline style
    const outlineVariants = {
      primary: 'border-2 border-primary text-primary bg-transparent hover:bg-primary/10 active:bg-primary/20',
      danger: 'border-2 border-error text-error bg-transparent hover:bg-error/10 active:bg-error/20',
      warning: 'border-2 border-warning text-warning bg-transparent hover:bg-warning/10 active:bg-warning/20',
      success: 'border-2 border-success text-success bg-transparent hover:bg-success/10 active:bg-success/20',
      info: 'border-2 border-info text-info bg-transparent hover:bg-info/10 active:bg-info/20',
    };

    // Soft style (filled background with muted text)
    const softVariants = {
      primary: 'bg-primary-container text-on-primary-container hover:bg-primary-container/80 active:bg-primary-container/60',
      danger: 'bg-error-container text-on-error-container hover:bg-error-container/80 active:bg-error-container/60',
      warning: 'bg-warning/20 text-warning hover:bg-warning/30 active:bg-warning/40',
      success: 'bg-success/20 text-success hover:bg-success/30 active:bg-success/40',
      info: 'bg-info/20 text-info hover:bg-info/30 active:bg-info/40',
    };

    // Ghost style (no background, just hover state)
    const ghostVariants = {
      primary: 'bg-transparent text-primary hover:bg-[--state-hover] active:bg-[--state-pressed]',
      danger: 'bg-transparent text-error hover:bg-[--state-hover] active:bg-[--state-pressed]',
      warning: 'bg-transparent text-warning hover:bg-[--state-hover] active:bg-[--state-pressed]',
      success: 'bg-transparent text-success hover:bg-[--state-hover] active:bg-[--state-pressed]',
      info: 'bg-transparent text-info hover:bg-[--state-hover] active:bg-[--state-pressed]',
    };

    // Text style (no background at all)
    const textVariants = {
      primary: 'bg-transparent text-primary hover:bg-[--state-hover] active:bg-[--state-pressed]',
      danger: 'bg-transparent text-error hover:bg-[--state-hover] active:bg-[--state-pressed]',
      warning: 'bg-transparent text-warning hover:bg-[--state-hover] active:bg-[--state-pressed]',
      success: 'bg-transparent text-success hover:bg-[--state-hover] active:bg-[--state-pressed]',
      info: 'bg-transparent text-info hover:bg-[--state-hover] active:bg-[--state-pressed]',
    };

    const styleMap = {
      solid: solidVariants,
      outline: outlineVariants,
      soft: softVariants,
      ghost: ghostVariants,
    };

    const variantClasses = styleMap[this.buttonStyle]?.[this.variant] || solidVariants[this.variant];
    const sizeClass = sizeClasses[this.size];

    return [
      base,
      variantClasses,
      sizeClass,
      this.fullWidth ? 'w-full' : '',
      this.classes,
    ].filter(Boolean).join(' ');
  }
}

registerSchemaComponent("app-button", ButtonComponent);
