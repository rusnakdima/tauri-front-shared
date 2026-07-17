import {
  Component,
  ChangeDetectionStrategy,
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
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    @if (open) {
      <div
        class="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-4 py-3 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 text-sm rounded-2xl shadow-xl transition-colors"
        role="status"
      >
        <span class="font-medium">{{ message }}</span>
        @if (action) {
          <button
            class="text-indigo-400 dark:text-indigo-600 font-semibold hover:underline"
            (click)="handleAction()"
          >
            {{ action }}
          </button>
        }
        <button
          class="ml-2 p-1 hover:bg-white/10 dark:hover:bg-black/10 rounded-full"
          (click)="dismiss()"
          aria-label="Dismiss"
        >
          <span class="material-symbols-rounded text-sm">close</span>
        </button>
      </div>
    }
  `,
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
