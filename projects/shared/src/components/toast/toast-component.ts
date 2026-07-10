import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  OnDestroy,
  SimpleChanges,
} from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";

export type ToastType = "success" | "error" | "info" | "warning" | "default";

@Component({
  selector: "app-toast",
  standalone: true,
  imports: [],
  templateUrl: "./toast-component.html",
  styleUrls: ["./toast-component.css"],
})
export class ToastComponent implements OnChanges, OnDestroy {
  @Input() message = "";
  @Input() visible = false;
  @Input() type: ToastType = "info";
  @Output() dismissed = new EventEmitter<void>();

  private timeout: ReturnType<typeof setTimeout> | null = null;

  get toastClasses(): string[] {
    const classes = [
      "toast",
      `toast-${this.type || "info"}`,
      "fixed",
      "bottom-6",
      "right-6",
      "z-[9999]",
      "flex",
      "items-center",
      "gap-2",
      "p-3",
      "rounded-lg",
      "bg-[color:var(--bg-elevated)]",
      "text-[color:var(--text-primary)]",
      "border",
      "border-[color:var(--border-color)]",
      "border-l-[3px]",
      "shadow-lg",
      "text-sm",
      "max-w-96",
      "translate-y-0",
      "opacity-100",
      "transition-all",
      "duration-300",
      this.borderColorClass,
    ];
    if (!this.visible) {
      classes.push("hidden");
    }
    return classes;
  }

  get borderColorClass(): string {
    switch (this.type) {
      case "success":
        return "border-l-[color:var(--success)]";
      case "error":
        return "border-l-[color:var(--error)]";
      case "warning":
        return "border-l-[color:var(--warning)]";
      case "info":
        return "border-l-[color:var(--info)]";
      default:
        return "border-l-[color:var(--border-color)]";
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["visible"] && this.visible) {
      this.clearTimeout();
      this.timeout = setTimeout(() => this.handleClose(), 4000);
    }
  }

  ngOnDestroy() {
    this.clearTimeout();
  }

  private clearTimeout() {
    if (this.timeout !== null) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
  }

  handleClose() {
    this.visible = false;
    this.clearTimeout();
    this.dismissed.emit();
  }
}

registerSchemaComponent("app-toast", ToastComponent);
