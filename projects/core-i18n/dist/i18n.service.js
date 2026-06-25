export class I18nService {
    _locale = "en";
    _translations = {};
    get locale() {
        return this._locale;
    }
    get translations() {
        return this._translations;
    }
    setLocale(locale) {
        this._locale = locale;
    }
    loadTranslations(locale, translations) {
        this._translations[locale] = translations;
    }
    t(key, params) {
        const localeTranslations = this._translations[this._locale] || {};
        let value = localeTranslations[key] || key;
        if (params) {
            Object.entries(params).forEach(([paramKey, paramValue]) => {
                value = value.replace(new RegExp(`{{${paramKey}}}`, "g"), paramValue);
            });
        }
        return value;
    }
    hasTranslation(key) {
        const localeTranslations = this._translations[this._locale] || {};
        return key in localeTranslations;
    }
    getAvailableLocales() {
        return Object.keys(this._translations);
    }
}
