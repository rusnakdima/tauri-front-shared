import { Component, Input, Output, EventEmitter, signal } from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";
import { IconComponent } from "../icons/icons.component";

@Component({
  selector: "app-translation-output",
  standalone: true,
  imports: [IconComponent],
  template: `
    <div class="flex flex-col gap-1.5">
      <div
        class="relative flex items-start rounded-md bg-surface-container-low border border-outline transition-colors duration-200"
        [class.ring-1]="focused()"
        [class.ring-primary]="focused()"
      >
        <textarea
          #outputEl
          [value]="value"
          [placeholder]="placeholder || 'Translation will appear here...'"
          [disabled]="true"
          [rows]="rows"
          (focus)="focused.set(true)"
          (blur)="focused.set(false)"
          class="flex-1 px-4 py-3 bg-transparent text-on-surface placeholder:text-on-surface-variant outline-none resize-none rounded-md cursor-default"
        ></textarea>
        @if (loading) {
          <div class="absolute right-3 top-1/2 -translate-y-1/2">
            <div class="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        }
        @if (showCopyButton && value && !loading) {
          <button
            type="button"
            class="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-[--state-hover] active:bg-[--state-pressed] transition-colors"
            (click)="copyToClipboard()"
            aria-label="Copy"
          >
            @if (isCopied) {
              <span class="text-sm text-success font-medium">Copied!</span>
            } @else {
              <app-icon icon="copy" [size]="16" />
            }
          </button>
        }
      </div>
      <div class="flex justify-between items-center">
        @if (showConfidence && confidence) {
          <span class="text-xs text-on-surface-variant">
            Confidence: {{ (confidence * 100).toFixed(0) }}%
          </span>
        }
        @if (error) {
          <span class="text-sm text-error">{{ error }}</span>
        }
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
    textarea:disabled {
      cursor: default;
    }
  `],
})
export class TranslationOutputComponent {
  @Input() value = "";
  @Input() placeholder = "";
  @Input() loading = false;
  @Input() showConfidence = false;
  @Input() showCopyButton = true;
  @Input() confidence = 0;
  @Input() height = "";
  @Input() width = "";
  @Input() error = "";
  @Input() rows = 4;
  @Input() classes = "";
  @Output() copied = new EventEmitter<void>();

  focused = signal(false);
  isCopied = false;

  async copyToClipboard() {
    try {
      await navigator.clipboard.writeText(this.value);
      this.isCopied = true;
      this.copied.emit();
      setTimeout(() => (this.isCopied = false), 2000);
    } catch {
      /* clipboard not available */
    }
  }
}

registerSchemaComponent("app-translation-output", TranslationOutputComponent);
