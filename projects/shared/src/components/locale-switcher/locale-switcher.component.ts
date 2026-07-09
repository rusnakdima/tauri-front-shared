import { Component, inject, Input, Output, EventEmitter } from "@angular/core";
import { I18nService, type Locale } from "../../core/lib/i18n/i18n.service";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";

@Component({
  selector: "app-locale-switcher",
  standalone: true,
  template: `
    <div class="locale-selector">
      <select
        [value]="currentLocale"
        (change)="handleChange($event)"
        [attr.aria-label]="label"
      >
        @for (locale of availableLocales; track locale) {
          <option [value]="locale">
            {{ localeDisplay(locale) }}
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
      .locale-selector {
        display: flex;
        align-items: center;
        position: relative;
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
        min-width: 80px;
        text-transform: uppercase;
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
export class LocaleSwitcherComponent {
  private i18n = inject(I18nService);

  @Input() label = "Language";
  @Output() localeChanged = new EventEmitter<Locale>();

  get currentLocale(): Locale {
    return this.i18n.locale();
  }

  get availableLocales(): Locale[] {
    return this.i18n.getAvailableLocales();
  }

  localeDisplay(locale: Locale): string {
    const labels: Record<Locale, string> = { en: "EN", ru: "RU" };
    return labels[locale] ?? locale.toUpperCase();
  }

  handleChange(e: Event): void {
    const value = (e.target as HTMLSelectElement).value as Locale;
    this.i18n.setLocale(value);
    this.localeChanged.emit(value);
  }
}

registerSchemaComponent("app-locale-switcher", LocaleSwitcherComponent);
