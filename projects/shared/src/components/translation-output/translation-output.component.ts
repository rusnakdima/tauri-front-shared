import { Component, Input, Output, EventEmitter } from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";

@Component({
  selector: "app-translation-output",
  standalone: true,
  template: `
    <div class="output-wrapper">
      <textarea
        #outputEl
        class="output-textarea"
        [value]="value"
        [placeholder]="placeholder || 'Translation will appear here...'"
        readonly
      ></textarea>
      @if (showCopyButton && value) {
        <button class="copy-btn" (click)="copyToClipboard()" aria-label="Copy">
          @if (isCopied) {
            <span class="copied-text">Copied!</span>
          } @else {
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path
                d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
              ></path>
            </svg>
          }
        </button>
      }
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        position: relative;
      }
      .output-wrapper {
        position: relative;
      }
      .output-textarea {
        width: 100%;
        padding: 0.75rem;
        border-radius: 0.5rem;
        border: 1px solid var(--border-color);
        background-color: var(--bg-primary);
        color: var(--text-primary);
        box-sizing: border-box;
        font-family: inherit;
        resize: none;
        min-height: 80px;
        cursor: default;
      }
      .output-textarea::placeholder {
        color: var(--text-muted);
      }
      .copy-btn {
        position: absolute;
        right: 0.5rem;
        top: 0.5rem;
        display: flex;
        align-items: center;
        gap: 0.25rem;
        padding: 0.375rem 0.5rem;
        border-radius: 0.375rem;
        border: 1px solid var(--border-color);
        background: var(--bg-elevated);
        color: var(--text-secondary);
        cursor: pointer;
        transition: all 0.15s;
        font-size: 0.75rem;
      }
      .copy-btn:hover {
        background: var(--bg-hover);
        color: var(--text-primary);
      }
      .copied-text {
        color: var(--success);
      }
    `,
  ],
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
  @Output() copied = new EventEmitter<void>();
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
