import { Component, Input, Output, EventEmitter } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";

export type ButtonStyle = "solid" | "outline" | "soft" | "ghost";
export type ButtonVariant =
  "primary" | "danger" | "warning" | "success" | "info";
export type ButtonSize = "sm" | "md" | "lg";

@Component({
  selector: "app-button",
  standalone: true,
  imports: [MatIconModule],
  template: `
    <button
      [attr.type]="type || 'button'"
      [class]="getButtonClass()"
      [disabled]="disabled || loading"
      (click)="handleClick($event)"
    >
      @if (loading) {
        <span class="app-btn-spinner"></span>
      } @else {
        @if (icon && iconPosition === "left") {
          <mat-icon class="app-btn-icon" [fontIcon]="icon" />
        }
        @if (label) {
          <span>{{ label }}</span>
        } @else {
          <ng-content></ng-content>
        }
        @if (icon && iconPosition === "right") {
          <mat-icon class="app-btn-icon" [fontIcon]="icon" />
        }
      }
    </button>
  `,
  styles: [
    `
      :host {
        display: inline-flex;
      }
      button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        border-radius: 0.5rem;
        border: 1px solid;
        padding: 0.5rem 1rem;
        text-align: center;
        font-weight: 500;
        transition: all 0.15s;
        cursor: pointer;
        border-width: 1px;
      }
      button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
      .app-btn-solid {
        border-color: var(--accent);
        background-color: var(--accent);
        color: var(--text-on-accent);
      }
      .app-btn-solid:hover {
        background-color: var(--accent-hover);
        border-color: var(--accent-hover);
      }
      .app-btn-solid-danger {
        border-color: var(--error);
        background-color: var(--error);
        color: var(--text-on-error);
      }
      .app-btn-solid-danger:hover {
        opacity: 0.9;
      }
      .app-btn-solid-warning {
        border-color: var(--warning);
        background-color: var(--warning);
        color: var(--text-on-warning);
      }
      .app-btn-solid-warning:hover {
        opacity: 0.9;
      }
      .app-btn-solid-success {
        border-color: var(--success);
        background-color: var(--success);
        color: var(--text-on-success);
      }
      .app-btn-solid-success:hover {
        opacity: 0.9;
      }
      .app-btn-solid-info {
        border-color: var(--info);
        background-color: var(--info);
        color: var(--text-on-info);
      }
      .app-btn-solid-info:hover {
        opacity: 0.9;
      }
      .app-btn-outline {
        border-color: var(--accent);
        background-color: transparent;
        color: var(--accent);
      }
      .app-btn-outline:hover {
        background-color: color-mix(in srgb, var(--accent) 10%, transparent);
      }
      .app-btn-outline-danger {
        border-color: var(--error);
        background-color: transparent;
        color: var(--error);
      }
      .app-btn-outline-danger:hover {
        background-color: color-mix(in srgb, var(--error) 10%, transparent);
      }
      .app-btn-outline-warning {
        border-color: var(--warning);
        background-color: transparent;
        color: var(--warning);
      }
      .app-btn-outline-warning:hover {
        background-color: color-mix(in srgb, var(--warning) 10%, transparent);
      }
      .app-btn-outline-success {
        border-color: var(--success);
        background-color: transparent;
        color: var(--success);
      }
      .app-btn-outline-success:hover {
        background-color: color-mix(in srgb, var(--success) 10%, transparent);
      }
      .app-btn-outline-info {
        border-color: var(--info);
        background-color: transparent;
        color: var(--info);
      }
      .app-btn-outline-info:hover {
        background-color: color-mix(in srgb, var(--info) 10%, transparent);
      }
      .app-btn-soft {
        border-color: transparent;
        background-color: color-mix(in srgb, var(--accent) 10%, transparent);
        color: var(--accent);
      }
      .app-btn-soft:hover {
        background-color: color-mix(in srgb, var(--accent) 20%, transparent);
      }
      .app-btn-soft-danger {
        border-color: transparent;
        background-color: color-mix(in srgb, var(--error) 10%, transparent);
        color: var(--error);
      }
      .app-btn-soft-danger:hover {
        background-color: color-mix(in srgb, var(--error) 20%, transparent);
      }
      .app-btn-soft-warning {
        border-color: transparent;
        background-color: color-mix(in srgb, var(--warning) 10%, transparent);
        color: var(--warning);
      }
      .app-btn-soft-warning:hover {
        background-color: color-mix(in srgb, var(--warning) 20%, transparent);
      }
      .app-btn-soft-success {
        border-color: transparent;
        background-color: color-mix(in srgb, var(--success) 10%, transparent);
        color: var(--success);
      }
      .app-btn-soft-success:hover {
        background-color: color-mix(in srgb, var(--success) 20%, transparent);
      }
      .app-btn-soft-info {
        border-color: transparent;
        background-color: color-mix(in srgb, var(--info) 10%, transparent);
        color: var(--info);
      }
      .app-btn-soft-info:hover {
        background-color: color-mix(in srgb, var(--info) 20%, transparent);
      }
      .app-btn-ghost {
        border-color: transparent;
        background-color: transparent;
        color: var(--accent);
      }
      .app-btn-ghost:hover {
        background-color: color-mix(in srgb, var(--accent) 10%, transparent);
      }
      .app-btn-ghost-danger {
        border-color: transparent;
        background-color: transparent;
        color: var(--error);
      }
      .app-btn-ghost-danger:hover {
        background-color: color-mix(in srgb, var(--error) 10%, transparent);
      }
      .app-btn-ghost-warning {
        border-color: transparent;
        background-color: transparent;
        color: var(--warning);
      }
      .app-btn-ghost-warning:hover {
        background-color: color-mix(in srgb, var(--warning) 10%, transparent);
      }
      .app-btn-ghost-success {
        border-color: transparent;
        background-color: transparent;
        color: var(--success);
      }
      .app-btn-ghost-success:hover {
        background-color: color-mix(in srgb, var(--success) 10%, transparent);
      }
      .app-btn-ghost-info {
        border-color: transparent;
        background-color: transparent;
        color: var(--info);
      }
      .app-btn-ghost-info:hover {
        background-color: color-mix(in srgb, var(--info) 10%, transparent);
      }
      .app-btn-sm {
        padding: 0.25rem 0.5rem;
        font-size: 0.875rem;
      }
      .app-btn-md {
        padding: 0.5rem 1rem;
        font-size: 1rem;
      }
      .app-btn-lg {
        padding: 0.75rem 1.5rem;
        font-size: 1.125rem;
      }
      .app-btn-full {
        width: 100%;
      }
      .app-btn-disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
      .app-btn-icon {
        font-size: 1.25rem;
      }
      .app-btn-spinner {
        width: 1rem;
        height: 1rem;
        border: 2px solid currentColor;
        border-top-color: transparent;
        border-radius: 50%;
        animation: spin 0.6s linear infinite;
      }
      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }
      .app-btn-primary {
        border-color: var(--accent);
        background-color: var(--accent);
        color: var(--text-on-accent);
      }
      .app-btn-primary:hover {
        background-color: var(--accent-hover);
        border-color: var(--accent-hover);
      }
      .app-btn-secondary {
        border-color: var(--border-color);
        background-color: var(--bg-elevated);
        color: var(--text-primary);
      }
      .app-btn-secondary:hover {
        background-color: var(--bg-hover);
      }
    `,
  ],
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
    const style = this.buttonStyle || "solid";
    const variant = this.variant || "primary";
    const styleVariant =
      style === "solid" && variant === "primary"
        ? "app-btn-solid"
        : `app-btn-${style}${variant !== "primary" ? `-${variant}` : ""}`;
    return [
      "app-btn",
      styleVariant,
      `app-btn-${this.size || "md"}`,
      this.fullWidth ? "app-btn-full" : "",
      this.disabled || this.loading ? "app-btn-disabled" : "",
    ]
      .filter(Boolean)
      .join(" ");
  }
}

registerSchemaComponent("app-button", ButtonComponent);
