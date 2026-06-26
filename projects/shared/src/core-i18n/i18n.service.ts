export class I18nService {
  private _locale: string = "en";
  private _translations: Record<string, Record<string, string>> = {};

  get locale(): string {
    return this._locale;
  }

  get translations(): Record<string, Record<string, string>> {
    return this._translations;
  }

  setLocale(locale: string): void {
    this._locale = locale;
  }

  loadTranslations(locale: string, translations: Record<string, string>): void {
    this._translations[locale] = translations;
  }

  t(key: string, params?: Record<string, string>): string {
    const localeTranslations = this._translations[this._locale] || {};
    let value = localeTranslations[key] || key;

    if (params) {
      Object.entries(params).forEach(([paramKey, paramValue]) => {
        value = value.replace(new RegExp(`{{${paramKey}}}`, "g"), paramValue);
      });
    }

    return value;
  }

  hasTranslation(key: string): boolean {
    const localeTranslations = this._translations[this._locale] || {};
    return key in localeTranslations;
  }

  getAvailableLocales(): string[] {
    return Object.keys(this._translations);
  }
}
