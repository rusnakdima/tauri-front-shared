import { Injectable, signal } from '@angular/core';

/**
 * Window-level global state for Translator app.
 * Exposes source/target language codes as signals so any service
 * (including TranslationService) can read them without prop-drilling.
 */
@Injectable({ providedIn: 'root' })
export class GlobalStateService {
  private static _instance: GlobalStateService | null = null;

  static get instance(): GlobalStateService {
    if (!GlobalStateService._instance) {
      GlobalStateService._instance = new GlobalStateService();
    }
    return GlobalStateService._instance;
  }

  private readonly _sourceLang = signal<string>('en');
  private readonly _targetLang = signal<string>('ru');
  private readonly _appLocale = signal<'en' | 'ru'>('en');

  get sourceLang() { return this._sourceLang.asReadonly(); }
  get targetLang() { return this._targetLang.asReadonly(); }
  get appLocale() { return this._appLocale.asReadonly(); }

  setSourceLang(code: string) { this._sourceLang.set(code); }
  setTargetLang(code: string) { this._targetLang.set(code); }
  setAppLocale(locale: 'en' | 'ru') { this._appLocale.set(locale); }

  swapLanguages() {
    const src = this._sourceLang();
    const tgt = this._targetLang();
    this._sourceLang.set(tgt);
    this._targetLang.set(src);
  }
}
