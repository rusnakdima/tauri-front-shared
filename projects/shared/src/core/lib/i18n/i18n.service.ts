import { Injectable, signal } from "@angular/core";
import { EN, RU } from "./translations";

export type Locale = "en" | "ru";

const TRANSLATIONS: Record<Locale, Record<string, string>> = {
  en: EN,
  ru: RU,
};

@Injectable({ providedIn: "root" })
export class I18nService {
  private readonly _locale = signal<Locale>("en");

  get locale() {
    return this._locale.asReadonly();
  }

  get translations() {
    return TRANSLATIONS[this._locale()];
  }

  setLocale(locale: Locale): void {
    this._locale.set(locale);
  }

  /**
   * Translate a key. Falls back to English, then to the key itself.
   */
  t(key: string): string {
    const locale = this._locale();
    return TRANSLATIONS[locale]?.[key] ?? TRANSLATIONS["en"]?.[key] ?? key;
  }

  /**
   * Get all available locales.
   */
  getAvailableLocales(): Locale[] {
    return ["en", "ru"];
  }
}
