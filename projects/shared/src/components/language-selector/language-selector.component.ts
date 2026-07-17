import { Component, Input, Output, EventEmitter, signal } from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";
import { parseJsonOrDefault } from "../../utils/json";
import { IconComponent } from "../icons/icons.component";

export interface LanguageOption {
  value: string;
  label: string;
}

@Component({
  selector: "app-language-selector",
  standalone: true,
  imports: [IconComponent],
  template: `
    <div class="flex flex-col gap-1.5">
      @if (label) {
        <label class="text-sm font-medium text-on-surface">{{ label }}</label>
      }
      <div class="relative">
        <select
          [value]="value"
          (change)="handleChange($event)"
          [disabled]="disabled"
          [attr.aria-labelledby]="labelId || null"
          class="w-full h-10 pl-4 pr-10 appearance-none rounded-md bg-surface-container-low border border-outline text-on-surface cursor-pointer transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary disabled:opacity-50 disabled:cursor-not-allowed"
          [class.border-error]="!!error"
          [class.ring-error]="focused() && error"
          (focus)="focused.set(true)"
          (blur)="focused.set(false)"
        >
          @if (placeholder && !value) {
            <option value="" disabled selected>{{ placeholder }}</option>
          }
          @for (lang of parsedLanguages; track lang.value) {
            <option [value]="lang.value" [selected]="lang.value === value">
              {{ lang.label }}
            </option>
          }
        </select>
        <div
          class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant"
        >
          <app-icon icon="chevron-down" [size]="18" />
        </div>
      </div>
      @if (error) {
        <span class="text-sm text-error">{{ error }}</span>
      }
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
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
  @Input() disabled = false;
  @Input() error = "";
  @Input() classes = "";
  @Input() sourceLang = ""; // for source selector
  @Input() targetLang = ""; // for target selector
  @Output() changed = new EventEmitter<string>();

  focused = signal(false);

  get parsedLanguages(): LanguageOption[] {
    const arr = parseJsonOrDefault<LanguageOption>(this.languages);
    // Handle string arrays (e.g., ["en", "es", "fr"])
    if (arr.length > 0 && typeof arr[0] === "string") {
      return (arr as unknown as string[]).map((code) => ({
        value: code,
        label: code.toUpperCase(),
      }));
    }
    return arr.map((lang: any) => ({
      value: lang.value ?? lang.code ?? "",
      label: lang.label ?? lang.name ?? lang.code ?? "",
    }));
  }

  handleChange(e: Event) {
    this.value = (e.target as HTMLSelectElement).value;
    this.changed.emit(this.value);
  }
}

registerSchemaComponent("app-language-selector", LanguageSelectorComponent);
