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

export type SnackbarType = "default" | "success" | "error" | "warning" | "info";

@Component({
  selector: "app-snackbar",
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./snackbar.component.html",
  styleUrl: "./snackbar.component.css",
})
export class SnackbarComponent implements OnInit, OnDestroy {
  @Input() type: SnackbarType = "default";
  @Input() message = "";
  @Input() duration = 2500;
  @Input() autoDismiss = true;

  @Output() dismissed = new EventEmitter<void>();

  isVisible = signal(false);
  private timeoutId?: ReturnType<typeof setTimeout>;

  ngOnInit(): void {
    this.isVisible.set(true);
    if (this.autoDismiss && this.duration > 0) {
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
      default:
        return "info";
    }
  }

  dismiss(): void {
    this.isVisible.set(false);
    this.clearTimer();
    setTimeout(() => this.dismissed.emit(), 200);
  }

  private startTimer(): void {
    this.timeoutId = setTimeout(() => this.dismiss(), this.duration);
  }

  private clearTimer(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = undefined;
    }
  }
}
