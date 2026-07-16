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

export type SnackbarType = "default" | "success" | "error" | "warning" | "info";

@Component({
  selector: "app-snackbar",
  standalone: true,
  imports: [],
  templateUrl: "./snackbar.component.html",
  styleUrls: ["./snackbar.component.scss"],
})
export class SnackbarComponent implements OnChanges, OnDestroy {
  @Input() message = "";
  @Input() action = "";
  @Input() duration = 4000;
  @Input() type: SnackbarType = "default";
  @Input() open = false;
  @Output() dismissed = new EventEmitter<void>();
  @Output() actioned = new EventEmitter<void>();

  private timer: number | null = null;

  ngOnChanges(changes: SimpleChanges) {
    if (changes["open"] && this.open) {
      this.startTimer();
    }
  }

  ngOnDestroy() {
    this.clearTimer();
  }

  private startTimer() {
    this.clearTimer();
    this.timer = window.setTimeout(() => this.dismiss(), this.duration);
  }

  private clearTimer() {
    if (this.timer !== null) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  dismiss() {
    this.open = false;
    this.clearTimer();
    this.dismissed.emit();
  }

  handleAction() {
    this.actioned.emit();
    this.dismiss();
  }
}

registerSchemaComponent("app-snackbar", SnackbarComponent);
