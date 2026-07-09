import { Component, Input } from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";

@Component({
  selector: "app-json-view",
  standalone: true,
  template: `<div class="json-container" [innerHTML]="safeHtml"></div>`,
  styles: [
    `
      :host {
        display: block;
      }
      .json-container {
        background-color: var(--bg-secondary);
        border: 1px solid var(--border-color);
        border-radius: 0.5rem;
        padding: 1rem;
        font-family: monospace;
        font-size: 0.875rem;
        overflow-x: auto;
        white-space: pre-wrap;
        word-break: break-word;
      }
      .json-key {
        color: var(--accent);
      }
      .json-string {
        color: var(--success);
      }
      .json-number {
        color: var(--warning);
      }
      .json-boolean {
        color: var(--error);
      }
      .json-null {
        color: var(--text-muted);
      }
    `,
  ],
})
export class JsonViewComponent {
  @Input() data: unknown = {};

  constructor(private sanitizer: DomSanitizer) {}

  get safeHtml(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(this.formattedHtml);
  }

  private get formattedHtml(): string {
    const formatted = JSON.stringify(this.data, null, 2);
    return this.syntaxHighlight(formatted);
  }

  private syntaxHighlight(json: string): string {
    return json
      .replace(/("(?:[^"\\]|\\.)*")\s*:/g, '<span class="json-key">$1</span>:')
      .replace(/"((?:[^"\\]|\\.)*)"/g, '<span class="json-string">"$1"</span>')
      .replace(
        /\b(-?\d+\.?\d*(?:[eE][+-]?\d+)?)\b/g,
        '<span class="json-number">$1</span>',
      )
      .replace(/\b(true|false)\b/g, '<span class="json-boolean">$1</span>')
      .replace(/\bnull\b/g, '<span class="json-null">null</span>');
  }
}

registerSchemaComponent("app-json-view", JsonViewComponent);
