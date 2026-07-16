import {
  Component,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  ViewChild,
  AfterViewInit,
  signal,
} from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";

@Component({
  selector: "app-text-input",
  standalone: true,
  template: `
    <div class="flex flex-col gap-1.5">
      @if (label) {
        <label class="text-sm font-medium text-on-surface">{{ label }}</label>
      }
      <div
        class="relative flex items-start rounded-md bg-surface-container-low border transition-colors duration-200"
        [class.border-outline]="!focused() && !error"
        [class.border-primary]="focused() && !error"
        [class.border-error]="!!error"
        [class.ring-1]="focused()"
        [class.ring-primary]="focused() && !error"
        [class.ring-error]="focused() && error"
      >
        <textarea
          #textareaEl
          [placeholder]="placeholder"
          [value]="value"
          [attr.maxlength]="maxChars || null"
          [rows]="rows"
          [disabled]="disabled"
          (input)="handleInput($event)"
          (focus)="focused.set(true)"
          (blur)="focused.set(false)"
          class="flex-1 px-4 py-3 bg-transparent text-on-surface placeholder:text-on-surface-variant outline-none resize-none disabled:opacity-50 disabled:cursor-not-allowed rounded-md"
        ></textarea>
        @if (clearable && value) {
          <button
            type="button"
            class="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-[--state-hover] active:bg-[--state-pressed] transition-colors"
            (click)="clear()"
            aria-label="Clear"
          >
            <span class="text-lg">&times;</span>
          </button>
        }
      </div>
      <div class="flex justify-between items-center">
        @if (error) {
          <span class="text-sm text-error">{{ error }}</span>
        }
        @if (maxChars) {
          <span class="text-sm text-on-surface-variant ml-auto">{{ value.length }}/{{ maxChars }}</span>
        }
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `],
})
export class TextInputComponent implements AfterViewInit {
  @ViewChild("textareaEl") textareaEl!: ElementRef<HTMLTextAreaElement>;
  @Input() value = "";
  @Input() placeholder = "";
  @Input() clearable = false;
  @Input() maxChars = 0;
  @Input() autofocus = false;
  @Input() height = "";
  @Input() label = "";
  @Input() multiline = true;
  @Input() rows = 3;
  @Input() width = "";
  @Input() disabled = false;
  @Input() error = "";
  @Input() classes = "";
  @Output() input = new EventEmitter<string>();

  focused = signal(false);

  ngAfterViewInit() {
    if (this.autofocus) {
      setTimeout(() => this.textareaEl.nativeElement.focus());
    }
  }

  handleInput(e: Event) {
    this.value = (e.target as HTMLTextAreaElement).value;
    this.input.emit(this.value);
    this.autoResize();
  }

  private autoResize() {
    if (this.textareaEl) {
      const el = this.textareaEl.nativeElement;
      el.style.height = "auto";
      el.style.height = el.scrollHeight + "px";
    }
  }

  clear() {
    this.value = "";
    this.input.emit("");
    if (this.textareaEl) {
      this.textareaEl.nativeElement.style.height = "auto";
    }
  }
}

registerSchemaComponent("app-text-input", TextInputComponent);
