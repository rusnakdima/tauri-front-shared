import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  signal,
  OnInit,
  OnDestroy,
} from "@angular/core";
import { CommonModule } from "@angular/common";

export type ToastType = "success" | "error" | "warning" | "info";

@Component({
  selector: "app-toast",
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./toast.component.html",
  styleUrl: "./toast.component.css",
})
export class ToastComponent implements OnInit, OnDestroy {
  @Input() type: ToastType = "info";
  @Input() message = "";
  @Input() duration = 3000;
  @Input() autoDismiss = true;
  @Input() show = false;

  @Output() dismissed = new EventEmitter<void>();

  isVisible = signal(false);
  private timeoutId?: ReturnType<typeof setTimeout>;

  ngOnInit(): void {
    if (this.show && this.autoDismiss) {
      this.startTimer();
    }
  }

  ngOnDestroy(): void {
    this.clearTimer();
  }

  get icon(): string {
    switch (this.type) {
      case "success":
        return "check_circle";
      case "error":
        return "error";
      case "warning":
        return "warning";
      case "info":
        return "info";
    }
  }

  dismiss(): void {
    this.isVisible.set(false);
    this.clearTimer();
    this.dismissed.emit();
  }

  private startTimer(): void {
    this.isVisible.set(true);
    if (this.duration > 0) {
      this.timeoutId = setTimeout(() => this.dismiss(), this.duration);
    }
  }

  private clearTimer(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = undefined;
    }
  }
}
