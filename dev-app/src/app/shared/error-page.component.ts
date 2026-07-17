import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from "@angular/core";

@Component({
  selector: "app-error-page",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="flex items-center justify-center min-h-screen bg-neutral-50 dark:bg-neutral-900 p-8"
    >
      <div
        class="max-w-lg bg-white dark:bg-neutral-900 rounded-3xl p-8 shadow-xl border border-neutral-100 dark:border-neutral-800 space-y-4"
      >
        @if (code) {
          <p class="text-sm font-medium text-indigo-600">{{ code }}</p>
        }
        <h2 class="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
          {{ title }}
        </h2>
        @if (message) {
          <p class="text-neutral-600 dark:text-neutral-400">{{ message }}</p>
        }
        <div class="pt-2">
          <button
            type="button"
            (click)="buttonAction.emit()"
            class="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full text-sm font-medium transition-colors"
          >
            {{ buttonLabel }}
          </button>
        </div>
      </div>
    </div>
  `,
})
export class ErrorPageComponent {
  @Input() code = "";
  @Input() title = "";
  @Input() message = "";
  @Input() buttonLabel = "Go home";
  @Output() buttonAction = new EventEmitter<void>();
}
