import { Component, Input, Output, EventEmitter } from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";

export interface LanguageOption {
  value: string;
  label: string;
}

@Component({
  selector: "app-language-selector",
  standalone: true,
  template: `
    <div class="lang-selector">
      @if (label) {
        <label [attr.id]="labelId" class="lang-label">{{ label }}</label>
      }
      <select
        [value]="value"
        (change)="handleChange($event)"
        [attr.aria-labelledby]="labelId || null"
      >
        @for (lang of parsedLanguages; track lang.value) {
          <option [value]="lang.value" [selected]="lang.value === value">
            {{ lang.label }}
          </option>
        }
      </select>
      <svg
        class="chevron"
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
    </div>
  `,
  styles: [
    `
      :host {
        display: inline-flex;
      }
      .lang-selector {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        position: relative;
      }
      .lang-label {
        font-size: 0.875rem;
        color: var(--text-secondary);
        white-space: nowrap;
      }
      select {
        padding: 0.375rem 2rem 0.375rem 0.75rem;
        border-radius: 0.5rem;
        border: 1px solid var(--border-color);
        background: var(--bg-elevated);
        color: var(--text-primary);
        font-size: 0.875rem;
        cursor: pointer;
        appearance: none;
        -webkit-appearance: none;
        min-width: 120px;
      }
      select:focus {
        outline: none;
        border-color: var(--accent);
      }
      .chevron {
        position: absolute;
        right: 0.5rem;
        top: 50%;
        transform: translateY(-50%);
        pointer-events: none;
        color: var(--text-secondary);
      }
    `,
  ],
})
export class LanguageSelectorComponent {
  @Input() label = "";
  @Input() labelId = "";
  @Input() value = "";
  @Input() languages: LanguageOption[] | string = [];
  @Input() placeholder = "";
  @Input() width = "";
  @Output() changed = new EventEmitter<string>();

  get parsedLanguages(): LanguageOption[] {
    const raw = Array.isArray(this.languages) ? this.languages : [];
    try {
      const parsed = Array.isArray(this.languages)
        ? this.languages
        : JSON.parse(this.languages);
      return parsed.map((lang: any) => ({
        value: lang.value ?? lang.code ?? "",
        label: lang.label ?? lang.name ?? lang.code ?? "",
      }));
    } catch {
      return [];
    }
  }

  handleChange(e: Event) {
    this.value = (e.target as HTMLSelectElement).value;
    this.changed.emit(this.value);
  }
}

registerSchemaComponent("app-language-selector", LanguageSelectorComponent);
