import * as i0 from '@angular/core';
import { signal, Injectable, inject, EventEmitter, Output, Input, Component, HostListener, ViewChild, computed, Injector, Optional, effect, CUSTOM_ELEMENTS_SCHEMA, Directive } from '@angular/core';
import * as i1 from '@angular/material/icon';
import { MatIconModule } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import * as i1$1 from '@angular/common';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Subject, firstValueFrom } from 'rxjs';
import { invoke } from '@tauri-apps/api/core';
import * as i1$2 from '@angular/common/http';
import { Router } from '@angular/router';

const SCHEMA_COMPONENT_MAP = new Map();
function registerSchemaComponent(selector, component) {
    SCHEMA_COMPONENT_MAP.set(selector, component);
}

// Flat key-value translation maps for i18n
// All schema text should use i18nKey referencing these keys
const EN = {
    // App-level
    "app.title": "Translator",
    "app.subtitle": "Translate text between 15 languages instantly",
    // Header
    "header.shortcuts": "Shortcuts",
    "header.theme": "Theme",
    // Labels
    "label.from": "From",
    "label.to": "To",
    // Buttons
    "button.translate": "Translate",
    "button.clear": "Clear",
    // Footer
    "footer.text": "Translator - Translate text between 15 languages instantly",
    // Shortcuts overlay
    "shortcuts.title": "Keyboard Shortcuts",
    "shortcuts.description": "Press the following keys to trigger actions",
    // App language selector
    "lang.selector.label": "Language",
    // Input placeholders
    "input.placeholder": "Enter text to translate...",
    "output.placeholder": "Translation will appear here as you type...",
};
const RU = {
    // App-level
    "app.title": "Переводчик",
    "app.subtitle": "Переводите текст между 15 языками мгновенно",
    // Header
    "header.shortcuts": "Ярлыки",
    "header.theme": "Тема",
    // Labels
    "label.from": "С",
    "label.to": "На",
    // Buttons
    "button.translate": "Перевести",
    "button.clear": "Очистить",
    // Footer
    "footer.text": "Переводчик — переводите текст между 15 языками мгновенно",
    // Shortcuts overlay
    "shortcuts.title": "Горячие клавиши",
    "shortcuts.description": "Нажмите следующие клавиши для выполнения действий",
    // App language selector
    "lang.selector.label": "Язык",
    // Input placeholders
    "input.placeholder": "Введите текст для перевода...",
    "output.placeholder": "Перевод появится здесь по мере ввода...",
};

const TRANSLATIONS = {
    en: EN,
    ru: RU,
};
class I18nService {
    _locale = signal("en", ...(ngDevMode ? [{ debugName: "_locale" }] : []));
    get locale() {
        return this._locale.asReadonly();
    }
    get translations() {
        return TRANSLATIONS[this._locale()];
    }
    setLocale(locale) {
        this._locale.set(locale);
    }
    /**
     * Translate a key. Falls back to English, then to the key itself.
     */
    t(key) {
        const locale = this._locale();
        return TRANSLATIONS[locale]?.[key] ?? TRANSLATIONS["en"]?.[key] ?? key;
    }
    /**
     * Get all available locales.
     */
    getAvailableLocales() {
        return ["en", "ru"];
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: I18nService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: I18nService, providedIn: "root" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: I18nService, decorators: [{
            type: Injectable,
            args: [{ providedIn: "root" }]
        }] });

class ButtonComponent {
    i18n = inject(I18nService);
    variant = "primary";
    buttonStyle = "solid";
    size = "md";
    disabled = false;
    loading = false;
    icon = null;
    iconPosition = "left";
    fullWidth = false;
    type = "button";
    label = "";
    set i18nKey(value) {
        if (value !== undefined && value !== null) {
            this.label = this.i18n.t(value);
        }
    }
    classes = "";
    ariaLabel = "";
    align = "";
    direction = "";
    height = "";
    justify = "";
    layout = "";
    width = "";
    clicked = new EventEmitter();
    handleClick(e) {
        if (this.disabled || this.loading) {
            e.preventDefault();
            e.stopPropagation();
            return;
        }
        this.clicked.emit(e);
    }
    getButtonClass() {
        const style = this.buttonStyle || "solid";
        const variant = this.variant || "primary";
        const styleVariant = style === "solid" && variant === "primary"
            ? "app-btn-solid"
            : `app-btn-${style}${variant !== "primary" ? `-${variant}` : ""}`;
        return [
            "app-btn",
            styleVariant,
            `app-btn-${this.size || "md"}`,
            this.fullWidth ? "app-btn-full" : "",
            this.disabled || this.loading ? "app-btn-disabled" : "",
        ]
            .filter(Boolean)
            .join(" ");
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: ButtonComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.25", type: ButtonComponent, isStandalone: true, selector: "app-button", inputs: { variant: "variant", buttonStyle: "buttonStyle", size: "size", disabled: "disabled", loading: "loading", icon: "icon", iconPosition: "iconPosition", fullWidth: "fullWidth", type: "type", label: "label", i18nKey: "i18nKey", classes: "classes", ariaLabel: "ariaLabel", align: "align", direction: "direction", height: "height", justify: "justify", layout: "layout", width: "width" }, outputs: { clicked: "clicked" }, ngImport: i0, template: `
    <button
      [attr.type]="type || 'button'"
      [class]="getButtonClass()"
      [disabled]="disabled || loading"
      (click)="handleClick($event)"
    >
      @if (loading) {
        <span class="app-btn-spinner"></span>
      } @else {
        @if (icon && iconPosition === "left") {
          <mat-icon class="app-btn-icon" [fontIcon]="icon" />
        }
        @if (label) {
          <span>{{ label }}</span>
        } @else {
          <ng-content></ng-content>
        }
        @if (icon && iconPosition === "right") {
          <mat-icon class="app-btn-icon" [fontIcon]="icon" />
        }
      }
    </button>
  `, isInline: true, styles: [":host{display:inline-flex}button{display:inline-flex;align-items:center;justify-content:center;gap:.5rem;border-radius:.5rem;border:1px solid;padding:.5rem 1rem;text-align:center;font-weight:500;transition:all .15s;cursor:pointer;border-width:1px}button:disabled{opacity:.5;cursor:not-allowed}.app-btn-solid{border-color:var(--accent);background-color:var(--accent);color:var(--text-on-accent)}.app-btn-solid:hover{background-color:var(--accent-hover);border-color:var(--accent-hover)}.app-btn-solid-danger{border-color:var(--error);background-color:var(--error);color:var(--text-on-error)}.app-btn-solid-danger:hover{opacity:.9}.app-btn-solid-warning{border-color:var(--warning);background-color:var(--warning);color:var(--text-on-warning)}.app-btn-solid-warning:hover{opacity:.9}.app-btn-solid-success{border-color:var(--success);background-color:var(--success);color:var(--text-on-success)}.app-btn-solid-success:hover{opacity:.9}.app-btn-solid-info{border-color:var(--info);background-color:var(--info);color:var(--text-on-info)}.app-btn-solid-info:hover{opacity:.9}.app-btn-outline{border-color:var(--accent);background-color:transparent;color:var(--accent)}.app-btn-outline:hover{background-color:color-mix(in srgb,var(--accent) 10%,transparent)}.app-btn-outline-danger{border-color:var(--error);background-color:transparent;color:var(--error)}.app-btn-outline-danger:hover{background-color:color-mix(in srgb,var(--error) 10%,transparent)}.app-btn-outline-warning{border-color:var(--warning);background-color:transparent;color:var(--warning)}.app-btn-outline-warning:hover{background-color:color-mix(in srgb,var(--warning) 10%,transparent)}.app-btn-outline-success{border-color:var(--success);background-color:transparent;color:var(--success)}.app-btn-outline-success:hover{background-color:color-mix(in srgb,var(--success) 10%,transparent)}.app-btn-outline-info{border-color:var(--info);background-color:transparent;color:var(--info)}.app-btn-outline-info:hover{background-color:color-mix(in srgb,var(--info) 10%,transparent)}.app-btn-soft{border-color:transparent;background-color:color-mix(in srgb,var(--accent) 10%,transparent);color:var(--accent)}.app-btn-soft:hover{background-color:color-mix(in srgb,var(--accent) 20%,transparent)}.app-btn-soft-danger{border-color:transparent;background-color:color-mix(in srgb,var(--error) 10%,transparent);color:var(--error)}.app-btn-soft-danger:hover{background-color:color-mix(in srgb,var(--error) 20%,transparent)}.app-btn-soft-warning{border-color:transparent;background-color:color-mix(in srgb,var(--warning) 10%,transparent);color:var(--warning)}.app-btn-soft-warning:hover{background-color:color-mix(in srgb,var(--warning) 20%,transparent)}.app-btn-soft-success{border-color:transparent;background-color:color-mix(in srgb,var(--success) 10%,transparent);color:var(--success)}.app-btn-soft-success:hover{background-color:color-mix(in srgb,var(--success) 20%,transparent)}.app-btn-soft-info{border-color:transparent;background-color:color-mix(in srgb,var(--info) 10%,transparent);color:var(--info)}.app-btn-soft-info:hover{background-color:color-mix(in srgb,var(--info) 20%,transparent)}.app-btn-ghost{border-color:transparent;background-color:transparent;color:var(--accent)}.app-btn-ghost:hover{background-color:color-mix(in srgb,var(--accent) 10%,transparent)}.app-btn-ghost-danger{border-color:transparent;background-color:transparent;color:var(--error)}.app-btn-ghost-danger:hover{background-color:color-mix(in srgb,var(--error) 10%,transparent)}.app-btn-ghost-warning{border-color:transparent;background-color:transparent;color:var(--warning)}.app-btn-ghost-warning:hover{background-color:color-mix(in srgb,var(--warning) 10%,transparent)}.app-btn-ghost-success{border-color:transparent;background-color:transparent;color:var(--success)}.app-btn-ghost-success:hover{background-color:color-mix(in srgb,var(--success) 10%,transparent)}.app-btn-ghost-info{border-color:transparent;background-color:transparent;color:var(--info)}.app-btn-ghost-info:hover{background-color:color-mix(in srgb,var(--info) 10%,transparent)}.app-btn-sm{padding:.25rem .5rem;font-size:.875rem}.app-btn-md{padding:.5rem 1rem;font-size:1rem}.app-btn-lg{padding:.75rem 1.5rem;font-size:1.125rem}.app-btn-full{width:100%}.app-btn-disabled{opacity:.5;cursor:not-allowed}.app-btn-icon{font-size:1.25rem}.app-btn-spinner{width:1rem;height:1rem;border:2px solid currentColor;border-top-color:transparent;border-radius:50%;animation:spin .6s linear infinite}@keyframes spin{to{transform:rotate(360deg)}}.app-btn-primary{border-color:var(--accent);background-color:var(--accent);color:var(--text-on-accent)}.app-btn-primary:hover{background-color:var(--accent-hover);border-color:var(--accent-hover)}.app-btn-secondary{border-color:var(--border-color);background-color:var(--bg-elevated);color:var(--text-primary)}.app-btn-secondary:hover{background-color:var(--bg-hover)}\n"], dependencies: [{ kind: "ngmodule", type: MatIconModule }, { kind: "component", type: i1.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: ButtonComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-button", standalone: true, imports: [MatIconModule], template: `
    <button
      [attr.type]="type || 'button'"
      [class]="getButtonClass()"
      [disabled]="disabled || loading"
      (click)="handleClick($event)"
    >
      @if (loading) {
        <span class="app-btn-spinner"></span>
      } @else {
        @if (icon && iconPosition === "left") {
          <mat-icon class="app-btn-icon" [fontIcon]="icon" />
        }
        @if (label) {
          <span>{{ label }}</span>
        } @else {
          <ng-content></ng-content>
        }
        @if (icon && iconPosition === "right") {
          <mat-icon class="app-btn-icon" [fontIcon]="icon" />
        }
      }
    </button>
  `, styles: [":host{display:inline-flex}button{display:inline-flex;align-items:center;justify-content:center;gap:.5rem;border-radius:.5rem;border:1px solid;padding:.5rem 1rem;text-align:center;font-weight:500;transition:all .15s;cursor:pointer;border-width:1px}button:disabled{opacity:.5;cursor:not-allowed}.app-btn-solid{border-color:var(--accent);background-color:var(--accent);color:var(--text-on-accent)}.app-btn-solid:hover{background-color:var(--accent-hover);border-color:var(--accent-hover)}.app-btn-solid-danger{border-color:var(--error);background-color:var(--error);color:var(--text-on-error)}.app-btn-solid-danger:hover{opacity:.9}.app-btn-solid-warning{border-color:var(--warning);background-color:var(--warning);color:var(--text-on-warning)}.app-btn-solid-warning:hover{opacity:.9}.app-btn-solid-success{border-color:var(--success);background-color:var(--success);color:var(--text-on-success)}.app-btn-solid-success:hover{opacity:.9}.app-btn-solid-info{border-color:var(--info);background-color:var(--info);color:var(--text-on-info)}.app-btn-solid-info:hover{opacity:.9}.app-btn-outline{border-color:var(--accent);background-color:transparent;color:var(--accent)}.app-btn-outline:hover{background-color:color-mix(in srgb,var(--accent) 10%,transparent)}.app-btn-outline-danger{border-color:var(--error);background-color:transparent;color:var(--error)}.app-btn-outline-danger:hover{background-color:color-mix(in srgb,var(--error) 10%,transparent)}.app-btn-outline-warning{border-color:var(--warning);background-color:transparent;color:var(--warning)}.app-btn-outline-warning:hover{background-color:color-mix(in srgb,var(--warning) 10%,transparent)}.app-btn-outline-success{border-color:var(--success);background-color:transparent;color:var(--success)}.app-btn-outline-success:hover{background-color:color-mix(in srgb,var(--success) 10%,transparent)}.app-btn-outline-info{border-color:var(--info);background-color:transparent;color:var(--info)}.app-btn-outline-info:hover{background-color:color-mix(in srgb,var(--info) 10%,transparent)}.app-btn-soft{border-color:transparent;background-color:color-mix(in srgb,var(--accent) 10%,transparent);color:var(--accent)}.app-btn-soft:hover{background-color:color-mix(in srgb,var(--accent) 20%,transparent)}.app-btn-soft-danger{border-color:transparent;background-color:color-mix(in srgb,var(--error) 10%,transparent);color:var(--error)}.app-btn-soft-danger:hover{background-color:color-mix(in srgb,var(--error) 20%,transparent)}.app-btn-soft-warning{border-color:transparent;background-color:color-mix(in srgb,var(--warning) 10%,transparent);color:var(--warning)}.app-btn-soft-warning:hover{background-color:color-mix(in srgb,var(--warning) 20%,transparent)}.app-btn-soft-success{border-color:transparent;background-color:color-mix(in srgb,var(--success) 10%,transparent);color:var(--success)}.app-btn-soft-success:hover{background-color:color-mix(in srgb,var(--success) 20%,transparent)}.app-btn-soft-info{border-color:transparent;background-color:color-mix(in srgb,var(--info) 10%,transparent);color:var(--info)}.app-btn-soft-info:hover{background-color:color-mix(in srgb,var(--info) 20%,transparent)}.app-btn-ghost{border-color:transparent;background-color:transparent;color:var(--accent)}.app-btn-ghost:hover{background-color:color-mix(in srgb,var(--accent) 10%,transparent)}.app-btn-ghost-danger{border-color:transparent;background-color:transparent;color:var(--error)}.app-btn-ghost-danger:hover{background-color:color-mix(in srgb,var(--error) 10%,transparent)}.app-btn-ghost-warning{border-color:transparent;background-color:transparent;color:var(--warning)}.app-btn-ghost-warning:hover{background-color:color-mix(in srgb,var(--warning) 10%,transparent)}.app-btn-ghost-success{border-color:transparent;background-color:transparent;color:var(--success)}.app-btn-ghost-success:hover{background-color:color-mix(in srgb,var(--success) 10%,transparent)}.app-btn-ghost-info{border-color:transparent;background-color:transparent;color:var(--info)}.app-btn-ghost-info:hover{background-color:color-mix(in srgb,var(--info) 10%,transparent)}.app-btn-sm{padding:.25rem .5rem;font-size:.875rem}.app-btn-md{padding:.5rem 1rem;font-size:1rem}.app-btn-lg{padding:.75rem 1.5rem;font-size:1.125rem}.app-btn-full{width:100%}.app-btn-disabled{opacity:.5;cursor:not-allowed}.app-btn-icon{font-size:1.25rem}.app-btn-spinner{width:1rem;height:1rem;border:2px solid currentColor;border-top-color:transparent;border-radius:50%;animation:spin .6s linear infinite}@keyframes spin{to{transform:rotate(360deg)}}.app-btn-primary{border-color:var(--accent);background-color:var(--accent);color:var(--text-on-accent)}.app-btn-primary:hover{background-color:var(--accent-hover);border-color:var(--accent-hover)}.app-btn-secondary{border-color:var(--border-color);background-color:var(--bg-elevated);color:var(--text-primary)}.app-btn-secondary:hover{background-color:var(--bg-hover)}\n"] }]
        }], propDecorators: { variant: [{
                type: Input
            }], buttonStyle: [{
                type: Input
            }], size: [{
                type: Input
            }], disabled: [{
                type: Input
            }], loading: [{
                type: Input
            }], icon: [{
                type: Input
            }], iconPosition: [{
                type: Input
            }], fullWidth: [{
                type: Input
            }], type: [{
                type: Input
            }], label: [{
                type: Input
            }], i18nKey: [{
                type: Input
            }], classes: [{
                type: Input
            }], ariaLabel: [{
                type: Input
            }], align: [{
                type: Input
            }], direction: [{
                type: Input
            }], height: [{
                type: Input
            }], justify: [{
                type: Input
            }], layout: [{
                type: Input
            }], width: [{
                type: Input
            }], clicked: [{
                type: Output
            }] } });
registerSchemaComponent("app-button", ButtonComponent);

class InputComponent {
    type = "text";
    placeholder = "";
    label = "";
    icon = "";
    disabled = false;
    value = "";
    error = "";
    input = new EventEmitter();
    blurred = new EventEmitter();
    focused = false;
    handleInput(e) {
        this.value = e.target.value;
        this.input.emit(this.value);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: InputComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.25", type: InputComponent, isStandalone: true, selector: "app-input", inputs: { type: "type", placeholder: "placeholder", label: "label", icon: "icon", disabled: "disabled", value: "value", error: "error" }, outputs: { input: "input", blurred: "blurred" }, ngImport: i0, template: `
    <div class="app-input-wrapper">
      @if (label) {
        <label class="app-input-label">{{ label }}</label>
      }
      <div class="app-input-container" [class.app-input-focused]="focused">
        @if (icon) {
          <mat-icon class="app-input-icon" [fontIcon]="icon" />
        }
        <input
          #inputEl
          [attr.type]="type"
          class="app-input"
          [class.app-input-with-icon]="!!icon"
          [class.app-input-error]="!!error"
          [placeholder]="placeholder"
          [disabled]="disabled"
          [value]="value"
          (input)="handleInput($event)"
          (focus)="focused = true"
          (blur)="focused = false"
        />
      </div>
      @if (error) {
        <span class="app-input-error-text">{{ error }}</span>
      }
    </div>
  `, isInline: true, styles: [":host{display:block}.app-input-wrapper{display:flex;flex-direction:column;gap:.25rem}.app-input-label{font-size:.875rem;font-weight:500;color:var(--text-primary)}.app-input-container{position:relative;display:flex;align-items:center}.app-input{width:100%;padding:.5rem .75rem;border-radius:.5rem;border:1px solid var(--border-color);background-color:var(--bg-primary);color:var(--text-primary);box-sizing:border-box;transition:all .15s;outline:none}.app-input::placeholder{color:var(--text-muted)}.app-input:focus{border-color:var(--accent);box-shadow:0 0 0 1px var(--accent)}.app-input-error{border-color:var(--error);box-shadow:0 0 0 1px var(--error)}.app-input-with-icon{padding-left:2.5rem}.app-input-icon{position:absolute;left:.75rem;font-size:1.25rem;color:var(--text-muted)}.app-input-focused .app-input-icon{color:var(--accent)}.app-input:disabled{opacity:.5;cursor:not-allowed;background-color:var(--bg-tertiary)}.app-input-error-text{font-size:.75rem;color:var(--error)}\n"], dependencies: [{ kind: "ngmodule", type: MatIconModule }, { kind: "component", type: i1.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: InputComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-input", standalone: true, imports: [MatIconModule], template: `
    <div class="app-input-wrapper">
      @if (label) {
        <label class="app-input-label">{{ label }}</label>
      }
      <div class="app-input-container" [class.app-input-focused]="focused">
        @if (icon) {
          <mat-icon class="app-input-icon" [fontIcon]="icon" />
        }
        <input
          #inputEl
          [attr.type]="type"
          class="app-input"
          [class.app-input-with-icon]="!!icon"
          [class.app-input-error]="!!error"
          [placeholder]="placeholder"
          [disabled]="disabled"
          [value]="value"
          (input)="handleInput($event)"
          (focus)="focused = true"
          (blur)="focused = false"
        />
      </div>
      @if (error) {
        <span class="app-input-error-text">{{ error }}</span>
      }
    </div>
  `, styles: [":host{display:block}.app-input-wrapper{display:flex;flex-direction:column;gap:.25rem}.app-input-label{font-size:.875rem;font-weight:500;color:var(--text-primary)}.app-input-container{position:relative;display:flex;align-items:center}.app-input{width:100%;padding:.5rem .75rem;border-radius:.5rem;border:1px solid var(--border-color);background-color:var(--bg-primary);color:var(--text-primary);box-sizing:border-box;transition:all .15s;outline:none}.app-input::placeholder{color:var(--text-muted)}.app-input:focus{border-color:var(--accent);box-shadow:0 0 0 1px var(--accent)}.app-input-error{border-color:var(--error);box-shadow:0 0 0 1px var(--error)}.app-input-with-icon{padding-left:2.5rem}.app-input-icon{position:absolute;left:.75rem;font-size:1.25rem;color:var(--text-muted)}.app-input-focused .app-input-icon{color:var(--accent)}.app-input:disabled{opacity:.5;cursor:not-allowed;background-color:var(--bg-tertiary)}.app-input-error-text{font-size:.75rem;color:var(--error)}\n"] }]
        }], propDecorators: { type: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], label: [{
                type: Input
            }], icon: [{
                type: Input
            }], disabled: [{
                type: Input
            }], value: [{
                type: Input
            }], error: [{
                type: Input
            }], input: [{
                type: Output
            }], blurred: [{
                type: Output
            }] } });
registerSchemaComponent("app-input", InputComponent);

class EmptyStateComponent {
    title = "";
    message = "";
    icon = "";
    variant = "default";
    action = "";
    actionClicked = new EventEmitter();
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: EmptyStateComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.25", type: EmptyStateComponent, isStandalone: true, selector: "app-empty-state", inputs: { title: "title", message: "message", icon: "icon", variant: "variant", action: "action" }, outputs: { actionClicked: "actionClicked" }, ngImport: i0, template: `
    <div class="icon-container" [class]="variant">
      @if (icon) {
        <span class="icon">{{ icon }}</span>
      }
    </div>
    @if (title) {
      <h3 class="title">{{ title }}</h3>
    }
    @if (message) {
      <p class="message">{{ message }}</p>
    }
    @if (action) {
      <div class="action">
        <button (click)="actionClicked.emit($event)">{{ action }}</button>
      </div>
    }
  `, isInline: true, styles: [":host{display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:2rem;gap:1rem}.icon-container{width:64px;height:64px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:var(--bg-elevated);border:2px solid var(--border-color)}.icon-container.danger{background:var(--error);border-color:var(--error)}.icon-container.success{background:var(--success);border-color:var(--success)}.icon{font-size:2rem;width:2rem;height:2rem}.icon-container.danger .icon,.icon-container.success .icon{color:var(--text-on-error)}.title{font-size:1.5rem;font-weight:600;color:var(--text-primary);margin:0}.message{font-size:1rem;color:var(--text-secondary);margin:0;max-width:400px}.action{margin-top:.5rem}button{display:inline-flex;align-items:center;justify-content:center;gap:.5rem;padding:.5rem 1rem;border-radius:.5rem;border:1px solid var(--accent);background:var(--accent);color:var(--text-on-accent);font-weight:500;cursor:pointer;transition:all .15s}button:hover{background:var(--accent-hover);border-color:var(--accent-hover)}\n"] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: EmptyStateComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-empty-state", standalone: true, template: `
    <div class="icon-container" [class]="variant">
      @if (icon) {
        <span class="icon">{{ icon }}</span>
      }
    </div>
    @if (title) {
      <h3 class="title">{{ title }}</h3>
    }
    @if (message) {
      <p class="message">{{ message }}</p>
    }
    @if (action) {
      <div class="action">
        <button (click)="actionClicked.emit($event)">{{ action }}</button>
      </div>
    }
  `, styles: [":host{display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:2rem;gap:1rem}.icon-container{width:64px;height:64px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:var(--bg-elevated);border:2px solid var(--border-color)}.icon-container.danger{background:var(--error);border-color:var(--error)}.icon-container.success{background:var(--success);border-color:var(--success)}.icon{font-size:2rem;width:2rem;height:2rem}.icon-container.danger .icon,.icon-container.success .icon{color:var(--text-on-error)}.title{font-size:1.5rem;font-weight:600;color:var(--text-primary);margin:0}.message{font-size:1rem;color:var(--text-secondary);margin:0;max-width:400px}.action{margin-top:.5rem}button{display:inline-flex;align-items:center;justify-content:center;gap:.5rem;padding:.5rem 1rem;border-radius:.5rem;border:1px solid var(--accent);background:var(--accent);color:var(--text-on-accent);font-weight:500;cursor:pointer;transition:all .15s}button:hover{background:var(--accent-hover);border-color:var(--accent-hover)}\n"] }]
        }], propDecorators: { title: [{
                type: Input
            }], message: [{
                type: Input
            }], icon: [{
                type: Input
            }], variant: [{
                type: Input
            }], action: [{
                type: Input
            }], actionClicked: [{
                type: Output
            }] } });
registerSchemaComponent("app-empty-state", EmptyStateComponent);

class ModalComponent {
    open = false;
    title = "";
    size = "md";
    closed = new EventEmitter();
    handleOverlayClick(e) {
        if (e.target.classList.contains("overlay")) {
            this.close();
        }
    }
    close() {
        this.open = false;
        this.closed.emit();
    }
    onEscape() {
        if (this.open)
            this.close();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: ModalComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.25", type: ModalComponent, isStandalone: true, selector: "app-modal", inputs: { open: "open", title: "title", size: "size" }, outputs: { closed: "closed" }, host: { listeners: { "window:keydown.escape": "onEscape()" } }, ngImport: i0, template: `
    @if (open) {
      <div class="overlay" (click)="handleOverlayClick($event)">
        <div [class]="'modal modal-' + size">
          <header>
            <h3>{{ title }}</h3>
            <button class="close-btn" (click)="close()" aria-label="Close">
              &times;
            </button>
          </header>
          <div class="content">
            <ng-content></ng-content>
          </div>
        </div>
      </div>
    }
  `, isInline: true, styles: [":host{display:block}.overlay{position:fixed;inset:0;background:#00000080;display:flex;align-items:center;justify-content:center;z-index:1000}.modal{background:var(--bg-elevated);border:1px solid var(--border-color);border-radius:.75rem;min-width:320px;max-height:90vh;display:flex;flex-direction:column;box-shadow:0 25px 50px -12px #00000040}.modal-sm{width:320px}.modal-md{width:480px}.modal-lg{width:640px}header{display:flex;align-items:center;justify-content:space-between;padding:1rem 1.25rem;border-bottom:1px solid var(--border-color)}header h3{margin:0;font-size:1.125rem;font-weight:600;color:var(--text-primary)}.close-btn{background:transparent;border:none;cursor:pointer;padding:.25rem;border-radius:.25rem;color:var(--text-secondary);font-size:1.25rem;line-height:1}.close-btn:hover{background:var(--bg-hover);color:var(--text-primary)}.content{padding:1.25rem;overflow-y:auto;color:var(--text-primary)}\n"] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: ModalComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-modal", standalone: true, template: `
    @if (open) {
      <div class="overlay" (click)="handleOverlayClick($event)">
        <div [class]="'modal modal-' + size">
          <header>
            <h3>{{ title }}</h3>
            <button class="close-btn" (click)="close()" aria-label="Close">
              &times;
            </button>
          </header>
          <div class="content">
            <ng-content></ng-content>
          </div>
        </div>
      </div>
    }
  `, styles: [":host{display:block}.overlay{position:fixed;inset:0;background:#00000080;display:flex;align-items:center;justify-content:center;z-index:1000}.modal{background:var(--bg-elevated);border:1px solid var(--border-color);border-radius:.75rem;min-width:320px;max-height:90vh;display:flex;flex-direction:column;box-shadow:0 25px 50px -12px #00000040}.modal-sm{width:320px}.modal-md{width:480px}.modal-lg{width:640px}header{display:flex;align-items:center;justify-content:space-between;padding:1rem 1.25rem;border-bottom:1px solid var(--border-color)}header h3{margin:0;font-size:1.125rem;font-weight:600;color:var(--text-primary)}.close-btn{background:transparent;border:none;cursor:pointer;padding:.25rem;border-radius:.25rem;color:var(--text-secondary);font-size:1.25rem;line-height:1}.close-btn:hover{background:var(--bg-hover);color:var(--text-primary)}.content{padding:1.25rem;overflow-y:auto;color:var(--text-primary)}\n"] }]
        }], propDecorators: { open: [{
                type: Input
            }], title: [{
                type: Input
            }], size: [{
                type: Input
            }], closed: [{
                type: Output
            }], onEscape: [{
                type: HostListener,
                args: ["window:keydown.escape"]
            }] } });
registerSchemaComponent("app-modal", ModalComponent);

class DialogComponent {
    open = false;
    title = "";
    size = "md";
    showHeader = true;
    showFooter = false;
    closed = new EventEmitter();
    handleOverlayClick(e) {
        if (e.target.classList.contains("overlay")) {
            this.close();
        }
    }
    close() {
        this.open = false;
        this.closed.emit();
    }
    onEscape() {
        if (this.open)
            this.close();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: DialogComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.25", type: DialogComponent, isStandalone: true, selector: "app-dialog", inputs: { open: "open", title: "title", size: "size", showHeader: "showHeader", showFooter: "showFooter" }, outputs: { closed: "closed" }, host: { listeners: { "window:keydown.escape": "onEscape()" } }, ngImport: i0, template: `
    @if (open) {
      <div class="overlay" (click)="handleOverlayClick($event)">
        <div [class]="'dialog dialog-' + size">
          <header>
            <h2>{{ title }}</h2>
            <button class="close-btn" (click)="close()" aria-label="Close">
              &times;
            </button>
          </header>
          <div class="content">
            <ng-content></ng-content>
          </div>
        </div>
      </div>
    }
  `, isInline: true, styles: [":host{display:block}.overlay{position:fixed;inset:0;background:#0009;display:flex;align-items:center;justify-content:center;z-index:1000}.dialog{background:var(--bg-elevated);border:1px solid var(--border-color);border-radius:1rem;min-width:360px;max-height:90vh;display:flex;flex-direction:column;box-shadow:0 25px 50px -12px #0006}.dialog-sm{width:360px}.dialog-md{width:520px}.dialog-lg{width:720px}header{display:flex;align-items:center;justify-content:space-between;padding:1.25rem 1.5rem;border-bottom:2px solid var(--border-color);background:var(--bg-elevated);border-radius:1rem 1rem 0 0}header h2{margin:0;font-size:1.25rem;font-weight:700;color:var(--text-primary)}.close-btn{background:transparent;border:none;cursor:pointer;padding:.25rem .5rem;border-radius:.375rem;color:var(--text-secondary);font-size:1.5rem;line-height:1;font-weight:300}.close-btn:hover{background:var(--bg-hover);color:var(--text-primary)}.content{padding:1.5rem;overflow-y:auto;color:var(--text-primary)}\n"] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: DialogComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-dialog", standalone: true, template: `
    @if (open) {
      <div class="overlay" (click)="handleOverlayClick($event)">
        <div [class]="'dialog dialog-' + size">
          <header>
            <h2>{{ title }}</h2>
            <button class="close-btn" (click)="close()" aria-label="Close">
              &times;
            </button>
          </header>
          <div class="content">
            <ng-content></ng-content>
          </div>
        </div>
      </div>
    }
  `, styles: [":host{display:block}.overlay{position:fixed;inset:0;background:#0009;display:flex;align-items:center;justify-content:center;z-index:1000}.dialog{background:var(--bg-elevated);border:1px solid var(--border-color);border-radius:1rem;min-width:360px;max-height:90vh;display:flex;flex-direction:column;box-shadow:0 25px 50px -12px #0006}.dialog-sm{width:360px}.dialog-md{width:520px}.dialog-lg{width:720px}header{display:flex;align-items:center;justify-content:space-between;padding:1.25rem 1.5rem;border-bottom:2px solid var(--border-color);background:var(--bg-elevated);border-radius:1rem 1rem 0 0}header h2{margin:0;font-size:1.25rem;font-weight:700;color:var(--text-primary)}.close-btn{background:transparent;border:none;cursor:pointer;padding:.25rem .5rem;border-radius:.375rem;color:var(--text-secondary);font-size:1.5rem;line-height:1;font-weight:300}.close-btn:hover{background:var(--bg-hover);color:var(--text-primary)}.content{padding:1.5rem;overflow-y:auto;color:var(--text-primary)}\n"] }]
        }], propDecorators: { open: [{
                type: Input
            }], title: [{
                type: Input
            }], size: [{
                type: Input
            }], showHeader: [{
                type: Input
            }], showFooter: [{
                type: Input
            }], closed: [{
                type: Output
            }], onEscape: [{
                type: HostListener,
                args: ["window:keydown.escape"]
            }] } });
registerSchemaComponent("app-dialog", DialogComponent);

class ConfirmDialogComponent {
    open = false;
    title = "Confirm";
    message = "";
    confirmText = "Confirm";
    cancelText = "Cancel";
    confirmed = new EventEmitter();
    cancelled = new EventEmitter();
    confirm() {
        this.open = false;
        this.confirmed.emit();
    }
    cancel() {
        this.open = false;
        this.cancelled.emit();
    }
    onEscape() {
        if (this.open)
            this.cancel();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: ConfirmDialogComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.25", type: ConfirmDialogComponent, isStandalone: true, selector: "app-confirm-dialog", inputs: { open: "open", title: "title", message: "message", confirmText: "confirmText", cancelText: "cancelText" }, outputs: { confirmed: "confirmed", cancelled: "cancelled" }, host: { listeners: { "window:keydown.escape": "onEscape()" } }, ngImport: i0, template: `
    @if (open) {
      <div class="overlay" (click)="cancel()">
        <div class="dialog" (click)="$event.stopPropagation()">
          <header>
            <h2>{{ title || "Confirm" }}</h2>
            <button class="close-btn" (click)="cancel()" aria-label="Close">
              &times;
            </button>
          </header>
          <div class="content">{{ message }}</div>
          <footer>
            <button class="cancel-btn" (click)="cancel()">
              {{ cancelText || "Cancel" }}
            </button>
            <button class="confirm-btn" (click)="confirm()">
              {{ confirmText || "Confirm" }}
            </button>
          </footer>
        </div>
      </div>
    }
  `, isInline: true, styles: [":host{display:block}.overlay{position:fixed;inset:0;background:#0009;display:flex;align-items:center;justify-content:center;z-index:1000}.dialog{background:var(--bg-elevated);border:1px solid var(--border-color);border-radius:1rem;width:400px;max-width:90vw;box-shadow:0 25px 50px -12px #0006}header{display:flex;align-items:center;justify-content:space-between;padding:1.25rem 1.5rem;border-bottom:1px solid var(--border-color)}header h2{margin:0;font-size:1.125rem;font-weight:600;color:var(--text-primary)}.close-btn{background:transparent;border:none;cursor:pointer;padding:.25rem;border-radius:.25rem;color:var(--text-secondary);font-size:1.25rem;line-height:1}.close-btn:hover{background:var(--bg-hover);color:var(--text-primary)}.content{padding:1.5rem;color:var(--text-secondary);font-size:.9375rem;line-height:1.5}footer{display:flex;gap:.75rem;padding:1rem 1.5rem;border-top:1px solid var(--border-color);justify-content:flex-end}.cancel-btn{padding:.5rem 1rem;border-radius:.5rem;border:1px solid var(--border-color);background:transparent;color:var(--text-secondary);font-weight:500;cursor:pointer}.cancel-btn:hover{background:var(--bg-hover);color:var(--text-primary)}.confirm-btn{padding:.5rem 1rem;border-radius:.5rem;border:1px solid var(--accent);background:var(--accent);color:var(--text-on-accent);font-weight:500;cursor:pointer}.confirm-btn:hover{background:var(--accent-hover)}\n"] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: ConfirmDialogComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-confirm-dialog", standalone: true, template: `
    @if (open) {
      <div class="overlay" (click)="cancel()">
        <div class="dialog" (click)="$event.stopPropagation()">
          <header>
            <h2>{{ title || "Confirm" }}</h2>
            <button class="close-btn" (click)="cancel()" aria-label="Close">
              &times;
            </button>
          </header>
          <div class="content">{{ message }}</div>
          <footer>
            <button class="cancel-btn" (click)="cancel()">
              {{ cancelText || "Cancel" }}
            </button>
            <button class="confirm-btn" (click)="confirm()">
              {{ confirmText || "Confirm" }}
            </button>
          </footer>
        </div>
      </div>
    }
  `, styles: [":host{display:block}.overlay{position:fixed;inset:0;background:#0009;display:flex;align-items:center;justify-content:center;z-index:1000}.dialog{background:var(--bg-elevated);border:1px solid var(--border-color);border-radius:1rem;width:400px;max-width:90vw;box-shadow:0 25px 50px -12px #0006}header{display:flex;align-items:center;justify-content:space-between;padding:1.25rem 1.5rem;border-bottom:1px solid var(--border-color)}header h2{margin:0;font-size:1.125rem;font-weight:600;color:var(--text-primary)}.close-btn{background:transparent;border:none;cursor:pointer;padding:.25rem;border-radius:.25rem;color:var(--text-secondary);font-size:1.25rem;line-height:1}.close-btn:hover{background:var(--bg-hover);color:var(--text-primary)}.content{padding:1.5rem;color:var(--text-secondary);font-size:.9375rem;line-height:1.5}footer{display:flex;gap:.75rem;padding:1rem 1.5rem;border-top:1px solid var(--border-color);justify-content:flex-end}.cancel-btn{padding:.5rem 1rem;border-radius:.5rem;border:1px solid var(--border-color);background:transparent;color:var(--text-secondary);font-weight:500;cursor:pointer}.cancel-btn:hover{background:var(--bg-hover);color:var(--text-primary)}.confirm-btn{padding:.5rem 1rem;border-radius:.5rem;border:1px solid var(--accent);background:var(--accent);color:var(--text-on-accent);font-weight:500;cursor:pointer}.confirm-btn:hover{background:var(--accent-hover)}\n"] }]
        }], propDecorators: { open: [{
                type: Input
            }], title: [{
                type: Input
            }], message: [{
                type: Input
            }], confirmText: [{
                type: Input
            }], cancelText: [{
                type: Input
            }], confirmed: [{
                type: Output
            }], cancelled: [{
                type: Output
            }], onEscape: [{
                type: HostListener,
                args: ["window:keydown.escape"]
            }] } });
registerSchemaComponent("app-confirm-dialog", ConfirmDialogComponent);

class LoadingComponent {
    size = "md";
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: LoadingComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.25", type: LoadingComponent, isStandalone: true, selector: "app-loading", inputs: { size: "size" }, ngImport: i0, template: `<div [class]="'spinner spinner-' + size"></div>`, isInline: true, styles: [":host{display:inline-flex;align-items:center;justify-content:center}.spinner{border:2px solid var(--border-color);border-top-color:var(--accent);border-radius:50%;animation:spin .7s linear infinite}.spinner-sm{width:16px;height:16px;border-width:2px}.spinner-md{width:32px;height:32px;border-width:3px}.spinner-lg{width:48px;height:48px;border-width:4px}@keyframes spin{to{transform:rotate(360deg)}}\n"] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: LoadingComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-loading", standalone: true, template: `<div [class]="'spinner spinner-' + size"></div>`, styles: [":host{display:inline-flex;align-items:center;justify-content:center}.spinner{border:2px solid var(--border-color);border-top-color:var(--accent);border-radius:50%;animation:spin .7s linear infinite}.spinner-sm{width:16px;height:16px;border-width:2px}.spinner-md{width:32px;height:32px;border-width:3px}.spinner-lg{width:48px;height:48px;border-width:4px}@keyframes spin{to{transform:rotate(360deg)}}\n"] }]
        }], propDecorators: { size: [{
                type: Input
            }] } });
registerSchemaComponent("app-loading", LoadingComponent);

class RadioComponent {
    name = "";
    value = "";
    checked = false;
    disabled = false;
    changed = new EventEmitter();
    label = "";
    handleChange(e) {
        this.checked = true;
        this.changed.emit(this.value);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: RadioComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.25", type: RadioComponent, isStandalone: true, selector: "app-radio", inputs: { name: "name", value: "value", checked: "checked", disabled: "disabled", label: "label" }, outputs: { changed: "changed" }, ngImport: i0, template: `
    <label>
      <input
        type="radio"
        [name]="name"
        [value]="value"
        [checked]="checked"
        [disabled]="disabled"
        (change)="handleChange($event)"
      />
      <span class="radio-label"><ng-content></ng-content></span>
    </label>
  `, isInline: true, styles: [":host{display:inline-flex;align-items:center}label{display:flex;align-items:center;gap:.5rem;cursor:pointer}input[type=radio]{width:1rem;height:1rem;accent-color:var(--accent);cursor:pointer}input[type=radio]:disabled{cursor:not-allowed;opacity:.5}.radio-label{color:var(--text-primary);font-size:.875rem;-webkit-user-select:none;user-select:none}\n"] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: RadioComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-radio", standalone: true, template: `
    <label>
      <input
        type="radio"
        [name]="name"
        [value]="value"
        [checked]="checked"
        [disabled]="disabled"
        (change)="handleChange($event)"
      />
      <span class="radio-label"><ng-content></ng-content></span>
    </label>
  `, styles: [":host{display:inline-flex;align-items:center}label{display:flex;align-items:center;gap:.5rem;cursor:pointer}input[type=radio]{width:1rem;height:1rem;accent-color:var(--accent);cursor:pointer}input[type=radio]:disabled{cursor:not-allowed;opacity:.5}.radio-label{color:var(--text-primary);font-size:.875rem;-webkit-user-select:none;user-select:none}\n"] }]
        }], propDecorators: { name: [{
                type: Input
            }], value: [{
                type: Input
            }], checked: [{
                type: Input
            }], disabled: [{
                type: Input
            }], changed: [{
                type: Output
            }], label: [{
                type: Input
            }] } });
registerSchemaComponent("app-radio", RadioComponent);

class SliderComponent {
    min = 0;
    max = 100;
    value = 0;
    step = 1;
    disabled = false;
    input = new EventEmitter();
    handleInput(e) {
        this.value = Number(e.target.value);
        this.input.emit(this.value);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: SliderComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.25", type: SliderComponent, isStandalone: true, selector: "app-slider", inputs: { min: "min", max: "max", value: "value", step: "step", disabled: "disabled" }, outputs: { input: "input" }, ngImport: i0, template: `
    <div class="slider-wrapper">
      <input
        type="range"
        [value]="value"
        [min]="min"
        [max]="max"
        [step]="step"
        [disabled]="disabled"
        (input)="handleInput($event)"
      />
    </div>
  `, isInline: true, styles: [":host{display:block}.slider-wrapper{width:100%}input[type=range]{width:100%;accent-color:var(--accent);cursor:pointer}input[type=range]:disabled{opacity:.5;cursor:not-allowed}\n"] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: SliderComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-slider", standalone: true, template: `
    <div class="slider-wrapper">
      <input
        type="range"
        [value]="value"
        [min]="min"
        [max]="max"
        [step]="step"
        [disabled]="disabled"
        (input)="handleInput($event)"
      />
    </div>
  `, styles: [":host{display:block}.slider-wrapper{width:100%}input[type=range]{width:100%;accent-color:var(--accent);cursor:pointer}input[type=range]:disabled{opacity:.5;cursor:not-allowed}\n"] }]
        }], propDecorators: { min: [{
                type: Input
            }], max: [{
                type: Input
            }], value: [{
                type: Input
            }], step: [{
                type: Input
            }], disabled: [{
                type: Input
            }], input: [{
                type: Output
            }] } });
registerSchemaComponent("app-slider", SliderComponent);

class SwitchComponent {
    checked = false;
    label = "";
    disabled = false;
    changed = new EventEmitter();
    handleChange(e) {
        this.changed.emit(e.target.checked);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: SwitchComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.25", type: SwitchComponent, isStandalone: true, selector: "app-switch", inputs: { checked: "checked", label: "label", disabled: "disabled" }, outputs: { changed: "changed" }, ngImport: i0, template: `
    <label class="switch" [class.switch-checked]="checked">
      <input
        type="checkbox"
        [checked]="checked"
        [disabled]="disabled"
        (change)="handleChange($event)"
      />
      <span class="slider"></span>
      @if (label) {
        <span class="switch-label">{{ label }}</span>
      }
    </label>
  `, isInline: true, styles: [":host{display:inline-flex;align-items:center}.switch{display:flex;align-items:center;gap:.5rem;cursor:pointer;position:relative}.switch input{position:absolute;opacity:0;width:0;height:0}.slider{width:2.5rem;height:1.25rem;background-color:var(--border-color);border-radius:1rem;transition:background-color .2s;position:relative}.slider:before{content:\"\";position:absolute;width:1rem;height:1rem;left:2px;top:2px;background-color:#fff;border-radius:50%;transition:transform .2s}.switch-checked .slider{background-color:var(--accent)}.switch-checked .slider:before{transform:translate(1.25rem)}.switch-label{color:var(--text-primary);font-size:.875rem;-webkit-user-select:none;user-select:none}input:disabled~.slider{opacity:.5;cursor:not-allowed}\n"] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: SwitchComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-switch", standalone: true, template: `
    <label class="switch" [class.switch-checked]="checked">
      <input
        type="checkbox"
        [checked]="checked"
        [disabled]="disabled"
        (change)="handleChange($event)"
      />
      <span class="slider"></span>
      @if (label) {
        <span class="switch-label">{{ label }}</span>
      }
    </label>
  `, styles: [":host{display:inline-flex;align-items:center}.switch{display:flex;align-items:center;gap:.5rem;cursor:pointer;position:relative}.switch input{position:absolute;opacity:0;width:0;height:0}.slider{width:2.5rem;height:1.25rem;background-color:var(--border-color);border-radius:1rem;transition:background-color .2s;position:relative}.slider:before{content:\"\";position:absolute;width:1rem;height:1rem;left:2px;top:2px;background-color:#fff;border-radius:50%;transition:transform .2s}.switch-checked .slider{background-color:var(--accent)}.switch-checked .slider:before{transform:translate(1.25rem)}.switch-label{color:var(--text-primary);font-size:.875rem;-webkit-user-select:none;user-select:none}input:disabled~.slider{opacity:.5;cursor:not-allowed}\n"] }]
        }], propDecorators: { checked: [{
                type: Input
            }], label: [{
                type: Input
            }], disabled: [{
                type: Input
            }], changed: [{
                type: Output
            }] } });
registerSchemaComponent("app-switch", SwitchComponent);

class TextareaComponent {
    label = "";
    placeholder = "";
    disabled = false;
    value = "";
    flexGrow = false;
    input = new EventEmitter();
    handleInput(e) {
        this.value = e.target.value;
        this.input.emit(this.value);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: TextareaComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.25", type: TextareaComponent, isStandalone: true, selector: "app-textarea", inputs: { label: "label", placeholder: "placeholder", disabled: "disabled", value: "value", flexGrow: "flexGrow" }, outputs: { input: "input" }, ngImport: i0, template: `
    @if (label) {
      <label class="textarea-label">{{ label }}</label>
    }
    <textarea
      [placeholder]="placeholder"
      [disabled]="disabled"
      [style.flexGrow]="flexGrow ? 1 : null"
      (input)="handleInput($event)"
    ></textarea>
  `, isInline: true, styles: [":host{display:block}.textarea-label{display:block;font-size:.875rem;font-weight:500;color:var(--text-primary);margin-bottom:.25rem}textarea{width:100%;padding:.5rem .75rem;border-radius:.5rem;border:1px solid var(--border-color);background-color:var(--bg-primary);color:var(--text-primary);box-sizing:border-box;outline:none;font-family:inherit;resize:vertical;min-height:80px}textarea:focus{border-color:var(--accent)}textarea::placeholder{color:var(--text-muted)}textarea:disabled{opacity:.5;cursor:not-allowed}\n"] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: TextareaComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-textarea", standalone: true, template: `
    @if (label) {
      <label class="textarea-label">{{ label }}</label>
    }
    <textarea
      [placeholder]="placeholder"
      [disabled]="disabled"
      [style.flexGrow]="flexGrow ? 1 : null"
      (input)="handleInput($event)"
    ></textarea>
  `, styles: [":host{display:block}.textarea-label{display:block;font-size:.875rem;font-weight:500;color:var(--text-primary);margin-bottom:.25rem}textarea{width:100%;padding:.5rem .75rem;border-radius:.5rem;border:1px solid var(--border-color);background-color:var(--bg-primary);color:var(--text-primary);box-sizing:border-box;outline:none;font-family:inherit;resize:vertical;min-height:80px}textarea:focus{border-color:var(--accent)}textarea::placeholder{color:var(--text-muted)}textarea:disabled{opacity:.5;cursor:not-allowed}\n"] }]
        }], propDecorators: { label: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], disabled: [{
                type: Input
            }], value: [{
                type: Input
            }], flexGrow: [{
                type: Input
            }], input: [{
                type: Output
            }] } });
registerSchemaComponent("app-textarea", TextareaComponent);

class BadgeComponent {
    variant = "default";
    size = "md";
    label = "";
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: BadgeComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.25", type: BadgeComponent, isStandalone: true, selector: "app-badge", inputs: { variant: "variant", size: "size", label: "label" }, ngImport: i0, template: `<span [class]="'badge badge-' + variant + ' badge-' + size">{{
    label
  }}</span>`, isInline: true, styles: [":host{display:inline-flex}.badge{display:inline-flex;align-items:center;border-radius:.25rem;font-weight:500;line-height:1}.badge-default{background-color:var(--bg-elevated);color:var(--text-primary);border:1px solid var(--border-color)}.badge-primary{background-color:var(--accent);color:var(--text-on-accent)}.badge-success{background-color:var(--success);color:var(--text-on-success)}.badge-warning{background-color:var(--warning);color:var(--text-on-warning)}.badge-danger{background-color:var(--error);color:var(--text-on-error)}.badge-sm{padding:.125rem .25rem;font-size:.625rem}.badge-md{padding:.25rem .5rem;font-size:.75rem}.badge-lg{padding:.375rem .75rem;font-size:.875rem}\n"] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: BadgeComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-badge", standalone: true, template: `<span [class]="'badge badge-' + variant + ' badge-' + size">{{
    label
  }}</span>`, styles: [":host{display:inline-flex}.badge{display:inline-flex;align-items:center;border-radius:.25rem;font-weight:500;line-height:1}.badge-default{background-color:var(--bg-elevated);color:var(--text-primary);border:1px solid var(--border-color)}.badge-primary{background-color:var(--accent);color:var(--text-on-accent)}.badge-success{background-color:var(--success);color:var(--text-on-success)}.badge-warning{background-color:var(--warning);color:var(--text-on-warning)}.badge-danger{background-color:var(--error);color:var(--text-on-error)}.badge-sm{padding:.125rem .25rem;font-size:.625rem}.badge-md{padding:.25rem .5rem;font-size:.75rem}.badge-lg{padding:.375rem .75rem;font-size:.875rem}\n"] }]
        }], propDecorators: { variant: [{
                type: Input
            }], size: [{
                type: Input
            }], label: [{
                type: Input
            }] } });
registerSchemaComponent("app-badge", BadgeComponent);

class SelectComponent {
    options = "[]";
    value = "";
    placeholder = "Select an option";
    disabled = false;
    changed = new EventEmitter();
    get parsedOptions() {
        if (Array.isArray(this.options))
            return this.options;
        try {
            return JSON.parse(this.options);
        }
        catch {
            return [];
        }
    }
    handleChange(e) {
        this.value = e.target.value;
        this.changed.emit(this.value);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: SelectComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.25", type: SelectComponent, isStandalone: true, selector: "app-select", inputs: { options: "options", value: "value", placeholder: "placeholder", disabled: "disabled" }, outputs: { changed: "changed" }, ngImport: i0, template: `
    <select
      [value]="value"
      [disabled]="disabled"
      (change)="handleChange($event)"
    >
      <option value="" disabled selected hidden>{{ placeholder }}</option>
      @for (opt of parsedOptions; track opt) {
        <option [value]="opt" [selected]="opt === value">{{ opt }}</option>
      }
    </select>
  `, isInline: true, styles: [":host{display:inline-flex}select{display:inline-flex;align-items:center;padding:.5rem 1rem;border-radius:.5rem;border:1px solid var(--border-color);background-color:var(--bg-elevated);color:var(--text-primary);font-size:1rem;font-weight:500;cursor:pointer;transition:all .15s;min-width:150px}select:hover:not(:disabled){background-color:var(--bg-hover)}select:disabled{opacity:.5;cursor:not-allowed}select:focus{outline:none;border-color:var(--accent)}\n"] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: SelectComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-select", standalone: true, template: `
    <select
      [value]="value"
      [disabled]="disabled"
      (change)="handleChange($event)"
    >
      <option value="" disabled selected hidden>{{ placeholder }}</option>
      @for (opt of parsedOptions; track opt) {
        <option [value]="opt" [selected]="opt === value">{{ opt }}</option>
      }
    </select>
  `, styles: [":host{display:inline-flex}select{display:inline-flex;align-items:center;padding:.5rem 1rem;border-radius:.5rem;border:1px solid var(--border-color);background-color:var(--bg-elevated);color:var(--text-primary);font-size:1rem;font-weight:500;cursor:pointer;transition:all .15s;min-width:150px}select:hover:not(:disabled){background-color:var(--bg-hover)}select:disabled{opacity:.5;cursor:not-allowed}select:focus{outline:none;border-color:var(--accent)}\n"] }]
        }], propDecorators: { options: [{
                type: Input
            }], value: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], disabled: [{
                type: Input
            }], changed: [{
                type: Output
            }] } });
registerSchemaComponent("app-select", SelectComponent);

class CardComponent {
    title = "";
    content = "";
    elevated = false;
    borderRadius = 8;
    padding = 16;
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: CardComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.25", type: CardComponent, isStandalone: true, selector: "app-card", inputs: { title: "title", content: "content", elevated: "elevated", borderRadius: "borderRadius", padding: "padding" }, ngImport: i0, template: `
    <div
      class="card"
      [class.card-elevated]="elevated"
      [style.borderRadius.px]="borderRadius"
    >
      @if (title) {
        <div class="card-header">
          <h3 class="card-title">{{ title }}</h3>
        </div>
      }
      <div class="card-content" [style.padding.px]="padding">
        <ng-content></ng-content>
        @if (!content) {
          {{ content }}
        }
      </div>
    </div>
  `, isInline: true, styles: [":host{display:block}.card{background-color:var(--bg-elevated);border:1px solid var(--border-color);border-radius:.5rem;overflow:hidden;transition:box-shadow .15s}.card-elevated{box-shadow:0 4px 6px -1px #0000001a,0 2px 4px -1px #0000000f}.card-header{padding:1rem;border-bottom:1px solid var(--border-color)}.card-title{margin:0;font-size:1rem;font-weight:600;color:var(--text-primary)}.card-content{padding:1rem;color:var(--text-secondary);font-size:.875rem;line-height:1.5}\n"] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: CardComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-card", standalone: true, template: `
    <div
      class="card"
      [class.card-elevated]="elevated"
      [style.borderRadius.px]="borderRadius"
    >
      @if (title) {
        <div class="card-header">
          <h3 class="card-title">{{ title }}</h3>
        </div>
      }
      <div class="card-content" [style.padding.px]="padding">
        <ng-content></ng-content>
        @if (!content) {
          {{ content }}
        }
      </div>
    </div>
  `, styles: [":host{display:block}.card{background-color:var(--bg-elevated);border:1px solid var(--border-color);border-radius:.5rem;overflow:hidden;transition:box-shadow .15s}.card-elevated{box-shadow:0 4px 6px -1px #0000001a,0 2px 4px -1px #0000000f}.card-header{padding:1rem;border-bottom:1px solid var(--border-color)}.card-title{margin:0;font-size:1rem;font-weight:600;color:var(--text-primary)}.card-content{padding:1rem;color:var(--text-secondary);font-size:.875rem;line-height:1.5}\n"] }]
        }], propDecorators: { title: [{
                type: Input
            }], content: [{
                type: Input
            }], elevated: [{
                type: Input
            }], borderRadius: [{
                type: Input
            }], padding: [{
                type: Input
            }] } });
registerSchemaComponent("app-card", CardComponent);

class StatsCardComponent {
    label = "";
    value = "";
    unit = "";
    icon = "";
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: StatsCardComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.25", type: StatsCardComponent, isStandalone: true, selector: "app-stats-card", inputs: { label: "label", value: "value", unit: "unit", icon: "icon" }, ngImport: i0, template: `
    <div class="stats-card">
      @if (icon) {
        <div class="stats-icon">{{ icon }}</div>
      }
      <div class="stats-value">{{ value }}{{ unit }}</div>
      @if (label) {
        <div class="stats-label">{{ label }}</div>
      }
    </div>
  `, isInline: true, styles: [":host{display:block}.stats-card{background-color:var(--bg-elevated);border:1px solid var(--border-color);border-radius:.75rem;padding:1.5rem;display:flex;flex-direction:column;gap:.5rem}.stats-icon{font-size:1.5rem;color:var(--accent)}.stats-value{font-size:1.75rem;font-weight:700;color:var(--text-primary);line-height:1}.stats-label{font-size:.875rem;color:var(--text-secondary)}\n"] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: StatsCardComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-stats-card", standalone: true, template: `
    <div class="stats-card">
      @if (icon) {
        <div class="stats-icon">{{ icon }}</div>
      }
      <div class="stats-value">{{ value }}{{ unit }}</div>
      @if (label) {
        <div class="stats-label">{{ label }}</div>
      }
    </div>
  `, styles: [":host{display:block}.stats-card{background-color:var(--bg-elevated);border:1px solid var(--border-color);border-radius:.75rem;padding:1.5rem;display:flex;flex-direction:column;gap:.5rem}.stats-icon{font-size:1.5rem;color:var(--accent)}.stats-value{font-size:1.75rem;font-weight:700;color:var(--text-primary);line-height:1}.stats-label{font-size:.875rem;color:var(--text-secondary)}\n"] }]
        }], propDecorators: { label: [{
                type: Input
            }], value: [{
                type: Input
            }], unit: [{
                type: Input
            }], icon: [{
                type: Input
            }] } });
registerSchemaComponent("app-stats-card", StatsCardComponent);

class TableViewComponent {
    columns = "[]";
    data = "[]";
    get parsedColumns() {
        if (Array.isArray(this.columns))
            return this.columns;
        try {
            return JSON.parse(this.columns);
        }
        catch {
            return [];
        }
    }
    get parsedData() {
        if (Array.isArray(this.data))
            return this.data;
        try {
            return JSON.parse(this.data);
        }
        catch {
            return [];
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: TableViewComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.25", type: TableViewComponent, isStandalone: true, selector: "app-table-view", inputs: { columns: "columns", data: "data" }, ngImport: i0, template: `
    <table>
      <thead>
        <tr>
          @for (col of parsedColumns; track col.key) {
            <th>{{ col.name }}</th>
          }
        </tr>
      </thead>
      <tbody>
        @for (row of parsedData; track row) {
          <tr>
            @for (col of parsedColumns; track col.key) {
              <td>{{ row[col.key] }}</td>
            }
          </tr>
        }
      </tbody>
    </table>
  `, isInline: true, styles: [":host{display:block;overflow-x:auto}table{width:100%;border-collapse:collapse;font-size:.875rem}th{text-align:left;padding:.75rem 1rem;background-color:var(--bg-secondary);color:var(--text-primary);font-weight:600;border-bottom:1px solid var(--border-color)}td{padding:.75rem 1rem;color:var(--text-primary);border-bottom:1px solid var(--border-color)}tr:hover td{background-color:var(--bg-hover)}\n"] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: TableViewComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-table-view", standalone: true, template: `
    <table>
      <thead>
        <tr>
          @for (col of parsedColumns; track col.key) {
            <th>{{ col.name }}</th>
          }
        </tr>
      </thead>
      <tbody>
        @for (row of parsedData; track row) {
          <tr>
            @for (col of parsedColumns; track col.key) {
              <td>{{ row[col.key] }}</td>
            }
          </tr>
        }
      </tbody>
    </table>
  `, styles: [":host{display:block;overflow-x:auto}table{width:100%;border-collapse:collapse;font-size:.875rem}th{text-align:left;padding:.75rem 1rem;background-color:var(--bg-secondary);color:var(--text-primary);font-weight:600;border-bottom:1px solid var(--border-color)}td{padding:.75rem 1rem;color:var(--text-primary);border-bottom:1px solid var(--border-color)}tr:hover td{background-color:var(--bg-hover)}\n"] }]
        }], propDecorators: { columns: [{
                type: Input
            }], data: [{
                type: Input
            }] } });
registerSchemaComponent("app-table-view", TableViewComponent);

class DataTableComponent {
    columns = "[]";
    data = "[]";
    selectable = false;
    rowSelected = new EventEmitter();
    selectedIndex = -1;
    get parsedColumns() {
        if (Array.isArray(this.columns))
            return this.columns;
        try {
            return JSON.parse(this.columns);
        }
        catch {
            return [];
        }
    }
    get parsedData() {
        if (Array.isArray(this.data))
            return this.data;
        try {
            return JSON.parse(this.data);
        }
        catch {
            return [];
        }
    }
    selectRow(index) {
        if (!this.selectable)
            return;
        this.selectedIndex = index;
        this.rowSelected.emit(index);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: DataTableComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.25", type: DataTableComponent, isStandalone: true, selector: "app-data-table", inputs: { columns: "columns", data: "data", selectable: "selectable" }, outputs: { rowSelected: "rowSelected" }, ngImport: i0, template: `
    <table>
      <thead>
        <tr>
          @if (selectable) {
            <th class="radio-cell"></th>
          }
          @for (col of parsedColumns; track col.key) {
            <th>{{ col.name }}</th>
          }
        </tr>
      </thead>
      <tbody>
        @for (row of parsedData; track row; let idx = $index) {
          <tr
            [class.selectable]="selectable"
            [class.selected]="selectedIndex === idx"
            (click)="selectRow(idx)"
          >
            @if (selectable) {
              <td>
                <span
                  class="radio"
                  [class.checked]="selectedIndex === idx"
                ></span>
              </td>
            }
            @for (col of parsedColumns; track col.key) {
              <td>{{ row[col.key] }}</td>
            }
          </tr>
        }
      </tbody>
    </table>
  `, isInline: true, styles: [":host{display:block;overflow-x:auto}table{width:100%;border-collapse:collapse;font-size:.875rem}th{text-align:left;padding:.75rem 1rem;background-color:var(--bg-secondary);color:var(--text-primary);font-weight:600;border-bottom:1px solid var(--border-color)}td{padding:.75rem 1rem;color:var(--text-primary);border-bottom:1px solid var(--border-color)}tr{cursor:default}tr:hover td{background-color:var(--bg-hover)}tr.selected td{background-color:var(--accent);color:var(--text-on-accent)}tr.selectable{cursor:pointer}.radio-cell{width:2rem}.radio{width:1rem;height:1rem;border:2px solid var(--border-color);border-radius:50%;display:inline-block}tr.selected .radio{border-color:var(--text-on-accent);background-color:var(--text-on-accent)}\n"] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: DataTableComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-data-table", standalone: true, template: `
    <table>
      <thead>
        <tr>
          @if (selectable) {
            <th class="radio-cell"></th>
          }
          @for (col of parsedColumns; track col.key) {
            <th>{{ col.name }}</th>
          }
        </tr>
      </thead>
      <tbody>
        @for (row of parsedData; track row; let idx = $index) {
          <tr
            [class.selectable]="selectable"
            [class.selected]="selectedIndex === idx"
            (click)="selectRow(idx)"
          >
            @if (selectable) {
              <td>
                <span
                  class="radio"
                  [class.checked]="selectedIndex === idx"
                ></span>
              </td>
            }
            @for (col of parsedColumns; track col.key) {
              <td>{{ row[col.key] }}</td>
            }
          </tr>
        }
      </tbody>
    </table>
  `, styles: [":host{display:block;overflow-x:auto}table{width:100%;border-collapse:collapse;font-size:.875rem}th{text-align:left;padding:.75rem 1rem;background-color:var(--bg-secondary);color:var(--text-primary);font-weight:600;border-bottom:1px solid var(--border-color)}td{padding:.75rem 1rem;color:var(--text-primary);border-bottom:1px solid var(--border-color)}tr{cursor:default}tr:hover td{background-color:var(--bg-hover)}tr.selected td{background-color:var(--accent);color:var(--text-on-accent)}tr.selectable{cursor:pointer}.radio-cell{width:2rem}.radio{width:1rem;height:1rem;border:2px solid var(--border-color);border-radius:50%;display:inline-block}tr.selected .radio{border-color:var(--text-on-accent);background-color:var(--text-on-accent)}\n"] }]
        }], propDecorators: { columns: [{
                type: Input
            }], data: [{
                type: Input
            }], selectable: [{
                type: Input
            }], rowSelected: [{
                type: Output
            }] } });
registerSchemaComponent("app-data-table", DataTableComponent);

class JsonViewComponent {
    data = {};
    sanitizer = inject(DomSanitizer);
    get safeHtml() {
        return this.sanitizer.bypassSecurityTrustHtml(this.formattedHtml);
    }
    get formattedHtml() {
        const formatted = JSON.stringify(this.data, null, 2);
        return this.syntaxHighlight(formatted);
    }
    syntaxHighlight(json) {
        return json
            .replace(/("(?:[^"\\]|\\.)*")\s*:/g, '<span class="json-key">$1</span>:')
            .replace(/"((?:[^"\\]|\\.)*)"/g, '<span class="json-string">"$1"</span>')
            .replace(/\b(-?\d+\.?\d*(?:[eE][+-]?\d+)?)\b/g, '<span class="json-number">$1</span>')
            .replace(/\b(true|false)\b/g, '<span class="json-boolean">$1</span>')
            .replace(/\bnull\b/g, '<span class="json-null">null</span>');
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: JsonViewComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.25", type: JsonViewComponent, isStandalone: true, selector: "app-json-view", inputs: { data: "data" }, ngImport: i0, template: `<div class="json-container" [innerHTML]="safeHtml"></div>`, isInline: true, styles: [":host{display:block}.json-container{background-color:var(--bg-secondary);border:1px solid var(--border-color);border-radius:.5rem;padding:1rem;font-family:monospace;font-size:.875rem;overflow-x:auto;white-space:pre-wrap;word-break:break-word}.json-key{color:var(--accent)}.json-string{color:var(--success)}.json-number{color:var(--warning)}.json-boolean{color:var(--error)}.json-null{color:var(--text-muted)}\n"] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: JsonViewComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-json-view", standalone: true, template: `<div class="json-container" [innerHTML]="safeHtml"></div>`, styles: [":host{display:block}.json-container{background-color:var(--bg-secondary);border:1px solid var(--border-color);border-radius:.5rem;padding:1rem;font-family:monospace;font-size:.875rem;overflow-x:auto;white-space:pre-wrap;word-break:break-word}.json-key{color:var(--accent)}.json-string{color:var(--success)}.json-number{color:var(--warning)}.json-boolean{color:var(--error)}.json-null{color:var(--text-muted)}\n"] }]
        }], propDecorators: { data: [{
                type: Input
            }] } });
registerSchemaComponent("app-json-view", JsonViewComponent);

class ComponentPaletteComponent {
    categories = "[]";
    searchable = false;
    searchQuery = "";
    collapsedCategories = new Set();
    get parsedCategories() {
        if (Array.isArray(this.categories))
            return this.categories;
        try {
            return JSON.parse(this.categories);
        }
        catch {
            return [];
        }
    }
    get filteredCategories() {
        if (!this.searchQuery)
            return this.parsedCategories;
        return this.parsedCategories
            .map((cat) => ({
            ...cat,
            components: cat.components.filter((c) => c.toLowerCase().includes(this.searchQuery.toLowerCase())),
        }))
            .filter((cat) => cat.components.length > 0);
    }
    toggleCategory(name) {
        if (this.collapsedCategories.has(name)) {
            this.collapsedCategories.delete(name);
        }
        else {
            this.collapsedCategories.add(name);
        }
    }
    isCollapsed(name) {
        return this.collapsedCategories.has(name);
    }
    onSearch(e) {
        this.searchQuery = e.target.value;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: ComponentPaletteComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.25", type: ComponentPaletteComponent, isStandalone: true, selector: "app-component-palette", inputs: { categories: "categories", searchable: "searchable" }, ngImport: i0, template: `
    <div class="palette-header">
      <div class="palette-title">Components</div>
      @if (searchable) {
        <input
          type="text"
          class="search-input"
          placeholder="Search components..."
          [value]="searchQuery"
          (input)="onSearch($event)"
        />
      }
    </div>
    <div class="palette-content">
      @for (cat of filteredCategories; track cat.name) {
        <div class="category">
          <div class="category-header" (click)="toggleCategory(cat.name)">
            <span>{{ cat.name }}</span>
            <span
              class="category-arrow"
              [class.collapsed]="isCollapsed(cat.name)"
              >▼</span
            >
          </div>
          <div class="category-items" [class.collapsed]="isCollapsed(cat.name)">
            @for (comp of cat.components; track comp) {
              <div class="component-item" draggable="true">{{ comp }}</div>
            }
          </div>
        </div>
      }
    </div>
  `, isInline: true, styles: [":host{display:block;background-color:var(--bg-elevated);border-right:1px solid var(--border-color);height:100%;overflow-y:auto}.palette-header{padding:1rem;border-bottom:1px solid var(--border-color)}.palette-title{font-size:.875rem;font-weight:600;color:var(--text-primary);margin-bottom:.75rem}.search-input{width:100%;padding:.5rem .75rem;border:1px solid var(--border-color);border-radius:.5rem;background-color:var(--bg-primary);color:var(--text-primary);font-size:.875rem;box-sizing:border-box}.search-input::placeholder{color:var(--text-muted)}.search-input:focus{outline:none;border-color:var(--accent)}.category{border-bottom:1px solid var(--border-color)}.category-header{display:flex;align-items:center;justify-content:space-between;padding:.75rem 1rem;cursor:pointer;color:var(--text-primary);font-weight:500;font-size:.875rem}.category-header:hover{background-color:var(--bg-hover)}.category-arrow{transition:transform .2s;font-size:.75rem}.category-arrow.collapsed{transform:rotate(-90deg)}.category-items{padding:0 1rem .75rem;display:flex;flex-direction:column;gap:.25rem}.category-items.collapsed{display:none}.component-item{padding:.5rem .75rem;border-radius:.375rem;font-size:.875rem;color:var(--text-secondary);cursor:grab}.component-item:hover{background-color:var(--bg-hover);color:var(--text-primary)}.component-item:active{cursor:grabbing}\n"] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: ComponentPaletteComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-component-palette", standalone: true, template: `
    <div class="palette-header">
      <div class="palette-title">Components</div>
      @if (searchable) {
        <input
          type="text"
          class="search-input"
          placeholder="Search components..."
          [value]="searchQuery"
          (input)="onSearch($event)"
        />
      }
    </div>
    <div class="palette-content">
      @for (cat of filteredCategories; track cat.name) {
        <div class="category">
          <div class="category-header" (click)="toggleCategory(cat.name)">
            <span>{{ cat.name }}</span>
            <span
              class="category-arrow"
              [class.collapsed]="isCollapsed(cat.name)"
              >▼</span
            >
          </div>
          <div class="category-items" [class.collapsed]="isCollapsed(cat.name)">
            @for (comp of cat.components; track comp) {
              <div class="component-item" draggable="true">{{ comp }}</div>
            }
          </div>
        </div>
      }
    </div>
  `, styles: [":host{display:block;background-color:var(--bg-elevated);border-right:1px solid var(--border-color);height:100%;overflow-y:auto}.palette-header{padding:1rem;border-bottom:1px solid var(--border-color)}.palette-title{font-size:.875rem;font-weight:600;color:var(--text-primary);margin-bottom:.75rem}.search-input{width:100%;padding:.5rem .75rem;border:1px solid var(--border-color);border-radius:.5rem;background-color:var(--bg-primary);color:var(--text-primary);font-size:.875rem;box-sizing:border-box}.search-input::placeholder{color:var(--text-muted)}.search-input:focus{outline:none;border-color:var(--accent)}.category{border-bottom:1px solid var(--border-color)}.category-header{display:flex;align-items:center;justify-content:space-between;padding:.75rem 1rem;cursor:pointer;color:var(--text-primary);font-weight:500;font-size:.875rem}.category-header:hover{background-color:var(--bg-hover)}.category-arrow{transition:transform .2s;font-size:.75rem}.category-arrow.collapsed{transform:rotate(-90deg)}.category-items{padding:0 1rem .75rem;display:flex;flex-direction:column;gap:.25rem}.category-items.collapsed{display:none}.component-item{padding:.5rem .75rem;border-radius:.375rem;font-size:.875rem;color:var(--text-secondary);cursor:grab}.component-item:hover{background-color:var(--bg-hover);color:var(--text-primary)}.component-item:active{cursor:grabbing}\n"] }]
        }], propDecorators: { categories: [{
                type: Input
            }], searchable: [{
                type: Input
            }] } });
registerSchemaComponent("app-component-palette", ComponentPaletteComponent);

class CanvasComponent {
    elements = null;
    gridColumns = 12;
    showGrid = false;
    selectedId = null;
    elementSelected = new EventEmitter();
    get parsedElements() {
        return this.elements || [];
    }
    get gridCells() {
        return Array(this.gridColumns * 6).fill(0);
    }
    selectElement(id) {
        this.selectedId = id;
        this.elementSelected.emit(id);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: CanvasComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.25", type: CanvasComponent, isStandalone: true, selector: "app-canvas", inputs: { elements: "elements", gridColumns: "gridColumns", showGrid: "showGrid", selectedId: "selectedId" }, outputs: { elementSelected: "elementSelected" }, ngImport: i0, template: `
    <div class="canvas-area" [style.--grid-cols]="gridColumns">
      @if (showGrid) {
        <div class="grid visible">
          @for (cell of gridCells; track cell) {
            <div class="grid-cell"></div>
          }
        </div>
      }
      @if (parsedElements.length > 0) {
        @for (el of parsedElements; track el.id) {
          <div
            class="canvas-element"
            [class.selected]="selectedId === el.id"
            [style.gridColumn]="
              (el.gridPosition?.column || 1) +
              ' / span ' +
              (el.gridPosition?.colSpan || 1)
            "
            [style.gridRow]="
              (el.gridPosition?.row || 1) +
              ' / span ' +
              (el.gridPosition?.rowSpan || 1)
            "
            (click)="selectElement(el.id)"
          >
            <span>{{ el.icon || "⊡" }}</span>
            <span>{{ el.name || el.componentId }}</span>
          </div>
        }
      } @else {
        <div class="canvas-placeholder">
          <ng-content></ng-content>
        </div>
      }
    </div>
  `, isInline: true, styles: [":host{display:block;width:100%;height:100%;background-color:var(--bg-primary);position:relative;overflow:auto}.canvas-area{min-width:100%;min-height:100%;position:relative;display:grid;grid-template-columns:repeat(var(--grid-cols, 12),1fr)}.grid{position:absolute;inset:0;pointer-events:none;display:grid;grid-template-columns:repeat(var(--grid-cols),1fr);gap:0}.grid-cell{border-right:1px solid var(--border-color);border-bottom:1px solid var(--border-color);min-height:4rem}.canvas-element{border:2px dashed transparent;border-radius:.5rem;padding:.5rem;cursor:move;transition:border-color .15s;display:flex;align-items:center;gap:.5rem}.canvas-element:hover{border-color:var(--accent)}.canvas-element.selected{border-color:var(--accent);border-style:solid;box-shadow:0 0 0 2px rgba(var(--accent-rgb, 99, 102, 241),.2)}.canvas-placeholder{border:2px dashed var(--border-color);border-radius:.5rem;background-color:var(--bg-secondary);display:flex;align-items:center;justify-content:center;color:var(--text-muted);font-size:.875rem;min-height:200px}\n"] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: CanvasComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-canvas", standalone: true, template: `
    <div class="canvas-area" [style.--grid-cols]="gridColumns">
      @if (showGrid) {
        <div class="grid visible">
          @for (cell of gridCells; track cell) {
            <div class="grid-cell"></div>
          }
        </div>
      }
      @if (parsedElements.length > 0) {
        @for (el of parsedElements; track el.id) {
          <div
            class="canvas-element"
            [class.selected]="selectedId === el.id"
            [style.gridColumn]="
              (el.gridPosition?.column || 1) +
              ' / span ' +
              (el.gridPosition?.colSpan || 1)
            "
            [style.gridRow]="
              (el.gridPosition?.row || 1) +
              ' / span ' +
              (el.gridPosition?.rowSpan || 1)
            "
            (click)="selectElement(el.id)"
          >
            <span>{{ el.icon || "⊡" }}</span>
            <span>{{ el.name || el.componentId }}</span>
          </div>
        }
      } @else {
        <div class="canvas-placeholder">
          <ng-content></ng-content>
        </div>
      }
    </div>
  `, styles: [":host{display:block;width:100%;height:100%;background-color:var(--bg-primary);position:relative;overflow:auto}.canvas-area{min-width:100%;min-height:100%;position:relative;display:grid;grid-template-columns:repeat(var(--grid-cols, 12),1fr)}.grid{position:absolute;inset:0;pointer-events:none;display:grid;grid-template-columns:repeat(var(--grid-cols),1fr);gap:0}.grid-cell{border-right:1px solid var(--border-color);border-bottom:1px solid var(--border-color);min-height:4rem}.canvas-element{border:2px dashed transparent;border-radius:.5rem;padding:.5rem;cursor:move;transition:border-color .15s;display:flex;align-items:center;gap:.5rem}.canvas-element:hover{border-color:var(--accent)}.canvas-element.selected{border-color:var(--accent);border-style:solid;box-shadow:0 0 0 2px rgba(var(--accent-rgb, 99, 102, 241),.2)}.canvas-placeholder{border:2px dashed var(--border-color);border-radius:.5rem;background-color:var(--bg-secondary);display:flex;align-items:center;justify-content:center;color:var(--text-muted);font-size:.875rem;min-height:200px}\n"] }]
        }], propDecorators: { elements: [{
                type: Input
            }], gridColumns: [{
                type: Input
            }], showGrid: [{
                type: Input
            }], selectedId: [{
                type: Input
            }], elementSelected: [{
                type: Output
            }] } });
registerSchemaComponent("app-canvas", CanvasComponent);

class PropertiesPanelComponent {
    element = "";
    propertyChange = new EventEmitter();
    elementId = null;
    properties = [];
    ngOnChanges(changes) {
        if (changes["element"]) {
            this.parseElement();
        }
    }
    parseElement() {
        try {
            const parsed = JSON.parse(this.element);
            this.elementId = parsed.id || null;
            this.properties = parsed.properties || [];
        }
        catch {
            this.properties = [];
            this.elementId = null;
        }
    }
    handleChange(key, e) {
        const checked = e.target.checked;
        this.propertyChange.emit({ key, value: checked });
    }
    handleInputChange(prop, e) {
        const input = e.target;
        this.propertyChange.emit({
            key: prop.key,
            value: prop.type === "number" ? Number(input.value) : input.value,
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: PropertiesPanelComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.25", type: PropertiesPanelComponent, isStandalone: true, selector: "app-properties-panel", inputs: { element: "element" }, outputs: { propertyChange: "propertyChange" }, usesOnChanges: true, ngImport: i0, template: `
    <div class="panel-header">
      <div class="panel-title">Properties</div>
      @if (elementId) {
        <div class="element-id">{{ elementId }}</div>
      }
    </div>
    @if (properties.length > 0) {
      <div class="properties-section">
        <div class="section-title">Properties</div>
        @for (prop of properties; track prop.key) {
          <div class="property-row">
            <label class="property-label">{{ prop.label }}</label>
            @if (prop.type === "boolean") {
              <input
                type="checkbox"
                class="property-input"
                [checked]="prop.value"
                (change)="handleChange(prop.key, $event)"
              />
            } @else if (prop.type === "select") {
              <select
                class="property-input"
                [value]="prop.value"
                (change)="handleChange(prop.key, $event)"
              >
                @for (opt of prop.options || []; track opt) {
                  <option [value]="opt" [selected]="opt === prop.value">
                    {{ opt }}
                  </option>
                }
              </select>
            } @else {
              <input
                [type]="prop.type === 'number' ? 'number' : 'text'"
                class="property-input"
                [value]="prop.value"
                (input)="handleInputChange(prop, $event)"
              />
            }
          </div>
        }
      </div>
    } @else {
      <div class="empty-state">No element selected</div>
    }
  `, isInline: true, styles: [":host{display:block;background-color:var(--bg-elevated);border-left:1px solid var(--border-color);height:100%;overflow-y:auto}.panel-header{padding:1rem;border-bottom:1px solid var(--border-color)}.panel-title{font-size:.875rem;font-weight:600;color:var(--text-primary);margin-bottom:.25rem}.element-id{font-size:.75rem;color:var(--text-muted);font-family:monospace}.properties-section{padding:1rem}.section-title{font-size:.75rem;font-weight:600;color:var(--text-secondary);text-transform:uppercase;letter-spacing:.05em;margin-bottom:.75rem}.property-row{display:flex;flex-direction:column;gap:.25rem;margin-bottom:.75rem}.property-label{font-size:.875rem;color:var(--text-primary)}.property-input{padding:.5rem .75rem;border:1px solid var(--border-color);border-radius:.5rem;background-color:var(--bg-primary);color:var(--text-primary);font-size:.875rem}.property-input:focus{outline:none;border-color:var(--accent)}.property-input[type=checkbox]{width:1rem;height:1rem}select.property-input{cursor:pointer}.empty-state{padding:2rem 1rem;text-align:center;color:var(--text-muted);font-size:.875rem}\n"] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: PropertiesPanelComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-properties-panel", standalone: true, template: `
    <div class="panel-header">
      <div class="panel-title">Properties</div>
      @if (elementId) {
        <div class="element-id">{{ elementId }}</div>
      }
    </div>
    @if (properties.length > 0) {
      <div class="properties-section">
        <div class="section-title">Properties</div>
        @for (prop of properties; track prop.key) {
          <div class="property-row">
            <label class="property-label">{{ prop.label }}</label>
            @if (prop.type === "boolean") {
              <input
                type="checkbox"
                class="property-input"
                [checked]="prop.value"
                (change)="handleChange(prop.key, $event)"
              />
            } @else if (prop.type === "select") {
              <select
                class="property-input"
                [value]="prop.value"
                (change)="handleChange(prop.key, $event)"
              >
                @for (opt of prop.options || []; track opt) {
                  <option [value]="opt" [selected]="opt === prop.value">
                    {{ opt }}
                  </option>
                }
              </select>
            } @else {
              <input
                [type]="prop.type === 'number' ? 'number' : 'text'"
                class="property-input"
                [value]="prop.value"
                (input)="handleInputChange(prop, $event)"
              />
            }
          </div>
        }
      </div>
    } @else {
      <div class="empty-state">No element selected</div>
    }
  `, styles: [":host{display:block;background-color:var(--bg-elevated);border-left:1px solid var(--border-color);height:100%;overflow-y:auto}.panel-header{padding:1rem;border-bottom:1px solid var(--border-color)}.panel-title{font-size:.875rem;font-weight:600;color:var(--text-primary);margin-bottom:.25rem}.element-id{font-size:.75rem;color:var(--text-muted);font-family:monospace}.properties-section{padding:1rem}.section-title{font-size:.75rem;font-weight:600;color:var(--text-secondary);text-transform:uppercase;letter-spacing:.05em;margin-bottom:.75rem}.property-row{display:flex;flex-direction:column;gap:.25rem;margin-bottom:.75rem}.property-label{font-size:.875rem;color:var(--text-primary)}.property-input{padding:.5rem .75rem;border:1px solid var(--border-color);border-radius:.5rem;background-color:var(--bg-primary);color:var(--text-primary);font-size:.875rem}.property-input:focus{outline:none;border-color:var(--accent)}.property-input[type=checkbox]{width:1rem;height:1rem}select.property-input{cursor:pointer}.empty-state{padding:2rem 1rem;text-align:center;color:var(--text-muted);font-size:.875rem}\n"] }]
        }], propDecorators: { element: [{
                type: Input
            }], propertyChange: [{
                type: Output
            }] } });
registerSchemaComponent("app-properties-panel", PropertiesPanelComponent);

class BottomPanelComponent {
    tabs = "[]";
    activeTab = "";
    position = "bottom";
    fullWidth = false;
    floating = false;
    borderRadius = 0;
    tabChange = new EventEmitter();
    get parsedTabs() {
        if (Array.isArray(this.tabs))
            return this.tabs;
        try {
            return JSON.parse(this.tabs);
        }
        catch {
            return [];
        }
    }
    handleTabClick(tabId) {
        this.activeTab = tabId;
        this.tabChange.emit(tabId);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: BottomPanelComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.25", type: BottomPanelComponent, isStandalone: true, selector: "app-bottom-panel", inputs: { tabs: "tabs", activeTab: "activeTab", position: "position", fullWidth: "fullWidth", floating: "floating", borderRadius: "borderRadius" }, outputs: { tabChange: "tabChange" }, ngImport: i0, template: `
    <div class="panel-tabs">
      @for (tab of parsedTabs; track tab.id) {
        <div
          class="panel-tab"
          [class.active]="activeTab === tab.id"
          (click)="handleTabClick(tab.id)"
        >
          {{ tab.label }}
        </div>
      }
    </div>
    <div class="panel-content">
      <ng-content></ng-content>
      @if (!parsedTabs.length) {
        <div class="empty-state">No tabs available</div>
      }
    </div>
  `, isInline: true, styles: [":host{display:flex;flex-direction:column;background-color:var(--bg-elevated);border-top:1px solid var(--border-color);height:100%}.panel-tabs{display:flex;gap:0;border-bottom:1px solid var(--border-color);padding:0 .5rem}.panel-tab{padding:.75rem 1rem;font-size:.875rem;font-weight:500;color:var(--text-secondary);cursor:pointer;border-bottom:2px solid transparent;margin-bottom:-1px;transition:all .15s}.panel-tab:hover{color:var(--text-primary)}.panel-tab.active{color:var(--accent);border-bottom-color:var(--accent)}.panel-content{flex:1;overflow:auto;padding:1rem}.empty-state{color:var(--text-muted);font-size:.875rem;text-align:center;padding:2rem}\n"] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: BottomPanelComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-bottom-panel", standalone: true, template: `
    <div class="panel-tabs">
      @for (tab of parsedTabs; track tab.id) {
        <div
          class="panel-tab"
          [class.active]="activeTab === tab.id"
          (click)="handleTabClick(tab.id)"
        >
          {{ tab.label }}
        </div>
      }
    </div>
    <div class="panel-content">
      <ng-content></ng-content>
      @if (!parsedTabs.length) {
        <div class="empty-state">No tabs available</div>
      }
    </div>
  `, styles: [":host{display:flex;flex-direction:column;background-color:var(--bg-elevated);border-top:1px solid var(--border-color);height:100%}.panel-tabs{display:flex;gap:0;border-bottom:1px solid var(--border-color);padding:0 .5rem}.panel-tab{padding:.75rem 1rem;font-size:.875rem;font-weight:500;color:var(--text-secondary);cursor:pointer;border-bottom:2px solid transparent;margin-bottom:-1px;transition:all .15s}.panel-tab:hover{color:var(--text-primary)}.panel-tab.active{color:var(--accent);border-bottom-color:var(--accent)}.panel-content{flex:1;overflow:auto;padding:1rem}.empty-state{color:var(--text-muted);font-size:.875rem;text-align:center;padding:2rem}\n"] }]
        }], propDecorators: { tabs: [{
                type: Input
            }], activeTab: [{
                type: Input
            }], position: [{
                type: Input
            }], fullWidth: [{
                type: Input
            }], floating: [{
                type: Input
            }], borderRadius: [{
                type: Input
            }], tabChange: [{
                type: Output
            }] } });
registerSchemaComponent("app-bottom-panel", BottomPanelComponent);

class HeaderComponent {
    title = "";
    subtitle = "";
    icon = "";
    showBack = false;
    breadcrumbs = "[]";
    navigateBack = new EventEmitter();
    get parsedBreadcrumbs() {
        if (Array.isArray(this.breadcrumbs))
            return this.breadcrumbs;
        try {
            return JSON.parse(this.breadcrumbs);
        }
        catch {
            return [];
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: HeaderComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.25", type: HeaderComponent, isStandalone: true, selector: "app-header", inputs: { title: "title", subtitle: "subtitle", icon: "icon", showBack: "showBack", breadcrumbs: "breadcrumbs" }, outputs: { navigateBack: "navigateBack" }, ngImport: i0, template: `
    <header>
      @if (showBack) {
        <button
          class="back-btn"
          (click)="navigateBack.emit()"
          aria-label="Back"
        >
          &larr;
        </button>
      }
      <div class="title-area">
        <h1>{{ title }}</h1>
        @if (parsedBreadcrumbs.length) {
          <div class="breadcrumbs">
            @for (
              crumb of parsedBreadcrumbs;
              track crumb.label;
              let last = $last
            ) {
              @if (!last && crumb.href) {
                <a [href]="crumb.href">{{ crumb.label }}</a>
              } @else {
                <span>{{ crumb.label }}</span>
              }
              @if (!last) {
                <span class="breadcrumb-separator">/</span>
              }
            }
          </div>
        }
      </div>
      <ng-content></ng-content>
    </header>
  `, isInline: true, styles: [":host{display:block}header{display:flex;align-items:center;padding:1rem 1.5rem;background:var(--bg-header, var(--bg-elevated));border-bottom:1px solid var(--border-color);min-height:56px;gap:1rem}.back-btn{display:flex;align-items:center;justify-content:center;width:36px;height:36px;border:1px solid var(--border-color);border-radius:.5rem;background:var(--bg-elevated);color:var(--text-primary);cursor:pointer;transition:all .15s;padding:0;font-size:1.25rem}.back-btn:hover{background:var(--bg-hover)}.title-area{flex:1;display:flex;flex-direction:column;gap:.25rem}h1{margin:0;font-size:1.25rem;font-weight:600;color:var(--text-primary)}.breadcrumbs{display:flex;align-items:center;gap:.5rem;font-size:.875rem;color:var(--text-secondary)}.breadcrumb-separator{color:var(--text-secondary);opacity:.5}\n"] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: HeaderComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-header", standalone: true, template: `
    <header>
      @if (showBack) {
        <button
          class="back-btn"
          (click)="navigateBack.emit()"
          aria-label="Back"
        >
          &larr;
        </button>
      }
      <div class="title-area">
        <h1>{{ title }}</h1>
        @if (parsedBreadcrumbs.length) {
          <div class="breadcrumbs">
            @for (
              crumb of parsedBreadcrumbs;
              track crumb.label;
              let last = $last
            ) {
              @if (!last && crumb.href) {
                <a [href]="crumb.href">{{ crumb.label }}</a>
              } @else {
                <span>{{ crumb.label }}</span>
              }
              @if (!last) {
                <span class="breadcrumb-separator">/</span>
              }
            }
          </div>
        }
      </div>
      <ng-content></ng-content>
    </header>
  `, styles: [":host{display:block}header{display:flex;align-items:center;padding:1rem 1.5rem;background:var(--bg-header, var(--bg-elevated));border-bottom:1px solid var(--border-color);min-height:56px;gap:1rem}.back-btn{display:flex;align-items:center;justify-content:center;width:36px;height:36px;border:1px solid var(--border-color);border-radius:.5rem;background:var(--bg-elevated);color:var(--text-primary);cursor:pointer;transition:all .15s;padding:0;font-size:1.25rem}.back-btn:hover{background:var(--bg-hover)}.title-area{flex:1;display:flex;flex-direction:column;gap:.25rem}h1{margin:0;font-size:1.25rem;font-weight:600;color:var(--text-primary)}.breadcrumbs{display:flex;align-items:center;gap:.5rem;font-size:.875rem;color:var(--text-secondary)}.breadcrumb-separator{color:var(--text-secondary);opacity:.5}\n"] }]
        }], propDecorators: { title: [{
                type: Input
            }], subtitle: [{
                type: Input
            }], icon: [{
                type: Input
            }], showBack: [{
                type: Input
            }], breadcrumbs: [{
                type: Input
            }], navigateBack: [{
                type: Output
            }] } });
registerSchemaComponent("app-header", HeaderComponent);

class SidebarComponent {
    collapsed = false;
    items = "[]";
    width = 240;
    collapsedWidth = 64;
    collapseChanged = new EventEmitter();
    itemClicked = new EventEmitter();
    get parsedItems() {
        if (Array.isArray(this.items))
            return this.items;
        try {
            return JSON.parse(this.items);
        }
        catch {
            return [];
        }
    }
    toggleCollapse() {
        this.collapsed = !this.collapsed;
        this.collapseChanged.emit({ collapsed: this.collapsed });
    }
    handleItemClick(item) {
        this.itemClicked.emit(item);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: SidebarComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.25", type: SidebarComponent, isStandalone: true, selector: "app-sidebar", inputs: { collapsed: "collapsed", items: "items", width: "width", collapsedWidth: "collapsedWidth" }, outputs: { collapseChanged: "collapseChanged", itemClicked: "itemClicked" }, ngImport: i0, template: `
    <aside [class.collapsed]="collapsed" [style.--sidebar-width.px]="width">
      <div class="sidebar-header">
        <button
          class="collapse-btn"
          (click)="toggleCollapse()"
          aria-label="Toggle sidebar"
        >
          {{ collapsed ? "→" : "←" }}
        </button>
      </div>
      <nav>
        <ul>
          @for (item of parsedItems; track item.label) {
            <li>
              <div class="nav-item" (click)="handleItemClick(item)">
                @if (item.icon) {
                  <span class="nav-item-icon">{{ item.icon }}</span>
                }
                <span class="nav-item-label">{{ item.label }}</span>
              </div>
              @if (item.children?.length) {
                <ul class="nav-item-children">
                  @for (child of item.children; track child.label) {
                    <li>
                      <div
                        class="nav-item nav-item-child"
                        (click)="handleItemClick(child)"
                      >
                        @if (child.icon) {
                          <span class="nav-item-icon">{{ child.icon }}</span>
                        }
                        <span class="nav-item-label">{{ child.label }}</span>
                      </div>
                    </li>
                  }
                </ul>
              }
            </li>
          }
        </ul>
      </nav>
      <ng-content></ng-content>
    </aside>
  `, isInline: true, styles: [":host{display:block}aside{display:flex;flex-direction:column;width:var(--sidebar-width, 240px);min-width:var(--sidebar-width, 240px);height:100%;background:var(--bg-elevated);border-right:1px solid var(--border-color);transition:width .2s,min-width .2s;overflow:hidden}aside.collapsed{width:64px;min-width:64px}.sidebar-header{display:flex;align-items:center;justify-content:space-between;padding:1rem;border-bottom:1px solid var(--border-color);min-height:56px}.collapse-btn{display:flex;align-items:center;justify-content:center;width:32px;height:32px;border:1px solid var(--border-color);border-radius:.5rem;background:transparent;color:var(--text-secondary);cursor:pointer;transition:all .15s;padding:0;font-size:1.25rem}.collapse-btn:hover{background:var(--bg-hover);color:var(--text-primary)}nav{flex:1;overflow-y:auto;overflow-x:hidden;padding:.5rem}ul{list-style:none;margin:0;padding:0}li{margin:0}.nav-item{display:flex;align-items:center;gap:.75rem;padding:.625rem .75rem;border-radius:.5rem;color:var(--text-secondary);text-decoration:none;cursor:pointer;transition:all .15s;white-space:nowrap;overflow:hidden}.nav-item:hover{background:var(--bg-hover);color:var(--text-primary)}.nav-item.active{background:var(--accent);color:var(--text-on-accent)}.nav-item-icon{display:flex;align-items:center;justify-content:center;width:20px;height:20px;font-size:1.25rem;flex-shrink:0}.nav-item-label{flex:1;overflow:hidden;text-overflow:ellipsis}.nav-item-children{margin-left:1.25rem;border-left:1px solid var(--border-color);padding-left:.5rem}\n"] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: SidebarComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-sidebar", standalone: true, template: `
    <aside [class.collapsed]="collapsed" [style.--sidebar-width.px]="width">
      <div class="sidebar-header">
        <button
          class="collapse-btn"
          (click)="toggleCollapse()"
          aria-label="Toggle sidebar"
        >
          {{ collapsed ? "→" : "←" }}
        </button>
      </div>
      <nav>
        <ul>
          @for (item of parsedItems; track item.label) {
            <li>
              <div class="nav-item" (click)="handleItemClick(item)">
                @if (item.icon) {
                  <span class="nav-item-icon">{{ item.icon }}</span>
                }
                <span class="nav-item-label">{{ item.label }}</span>
              </div>
              @if (item.children?.length) {
                <ul class="nav-item-children">
                  @for (child of item.children; track child.label) {
                    <li>
                      <div
                        class="nav-item nav-item-child"
                        (click)="handleItemClick(child)"
                      >
                        @if (child.icon) {
                          <span class="nav-item-icon">{{ child.icon }}</span>
                        }
                        <span class="nav-item-label">{{ child.label }}</span>
                      </div>
                    </li>
                  }
                </ul>
              }
            </li>
          }
        </ul>
      </nav>
      <ng-content></ng-content>
    </aside>
  `, styles: [":host{display:block}aside{display:flex;flex-direction:column;width:var(--sidebar-width, 240px);min-width:var(--sidebar-width, 240px);height:100%;background:var(--bg-elevated);border-right:1px solid var(--border-color);transition:width .2s,min-width .2s;overflow:hidden}aside.collapsed{width:64px;min-width:64px}.sidebar-header{display:flex;align-items:center;justify-content:space-between;padding:1rem;border-bottom:1px solid var(--border-color);min-height:56px}.collapse-btn{display:flex;align-items:center;justify-content:center;width:32px;height:32px;border:1px solid var(--border-color);border-radius:.5rem;background:transparent;color:var(--text-secondary);cursor:pointer;transition:all .15s;padding:0;font-size:1.25rem}.collapse-btn:hover{background:var(--bg-hover);color:var(--text-primary)}nav{flex:1;overflow-y:auto;overflow-x:hidden;padding:.5rem}ul{list-style:none;margin:0;padding:0}li{margin:0}.nav-item{display:flex;align-items:center;gap:.75rem;padding:.625rem .75rem;border-radius:.5rem;color:var(--text-secondary);text-decoration:none;cursor:pointer;transition:all .15s;white-space:nowrap;overflow:hidden}.nav-item:hover{background:var(--bg-hover);color:var(--text-primary)}.nav-item.active{background:var(--accent);color:var(--text-on-accent)}.nav-item-icon{display:flex;align-items:center;justify-content:center;width:20px;height:20px;font-size:1.25rem;flex-shrink:0}.nav-item-label{flex:1;overflow:hidden;text-overflow:ellipsis}.nav-item-children{margin-left:1.25rem;border-left:1px solid var(--border-color);padding-left:.5rem}\n"] }]
        }], propDecorators: { collapsed: [{
                type: Input
            }], items: [{
                type: Input
            }], width: [{
                type: Input
            }], collapsedWidth: [{
                type: Input
            }], collapseChanged: [{
                type: Output
            }], itemClicked: [{
                type: Output
            }] } });
registerSchemaComponent("app-sidebar", SidebarComponent);

class FooterComponent {
    text = "";
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: FooterComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.25", type: FooterComponent, isStandalone: true, selector: "app-footer", inputs: { text: "text" }, ngImport: i0, template: `
    <footer>
      @if (text) {
        <p class="footer-text">{{ text }}</p>
      }
      <ng-content></ng-content>
    </footer>
  `, isInline: true, styles: [":host{display:block}footer{display:flex;align-items:center;justify-content:center;padding:1rem;background:var(--bg-elevated);border-top:1px solid var(--border-color);min-height:48px}.footer-text{margin:0;font-size:.875rem;color:var(--text-secondary);text-align:center}\n"] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: FooterComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-footer", standalone: true, template: `
    <footer>
      @if (text) {
        <p class="footer-text">{{ text }}</p>
      }
      <ng-content></ng-content>
    </footer>
  `, styles: [":host{display:block}footer{display:flex;align-items:center;justify-content:center;padding:1rem;background:var(--bg-elevated);border-top:1px solid var(--border-color);min-height:48px}.footer-text{margin:0;font-size:.875rem;color:var(--text-secondary);text-align:center}\n"] }]
        }], propDecorators: { text: [{
                type: Input
            }] } });
registerSchemaComponent("app-footer", FooterComponent);

class PageContainerComponent {
    title = "";
    padding = 24;
    maxWidth = 0;
    width = "";
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: PageContainerComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.25", type: PageContainerComponent, isStandalone: true, selector: "app-page-container", inputs: { title: "title", padding: "padding", maxWidth: "maxWidth", width: "width" }, ngImport: i0, template: `
    @if (title) {
      <div class="page-header">
        <h1 class="page-title">{{ title }}</h1>
        <ng-content select="[slot=header-actions]"></ng-content>
      </div>
    }
    <div
      class="page-content"
      [style.padding.px]="padding"
      [style.maxWidth]="maxWidth ? maxWidth + 'px' : null"
    >
      <ng-content></ng-content>
    </div>
  `, isInline: true, styles: [":host{display:flex;flex-direction:column;height:100%}.page-header{display:flex;align-items:center;padding:1rem 1.5rem;background:var(--bg-elevated);border-bottom:1px solid var(--border-color);min-height:56px;gap:1rem}.page-title{margin:0;font-size:1.25rem;font-weight:600;color:var(--text-primary)}.page-content{flex:1;overflow:auto}\n"] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: PageContainerComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-page-container", standalone: true, template: `
    @if (title) {
      <div class="page-header">
        <h1 class="page-title">{{ title }}</h1>
        <ng-content select="[slot=header-actions]"></ng-content>
      </div>
    }
    <div
      class="page-content"
      [style.padding.px]="padding"
      [style.maxWidth]="maxWidth ? maxWidth + 'px' : null"
    >
      <ng-content></ng-content>
    </div>
  `, styles: [":host{display:flex;flex-direction:column;height:100%}.page-header{display:flex;align-items:center;padding:1rem 1.5rem;background:var(--bg-elevated);border-bottom:1px solid var(--border-color);min-height:56px;gap:1rem}.page-title{margin:0;font-size:1.25rem;font-weight:600;color:var(--text-primary)}.page-content{flex:1;overflow:auto}\n"] }]
        }], propDecorators: { title: [{
                type: Input
            }], padding: [{
                type: Input
            }], maxWidth: [{
                type: Input
            }], width: [{
                type: Input
            }] } });
registerSchemaComponent("app-page-container", PageContainerComponent);

class PageToolbarComponent {
    title = "";
    actions = "[]";
    actionClicked = new EventEmitter();
    get parsedActions() {
        if (Array.isArray(this.actions))
            return this.actions;
        try {
            return JSON.parse(this.actions);
        }
        catch {
            return [];
        }
    }
    handleAction(action) {
        this.actionClicked.emit(action.action || action.label);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: PageToolbarComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.25", type: PageToolbarComponent, isStandalone: true, selector: "app-page-toolbar", inputs: { title: "title", actions: "actions" }, outputs: { actionClicked: "actionClicked" }, ngImport: i0, template: `
    <div class="toolbar">
      <div class="toolbar-title-area">
        <h2 class="toolbar-title">{{ title }}</h2>
        <ng-content select="[slot=subtitle]"></ng-content>
      </div>
      <div class="toolbar-actions">
        @for (action of parsedActions; track action.label) {
          <button
            [class]="'action-btn ' + (action.variant || '')"
            (click)="handleAction(action)"
          >
            @if (action.icon) {
              <mat-icon class="action-icon" [fontIcon]="action.icon" />
            }
            {{ action.label }}
          </button>
        }
      </div>
    </div>
  `, isInline: true, styles: [":host{display:block}.toolbar{display:flex;align-items:center;padding:1rem 1.5rem;background:var(--bg-elevated);border-bottom:1px solid var(--border-color);gap:1rem;flex-wrap:wrap}.toolbar-title-area{flex:1;display:flex;flex-direction:column;gap:.25rem;min-width:200px}.toolbar-title{margin:0;font-size:1.125rem;font-weight:600;color:var(--text-primary)}.toolbar-actions{display:flex;align-items:center;gap:.5rem;flex-wrap:wrap}.action-btn{display:inline-flex;align-items:center;gap:.5rem;padding:.5rem 1rem;border-radius:.5rem;border:1px solid var(--border-color);background:var(--bg-elevated);color:var(--text-primary);font-weight:500;cursor:pointer;transition:all .15s;font-size:.875rem}.action-btn:hover{background:var(--bg-hover)}.action-btn.primary{border-color:var(--accent);background:var(--accent);color:var(--text-on-accent)}.action-btn.primary:hover{background:var(--accent-hover);border-color:var(--accent-hover)}.action-btn.danger{border-color:var(--error);background:var(--error);color:var(--text-on-error)}.action-btn.ghost{border-color:transparent;background:transparent;color:var(--text-secondary)}.action-btn.ghost:hover{background:var(--bg-hover);color:var(--text-primary)}.action-icon{font-size:1.125rem}\n"], dependencies: [{ kind: "ngmodule", type: MatIconModule }, { kind: "component", type: i1.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: PageToolbarComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-page-toolbar", standalone: true, imports: [MatIconModule], template: `
    <div class="toolbar">
      <div class="toolbar-title-area">
        <h2 class="toolbar-title">{{ title }}</h2>
        <ng-content select="[slot=subtitle]"></ng-content>
      </div>
      <div class="toolbar-actions">
        @for (action of parsedActions; track action.label) {
          <button
            [class]="'action-btn ' + (action.variant || '')"
            (click)="handleAction(action)"
          >
            @if (action.icon) {
              <mat-icon class="action-icon" [fontIcon]="action.icon" />
            }
            {{ action.label }}
          </button>
        }
      </div>
    </div>
  `, styles: [":host{display:block}.toolbar{display:flex;align-items:center;padding:1rem 1.5rem;background:var(--bg-elevated);border-bottom:1px solid var(--border-color);gap:1rem;flex-wrap:wrap}.toolbar-title-area{flex:1;display:flex;flex-direction:column;gap:.25rem;min-width:200px}.toolbar-title{margin:0;font-size:1.125rem;font-weight:600;color:var(--text-primary)}.toolbar-actions{display:flex;align-items:center;gap:.5rem;flex-wrap:wrap}.action-btn{display:inline-flex;align-items:center;gap:.5rem;padding:.5rem 1rem;border-radius:.5rem;border:1px solid var(--border-color);background:var(--bg-elevated);color:var(--text-primary);font-weight:500;cursor:pointer;transition:all .15s;font-size:.875rem}.action-btn:hover{background:var(--bg-hover)}.action-btn.primary{border-color:var(--accent);background:var(--accent);color:var(--text-on-accent)}.action-btn.primary:hover{background:var(--accent-hover);border-color:var(--accent-hover)}.action-btn.danger{border-color:var(--error);background:var(--error);color:var(--text-on-error)}.action-btn.ghost{border-color:transparent;background:transparent;color:var(--text-secondary)}.action-btn.ghost:hover{background:var(--bg-hover);color:var(--text-primary)}.action-icon{font-size:1.125rem}\n"] }]
        }], propDecorators: { title: [{
                type: Input
            }], actions: [{
                type: Input
            }], actionClicked: [{
                type: Output
            }] } });
registerSchemaComponent("app-page-toolbar", PageToolbarComponent);

class SplitViewComponent {
    containerEl;
    direction = "horizontal";
    split = 50;
    minFirst = 20;
    minSecond = 20;
    splitChanged = new EventEmitter();
    isDragging = false;
    onMouseMove = null;
    onMouseUp = null;
    onDividerMouseDown(e) {
        e.preventDefault();
        this.isDragging = true;
        this.onMouseMove = (moveEvent) => {
            if (!this.isDragging)
                return;
            const container = this.containerEl?.nativeElement;
            if (!container)
                return;
            const rect = container.getBoundingClientRect();
            let percentage;
            if (this.direction === "horizontal") {
                percentage = ((moveEvent.clientX - rect.left) / rect.width) * 100;
            }
            else {
                percentage = ((moveEvent.clientY - rect.top) / rect.height) * 100;
            }
            this.split = Math.max(this.minFirst, Math.min(100 - this.minSecond, percentage));
            this.splitChanged.emit(this.split);
        };
        this.onMouseUp = () => {
            this.isDragging = false;
            document.removeEventListener("mousemove", this.onMouseMove);
            document.removeEventListener("mouseup", this.onMouseUp);
            this.onMouseMove = null;
            this.onMouseUp = null;
        };
        document.addEventListener("mousemove", this.onMouseMove);
        document.addEventListener("mouseup", this.onMouseUp);
    }
    ngOnDestroy() {
        if (this.onMouseMove)
            document.removeEventListener("mousemove", this.onMouseMove);
        if (this.onMouseUp)
            document.removeEventListener("mouseup", this.onMouseUp);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: SplitViewComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.25", type: SplitViewComponent, isStandalone: true, selector: "app-split-view", inputs: { direction: "direction", split: "split", minFirst: "minFirst", minSecond: "minSecond" }, outputs: { splitChanged: "splitChanged" }, viewQueries: [{ propertyName: "containerEl", first: true, predicate: ["container"], descendants: true }], ngImport: i0, template: `
    <div #container [class]="'split-container ' + direction">
      <div
        class="split-pane first"
        [style]="
          direction === 'horizontal'
            ? 'width: ' + split + '%; flex-grow: 0'
            : 'height: ' + split + '%; flex-grow: 0'
        "
      >
        <ng-content select="[slot=first]"></ng-content>
      </div>
      <div
        class="split-divider"
        [class.dragging]="isDragging"
        (mousedown)="onDividerMouseDown($event)"
      ></div>
      <div
        class="split-pane second"
        [style]="
          direction === 'horizontal'
            ? 'width: auto; flex: 1'
            : 'height: auto; flex: 1'
        "
      >
        <ng-content select="[slot=second]"></ng-content>
      </div>
    </div>
  `, isInline: true, styles: [":host{display:block;height:100%}.split-container{display:flex;height:100%;width:100%;overflow:hidden}.split-container.vertical{flex-direction:column}.split-pane{overflow:auto;min-width:0;min-height:0}.split-pane.first{flex-shrink:0}.split-container.horizontal .split-pane.first{height:100%}.split-container.vertical .split-pane.first{width:100%}.split-divider{flex-shrink:0;background:var(--border-color);transition:background .15s;position:relative;z-index:1}.split-container.horizontal .split-divider{width:6px;cursor:col-resize}.split-container.vertical .split-divider{height:6px;cursor:row-resize}.split-divider:hover,.split-divider.dragging{background:var(--accent)}.split-divider:after{content:\"\";position:absolute;background:transparent}.horizontal .split-divider:after{inset:0 -4px}.vertical .split-divider:after{inset:-4px 0}\n"] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: SplitViewComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-split-view", standalone: true, template: `
    <div #container [class]="'split-container ' + direction">
      <div
        class="split-pane first"
        [style]="
          direction === 'horizontal'
            ? 'width: ' + split + '%; flex-grow: 0'
            : 'height: ' + split + '%; flex-grow: 0'
        "
      >
        <ng-content select="[slot=first]"></ng-content>
      </div>
      <div
        class="split-divider"
        [class.dragging]="isDragging"
        (mousedown)="onDividerMouseDown($event)"
      ></div>
      <div
        class="split-pane second"
        [style]="
          direction === 'horizontal'
            ? 'width: auto; flex: 1'
            : 'height: auto; flex: 1'
        "
      >
        <ng-content select="[slot=second]"></ng-content>
      </div>
    </div>
  `, styles: [":host{display:block;height:100%}.split-container{display:flex;height:100%;width:100%;overflow:hidden}.split-container.vertical{flex-direction:column}.split-pane{overflow:auto;min-width:0;min-height:0}.split-pane.first{flex-shrink:0}.split-container.horizontal .split-pane.first{height:100%}.split-container.vertical .split-pane.first{width:100%}.split-divider{flex-shrink:0;background:var(--border-color);transition:background .15s;position:relative;z-index:1}.split-container.horizontal .split-divider{width:6px;cursor:col-resize}.split-container.vertical .split-divider{height:6px;cursor:row-resize}.split-divider:hover,.split-divider.dragging{background:var(--accent)}.split-divider:after{content:\"\";position:absolute;background:transparent}.horizontal .split-divider:after{inset:0 -4px}.vertical .split-divider:after{inset:-4px 0}\n"] }]
        }], propDecorators: { containerEl: [{
                type: ViewChild,
                args: ["container"]
            }], direction: [{
                type: Input
            }], split: [{
                type: Input
            }], minFirst: [{
                type: Input
            }], minSecond: [{
                type: Input
            }], splitChanged: [{
                type: Output
            }] } });
registerSchemaComponent("app-split-view", SplitViewComponent);

class AvatarComponent {
    src = "";
    alt = "";
    size = "md";
    imgError = false;
    get initials() {
        return (this.alt || "").substring(0, 2).toUpperCase();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: AvatarComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.25", type: AvatarComponent, isStandalone: true, selector: "app-avatar", inputs: { src: "src", alt: "alt", size: "size" }, ngImport: i0, template: `
    @if (src && !imgError) {
      <img [src]="src" [alt]="alt" (error)="imgError = true" />
    } @else {
      <span class="initials">{{ initials }}</span>
    }
  `, isInline: true, styles: [":host{display:inline-flex;align-items:center;justify-content:center;border-radius:50%;overflow:hidden;background-color:var(--bg-elevated);border:1px solid var(--border-color)}:host([size=\"sm\"]){width:2rem;height:2rem;font-size:.75rem}:host([size=\"md\"]){width:2.5rem;height:2.5rem;font-size:.875rem}:host([size=\"lg\"]){width:3.5rem;height:3.5rem;font-size:1.25rem}img{width:100%;height:100%;object-fit:cover}.initials{font-weight:600;color:var(--text-secondary);text-transform:uppercase}\n"] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: AvatarComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-avatar", standalone: true, template: `
    @if (src && !imgError) {
      <img [src]="src" [alt]="alt" (error)="imgError = true" />
    } @else {
      <span class="initials">{{ initials }}</span>
    }
  `, styles: [":host{display:inline-flex;align-items:center;justify-content:center;border-radius:50%;overflow:hidden;background-color:var(--bg-elevated);border:1px solid var(--border-color)}:host([size=\"sm\"]){width:2rem;height:2rem;font-size:.75rem}:host([size=\"md\"]){width:2.5rem;height:2.5rem;font-size:.875rem}:host([size=\"lg\"]){width:3.5rem;height:3.5rem;font-size:1.25rem}img{width:100%;height:100%;object-fit:cover}.initials{font-weight:600;color:var(--text-secondary);text-transform:uppercase}\n"] }]
        }], propDecorators: { src: [{
                type: Input
            }], alt: [{
                type: Input
            }], size: [{
                type: Input
            }] } });
registerSchemaComponent("app-avatar", AvatarComponent);

class ChipComponent {
    label = "";
    icon = "";
    removable = false;
    removed = new EventEmitter();
    handleRemove(e) {
        e.stopPropagation();
        this.removed.emit();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: ChipComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.25", type: ChipComponent, isStandalone: true, selector: "app-chip", inputs: { label: "label", icon: "icon", removable: "removable" }, outputs: { removed: "removed" }, ngImport: i0, template: `
    <span class="chip">
      @if (icon) {
        <mat-icon class="chip-icon" [fontIcon]="icon" />
      }
      <span>{{ label }}</span>
      @if (removable) {
        <button
          class="remove-btn"
          (click)="handleRemove($event)"
          aria-label="Remove"
        >
          &times;
        </button>
      }
    </span>
  `, isInline: true, styles: [":host{display:inline-flex}.chip{display:inline-flex;align-items:center;gap:.375rem;padding:.25rem .75rem;border-radius:1rem;background-color:var(--bg-elevated);border:1px solid var(--border-color);color:var(--text-primary);font-size:.875rem;font-weight:500;transition:background-color .15s}.chip:hover{background-color:var(--bg-hover)}.chip-icon{font-size:1rem}.remove-btn{display:inline-flex;align-items:center;justify-content:center;width:1rem;height:1rem;padding:0;border:none;background:transparent;color:var(--text-secondary);cursor:pointer;border-radius:50%;transition:background-color .15s;margin-left:.125rem}.remove-btn:hover{background-color:var(--border-color);color:var(--text-primary)}\n"], dependencies: [{ kind: "ngmodule", type: MatIconModule }, { kind: "component", type: i1.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: ChipComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-chip", standalone: true, imports: [MatIconModule], template: `
    <span class="chip">
      @if (icon) {
        <mat-icon class="chip-icon" [fontIcon]="icon" />
      }
      <span>{{ label }}</span>
      @if (removable) {
        <button
          class="remove-btn"
          (click)="handleRemove($event)"
          aria-label="Remove"
        >
          &times;
        </button>
      }
    </span>
  `, styles: [":host{display:inline-flex}.chip{display:inline-flex;align-items:center;gap:.375rem;padding:.25rem .75rem;border-radius:1rem;background-color:var(--bg-elevated);border:1px solid var(--border-color);color:var(--text-primary);font-size:.875rem;font-weight:500;transition:background-color .15s}.chip:hover{background-color:var(--bg-hover)}.chip-icon{font-size:1rem}.remove-btn{display:inline-flex;align-items:center;justify-content:center;width:1rem;height:1rem;padding:0;border:none;background:transparent;color:var(--text-secondary);cursor:pointer;border-radius:50%;transition:background-color .15s;margin-left:.125rem}.remove-btn:hover{background-color:var(--border-color);color:var(--text-primary)}\n"] }]
        }], propDecorators: { label: [{
                type: Input
            }], icon: [{
                type: Input
            }], removable: [{
                type: Input
            }], removed: [{
                type: Output
            }] } });
registerSchemaComponent("app-chip", ChipComponent);

class PaginationComponent {
    page = 1;
    total = 1;
    pageSize = 10;
    pageChanged = new EventEmitter();
    get totalPages() {
        return Math.max(1, Math.ceil(this.total / this.pageSize));
    }
    get visiblePages() {
        const tp = this.totalPages;
        if (tp <= 7)
            return Array.from({ length: tp }, (_, i) => i + 1);
        const pages = [];
        if (this.page <= 4) {
            for (let i = 1; i <= 5; i++)
                pages.push(i);
            pages.push("...", tp);
        }
        else if (this.page >= tp - 3) {
            pages.push(1, "...");
            for (let i = tp - 4; i <= tp; i++)
                pages.push(i);
        }
        else {
            pages.push(1, "...");
            for (let i = this.page - 1; i <= this.page + 1; i++)
                pages.push(i);
            pages.push("...", tp);
        }
        return pages;
    }
    goTo(p) {
        if (p < 1 || p > this.totalPages || p === this.page)
            return;
        this.page = p;
        this.pageChanged.emit(p);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: PaginationComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.25", type: PaginationComponent, isStandalone: true, selector: "app-pagination", inputs: { page: "page", total: "total", pageSize: "pageSize" }, outputs: { pageChanged: "pageChanged" }, ngImport: i0, template: `
    <div class="pagination">
      <button [disabled]="page <= 1" (click)="goTo(page - 1)">&laquo;</button>
      @for (p of visiblePages; track p) {
        @if (p === "...") {
          <span class="ellipsis">&hellip;</span>
        } @else {
          <button [class.active]="p === page" (click)="goTo(+p)">
            {{ p }}
          </button>
        }
      }
      <button [disabled]="page >= totalPages" (click)="goTo(page + 1)">
        &raquo;
      </button>
    </div>
  `, isInline: true, styles: [":host{display:block}.pagination{display:inline-flex;align-items:center;gap:.25rem}button{display:inline-flex;align-items:center;justify-content:center;min-width:2rem;height:2rem;padding:0 .5rem;border:1px solid var(--border-color);border-radius:.375rem;background-color:var(--bg-elevated);color:var(--text-primary);font-size:.875rem;cursor:pointer;transition:background-color .15s}button:hover:not(:disabled){background-color:var(--bg-hover)}button:disabled{opacity:.4;cursor:not-allowed}button.active{background-color:var(--accent);border-color:var(--accent);color:var(--text-on-accent)}.ellipsis{padding:0 .25rem;color:var(--text-secondary)}\n"] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: PaginationComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-pagination", standalone: true, template: `
    <div class="pagination">
      <button [disabled]="page <= 1" (click)="goTo(page - 1)">&laquo;</button>
      @for (p of visiblePages; track p) {
        @if (p === "...") {
          <span class="ellipsis">&hellip;</span>
        } @else {
          <button [class.active]="p === page" (click)="goTo(+p)">
            {{ p }}
          </button>
        }
      }
      <button [disabled]="page >= totalPages" (click)="goTo(page + 1)">
        &raquo;
      </button>
    </div>
  `, styles: [":host{display:block}.pagination{display:inline-flex;align-items:center;gap:.25rem}button{display:inline-flex;align-items:center;justify-content:center;min-width:2rem;height:2rem;padding:0 .5rem;border:1px solid var(--border-color);border-radius:.375rem;background-color:var(--bg-elevated);color:var(--text-primary);font-size:.875rem;cursor:pointer;transition:background-color .15s}button:hover:not(:disabled){background-color:var(--bg-hover)}button:disabled{opacity:.4;cursor:not-allowed}button.active{background-color:var(--accent);border-color:var(--accent);color:var(--text-on-accent)}.ellipsis{padding:0 .25rem;color:var(--text-secondary)}\n"] }]
        }], propDecorators: { page: [{
                type: Input
            }], total: [{
                type: Input
            }], pageSize: [{
                type: Input
            }], pageChanged: [{
                type: Output
            }] } });
registerSchemaComponent("app-pagination", PaginationComponent);

class TabsComponent {
    tabs = "[]";
    activeTab = "";
    tabChanged = new EventEmitter();
    get parsedTabs() {
        if (Array.isArray(this.tabs))
            return this.tabs;
        try {
            return JSON.parse(this.tabs);
        }
        catch {
            return [];
        }
    }
    selectTab(tab) {
        this.activeTab = tab;
        this.tabChanged.emit(tab);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: TabsComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.25", type: TabsComponent, isStandalone: true, selector: "app-tabs", inputs: { tabs: "tabs", activeTab: "activeTab" }, outputs: { tabChanged: "tabChanged" }, ngImport: i0, template: `
    <div class="tabs">
      @for (tab of parsedTabs; track tab) {
        <div
          class="tab"
          [class.active]="tab === activeTab"
          (click)="selectTab(tab)"
        >
          {{ tab }}
        </div>
      }
    </div>
  `, isInline: true, styles: [":host{display:block}.tabs{display:flex;gap:0;border-bottom:1px solid var(--border-color)}.tab{padding:.75rem 1.25rem;font-size:.875rem;font-weight:500;color:var(--text-secondary);cursor:pointer;border-bottom:2px solid transparent;margin-bottom:-1px;transition:all .15s}.tab:hover{color:var(--text-primary)}.tab.active{color:var(--accent);border-bottom-color:var(--accent)}\n"] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: TabsComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-tabs", standalone: true, template: `
    <div class="tabs">
      @for (tab of parsedTabs; track tab) {
        <div
          class="tab"
          [class.active]="tab === activeTab"
          (click)="selectTab(tab)"
        >
          {{ tab }}
        </div>
      }
    </div>
  `, styles: [":host{display:block}.tabs{display:flex;gap:0;border-bottom:1px solid var(--border-color)}.tab{padding:.75rem 1.25rem;font-size:.875rem;font-weight:500;color:var(--text-secondary);cursor:pointer;border-bottom:2px solid transparent;margin-bottom:-1px;transition:all .15s}.tab:hover{color:var(--text-primary)}.tab.active{color:var(--accent);border-bottom-color:var(--accent)}\n"] }]
        }], propDecorators: { tabs: [{
                type: Input
            }], activeTab: [{
                type: Input
            }], tabChanged: [{
                type: Output
            }] } });
registerSchemaComponent("app-tabs", TabsComponent);

class ProgressBarComponent {
    value = 0;
    max = 100;
    get percentage() {
        return (this.value / this.max) * 100;
    }
    get fillClass() {
        const pct = this.percentage;
        if (pct < 40)
            return "low";
        if (pct < 75)
            return "medium";
        return "high";
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: ProgressBarComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.25", type: ProgressBarComponent, isStandalone: true, selector: "app-progress-bar", inputs: { value: "value", max: "max" }, ngImport: i0, template: `
    <div class="progress-container">
      <div
        [class]="'progress-fill ' + fillClass"
        [style.width.%]="percentage"
      ></div>
    </div>
  `, isInline: true, styles: [":host{display:block}.progress-container{width:100%;height:.5rem;background-color:var(--bg-elevated);border-radius:.25rem;overflow:hidden;border:1px solid var(--border-color)}.progress-fill{height:100%;border-radius:.25rem;transition:width .3s ease}.progress-fill.low{background-color:var(--warning)}.progress-fill.medium{background-color:var(--accent)}.progress-fill.high{background-color:var(--success)}\n"] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: ProgressBarComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-progress-bar", standalone: true, template: `
    <div class="progress-container">
      <div
        [class]="'progress-fill ' + fillClass"
        [style.width.%]="percentage"
      ></div>
    </div>
  `, styles: [":host{display:block}.progress-container{width:100%;height:.5rem;background-color:var(--bg-elevated);border-radius:.25rem;overflow:hidden;border:1px solid var(--border-color)}.progress-fill{height:100%;border-radius:.25rem;transition:width .3s ease}.progress-fill.low{background-color:var(--warning)}.progress-fill.medium{background-color:var(--accent)}.progress-fill.high{background-color:var(--success)}\n"] }]
        }], propDecorators: { value: [{
                type: Input
            }], max: [{
                type: Input
            }] } });
registerSchemaComponent("app-progress-bar", ProgressBarComponent);

class SegmentSelectorComponent {
    options = "[]";
    selected = "";
    changed = new EventEmitter();
    get parsedOptions() {
        if (Array.isArray(this.options))
            return this.options;
        try {
            return JSON.parse(this.options);
        }
        catch {
            return [];
        }
    }
    selectOption(opt) {
        this.selected = opt;
        this.changed.emit(opt);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: SegmentSelectorComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.25", type: SegmentSelectorComponent, isStandalone: true, selector: "app-segment-selector", inputs: { options: "options", selected: "selected" }, outputs: { changed: "changed" }, ngImport: i0, template: `
    <div class="segment-container">
      @for (opt of parsedOptions; track opt) {
        <div
          class="segment"
          [class.selected]="opt === selected"
          (click)="selectOption(opt)"
        >
          {{ opt }}
        </div>
      }
    </div>
  `, isInline: true, styles: [":host{display:inline-flex}.segment-container{display:inline-flex;border:1px solid var(--border-color);border-radius:.5rem;overflow:hidden;background-color:var(--bg-elevated)}.segment{padding:.5rem 1rem;font-size:.875rem;font-weight:500;color:var(--text-secondary);cursor:pointer;transition:background-color .15s,color .15s;border-right:1px solid var(--border-color)}.segment:last-child{border-right:none}.segment:hover:not(.selected){background-color:var(--bg-hover);color:var(--text-primary)}.segment.selected{background-color:var(--accent);color:var(--text-on-accent)}\n"] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: SegmentSelectorComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-segment-selector", standalone: true, template: `
    <div class="segment-container">
      @for (opt of parsedOptions; track opt) {
        <div
          class="segment"
          [class.selected]="opt === selected"
          (click)="selectOption(opt)"
        >
          {{ opt }}
        </div>
      }
    </div>
  `, styles: [":host{display:inline-flex}.segment-container{display:inline-flex;border:1px solid var(--border-color);border-radius:.5rem;overflow:hidden;background-color:var(--bg-elevated)}.segment{padding:.5rem 1rem;font-size:.875rem;font-weight:500;color:var(--text-secondary);cursor:pointer;transition:background-color .15s,color .15s;border-right:1px solid var(--border-color)}.segment:last-child{border-right:none}.segment:hover:not(.selected){background-color:var(--bg-hover);color:var(--text-primary)}.segment.selected{background-color:var(--accent);color:var(--text-on-accent)}\n"] }]
        }], propDecorators: { options: [{
                type: Input
            }], selected: [{
                type: Input
            }], changed: [{
                type: Output
            }] } });
registerSchemaComponent("app-segment-selector", SegmentSelectorComponent);

class IconComponent {
    icon = "";
    size = 24;
    textSize = "";
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: IconComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.25", type: IconComponent, isStandalone: true, selector: "app-icon", inputs: { icon: "icon", size: "size", textSize: "textSize" }, ngImport: i0, template: `<span class="icon-wrapper"
    ><mat-icon [fontIcon]="icon" [style.fontSize.px]="size"
  /></span>`, isInline: true, styles: [":host{display:inline-flex;align-items:center;justify-content:center}.icon-wrapper{display:inline-flex;align-items:center;justify-content:center;color:var(--text-secondary)}\n"], dependencies: [{ kind: "ngmodule", type: MatIconModule }, { kind: "component", type: i1.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: IconComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-icon", standalone: true, imports: [MatIconModule], template: `<span class="icon-wrapper"
    ><mat-icon [fontIcon]="icon" [style.fontSize.px]="size"
  /></span>`, styles: [":host{display:inline-flex;align-items:center;justify-content:center}.icon-wrapper{display:inline-flex;align-items:center;justify-content:center;color:var(--text-secondary)}\n"] }]
        }], propDecorators: { icon: [{
                type: Input
            }], size: [{
                type: Input
            }], textSize: [{
                type: Input
            }] } });
registerSchemaComponent("app-icon", IconComponent);

class TooltipComponent {
    text = "";
    position = "top";
    delay = 200;
    show = false;
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: TooltipComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.25", type: TooltipComponent, isStandalone: true, selector: "app-tooltip", inputs: { text: "text", position: "position", delay: "delay" }, ngImport: i0, template: `
    <div
      class="tooltip-trigger"
      (mouseenter)="show = true"
      (mouseleave)="show = false"
      (focus)="show = true"
      (blur)="show = false"
      tabindex="0"
    >
      <ng-content></ng-content>
      @if (show) {
        <div class="tooltip-bubble" [class]="position || 'top'">{{ text }}</div>
      }
    </div>
  `, isInline: true, styles: [":host{display:inline-flex;position:relative}.tooltip-trigger{display:inline-flex;position:relative;cursor:pointer}.tooltip-bubble{position:absolute;z-index:1000;padding:.375rem .75rem;border-radius:.375rem;background:var(--bg-elevated);color:var(--text-primary);font-size:.75rem;white-space:nowrap;border:1px solid var(--border-color);box-shadow:0 4px 6px #0000001a;pointer-events:none}.tooltip-bubble.top{bottom:100%;left:50%;transform:translate(-50%);margin-bottom:.5rem}.tooltip-bubble.bottom{top:100%;left:50%;transform:translate(-50%);margin-top:.5rem}.tooltip-bubble.left{right:100%;top:50%;transform:translateY(-50%);margin-right:.5rem}.tooltip-bubble.right{left:100%;top:50%;transform:translateY(-50%);margin-left:.5rem}\n"] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: TooltipComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-tooltip", standalone: true, template: `
    <div
      class="tooltip-trigger"
      (mouseenter)="show = true"
      (mouseleave)="show = false"
      (focus)="show = true"
      (blur)="show = false"
      tabindex="0"
    >
      <ng-content></ng-content>
      @if (show) {
        <div class="tooltip-bubble" [class]="position || 'top'">{{ text }}</div>
      }
    </div>
  `, styles: [":host{display:inline-flex;position:relative}.tooltip-trigger{display:inline-flex;position:relative;cursor:pointer}.tooltip-bubble{position:absolute;z-index:1000;padding:.375rem .75rem;border-radius:.375rem;background:var(--bg-elevated);color:var(--text-primary);font-size:.75rem;white-space:nowrap;border:1px solid var(--border-color);box-shadow:0 4px 6px #0000001a;pointer-events:none}.tooltip-bubble.top{bottom:100%;left:50%;transform:translate(-50%);margin-bottom:.5rem}.tooltip-bubble.bottom{top:100%;left:50%;transform:translate(-50%);margin-top:.5rem}.tooltip-bubble.left{right:100%;top:50%;transform:translateY(-50%);margin-right:.5rem}.tooltip-bubble.right{left:100%;top:50%;transform:translateY(-50%);margin-left:.5rem}\n"] }]
        }], propDecorators: { text: [{
                type: Input
            }], position: [{
                type: Input
            }], delay: [{
                type: Input
            }] } });
registerSchemaComponent("app-tooltip", TooltipComponent);

class SnackbarComponent {
    message = "";
    action = "";
    duration = 4000;
    type = "default";
    open = false;
    dismissed = new EventEmitter();
    actioned = new EventEmitter();
    timer = null;
    ngOnChanges(changes) {
        if (changes["open"] && this.open) {
            this.startTimer();
        }
    }
    ngOnDestroy() {
        this.clearTimer();
    }
    startTimer() {
        this.clearTimer();
        this.timer = window.setTimeout(() => this.dismiss(), this.duration);
    }
    clearTimer() {
        if (this.timer !== null) {
            clearTimeout(this.timer);
            this.timer = null;
        }
    }
    dismiss() {
        this.open = false;
        this.clearTimer();
        this.dismissed.emit();
    }
    handleAction() {
        this.actioned.emit();
        this.dismiss();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: SnackbarComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.25", type: SnackbarComponent, isStandalone: true, selector: "app-snackbar", inputs: { message: "message", action: "action", duration: "duration", type: "type", open: "open" }, outputs: { dismissed: "dismissed", actioned: "actioned" }, usesOnChanges: true, ngImport: i0, template: `
    @if (open) {
      <div [class]="'bar ' + type" role="status">
        <span class="message">{{ message }}</span>
        @if (action) {
          <button class="action-btn" (click)="handleAction()">
            {{ action }}
          </button>
        }
        <button class="close-btn" (click)="dismiss()" aria-label="Dismiss">
          &times;
        </button>
      </div>
    }
  `, isInline: true, styles: [":host{position:fixed;bottom:1.5rem;left:50%;transform:translate(-50%);z-index:9999;display:block}.bar{display:inline-flex;align-items:center;gap:.75rem;padding:.75rem 1rem;border-radius:.5rem;background:var(--bg-elevated, #1f2937);color:var(--text-on-accent, #ffffff);font-size:.875rem;box-shadow:0 10px 25px #0003;min-width:280px;max-width:560px;border-left:4px solid var(--accent, #3b82f6)}.bar.success{border-left-color:var(--success, #10b981)}.bar.error{border-left-color:var(--error, #ef4444)}.bar.warning{border-left-color:var(--warning, #f59e0b)}.bar.info{border-left-color:var(--info, #3b82f6)}.message{flex:1}.action-btn{background:transparent;border:none;color:var(--accent, #3b82f6);font-weight:600;cursor:pointer;padding:.25rem .5rem;border-radius:.25rem;text-transform:uppercase;font-size:.75rem}.action-btn:hover{background:#ffffff1a}.close-btn{background:transparent;border:none;color:inherit;cursor:pointer;padding:.125rem .25rem;opacity:.7;font-size:1.125rem;line-height:1}.close-btn:hover{opacity:1}\n"] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: SnackbarComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-snackbar", standalone: true, template: `
    @if (open) {
      <div [class]="'bar ' + type" role="status">
        <span class="message">{{ message }}</span>
        @if (action) {
          <button class="action-btn" (click)="handleAction()">
            {{ action }}
          </button>
        }
        <button class="close-btn" (click)="dismiss()" aria-label="Dismiss">
          &times;
        </button>
      </div>
    }
  `, styles: [":host{position:fixed;bottom:1.5rem;left:50%;transform:translate(-50%);z-index:9999;display:block}.bar{display:inline-flex;align-items:center;gap:.75rem;padding:.75rem 1rem;border-radius:.5rem;background:var(--bg-elevated, #1f2937);color:var(--text-on-accent, #ffffff);font-size:.875rem;box-shadow:0 10px 25px #0003;min-width:280px;max-width:560px;border-left:4px solid var(--accent, #3b82f6)}.bar.success{border-left-color:var(--success, #10b981)}.bar.error{border-left-color:var(--error, #ef4444)}.bar.warning{border-left-color:var(--warning, #f59e0b)}.bar.info{border-left-color:var(--info, #3b82f6)}.message{flex:1}.action-btn{background:transparent;border:none;color:var(--accent, #3b82f6);font-weight:600;cursor:pointer;padding:.25rem .5rem;border-radius:.25rem;text-transform:uppercase;font-size:.75rem}.action-btn:hover{background:#ffffff1a}.close-btn{background:transparent;border:none;color:inherit;cursor:pointer;padding:.125rem .25rem;opacity:.7;font-size:1.125rem;line-height:1}.close-btn:hover{opacity:1}\n"] }]
        }], propDecorators: { message: [{
                type: Input
            }], action: [{
                type: Input
            }], duration: [{
                type: Input
            }], type: [{
                type: Input
            }], open: [{
                type: Input
            }], dismissed: [{
                type: Output
            }], actioned: [{
                type: Output
            }] } });
registerSchemaComponent("app-snackbar", SnackbarComponent);

class SpinnerComponent {
    size = "md";
    color = "";
    label = "";
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: SpinnerComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.25", type: SpinnerComponent, isStandalone: true, selector: "app-spinner", inputs: { size: "size", color: "color", label: "label" }, ngImport: i0, template: `<div
      [class]="'spinner spinner-' + size"
      [style.borderTopColor]="color || null"
    ></div>
    @if (label) {
      <span class="spinner-label">{{ label }}</span>
    }`, isInline: true, styles: [":host{display:inline-flex;align-items:center;gap:.5rem}.spinner{border:2px solid var(--border-color);border-top-color:var(--accent);border-radius:50%;animation:spin .7s linear infinite}.spinner-sm{width:16px;height:16px;border-width:2px}.spinner-md{width:32px;height:32px;border-width:3px}.spinner-lg{width:48px;height:48px;border-width:4px}.spinner-xl{width:64px;height:64px;border-width:5px}.spinner-label{font-size:.875rem;color:var(--text-secondary)}@keyframes spin{to{transform:rotate(360deg)}}\n"] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: SpinnerComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-spinner", standalone: true, template: `<div
      [class]="'spinner spinner-' + size"
      [style.borderTopColor]="color || null"
    ></div>
    @if (label) {
      <span class="spinner-label">{{ label }}</span>
    }`, styles: [":host{display:inline-flex;align-items:center;gap:.5rem}.spinner{border:2px solid var(--border-color);border-top-color:var(--accent);border-radius:50%;animation:spin .7s linear infinite}.spinner-sm{width:16px;height:16px;border-width:2px}.spinner-md{width:32px;height:32px;border-width:3px}.spinner-lg{width:48px;height:48px;border-width:4px}.spinner-xl{width:64px;height:64px;border-width:5px}.spinner-label{font-size:.875rem;color:var(--text-secondary)}@keyframes spin{to{transform:rotate(360deg)}}\n"] }]
        }], propDecorators: { size: [{
                type: Input
            }], color: [{
                type: Input
            }], label: [{
                type: Input
            }] } });
registerSchemaComponent("app-spinner", SpinnerComponent);

class DividerComponent {
    orientation = "horizontal";
    spacing = "md";
    color = "";
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: DividerComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.25", type: DividerComponent, isStandalone: true, selector: "app-divider", inputs: { orientation: "orientation", spacing: "spacing", color: "color" }, ngImport: i0, template: `<div
    class="line"
    [style.background]="color || null"
    role="separator"
  ></div>`, isInline: true, styles: [":host{display:flex;align-items:center;justify-content:center}:host([orientation=\"vertical\"]){display:inline-flex;align-items:stretch;height:100%}.line{background:var(--divider-color, var(--border-color, #e5e7eb));width:100%;height:1px}:host([orientation=\"vertical\"]) .line{width:1px;height:100%}:host([spacing=\"none\"]){margin:0}:host([spacing=\"sm\"]){margin:.5rem 0}:host([spacing=\"md\"]){margin:1rem 0}:host([spacing=\"lg\"]){margin:1.5rem 0}:host([spacing=\"xl\"]){margin:2.5rem 0}:host([orientation=\"vertical\"][spacing=\"none\"]){margin:0}:host([orientation=\"vertical\"][spacing=\"sm\"]){margin:0 .5rem}:host([orientation=\"vertical\"][spacing=\"md\"]){margin:0 1rem}:host([orientation=\"vertical\"][spacing=\"lg\"]){margin:0 1.5rem}:host([orientation=\"vertical\"][spacing=\"xl\"]){margin:0 2.5rem}\n"] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: DividerComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-divider", standalone: true, template: `<div
    class="line"
    [style.background]="color || null"
    role="separator"
  ></div>`, styles: [":host{display:flex;align-items:center;justify-content:center}:host([orientation=\"vertical\"]){display:inline-flex;align-items:stretch;height:100%}.line{background:var(--divider-color, var(--border-color, #e5e7eb));width:100%;height:1px}:host([orientation=\"vertical\"]) .line{width:1px;height:100%}:host([spacing=\"none\"]){margin:0}:host([spacing=\"sm\"]){margin:.5rem 0}:host([spacing=\"md\"]){margin:1rem 0}:host([spacing=\"lg\"]){margin:1.5rem 0}:host([spacing=\"xl\"]){margin:2.5rem 0}:host([orientation=\"vertical\"][spacing=\"none\"]){margin:0}:host([orientation=\"vertical\"][spacing=\"sm\"]){margin:0 .5rem}:host([orientation=\"vertical\"][spacing=\"md\"]){margin:0 1rem}:host([orientation=\"vertical\"][spacing=\"lg\"]){margin:0 1.5rem}:host([orientation=\"vertical\"][spacing=\"xl\"]){margin:0 2.5rem}\n"] }]
        }], propDecorators: { orientation: [{
                type: Input
            }], spacing: [{
                type: Input
            }], color: [{
                type: Input
            }] } });
registerSchemaComponent("app-divider", DividerComponent);

class TreeNodeComponent {
    node;
    depth = 0;
    selected = new EventEmitter();
    toggleExpand(e) {
        e.stopPropagation();
        this.node.expanded = !this.node.expanded;
    }
    handleClick() {
        if (this.node.children?.length && this.node.expanded === undefined) {
            this.node.expanded = true;
        }
        this.selected.emit(this.node);
    }
    onChildSelected(node) {
        this.selected.emit(node);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: TreeNodeComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.25", type: TreeNodeComponent, isStandalone: true, selector: "app-tree-node", inputs: { node: "node", depth: "depth" }, outputs: { selected: "selected" }, ngImport: i0, template: `
    <div
      class="tree-node"
      [style.paddingLeft.px]="depth * 20"
      [class.selected]="node.selected"
      (click)="handleClick()"
    >
      @if (node.children?.length) {
        <span class="toggle" (click)="toggleExpand($event)">{{
          node.expanded ? "▼" : "▶"
        }}</span>
      } @else {
        <span class="toggle-placeholder"></span>
      }
      @if (node.icon) {
        <span class="node-icon">{{ node.icon }}</span>
      }
      <span class="node-label">{{ node.label }}</span>
    </div>
    @if (node.expanded && node.children?.length) {
      @for (child of node.children; track child.id) {
        <app-tree-node
          [node]="child"
          [depth]="depth + 1"
          (selected)="onChildSelected($event)"
        ></app-tree-node>
      }
    }
  `, isInline: true, styles: [":host{display:block}.tree-node{display:flex;align-items:center;gap:.375rem;padding:.25rem .5rem;cursor:pointer;border-radius:.25rem;transition:background-color .15s}.tree-node:hover{background-color:var(--bg-hover)}.tree-node.selected{background-color:var(--accent);color:var(--text-on-accent)}.toggle{font-size:.625rem;width:1rem;text-align:center;flex-shrink:0;cursor:pointer;color:var(--text-secondary)}.toggle-placeholder{width:1rem;flex-shrink:0}.node-icon{font-size:1rem;flex-shrink:0;color:var(--text-secondary)}.node-label{flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}\n"], dependencies: [{ kind: "component", type: TreeNodeComponent, selector: "app-tree-node", inputs: ["node", "depth"], outputs: ["selected"] }, { kind: "ngmodule", type: CommonModule }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: TreeNodeComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-tree-node", standalone: true, imports: [CommonModule], template: `
    <div
      class="tree-node"
      [style.paddingLeft.px]="depth * 20"
      [class.selected]="node.selected"
      (click)="handleClick()"
    >
      @if (node.children?.length) {
        <span class="toggle" (click)="toggleExpand($event)">{{
          node.expanded ? "▼" : "▶"
        }}</span>
      } @else {
        <span class="toggle-placeholder"></span>
      }
      @if (node.icon) {
        <span class="node-icon">{{ node.icon }}</span>
      }
      <span class="node-label">{{ node.label }}</span>
    </div>
    @if (node.expanded && node.children?.length) {
      @for (child of node.children; track child.id) {
        <app-tree-node
          [node]="child"
          [depth]="depth + 1"
          (selected)="onChildSelected($event)"
        ></app-tree-node>
      }
    }
  `, styles: [":host{display:block}.tree-node{display:flex;align-items:center;gap:.375rem;padding:.25rem .5rem;cursor:pointer;border-radius:.25rem;transition:background-color .15s}.tree-node:hover{background-color:var(--bg-hover)}.tree-node.selected{background-color:var(--accent);color:var(--text-on-accent)}.toggle{font-size:.625rem;width:1rem;text-align:center;flex-shrink:0;cursor:pointer;color:var(--text-secondary)}.toggle-placeholder{width:1rem;flex-shrink:0}.node-icon{font-size:1rem;flex-shrink:0;color:var(--text-secondary)}.node-label{flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}\n"] }]
        }], propDecorators: { node: [{
                type: Input
            }], depth: [{
                type: Input
            }], selected: [{
                type: Output
            }] } });
class TreeComponent {
    nodes = "[]";
    selectable = false;
    selected = new EventEmitter();
    get parsedNodes() {
        if (Array.isArray(this.nodes))
            return this.nodes;
        try {
            return JSON.parse(this.nodes);
        }
        catch {
            return [];
        }
    }
    onNodeSelected(node) {
        this.selected.emit(node);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: TreeComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.25", type: TreeComponent, isStandalone: true, selector: "app-tree", inputs: { nodes: "nodes", selectable: "selectable" }, outputs: { selected: "selected" }, ngImport: i0, template: `
    <div class="tree-container">
      @for (node of parsedNodes; track node.id) {
        <app-tree-node
          [node]="node"
          [depth]="0"
          (selected)="onNodeSelected($event)"
        ></app-tree-node>
      }
    </div>
  `, isInline: true, styles: [":host{display:block}.tree-container{font-size:.875rem}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "component", type: TreeNodeComponent, selector: "app-tree-node", inputs: ["node", "depth"], outputs: ["selected"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: TreeComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-tree", standalone: true, imports: [CommonModule, TreeNodeComponent], template: `
    <div class="tree-container">
      @for (node of parsedNodes; track node.id) {
        <app-tree-node
          [node]="node"
          [depth]="0"
          (selected)="onNodeSelected($event)"
        ></app-tree-node>
      }
    </div>
  `, styles: [":host{display:block}.tree-container{font-size:.875rem}\n"] }]
        }], propDecorators: { nodes: [{
                type: Input
            }], selectable: [{
                type: Input
            }], selected: [{
                type: Output
            }] } });
registerSchemaComponent("app-tree", TreeComponent);

class FormComponent {
    heading = "";
    showActions = true;
    submitText = "Submit";
    cancelText = "Cancel";
    submitted = new EventEmitter();
    cancelled = new EventEmitter();
    handleSubmit(e) {
        e.preventDefault();
        this.submitted.emit(e);
    }
    handleCancel() {
        this.cancelled.emit();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: FormComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.25", type: FormComponent, isStandalone: true, selector: "app-form", inputs: { heading: "heading", showActions: "showActions", submitText: "submitText", cancelText: "cancelText" }, outputs: { submitted: "submitted", cancelled: "cancelled" }, ngImport: i0, template: `
    <form (submit)="handleSubmit($event)">
      @if (heading) {
        <h3 class="form-heading">{{ heading }}</h3>
      }
      <ng-content></ng-content>
      @if (showActions) {
        <div class="form-actions">
          <button type="submit" class="btn-submit">{{ submitText }}</button>
          <button type="button" class="btn-cancel" (click)="handleCancel()">
            {{ cancelText }}
          </button>
        </div>
      }
    </form>
  `, isInline: true, styles: [":host{display:block}.form-heading{font-size:1.125rem;font-weight:600;color:var(--text-primary);margin:0 0 1rem}.form-actions{display:flex;gap:.75rem;justify-content:flex-end;margin-top:1.5rem}.btn-submit{padding:.5rem 1rem;border-radius:.5rem;border:1px solid var(--accent);background:var(--accent);color:var(--text-on-accent);font-weight:500;cursor:pointer}.btn-submit:hover{background:var(--accent-hover)}.btn-cancel{padding:.5rem 1rem;border-radius:.5rem;border:1px solid var(--border-color);background:transparent;color:var(--text-secondary);cursor:pointer}.btn-cancel:hover{background:var(--bg-hover);color:var(--text-primary)}\n"] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: FormComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-form", standalone: true, template: `
    <form (submit)="handleSubmit($event)">
      @if (heading) {
        <h3 class="form-heading">{{ heading }}</h3>
      }
      <ng-content></ng-content>
      @if (showActions) {
        <div class="form-actions">
          <button type="submit" class="btn-submit">{{ submitText }}</button>
          <button type="button" class="btn-cancel" (click)="handleCancel()">
            {{ cancelText }}
          </button>
        </div>
      }
    </form>
  `, styles: [":host{display:block}.form-heading{font-size:1.125rem;font-weight:600;color:var(--text-primary);margin:0 0 1rem}.form-actions{display:flex;gap:.75rem;justify-content:flex-end;margin-top:1.5rem}.btn-submit{padding:.5rem 1rem;border-radius:.5rem;border:1px solid var(--accent);background:var(--accent);color:var(--text-on-accent);font-weight:500;cursor:pointer}.btn-submit:hover{background:var(--accent-hover)}.btn-cancel{padding:.5rem 1rem;border-radius:.5rem;border:1px solid var(--border-color);background:transparent;color:var(--text-secondary);cursor:pointer}.btn-cancel:hover{background:var(--bg-hover);color:var(--text-primary)}\n"] }]
        }], propDecorators: { heading: [{
                type: Input
            }], showActions: [{
                type: Input
            }], submitText: [{
                type: Input
            }], cancelText: [{
                type: Input
            }], submitted: [{
                type: Output
            }], cancelled: [{
                type: Output
            }] } });
registerSchemaComponent("app-form", FormComponent);

class CheckboxComponent {
    checked = false;
    label = "";
    disabled = false;
    changed = new EventEmitter();
    handleChange(e) {
        this.changed.emit(e.target.checked);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: CheckboxComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.25", type: CheckboxComponent, isStandalone: true, selector: "app-checkbox", inputs: { checked: "checked", label: "label", disabled: "disabled" }, outputs: { changed: "changed" }, ngImport: i0, template: `
    <label>
      <input
        type="checkbox"
        [checked]="checked"
        [disabled]="disabled"
        (change)="handleChange($event)"
      />
      @if (label) {
        <span class="checkbox-label">{{ label }}</span>
      }
    </label>
  `, isInline: true, styles: [":host{display:inline-flex;align-items:center}label{display:flex;align-items:center;gap:.5rem;cursor:pointer}input[type=checkbox]{width:1rem;height:1rem;accent-color:var(--accent);cursor:pointer}input[type=checkbox]:disabled{cursor:not-allowed;opacity:.5}.checkbox-label{color:var(--text-primary);font-size:.875rem;-webkit-user-select:none;user-select:none}\n"] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: CheckboxComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-checkbox", standalone: true, template: `
    <label>
      <input
        type="checkbox"
        [checked]="checked"
        [disabled]="disabled"
        (change)="handleChange($event)"
      />
      @if (label) {
        <span class="checkbox-label">{{ label }}</span>
      }
    </label>
  `, styles: [":host{display:inline-flex;align-items:center}label{display:flex;align-items:center;gap:.5rem;cursor:pointer}input[type=checkbox]{width:1rem;height:1rem;accent-color:var(--accent);cursor:pointer}input[type=checkbox]:disabled{cursor:not-allowed;opacity:.5}.checkbox-label{color:var(--text-primary);font-size:.875rem;-webkit-user-select:none;user-select:none}\n"] }]
        }], propDecorators: { checked: [{
                type: Input
            }], label: [{
                type: Input
            }], disabled: [{
                type: Input
            }], changed: [{
                type: Output
            }] } });
registerSchemaComponent("app-checkbox", CheckboxComponent);

class ToastComponent {
    message = "";
    visible = false;
    type = "info";
    dismissed = new EventEmitter();
    timeout = null;
    ngOnChanges(changes) {
        if (changes["visible"] && this.visible) {
            this.clearTimeout();
            this.timeout = setTimeout(() => this.handleClose(), 4000);
        }
    }
    ngOnDestroy() {
        this.clearTimeout();
    }
    clearTimeout() {
        if (this.timeout !== null) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }
    }
    handleClose() {
        this.visible = false;
        this.clearTimeout();
        this.dismissed.emit();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: ToastComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.25", type: ToastComponent, isStandalone: true, selector: "app-toast", inputs: { message: "message", visible: "visible", type: "type" }, outputs: { dismissed: "dismissed" }, usesOnChanges: true, ngImport: i0, template: `
    <div [class]="'toast toast-' + (type || 'info')" [class.hidden]="!visible">
      @if (type === "success") {
        <svg
          class="toast-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      } @else if (type === "error") {
        <svg
          class="toast-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="15" y1="9" x2="9" y2="15"></line>
          <line x1="9" y1="9" x2="15" y2="15"></line>
        </svg>
      } @else if (type === "warning") {
        <svg
          class="toast-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path
            d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
          ></path>
          <line x1="12" y1="9" x2="12" y2="13"></line>
          <line x1="12" y1="17" x2="12.01" y2="17"></line>
        </svg>
      } @else {
        <svg
          class="toast-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="16" x2="12" y2="12"></line>
          <line x1="12" y1="8" x2="12.01" y2="8"></line>
        </svg>
      }
      <span class="toast-message">{{ message }}</span>
      <button class="close-btn" type="button" (click)="handleClose()">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
  `, isInline: true, styles: [":host{position:fixed;bottom:1.5rem;right:1.5rem;z-index:9999}.toast{display:flex;align-items:center;gap:.5rem;padding:.75rem 1rem;border-radius:.5rem;background-color:var(--bg-elevated);color:var(--text-primary);border:1px solid var(--border-color);box-shadow:0 4px 12px #00000026;font-size:.875rem;transform:translateY(0);opacity:1;transition:all .3s ease;max-width:24rem}.toast.hidden{transform:translateY(1rem);opacity:0;pointer-events:none}.toast-success{border-color:var(--success);border-left-width:3px}.toast-error{border-color:var(--error);border-left-width:3px}.toast-info{border-color:var(--info);border-left-width:3px}.toast-warning{border-color:var(--warning);border-left-width:3px}.toast-icon{width:1.25rem;height:1.25rem;flex-shrink:0}.toast-success .toast-icon{color:var(--success)}.toast-error .toast-icon{color:var(--error)}.toast-info .toast-icon{color:var(--info)}.toast-warning .toast-icon{color:var(--warning)}.toast-message{flex:1}.close-btn{display:inline-flex;align-items:center;justify-content:center;width:1.25rem;height:1.25rem;border:none;background:transparent;color:var(--text-muted);cursor:pointer;padding:0;flex-shrink:0}.close-btn:hover{color:var(--text-primary)}.close-btn svg{width:.75rem;height:.75rem}\n"] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: ToastComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-toast", standalone: true, template: `
    <div [class]="'toast toast-' + (type || 'info')" [class.hidden]="!visible">
      @if (type === "success") {
        <svg
          class="toast-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      } @else if (type === "error") {
        <svg
          class="toast-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="15" y1="9" x2="9" y2="15"></line>
          <line x1="9" y1="9" x2="15" y2="15"></line>
        </svg>
      } @else if (type === "warning") {
        <svg
          class="toast-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path
            d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
          ></path>
          <line x1="12" y1="9" x2="12" y2="13"></line>
          <line x1="12" y1="17" x2="12.01" y2="17"></line>
        </svg>
      } @else {
        <svg
          class="toast-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="16" x2="12" y2="12"></line>
          <line x1="12" y1="8" x2="12.01" y2="8"></line>
        </svg>
      }
      <span class="toast-message">{{ message }}</span>
      <button class="close-btn" type="button" (click)="handleClose()">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
  `, styles: [":host{position:fixed;bottom:1.5rem;right:1.5rem;z-index:9999}.toast{display:flex;align-items:center;gap:.5rem;padding:.75rem 1rem;border-radius:.5rem;background-color:var(--bg-elevated);color:var(--text-primary);border:1px solid var(--border-color);box-shadow:0 4px 12px #00000026;font-size:.875rem;transform:translateY(0);opacity:1;transition:all .3s ease;max-width:24rem}.toast.hidden{transform:translateY(1rem);opacity:0;pointer-events:none}.toast-success{border-color:var(--success);border-left-width:3px}.toast-error{border-color:var(--error);border-left-width:3px}.toast-info{border-color:var(--info);border-left-width:3px}.toast-warning{border-color:var(--warning);border-left-width:3px}.toast-icon{width:1.25rem;height:1.25rem;flex-shrink:0}.toast-success .toast-icon{color:var(--success)}.toast-error .toast-icon{color:var(--error)}.toast-info .toast-icon{color:var(--info)}.toast-warning .toast-icon{color:var(--warning)}.toast-message{flex:1}.close-btn{display:inline-flex;align-items:center;justify-content:center;width:1.25rem;height:1.25rem;border:none;background:transparent;color:var(--text-muted);cursor:pointer;padding:0;flex-shrink:0}.close-btn:hover{color:var(--text-primary)}.close-btn svg{width:.75rem;height:.75rem}\n"] }]
        }], propDecorators: { message: [{
                type: Input
            }], visible: [{
                type: Input
            }], type: [{
                type: Input
            }], dismissed: [{
                type: Output
            }] } });
registerSchemaComponent("app-toast", ToastComponent);

// Use internal registry to avoid circular dependency with schema-component.registry
class NavItemComponent {
    icon = "";
    label = "";
    active = false;
    disabled = false;
    clicked = new EventEmitter();
    handleClick() {
        if (!this.disabled) {
            this.clicked.emit();
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: NavItemComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.25", type: NavItemComponent, isStandalone: true, selector: "app-nav-item", inputs: { icon: "icon", label: "label", active: "active", disabled: "disabled" }, outputs: { clicked: "clicked" }, ngImport: i0, template: `
    <a
      class="nav-item"
      [class.active]="active"
      [class.disabled]="disabled"
      (click)="handleClick()"
    >
      @if (icon) {
        <span class="nav-icon">{{ icon }}</span>
      }
      <span class="nav-label"><ng-content></ng-content></span>
    </a>
  `, isInline: true, styles: [":host{display:block}.nav-item{display:flex;align-items:center;gap:.75rem;padding:.5rem .75rem;border-radius:.375rem;color:var(--text-secondary);text-decoration:none;cursor:pointer;transition:all .15s}.nav-item:hover{background:var(--bg-hover);color:var(--text-primary)}.nav-item.active{background:var(--accent);color:var(--text-on-accent)}.nav-item.disabled{opacity:.4;cursor:not-allowed}.nav-icon{display:flex;align-items:center;font-size:1.25rem}.nav-label{flex:1}\n"] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: NavItemComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-nav-item", standalone: true, template: `
    <a
      class="nav-item"
      [class.active]="active"
      [class.disabled]="disabled"
      (click)="handleClick()"
    >
      @if (icon) {
        <span class="nav-icon">{{ icon }}</span>
      }
      <span class="nav-label"><ng-content></ng-content></span>
    </a>
  `, styles: [":host{display:block}.nav-item{display:flex;align-items:center;gap:.75rem;padding:.5rem .75rem;border-radius:.375rem;color:var(--text-secondary);text-decoration:none;cursor:pointer;transition:all .15s}.nav-item:hover{background:var(--bg-hover);color:var(--text-primary)}.nav-item.active{background:var(--accent);color:var(--text-on-accent)}.nav-item.disabled{opacity:.4;cursor:not-allowed}.nav-icon{display:flex;align-items:center;font-size:1.25rem}.nav-label{flex:1}\n"] }]
        }], propDecorators: { icon: [{
                type: Input
            }], label: [{
                type: Input
            }], active: [{
                type: Input
            }], disabled: [{
                type: Input
            }], clicked: [{
                type: Output
            }] } });
registerSchemaComponent("app-nav-item", NavItemComponent);

class NavGroupComponent {
    label = "";
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: NavGroupComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.25", type: NavGroupComponent, isStandalone: true, selector: "app-nav-group", inputs: { label: "label" }, ngImport: i0, template: `
    <div class="nav-group">
      @if (label) {
        <div class="nav-group-title">{{ label }}</div>
      }
      <ng-content></ng-content>
    </div>
  `, isInline: true, styles: [":host{display:block}.nav-group{margin-bottom:.5rem}.nav-group-title{padding:.5rem .75rem;font-size:.75rem;font-weight:600;color:var(--text-secondary);text-transform:uppercase;letter-spacing:.05em}\n"] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: NavGroupComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-nav-group", standalone: true, template: `
    <div class="nav-group">
      @if (label) {
        <div class="nav-group-title">{{ label }}</div>
      }
      <ng-content></ng-content>
    </div>
  `, styles: [":host{display:block}.nav-group{margin-bottom:.5rem}.nav-group-title{padding:.5rem .75rem;font-size:.75rem;font-weight:600;color:var(--text-secondary);text-transform:uppercase;letter-spacing:.05em}\n"] }]
        }], propDecorators: { label: [{
                type: Input
            }] } });
registerSchemaComponent("app-nav-group", NavGroupComponent);

class CanvasToolbarComponent {
    zoomLevel = 100;
    showGrid = false;
    canUndo = false;
    canRedo = false;
    action = new EventEmitter();
    emit(name) {
        this.action.emit(name);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: CanvasToolbarComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.25", type: CanvasToolbarComponent, isStandalone: true, selector: "app-canvas-toolbar", inputs: { zoomLevel: "zoomLevel", showGrid: "showGrid", canUndo: "canUndo", canRedo: "canRedo" }, outputs: { action: "action" }, ngImport: i0, template: `
    <div class="toolbar-group">
      <button
        class="toolbar-btn"
        [disabled]="!canUndo"
        (click)="emit('undo')"
        title="Undo"
      >
        <span class="tb-icon">↩</span>
      </button>
      <button
        class="toolbar-btn"
        [disabled]="!canRedo"
        (click)="emit('redo')"
        title="Redo"
      >
        <span class="tb-icon">↪</span>
      </button>
    </div>
    <div class="toolbar-group">
      <button class="toolbar-btn" (click)="emit('zoom-out')" title="Zoom Out">
        <span class="tb-icon">−</span>
      </button>
      <span class="zoom-label">{{ zoomLevel }}%</span>
      <button class="toolbar-btn" (click)="emit('zoom-in')" title="Zoom In">
        <span class="tb-icon">+</span>
      </button>
      <button
        class="toolbar-btn"
        (click)="emit('zoom-reset')"
        title="Reset Zoom"
      >
        <span class="tb-icon">⊡</span>
      </button>
    </div>
    <div class="toolbar-group">
      <button
        class="toolbar-btn"
        [class.active]="showGrid"
        (click)="emit('toggle-grid')"
        title="Toggle Grid"
      >
        <span class="tb-icon">▦</span>
      </button>
    </div>
  `, isInline: true, styles: [":host{display:inline-flex;align-items:center;gap:4px}.toolbar-group{display:flex;align-items:center;gap:2px;padding:0 4px}.toolbar-group:not(:last-child){border-right:1px solid var(--border-color)}.toolbar-btn{display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;border:none;background:transparent;border-radius:6px;cursor:pointer;color:var(--text-secondary);transition:background-color .15s ease,color .15s ease}.toolbar-btn:hover{background:var(--bg-hover);color:var(--text-primary)}.toolbar-btn:active{background:var(--bg-tertiary)}.toolbar-btn.active{background:var(--accent);color:#fff}.toolbar-btn[disabled]{opacity:.4;cursor:not-allowed}.zoom-label{font-size:12px;color:var(--text-secondary);min-width:48px;text-align:center}.tb-icon{font-size:18px;line-height:1}\n"] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: CanvasToolbarComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-canvas-toolbar", standalone: true, template: `
    <div class="toolbar-group">
      <button
        class="toolbar-btn"
        [disabled]="!canUndo"
        (click)="emit('undo')"
        title="Undo"
      >
        <span class="tb-icon">↩</span>
      </button>
      <button
        class="toolbar-btn"
        [disabled]="!canRedo"
        (click)="emit('redo')"
        title="Redo"
      >
        <span class="tb-icon">↪</span>
      </button>
    </div>
    <div class="toolbar-group">
      <button class="toolbar-btn" (click)="emit('zoom-out')" title="Zoom Out">
        <span class="tb-icon">−</span>
      </button>
      <span class="zoom-label">{{ zoomLevel }}%</span>
      <button class="toolbar-btn" (click)="emit('zoom-in')" title="Zoom In">
        <span class="tb-icon">+</span>
      </button>
      <button
        class="toolbar-btn"
        (click)="emit('zoom-reset')"
        title="Reset Zoom"
      >
        <span class="tb-icon">⊡</span>
      </button>
    </div>
    <div class="toolbar-group">
      <button
        class="toolbar-btn"
        [class.active]="showGrid"
        (click)="emit('toggle-grid')"
        title="Toggle Grid"
      >
        <span class="tb-icon">▦</span>
      </button>
    </div>
  `, styles: [":host{display:inline-flex;align-items:center;gap:4px}.toolbar-group{display:flex;align-items:center;gap:2px;padding:0 4px}.toolbar-group:not(:last-child){border-right:1px solid var(--border-color)}.toolbar-btn{display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;border:none;background:transparent;border-radius:6px;cursor:pointer;color:var(--text-secondary);transition:background-color .15s ease,color .15s ease}.toolbar-btn:hover{background:var(--bg-hover);color:var(--text-primary)}.toolbar-btn:active{background:var(--bg-tertiary)}.toolbar-btn.active{background:var(--accent);color:#fff}.toolbar-btn[disabled]{opacity:.4;cursor:not-allowed}.zoom-label{font-size:12px;color:var(--text-secondary);min-width:48px;text-align:center}.tb-icon{font-size:18px;line-height:1}\n"] }]
        }], propDecorators: { zoomLevel: [{
                type: Input
            }], showGrid: [{
                type: Input
            }], canUndo: [{
                type: Input
            }], canRedo: [{
                type: Input
            }], action: [{
                type: Output
            }] } });
registerSchemaComponent("app-canvas-toolbar", CanvasToolbarComponent);

class DesignerSidebarComponent {
    position = "left";
    collapsed = false;
    header = "";
    collapsedChange = new EventEmitter();
    toggleCollapse() {
        this.collapsed = !this.collapsed;
        this.collapsedChange.emit(this.collapsed);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: DesignerSidebarComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.25", type: DesignerSidebarComponent, isStandalone: true, selector: "app-designer-sidebar", inputs: { position: "position", collapsed: "collapsed", header: "header" }, outputs: { collapsedChange: "collapsedChange" }, ngImport: i0, template: `
    <div class="sidebar-wrapper">
      <aside
        class="designer-sidebar"
        [class.collapsed]="collapsed"
        [style.borderRight]="
          position === 'left' ? '1px solid var(--border-color)' : 'none'
        "
        [style.borderLeft]="
          position === 'right' ? '1px solid var(--border-color)' : 'none'
        "
      >
        <div
          class="sidebar-header"
          [style.flexDirection]="position === 'right' ? 'row-reverse' : 'row'"
        >
          <span class="sidebar-header-title">{{ header }}</span>
        </div>
        <div class="sidebar-content">
          <ng-content select="[slot=content]"></ng-content>
        </div>
        <div class="sidebar-footer">
          <ng-content select="[slot=footer]"></ng-content>
        </div>
      </aside>
      <div
        class="sidebar-toggle-container"
        [style.right]="position === 'left' ? '-12px' : 'auto'"
        [style.left]="position === 'right' ? '-12px' : 'auto'"
      >
        <button class="sidebar-toggle" (click)="toggleCollapse()">
          {{
            collapsed
              ? position === "left"
                ? "▶"
                : "◀"
              : position === "left"
                ? "◀"
                : "▶"
          }}
        </button>
      </div>
    </div>
  `, isInline: true, styles: [":host{display:block;height:100%}.sidebar-wrapper{position:relative;height:100%;display:flex}.sidebar-toggle-container{position:absolute;top:50%;transform:translateY(-50%);z-index:10;display:flex;align-items:center;justify-content:center;width:24px;height:48px;background:var(--bg-secondary);border:1px solid var(--border-color);border-radius:4px;transition:all var(--transition-fast, .15s);cursor:pointer}.sidebar-toggle-container:hover{background:var(--bg-hover)}.sidebar-toggle{display:flex;align-items:center;justify-content:center;width:24px;height:28px;padding:0;background:transparent;border:none;border-radius:4px;color:var(--text-secondary);cursor:pointer;transition:all var(--transition-fast, .15s)}.sidebar-toggle:hover{color:var(--text-primary)}.designer-sidebar{display:flex;flex-direction:column;height:100%;background:var(--bg-secondary);transition:width var(--transition-normal, .2s) ease,opacity var(--transition-normal, .2s) ease;overflow:hidden;flex-shrink:0}.designer-sidebar.collapsed{width:0;visibility:hidden}.sidebar-header{display:flex;align-items:center;justify-content:space-between;padding:.75rem 1rem;border-bottom:1px solid var(--border-color);min-height:48px;background:var(--bg-secondary);flex-shrink:0}.sidebar-header-title{font-size:.875rem;font-weight:600;color:var(--text-primary);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.sidebar-content{flex:1;overflow:auto;min-height:0}.sidebar-footer{padding:.75rem 1rem;border-top:1px solid var(--border-color);flex-shrink:0}\n"] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: DesignerSidebarComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-designer-sidebar", standalone: true, template: `
    <div class="sidebar-wrapper">
      <aside
        class="designer-sidebar"
        [class.collapsed]="collapsed"
        [style.borderRight]="
          position === 'left' ? '1px solid var(--border-color)' : 'none'
        "
        [style.borderLeft]="
          position === 'right' ? '1px solid var(--border-color)' : 'none'
        "
      >
        <div
          class="sidebar-header"
          [style.flexDirection]="position === 'right' ? 'row-reverse' : 'row'"
        >
          <span class="sidebar-header-title">{{ header }}</span>
        </div>
        <div class="sidebar-content">
          <ng-content select="[slot=content]"></ng-content>
        </div>
        <div class="sidebar-footer">
          <ng-content select="[slot=footer]"></ng-content>
        </div>
      </aside>
      <div
        class="sidebar-toggle-container"
        [style.right]="position === 'left' ? '-12px' : 'auto'"
        [style.left]="position === 'right' ? '-12px' : 'auto'"
      >
        <button class="sidebar-toggle" (click)="toggleCollapse()">
          {{
            collapsed
              ? position === "left"
                ? "▶"
                : "◀"
              : position === "left"
                ? "◀"
                : "▶"
          }}
        </button>
      </div>
    </div>
  `, styles: [":host{display:block;height:100%}.sidebar-wrapper{position:relative;height:100%;display:flex}.sidebar-toggle-container{position:absolute;top:50%;transform:translateY(-50%);z-index:10;display:flex;align-items:center;justify-content:center;width:24px;height:48px;background:var(--bg-secondary);border:1px solid var(--border-color);border-radius:4px;transition:all var(--transition-fast, .15s);cursor:pointer}.sidebar-toggle-container:hover{background:var(--bg-hover)}.sidebar-toggle{display:flex;align-items:center;justify-content:center;width:24px;height:28px;padding:0;background:transparent;border:none;border-radius:4px;color:var(--text-secondary);cursor:pointer;transition:all var(--transition-fast, .15s)}.sidebar-toggle:hover{color:var(--text-primary)}.designer-sidebar{display:flex;flex-direction:column;height:100%;background:var(--bg-secondary);transition:width var(--transition-normal, .2s) ease,opacity var(--transition-normal, .2s) ease;overflow:hidden;flex-shrink:0}.designer-sidebar.collapsed{width:0;visibility:hidden}.sidebar-header{display:flex;align-items:center;justify-content:space-between;padding:.75rem 1rem;border-bottom:1px solid var(--border-color);min-height:48px;background:var(--bg-secondary);flex-shrink:0}.sidebar-header-title{font-size:.875rem;font-weight:600;color:var(--text-primary);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.sidebar-content{flex:1;overflow:auto;min-height:0}.sidebar-footer{padding:.75rem 1rem;border-top:1px solid var(--border-color);flex-shrink:0}\n"] }]
        }], propDecorators: { position: [{
                type: Input
            }], collapsed: [{
                type: Input
            }], header: [{
                type: Input
            }], collapsedChange: [{
                type: Output
            }] } });
registerSchemaComponent("app-designer-sidebar", DesignerSidebarComponent);

class MainEditorComponent {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: MainEditorComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.25", type: MainEditorComponent, isStandalone: true, selector: "app-main-editor", ngImport: i0, template: `
    <div class="main-editor">
      <div class="placeholder">
        <div class="placeholder-icon">⊞</div>
        <div class="placeholder-text">Canvas Area</div>
      </div>
    </div>
  `, isInline: true, styles: [":host{display:block;height:100%}.main-editor{height:100%;display:flex;align-items:center;justify-content:center;background:var(--bg-primary);color:var(--text-secondary);font-family:system-ui,sans-serif}.placeholder{text-align:center;padding:2rem}.placeholder-icon{font-size:3rem;margin-bottom:.5rem;opacity:.3}.placeholder-text{font-size:.875rem}\n"] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: MainEditorComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-main-editor", standalone: true, template: `
    <div class="main-editor">
      <div class="placeholder">
        <div class="placeholder-icon">⊞</div>
        <div class="placeholder-text">Canvas Area</div>
      </div>
    </div>
  `, styles: [":host{display:block;height:100%}.main-editor{height:100%;display:flex;align-items:center;justify-content:center;background:var(--bg-primary);color:var(--text-secondary);font-family:system-ui,sans-serif}.placeholder{text-align:center;padding:2rem}.placeholder-icon{font-size:3rem;margin-bottom:.5rem;opacity:.3}.placeholder-text{font-size:.875rem}\n"] }]
        }] });
registerSchemaComponent("app-main-editor", MainEditorComponent);

class CommandPaletteComponent {
    commands = [];
    placeholder = "Search commands...";
    triggerShortcut = "Ctrl+K";
    commandSelected = new EventEmitter();
    closed = new EventEmitter();
    isOpen = signal(false, ...(ngDevMode ? [{ debugName: "isOpen" }] : []));
    searchQuery = signal("", ...(ngDevMode ? [{ debugName: "searchQuery" }] : []));
    selectedIndex = signal(0, ...(ngDevMode ? [{ debugName: "selectedIndex" }] : []));
    onKeyDown(event) {
        if ((event.ctrlKey || event.metaKey) && event.key === "k") {
            event.preventDefault();
            this.toggle();
            return;
        }
        if (!this.isOpen())
            return;
        switch (event.key) {
            case "Escape":
                event.preventDefault();
                this.close();
                break;
            case "ArrowDown":
                event.preventDefault();
                this.moveSelection(1);
                break;
            case "ArrowUp":
                event.preventDefault();
                this.moveSelection(-1);
                break;
            case "Enter":
                event.preventDefault();
                this.selectCurrent();
                break;
        }
    }
    toggle() {
        this.isOpen() ? this.close() : this.open();
    }
    open() {
        this.isOpen.set(true);
        this.searchQuery.set("");
        this.selectedIndex.set(0);
        document.body.style.overflow = "hidden";
    }
    close() {
        this.isOpen.set(false);
        this.searchQuery.set("");
        this.selectedIndex.set(0);
        document.body.style.overflow = "";
        this.closed.emit();
    }
    onSearchChange(query) {
        this.searchQuery.set(query);
        this.selectedIndex.set(0);
    }
    selectCommand(command) {
        if (command.disabled)
            return;
        this.commandSelected.emit(command);
        this.close();
    }
    moveSelection(delta) {
        const filtered = this.filteredCommands();
        if (filtered.length === 0)
            return;
        let idx = this.selectedIndex() + delta;
        if (idx < 0)
            idx = filtered.length - 1;
        if (idx >= filtered.length)
            idx = 0;
        if (filtered[idx]?.disabled) {
            idx += delta > 0 ? 1 : -1;
            if (idx < 0)
                idx = filtered.length - 1;
            if (idx >= filtered.length)
                idx = 0;
        }
        this.selectedIndex.set(idx);
    }
    selectCurrent() {
        const filtered = this.filteredCommands();
        const cmd = filtered[this.selectedIndex()];
        if (cmd && !cmd.disabled)
            this.selectCommand(cmd);
    }
    isSelected(command) {
        return this.filteredCommands()[this.selectedIndex()]?.id === command.id;
    }
    filteredCommands = () => {
        const q = this.searchQuery().toLowerCase().trim();
        if (!q)
            return this.commands;
        return this.commands.filter((c) => c.label.toLowerCase().includes(q) ||
            c.category?.toLowerCase().includes(q));
    };
    groupedCommands = () => {
        const map = new Map();
        for (const cmd of this.filteredCommands()) {
            const cat = cmd.category || "General";
            if (!map.has(cat))
                map.set(cat, []);
            map.get(cat).push(cmd);
        }
        return [...map.entries()].map(([key, value]) => ({ key, value }));
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: CommandPaletteComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.25", type: CommandPaletteComponent, isStandalone: true, selector: "app-command-palette", inputs: { commands: "commands", placeholder: "placeholder", triggerShortcut: "triggerShortcut" }, outputs: { commandSelected: "commandSelected", closed: "closed" }, host: { listeners: { "document:keydown": "onKeyDown($event)" } }, ngImport: i0, template: `
    @if (isOpen()) {
      <div class="app-command-palette-backdrop" (click)="close()">
        <div
          class="app-command-palette-container"
          (click)="$event.stopPropagation()"
        >
          <div class="app-command-palette-header">
            <mat-icon
              class="app-command-palette-search-icon"
              fontIcon="search"
            />
            <input
              type="text"
              class="app-command-palette-input"
              [placeholder]="placeholder"
              [value]="searchQuery()"
              (input)="onSearchChange($any($event.target).value)"
              autofocus
            />
            <kbd class="app-command-palette-kbd">Esc</kbd>
          </div>
          <div class="app-command-palette-results">
            @if (filteredCommands().length === 0) {
              <div class="app-command-palette-empty">
                <mat-icon fontIcon="search_off" />
                <span>No commands found</span>
              </div>
            } @else {
              @for (group of groupedCommands(); track group.key) {
                <div class="app-command-palette-group">
                  <div class="app-command-palette-group-label">
                    {{ group.key }}
                  </div>
                  @for (command of group.value; track command.id) {
                    <button
                      type="button"
                      class="app-command-palette-item"
                      [class.app-command-palette-item-selected]="
                        isSelected(command)
                      "
                      [class.app-command-palette-item-disabled]="
                        command.disabled
                      "
                      [disabled]="command.disabled"
                      (click)="selectCommand(command)"
                    >
                      @if (command.icon) {
                        <mat-icon
                          class="app-command-palette-item-icon"
                          [fontIcon]="command.icon"
                        />
                      }
                      <span class="app-command-palette-item-label">{{
                        command.label
                      }}</span>
                      @if (command.shortcut) {
                        <kbd class="app-command-palette-item-shortcut">{{
                          command.shortcut
                        }}</kbd>
                      }
                    </button>
                  }
                </div>
              }
            }
          </div>
          <div class="app-command-palette-footer">
            <span class="app-command-palette-hint"><kbd>↑↓</kbd> Navigate</span>
            <span class="app-command-palette-hint"><kbd>↵</kbd> Select</span>
            <span class="app-command-palette-hint"><kbd>Esc</kbd> Close</span>
          </div>
        </div>
      </div>
    }
  `, isInline: true, styles: [":host{display:contents}.app-command-palette-backdrop{position:fixed;inset:0;display:flex;align-items:flex-start;justify-content:center;padding-top:15vh;background-color:#0000007f;-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px);z-index:9999;animation:fadeIn .15s ease-out}@keyframes fadeIn{0%{opacity:0}to{opacity:1}}.app-command-palette-container{width:100%;max-width:560px;background-color:var(--bg-elevated, #fff);border-radius:.75rem;box-shadow:0 25px 50px -12px #00000040;border:1px solid var(--border-subtle, #e5e7eb);overflow:hidden;animation:slideDown .15s ease-out}@keyframes slideDown{0%{transform:translateY(-20px);opacity:0}to{transform:translateY(0);opacity:1}}.app-command-palette-header{display:flex;align-items:center;gap:.75rem;padding:.75rem 1rem;border-bottom:1px solid var(--border-subtle, #e5e7eb)}.app-command-palette-search-icon{font-size:1.25rem;color:var(--text-muted, #6b7280);flex-shrink:0}.app-command-palette-input{flex:1;background:transparent;border:none;outline:none;font-size:1rem;color:var(--text-primary, #111827)}.app-command-palette-input::placeholder{color:var(--text-muted, #6b7280)}.app-command-palette-kbd{padding:.25rem .5rem;font-size:.75rem;border-radius:.25rem;background-color:var(--bg-tertiary, #f3f4f6);color:var(--text-muted, #6b7280);border:1px solid var(--border-subtle, #e5e7eb)}.app-command-palette-results{max-height:320px;overflow-y:auto}.app-command-palette-empty{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:3rem 0;gap:.5rem;color:var(--text-muted, #6b7280)}.app-command-palette-empty i{font-size:2.5rem}.app-command-palette-group{padding:.5rem 0}.app-command-palette-group-label{padding:.25rem 1rem;font-size:.75rem;font-weight:500;color:var(--text-muted, #6b7280);text-transform:uppercase;letter-spacing:.05em}.app-command-palette-item{width:100%;display:flex;align-items:center;gap:.75rem;padding:.625rem 1rem;text-align:left;font-size:.875rem;color:var(--text-primary, #111827);background:transparent;border:none;cursor:pointer;transition:background-color .1s}.app-command-palette-item:hover{background-color:var(--bg-hover, #f3f4f6)}.app-command-palette-item-selected{background-color:var(--accent-50, #eff6ff)}.app-command-palette-item-selected:hover{background-color:var(--accent-100, #dbeafe)}.app-command-palette-item-disabled{opacity:.5;cursor:not-allowed}.app-command-palette-item-disabled:hover{background-color:transparent}.app-command-palette-item-icon{font-size:1.25rem;color:var(--text-muted, #6b7280);flex-shrink:0}.app-command-palette-item-label{flex:1}.app-command-palette-item-shortcut{padding:.125rem .5rem;font-size:.75rem;border-radius:.25rem;background-color:var(--bg-tertiary, #f3f4f6);color:var(--text-muted, #6b7280);border:1px solid var(--border-subtle, #e5e7eb)}.app-command-palette-footer{display:flex;align-items:center;gap:1rem;padding:.5rem 1rem;border-top:1px solid var(--border-subtle, #e5e7eb);background-color:var(--bg-secondary, #f9fafb)}.app-command-palette-hint{display:flex;align-items:center;gap:.375rem;font-size:.75rem;color:var(--text-muted, #6b7280)}.app-command-palette-hint kbd{padding:.125rem .375rem;font-size:.625rem;border-radius:.25rem;background-color:var(--bg-tertiary, #f3f4f6);color:var(--text-secondary, #6b7280);border:1px solid var(--border-subtle, #e5e7eb)}\n"], dependencies: [{ kind: "ngmodule", type: MatIconModule }, { kind: "component", type: i1.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: CommandPaletteComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-command-palette", standalone: true, imports: [MatIconModule], template: `
    @if (isOpen()) {
      <div class="app-command-palette-backdrop" (click)="close()">
        <div
          class="app-command-palette-container"
          (click)="$event.stopPropagation()"
        >
          <div class="app-command-palette-header">
            <mat-icon
              class="app-command-palette-search-icon"
              fontIcon="search"
            />
            <input
              type="text"
              class="app-command-palette-input"
              [placeholder]="placeholder"
              [value]="searchQuery()"
              (input)="onSearchChange($any($event.target).value)"
              autofocus
            />
            <kbd class="app-command-palette-kbd">Esc</kbd>
          </div>
          <div class="app-command-palette-results">
            @if (filteredCommands().length === 0) {
              <div class="app-command-palette-empty">
                <mat-icon fontIcon="search_off" />
                <span>No commands found</span>
              </div>
            } @else {
              @for (group of groupedCommands(); track group.key) {
                <div class="app-command-palette-group">
                  <div class="app-command-palette-group-label">
                    {{ group.key }}
                  </div>
                  @for (command of group.value; track command.id) {
                    <button
                      type="button"
                      class="app-command-palette-item"
                      [class.app-command-palette-item-selected]="
                        isSelected(command)
                      "
                      [class.app-command-palette-item-disabled]="
                        command.disabled
                      "
                      [disabled]="command.disabled"
                      (click)="selectCommand(command)"
                    >
                      @if (command.icon) {
                        <mat-icon
                          class="app-command-palette-item-icon"
                          [fontIcon]="command.icon"
                        />
                      }
                      <span class="app-command-palette-item-label">{{
                        command.label
                      }}</span>
                      @if (command.shortcut) {
                        <kbd class="app-command-palette-item-shortcut">{{
                          command.shortcut
                        }}</kbd>
                      }
                    </button>
                  }
                </div>
              }
            }
          </div>
          <div class="app-command-palette-footer">
            <span class="app-command-palette-hint"><kbd>↑↓</kbd> Navigate</span>
            <span class="app-command-palette-hint"><kbd>↵</kbd> Select</span>
            <span class="app-command-palette-hint"><kbd>Esc</kbd> Close</span>
          </div>
        </div>
      </div>
    }
  `, styles: [":host{display:contents}.app-command-palette-backdrop{position:fixed;inset:0;display:flex;align-items:flex-start;justify-content:center;padding-top:15vh;background-color:#0000007f;-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px);z-index:9999;animation:fadeIn .15s ease-out}@keyframes fadeIn{0%{opacity:0}to{opacity:1}}.app-command-palette-container{width:100%;max-width:560px;background-color:var(--bg-elevated, #fff);border-radius:.75rem;box-shadow:0 25px 50px -12px #00000040;border:1px solid var(--border-subtle, #e5e7eb);overflow:hidden;animation:slideDown .15s ease-out}@keyframes slideDown{0%{transform:translateY(-20px);opacity:0}to{transform:translateY(0);opacity:1}}.app-command-palette-header{display:flex;align-items:center;gap:.75rem;padding:.75rem 1rem;border-bottom:1px solid var(--border-subtle, #e5e7eb)}.app-command-palette-search-icon{font-size:1.25rem;color:var(--text-muted, #6b7280);flex-shrink:0}.app-command-palette-input{flex:1;background:transparent;border:none;outline:none;font-size:1rem;color:var(--text-primary, #111827)}.app-command-palette-input::placeholder{color:var(--text-muted, #6b7280)}.app-command-palette-kbd{padding:.25rem .5rem;font-size:.75rem;border-radius:.25rem;background-color:var(--bg-tertiary, #f3f4f6);color:var(--text-muted, #6b7280);border:1px solid var(--border-subtle, #e5e7eb)}.app-command-palette-results{max-height:320px;overflow-y:auto}.app-command-palette-empty{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:3rem 0;gap:.5rem;color:var(--text-muted, #6b7280)}.app-command-palette-empty i{font-size:2.5rem}.app-command-palette-group{padding:.5rem 0}.app-command-palette-group-label{padding:.25rem 1rem;font-size:.75rem;font-weight:500;color:var(--text-muted, #6b7280);text-transform:uppercase;letter-spacing:.05em}.app-command-palette-item{width:100%;display:flex;align-items:center;gap:.75rem;padding:.625rem 1rem;text-align:left;font-size:.875rem;color:var(--text-primary, #111827);background:transparent;border:none;cursor:pointer;transition:background-color .1s}.app-command-palette-item:hover{background-color:var(--bg-hover, #f3f4f6)}.app-command-palette-item-selected{background-color:var(--accent-50, #eff6ff)}.app-command-palette-item-selected:hover{background-color:var(--accent-100, #dbeafe)}.app-command-palette-item-disabled{opacity:.5;cursor:not-allowed}.app-command-palette-item-disabled:hover{background-color:transparent}.app-command-palette-item-icon{font-size:1.25rem;color:var(--text-muted, #6b7280);flex-shrink:0}.app-command-palette-item-label{flex:1}.app-command-palette-item-shortcut{padding:.125rem .5rem;font-size:.75rem;border-radius:.25rem;background-color:var(--bg-tertiary, #f3f4f6);color:var(--text-muted, #6b7280);border:1px solid var(--border-subtle, #e5e7eb)}.app-command-palette-footer{display:flex;align-items:center;gap:1rem;padding:.5rem 1rem;border-top:1px solid var(--border-subtle, #e5e7eb);background-color:var(--bg-secondary, #f9fafb)}.app-command-palette-hint{display:flex;align-items:center;gap:.375rem;font-size:.75rem;color:var(--text-muted, #6b7280)}.app-command-palette-hint kbd{padding:.125rem .375rem;font-size:.625rem;border-radius:.25rem;background-color:var(--bg-tertiary, #f3f4f6);color:var(--text-secondary, #6b7280);border:1px solid var(--border-subtle, #e5e7eb)}\n"] }]
        }], propDecorators: { commands: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], triggerShortcut: [{
                type: Input
            }], commandSelected: [{
                type: Output
            }], closed: [{
                type: Output
            }], onKeyDown: [{
                type: HostListener,
                args: ["document:keydown", ["$event"]]
            }] } });
registerSchemaComponent("app-command-palette", CommandPaletteComponent);

class LanguageSelectorComponent {
    label = "";
    labelId = "";
    value = "";
    languages = [];
    placeholder = "";
    width = "";
    changed = new EventEmitter();
    get parsedLanguages() {
        const raw = Array.isArray(this.languages) ? this.languages : [];
        try {
            const parsed = Array.isArray(this.languages)
                ? this.languages
                : JSON.parse(this.languages);
            return parsed.map((lang) => ({
                value: lang.value ?? lang.code ?? "",
                label: lang.label ?? lang.name ?? lang.code ?? "",
            }));
        }
        catch {
            return [];
        }
    }
    handleChange(e) {
        this.value = e.target.value;
        this.changed.emit(this.value);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: LanguageSelectorComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.25", type: LanguageSelectorComponent, isStandalone: true, selector: "app-language-selector", inputs: { label: "label", labelId: "labelId", value: "value", languages: "languages", placeholder: "placeholder", width: "width" }, outputs: { changed: "changed" }, ngImport: i0, template: `
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
  `, isInline: true, styles: [":host{display:inline-flex}.lang-selector{display:flex;align-items:center;gap:.5rem;position:relative}.lang-label{font-size:.875rem;color:var(--text-secondary);white-space:nowrap}select{padding:.375rem 2rem .375rem .75rem;border-radius:.5rem;border:1px solid var(--border-color);background:var(--bg-elevated);color:var(--text-primary);font-size:.875rem;cursor:pointer;appearance:none;-webkit-appearance:none;min-width:120px}select:focus{outline:none;border-color:var(--accent)}.chevron{position:absolute;right:.5rem;top:50%;transform:translateY(-50%);pointer-events:none;color:var(--text-secondary)}\n"] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: LanguageSelectorComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-language-selector", standalone: true, template: `
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
  `, styles: [":host{display:inline-flex}.lang-selector{display:flex;align-items:center;gap:.5rem;position:relative}.lang-label{font-size:.875rem;color:var(--text-secondary);white-space:nowrap}select{padding:.375rem 2rem .375rem .75rem;border-radius:.5rem;border:1px solid var(--border-color);background:var(--bg-elevated);color:var(--text-primary);font-size:.875rem;cursor:pointer;appearance:none;-webkit-appearance:none;min-width:120px}select:focus{outline:none;border-color:var(--accent)}.chevron{position:absolute;right:.5rem;top:50%;transform:translateY(-50%);pointer-events:none;color:var(--text-secondary)}\n"] }]
        }], propDecorators: { label: [{
                type: Input
            }], labelId: [{
                type: Input
            }], value: [{
                type: Input
            }], languages: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], width: [{
                type: Input
            }], changed: [{
                type: Output
            }] } });
registerSchemaComponent("app-language-selector", LanguageSelectorComponent);

class SwapButtonComponent {
    ariaLabel = "";
    align = "";
    direction = "";
    height = "";
    justify = "";
    layout = "";
    width = "";
    clicked = new EventEmitter();
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: SwapButtonComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.25", type: SwapButtonComponent, isStandalone: true, selector: "app-swap-button", inputs: { ariaLabel: "ariaLabel", align: "align", direction: "direction", height: "height", justify: "justify", layout: "layout", width: "width" }, outputs: { clicked: "clicked" }, ngImport: i0, template: `<button
    class="swap-btn"
    (click)="clicked.emit($event)"
    aria-label="Swap"
  >
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <polyline points="17 1 21 5 17 9"></polyline>
      <path d="M3 11V9a4 4 0 0 1 4-4h14"></path>
      <polyline points="7 23 3 19 7 15"></polyline>
      <path d="M21 13v2a4 4 0 0 1-4 4H3"></path>
    </svg>
  </button>`, isInline: true, styles: [":host{display:inline-flex}.swap-btn{display:flex;align-items:center;justify-content:center;width:40px;height:40px;border-radius:50%;border:1px solid var(--border-color);background:var(--bg-elevated);color:var(--text-secondary);cursor:pointer;transition:all .15s;padding:0}.swap-btn:hover{background:var(--bg-hover);color:var(--text-primary)}\n"] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: SwapButtonComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-swap-button", standalone: true, template: `<button
    class="swap-btn"
    (click)="clicked.emit($event)"
    aria-label="Swap"
  >
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <polyline points="17 1 21 5 17 9"></polyline>
      <path d="M3 11V9a4 4 0 0 1 4-4h14"></path>
      <polyline points="7 23 3 19 7 15"></polyline>
      <path d="M21 13v2a4 4 0 0 1-4 4H3"></path>
    </svg>
  </button>`, styles: [":host{display:inline-flex}.swap-btn{display:flex;align-items:center;justify-content:center;width:40px;height:40px;border-radius:50%;border:1px solid var(--border-color);background:var(--bg-elevated);color:var(--text-secondary);cursor:pointer;transition:all .15s;padding:0}.swap-btn:hover{background:var(--bg-hover);color:var(--text-primary)}\n"] }]
        }], propDecorators: { ariaLabel: [{
                type: Input
            }], align: [{
                type: Input
            }], direction: [{
                type: Input
            }], height: [{
                type: Input
            }], justify: [{
                type: Input
            }], layout: [{
                type: Input
            }], width: [{
                type: Input
            }], clicked: [{
                type: Output
            }] } });
registerSchemaComponent("app-swap-button", SwapButtonComponent);

class TextInputComponent {
    textareaEl;
    value = "";
    placeholder = "";
    clearable = false;
    maxChars = 0;
    autofocus = false;
    height = "";
    label = "";
    multiline = true;
    rows = 3;
    width = "";
    input = new EventEmitter();
    focused = false;
    ngAfterViewInit() {
        if (this.autofocus) {
            setTimeout(() => this.textareaEl.nativeElement.focus());
        }
    }
    handleInput(e) {
        this.value = e.target.value;
        this.input.emit(this.value);
        this.autoResize();
    }
    autoResize() {
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: TextInputComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.25", type: TextInputComponent, isStandalone: true, selector: "app-text-input", inputs: { value: "value", placeholder: "placeholder", clearable: "clearable", maxChars: "maxChars", autofocus: "autofocus", height: "height", label: "label", multiline: "multiline", rows: "rows", width: "width" }, outputs: { input: "input" }, viewQueries: [{ propertyName: "textareaEl", first: true, predicate: ["textareaEl"], descendants: true }], ngImport: i0, template: `
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
  `, isInline: true, styles: [":host{display:block;position:relative}.text-input-wrapper{position:relative}.text-input{width:100%;padding:.5rem .75rem;border-radius:.5rem;border:1px solid var(--border-color);background-color:var(--bg-primary);color:var(--text-primary);box-sizing:border-box;outline:none;font-family:inherit;resize:none;min-height:40px}.text-input:focus,.text-input.focused{border-color:var(--accent)}.text-input::placeholder{color:var(--text-muted)}.clear-btn{position:absolute;right:.5rem;top:.5rem;background:none;border:none;cursor:pointer;color:var(--text-secondary);font-size:1.25rem;padding:0;line-height:1}.clear-btn:hover{color:var(--text-primary)}.char-count{position:absolute;right:.5rem;bottom:.25rem;font-size:.6875rem;color:var(--text-muted)}\n"] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: TextInputComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-text-input", standalone: true, template: `
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
  `, styles: [":host{display:block;position:relative}.text-input-wrapper{position:relative}.text-input{width:100%;padding:.5rem .75rem;border-radius:.5rem;border:1px solid var(--border-color);background-color:var(--bg-primary);color:var(--text-primary);box-sizing:border-box;outline:none;font-family:inherit;resize:none;min-height:40px}.text-input:focus,.text-input.focused{border-color:var(--accent)}.text-input::placeholder{color:var(--text-muted)}.clear-btn{position:absolute;right:.5rem;top:.5rem;background:none;border:none;cursor:pointer;color:var(--text-secondary);font-size:1.25rem;padding:0;line-height:1}.clear-btn:hover{color:var(--text-primary)}.char-count{position:absolute;right:.5rem;bottom:.25rem;font-size:.6875rem;color:var(--text-muted)}\n"] }]
        }], propDecorators: { textareaEl: [{
                type: ViewChild,
                args: ["textareaEl"]
            }], value: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], clearable: [{
                type: Input
            }], maxChars: [{
                type: Input
            }], autofocus: [{
                type: Input
            }], height: [{
                type: Input
            }], label: [{
                type: Input
            }], multiline: [{
                type: Input
            }], rows: [{
                type: Input
            }], width: [{
                type: Input
            }], input: [{
                type: Output
            }] } });
registerSchemaComponent("app-text-input", TextInputComponent);

class TranslationOutputComponent {
    value = "";
    placeholder = "";
    loading = false;
    showConfidence = false;
    showCopyButton = true;
    confidence = 0;
    height = "";
    width = "";
    copied = new EventEmitter();
    isCopied = false;
    async copyToClipboard() {
        try {
            await navigator.clipboard.writeText(this.value);
            this.isCopied = true;
            this.copied.emit();
            setTimeout(() => (this.isCopied = false), 2000);
        }
        catch {
            /* clipboard not available */
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: TranslationOutputComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.25", type: TranslationOutputComponent, isStandalone: true, selector: "app-translation-output", inputs: { value: "value", placeholder: "placeholder", loading: "loading", showConfidence: "showConfidence", showCopyButton: "showCopyButton", confidence: "confidence", height: "height", width: "width" }, outputs: { copied: "copied" }, ngImport: i0, template: `
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
  `, isInline: true, styles: [":host{display:block;position:relative}.output-wrapper{position:relative}.output-textarea{width:100%;padding:.75rem;border-radius:.5rem;border:1px solid var(--border-color);background-color:var(--bg-primary);color:var(--text-primary);box-sizing:border-box;font-family:inherit;resize:none;min-height:80px;cursor:default}.output-textarea::placeholder{color:var(--text-muted)}.copy-btn{position:absolute;right:.5rem;top:.5rem;display:flex;align-items:center;gap:.25rem;padding:.375rem .5rem;border-radius:.375rem;border:1px solid var(--border-color);background:var(--bg-elevated);color:var(--text-secondary);cursor:pointer;transition:all .15s;font-size:.75rem}.copy-btn:hover{background:var(--bg-hover);color:var(--text-primary)}.copied-text{color:var(--success)}\n"] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: TranslationOutputComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-translation-output", standalone: true, template: `
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
  `, styles: [":host{display:block;position:relative}.output-wrapper{position:relative}.output-textarea{width:100%;padding:.75rem;border-radius:.5rem;border:1px solid var(--border-color);background-color:var(--bg-primary);color:var(--text-primary);box-sizing:border-box;font-family:inherit;resize:none;min-height:80px;cursor:default}.output-textarea::placeholder{color:var(--text-muted)}.copy-btn{position:absolute;right:.5rem;top:.5rem;display:flex;align-items:center;gap:.25rem;padding:.375rem .5rem;border-radius:.375rem;border:1px solid var(--border-color);background:var(--bg-elevated);color:var(--text-secondary);cursor:pointer;transition:all .15s;font-size:.75rem}.copy-btn:hover{background:var(--bg-hover);color:var(--text-primary)}.copied-text{color:var(--success)}\n"] }]
        }], propDecorators: { value: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], loading: [{
                type: Input
            }], showConfidence: [{
                type: Input
            }], showCopyButton: [{
                type: Input
            }], confidence: [{
                type: Input
            }], height: [{
                type: Input
            }], width: [{
                type: Input
            }], copied: [{
                type: Output
            }] } });
registerSchemaComponent("app-translation-output", TranslationOutputComponent);

// Brutalism CSS - inline for reliable loading
/* Class prefix: brut- */
const BRUTALISM_CSS = `
:root {
  --color-brut-base: #f5f5f0;
  --color-brut-ink: #0a0a0a;
  --color-brut-accent: #ff3b30;
  --color-brut-accent-2: #ffd60a;
  --color-brut-success: #00c853;
  --color-brut-border: #0a0a0a;
  --radius-brut-sm: 0;
  --radius-brut-md: 0;
  --radius-brut-lg: 0;
  --radius-brut-xl: 0;
  --shadow-brut-sm: 4px 4px 0 0 var(--color-brut-ink);
  --shadow-brut-md: 6px 6px 0 0 var(--color-brut-ink);
  --shadow-brut-lg: 8px 8px 0 0 var(--color-brut-ink);
  --font-brut-mono: "JetBrains Mono", "Courier New", monospace;
  --font-brut-sans: "Inter", "Arial Black", sans-serif;

  /* Generic aliases for all components */
  --accent: var(--color-brut-accent);
  --accent-hover: #d62b22;
  --text-on-accent: #ffffff;
  --text-primary: var(--color-brut-ink);
  --text-secondary: #3d3d3d;
  --text-muted: #6b6b6b;
  --bg-primary: var(--color-brut-base);
  --bg-elevated: #ffffff;
  --bg-hover: #e8e8e3;
  --bg-tertiary: #d4d4cf;
  --border-color: var(--color-brut-border);
  --border-subtle: var(--color-brut-border);
  --error: var(--color-brut-accent);
  --warning: var(--color-brut-accent-2);
  --success: var(--color-brut-success);
  --info: #0066ff;
  --text-on-error: #ffffff;
  --text-on-warning: #0a0a0a;
  --text-on-success: #ffffff;
}

/* Brutalist component classes */
.brut-card {
  background: var(--bg-elevated);
  border: 4px solid var(--color-brut-border);
  border-radius: 0;
  padding: 1.25rem;
  box-shadow: var(--shadow-brut-md);
  font-family: var(--font-brut-sans);
}
.brut-btn {
  display: inline-flex; align-items: center; justify-content: center;
  padding: 0.625rem 1.25rem; font-family: var(--font-brut-sans);
  font-weight: 900; text-transform: uppercase; letter-spacing: 0.05em;
  border: 4px solid var(--color-brut-border);
  border-radius: 0; background: var(--bg-elevated);
  color: var(--text-primary);
  box-shadow: var(--shadow-brut-sm);
  transition: transform 0.05s, box-shadow 0.05s;
  cursor: pointer; user-select: none;
}
.brut-btn:hover { background: var(--color-brut-accent-2); }
.brut-btn:active { transform: translate(4px, 4px); box-shadow: 0 0 0 0 var(--color-brut-ink); }
.brut-btn-primary { background: var(--accent); color: var(--text-on-accent); }
.brut-input {
  width: 100%; padding: 0.625rem 0.875rem;
  font-family: var(--font-brut-mono); font-size: 0.9375rem;
  border: 4px solid var(--color-brut-border); border-radius: 0;
  background: var(--bg-elevated); color: var(--text-primary);
  box-sizing: border-box;
}
.brut-input:focus { outline: none; background: var(--color-brut-accent-2); }
.brut-modal {
  background: var(--bg-elevated);
  border: 4px solid var(--color-brut-border);
  border-radius: 0; padding: 1.5rem;
  box-shadow: var(--shadow-brut-lg);
  font-family: var(--font-brut-sans);
}
.brut-chip {
  display: inline-flex; align-items: center;
  padding: 0.25rem 0.625rem;
  border: 3px solid var(--color-brut-border); border-radius: 0;
  background: var(--color-brut-accent-2); color: var(--text-primary);
  font-family: var(--font-brut-mono); font-weight: 700;
  text-transform: uppercase; font-size: 0.75rem;
}
.brut-badge {
  display: inline-flex; align-items: center;
  padding: 0.125rem 0.5rem; border: 3px solid var(--color-brut-border);
  border-radius: 0; background: var(--accent); color: var(--text-on-accent);
  font-family: var(--font-brut-mono); font-weight: 700; font-size: 0.75rem;
}
.brut-tabs {
  display: flex; gap: 0;
  border-bottom: 4px solid var(--color-brut-border);
  font-family: var(--font-brut-sans);
}
.brut-tab {
  padding: 0.75rem 1.25rem; font-weight: 900; text-transform: uppercase;
  border: 4px solid var(--color-brut-border); border-bottom: none;
  background: var(--bg-elevated); color: var(--text-primary);
  cursor: pointer; margin-right: 4px;
}
.brut-tab.active { background: var(--accent); color: var(--text-on-accent); }
.brut-divider {
  height: 4px; background: var(--color-brut-border); width: 100%;
  margin: 1rem 0;
}
.brut-spinner {
  width: 32px; height: 32px;
  border: 4px solid var(--color-brut-border);
  border-top-color: var(--accent);
  border-radius: 0; animation: brut-spin 0.5s linear infinite;
}
@keyframes brut-spin { to { transform: rotate(360deg); } }
`;
// Skeuomorphism CSS - inline for reliable loading
/* Class prefix: skeu- */
const SKEUOMORPHISM_CSS = `
:root {
  --color-skeu-base: #e8dcc4;
  --color-skeu-leather: #6b4423;
  --color-skeu-leather-dark: #4a2e18;
  --color-skeu-paper: #f5e6c8;
  --color-skeu-ink: #2b1810;
  --color-skeu-accent: #b8860b;
  --color-skeu-accent-dark: #8b6508;
  --color-skeu-cream: #faf3e0;
  --color-skeu-glass: rgba(255,255,255,0.2);
  --radius-skeu-sm: 6px;
  --radius-skeu-md: 12px;
  --radius-skeu-lg: 18px;
  --radius-skeu-xl: 24px;
  --shadow-skeu-outset:
    inset 0 1px 0 rgba(255,255,255,0.4),
    inset 0 -1px 0 rgba(0,0,0,0.1),
    0 2px 4px rgba(0,0,0,0.2),
    0 4px 8px rgba(0,0,0,0.15);
  --shadow-skeu-inset:
    inset 0 2px 4px rgba(0,0,0,0.3),
    inset 0 1px 2px rgba(0,0,0,0.2);
  --shadow-skeu-glossy:
    inset 0 1px 0 rgba(255,255,255,0.5),
    inset 0 -10px 20px rgba(255,255,255,0.1),
    0 4px 8px rgba(0,0,0,0.2);

  /* Generic aliases for all components */
  --accent: var(--color-skeu-accent);
  --accent-hover: var(--color-skeu-accent-dark);
  --text-on-accent: var(--color-skeu-cream);
  --text-primary: var(--color-skeu-ink);
  --text-secondary: #5c3d20;
  --text-muted: #8a6f50;
  --bg-primary: var(--color-skeu-base);
  --bg-elevated: var(--color-skeu-paper);
  --bg-hover: #dcc99e;
  --bg-tertiary: #c4b58a;
  --border-color: var(--color-skeu-leather-dark);
  --border-subtle: #a8916b;
  --error: #8b0000;
  --warning: #c47700;
  --success: #2d5016;
  --info: #1e4d6b;
  --text-on-error: #fff5e6;
  --text-on-warning: #2b1810;
  --text-on-success: #f5e6c8;
}

/* Skeuomorphic component classes */
.skeu-card {
  background: linear-gradient(180deg, var(--color-skeu-leather) 0%, var(--color-skeu-leather-dark) 100%);
  color: var(--color-skeu-cream);
  border: 1px solid var(--color-skeu-leather-dark);
  border-radius: var(--radius-skeu-lg);
  padding: 1.5rem;
  box-shadow: var(--shadow-skeu-outset);
  font-family: Georgia, "Times New Roman", serif;
}
.skeu-card.paper {
  background: linear-gradient(180deg, var(--color-skeu-paper) 0%, #e8d9b3 100%);
  color: var(--color-skeu-ink);
  border-color: #c4b58a;
}
.skeu-btn {
  display: inline-flex; align-items: center; justify-content: center;
  padding: 0.625rem 1.25rem; font-family: Georgia, serif;
  font-weight: 600; font-size: 0.9375rem;
  border: 1px solid var(--color-skeu-leather-dark);
  border-radius: var(--radius-skeu-md);
  background: linear-gradient(180deg, var(--color-skeu-leather) 0%, var(--color-skeu-leather-dark) 100%);
  color: var(--color-skeu-cream);
  box-shadow: var(--shadow-skeu-outset);
  cursor: pointer; text-shadow: 0 1px 0 rgba(0,0,0,0.4);
  transition: filter 0.1s;
}
.skeu-btn:hover { filter: brightness(1.1); }
.skeu-btn:active { box-shadow: var(--shadow-skeu-inset); }
.skeu-btn-primary {
  background: linear-gradient(180deg, #d4a017 0%, #8b6508 100%);
  color: var(--color-skeu-cream);
  border-color: #5a4406;
}
.skeu-input {
  width: 100%; padding: 0.625rem 0.875rem;
  font-family: Georgia, serif; font-size: 0.9375rem;
  background: linear-gradient(180deg, #dcc99e 0%, #c4b58a 100%);
  color: var(--color-skeu-ink);
  border: 1px solid var(--color-skeu-leather-dark);
  border-radius: var(--radius-skeu-md);
  box-shadow: var(--shadow-skeu-inset);
  box-sizing: border-box;
}
.skeu-input:focus { outline: 2px solid var(--accent); }
.skeu-modal {
  background: linear-gradient(180deg, var(--color-skeu-paper) 0%, #e8d9b3 100%);
  color: var(--color-skeu-ink);
  border: 1px solid var(--color-skeu-leather-dark);
  border-radius: var(--radius-skeu-xl);
  padding: 1.5rem;
  box-shadow: var(--shadow-skeu-outset);
  font-family: Georgia, serif;
}
.skeu-chip {
  display: inline-flex; align-items: center;
  padding: 0.25rem 0.75rem; border-radius: var(--radius-skeu-lg);
  background: linear-gradient(180deg, var(--color-skeu-leather) 0%, var(--color-skeu-leather-dark) 100%);
  color: var(--color-skeu-cream);
  font-family: Georgia, serif; font-size: 0.875rem; font-weight: 500;
  box-shadow: var(--shadow-skeu-outset);
  border: 1px solid var(--color-skeu-leather-dark);
}
.skeu-badge {
  display: inline-flex; align-items: center;
  padding: 0.125rem 0.5rem; border-radius: var(--radius-skeu-md);
  background: linear-gradient(180deg, #d4a017 0%, #8b6508 100%);
  color: var(--color-skeu-cream);
  font-family: Georgia, serif; font-weight: 600; font-size: 0.75rem;
  box-shadow: var(--shadow-skeu-outset);
  border: 1px solid #5a4406;
}
.skeu-tabs {
  display: flex; gap: 0.25rem;
  border-bottom: 1px solid var(--color-skeu-leather-dark);
  font-family: Georgia, serif;
}
.skeu-tab {
  padding: 0.625rem 1rem; font-weight: 500;
  background: linear-gradient(180deg, #d4b890 0%, #b89968 100%);
  color: var(--color-skeu-ink);
  border: 1px solid var(--color-skeu-leather-dark);
  border-bottom: none;
  border-radius: var(--radius-skeu-md) var(--radius-skeu-md) 0 0;
  cursor: pointer; margin-bottom: -1px;
}
.skeu-tab.active {
  background: linear-gradient(180deg, var(--color-skeu-paper) 0%, #e8d9b3 100%);
  font-weight: 700;
}
.skeu-divider {
  height: 1px; background: linear-gradient(90deg, transparent 0%, var(--color-skeu-leather-dark) 50%, transparent 100%);
  margin: 1rem 0;
}
.skeu-spinner {
  width: 32px; height: 32px;
  border-radius: 50%;
  background: conic-gradient(from 0deg, transparent 0deg, var(--accent) 360deg);
  -webkit-mask: radial-gradient(circle, transparent 50%, #000 51%);
          mask: radial-gradient(circle, transparent 50%, #000 51%);
  animation: skeu-spin 1s linear infinite;
}
@keyframes skeu-spin { to { transform: rotate(360deg); } }
`;
// Neumorphism CSS - inline for reliable loading
const NEUMORPHISM_CSS = `
/* Neumorphism Style System for TailwindCSS v4 */
/* Class prefix: neu- */

:root {
  /* Neumorphism color palette - muted base colors */
  --color-neu-base: #e0e5ec;
  --color-neu-base-dark: #c8ccd4;
  --color-neu-base-light: #f8fafc;
  --color-neu-shadow-dark: #a3b1c6;
  --color-neu-shadow-light: #ffffff;
  --color-neu-shadow-dark-strong: #8a9bb0;
  --color-neu-shadow-light-strong: #ffffff;
  --color-neu-accent: #6d5dfc;
  --color-neu-accent-muted: #8b7cf7;
  --color-neu-text: #4a5568;
  --color-neu-text-light: #718096;
  --color-neu-text-dark: #2d3748;

  /* Neumorphism spacing */
  --radius-neu-sm: 8px;
  --radius-neu-md: 12px;
  --radius-neu-lg: 16px;
  --radius-neu-xl: 24px;

  /* Neumorphism shadow values */
  --shadow-neu-outset:
    6px 6px 12px var(--color-neu-shadow-dark),
    -6px -6px 12px var(--color-neu-shadow-light);
  --shadow-neu-outset-strong:
    10px 10px 20px var(--color-neu-shadow-dark-strong),
    -10px -10px 20px var(--color-neu-shadow-light-strong);
  --shadow-neu-inset:
    inset 6px 6px 12px var(--color-neu-shadow-dark),
    inset -6px -6px 12px var(--color-neu-shadow-light);
  --shadow-neu-inset-strong:
    inset 8px 8px 16px var(--color-neu-shadow-dark-strong),
    inset -8px -8px 16px var(--color-neu-shadow-light-strong);

  /* Generic variables for all components */
  --accent: #6d5dfc;
  --accent-hover: #5a4cdb;
  --text-on-accent: #ffffff;
  --text-primary: #2d3748;
  --text-secondary: #718096;
  --text-muted: #a0aec0;
  --text-on-error: #ffffff;
  --bg-elevated: #e8ecf4;
  --border-color: #a3b1c6;
  --error: #e53e3e;
  --success: #48bb78;
}

/* Base neumorphism utility */
.neu {
  background: var(--color-neu-base);
  border-radius: var(--radius-neu-lg);
  box-shadow: var(--shadow-neu-outset);
}

/* Neumorphism raised surface */
.neu-raised {
  background: var(--color-neu-base);
  border-radius: var(--radius-neu-xl);
  box-shadow: var(--shadow-neu-outset-strong);
}

/* Neumorphism pressed/inset state */
.neu-pressed {
  background: var(--color-neu-base);
  border-radius: var(--radius-neu-md);
  box-shadow: var(--shadow-neu-inset);
}

/* Neumorphism flat surface */
.neu-flat {
  background: var(--color-neu-base);
  border-radius: var(--radius-neu-lg);
  box-shadow: none;
}

/* Neumorphism button */
.neu-btn {
  background: var(--color-neu-base);
  border-radius: var(--radius-neu-md);
  box-shadow: var(--shadow-neu-outset);
  color: var(--color-neu-text);
  font-weight: 500;
  transition: all 0.15s ease;
  cursor: pointer;
}

.neu-btn:hover {
  box-shadow: var(--shadow-neu-outset-strong);
}

.neu-btn:active,
.neu-btn-pressed {
  box-shadow: var(--shadow-neu-inset);
}

.neu-btn-primary {
  background: linear-gradient(145deg, #f0f5fc, #d4d9e4);
  color: var(--color-neu-accent);
}

.neu-btn-primary:active,
.neu-btn-primary-pressed {
  background: linear-gradient(145deg, #d4d9e4, #f0f5fc);
}

/* Neumorphism card */
.neu-card {
  background: var(--color-neu-base);
  border-radius: var(--radius-neu-xl);
  box-shadow: var(--shadow-neu-outset-strong);
  padding: 24px;
}

/* Neumorphism card hoverable */
.neu-card-hoverable {
  background: var(--color-neu-base);
  border-radius: var(--radius-neu-xl);
  box-shadow: var(--shadow-neu-outset-strong);
  padding: 24px;
  transition: all 0.2s ease;
  cursor: pointer;
}

.neu-card-hoverable:hover {
  box-shadow:
    12px 12px 24px var(--color-neu-shadow-dark-strong),
    -12px -12px 24px var(--color-neu-shadow-light-strong);
}

.neu-card-hoverable:active {
  box-shadow: var(--shadow-neu-inset-strong);
}

/* Neumorphism input */
.neu-input {
  background: var(--color-neu-base);
  border-radius: var(--radius-neu-sm);
  box-shadow: var(--shadow-neu-inset);
  border: none;
  padding: 12px 16px;
  color: var(--color-neu-text-dark);
  outline: none;
  transition: all 0.15s ease;
}

.neu-input::placeholder {
  color: var(--color-neu-text-light);
}

.neu-input:focus {
  box-shadow:
    inset 8px 8px 16px var(--color-neu-shadow-dark),
    inset -8px -8px 16px var(--color-neu-shadow-light);
}

/* Neumorphism textarea */
.neu-textarea {
  background: var(--color-neu-base);
  border-radius: var(--radius-neu-md);
  box-shadow: var(--shadow-neu-inset);
  border: none;
  padding: 16px;
  color: var(--color-neu-text-dark);
  outline: none;
  resize: vertical;
  min-height: 100px;
}

/* Neumorphism badge */
.neu-badge {
  background: linear-gradient(145deg, #f0f5fc, #d4d9e4);
  border-radius: var(--radius-neu-sm);
  box-shadow:
    3px 3px 6px var(--color-neu-shadow-dark),
    -3px -3px 6px var(--color-neu-shadow-light);
  padding: 4px 12px;
  color: var(--color-neu-text);
  font-size: 12px;
  font-weight: 500;
}

/* Neumorphism avatar */
.neu-avatar {
  background: var(--color-neu-base);
  border-radius: 50%;
  box-shadow:
    6px 6px 12px var(--color-neu-shadow-dark),
    -6px -6px 12px var(--color-neu-shadow-light);
}

/* Neumorphism checkbox */
.neu-checkbox {
  background: var(--color-neu-base);
  border-radius: 6px;
  box-shadow: var(--shadow-neu-outset);
  width: 26px;
  height: 26px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.neu-checkbox-check {
  width: 14px;
  height: 14px;
  border-radius: 4px;
  background: var(--color-neu-accent);
  box-shadow: var(--shadow-neu-inset);
  opacity: 0;
  transform: scale(0);
  transition: all 0.15s ease;
}

.neu-checkbox:checked .neu-checkbox-check {
  opacity: 1;
  transform: scale(1);
}

/* Neumorphism radio */
.neu-radio {
  background: var(--color-neu-base);
  border-radius: 50%;
  box-shadow: var(--shadow-neu-outset);
  width: 26px;
  height: 26px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.neu-radio-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--color-neu-accent);
  box-shadow: var(--shadow-neu-inset);
  opacity: 0;
  transform: scale(0);
  transition: all 0.15s ease;
}

.neu-radio:checked .neu-radio-dot {
  opacity: 1;
  transform: scale(1);
}

/* Neumorphism toggle/switch */
.neu-toggle {
  background: var(--color-neu-base);
  border-radius: 20px;
  box-shadow: var(--shadow-neu-outset);
  width: 60px;
  height: 30px;
  cursor: pointer;
  position: relative;
}

.neu-toggle-knob {
  background: linear-gradient(145deg, #f0f5fc, #d4d9e4);
  border-radius: 50%;
  box-shadow:
    3px 3px 6px var(--color-neu-shadow-dark),
    -3px -3px 6px var(--color-neu-shadow-light);
  width: 24px;
  height: 24px;
  position: absolute;
  top: 3px;
  left: 3px;
  transition: all 0.2s ease;
}

.neu-toggle-active {
  box-shadow: var(--shadow-neu-inset);
}

.neu-toggle-active .neu-toggle-knob {
  left: 33px;
  background: var(--color-neu-accent);
}

/* Neumorphism slider */
.neu-slider {
  background: var(--color-neu-base);
  border-radius: 10px;
  box-shadow: var(--shadow-neu-inset);
  height: 10px;
  position: relative;
}

.neu-slider-thumb {
  background: linear-gradient(145deg, #f0f5fc, #d4d9e4);
  border-radius: 50%;
  box-shadow:
    4px 4px 8px var(--color-neu-shadow-dark),
    -4px -4px 8px var(--color-neu-shadow-light);
  width: 28px;
  height: 28px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  transition: all 0.15s ease;
}

.neu-slider-thumb:hover {
  box-shadow:
    6px 6px 12px var(--color-neu-shadow-dark),
    -6px -6px 12px var(--color-neu-shadow-light);
}

.neu-slider-thumb:active {
  box-shadow: var(--shadow-neu-inset);
}

/* Neumorphism progress bar */
.neu-progress {
  background: var(--color-neu-base);
  border-radius: var(--radius-neu-sm);
  box-shadow: var(--shadow-neu-inset);
  height: 14px;
  overflow: hidden;
}

.neu-progress-bar {
  background: linear-gradient(
    90deg,
    var(--color-neu-accent),
    var(--color-neu-accent-muted)
  );
  border-radius: var(--radius-neu-sm);
  height: 100%;
  transition: width 0.3s ease;
  box-shadow:
    inset 2px 2px 4px rgba(0, 0, 0, 0.1),
    2px 2px 4px var(--color-neu-shadow-light);
}

/* Neumorphism modal/dialog */
.neu-modal {
  background: var(--color-neu-base);
  border-radius: var(--radius-neu-xl);
  box-shadow:
    20px 20px 40px var(--color-neu-shadow-dark-strong),
    -20px -20px 40px var(--color-neu-shadow-light-strong);
  padding: 32px;
}

/* Neumorphism tooltip */
.neu-tooltip {
  background: var(--color-neu-base);
  border-radius: var(--radius-neu-sm);
  box-shadow:
    4px 4px 8px var(--color-neu-shadow-dark),
    -4px -4px 8px var(--color-neu-shadow-light);
  padding: 8px 14px;
  color: var(--color-neu-text);
  font-size: 12px;
  box-shadow:
    6px 6px 12px var(--color-neu-shadow-dark),
    -6px -6px 12px var(--color-neu-shadow-light);
}

/* Neumorphism divider */
.neu-divider {
  background: var(--color-neu-base);
  border-radius: 2px;
  height: 2px;
  box-shadow:
    inset 1px 1px 2px var(--color-neu-shadow-dark),
    inset -1px -1px 2px var(--color-neu-shadow-light);
  margin: 16px 0;
}

/* Neumorphism container */
.neu-container {
  background: var(--color-neu-base);
  border-radius: var(--radius-neu-xl);
  box-shadow:
    8px 8px 16px var(--color-neu-shadow-dark),
    -8px -8px 16px var(--color-neu-shadow-light);
  padding: 24px;
}

/* Neumorphism navigation */
.neu-nav {
  background: var(--color-neu-base);
  border-radius: var(--radius-neu-lg);
  box-shadow:
    4px 4px 8px var(--color-neu-shadow-dark),
    -4px -4px 8px var(--color-neu-shadow-light);
  padding: 8px;
}

.neu-nav-item {
  color: var(--color-neu-text);
  padding: 12px 20px;
  border-radius: var(--radius-neu-md);
  transition: all 0.15s ease;
}

.neu-nav-item:hover {
  background: linear-gradient(145deg, #f0f5fc, #d4d9e4);
  box-shadow:
    3px 3px 6px var(--color-neu-shadow-dark),
    -3px -3px 6px var(--color-neu-shadow-light);
}

.neu-nav-item-active {
  color: var(--color-neu-accent);
  background: var(--color-neu-base);
  box-shadow: var(--shadow-neu-inset);
}

/* Neumorphism tabs */
.neu-tabs {
  background: var(--color-neu-base);
  border-radius: var(--radius-neu-lg);
  box-shadow:
    inset 4px 4px 8px var(--color-neu-shadow-dark),
    inset -4px -4px 8px var(--color-neu-shadow-light);
  padding: 6px;
  display: flex;
  gap: 4px;
}

.neu-tab {
  color: var(--color-neu-text-light);
  padding: 10px 20px;
  border-radius: var(--radius-neu-md);
  transition: all 0.15s ease;
  cursor: pointer;
}

.neu-tab:hover {
  color: var(--color-neu-text-dark);
}

.neu-tab-active {
  color: var(--color-neu-accent);
  background: var(--color-neu-base);
  box-shadow:
    3px 3px 6px var(--color-neu-shadow-dark),
    -3px -3px 6px var(--color-neu-shadow-light);
}

/* Neumorphism pagination */
.neu-pagination {
  background: var(--color-neu-base);
  border-radius: var(--radius-neu-lg);
  box-shadow:
    inset 4px 4px 8px var(--color-neu-shadow-dark),
    inset -4px -4px 8px var(--color-neu-shadow-light);
  padding: 6px;
  display: flex;
  gap: 4px;
}

.neu-page-btn {
  color: var(--color-neu-text);
  width: 36px;
  height: 36px;
  border-radius: var(--radius-neu-md);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s ease;
  cursor: pointer;
  background: transparent;
}

.neu-page-btn:hover {
  background: linear-gradient(145deg, #f0f5fc, #d4d9e4);
  box-shadow:
    2px 2px 4px var(--color-neu-shadow-dark),
    -2px -2px 4px var(--color-neu-shadow-light);
}

.neu-page-btn-active {
  color: var(--color-neu-accent);
  background: var(--color-neu-base);
  box-shadow: var(--shadow-neu-inset);
}

/* Neumorphism select/dropdown */
.neu-select {
  background: var(--color-neu-base);
  border-radius: var(--radius-neu-sm);
  box-shadow: var(--shadow-neu-outset);
  padding: 12px 16px;
  color: var(--color-neu-text-dark);
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%234a5568' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 16px center;
  padding-right: 40px;
}

/* Neumorphism text styles */
.neu-text {
  color: var(--color-neu-text);
}

.neu-text-primary {
  color: var(--color-neu-text-dark);
  font-weight: 600;
}

.neu-text-accent {
  color: var(--color-neu-accent);
}

/* Neumorphism icon button */
.neu-icon-btn {
  background: var(--color-neu-base);
  border-radius: 50%;
  box-shadow:
    4px 4px 8px var(--color-neu-shadow-dark),
    -4px -4px 8px var(--color-neu-shadow-light);
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.15s ease;
  color: var(--color-neu-text);
}

.neu-icon-btn:hover {
  box-shadow:
    6px 6px 12px var(--color-neu-shadow-dark),
    -6px -6px 12px var(--color-neu-shadow-light);
}

.neu-icon-btn:active {
  box-shadow: var(--shadow-neu-inset);
}

/* Neumorphism spinner/loading */
.neu-spinner {
  background: var(--color-neu-base);
  border-radius: 50%;
  box-shadow: var(--shadow-neu-outset);
  width: 40px;
  height: 40px;
  position: relative;
}

.neu-spinner::after {
  content: "";
  position: absolute;
  top: 4px;
  left: 4px;
  right: 4px;
  bottom: 4px;
  border-radius: 50%;
  border: 3px solid transparent;
  border-top-color: var(--color-neu-accent);
  animation: neu-spin 1s linear infinite;
}

@keyframes neu-spin {
  to {
    transform: rotate(360deg);
  }
}

/* Neumorphism empty state */
.neu-empty {
  background: var(--color-neu-base);
  border-radius: var(--radius-neu-xl);
  box-shadow: var(--shadow-neu-outset);
  padding: 48px;
  text-align: center;
  color: var(--color-neu-text-light);
}

/* Neumorphism notification/toast */
.neu-toast {
  background: var(--color-neu-base);
  border-radius: var(--radius-neu-lg);
  box-shadow:
    8px 8px 16px var(--color-neu-shadow-dark),
    -8px -8px 16px var(--color-neu-shadow-light);
  padding: 16px 20px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.neu-toast-success {
  border-left: 4px solid #48bb78;
}

.neu-toast-error {
  border-left: 4px solid #f56565;
}

.neu-toast-warning {
  border-left: 4px solid #ed8936;
}

.neu-toast-info {
  border-left: 4px solid #4299e1;
}
`;
// Claymorphism CSS - inline for reliable loading
const CLAYMORPHISM_CSS = `
/* Claymorphism Style System for TailwindCSS v4 */
/* Class prefix: clay- */

:root {
  /* Claymorphism color palette */
  --color-clay-base: #e0e5ec;
  --color-clay-raised: #e0e5ec;
  --color-clay-inset: #d1d9e6;
  --color-clay-accent: #6d5dfc;
  --color-clay-accent-hover: #5a4cdb;
  --color-clay-shadow-light: rgba(255, 255, 255, 0.8);
  --color-clay-shadow-dark: rgba(163, 177, 198, 0.6);
  --color-clay-shadow-dark-strong: rgba(94, 108, 132, 0.4);

  /* Claymorphism spacing */
  --radius-clay-sm: 12px;
  --radius-clay-md: 20px;
  --radius-clay-lg: 24px;
  --radius-clay-xl: 32px;

  /* Generic variables for all components */
  --accent: #6d5dfc;
  --accent-hover: #5a4cdb;
  --text-on-accent: #ffffff;
  --text-primary: #2d3748;
  --text-secondary: #718096;
  --text-muted: #a0aec0;
  --text-on-error: #ffffff;
  --bg-elevated: #e8ecf4;
  --border-color: #a3b1c6;
  --error: #e53e3e;
  --success: #48bb78;
}

/* Base claymorphism utility */
.clay {
  background: var(--color-clay-raised);
  border-radius: var(--radius-clay-lg);
  box-shadow:
    8px 8px 16px var(--color-clay-shadow-dark),
    -8px -8px 16px var(--color-clay-shadow-light);
}

/* Claymorphism raised surface */
.clay-raised {
  background: linear-gradient(145deg, #f0f5fc, #d4d9e4);
  border-radius: var(--radius-clay-lg);
  box-shadow:
    10px 10px 20px var(--color-clay-shadow-dark-strong),
    -10px -10px 20px var(--color-clay-shadow-light);
}

/* Claymorphism inset/pressed state */
.clay-inset {
  background: var(--color-clay-inset);
  border-radius: var(--radius-clay-md);
  box-shadow:
    inset 6px 6px 12px var(--color-clay-shadow-dark),
    inset -6px -6px 12px var(--color-clay-shadow-light);
}

/* Claymorphism button */
.clay-btn {
  background: var(--color-clay-raised);
  border-radius: var(--radius-clay-md);
  box-shadow:
    6px 6px 12px var(--color-clay-shadow-dark),
    -6px -6px 12px var(--color-clay-shadow-light);
  transition: all 0.2s ease;
  cursor: pointer;
}

.clay-btn:hover {
  box-shadow:
    8px 8px 16px var(--color-clay-shadow-dark),
    -8px -8px 16px var(--color-clay-shadow-light);
}

.clay-btn:active,
.clay-btn-pressed {
  box-shadow:
    inset 4px 4px 8px var(--color-clay-shadow-dark),
    inset -4px -4px 8px var(--color-clay-shadow-light);
}

/* Claymorphism card */
.clay-card {
  background: var(--color-clay-raised);
  border-radius: var(--radius-clay-xl);
  box-shadow:
    12px 12px 24px var(--color-clay-shadow-dark-strong),
    -12px -12px 24px var(--color-clay-shadow-light);
  padding: 24px;
}

/* Claymorphism input */
.clay-input {
  background: var(--color-clay-inset);
  border-radius: var(--radius-clay-sm);
  box-shadow:
    inset 4px 4px 8px var(--color-clay-shadow-dark),
    inset -4px -4px 8px var(--color-clay-shadow-light);
  border: none;
  padding: 12px 16px;
  outline: none;
}

.clay-input:focus {
  box-shadow:
    inset 6px 6px 12px var(--color-clay-shadow-dark),
    inset -6px -6px 12px var(--color-clay-shadow-light);
}

/* Claymorphism badge */
.clay-badge {
  background: linear-gradient(145deg, #f0f5fc, #d4d9e4);
  border-radius: var(--radius-clay-sm);
  box-shadow:
    3px 3px 6px var(--color-clay-shadow-dark),
    -3px -3px 6px var(--color-clay-shadow-light);
  padding: 4px 12px;
}

/* Claymorphism avatar */
.clay-avatar {
  background: var(--color-clay-raised);
  border-radius: 50%;
  box-shadow:
    4px 4px 8px var(--color-clay-shadow-dark),
    -4px -4px 8px var(--color-clay-shadow-light);
}

/* Claymorphism checkbox */
.clay-checkbox {
  background: var(--color-clay-inset);
  border-radius: 6px;
  box-shadow:
    inset 3px 3px 6px var(--color-clay-shadow-dark),
    inset -3px -3px 6px var(--color-clay-shadow-light);
  width: 24px;
  height: 24px;
  cursor: pointer;
}

.clay-checkbox:checked {
  background: var(--color-clay-accent);
  box-shadow:
    3px 3px 6px var(--color-clay-shadow-dark),
    -3px -3px 6px var(--color-clay-shadow-light);
}

/* Claymorphism toggle/switch */
.clay-toggle {
  background: var(--color-clay-inset);
  border-radius: 16px;
  box-shadow:
    inset 2px 2px 4px var(--color-clay-shadow-dark),
    inset -2px -2px 4px var(--color-clay-shadow-light);
  width: 56px;
  height: 28px;
  cursor: pointer;
}

.clay-toggle-knob {
  background: var(--color-clay-raised);
  border-radius: 50%;
  box-shadow:
    2px 2px 4px var(--color-clay-shadow-dark),
    -2px -2px 4px var(--color-clay-shadow-light);
  width: 24px;
  height: 24px;
  margin: 2px;
  transition: transform 0.2s ease;
}

.clay-toggle-active .clay-toggle-knob {
  transform: translateX(28px);
  background: var(--color-clay-accent);
}

/* Claymorphism modal/dialog */
.clay-modal {
  background: var(--color-clay-raised);
  border-radius: var(--radius-clay-xl);
  box-shadow:
    20px 20px 40px var(--color-clay-shadow-dark-strong),
    -20px -20px 40px var(--color-clay-shadow-light);
  padding: 32px;
}

/* Claymorphism tooltip */
.clay-tooltip {
  background: var(--color-clay-raised);
  border-radius: var(--radius-clay-sm);
  box-shadow:
    4px 4px 8px var(--color-clay-shadow-dark),
    -4px -4px 8px var(--color-clay-shadow-light);
  padding: 8px 12px;
  font-size: 12px;
}

/* Claymorphism progress bar */
.clay-progress {
  background: var(--color-clay-inset);
  border-radius: var(--radius-clay-sm);
  box-shadow:
    inset 2px 2px 4px var(--color-clay-shadow-dark),
    inset -2px -2px 4px var(--color-clay-shadow-light);
  height: 12px;
  overflow: hidden;
}

.clay-progress-bar {
  background: linear-gradient(90deg, var(--color-clay-accent), #8b7cf7);
  border-radius: var(--radius-clay-sm);
  height: 100%;
  transition: width 0.3s ease;
}

/* Claymorphism slider */
.clay-slider {
  background: var(--color-clay-inset);
  border-radius: 8px;
  box-shadow:
    inset 2px 2px 4px var(--color-clay-shadow-dark),
    inset -2px -2px 4px var(--color-clay-shadow-light);
  height: 8px;
}

.clay-slider-thumb {
  background: var(--color-clay-raised);
  border-radius: 50%;
  box-shadow:
    3px 3px 6px var(--color-clay-shadow-dark),
    -3px -3px 6px var(--color-clay-shadow-light);
  width: 24px;
  height: 24px;
  cursor: pointer;
}

/* Claymorphism divider */
.clay-divider {
  background: linear-gradient(
    90deg,
    transparent,
    var(--color-clay-shadow-dark),
    transparent
  );
  height: 1px;
  margin: 16px 0;
}

/* Claymorphism text styles */
.clay-text {
  color: #4a5568;
  text-shadow: 1px 1px 2px var(--color-clay-shadow-light);
}

.clay-text-primary {
  color: #2d3748;
  font-weight: 600;
}

.clay-text-accent {
  color: var(--color-clay-accent);
}
`;
// Glassmorphism CSS - inline for reliable loading
const GLASSMORPHISM_CSS = `
/* Glasmorphism Style System for TailwindCSS v4 */
/* Class prefix: glass- */

:root {
  /* Glasmorphism color palette */
  --color-glass-bg: rgba(255, 255, 255, 0.1);
  --color-glass-bg-hover: rgba(255, 255, 255, 0.15);
  --color-glass-bg-active: rgba(255, 255, 255, 0.2);
  --color-glass-border: rgba(255, 255, 255, 0.45);
  --color-glass-border-strong: rgba(255, 255, 255, 0.6);
  --color-glass-white: rgba(255, 255, 255, 0.8);
  --color-glass-blur: rgba(255, 255, 255, 0.05);
  --color-glass-accent: #6d5dfc;
  --color-glass-accent-hover: #8b7cf7;
  --color-glass-dark: rgba(0, 0, 0, 0.3);
  --color-glass-dark-strong: rgba(0, 0, 0, 0.5);

  /* Glassmorphism spacing */
  --radius-glass-sm: 8px;
  --radius-glass-md: 12px;
  --radius-glass-lg: 16px;
  --radius-glass-xl: 24px;

  /* Blur values */
  --blur-glass-light: 10px;
  --blur-glass-medium: 20px;
  --blur-glass-heavy: 40px;

  /* Generic variables for all components */
  --accent: #6d5dfc;
  --accent-hover: #5a4cdb;
  --text-on-accent: #ffffff;
  --text-primary: #1a1a2e;
  --text-secondary: #718096;
  --text-muted: #a0aec0;
  --text-on-error: #ffffff;
  --bg-elevated: rgba(255, 255, 255, 0.15);
  --border-color: rgba(255, 255, 255, 0.45);
  --error: #e53e3e;
  --success: #48bb78;
}

/* Base glassmorphism utility */
.glass {
  background: var(--color-glass-bg);
  backdrop-filter: blur(var(--blur-glass-medium));
  -webkit-backdrop-filter: blur(var(--blur-glass-medium));
  border: 1px solid var(--color-glass-border);
  border-radius: var(--radius-glass-lg);
}

/* Glassmorphism surface */
.glass-surface {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.1) 0%,
    rgba(255, 255, 255, 0.05) 100%
  );
  backdrop-filter: blur(var(--blur-glass-heavy));
  -webkit-backdrop-filter: blur(var(--blur-glass-heavy));
  border: 1px solid var(--color-glass-border-strong);
  border-radius: var(--radius-glass-xl);
  box-shadow:
    0 8px 32px var(--color-glass-dark),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

/* Glassmorphism light variant */
.glass-light {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(var(--blur-glass-light));
  -webkit-backdrop-filter: blur(var(--blur-glass-light));
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: var(--radius-glass-md);
}

/* Glassmorphism dark variant */
.glass-dark {
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(var(--blur-glass-medium));
  -webkit-backdrop-filter: blur(var(--blur-glass-medium));
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-glass-lg);
  box-shadow: 0 8px 32px var(--color-glass-dark-strong);
}

/* Glassmorphism button */
.glass-btn {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(var(--blur-glass-light));
  -webkit-backdrop-filter: blur(var(--blur-glass-light));
  border: 1px solid var(--color-glass-border);
  border-radius: var(--radius-glass-md);
  color: var(--color-glass-white);
  transition: all 0.3s ease;
  cursor: pointer;
}

.glass-btn:hover {
  background: var(--color-glass-bg-hover);
  border-color: var(--color-glass-border-strong);
  box-shadow:
    0 4px 16px var(--color-glass-dark),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
}

.glass-btn:active,
.glass-btn-pressed {
  background: var(--color-glass-bg-active);
  transform: scale(0.98);
}

/* Glassmorphism primary button */
.glass-btn-primary {
  background: linear-gradient(
    135deg,
    var(--color-glass-accent) 0%,
    #8b7cf7 100%
  );
  backdrop-filter: blur(var(--blur-glass-light));
  -webkit-backdrop-filter: blur(var(--blur-glass-light));
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  box-shadow:
    0 4px 16px rgba(109, 93, 252, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.glass-btn-primary:hover {
  background: linear-gradient(
    135deg,
    var(--color-glass-accent-hover) 0%,
    #9d8ff7 100%
  );
  box-shadow:
    0 6px 24px rgba(109, 93, 252, 0.5),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
}

/* Glassmorphism card */
.glass-card {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.15) 0%,
    rgba(255, 255, 255, 0.05) 100%
  );
  backdrop-filter: blur(var(--blur-glass-heavy));
  -webkit-backdrop-filter: blur(var(--blur-glass-heavy));
  border: 1px solid var(--color-glass-border-strong);
  border-radius: var(--radius-glass-xl);
  box-shadow:
    0 8px 32px var(--color-glass-dark),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  padding: 24px;
}

/* Glassmorphism input */
.glass-input {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(var(--blur-glass-light));
  -webkit-backdrop-filter: blur(var(--blur-glass-light));
  border: 1px solid var(--color-glass-border);
  border-radius: var(--radius-glass-sm);
  color: white;
  padding: 12px 16px;
  outline: none;
  transition: all 0.3s ease;
}

.glass-input::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.glass-input:focus {
  background: rgba(255, 255, 255, 0.1);
  border-color: var(--color-glass-accent);
  box-shadow:
    0 0 0 3px rgba(109, 93, 252, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

/* Glassmorphism badge */
.glass-badge {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(var(--blur-glass-light));
  -webkit-backdrop-filter: blur(var(--blur-glass-light));
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: var(--radius-glass-sm);
  padding: 4px 12px;
  color: var(--color-glass-white);
  font-size: 12px;
  font-weight: 500;
}

/* Glassmorphism avatar */
.glass-avatar {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.2) 0%,
    rgba(255, 255, 255, 0.1) 100%
  );
  backdrop-filter: blur(var(--blur-glass-medium));
  -webkit-backdrop-filter: blur(var(--blur-glass-medium));
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  box-shadow: 0 4px 16px var(--color-glass-dark);
}

/* Glassmorphism checkbox */
.glass-checkbox {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(var(--blur-glass-light));
  -webkit-backdrop-filter: blur(var(--blur-glass-light));
  border: 1px solid var(--color-glass-border);
  border-radius: 6px;
  width: 24px;
  height: 24px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.glass-checkbox:checked {
  background: var(--color-glass-accent);
  border-color: var(--color-glass-accent);
  box-shadow:
    0 0 0 3px rgba(109, 93, 252, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

/* Glassmorphism toggle/switch */
.glass-toggle {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(var(--blur-glass-light));
  -webkit-backdrop-filter: blur(var(--blur-glass-light));
  border: 1px solid var(--color-glass-border);
  border-radius: 20px;
  width: 56px;
  height: 28px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.glass-toggle-knob {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.8) 0%,
    rgba(255, 255, 255, 0.6) 100%
  );
  border-radius: 50%;
  box-shadow: 0 2px 8px var(--color-glass-dark);
  width: 22px;
  height: 22px;
  margin: 2px;
  transition: all 0.3s ease;
}

.glass-toggle-active {
  background: var(--color-glass-accent);
  border-color: var(--color-glass-accent);
}

.glass-toggle-active .glass-toggle-knob {
  transform: translateX(28px);
  background: white;
}

/* Glassmorphism modal/dialog */
.glass-modal {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.2) 0%,
    rgba(255, 255, 255, 0.1) 100%
  );
  backdrop-filter: blur(var(--blur-glass-heavy));
  -webkit-backdrop-filter: blur(var(--blur-glass-heavy));
  border: 1px solid var(--color-glass-border-strong);
  border-radius: var(--radius-glass-xl);
  box-shadow:
    0 24px 48px var(--color-glass-dark-strong),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  padding: 32px;
}

/* Glassmorphism tooltip */
.glass-tooltip {
  background: linear-gradient(
    135deg,
    rgba(60, 60, 60, 0.9) 0%,
    rgba(40, 40, 40, 0.9) 100%
  );
  backdrop-filter: blur(var(--blur-glass-medium));
  -webkit-backdrop-filter: blur(var(--blur-glass-medium));
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-glass-sm);
  padding: 8px 12px;
  color: rgba(255, 255, 255, 0.9);
  font-size: 12px;
  box-shadow: 0 4px 16px var(--color-glass-dark-strong);
}

/* Glassmorphism progress bar */
.glass-progress {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(var(--blur-glass-light));
  -webkit-backdrop-filter: blur(var(--blur-glass-light));
  border: 1px solid var(--color-glass-border);
  border-radius: var(--radius-glass-sm);
  height: 12px;
  overflow: hidden;
}

.glass-progress-bar {
  background: linear-gradient(
    90deg,
    var(--color-glass-accent),
    #8b7cf7,
    var(--color-glass-accent-hover)
  );
  background-size: 200% 100%;
  border-radius: var(--radius-glass-sm);
  height: 100%;
  animation: glass-progress-shine 2s ease-in-out infinite;
  box-shadow: 0 0 20px rgba(109, 93, 252, 0.5);
}

@keyframes glass-progress-shine {
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 200% 50%;
  }
}

/* Glassmorphism slider */
.glass-slider {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(var(--blur-glass-light));
  -webkit-backdrop-filter: blur(var(--blur-glass-light));
  border: 1px solid var(--color-glass-border);
  border-radius: 8px;
  height: 8px;
}

.glass-slider-thumb {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.9) 0%,
    rgba(255, 255, 255, 0.7) 100%
  );
  backdrop-filter: blur(var(--blur-glass-light));
  -webkit-backdrop-filter: blur(var(--blur-glass-light));
  border-radius: 50%;
  box-shadow:
    0 2px 8px var(--color-glass-dark),
    inset 0 1px 0 rgba(255, 255, 255, 0.4);
  width: 24px;
  height: 24px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.glass-slider-thumb:hover {
  transform: scale(1.1);
  box-shadow:
    0 4px 12px var(--color-glass-dark),
    inset 0 1px 0 rgba(255, 255, 255, 0.4);
}

/* Glassmorphism navigation */
.glass-nav {
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.1) 0%,
    rgba(255, 255, 255, 0.05) 100%
  );
  backdrop-filter: blur(var(--blur-glass-medium));
  -webkit-backdrop-filter: blur(var(--blur-glass-medium));
  border-bottom: 1px solid var(--color-glass-border);
}

.glass-nav-item {
  color: rgba(255, 255, 255, 0.7);
  transition: all 0.3s ease;
  padding: 12px 16px;
  border-radius: var(--radius-glass-sm);
}

.glass-nav-item:hover {
  color: white;
  background: rgba(255, 255, 255, 0.1);
}

.glass-nav-item-active {
  color: white;
  background: rgba(255, 255, 255, 0.15);
  border-bottom: 2px solid var(--color-glass-accent);
}

/* Glassmorphism text styles */
.glass-text {
  color: rgba(255, 255, 255, 0.9);
  text-shadow: 0 1px 2px var(--color-glass-dark);
}

.glass-text-primary {
  color: white;
  font-weight: 600;
}

.glass-text-accent {
  color: var(--color-glass-accent-hover);
}

/* Glassmorphism divider */
.glass-divider {
  background: linear-gradient(
    90deg,
    transparent,
    var(--color-glass-border),
    transparent
  );
  height: 1px;
  margin: 16px 0;
}
`;
// Material Design 3 CSS - inline for reliable loading
const MATERIAL_DESIGN_V3_CSS = `
/* Material Design 3 Style System for TailwindCSS v4 */
/* Class prefix: m3- */

:root {
  /* Material Design 3 color palette */
  --color-m3-primary: #6750a4;
  --color-m3-primary-container: #eaddff;
  --color-m3-on-primary: #ffffff;
  --color-m3-on-primary-container: #21005d;
  --color-m3-secondary: #625b71;
  --color-m3-secondary-container: #e8def8;
  --color-m3-on-secondary: #ffffff;
  --color-m3-on-secondary-container: #1d192b;
  --color-m3-tertiary: #7d5260;
  --color-m3-tertiary-container: #ffd8e4;
  --color-m3-on-tertiary: #ffffff;
  --color-m3-on-tertiary-container: #31111d;
  --color-m3-error: #b3261e;
  --color-m3-error-container: #f9dedc;
  --color-m3-on-error: #ffffff;
  --color-m3-on-error-container: #410e0b;
  --color-m3-background: #fffbfe;
  --color-m3-on-background: #1c1b1f;
  --color-m3-surface: #fffbfe;
  --color-m3-surface-dim: #ded8e1;
  --color-m3-surface-container: #f3edf7;
  --color-m3-surface-container-low: #f7f2fa;
  --color-m3-surface-container-high: #ece6f0;
  --color-m3-surface-container-highest: #e6e0e9;
  --color-m3-on-surface: #1c1b1f;
  --color-m3-on-surface-variant: #49454f;
  --color-m3-outline: #79747e;
  --color-m3-outline-variant: #cac4d0;
  --color-m3-inverse-surface: #313033;
  --color-m3-inverse-on-surface: #f4eff4;
  --color-m3-inverse-primary: #d0bcff;
  --color-m3-shadow: #000000;
  --color-m3-scrim: #000000;
  --color-m3-surface-tint: #6750a4;

  /* Material Design 3 elevation */
  --shadow-m3-1: 0 1px 2px rgba(0, 0, 0, 0.3), 0 1px 3px rgba(0, 0, 0, 0.15);
  --shadow-m3-2: 0 1px 2px rgba(0, 0, 0, 0.3), 0 2px 6px rgba(0, 0, 0, 0.15);
  --shadow-m3-3: 0 4px 8px rgba(0, 0, 0, 0.15), 0 1px 3px rgba(0, 0, 0, 0.15);
  --shadow-m3-4: 0 6px 10px rgba(0, 0, 0, 0.15), 0 2px 3px rgba(0, 0, 0, 0.15);
  --shadow-m3-5: 0 8px 12px rgba(0, 0, 0, 0.15), 0 4px 4px rgba(0, 0, 0, 0.15);

  /* Material Design 3 state layers */
  --color-m3-state-hover: rgba(103, 80, 164, 0.08);
  --color-m3-state-focus: rgba(103, 80, 164, 0.12);
  --color-m3-state-pressed: rgba(103, 80, 164, 0.12);
  --color-m3-state-dragged: rgba(103, 80, 164, 0.16);
  --color-m3-state-hover-alt: rgba(103, 80, 164, 0.04);
  --color-m3-state-selected: rgba(103, 80, 164, 0.12);

  /* Material Design 3 spacing */
  --radius-m3-extra-small: 4px;
  --radius-m3-small: 8px;
  --radius-m3-medium: 12px;
  --radius-m3-large: 16px;
  --radius-m3-extra-large: 28px;
  --radius-m3-full: 50%;

  /* Generic variables for all components */
  --accent: #6750a4;
  --accent-hover: #7c4dff;
  --text-on-accent: #ffffff;
  --text-primary: #1c1b1f;
  --text-secondary: #49454f;
  --text-muted: #79747e;
  --text-on-error: #ffffff;
  --bg-elevated: #ece6f0;
  --border-color: #79747e;
  --error: #b3261e;
  --success: #48bb78;
}

/* M3 State layer mixin utility */
.m3-state-layer {
  position: relative;
  overflow: hidden;
}

.m3-state-layer::before {
  content: "";
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.2s ease;
  pointer-events: none;
}

.m3-state-layer:hover::before {
  opacity: 1;
  background: var(--color-m3-state-hover);
}

.m3-state-layer:focus-visible::before {
  opacity: 1;
  background: var(--color-m3-state-focus);
}

.m3-state-layer:active::before {
  opacity: 1;
  background: var(--color-m3-state-pressed);
}

/* M3 - Material 3 component base */
.m3 {
  font-family:
    "Roboto",
    -apple-system,
    BlinkMacSystemFont,
    sans-serif;
  -webkit-font-smoothing: antialiased;
  color: var(--color-m3-on-surface);
}

/* M3 Filled button (default) */
.m3-btn-filled {
  background: var(--color-m3-primary);
  color: var(--color-m3-on-primary);
  border-radius: var(--radius-m3-extra-large);
  padding: 10px 24px;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.1px;
  box-shadow: var(--shadow-m3-1);
  transition: all 0.2s ease;
  cursor: pointer;
  border: none;
  position: relative;
  overflow: hidden;
}

.m3-btn-filled:hover {
  box-shadow: var(--shadow-m3-2);
}

.m3-btn-filled:active {
  box-shadow: var(--shadow-m3-1);
}

.m3-btn-filled:focus-visible {
  outline: 2px solid var(--color-m3-primary);
  outline-offset: 2px;
}

/* M3 Outlined button */
.m3-btn-outlined {
  background: transparent;
  color: var(--color-m3-primary);
  border-radius: var(--radius-m3-extra-large);
  padding: 10px 24px;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.1px;
  border: 1px solid var(--color-m3-outline);
  transition: all 0.2s ease;
  cursor: pointer;
}

.m3-btn-outlined:hover {
  background: var(--color-m3-state-hover-alt);
}

.m3-btn-outlined:active {
  background: var(--color-m3-state-pressed);
}

.m3-btn-outlined:focus-visible {
  outline: 2px solid var(--color-m3-primary);
  outline-offset: 2px;
}

/* M3 Text button */
.m3-btn-text {
  background: transparent;
  color: var(--color-m3-primary);
  border-radius: var(--radius-m3-extra-large);
  padding: 10px 12px;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.1px;
  border: none;
  transition: all 0.2s ease;
  cursor: pointer;
}

.m3-btn-text:hover {
  background: var(--color-m3-state-hover-alt);
}

.m3-btn-text:active {
  background: var(--color-m3-state-pressed);
}

/* M3 Tonal button */
.m3-btn-tonal {
  background: var(--color-m3-secondary-container);
  color: var(--color-m3-on-secondary-container);
  border-radius: var(--radius-m3-extra-large);
  padding: 10px 24px;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.1px;
  border: none;
  transition: all 0.2s ease;
  cursor: pointer;
}

.m3-btn-tonal:hover {
  background: var(--color-m3-secondary-container);
  box-shadow: var(--shadow-m3-1);
}

.m3-btn-tonal:active {
  box-shadow: none;
}

/* M3 Icon button */
.m3-btn-icon {
  background: transparent;
  color: var(--color-m3-on-surface-variant);
  border-radius: var(--radius-m3-full);
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  transition: all 0.2s ease;
  cursor: pointer;
}

.m3-btn-icon:hover {
  background: var(--color-m3-state-hover);
}

.m3-btn-icon:active {
  background: var(--color-m3-state-pressed);
}

.m3-btn-icon-selected {
  background: var(--color-m3-secondary-container);
  color: var(--color-m3-on-secondary-container);
}

/* M3 FAB */
.m3-fab {
  background: var(--color-m3-primary-container);
  color: var(--color-m3-on-primary-container);
  border-radius: var(--radius-m3-large);
  padding: 16px;
  min-width: 56px;
  min-height: 56px;
  box-shadow: var(--shadow-m3-3);
  border: none;
  transition: all 0.2s ease;
  cursor: pointer;
}

.m3-fab:hover {
  box-shadow: var(--shadow-m3-4);
}

.m3-fab:active {
  box-shadow: var(--shadow-m3-2);
}

.m3-fab-small {
  border-radius: var(--radius-m3-medium);
  padding: 8px;
  min-width: 40px;
  min-height: 40px;
}

.m3-fab-large {
  border-radius: var(--radius-m3-large);
  padding: 20px;
  min-width: 96px;
  min-height: 96px;
}

/* M3 Card - Elevated */
.m3-card-elevated {
  background: var(--color-m3-surface);
  border-radius: var(--radius-m3-medium);
  box-shadow: var(--shadow-m3-1);
  transition: box-shadow 0.2s ease;
  overflow: hidden;
}

.m3-card-elevated:hover {
  box-shadow: var(--shadow-m3-2);
}

/* M3 Card - Filled */
.m3-card-filled {
  background: var(--color-m3-surface-container-low);
  border-radius: var(--radius-m3-medium);
  overflow: hidden;
}

/* M3 Card - Outlined */
.m3-card-outlined {
  background: var(--color-m3-surface);
  border-radius: var(--radius-m3-medium);
  border: 1px solid var(--color-m3-outline-variant);
  overflow: hidden;
}

/* M3 Input - Outlined */
.m3-input-outlined {
  background: transparent;
  border: 1px solid var(--color-m3-outline);
  border-radius: var(--radius-m3-extra-small);
  padding: 16px;
  font-size: 16px;
  color: var(--color-m3-on-surface);
  transition: all 0.2s ease;
  outline: none;
}

.m3-input-outlined:hover {
  border-color: var(--color-m3-on-surface-variant);
}

.m3-input-outlined:focus {
  border-color: var(--color-m3-primary);
  border-width: 2px;
}

.m3-input-outlined::placeholder {
  color: var(--color-m3-on-surface-variant);
}

/* M3 Input - Filled */
.m3-input-filled {
  background: var(--color-m3-surface-container-high);
  border: none;
  border-radius: var(--radius-m3-extra-small) var(--radius-m3-extra-small) 0 0;
  padding: 16px;
  font-size: 16px;
  color: var(--color-m3-on-surface);
  transition: all 0.2s ease;
  outline: none;
}

.m3-input-filled:focus {
  background: var(--color-m3-surface-container-highest);
}

/* M3 Chip - Assist */
.m3-chip-assist {
  background: var(--color-m3-surface-container-low);
  color: var(--color-m3-on-surface-variant);
  border-radius: var(--radius-m3-small);
  padding: 6px 12px;
  font-size: 14px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.m3-chip-assist:hover {
  background: var(--color-m3-state-hover);
}

/* M3 Chip - Filter */
.m3-chip-filter {
  background: transparent;
  color: var(--color-m3-on-surface-variant);
  border-radius: var(--radius-m3-small);
  padding: 6px 12px;
  font-size: 14px;
  border: 1px solid var(--color-m3-outline);
  cursor: pointer;
  transition: all 0.2s ease;
}

.m3-chip-filter:hover {
  background: var(--color-m3-state-hover-alt);
}

.m3-chip-filter-selected {
  background: var(--color-m3-secondary-container);
  color: var(--color-m3-on-secondary-container);
  border-color: transparent;
}

/* M3 Chip - Input */
.m3-chip-input {
  background: var(--color-m3-surface-container-low);
  color: var(--color-m3-on-surface-variant);
  border-radius: var(--radius-m3-small);
  padding: 6px 12px;
  font-size: 14px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

/* M3 Chip - Suggestion */
.m3-chip-suggestion {
  background: transparent;
  color: var(--color-m3-on-surface-variant);
  border-radius: var(--radius-m3-small);
  padding: 6px 12px;
  font-size: 14px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.m3-chip-suggestion:hover {
  background: var(--color-m3-state-hover-alt);
}

/* M3 Badge */
.m3-badge {
  background: var(--color-m3-error);
  color: var(--color-m3-on-error);
  border-radius: var(--radius-m3-full);
  padding: 0 6px;
  font-size: 10px;
  font-weight: 500;
  min-width: 16px;
  height: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

/* M3 Avatar - Image */
.m3-avatar-image {
  background: var(--color-m3-primary-container);
  border-radius: var(--radius-m3-full);
  width: 40px;
  height: 40px;
  overflow: hidden;
}

.m3-avatar-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* M3 Avatar - Initials */
.m3-avatar-initials {
  background: var(--color-m3-primary-container);
  color: var(--color-m3-on-primary-container);
  border-radius: var(--radius-m3-full);
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 500;
}

/* M3 Avatar - Icon */
.m3-avatar-icon {
  background: var(--color-m3-secondary-container);
  color: var(--color-m3-on-secondary-container);
  border-radius: var(--radius-m3-full);
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* M3 Checkbox */
.m3-checkbox {
  width: 18px;
  height: 18px;
  border: 2px solid var(--color-m3-outline);
  border-radius: 2px;
  cursor: pointer;
  transition: all 0.2s ease;
  appearance: none;
  background: transparent;
}

.m3-checkbox:checked {
  background: var(--color-m3-primary);
  border-color: var(--color-m3-primary);
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='white' d='M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z'/%3E%3C/svg%3E");
  background-size: 100%;
  background-position: center;
  background-repeat: no-repeat;
}

/* M3 Radio */
.m3-radio {
  width: 20px;
  height: 20px;
  border: 2px solid var(--color-m3-outline);
  border-radius: var(--radius-m3-full);
  cursor: pointer;
  appearance: none;
  transition: all 0.2s ease;
}

.m3-radio:checked {
  border-color: var(--color-m3-primary);
  border-width: 10px;
}

/* M3 Switch */
.m3-switch {
  width: 52px;
  height: 32px;
  background: var(--color-m3-surface-container-highest);
  border-radius: 16px;
  cursor: pointer;
  appearance: none;
  transition: all 0.2s ease;
  position: relative;
  border: none;
}

.m3-switch::before {
  content: "";
  position: absolute;
  width: 24px;
  height: 24px;
  background: var(--color-m3-outline);
  border-radius: var(--radius-m3-full);
  top: 4px;
  left: 4px;
  transition: all 0.2s ease;
}

.m3-switch:checked {
  background: var(--color-m3-primary-container);
}

.m3-switch:checked::before {
  background: var(--color-m3-on-primary-container);
  transform: translateX(20px);
}

/* M3 Slider */
.m3-slider {
  height: 40px;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.m3-slider-track {
  flex: 1;
  height: 4px;
  background: var(--color-m3-surface-container-highest);
  border-radius: 2px;
  position: relative;
}

.m3-slider-fill {
  position: absolute;
  height: 100%;
  background: var(--color-m3-primary);
  border-radius: 2px;
  left: 0;
}

.m3-slider-thumb {
  width: 20px;
  height: 20px;
  background: var(--color-m3-primary);
  border-radius: var(--radius-m3-full);
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: var(--shadow-m3-2);
  transition: all 0.1s ease;
  cursor: grab;
}

.m3-slider-thumb:active {
  cursor: grabbing;
  transform: translateX(-50%) scale(1.1);
}

/* M3 Progress - Linear */
.m3-progress-linear {
  height: 4px;
  background: var(--color-m3-surface-container-highest);
  border-radius: 2px;
  overflow: hidden;
}

.m3-progress-linear-bar {
  height: 100%;
  background: var(--color-m3-primary);
  border-radius: 2px;
  transition: width 0.3s ease;
}

/* M3 Progress - Circular */
.m3-progress-circular {
  width: 48px;
  height: 48px;
  position: relative;
}

.m3-progress-circular-track {
  position: absolute;
  inset: 0;
  border: 4px solid var(--color-m3-surface-container-highest);
  border-radius: var(--radius-m3-full);
}

.m3-progress-circular-indicator {
  position: absolute;
  inset: 0;
  border: 4px solid transparent;
  border-top-color: var(--color-m3-primary);
  border-radius: var(--radius-m3-full);
  animation: m3-spin 1s linear infinite;
}

@keyframes m3-spin {
  to {
    transform: rotate(360deg);
  }
}

/* M3 Dialog */
.m3-dialog {
  background: var(--color-m3-surface);
  border-radius: var(--radius-m3-extra-large);
  padding: 24px;
  box-shadow: var(--shadow-m3-5);
  max-width: 560px;
  min-width: 280px;
}

.m3-dialog-headline {
  font-size: 24px;
  font-weight: 400;
  color: var(--color-m3-on-surface);
  margin-bottom: 16px;
}

.m3-dialog-content {
  font-size: 14px;
  color: var(--color-m3-on-surface-variant);
  line-height: 1.5;
  margin-bottom: 24px;
}

.m3-dialog-actions {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
}

/* M3 Navigation - Rail */
.m3-nav-rail {
  background: var(--color-m3-surface);
  width: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 0;
  gap: 4px;
}

.m3-nav-rail-item {
  width: 56px;
  height: 56px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  border-radius: var(--radius-m3-medium);
  color: var(--color-m3-on-surface-variant);
  cursor: pointer;
  transition: all 0.2s ease;
}

.m3-nav-rail-item:hover {
  background: var(--color-m3-state-hover);
}

.m3-nav-rail-item-selected {
  background: var(--color-m3-secondary-container);
  color: var(--color-m3-on-secondary-container);
}

.m3-nav-rail-label {
  font-size: 12px;
  font-weight: 500;
}

/* M3 Navigation - Bar */
.m3-nav-bar {
  background: var(--color-m3-surface);
  height: 80px;
  display: flex;
  justify-content: center;
  gap: 12px;
  padding: 0 24px;
  box-shadow: var(--shadow-m3-2);
}

.m3-nav-bar-item {
  flex: 1;
  max-width: 80px;
  height: 64px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  border-radius: var(--radius-m3-medium);
  color: var(--color-m3-on-surface-variant);
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
}

.m3-nav-bar-item:hover {
  background: var(--color-m3-state-hover);
}

.m3-nav-bar-item-selected {
  color: var(--color-m3-on-secondary-container);
}

.m3-nav-bar-item-selected::before {
  content: "";
  position: absolute;
  top: 0;
  width: 32px;
  height: 3px;
  background: var(--color-m3-secondary-container);
  border-radius: 0 0 3px 3px;
}

/* M3 Tabs */
.m3-tabs {
  background: var(--color-m3-surface);
  display: flex;
  gap: 0;
}

.m3-tab {
  color: var(--color-m3-on-surface-variant);
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  position: relative;
  transition: color 0.2s ease;
}

.m3-tab:hover {
  color: var(--color-m3-on-surface);
}

.m3-tab-selected {
  color: var(--color-m3-primary);
}

.m3-tab-indicator {
  position: absolute;
  bottom: 0;
  height: 3px;
  background: var(--color-m3-primary);
  border-radius: 3px 3px 0 0;
  transition: all 0.2s ease;
}

/* M3 Tooltip */
.m3-tooltip {
  background: var(--color-m3-inverse-surface);
  color: var(--color-m3-inverse-on-surface);
  border-radius: var(--radius-m3-extra-small);
  padding: 6px 8px;
  font-size: 12px;
  line-height: 1.4;
  max-width: 200px;
  box-shadow: var(--shadow-m3-2);
}

/* M3 Snackbar */
.m3-snackbar {
  background: var(--color-m3-inverse-surface);
  color: var(--color-m3-inverse-on-surface);
  border-radius: var(--radius-m3-extra-small);
  padding: 14px 16px;
  font-size: 14px;
  box-shadow: var(--shadow-m3-3);
  display: flex;
  align-items: center;
  gap: 12px;
  max-width: 420px;
}

.m3-snackbar-action {
  color: var(--color-m3-inverse-primary);
  font-weight: 500;
  cursor: pointer;
  background: transparent;
  border: none;
}

/* M3 Divider */
.m3-divider {
  background: var(--color-m3-outline-variant);
  height: 1px;
  margin: 16px 0;
}

.m3-divider-vertical {
  background: var(--color-m3-outline-variant);
  width: 1px;
  margin: 0 16px;
}

/* M3 Text styles */
.m3-display-large {
  font-size: 57px;
  font-weight: 400;
  letter-spacing: -0.25px;
  line-height: 64px;
}

.m3-display-medium {
  font-size: 45px;
  font-weight: 400;
  line-height: 52px;
}

.m3-display-small {
  font-size: 36px;
  font-weight: 400;
  line-height: 44px;
}

.m3-headline-large {
  font-size: 32px;
  font-weight: 400;
  line-height: 40px;
}

.m3-headline-medium {
  font-size: 28px;
  font-weight: 400;
  line-height: 36px;
}

.m3-headline-small {
  font-size: 24px;
  font-weight: 400;
  line-height: 32px;
}

.m3-title-large {
  font-size: 22px;
  font-weight: 400;
  line-height: 28px;
}

.m3-title-medium {
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0.15px;
  line-height: 24px;
}

.m3-title-small {
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.1px;
  line-height: 20px;
}

.m3-body-large {
  font-size: 16px;
  font-weight: 400;
  letter-spacing: 0.5px;
  line-height: 24px;
}

.m3-body-medium {
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 0.25px;
  line-height: 20px;
}

.m3-body-small {
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 0.4px;
  line-height: 16px;
}

.m3-label-large {
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.1px;
  line-height: 20px;
}

.m3-label-medium {
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.5px;
  line-height: 16px;
}

.m3-label-small {
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.5px;
  line-height: 16px;
}

/* M3 Surface containers */
.m3-surface-dim {
  background: var(--color-m3-surface-dim);
}

.m3-surface-container {
  background: var(--color-m3-surface-container);
}

.m3-surface-container-low {
  background: var(--color-m3-surface-container-low);
}

.m3-surface-container-high {
  background: var(--color-m3-surface-container-high);
}

.m3-surface-container-highest {
  background: var(--color-m3-surface-container-highest);
}
`;
const STYLE_VARIANTS = {
    claymorphism: {
        id: "claymorphism",
        name: "Claymorphism",
        cssString: CLAYMORPHISM_CSS,
        classPrefix: "clay-",
        description: "Soft raised shadows with clay-like appearance",
        componentStyles: {
            "app-button": {
                variants: {
                    solid: "clay-btn clay-btn-solid",
                    ghost: "clay-btn clay-btn-ghost",
                    text: "clay-btn clay-btn-text",
                    icon: "clay-btn clay-btn-icon",
                },
                sizes: {
                    sm: "clay-btn-sm",
                    md: "",
                    lg: "",
                },
            },
            "app-card": {
                variants: {
                    elevated: "clay-card clay-card-elevated",
                    filled: "clay-card clay-card-filled",
                    outlined: "clay-card clay-card-outlined",
                },
            },
            "app-theme-toggle": { variants: { default: "clay-toggle" } },
            "app-swap-button": { variants: { default: "clay-swap-btn" } },
            "app-language-selector": { variants: { default: "clay-lang-selector" } },
            "app-text-input": { variants: { default: "clay-input" } },
            "app-translation-output": { variants: { default: "clay-output" } },
            "app-shortcuts-overlay": { variants: { default: "clay-overlay" } },
        },
    },
    glassmorphism: {
        id: "glassmorphism",
        name: "Glassmorphism",
        cssString: GLASSMORPHISM_CSS,
        classPrefix: "glass-",
        description: "Frosted glass effect with backdrop blur",
        componentStyles: {
            "app-button": {
                variants: {
                    solid: "glass-btn glass-btn-solid",
                    ghost: "glass-btn glass-btn-ghost",
                    text: "glass-btn glass-btn-text",
                    icon: "glass-btn glass-btn-icon",
                },
                sizes: {
                    sm: "glass-btn-sm",
                    md: "",
                    lg: "",
                },
            },
            "app-card": {
                variants: {
                    elevated: "glass-card glass-card-elevated",
                    filled: "glass-card glass-card-filled",
                    outlined: "glass-card glass-card-outlined",
                },
            },
            "app-theme-toggle": { variants: { default: "glass-toggle" } },
            "app-swap-button": { variants: { default: "glass-swap-btn" } },
            "app-language-selector": { variants: { default: "glass-lang-selector" } },
            "app-text-input": { variants: { default: "glass-input" } },
            "app-translation-output": { variants: { default: "glass-output" } },
            "app-shortcuts-overlay": { variants: { default: "glass-overlay" } },
        },
    },
    neumorphism: {
        id: "neumorphism",
        name: "Neumorphism",
        cssString: NEUMORPHISM_CSS,
        classPrefix: "neu-",
        description: "Soft inset and outset shadows",
        componentStyles: {
            "app-button": {
                variants: {
                    solid: "neu-btn neu-btn-primary",
                    ghost: "neu-btn neu-btn-primary",
                    text: "neu-btn neu-btn-primary",
                    icon: "neu-btn neu-btn-icon",
                },
                sizes: {
                    sm: "neu-btn-sm",
                    md: "",
                    lg: "",
                },
            },
            "app-card": {
                variants: {
                    elevated: "neu-card neu-card-elevated",
                    filled: "neu-card neu-card-filled",
                    outlined: "neu-card neu-card-outlined",
                },
            },
            "app-theme-toggle": { variants: { default: "neu-toggle" } },
            "app-swap-button": { variants: { default: "neu-swap-btn" } },
            "app-language-selector": { variants: { default: "neu-lang-selector" } },
            "app-text-input": { variants: { default: "neu-input" } },
            "app-translation-output": { variants: { default: "neu-output" } },
            "app-shortcuts-overlay": { variants: { default: "neu-overlay" } },
        },
    },
    "material-design-v3": {
        id: "material-design-v3",
        name: "Material Design 3",
        cssString: MATERIAL_DESIGN_V3_CSS,
        classPrefix: "m3-",
        description: "Google Material Design 3 with elevation system",
        componentStyles: {
            "app-button": {
                variants: {
                    solid: "m3-btn-filled",
                    ghost: "m3-btn-outlined",
                    text: "m3-btn-text",
                    icon: "m3-btn-icon",
                },
                sizes: {
                    sm: "m3-btn-sm",
                    md: "",
                    lg: "",
                },
            },
            "app-card": {
                variants: {
                    elevated: "m3-card-elevated",
                    filled: "m3-card-filled",
                    outlined: "m3-card-outlined",
                },
            },
            "app-theme-toggle": { variants: { default: "m3-toggle" } },
            "app-swap-button": { variants: { default: "m3-swap-btn" } },
            "app-language-selector": { variants: { default: "m3-lang-selector" } },
            "app-text-input": { variants: { default: "m3-input" } },
            "app-translation-output": { variants: { default: "m3-output" } },
            "app-shortcuts-overlay": { variants: { default: "m3-overlay" } },
        },
    },
    brutalism: {
        id: "brutalism",
        name: "Brutalism",
        cssString: BRUTALISM_CSS,
        classPrefix: "brut-",
        description: "Sharp edges, hard shadows, high-contrast typography",
        componentStyles: {
            "app-button": {
                variants: { default: "brut-btn" },
                sizes: { sm: "brut-btn-sm", md: "", lg: "brut-btn-lg" },
            },
            "app-card": { variants: { default: "brut-card" } },
            "app-input": { variants: { default: "brut-input" } },
            "app-textarea": { variants: { default: "brut-input" } },
            "app-modal": { variants: { default: "brut-modal" } },
            "app-dialog": { variants: { default: "brut-modal" } },
            "app-confirm-dialog": { variants: { default: "brut-modal" } },
            "app-chip": { variants: { default: "brut-chip" } },
            "app-badge": { variants: { default: "brut-badge" } },
            "app-tabs": { variants: { default: "brut-tabs" } },
            "app-divider": { variants: { default: "brut-divider" } },
            "app-spinner": { variants: { default: "brut-spinner" } },
            "app-loading": { variants: { default: "brut-spinner" } },
        },
    },
    skeuomorphism: {
        id: "skeuomorphism",
        name: "Skeuomorphism",
        cssString: SKEUOMORPHISM_CSS,
        classPrefix: "skeu-",
        description: "Realistic textures with leather, paper, and glossy highlights",
        componentStyles: {
            "app-button": {
                variants: { default: "skeu-btn" },
                sizes: { sm: "skeu-btn-sm", md: "", lg: "skeu-btn-lg" },
            },
            "app-card": {
                variants: { default: "skeu-card", paper: "skeu-card paper" },
            },
            "app-input": { variants: { default: "skeu-input" } },
            "app-textarea": { variants: { default: "skeu-input" } },
            "app-modal": { variants: { default: "skeu-modal" } },
            "app-dialog": { variants: { default: "skeu-modal" } },
            "app-confirm-dialog": { variants: { default: "skeu-modal" } },
            "app-chip": { variants: { default: "skeu-chip" } },
            "app-badge": { variants: { default: "skeu-badge" } },
            "app-tabs": { variants: { default: "skeu-tabs" } },
            "app-divider": { variants: { default: "skeu-divider" } },
            "app-spinner": { variants: { default: "skeu-spinner" } },
            "app-loading": { variants: { default: "skeu-spinner" } },
        },
    },
};
const LOADED_STYLES = new Set();
let CURRENT_STYLE = "material-design-v3";
const STYLE_ELEMENTS = new Map();
async function loadStyleVariant(variant) {
    if (LOADED_STYLES.has(variant)) {
        return;
    }
    const config = STYLE_VARIANTS[variant];
    if (!config) {
        console.warn(`Unknown style variant: ${variant}`);
        return;
    }
    if (!config.cssString) {
        console.warn(`No CSS loaded for variant: ${variant}`);
        return;
    }
    const style = document.createElement("style");
    style.textContent = config.cssString;
    style.id = `style-${variant}`;
    style.dataset.styleVariant = variant;
    document.head.appendChild(style);
    LOADED_STYLES.add(variant);
    STYLE_ELEMENTS.set(variant, style);
}
function unloadStyleVariant(variant) {
    if (!LOADED_STYLES.has(variant)) {
        return;
    }
    const style = STYLE_ELEMENTS.get(variant);
    if (style && style.parentNode) {
        style.parentNode.removeChild(style);
    }
    LOADED_STYLES.delete(variant);
    STYLE_ELEMENTS.delete(variant);
}
function setCurrentStyle(variant) {
    if (variant === CURRENT_STYLE) {
        return;
    }
    CURRENT_STYLE = variant;
    if (typeof window !== "undefined" && window.localStorage) {
        window.localStorage.setItem("tauri-front-style", variant);
    }
    document.dispatchEvent(new CustomEvent("style-changed", {
        detail: { variant, prefix: STYLE_VARIANTS[variant].classPrefix },
    }));
}
function getCurrentStyle() {
    return CURRENT_STYLE;
}
function getStyleConfig(variant) {
    return STYLE_VARIANTS[variant] || STYLE_VARIANTS["material-design-v3"];
}
function getStyleClassPrefix(variant) {
    return STYLE_VARIANTS[variant]?.classPrefix || "m3-";
}
/**
 * Get CSS classes for a component's variant and size.
 * Uses the global style registry — variant and size are resolved separately.
 * Returns CSS class string combining variant and size classes, or empty string if not found.
 */
function getComponentStyleClasses(theme, componentId, explicitVariant, explicitSize, globalContext) {
    const config = STYLE_VARIANTS[theme];
    if (!config)
        return "";
    const componentMap = config.componentStyles?.[componentId];
    if (!componentMap)
        return "";
    // Resolve variant: explicit > global
    const resolvedVariant = explicitVariant || globalContext?.variant;
    // Resolve size: explicit > global
    const resolvedSize = explicitSize || globalContext?.size;
    const classes = [];
    // Get variant class
    if (resolvedVariant) {
        const variantClass = componentMap.variants?.[resolvedVariant];
        if (variantClass) {
            classes.push(variantClass);
        }
    }
    // Get size class
    if (resolvedSize && componentMap.sizes) {
        const sizeClass = componentMap.sizes[resolvedSize];
        if (sizeClass) {
            classes.push(sizeClass);
        }
    }
    // If nothing resolved, try default
    if (classes.length === 0) {
        return componentMap.default || "";
    }
    return classes.join(" ");
}
function getAllStyleVariants() {
    return Object.values(STYLE_VARIANTS);
}
function initializeStyles() {
    if (typeof window === "undefined" || !window.localStorage) {
        return;
    }
    const savedStyle = window.localStorage.getItem("tauri-front-style");
    if (savedStyle && STYLE_VARIANTS[savedStyle]) {
        CURRENT_STYLE = savedStyle;
    }
}
function getStyleClass(variant, baseClass) {
    const prefix = getStyleClassPrefix(variant);
    const baseName = baseClass.replace(/^clay-|^glass-|^neu-|^m3-/, "");
    return `${prefix}${baseName}`;
}
function applyStyleToElement(element, variant) {
    const prefix = getStyleClassPrefix(variant);
    element.dataset.styleVariant = variant;
    element.classList.forEach((cls) => {
        if (cls.startsWith("clay-") ||
            cls.startsWith("glass-") ||
            cls.startsWith("neu-") ||
            cls.startsWith("m3-")) {
            element.classList.remove(cls);
        }
    });
    element.classList.add(`${prefix}${element.dataset.baseClass || ""}`);
}

const DARK_MODE_STORAGE_KEY = "tauri-front-dark-mode";
class StyleThemeService {
    _themeChanged$ = new BehaviorSubject({
        variant: getCurrentStyle(),
        isDark: this.loadDarkModePreference(),
    });
    themeChanged$ = this._themeChanged$.asObservable();
    constructor() {
        this.initializeDarkMode();
    }
    /** No-op for API compatibility; initialization runs in the constructor. */
    init() { }
    async loadTheme(variant) {
        setCurrentStyle(variant);
        if (this.isDarkMode()) {
            this.injectDarkModeVariables(variant);
        }
        this._themeChanged$.next({
            variant,
            isDark: this.isDarkMode(),
        });
    }
    /** Convenience alias for apps that use simple theme names (e.g. "light", "dark"). */
    async setTheme(theme) {
        const variant = this.resolveThemeVariant(theme);
        await this.loadTheme(variant);
    }
    resolveThemeVariant(theme) {
        const map = {
            "material-design-v3": "material-design-v3",
            neumorphism: "neumorphism",
            claymorphism: "claymorphism",
            glassmorphism: "glassmorphism",
            brutalism: "brutalism",
            skeuomorphism: "skeuomorphism",
        };
        if (map[theme])
            return map[theme];
        return "material-design-v3";
    }
    /** Alias for toggleDarkMode() — used by ZenithDB. */
    toggle() {
        this.toggleDarkMode();
    }
    /** Returns 'dark' or 'light' based on current dark mode state — used by ZenithDB. */
    effectiveColorMode() {
        return this.isDarkMode() ? "dark" : "light";
    }
    toggleDarkMode() {
        const html = document.documentElement;
        const isCurrentlyDark = html.classList.contains("dark");
        if (isCurrentlyDark) {
            html.classList.remove("dark");
            this.removeDarkModeVariables();
        }
        else {
            html.classList.add("dark");
            this.injectDarkModeVariables(this.getCurrentTheme());
        }
        this.saveDarkModePreference(!isCurrentlyDark);
        this._themeChanged$.next({
            variant: this.getCurrentTheme(),
            isDark: !isCurrentlyDark,
        });
    }
    isDarkMode() {
        return document.documentElement.classList.contains("dark");
    }
    setDarkMode(enabled) {
        const html = document.documentElement;
        if (enabled) {
            html.classList.add("dark");
            this.injectDarkModeVariables(this.getCurrentTheme());
        }
        else {
            html.classList.remove("dark");
            this.removeDarkModeVariables();
        }
        this.saveDarkModePreference(enabled);
        this._themeChanged$.next({
            variant: this.getCurrentTheme(),
            isDark: enabled,
        });
    }
    getCurrentTheme() {
        return getCurrentStyle();
    }
    injectDarkModeVariables(variant) {
        this.removeDarkModeVariables();
        const style = document.createElement("style");
        style.id = "dark-mode-variables";
        // Both mechanisms are needed: :root {} variables AND .dark .{prefix}* class selectors
        style.textContent =
            this.getDarkModeVariablesCSS(variant) +
                this.getDarkModeCSSForVariant(variant);
        document.head.appendChild(style);
    }
    removeDarkModeVariables() {
        const existing = document.getElementById("dark-mode-variables");
        if (existing)
            existing.remove();
    }
    getDarkModeVariablesCSS(variant) {
        const isDark = document.documentElement.classList.contains("dark");
        if (!isDark)
            return "";
        const vars = {
            "material-design-v3": `
:root {
  --accent: #d0bcff;
  --accent-hover: #b69df8;
  --text-on-accent: #381e72;
  --text-primary: #e6e1e5;
  --text-secondary: #cac4d0;
  --text-muted: #938f99;
  --text-on-error: #f2b8b5;
  --bg-elevated: #2b2930;
  --border-color: #49454f;
  --error: #f2b8b5;
  --success: #6ee7b7;
  --bg-primary: #1c1b1f;
  --bg-hover: rgba(187, 184, 201, 0.08);
  --bg-header: #1c1b1f;
  --bg-secondary: #211f26;
}`,
            neumorphism: `
:root {
  --accent: #a78bfa;
  --accent-hover: #8b7cf7;
  --text-on-accent: #1e1b2e;
  --text-primary: #e2e8f0;
  --text-secondary: #94a3b8;
  --text-muted: #64748b;
  --text-on-error: #1e1b2e;
  --bg-elevated: #2d3748;
  --border-color: #4a5568;
  --error: #fc8181;
  --success: #68d391;
  --bg-primary: #1a202c;
  --bg-tertiary: #171923;
  --bg-hover: #3d4758;
  --bg-header: #2d3748;
  --bg-secondary: #1e2533;
  --bg-tertiary: #171923;
}`,
            claymorphism: `
:root {
  --accent: #a78bfa;
  --accent-hover: #8b7cf7;
  --text-on-accent: #1e1b2e;
  --text-primary: #e2e8f0;
  --text-secondary: #94a3b8;
  --text-muted: #64748b;
  --text-on-error: #1e1b2e;
  --bg-elevated: #2d3748;
  --border-color: #4a5568;
  --error: #fc8181;
  --success: #68d391;
  --bg-primary: #1a202c;
  --bg-tertiary: #171923;
  --bg-hover: #3d4758;
  --bg-header: #2d3748;
  --bg-secondary: #1e2533;
  --bg-tertiary: #171923;
}`,
            glassmorphism: `
:root {
  --accent: rgba(167, 139, 250, 0.8);
  --accent-hover: rgba(187, 159, 250, 0.9);
  --text-on-accent: #1e1b2e;
  --text-primary: #e2e8f0;
  --text-secondary: #94a3b8;
  --text-muted: #64748b;
  --text-on-error: #fce4ec;
  --bg-elevated: rgba(30, 30, 50, 0.7);
  --border-color: rgba(255, 255, 255, 0.15);
  --error: #ff6b6b;
  --success: #51cf66;
  --bg-primary: rgba(15, 15, 30, 0.9);
  --bg-tertiary: rgba(10, 10, 20, 0.95);
  --bg-hover: rgba(50, 50, 80, 0.4);
  --bg-header: rgba(20, 20, 40, 0.8);
  --bg-secondary: rgba(25, 25, 45, 0.75);
  --bg-tertiary: rgba(10, 10, 20, 0.95);
}`,
            brutalism: `
:root {
  --color-brut-base: #1a1a1a;
  --color-brut-ink: #f5f5f0;
  --bg-primary: #1a1a1a;
  --bg-elevated: #2a2a2a;
  --bg-hover: #3a3a3a;
  --bg-tertiary: #404040;
  --text-primary: #f5f5f0;
  --text-secondary: #c0c0c0;
  --text-muted: #909090;
  --border-color: #f5f5f0;
}`,
            skeuomorphism: `
:root {
  --color-skeu-base: #2b1f14;
  --color-skeu-leather: #3a2a18;
  --color-skeu-leather-dark: #1a1009;
  --color-skeu-paper: #3a2e1f;
  --color-skeu-ink: #f5e6c8;
  --color-skeu-accent: #d4a017;
  --bg-primary: #2b1f14;
  --bg-elevated: #3a2e1f;
  --bg-hover: #4a3e2f;
  --bg-tertiary: #5a4e3f;
  --text-primary: #f5e6c8;
  --text-secondary: #d4b890;
  --text-muted: #a8916b;
  --border-color: #1a1009;
}`,
        };
        return vars[variant] ?? "";
    }
    getDarkModeCSS(variant) {
        return this.getDarkModeCSSForVariant(variant);
    }
    getDarkModeCSSForVariant(variant) {
        switch (variant) {
            case "material-design-v3":
                return this.materialDesignV3DarkCSS();
            case "neumorphism":
                return this.neumorphismDarkCSS();
            case "claymorphism":
                return this.claymorphismDarkCSS();
            case "glassmorphism":
                return this.glassmorphismDarkCSS();
            case "brutalism":
                return this.brutalismDarkCSS();
            case "skeuomorphism":
                return this.skeuomorphismDarkCSS();
            default:
                return "";
        }
    }
    brutalismDarkCSS() {
        return `
:root {
  --color-brut-base: #1a1a1a;
  --color-brut-ink: #f5f5f0;
  --bg-primary: #1a1a1a;
  --bg-elevated: #2a2a2a;
  --bg-hover: #3a3a3a;
  --bg-tertiary: #404040;
  --text-primary: #f5f5f0;
  --text-secondary: #c0c0c0;
  --text-muted: #909090;
  --border-color: #f5f5f0;
  --border-subtle: #c0c0c0;
}

.dark .brut-card {
  background: #2a2a2a;
  border-color: #f5f5f0;
}
.dark .brut-btn {
  background: #2a2a2a;
  border-color: #f5f5f0;
  color: #f5f5f0;
}
.dark .brut-btn:hover { background: #3a3a3a; }
.dark .brut-btn-primary { background: #ff3b30; color: #ffffff; }
.dark .brut-input {
  background: #2a2a2a;
  border-color: #f5f5f0;
  color: #f5f5f0;
}
.dark .brut-input:focus { background: #3a3a3a; outline: none; }
.dark .brut-modal {
  background: #2a2a2a;
  border-color: #f5f5f0;
}
.dark .brut-chip { background: #ffd60a; color: #0a0a0a; border-color: #f5f5f0; }
.dark .brut-badge { background: #ff3b30; color: #ffffff; border-color: #f5f5f0; }
.dark .brut-tabs { border-bottom-color: #f5f5f0; }
.dark .brut-tab { background: #2a2a2a; border-color: #f5f5f0; color: #f5f5f0; }
.dark .brut-tab.active { background: #ff3b30; color: #ffffff; }
.dark .brut-divider { background: #f5f5f0; }
.dark .brut-spinner { border-color: #f5f5f0; border-top-color: #ff3b30; }
`;
    }
    skeuomorphismDarkCSS() {
        return `
:root {
  --color-skeu-base: #2b1f14;
  --color-skeu-leather: #3a2a18;
  --color-skeu-leather-dark: #1a1009;
  --color-skeu-paper: #3a2e1f;
  --color-skeu-ink: #f5e6c8;
  --color-skeu-accent: #d4a017;
  --color-skeu-accent-dark: #b8860b;
  --bg-primary: #2b1f14;
  --bg-elevated: #3a2e1f;
  --bg-hover: #4a3e2f;
  --bg-tertiary: #5a4e3f;
  --text-primary: #f5e6c8;
  --text-secondary: #d4b890;
  --text-muted: #a8916b;
  --border-color: #1a1009;
  --border-subtle: #4a2e18;
}

.dark .skeu-card {
  background: linear-gradient(180deg, #3a2a18 0%, #1a1009 100%);
  border-color: #1a1009;
  color: #f5e6c8;
}
.dark .skeu-card.paper {
  background: linear-gradient(180deg, #3a2e1f 0%, #2b2218 100%);
  color: #f5e6c8;
  border-color: #5a4e3f;
}
.dark .skeu-btn {
  background: linear-gradient(180deg, #4a3a28 0%, #1a1009 100%);
  border-color: #1a1009;
  color: #f5e6c8;
}
.dark .skeu-btn:hover { filter: brightness(1.15); }
.dark .skeu-btn-primary {
  background: linear-gradient(180deg, #d4a017 0%, #8b6508 100%);
  color: #f5e6c8;
}
.dark .skeu-input {
  background: linear-gradient(180deg, #4a3e2f 0%, #3a3025 100%);
  border-color: #1a1009;
  color: #f5e6c8;
}
.dark .skeu-modal {
  background: linear-gradient(180deg, #3a2e1f 0%, #2b2218 100%);
  border-color: #1a1009;
  color: #f5e6c8;
}
.dark .skeu-chip {
  background: linear-gradient(180deg, #4a3a28 0%, #1a1009 100%);
  border-color: #1a1009;
  color: #f5e6c8;
}
.dark .skeu-badge {
  background: linear-gradient(180deg, #d4a017 0%, #8b6508 100%);
  color: #f5e6c8;
}
.dark .skeu-tabs {}
.dark .skeu-divider { background: #1a1009; }
.dark .skeu-spinner { border-color: #1a1009; border-top-color: #d4a017; }
`;
    }
    materialDesignV3DarkCSS() {
        return `
.dark .m3 {
  color: #e6e1e5;
}

.dark .m3-btn-filled {
  background: #d0bcff;
  color: #381e72;
}

.dark .m3-btn-outlined {
  color: #d0bcff;
  border-color: #938f99;
}

.dark .m3-btn-text {
  color: #d0bcff;
}

.dark .m3-btn-tonal {
  background: #4f378b;
  color: #e8def8;
}

.dark .m3-input-outlined {
  border-color: #938f99;
  color: #e6e1e5;
}

.dark .m3-card-elevated {
  background: #1c1b1f;
  box-shadow: 0 2px 4px rgba(0,0,0,0.4);
}

.dark .m3-card-filled {
  background: #211f26;
}

.dark .m3-card-outlined {
  background: #1c1b1f;
  border-color: #938f99;
}

.dark .m3-surface-dim {
  background: #141218;
}

.dark .m3-surface-container {
  background: #211f26;
}

.dark .m3-surface-container-low {
  background: #1d1b20;
}

.dark .m3-surface-container-high {
  background: #2b2930;
}

.dark .m3-surface-container-highest {
  background: #36343b;
}

.dark .m3-progress-linear {
  background: #49454f;
}

.dark .m3-progress-circular-track {
  border-color: #49454f;
}

.dark .m3-nav-rail {
  background: #1c1b1f;
}

.dark .m3-nav-bar {
  background: #1c1b1f;
}

.dark .m3-snackbar {
  background: #d0bcff;
  color: #381e72;
}

.dark .m3-tooltip {
  background: #e6e1e5;
  color: #1c1b1f;
}

.dark .m3-chip-assist {
  background: #4f378b;
  color: #e8def8;
}

.dark .m3-chip-filter {
  border-color: #938f99;
  color: #e6e1e5;
}

.dark .m3-chip-filter-selected {
  background: #4f378b;
  color: #e8def8;
}

.dark .m3-tabs {
  background: #1c1b1f;
}

.dark .m3-tab {
  color: #cac4d0;
}

.dark .m3-tab-selected {
  color: #d0bcff;
}

.dark .m3-tab-indicator {
  background: #d0bcff;
}

.dark .m3-switch {
  background: #49454f;
}

.dark .m3-switch:checked {
  background: #4f378b;
}

.dark .m3-checkbox {
  border-color: #938f99;
}

.dark .m3-checkbox:checked {
  background: #d0bcff;
  border-color: #d0bcff;
}

.dark .m3-radio {
  border-color: #938f99;
}

.dark .m3-radio:checked {
  border-color: #d0bcff;
}

.dark .m3-slider-track {
  background: #49454f;
}

.dark .m3-slider-thumb {
  background: #d0bcff;
}

.dark .m3-divider,
.dark .m3-divider-vertical {
  background: #49454f;
}
`;
    }
    neumorphismDarkCSS() {
        return `
.dark .neu {
  background: #2d3748;
}

.dark .neu-raised {
  background: #2d3748;
}

.dark .neu-pressed {
  background: #2d3748;
}

.dark .neu-btn {
  background: #2d3748;
  color: #e2e8f0;
}

.dark .neu-btn-primary {
  background: linear-gradient(145deg, #3d4758, #1f2937);
  color: #a78bfa;
}

.dark .neu-input {
  background: #2d3748;
  color: #e2e8f0;
  box-shadow: inset 6px 6px 12px #1f2937, inset -6px -6px 12px #3d4758;
}

.dark .neu-card,
.dark .neu-card-hoverable {
  background: #2d3748;
}

.dark .neu-text {
  color: #e2e8f0;
}

.dark .neu-text-primary {
  color: #f8fafc;
}

.dark .neu-text-accent {
  color: #a78bfa;
}

.dark .neu-tooltip {
  background: #2d3748;
  color: #e2e8f0;
}

.dark .neu-modal {
  background: #2d3748;
}

.dark .neu-nav {
  background: #2d3748;
}

.dark .neu-nav-item {
  color: #e2e8f0;
}

.dark .neu-nav-item-active {
  color: #a78bfa;
}

.dark .neu-tabs {
  background: #2d3748;
  box-shadow: inset 4px 4px 8px #1f2937, inset -4px -4px 8px #3d4758;
}

.dark .neu-tab {
  color: #94a3b8;
}

.dark .neu-tab-active {
  color: #a78bfa;
}

.dark .neu-icon-btn {
  background: #2d3748;
  color: #e2e8f0;
}

.dark .neu-toggle {
  background: #2d3748;
}

.dark .neu-toggle-active .neu-toggle-knob {
  background: #a78bfa;
}

.dark .neu-progress {
  background: #2d3748;
}

.dark .neu-progress-bar {
  background: linear-gradient(90deg, #a78bfa, #7c3aed);
}

.dark .neu-checkbox {
  background: #2d3748;
}

.dark .neu-checkbox-check {
  background: #a78bfa;
}

.dark .neu-radio-dot {
  background: #a78bfa;
}

.dark .neu-slider {
  background: #2d3748;
}
`;
    }
    claymorphismDarkCSS() {
        return `
.dark .clay {
  background: #2d3748;
}

.dark .clay-raised {
  background: linear-gradient(145deg, #3d4758, #1f2937);
}

.dark .clay-inset {
  background: #1f2937;
}

.dark .clay-btn {
  background: #2d3748;
}

.dark .clay-card {
  background: #2d3748;
}

.dark .clay-input {
  background: #1f2937;
  color: #e2e8f0;
}

.dark .clay-text {
  color: #e2e8f0;
}

.dark .clay-text-primary {
  color: #f8fafc;
}

.dark .clay-text-accent {
  color: #a78bfa;
}

.dark .clay-toggle {
  background: #1f2937;
}

.dark .clay-toggle-active .clay-toggle-knob {
  background: #a78bfa;
}

.dark .clay-progress {
  background: #1f2937;
}

.dark .clay-progress-bar {
  background: linear-gradient(90deg, #a78bfa, #7c3aed);
}

.dark .clay-checkbox {
  background: #1f2937;
}

.dark .clay-checkbox:checked {
  background: #a78bfa;
}

.dark .clay-modal {
  background: #2d3748;
}

.dark .clay-tooltip {
  background: #2d3748;
  color: #e2e8f0;
}

.dark .clay-badge {
  background: linear-gradient(145deg, #3d4758, #1f2937);
  color: #e2e8f0;
}

.dark .clay-avatar {
  background: #2d3748;
}

.dark .clay-divider {
  background: linear-gradient(90deg, transparent, #49454f, transparent);
}
`;
    }
    glassmorphismDarkCSS() {
        return `
.dark .glass {
  background: rgba(30, 30, 50, 0.6);
  border-color: rgba(255, 255, 255, 0.1);
}

.dark .glass-surface {
  background: linear-gradient(135deg, rgba(30, 30, 50, 0.7) 0%, rgba(20, 20, 40, 0.7) 100%);
  border-color: rgba(255, 255, 255, 0.15);
}

.dark .glass-light {
  background: rgba(50, 50, 80, 0.3);
  border-color: rgba(255, 255, 255, 0.15);
}

.dark .glass-dark {
  background: rgba(0, 0, 0, 0.5);
  border-color: rgba(255, 255, 255, 0.08);
}

.dark .glass-btn {
  background: rgba(30, 30, 50, 0.5);
  border-color: rgba(255, 255, 255, 0.15);
  color: #e2e8f0;
}

.dark .glass-btn:hover {
  background: rgba(50, 50, 80, 0.6);
  border-color: rgba(255, 255, 255, 0.25);
}

.dark .glass-btn-primary {
  background: linear-gradient(135deg, rgba(167, 139, 250, 0.8) 0%, rgba(124, 58, 237, 0.8) 100%);
  border-color: rgba(255, 255, 255, 0.3);
}

.dark .glass-card {
  background: linear-gradient(135deg, rgba(30, 30, 50, 0.6) 0%, rgba(20, 20, 40, 0.6) 100%);
  border-color: rgba(255, 255, 255, 0.12);
}

.dark .glass-input {
  background: rgba(20, 20, 40, 0.5);
  border-color: rgba(255, 255, 255, 0.15);
  color: #e2e8f0;
}

.dark .glass-input::placeholder {
  color: rgba(255, 255, 255, 0.4);
}

.dark .glass-input:focus {
  border-color: rgba(167, 139, 250, 0.6);
}

.dark .glass-badge {
  background: rgba(30, 30, 50, 0.6);
  border-color: rgba(255, 255, 255, 0.15);
  color: #e2e8f0;
}

.dark .glass-avatar {
  background: linear-gradient(135deg, rgba(50, 50, 80, 0.5) 0%, rgba(30, 30, 50, 0.5) 100%);
  border-color: rgba(255, 255, 255, 0.2);
}

.dark .glass-checkbox {
  background: rgba(20, 20, 40, 0.5);
  border-color: rgba(255, 255, 255, 0.15);
}

.dark .glass-checkbox:checked {
  background: rgba(167, 139, 250, 0.8);
  border-color: rgba(167, 139, 250, 0.8);
}

.dark .glass-toggle {
  background: rgba(30, 30, 50, 0.5);
  border-color: rgba(255, 255, 255, 0.15);
}

.dark .glass-toggle-active {
  background: rgba(167, 139, 250, 0.6);
  border-color: rgba(167, 139, 250, 0.6);
}

.dark .glass-modal {
  background: linear-gradient(135deg, rgba(30, 30, 50, 0.8) 0%, rgba(20, 20, 40, 0.8) 100%);
  border-color: rgba(255, 255, 255, 0.12);
}

.dark .glass-tooltip {
  background: linear-gradient(135deg, rgba(200, 200, 220, 0.9) 0%, rgba(180, 180, 200, 0.9) 100%);
  color: #1c1b1f;
}

.dark .glass-progress {
  background: rgba(30, 30, 50, 0.5);
  border-color: rgba(255, 255, 255, 0.1);
}

.dark .glass-progress-bar {
  background: linear-gradient(90deg, rgba(167, 139, 250, 0.8), rgba(124, 58, 237, 0.8), rgba(167, 139, 250, 0.8));
}

.dark .glass-nav {
  background: linear-gradient(90deg, rgba(30, 30, 50, 0.6) 0%, rgba(20, 20, 40, 0.6) 100%);
  border-color: rgba(255, 255, 255, 0.1);
}

.dark .glass-nav-item {
  color: rgba(200, 200, 220, 0.7);
}

.dark .glass-nav-item:hover {
  color: #e2e8f0;
  background: rgba(50, 50, 80, 0.4);
}

.dark .glass-nav-item-active {
  color: #e2e8f0;
  background: rgba(50, 50, 80, 0.5);
  border-color: rgba(167, 139, 250, 0.6);
}

.dark .glass-text {
  color: rgba(200, 200, 220, 0.9);
}

.dark .glass-text-primary {
  color: #e2e8f0;
}

.dark .glass-text-accent {
  color: rgba(167, 139, 250, 0.9);
}

.dark .glass-divider {
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
}
`;
    }
    initializeDarkMode() {
        const savedDarkMode = this.loadDarkModePreference();
        if (savedDarkMode) {
            document.documentElement.classList.add("dark");
        }
        this._themeChanged$.next({
            variant: this.getCurrentTheme(),
            isDark: savedDarkMode,
        });
    }
    loadDarkModePreference() {
        try {
            const stored = localStorage.getItem(DARK_MODE_STORAGE_KEY);
            if (stored !== null) {
                return stored === "true";
            }
        }
        catch {
            // localStorage not available
        }
        return false;
    }
    saveDarkModePreference(enabled) {
        try {
            localStorage.setItem(DARK_MODE_STORAGE_KEY, String(enabled));
        }
        catch {
            // localStorage not available
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: StyleThemeService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: StyleThemeService, providedIn: "root" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: StyleThemeService, decorators: [{
            type: Injectable,
            args: [{ providedIn: "root" }]
        }], ctorParameters: () => [] });

class ThemeToggleComponent {
    themeService = inject(StyleThemeService);
    subscription;
    isDark = false;
    ngOnInit() {
        this.isDark = this.themeService.isDarkMode();
        this.subscription = this.themeService.themeChanged$.subscribe((state) => {
            this.isDark = state.isDark;
        });
    }
    ngOnDestroy() {
        this.subscription?.unsubscribe();
    }
    toggle() {
        this.themeService.toggleDarkMode();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: ThemeToggleComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.25", type: ThemeToggleComponent, isStandalone: true, selector: "app-theme-toggle", ngImport: i0, template: `
    <button class="theme-toggle" (click)="toggle()" aria-label="Toggle theme">
      @if (isDark) {
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      } @else {
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
      }
    </button>
  `, isInline: true, styles: [":host{display:inline-flex}.theme-toggle{display:flex;align-items:center;justify-content:center;width:40px;height:40px;border-radius:50%;border:1px solid var(--border-color);background:transparent;color:var(--text-secondary);cursor:pointer;transition:all .15s;padding:0}.theme-toggle:hover{background:var(--bg-hover);color:var(--text-primary)}\n"] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: ThemeToggleComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-theme-toggle", standalone: true, template: `
    <button class="theme-toggle" (click)="toggle()" aria-label="Toggle theme">
      @if (isDark) {
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      } @else {
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
      }
    </button>
  `, styles: [":host{display:inline-flex}.theme-toggle{display:flex;align-items:center;justify-content:center;width:40px;height:40px;border-radius:50%;border:1px solid var(--border-color);background:transparent;color:var(--text-secondary);cursor:pointer;transition:all .15s;padding:0}.theme-toggle:hover{background:var(--bg-hover);color:var(--text-primary)}\n"] }]
        }] });
registerSchemaComponent("app-theme-toggle", ThemeToggleComponent);

class ShortcutsOverlayComponent {
    visible = false;
    title = "Keyboard Shortcuts";
    shortcuts = "[]";
    closed = new EventEmitter();
    trigger = "";
    get parsedShortcuts() {
        if (Array.isArray(this.shortcuts))
            return this.shortcuts;
        try {
            return JSON.parse(this.shortcuts);
        }
        catch {
            return [];
        }
    }
    close() {
        this.visible = false;
        this.closed.emit();
    }
    onEscape() {
        if (this.visible)
            this.close();
    }
    open() {
        this.visible = true;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: ShortcutsOverlayComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.25", type: ShortcutsOverlayComponent, isStandalone: true, selector: "app-shortcuts-overlay", inputs: { visible: "visible", title: "title", shortcuts: "shortcuts", trigger: "trigger" }, outputs: { closed: "closed" }, host: { listeners: { "window:keydown.escape": "onEscape()" } }, ngImport: i0, template: `
    @if (visible) {
      <div class="overlay" (click)="close()">
        <div class="shortcuts-panel" (click)="$event.stopPropagation()">
          <div class="panel-header">
            <h3>{{ title || "Keyboard Shortcuts" }}</h3>
            <button class="close-btn" (click)="close()" aria-label="Close">
              &times;
            </button>
          </div>
          <div class="shortcuts-list">
            @for (shortcut of parsedShortcuts; track shortcut.key) {
              <div class="shortcut-row">
                <kbd>{{ shortcut.key }}</kbd>
                <span class="shortcut-desc">{{ shortcut.description }}</span>
              </div>
            }
          </div>
        </div>
      </div>
    }
  `, isInline: true, styles: [":host{display:block}.overlay{position:fixed;inset:0;background:#0009;display:flex;align-items:center;justify-content:center;z-index:1000}.shortcuts-panel{background:var(--bg-elevated);border:1px solid var(--border-color);border-radius:1rem;width:480px;max-width:90vw;max-height:80vh;overflow-y:auto;box-shadow:0 25px 50px #0000004d}.panel-header{display:flex;align-items:center;justify-content:space-between;padding:1.25rem 1.5rem;border-bottom:1px solid var(--border-color)}.panel-header h3{margin:0;font-size:1.125rem;font-weight:600;color:var(--text-primary)}.close-btn{background:none;border:none;cursor:pointer;padding:.25rem;border-radius:.25rem;color:var(--text-secondary);font-size:1.5rem;line-height:1}.close-btn:hover{background:var(--bg-hover);color:var(--text-primary)}.shortcuts-list{padding:1rem 1.5rem}.shortcut-row{display:flex;align-items:center;gap:1rem;padding:.5rem 0}kbd{padding:.25rem .5rem;border-radius:.25rem;border:1px solid var(--border-color);background:var(--bg-primary);color:var(--text-primary);font-family:monospace;font-size:.875rem;min-width:60px;text-align:center}.shortcut-desc{color:var(--text-secondary);font-size:.875rem}\n"] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: ShortcutsOverlayComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-shortcuts-overlay", standalone: true, template: `
    @if (visible) {
      <div class="overlay" (click)="close()">
        <div class="shortcuts-panel" (click)="$event.stopPropagation()">
          <div class="panel-header">
            <h3>{{ title || "Keyboard Shortcuts" }}</h3>
            <button class="close-btn" (click)="close()" aria-label="Close">
              &times;
            </button>
          </div>
          <div class="shortcuts-list">
            @for (shortcut of parsedShortcuts; track shortcut.key) {
              <div class="shortcut-row">
                <kbd>{{ shortcut.key }}</kbd>
                <span class="shortcut-desc">{{ shortcut.description }}</span>
              </div>
            }
          </div>
        </div>
      </div>
    }
  `, styles: [":host{display:block}.overlay{position:fixed;inset:0;background:#0009;display:flex;align-items:center;justify-content:center;z-index:1000}.shortcuts-panel{background:var(--bg-elevated);border:1px solid var(--border-color);border-radius:1rem;width:480px;max-width:90vw;max-height:80vh;overflow-y:auto;box-shadow:0 25px 50px #0000004d}.panel-header{display:flex;align-items:center;justify-content:space-between;padding:1.25rem 1.5rem;border-bottom:1px solid var(--border-color)}.panel-header h3{margin:0;font-size:1.125rem;font-weight:600;color:var(--text-primary)}.close-btn{background:none;border:none;cursor:pointer;padding:.25rem;border-radius:.25rem;color:var(--text-secondary);font-size:1.5rem;line-height:1}.close-btn:hover{background:var(--bg-hover);color:var(--text-primary)}.shortcuts-list{padding:1rem 1.5rem}.shortcut-row{display:flex;align-items:center;gap:1rem;padding:.5rem 0}kbd{padding:.25rem .5rem;border-radius:.25rem;border:1px solid var(--border-color);background:var(--bg-primary);color:var(--text-primary);font-family:monospace;font-size:.875rem;min-width:60px;text-align:center}.shortcut-desc{color:var(--text-secondary);font-size:.875rem}\n"] }]
        }], propDecorators: { visible: [{
                type: Input
            }], title: [{
                type: Input
            }], shortcuts: [{
                type: Input
            }], closed: [{
                type: Output
            }], trigger: [{
                type: Input
            }], onEscape: [{
                type: HostListener,
                args: ["window:keydown.escape"]
            }] } });
registerSchemaComponent("app-shortcuts-overlay", ShortcutsOverlayComponent);

// Side-effect import: Import ALL Angular components to trigger registerSchemaComponent()
// Each component file calls registerSchemaComponent() on module load,
// which registers the component in SCHEMA_COMPONENT_MAP for dynamic resolution.
// This file MUST be imported before any schema rendering.
// UI Components

// UI Components
const uiComponents = [
    {
        id: "avatar",
        name: "AppAvatar",
        selector: "app-avatar",
        packageType: "shared",
        category: "forms",
        props: [
            {
                name: "src",
                type: "string",
                default: "",
            },
            {
                name: "alt",
                type: "string",
                default: "",
            },
            {
                name: "size",
                type: "string",
                default: "md",
            },
        ],
        template: '<div class="avatar ${sizeClass}">\n          <img src="${this.src}" alt="${this.alt}" @error="${this._handleImageError}" />\n        </div>',
        css: ":host {\n      display: inline-flex;\n    }\n\n    .avatar {\n      display: inline-flex;\n      align-items: center;\n      justify-content: center;\n      border-radius: 50%;\n      overflow: hidden;\n      background-color: var(--bg-elevated);\n      border: 1px solid var(--border-color);\n    }\n\n    .avatar-sm {\n      width: 2rem;\n      height: 2rem;\n      font-size: 0.75rem;\n    }\n\n    .avatar-md {\n      width: 2.5rem;\n      height: 2.5rem;\n      font-size: 0.875rem;\n    }\n\n    .avatar-lg {\n      width: 3.5rem;\n      height: 3.5rem;\n      font-size: 1.25rem;\n    }\n\n    img {\n      width: 100%;\n      height: 100%;\n      object-fit: cover;\n    }\n\n    .initials {\n      font-weight: 600;\n      color: var(--text-secondary);\n      text-transform: uppercase;\n    }",
    },
    {
        id: "badge",
        name: "AppBadge",
        selector: "app-badge",
        packageType: "shared",
        category: "forms",
        props: [
            {
                name: "variant",
                type: "string",
                default: "default",
            },
            {
                name: "size",
                type: "string",
                default: "md",
            },
            {
                name: "label",
                type: "string",
                default: "",
            },
        ],
        template: '<span class="badge badge-${this.variant} badge-${this.size}">${this.label}</span>',
        css: ":host {\n      display: inline-flex;\n    }\n\n    .badge {\n      display: inline-flex;\n      align-items: center;\n      border-radius: 0.25rem;\n      font-weight: 500;\n      line-height: 1;\n    }\n\n    .badge-default {\n      background-color: var(--bg-elevated);\n      color: var(--text-primary);\n      border: 1px solid var(--border-color);\n    }\n\n    .badge-primary {\n      background-color: var(--accent);\n      color: var(--text-on-accent);\n    }\n\n    .badge-success {\n      background-color: var(--success);\n      color: var(--text-on-success);\n    }\n\n    .badge-warning {\n      background-color: var(--warning);\n      color: var(--text-on-warning);\n    }\n\n    .badge-danger {\n      background-color: var(--error);\n      color: var(--text-on-error);\n    }\n\n    .badge-sm {\n      padding: 0.125rem 0.25rem;\n      font-size: 0.625rem;\n    }\n\n    .badge-md {\n      padding: 0.25rem 0.5rem;\n      font-size: 0.75rem;\n    }\n\n    .badge-lg {\n      padding: 0.375rem 0.75rem;\n      font-size: 0.875rem;\n    }",
    },
    {
        id: "bottom-panel",
        name: "AppBottomPanel",
        selector: "app-bottom-panel",
        packageType: "shared",
        category: "forms",
        props: [
            {
                name: "tabs",
                type: "string",
                default: "",
            },
            {
                name: "activeTab",
                type: "string",
                default: "",
            },
            {
                name: "position",
                type: "string",
                default: "bottom",
            },
            {
                name: "fullWidth",
                type: "boolean",
                default: false,
            },
            {
                name: "floating",
                type: "boolean",
                default: false,
            },
            {
                name: "borderRadius",
                type: "number",
                default: 0,
            },
        ],
        template: '<div class="panel-tabs">\n        ${tabsList.map(\n          (tab) => html',
        css: ":host {\n      display: flex;\n      flex-direction: column;\n      background-color: var(--bg-elevated);\n      border-top: 1px solid var(--border-color);\n      height: 100%;\n    }\n\n    .panel-tabs {\n      display: flex;\n      gap: 0;\n      border-bottom: 1px solid var(--border-color);\n      padding: 0 0.5rem;\n    }\n\n    .panel-tab {\n      padding: 0.75rem 1rem;\n      font-size: 0.875rem;\n      font-weight: 500;\n      color: var(--text-secondary);\n      cursor: pointer;\n      border-bottom: 2px solid transparent;\n      margin-bottom: -1px;\n      transition: all 0.15s;\n    }\n\n    .panel-tab:hover {\n      color: var(--text-primary);\n    }\n\n    .panel-tab.active {\n      color: var(--accent);\n      border-bottom-color: var(--accent);\n    }\n\n    .panel-content {\n      flex: 1;\n      overflow: auto;\n      padding: 1rem;\n    }\n\n    .empty-state {\n      color: var(--text-muted);\n      font-size: 0.875rem;\n      text-align: center;\n      padding: 2rem;\n    }",
    },
    {
        id: "button",
        name: "AppButton",
        selector: "app-button",
        packageType: "shared",
        category: "forms",
        props: [
            {
                name: "variant",
                type: "string",
                default: "primary",
            },
            {
                name: "buttonStyle",
                type: "string",
                default: "solid",
            },
            {
                name: "size",
                type: "string",
                default: "md",
            },
            {
                name: "disabled",
                type: "boolean",
                default: false,
            },
            {
                name: "loading",
                type: "boolean",
                default: false,
            },
            {
                name: "fullWidth",
                type: "boolean",
                default: false,
            },
            {
                name: "label",
                type: "string",
                default: "",
            },
        ],
        template: '<button\n        type="${this.type}"\n        class="${classes}"\n        ?disabled="${this.disabled || this.loading}"\n        @click="${this._handleClick}"\n      >\n        ${this.loading\n          ? html`<span class="app-btn-spinner"></span>',
        css: ":host {\n      display: inline-flex;\n    }\n\n    button {\n      display: inline-flex;\n      align-items: center;\n      justify-content: center;\n      gap: 0.5rem;\n      border-radius: 0.5rem;\n      border: 1px solid;\n      padding: 0.5rem 1rem;\n      text-align: center;\n      font-weight: 500;\n      transition: all 0.15s;\n      cursor: pointer;\n      border-width: 1px;\n    }\n\n    button:disabled {\n      opacity: 0.5;\n      cursor: not-allowed;\n    }\n\n    .app-btn-primary {\n      border-color: var(--accent);\n      background-color: var(--accent);\n      color: var(--text-on-accent);\n    }\n    .app-btn-primary:hover {\n      background-color: var(--accent-hover);\n      border-color: var(--accent-hover);\n    }\n\n    .app-btn-secondary {\n      border-color: var(--border-color);\n      background-color: var(--bg-elevated);\n      color: var(--text-primary);\n    }\n    .app-btn-secondary:hover {\n      background-color: var(--bg-hover);\n    }\n\n    .app-btn-danger {\n      border-color: var(--error);\n      background-color: var(--error);\n      color: var(--text-on-error);\n    }\n    .app-btn-danger:hover {\n      opacity: 0.9;\n    }\n\n    .app-btn-warning {\n      border-color: var(--warning);\n      background-color: var(--warning);\n      color: var(--text-on-warning);\n    }\n    .app-btn-warning:hover {\n      opacity: 0.9;\n    }\n\n    .app-btn-success {\n      border-color: var(--success);\n      background-color: var(--success);\n      color: var(--text-on-success);\n    }\n    .app-btn-success:hover {\n      opacity: 0.9;\n    }\n\n    .app-btn-ghost {\n      border-color: transparent;\n      background-color: transparent;\n      color: var(--text-secondary);\n    }\n    .app-btn-ghost:hover {\n      background-color: var(--bg-hover);\n      color: var(--text-primary);\n    }\n\n    .app-btn-sm {\n      padding: 0.25rem 0.5rem;\n      font-size: 0.875rem;\n    }\n\n    .app-btn-md {\n      padding: 0.5rem 1rem;\n      font-size: 1rem;\n    }\n\n    .app-btn-lg {\n      padding: 0.75rem 1.5rem;\n      font-size: 1.125rem;\n    }\n\n    .app-btn-full {\n      width: 100%;\n    }\n\n    .app-btn-icon {\n      font-size: 1.25rem;\n    }\n\n    .app-btn-spinner {\n      width: 1rem;\n      height: 1rem;\n      border: 2px solid currentColor;\n      border-top-color: transparent;\n      border-radius: 50%;\n      animation: spin 0.6s linear infinite;\n    }\n\n    @keyframes spin {\n      to {\n        transform: rotate(360deg);\n      }\n    }",
    },
    {
        id: "canvas",
        name: "AppCanvas",
        selector: "app-canvas",
        packageType: "shared",
        category: "forms",
        props: [
            {
                name: "gridColumns",
                type: "number",
                default: 12,
            },
            {
                name: "showGrid",
                type: "boolean",
                default: false,
            },
        ],
        template: '<div class="canvas-area" style="${gridStyle}">\n        ${this.showGrid\n          ? html',
        css: ":host {\n      display: block;\n      width: 100%;\n      height: 100%;\n      background-color: var(--bg-primary);\n      position: relative;\n      overflow: auto;\n    }\n\n    .canvas-area {\n      min-width: 100%;\n      min-height: 100%;\n      position: relative;\n    }\n\n    .grid {\n      position: absolute;\n      top: 0;\n      left: 0;\n      right: 0;\n      bottom: 0;\n      pointer-events: none;\n      display: grid;\n      grid-template-columns: repeat(var(--grid-cols), 1fr);\n      gap: 0;\n    }\n\n    .grid-cell {\n      border-right: 1px solid var(--border-color);\n      border-bottom: 1px solid var(--border-color);\n      min-height: 4rem;\n    }\n\n    .grid.visible {\n      background-color: rgba(0, 0, 0, 0.02);\n    }\n\n    .canvas-drop-zone {\n      position: absolute;\n      top: 0;\n      left: 0;\n      right: 0;\n      bottom: 0;\n    }\n\n    .canvas-element {\n      position: absolute;\n      border: 2px dashed transparent;\n      border-radius: 0.5rem;\n      padding: 0.5rem;\n      cursor: move;\n      transition: border-color 0.15s;\n    }\n\n    .canvas-element:hover {\n      border-color: var(--accent);\n    }\n\n    .canvas-element.selected {\n      border-color: var(--accent);\n      border-style: solid;\n      box-shadow: 0 0 0 2px rgba(var(--accent-rgb, 99, 102, 241), 0.2);\n    }\n\n    .canvas-placeholder {\n      border: 2px dashed var(--border-color);\n      border-radius: 0.5rem;\n      background-color: var(--bg-secondary);\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      color: var(--text-muted);\n      font-size: 0.875rem;\n    }",
    },
    {
        id: "card",
        name: "AppCard",
        selector: "app-card",
        packageType: "shared",
        category: "forms",
        props: [
            {
                name: "title",
                type: "string",
                default: "",
            },
            {
                name: "content",
                type: "string",
                default: "",
            },
            {
                name: "elevated",
                type: "boolean",
                default: false,
            },
            {
                name: "borderRadius",
                type: "number",
                default: 8,
            },
            {
                name: "padding",
                type: "number",
                default: 16,
            },
        ],
        template: '<div class="card ${this.elevated ? "card-elevated" : ""}">\n        ${this.title\n          ? html',
        css: ":host {\n      display: block;\n    }\n\n    .card {\n      background-color: var(--bg-elevated);\n      border: 1px solid var(--border-color);\n      border-radius: 0.5rem;\n      overflow: hidden;\n      transition: box-shadow 0.15s;\n    }\n\n    .card-elevated {\n      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),\n        0 2px 4px -1px rgba(0, 0, 0, 0.06);\n    }\n\n    .card-header {\n      padding: 1rem;\n      border-bottom: 1px solid var(--border-color);\n    }\n\n    .card-title {\n      margin: 0;\n      font-size: 1rem;\n      font-weight: 600;\n      color: var(--text-primary);\n    }\n\n    .card-content {\n      padding: 1rem;\n      color: var(--text-secondary);\n      font-size: 0.875rem;\n      line-height: 1.5;\n    }",
    },
    {
        id: "checkbox",
        name: "AppCheckbox",
        selector: "app-checkbox",
        packageType: "shared",
        category: "forms",
        props: [
            {
                name: "checked",
                type: "boolean",
                default: false,
            },
            {
                name: "label",
                type: "string",
                default: "",
            },
            {
                name: "disabled",
                type: "boolean",
                default: false,
            },
        ],
        template: '<label>\n        <input\n          type="checkbox"\n          .checked="${this.checked}"\n          ?disabled="${this.disabled}"\n          @change="${this._handleChange}"\n        />\n        <span class="checkbox-label">${this.label}</span>\n      </label>',
        css: ':host {\n      display: inline-flex;\n      align-items: center;\n    }\n\n    label {\n      display: flex;\n      align-items: center;\n      gap: 0.5rem;\n      cursor: pointer;\n    }\n\n    input[type="checkbox"] {\n      width: 1rem;\n      height: 1rem;\n      accent-color: var(--accent);\n      cursor: pointer;\n    }\n\n    input[type="checkbox"]:disabled {\n      cursor: not-allowed;\n      opacity: 0.5;\n    }\n\n    .checkbox-label {\n      color: var(--text-primary);\n      font-size: 0.875rem;\n      user-select: none;\n    }\n\n    :host([disabled]) .checkbox-label {\n      color: var(--text-secondary);\n      cursor: not-allowed;\n    }',
    },
    {
        id: "chip",
        name: "AppChip",
        selector: "app-chip",
        packageType: "shared",
        category: "forms",
        props: [
            {
                name: "label",
                type: "string",
                default: "",
            },
            {
                name: "removable",
                type: "boolean",
                default: false,
            },
        ],
        template: '<span class="chip">\n        ${this.icon ? html`<i class="material-icons chip-icon">${this.icon}</i>` : ""}\n        <span>${this.label}</span>\n        ${this.removable\n          ? html`<button class="remove-btn" @click="${this._handleRemove}" aria-label="Remove">×</button>',
        css: ":host {\n      display: inline-flex;\n    }\n\n    .chip {\n      display: inline-flex;\n      align-items: center;\n      gap: 0.375rem;\n      padding: 0.25rem 0.75rem;\n      border-radius: 1rem;\n      background-color: var(--bg-elevated);\n      border: 1px solid var(--border-color);\n      color: var(--text-primary);\n      font-size: 0.875rem;\n      font-weight: 500;\n      transition: background-color 0.15s;\n    }\n\n    .chip:hover {\n      background-color: var(--bg-hover);\n    }\n\n    .chip-icon {\n      font-size: 1rem;\n    }\n\n    .remove-btn {\n      display: inline-flex;\n      align-items: center;\n      justify-content: center;\n      width: 1rem;\n      height: 1rem;\n      padding: 0;\n      border: none;\n      background: transparent;\n      color: var(--text-secondary);\n      cursor: pointer;\n      border-radius: 50%;\n      transition: background-color 0.15s;\n      margin-left: 0.125rem;\n    }\n\n    .remove-btn:hover {\n      background-color: var(--border-color);\n      color: var(--text-primary);\n    }",
    },
    {
        id: "component-palette",
        name: "AppComponentPalette",
        selector: "app-component-palette",
        packageType: "shared",
        category: "forms",
        props: [
            {
                name: "categories",
                type: "string",
                default: "[]",
            },
            {
                name: "searchable",
                type: "boolean",
                default: false,
            },
        ],
        template: '<div class="palette-header">\n        <div class="palette-title">Components</div>\n        ${this.searchable\n          ? html',
        css: ":host {\n      display: block;\n      background-color: var(--bg-elevated);\n      border-right: 1px solid var(--border-color);\n      height: 100%;\n      overflow-y: auto;\n    }\n\n    .palette-header {\n      padding: 1rem;\n      border-bottom: 1px solid var(--border-color);\n    }\n\n    .palette-title {\n      font-size: 0.875rem;\n      font-weight: 600;\n      color: var(--text-primary);\n      margin-bottom: 0.75rem;\n    }\n\n    .search-input {\n      width: 100%;\n      padding: 0.5rem 0.75rem;\n      border: 1px solid var(--border-color);\n      border-radius: 0.5rem;\n      background-color: var(--bg-primary);\n      color: var(--text-primary);\n      font-size: 0.875rem;\n      box-sizing: border-box;\n    }\n\n    .search-input::placeholder {\n      color: var(--text-muted);\n    }\n\n    .search-input:focus {\n      outline: none;\n      border-color: var(--accent);\n    }\n\n    .category {\n      border-bottom: 1px solid var(--border-color);\n    }\n\n    .category-header {\n      display: flex;\n      align-items: center;\n      justify-content: space-between;\n      padding: 0.75rem 1rem;\n      cursor: pointer;\n      color: var(--text-primary);\n      font-weight: 500;\n      font-size: 0.875rem;\n    }\n\n    .category-header:hover {\n      background-color: var(--bg-hover);\n    }\n\n    .category-arrow {\n      transition: transform 0.2s;\n      font-size: 0.75rem;\n    }\n\n    .category-arrow.collapsed {\n      transform: rotate(-90deg);\n    }\n\n    .category-items {\n      padding: 0 1rem 0.75rem;\n      display: flex;\n      flex-direction: column;\n      gap: 0.25rem;\n    }\n\n    .category-items.collapsed {\n      display: none;\n    }\n\n    .component-item {\n      padding: 0.5rem 0.75rem;\n      border-radius: 0.375rem;\n      font-size: 0.875rem;\n      color: var(--text-secondary);\n      cursor: grab;\n    }\n\n    .component-item:hover {\n      background-color: var(--bg-hover);\n      color: var(--text-primary);\n    }\n\n    .component-item:active {\n      cursor: grabbing;\n    }",
    },
    {
        id: "confirm-dialog",
        name: "AppConfirmDialog",
        selector: "app-confirm-dialog",
        packageType: "shared",
        category: "forms",
        props: [
            {
                name: "open",
                type: "boolean",
                default: false,
            },
            {
                name: "title",
                type: "string",
                default: "",
            },
            {
                name: "message",
                type: "string",
                default: "",
            },
            {
                name: "confirmText",
                type: "string",
                default: "Confirm",
            },
            {
                name: "cancelText",
                type: "string",
                default: "Cancel",
            },
        ],
        template: "",
        css: ":host {\n      display: block;\n    }\n\n    .overlay {\n      position: fixed;\n      inset: 0;\n      background: rgba(0, 0, 0, 0.6);\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      z-index: 1000;\n    }\n\n    .dialog {\n      background: var(--bg-elevated);\n      border: 1px solid var(--border-color);\n      border-radius: 1rem;\n      width: 400px;\n      max-width: 90vw;\n      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4);\n    }\n\n    header {\n      display: flex;\n      align-items: center;\n      justify-content: space-between;\n      padding: 1.25rem 1.5rem;\n      border-bottom: 1px solid var(--border-color);\n    }\n\n    header h2 {\n      margin: 0;\n      font-size: 1.125rem;\n      font-weight: 600;\n      color: var(--text-primary);\n    }\n\n    .close-btn {\n      background: transparent;\n      border: none;\n      cursor: pointer;\n      padding: 0.25rem;\n      border-radius: 0.25rem;\n      color: var(--text-secondary);\n      font-size: 1.25rem;\n      line-height: 1;\n    }\n\n    .close-btn:hover {\n      background: var(--bg-hover);\n      color: var(--text-primary);\n    }\n\n    .content {\n      padding: 1.5rem;\n      color: var(--text-secondary);\n      font-size: 0.9375rem;\n      line-height: 1.5;\n    }\n\n    footer {\n      display: flex;\n      gap: 0.75rem;\n      padding: 1rem 1.5rem;\n      border-top: 1px solid var(--border-color);\n      justify-content: flex-end;\n    }\n\n    button {\n      padding: 0.5rem 1rem;\n      border-radius: 0.5rem;\n      border: 1px solid;\n      font-weight: 500;\n      cursor: pointer;\n      transition: all 0.15s;\n    }\n\n    .cancel-btn {\n      background: transparent;\n      border-color: var(--border-color);\n      color: var(--text-secondary);\n    }\n\n    .cancel-btn:hover {\n      background: var(--bg-hover);\n      color: var(--text-primary);\n    }\n\n    .confirm-btn {\n      background: var(--accent);\n      border-color: var(--accent);\n      color: var(--text-on-accent);\n    }\n\n    .confirm-btn:hover {\n      opacity: 0.9;\n    }\n\n    .danger-btn {\n      background: var(--error);\n      border-color: var(--error);\n      color: var(--text-on-error);\n    }\n\n    .danger-btn:hover {\n      opacity: 0.9;\n    }",
    },
    {
        id: "data-table",
        name: "AppDataTable",
        selector: "app-data-table",
        packageType: "shared",
        category: "forms",
        props: [
            {
                name: "columns",
                type: "string",
                default: "[]",
            },
            {
                name: "data",
                type: "string",
                default: "[]",
            },
            {
                name: "selectable",
                type: "boolean",
                default: false,
            },
        ],
        template: '<table>\n        <thead>\n          <tr>\n            ${this.selectable ? html`<th class="radio-cell"></th>` : ""}\n            ${cols.map((col) => html`<th>${col.name}</th>`)}\n          </tr>\n        </thead>\n        <tbody>\n          ${rows.map(\n            (row, index) => html',
        css: ":host {\n      display: block;\n      overflow-x: auto;\n    }\n\n    table {\n      width: 100%;\n      border-collapse: collapse;\n      font-size: 0.875rem;\n    }\n\n    th {\n      text-align: left;\n      padding: 0.75rem 1rem;\n      background-color: var(--bg-secondary);\n      color: var(--text-primary);\n      font-weight: 600;\n      border-bottom: 1px solid var(--border-color);\n    }\n\n    td {\n      padding: 0.75rem 1rem;\n      color: var(--text-primary);\n      border-bottom: 1px solid var(--border-color);\n    }\n\n    tr {\n      cursor: default;\n    }\n\n    tr:hover td {\n      background-color: var(--bg-hover);\n    }\n\n    tr.selected td {\n      background-color: var(--accent);\n      color: var(--text-on-accent);\n    }\n\n    tr.selectable {\n      cursor: pointer;\n    }\n\n    .radio-cell {\n      width: 2rem;\n    }\n\n    .radio {\n      width: 1rem;\n      height: 1rem;\n      border: 2px solid var(--border-color);\n      border-radius: 50%;\n      display: inline-block;\n    }\n\n    tr.selected .radio {\n      border-color: var(--text-on-accent);\n      background-color: var(--text-on-accent);\n    }",
    },
    {
        id: "dialog",
        name: "AppDialog",
        selector: "app-dialog",
        packageType: "shared",
        category: "forms",
        props: [
            {
                name: "open",
                type: "boolean",
                default: false,
            },
            {
                name: "title",
                type: "string",
                default: "",
            },
            {
                name: "size",
                type: "string",
                default: "md",
            },
            {
                name: "showHeader",
                type: "boolean",
                default: true,
            },
            {
                name: "showFooter",
                type: "boolean",
                default: false,
            },
        ],
        template: "",
        css: ":host {\n      display: block;\n    }\n\n    .overlay {\n      position: fixed;\n      inset: 0;\n      background: rgba(0, 0, 0, 0.6);\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      z-index: 1000;\n    }\n\n    .dialog {\n      background: var(--bg-elevated);\n      border: 1px solid var(--border-color);\n      border-radius: 1rem;\n      min-width: 360px;\n      max-height: 90vh;\n      display: flex;\n      flex-direction: column;\n      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4);\n    }\n\n    .dialog-sm {\n      width: 360px;\n    }\n\n    .dialog-md {\n      width: 520px;\n    }\n\n    .dialog-lg {\n      width: 720px;\n    }\n\n    header {\n      display: flex;\n      align-items: center;\n      justify-content: space-between;\n      padding: 1.25rem 1.5rem;\n      border-bottom: 2px solid var(--border-color);\n      background: var(--bg-elevated);\n      border-radius: 1rem 1rem 0 0;\n    }\n\n    header h2 {\n      margin: 0;\n      font-size: 1.25rem;\n      font-weight: 700;\n      color: var(--text-primary);\n    }\n\n    .close-btn {\n      background: transparent;\n      border: none;\n      cursor: pointer;\n      padding: 0.25rem 0.5rem;\n      border-radius: 0.375rem;\n      color: var(--text-secondary);\n      font-size: 1.5rem;\n      line-height: 1;\n      font-weight: 300;\n    }\n\n    .close-btn:hover {\n      background: var(--bg-hover);\n      color: var(--text-primary);\n    }\n\n    .content {\n      padding: 1.5rem;\n      overflow-y: auto;\n      color: var(--text-primary);\n    }",
    },
    {
        id: "empty-state",
        name: "AppEmptyState",
        selector: "app-empty-state",
        packageType: "shared",
        category: "forms",
        props: [
            {
                name: "title",
                type: "string",
                default: "",
            },
            {
                name: "message",
                type: "string",
                default: "",
            },
        ],
        template: '<div class="icon-container ${this.variant}">\n        ${this.icon\n          ? html`<span class="icon">${this.icon}</span>',
        css: ":host {\n      display: flex;\n      flex-direction: column;\n      align-items: center;\n      justify-content: center;\n      text-align: center;\n      padding: 2rem;\n      gap: 1rem;\n    }\n\n    .icon-container {\n      width: 64px;\n      height: 64px;\n      border-radius: 50%;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      background: var(--bg-elevated);\n      border: 2px solid var(--border-color);\n    }\n\n    .icon-container.danger {\n      background: var(--error);\n      border-color: var(--error);\n    }\n\n    .icon-container.success {\n      background: var(--success);\n      border-color: var(--success);\n    }\n\n    .icon {\n      font-size: 2rem;\n      width: 2rem;\n      height: 2rem;\n    }\n\n    .icon-container.danger .icon,\n    .icon-container.success .icon {\n      color: var(--text-on-error);\n    }\n\n    .title {\n      font-size: 1.5rem;\n      font-weight: 600;\n      color: var(--text-primary);\n      margin: 0;\n    }\n\n    .message {\n      font-size: 1rem;\n      color: var(--text-secondary);\n      margin: 0;\n      max-width: 400px;\n    }\n\n    .action {\n      margin-top: 0.5rem;\n    }\n\n    button {\n      display: inline-flex;\n      align-items: center;\n      justify-content: center;\n      gap: 0.5rem;\n      padding: 0.5rem 1rem;\n      border-radius: 0.5rem;\n      border: 1px solid var(--accent);\n      background: var(--accent);\n      color: var(--text-on-accent);\n      font-weight: 500;\n      cursor: pointer;\n      transition: all 0.15s;\n    }\n\n    button:hover {\n      background: var(--accent-hover);\n      border-color: var(--accent-hover);\n    }",
    },
    {
        id: "footer",
        name: "AppFooter",
        selector: "app-footer",
        packageType: "shared",
        category: "forms",
        props: [
            {
                name: "text",
                type: "string",
                default: "",
            },
        ],
        template: '<footer>\n        <p class="footer-text">${this.text}</p>\n        <slot></slot>\n      </footer>',
        css: ":host {\n      display: block;\n    }\n\n    footer {\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      padding: 1rem;\n      background: var(--bg-elevated);\n      border-top: 1px solid var(--border-color);\n      min-height: 48px;\n    }\n\n    .footer-text {\n      margin: 0;\n      font-size: 0.875rem;\n      color: var(--text-secondary);\n      text-align: center;\n    }",
    },
    {
        id: "header",
        name: "AppHeader",
        selector: "app-header",
        packageType: "shared",
        category: "forms",
        props: [
            {
                name: "title",
                type: "string",
                default: "",
            },
            {
                name: "showBack",
                type: "boolean",
                default: false,
            },
            {
                name: "breadcrumbs",
                type: "string",
                default: "[]",
            },
        ],
        template: "<header>\n        ${this.showBack\n          ? html",
        css: ":host {\n      display: block;\n    }\n\n    header {\n      display: flex;\n      align-items: center;\n      padding: 1rem 1.5rem;\n      background: var(--bg-header, var(--bg-elevated));\n      border-bottom: 1px solid var(--border-color);\n      min-height: 56px;\n      gap: 1rem;\n    }\n\n    .back-btn {\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      width: 36px;\n      height: 36px;\n      border: 1px solid var(--border-color);\n      border-radius: 0.5rem;\n      background: var(--bg-elevated);\n      color: var(--text-primary);\n      cursor: pointer;\n      transition: all 0.15s;\n      padding: 0;\n      font-size: 1.25rem;\n    }\n\n    .back-btn:hover {\n      background: var(--bg-hover);\n    }\n\n    .title-area {\n      flex: 1;\n      display: flex;\n      flex-direction: column;\n      gap: 0.25rem;\n    }\n\n    h1 {\n      margin: 0;\n      font-size: 1.25rem;\n      font-weight: 600;\n      color: var(--text-primary);\n    }\n\n    .breadcrumbs {\n      display: flex;\n      align-items: center;\n      gap: 0.5rem;\n      font-size: 0.875rem;\n      color: var(--text-secondary);\n    }\n\n    .breadcrumb-separator {\n      color: var(--text-secondary);\n      opacity: 0.5;\n    }",
    },
    {
        id: "input",
        name: "AppInput",
        selector: "app-input",
        packageType: "shared",
        category: "forms",
        props: [
            {
                name: "type",
                type: "string",
                default: "text",
            },
            {
                name: "placeholder",
                type: "string",
                default: "",
            },
            {
                name: "disabled",
                type: "boolean",
                default: false,
            },
        ],
        template: '<div class="app-input-wrapper">\n        ${this.label\n          ? html`<label class="app-input-label">${this.label}</label>',
        css: ":host {\n      display: block;\n    }\n\n    .app-input-wrapper {\n      display: flex;\n      flex-direction: column;\n      gap: 0.25rem;\n    }\n\n    .app-input-label {\n      font-size: 0.875rem;\n      font-weight: 500;\n      color: var(--text-primary);\n    }\n\n    .app-input-container {\n      position: relative;\n      display: flex;\n      align-items: center;\n    }\n\n    .app-input {\n      width: 100%;\n      padding: 0.5rem 0.75rem;\n      border-radius: 0.5rem;\n      border: 1px solid var(--border-color);\n      background-color: var(--bg-primary);\n      color: var(--text-primary);\n      box-sizing: border-box;\n      transition: all 0.15s;\n      outline: none;\n    }\n\n    .app-input::placeholder {\n      color: var(--text-muted);\n    }\n\n    .app-input:focus {\n      border-color: var(--accent);\n      box-shadow: 0 0 0 1px var(--accent);\n    }\n\n    .app-input-default:focus {\n      border-color: var(--accent);\n      box-shadow: 0 0 0 1px var(--accent);\n    }\n\n    .app-input-error {\n      border-color: var(--error);\n      box-shadow: 0 0 0 1px var(--error);\n    }\n\n    .app-input-with-icon {\n      padding-left: 2.5rem;\n    }\n\n    .app-input-icon {\n      position: absolute;\n      left: 0.75rem;\n      font-size: 1.25rem;\n      color: var(--text-muted);\n    }\n\n    .app-input-focused .app-input-icon {\n      color: var(--accent);\n    }\n\n    .app-input:disabled {\n      opacity: 0.5;\n      cursor: not-allowed;\n      background-color: var(--bg-tertiary);\n    }\n\n    .app-input-error-text {\n      font-size: 0.75rem;\n      color: var(--error);\n    }",
    },
    {
        id: "json-view",
        name: "AppJsonView",
        selector: "app-json-view",
        packageType: "shared",
        category: "layout",
        props: [],
        template: '<div class="json-container">\n        ${this._syntaxHighlight(formatted)}\n      </div>',
        css: ":host {\n      display: block;\n    }\n\n    .json-container {\n      background-color: var(--bg-secondary);\n      border: 1px solid var(--border-color);\n      border-radius: 0.5rem;\n      padding: 1rem;\n      font-family: monospace;\n      font-size: 0.875rem;\n      overflow-x: auto;\n      white-space: pre-wrap;\n      word-break: break-word;\n    }\n\n    .json-key {\n      color: var(--accent);\n    }\n\n    .json-string {\n      color: var(--success);\n    }\n\n    .json-number {\n      color: var(--warning);\n    }\n\n    .json-boolean {\n      color: var(--error);\n    }\n\n    .json-null {\n      color: var(--text-muted);\n    }",
    },
    {
        id: "loading",
        name: "AppLoading",
        selector: "app-loading",
        packageType: "shared",
        category: "forms",
        props: [
            {
                name: "size",
                type: "string",
                default: "md",
            },
        ],
        template: '<div class="spinner spinner-${this.size}"></div>',
        css: ":host {\n      display: inline-flex;\n      align-items: center;\n      justify-content: center;\n    }\n\n    .spinner {\n      border: 2px solid var(--border-color);\n      border-top-color: var(--accent);\n      border-radius: 50%;\n      animation: spin 0.7s linear infinite;\n    }\n\n    .spinner-sm {\n      width: 16px;\n      height: 16px;\n      border-width: 2px;\n    }\n\n    .spinner-md {\n      width: 32px;\n      height: 32px;\n      border-width: 3px;\n    }\n\n    .spinner-lg {\n      width: 48px;\n      height: 48px;\n      border-width: 4px;\n    }\n\n    @keyframes spin {\n      to {\n        transform: rotate(360deg);\n      }\n    }",
    },
    {
        id: "modal",
        name: "AppModal",
        selector: "app-modal",
        packageType: "shared",
        category: "forms",
        props: [
            {
                name: "open",
                type: "boolean",
                default: false,
            },
            {
                name: "title",
                type: "string",
                default: "",
            },
            {
                name: "size",
                type: "string",
                default: "md",
            },
        ],
        template: "",
        css: ":host {\n      display: block;\n    }\n\n    .overlay {\n      position: fixed;\n      inset: 0;\n      background: rgba(0, 0, 0, 0.5);\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      z-index: 1000;\n    }\n\n    .modal {\n      background: var(--bg-elevated);\n      border: 1px solid var(--border-color);\n      border-radius: 0.75rem;\n      min-width: 320px;\n      max-height: 90vh;\n      display: flex;\n      flex-direction: column;\n      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);\n    }\n\n    .modal-sm {\n      width: 320px;\n    }\n\n    .modal-md {\n      width: 480px;\n    }\n\n    .modal-lg {\n      width: 640px;\n    }\n\n    header {\n      display: flex;\n      align-items: center;\n      justify-content: space-between;\n      padding: 1rem 1.25rem;\n      border-bottom: 1px solid var(--border-color);\n    }\n\n    header h3 {\n      margin: 0;\n      font-size: 1.125rem;\n      font-weight: 600;\n      color: var(--text-primary);\n    }\n\n    .close-btn {\n      background: transparent;\n      border: none;\n      cursor: pointer;\n      padding: 0.25rem;\n      border-radius: 0.25rem;\n      color: var(--text-secondary);\n      font-size: 1.25rem;\n      line-height: 1;\n    }\n\n    .close-btn:hover {\n      background: var(--bg-hover);\n      color: var(--text-primary);\n    }\n\n    .content {\n      padding: 1.25rem;\n      overflow-y: auto;\n      color: var(--text-primary);\n    }",
    },
    {
        id: "page-container",
        name: "AppPageContainer",
        selector: "app-page-container",
        packageType: "shared",
        category: "forms",
        props: [
            {
                name: "title",
                type: "string",
                default: "",
            },
        ],
        template: "${this.title\n        ? html",
        css: ":host {\n      display: flex;\n      flex-direction: column;\n      height: 100%;\n    }\n\n    .page-header {\n      display: flex;\n      align-items: center;\n      padding: 1rem 1.5rem;\n      background: var(--bg-elevated);\n      border-bottom: 1px solid var(--border-color);\n      min-height: 56px;\n      gap: 1rem;\n    }\n\n    .page-title {\n      margin: 0;\n      font-size: 1.25rem;\n      font-weight: 600;\n      color: var(--text-primary);\n    }\n\n    .page-header-actions {\n      margin-left: auto;\n      display: flex;\n      align-items: center;\n      gap: 0.5rem;\n    }\n\n    .page-content {\n      flex: 1;\n      overflow: auto;\n      padding: 1.5rem;\n    }",
    },
    {
        id: "page-toolbar",
        name: "AppPageToolbar",
        selector: "app-page-toolbar",
        packageType: "shared",
        category: "forms",
        props: [
            {
                name: "title",
                type: "string",
                default: "",
            },
            {
                name: "actions",
                type: "string",
                default: "[]",
            },
        ],
        template: '<div class="toolbar">\n        <div class="toolbar-title-area">\n          <h2 class="toolbar-title">${this.title}</h2>\n          <slot name="subtitle"></slot>\n        </div>\n        <div class="toolbar-actions">\n          ${parsedActions.map(\n            (action) => html',
        css: ":host {\n      display: block;\n    }\n\n    .toolbar {\n      display: flex;\n      align-items: center;\n      padding: 1rem 1.5rem;\n      background: var(--bg-elevated);\n      border-bottom: 1px solid var(--border-color);\n      gap: 1rem;\n      flex-wrap: wrap;\n    }\n\n    .toolbar-title-area {\n      flex: 1;\n      display: flex;\n      flex-direction: column;\n      gap: 0.25rem;\n      min-width: 200px;\n    }\n\n    .toolbar-title {\n      margin: 0;\n      font-size: 1.125rem;\n      font-weight: 600;\n      color: var(--text-primary);\n    }\n\n    .toolbar-subtitle {\n      margin: 0;\n      font-size: 0.875rem;\n      color: var(--text-secondary);\n    }\n\n    .toolbar-actions {\n      display: flex;\n      align-items: center;\n      gap: 0.5rem;\n      flex-wrap: wrap;\n    }\n\n    .action-btn {\n      display: inline-flex;\n      align-items: center;\n      gap: 0.5rem;\n      padding: 0.5rem 1rem;\n      border-radius: 0.5rem;\n      border: 1px solid var(--border-color);\n      background: var(--bg-elevated);\n      color: var(--text-primary);\n      font-weight: 500;\n      cursor: pointer;\n      transition: all 0.15s;\n      font-size: 0.875rem;\n    }\n\n    .action-btn:hover {\n      background: var(--bg-hover);\n    }\n\n    .action-btn.primary {\n      border-color: var(--accent);\n      background: var(--accent);\n      color: var(--text-on-accent);\n    }\n\n    .action-btn.primary:hover {\n      background: var(--accent-hover);\n      border-color: var(--accent-hover);\n    }\n\n    .action-btn.danger {\n      border-color: var(--error);\n      background: var(--error);\n      color: var(--text-on-error);\n    }\n\n    .action-btn.ghost {\n      border-color: transparent;\n      background: transparent;\n      color: var(--text-secondary);\n    }\n\n    .action-btn.ghost:hover {\n      background: var(--bg-hover);\n      color: var(--text-primary);\n    }\n\n    .action-icon {\n      font-size: 1.125rem;\n    }",
    },
    {
        id: "pagination",
        name: "AppPagination",
        selector: "app-pagination",
        packageType: "shared",
        category: "forms",
        props: [
            {
                name: "page",
                type: "number",
                default: 1,
            },
            {
                name: "total",
                type: "number",
                default: 1,
            },
            {
                name: "pageSize",
                type: "number",
                default: 10,
            },
        ],
        template: "",
        css: ":host {\n      display: block;\n    }\n\n    .pagination {\n      display: inline-flex;\n      align-items: center;\n      gap: 0.25rem;\n    }\n\n    button {\n      display: inline-flex;\n      align-items: center;\n      justify-content: center;\n      min-width: 2rem;\n      height: 2rem;\n      padding: 0 0.5rem;\n      border: 1px solid var(--border-color);\n      border-radius: 0.375rem;\n      background-color: var(--bg-elevated);\n      color: var(--text-primary);\n      font-size: 0.875rem;\n      cursor: pointer;\n      transition: background-color 0.15s;\n    }\n\n    button:hover:not(:disabled) {\n      background-color: var(--bg-hover);\n    }\n\n    button:disabled {\n      opacity: 0.4;\n      cursor: not-allowed;\n    }\n\n    button.active {\n      background-color: var(--accent);\n      border-color: var(--accent);\n      color: var(--text-on-accent);\n    }\n\n    .ellipsis {\n      padding: 0 0.25rem;\n      color: var(--text-secondary);\n    }",
    },
    {
        id: "progress-bar",
        name: "AppProgressBar",
        selector: "app-progress-bar",
        packageType: "shared",
        category: "forms",
        props: [
            {
                name: "value",
                type: "number",
                default: 0,
            },
            {
                name: "max",
                type: "number",
                default: 100,
            },
        ],
        template: '<div class="progress-container">\n        <div\n          class="progress-fill ${this._getFillClass()}"\n          style="width: ${this._percentage}%"\n        ></div>\n      </div>',
        css: ":host {\n      display: block;\n    }\n\n    .progress-container {\n      width: 100%;\n      height: 0.5rem;\n      background-color: var(--bg-elevated);\n      border-radius: 0.25rem;\n      overflow: hidden;\n      border: 1px solid var(--border-color);\n    }\n\n    .progress-fill {\n      height: 100%;\n      border-radius: 0.25rem;\n      transition: width 0.3s ease;\n    }\n\n    .progress-fill.low {\n      background-color: var(--warning);\n    }\n\n    .progress-fill.medium {\n      background-color: var(--accent);\n    }\n\n    .progress-fill.high {\n      background-color: var(--success);\n    }",
    },
    {
        id: "properties-panel",
        name: "AppPropertiesPanel",
        selector: "app-properties-panel",
        packageType: "shared",
        category: "forms",
        props: [
            {
                name: "element",
                type: "string",
                default: "",
            },
        ],
        template: '<div class="panel-header">\n        <div class="panel-title">Properties</div>\n        ${this._elementId\n          ? html`<div class="element-id">${this._elementId}</div>',
        css: ':host {\n      display: block;\n      background-color: var(--bg-elevated);\n      border-left: 1px solid var(--border-color);\n      height: 100%;\n      overflow-y: auto;\n    }\n\n    .panel-header {\n      padding: 1rem;\n      border-bottom: 1px solid var(--border-color);\n    }\n\n    .panel-title {\n      font-size: 0.875rem;\n      font-weight: 600;\n      color: var(--text-primary);\n      margin-bottom: 0.25rem;\n    }\n\n    .element-id {\n      font-size: 0.75rem;\n      color: var(--text-muted);\n      font-family: monospace;\n    }\n\n    .properties-section {\n      padding: 1rem;\n    }\n\n    .section-title {\n      font-size: 0.75rem;\n      font-weight: 600;\n      color: var(--text-secondary);\n      text-transform: uppercase;\n      letter-spacing: 0.05em;\n      margin-bottom: 0.75rem;\n    }\n\n    .property-row {\n      display: flex;\n      flex-direction: column;\n      gap: 0.25rem;\n      margin-bottom: 0.75rem;\n    }\n\n    .property-label {\n      font-size: 0.875rem;\n      color: var(--text-primary);\n    }\n\n    .property-input {\n      padding: 0.5rem 0.75rem;\n      border: 1px solid var(--border-color);\n      border-radius: 0.5rem;\n      background-color: var(--bg-primary);\n      color: var(--text-primary);\n      font-size: 0.875rem;\n    }\n\n    .property-input:focus {\n      outline: none;\n      border-color: var(--accent);\n    }\n\n    .property-input[type="checkbox"] {\n      width: 1rem;\n      height: 1rem;\n    }\n\n    select.property-input {\n      cursor: pointer;\n    }\n\n    .empty-state {\n      padding: 2rem 1rem;\n      text-align: center;\n      color: var(--text-muted);\n      font-size: 0.875rem;\n    }',
    },
    {
        id: "radio",
        name: "AppRadio",
        selector: "app-radio",
        packageType: "shared",
        category: "forms",
        props: [
            {
                name: "name",
                type: "string",
                default: "",
            },
            {
                name: "value",
                type: "string",
                default: "",
            },
            {
                name: "checked",
                type: "boolean",
                default: false,
            },
            {
                name: "disabled",
                type: "boolean",
                default: false,
            },
        ],
        template: '<label>\n        <input\n          type="radio"\n          name="${this.name}"\n          value="${this.value}"\n          .checked="${this.checked}"\n          ?disabled="${this.disabled}"\n          @change="${this._handleChange}"\n        />\n        <span class="radio-label"><slot></slot></span>\n      </label>',
        css: ':host {\n      display: inline-flex;\n      align-items: center;\n    }\n\n    label {\n      display: flex;\n      align-items: center;\n      gap: 0.5rem;\n      cursor: pointer;\n    }\n\n    input[type="radio"] {\n      width: 1rem;\n      height: 1rem;\n      accent-color: var(--accent);\n      cursor: pointer;\n    }\n\n    input[type="radio"]:disabled {\n      cursor: not-allowed;\n      opacity: 0.5;\n    }\n\n    .radio-label {\n      color: var(--text-primary);\n      font-size: 0.875rem;\n      user-select: none;\n    }\n\n    :host([disabled]) .radio-label {\n      color: var(--text-secondary);\n      cursor: not-allowed;\n    }',
    },
    {
        id: "segment-selector",
        name: "AppSegmentSelector",
        selector: "app-segment-selector",
        packageType: "shared",
        category: "forms",
        props: [
            {
                name: "options",
                type: "string",
                default: "[]",
            },
            {
                name: "selected",
                type: "string",
                default: "",
            },
        ],
        template: '<div class="segment-container">\n        ${options.map(\n          (opt) => html',
        css: ":host {\n      display: inline-flex;\n    }\n\n    .segment-container {\n      display: inline-flex;\n      border: 1px solid var(--border-color);\n      border-radius: 0.5rem;\n      overflow: hidden;\n      background-color: var(--bg-elevated);\n    }\n\n    .segment {\n      padding: 0.5rem 1rem;\n      font-size: 0.875rem;\n      font-weight: 500;\n      color: var(--text-secondary);\n      cursor: pointer;\n      transition: background-color 0.15s, color 0.15s;\n      border-right: 1px solid var(--border-color);\n    }\n\n    .segment:last-child {\n      border-right: none;\n    }\n\n    .segment:hover:not(.selected) {\n      background-color: var(--bg-hover);\n      color: var(--text-primary);\n    }\n\n    .segment.selected {\n      background-color: var(--accent);\n      color: var(--text-on-accent);\n    }",
    },
    {
        id: "select",
        name: "AppSelect",
        selector: "app-select",
        packageType: "shared",
        category: "forms",
        props: [
            {
                name: "options",
                type: "string",
                default: "[]",
            },
            {
                name: "value",
                type: "string",
                default: "",
            },
            {
                name: "placeholder",
                type: "string",
                default: "Select an option",
            },
            {
                name: "disabled",
                type: "boolean",
                default: false,
            },
        ],
        template: '<select\n        .value="${this.value}"\n        ?disabled="${this.disabled}"\n        placeholder="${this.placeholder}"\n        @change="${this._handleChange}"\n      >\n        <option value="" disabled selected hidden>${this.placeholder}</option>\n        ${parsedOptions.map(\n          (option) => html`<option value="${option}">${option}</option>`,\n        )}\n      </select>',
        css: ":host {\n      display: inline-flex;\n    }\n\n    select {\n      display: inline-flex;\n      align-items: center;\n      padding: 0.5rem 1rem;\n      border-radius: 0.5rem;\n      border: 1px solid var(--border-color);\n      background-color: var(--bg-elevated);\n      color: var(--text-primary);\n      font-size: 1rem;\n      font-weight: 500;\n      cursor: pointer;\n      transition: all 0.15s;\n      min-width: 150px;\n    }\n\n    select:hover:not(:disabled) {\n      background-color: var(--bg-hover);\n    }\n\n    select:disabled {\n      opacity: 0.5;\n      cursor: not-allowed;\n    }\n\n    select:focus {\n      outline: none;\n      border-color: var(--accent);\n    }",
    },
    {
        id: "sidebar",
        name: "AppSidebar",
        selector: "app-sidebar",
        packageType: "shared",
        category: "forms",
        props: [
            {
                name: "collapsed",
                type: "boolean",
                default: false,
            },
            {
                name: "items",
                type: "string",
                default: "[]",
            },
            {
                name: "width",
                type: "number",
                default: 240,
            },
            {
                name: "collapsedWidth",
                type: "number",
                default: 64,
            },
        ],
        template: '<li>\n        <div\n          class="nav-item ${depth > 0 ? "nav-item-child" : ""}"\n          @click="${() => this._handleItemClick(item)}"\n        >\n          ${item.icon\n            ? html`<span class="nav-item-icon">${item.icon}</span>',
        css: ":host {\n      display: block;\n    }\n\n    aside {\n      display: flex;\n      flex-direction: column;\n      width: var(--sidebar-width, 240px);\n      min-width: var(--sidebar-width, 240px);\n      height: 100%;\n      background: var(--bg-elevated);\n      border-right: 1px solid var(--border-color);\n      transition: width 0.2s, min-width 0.2s;\n      overflow: hidden;\n    }\n\n    aside.collapsed {\n      width: 64px;\n      min-width: 64px;\n    }\n\n    .sidebar-header {\n      display: flex;\n      align-items: center;\n      justify-content: space-between;\n      padding: 1rem;\n      border-bottom: 1px solid var(--border-color);\n      min-height: 56px;\n    }\n\n    .collapse-btn {\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      width: 32px;\n      height: 32px;\n      border: 1px solid var(--border-color);\n      border-radius: 0.5rem;\n      background: transparent;\n      color: var(--text-secondary);\n      cursor: pointer;\n      transition: all 0.15s;\n      padding: 0;\n      font-size: 1.25rem;\n    }\n\n    .collapse-btn:hover {\n      background: var(--bg-hover);\n      color: var(--text-primary);\n    }\n\n    nav {\n      flex: 1;\n      overflow-y: auto;\n      overflow-x: hidden;\n      padding: 0.5rem;\n    }\n\n    .nav-section {\n      margin-bottom: 0.5rem;\n    }\n\n    .nav-section-title {\n      padding: 0.5rem 0.75rem;\n      font-size: 0.75rem;\n      font-weight: 600;\n      color: var(--text-secondary);\n      text-transform: uppercase;\n      letter-spacing: 0.05em;\n    }\n\n    ul {\n      list-style: none;\n      margin: 0;\n      padding: 0;\n    }\n\n    li {\n      margin: 0;\n    }\n\n    .nav-item {\n      display: flex;\n      align-items: center;\n      gap: 0.75rem;\n      padding: 0.625rem 0.75rem;\n      border-radius: 0.5rem;\n      color: var(--text-secondary);\n      text-decoration: none;\n      cursor: pointer;\n      transition: all 0.15s;\n      white-space: nowrap;\n      overflow: hidden;\n    }\n\n    .nav-item:hover {\n      background: var(--bg-hover);\n      color: var(--text-primary);\n    }\n\n    .nav-item.active {\n      background: var(--accent);\n      color: var(--text-on-accent);\n    }\n\n    .nav-item-icon {\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      width: 20px;\n      height: 20px;\n      font-size: 1.25rem;\n      flex-shrink: 0;\n    }\n\n    .nav-item-label {\n      flex: 1;\n      overflow: hidden;\n      text-overflow: ellipsis;\n    }\n\n    .nav-item-children {\n      margin-left: 1.25rem;\n      border-left: 1px solid var(--border-color);\n      padding-left: 0.5rem;\n    }",
    },
    {
        id: "slider",
        name: "AppSlider",
        selector: "app-slider",
        packageType: "shared",
        category: "forms",
        props: [
            {
                name: "min",
                type: "number",
                default: 0,
            },
            {
                name: "max",
                type: "number",
                default: 100,
            },
            {
                name: "value",
                type: "number",
                default: 0,
            },
            {
                name: "step",
                type: "number",
                default: 1,
            },
            {
                name: "disabled",
                type: "boolean",
                default: false,
            },
        ],
        template: '<div class="slider-wrapper">\n        <input\n          type="range"\n          .value="${String(this.value)}"\n          min="${String(this.min)}"\n          max="${String(this.max)}"\n          step="${String(this.step)}"\n          ?disabled="${this.disabled}"\n          @input="${this._handleInput}"\n        />\n      </div>',
        css: ':host {\n      display: block;\n      width: 100%;\n    }\n\n    .slider-wrapper {\n      display: flex;\n      flex-direction: column;\n      gap: 0.25rem;\n    }\n\n    .slider-label {\n      font-size: 0.875rem;\n      font-weight: 500;\n      color: var(--text-primary);\n    }\n\n    input[type="range"] {\n      width: 100%;\n      height: 0.5rem;\n      border-radius: 0.25rem;\n      background-color: var(--border-color);\n      outline: none;\n      cursor: pointer;\n      -webkit-appearance: none;\n      appearance: none;\n    }\n\n    input[type="range"]::-webkit-slider-thumb {\n      -webkit-appearance: none;\n      appearance: none;\n      width: 1.25rem;\n      height: 1.25rem;\n      border-radius: 50%;\n      background-color: var(--accent);\n      cursor: pointer;\n      border: none;\n      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);\n      transition: transform 0.1s;\n    }\n\n    input[type="range"]::-webkit-slider-thumb:hover {\n      transform: scale(1.1);\n    }\n\n    input[type="range"]::-moz-range-thumb {\n      width: 1.25rem;\n      height: 1.25rem;\n      border-radius: 50%;\n      background-color: var(--accent);\n      cursor: pointer;\n      border: none;\n      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);\n    }\n\n    input[type="range"]:disabled {\n      opacity: 0.5;\n      cursor: not-allowed;\n    }\n\n    input[type="range"]:focus {\n      outline: none;\n    }\n\n    input[type="range"]:focus::-webkit-slider-thumb {\n      box-shadow: 0 0 0 2px var(--accent);\n    }\n\n    .slider-value {\n      font-size: 0.75rem;\n      color: var(--text-secondary);\n      text-align: right;\n    }',
    },
    {
        id: "split-view",
        name: "AppSplitView",
        selector: "app-split-view",
        packageType: "shared",
        category: "forms",
        props: [
            {
                name: "split",
                type: "number",
                default: 50,
            },
            {
                name: "minFirst",
                type: "number",
                default: 20,
            },
            {
                name: "minSecond",
                type: "number",
                default: 20,
            },
        ],
        template: '<div class="split-container ${this.direction}">\n        <div\n          class="split-pane first"\n          style="${firstSize}: ${this.split}%; flex-grow: 0;"\n        >\n          <slot name="first"></slot>\n        </div>\n        <div\n          class="split-divider ${this._isDragging ? "dragging" : ""}"\n          @mousedown="${this._onDividerMouseDown}"\n        ></div>\n        <div class="split-pane second" style="${secondSize}: auto; flex: 1;">\n          <slot name="second"></slot>\n        </div>\n      </div>',
        css: ':host {\n      display: block;\n      height: 100%;\n    }\n\n    .split-container {\n      display: flex;\n      height: 100%;\n      width: 100%;\n      overflow: hidden;\n    }\n\n    .split-container.vertical {\n      flex-direction: column;\n    }\n\n    .split-pane {\n      overflow: auto;\n      min-width: 0;\n      min-height: 0;\n    }\n\n    .split-pane.first {\n      flex-shrink: 0;\n    }\n\n    .split-container.horizontal .split-pane.first {\n      height: 100%;\n    }\n\n    .split-container.vertical .split-pane.first {\n      width: 100%;\n    }\n\n    .split-divider {\n      flex-shrink: 0;\n      background: var(--border-color);\n      transition: background 0.15s;\n      position: relative;\n      z-index: 1;\n    }\n\n    .split-container.horizontal .split-divider {\n      width: 6px;\n      cursor: col-resize;\n    }\n\n    .split-container.vertical .split-divider {\n      height: 6px;\n      cursor: row-resize;\n    }\n\n    .split-divider:hover,\n    .split-divider.dragging {\n      background: var(--accent);\n    }\n\n    .split-divider::after {\n      content: "";\n      position: absolute;\n      background: transparent;\n    }\n\n    .horizontal .split-divider::after {\n      top: 0;\n      bottom: 0;\n      left: -4px;\n      right: -4px;\n    }\n\n    .vertical .split-divider::after {\n      left: 0;\n      right: 0;\n      top: -4px;\n      bottom: -4px;\n    }',
    },
    {
        id: "spinner",
        name: "AppSpinner",
        selector: "app-spinner",
        packageType: "shared",
        category: "forms",
        props: [
            {
                name: "size",
                type: "string",
                default: "md",
            },
            {
                name: "color",
                type: "string",
                default: "",
            },
            {
                name: "label",
                type: "string",
                default: "",
            },
        ],
        template: '<span class="ring ${this.size}" style=${this.color ? `border-top-color: ${this.color}` : ""} role="status"></span>\n      ${this.label ? html`<span class="label">${this.label}</span>` : ""}',
        css: ":host {\n      display: inline-flex;\n      align-items: center;\n      justify-content: center;\n      gap: 0.5rem;\n    }\n    .ring {\n      display: inline-block;\n      border-style: solid;\n      border-color: var(--border-color, #e5e7eb);\n      border-top-color: var(--accent, #3b82f6);\n      border-radius: 50%;\n      animation: spin 0.7s linear infinite;\n      box-sizing: border-box;\n    }\n    .ring.sm { width: 16px; height: 16px; border-width: 2px; }\n    .ring.md { width: 28px; height: 28px; border-width: 3px; }\n    .ring.lg { width: 44px; height: 44px; border-width: 4px; }\n    .ring.xl { width: 64px; height: 64px; border-width: 5px; }\n    .label { font-size: 0.875rem; color: var(--text-secondary, #6b7280); }\n    @keyframes spin { to { transform: rotate(360deg); } }",
    },
    {
        id: "stats-card",
        name: "AppStatsCard",
        selector: "app-stats-card",
        packageType: "shared",
        category: "forms",
        props: [
            {
                name: "label",
                type: "string",
                default: "",
            },
            {
                name: "value",
                type: "string",
                default: "",
            },
            {
                name: "icon",
                type: "string",
                default: "",
            },
        ],
        template: '<div class="stats-card">\n        ${this.icon\n          ? html`<div class="stats-icon">${this.icon}</div>',
        css: ":host {\n      display: block;\n    }\n\n    .stats-card {\n      display: flex;\n      align-items: center;\n      gap: 1rem;\n      padding: 1rem;\n      background-color: var(--bg-elevated);\n      border: 1px solid var(--border-color);\n      border-radius: 0.5rem;\n    }\n\n    .stats-icon {\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      width: 3rem;\n      height: 3rem;\n      background-color: var(--accent);\n      color: var(--text-on-accent);\n      border-radius: 0.5rem;\n      font-size: 1.5rem;\n    }\n\n    .stats-info {\n      display: flex;\n      flex-direction: column;\n      gap: 0.25rem;\n    }\n\n    .stats-value {\n      font-size: 1.5rem;\n      font-weight: 700;\n      color: var(--text-primary);\n      line-height: 1;\n    }\n\n    .stats-label {\n      font-size: 0.875rem;\n      color: var(--text-muted);\n      font-weight: 500;\n    }",
    },
    {
        id: "switch",
        name: "AppSwitch",
        selector: "app-switch",
        packageType: "shared",
        category: "forms",
        props: [
            {
                name: "checked",
                type: "boolean",
                default: false,
            },
            {
                name: "disabled",
                type: "boolean",
                default: false,
            },
        ],
        template: '<label class="switch-container">\n        <input\n          type="checkbox"\n          class="switch-input"\n          .checked="${this.checked}"\n          ?disabled="${this.disabled}"\n          @change="${this._handleChange}"\n          role="switch"\n          aria-checked="${this.checked}"\n        />\n        <span class="switch-slider"></span>\n      </label>',
        css: ':host {\n      display: inline-flex;\n      align-items: center;\n    }\n\n    .switch-container {\n      position: relative;\n      display: inline-flex;\n      align-items: center;\n      cursor: pointer;\n    }\n\n    .switch-input {\n      position: absolute;\n      opacity: 0;\n      width: 0;\n      height: 0;\n    }\n\n    .switch-slider {\n      position: relative;\n      width: 2.75rem;\n      height: 1.5rem;\n      background-color: var(--border-color);\n      border-radius: 1rem;\n      transition: background-color 0.2s;\n    }\n\n    .switch-slider::before {\n      content: "";\n      position: absolute;\n      top: 0.125rem;\n      left: 0.125rem;\n      width: 1.25rem;\n      height: 1.25rem;\n      background-color: white;\n      border-radius: 50%;\n      transition: transform 0.2s;\n      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);\n    }\n\n    .switch-input:checked + .switch-slider {\n      background-color: var(--accent);\n    }\n\n    .switch-input:checked + .switch-slider::before {\n      transform: translateX(1.25rem);\n    }\n\n    .switch-input:disabled + .switch-slider {\n      opacity: 0.5;\n      cursor: not-allowed;\n    }\n\n    .switch-input:focus + .switch-slider {\n      outline: 2px solid var(--accent);\n      outline-offset: 2px;\n    }',
    },
    {
        id: "table-view",
        name: "AppTableView",
        selector: "app-table-view",
        packageType: "shared",
        category: "forms",
        props: [
            {
                name: "columns",
                type: "string",
                default: "[]",
            },
            {
                name: "data",
                type: "string",
                default: "[]",
            },
        ],
        template: "<table>\n        <thead>\n          <tr>\n            ${cols.map((col) => html`<th>${col.name}</th>`)}\n          </tr>\n        </thead>\n        <tbody>\n          ${rows.map(\n            (row) => html",
        css: ":host {\n      display: block;\n      overflow-x: auto;\n    }\n\n    table {\n      width: 100%;\n      border-collapse: collapse;\n      font-size: 0.875rem;\n    }\n\n    th {\n      text-align: left;\n      padding: 0.75rem 1rem;\n      background-color: var(--bg-secondary);\n      color: var(--text-primary);\n      font-weight: 600;\n      border-bottom: 1px solid var(--border-color);\n    }\n\n    td {\n      padding: 0.75rem 1rem;\n      color: var(--text-primary);\n      border-bottom: 1px solid var(--border-color);\n    }\n\n    tr:hover td {\n      background-color: var(--bg-hover);\n    }",
    },
    {
        id: "tabs",
        name: "AppTabs",
        selector: "app-tabs",
        packageType: "shared",
        category: "forms",
        props: [
            {
                name: "tabs",
                type: "string",
                default: "[]",
            },
            {
                name: "activeTab",
                type: "string",
                default: "",
            },
        ],
        template: '<div class="tabs">\n        ${tabs.map(\n          (tab) => html',
        css: ":host {\n      display: block;\n    }\n\n    .tabs {\n      display: flex;\n      border-bottom: 1px solid var(--border-color);\n    }\n\n    .tab {\n      padding: 0.75rem 1.25rem;\n      font-size: 0.875rem;\n      font-weight: 500;\n      color: var(--text-secondary);\n      cursor: pointer;\n      border-bottom: 2px solid transparent;\n      margin-bottom: -1px;\n      transition: color 0.15s, border-color 0.15s;\n    }\n\n    .tab:hover {\n      color: var(--text-primary);\n    }\n\n    .tab.active {\n      color: var(--accent);\n      border-bottom-color: var(--accent);\n    }",
    },
    {
        id: "textarea",
        name: "AppTextarea",
        selector: "app-textarea",
        packageType: "shared",
        category: "forms",
        props: [
            {
                name: "value",
                type: "string",
                default: "",
            },
            {
                name: "placeholder",
                type: "string",
                default: "",
            },
            {
                name: "rows",
                type: "number",
                default: 3,
            },
            {
                name: "disabled",
                type: "boolean",
                default: false,
            },
        ],
        template: '<textarea\n        .value="${this.value}"\n        placeholder="${this.placeholder}"\n        rows="${this.rows}"\n        ?disabled="${this.disabled}"\n        @input="${this._handleInput}"\n      ></textarea>',
        css: ":host {\n      display: block;\n    }\n\n    .textarea-wrapper {\n      display: flex;\n      flex-direction: column;\n      gap: 0.25rem;\n    }\n\n    .textarea-label {\n      font-size: 0.875rem;\n      font-weight: 500;\n      color: var(--text-primary);\n    }\n\n    textarea {\n      width: 100%;\n      padding: 0.5rem 0.75rem;\n      border-radius: 0.5rem;\n      border: 1px solid var(--border-color);\n      background-color: var(--bg-elevated);\n      color: var(--text-primary);\n      box-sizing: border-box;\n      transition: all 0.15s;\n      outline: none;\n      resize: vertical;\n      font-family: inherit;\n      font-size: 0.875rem;\n      line-height: 1.5;\n    }\n\n    textarea::placeholder {\n      color: var(--text-muted);\n    }\n\n    textarea:focus {\n      border-color: var(--accent);\n      box-shadow: 0 0 0 1px var(--accent);\n    }\n\n    textarea:disabled {\n      opacity: 0.5;\n      cursor: not-allowed;\n      background-color: var(--bg-tertiary);\n    }",
    },
    {
        id: "tooltip",
        name: "AppTooltip",
        selector: "app-tooltip",
        packageType: "shared",
        category: "forms",
        props: [
            {
                name: "text",
                type: "string",
                default: "",
            },
            {
                name: "position",
                type: "string",
                default: "top",
            },
            {
                name: "trigger",
                type: "string",
                default: "hover",
            },
            {
                name: "delay",
                type: "number",
                default: 200,
            },
        ],
        template: '<div\n        class="trigger-wrapper"\n        @mouseenter=${this.trigger === "hover" ? this.show : undefined}\n        @mouseleave=${this.trigger === "hover" ? this.hide : undefined}\n        @click=${this.trigger === "click" ? this.toggle : undefined}\n        @focus=${this.trigger === "focus" ? this.show : undefined}\n        @blur=${this.trigger === "focus" ? this.hide : undefined}\n      >\n        <slot></slot>\n      </div>\n      <div class="bubble ${this.position} ${this.visible ? "visible" : ""}" role="tooltip">${this.text}</div>',
        css: ":host {\n      position: relative;\n      display: inline-flex;\n    }\n    .bubble {\n      position: absolute;\n      background: var(--bg-elevated, #1f2937);\n      color: var(--text-on-accent, #ffffff);\n      padding: 0.375rem 0.625rem;\n      border-radius: 0.375rem;\n      font-size: 0.75rem;\n      line-height: 1.2;\n      white-space: nowrap;\n      z-index: 1000;\n      pointer-events: none;\n      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);\n      opacity: 0;\n      transform: scale(0.95);\n      transition: opacity 0.15s, transform 0.15s;\n    }\n    .bubble.visible {\n      opacity: 1;\n      transform: scale(1);\n    }\n    .bubble.top { bottom: calc(100% + 6px); left: 50%; transform-origin: bottom center; transform: translateX(-50%) scale(0.95); }\n    .bubble.top.visible { transform: translateX(-50%) scale(1); }\n    .bubble.bottom { top: calc(100% + 6px); left: 50%; transform-origin: top center; transform: translateX(-50%) scale(0.95); }\n    .bubble.bottom.visible { transform: translateX(-50%) scale(1); }\n    .bubble.left { right: calc(100% + 6px); top: 50%; transform-origin: right center; transform: translateY(-50%) scale(0.95); }\n    .bubble.left.visible { transform: translateY(-50%) scale(1); }\n    .bubble.right { left: calc(100% + 6px); top: 50%; transform-origin: left center; transform: translateY(-50%) scale(0.95); }\n    .bubble.right.visible { transform: translateY(-50%) scale(1); }",
    },
    {
        id: "theme-toggle",
        name: "AppThemeToggle",
        selector: "app-theme-toggle",
        packageType: "shared",
        category: "layout",
        props: [],
        template: '<button\n        type="button"\n        @click="${this._handleToggle}"\n        title="${this.isDark ? "Switch to light" : "Switch to dark"}"\n      >\n        ${this.isDark\n          ? html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\n          <circle cx="12" cy="12" r="5"></circle>\n          <line x1="12" y1="1" x2="12" y2="3"></line>\n          <line x1="12" y1="21" x2="12" y2="23"></line>\n          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>\n          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>\n          <line x1="1" y1="12" x2="3" y2="12"></line>\n          <line x1="21" y1="12" x2="23" y2="12"></line>\n          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>\n          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>\n        </svg>`\n          : html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\n          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>\n        </svg>`}\n      </button>',
        css: ":host {\n      display: inline-flex;\n    }\n\n    button {\n      display: inline-flex;\n      align-items: center;\n      justify-content: center;\n      width: 2.5rem;\n      height: 2.5rem;\n      border-radius: 50%;\n      border: 1px solid var(--border-color);\n      background-color: var(--bg-elevated);\n      color: var(--text-primary);\n      cursor: pointer;\n      transition: all 0.15s;\n      padding: 0;\n    }\n\n    button:hover {\n      background-color: var(--accent);\n      color: var(--text-on-accent);\n      border-color: var(--accent);\n    }\n\n    svg {\n      width: 1.25rem;\n      height: 1.25rem;\n    }",
    },
    {
        id: "icon",
        name: "AppIcon",
        selector: "app-icon",
        packageType: "shared",
        category: "forms",
        props: [
            {
                name: "name",
                type: "string",
                default: "clear",
            },
            {
                name: "svgClass",
                type: "string",
                default: "",
            },
        ],
        template: "",
        css: ":host {\n      display: inline-flex;\n      align-items: center;\n      justify-content: center;\n      width: 1.25em;\n      height: 1.25em;\n    }\n\n    svg {\n      width: 100%;\n      height: 100%;\n      color: inherit;\n    }\n\n    .icon-spinner {\n      animation: icon-spin 1s linear infinite;\n    }\n\n    @keyframes icon-spin {\n      to {\n        transform: rotate(360deg);\n      }\n    }",
    },
    {
        id: "text-input",
        name: "AppTextInput",
        selector: "app-text-input",
        packageType: "shared",
        category: "forms",
        props: [
            {
                name: "value",
                type: "string",
                default: "",
            },
            {
                name: "placeholder",
                type: "string",
                default: "",
            },
            {
                name: "charCount",
                type: "string",
                default: "",
            },
            {
                name: "maxChars",
                type: "number",
                default: 0,
            },
            {
                name: "id",
                type: "string",
                default: "",
            },
            {
                name: "clearable",
                type: "boolean",
                default: false,
            },
        ],
        template: '<div class="input-container">\n        <textarea\n          id="${this.id || ""}"\n          .value="${this.value || ""}"\n          placeholder="${this.placeholder || ""}"\n          @input="${this._handleInput}"\n          @textarea="${(e: Event) => this._autoResize(e.target as HTMLTextAreaElement)}"\n        ></textarea>\n        <div class="footer">\n          <span class="char-count">${displayCount}</span>\n          ${this.clearable\n            ? html`<button class="clear-btn" type="button" @click="${this._handleClear}">\n                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">\n                  <line x1="18" y1="6" x2="6" y2="18"></line>\n                  <line x1="6" y1="6" x2="18" y2="18"></line>\n                </svg>\n              </button>`\n            : ""}\n        </div>\n      </div>',
        css: ":host {\n      display: flex;\n      flex-direction: column;\n      width: 100%;\n    }\n\n    .input-container {\n      display: flex;\n      flex-direction: column;\n      border: 1px solid var(--border-color);\n      border-radius: 0.5rem;\n      background-color: var(--bg-elevated);\n      transition: border-color 0.15s;\n    }\n\n    .input-container:focus-within {\n      border-color: var(--accent);\n      box-shadow: 0 0 0 1px var(--accent);\n    }\n\n    textarea {\n      width: 100%;\n      min-height: 2.5rem;\n      padding: 0.5rem 0.75rem;\n      border: none;\n      background: transparent;\n      color: var(--text-primary);\n      font-family: inherit;\n      font-size: 0.875rem;\n      line-height: 1.5;\n      resize: none;\n      outline: none;\n      overflow: hidden;\n    }\n\n    textarea::placeholder {\n      color: var(--text-muted);\n    }\n\n    .footer {\n      display: flex;\n      align-items: center;\n      justify-content: space-between;\n      padding: 0.25rem 0.75rem 0.375rem;\n      border-top: 1px solid var(--border-color);\n    }\n\n    .char-count {\n      font-size: 0.75rem;\n      color: var(--text-muted);\n    }\n\n    .clear-btn {\n      display: inline-flex;\n      align-items: center;\n      justify-content: center;\n      width: 1.5rem;\n      height: 1.5rem;\n      border-radius: 50%;\n      border: none;\n      background: transparent;\n      color: var(--text-muted);\n      cursor: pointer;\n      transition: all 0.15s;\n      padding: 0;\n    }\n\n    .clear-btn:hover {\n      background-color: var(--bg-hover);\n      color: var(--text-primary);\n    }\n\n    .clear-btn svg {\n      width: 0.875rem;\n      height: 0.875rem;\n    }",
    },
    {
        id: "language-selector",
        name: "AppLanguageSelector",
        selector: "app-language-selector",
        packageType: "shared",
        category: "forms",
        props: [
            {
                name: "languages",
                type: "string",
                default: "",
            },
            {
                name: "value",
                type: "string",
                default: "",
            },
            {
                name: "label",
                type: "string",
                default: "",
            },
            {
                name: "labelId",
                type: "string",
                default: "",
            },
        ],
        template: '${this.label\n        ? html`<span class="selector-label" id="${this.labelId || ""}">${this.label}</span>`\n        : ""}\n      <div class="select-wrapper">\n        <select\n          .value="${this.value || ""}"\n          @change="${this._handleChange}"\n        >\n          ${parsedLanguages.map(\n            (lang) => html`<option value="${lang}">${lang}</option>`\n          )}\n        </select>\n        <span class="chevron-icon">\n          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">\n            <polyline points="6 9 12 15 18 9"></polyline>\n          </svg>\n        </span>\n      </div>',
        css: ":host {\n      display: inline-flex;\n      flex-direction: column;\n      gap: 0.25rem;\n    }\n\n    .selector-label {\n      font-size: 0.875rem;\n      font-weight: 500;\n      color: var(--text-primary);\n    }\n\n    .select-wrapper {\n      position: relative;\n      display: inline-flex;\n      align-items: center;\n    }\n\n    select {\n      appearance: none;\n      -webkit-appearance: none;\n      padding: 0.5rem 2rem 0.5rem 0.75rem;\n      border-radius: 0.5rem;\n      border: 1px solid var(--border-color);\n      background-color: var(--bg-elevated);\n      color: var(--text-primary);\n      font-size: 0.875rem;\n      font-family: inherit;\n      cursor: pointer;\n      outline: none;\n      transition: border-color 0.15s;\n    }\n\n    select:focus {\n      border-color: var(--accent);\n      box-shadow: 0 0 0 1px var(--accent);\n    }\n\n    .chevron-icon {\n      position: absolute;\n      right: 0.5rem;\n      pointer-events: none;\n      width: 1rem;\n      height: 1rem;\n      color: var(--text-muted);\n    }",
    },
    {
        id: "shortcuts-overlay",
        name: "AppShortcutsOverlay",
        selector: "app-shortcuts-overlay",
        packageType: "shared",
        category: "layout",
        props: [],
        template: '<div class="overlay ${this.open ? "" : "hidden"}" @click="${this._handleBackdropClick}">\n        <div class="modal">\n          <div class="modal-header">\n            <h2 class="modal-title">Keyboard Shortcuts</h2>\n            <button class="close-btn" type="button" @click="${this._close}">\n              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\n                <line x1="18" y1="6" x2="6" y2="18"></line>\n                <line x1="6" y1="6" x2="18" y2="18"></line>\n              </svg>\n            </button>\n          </div>\n          <ul class="shortcut-list">\n            ${shortcuts.map(\n              (s) => html`<li class="shortcut-item">\n                <span class="shortcut-desc">${s.description}</span>\n                <kbd>${s.keys.join(" ")}</kbd>\n              </li>`\n            )}\n          </ul>\n        </div>\n      </div>',
        css: ":host {\n      display: block;\n    }\n\n    .overlay {\n      position: fixed;\n      inset: 0;\n      z-index: 10000;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      background-color: rgba(0, 0, 0, 0.5);\n      opacity: 1;\n      transition: opacity 0.2s ease;\n    }\n\n    .overlay.hidden {\n      opacity: 0;\n      pointer-events: none;\n    }\n\n    .modal {\n      background-color: var(--bg-elevated);\n      border: 1px solid var(--border-color);\n      border-radius: 0.75rem;\n      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);\n      width: 100%;\n      max-width: 28rem;\n      max-height: 80vh;\n      overflow-y: auto;\n      padding: 1.5rem;\n    }\n\n    .modal-header {\n      display: flex;\n      align-items: center;\n      justify-content: space-between;\n      margin-bottom: 1rem;\n    }\n\n    .modal-title {\n      font-size: 1.125rem;\n      font-weight: 600;\n      color: var(--text-primary);\n      margin: 0;\n    }\n\n    .close-btn {\n      display: inline-flex;\n      align-items: center;\n      justify-content: center;\n      width: 2rem;\n      height: 2rem;\n      border-radius: 0.375rem;\n      border: none;\n      background: transparent;\n      color: var(--text-muted);\n      cursor: pointer;\n      transition: all 0.15s;\n      padding: 0;\n    }\n\n    .close-btn:hover {\n      background-color: var(--bg-hover);\n      color: var(--text-primary);\n    }\n\n    .close-btn svg {\n      width: 1rem;\n      height: 1rem;\n    }\n\n    .shortcut-list {\n      display: flex;\n      flex-direction: column;\n      gap: 0.75rem;\n      list-style: none;\n      margin: 0;\n      padding: 0;\n    }\n\n    .shortcut-item {\n      display: flex;\n      align-items: center;\n      justify-content: space-between;\n      gap: 1rem;\n    }\n\n    .shortcut-desc {\n      font-size: 0.875rem;\n      color: var(--text-secondary);\n    }\n\n    kbd {\n      display: inline-flex;\n      align-items: center;\n      justify-content: center;\n      padding: 0.25rem 0.5rem;\n      background-color: var(--bg-secondary);\n      border: 1px solid var(--border-color);\n      border-radius: 0.375rem;\n      font-family: monospace;\n      font-size: 0.875rem;\n      color: var(--text-primary);\n    }",
    },
    {
        id: "translation-output",
        name: "AppTranslationOutput",
        selector: "app-translation-output",
        packageType: "shared",
        category: "forms",
        props: [
            {
                name: "value",
                type: "string",
                default: "",
            },
            {
                name: "placeholder",
                type: "string",
                default: "",
            },
            {
                name: "id",
                type: "string",
                default: "",
            },
        ],
        template: '<div class="output-container">\n        <textarea\n          id="${this.id || ""}"\n          .value="${this.value || ""}"\n          placeholder="${this.placeholder || ""}"\n          readonly\n        ></textarea>\n        <button class="copy-btn" type="button" @click="${this._handleCopy}" title="Copy to clipboard">\n          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\n            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>\n            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>\n          </svg>\n        </button>\n      </div>',
        css: ":host {\n      display: flex;\n      flex-direction: column;\n      width: 100%;\n    }\n\n    .output-container {\n      position: relative;\n      display: flex;\n      flex-direction: column;\n      border: 1px solid var(--border-color);\n      border-radius: 0.5rem;\n      background-color: var(--bg-elevated);\n    }\n\n    textarea {\n      width: 100%;\n      min-height: 2.5rem;\n      padding: 0.5rem 0.75rem;\n      padding-right: 2.5rem;\n      border: none;\n      background: transparent;\n      color: var(--text-primary);\n      font-family: inherit;\n      font-size: 0.875rem;\n      line-height: 1.5;\n      resize: none;\n      outline: none;\n      overflow: hidden;\n    }\n\n    textarea::placeholder {\n      color: var(--text-muted);\n    }\n\n    .copy-btn {\n      position: absolute;\n      top: 0.5rem;\n      right: 0.5rem;\n      display: inline-flex;\n      align-items: center;\n      justify-content: center;\n      width: 1.75rem;\n      height: 1.75rem;\n      border-radius: 0.375rem;\n      border: 1px solid var(--border-color);\n      background-color: var(--bg-elevated);\n      color: var(--text-muted);\n      cursor: pointer;\n      transition: all 0.15s;\n      padding: 0;\n    }\n\n    .copy-btn:hover {\n      background-color: var(--accent);\n      color: var(--text-on-accent);\n      border-color: var(--accent);\n    }\n\n    .copy-btn svg {\n      width: 0.875rem;\n      height: 0.875rem;\n    }",
    },
    {
        id: "tree",
        name: "AppTree",
        selector: "app-tree",
        packageType: "shared",
        category: "forms",
        props: [
            {
                name: "nodes",
                type: "string",
                default: "[]",
            },
            {
                name: "selectable",
                type: "boolean",
                default: false,
            },
            {
                name: "selected",
                type: "string",
                default: "",
            },
            {
                name: "expanded",
                type: "string",
                default: "[]",
            },
        ],
        template: '<ul role="tree">\n        ${flat.map(({ node, depth, expanded }) => {\n          const hasChildren = !!(node.children && node.children.length);\n          const isSelected = this.selectable && this.selectedId === node.id;\n          return html`<li role="treeitem" aria-expanded="${hasChildren ? expanded : undefined}">\n            <div\n              class="row ${isSelected ? "selected" : ""}"\n              style="padding-left: ${depth * 1.5}rem"\n              @click="${() => this._handleNodeClick(node)}"\n            >\n              <span class="toggle ${hasChildren ? (expanded ? "expanded" : "") : "empty"}">${hasChildren ? (expanded ? "▼" : "▶") : ""}</span>\n              ${node.icon ? html`<span class="icon">${node.icon}</span>` : ""}\n              <span class="label">${node.label}</span>\n            </div>\n            ${hasChildren && expanded ? html`<li class="children">${this._renderNodes(node.children, depth + 1)}</li>` : ""}\n          </li>`;\n        })}\n      </ul>',
        css: ":host {\n      display: block;\n      font-size: 0.875rem;\n      color: var(--text-primary, #1f2937);\n    }\n\n    ul {\n      list-style: none;\n      margin: 0;\n      padding: 0;\n    }\n\n    li {\n      user-select: none;\n    }\n\n    .row {\n      display: flex;\n      align-items: center;\n      gap: 0.375rem;\n      padding: 0.375rem 0.5rem;\n      border-radius: 0.375rem;\n      cursor: pointer;\n      transition: background-color 0.1s;\n    }\n\n    .row:hover {\n      background: var(--bg-hover, #f3f4f6);\n    }\n\n    .row.selected {\n      background: var(--accent, #3b82f6);\n      color: var(--text-on-accent, #ffffff);\n    }\n\n    .toggle {\n      display: inline-flex;\n      align-items: center;\n      justify-content: center;\n      width: 1rem;\n      height: 1rem;\n      font-size: 0.75rem;\n      transition: transform 0.15s;\n    }\n\n    .toggle.expanded {\n      transform: rotate(90deg);\n    }\n\n    .toggle.empty {\n      visibility: hidden;\n    }\n\n    .icon {\n      font-size: 1rem;\n      width: 1rem;\n      text-align: center;\n    }\n\n    .label {\n      flex: 1;\n    }\n\n    .children {\n      padding-left: 1.25rem;\n    }",
    },
    {
        id: "divider",
        name: "AppDivider",
        selector: "app-divider",
        packageType: "shared",
        category: "forms",
        props: [
            {
                name: "orientation",
                type: "string",
                default: "horizontal",
            },
            {
                name: "spacing",
                type: "string",
                default: "md",
            },
            {
                name: "color",
                type: "string",
                default: "",
            },
        ],
        template: '<div class="line" style=${this.color ? `background: ${this.color}` : ""} role="separator"></div>',
        css: ':host {\n      display: flex;\n      align-items: center;\n      justify-content: center;\n    }\n\n    :host([orientation="vertical"]) {\n      display: inline-flex;\n      align-items: stretch;\n      height: 100%;\n    }\n\n    .line {\n      background: var(--divider-color, var(--border-color, #e5e7eb));\n      width: 100%;\n      height: 1px;\n    }\n\n    :host([orientation="vertical"]) .line {\n      width: 1px;\n      height: 100%;\n    }\n\n    :host([spacing="none"]) {\n      margin: 0;\n    }\n\n    :host([spacing="sm"]) {\n      margin: 0.5rem 0;\n    }\n\n    :host([spacing="md"]) {\n      margin: 1rem 0;\n    }\n\n    :host([spacing="lg"]) {\n      margin: 1.5rem 0;\n    }\n\n    :host([spacing="xl"]) {\n      margin: 2.5rem 0;\n    }\n\n    :host([orientation="vertical"][spacing="none"]) {\n      margin: 0;\n    }\n\n    :host([orientation="vertical"][spacing="sm"]) {\n      margin: 0 0.5rem;\n    }\n\n    :host([orientation="vertical"][spacing="md"]) {\n      margin: 0 1rem;\n    }\n\n    :host([orientation="vertical"][spacing="lg"]) {\n      margin: 0 1.5rem;\n    }\n\n    :host([orientation="vertical"][spacing="xl"]) {\n      margin: 0 2.5rem;\n    }',
    },
    {
        id: "form",
        name: "AppForm",
        selector: "app-form",
        packageType: "shared",
        category: "forms",
        props: [
            {
                name: "heading",
                type: "string",
                default: "",
            },
            {
                name: "submitText",
                type: "string",
                default: "Submit",
            },
            {
                name: "cancelText",
                type: "string",
                default: "Cancel",
            },
            {
                name: "showActions",
                type: "boolean",
                default: true,
            },
        ],
        template: '${this.heading ? html`<h3 class="heading">${this.heading}</h3>` : ""}\n      <form @submit=${this.submit} novalidate>\n        <div class="fields"><slot></slot></div>\n        ${this.showActions\n          ? html`<div class="actions">\n              <button type="button" class="cancel-btn" @click="${this._handleCancel}">${this.cancelText}</button>\n              <button type="submit" class="submit-btn">${this.submitText}</button>\n            </div>`\n          : ""}\n      </form>',
        css: ":host {\n      display: block;\n      background: var(--bg-elevated, #ffffff);\n      border: 1px solid var(--border-color, #e5e7eb);\n      border-radius: 0.5rem;\n      padding: 1.25rem;\n    }\n\n    .heading {\n      font-size: 1.125rem;\n      font-weight: 600;\n      color: var(--text-primary, #1f2937);\n      margin: 0 0 1rem;\n    }\n\n    .fields {\n      display: flex;\n      flex-direction: column;\n      gap: 0.75rem;\n    }\n\n    .actions {\n      display: flex;\n      justify-content: flex-end;\n      gap: 0.5rem;\n      margin-top: 1.25rem;\n      padding-top: 1rem;\n      border-top: 1px solid var(--border-color, #e5e7eb);\n    }\n\n    button {\n      padding: 0.5rem 1rem;\n      border-radius: 0.375rem;\n      border: 1px solid var(--border-color, #e5e7eb);\n      background: var(--bg-elevated, #ffffff);\n      color: var(--text-primary, #1f2937);\n      font-size: 0.875rem;\n      font-weight: 500;\n      cursor: pointer;\n      transition: background-color 0.15s;\n    }\n\n    button:hover {\n      background: var(--bg-hover, #f3f4f6);\n    }\n\n    button.primary,\n    button.submit-btn {\n      background: var(--accent, #3b82f6);\n      border-color: var(--accent, #3b82f6);\n      color: var(--text-on-accent, #ffffff);\n    }\n\n    button.primary:hover,\n    button.submit-btn:hover {\n      opacity: 0.9;\n    }",
    },
];
// Layout Components
const layoutComponents = [
    {
        id: "canvas-toolbar",
        name: "CanvasToolbar",
        selector: "app-canvas-toolbar",
        packageType: "shared",
        category: "forms",
        props: [
            {
                name: "zoomLevel",
                type: "number",
                default: 100,
            },
            {
                name: "showGrid",
                type: "boolean",
                default: true,
            },
            {
                name: "canUndo",
                type: "boolean",
                default: true,
            },
            {
                name: "canRedo",
                type: "boolean",
                default: true,
            },
        ],
        template: '<div class="toolbar-group">\n        <button\n          class="toolbar-btn"\n          @click="${() => this._emit("undo")}"\n          ?disabled="${!this.canUndo}"\n          title="Undo"\n        >\n          <mat-icon>undo</mat-icon>\n        </button>\n        <button\n          class="toolbar-btn"\n          @click="${() => this._emit("redo")}"\n          ?disabled="${!this.canRedo}"\n          title="Redo"\n        >\n          <mat-icon>redo</mat-icon>\n        </button>\n      </div>\n      <div class="toolbar-group">\n        <button\n          class="toolbar-btn"\n          @click="${() => this._emit("zoom-out")}"\n          title="Zoom Out"\n        >\n          <mat-icon>remove</mat-icon>\n        </button>\n        <span class="zoom-label">${this.zoomLevel}%</span>\n        <button\n          class="toolbar-btn"\n          @click="${() => this._emit("zoom-in")}"\n          title="Zoom In"\n        >\n          <mat-icon>add</mat-icon>\n        </button>\n        <button\n          class="toolbar-btn"\n          @click="${() => this._emit("zoom-reset")}"\n          title="Reset Zoom"\n        >\n          <mat-icon>fit_screen</mat-icon>\n        </button>\n      </div>\n      <div class="toolbar-group">\n        <button\n          class="toolbar-btn ${this.showGrid ? "active" : ""}"\n          @click="${() => this._emit("toggle-grid")}"\n          title="Toggle Grid"\n        >\n          <mat-icon>grid_on</mat-icon>\n        </button>\n      </div>',
        css: ":host {\n      display: inline-flex;\n      align-items: center;\n      gap: 4px;\n    }\n    .toolbar-group {\n      display: flex;\n      align-items: center;\n      gap: 2px;\n      padding: 0 4px;\n    }\n    .toolbar-group:not(:last-child) {\n      border-right: 1px solid var(--border-color);\n    }\n    .toolbar-btn {\n      display: inline-flex;\n      align-items: center;\n      justify-content: center;\n      width: 32px;\n      height: 32px;\n      border: none;\n      background: transparent;\n      border-radius: 6px;\n      cursor: pointer;\n      color: var(--text-secondary);\n      transition:\n        background-color 0.15s ease,\n        color 0.15s ease;\n    }\n    .toolbar-btn:hover {\n      background: var(--bg-hover);\n      color: var(--text-primary);\n    }\n    .toolbar-btn:active {\n      background: var(--bg-tertiary);\n    }\n    .toolbar-btn.active {\n      background: var(--accent);\n      color: white;\n    }\n    .toolbar-btn[disabled] {\n      opacity: 0.4;\n      cursor: not-allowed;\n    }\n    .zoom-label {\n      font-size: 12px;\n      color: var(--text-secondary);\n      min-width: 48px;\n      text-align: center;\n    }\n    mat-icon {\n      font-size: 20px;\n      width: 20px;\n      height: 20px;\n    }",
    },
    {
        id: "designer-sidebar",
        name: "DesignerSidebar",
        selector: "app-designer-sidebar",
        packageType: "shared",
        category: "forms",
        props: [
            {
                name: "collapsed",
                type: "boolean",
                default: false,
            },
            {
                name: "header",
                type: "string",
                default: "",
            },
        ],
        template: '<div class="sidebar-wrapper">\n        <aside class="designer-sidebar ${this.collapsed ? "collapsed" : ""}">\n          <div class="sidebar-header">\n            <span class="sidebar-header-title">${this.header}</span>\n          </div>\n          <div class="sidebar-content">\n            <slot name="content"></slot>\n          </div>\n          <div class="sidebar-footer">\n            <slot name="footer"></slot>\n          </div>\n        </aside>\n        <div class="sidebar-toggle-container">\n          <button class="sidebar-toggle" @click=${this._toggleCollapse}>\n            ${this.collapsed\n              ? this.position === "left"\n                ? "▶"\n                : "◀"\n              : this.position === "left"\n                ? "◀"\n                : "▶"}\n          </button>\n        </div>\n      </div>',
        css: ':host {\n      display: block;\n      height: 100%;\n    }\n\n    .sidebar-wrapper {\n      position: relative;\n      height: 100%;\n      display: flex;\n    }\n\n    .sidebar-toggle-container {\n      position: absolute;\n      top: 50%;\n      transform: translateY(-50%);\n      z-index: 10;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      width: 24px;\n      height: 48px;\n      background: var(--bg-secondary);\n      border: 1px solid var(--border-color);\n      border-radius: 4px;\n      transition: all var(--transition-fast, 150ms);\n    }\n\n    .sidebar-toggle-container:hover {\n      background: var(--bg-hover);\n    }\n\n    :host([position="left"]) .sidebar-toggle-container {\n      right: -12px;\n    }\n\n    :host([position="right"]) .sidebar-toggle-container {\n      left: -12px;\n      right: auto;\n    }\n\n    .sidebar-toggle {\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      width: 24px;\n      height: 28px;\n      padding: 0;\n      background: transparent;\n      border: none;\n      border-radius: 4px;\n      color: var(--text-secondary);\n      cursor: pointer;\n      transition: all var(--transition-fast, 150ms);\n    }\n\n    .sidebar-toggle:hover {\n      color: var(--text-primary);\n    }\n\n    .designer-sidebar {\n      display: flex;\n      flex-direction: column;\n      height: 100%;\n      background: var(--bg-secondary);\n      border-right: 1px solid var(--border-color);\n      transition:\n        width var(--transition-normal, 200ms) ease,\n        opacity var(--transition-normal, 200ms) ease;\n      overflow: hidden;\n      flex-shrink: 0;\n    }\n\n    :host([position="right"]) .designer-sidebar {\n      border-right: none;\n      border-left: 1px solid var(--border-color);\n    }\n\n    .designer-sidebar.collapsed {\n      width: 0;\n      visibility: hidden;\n    }\n\n    .sidebar-header {\n      display: flex;\n      align-items: center;\n      justify-content: space-between;\n      padding: 0.75rem 1rem;\n      border-bottom: 1px solid var(--border-color);\n      min-height: 48px;\n      background: var(--bg-secondary);\n      flex-shrink: 0;\n    }\n\n    :host([position="right"]) .sidebar-header {\n      flex-direction: row-reverse;\n    }\n\n    .sidebar-header-title {\n      font-size: 0.875rem;\n      font-weight: 600;\n      color: var(--text-primary);\n      white-space: nowrap;\n      overflow: hidden;\n      text-overflow: ellipsis;\n    }\n\n    .sidebar-content {\n      flex: 1;\n      overflow: auto;\n      min-height: 0;\n    }\n\n    .sidebar-footer {\n      padding: 0.75rem 1rem;\n      border-top: 1px solid var(--border-color);\n      flex-shrink: 0;\n    }',
    },
];
// Feedback Components
const feedbackComponents = [
    {
        id: "command-palette",
        name: "AppCommandPalette",
        selector: "app-command-palette",
        packageType: "shared",
        category: "feedback",
        props: [
            {
                name: "open",
                type: "boolean",
                default: false,
            },
            {
                name: "commands",
                type: "string",
                default: "[]",
            },
        ],
        template: '<div class="command-palette"><input type="text" placeholder="Type a command..." /></div>',
        css: ":host { display: block; }",
    },
    {
        id: "toast",
        name: "AppToast",
        selector: "app-toast",
        packageType: "shared",
        category: "feedback",
        props: [
            {
                name: "message",
                type: "string",
                default: "",
            },
            {
                name: "type",
                type: "string",
                default: "info",
            },
            {
                name: "duration",
                type: "number",
                default: 3000,
            },
        ],
        template: '<div class="toast toast-${this.type}">${this.message}</div>',
        css: ":host { display: block; }",
    },
    {
        id: "snackbar",
        name: "AppSnackbar",
        selector: "app-snackbar",
        packageType: "shared",
        category: "forms",
        props: [
            {
                name: "message",
                type: "string",
                default: "",
            },
            {
                name: "action",
                type: "string",
                default: "",
            },
            {
                name: "duration",
                type: "number",
                default: 4000,
            },
            {
                name: "type",
                type: "string",
                default: "default",
            },
            {
                name: "open",
                type: "boolean",
                default: false,
            },
        ],
        template: "",
        css: ":host {\n      position: fixed;\n      bottom: 1.5rem;\n      left: 50%;\n      transform: translateX(-50%);\n      z-index: 9999;\n      display: block;\n    }\n    .bar {\n      display: inline-flex;\n      align-items: center;\n      gap: 0.75rem;\n      padding: 0.75rem 1rem;\n      border-radius: 0.5rem;\n      background: var(--bg-elevated, #1f2937);\n      color: var(--text-on-accent, #ffffff);\n      font-size: 0.875rem;\n      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);\n      min-width: 280px;\n      max-width: 560px;\n      border-left: 4px solid var(--accent, #3b82f6);\n    }\n    .bar.success { border-left-color: var(--success, #10b981); }\n    .bar.error { border-left-color: var(--error, #ef4444); }\n    .bar.warning { border-left-color: var(--warning, #f59e0b); }\n    .bar.info { border-left-color: var(--info, #3b82f6); }\n    .message { flex: 1; }\n    .action-btn {\n      background: transparent;\n      border: none;\n      color: var(--accent, #3b82f6);\n      font-weight: 600;\n      cursor: pointer;\n      padding: 0.25rem 0.5rem;\n      border-radius: 0.25rem;\n      text-transform: uppercase;\n      font-size: 0.75rem;\n    }\n    .action-btn:hover { background: rgba(255, 255, 255, 0.1); }\n    .close-btn {\n      background: transparent;\n      border: none;\n      color: inherit;\n      cursor: pointer;\n      padding: 0.125rem 0.25rem;\n      opacity: 0.7;\n      font-size: 1.125rem;\n      line-height: 1;\n    }\n    .close-btn:hover { opacity: 1; }",
    },
];
// Data Components
const dataComponents = [
    {
        id: "data-data-table",
        name: "data data table",
        selector: "data-data-table",
        packageType: "shared",
        category: "forms",
        props: [
            {
                name: "columns",
                type: "string",
                default: "[]",
            },
            {
                name: "data",
                type: "string",
                default: "[]",
            },
            {
                name: "selectable",
                type: "boolean",
                default: false,
            },
            {
                name: "selectedKey",
                type: "string",
                default: "",
            },
        ],
        template: '<div class="app-data-table">\n        <table class="app-data-table__table">\n          <thead class="app-data-table__head">\n            <tr>\n              ${this.selectable\n                ? html',
        css: ":host {\n      display: block;\n    }\n\n    .app-data-table {\n      background: var(--bg-elevated);\n      border: 1px solid var(--border-color);\n      border-radius: 0.5rem;\n      overflow: hidden;\n    }\n\n    .app-data-table__table {\n      width: 100%;\n      border-collapse: collapse;\n    }\n\n    .app-data-table__head {\n      background: var(--bg-tertiary);\n    }\n\n    th {\n      text-align: left;\n      padding: 0.75rem 1rem;\n      font-size: 0.875rem;\n      font-weight: 600;\n      color: var(--text-primary);\n      border-bottom: 1px solid var(--border-color);\n    }\n\n    .app-data-table__th-check {\n      width: 2.5rem;\n      color: var(--text-muted);\n    }\n\n    td {\n      text-align: left;\n      padding: 0.75rem 1rem;\n      font-size: 0.875rem;\n      color: var(--text-primary);\n      border-bottom: 1px solid var(--border-subtle);\n    }\n\n    .app-data-table__body tr:last-child td {\n      border-bottom: none;\n    }\n\n    .app-data-table__body tr {\n      cursor: default;\n      transition: background 150ms ease;\n    }\n\n    .app-data-table__body tr:hover td {\n      background: var(--bg-hover);\n    }\n\n    .app-data-table__row--selected td {\n      background: color-mix(in srgb, var(--accent) 10%, transparent);\n    }\n\n    .app-data-table__row--selected:hover td {\n      background: color-mix(in srgb, var(--accent) 15%, transparent);\n    }\n\n    .app-data-table__td-check {\n      width: 2.5rem;\n      padding-right: 0;\n    }\n\n    .app-data-table__check-icon {\n      font-size: 1.25rem;\n      color: var(--accent);\n      cursor: pointer;\n    }\n\n    .app-data-table__empty {\n      text-align: center;\n      color: var(--text-muted);\n      padding: 2rem;\n    }",
    },
    {
        id: "data-json-view",
        name: "DataJsonView",
        selector: "data-json-view",
        packageType: "shared",
        category: "forms",
        props: [
            {
                name: "data",
                type: "string",
                default: "null",
            },
            {
                name: "indent",
                type: "number",
                default: 2,
            },
        ],
        template: '<pre class="app-json-view" .innerHTML=${highlighted}></pre>',
        css: ':host {\n      display: block;\n    }\n\n    .app-json-view {\n      background: var(--bg-secondary);\n      border: 1px solid var(--border-color);\n      border-radius: 0.5rem;\n      padding: 1rem;\n      margin: 0;\n      font-family: "Fira Code", "Cascadia Code", "JetBrains Mono", monospace;\n      font-size: 0.8125rem;\n      line-height: 1.6;\n      color: var(--text-primary);\n      overflow-x: auto;\n      white-space: pre;\n    }\n\n    .jv-key {\n      color: #9cdcfe;\n    }\n\n    .jv-string {\n      color: #ce9178;\n    }\n\n    .jv-number {\n      color: #b5cea8;\n    }\n\n    .jv-boolean {\n      color: #569cd6;\n    }\n\n    .jv-null {\n      color: #808080;\n    }',
    },
    {
        id: "data-segment-selector",
        name: "DataSegmentSelector",
        selector: "data-segment-selector",
        packageType: "shared",
        category: "forms",
        props: [
            {
                name: "segments",
                type: "string",
                default: "[]",
            },
            {
                name: "selected",
                type: "string",
                default: "",
            },
        ],
        template: '<div class="app-segment-selector">\n        ${this.segments.map(\n          (seg) => html',
        css: ":host {\n      display: inline-block;\n    }\n\n    .app-segment-selector {\n      display: inline-flex;\n      background: var(--bg-secondary);\n      border: 1px solid var(--border-color);\n      border-radius: 0.5rem;\n      padding: 0.25rem;\n      gap: 0.25rem;\n    }\n\n    .app-segment-selector__btn {\n      display: flex;\n      align-items: center;\n      gap: 0.375rem;\n      padding: 0.5rem 1rem;\n      border: none;\n      border-radius: 0.375rem;\n      background: transparent;\n      color: var(--text-secondary);\n      font-size: 0.875rem;\n      font-weight: 500;\n      cursor: pointer;\n      transition:\n        background 150ms ease,\n        color 150ms ease;\n      white-space: nowrap;\n    }\n\n    .app-segment-selector__btn:hover:not(.app-segment-selector__btn--active) {\n      background: var(--bg-hover);\n      color: var(--text-primary);\n    }\n\n    .app-segment-selector__btn--active {\n      background: var(--accent);\n      color: var(--accent-50);\n    }\n\n    .app-segment-selector__icon {\n      font-size: 1rem;\n    }",
    },
    {
        id: "data-stats-card",
        name: "DataStatsCard",
        selector: "data-stats-card",
        packageType: "shared",
        category: "forms",
        props: [
            {
                name: "label",
                type: "string",
                default: "",
            },
            {
                name: "value",
                type: "string",
                default: "",
            },
            {
                name: "icon",
                type: "string",
                default: "",
            },
            {
                name: "iconBgClass",
                type: "string",
                default: "bg-accent",
            },
        ],
        template: '<div class="app-stats-card">\n        <div class="app-stats-card__icon-wrap ${this.iconBgClass}">\n          <span class="material-icons app-stats-card__icon">${this.icon}</span>\n        </div>\n        <div class="app-stats-card__content">\n          <p class="app-stats-card__label">${this.label}</p>\n          <p class="app-stats-card__value">${this.value}</p>\n        </div>\n      </div>',
        css: ":host {\n      display: block;\n    }\n\n    .app-stats-card {\n      background: var(--bg-elevated);\n      border: 1px solid var(--border-color);\n      border-radius: 0.5rem;\n      padding: 1rem;\n      display: flex;\n      align-items: center;\n      gap: 1rem;\n    }\n\n    .app-stats-card__icon-wrap {\n      width: 3rem;\n      height: 3rem;\n      border-radius: 0.5rem;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      flex-shrink: 0;\n    }\n\n    .app-stats-card__icon {\n      font-size: 1.5rem;\n      color: var(--accent);\n    }\n\n    .app-stats-card__content {\n      display: flex;\n      flex-direction: column;\n      gap: 0.25rem;\n      min-width: 0;\n    }\n\n    .app-stats-card__label {\n      margin: 0;\n      font-size: 0.75rem;\n      font-weight: 500;\n      color: var(--text-muted);\n      text-transform: uppercase;\n      letter-spacing: 0.05em;\n    }\n\n    .app-stats-card__value {\n      margin: 0;\n      font-size: 1.5rem;\n      font-weight: 700;\n      color: var(--text-primary);\n      line-height: 1.2;\n    }",
    },
    {
        id: "data-table-view",
        name: "data table view",
        selector: "data-table-view",
        packageType: "shared",
        category: "forms",
        props: [
            {
                name: "columns",
                type: "string",
                default: "[]",
            },
            {
                name: "data",
                type: "string",
                default: "[]",
            },
            {
                name: "sortable",
                type: "boolean",
                default: false,
            },
            {
                name: "pageSize",
                type: "number",
                default: 10,
            },
            {
                name: "total",
                type: "number",
                default: 0,
            },
        ],
        template: '<div class="app-table-view">\n        <table class="app-table-view__table">\n          <thead class="app-table-view__head">\n            <tr>\n              ${this.columns.map(\n                (col) => html',
        css: ":host {\n      display: block;\n    }\n\n    .app-table-view {\n      background: var(--bg-elevated);\n      border: 1px solid var(--border-color);\n      border-radius: 0.5rem;\n      overflow: hidden;\n    }\n\n    .app-table-view__table {\n      width: 100%;\n      border-collapse: collapse;\n    }\n\n    .app-table-view__head {\n      background: var(--bg-tertiary);\n    }\n\n    .app-table-view__head tr {\n      border-bottom: 1px solid var(--border-color);\n    }\n\n    th {\n      text-align: left;\n      padding: 0.75rem 1rem;\n      font-size: 0.875rem;\n      color: var(--text-primary);\n      border-bottom: 1px solid var(--border-subtle);\n      font-weight: 600;\n    }\n\n    .app-table-view__th--sortable {\n      cursor: pointer;\n      user-select: none;\n    }\n\n    .app-table-view__th--sortable:hover {\n      background: var(--bg-hover);\n    }\n\n    .app-table-view__th-inner {\n      display: flex;\n      align-items: center;\n      gap: 0.25rem;\n    }\n\n    .app-table-view__sort-icon {\n      font-size: 1rem;\n      color: var(--text-muted);\n    }\n\n    td {\n      text-align: left;\n      padding: 0.75rem 1rem;\n      font-size: 0.875rem;\n      color: var(--text-primary);\n      border-bottom: 1px solid var(--border-subtle);\n    }\n\n    .app-table-view__body tr:last-child td {\n      border-bottom: none;\n    }\n\n    .app-table-view__body tr:hover td {\n      background: var(--bg-hover);\n    }\n\n    .app-table-view__empty {\n      text-align: center;\n      color: var(--text-muted);\n      padding: 2rem;\n    }\n\n    .app-table-view__pagination {\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      gap: 0.75rem;\n      padding: 0.75rem;\n      border-top: 1px solid var(--border-subtle);\n    }\n\n    .app-table-view__page-btn {\n      background: none;\n      border: 1px solid var(--border-color);\n      border-radius: 0.25rem;\n      width: 2rem;\n      height: 2rem;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      cursor: pointer;\n      color: var(--text-primary);\n      padding: 0;\n    }\n\n    .app-table-view__page-btn:hover:not(:disabled) {\n      background: var(--bg-hover);\n      border-color: var(--accent);\n    }\n\n    .app-table-view__page-btn:disabled {\n      opacity: 0.4;\n      cursor: not-allowed;\n    }\n\n    .app-table-view__page-info {\n      font-size: 0.875rem;\n      color: var(--text-secondary);\n    }",
    },
];
const components = uiComponents;

/**
 * Abstract base component that provides a destroy$ Subject for subscription cleanup.
 * Extend this class instead of OnDestroy directly when you need to manage RxJS subscriptions.
 */
class BaseDestroyableComponent {
    destroy$ = new Subject();
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: BaseDestroyableComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.25", type: BaseDestroyableComponent, isStandalone: true, selector: "lib-base-destroyable", ngImport: i0, template: "", isInline: true });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: BaseDestroyableComponent, decorators: [{
            type: Component,
            args: [{
                    selector: "lib-base-destroyable",
                    standalone: true,
                    template: "",
                }]
        }] });

class SignalStoreService {
    _state = signal({}, ...(ngDevMode ? [{ debugName: "_state" }] : []));
    state = computed(() => this._state(), ...(ngDevMode ? [{ debugName: "state" }] : []));
    set(key, value) {
        this._state.update((state) => ({
            ...state,
            [key]: value,
        }));
    }
    get(key) {
        return this._state()[key];
    }
    update(key, fn) {
        const current = this.get(key);
        this.set(key, fn(current));
    }
    delete(key) {
        this._state.update((state) => {
            const { [key]: _, ...rest } = state;
            return rest;
        });
    }
    keys() {
        return Object.keys(this._state());
    }
    has(key) {
        return key in this._state();
    }
    clear() {
        this._state.set({});
    }
    toJSON() {
        return this._state();
    }
    fromJSON(json) {
        this._state.set(json);
    }
    patch(patch) {
        this._state.update((state) => ({
            ...state,
            ...patch,
        }));
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: SignalStoreService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: SignalStoreService, providedIn: "root" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: SignalStoreService, decorators: [{
            type: Injectable,
            args: [{ providedIn: "root" }]
        }] });

let CrudService$1 = class CrudService {
    storage = signal(null, ...(ngDevMode ? [{ debugName: "storage" }] : []));
    init(storage) {
        this.storage.set(storage);
    }
    getStorage() {
        const s = this.storage();
        if (!s)
            throw new Error("CrudService not initialized");
        return s;
    }
    getCollection(collection) {
        const data = this.getStorage().get(collection);
        return data || [];
    }
    saveCollection(collection, data) {
        this.getStorage().set(collection, data);
    }
    create(collection, item) {
        const data = this.getCollection(collection);
        const timestamp = Date.now();
        const entity = {
            ...item,
            created_at: timestamp,
            updated_at: timestamp,
        };
        data.push(entity);
        this.saveCollection(collection, data);
        this.addPending({
            _op: "create",
            _ts: timestamp,
            id: entity.id,
        });
    }
    read(collection, id) {
        const data = this.getCollection(collection);
        return (data.find((item) => item.id === id) || null);
    }
    update(collection, id, changes) {
        const data = this.getCollection(collection);
        const index = data.findIndex((item) => item.id === id);
        if (index === -1)
            return;
        const timestamp = Date.now();
        const updated = {
            ...data[index],
            ...changes,
            updated_at: timestamp,
        };
        data[index] = updated;
        this.saveCollection(collection, data);
        this.addPending({
            _op: "update",
            _ts: timestamp,
            id,
            data: changes,
        });
    }
    delete(collection, id) {
        const data = this.getCollection(collection);
        const filtered = data.filter((item) => item.id !== id);
        this.saveCollection(collection, filtered);
        this.addPending({
            _op: "delete",
            _ts: Date.now(),
            id,
        });
    }
    query(collection, q) {
        let data = this.getCollection(collection);
        if (q.filters) {
            for (const filter of q.filters) {
                data = this.applyFilter(data, filter);
            }
        }
        if (q.sortBy) {
            data = this.applySort(data, q.sortBy, q.sortAsc ?? true);
        }
        if (q.offset) {
            data = data.slice(q.offset);
        }
        if (q.limit) {
            data = data.slice(0, q.limit);
        }
        return data;
    }
    applyFilter(data, filter) {
        return data.filter((item) => {
            const value = item[filter.field];
            switch (filter.operator) {
                case "eq":
                    return value === filter.value;
                case "ne":
                    return value !== filter.value;
                case "gt":
                    return value > filter.value;
                case "gte":
                    return value >= filter.value;
                case "lt":
                    return value < filter.value;
                case "lte":
                    return value <= filter.value;
                case "contains":
                    return String(value)
                        .toLowerCase()
                        .includes(String(filter.value).toLowerCase());
                case "startsWith":
                    return String(value)
                        .toLowerCase()
                        .startsWith(String(filter.value).toLowerCase());
                case "endsWith":
                    return String(value)
                        .toLowerCase()
                        .endsWith(String(filter.value).toLowerCase());
                default:
                    return true;
            }
        });
    }
    applySort(data, sortBy, asc) {
        return [...data].sort((a, b) => {
            const aVal = a[sortBy];
            const bVal = b[sortBy];
            if (aVal == null)
                return 1;
            if (bVal == null)
                return -1;
            const cmp = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
            return asc ? cmp : -cmp;
        });
    }
    addPending(op) {
        const pending = this.getStorage().get("_pending_ops") || [];
        pending.push(op);
        this.getStorage().set("_pending_ops", pending);
    }
    batchCreate(collection, items) {
        const data = this.getCollection(collection);
        const timestamp = Date.now();
        for (const item of items) {
            const entity = {
                ...item,
                created_at: timestamp,
                updated_at: timestamp,
            };
            data.push(entity);
        }
        this.saveCollection(collection, data);
    }
    batchDelete(collection, ids) {
        const data = this.getCollection(collection);
        const filtered = data.filter((item) => !ids.includes(item.id));
        this.saveCollection(collection, filtered);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: CrudService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: CrudService, providedIn: "root" });
};
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: CrudService$1, decorators: [{
            type: Injectable,
            args: [{ providedIn: "root" }]
        }] });

class EventBusService {
    handlers = new Map();
    toasts = signal([], ...(ngDevMode ? [{ debugName: "toasts" }] : []));
    pendingToasts = this.toasts.asReadonly();
    hasToasts = () => this.toasts().length > 0;
    emit(event, data) {
        const eventHandlers = this.handlers.get(event);
        if (eventHandlers) {
            eventHandlers.forEach((handler) => handler(data));
        }
    }
    on(event, handler, context) {
        if (!this.handlers.has(event)) {
            this.handlers.set(event, new Set());
        }
        const eventHandlers = this.handlers.get(event);
        const wrapped = context ? handler.bind(context) : handler;
        eventHandlers.add(wrapped);
        return () => this.off(event, wrapped);
    }
    once(event, handler, context) {
        const wrapped = (...args) => {
            this.off(event, wrapped);
            handler.apply(context, args);
        };
        return this.on(event, wrapped);
    }
    off(event, handler) {
        if (!handler) {
            this.handlers.delete(event);
            return;
        }
        const eventHandlers = this.handlers.get(event);
        if (eventHandlers) {
            eventHandlers.delete(handler);
            if (eventHandlers.size === 0) {
                this.handlers.delete(event);
            }
        }
    }
    offAll(event) {
        if (event) {
            this.handlers.delete(event);
        }
        else {
            this.handlers.clear();
        }
    }
    hasListeners(event) {
        const handlers = this.handlers.get(event);
        return handlers !== undefined && handlers.size > 0;
    }
    getListenerCount(event) {
        return this.handlers.get(event)?.size ?? 0;
    }
    generateId() {
        return `toast-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    }
    showToast(message, type, duration = 3000) {
        const notification = {
            id: this.generateId(),
            message,
            type: type ?? "info",
            duration,
        };
        this.toasts.update((t) => [...t, notification]);
        if (duration > 0) {
            setTimeout(() => this.dismissToast(notification.id), duration);
        }
        return notification.id;
    }
    success(message, duration = 3000) {
        return this.showToast(message, "success", duration);
    }
    error(message, duration = 3000) {
        return this.showToast(message, "error", duration);
    }
    warning(message, duration = 3000) {
        return this.showToast(message, "warning", duration);
    }
    info(message, duration = 3000) {
        return this.showToast(message, "info", duration);
    }
    dismissToast(id) {
        this.toasts.update((t) => t.filter((n) => n.id !== id));
    }
    dismissAllToasts() {
        this.toasts.set([]);
    }
    notify(notification) {
        const id = notification.id ?? this.generateId();
        this.toasts.update((t) => [...t, { ...notification, id }]);
        if (notification.duration > 0) {
            setTimeout(() => this.dismissToast(id), notification.duration);
        }
        return id;
    }
    getToast(id) {
        return this.toasts().find((t) => t.id === id);
    }
    clearHistory() {
        this.toasts.set([]);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: EventBusService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: EventBusService, providedIn: "root" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: EventBusService, decorators: [{
            type: Injectable,
            args: [{ providedIn: "root" }]
        }] });

class ComponentRegistryService {
    registry = new Map();
    componentManifest = {};
    _schemaComponents = new Map();
    _componentModules = new Map();
    constructor() {
        this.registerBuiltInComponents();
        this.loadComponentManifest();
    }
    registerBuiltInComponents() {
        // Built-in UI components
        const components = {
            // Layout
            header: { selector: "app-header" },
            footer: { selector: "app-footer" },
            sidebar: { selector: "app-sidebar" },
            "page-container": { selector: "app-page-container" },
            "page-toolbar": { selector: "app-page-toolbar" },
            "split-view": { selector: "app-split-view" },
            "main-editor": { selector: "app-main-editor" },
            // UI
            button: { selector: "app-button" },
            input: { selector: "app-input" },
            textarea: { selector: "app-textarea" },
            select: { selector: "app-select" },
            checkbox: { selector: "app-checkbox" },
            radio: { selector: "app-radio" },
            switch: { selector: "app-switch" },
            slider: { selector: "app-slider" },
            badge: { selector: "app-badge" },
            avatar: { selector: "app-avatar" },
            chip: { selector: "app-chip" },
            tabs: { selector: "app-tabs" },
            "empty-state": { selector: "app-empty-state" },
            loading: { selector: "app-loading" },
            "progress-bar": { selector: "app-progress-bar" },
            pagination: { selector: "app-pagination" },
            tooltip: { selector: "app-tooltip" },
            // Data
            card: { selector: "app-card" },
            "stats-card": { selector: "app-stats-card" },
            "table-view": { selector: "app-table-view" },
            "data-table": { selector: "app-data-table" },
            "json-view": { selector: "app-json-view" },
            "segment-selector": { selector: "app-segment-selector" },
            // Feedback
            dialog: { selector: "app-dialog" },
            "confirm-dialog": { selector: "app-confirm-dialog" },
            toast: { selector: "app-toast" },
            snackbar: { selector: "app-snackbar" },
            modal: { selector: "app-modal" },
            "command-palette": { selector: "app-command-palette" },
            // Grid
            "grid-container": { selector: "app-grid-container" },
            "grid-item": { selector: "app-grid-item" },
            "grid-area": { selector: "app-grid-area" },
            // Designer
            "designer-sidebar": { selector: "app-designer-sidebar" },
            "component-palette": { selector: "app-component-palette" },
            canvas: { selector: "app-canvas" },
            "canvas-toolbar": { selector: "app-canvas-toolbar" },
            "properties-panel": { selector: "app-properties-panel" },
            "bottom-panel": { selector: "app-bottom-panel" },
        };
        Object.entries(components).forEach(([id, def]) => {
            this.register(id, def);
        });
    }
    async loadComponentManifest() {
        try {
            const response = await fetch("/assets/component-manifest.json");
            if (response.ok) {
                this.componentManifest = await response.json();
            }
        }
        catch {
            // Manifest not found, use built-in registry only
        }
    }
    register(componentId, definition) {
        this.registry.set(componentId, definition);
    }
    unregister(componentId) {
        this.registry.delete(componentId);
    }
    get(componentId) {
        return this.registry.get(componentId);
    }
    getSelector(componentId) {
        const def = this.registry.get(componentId);
        if (!def) {
            console.warn(`ComponentRegistry: Unknown component "${componentId}", using fallback selector`);
            return `app-${componentId}`;
        }
        return def.selector;
    }
    has(componentId) {
        return this.registry.has(componentId);
    }
    resolveBehavior(componentId) {
        const def = this.registry.get(componentId);
        return def?.behaviors;
    }
    mergeBehavior(componentId, schemaBehavior) {
        const registered = this.resolveBehavior(componentId) ?? {};
        if (!schemaBehavior)
            return registered;
        return {
            selfMethods: { ...registered.selfMethods, ...schemaBehavior.selfMethods },
            classSetters: {
                ...registered.classSetters,
                ...schemaBehavior.classSetters,
            },
            eventHandlers: this.mergeEventHandlers(registered.eventHandlers, schemaBehavior.eventHandlers),
        };
    }
    mergeEventHandlers(base, override) {
        if (!base && !override)
            return undefined;
        if (!base)
            return override;
        if (!override)
            return base;
        const merged = { ...base };
        Object.entries(override).forEach(([event, handlers]) => {
            const existing = merged[event] ?? [];
            merged[event] = [...existing, ...handlers];
        });
        return merged;
    }
    getAllComponentIds() {
        return Array.from(this.registry.keys());
    }
    getComponentsByCategory(category) {
        // Filter components by category from manifest
        const manifest = this.componentManifest[category];
        if (!manifest)
            return [];
        return Object.keys(manifest);
    }
    // Schema-based component registration (delegated from schema-renderer/component-registry.ts)
    registerComponent(def) {
        this._schemaComponents.set(def.selector, def);
    }
    registerComponents(defs) {
        for (const def of defs) {
            this.registerComponent(def);
        }
    }
    getComponent(selector) {
        return this._schemaComponents.get(selector);
    }
    registerComponentModule(selector, module) {
        const modules = new Map(this._componentModules);
        modules.set(selector, module);
        this._componentModules = modules;
    }
    async loadComponentModule(selector) {
        const cached = this._componentModules.get(selector);
        if (cached) {
            const constructor = cached["default"];
            if (constructor)
                return constructor;
        }
        const def = this._schemaComponents.get(selector);
        if (!def) {
            throw new Error(`Component not found: ${selector}`);
        }
        const module = (await import(/* @vite-ignore */ def.selector));
        this.registerComponentModule(selector, module);
        const constructor = module["default"];
        if (!constructor) {
            throw new Error(`Module ${selector} does not export a default CustomElementConstructor`);
        }
        return constructor;
    }
    getComponentModules() {
        return this._componentModules;
    }
    loadComponentsFromSchema(pages) {
        const registry = new Map();
        for (const page of pages) {
            for (const comp of page.components || []) {
                registry.set(comp.selector, comp);
            }
        }
        this._schemaComponents = registry;
    }
    hasComponent(selector) {
        return this._schemaComponents.has(selector);
    }
    getRegisteredSelectors() {
        return Array.from(this._schemaComponents.keys());
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: ComponentRegistryService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: ComponentRegistryService, providedIn: "root" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: ComponentRegistryService, decorators: [{
            type: Injectable,
            args: [{ providedIn: "root" }]
        }], ctorParameters: () => [] });

class DataBindingResolverService {
    signalStore;
    crudService;
    _params = {};
    _functions = {};
    constructor(signalStore, crudService) {
        this.signalStore = signalStore;
        this.crudService = crudService;
    }
    setParams(params) {
        this._params = params;
    }
    registerFunction(name, fn) {
        this._functions[name] = fn;
    }
    registerFunctions(fns) {
        this._functions = { ...this._functions, ...fns };
    }
    resolveDataBinding(binding) {
        if (typeof binding === "string") {
            // Resolve {{functions.name(args)}} pattern
            const fnPattern = /\{\{functions\.([^}]+)\}\}/g;
            const fnResult = binding.replace(fnPattern, (_, callExpr) => {
                const value = this.resolveFunctionCall(callExpr);
                return value !== undefined ? String(value) : binding;
            });
            if (fnResult !== binding)
                return fnResult;
            // Resolve {{params.*}} pattern
            const paramsPattern = /\{\{params\.([^}]+)\}\}/g;
            const paramsResult = binding.replace(paramsPattern, (_, path) => {
                const value = this.resolveParamsPath(path);
                return value !== undefined ? String(value) : binding;
            });
            if (paramsResult !== binding)
                return paramsResult;
            // Resolve {{data.*}} pattern
            const dataPattern = /\{\{data\.([^}]+)\}\}/g;
            const dataResult = binding.replace(dataPattern, (_, path) => {
                const value = this.getDataBindingValue(path);
                return value !== undefined ? String(value) : binding;
            });
            return dataResult;
        }
        if (binding && typeof binding === "object" && "entity" in binding) {
            const db = binding;
            if (db.operation) {
                return this.executeCrudOperation(db);
            }
            const entityValue = this.signalStore.get(db.entity);
            if (db.field !== undefined) {
                return this.getNestedValue(entityValue, db.field);
            }
            return entityValue;
        }
        return binding;
    }
    resolveFunctionCall(callExpr) {
        // Parse "name(arg1, arg2)" or "name(arg1, 'string', key: value)"
        const match = callExpr.match(/^(\w+)\((.*)\)$/);
        if (!match) {
            // No args — treat as property access on functions registry
            return this._functions[callExpr];
        }
        const [, fnName, argsStr] = match;
        const fn = this._functions[fnName];
        if (typeof fn !== "function")
            return undefined;
        const args = this.parseCallArgs(argsStr);
        // Resolve each argument (may contain nested bindings)
        const resolvedArgs = args.map((arg) => this.resolveDataBinding(arg));
        return fn(...resolvedArgs);
    }
    parseCallArgs(argsStr) {
        if (!argsStr.trim())
            return [];
        const result = [];
        let current = "";
        let depth = 0;
        let inString = false;
        let stringChar = "";
        for (const char of argsStr) {
            if ((char === '"' || char === "'") && !inString) {
                inString = true;
                stringChar = char;
                current += char;
            }
            else if (char === stringChar && inString) {
                inString = false;
                stringChar = "";
                current += char;
            }
            else if (char === "(" && !inString) {
                depth++;
                current += char;
            }
            else if (char === ")" && !inString) {
                depth--;
                current += char;
            }
            else if (char === "," && depth === 0 && !inString) {
                result.push(current.trim());
                current = "";
            }
            else {
                current += char;
            }
        }
        if (current.trim())
            result.push(current.trim());
        return result;
    }
    resolveParamsPath(path) {
        return this.getNestedValue(this._params, path);
    }
    resolveProps(props, _componentId) {
        const resolved = {};
        for (const [key, value] of Object.entries(props)) {
            resolved[key] = this.resolveDataBinding(value);
        }
        return resolved;
    }
    executeCrudOperation(binding) {
        const { entity, operation, params } = binding;
        const resolvedParams = this.resolveParams(params || {});
        switch (operation) {
            case "find": {
                const query = this.buildCrudQuery(resolvedParams);
                return this.crudService.query(entity, query);
            }
            case "create": {
                const item = resolvedParams;
                this.crudService.create(entity, item);
                return;
            }
            case "update": {
                const id = params["id"];
                this.crudService.update(entity, id, resolvedParams);
                return;
            }
            case "delete": {
                const id = params["id"];
                this.crudService.delete(entity, id);
                return;
            }
            default:
                return this.signalStore.get(entity);
        }
    }
    resolveParams(params) {
        const resolved = {};
        for (const [key, value] of Object.entries(params)) {
            resolved[key] = this.resolveDataBinding(value);
        }
        return resolved;
    }
    buildCrudQuery(params) {
        const query = {};
        if (params["filter"]) {
            query.filters = this.buildFilters(params["filter"]);
        }
        if (params["sortBy"]) {
            query.sortBy = params["sortBy"];
            query.sortAsc = params["sortAsc"] !== false;
        }
        if (params["limit"]) {
            query.limit = params["limit"];
        }
        if (params["offset"]) {
            query.offset = params["offset"];
        }
        return query;
    }
    buildFilters(filterObj) {
        const filters = [];
        for (const [field, value] of Object.entries(filterObj)) {
            filters.push({ field, operator: "eq", value });
        }
        return filters;
    }
    getDataBindingValue(path) {
        const parts = this.parseBindingPath(path);
        let current = this.signalStore.get(parts[0]);
        for (let i = 1; i < parts.length; i++) {
            if (current === null || current === undefined)
                return undefined;
            const part = parts[i];
            const arrayMatch = part.match(/^(\w+)\[(\d+)\]$/);
            if (arrayMatch) {
                const [, arrayKey, indexStr] = arrayMatch;
                const arr = this.getNestedValue(current, arrayKey);
                if (Array.isArray(arr)) {
                    const index = parseInt(indexStr, 10);
                    current = arr[index];
                }
                else {
                    current = undefined;
                }
            }
            else {
                current = this.getNestedValue(current, part);
            }
        }
        return current;
    }
    parseBindingPath(path) {
        const result = [];
        const regex = /([^\.]+)\[(\d+)\]|([^\.\[\]]+)/g;
        let match;
        while ((match = regex.exec(path)) !== null) {
            if (match[1] && match[2]) {
                result.push(`${match[1]}[${match[2]}]`);
            }
            else if (match[3]) {
                result.push(match[3]);
            }
        }
        return result;
    }
    getNestedValue(obj, key) {
        if (obj === null || obj === undefined)
            return undefined;
        if (typeof obj !== "object")
            return undefined;
        return obj[key];
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: DataBindingResolverService, deps: [{ token: SignalStoreService }, { token: CrudService$1 }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: DataBindingResolverService, providedIn: "root" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: DataBindingResolverService, decorators: [{
            type: Injectable,
            args: [{ providedIn: "root" }]
        }], ctorParameters: () => [{ type: SignalStoreService }, { type: CrudService$1 }] });

class LayoutEngineService {
    injector = inject(Injector);
    resolveClass(layout) {
        if (layout.class)
            return layout.class;
        const classes = [];
        if (layout.type === "grid") {
            classes.push("grid");
            if (layout.direction === "row")
                classes.push("grid-flow-col");
            else
                classes.push("grid-flow-row");
            if (layout.gap)
                classes.push(`gap-${layout.gap}`);
            if (layout.rowGap)
                classes.push(`gap-y-${layout.rowGap}`);
            if (layout.colGap)
                classes.push(`gap-x-${layout.colGap}`);
            if (layout.alignItems) {
                const map = {
                    start: "items-start",
                    center: "items-center",
                    end: "items-end",
                    stretch: "items-stretch",
                    baseline: "items-baseline",
                };
                if (map[layout.alignItems])
                    classes.push(map[layout.alignItems]);
            }
            if (layout.justifyItems) {
                const map = {
                    start: "justify-items-start",
                    center: "justify-items-center",
                    end: "justify-items-end",
                    stretch: "justify-items-stretch",
                };
                if (map[layout.justifyItems])
                    classes.push(map[layout.justifyItems]);
            }
        }
        else if (layout.type === "flex") {
            classes.push("flex");
            if (layout.direction === "column")
                classes.push("flex-col");
            else
                classes.push("flex-row");
            if (layout.gap)
                classes.push(`gap-${layout.gap}`);
            if (layout.rowGap)
                classes.push(`gap-y-${layout.rowGap}`);
            if (layout.colGap)
                classes.push(`gap-x-${layout.colGap}`);
            if (layout.flexWrap === "wrap")
                classes.push("flex-wrap");
            else if (layout.flexWrap === "nowrap")
                classes.push("flex-nowrap");
            else if (layout.flexWrap === "wrap-reverse")
                classes.push("flex-wrap-reverse");
            if (layout.flexGrow === true)
                classes.push("flex-grow");
            else if (layout.flexGrow === false)
                classes.push("flex-grow-0");
            if (layout.flexShrink === true)
                classes.push("flex-shrink");
            else if (layout.flexShrink === false)
                classes.push("flex-shrink-0");
            if (layout.alignItems) {
                const map = {
                    start: "items-start",
                    center: "items-center",
                    end: "items-end",
                    stretch: "items-stretch",
                    baseline: "items-baseline",
                };
                if (map[layout.alignItems])
                    classes.push(map[layout.alignItems]);
            }
            if (layout.alignContent) {
                const map = {
                    start: "content-start",
                    center: "content-center",
                    end: "content-end",
                    between: "content-between",
                    around: "content-around",
                    evenly: "content-evenly",
                };
                if (map[layout.alignContent])
                    classes.push(map[layout.alignContent]);
            }
        }
        else if (layout.type === "stack") {
            classes.push("flex");
            classes.push("flex-col");
            if (layout.gap)
                classes.push(`gap-${layout.gap}`);
            if (layout.rowGap)
                classes.push(`gap-y-${layout.rowGap}`);
        }
        // Common sizing
        if (layout.width === "full")
            classes.push("w-full");
        else if (layout.width === "auto")
            classes.push("w-auto");
        if (layout.height === "full")
            classes.push("h-full");
        else if (layout.height === "auto")
            classes.push("h-auto");
        // Margin X (auto for centering)
        if (layout.marginX === "auto")
            classes.push("mx-auto");
        return classes.join(" ");
    }
    /**
     * Applies theme CSS custom properties to a layout container element.
     * Uses ThemeService to get the current accent color and computed shades,
     * then sets them as inline CSS variables on the container.
     */
    applyThemeVariables(container) {
        const ts = this.injector.get(StyleThemeService, null);
        if (!ts)
            return;
        const root = document.documentElement;
        const accent = ts.accentColor();
        // Copy theme CSS variables from root to the container
        // This ensures layout containers have explicit theme values even if
        // they are inside shadow DOM or have custom styling contexts
        const themeVars = [
            "--text-primary",
            "--text-secondary",
            "--text-muted",
            "--bg-primary",
            "--bg-elevated",
            "--bg-hover",
            "--bg-tertiary",
            "--border-color",
            "--error",
            "--warning",
            "--success",
            "--info",
            "--accent",
        ];
        for (const varName of themeVars) {
            const value = root.style.getPropertyValue(varName);
            if (value) {
                container.style.setProperty(varName, value);
            }
        }
        // Apply accent shades if available
        const shades = ts?.accentShades?.();
        if (shades) {
            for (const [key, value] of Object.entries(shades)) {
                container.style.setProperty(`--accent-${key}`, value);
            }
        }
    }
    renderGridLayout(container, layout) {
        container.style.display = "grid";
        const layoutClasses = this.resolveClass(layout);
        if (layoutClasses) {
            container.className = layoutClasses;
        }
        else {
            const classes = ["grid"];
            if (layout.direction === "row")
                classes.push("grid-flow-col");
            else
                classes.push("grid-flow-row");
            if (layout.gap)
                classes.push(`gap-${layout.gap}`);
            container.className = classes.join(" ");
        }
        if (layout.gridTemplateColumns) {
            container.style.gridTemplateColumns = layout.gridTemplateColumns;
        }
        if (layout.gridTemplateRows) {
            container.style.gridTemplateRows = layout.gridTemplateRows;
        }
        this.applyThemeVariables(container);
        if (layout.style) {
            Object.assign(container.style, layout.style);
        }
        container.innerHTML = "";
    }
    renderFlexLayout(container, layout) {
        container.style.display = "flex";
        const layoutClasses = this.resolveClass(layout);
        if (layoutClasses) {
            container.className = layoutClasses;
        }
        else {
            const classes = ["flex"];
            if (layout.direction === "column")
                classes.push("flex-col");
            else
                classes.push("flex-row");
            if (layout.gap)
                classes.push(`gap-${layout.gap}`);
            container.className = classes.join(" ");
        }
        this.applyThemeVariables(container);
        if (layout.style) {
            Object.assign(container.style, layout.style);
        }
        container.innerHTML = "";
    }
    resolveGridPosition(layout, componentId) {
        if (!layout || !layout.positions)
            return null;
        const pos = layout.positions.find((p) => p[componentId] !== undefined);
        if (!pos)
            return null;
        const position = pos;
        return {
            column: position.column || 1,
            row: position.row || 1,
            colSpan: position.colSpan || 1,
            rowSpan: position.rowSpan || 1,
        };
    }
    resolveGridPositionFromPositions(positions, componentId) {
        if (!positions)
            return null;
        const pos = positions.find((p) => p[componentId] !== undefined);
        if (!pos)
            return null;
        const position = pos;
        return {
            column: position.column || 1,
            row: position.row || 1,
            colSpan: position.colSpan || 1,
            rowSpan: position.rowSpan || 1,
        };
    }
    calculateGridSpan(colSpan, rowSpan) {
        return {
            gridColumn: `1 / span ${colSpan || 1}`,
            gridRow: `1 / span ${rowSpan || 1}`,
        };
    }
    async applyLayoutStyles(container, layout, children, getComponentById, resolvePosition) {
        if (layout.children) {
            for (const childId of layout.children) {
                const component = getComponentById(childId);
                if (component) {
                    const selector = component.selector;
                    // Wait for custom element to be defined if it's a custom element
                    if (selector.includes("-")) {
                        try {
                            await Promise.race([
                                customElements.whenDefined(selector),
                                new Promise((_, reject) => setTimeout(() => reject(new Error(`Timeout: ${selector}`)), 2000)),
                            ]);
                        }
                        catch (e) {
                            console.warn(`[LayoutEngine] Element not ready: ${selector}`, e);
                        }
                    }
                    const el = document.createElement(selector);
                    const position = resolvePosition(layout, childId);
                    if (position) {
                        el.style.gridColumn = `${position.column} / span ${position.colSpan || 1}`;
                        el.style.gridRow = `${position.row} / span ${position.rowSpan || 1}`;
                    }
                    container.appendChild(el);
                }
            }
        }
    }
    createGridTemplateString(columns, rows) {
        return {
            gridTemplateColumns: columns.join(" "),
            gridTemplateRows: rows.join(" "),
        };
    }
    parseGridTemplate(template) {
        return {
            gridTemplateColumns: template.columns.join(" "),
            gridTemplateRows: template.rows.join(" "),
            gap: template.gap,
        };
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: LayoutEngineService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: LayoutEngineService, providedIn: "root" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: LayoutEngineService, decorators: [{
            type: Injectable,
            args: [{ providedIn: "root" }]
        }] });

class SchemaRendererService {
    dataStore;
    crudService;
    eventBus;
    componentRegistry;
    dataBindingResolver;
    layoutEngine;
    i18n;
    _pages = signal([], ...(ngDevMode ? [{ debugName: "_pages" }] : []));
    _currentPageId = signal(null, ...(ngDevMode ? [{ debugName: "_currentPageId" }] : []));
    _navigationStack = signal([], ...(ngDevMode ? [{ debugName: "_navigationStack" }] : []));
    _appConfig = {};
    constructor(dataStore, crudService, eventBus, componentRegistry, dataBindingResolver, layoutEngine, i18n) {
        this.dataStore = dataStore;
        this.crudService = crudService;
        this.eventBus = eventBus;
        this.componentRegistry = componentRegistry;
        this.dataBindingResolver = dataBindingResolver;
        this.layoutEngine = layoutEngine;
        this.i18n = i18n;
    }
    componentResolver = null;
    routeResolver = null;
    // Schema-level handlers and stores
    _handlers = {};
    _stores = {};
    _layoutRegions = signal([], ...(ngDevMode ? [{ debugName: "_layoutRegions" }] : []));
    _currentRoute = signal("", ...(ngDevMode ? [{ debugName: "_currentRoute" }] : []));
    pages = this._pages.asReadonly();
    currentPageId = this._currentPageId.asReadonly();
    layoutRegions = this._layoutRegions.asReadonly();
    registerComponent(def) {
        this.componentRegistry.registerComponent(def);
    }
    registerComponents(defs) {
        this.componentRegistry.registerComponents(defs);
    }
    getComponent(selector) {
        return this.componentRegistry.getComponent(selector);
    }
    loadSchema(schema) {
        console.log("[SchemaRenderer] loadSchema() called, pages:", schema?.pages?.length ?? 0);
        // Support both AppSchema and legacy Page[] format
        const pages = schema.pages;
        this._pages.set(pages || []);
        this.componentRegistry.loadComponentsFromSchema(pages || []);
        // Extract app config
        const appConfig = "app" in schema
            ? schema.app
            : "app" in schema
                ? schema.app
                : undefined;
        this._appConfig = {
            variant: appConfig?.variant,
            size: appConfig?.size,
        };
        // Initialize locale from schema settings
        const settings = appConfig && "settings" in appConfig
            ? appConfig.settings
            : undefined;
        if (settings?.defaultLocale) {
            this.i18n.setLocale(settings.defaultLocale);
        }
        // Extract layout regions (AppSchema only)
        if ("layoutRegions" in schema && Array.isArray(schema.layoutRegions)) {
            this._layoutRegions.set(schema.layoutRegions);
        }
        else {
            this._layoutRegions.set([]);
        }
        // Extract handlers (AppSchema only)
        if ("handlers" in schema && schema.handlers) {
            this._handlers = schema.handlers;
        }
        // Extract stores (AppSchema only)
        if ("stores" in schema && schema.stores) {
            this._stores = schema.stores;
            // Register stores in data store
            for (const [key, value] of Object.entries(schema.stores)) {
                this.dataStore.set(key, value);
            }
        }
    }
    setCurrentRoute(route) {
        this._currentRoute.set(route);
        this.dataBindingResolver.setParams({});
    }
    setParams(params) {
        this.dataBindingResolver.setParams(params);
    }
    registerFunction(name, fn) {
        this.dataBindingResolver.registerFunction(name, fn);
    }
    registerFunctions(fns) {
        this.dataBindingResolver.registerFunctions(fns);
    }
    getLayoutRegions() {
        return this._layoutRegions();
    }
    isElementVisible(element) {
        const route = this._currentRoute();
        // Check explicit visible prop
        if (element.visible !== undefined) {
            if (typeof element.visible === "boolean") {
                return element.visible;
            }
            // visible: { when: "{{role}}", equals: "admin" }
            if (typeof element.visible === "object" && element.visible.when) {
                // Simple equality check for now
                const binding = element.visible.when;
                const expected = element.visible.equals;
                // TODO: Implement proper data binding resolution
                const current = this.dataBindingResolver.resolveProps({ value: binding }, "");
                return current["value"] === expected;
            }
        }
        // Check route visibility
        if (element.routes) {
            const { include, exclude } = element.routes;
            // If include is set and doesn't contain "*" or current route, hide
            if (include &&
                include.length > 0 &&
                !include.includes("*") &&
                !include.some((r) => route.match(new RegExp(r.replace("*", ".*"))))) {
                return false;
            }
            // If exclude contains current route, hide
            if (exclude &&
                exclude.some((r) => route.match(new RegExp(r.replace("*", ".*"))))) {
                return false;
            }
        }
        return true;
    }
    getCurrentPage() {
        const id = this._currentPageId();
        if (!id)
            return null;
        return this._pages().find((p) => p.id === id) || null;
    }
    setCurrentPage(pageId) {
        this._currentPageId.set(pageId);
        const stack = [...this._navigationStack()];
        if (stack[stack.length - 1] !== pageId) {
            stack.push(pageId);
            this._navigationStack.set(stack);
        }
    }
    navigateToPage(route) {
        const resolvedPageId = this.routeResolver
            ? this.routeResolver(route)
            : null;
        if (resolvedPageId) {
            this.setCurrentPage(resolvedPageId);
        }
    }
    getNavigationStack() {
        return [...this._navigationStack()];
    }
    setRouteResolver(resolver) {
        this.routeResolver = resolver;
    }
    async renderGridLayout(container, layout) {
        this.layoutEngine.renderGridLayout(container, layout);
        await this.layoutEngine.applyLayoutStyles(container, layout, layout.children || [], (childId) => this.getCurrentPage()?.components?.find((c) => c.id === childId), (l, childId) => this.layoutEngine.resolveGridPosition(l, childId));
    }
    async renderFlexLayout(container, layout) {
        this.layoutEngine.renderFlexLayout(container, layout);
        container.innerHTML = "";
        if (layout.children) {
            for (const childId of layout.children) {
                const component = this.getCurrentPage()?.components?.find((c) => c.id === childId);
                if (component) {
                    const selector = component.selector;
                    // Wait for custom element to be defined if it's a custom element
                    if (selector.includes("-")) {
                        try {
                            await Promise.race([
                                customElements.whenDefined(selector),
                                new Promise((_, reject) => setTimeout(() => reject(new Error(`Timeout: ${selector}`)), 2000)),
                            ]);
                        }
                        catch (e) {
                            console.warn(`[SchemaRenderer] Element not ready: ${selector}`, e);
                        }
                    }
                    const el = document.createElement(selector);
                    container.appendChild(el);
                }
            }
        }
    }
    async loadComponentModule(selector) {
        return this.componentRegistry.loadComponentModule(selector);
    }
    registerComponentModule(selector, module) {
        this.componentRegistry.registerComponentModule(selector, module);
    }
    resolveGridPosition(layoutId, componentId) {
        const page = this.getCurrentPage();
        if (!page)
            return null;
        const layout = page.layouts.find((l) => l.id === layoutId);
        return this.layoutEngine.resolveGridPosition(layout, componentId);
    }
    resolveClass(layout) {
        return this.layoutEngine.resolveClass(layout);
    }
    /**
     * Resolves responsive grid position based on current window width.
     * Merges breakpoint overrides (sm, md, lg) into base position.
     */
    resolveResponsiveGridPosition(pos) {
        if (!pos.sm && !pos.md && !pos.lg)
            return pos;
        const width = window.innerWidth;
        if (width < 640 && pos.sm)
            return { ...pos, ...pos.sm };
        if (width < 1024 && pos.md)
            return { ...pos, ...pos.md };
        if (pos.lg)
            return { ...pos, ...pos.lg };
        return pos;
    }
    getComponentProps(componentId) {
        const page = this.getCurrentPage();
        if (!page)
            return {};
        const component = (page.components ?? []).find((c) => c.id === componentId);
        return component?.props || {};
    }
    generatePage(pageId) {
        const page = this._pages().find((p) => p.id === pageId);
        if (!page)
            return { layouts: [], components: [] };
        return {
            layouts: page.layouts,
            components: page.components || [],
        };
    }
    setComponentResolver(resolver) {
        this.componentResolver = resolver;
    }
    async createElement(data) {
        const selector = data.componentId;
        // Try to get component definition from registry
        const def = this.componentResolver
            ? this.componentResolver(selector)
            : this.getComponent(selector);
        // Determine final selector (use def.selector if available, otherwise use selector)
        const finalSelector = def?.selector ?? selector;
        // Wait for custom element to be defined if it's a custom element
        if (finalSelector.includes("-")) {
            try {
                await Promise.race([
                    customElements.whenDefined(finalSelector),
                    new Promise((_, reject) => setTimeout(() => reject(new Error(`Timeout: ${finalSelector}`)), 2000)),
                ]);
            }
            catch (e) {
                console.warn(`[SchemaRenderer] Element not ready: ${finalSelector}`, e);
            }
        }
        // Create the element
        const el = document.createElement(finalSelector);
        // Apply grid position
        if (data.gridPosition) {
            const resolved = this.resolveResponsiveGridPosition(data.gridPosition);
            el.style.gridColumn = `${resolved.column} / span ${resolved.colSpan || 1}`;
            el.style.gridRow = `${resolved.row} / span ${resolved.rowSpan || 1}`;
        }
        else if (data.position) {
            el.style.position = "absolute";
            el.style.left = `${data.position.x}px`;
            el.style.top = `${data.position.y}px`;
            el.style.width = `${data.position.width}px`;
            el.style.height = `${data.position.height}px`;
        }
        if (data.zIndex) {
            el.style.zIndex = `${data.zIndex}`;
        }
        // Get mapped classes from props (variant, size, etc.)
        const theme = getCurrentStyle();
        const globalContext = {
            variant: this._appConfig.variant || theme,
            size: this._appConfig.size,
        };
        const explicitVariant = data.props?.["variant"];
        const explicitSize = data.props?.["size"];
        const mappedClasses = this.mapPropsToClasses(data.componentId, data.props ?? {}, theme, explicitVariant, explicitSize, globalContext);
        const mappedClassStr = mappedClasses.join(" ");
        const resolvedClasses = this.resolveClasses(data.classes ?? "", def?.defaultClasses || "");
        const finalClasses = mappedClassStr
            ? this.resolveClasses(resolvedClasses, mappedClassStr)
            : resolvedClasses;
        // Use setAttribute instead of className for Lit shadow DOM compatibility
        if (finalClasses) {
            el.setAttribute("class", finalClasses);
        }
        // Merge default values, then def.props, then data.props (data.props wins)
        const mergedProps = {
            ...(data.defaults || {}),
            ...(def?.props || {}),
            ...data.props,
        };
        const resolvedProps = this.dataBindingResolver.resolveProps(mergedProps, data.id);
        // Handle text / i18nKey / label props
        // i18nKey takes precedence over text, text takes precedence over label
        const i18nKey = resolvedProps["i18nKey"];
        const textValue = resolvedProps["text"];
        const labelValue = resolvedProps["label"];
        if (i18nKey !== undefined) {
            el["label"] = this.i18n.t(String(i18nKey));
        }
        else if (textValue !== undefined) {
            // Native HTML elements get textContent; custom elements get label property
            const isCustom = el.tagName.includes("-");
            if (isCustom) {
                el["label"] = String(textValue);
            }
            else {
                el.textContent = String(textValue);
            }
        }
        else if (labelValue !== undefined) {
            el["label"] = String(labelValue);
        }
        // Handle placeholder_i18n prop: resolve via I18nService and set as placeholder
        const placeholderI18n = resolvedProps["placeholder_i18n"];
        if (placeholderI18n !== undefined) {
            el["placeholder"] = this.i18n.t(String(placeholderI18n));
        }
        for (const [key, value] of Object.entries(resolvedProps)) {
            if (key === "class" ||
                key === "style" ||
                key === "id" ||
                key === "label" ||
                key === "text" ||
                key === "i18nKey" ||
                key === "placeholder_i18n")
                continue;
            if (key.startsWith("on") && typeof value === "function") {
                const eventName = key[2].toLowerCase() + key.slice(3);
                el.addEventListener(eventName, value);
            }
            else if (key === "disabled" ||
                key === "checked" ||
                key === "readonly") {
                // Boolean properties: set as property for Lit compatibility
                el[key] = value === true || value === "true" || value === key;
            }
            else {
                // Use property assignment for component inputs
                // Skip props that don't exist as inputs to avoid NG0303 errors
                if (el[key] === undefined) {
                    continue;
                }
                let finalValue = value;
                if (value !== null &&
                    typeof value === "object" &&
                    !Array.isArray(value)) {
                    finalValue = JSON.stringify(value);
                }
                else if (Array.isArray(value)) {
                    finalValue = JSON.stringify(value);
                }
                try {
                    el[key] = finalValue;
                }
                catch (e) {
                    // Skip properties that can't be set
                }
            }
        }
        el.dataset["elementId"] = data.id;
        el.dataset["componentId"] = data.componentId;
        if (data.dataBinding) {
            el.dataset["dataEntity"] = data.dataBinding.entity;
            if (data.dataBinding.field) {
                el.dataset["dataField"] = data.dataBinding.field;
            }
        }
        if (data.events) {
            for (const [eventName, handlers] of Object.entries(data.events)) {
                el.addEventListener(eventName, (e) => {
                    // handlers can be string, function, or array of {handler, params?}
                    const handlerList = Array.isArray(handlers) ? handlers : [handlers];
                    for (const h of handlerList) {
                        if (typeof h === "function") {
                            this.eventBus.emit(eventName, { elementId: data.id, event: e });
                        }
                        else if (typeof h === "string") {
                            // Emit a descriptive event name: "elementId:eventName"
                            this.eventBus.emit(`${data.id}:${eventName}`, {
                                elementId: data.id,
                                event: e,
                            });
                        }
                        else if (typeof h === "object" && h !== null && "handler" in h) {
                            // Schema format: { handler: "onShortcutsOpen", params?: ... }
                            this.eventBus.emit(`${data.id}:${h.handler}`, {
                                elementId: data.id,
                                event: e,
                            });
                        }
                    }
                });
            }
        }
        return el;
    }
    async render(container, pageSchema, currentRoute) {
        console.log(`[SchemaRenderer] render() called: page="${pageSchema?.name}", elements=${pageSchema?.elements?.length ?? 0}, currentRoute="${currentRoute}"`);
        container.innerHTML = "";
        // Update current route for visibility checks
        if (currentRoute) {
            this.setCurrentRoute(currentRoute);
        }
        if (pageSchema.gridTemplate) {
            const template = this.layoutEngine.parseGridTemplate(pageSchema.gridTemplate);
            container.style.display = "grid";
            container.style.gridTemplateColumns = template.gridTemplateColumns;
            container.style.gridTemplateRows = template.gridTemplateRows;
            container.style.gap = template.gap;
        }
        // Render root elements with their nested children
        for (const element of pageSchema.elements) {
            if (this.isElementVisible(element)) {
                const el = await this.createElement(element);
                if (el) {
                    // Recursively render nested children
                    await this.renderNestedChildren(el, element);
                    container.appendChild(el);
                }
            }
        }
    }
    async renderNestedChildren(parent, element) {
        if (!element.children || element.children.length === 0)
            return;
        for (const child of element.children) {
            if (this.isElementVisible(child)) {
                const childEl = await this.createElement(child);
                if (childEl) {
                    // Recursively render nested children
                    await this.renderNestedChildren(childEl, child);
                    parent.appendChild(childEl);
                }
            }
        }
    }
    // Render layout regions (header, footer, sidebar) to shell containers
    async renderLayoutRegion(container, regionId, currentRoute) {
        container.innerHTML = "";
        if (currentRoute) {
            this.setCurrentRoute(currentRoute);
        }
        const region = this._layoutRegions().find((r) => r.id === regionId);
        if (!region) {
            console.warn(`Layout region not found: ${regionId}`);
            return;
        }
        // Check visibility
        if (!this.isElementVisible(region)) {
            container.style.display = "none";
            return;
        }
        // Create the region element
        const el = await this.createElement(region);
        if (!el)
            return;
        // Render nested children directly
        if (region.children && region.children.length > 0) {
            for (const child of region.children) {
                if (this.isElementVisible(child)) {
                    const childEl = await this.createElement(child);
                    if (childEl) {
                        // Recursively render nested children
                        await this.renderNestedChildren(childEl, child);
                        el.appendChild(childEl);
                    }
                }
            }
        }
        container.appendChild(el);
    }
    bindEvents(el, events, elementId) {
        for (const [eventName, handler] of Object.entries(events)) {
            if (typeof handler === "function") {
                el.addEventListener(eventName, handler);
            }
            else if (typeof handler === "string") {
                const resolvedHandler = this.dataBindingResolver.resolveDataBinding(handler);
                if (typeof resolvedHandler === "string" &&
                    resolvedHandler.startsWith("{{data.")) {
                    const dataPath = resolvedHandler
                        .replace(/\{\{|\}\}/g, "")
                        .replace("data.", "");
                    const dataValue = this.getDataBindingValue(dataPath);
                    if (typeof dataValue === "function") {
                        el.addEventListener(eventName, dataValue);
                    }
                }
            }
        }
    }
    // Maps semantic props to theme CSS classes using global style registry
    // Supports:
    //   - styleName: named style lookup in componentStyles registry
    //   - layout: "flex" | "grid" → Tailwind flex/grid classes
    //   - direction: "row" | "col" → flex-direction
    //   - gap: "xs"|"sm"|"md"|"lg"|"xl" → gap spacing
    //   - align: "start"|"center"|"end"|"stretch" → align-items
    //   - justify: "start"|"center"|"end"|"between"|"around" → justify-content
    //   - padding: "none"|"xs"|"sm"|"md"|"lg"|"xl" → padding
    //   - marginTop|marginBottom: "none"|"xs"|"sm"|"md"|"lg"|"xl"
    //   - maxWidth: "sm"|"md"|"lg"|"xl"|"2xl"|... → max-width
    //   - mx: "auto" → mx-auto
    //   - fullHeight: true → h-full
    //   - rounded: true → rounded-lg
    //   - elevation: "low"|"medium"|"high" → elevation classes (theme-specific)
    mapPropsToClasses(componentId, props, theme, explicitVariant, explicitSize, globalContext) {
        const classes = [];
        if (!props)
            return classes;
        // 1. Named style from variant/size (explicit props OR globalContext fallback)
        const hasStyle = explicitVariant ||
            explicitSize ||
            globalContext?.variant ||
            globalContext?.size;
        if (hasStyle) {
            const classesStr = getComponentStyleClasses(theme, componentId, explicitVariant, explicitSize, globalContext);
            if (classesStr) {
                classes.push(...classesStr.split(" ").filter((c) => c.trim()));
            }
        }
        // 2. Layout type (flex/grid)
        const layout = props["layout"];
        if (layout === "flex")
            classes.push("flex");
        else if (layout === "grid")
            classes.push("grid");
        else if (layout === "stack")
            classes.push("flex", "flex-col");
        // 3. Flex direction
        const direction = props["direction"];
        if (direction === "row")
            classes.push("flex-row");
        else if (direction === "col")
            classes.push("flex-col");
        else if (direction === "row-reverse")
            classes.push("flex-row-reverse");
        else if (direction === "col-reverse")
            classes.push("flex-col-reverse");
        // 4. Gap spacing (supports both string tokens and numeric values)
        const gap = props["gap"];
        if (gap === "xs" || gap === 1)
            classes.push("gap-1");
        else if (gap === "sm" || gap === 2)
            classes.push("gap-2");
        else if (gap === "md" || gap === 3)
            classes.push("gap-3");
        else if (gap === "lg" || gap === 4)
            classes.push("gap-4");
        else if (gap === "xl" || gap === 6)
            classes.push("gap-6");
        else if (gap === "2xl" || gap === 8)
            classes.push("gap-8");
        // 5. Align items
        const align = props["align"];
        if (align === "start")
            classes.push("items-start");
        else if (align === "center")
            classes.push("items-center");
        else if (align === "end")
            classes.push("items-end");
        else if (align === "stretch")
            classes.push("items-stretch");
        // 6. Justify content
        const justify = props["justify"];
        if (justify === "start")
            classes.push("justify-start");
        else if (justify === "center")
            classes.push("justify-center");
        else if (justify === "end")
            classes.push("justify-end");
        else if (justify === "between")
            classes.push("justify-between");
        else if (justify === "around")
            classes.push("justify-around");
        // 7. Padding
        const padding = props["padding"];
        if (padding === "xs")
            classes.push("p-1");
        else if (padding === "sm")
            classes.push("p-2");
        else if (padding === "md")
            classes.push("p-4");
        else if (padding === "lg")
            classes.push("p-6");
        else if (padding === "xl")
            classes.push("p-8");
        // 8. Margin top/bottom
        const marginTop = props["marginTop"];
        if (marginTop === "xs")
            classes.push("mt-1");
        else if (marginTop === "sm")
            classes.push("mt-2");
        else if (marginTop === "md")
            classes.push("mt-4");
        else if (marginTop === "lg")
            classes.push("mt-6");
        else if (marginTop === "xl")
            classes.push("mt-8");
        const marginBottom = props["marginBottom"];
        if (marginBottom === "xs")
            classes.push("mb-1");
        else if (marginBottom === "sm")
            classes.push("mb-2");
        else if (marginBottom === "md")
            classes.push("mb-4");
        else if (marginBottom === "lg")
            classes.push("mb-6");
        else if (marginBottom === "xl")
            classes.push("mb-8");
        // 9. Max width
        const maxWidth = props["maxWidth"];
        if (maxWidth === "sm")
            classes.push("max-w-sm");
        else if (maxWidth === "md")
            classes.push("max-w-md");
        else if (maxWidth === "lg")
            classes.push("max-w-lg");
        else if (maxWidth === "xl")
            classes.push("max-w-xl");
        else if (maxWidth === "2xl")
            classes.push("max-w-2xl");
        else if (maxWidth === "3xl")
            classes.push("max-w-3xl");
        else if (maxWidth === "6xl")
            classes.push("max-w-6xl");
        else if (maxWidth === "7xl")
            classes.push("max-w-7xl");
        // 10. MX auto
        const mx = props["mx"];
        if (mx === "auto")
            classes.push("mx-auto");
        // 11. Full height
        const fullHeight = props["fullHeight"];
        if (fullHeight)
            classes.push("h-full");
        // 12. Rounded
        const rounded = props["rounded"];
        if (rounded)
            classes.push("rounded-lg");
        // 13. Columns (grid)
        const columns = props["columns"];
        if (columns) {
            // Support CSS grid column strings like "1fr auto 1fr"
            classes.push(`grid-cols-${columns.replace(/\s+/g, "-")}`);
        }
        // 14. Flex wrap
        const flexWrap = props["flexWrap"];
        if (flexWrap === "wrap")
            classes.push("flex-wrap");
        else if (flexWrap === "nowrap")
            classes.push("flex-nowrap");
        else if (flexWrap === "wrap-reverse")
            classes.push("flex-wrap-reverse");
        // 15. Flex grow
        const flexGrow = props["flexGrow"];
        if (flexGrow === true)
            classes.push("flex-grow");
        else if (flexGrow === false)
            classes.push("flex-grow-0");
        // 16. Flex shrink
        const flexShrink = props["flexShrink"];
        if (flexShrink === true)
            classes.push("flex-shrink");
        else if (flexShrink === false)
            classes.push("flex-shrink-0");
        // 17. Flex basis
        const flexBasis = props["flexBasis"];
        if (flexBasis === "auto")
            classes.push("basis-auto");
        else if (flexBasis === "full")
            classes.push("basis-full");
        else if (flexBasis === "half")
            classes.push("basis-1/2");
        else if (flexBasis === "third")
            classes.push("basis-1/3");
        else if (flexBasis === "quarter")
            classes.push("basis-1/4");
        // 18. Align items (container-level)
        const alignItems = props["alignItems"];
        if (alignItems === "start")
            classes.push("items-start");
        else if (alignItems === "center")
            classes.push("items-center");
        else if (alignItems === "end")
            classes.push("items-end");
        else if (alignItems === "stretch")
            classes.push("items-stretch");
        else if (alignItems === "baseline")
            classes.push("items-baseline");
        // 19. Align content (container-level, multi-row)
        const alignContent = props["alignContent"];
        if (alignContent === "start")
            classes.push("content-start");
        else if (alignContent === "center")
            classes.push("content-center");
        else if (alignContent === "end")
            classes.push("content-end");
        else if (alignContent === "between")
            classes.push("content-between");
        else if (alignContent === "around")
            classes.push("content-around");
        else if (alignContent === "evenly")
            classes.push("content-evenly");
        // 20. Justify items
        const justifyItems = props["justifyItems"];
        if (justifyItems === "start")
            classes.push("justify-items-start");
        else if (justifyItems === "center")
            classes.push("justify-items-center");
        else if (justifyItems === "end")
            classes.push("justify-items-end");
        else if (justifyItems === "stretch")
            classes.push("justify-items-stretch");
        // 21. Justify self (item-level)
        const justifySelf = props["justifySelf"];
        if (justifySelf === "start")
            classes.push("justify-self-start");
        else if (justifySelf === "center")
            classes.push("justify-self-center");
        else if (justifySelf === "end")
            classes.push("justify-self-end");
        else if (justifySelf === "stretch")
            classes.push("justify-self-stretch");
        else if (justifySelf === "auto")
            classes.push("justify-self-auto");
        // 22. Align self (item-level)
        const alignSelf = props["alignSelf"];
        if (alignSelf === "start")
            classes.push("self-start");
        else if (alignSelf === "center")
            classes.push("self-center");
        else if (alignSelf === "end")
            classes.push("self-end");
        else if (alignSelf === "stretch")
            classes.push("self-stretch");
        else if (alignSelf === "auto")
            classes.push("self-auto");
        // 23. Row gap (gap-y)
        const rowGap = props["rowGap"];
        if (rowGap === "xs")
            classes.push("gap-y-1");
        else if (rowGap === "sm")
            classes.push("gap-y-2");
        else if (rowGap === "md")
            classes.push("gap-y-4");
        else if (rowGap === "lg")
            classes.push("gap-y-6");
        else if (rowGap === "xl")
            classes.push("gap-y-8");
        // 24. Column gap (gap-x)
        const colGap = props["colGap"];
        if (colGap === "xs")
            classes.push("gap-x-1");
        else if (colGap === "sm")
            classes.push("gap-x-2");
        else if (colGap === "md")
            classes.push("gap-x-4");
        else if (colGap === "lg")
            classes.push("gap-x-6");
        else if (colGap === "xl")
            classes.push("gap-x-8");
        // 25. Width
        const width = props["width"];
        if (width === "full")
            classes.push("w-full");
        else if (width === "auto")
            classes.push("w-auto");
        else if (width === "screen")
            classes.push("w-screen");
        else if (width === "fit")
            classes.push("w-fit");
        // 26. Height
        const height = props["height"];
        if (height === "full")
            classes.push("h-full");
        else if (height === "auto")
            classes.push("h-auto");
        else if (height === "screen")
            classes.push("h-screen");
        else if (height === "fit")
            classes.push("h-fit");
        // 27. Margin X (mx)
        const marginX = props["marginX"];
        if (marginX === "auto")
            classes.push("mx-auto");
        else if (marginX === "xs")
            classes.push("mx-1");
        else if (marginX === "sm")
            classes.push("mx-2");
        else if (marginX === "md")
            classes.push("mx-4");
        else if (marginX === "lg")
            classes.push("mx-6");
        else if (marginX === "xl")
            classes.push("mx-8");
        // 28. Margin Y (my)
        const marginY = props["marginY"];
        if (marginY === "xs")
            classes.push("my-1");
        else if (marginY === "sm")
            classes.push("my-2");
        else if (marginY === "md")
            classes.push("my-4");
        else if (marginY === "lg")
            classes.push("my-6");
        else if (marginY === "xl")
            classes.push("my-8");
        // 29. Padding X (px)
        const paddingX = props["paddingX"];
        if (paddingX === "xs")
            classes.push("px-1");
        else if (paddingX === "sm")
            classes.push("px-2");
        else if (paddingX === "md")
            classes.push("px-4");
        else if (paddingX === "lg")
            classes.push("px-6");
        else if (paddingX === "xl")
            classes.push("px-8");
        // 30. Padding Y (py)
        const paddingY = props["paddingY"];
        if (paddingY === "xs")
            classes.push("py-1");
        else if (paddingY === "sm")
            classes.push("py-2");
        else if (paddingY === "md")
            classes.push("py-4");
        else if (paddingY === "lg")
            classes.push("py-6");
        else if (paddingY === "xl")
            classes.push("py-8");
        // 31. Responsive breakpoints (sm:, md:, lg:)
        const responsive = props["responsive"];
        if (responsive) {
            const gapMap = {
                xs: "1",
                sm: "2",
                md: "4",
                lg: "6",
                xl: "8",
            };
            // sm: breakpoint (640px+)
            if (responsive["sm"]) {
                const sm = responsive["sm"];
                if (sm["layout"] === "flex")
                    classes.push("sm:flex");
                if (sm["layout"] === "grid")
                    classes.push("sm:grid");
                if (sm["direction"] === "row")
                    classes.push("sm:flex-row");
                if (sm["direction"] === "col")
                    classes.push("sm:flex-col");
                if (sm["gap"] && gapMap[sm["gap"]])
                    classes.push(`sm:gap-${gapMap[sm["gap"]]}`);
                if (sm["align"] === "center")
                    classes.push("sm:items-center");
                if (sm["align"] === "start")
                    classes.push("sm:items-start");
                if (sm["align"] === "end")
                    classes.push("sm:items-end");
                if (sm["justify"] === "center")
                    classes.push("sm:justify-center");
                if (sm["justify"] === "start")
                    classes.push("sm:justify-start");
                if (sm["justify"] === "end")
                    classes.push("sm:justify-end");
                if (sm["flexWrap"] === "wrap")
                    classes.push("sm:flex-wrap");
                if (sm["padding"] === "md")
                    classes.push("sm:p-4");
                if (sm["padding"] === "lg")
                    classes.push("sm:p-6");
            }
            // md: breakpoint (768px+)
            if (responsive["md"]) {
                const md = responsive["md"];
                if (md["layout"] === "flex")
                    classes.push("md:flex");
                if (md["layout"] === "grid")
                    classes.push("md:grid");
                if (md["direction"] === "row")
                    classes.push("md:flex-row");
                if (md["direction"] === "col")
                    classes.push("md:flex-col");
                if (md["gap"] && gapMap[md["gap"]])
                    classes.push(`md:gap-${gapMap[md["gap"]]}`);
                if (md["align"] === "center")
                    classes.push("md:items-center");
                if (md["align"] === "start")
                    classes.push("md:items-start");
                if (md["align"] === "end")
                    classes.push("md:items-end");
                if (md["justify"] === "center")
                    classes.push("md:justify-center");
                if (md["justify"] === "start")
                    classes.push("md:justify-start");
                if (md["justify"] === "end")
                    classes.push("md:justify-end");
                if (md["justify"] === "between")
                    classes.push("md:justify-between");
                if (md["flexWrap"] === "wrap")
                    classes.push("md:flex-wrap");
                if (md["padding"] === "md")
                    classes.push("md:p-4");
                if (md["padding"] === "lg")
                    classes.push("md:p-6");
            }
            // lg: breakpoint (1024px+)
            if (responsive["lg"]) {
                const lg = responsive["lg"];
                if (lg["layout"] === "flex")
                    classes.push("lg:flex");
                if (lg["layout"] === "grid")
                    classes.push("lg:grid");
                if (lg["direction"] === "row")
                    classes.push("lg:flex-row");
                if (lg["direction"] === "col")
                    classes.push("lg:flex-col");
                if (lg["gap"] && gapMap[lg["gap"]])
                    classes.push(`lg:gap-${gapMap[lg["gap"]]}`);
                if (lg["align"] === "center")
                    classes.push("lg:items-center");
                if (lg["justify"] === "center")
                    classes.push("lg:justify-center");
                if (lg["justify"] === "between")
                    classes.push("lg:justify-between");
                if (lg["padding"] === "md")
                    classes.push("lg:p-4");
                if (lg["padding"] === "lg")
                    classes.push("lg:p-6");
            }
        }
        // 32. Text size
        const textSize = props["textSize"];
        if (textSize === "xs")
            classes.push("text-xs");
        else if (textSize === "sm")
            classes.push("text-sm");
        else if (textSize === "base")
            classes.push("text-base");
        else if (textSize === "lg")
            classes.push("text-lg");
        else if (textSize === "xl")
            classes.push("text-xl");
        else if (textSize === "2xl")
            classes.push("text-2xl");
        else if (textSize === "3xl")
            classes.push("text-3xl");
        // 33. Font weight
        const fontWeight = props["fontWeight"];
        if (fontWeight === "light")
            classes.push("font-light");
        else if (fontWeight === "normal")
            classes.push("font-normal");
        else if (fontWeight === "medium")
            classes.push("font-medium");
        else if (fontWeight === "semibold")
            classes.push("font-semibold");
        else if (fontWeight === "bold")
            classes.push("font-bold");
        // 34. Position
        const position = props["position"];
        if (position === "relative")
            classes.push("relative");
        else if (position === "absolute")
            classes.push("absolute");
        else if (position === "fixed")
            classes.push("fixed");
        else if (position === "sticky")
            classes.push("sticky");
        // 35. Z-index
        const zIndex = props["zIndex"];
        if (zIndex === 10 || zIndex === "10")
            classes.push("z-10");
        else if (zIndex === 20 || zIndex === "20")
            classes.push("z-20");
        else if (zIndex === 30 || zIndex === "30")
            classes.push("z-30");
        else if (zIndex === 40 || zIndex === "40")
            classes.push("z-40");
        else if (zIndex === 50 || zIndex === "50")
            classes.push("z-50");
        return classes;
    }
    resolveClasses(elementClasses, defaultClasses) {
        const classes = new Set();
        if (defaultClasses) {
            defaultClasses.split(" ").forEach((c) => classes.add(c));
        }
        if (elementClasses) {
            elementClasses
                .split(" ")
                .filter((c) => c.trim())
                .forEach((c) => classes.add(c));
        }
        return Array.from(classes).join(" ");
    }
    resolveDataBinding(binding) {
        return this.dataBindingResolver.resolveDataBinding(binding);
    }
    getDataBindingValue(path) {
        const parts = this.parseBindingPath(path);
        let current = this.dataStore.get(parts[0]);
        for (let i = 1; i < parts.length; i++) {
            if (current === null || current === undefined)
                return undefined;
            const part = parts[i];
            const arrayMatch = part.match(/^(\w+)\[(\d+)\]$/);
            if (arrayMatch) {
                const [, arrayKey, indexStr] = arrayMatch;
                const arr = this.getNestedValue(current, arrayKey);
                if (Array.isArray(arr)) {
                    const index = parseInt(indexStr, 10);
                    current = arr[index];
                }
                else {
                    current = undefined;
                }
            }
            else {
                current = this.getNestedValue(current, part);
            }
        }
        return current;
    }
    parseBindingPath(path) {
        const result = [];
        const regex = /([^\.]+)\[(\d+)\]|([^\.\[\]]+)/g;
        let match;
        while ((match = regex.exec(path)) !== null) {
            if (match[1] && match[2]) {
                result.push(`${match[1]}[${match[2]}]`);
            }
            else if (match[3]) {
                result.push(match[3]);
            }
        }
        return result;
    }
    getNestedValue(obj, key) {
        if (obj === null || obj === undefined)
            return undefined;
        if (typeof obj !== "object")
            return undefined;
        return obj[key];
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: SchemaRendererService, deps: [{ token: SignalStoreService }, { token: CrudService$1 }, { token: EventBusService }, { token: ComponentRegistryService }, { token: DataBindingResolverService }, { token: LayoutEngineService }, { token: I18nService }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: SchemaRendererService, providedIn: "root" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: SchemaRendererService, decorators: [{
            type: Injectable,
            args: [{ providedIn: "root" }]
        }], ctorParameters: () => [{ type: SignalStoreService }, { type: CrudService$1 }, { type: EventBusService }, { type: ComponentRegistryService }, { type: DataBindingResolverService }, { type: LayoutEngineService }, { type: I18nService }] });

/**
 * Context-based permission levels from TaskFlow pattern.
 */
var TodoPermission;
(function (TodoPermission) {
    TodoPermission["VIEWER"] = "viewer";
    TodoPermission["EDITOR"] = "editor";
    TodoPermission["MODERATOR"] = "moderator";
    TodoPermission["OWNER"] = "owner";
})(TodoPermission || (TodoPermission = {}));
class PermissionService {
    _currentUser = signal(null, ...(ngDevMode ? [{ debugName: "_currentUser" }] : []));
    _roles = signal([], ...(ngDevMode ? [{ debugName: "_roles" }] : []));
    _isAdmin = signal(false, ...(ngDevMode ? [{ debugName: "_isAdmin" }] : []));
    currentUser = this._currentUser.asReadonly();
    roles = this._roles.asReadonly();
    isAdmin = this._isAdmin.asReadonly();
    // ═══════════════════════════════════════════════════════════════════════
    // USER & ROLE MANAGEMENT
    // ═══════════════════════════════════════════════════════════════════════
    setUser(user) {
        this._currentUser.set(user);
    }
    setRoles(roles) {
        this._roles.set(roles);
    }
    setIsAdmin(isAdmin) {
        this._isAdmin.set(isAdmin);
    }
    // ═══════════════════════════════════════════════════════════════════════
    // ROLE MANAGEMENT (CRUD)
    // ═══════════════════════════════════════════════════════════════════════
    /**
     * Load roles from backend. Subclasses or consumers should override
     * with actual TauriBridge invocation.
     */
    async loadRoles() {
        return this._roles();
    }
    /**
     * Create a new role.
     */
    async createRole(name, description, permissions) {
        const role = {
            id: crypto.randomUUID(),
            name,
            description,
            permissions,
        };
        this._roles.update((roles) => [...roles, role]);
        return role;
    }
    /**
     * Update an existing role.
     */
    async updateRole(roleId, name, description, permissions) {
        let updatedRole;
        this._roles.update((roles) => roles.map((r) => {
            if (r.id === roleId) {
                updatedRole = { ...r, name, description, permissions };
                return updatedRole;
            }
            return r;
        }));
        if (!updatedRole) {
            throw new Error(`Role ${roleId} not found`);
        }
        return updatedRole;
    }
    /**
     * Delete a role by ID.
     */
    async deleteRole(roleId) {
        this._roles.update((roles) => roles.filter((r) => r.id !== roleId));
    }
    // ═══════════════════════════════════════════════════════════════════════
    // PERMISSION CHECKING (resource-action based)
    // ═══════════════════════════════════════════════════════════════════════
    /**
     * Check if current user has permission for a resource-action pair.
     * Supports wildcard "*" permission that grants all access.
     */
    hasPermission(resource, action) {
        const user = this._currentUser();
        if (!user)
            return false;
        if (this._isAdmin())
            return true;
        const roles = this._roles();
        for (const roleId of user.roles) {
            const role = roles.find((r) => r.id === roleId || r.name === roleId);
            if (!role)
                continue;
            if (role.permissions.some((p) => (p.resource === resource || p.resource === "*") &&
                (p.action === action || p.action === "*"))) {
                return true;
            }
        }
        return false;
    }
    /**
     * Check if current user can access a resource with optional field restrictions.
     */
    canAccess(resource, action, fields) {
        if (!this.hasPermission(resource, action))
            return false;
        if (!fields || fields.length === 0)
            return true;
        const user = this._currentUser();
        if (!user)
            return false;
        const roles = this._roles();
        for (const roleId of user.roles) {
            const role = roles.find((r) => r.id === roleId || r.name === roleId);
            if (!role)
                continue;
            const permission = role.permissions.find((p) => p.resource === resource && p.action === action);
            if (permission?.fields) {
                return fields.every((f) => permission.fields.includes(f));
            }
            return true;
        }
        return false;
    }
    /**
     * Check if current user has a specific role.
     */
    hasRole(roleId) {
        const user = this._currentUser();
        if (!user)
            return false;
        return user.roles.includes(roleId);
    }
    /**
     * Check if user is authenticated.
     */
    isAuthenticated() {
        return this._currentUser() !== null;
    }
    // ═══════════════════════════════════════════════════════════════════════
    // CONTEXT-BASED PERMISSION CHECKS (from TaskFlow pattern)
    // ═══════════════════════════════════════════════════════════════════════
    /**
     * Get the effective permission level for a user on a todo.
     * Based on TaskFlow's getTodoPermission logic.
     */
    getTodoPermission(context) {
        const { userId, assigneeRoles, visibility, ownerId } = context;
        if (ownerId === userId) {
            return TodoPermission.OWNER;
        }
        const role = assigneeRoles[userId];
        if (role) {
            return this.fromStr(role);
        }
        if (visibility === "public") {
            if (this._isAdmin()) {
                return TodoPermission.MODERATOR;
            }
            return TodoPermission.VIEWER;
        }
        if (visibility === "shared") {
            if (this._isAdmin()) {
                return TodoPermission.MODERATOR;
            }
        }
        return TodoPermission.VIEWER;
    }
    /**
     * Create a todo permission context object.
     */
    createTodoPermissionContext(params) {
        const effectivePermission = this.getTodoPermission({
            ...params,
            effectivePermission: TodoPermission.VIEWER,
        });
        return { ...params, effectivePermission };
    }
    /**
     * Convert role string to TodoPermission enum.
     */
    fromStr(role) {
        switch (role.toLowerCase()) {
            case "viewer":
                return TodoPermission.VIEWER;
            case "editor":
                return TodoPermission.EDITOR;
            case "admin":
            case "moderator":
                return TodoPermission.MODERATOR;
            case "owner":
                return TodoPermission.OWNER;
            default:
                return TodoPermission.VIEWER;
        }
    }
    /**
     * Check if user can edit todo fields (moderator or owner only).
     */
    canEditTodoFields(permission) {
        return [TodoPermission.MODERATOR, TodoPermission.OWNER].includes(permission);
    }
    /**
     * Check if user can delete a todo (owner only).
     */
    canDeleteTodo(permission) {
        return permission === TodoPermission.OWNER;
    }
    /**
     * Check if user can archive a todo (owner only).
     */
    canArchiveTodo(permission) {
        return permission === TodoPermission.OWNER;
    }
    /**
     * Check if user can manage assignees (moderator or owner).
     */
    canManageAssignees(permission) {
        return [TodoPermission.MODERATOR, TodoPermission.OWNER].includes(permission);
    }
    /**
     * Check if user can create tasks/subtasks/comments (editor+ or admin).
     */
    canCreateTask(permission) {
        if (this._isAdmin())
            return true;
        return [
            TodoPermission.EDITOR,
            TodoPermission.MODERATOR,
            TodoPermission.OWNER,
        ].includes(permission);
    }
    /**
     * Full permission check result for a todo context.
     */
    checkTodoPermissions(context) {
        const perm = context.effectivePermission;
        return {
            canView: true,
            canCreate: this.canCreateTask(perm),
            canEdit: this.canEditTodoFields(perm),
            canDelete: this.canDeleteTodo(perm),
            canArchive: this.canArchiveTodo(perm),
            canManageAssignees: this.canManageAssignees(perm),
            permissionLevel: perm,
        };
    }
    /**
     * Check if user can edit a specific entity based on ownership or permission level.
     */
    canEditEntity(entityOwnerId, permission, userId) {
        if ([TodoPermission.MODERATOR, TodoPermission.OWNER].includes(permission)) {
            return true;
        }
        if (permission === TodoPermission.EDITOR) {
            return entityOwnerId === userId;
        }
        return false;
    }
    /**
     * Check if user can delete a specific entity based on ownership or permission level.
     */
    canDeleteEntity(entityOwnerId, permission, userId) {
        return this.canEditEntity(entityOwnerId, permission, userId);
    }
    // ═══════════════════════════════════════════════════════════════════════
    // UTILITY METHODS
    // ═══════════════════════════════════════════════════════════════════════
    /**
     * Get available resources for permission configuration.
     */
    availableResources() {
        return [
            "users",
            "connections",
            "collections",
            "queries",
            "schemas",
            "settings",
        ];
    }
    /**
     * Get available actions for permission configuration.
     */
    availableActions() {
        return ["read", "write", "delete", "admin"];
    }
    /**
     * Clear all state (useful for logout).
     */
    clear() {
        this._currentUser.set(null);
        this._roles.set([]);
        this._isAdmin.set(false);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: PermissionService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: PermissionService, providedIn: "root" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: PermissionService, decorators: [{
            type: Injectable,
            args: [{ providedIn: "root" }]
        }] });

class GuardService {
    permissionService;
    constructor(permissionService) {
        this.permissionService = permissionService;
    }
    canActivate() {
        return Promise.resolve(this.permissionService.isAuthenticated());
    }
    canActivateWithConfig(config) {
        let result;
        switch (config.type) {
            case "auth":
                result = this.checkAuth();
                break;
            case "role":
                result = this.checkRole(config.role);
                break;
            case "permission":
                result = this.checkPermission(config.resource, config.action);
                break;
            case "admin":
                result = this.permissionService.isAdmin();
                break;
            default:
                result = true;
        }
        return Promise.resolve(result);
    }
    checkAuth() {
        return this.permissionService.isAuthenticated();
    }
    checkRole(roleId) {
        if (!roleId)
            return false;
        return this.permissionService.hasRole(roleId);
    }
    checkPermission(resource, action) {
        if (!resource || !action)
            return false;
        return this.permissionService.hasPermission(resource, action);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: GuardService, deps: [{ token: PermissionService }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: GuardService, providedIn: "root" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: GuardService, decorators: [{
            type: Injectable,
            args: [{ providedIn: "root" }]
        }], ctorParameters: () => [{ type: PermissionService }] });

class SchemaRouterService {
    guardService;
    constructor(guardService) {
        this.guardService = guardService;
    }
    _schema = signal(null, ...(ngDevMode ? [{ debugName: "_schema" }] : []));
    _currentPage = signal(null, ...(ngDevMode ? [{ debugName: "_currentPage" }] : []));
    _currentLayout = signal(null, ...(ngDevMode ? [{ debugName: "_currentLayout" }] : []));
    _currentRoute = signal("", ...(ngDevMode ? [{ debugName: "_currentRoute" }] : []));
    _params = signal({}, ...(ngDevMode ? [{ debugName: "_params" }] : []));
    _queryParams = signal({}, ...(ngDevMode ? [{ debugName: "_queryParams" }] : []));
    _isLoading = signal(false, ...(ngDevMode ? [{ debugName: "_isLoading" }] : []));
    _error = signal(null, ...(ngDevMode ? [{ debugName: "_error" }] : []));
    schema = this._schema.asReadonly();
    currentPage = this._currentPage.asReadonly();
    currentLayout = this._currentLayout.asReadonly();
    currentRoute = this._currentRoute.asReadonly();
    params = this._params.asReadonly();
    queryParams = this._queryParams.asReadonly();
    isLoading = this._isLoading.asReadonly();
    error = this._error.asReadonly();
    hasSchema = computed(() => this._schema() !== null, ...(ngDevMode ? [{ debugName: "hasSchema" }] : []));
    currentPageId = computed(() => this._currentPage()?.id ?? null, ...(ngDevMode ? [{ debugName: "currentPageId" }] : []));
    currentPageTitle = computed(() => this._currentPage()?.meta?.title ?? "", ...(ngDevMode ? [{ debugName: "currentPageTitle" }] : []));
    setSchema(schema) {
        console.log("[SchemaRouter] setSchema() called, pages:", schema?.pages?.length ?? 0, "layouts:", schema?.layouts?.length ?? 0);
        this._schema.set(schema);
        this._error.set(null);
    }
    clearSchema() {
        this._schema.set(null);
        this._currentPage.set(null);
        this._currentLayout.set(null);
        this._params.set({});
        this._queryParams.set({});
    }
    async navigate(route, options = {}) {
        this._isLoading.set(true);
        this._error.set(null);
        try {
            console.log(`[SchemaRouter] navigate("${route}") attempting...`);
            let matched = this.resolveRoute(route);
            if (!matched) {
                // Fall back to /404 page if route not found
                const notFoundPage = this.findReservedRoute("/404");
                if (notFoundPage) {
                    matched = { page: notFoundPage, layout: null, params: {} };
                }
            }
            if (!matched) {
                console.warn(`[SchemaRouter] navigate("${route}") - route NOT FOUND, falling back to /404`);
                this._error.set(`Route not found: ${route}`);
                return false;
            }
            const { page, params } = matched;
            // Run guards if configured
            if (page && this.guardService) {
                const pageGuards = page
                    .guards;
                if (pageGuards?.length) {
                    for (const guard of pageGuards) {
                        const allowed = await this.guardService.canActivateWithConfig(guard);
                        if (!allowed) {
                            this._error.set(`Navigation blocked by guard: ${guard.type}`);
                            return false;
                        }
                    }
                }
            }
            if (options.queryParams) {
                this._queryParams.set(options.queryParams);
            }
            this._currentRoute.set(route);
            this._params.set(params);
            if (page) {
                console.log(`[SchemaRouter] navigate("${route}") - SUCCESS, page="${page.name}", id="${page.id}"`);
                this._currentPage.set(page);
                // Load layout if specified
                if (page.layout && this._schema()) {
                    const layout = this._schema().layouts.find((l) => l.id === page.layout);
                    this._currentLayout.set(layout ?? null);
                    console.log(`[SchemaRouter] page "${page.name}" has layout="${page.layout}", found=${!!layout}`);
                }
                else {
                    this._currentLayout.set(null);
                    console.log(`[SchemaRouter] page "${page.name}" has NO layout`);
                }
            }
            return true;
        }
        catch (err) {
            this._error.set(err instanceof Error ? err.message : "Navigation failed");
            return false;
        }
        finally {
            this._isLoading.set(false);
        }
    }
    resolveRoute(route) {
        const schema = this._schema();
        if (!schema)
            return null;
        // Exact match first
        let page = schema.pages.find((p) => p.route === route || p.id === route);
        if (page) {
            return { page, layout: null, params: {} };
        }
        // Try pattern matching with params
        for (const p of schema.pages) {
            const { match, params } = this.matchRoute(p.route, route);
            if (match) {
                const layout = p.layout
                    ? (schema.layouts.find((l) => l.id === p.layout) ?? null)
                    : null;
                return { page: p, layout, params };
            }
        }
        return null;
    }
    matchRoute(pattern, path) {
        const patternParts = pattern.split("/").filter(Boolean);
        const pathParts = path.split("/").filter(Boolean);
        const params = {};
        if (patternParts.length !== pathParts.length) {
            return { match: false, params: {} };
        }
        for (let i = 0; i < patternParts.length; i++) {
            const p = patternParts[i];
            const a = pathParts[i];
            if (p.startsWith(":")) {
                // Parameter
                params[p.slice(1)] = a;
            }
            else if (p !== a) {
                return { match: false, params: {} };
            }
        }
        return { match: true, params };
    }
    findReservedRoute(route) {
        const schema = this._schema();
        if (!schema)
            return null;
        return schema.pages.find((p) => p.route === route) ?? null;
    }
    getPage(pageId) {
        const schema = this._schema();
        if (!schema)
            return null;
        return schema.pages.find((p) => p.id === pageId) ?? null;
    }
    getLayout(layoutId) {
        const schema = this._schema();
        if (!schema)
            return null;
        return schema.layouts.find((l) => l.id === layoutId) ?? null;
    }
    getAllPages() {
        return this._schema()?.pages ?? [];
    }
    getAllLayouts() {
        return this._schema()?.layouts ?? [];
    }
    updateQueryParams(params) {
        this._queryParams.set(params);
    }
    reset() {
        this._currentRoute.set("");
        this._currentPage.set(null);
        this._currentLayout.set(null);
        this._params.set({});
        this._queryParams.set({});
        this._isLoading.set(false);
        this._error.set(null);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: SchemaRouterService, deps: [{ token: GuardService, optional: true }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: SchemaRouterService, providedIn: "root" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: SchemaRouterService, decorators: [{
            type: Injectable,
            args: [{ providedIn: "root" }]
        }], ctorParameters: () => [{ type: GuardService, decorators: [{
                    type: Optional
                }] }] });

class SchemaElementComponent {
    renderer = inject(SchemaRendererService);
    element;
    elements = [];
    get componentType() {
        const type = SCHEMA_COMPONENT_MAP.get(this.tag);
        return type ?? null;
    }
    get tag() {
        return this.element.componentId;
    }
    get classes() {
        const base = this.element.classes ?? "";
        if (!this.element.props)
            return base;
        const theme = getCurrentStyle();
        const mapped = this.renderer.mapPropsToClasses(this.element.componentId, this.element.props, theme);
        const mappedStr = mapped.join(" ").trim();
        return mappedStr ? `${base} ${mappedStr}` : base;
    }
    get childElements() {
        return this.element.children ?? [];
    }
    get props() {
        return this.element.props ?? {};
    }
    get gridStyle() {
        const gp = this.element.gridPosition;
        if (!gp)
            return {};
        const style = {};
        const col = `${gp.column} / span ${gp.colSpan || 1}`;
        const row = `${gp.row} / span ${gp.rowSpan || 1}`;
        return { gridColumn: col, gridRow: row };
    }
    get isNativeHtml() {
        return [
            "div",
            "span",
            "h1",
            "h2",
            "h3",
            "p",
            "footer",
            "header",
            "section",
            "article",
            "main",
            "aside",
            "nav",
            "ul",
            "li",
            "a",
            "img",
            "label",
            "small",
            "strong",
            "em",
            "i",
            "b",
            "code",
            "pre",
            "blockquote",
            "figure",
            "figcaption",
        ].includes(this.tag);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: SchemaElementComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.25", type: SchemaElementComponent, isStandalone: true, selector: "app-schema-element", inputs: { element: "element", elements: "elements" }, ngImport: i0, template: "<div [id]=\"element.id\" [class]=\"classes\" [style]=\"gridStyle\">\n  @if (isNativeHtml && props[\"text\"]) {\n    <ng-container [ngSwitch]=\"tag\">\n      <h1 *ngSwitchCase=\"'h1'\">{{ props[\"text\"] }}</h1>\n      <h2 *ngSwitchCase=\"'h2'\">{{ props[\"text\"] }}</h2>\n      <p *ngSwitchCase=\"'p'\">{{ props[\"text\"] }}</p>\n      <footer *ngSwitchCase=\"'footer'\">{{ props[\"text\"] }}</footer>\n      <span *ngSwitchDefault>{{ props[\"text\"] }}</span>\n    </ng-container>\n  } @else if (componentType) {\n    <ng-container\n      *ngComponentOutlet=\"componentType; inputs: props\"\n    ></ng-container>\n  }\n  @for (child of childElements; track $index) {\n    <app-schema-element\n      [element]=\"child\"\n      [elements]=\"elements\"\n    ></app-schema-element>\n  }\n</div>\n", styles: [":host{display:contents}\n"], dependencies: [{ kind: "component", type: SchemaElementComponent, selector: "app-schema-element", inputs: ["element", "elements"] }, { kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1$1.NgComponentOutlet, selector: "[ngComponentOutlet]", inputs: ["ngComponentOutlet", "ngComponentOutletInputs", "ngComponentOutletInjector", "ngComponentOutletEnvironmentInjector", "ngComponentOutletContent", "ngComponentOutletNgModule", "ngComponentOutletNgModuleFactory"], exportAs: ["ngComponentOutlet"] }, { kind: "directive", type: i1$1.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { kind: "directive", type: i1$1.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { kind: "directive", type: i1$1.NgSwitchDefault, selector: "[ngSwitchDefault]" }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: SchemaElementComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-schema-element", standalone: true, imports: [CommonModule], template: "<div [id]=\"element.id\" [class]=\"classes\" [style]=\"gridStyle\">\n  @if (isNativeHtml && props[\"text\"]) {\n    <ng-container [ngSwitch]=\"tag\">\n      <h1 *ngSwitchCase=\"'h1'\">{{ props[\"text\"] }}</h1>\n      <h2 *ngSwitchCase=\"'h2'\">{{ props[\"text\"] }}</h2>\n      <p *ngSwitchCase=\"'p'\">{{ props[\"text\"] }}</p>\n      <footer *ngSwitchCase=\"'footer'\">{{ props[\"text\"] }}</footer>\n      <span *ngSwitchDefault>{{ props[\"text\"] }}</span>\n    </ng-container>\n  } @else if (componentType) {\n    <ng-container\n      *ngComponentOutlet=\"componentType; inputs: props\"\n    ></ng-container>\n  }\n  @for (child of childElements; track $index) {\n    <app-schema-element\n      [element]=\"child\"\n      [elements]=\"elements\"\n    ></app-schema-element>\n  }\n</div>\n", styles: [":host{display:contents}\n"] }]
        }], propDecorators: { element: [{
                type: Input,
                args: [{ required: true }]
            }], elements: [{
                type: Input,
                args: [{ required: true }]
            }] } });

class SchemaRouteViewerComponent {
    router;
    renderer;
    route = "";
    page = computed(() => {
        const p = this.router.currentPage();
        if (p) {
            console.log(`[SchemaRouteViewer] page() computed: id="${p.id}", name="${p.name}", canvasElements=${p.canvasElements?.length ?? 0}, layouts=${p.layouts?.length ?? 0}`);
        }
        return p;
    }, ...(ngDevMode ? [{ debugName: "page" }] : []));
    /** CSS grid properties to apply via ngStyle */
    gridStyles = computed(() => {
        const p = this.page();
        const layout = p?.layouts?.[0];
        if (!layout)
            return {};
        // For "stack" layouts, use flex column
        if (layout.type === "stack") {
            return { display: "flex", "flex-direction": "column" };
        }
        // For "flex" layouts
        if (layout.type === "flex") {
            const styles = { display: "flex" };
            styles["flex-direction"] =
                layout.direction === "column" ? "column" : "row";
            if (layout.gap)
                styles.gap = `${layout.gap * 0.25}rem`;
            if (layout.flexWrap)
                styles["flex-wrap"] = layout.flexWrap;
            return styles;
        }
        // For "grid" layouts
        const styles = { display: "grid" };
        // Normalize gridTemplateColumns: "12" → "repeat(12, 1fr)"
        if (layout.gridTemplateColumns) {
            const val = layout.gridTemplateColumns;
            if (/^\d+$/.test(val)) {
                styles["grid-template-columns"] = `repeat(${val}, 1fr)`;
            }
            else {
                styles["grid-template-columns"] = val;
            }
        }
        // Normalize gridTemplateRows: "6" → "repeat(6, auto)"
        if (layout.gridTemplateRows) {
            const val = layout.gridTemplateRows;
            if (/^\d+$/.test(val)) {
                styles["grid-template-rows"] = `repeat(${val}, auto)`;
            }
            else {
                styles["grid-template-rows"] = val;
            }
        }
        // Gap: schema value is a Tailwind spacing token (4 = 1rem)
        const rowGap = layout.rowGap ?? layout.gap;
        const colGap = layout.colGap ?? layout.gap;
        if (rowGap !== undefined || colGap !== undefined) {
            const rg = rowGap ? `${rowGap * 0.25}rem` : "0";
            const cg = colGap ? `${colGap * 0.25}rem` : "0";
            styles.gap = `${rg} ${cg}`;
        }
        // Padding
        const px = layout.paddingX;
        const py = layout.paddingY;
        if (px !== undefined || py !== undefined) {
            styles.padding = `${py ? py * 0.25 : 0}rem ${px ? px * 0.25 : 0}rem`;
        }
        // Width
        if (layout.width === "full")
            styles.width = "100%";
        return styles;
    }, ...(ngDevMode ? [{ debugName: "gridStyles" }] : []));
    /** CSS classes: schema-page + layout class */
    containerClass = computed(() => {
        const layoutCls = this.page()?.layouts?.[0]?.class ?? "";
        return layoutCls ? `schema-page ${layoutCls}` : "schema-page";
    }, ...(ngDevMode ? [{ debugName: "containerClass" }] : []));
    constructor(router, renderer) {
        this.router = router;
        this.renderer = renderer;
        // Sync router params to the data binding resolver when params change
        effect(() => {
            const params = this.router.params();
            if (Object.keys(params).length > 0) {
                this.renderer.setParams(params);
            }
        });
    }
    ngOnInit() {
        console.log(`[SchemaRouteViewer] ngOnInit, route="${this.route}", currentRoute="${this.router.currentRoute()}"`);
        if (this.route) {
            this.router.navigate(this.route);
        }
        else if (!this.router.currentRoute()) {
            const firstPage = this.router.schema()?.pages?.[0];
            if (firstPage?.route) {
                console.log(`[SchemaRouteViewer] auto-navigating to first page: "${firstPage.route}"`);
                this.router.navigate(firstPage.route);
            }
        }
    }
    ngOnChanges(changes) {
        if (changes["route"])
            this.router.navigate(this.route);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: SchemaRouteViewerComponent, deps: [{ token: SchemaRouterService }, { token: SchemaRendererService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.25", type: SchemaRouteViewerComponent, isStandalone: true, selector: "lib-schema-route-viewer", inputs: { route: "route" }, usesOnChanges: true, ngImport: i0, template: "@if (page(); as p) {\n  <div [class]=\"containerClass()\" [ngStyle]=\"gridStyles()\">\n    @for (element of p.canvasElements; track element.id) {\n      <app-schema-element\n        [element]=\"element\"\n        [elements]=\"p.canvasElements\"\n      ></app-schema-element>\n    }\n  </div>\n}\n", styles: [":host{display:block}.schema-page{min-height:100%}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1$1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "component", type: SchemaElementComponent, selector: "app-schema-element", inputs: ["element", "elements"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: SchemaRouteViewerComponent, decorators: [{
            type: Component,
            args: [{ selector: "lib-schema-route-viewer", standalone: true, imports: [CommonModule, SchemaElementComponent], schemas: [CUSTOM_ELEMENTS_SCHEMA], template: "@if (page(); as p) {\n  <div [class]=\"containerClass()\" [ngStyle]=\"gridStyles()\">\n    @for (element of p.canvasElements; track element.id) {\n      <app-schema-element\n        [element]=\"element\"\n        [elements]=\"p.canvasElements\"\n      ></app-schema-element>\n    }\n  </div>\n}\n", styles: [":host{display:block}.schema-page{min-height:100%}\n"] }]
        }], ctorParameters: () => [{ type: SchemaRouterService }, { type: SchemaRendererService }], propDecorators: { route: [{
                type: Input
            }] } });

async function invokeWithRetry(fn, options) {
    const { maxAttempts, initialDelayMs, maxDelayMs } = options;
    let lastError;
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
        try {
            return await fn();
        }
        catch (error) {
            lastError = error;
            if (attempt < maxAttempts - 1) {
                const delay = Math.min(initialDelayMs * Math.pow(2, attempt), maxDelayMs);
                await new Promise((resolve) => setTimeout(resolve, delay));
            }
        }
    }
    throw lastError;
}

class InvokeWrapperService {
    async invoke(cmd, args, options) {
        try {
            return await invoke(cmd, args);
        }
        catch (err) {
            if (options?.suppressError) {
                return undefined;
            }
            throw err;
        }
    }
    async invokeWithRetry(cmd, args, retryOptions = {
        maxAttempts: 3,
        initialDelayMs: 1000,
        maxDelayMs: 30000,
    }) {
        return invokeWithRetry(() => this.invokeWithTimeout(cmd, args, retryOptions.maxDelayMs), retryOptions);
    }
    async timeout(ms, cmd, args, options) {
        const { signal } = options ?? {};
        const doTimeout = new Promise((_, reject) => setTimeout(() => reject(new Error(`Invoke ${cmd} timed out after ${ms}ms`)), ms));
        if (signal) {
            const doAbort = new Promise((_, reject) => {
                if (signal.aborted) {
                    reject(signal.reason);
                    return;
                }
                signal.addEventListener("abort", () => reject(signal.reason), {
                    once: true,
                });
            });
            return Promise.race([invoke(cmd, args), doTimeout, doAbort]);
        }
        return Promise.race([invoke(cmd, args), doTimeout]);
    }
    async invokeWithTimeout(cmd, args, timeoutMs) {
        return Promise.race([
            this.invoke(cmd, args),
            new Promise((_, reject) => setTimeout(() => reject(new Error(`Invoke ${cmd} timed out after ${timeoutMs}ms`)), timeoutMs)),
        ]);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: InvokeWrapperService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: InvokeWrapperService, providedIn: "root" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: InvokeWrapperService, decorators: [{
            type: Injectable,
            args: [{ providedIn: "root" }]
        }] });

class ThemeToggleService {
    themeService = inject(StyleThemeService);
    mediaQuery = null;
    init() {
        if (typeof window === "undefined")
            return;
        this.mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        if (!this.themeService.isDarkMode()) {
            const prefersDark = this.mediaQuery.matches;
            if (prefersDark) {
                this.themeService.setDarkMode(true);
            }
        }
        this.mediaQuery.addEventListener("change", this._onSystemThemeChange);
    }
    _onSystemThemeChange = (e) => {
        if (!this.themeService.isDarkMode()) {
            this.themeService.setDarkMode(e.matches);
        }
    };
    isDark() {
        return this.themeService.isDarkMode();
    }
    enable() {
        this.themeService.setDarkMode(true);
    }
    disable() {
        this.themeService.setDarkMode(false);
    }
    toggle() {
        this.themeService.toggleDarkMode();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: ThemeToggleService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: ThemeToggleService, providedIn: "root" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: ThemeToggleService, decorators: [{
            type: Injectable,
            args: [{ providedIn: "root" }]
        }] });

class FallbackService {
    parseSchemaWithFallback(jsonString) {
        try {
            const schema = JSON.parse(jsonString);
            return { schema, isFallback: false };
        }
        catch (error) {
            return {
                schema: this.getFallbackSchema(error instanceof Error ? error.message : "Parse error"),
                isFallback: true,
                error: error instanceof Error ? error.message : "Failed to parse schema",
            };
        }
    }
    getFallbackSchema(errorMessage) {
        return {
            version: "1.0.0",
            pages: [
                {
                    id: "error-page",
                    name: "Schema Error",
                    route: "/schema-error",
                    meta: { title: "Schema Error", icon: null },
                    layouts: [],
                    canvasElements: [],
                },
            ],
            layouts: [],
        };
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: FallbackService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: FallbackService, providedIn: "root" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: FallbackService, decorators: [{
            type: Injectable,
            args: [{ providedIn: "root" }]
        }] });

class SchemaShellComponent {
    invokeWrapper;
    schemaRouter;
    renderer;
    themeService;
    themeToggle;
    fallbackService;
    appId = "";
    commandName = "get_ui_schema";
    defaultTheme = "material-design-v3";
    initialRoute = "";
    errorFallbackCommandName = "";
    loading = signal(true, ...(ngDevMode ? [{ debugName: "loading" }] : []));
    error = signal(null, ...(ngDevMode ? [{ debugName: "error" }] : []));
    /** All raw layout regions from the renderer (unfiltered) */
    rawRegions = computed(() => {
        this.schemaRouter.currentRoute();
        return this.renderer.getLayoutRegions();
    }, ...(ngDevMode ? [{ debugName: "rawRegions" }] : []));
    /** Infer region type from explicit `region` property or fall back to ID pattern matching */
    getRegionType(region) {
        if (region.region)
            return region.region;
        const id = region.id.toLowerCase();
        if (id.includes("header"))
            return "header";
        if (id.includes("sidebar-right"))
            return "sidebar-right";
        if (id.includes("sidebar"))
            return "sidebar";
        if (id.includes("footer"))
            return "footer";
        if (id.includes("bottom-nav") ||
            (id.includes("bottom") && !id.includes("nav")))
            return "bottom-nav";
        if (id.includes("nav"))
            return "nav";
        if (id.includes("overlay"))
            return "overlay";
        return "other";
    }
    isRegionVisible(region) {
        return this.renderer.isElementVisible(region);
    }
    regionByType(type) {
        return (this.rawRegions().find((r) => this.isRegionVisible(r) && this.getRegionType(r) === type) ?? null);
    }
    regionsByType(type) {
        return this.rawRegions().filter((r) => this.isRegionVisible(r) && this.getRegionType(r) === type);
    }
    headerRegion = computed(() => this.regionByType("header"), ...(ngDevMode ? [{ debugName: "headerRegion" }] : []));
    sidebarLeftRegion = computed(() => this.regionByType("sidebar") ?? this.regionByType("sidebar-left"), ...(ngDevMode ? [{ debugName: "sidebarLeftRegion" }] : []));
    sidebarRightRegion = computed(() => this.regionByType("sidebar-right"), ...(ngDevMode ? [{ debugName: "sidebarRightRegion" }] : []));
    footerRegion = computed(() => this.regionByType("footer"), ...(ngDevMode ? [{ debugName: "footerRegion" }] : []));
    bottomNavRegion = computed(() => this.regionByType("bottom-nav"), ...(ngDevMode ? [{ debugName: "bottomNavRegion" }] : []));
    overlayRegions = computed(() => this.regionsByType("overlay"), ...(ngDevMode ? [{ debugName: "overlayRegions" }] : []));
    /** Unrecognized regions rendered in an extra row below the main layout */
    otherRegions = computed(() => {
        return this.rawRegions().filter((r) => this.isRegionVisible(r) && this.getRegionType(r) === "other");
    }, ...(ngDevMode ? [{ debugName: "otherRegions" }] : []));
    /** CSS grid-template-columns — always 3 columns, hidden sidebars get 0px */
    gridColumns = computed(() => {
        const leftWidth = this.sidebarLeftRegion() ? "auto" : "0px";
        const rightWidth = this.sidebarRightRegion() ? "auto" : "0px";
        return `${leftWidth} 1fr ${rightWidth}`;
    }, ...(ngDevMode ? [{ debugName: "gridColumns" }] : []));
    /** CSS grid-template-rows — hidden regions get 0px */
    gridRows = computed(() => {
        const headerH = this.headerRegion() ? "auto" : "0px";
        const footerH = this.footerRegion() ? "auto" : "0px";
        const bottomH = this.bottomNavRegion() ? "auto" : "0px";
        const otherH = this.otherRegions().length ? "auto" : "0px";
        return `${headerH} 1fr ${footerH} ${bottomH} ${otherH}`;
    }, ...(ngDevMode ? [{ debugName: "gridRows" }] : []));
    /** CSS grid-template-areas — always 5 rows with 3 columns */
    gridAreas = computed(() => {
        const header = this.headerRegion() ? '"header header header"' : '". . ."';
        const left = this.sidebarLeftRegion() ? "sidebar-left" : ".";
        const right = this.sidebarRightRegion() ? "sidebar-right" : ".";
        const middle = `"${left} content ${right}"`;
        const footer = this.footerRegion() ? '"footer footer footer"' : '". . ."';
        const bottom = this.bottomNavRegion()
            ? '"bottom-nav bottom-nav bottom-nav"'
            : '". . ."';
        const other = this.otherRegions().length
            ? '"other other other"'
            : '". . ."';
        return `${header} ${middle} ${footer} ${bottom} ${other}`;
    }, ...(ngDevMode ? [{ debugName: "gridAreas" }] : []));
    constructor(invokeWrapper, schemaRouter, renderer, themeService, themeToggle, fallbackService) {
        this.invokeWrapper = invokeWrapper;
        this.schemaRouter = schemaRouter;
        this.renderer = renderer;
        this.themeService = themeService;
        this.themeToggle = themeToggle;
        this.fallbackService = fallbackService;
        effect(() => {
            const route = this.schemaRouter.currentRoute();
            if (route)
                this.renderer.setCurrentRoute(route);
        });
    }
    async ngOnInit() {
        if (!this.appId)
            return;
        this.themeService.loadTheme(this.defaultTheme);
        this.themeToggle.init();
        await this.loadSchema();
    }
    onWindowToggleDark(event) {
        const e = event;
        if (e.detail?.isDark !== undefined) {
            this.themeService.setDarkMode(e.detail.isDark);
        }
    }
    async loadSchema() {
        console.log(`[SchemaShell] loadSchema() starting, appId="${this.appId}", command="${this.commandName}"`);
        this.loading.set(true);
        this.error.set(null);
        try {
            const response = await this.invokeWrapper.invoke(this.commandName, {
                id: this.appId,
            });
            console.log(`[SchemaShell] invoke("${this.commandName}") response:`, response ? `data.pages=${response?.data?.pages?.length}` : "null");
            const schema = response?.data;
            if (!schema?.pages?.length) {
                console.warn(`[SchemaShell] schema has no pages, schema=`, schema);
                this.error.set("Schema not found. Create it in the Designer and sync.");
                return;
            }
            console.log(`[SchemaShell] setSchema() pages=${schema.pages.length}, loadSchema() pages=${schema.pages.length}`);
            this.schemaRouter.setSchema(schema);
            this.renderer.loadSchema(schema);
            this.renderer.registerFunction("toggleThemeDark", () => {
                this.themeService.toggleDarkMode();
            });
            this.themeService.loadTheme(schema.app?.style ?? this.defaultTheme);
            // Load the variant CSS into <head> so CSS variables and class selectors are available
            const variant = schema.app?.style ?? this.defaultTheme;
            await loadStyleVariant(variant);
            // Re-inject dark mode CSS for the newly loaded variant if dark mode is active
            if (this.themeService.isDarkMode()) {
                this.themeService.setDarkMode(true);
            }
            const route = this.initialRoute || schema.pages[0].route || `/${schema.pages[0].id}`;
            console.log(`[SchemaShell] navigate("${route}")`);
            await this.schemaRouter.navigate(route);
        }
        catch (err) {
            const originalMessage = err instanceof Error
                ? err.message
                : typeof err === "object" && err
                    ? String(err["message"] ??
                        Object.values(err)[0] ??
                        String(err))
                    : String(err);
            if (this.errorFallbackCommandName) {
                try {
                    const fallbackResponse = await this.invokeWrapper.invoke(this.errorFallbackCommandName, { id: this.appId });
                    const fallbackSchema = fallbackResponse?.data;
                    if (fallbackSchema?.pages?.length) {
                        console.warn("[SchemaShell] Primary schema failed, using fallback schema");
                        this.schemaRouter.setSchema(fallbackSchema);
                        this.renderer.loadSchema(fallbackSchema);
                        await this.schemaRouter.navigate("/schema-error");
                        this.loading.set(false);
                        return;
                    }
                }
                catch (fallbackErr) {
                    console.error("[SchemaShell] Fallback schema also failed:", fallbackErr);
                }
            }
            console.warn(`[SchemaShell] All schema loading failed, using fallback error schema. Original error: ${originalMessage}`);
            const fallbackSchema = this.fallbackService.getFallbackSchema(originalMessage);
            this.schemaRouter.setSchema(fallbackSchema);
            this.renderer.loadSchema(fallbackSchema);
            await this.schemaRouter.navigate("/schema-error");
        }
        finally {
            this.loading.set(false);
        }
    }
    retry() {
        this.loadSchema();
    }
    /**
     * Returns CSS classes for a region container by mapping its props to Tailwind-style classes.
     * Uses the same mapPropsToClasses() logic as schema elements for consistent styling.
     */
    getRegionClasses(region) {
        if (!region?.props)
            return "";
        const theme = getCurrentStyle();
        return this.renderer
            .mapPropsToClasses(region.componentId || "div", region.props, theme)
            .join(" ");
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: SchemaShellComponent, deps: [{ token: InvokeWrapperService }, { token: SchemaRouterService }, { token: SchemaRendererService }, { token: StyleThemeService }, { token: ThemeToggleService }, { token: FallbackService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.25", type: SchemaShellComponent, isStandalone: true, selector: "lib-schema-shell", inputs: { appId: "appId", commandName: "commandName", defaultTheme: "defaultTheme", initialRoute: "initialRoute", errorFallbackCommandName: "errorFallbackCommandName" }, host: { listeners: { "window:toggle-dark": "onWindowToggleDark($event)" } }, ngImport: i0, template: "@if (loading()) {\n  <div\n    style=\"\n      display: flex;\n      flex-direction: column;\n      align-items: center;\n      justify-content: center;\n      gap: 1rem;\n      min-height: 100vh;\n    \"\n  >\n    <app-loading size=\"lg\"></app-loading>\n    <p style=\"color: var(--text-secondary); font-size: 1.125rem\">\n      Loading application...\n    </p>\n  </div>\n} @else if (error(); as err) {\n  <div\n    style=\"\n      display: flex;\n      flex-direction: column;\n      align-items: center;\n      justify-content: center;\n      min-height: 100vh;\n      padding: 2rem;\n    \"\n  >\n    <app-empty-state\n      variant=\"danger\"\n      title=\"Application Not Available\"\n      [message]=\"err\"\n      actionLabel=\"Retry\"\n      (action)=\"retry()\"\n    ></app-empty-state>\n  </div>\n} @else {\n  <div\n    class=\"app-layout\"\n    [style.grid-template-columns]=\"gridColumns()\"\n    [style.grid-template-rows]=\"gridRows()\"\n    [style.grid-template-areas]=\"gridAreas()\"\n  >\n    @if (headerRegion(); as region) {\n      <div\n        data-region=\"header\"\n        [class]=\"getRegionClasses(region)\"\n        style=\"grid-area: header\"\n      >\n        @for (child of region.children || []; track child.id) {\n          <app-schema-element\n            [element]=\"child\"\n            [elements]=\"region.children || []\"\n          />\n        }\n      </div>\n    }\n\n    @if (sidebarLeftRegion(); as region) {\n      <div\n        data-region=\"sidebar-left\"\n        [class]=\"getRegionClasses(region)\"\n        style=\"grid-area: sidebar-left\"\n      >\n        @for (child of region.children || []; track child.id) {\n          <app-schema-element\n            [element]=\"child\"\n            [elements]=\"region.children || []\"\n          />\n        }\n      </div>\n    }\n\n    <div data-region=\"content\" style=\"grid-area: content\">\n      <lib-schema-route-viewer />\n    </div>\n\n    @if (sidebarRightRegion(); as region) {\n      <div\n        data-region=\"sidebar-right\"\n        [class]=\"getRegionClasses(region)\"\n        style=\"grid-area: sidebar-right\"\n      >\n        @for (child of region.children || []; track child.id) {\n          <app-schema-element\n            [element]=\"child\"\n            [elements]=\"region.children || []\"\n          />\n        }\n      </div>\n    }\n\n    @if (footerRegion(); as region) {\n      <div\n        data-region=\"footer\"\n        [class]=\"getRegionClasses(region)\"\n        style=\"grid-area: footer\"\n      >\n        @for (child of region.children || []; track child.id) {\n          <app-schema-element\n            [element]=\"child\"\n            [elements]=\"region.children || []\"\n          />\n        }\n      </div>\n    }\n\n    @if (bottomNavRegion(); as region) {\n      <div\n        data-region=\"bottom-nav\"\n        [class]=\"getRegionClasses(region)\"\n        style=\"grid-area: bottom-nav\"\n      >\n        @for (child of region.children || []; track child.id) {\n          <app-schema-element\n            [element]=\"child\"\n            [elements]=\"region.children || []\"\n          />\n        }\n      </div>\n    }\n\n    @for (region of otherRegions(); track region.id) {\n      <div\n        data-region=\"other\"\n        [class]=\"getRegionClasses(region)\"\n        style=\"grid-area: other\"\n      >\n        @for (child of region.children || []; track child.id) {\n          <app-schema-element\n            [element]=\"child\"\n            [elements]=\"region.children || []\"\n          />\n        }\n      </div>\n    }\n  </div>\n\n  @for (region of overlayRegions(); track region.id) {\n    <div class=\"layout-overlay\" data-region=\"overlay\">\n      @for (child of region.children || []; track child.id) {\n        <app-schema-element\n          [element]=\"child\"\n          [elements]=\"region.children || []\"\n        />\n      }\n    </div>\n  }\n}\n", styles: [":host{display:block;height:100%}.app-layout{display:grid;min-height:100vh}[data-region=content],[data-region=sidebar-left],[data-region=sidebar-right]{overflow:auto}.layout-overlay{position:fixed;inset:0;z-index:50;pointer-events:none}.layout-overlay>*{pointer-events:auto}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "component", type: SchemaRouteViewerComponent, selector: "lib-schema-route-viewer", inputs: ["route"] }, { kind: "component", type: SchemaElementComponent, selector: "app-schema-element", inputs: ["element", "elements"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: SchemaShellComponent, decorators: [{
            type: Component,
            args: [{ selector: "lib-schema-shell", standalone: true, imports: [CommonModule, SchemaRouteViewerComponent, SchemaElementComponent], schemas: [CUSTOM_ELEMENTS_SCHEMA], template: "@if (loading()) {\n  <div\n    style=\"\n      display: flex;\n      flex-direction: column;\n      align-items: center;\n      justify-content: center;\n      gap: 1rem;\n      min-height: 100vh;\n    \"\n  >\n    <app-loading size=\"lg\"></app-loading>\n    <p style=\"color: var(--text-secondary); font-size: 1.125rem\">\n      Loading application...\n    </p>\n  </div>\n} @else if (error(); as err) {\n  <div\n    style=\"\n      display: flex;\n      flex-direction: column;\n      align-items: center;\n      justify-content: center;\n      min-height: 100vh;\n      padding: 2rem;\n    \"\n  >\n    <app-empty-state\n      variant=\"danger\"\n      title=\"Application Not Available\"\n      [message]=\"err\"\n      actionLabel=\"Retry\"\n      (action)=\"retry()\"\n    ></app-empty-state>\n  </div>\n} @else {\n  <div\n    class=\"app-layout\"\n    [style.grid-template-columns]=\"gridColumns()\"\n    [style.grid-template-rows]=\"gridRows()\"\n    [style.grid-template-areas]=\"gridAreas()\"\n  >\n    @if (headerRegion(); as region) {\n      <div\n        data-region=\"header\"\n        [class]=\"getRegionClasses(region)\"\n        style=\"grid-area: header\"\n      >\n        @for (child of region.children || []; track child.id) {\n          <app-schema-element\n            [element]=\"child\"\n            [elements]=\"region.children || []\"\n          />\n        }\n      </div>\n    }\n\n    @if (sidebarLeftRegion(); as region) {\n      <div\n        data-region=\"sidebar-left\"\n        [class]=\"getRegionClasses(region)\"\n        style=\"grid-area: sidebar-left\"\n      >\n        @for (child of region.children || []; track child.id) {\n          <app-schema-element\n            [element]=\"child\"\n            [elements]=\"region.children || []\"\n          />\n        }\n      </div>\n    }\n\n    <div data-region=\"content\" style=\"grid-area: content\">\n      <lib-schema-route-viewer />\n    </div>\n\n    @if (sidebarRightRegion(); as region) {\n      <div\n        data-region=\"sidebar-right\"\n        [class]=\"getRegionClasses(region)\"\n        style=\"grid-area: sidebar-right\"\n      >\n        @for (child of region.children || []; track child.id) {\n          <app-schema-element\n            [element]=\"child\"\n            [elements]=\"region.children || []\"\n          />\n        }\n      </div>\n    }\n\n    @if (footerRegion(); as region) {\n      <div\n        data-region=\"footer\"\n        [class]=\"getRegionClasses(region)\"\n        style=\"grid-area: footer\"\n      >\n        @for (child of region.children || []; track child.id) {\n          <app-schema-element\n            [element]=\"child\"\n            [elements]=\"region.children || []\"\n          />\n        }\n      </div>\n    }\n\n    @if (bottomNavRegion(); as region) {\n      <div\n        data-region=\"bottom-nav\"\n        [class]=\"getRegionClasses(region)\"\n        style=\"grid-area: bottom-nav\"\n      >\n        @for (child of region.children || []; track child.id) {\n          <app-schema-element\n            [element]=\"child\"\n            [elements]=\"region.children || []\"\n          />\n        }\n      </div>\n    }\n\n    @for (region of otherRegions(); track region.id) {\n      <div\n        data-region=\"other\"\n        [class]=\"getRegionClasses(region)\"\n        style=\"grid-area: other\"\n      >\n        @for (child of region.children || []; track child.id) {\n          <app-schema-element\n            [element]=\"child\"\n            [elements]=\"region.children || []\"\n          />\n        }\n      </div>\n    }\n  </div>\n\n  @for (region of overlayRegions(); track region.id) {\n    <div class=\"layout-overlay\" data-region=\"overlay\">\n      @for (child of region.children || []; track child.id) {\n        <app-schema-element\n          [element]=\"child\"\n          [elements]=\"region.children || []\"\n        />\n      }\n    </div>\n  }\n}\n", styles: [":host{display:block;height:100%}.app-layout{display:grid;min-height:100vh}[data-region=content],[data-region=sidebar-left],[data-region=sidebar-right]{overflow:auto}.layout-overlay{position:fixed;inset:0;z-index:50;pointer-events:none}.layout-overlay>*{pointer-events:auto}\n"] }]
        }], ctorParameters: () => [{ type: InvokeWrapperService }, { type: SchemaRouterService }, { type: SchemaRendererService }, { type: StyleThemeService }, { type: ThemeToggleService }, { type: FallbackService }], propDecorators: { appId: [{
                type: Input
            }], commandName: [{
                type: Input
            }], defaultTheme: [{
                type: Input
            }], initialRoute: [{
                type: Input
            }], errorFallbackCommandName: [{
                type: Input
            }], onWindowToggleDark: [{
                type: HostListener,
                args: ["window:toggle-dark", ["$event"]]
            }] } });

class SchemaFetcherService {
    http;
    constructor(http) {
        this.http = http;
    }
    async loadSchema(options) {
        try {
            switch (options.mode) {
                case "embedded":
                    return this.loadEmbedded(options.source);
                case "http":
                    return this.loadHttp(options.source);
                case "tauri":
                    return this.loadTauri(options.source);
                default:
                    throw new Error(`Unknown schema load mode: ${options.mode}`);
            }
        }
        catch (primaryError) {
            console.error("SchemaFetcher: Primary schema load failed:", primaryError);
            if (options.fallbackOptions) {
                console.warn("SchemaFetcher: Attempting fallback schema...");
                try {
                    return await this.loadSchema(options.fallbackOptions);
                }
                catch (fallbackError) {
                    console.error("SchemaFetcher: Fallback schema also failed:", fallbackError);
                    throw primaryError;
                }
            }
            throw primaryError;
        }
    }
    async loadEmbedded(source) {
        try {
            const response = await fetch(source);
            if (!response.ok) {
                throw new Error(`Failed to load embedded schema: ${response.status}`);
            }
            const data = await response.json();
            return data;
        }
        catch (err) {
            console.error("SchemaFetcher: Error loading embedded schema:", err);
            throw err;
        }
    }
    async loadHttp(url) {
        if (!this.http) {
            throw new Error("HttpClient not available. Import HttpClientModule or provide provideHttpClient().");
        }
        return firstValueFrom(this.http.get(url));
    }
    async loadTauri(commandName) {
        try {
            const { invoke } = await import('@tauri-apps/api/core');
            const schema = await invoke(commandName);
            return schema;
        }
        catch (err) {
            console.error("SchemaFetcher: Error loading schema via Tauri:", err);
            throw err;
        }
    }
    async loadSchemaFromFile(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const data = JSON.parse(e.target?.result);
                    resolve(data);
                }
                catch (err) {
                    reject(new Error("Invalid schema JSON file"));
                }
            };
            reader.onerror = () => reject(new Error("Failed to read file"));
            reader.readAsText(file);
        });
    }
    validateSchema(schema) {
        if (!schema || typeof schema !== "object")
            return false;
        const s = schema;
        return (typeof s["schemaVersion"] === "string" &&
            typeof s["app"] === "object" &&
            Array.isArray(s["pages"]));
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: SchemaFetcherService, deps: [{ token: i1$2.HttpClient, optional: true }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: SchemaFetcherService, providedIn: "root" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: SchemaFetcherService, decorators: [{
            type: Injectable,
            args: [{ providedIn: "root" }]
        }], ctorParameters: () => [{ type: i1$2.HttpClient, decorators: [{
                    type: Optional
                }] }] });

class ShortcutService {
    eventBus;
    _shortcuts = signal([], ...(ngDevMode ? [{ debugName: "_shortcuts" }] : []));
    shortcuts = this._shortcuts.asReadonly();
    constructor(eventBus) {
        this.eventBus = eventBus;
        window.addEventListener("keydown", (e) => this._handleKeyDown(e));
    }
    register(shortcut) {
        this._shortcuts.update((s) => [...s, shortcut]);
        return () => this.unregister(shortcut.id);
    }
    unregister(id) {
        this._shortcuts.update((s) => s.filter((s) => s.id !== id));
    }
    loadFromSchema(shortcuts) {
        shortcuts.forEach((s) => this.register(s));
    }
    _handleKeyDown(e) {
        const match = this._shortcuts().find((s) => s.enabled !== false &&
            s.key.toLowerCase() === e.key.toLowerCase() &&
            this._checkModifiers(s.modifiers || [], e));
        if (match) {
            e.preventDefault();
            this.eventBus.emit(`shortcut:${match.id}`, { shortcut: match });
            this.eventBus.emit(match.handler, { shortcut: match });
        }
    }
    _checkModifiers(modifiers, e) {
        return modifiers.every((m) => {
            if (m === "ctrl")
                return e.ctrlKey;
            if (m === "shift")
                return e.shiftKey;
            if (m === "alt")
                return e.altKey;
            if (m === "meta")
                return e.metaKey;
            return false;
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: ShortcutService, deps: [{ token: EventBusService }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: ShortcutService, providedIn: "root" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: ShortcutService, decorators: [{
            type: Injectable,
            args: [{ providedIn: "root" }]
        }], ctorParameters: () => [{ type: EventBusService }] });

/**
 * Window-level global state for Translator app.
 * Exposes source/target language codes as signals so any service
 * (including TranslationService) can read them without prop-drilling.
 */
class GlobalStateService {
    static _instance = null;
    static get instance() {
        if (!GlobalStateService._instance) {
            GlobalStateService._instance = new GlobalStateService();
        }
        return GlobalStateService._instance;
    }
    _sourceLang = signal("en", ...(ngDevMode ? [{ debugName: "_sourceLang" }] : []));
    _targetLang = signal("ru", ...(ngDevMode ? [{ debugName: "_targetLang" }] : []));
    _appLocale = signal("en", ...(ngDevMode ? [{ debugName: "_appLocale" }] : []));
    get sourceLang() {
        return this._sourceLang.asReadonly();
    }
    get targetLang() {
        return this._targetLang.asReadonly();
    }
    get appLocale() {
        return this._appLocale.asReadonly();
    }
    setSourceLang(code) {
        this._sourceLang.set(code);
    }
    setTargetLang(code) {
        this._targetLang.set(code);
    }
    setAppLocale(locale) {
        this._appLocale.set(locale);
    }
    swapLanguages() {
        const src = this._sourceLang();
        const tgt = this._targetLang();
        this._sourceLang.set(tgt);
        this._targetLang.set(src);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: GlobalStateService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: GlobalStateService, providedIn: "root" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: GlobalStateService, decorators: [{
            type: Injectable,
            args: [{ providedIn: "root" }]
        }] });

var ErrorType;
(function (ErrorType) {
    ErrorType["NotFound"] = "notFound";
    ErrorType["ValidationError"] = "validationError";
    ErrorType["Duplicate"] = "duplicate";
    ErrorType["Unauthorized"] = "unauthorized";
    ErrorType["Forbidden"] = "forbidden";
    ErrorType["Internal"] = "internal";
    ErrorType["Database"] = "database";
    ErrorType["Network"] = "network";
})(ErrorType || (ErrorType = {}));
function isNotFoundError(error) {
    return error.type === ErrorType.NotFound;
}
function isValidationError(error) {
    return error.type === ErrorType.ValidationError;
}
function isDuplicateError(error) {
    return error.type === ErrorType.Duplicate;
}
function isUnauthorizedError(error) {
    return error.type === ErrorType.Unauthorized;
}
function isForbiddenError(error) {
    return error.type === ErrorType.Forbidden;
}
function isInternalError(error) {
    return error.type === ErrorType.Internal;
}
function isDatabaseError(error) {
    return error.type === ErrorType.Database;
}
function isNetworkError(error) {
    return error.type === ErrorType.Network;
}
function parseError(error) {
    if (error &&
        typeof error === "object" &&
        "type" in error &&
        "message" in error) {
        return error;
    }
    if (error instanceof Error) {
        return {
            type: ErrorType.Internal,
            message: error.message,
        };
    }
    return {
        type: ErrorType.Internal,
        message: String(error),
    };
}
function formatError(error) {
    switch (error.type) {
        case ErrorType.NotFound:
            return error.entity ? `${error.entity} not found` : error.message;
        case ErrorType.ValidationError:
            return `Validation error: ${error.message}`;
        case ErrorType.Duplicate:
            return error.entity ? `${error.entity} already exists` : error.message;
        case ErrorType.Unauthorized:
            return "Unauthorized access";
        case ErrorType.Forbidden:
            return "Access forbidden";
        case ErrorType.Internal:
            return `Internal error: ${error.message}`;
        case ErrorType.Database:
            return `Database error: ${error.message}`;
        case ErrorType.Network:
            return `Network error: ${error.message}`;
        default:
            return error.message;
    }
}

const DEFAULT_DURATIONS = {
    success: 3000,
    error: 5000,
    warning: 4000,
    info: 3000,
};
class ToastService {
    toastsSignal = signal([], ...(ngDevMode ? [{ debugName: "toastsSignal" }] : []));
    counter = 0;
    autoDismissTimers = new Map();
    toasts = computed(() => this.toastsSignal(), ...(ngDevMode ? [{ debugName: "toasts" }] : []));
    generateId() {
        return `toast-${++this.counter}-${Date.now()}`;
    }
    show(options) {
        const id = options.id ?? this.generateId();
        const type = options.type;
        const duration = options.duration ?? DEFAULT_DURATIONS[type];
        const persistent = options.persistent ?? false;
        const toast = {
            ...options,
            id,
            type,
            duration,
            persistent,
        };
        this.toastsSignal.update((toasts) => {
            const updated = [toast, ...toasts];
            return updated.slice(0, 20);
        });
        if (!persistent && duration > 0) {
            const timer = setTimeout(() => {
                this.autoDismissTimers.delete(id);
                this.dismiss(id);
            }, duration);
            this.autoDismissTimers.set(id, timer);
        }
        return id;
    }
    success(message, options) {
        return this.show({ ...options, type: "success", message });
    }
    error(message, options) {
        return this.show({ ...options, type: "error", message });
    }
    warning(message, options) {
        return this.show({ ...options, type: "warning", message });
    }
    info(message, options) {
        return this.show({ ...options, type: "info", message });
    }
    dismiss(id) {
        const timer = this.autoDismissTimers.get(id);
        if (timer !== undefined) {
            clearTimeout(timer);
            this.autoDismissTimers.delete(id);
        }
        this.toastsSignal.update((toasts) => toasts.filter((t) => t.id !== id));
    }
    dismissAll() {
        this.autoDismissTimers.forEach((timer) => clearTimeout(timer));
        this.autoDismissTimers.clear();
        this.toastsSignal.set([]);
    }
    update(id, changes) {
        this.toastsSignal.update((toasts) => toasts.map((t) => (t.id === id ? { ...t, ...changes } : t)));
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: ToastService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: ToastService, providedIn: "root" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: ToastService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: "root",
                }]
        }] });

const DEFAULT_RETRY_CONFIG = {
    maxAttempts: 3,
    initialDelayMs: 1000,
    maxDelayMs: 30000,
};
const MAX_ERROR_LOG_ENTRIES = 100;
class ErrorHandlerService {
    toastService;
    errorLogSignal = signal([], ...(ngDevMode ? [{ debugName: "errorLogSignal" }] : []));
    onlineSignal = signal(navigator.onLine, ...(ngDevMode ? [{ debugName: "onlineSignal" }] : []));
    retryCounter = 0;
    errorLog = computed(() => this.errorLogSignal(), ...(ngDevMode ? [{ debugName: "errorLog" }] : []));
    isOnline = computed(() => this.onlineSignal(), ...(ngDevMode ? [{ debugName: "isOnline" }] : []));
    errorCount = computed(() => this.errorLogSignal().filter((e) => !e.dismissed).length, ...(ngDevMode ? [{ debugName: "errorCount" }] : []));
    constructor(toastService) {
        this.toastService = toastService;
        this.setupOnlineOfflineListeners();
    }
    setupOnlineOfflineListeners() {
        window.addEventListener("online", () => this.onlineSignal.set(true));
        window.addEventListener("offline", () => this.onlineSignal.set(false));
    }
    handleError(error, context) {
        const appError = this.normalizeError(error);
        const message = formatError(appError);
        const fullMessage = context ? `[${context}] ${message}` : message;
        console.error(`Error${context ? ` [${context}]` : ""}: ${message}`, error);
        this.addToErrorLog(appError, fullMessage, context);
        this.showToast(fullMessage, "error");
        return appError;
    }
    normalizeError(error) {
        if (this.isHttpError(error)) {
            return this.convertHttpError(error);
        }
        return parseError(error);
    }
    isHttpError(error) {
        return (typeof error === "object" &&
            error !== null &&
            "status" in error &&
            typeof error.status === "number");
    }
    convertHttpError(httpError) {
        const status = httpError.status ?? 0;
        const message = httpError.message || httpError.statusText || "HTTP error";
        switch (status) {
            case 400:
                return { type: ErrorType.ValidationError, message };
            case 401:
                return { type: ErrorType.Unauthorized, message };
            case 403:
                return { type: ErrorType.Forbidden, message };
            case 404:
                return { type: ErrorType.NotFound, message };
            case 409:
                return { type: ErrorType.Duplicate, message };
            case 500:
            case 502:
            case 503:
            case 504:
                return { type: ErrorType.Internal, message };
            default:
                if (status >= 500) {
                    return { type: ErrorType.Internal, message };
                }
                if (status >= 400) {
                    return { type: ErrorType.ValidationError, message };
                }
                return { type: ErrorType.Network, message };
        }
    }
    showToast(message, type = "error") {
        this.toastService.show({ type, message });
    }
    addToErrorLog(error, message, context) {
        const entry = {
            id: `error-${++this.retryCounter}-${Date.now()}`,
            timestamp: new Date(),
            message,
            context,
            error,
            dismissed: false,
        };
        this.errorLogSignal.update((log) => {
            const updated = [entry, ...log];
            return updated.slice(0, MAX_ERROR_LOG_ENTRIES);
        });
    }
    dismissError(id) {
        this.errorLogSignal.update((log) => log.map((entry) => entry.id === id ? { ...entry, dismissed: true } : entry));
    }
    clearErrorLog() {
        this.errorLogSignal.set([]);
    }
    getActiveErrors() {
        return this.errorLogSignal().filter((entry) => !entry.dismissed);
    }
    async retryWithBackoff(fn, config = {}) {
        const { maxAttempts, initialDelayMs, maxDelayMs } = {
            ...DEFAULT_RETRY_CONFIG,
            ...config,
        };
        let lastError;
        for (let attempt = 0; attempt < maxAttempts; attempt++) {
            try {
                return await fn();
            }
            catch (error) {
                lastError = error;
                if (attempt < maxAttempts - 1) {
                    const delay = Math.min(initialDelayMs * Math.pow(2, attempt), maxDelayMs);
                    await new Promise((resolve) => setTimeout(resolve, delay));
                }
            }
        }
        throw lastError;
    }
    handleAndRetry(fn, context, retryConfig) {
        return this.retryWithBackoff(fn, retryConfig).catch((error) => {
            this.handleError(error, context);
            throw error;
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: ErrorHandlerService, deps: [{ token: ToastService }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: ErrorHandlerService, providedIn: "root" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: ErrorHandlerService, decorators: [{
            type: Injectable,
            args: [{ providedIn: "root" }]
        }], ctorParameters: () => [{ type: ToastService }] });

class SignalSyncService {
    http;
    constructor(http) {
        this.http = http;
    }
    _syncStatus = signal("idle", ...(ngDevMode ? [{ debugName: "_syncStatus" }] : []));
    _lastSyncTime = signal(null, ...(ngDevMode ? [{ debugName: "_lastSyncTime" }] : []));
    _pendingChanges = signal(0, ...(ngDevMode ? [{ debugName: "_pendingChanges" }] : []));
    _syncEndpoint = signal("", ...(ngDevMode ? [{ debugName: "_syncEndpoint" }] : []));
    syncStatus = computed(() => this._syncStatus(), ...(ngDevMode ? [{ debugName: "syncStatus" }] : []));
    lastSyncTime = computed(() => this._lastSyncTime(), ...(ngDevMode ? [{ debugName: "lastSyncTime" }] : []));
    pendingChanges = computed(() => this._pendingChanges(), ...(ngDevMode ? [{ debugName: "pendingChanges" }] : []));
    syncEndpoint = computed(() => this._syncEndpoint(), ...(ngDevMode ? [{ debugName: "syncEndpoint" }] : []));
    setEndpoint(endpoint) {
        this._syncEndpoint.set(endpoint);
    }
    setStatus(status) {
        this._syncStatus.set(status);
    }
    incrementPending() {
        this._pendingChanges.update((n) => n + 1);
    }
    decrementPending() {
        this._pendingChanges.update((n) => Math.max(0, n - 1));
    }
    markSynced() {
        this._lastSyncTime.set(new Date());
        this._pendingChanges.set(0);
        this._syncStatus.set("idle");
    }
    markError() {
        this._syncStatus.set("error");
    }
    markOffline() {
        this._syncStatus.set("offline");
    }
    async syncToCloud() {
        if (this._syncStatus() === "syncing")
            return;
        if (!this._syncEndpoint()) {
            this.markOffline();
            return;
        }
        this._syncStatus.set("syncing");
        try {
            const state = this._pendingChanges();
            if (state > 0) {
                await this.performSync();
            }
            this.markSynced();
        }
        catch (error) {
            this.markError();
            throw error;
        }
    }
    async performSync() {
        const endpoint = this._syncEndpoint();
        if (!endpoint)
            return;
        try {
            await this.http
                .post(`${endpoint}/sync`, {
                timestamp: new Date().toISOString(),
            })
                .toPromise();
        }
        catch (error) {
            console.error("Sync failed:", error);
            throw error;
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: SignalSyncService, deps: [{ token: i1$2.HttpClient }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: SignalSyncService, providedIn: "root" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: SignalSyncService, decorators: [{
            type: Injectable,
            args: [{ providedIn: "root" }]
        }], ctorParameters: () => [{ type: i1$2.HttpClient }] });

class SignalLoggerService {
    _entries = signal([], ...(ngDevMode ? [{ debugName: "_entries" }] : []));
    _minLevel = signal("info", ...(ngDevMode ? [{ debugName: "_minLevel" }] : []));
    _maxEntries = signal(1000, ...(ngDevMode ? [{ debugName: "_maxEntries" }] : []));
    entries = computed(() => this._entries(), ...(ngDevMode ? [{ debugName: "entries" }] : []));
    filteredEntries = computed(() => {
        const level = this._minLevel();
        const levels = ["debug", "info", "warn", "error"];
        const minIndex = levels.indexOf(level);
        return this._entries().filter((e) => levels.indexOf(e.level) >= minIndex);
    }, ...(ngDevMode ? [{ debugName: "filteredEntries" }] : []));
    setMinLevel(level) {
        this._minLevel.set(level);
    }
    getMinLevel() {
        return this._minLevel();
    }
    setMaxEntries(max) {
        this._maxEntries.set(max);
    }
    addEntry(entry) {
        this._entries.update((entries) => {
            const newEntries = [...entries, entry];
            if (newEntries.length > this._maxEntries()) {
                return newEntries.slice(-this._maxEntries());
            }
            return newEntries;
        });
    }
    debug(message, source, metadata) {
        this.addEntry({
            level: "debug",
            message,
            timestamp: new Date().toISOString(),
            source,
            metadata,
        });
    }
    info(message, source, metadata) {
        this.addEntry({
            level: "info",
            message,
            timestamp: new Date().toISOString(),
            source,
            metadata,
        });
    }
    warn(message, source, metadata) {
        this.addEntry({
            level: "warn",
            message,
            timestamp: new Date().toISOString(),
            source,
            metadata,
        });
    }
    error(message, source, metadata) {
        this.addEntry({
            level: "error",
            message,
            timestamp: new Date().toISOString(),
            source,
            metadata,
        });
    }
    clear() {
        this._entries.set([]);
    }
    getEntriesByLevel(level) {
        return this._entries().filter((e) => e.level === level);
    }
    exportToJson() {
        return JSON.stringify(this._entries(), null, 2);
    }
    importFromJson(json) {
        try {
            const entries = JSON.parse(json);
            this._entries.set(entries);
        }
        catch (error) {
            this.error("Failed to import log entries from JSON");
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: SignalLoggerService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: SignalLoggerService, providedIn: "root" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: SignalLoggerService, decorators: [{
            type: Injectable,
            args: [{ providedIn: "root" }]
        }] });

class DataPatchService {
    storage = signal(null, ...(ngDevMode ? [{ debugName: "storage" }] : []));
    init(storage) {
        this.storage.set(storage);
    }
    getStorage() {
        const s = this.storage();
        if (!s)
            throw new Error("DataPatchService not initialized");
        return s;
    }
    getCollection(collection) {
        const data = this.getStorage().get(collection);
        return data || [];
    }
    saveCollection(collection, data) {
        this.getStorage().set(collection, data);
    }
    create(collection, item) {
        const data = this.getCollection(collection);
        const timestamp = Date.now();
        const entity = {
            ...item,
            created_at: timestamp,
            updated_at: timestamp,
        };
        data.push(entity);
        this.saveCollection(collection, data);
    }
    find(collection, id) {
        const data = this.getCollection(collection);
        return (data.find((item) => item.id === id) || null);
    }
    findAll(collection) {
        return this.getCollection(collection);
    }
    findWhere(collection, predicate) {
        return this.getCollection(collection).filter(predicate);
    }
    update(collection, id, changes) {
        const data = this.getCollection(collection);
        const index = data.findIndex((item) => item.id === id);
        if (index === -1)
            return;
        const updated = {
            ...data[index],
            ...changes,
            updated_at: Date.now(),
        };
        data[index] = updated;
        this.saveCollection(collection, data);
    }
    delete(collection, id) {
        const data = this.getCollection(collection);
        const filtered = data.filter((item) => item.id !== id);
        this.saveCollection(collection, filtered);
    }
    batchUpdate(collection, updates) {
        const data = this.getCollection(collection);
        const now = Date.now();
        for (const { id, changes } of updates) {
            const index = data.findIndex((item) => item.id === id);
            if (index !== -1) {
                data[index] = {
                    ...data[index],
                    ...changes,
                    updated_at: now,
                };
            }
        }
        this.saveCollection(collection, data);
    }
    batchDelete(collection, ids) {
        const data = this.getCollection(collection);
        const filtered = data.filter((item) => !ids.includes(item.id));
        this.saveCollection(collection, filtered);
    }
    count(collection) {
        return this.getCollection(collection).length;
    }
    exists(collection, id) {
        return this.getCollection(collection).some((item) => item.id === id);
    }
    clearCollection(collection) {
        this.saveCollection(collection, []);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: DataPatchService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: DataPatchService, providedIn: "root" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: DataPatchService, decorators: [{
            type: Injectable,
            args: [{ providedIn: "root" }]
        }] });

class StorageService {
}

class SignalStore {
    store = new Map();
    subscribers = new Set();
    set(key, value) {
        this.store.set(key, value);
        this.notify(key, value);
    }
    get(key) {
        return this.store.get(key);
    }
    update(key, fn) {
        const current = this.store.get(key);
        const updated = fn(current);
        this.store.set(key, updated);
        this.notify(key, updated);
    }
    delete(key) {
        this.store.delete(key);
        this.notify(key, undefined);
    }
    keys() {
        return Array.from(this.store.keys());
    }
    toJSON() {
        const result = {};
        for (const [key, value] of this.store) {
            result[key] = value;
        }
        return result;
    }
    fromJSON(json) {
        this.store.clear();
        for (const [key, value] of Object.entries(json)) {
            this.store.set(key, value);
        }
        this.notifyAll();
    }
    subscribe(callback) {
        this.subscribers.add(callback);
        return () => {
            this.subscribers.delete(callback);
        };
    }
    notify(key, value) {
        for (const callback of this.subscribers) {
            callback(key, value);
        }
    }
    notifyAll() {
        for (const [key, value] of this.store) {
            this.notify(key, value);
        }
    }
}
function createSignalStore() {
    return new SignalStore();
}

class StorageCacheService {
    cache = new Map();
    get(key) {
        const entry = this.cache.get(key);
        if (!entry)
            return null;
        if (entry.ttl && Date.now() - entry.timestamp > entry.ttl) {
            this.cache.delete(key);
            return null;
        }
        return entry.value;
    }
    set(key, value, ttl) {
        this.cache.set(key, {
            value,
            timestamp: Date.now(),
            ttl,
        });
    }
    invalidate(key) {
        this.cache.delete(key);
    }
    invalidateAll() {
        this.cache.clear();
    }
    has(key) {
        const entry = this.cache.get(key);
        if (!entry)
            return false;
        if (entry.ttl && Date.now() - entry.timestamp > entry.ttl) {
            this.cache.delete(key);
            return false;
        }
        return true;
    }
}

class StorageQueryService {
    query(items, filter) {
        return items.filter((item) => {
            return filter.every((f) => {
                const value = item[f.field];
                switch (f.operator) {
                    case "eq":
                        return value === f.value;
                    case "ne":
                        return value !== f.value;
                    case "gt":
                        return value > f.value;
                    case "gte":
                        return value >= f.value;
                    case "lt":
                        return value < f.value;
                    case "lte":
                        return value <= f.value;
                    case "contains":
                        return String(value).includes(String(f.value));
                    case "in":
                        return f.value.includes(value);
                    default:
                        return true;
                }
            });
        });
    }
    sortBy(items, field, direction = "asc") {
        return [...items].sort((a, b) => {
            const aVal = a[field];
            const bVal = b[field];
            const cmp = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
            return direction === "asc" ? cmp : -cmp;
        });
    }
    paginate(items, page, pageSize) {
        const start = (page - 1) * pageSize;
        return items.slice(start, start + pageSize);
    }
}

class UnifiedStorageService {
    signalStore;
    cache;
    query;
    constructor() {
        this.signalStore = new SignalStore();
        this.cache = new StorageCacheService();
        this.query = new StorageQueryService();
    }
    async get(key) {
        const cached = this.cache.get(key);
        if (cached !== null)
            return cached;
        const value = this.signalStore.get(key);
        if (value !== null) {
            this.cache.set(key, value);
        }
        return value;
    }
    async set(key, value) {
        this.signalStore.set(key, value);
        this.cache.set(key, value);
    }
    async find(filter) {
        const all = this.signalStore
            .keys()
            .map((k) => this.signalStore.get(k));
        return this.query.query(all, filter);
    }
    async remove(key) {
        this.signalStore.delete(key);
        this.cache.invalidate(key);
    }
}

class CrudService {
    async find(entity, id) {
        const result = await this.execute("find", entity, {
            filter: { id },
        });
        return result.data ?? null;
    }
    async findAll(entity, filter) {
        const result = await this.execute("find", entity, {
            filter: filter,
        });
        return result.data ?? [];
    }
    async create(entity, data) {
        const result = await this.execute("create", entity, { data });
        return result.data;
    }
    async update(entity, id, data) {
        const result = await this.execute("update", entity, {
            id,
            data,
        });
        return result.data;
    }
    async patch(entity, id, data) {
        const result = await this.execute("patch", entity, {
            id,
            data,
        });
        return result.data;
    }
    async delete(entity, id) {
        await this.execute("delete", entity, { id });
    }
    async count(entity) {
        const result = await this.execute("count", entity);
        return result.count;
    }
    async exists(entity, id) {
        const result = await this.execute("exists", entity, {
            id,
        });
        return result.exists;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: CrudService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: CrudService, providedIn: "root" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: CrudService, decorators: [{
            type: Injectable,
            args: [{ providedIn: "root" }]
        }] });

var ResponseStatus;
(function (ResponseStatus) {
    ResponseStatus["Success"] = "success";
    ResponseStatus["Created"] = "created";
    ResponseStatus["Updated"] = "updated";
    ResponseStatus["Deleted"] = "deleted";
    ResponseStatus["Error"] = "error";
    ResponseStatus["ValidationError"] = "validationError";
    ResponseStatus["NotFound"] = "notFound";
    ResponseStatus["Unauthorized"] = "unauthorized";
    ResponseStatus["Forbidden"] = "forbidden";
})(ResponseStatus || (ResponseStatus = {}));
function isSuccess(response) {
    return (response.status === ResponseStatus.Success ||
        response.status === ResponseStatus.Created ||
        response.status === ResponseStatus.Updated ||
        response.status === ResponseStatus.Deleted);
}
function isError(response) {
    return (response.status === ResponseStatus.Error ||
        response.status === ResponseStatus.ValidationError ||
        response.status === ResponseStatus.NotFound ||
        response.status === ResponseStatus.Unauthorized ||
        response.status === ResponseStatus.Forbidden);
}
function getErrorMessage(response) {
    if (isError(response)) {
        return response.message;
    }
    return null;
}
function unwrapResponse(response) {
    if (isError(response)) {
        throw new Error(response.message || "Unknown error");
    }
    if (response.data === null) {
        throw new Error("No data in response");
    }
    return response.data;
}
function mapResponse(response, mapper) {
    return {
        ...response,
        data: response.data !== null ? mapper(response.data) : null,
    };
}

function parseErrorFromInvoke(error) {
    if (error && typeof error === "object") {
        const e = error;
        if ("type" in e && "message" in e) {
            return e;
        }
        if ("message" in e) {
            return {
                type: ErrorType.Internal,
                message: String(e.message),
            };
        }
    }
    if (error instanceof Error) {
        return {
            type: ErrorType.Internal,
            message: error.message,
        };
    }
    return {
        type: ErrorType.Internal,
        message: String(error),
    };
}
async function invokeCommand(command, args, options) {
    const { retryCount = 0, retryDelay = 1000 } = options || {};
    if (retryCount === 0) {
        try {
            const result = await invoke(command, args);
            return {
                success: true,
                data: result,
                error: null,
            };
        }
        catch (error) {
            return {
                success: false,
                data: null,
                error: parseErrorFromInvoke(error),
            };
        }
    }
    try {
        const result = await invokeWithRetry(() => invoke(command, args), {
            maxAttempts: retryCount + 1,
            initialDelayMs: retryDelay,
            maxDelayMs: 60000,
        });
        return {
            success: true,
            data: result,
            error: null,
        };
    }
    catch (error) {
        return {
            success: false,
            data: null,
            error: parseErrorFromInvoke(error),
        };
    }
}
async function invokeCommandWithResponse(command, args, options) {
    const { retryCount = 0, retryDelay = 1000 } = options || {};
    let lastResponse = {
        status: ResponseStatus.Error,
        message: "Unknown error",
        data: null,
    };
    for (let attempt = 0; attempt <= retryCount; attempt++) {
        try {
            const result = await invoke(command, args);
            lastResponse = result;
            if (result.status !== ResponseStatus.Error &&
                result.status !== ResponseStatus.ValidationError) {
                return result;
            }
            if (attempt < retryCount) {
                await new Promise((resolve) => setTimeout(resolve, retryDelay * Math.pow(2, attempt)));
            }
        }
        catch (error) {
            lastResponse = {
                status: ResponseStatus.Error,
                message: error instanceof Error ? error.message : String(error),
                data: null,
            };
            if (attempt < retryCount) {
                await new Promise((resolve) => setTimeout(resolve, retryDelay * Math.pow(2, attempt)));
            }
        }
    }
    return lastResponse;
}
async function invokeVoid(command, args, options) {
    const result = await invokeCommand(command, args, options);
    if (!result.success) {
        throw new Error(result.error?.message || "Command failed");
    }
}
async function invokeWithError(command, args, options) {
    const result = await invokeCommand(command, args, options);
    if (!result.success || result.data === null) {
        const errorMsg = result.error?.message || "Command failed";
        throw new Error(errorMsg);
    }
    return result.data;
}

/**
 * Sort array of objects by property and order
 * @param arr - Array to sort
 * @param key - Property name to sort by
 * @param order - "asc" or "desc"
 */
function sortBy(arr, key, order = "asc") {
    return [...arr].sort((a, b) => {
        const aVal = typeof key === "number" ? a[key] : a[key];
        const bVal = typeof key === "number" ? b[key] : b[key];
        if (aVal < bVal)
            return order === "asc" ? -1 : 1;
        if (aVal > bVal)
            return order === "asc" ? 1 : -1;
        return 0;
    });
}

/**
 * Clamp a value between min and max
 * @param value - Value to clamp
 * @param min - Minimum value
 * @param max - Maximum value
 */
function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

/**
 * Format a date as a human-readable "time ago" string
 * @param date - Date to format
 * @returns String like "5 minutes ago", "2 hours ago", etc.
 */
function timeAgo(date) {
    const now = new Date();
    const past = new Date(date);
    const diffMs = now.getTime() - past.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);
    const diffWeek = Math.floor(diffDay / 7);
    const diffMonth = Math.floor(diffDay / 30);
    const diffYear = Math.floor(diffDay / 365);
    if (diffSec < 60)
        return "just now";
    if (diffMin < 60)
        return `${diffMin} minute${diffMin !== 1 ? "s" : ""} ago`;
    if (diffHour < 24)
        return `${diffHour} hour${diffHour !== 1 ? "s" : ""} ago`;
    if (diffDay < 7)
        return `${diffDay} day${diffDay !== 1 ? "s" : ""} ago`;
    if (diffWeek < 4)
        return `${diffWeek} week${diffWeek !== 1 ? "s" : ""} ago`;
    if (diffMonth < 12)
        return `${diffMonth} month${diffMonth !== 1 ? "s" : ""} ago`;
    return `${diffYear} year${diffYear !== 1 ? "s" : ""} ago`;
}

/**
 * Searching algorithms.
 */
/** Linear search. Returns the index of the first match for `predicate`, or -1. O(n). */
function linearSearch(arr, predicate) {
    for (let i = 0; i < arr.length; i++) {
        if (predicate(arr[i]))
            return i;
    }
    return -1;
}
/** Binary search on a sorted array using natural ordering. O(log n). */
function binarySearch(arr, target, compare) {
    const cmp = compare ?? ((a, b) => (a < b ? -1 : a > b ? 1 : 0));
    let lo = 0;
    let hi = arr.length - 1;
    while (lo <= hi) {
        const mid = (lo + hi) >>> 1;
        const c = cmp(arr[mid], target);
        if (c === 0)
            return mid;
        if (c < 0)
            lo = mid + 1;
        else
            hi = mid - 1;
    }
    return -1;
}
/** Binary search by a key function. */
function binarySearchBy(arr, key, keyFn) {
    let lo = 0;
    let hi = arr.length - 1;
    while (lo <= hi) {
        const mid = (lo + hi) >>> 1;
        const mk = keyFn(arr[mid]);
        if (mk === key)
            return mid;
        if (mk < key)
            lo = mid + 1;
        else
            hi = mid - 1;
    }
    return -1;
}
/** First index where `arr[i] >= target` (sorted array). */
function lowerBound(arr, target, compare) {
    const cmp = compare ?? ((a, b) => (a < b ? -1 : a > b ? 1 : 0));
    let lo = 0;
    let hi = arr.length;
    while (lo < hi) {
        const mid = (lo + hi) >>> 1;
        if (cmp(arr[mid], target) < 0)
            lo = mid + 1;
        else
            hi = mid;
    }
    return lo;
}
/** First index where `arr[i] > target` (sorted array). */
function upperBound(arr, target, compare) {
    const cmp = compare ?? ((a, b) => (a < b ? -1 : a > b ? 1 : 0));
    let lo = 0;
    let hi = arr.length;
    while (lo < hi) {
        const mid = (lo + hi) >>> 1;
        if (cmp(arr[mid], target) <= 0)
            lo = mid + 1;
        else
            hi = mid;
    }
    return lo;
}
/** Jump search on a sorted array. O(√n). */
function jumpSearch(arr, target) {
    const n = arr.length;
    if (n === 0)
        return -1;
    const step = Math.max(1, Math.floor(Math.sqrt(n)));
    let prev = 0;
    while (prev < n && arr[Math.min(step, n) - 1] < target) {
        prev += step;
        if (prev >= n)
            return -1;
    }
    for (let i = prev; i < Math.min(prev + step, n); i++) {
        if (arr[i] === target)
            return i;
    }
    return -1;
}

/**
 * String algorithms.
 */
/** Levenshtein edit distance. O(m*n) time, O(min(m,n)) space. */
function levenshtein(a, b) {
    if (a === b)
        return 0;
    if (a.length === 0)
        return b.length;
    if (b.length === 0)
        return a.length;
    const prev = new Array(b.length + 1);
    const curr = new Array(b.length + 1);
    for (let j = 0; j <= b.length; j++)
        prev[j] = j;
    for (let i = 1; i <= a.length; i++) {
        curr[0] = i;
        for (let j = 1; j <= b.length; j++) {
            const cost = a[i - 1] === b[j - 1] ? 0 : 1;
            curr[j] = Math.min(curr[j - 1] + 1, prev[j] + 1, prev[j - 1] + cost);
        }
        for (let j = 0; j <= b.length; j++)
            prev[j] = curr[j];
    }
    return prev[b.length];
}
/** Hamming distance. Throws if strings have different lengths. */
function hamming(a, b) {
    if (a.length !== b.length)
        throw new Error("Hamming distance requires equal length strings");
    let d = 0;
    for (let i = 0; i < a.length; i++)
        if (a[i] !== b[i])
            d++;
    return d;
}
/** Jaro-Winkler similarity. Returns 0..1. */
function jaroWinkler(a, b) {
    if (a === b)
        return 1;
    const m = jaroMatches(a, b);
    if (m === 0)
        return 0;
    const t = jaroTranspositions(a, b);
    const jaro = (m / a.length + m / b.length + (m - t) / m) / 3;
    let prefix = 0;
    for (let i = 0; i < Math.min(4, a.length); i++) {
        if (a[i] === b[i])
            prefix++;
        else
            break;
    }
    return jaro + prefix * 0.1 * (1 - jaro);
}
function jaroMatches(a, b) {
    if (!a.length || !b.length)
        return 0;
    const matchDistance = Math.max(0, Math.floor(Math.max(a.length, b.length) / 2) - 1);
    const aMatches = new Array(a.length).fill(false);
    const bMatches = new Array(b.length).fill(false);
    let matches = 0;
    for (let i = 0; i < a.length; i++) {
        const start = Math.max(0, i - matchDistance);
        const end = Math.min(i + matchDistance + 1, b.length);
        for (let j = start; j < end; j++) {
            if (bMatches[j])
                continue;
            if (a[i] !== b[j])
                continue;
            aMatches[i] = true;
            bMatches[j] = true;
            matches++;
            break;
        }
    }
    return matches;
}
function jaroTranspositions(a, b) {
    const matchDistance = Math.max(0, Math.floor(Math.max(a.length, b.length) / 2) - 1);
    const aMatches = new Array(a.length).fill(false);
    const bMatches = new Array(b.length).fill(false);
    for (let i = 0; i < a.length; i++) {
        const start = Math.max(0, i - matchDistance);
        const end = Math.min(i + matchDistance + 1, b.length);
        for (let j = start; j < end; j++) {
            if (bMatches[j])
                continue;
            if (a[i] !== b[j])
                continue;
            aMatches[i] = true;
            bMatches[j] = true;
            break;
        }
    }
    let k = 0;
    let transpositions = 0;
    for (let i = 0; i < a.length; i++) {
        if (!aMatches[i])
            continue;
        while (!bMatches[k])
            k++;
        if (a[i] !== b[k])
            transpositions++;
        k++;
    }
    return Math.floor(transpositions / 2);
}
/** Longest common subsequence length. */
function lcsLength(a, b) {
    const m = a.length;
    const n = b.length;
    const dp = new Array(n + 1).fill(0);
    for (let i = 1; i <= m; i++) {
        let prev = 0;
        for (let j = 1; j <= n; j++) {
            const tmp = dp[j];
            if (a[i - 1] === b[j - 1])
                dp[j] = prev + 1;
            else
                dp[j] = Math.max(dp[j], dp[j - 1]);
            prev = tmp;
        }
    }
    return dp[n];
}
/** Longest common substring length. */
function lcsSubstringLength(a, b) {
    const m = a.length;
    const n = b.length;
    if (m === 0 || n === 0)
        return 0;
    let best = 0;
    const prev = new Array(n + 1).fill(0);
    const curr = new Array(n + 1).fill(0);
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (a[i - 1] === b[j - 1]) {
                curr[j] = prev[j - 1] + 1;
                if (curr[j] > best)
                    best = curr[j];
            }
            else {
                curr[j] = 0;
            }
        }
        for (let j = 0; j <= n; j++)
            prev[j] = curr[j];
    }
    return best;
}
function isPalindrome(s) {
    const n = s.length;
    for (let i = 0; i < n / 2; i++) {
        if (s[i] !== s[n - 1 - i])
            return false;
    }
    return true;
}
function kebabToCamel(s) {
    return s.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
}
function camelToKebab(s) {
    return s.replace(/[A-Z]/g, (c) => "-" + c.toLowerCase());
}
function truncate(s, max, suffix = "…") {
    return s.length <= max ? s : s.slice(0, max - suffix.length) + suffix;
}

/**
 * Math algorithms and statistics.
 */
function gcd(a, b) {
    a = Math.abs(Math.trunc(a));
    b = Math.abs(Math.trunc(b));
    while (b) {
        [a, b] = [b, a % b];
    }
    return a;
}
function lcm(a, b) {
    if (a === 0 || b === 0)
        return 0;
    return Math.abs(a * b) / gcd(a, b);
}
function factorial(n) {
    if (n < 0)
        throw new Error("factorial undefined for negative numbers");
    if (n > 20)
        throw new Error("factorial overflow for n > 20 in number mode");
    let r = 1;
    for (let i = 2; i <= n; i++)
        r *= i;
    return r;
}
function isPrime(n) {
    if (n < 2)
        return false;
    if (n < 4)
        return true;
    if (n % 2 === 0)
        return false;
    for (let i = 3; i * i <= n; i += 2) {
        if (n % i === 0)
            return false;
    }
    return true;
}
/** Sieve of Eratosthenes. Returns all primes <= n. */
function primesUpTo(n) {
    if (n < 2)
        return [];
    const sieve = new Uint8Array(n + 1);
    const primes = [];
    for (let i = 2; i <= n; i++) {
        if (sieve[i])
            continue;
        primes.push(i);
        for (let j = i * i; j <= n; j += i)
            sieve[j] = 1;
    }
    return primes;
}
function fibonacci(n) {
    if (n < 0)
        throw new Error("fibonacci undefined for negative numbers");
    if (n === 0)
        return 0;
    let a = 0, b = 1;
    for (let i = 2; i <= n; i++) {
        const t = a + b;
        a = b;
        b = t;
    }
    return b;
}
/** Fast exponentiation. O(log exp). */
function power(base, exp) {
    if (exp < 0)
        throw new Error("negative exponent not supported");
    let result = 1;
    let b = base;
    let e = exp;
    while (e > 0) {
        if (e & 1)
            result *= b;
        b *= b;
        e >>= 1;
    }
    return result;
}
function isPowerOfTwo(n) {
    return n > 0 && (n & (n - 1)) === 0;
}
function nextPowerOfTwo(n) {
    if (n <= 1)
        return 1;
    let p = 1;
    while (p < n)
        p <<= 1;
    return p;
}
function mean(nums) {
    if (nums.length === 0)
        return 0;
    let s = 0;
    for (const n of nums)
        s += n;
    return s / nums.length;
}
function median(nums) {
    if (nums.length === 0)
        return 0;
    const sorted = [...nums].sort((a, b) => a - b);
    const mid = sorted.length >> 1;
    return sorted.length % 2 === 0
        ? (sorted[mid - 1] + sorted[mid]) / 2
        : sorted[mid];
}
function stddev(nums) {
    if (nums.length < 2)
        return 0;
    const m = mean(nums);
    let s = 0;
    for (const n of nums)
        s += (n - m) ** 2;
    return Math.sqrt(s / (nums.length - 1));
}

/**
 * Array algorithms.
 */
function dedupe(arr, keyFn) {
    if (!keyFn)
        return Array.from(new Set(arr));
    const seen = new Set();
    const out = [];
    for (const item of arr) {
        const k = keyFn(item);
        if (!seen.has(k)) {
            seen.add(k);
            out.push(item);
        }
    }
    return out;
}
function groupBy(arr, keyFn) {
    const out = new Map();
    for (const item of arr) {
        const k = keyFn(item);
        const bucket = out.get(k);
        if (bucket)
            bucket.push(item);
        else
            out.set(k, [item]);
    }
    return out;
}
function chunk(arr, size) {
    if (size <= 0)
        throw new Error("chunk size must be positive");
    const out = [];
    for (let i = 0; i < arr.length; i += size)
        out.push(arr.slice(i, i + size));
    return out;
}
function partition(arr, predicate) {
    const yes = [];
    const no = [];
    for (const item of arr) {
        if (predicate(item))
            yes.push(item);
        else
            no.push(item);
    }
    return [yes, no];
}
function flatten(arr, depth = 1) {
    const out = [];
    for (const item of arr) {
        if (Array.isArray(item) && depth > 0)
            out.push(...flatten(item, depth - 1));
        else
            out.push(item);
    }
    return out;
}
function zip(a, b) {
    const n = Math.min(a.length, b.length);
    const out = new Array(n);
    for (let i = 0; i < n; i++)
        out[i] = [a[i], b[i]];
    return out;
}
function intersection(...arrs) {
    if (arrs.length === 0)
        return [];
    const [first, ...rest] = arrs;
    return first.filter((x) => rest.every((a) => a.includes(x)));
}
function union(...arrs) {
    const out = [];
    const seen = new Set();
    for (const a of arrs)
        for (const x of a) {
            if (!seen.has(x)) {
                seen.add(x);
                out.push(x);
            }
        }
    return out;
}
function difference(a, b) {
    const set = new Set(b);
    return a.filter((x) => !set.has(x));
}

/**
 * Graph algorithms.
 */
function createGraph() {
    return { nodes: new Map(), adjacency: new Map() };
}
function addNode(g, node) {
    g.nodes.set(node.id, node);
    if (!g.adjacency.has(node.id))
        g.adjacency.set(node.id, []);
}
function addEdge(g, edge, directed = false) {
    const weight = edge.weight ?? 1;
    g.adjacency.get(edge.from)?.push({ to: edge.to, weight });
    if (!directed) {
        if (!g.adjacency.has(edge.to))
            g.adjacency.set(edge.to, []);
        g.adjacency.get(edge.to).push({ to: edge.from, weight });
    }
}
function bfs(g, start) {
    const visited = new Set([start]);
    const order = [];
    const queue = [start];
    while (queue.length) {
        const node = queue.shift();
        order.push(node);
        for (const { to } of g.adjacency.get(node) ?? []) {
            if (!visited.has(to)) {
                visited.add(to);
                queue.push(to);
            }
        }
    }
    return order;
}
function dfs(g, start) {
    const visited = new Set();
    const order = [];
    const visit = (n) => {
        visited.add(n);
        order.push(n);
        for (const { to } of g.adjacency.get(n) ?? []) {
            if (!visited.has(to))
                visit(to);
        }
    };
    visit(start);
    return order;
}
/** Dijkstra's shortest path. Returns map of node id → distance from start. */
function dijkstra(g, start) {
    const dist = new Map();
    for (const id of g.nodes.keys())
        dist.set(id, Infinity);
    dist.set(start, 0);
    const visited = new Set();
    while (visited.size < g.nodes.size) {
        let u = null;
        let min = Infinity;
        for (const [id, d] of dist) {
            if (!visited.has(id) && d < min) {
                min = d;
                u = id;
            }
        }
        if (u === null)
            break;
        visited.add(u);
        for (const { to, weight } of g.adjacency.get(u) ?? []) {
            const alt = min + weight;
            if (alt < (dist.get(to) ?? Infinity))
                dist.set(to, alt);
        }
    }
    return dist;
}
/** Topological sort via Kahn's algorithm. Returns null if the graph has a cycle. */
function topologicalSort(g) {
    const inDegree = new Map();
    for (const id of g.nodes.keys())
        inDegree.set(id, 0);
    for (const [, edges] of g.adjacency) {
        for (const { to } of edges)
            inDegree.set(to, (inDegree.get(to) ?? 0) + 1);
    }
    const queue = [];
    for (const [id, d] of inDegree)
        if (d === 0)
            queue.push(id);
    const order = [];
    while (queue.length) {
        const n = queue.shift();
        order.push(n);
        for (const { to } of g.adjacency.get(n) ?? []) {
            const d = (inDegree.get(to) ?? 0) - 1;
            inDegree.set(to, d);
            if (d === 0)
                queue.push(to);
        }
    }
    return order.length === g.nodes.size ? order : null;
}
function hasCycle(g) {
    return topologicalSort(g) === null;
}

/**
 * Tree algorithms.
 */
function walkPreorder(node, fn) {
    fn(node);
    for (const child of node.children ?? [])
        walkPreorder(child, fn);
}
function walkInorder(node, fn) {
    const children = node.children ?? [];
    const mid = children.length >> 1;
    for (let i = 0; i < mid; i++)
        walkInorder(children[i], fn);
    fn(node);
    for (let i = mid; i < children.length; i++)
        walkInorder(children[i], fn);
}
function walkPostorder(node, fn) {
    for (const child of node.children ?? [])
        walkPostorder(child, fn);
    fn(node);
}
function walkLevelOrder(node, fn) {
    const queue = [
        { node, level: 0 },
    ];
    while (queue.length) {
        const { node: n, level } = queue.shift();
        fn(n, level);
        for (const c of n.children ?? [])
            queue.push({ node: c, level: level + 1 });
    }
}
function findNode(node, id) {
    if (node.id === id)
        return node;
    for (const child of node.children ?? []) {
        const found = findNode(child, id);
        if (found)
            return found;
    }
    return null;
}
function treeDepth(node) {
    if (!node.children || node.children.length === 0)
        return 0;
    let max = 0;
    for (const c of node.children) {
        const d = treeDepth(c);
        if (d > max)
            max = d;
    }
    return max + 1;
}
function flattenTree(node) {
    const out = [];
    walkPreorder(node, (n) => out.push(n));
    return out;
}

/**
 * Algorithm suite for @tauri-front/shared.
 * All algorithms are pure functions with no side effects.
 */

/**
 * Route guard that checks resource-action permissions.
 *
 * Usage in route config:
 * {
 *   path: 'admin',
 *   canActivate: [rbacGuard],
 *   data: {
 *     permissions: ['users.read', 'settings.write'],
 *     requireAll: false  // OR logic (default), true = AND logic
 *   }
 * }
 */
const rbacGuard = (route, _state) => {
    const injector = inject(Injector);
    const permissionService = injector.get(PermissionService);
    const router = injector.get(Router);
    if (!permissionService.isAuthenticated()) {
        router.navigate(["/login"]);
        return false;
    }
    const requiredPermissions = route.data?.["permissions"];
    const requireAll = route.data?.["requireAll"] ?? false;
    if (requiredPermissions && requiredPermissions.length > 0) {
        const results = requiredPermissions.map((perm) => {
            const [resource, action] = perm.split(".");
            return permissionService.hasPermission(resource, action);
        });
        if (requireAll) {
            if (!results.every((r) => r)) {
                router.navigate(["/unauthorized"]);
                return false;
            }
        }
        else {
            if (!results.some((r) => r)) {
                router.navigate(["/unauthorized"]);
                return false;
            }
        }
    }
    return true;
};
/**
 * Guard that checks for specific roles.
 *
 * Usage in route config:
 * {
 *   path: 'admin',
 *   canActivate: [rbacRoleGuard],
 *   data: {
 *     roles: ['admin', 'moderator']
 *   }
 * }
 */
const rbacRoleGuard = (route, _state) => {
    const injector = inject(Injector);
    const permissionService = injector.get(PermissionService);
    const router = injector.get(Router);
    if (!permissionService.isAuthenticated()) {
        router.navigate(["/login"]);
        return false;
    }
    const requiredRoles = route.data?.["roles"];
    if (requiredRoles && requiredRoles.length > 0) {
        const hasRole = requiredRoles.some((role) => permissionService.hasRole(role));
        if (!hasRole) {
            router.navigate(["/unauthorized"]);
            return false;
        }
    }
    return true;
};

/**
 * Structural directive that shows/hides content based on permission.
 *
 * Usage:
 * <button *rbacHasPermission="'users.write'">Edit Users</button>
 * <div *rbacHasPermission="'users.delete'; else noPerm">Delete</div>
 * <ng-template #noPerm>No permission</ng-template>
 *
 * Supports AND logic with multiple permissions:
 * <button *rbacHasPermission="['users.write', 'users.admin']">Admin Action</button>
 */
class RbacHasPermissionDirective {
    permissionService;
    templateRef;
    viewContainer;
    permission = "";
    constructor(permissionService, templateRef, viewContainer) {
        this.permissionService = permissionService;
        this.templateRef = templateRef;
        this.viewContainer = viewContainer;
    }
    ngOnInit() {
        this.updateView();
    }
    updateView() {
        const hasPermission = this.checkPermission();
        this.viewContainer.clear();
        if (hasPermission) {
            this.viewContainer.createEmbeddedView(this.templateRef);
        }
    }
    checkPermission() {
        if (Array.isArray(this.permission)) {
            return this.permission.every((perm) => {
                const [resource, action] = perm.split(".");
                return resource && action
                    ? this.permissionService.hasPermission(resource, action)
                    : false;
            });
        }
        const [resource, action] = this.permission.split(".");
        return resource && action
            ? this.permissionService.hasPermission(resource, action)
            : false;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: RbacHasPermissionDirective, deps: [{ token: PermissionService }, { token: i0.TemplateRef }, { token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "20.3.25", type: RbacHasPermissionDirective, isStandalone: true, selector: "[rbacHasPermission]", inputs: { permission: ["rbacHasPermission", "permission"] }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: RbacHasPermissionDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: "[rbacHasPermission]",
                    standalone: true,
                }]
        }], ctorParameters: () => [{ type: PermissionService }, { type: i0.TemplateRef }, { type: i0.ViewContainerRef }], propDecorators: { permission: [{
                type: Input,
                args: ["rbacHasPermission"]
            }] } });
/**
 * Structural directive that shows/hides content based on role membership.
 *
 * Usage:
 * <button *rbacHasRole="'admin'">Admin Panel</button>
 * <div *rbacHasRole="['editor', 'moderator']">Can Edit</div>
 */
class RbacHasRoleDirective {
    permissionService;
    templateRef;
    viewContainer;
    role = "";
    constructor(permissionService, templateRef, viewContainer) {
        this.permissionService = permissionService;
        this.templateRef = templateRef;
        this.viewContainer = viewContainer;
    }
    ngOnInit() {
        this.updateView();
    }
    updateView() {
        const hasRole = this.checkRole();
        this.viewContainer.clear();
        if (hasRole) {
            this.viewContainer.createEmbeddedView(this.templateRef);
        }
    }
    checkRole() {
        if (Array.isArray(this.role)) {
            return this.role.some((r) => this.permissionService.hasRole(r));
        }
        return this.permissionService.hasRole(this.role);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: RbacHasRoleDirective, deps: [{ token: PermissionService }, { token: i0.TemplateRef }, { token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "20.3.25", type: RbacHasRoleDirective, isStandalone: true, selector: "[rbacHasRole]", inputs: { role: ["rbacHasRole", "role"] }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: RbacHasRoleDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: "[rbacHasRole]",
                    standalone: true,
                }]
        }], ctorParameters: () => [{ type: PermissionService }, { type: i0.TemplateRef }, { type: i0.ViewContainerRef }], propDecorators: { role: [{
                type: Input,
                args: ["rbacHasRole"]
            }] } });

// @tauri-front/shared - Unified shared library
// Explicit re-exports to avoid name collisions
// Side-effect import: registers ALL Angular components in SCHEMA_COMPONENT_MAP
// MUST be imported before any schema rendering

/**
 * Generated bundle index. Do not edit.
 */

export { BaseDestroyableComponent, ComponentRegistryService, DataBindingResolverService, DataPatchService, ErrorHandlerService, ErrorType, EventBusService, GlobalStateService, GuardService, I18nService, InvokeWrapperService, LayoutEngineService, PermissionService, RbacHasPermissionDirective, RbacHasRoleDirective, CrudService as RemoteCrudService, ResponseStatus, SCHEMA_COMPONENT_MAP, SchemaElementComponent, SchemaFetcherService, SchemaRendererService, SchemaRouteViewerComponent, SchemaRouterService, SchemaShellComponent, ShortcutService, SignalLoggerService, SignalStoreService, SignalSyncService, StorageService, StyleThemeService, StyleThemeService as ThemeService, ThemeToggleService, ToastService, TodoPermission, UnifiedStorageService, addEdge, addNode, bfs, binarySearch, binarySearchBy, camelToKebab, chunk, clamp, createGraph, dataComponents, dedupe, dfs, difference, dijkstra, factorial, feedbackComponents, fibonacci, findNode, flatten, flattenTree, formatError, gcd, getAllStyleVariants, getComponentStyleClasses, getCurrentStyle, getErrorMessage, getStyleClassPrefix, groupBy, hamming, hasCycle, intersection, invokeCommand, invokeCommandWithResponse, invokeVoid, invokeWithError, isError, isPalindrome, isPowerOfTwo, isPrime, isSuccess, jaroWinkler, jumpSearch, kebabToCamel, layoutComponents, lcm, lcsLength, lcsSubstringLength, levenshtein, linearSearch, loadStyleVariant, lowerBound, mapResponse, mean, median, nextPowerOfTwo, parseError, partition, power, primesUpTo, rbacGuard, rbacRoleGuard, registerSchemaComponent, setCurrentStyle, sortBy, stddev, timeAgo, topologicalSort, treeDepth, truncate, uiComponents, union, unwrapResponse, upperBound, walkInorder, walkLevelOrder, walkPostorder, walkPreorder, zip };
//# sourceMappingURL=tauri-front-shared.mjs.map
