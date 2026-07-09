import {
  Component,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  ViewChild,
  AfterViewInit,
} from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";

@Component({
  selector: "app-text-input",
  standalone: true,
  template: `
    <div class="text-input-wrapper">
      <textarea
        #textareaEl
        [placeholder]="placeholder"
        [value]="value"
        [attr.maxlength]="maxChars || null"
        (input)="handleInput($event)"
        (focus)="focused = true"
        (blur)="focused = false"
        class="text-input"
        [class.focused]="focused"
      ></textarea>
      @if (clearable && value) {
        <button class="clear-btn" (click)="clear()" aria-label="Clear">
          &times;
        </button>
      }
      @if (maxChars) {
        <span class="char-count">{{ value.length }}/{{ maxChars }}</span>
      }
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        position: relative;
      }
      .text-input-wrapper {
        position: relative;
      }
      .text-input {
        width: 100%;
        padding: 0.5rem 0.75rem;
        border-radius: 0.5rem;
        border: 1px solid var(--border-color);
        background-color: var(--bg-primary);
        color: var(--text-primary);
        box-sizing: border-box;
        outline: none;
        font-family: inherit;
        resize: none;
        min-height: 40px;
      }
      .text-input:focus,
      .text-input.focused {
        border-color: var(--accent);
      }
      .text-input::placeholder {
        color: var(--text-muted);
      }
      .clear-btn {
        position: absolute;
        right: 0.5rem;
        top: 0.5rem;
        background: none;
        border: none;
        cursor: pointer;
        color: var(--text-secondary);
        font-size: 1.25rem;
        padding: 0;
        line-height: 1;
      }
      .clear-btn:hover {
        color: var(--text-primary);
      }
      .char-count {
        position: absolute;
        right: 0.5rem;
        bottom: 0.25rem;
        font-size: 0.6875rem;
        color: var(--text-muted);
      }
    `,
  ],
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
  @Output() input = new EventEmitter<string>();
  focused = false;

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
