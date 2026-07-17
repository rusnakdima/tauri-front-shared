import * as i0 from '@angular/core';
import { Input, Component, EventEmitter, Output, ChangeDetectionStrategy, signal, HostListener, computed, Injectable, effect, inject, Injector, ApplicationRef, ViewContainerRef, ViewChild, output, input, CUSTOM_ELEMENTS_SCHEMA, ElementRef, Optional, provideBrowserGlobalErrorListeners, provideZoneChangeDetection, Directive } from '@angular/core';
import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Subject, map, distinctUntilChanged } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { invoke } from '@tauri-apps/api/core';
import { listen } from '@tauri-apps/api/event';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

const SCHEMA_COMPONENT_MAP = new Map();
function registerSchemaComponent(selector, component) {
    SCHEMA_COMPONENT_MAP.set(selector, component);
}

// MDI Font icon mapping - using @mdi/font icon names (kebab-case)
const MI_ICONS = {
    // Navigation
    home: "home",
    menu: "menu",
    close: "close",
    check: "check",
    "chevron-down": "chevron-down",
    "chevron-right": "chevron-right",
    // Actions
    edit: "pencil",
    delete: "delete",
    add: "plus",
    search: "magnify",
    undo: "undo",
    redo: "redo",
    remove: "minus",
    fit_screen: "fullscreen",
    grid: "view-grid",
    grid_on: "view-grid",
    zoom_in: "magnify-plus",
    zoom_out: "magnify-minus",
    // Status
    info: "information",
    warning: "alert",
    error: "alert-circle",
    success: "check-circle",
    // Content
    user: "account",
    settings: "cog",
    star: "star",
    heart: "heart",
    // Media
    image: "image",
    camera: "camera",
    // Files
    file: "file-document",
    folder: "folder",
    // Misc
    sun: "white-balance-sunny",
    moon: "moon-waning-crescent",
    download: "download",
    upload: "upload",
    copy: "content-copy",
    // Translation & Input
    translate: "translate",
    keyboard: "keyboard",
    // Additional
    search_off: "magnify-close",
    swap_vert: "swap-vertical",
    expand_more: "chevron-down",
    dark_mode: "weather-night",
    light_mode: "white-balance-sunny",
    arrow_back: "arrow-left",
    arrow_forward: "arrow-right",
    first_page: "page-first",
    last_page: "page-last",
    chevron_left: "chevron-left",
    chevron_right: "chevron-right",
    content_copy: "content-copy",
    clear: "close",
    language: "web",
    xmark: "close",
    // Schema icons
    "alert-triangle": "alert",
    globe: "web",
};
class IconComponent {
    icon = "";
    size = 24;
    classes = "";
    spin = false;
    get iconName() {
        return MI_ICONS[this.icon] || MI_ICONS["info"] || "information";
    }
    get sizeClass() {
        if (this.size === 16)
            return "text-[16px]";
        if (this.size === 18)
            return "text-[18px]";
        if (this.size === 20)
            return "text-[20px]";
        if (this.size === 24)
            return "text-[24px]";
        if (this.size === 32)
            return "text-[32px]";
        if (this.size === 48)
            return "text-[48px]";
        return `text-[${this.size}px]`;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: IconComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "22.0.6", type: IconComponent, isStandalone: true, selector: "app-icon", inputs: { icon: "icon", size: "size", classes: "classes", spin: "spin" }, ngImport: i0, template: `
    <span class="material-symbols-rounded" [style.font-size.px]="size">{{
      icon
    }}</span>
  `, isInline: true });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: IconComponent, decorators: [{
            type: Component,
            args: [{
                    selector: "app-icon",
                    standalone: true,
                    imports: [],
                    template: `
    <span class="material-symbols-rounded" [style.font-size.px]="size">{{
      icon
    }}</span>
  `,
                }]
        }], propDecorators: { icon: [{
                type: Input
            }], size: [{
                type: Input
            }], classes: [{
                type: Input
            }], spin: [{
                type: Input
            }] } });

class ButtonComponent {
    variant = "primary";
    disabled = false;
    loading = false;
    icon = null;
    iconPosition = "left";
    fullWidth = false;
    type = "button";
    label = "";
    classes = "";
    ariaLabel = "";
    clicked = new EventEmitter();
    handleClick(e) {
        if (this.disabled || this.loading) {
            e.preventDefault();
            e.stopPropagation();
            return;
        }
        this.clicked.emit(e);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: ButtonComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "22.0.6", type: ButtonComponent, isStandalone: true, selector: "app-button", inputs: { variant: "variant", disabled: "disabled", loading: "loading", icon: "icon", iconPosition: "iconPosition", fullWidth: "fullWidth", type: "type", label: "label", classes: "classes", ariaLabel: "ariaLabel" }, outputs: { clicked: "clicked" }, ngImport: i0, template: `
    <button
      class="px-4 py-2 text-xs font-medium rounded-full transition-all"
      [class.bg-indigo-600]="variant === 'primary'"
      [class.text-white]="variant === 'primary'"
      [class.hover:bg-indigo-700]="variant === 'primary'"
      [class.bg-indigo-50]="variant === 'tonal'"
      [class.text-indigo-700]="variant === 'tonal'"
      [class.hover:bg-indigo-100]="variant === 'tonal'"
      [class.border]="variant === 'outlined'"
      [class.border-neutral-300]="variant === 'outlined'"
      [class.text-neutral-700]="variant === 'outlined'"
      [class.hover:bg-neutral-50]="variant === 'outlined'"
      [disabled]="disabled"
    >
      {{ label }}
    </button>
  `, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: ButtonComponent, decorators: [{
            type: Component,
            args: [{
                    selector: "app-button",
                    standalone: true,
                    imports: [IconComponent],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: `
    <button
      class="px-4 py-2 text-xs font-medium rounded-full transition-all"
      [class.bg-indigo-600]="variant === 'primary'"
      [class.text-white]="variant === 'primary'"
      [class.hover:bg-indigo-700]="variant === 'primary'"
      [class.bg-indigo-50]="variant === 'tonal'"
      [class.text-indigo-700]="variant === 'tonal'"
      [class.hover:bg-indigo-100]="variant === 'tonal'"
      [class.border]="variant === 'outlined'"
      [class.border-neutral-300]="variant === 'outlined'"
      [class.text-neutral-700]="variant === 'outlined'"
      [class.hover:bg-neutral-50]="variant === 'outlined'"
      [disabled]="disabled"
    >
      {{ label }}
    </button>
  `,
                }]
        }], propDecorators: { variant: [{
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
            }], classes: [{
                type: Input
            }], ariaLabel: [{
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
    valueChange = new EventEmitter();
    blurred = new EventEmitter();
    focused = signal(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "focused" }] : /* istanbul ignore next */ []));
    handleInput(e) {
        this.value = e.target.value;
        this.input.emit(this.value);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: InputComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.0.6", type: InputComponent, isStandalone: true, selector: "app-input", inputs: { type: "type", placeholder: "placeholder", label: "label", icon: "icon", disabled: "disabled", value: "value", error: "error" }, outputs: { input: "input", valueChange: "valueChange", blurred: "blurred" }, ngImport: i0, template: `
    <div class="relative">
      @if (label) {
        <label
          class="block text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-1"
          >{{ label }}</label
        >
      }
      <input
        class="block w-full px-4 py-3 text-sm bg-transparent rounded-2xl border border-neutral-300 dark:border-neutral-600 text-neutral-900 dark:text-white appearance-none focus:outline-none focus:border-indigo-600 focus:ring-0 transition-colors"
        [type]="type"
        [placeholder]="placeholder"
        [value]="value"
        (input)="valueChange.emit($any($event.target).value)"
        [disabled]="disabled"
      />
      @if (error) {
        <p
          class="mt-1 text-xs text-rose-600 dark:text-rose-500 flex items-center gap-1"
        >
          <span class="material-symbols-rounded text-sm">error</span>
          {{ error }}
        </p>
      }
    </div>
  `, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: InputComponent, decorators: [{
            type: Component,
            args: [{
                    selector: "app-input",
                    standalone: true,
                    imports: [IconComponent],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: `
    <div class="relative">
      @if (label) {
        <label
          class="block text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-1"
          >{{ label }}</label
        >
      }
      <input
        class="block w-full px-4 py-3 text-sm bg-transparent rounded-2xl border border-neutral-300 dark:border-neutral-600 text-neutral-900 dark:text-white appearance-none focus:outline-none focus:border-indigo-600 focus:ring-0 transition-colors"
        [type]="type"
        [placeholder]="placeholder"
        [value]="value"
        (input)="valueChange.emit($any($event.target).value)"
        [disabled]="disabled"
      />
      @if (error) {
        <p
          class="mt-1 text-xs text-rose-600 dark:text-rose-500 flex items-center gap-1"
        >
          <span class="material-symbols-rounded text-sm">error</span>
          {{ error }}
        </p>
      }
    </div>
  `,
                }]
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
            }], valueChange: [{
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
    classes = "";
    actionClicked = new EventEmitter();
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: EmptyStateComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.0.6", type: EmptyStateComponent, isStandalone: true, selector: "app-empty-state", inputs: { title: "title", message: "message", icon: "icon", variant: "variant", action: "action", classes: "classes" }, outputs: { actionClicked: "actionClicked" }, ngImport: i0, template: "<div\n  class=\"ui-empty-state-icon\"\n  [class.ui-empty-state-danger]=\"variant === 'danger'\"\n  [class.ui-empty-state-success]=\"variant === 'success'\"\n>\n  @if (icon) {\n    <span>{{ icon }}</span>\n  }\n</div>\n@if (title) {\n  <h3>{{ title }}</h3>\n}\n@if (message) {\n  <p>{{ message }}</p>\n}\n@if (action) {\n  <div>\n    <button class=\"ui-btn ui-btn-primary\" (click)=\"actionClicked.emit($event)\">\n      {{ action }}\n    </button>\n  </div>\n}\n" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: EmptyStateComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-empty-state", standalone: true, imports: [], template: "<div\n  class=\"ui-empty-state-icon\"\n  [class.ui-empty-state-danger]=\"variant === 'danger'\"\n  [class.ui-empty-state-success]=\"variant === 'success'\"\n>\n  @if (icon) {\n    <span>{{ icon }}</span>\n  }\n</div>\n@if (title) {\n  <h3>{{ title }}</h3>\n}\n@if (message) {\n  <p>{{ message }}</p>\n}\n@if (action) {\n  <div>\n    <button class=\"ui-btn ui-btn-primary\" (click)=\"actionClicked.emit($event)\">\n      {{ action }}\n    </button>\n  </div>\n}\n" }]
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
            }], classes: [{
                type: Input
            }], actionClicked: [{
                type: Output
            }] } });
registerSchemaComponent("app-empty-state", EmptyStateComponent);

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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: DialogComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.0.6", type: DialogComponent, isStandalone: true, selector: "app-dialog", inputs: { open: "open", title: "title", size: "size", showHeader: "showHeader", showFooter: "showFooter" }, outputs: { closed: "closed" }, host: { listeners: { "window:keydown.escape": "onEscape()" } }, ngImport: i0, template: "@if (open) {\n  <div class=\"ui-modal-overlay\" (click)=\"handleOverlayClick($event)\">\n    <div class=\"ui-dialog ui-dialog-{{ size }}\">\n      <header class=\"ui-dialog-header\">\n        <h2>{{ title }}</h2>\n        <button class=\"ui-dialog-close\" (click)=\"close()\" aria-label=\"Close\">\n          &times;\n        </button>\n      </header>\n      <div class=\"ui-dialog-body\">\n        <ng-content></ng-content>\n      </div>\n    </div>\n  </div>\n}\n" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: DialogComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-dialog", standalone: true, imports: [], template: "@if (open) {\n  <div class=\"ui-modal-overlay\" (click)=\"handleOverlayClick($event)\">\n    <div class=\"ui-dialog ui-dialog-{{ size }}\">\n      <header class=\"ui-dialog-header\">\n        <h2>{{ title }}</h2>\n        <button class=\"ui-dialog-close\" (click)=\"close()\" aria-label=\"Close\">\n          &times;\n        </button>\n      </header>\n      <div class=\"ui-dialog-body\">\n        <ng-content></ng-content>\n      </div>\n    </div>\n  </div>\n}\n" }]
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

class LoadingComponent {
    size = "md";
    color = "";
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: LoadingComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "22.0.6", type: LoadingComponent, isStandalone: true, selector: "app-loading", inputs: { size: "size", color: "color" }, ngImport: i0, template: "<div class=\"ui-loading ui-loading-{{ size }}\"></div>\n" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: LoadingComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-loading", standalone: true, imports: [], template: "<div class=\"ui-loading ui-loading-{{ size }}\"></div>\n" }]
        }], propDecorators: { size: [{
                type: Input
            }], color: [{
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
    handleChange(_e) {
        this.checked = true;
        this.changed.emit(this.value);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: RadioComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "22.0.6", type: RadioComponent, isStandalone: true, selector: "app-radio", inputs: { name: "name", value: "value", checked: "checked", disabled: "disabled", label: "label" }, outputs: { changed: "changed" }, ngImport: i0, template: `
    <label class="flex items-center gap-2 cursor-pointer">
      <input
        type="radio"
        [name]="name"
        class="w-5 h-5 text-indigo-600 bg-neutral-100 border-neutral-300 focus:ring-indigo-500 dark:bg-neutral-700 dark:border-neutral-600"
      />
      <span class="text-sm text-neutral-700 dark:text-neutral-300">{{
        label
      }}</span>
    </label>
  `, isInline: true });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: RadioComponent, decorators: [{
            type: Component,
            args: [{
                    selector: "app-radio",
                    standalone: true,
                    imports: [],
                    template: `
    <label class="flex items-center gap-2 cursor-pointer">
      <input
        type="radio"
        [name]="name"
        class="w-5 h-5 text-indigo-600 bg-neutral-100 border-neutral-300 focus:ring-indigo-500 dark:bg-neutral-700 dark:border-neutral-600"
      />
      <span class="text-sm text-neutral-700 dark:text-neutral-300">{{
        label
      }}</span>
    </label>
  `,
                }]
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: SliderComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "22.0.6", type: SliderComponent, isStandalone: true, selector: "app-slider", inputs: { min: "min", max: "max", value: "value", step: "step", disabled: "disabled" }, outputs: { input: "input" }, ngImport: i0, template: "<div class=\"ui-slider\">\n  <input\n    type=\"range\"\n    [style.accentColor]=\"'var(--accent)'\"\n    [value]=\"value\"\n    [min]=\"min\"\n    [max]=\"max\"\n    [step]=\"step\"\n    [disabled]=\"disabled\"\n    (input)=\"handleInput($event)\"\n  />\n</div>\n" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: SliderComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-slider", standalone: true, imports: [], template: "<div class=\"ui-slider\">\n  <input\n    type=\"range\"\n    [style.accentColor]=\"'var(--accent)'\"\n    [value]=\"value\"\n    [min]=\"min\"\n    [max]=\"max\"\n    [step]=\"step\"\n    [disabled]=\"disabled\"\n    (input)=\"handleInput($event)\"\n  />\n</div>\n" }]
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
    checkedChange = new EventEmitter();
    toggle() {
        if (!this.disabled) {
            this.checked = !this.checked;
            this.changed.emit(this.checked);
        }
    }
    getSwitchClasses() {
        const base = "w-11 h-6 rounded-full p-0.5 transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";
        const bg = this.checked ? "bg-primary" : "bg-outline";
        return `${base} ${bg}`;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: SwitchComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "22.0.6", type: SwitchComponent, isStandalone: true, selector: "app-switch", inputs: { checked: "checked", label: "label", disabled: "disabled" }, outputs: { changed: "changed", checkedChange: "checkedChange" }, ngImport: i0, template: `
    <label
      class="inline-flex items-center justify-between w-full cursor-pointer"
    >
      <span
        class="text-sm font-medium text-neutral-700 dark:text-neutral-300"
        >{{ label }}</span
      >
      <input
        type="checkbox"
        class="sr-only peer"
        [checked]="checked"
        (change)="checkedChange.emit($any($event.target).checked)"
      />
      <div
        class="relative w-11 h-6 bg-neutral-200 peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-neutral-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-neutral-600 peer-checked:bg-indigo-600"
      ></div>
    </label>
  `, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: SwitchComponent, decorators: [{
            type: Component,
            args: [{
                    selector: "app-switch",
                    standalone: true,
                    imports: [],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: `
    <label
      class="inline-flex items-center justify-between w-full cursor-pointer"
    >
      <span
        class="text-sm font-medium text-neutral-700 dark:text-neutral-300"
        >{{ label }}</span
      >
      <input
        type="checkbox"
        class="sr-only peer"
        [checked]="checked"
        (change)="checkedChange.emit($any($event.target).checked)"
      />
      <div
        class="relative w-11 h-6 bg-neutral-200 peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-neutral-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-neutral-600 peer-checked:bg-indigo-600"
      ></div>
    </label>
  `,
                }]
        }], propDecorators: { checked: [{
                type: Input
            }], label: [{
                type: Input
            }], disabled: [{
                type: Input
            }], changed: [{
                type: Output
            }], checkedChange: [{
                type: Output
            }] } });
registerSchemaComponent("app-switch", SwitchComponent);

class TextareaComponent {
    label = "";
    placeholder = "";
    disabled = false;
    value = "";
    rows = 4;
    error = "";
    flexGrow = false;
    input = new EventEmitter();
    focused = signal(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "focused" }] : /* istanbul ignore next */ []));
    handleInput(e) {
        this.value = e.target.value;
        this.input.emit(this.value);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: TextareaComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.0.6", type: TextareaComponent, isStandalone: true, selector: "app-textarea", inputs: { label: "label", placeholder: "placeholder", disabled: "disabled", value: "value", rows: "rows", error: "error", flexGrow: "flexGrow" }, outputs: { input: "input" }, ngImport: i0, template: `
    <div>
      @if (label) {
        <label
          class="block mb-2 text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider"
          >{{ label }}</label
        >
      }
      <textarea
        class="block w-full p-3 text-sm text-neutral-900 dark:text-white bg-neutral-50 dark:bg-neutral-800 rounded-2xl border border-neutral-300 dark:border-neutral-700 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
        [rows]="rows"
        [placeholder]="placeholder"
      ></textarea>
    </div>
  `, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: TextareaComponent, decorators: [{
            type: Component,
            args: [{
                    selector: "app-textarea",
                    standalone: true,
                    imports: [],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: `
    <div>
      @if (label) {
        <label
          class="block mb-2 text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider"
          >{{ label }}</label
        >
      }
      <textarea
        class="block w-full p-3 text-sm text-neutral-900 dark:text-white bg-neutral-50 dark:bg-neutral-800 rounded-2xl border border-neutral-300 dark:border-neutral-700 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
        [rows]="rows"
        [placeholder]="placeholder"
      ></textarea>
    </div>
  `,
                }]
        }], propDecorators: { label: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], disabled: [{
                type: Input
            }], value: [{
                type: Input
            }], rows: [{
                type: Input
            }], error: [{
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
    get badgeSizeClass() {
        const sizeClasses = {
            sm: "px-1 py-0.5 text-xs",
            md: "px-2 py-1 text-sm",
            lg: "px-3 py-1.5 text-base",
        };
        return sizeClasses[this.size] || sizeClasses["md"];
    }
    get badgeVariantClass() {
        const variantClasses = {
            default: "bg-[var(--bg-elevated)] text-[var(--text-primary)] border-[var(--border-color)]",
            primary: "bg-[var(--accent)] text-[var(--text-on-accent)]",
            success: "bg-[var(--success)] text-[var(--text-on-success)]",
            warning: "bg-[var(--warning)] text-[var(--text-on-warning)]",
            danger: "bg-[var(--error)] text-[var(--text-on-error)]",
        };
        return variantClasses[this.variant] || variantClasses["default"];
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: BadgeComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "22.0.6", type: BadgeComponent, isStandalone: true, selector: "app-badge", inputs: { variant: "variant", size: "size", label: "label" }, ngImport: i0, template: "<span class=\"ui-badge\">{{ label }}</span>\n" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: BadgeComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-badge", standalone: true, imports: [], template: "<span class=\"ui-badge\">{{ label }}</span>\n" }]
        }], propDecorators: { variant: [{
                type: Input
            }], size: [{
                type: Input
            }], label: [{
                type: Input
            }] } });
registerSchemaComponent("app-badge", BadgeComponent);

/**
 * Safe JSON parser with fallback for array types.
 * Replaces 22+ duplicate patterns across the codebase.
 */
function parseJsonOrDefault(json, defaultValue = []) {
    if (Array.isArray(json))
        return json;
    try {
        return JSON.parse(json);
    }
    catch {
        return defaultValue;
    }
}

class SelectComponent {
    options = "[]";
    value = "";
    label = "";
    placeholder = "Select an option";
    disabled = false;
    changed = new EventEmitter();
    get parsedOptions() {
        return parseJsonOrDefault(this.options);
    }
    handleChange(e) {
        this.value = e.target.value;
        this.changed.emit(this.value);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: SelectComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.0.6", type: SelectComponent, isStandalone: true, selector: "app-select", inputs: { options: "options", value: "value", label: "label", placeholder: "placeholder", disabled: "disabled" }, outputs: { changed: "changed" }, ngImport: i0, template: `
    <div>
      @if (label) {
        <label
          class="block mb-2 text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider"
          >{{ label }}</label
        >
      }
      <select
        class="bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white text-sm rounded-2xl focus:ring-indigo-500 focus:border-indigo-500 block w-full p-3.5"
      >
        @for (opt of parsedOptions; track opt) {
          <option [value]="opt">{{ opt }}</option>
        }
      </select>
    </div>
  `, isInline: true });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: SelectComponent, decorators: [{
            type: Component,
            args: [{
                    selector: "app-select",
                    standalone: true,
                    imports: [],
                    template: `
    <div>
      @if (label) {
        <label
          class="block mb-2 text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider"
          >{{ label }}</label
        >
      }
      <select
        class="bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white text-sm rounded-2xl focus:ring-indigo-500 focus:border-indigo-500 block w-full p-3.5"
      >
        @for (opt of parsedOptions; track opt) {
          <option [value]="opt">{{ opt }}</option>
        }
      </select>
    </div>
  `,
                }]
        }], propDecorators: { options: [{
                type: Input
            }], value: [{
                type: Input
            }], label: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], disabled: [{
                type: Input
            }], changed: [{
                type: Output
            }] } });
registerSchemaComponent("app-select", SelectComponent);

/**
 * Centralized logging utility.
 * Allows silencing in production and redirecting to external loggers.
 */
const logger = {
    log: (message, ...args) => console.log(`[SCHEMA] ${message}`, ...args),
    warn: (message, ...args) => console.warn(`[SCHEMA] ${message}`, ...args),
    error: (message, ...args) => console.error(`[SCHEMA] ${message}`, ...args),
};

/**
 * Style Registry - TailwindCSS v4 Theme System
 *
 * Each theme is defined in its theme.css file and selected via data attributes.
 */
const STYLE_VARIANTS = {
    claymorphism: {
        id: "claymorphism",
        name: "Claymorphism",
        classPrefix: "clay-",
        description: "Soft raised shadows with clay-like appearance",
        redesigned: true,
    },
    glassmorphism: {
        id: "glassmorphism",
        name: "Glassmorphism",
        classPrefix: "glass-",
        description: "Frosted glass effect with backdrop blur",
        redesigned: true,
    },
    neumorphism: {
        id: "neumorphism",
        name: "Neumorphism",
        classPrefix: "neu-",
        description: "Soft inset and outset shadows",
        redesigned: false,
    },
    "material-design-v3": {
        id: "material-design-v3",
        name: "Material Design 3",
        classPrefix: "m3-",
        description: "Google Material Design 3 with elevation system",
        redesigned: true,
    },
    brutalism: {
        id: "brutalism",
        name: "Brutalism",
        classPrefix: "brut-",
        description: "Sharp edges, hard shadows, high-contrast typography",
        redesigned: false,
    },
    skeuomorphism: {
        id: "skeuomorphism",
        name: "Skeuomorphism",
        classPrefix: "skeu-",
        description: "Realistic textures with leather, paper, and glossy highlights",
        redesigned: true,
    },
    "neo-brutalism": {
        id: "neo-brutalism",
        name: "Neo-Brutalism",
        classPrefix: "neobrutal-",
        description: "Hard black borders, bright yellow accents, zero rounding",
        redesigned: true,
    },
};
const LOADED_STYLES = new Set();
let CURRENT_STYLE = "material-design-v3";
async function loadStyleVariant(variant) {
    setTheme(variant);
    // CSS is loaded statically via @import in app's styles.css
    // loadStyleVariant() only sets data-theme attributes for CSS selectors
}
/**
 * SCSS-only fallback for apps using static SCSS themes.
 */
async function loadStyleVariantNoop(variant = "material-design-v3") {
    setTheme(variant);
}
function setTheme(variant) {
    const config = STYLE_VARIANTS[variant];
    if (!config) {
        console.warn(`Unknown style variant: ${variant}`);
        return;
    }
    document.documentElement.setAttribute("data-theme", variant);
    document.body.setAttribute("data-theme", variant);
    const isDark = document.body.getAttribute("data-theme-mode") === "dark";
    document.documentElement.setAttribute("data-theme-mode", isDark ? "dark" : "light");
    document.body.setAttribute("data-theme-mode", isDark ? "dark" : "light");
    CURRENT_STYLE = variant;
    LOADED_STYLES.add(variant);
    document.dispatchEvent(new CustomEvent("style-changed", {
        detail: { variant, prefix: config.classPrefix },
    }));
}
function unloadStyleVariant(variant) {
    if (!LOADED_STYLES.has(variant)) {
        return;
    }
    LOADED_STYLES.delete(variant);
}
function getCurrentStyle() {
    return CURRENT_STYLE;
}
function setCurrentStyle(variant) {
    setTheme(variant);
}
function getStyleConfig(variant) {
    return STYLE_VARIANTS[variant] || STYLE_VARIANTS["material-design-v3"];
}
function getStyleClassPrefix(variant) {
    return STYLE_VARIANTS[variant]?.classPrefix || "m3-";
}
function getAllStyleVariants() {
    return Object.values(STYLE_VARIANTS);
}
function isRedesigned(variant) {
    return STYLE_VARIANTS[variant].redesigned;
}
function getRedesignedStyleVariants() {
    return getAllStyleVariants().filter(({ redesigned }) => redesigned);
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
    const baseName = baseClass.replace(/^clay-|^glass-|^neu-|^m3-|^brut-|^skeu-|^neobrutal-/, "");
    return `${prefix}${baseName}`;
}
/**
 * @deprecated - Use direct TailwindCSS utility classes in schema instead
 * Component style mapping - returns empty string in TailwindCSS v4-only approach
 */
function getComponentStyleClasses(theme, componentId, explicitVariant, explicitSize, globalContext) {
    // TailwindCSS v4 approach: use utility classes directly in schema
    // e.g., schema classes: "bg-primary text-on-primary rounded-lg"
    return "";
}

// Maps semantic props to theme CSS classes using global style registry
// Supports:
//   - styleName: named style lookup in componentStyles registry
//   - layout: "flex" | "grid" → ui-flex/ui-grid classes
//   - direction: "row" | "col" → ui-flex-row/ui-flex-col
//   - gap: "xs"|"sm"|"md"|"lg"|"xl" → ui-gap spacing
//   - align: "start"|"center"|"end"|"stretch" → ui-items-*
//   - justify: "start"|"center"|"end"|"between"|"around" → ui-justify-*
//   - padding: "none"|"xs"|"sm"|"md"|"lg"|"xl" → ui-p-*
//   - marginTop|marginBottom: "none"|"xs"|"sm"|"md"|"lg"|"xl"
//   - maxWidth: "sm"|"md"|"lg"|"xl"|"2xl"|... → ui-max-w-*
//   - mx: "auto" → ui-mx-auto
//   - fullHeight: true → ui-h-full
//   - rounded: true → ui-rounded-lg
//   - elevation: "low"|"medium"|"high" → elevation classes (theme-specific)
function mapPropsToClasses(componentId, props, theme, explicitVariant, explicitSize, globalContext) {
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
        classes.push("ui-flex");
    else if (layout === "grid")
        classes.push("ui-grid");
    else if (layout === "stack")
        classes.push("ui-flex", "ui-flex-col");
    // 3. Flex direction
    const direction = props["direction"];
    if (direction === "row")
        classes.push("ui-flex-row");
    else if (direction === "col")
        classes.push("ui-flex-col");
    else if (direction === "row-reverse")
        classes.push("ui-flex-row-reverse");
    else if (direction === "col-reverse")
        classes.push("ui-flex-col-reverse");
    // 4. Gap spacing (supports both string tokens and numeric values)
    const gap = props["gap"];
    if (gap === "xs" || gap === 1)
        classes.push("ui-gap-1");
    else if (gap === "sm" || gap === 2)
        classes.push("ui-gap-2");
    else if (gap === "md" || gap === 3)
        classes.push("ui-gap-3");
    else if (gap === "lg" || gap === 4)
        classes.push("ui-gap-4");
    else if (gap === "xl" || gap === 6)
        classes.push("ui-gap-6");
    else if (gap === "2xl" || gap === 8)
        classes.push("ui-gap-8");
    // 5. Align items
    const align = props["align"];
    if (align === "start")
        classes.push("ui-items-start");
    else if (align === "center")
        classes.push("ui-items-center");
    else if (align === "end")
        classes.push("ui-items-end");
    else if (align === "stretch")
        classes.push("ui-items-stretch");
    // 6. Justify content
    const justify = props["justify"];
    if (justify === "start")
        classes.push("ui-justify-start");
    else if (justify === "center")
        classes.push("ui-justify-center");
    else if (justify === "end")
        classes.push("ui-justify-end");
    else if (justify === "between")
        classes.push("ui-justify-between");
    else if (justify === "around")
        classes.push("ui-justify-around");
    // 7. Padding
    const padding = props["padding"];
    if (padding === "xs")
        classes.push("ui-p-1");
    else if (padding === "sm")
        classes.push("ui-p-2");
    else if (padding === "md")
        classes.push("ui-p-4");
    else if (padding === "lg")
        classes.push("ui-p-6");
    else if (padding === "xl")
        classes.push("ui-p-8");
    // 8. Margin top/bottom
    const marginTop = props["marginTop"];
    if (marginTop === "xs")
        classes.push("ui-mt-1");
    else if (marginTop === "sm")
        classes.push("ui-mt-2");
    else if (marginTop === "md")
        classes.push("ui-mt-4");
    else if (marginTop === "lg")
        classes.push("ui-mt-6");
    else if (marginTop === "xl")
        classes.push("ui-mt-8");
    const marginBottom = props["marginBottom"];
    if (marginBottom === "xs")
        classes.push("ui-mb-1");
    else if (marginBottom === "sm")
        classes.push("ui-mb-2");
    else if (marginBottom === "md")
        classes.push("ui-mb-4");
    else if (marginBottom === "lg")
        classes.push("ui-mb-6");
    else if (marginBottom === "xl")
        classes.push("ui-mb-8");
    // 9. Max width
    const maxWidth = props["maxWidth"];
    if (maxWidth === "sm")
        classes.push("ui-max-w-sm");
    else if (maxWidth === "md")
        classes.push("ui-max-w-md");
    else if (maxWidth === "lg")
        classes.push("ui-max-w-lg");
    else if (maxWidth === "xl")
        classes.push("ui-max-w-xl");
    else if (maxWidth === "2xl")
        classes.push("ui-max-w-2xl");
    else if (maxWidth === "3xl")
        classes.push("ui-max-w-3xl");
    else if (maxWidth === "6xl")
        classes.push("ui-max-w-6xl");
    else if (maxWidth === "7xl")
        classes.push("ui-max-w-7xl");
    // 10. MX auto
    const mx = props["mx"];
    if (mx === "auto")
        classes.push("ui-mx-auto");
    // 11. Full height
    const fullHeight = props["fullHeight"];
    if (fullHeight)
        classes.push("ui-h-full");
    // 12. Rounded
    const rounded = props["rounded"];
    if (rounded)
        classes.push("ui-rounded-lg");
    // 13. Columns (grid)
    const columns = props["columns"];
    if (columns) {
        // Support CSS grid column strings like "1fr auto 1fr"
        classes.push(`ui-grid-cols-${columns.replace(/\s+/g, "-")}`);
    }
    // 14. Flex wrap
    const flexWrap = props["flexWrap"];
    if (flexWrap === "wrap")
        classes.push("ui-flex-wrap");
    else if (flexWrap === "nowrap")
        classes.push("ui-flex-nowrap");
    else if (flexWrap === "wrap-reverse")
        classes.push("ui-flex-wrap-reverse");
    // 15. Flex grow
    const flexGrow = props["flexGrow"];
    if (flexGrow === true)
        classes.push("ui-flex-grow");
    else if (flexGrow === false)
        classes.push("ui-flex-grow-0");
    // 16. Flex shrink
    const flexShrink = props["flexShrink"];
    if (flexShrink === true)
        classes.push("ui-flex-shrink");
    else if (flexShrink === false)
        classes.push("ui-flex-shrink-0");
    // 17. Flex basis
    const flexBasis = props["flexBasis"];
    if (flexBasis === "auto")
        classes.push("ui-basis-auto");
    else if (flexBasis === "full")
        classes.push("ui-basis-full");
    else if (flexBasis === "half")
        classes.push("ui-basis-1/2");
    else if (flexBasis === "third")
        classes.push("ui-basis-1/3");
    else if (flexBasis === "quarter")
        classes.push("ui-basis-1/4");
    // 18. Align items (container-level)
    const alignItems = props["alignItems"];
    if (alignItems === "start")
        classes.push("ui-items-start");
    else if (alignItems === "center")
        classes.push("ui-items-center");
    else if (alignItems === "end")
        classes.push("ui-items-end");
    else if (alignItems === "stretch")
        classes.push("ui-items-stretch");
    else if (alignItems === "baseline")
        classes.push("ui-items-baseline");
    // 19. Align content (container-level, multi-row)
    const alignContent = props["alignContent"];
    if (alignContent === "start")
        classes.push("ui-content-start");
    else if (alignContent === "center")
        classes.push("ui-content-center");
    else if (alignContent === "end")
        classes.push("ui-content-end");
    else if (alignContent === "between")
        classes.push("ui-content-between");
    else if (alignContent === "around")
        classes.push("ui-content-around");
    else if (alignContent === "evenly")
        classes.push("ui-content-evenly");
    // 20. Justify items
    const justifyItems = props["justifyItems"];
    if (justifyItems === "start")
        classes.push("ui-justify-items-start");
    else if (justifyItems === "center")
        classes.push("ui-justify-items-center");
    else if (justifyItems === "end")
        classes.push("ui-justify-items-end");
    else if (justifyItems === "stretch")
        classes.push("ui-justify-items-stretch");
    // 21. Justify self (item-level)
    const justifySelf = props["justifySelf"];
    if (justifySelf === "start")
        classes.push("ui-justify-self-start");
    else if (justifySelf === "center")
        classes.push("ui-justify-self-center");
    else if (justifySelf === "end")
        classes.push("ui-justify-self-end");
    else if (justifySelf === "stretch")
        classes.push("ui-justify-self-stretch");
    else if (justifySelf === "auto")
        classes.push("ui-justify-self-auto");
    // 22. Align self (item-level)
    const alignSelf = props["alignSelf"];
    if (alignSelf === "start")
        classes.push("ui-self-start");
    else if (alignSelf === "center")
        classes.push("ui-self-center");
    else if (alignSelf === "end")
        classes.push("ui-self-end");
    else if (alignSelf === "stretch")
        classes.push("ui-self-stretch");
    else if (alignSelf === "auto")
        classes.push("ui-self-auto");
    // 23. Row gap (gap-y)
    const rowGap = props["rowGap"];
    if (rowGap === "xs")
        classes.push("ui-gap-y-1");
    else if (rowGap === "sm")
        classes.push("ui-gap-y-2");
    else if (rowGap === "md")
        classes.push("ui-gap-y-4");
    else if (rowGap === "lg")
        classes.push("ui-gap-y-6");
    else if (rowGap === "xl")
        classes.push("ui-gap-y-8");
    // 24. Column gap (gap-x)
    const colGap = props["colGap"];
    if (colGap === "xs")
        classes.push("ui-gap-x-1");
    else if (colGap === "sm")
        classes.push("ui-gap-x-2");
    else if (colGap === "md")
        classes.push("ui-gap-x-4");
    else if (colGap === "lg")
        classes.push("ui-gap-x-6");
    else if (colGap === "xl")
        classes.push("ui-gap-x-8");
    // 25. Width
    const width = props["width"];
    if (width === "full")
        classes.push("ui-w-full");
    else if (width === "auto")
        classes.push("ui-w-auto");
    else if (width === "screen")
        classes.push("ui-w-screen");
    else if (width === "fit")
        classes.push("ui-w-fit");
    // 26. Height
    const height = props["height"];
    if (height === "full")
        classes.push("ui-h-full");
    else if (height === "auto")
        classes.push("ui-h-auto");
    else if (height === "screen")
        classes.push("ui-h-screen");
    else if (height === "fit")
        classes.push("ui-h-fit");
    // 27. Margin X (mx)
    const marginX = props["marginX"];
    if (marginX === "auto")
        classes.push("ui-mx-auto");
    else if (marginX === "xs")
        classes.push("ui-mx-1");
    else if (marginX === "sm")
        classes.push("ui-mx-2");
    else if (marginX === "md")
        classes.push("ui-mx-4");
    else if (marginX === "lg")
        classes.push("ui-mx-6");
    else if (marginX === "xl")
        classes.push("ui-mx-8");
    // 28. Margin Y (my)
    const marginY = props["marginY"];
    if (marginY === "xs")
        classes.push("ui-my-1");
    else if (marginY === "sm")
        classes.push("ui-my-2");
    else if (marginY === "md")
        classes.push("ui-my-4");
    else if (marginY === "lg")
        classes.push("ui-my-6");
    else if (marginY === "xl")
        classes.push("ui-my-8");
    // 29. Padding X (px)
    const paddingX = props["paddingX"];
    if (paddingX === "xs")
        classes.push("ui-px-1");
    else if (paddingX === "sm")
        classes.push("ui-px-2");
    else if (paddingX === "md")
        classes.push("ui-px-4");
    else if (paddingX === "lg")
        classes.push("ui-px-6");
    else if (paddingX === "xl")
        classes.push("ui-px-8");
    // 30. Padding Y (py)
    const paddingY = props["paddingY"];
    if (paddingY === "xs")
        classes.push("ui-py-1");
    else if (paddingY === "sm")
        classes.push("ui-py-2");
    else if (paddingY === "md")
        classes.push("ui-py-4");
    else if (paddingY === "lg")
        classes.push("ui-py-6");
    else if (paddingY === "xl")
        classes.push("ui-py-8");
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
                classes.push("ui-sm-flex");
            if (sm["layout"] === "grid")
                classes.push("ui-sm-grid");
            if (sm["direction"] === "row")
                classes.push("ui-sm-flex-row");
            if (sm["direction"] === "col")
                classes.push("ui-sm-flex-col");
            if (sm["gap"] && gapMap[sm["gap"]])
                classes.push(`ui-sm-gap-${gapMap[sm["gap"]]}`);
            if (sm["align"] === "center")
                classes.push("ui-sm-items-center");
            if (sm["align"] === "start")
                classes.push("ui-sm-items-start");
            if (sm["align"] === "end")
                classes.push("ui-sm-items-end");
            if (sm["justify"] === "center")
                classes.push("ui-sm-justify-center");
            if (sm["justify"] === "start")
                classes.push("ui-sm-justify-start");
            if (sm["justify"] === "end")
                classes.push("ui-sm-justify-end");
            if (sm["flexWrap"] === "wrap")
                classes.push("ui-sm-flex-wrap");
            if (sm["padding"] === "md")
                classes.push("ui-sm-p-4");
            if (sm["padding"] === "lg")
                classes.push("ui-sm-p-6");
        }
        // md: breakpoint (768px+)
        if (responsive["md"]) {
            const md = responsive["md"];
            if (md["layout"] === "flex")
                classes.push("ui-md-flex");
            if (md["layout"] === "grid")
                classes.push("ui-md-grid");
            if (md["direction"] === "row")
                classes.push("ui-md-flex-row");
            if (md["direction"] === "col")
                classes.push("ui-md-flex-col");
            if (md["gap"] && gapMap[md["gap"]])
                classes.push(`ui-md-gap-${gapMap[md["gap"]]}`);
            if (md["align"] === "center")
                classes.push("ui-md-items-center");
            if (md["align"] === "start")
                classes.push("ui-md-items-start");
            if (md["align"] === "end")
                classes.push("ui-md-items-end");
            if (md["justify"] === "center")
                classes.push("ui-md-justify-center");
            if (md["justify"] === "start")
                classes.push("ui-md-justify-start");
            if (md["justify"] === "end")
                classes.push("ui-md-justify-end");
            if (md["justify"] === "between")
                classes.push("ui-md-justify-between");
            if (md["flexWrap"] === "wrap")
                classes.push("ui-md-flex-wrap");
            if (md["padding"] === "md")
                classes.push("ui-md-p-4");
            if (md["padding"] === "lg")
                classes.push("ui-md-p-6");
        }
        // lg: breakpoint (1024px+)
        if (responsive["lg"]) {
            const lg = responsive["lg"];
            if (lg["layout"] === "flex")
                classes.push("ui-lg-flex");
            if (lg["layout"] === "grid")
                classes.push("ui-lg-grid");
            if (lg["direction"] === "row")
                classes.push("ui-lg-flex-row");
            if (lg["direction"] === "col")
                classes.push("ui-lg-flex-col");
            if (lg["gap"] && gapMap[lg["gap"]])
                classes.push(`ui-lg-gap-${gapMap[lg["gap"]]}`);
            if (lg["align"] === "center")
                classes.push("ui-lg-items-center");
            if (lg["justify"] === "center")
                classes.push("ui-lg-justify-center");
            if (lg["justify"] === "between")
                classes.push("ui-lg-justify-between");
            if (lg["padding"] === "md")
                classes.push("ui-lg-p-4");
            if (lg["padding"] === "lg")
                classes.push("ui-lg-p-6");
        }
    }
    // 32. Text size
    const textSize = props["textSize"];
    if (textSize === "xs")
        classes.push("ui-text-xs");
    else if (textSize === "sm")
        classes.push("ui-text-sm");
    else if (textSize === "base")
        classes.push("ui-text-base");
    else if (textSize === "lg")
        classes.push("ui-text-lg");
    else if (textSize === "xl")
        classes.push("ui-text-xl");
    else if (textSize === "2xl")
        classes.push("ui-text-2xl");
    else if (textSize === "3xl")
        classes.push("ui-text-3xl");
    // 33. Font weight
    const fontWeight = props["fontWeight"];
    if (fontWeight === "light")
        classes.push("ui-font-light");
    else if (fontWeight === "normal")
        classes.push("ui-font-normal");
    else if (fontWeight === "medium")
        classes.push("ui-font-medium");
    else if (fontWeight === "semibold")
        classes.push("ui-font-semibold");
    else if (fontWeight === "bold")
        classes.push("ui-font-bold");
    // 34. Position
    const position = props["position"];
    if (position === "relative")
        classes.push("ui-relative");
    else if (position === "absolute")
        classes.push("ui-absolute");
    else if (position === "fixed")
        classes.push("ui-fixed");
    else if (position === "sticky")
        classes.push("ui-sticky");
    // 35. Z-index
    const zIndex = props["zIndex"];
    if (zIndex === 10 || zIndex === "10")
        classes.push("ui-z-10");
    else if (zIndex === 20 || zIndex === "20")
        classes.push("ui-z-20");
    else if (zIndex === 30 || zIndex === "30")
        classes.push("ui-z-30");
    else if (zIndex === 40 || zIndex === "40")
        classes.push("ui-z-40");
    else if (zIndex === 50 || zIndex === "50")
        classes.push("ui-z-50");
    return classes;
}

class SignalStoreService {
    _state = signal({}, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "_state" }] : /* istanbul ignore next */ []));
    state = computed(() => this._state(), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "state" }] : /* istanbul ignore next */ []));
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: SignalStoreService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: SignalStoreService, providedIn: "root" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: SignalStoreService, decorators: [{
            type: Injectable,
            args: [{ providedIn: "root" }]
        }] });

class EventBusService {
    handlers = new Map();
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
            handler.apply(context, [args[0]]);
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: EventBusService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: EventBusService, providedIn: "root" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: EventBusService, decorators: [{
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: ComponentRegistryService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: ComponentRegistryService, providedIn: "root" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: ComponentRegistryService, decorators: [{
            type: Injectable,
            args: [{ providedIn: "root" }]
        }], ctorParameters: () => [] });

class CrudService {
    storage = signal(null, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "storage" }] : /* istanbul ignore next */ []));
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: CrudService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: CrudService, providedIn: "root" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: CrudService, decorators: [{
            type: Injectable,
            args: [{ providedIn: "root" }]
        }] });

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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: DataBindingResolverService, deps: [{ token: SignalStoreService }, { token: CrudService }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: DataBindingResolverService, providedIn: "root" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: DataBindingResolverService, decorators: [{
            type: Injectable,
            args: [{ providedIn: "root" }]
        }], ctorParameters: () => [{ type: SignalStoreService }, { type: CrudService }] });

const DARK_MODE_STORAGE_KEY = "tauri-front-dark-mode";
class StyleThemeService {
    _themeChanged$ = new BehaviorSubject({
        variant: getCurrentStyle(),
        isDark: this.loadDarkModePreference(),
    });
    themeChanged$ = this._themeChanged$.asObservable();
    theme = signal("material-design-v3", /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "theme" }] : /* istanbul ignore next */ []));
    constructor() {
        effect(() => {
            document.documentElement.setAttribute("data-theme", this.theme());
        });
        this.initializeDarkMode();
    }
    /** No-op for API compatibility; initialization runs in the constructor. */
    init() { }
    async loadTheme(variant) {
        this.theme.set(variant);
        setCurrentStyle(variant);
        this.persistDarkModePreference(variant);
        this._themeChanged$.next({ variant, isDark: this.isDarkMode() });
    }
    persistDarkModePreference(_variant) {
        this.saveDarkModePreference(this.isDarkMode());
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
            "neo-brutalism": "neo-brutalism",
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
        this.setDarkMode(!this.isDarkMode());
    }
    isDarkMode() {
        return document.body.getAttribute("data-theme-mode") === "dark";
    }
    setDarkMode(enabled) {
        document.body.setAttribute("data-theme-mode", enabled ? "dark" : "light");
        this.saveDarkModePreference(enabled);
        this._themeChanged$.next({
            variant: this.getCurrentTheme(),
            isDark: enabled,
        });
    }
    static THEMES = [
        "material-design-v3",
        "glassmorphism",
        "neumorphism",
        "claymorphism",
        "brutalism",
        "skeuomorphism",
        "neo-brutalism",
    ];
    cycle() {
        const idx = StyleThemeService.THEMES.indexOf(this.theme());
        const next = StyleThemeService.THEMES[(idx + 1) % StyleThemeService.THEMES.length];
        this.loadTheme(next);
    }
    getCurrentTheme() {
        return getCurrentStyle();
    }
    initializeDarkMode() {
        const savedDarkMode = this.loadDarkModePreference();
        document.body.setAttribute("data-theme-mode", savedDarkMode ? "dark" : "light");
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: StyleThemeService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: StyleThemeService, providedIn: "root" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: StyleThemeService, decorators: [{
            type: Injectable,
            args: [{ providedIn: "root" }]
        }], ctorParameters: () => [] });

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
    async applyLayoutStyles(container, layout, _children, getComponentById, resolvePosition) {
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: LayoutEngineService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: LayoutEngineService, providedIn: "root" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: LayoutEngineService, decorators: [{
            type: Injectable,
            args: [{ providedIn: "root" }]
        }] });

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
    _locale = signal("en", /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "_locale" }] : /* istanbul ignore next */ []));
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: I18nService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: I18nService, providedIn: "root" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: I18nService, decorators: [{
            type: Injectable,
            args: [{ providedIn: "root" }]
        }] });

class SchemaRendererService {
    dataStore;
    eventBus;
    componentRegistry;
    dataBindingResolver;
    layoutEngine;
    i18n;
    _pages = signal([], /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "_pages" }] : /* istanbul ignore next */ []));
    _currentPageId = signal(null, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "_currentPageId" }] : /* istanbul ignore next */ []));
    _navigationStack = signal([], /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "_navigationStack" }] : /* istanbul ignore next */ []));
    _appConfig = {};
    constructor(dataStore, eventBus, componentRegistry, dataBindingResolver, layoutEngine, i18n) {
        this.dataStore = dataStore;
        this.eventBus = eventBus;
        this.componentRegistry = componentRegistry;
        this.dataBindingResolver = dataBindingResolver;
        this.layoutEngine = layoutEngine;
        this.i18n = i18n;
    }
    componentResolver = null;
    routeResolver = null;
    // Schema-level handlers and stores
    _layoutRegions = signal([], /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "_layoutRegions" }] : /* istanbul ignore next */ []));
    _currentRoute = signal("", /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "_currentRoute" }] : /* istanbul ignore next */ []));
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
        logger.log("[SchemaRenderer] loadSchema() called, pages:", schema?.pages?.length ?? 0);
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
        // Extract stores (AppSchema only) and register in data store
        if ("stores" in schema && schema.stores) {
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
                            logger.warn(`[SchemaRenderer] Element not ready: ${selector}`, e);
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
                logger.warn(`[SchemaRenderer] Element not ready: ${finalSelector}`, e);
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
        logger.log(`[SchemaRenderer] render() called: page="${pageSchema?.name}", elements=${pageSchema?.elements?.length ?? 0}, currentRoute="${currentRoute}"`);
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
            logger.warn(`Layout region not found: ${regionId}`);
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
    bindEvents(el, events, _elementId) {
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
        return mapPropsToClasses(componentId, props, theme, explicitVariant, explicitSize, globalContext);
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: SchemaRendererService, deps: [{ token: SignalStoreService }, { token: EventBusService }, { token: ComponentRegistryService }, { token: DataBindingResolverService }, { token: LayoutEngineService }, { token: I18nService }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: SchemaRendererService, providedIn: "root" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: SchemaRendererService, decorators: [{
            type: Injectable,
            args: [{ providedIn: "root" }]
        }], ctorParameters: () => [{ type: SignalStoreService }, { type: EventBusService }, { type: ComponentRegistryService }, { type: DataBindingResolverService }, { type: LayoutEngineService }, { type: I18nService }] });

class SchemaElementComponent {
    rendererService = inject(SchemaRendererService);
    appRef = inject(ApplicationRef);
    injector = inject(Injector);
    styleThemeService = inject(StyleThemeService);
    element;
    elements = [];
    dynamicHost;
    componentRef = null;
    get componentType() {
        return SCHEMA_COMPONENT_MAP.get(this.tag) ?? null;
    }
    get tag() {
        return this.element.componentId;
    }
    get classes() {
        const base = this.element.classes ?? "";
        if (!this.element.props)
            return this.normalizeClasses(base);
        const theme = getCurrentStyle();
        const mapped = this.rendererService.mapPropsToClasses(this.element.componentId, this.element.props, theme);
        const mappedStr = mapped.join(" ").trim();
        return this.normalizeClasses(mappedStr ? `${base} ${mappedStr}` : base);
    }
    /**
     * Normalizes schema element classes: trims, deduplicates, and warns on
     * legacy sf-* patterns. Acts as a safety net for schemas that haven't yet
     * been migrated to ui-* tokens.
     */
    normalizeClasses(classes) {
        const seen = new Set();
        return classes
            .trim()
            .split(/\s+/)
            .filter((cls) => {
            if (cls.startsWith("sf-")) {
                console.warn(`[SchemaElement] legacy sf-* class "${cls}" found in schema element "${this.element.id}" — migrate to ui-*`);
                return false; // drop legacy classes
            }
            if (seen.has(cls))
                return false; // deduplicate
            seen.add(cls);
            return true;
        })
            .join(" ");
    }
    ngOnInit() {
        const schemaTheme = this.element.theme;
        if (schemaTheme && !this.element["parentId"]) {
            this.styleThemeService.loadTheme(schemaTheme);
        }
    }
    get childElements() {
        return this.element.children ?? [];
    }
    get props() {
        return this.element.props ?? {};
    }
    ngAfterViewInit() {
        this.createDynamicComponent();
    }
    ngOnChanges(changes) {
        if (changes["element"] && this.dynamicHost) {
            this.createDynamicComponent();
        }
    }
    createDynamicComponent() {
        if (!this.dynamicHost) {
            console.warn(`[SchemaElement] createDynamicComponent: no dynamicHost for "${this.element.id}"`);
            return;
        }
        if (this.componentRef) {
            this.componentRef.destroy();
            this.componentRef = null;
        }
        const componentType = this.componentType;
        if (!componentType) {
            console.warn(`[SchemaElement] createDynamicComponent: componentType is null for "${this.element.id}", componentId="${this.element.componentId}", tag="${this.tag}"`);
            return;
        }
        console.log(`[SchemaElement] Creating dynamic component "${this.element.componentId}" for "${this.element.id}"`);
        this.componentRef = this.dynamicHost.createComponent(componentType, {
            injector: this.injector,
        });
        // Use setInput on ComponentRef for proper Angular input binding + change detection
        this.componentRef.setInput("classes", this.classes);
        for (const [key, value] of Object.entries(this.props)) {
            this.componentRef.setInput(key, value);
        }
        // Pass children to container components (e.g., app-block with nested elements)
        if (this.element.children && this.element.children.length > 0) {
            this.componentRef.setInput("children", this.element.children);
        }
        // Use microtask to allow child ngOnInit to run before change detection.
        // Without this, the child's @if (isDark) in ThemeToggleComponent evaluates
        // before ngOnInit sets isDark, rendering an empty container.
        Promise.resolve().then(() => {
            this.componentRef?.changeDetectorRef.detectChanges();
        });
    }
    get gridStyle() {
        const gp = this.element.gridPosition;
        if (!gp)
            return {};
        const col = `${gp.column} / span ${gp.colSpan || 1}`;
        const row = `${gp.row} / span ${gp.rowSpan || 1}`;
        return { gridColumn: col, gridRow: row };
    }
    get elementStyles() {
        return {};
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: SchemaElementComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.0.6", type: SchemaElementComponent, isStandalone: true, selector: "app-schema-element", inputs: { element: "element", elements: "elements" }, viewQueries: [{ propertyName: "dynamicHost", first: true, predicate: ["dynamicHost"], descendants: true, read: ViewContainerRef }], usesOnChanges: true, ngImport: i0, template: "<div\n  [id]=\"element.id\"\n  [class]=\"classes\"\n  [style]=\"gridStyle\"\n  [attr.data-element-id]=\"element.id\"\n  [ngStyle]=\"elementStyles\"\n>\n  @if (isNativeHtml && props[\"text\"]) {\n    <ng-container [ngSwitch]=\"tag\">\n      <h1 *ngSwitchCase=\"'h1'\">{{ props[\"text\"] }}</h1>\n      <h2 *ngSwitchCase=\"'h2'\">{{ props[\"text\"] }}</h2>\n      <p *ngSwitchCase=\"'p'\">{{ props[\"text\"] }}</p>\n      <footer *ngSwitchCase=\"'footer'\">{{ props[\"text\"] }}</footer>\n      <span *ngSwitchDefault>{{ props[\"text\"] }}</span>\n    </ng-container>\n  } @else if (componentType) {\n    <ng-container #dynamicHost></ng-container>\n  } @else {\n    @for (child of childElements; track $index) {\n      <app-schema-element\n        [element]=\"child\"\n        [elements]=\"elements\"\n      ></app-schema-element>\n    }\n  }\n</div>\n", dependencies: [{ kind: "component", type: SchemaElementComponent, selector: "app-schema-element", inputs: ["element", "elements"] }, { kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: i1.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { kind: "directive", type: i1.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { kind: "directive", type: i1.NgSwitchDefault, selector: "[ngSwitchDefault]" }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: SchemaElementComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-schema-element", standalone: true, imports: [CommonModule], template: "<div\n  [id]=\"element.id\"\n  [class]=\"classes\"\n  [style]=\"gridStyle\"\n  [attr.data-element-id]=\"element.id\"\n  [ngStyle]=\"elementStyles\"\n>\n  @if (isNativeHtml && props[\"text\"]) {\n    <ng-container [ngSwitch]=\"tag\">\n      <h1 *ngSwitchCase=\"'h1'\">{{ props[\"text\"] }}</h1>\n      <h2 *ngSwitchCase=\"'h2'\">{{ props[\"text\"] }}</h2>\n      <p *ngSwitchCase=\"'p'\">{{ props[\"text\"] }}</p>\n      <footer *ngSwitchCase=\"'footer'\">{{ props[\"text\"] }}</footer>\n      <span *ngSwitchDefault>{{ props[\"text\"] }}</span>\n    </ng-container>\n  } @else if (componentType) {\n    <ng-container #dynamicHost></ng-container>\n  } @else {\n    @for (child of childElements; track $index) {\n      <app-schema-element\n        [element]=\"child\"\n        [elements]=\"elements\"\n      ></app-schema-element>\n    }\n  }\n</div>\n" }]
        }], propDecorators: { element: [{
                type: Input,
                args: [{ required: true }]
            }], elements: [{
                type: Input,
                args: [{ required: true }]
            }], dynamicHost: [{
                type: ViewChild,
                args: ["dynamicHost", { read: ViewContainerRef }]
            }] } });

class CardComponent {
    title = "";
    subtitle = "";
    content = "";
    elevated = 1;
    borderRadius = "lg";
    padding = "md";
    children = [];
    classes = "";
    kind = "elevated";
    sectionId = "";
    getCardClasses() {
        const radiusMap = {
            sm: "rounded-sm",
            md: "rounded-md",
            lg: "rounded-lg",
            xl: "rounded-xl",
        };
        const shadows = ["shadow-none", "shadow-1", "shadow-2", "shadow-3"];
        const base = "bg-surface-container border border-outline-variant overflow-hidden";
        const radius = radiusMap[this.borderRadius];
        const shadow = shadows[this.elevated];
        const kindClass = `app-card--${this.kind}`;
        return [base, radius, shadow, kindClass, this.classes]
            .filter(Boolean)
            .join(" ");
    }
    getContentClasses() {
        const paddingMap = {
            sm: "p-4",
            md: "p-6",
            lg: "p-8",
        };
        return paddingMap[this.padding];
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: CardComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.0.6", type: CardComponent, isStandalone: true, selector: "app-card", inputs: { title: "title", subtitle: "subtitle", content: "content", elevated: "elevated", borderRadius: "borderRadius", padding: "padding", children: "children", classes: "classes", kind: "kind", sectionId: "sectionId" }, ngImport: i0, template: `
    <div
      class="rounded-3xl p-6 border border-neutral-100 dark:border-neutral-800 shadow-sm transition-colors"
      [class.bg-white]="kind === 'elevated'"
      [class.bg-transparent]="kind === 'outlined'"
      [class.bg-neutral-50]="kind === 'surface'"
      [class.border-2]="kind === 'outlined'"
      [class.shadow-md]="kind === 'elevated'"
    >
      @if (title) {
        <h3
          class="text-base font-semibold text-neutral-800 dark:text-neutral-200 mb-1"
        >
          {{ title }}
        </h3>
      }
      @if (subtitle) {
        <p class="text-xs text-neutral-500 dark:text-neutral-400">
          {{ subtitle }}
        </p>
      }
      <ng-content />
    </div>
  `, isInline: true, dependencies: [{ kind: "ngmodule", type: CommonModule }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: CardComponent, decorators: [{
            type: Component,
            args: [{
                    selector: "app-card",
                    standalone: true,
                    imports: [CommonModule, SchemaElementComponent],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: `
    <div
      class="rounded-3xl p-6 border border-neutral-100 dark:border-neutral-800 shadow-sm transition-colors"
      [class.bg-white]="kind === 'elevated'"
      [class.bg-transparent]="kind === 'outlined'"
      [class.bg-neutral-50]="kind === 'surface'"
      [class.border-2]="kind === 'outlined'"
      [class.shadow-md]="kind === 'elevated'"
    >
      @if (title) {
        <h3
          class="text-base font-semibold text-neutral-800 dark:text-neutral-200 mb-1"
        >
          {{ title }}
        </h3>
      }
      @if (subtitle) {
        <p class="text-xs text-neutral-500 dark:text-neutral-400">
          {{ subtitle }}
        </p>
      }
      <ng-content />
    </div>
  `,
                }]
        }], propDecorators: { title: [{
                type: Input
            }], subtitle: [{
                type: Input
            }], content: [{
                type: Input
            }], elevated: [{
                type: Input
            }], borderRadius: [{
                type: Input
            }], padding: [{
                type: Input
            }], children: [{
                type: Input
            }], classes: [{
                type: Input
            }], kind: [{
                type: Input
            }], sectionId: [{
                type: Input
            }] } });
registerSchemaComponent("app-card", CardComponent);

class StatsCardComponent {
    label = "";
    value = "";
    unit = "";
    icon = "";
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: StatsCardComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.0.6", type: StatsCardComponent, isStandalone: true, selector: "app-stats-card", inputs: { label: "label", value: "value", unit: "unit", icon: "icon" }, ngImport: i0, template: "<div class=\"ui-stats-card\">\n  @if (icon) {\n    <div class=\"ui-stats-card-icon\">{{ icon }}</div>\n  }\n  <div class=\"ui-stats-card-value\">{{ value }}{{ unit }}</div>\n  @if (label) {\n    <div class=\"ui-stats-card-label\">{{ label }}</div>\n  }\n</div>\n" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: StatsCardComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-stats-card", standalone: true, imports: [], template: "<div class=\"ui-stats-card\">\n  @if (icon) {\n    <div class=\"ui-stats-card-icon\">{{ icon }}</div>\n  }\n  <div class=\"ui-stats-card-value\">{{ value }}{{ unit }}</div>\n  @if (label) {\n    <div class=\"ui-stats-card-label\">{{ label }}</div>\n  }\n</div>\n" }]
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
        return parseJsonOrDefault(this.columns);
    }
    get parsedData() {
        return parseJsonOrDefault(this.data);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: TableViewComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.0.6", type: TableViewComponent, isStandalone: true, selector: "app-table-view", inputs: { columns: "columns", data: "data" }, ngImport: i0, template: "<table class=\"ui-table\">\n  <thead>\n    <tr>\n      @for (col of parsedColumns; track col.key) {\n        <th>{{ col.name }}</th>\n      }\n    </tr>\n  </thead>\n  <tbody>\n    @for (row of parsedData; track row) {\n      <tr>\n        @for (col of parsedColumns; track col.key) {\n          <td>{{ row[col.key] }}</td>\n        }\n      </tr>\n    }\n  </tbody>\n</table>\n" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: TableViewComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-table-view", standalone: true, imports: [], template: "<table class=\"ui-table\">\n  <thead>\n    <tr>\n      @for (col of parsedColumns; track col.key) {\n        <th>{{ col.name }}</th>\n      }\n    </tr>\n  </thead>\n  <tbody>\n    @for (row of parsedData; track row) {\n      <tr>\n        @for (col of parsedColumns; track col.key) {\n          <td>{{ row[col.key] }}</td>\n        }\n      </tr>\n    }\n  </tbody>\n</table>\n" }]
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
        return parseJsonOrDefault(this.columns);
    }
    get parsedData() {
        return parseJsonOrDefault(this.data);
    }
    selectRow(index) {
        if (!this.selectable)
            return;
        this.selectedIndex = index;
        this.rowSelected.emit(index);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: DataTableComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.0.6", type: DataTableComponent, isStandalone: true, selector: "app-data-table", inputs: { columns: "columns", data: "data", selectable: "selectable" }, outputs: { rowSelected: "rowSelected" }, ngImport: i0, template: "<table class=\"ui-data-table\">\n  <thead>\n    <tr>\n      @if (selectable) {\n        <th class=\"ui-data-table-checkbox\"></th>\n      }\n      @for (col of parsedColumns; track col.key) {\n        <th>{{ col.name }}</th>\n      }\n    </tr>\n  </thead>\n  <tbody>\n    @for (row of parsedData; track row; let idx = $index) {\n      <tr\n        class=\"ui-data-table-row\"\n        [class.ui-data-table-row-selected]=\"selectedIndex === idx\"\n        (click)=\"selectRow(idx)\"\n      >\n        @if (selectable) {\n          <td>\n            <span\n              class=\"ui-data-table-checkbox-dot\"\n              [class.ui-data-table-checkbox-dot-selected]=\"\n                selectedIndex === idx\n              \"\n            ></span>\n          </td>\n        }\n        @for (col of parsedColumns; track col.key) {\n          <td>{{ row[col.key] }}</td>\n        }\n      </tr>\n    }\n  </tbody>\n</table>\n" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: DataTableComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-data-table", standalone: true, imports: [], template: "<table class=\"ui-data-table\">\n  <thead>\n    <tr>\n      @if (selectable) {\n        <th class=\"ui-data-table-checkbox\"></th>\n      }\n      @for (col of parsedColumns; track col.key) {\n        <th>{{ col.name }}</th>\n      }\n    </tr>\n  </thead>\n  <tbody>\n    @for (row of parsedData; track row; let idx = $index) {\n      <tr\n        class=\"ui-data-table-row\"\n        [class.ui-data-table-row-selected]=\"selectedIndex === idx\"\n        (click)=\"selectRow(idx)\"\n      >\n        @if (selectable) {\n          <td>\n            <span\n              class=\"ui-data-table-checkbox-dot\"\n              [class.ui-data-table-checkbox-dot-selected]=\"\n                selectedIndex === idx\n              \"\n            ></span>\n          </td>\n        }\n        @for (col of parsedColumns; track col.key) {\n          <td>{{ row[col.key] }}</td>\n        }\n      </tr>\n    }\n  </tbody>\n</table>\n" }]
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: JsonViewComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "22.0.6", type: JsonViewComponent, isStandalone: true, selector: "app-json-view", inputs: { data: "data" }, ngImport: i0, template: "<div class=\"ui-json-view\" [innerHTML]=\"safeHtml\"></div>\n" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: JsonViewComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-json-view", standalone: true, imports: [], template: "<div class=\"ui-json-view\" [innerHTML]=\"safeHtml\"></div>\n" }]
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
        return parseJsonOrDefault(this.categories);
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
    onDragStart(e, componentId) {
        e.dataTransfer?.setData("text/plain", JSON.stringify({ type: "component", componentId }));
        if (e.dataTransfer)
            e.dataTransfer.effectAllowed = "copy";
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: ComponentPaletteComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.0.6", type: ComponentPaletteComponent, isStandalone: true, selector: "app-component-palette", inputs: { categories: "categories", searchable: "searchable" }, ngImport: i0, template: "<div class=\"ui-component-palette\">\n  <div class=\"ui-component-palette-header\">\n    <div>Components</div>\n    @if (searchable) {\n      <input\n        type=\"text\"\n        placeholder=\"Search components...\"\n        [value]=\"searchQuery\"\n        (input)=\"onSearch($event)\"\n      />\n    }\n  </div>\n  <div class=\"ui-component-palette-list\">\n    @for (cat of filteredCategories; track cat.name) {\n      <div class=\"ui-component-palette-category\">\n        <div\n          class=\"ui-component-palette-category-header\"\n          (click)=\"toggleCategory(cat.name)\"\n        >\n          <span>{{ cat.name }}</span>\n          <span\n            class=\"ui-component-palette-chevron\"\n            [class.ui-component-palette-chevron-expanded]=\"\n              !isCollapsed(cat.name)\n            \"\n            >\u25BC</span\n          >\n        </div>\n        @if (!isCollapsed(cat.name)) {\n          <div class=\"ui-component-palette-items\">\n            @for (comp of cat.components; track comp) {\n              <div draggable=\"true\" (dragstart)=\"onDragStart($event, comp)\">\n                {{ comp }}\n              </div>\n            }\n          </div>\n        }\n      </div>\n    }\n  </div>\n</div>\n" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: ComponentPaletteComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-component-palette", standalone: true, imports: [], template: "<div class=\"ui-component-palette\">\n  <div class=\"ui-component-palette-header\">\n    <div>Components</div>\n    @if (searchable) {\n      <input\n        type=\"text\"\n        placeholder=\"Search components...\"\n        [value]=\"searchQuery\"\n        (input)=\"onSearch($event)\"\n      />\n    }\n  </div>\n  <div class=\"ui-component-palette-list\">\n    @for (cat of filteredCategories; track cat.name) {\n      <div class=\"ui-component-palette-category\">\n        <div\n          class=\"ui-component-palette-category-header\"\n          (click)=\"toggleCategory(cat.name)\"\n        >\n          <span>{{ cat.name }}</span>\n          <span\n            class=\"ui-component-palette-chevron\"\n            [class.ui-component-palette-chevron-expanded]=\"\n              !isCollapsed(cat.name)\n            \"\n            >\u25BC</span\n          >\n        </div>\n        @if (!isCollapsed(cat.name)) {\n          <div class=\"ui-component-palette-items\">\n            @for (comp of cat.components; track comp) {\n              <div draggable=\"true\" (dragstart)=\"onDragStart($event, comp)\">\n                {{ comp }}\n              </div>\n            }\n          </div>\n        }\n      </div>\n    }\n  </div>\n</div>\n" }]
        }], propDecorators: { categories: [{
                type: Input
            }], searchable: [{
                type: Input
            }] } });
registerSchemaComponent("app-component-palette", ComponentPaletteComponent);

class DesignerCanvasService {
    elements = signal([], /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "elements" }] : /* istanbul ignore next */ []));
    selectedId = signal(null, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "selectedId" }] : /* istanbul ignore next */ []));
    history = signal([], /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "history" }] : /* istanbul ignore next */ []));
    historyIndex = signal(-1, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "historyIndex" }] : /* istanbul ignore next */ []));
    showGrid = signal(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "showGrid" }] : /* istanbul ignore next */ []));
    zoom = signal(100, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "zoom" }] : /* istanbul ignore next */ []));
    gridColumns = 12;
    selectedElement = computed(() => {
        const id = this.selectedId();
        if (!id)
            return null;
        return this.findElementById(id, this.elements());
    }, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "selectedElement" }] : /* istanbul ignore next */ []));
    canUndo = computed(() => this.historyIndex() > 0, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "canUndo" }] : /* istanbul ignore next */ []));
    canRedo = computed(() => this.historyIndex() < this.history().length - 1, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "canRedo" }] : /* istanbul ignore next */ []));
    findElementById(id, els) {
        for (const el of els) {
            if (el.id === id)
                return el;
            if (el.children) {
                const found = this.findElementById(id, el.children);
                if (found)
                    return found;
            }
        }
        return null;
    }
    pushHistory(label) {
        const history = this.history();
        const idx = this.historyIndex();
        const newHistory = history.slice(0, idx + 1);
        newHistory.push({
            elements: JSON.parse(JSON.stringify(this.elements())),
            label,
        });
        this.history.set(newHistory);
        this.historyIndex.set(newHistory.length - 1);
    }
    setElements(els) {
        this.elements.set(els);
        this.pushHistory("Load");
    }
    addElement(componentId, parentId) {
        const newEl = {
            id: `${componentId}-${Date.now()}`,
            componentId,
            gridPosition: { column: 1, row: 1, colSpan: 12, rowSpan: 1 },
            props: {},
        };
        if (parentId) {
            const parent = this.findElementById(parentId, this.elements());
            if (parent) {
                parent.children = [...(parent.children ?? []), newEl];
                this.elements.set([...this.elements()]);
                this.pushHistory(`Add ${componentId} in ${parentId}`);
                return;
            }
        }
        this.elements.set([...this.elements(), newEl]);
        this.pushHistory(`Add ${componentId}`);
    }
    deleteElement(id) {
        const remove = (els) => els.filter((el) => {
            if (el.id === id)
                return false;
            if (el.children)
                el.children = remove(el.children);
            return true;
        });
        this.elements.set(remove(this.elements()));
        if (this.selectedId() === id)
            this.selectedId.set(null);
        this.pushHistory(`Delete ${id}`);
    }
    updateElement(id, patch) {
        const update = (els) => els.some((el) => {
            if (el.id === id) {
                Object.assign(el, patch);
                return true;
            }
            if (el.children)
                return update(el.children);
            return false;
        });
        update(this.elements());
        this.elements.set([...this.elements()]);
        this.pushHistory(`Update ${id}`);
    }
    moveElement(id, toParentId, index) {
        const findAndRemove = (els) => {
            for (let i = 0; i < els.length; i++) {
                if (els[i].id === id)
                    return els.splice(i, 1)[0];
                if (els[i].children) {
                    const found = findAndRemove(els[i].children);
                    if (found)
                        return found;
                }
            }
            return null;
        };
        const el = findAndRemove([...this.elements()]);
        if (!el)
            return;
        const current = [...this.elements()];
        const insertAt = (els) => {
            if (index !== undefined) {
                els.splice(index, 0, el);
            }
            else {
                els.push(el);
            }
        };
        if (toParentId) {
            const parent = this.findElementById(toParentId, current);
            if (parent) {
                parent.children = [...(parent.children ?? [])];
                insertAt(parent.children);
            }
        }
        else {
            insertAt(current);
        }
        this.elements.set(current);
        this.pushHistory(`Move ${id}`);
    }
    selectElement(id) {
        this.selectedId.set(id);
    }
    undo() {
        const idx = this.historyIndex();
        if (idx <= 0)
            return;
        this.historyIndex.set(idx - 1);
        this.elements.set(JSON.parse(JSON.stringify(this.history()[idx - 1].elements)));
    }
    redo() {
        const idx = this.historyIndex();
        if (idx >= this.history().length - 1)
            return;
        this.historyIndex.set(idx + 1);
        this.elements.set(JSON.parse(JSON.stringify(this.history()[idx + 1].elements)));
    }
    toggleGrid() {
        this.showGrid.update((v) => !v);
    }
    setZoom(z) {
        this.zoom.set(Math.max(25, Math.min(200, z)));
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: DesignerCanvasService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: DesignerCanvasService, providedIn: "root" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: DesignerCanvasService, decorators: [{
            type: Injectable,
            args: [{ providedIn: "root" }]
        }] });

class CanvasComponent {
    designer = inject(DesignerCanvasService);
    get elements() {
        return this.designer.elements();
    }
    get gridCells() {
        return Array(this.designer.gridColumns * 6).fill(0);
    }
    dropIndicator = null;
    getGridColumn(el) {
        const gp = el.gridPosition;
        if (!gp)
            return "auto";
        return `${gp.column || 1} / span ${gp.colSpan || 1}`;
    }
    getGridRow(el) {
        const gp = el.gridPosition;
        if (!gp)
            return "auto";
        return `${gp.row || 1} / span ${gp.rowSpan || 1}`;
    }
    getIcon(_el) {
        const icons = {
            "app-button": "▣",
            "app-text": "A",
            "app-block": "⊞",
            "app-icon": "◇",
            "app-text-input": "✎",
            "app-translation-output": "📄",
            "app-language-selector": "🌐",
        };
        return icons[_el.componentId] || "⊡";
    }
    deleteElement(e, id) {
        e.stopPropagation();
        this.designer.deleteElement(id);
    }
    editElement(el) {
        this.designer.selectElement(el.id);
    }
    onElementDragStart(e, el) {
        e.dataTransfer?.setData("text/plain", JSON.stringify({ type: "move", id: el.id }));
        if (e.dataTransfer)
            e.dataTransfer.effectAllowed = "move";
    }
    onDragOver(e) {
        e.preventDefault();
        if (e.dataTransfer)
            e.dataTransfer.dropEffect = "move";
    }
    onDragLeave() {
        this.dropIndicator = null;
    }
    onElementDragOver(e, el) {
        e.preventDefault();
        e.stopPropagation();
        const rect = e.currentTarget.getBoundingClientRect();
        const y = e.clientY - rect.top;
        const index = y > rect.height / 2 ? 1 : 0;
        this.dropIndicator = { parentId: el.id, index, y: 0 };
    }
    onElementDragLeave(_el) {
        if (this.dropIndicator?.parentId === _el.id) {
            this.dropIndicator = null;
        }
    }
    onDrop(e) {
        e.preventDefault();
        const raw = e.dataTransfer?.getData("text/plain");
        if (!raw)
            return;
        try {
            const data = JSON.parse(raw);
            if (data.type === "component") {
                this.designer.addElement(data.componentId, this.dropIndicator?.parentId ?? undefined);
            }
            else if (data.type === "move" && data.id) {
                this.designer.moveElement(data.id, this.dropIndicator?.parentId ?? null, this.dropIndicator?.index);
            }
        }
        catch {
            /* ignore parse errors */
        }
        this.dropIndicator = null;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: CanvasComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.0.6", type: CanvasComponent, isStandalone: true, selector: "app-canvas", ngImport: i0, template: "<div\n  class=\"ui-canvas\"\n  [style.--grid-cols]=\"designer.gridColumns.toString()\"\n  [style.zoom]=\"designer.zoom() / 100\"\n  (dragover)=\"onDragOver($event)\"\n  (dragleave)=\"onDragLeave()\"\n  (drop)=\"onDrop($event)\"\n>\n  @if (designer.showGrid()) {\n    <div class=\"ui-canvas-grid\">\n      @for (cell of gridCells; track cell) {\n        <div></div>\n      }\n    </div>\n  }\n  @if (elements.length > 0) {\n    @for (el of elements; track el.id) {\n      <div\n        class=\"ui-canvas-element\"\n        [class.ui-canvas-element-selected]=\"designer.selectedId() === el.id\"\n        [class.ui-canvas-element-drop-target]=\"\n          dropIndicator?.parentId === el.id\n        \"\n        [style.gridColumn]=\"getGridColumn(el)\"\n        [style.gridRow]=\"getGridRow(el)\"\n        (click)=\"designer.selectElement(el.id)\"\n        (dblclick)=\"editElement(el)\"\n        draggable=\"true\"\n        (dragstart)=\"onElementDragStart($event, el)\"\n        (dragover)=\"onElementDragOver($event, el)\"\n        (dragleave)=\"onElementDragLeave(el)\"\n      >\n        <span>{{ getIcon(el) }}</span>\n        <span>{{ el.componentId }}</span>\n        <span class=\"ui-canvas-element-id\">{{ el.id }}</span>\n        <button\n          class=\"ui-canvas-element-delete\"\n          (click)=\"deleteElement($event, el.id)\"\n          title=\"Delete\"\n        >\n          \u00D7\n        </button>\n        @if (el.children?.length) {\n          <div class=\"ui-canvas-element-children\">\n            {{ el.children!.length }} children\n          </div>\n        }\n      </div>\n    }\n  } @else {\n    <div class=\"ui-canvas-empty\">\n      <div>Drag components here</div>\n    </div>\n  }\n  @if (dropIndicator && !dropIndicator.parentId) {\n    <div\n      class=\"ui-canvas-drop-indicator\"\n      [style.top.px]=\"dropIndicator.y\"\n    ></div>\n  }\n</div>\n", dependencies: [{ kind: "ngmodule", type: CommonModule }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: CanvasComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-canvas", standalone: true, imports: [CommonModule], template: "<div\n  class=\"ui-canvas\"\n  [style.--grid-cols]=\"designer.gridColumns.toString()\"\n  [style.zoom]=\"designer.zoom() / 100\"\n  (dragover)=\"onDragOver($event)\"\n  (dragleave)=\"onDragLeave()\"\n  (drop)=\"onDrop($event)\"\n>\n  @if (designer.showGrid()) {\n    <div class=\"ui-canvas-grid\">\n      @for (cell of gridCells; track cell) {\n        <div></div>\n      }\n    </div>\n  }\n  @if (elements.length > 0) {\n    @for (el of elements; track el.id) {\n      <div\n        class=\"ui-canvas-element\"\n        [class.ui-canvas-element-selected]=\"designer.selectedId() === el.id\"\n        [class.ui-canvas-element-drop-target]=\"\n          dropIndicator?.parentId === el.id\n        \"\n        [style.gridColumn]=\"getGridColumn(el)\"\n        [style.gridRow]=\"getGridRow(el)\"\n        (click)=\"designer.selectElement(el.id)\"\n        (dblclick)=\"editElement(el)\"\n        draggable=\"true\"\n        (dragstart)=\"onElementDragStart($event, el)\"\n        (dragover)=\"onElementDragOver($event, el)\"\n        (dragleave)=\"onElementDragLeave(el)\"\n      >\n        <span>{{ getIcon(el) }}</span>\n        <span>{{ el.componentId }}</span>\n        <span class=\"ui-canvas-element-id\">{{ el.id }}</span>\n        <button\n          class=\"ui-canvas-element-delete\"\n          (click)=\"deleteElement($event, el.id)\"\n          title=\"Delete\"\n        >\n          \u00D7\n        </button>\n        @if (el.children?.length) {\n          <div class=\"ui-canvas-element-children\">\n            {{ el.children!.length }} children\n          </div>\n        }\n      </div>\n    }\n  } @else {\n    <div class=\"ui-canvas-empty\">\n      <div>Drag components here</div>\n    </div>\n  }\n  @if (dropIndicator && !dropIndicator.parentId) {\n    <div\n      class=\"ui-canvas-drop-indicator\"\n      [style.top.px]=\"dropIndicator.y\"\n    ></div>\n  }\n</div>\n" }]
        }] });
registerSchemaComponent("app-canvas", CanvasComponent);

class PropertiesPanelComponent {
    designer = inject(DesignerCanvasService);
    activeTab = "props";
    tabs = ["props", "style", "events"];
    tabLabels = {
        props: "Props",
        style: "Style",
        events: "Events",
    };
    availableStates = ["hover", "focus", "disabled"];
    el = computed(() => this.designer.selectedElement(), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "el" }] : /* istanbul ignore next */ []));
    get propEntries() {
        const el = this.el();
        if (!el?.props)
            return [];
        return Object.entries(el.props).map(([key, value]) => ({ key, value }));
    }
    asString(value) {
        return value != null ? String(value) : "";
    }
    get styleEntries() {
        const styles = this.el()?.styles?.custom;
        if (!styles)
            return [];
        return Object.entries(styles).map(([key, value]) => ({ key, value }));
    }
    get stateKeys() {
        const states = this.el()?.styles?.states;
        if (!states)
            return [];
        return Object.keys(states);
    }
    getStateRules(state) {
        const el = this.el();
        const states = el?.styles?.states;
        if (!states)
            return [];
        const rules = states[state];
        if (!rules)
            return [];
        return Object.entries(rules).map(([key, value]) => ({
            key,
            value: String(value ?? ""),
        }));
    }
    get eventEntries() {
        const events = this.el()?.events;
        if (!events)
            return [];
        return Object.entries(events).map(([event, handler]) => ({
            event,
            handler,
        }));
    }
    updateField(key, value) {
        const id = this.designer.selectedId();
        if (!id)
            return;
        this.designer.updateElement(id, { [key]: value });
    }
    updateProp(key, value) {
        const id = this.designer.selectedId();
        if (!id)
            return;
        const el = this.designer.selectedElement();
        if (!el)
            return;
        const props = { ...(el.props ?? {}), [key]: value };
        this.designer.updateElement(id, { props });
    }
    addStyle() {
        const id = this.designer.selectedId();
        const el = this.designer.selectedElement();
        if (!id || !el)
            return;
        const custom = { ...(el.styles?.custom ?? {}), "": "" };
        this.designer.updateElement(id, {
            styles: { ...(el.styles ?? {}), custom },
        });
    }
    updateStyleKey(index, key) {
        const id = this.designer.selectedId();
        const el = this.designer.selectedElement();
        if (!id || !el?.styles?.custom)
            return;
        const entries = Object.entries(el.styles.custom);
        if (index >= entries.length)
            return;
        const [oldKey, val] = entries[index];
        const newCustom = {};
        for (const [k, v] of Object.entries(el.styles.custom)) {
            newCustom[k === oldKey ? key : k] = k === oldKey ? val : v;
        }
        if (oldKey !== key)
            delete newCustom[oldKey];
        this.designer.updateElement(id, {
            styles: { ...(el.styles ?? {}), custom: newCustom },
        });
    }
    updateStyleVal(index, value) {
        const id = this.designer.selectedId();
        const el = this.designer.selectedElement();
        if (!id || !el?.styles?.custom)
            return;
        const entries = Object.entries(el.styles.custom);
        if (index >= entries.length)
            return;
        const [key] = entries[index];
        const newCustom = { ...el.styles.custom, [key]: value };
        this.designer.updateElement(id, {
            styles: { ...(el.styles ?? {}), custom: newCustom },
        });
    }
    removeStyle(index) {
        const id = this.designer.selectedId();
        const el = this.designer.selectedElement();
        if (!id || !el?.styles?.custom)
            return;
        const entries = Object.entries(el.styles.custom);
        if (index >= entries.length)
            return;
        const [key] = entries[index];
        const newCustom = { ...el.styles.custom };
        delete newCustom[key];
        this.designer.updateElement(id, {
            styles: { ...(el.styles ?? {}), custom: newCustom },
        });
    }
    addState(state) {
        const id = this.designer.selectedId();
        const el = this.designer.selectedElement();
        if (!id || !el)
            return;
        const states = { ...(el.styles?.states ?? {}), [state]: {} };
        this.designer.updateElement(id, {
            styles: { ...(el.styles ?? {}), states },
        });
    }
    addStateRule(state) {
        const id = this.designer.selectedId();
        const el = this.designer.selectedElement();
        if (!id || !el?.styles?.states)
            return;
        const stateRules = {
            ...el.styles.states[state],
            "": "",
        };
        const states = { ...el.styles.states, [state]: stateRules };
        this.designer.updateElement(id, {
            styles: { ...(el.styles ?? {}), states },
        });
    }
    updateStateRule(state, index, target, value) {
        const id = this.designer.selectedId();
        const el = this.designer.selectedElement();
        if (!id || !el?.styles?.states)
            return;
        const stateKey = state;
        const rules = el.styles.states[stateKey];
        if (!rules)
            return;
        const entries = Object.entries(rules);
        if (index >= entries.length)
            return;
        const [oldKey, oldVal] = entries[index];
        const newRules = {};
        for (const [k, v] of Object.entries(rules)) {
            if (target === "key") {
                newRules[k === oldKey ? value : k] = k === oldKey ? oldVal : v;
            }
            else {
                newRules[k === oldKey ? k : k] = k === oldKey ? value : v;
            }
        }
        if (target === "key" && oldKey !== value)
            delete newRules[oldKey];
        const states = { ...el.styles.states, [stateKey]: newRules };
        this.designer.updateElement(id, {
            styles: { ...(el.styles ?? {}), states },
        });
    }
    removeStateRule(state, index) {
        const id = this.designer.selectedId();
        const el = this.designer.selectedElement();
        if (!id || !el?.styles?.states)
            return;
        const stateKey = state;
        const rules = el.styles.states[stateKey];
        if (!rules)
            return;
        const entries = Object.entries(rules);
        if (index >= entries.length)
            return;
        const [key] = entries[index];
        const newRules = { ...rules };
        delete newRules[key];
        const states = { ...el.styles.states, [stateKey]: newRules };
        this.designer.updateElement(id, {
            styles: { ...(el.styles ?? {}), states },
        });
    }
    addEvent() {
        const id = this.designer.selectedId();
        const el = this.designer.selectedElement();
        if (!id || !el)
            return;
        const events = { ...(el.events ?? {}), "": "" };
        this.designer.updateElement(id, { events });
    }
    updateEventName(index, event) {
        const id = this.designer.selectedId();
        const el = this.designer.selectedElement();
        if (!id || !el?.events)
            return;
        const entries = Object.entries(el.events);
        if (index >= entries.length)
            return;
        const [oldEvent, handler] = entries[index];
        const newEvents = {};
        for (const [k, v] of Object.entries(el.events)) {
            newEvents[k === oldEvent ? event : k] = k === oldEvent ? handler : v;
        }
        if (oldEvent !== event)
            delete newEvents[oldEvent];
        this.designer.updateElement(id, { events: newEvents });
    }
    updateEventHandler(index, handler) {
        const id = this.designer.selectedId();
        const el = this.designer.selectedElement();
        if (!id || !el?.events)
            return;
        const entries = Object.entries(el.events);
        if (index >= entries.length)
            return;
        const [event] = entries[index];
        const newEvents = { ...el.events, [event]: handler };
        this.designer.updateElement(id, { events: newEvents });
    }
    removeEvent(index) {
        const id = this.designer.selectedId();
        const el = this.designer.selectedElement();
        if (!id || !el?.events)
            return;
        const entries = Object.entries(el.events);
        if (index >= entries.length)
            return;
        const [event] = entries[index];
        const newEvents = { ...el.events };
        delete newEvents[event];
        this.designer.updateElement(id, { events: newEvents });
    }
    updateBind(key, value) {
        const id = this.designer.selectedId();
        const el = this.designer.selectedElement();
        if (!id || !el)
            return;
        const bind = { ...(el.bind ?? {}), [key]: value };
        this.designer.updateElement(id, { bind });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: PropertiesPanelComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.0.6", type: PropertiesPanelComponent, isStandalone: true, selector: "app-properties-panel", ngImport: i0, template: "<div class=\"ui-properties-panel\">\n  <div class=\"ui-properties-panel-header\">\n    <div>Properties</div>\n    @if (el(); as el) {\n      <div class=\"ui-properties-panel-id\">{{ el.id }}</div>\n    }\n  </div>\n\n  <div class=\"ui-properties-panel-tabs\">\n    @for (tab of tabs; track tab) {\n      <button\n        class=\"ui-properties-tab\"\n        [class.ui-properties-tab-active]=\"activeTab === tab\"\n        (click)=\"activeTab = tab\"\n      >\n        {{ tabLabels[tab] }}\n      </button>\n    }\n  </div>\n\n  @if (el(); as el) {\n    <div class=\"ui-properties-panel-body\">\n      @switch (activeTab) {\n        @case (\"props\") {\n          <div class=\"ui-properties-section\">\n            <div class=\"ui-properties-section-title\">Component</div>\n            <div class=\"ui-properties-field\">\n              <label>Type</label>\n              <input readonly [value]=\"el.componentId\" />\n            </div>\n            <div class=\"ui-properties-field\">\n              <label>ID</label>\n              <input\n                [value]=\"el.id\"\n                (input)=\"updateField('id', $any($event.target).value)\"\n              />\n            </div>\n            <div class=\"ui-properties-field\">\n              <label>Classes</label>\n              <input\n                [value]=\"el.classes || ''\"\n                (input)=\"updateField('classes', $any($event.target).value)\"\n              />\n            </div>\n            @for (prop of propEntries; track prop.key) {\n              <div class=\"ui-properties-field\">\n                <label>{{ prop.key }}</label>\n                <input\n                  [value]=\"prop.value ?? ''\"\n                  (input)=\"updateProp(prop.key, $any($event.target).value)\"\n                />\n              </div>\n            }\n          </div>\n        }\n        @case (\"style\") {\n          <div class=\"ui-properties-section\">\n            <div class=\"ui-properties-section-title\">Inline Styles</div>\n            <div>CSS custom properties and inline styles</div>\n            @for (style of styleEntries; track $index) {\n              <div class=\"ui-properties-field-row\">\n                <input\n                  [value]=\"style.key\"\n                  placeholder=\"property\"\n                  (input)=\"updateStyleKey($index, $any($event.target).value)\"\n                />\n                <input\n                  [value]=\"style.value\"\n                  placeholder=\"value\"\n                  (input)=\"updateStyleVal($index, $any($event.target).value)\"\n                />\n                <button (click)=\"removeStyle($index)\">\u00D7</button>\n              </div>\n            }\n            <button class=\"ui-btn ui-btn-ghost\" (click)=\"addStyle()\">\n              + Add style\n            </button>\n          </div>\n          <div class=\"ui-properties-section\">\n            <div class=\"ui-properties-section-title\">States</div>\n            @for (state of stateKeys; track state) {\n              <div class=\"ui-properties-state\">\n                <label>{{ state }}</label>\n                @for (rule of getStateRules(state); track $index) {\n                  <div class=\"ui-properties-field-row\">\n                    <input\n                      [value]=\"rule.key\"\n                      placeholder=\"property\"\n                      (input)=\"\n                        updateStateRule(\n                          state,\n                          $index,\n                          'key',\n                          $any($event.target).value\n                        )\n                      \"\n                    />\n                    <input\n                      [value]=\"rule.value\"\n                      placeholder=\"value\"\n                      (input)=\"\n                        updateStateRule(\n                          state,\n                          $index,\n                          'val',\n                          $any($event.target).value\n                        )\n                      \"\n                    />\n                    <button (click)=\"removeStateRule(state, $index)\">\u00D7</button>\n                  </div>\n                }\n                <button\n                  class=\"ui-btn ui-btn-ghost\"\n                  (click)=\"addStateRule(state)\"\n                >\n                  + Add rule\n                </button>\n              </div>\n            }\n            <div>\n              @for (s of availableStates; track s) {\n                @if (!stateKeys.includes(s)) {\n                  <button class=\"ui-btn ui-btn-ghost\" (click)=\"addState(s)\">\n                    + {{ s }}\n                  </button>\n                }\n              }\n            </div>\n          </div>\n        }\n        @case (\"events\") {\n          <div class=\"ui-properties-section\">\n            <div class=\"ui-properties-section-title\">Event Handlers</div>\n            <div>Map component @Output() events to schema handlers</div>\n            @for (evt of eventEntries; track $index) {\n              <div class=\"ui-properties-field-row\">\n                <input\n                  [value]=\"evt.event\"\n                  placeholder=\"event name\"\n                  (input)=\"updateEventName($index, $any($event.target).value)\"\n                />\n                <input\n                  [value]=\"evt.handler\"\n                  placeholder=\"handler name\"\n                  (input)=\"\n                    updateEventHandler($index, $any($event.target).value)\n                  \"\n                />\n                <button (click)=\"removeEvent($index)\">\u00D7</button>\n              </div>\n            }\n            <button class=\"ui-btn ui-btn-ghost\" (click)=\"addEvent()\">\n              + Add handler\n            </button>\n          </div>\n          <div class=\"ui-properties-section\">\n            <div class=\"ui-properties-section-title\">Data Binding</div>\n            <div class=\"ui-properties-field\">\n              <label>Store</label>\n              <input\n                [value]=\"el.bind?.store || ''\"\n                (input)=\"updateBind('store', $any($event.target).value)\"\n              />\n            </div>\n            <div class=\"ui-properties-field\">\n              <label>Field</label>\n              <input\n                [value]=\"el.bind?.field || ''\"\n                (input)=\"updateBind('field', $any($event.target).value)\"\n              />\n            </div>\n          </div>\n        }\n      }\n    </div>\n  } @else {\n    <div class=\"ui-properties-panel-empty\">No element selected</div>\n  }\n</div>\n", dependencies: [{ kind: "ngmodule", type: CommonModule }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: PropertiesPanelComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-properties-panel", standalone: true, imports: [CommonModule], template: "<div class=\"ui-properties-panel\">\n  <div class=\"ui-properties-panel-header\">\n    <div>Properties</div>\n    @if (el(); as el) {\n      <div class=\"ui-properties-panel-id\">{{ el.id }}</div>\n    }\n  </div>\n\n  <div class=\"ui-properties-panel-tabs\">\n    @for (tab of tabs; track tab) {\n      <button\n        class=\"ui-properties-tab\"\n        [class.ui-properties-tab-active]=\"activeTab === tab\"\n        (click)=\"activeTab = tab\"\n      >\n        {{ tabLabels[tab] }}\n      </button>\n    }\n  </div>\n\n  @if (el(); as el) {\n    <div class=\"ui-properties-panel-body\">\n      @switch (activeTab) {\n        @case (\"props\") {\n          <div class=\"ui-properties-section\">\n            <div class=\"ui-properties-section-title\">Component</div>\n            <div class=\"ui-properties-field\">\n              <label>Type</label>\n              <input readonly [value]=\"el.componentId\" />\n            </div>\n            <div class=\"ui-properties-field\">\n              <label>ID</label>\n              <input\n                [value]=\"el.id\"\n                (input)=\"updateField('id', $any($event.target).value)\"\n              />\n            </div>\n            <div class=\"ui-properties-field\">\n              <label>Classes</label>\n              <input\n                [value]=\"el.classes || ''\"\n                (input)=\"updateField('classes', $any($event.target).value)\"\n              />\n            </div>\n            @for (prop of propEntries; track prop.key) {\n              <div class=\"ui-properties-field\">\n                <label>{{ prop.key }}</label>\n                <input\n                  [value]=\"prop.value ?? ''\"\n                  (input)=\"updateProp(prop.key, $any($event.target).value)\"\n                />\n              </div>\n            }\n          </div>\n        }\n        @case (\"style\") {\n          <div class=\"ui-properties-section\">\n            <div class=\"ui-properties-section-title\">Inline Styles</div>\n            <div>CSS custom properties and inline styles</div>\n            @for (style of styleEntries; track $index) {\n              <div class=\"ui-properties-field-row\">\n                <input\n                  [value]=\"style.key\"\n                  placeholder=\"property\"\n                  (input)=\"updateStyleKey($index, $any($event.target).value)\"\n                />\n                <input\n                  [value]=\"style.value\"\n                  placeholder=\"value\"\n                  (input)=\"updateStyleVal($index, $any($event.target).value)\"\n                />\n                <button (click)=\"removeStyle($index)\">\u00D7</button>\n              </div>\n            }\n            <button class=\"ui-btn ui-btn-ghost\" (click)=\"addStyle()\">\n              + Add style\n            </button>\n          </div>\n          <div class=\"ui-properties-section\">\n            <div class=\"ui-properties-section-title\">States</div>\n            @for (state of stateKeys; track state) {\n              <div class=\"ui-properties-state\">\n                <label>{{ state }}</label>\n                @for (rule of getStateRules(state); track $index) {\n                  <div class=\"ui-properties-field-row\">\n                    <input\n                      [value]=\"rule.key\"\n                      placeholder=\"property\"\n                      (input)=\"\n                        updateStateRule(\n                          state,\n                          $index,\n                          'key',\n                          $any($event.target).value\n                        )\n                      \"\n                    />\n                    <input\n                      [value]=\"rule.value\"\n                      placeholder=\"value\"\n                      (input)=\"\n                        updateStateRule(\n                          state,\n                          $index,\n                          'val',\n                          $any($event.target).value\n                        )\n                      \"\n                    />\n                    <button (click)=\"removeStateRule(state, $index)\">\u00D7</button>\n                  </div>\n                }\n                <button\n                  class=\"ui-btn ui-btn-ghost\"\n                  (click)=\"addStateRule(state)\"\n                >\n                  + Add rule\n                </button>\n              </div>\n            }\n            <div>\n              @for (s of availableStates; track s) {\n                @if (!stateKeys.includes(s)) {\n                  <button class=\"ui-btn ui-btn-ghost\" (click)=\"addState(s)\">\n                    + {{ s }}\n                  </button>\n                }\n              }\n            </div>\n          </div>\n        }\n        @case (\"events\") {\n          <div class=\"ui-properties-section\">\n            <div class=\"ui-properties-section-title\">Event Handlers</div>\n            <div>Map component @Output() events to schema handlers</div>\n            @for (evt of eventEntries; track $index) {\n              <div class=\"ui-properties-field-row\">\n                <input\n                  [value]=\"evt.event\"\n                  placeholder=\"event name\"\n                  (input)=\"updateEventName($index, $any($event.target).value)\"\n                />\n                <input\n                  [value]=\"evt.handler\"\n                  placeholder=\"handler name\"\n                  (input)=\"\n                    updateEventHandler($index, $any($event.target).value)\n                  \"\n                />\n                <button (click)=\"removeEvent($index)\">\u00D7</button>\n              </div>\n            }\n            <button class=\"ui-btn ui-btn-ghost\" (click)=\"addEvent()\">\n              + Add handler\n            </button>\n          </div>\n          <div class=\"ui-properties-section\">\n            <div class=\"ui-properties-section-title\">Data Binding</div>\n            <div class=\"ui-properties-field\">\n              <label>Store</label>\n              <input\n                [value]=\"el.bind?.store || ''\"\n                (input)=\"updateBind('store', $any($event.target).value)\"\n              />\n            </div>\n            <div class=\"ui-properties-field\">\n              <label>Field</label>\n              <input\n                [value]=\"el.bind?.field || ''\"\n                (input)=\"updateBind('field', $any($event.target).value)\"\n              />\n            </div>\n          </div>\n        }\n      }\n    </div>\n  } @else {\n    <div class=\"ui-properties-panel-empty\">No element selected</div>\n  }\n</div>\n" }]
        }] });
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
        return parseJsonOrDefault(this.tabs);
    }
    handleTabClick(tabId) {
        this.activeTab = tabId;
        this.tabChange.emit(tabId);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: BottomPanelComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.0.6", type: BottomPanelComponent, isStandalone: true, selector: "app-bottom-panel", inputs: { tabs: "tabs", activeTab: "activeTab", position: "position", fullWidth: "fullWidth", floating: "floating", borderRadius: "borderRadius" }, outputs: { tabChange: "tabChange" }, ngImport: i0, template: "<div class=\"ui-bottom-panel\">\n  <div class=\"ui-bottom-panel-tabs\">\n    @for (tab of parsedTabs; track tab.id) {\n      <div\n        class=\"ui-bottom-panel-tab\"\n        [class.ui-bottom-panel-tab-active]=\"activeTab === tab.id\"\n        (click)=\"handleTabClick(tab.id)\"\n      >\n        {{ tab.label }}\n      </div>\n    }\n  </div>\n  <div class=\"ui-bottom-panel-body\">\n    <ng-content></ng-content>\n    @if (!parsedTabs.length) {\n      <div>No tabs available</div>\n    }\n  </div>\n</div>\n" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: BottomPanelComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-bottom-panel", standalone: true, imports: [], template: "<div class=\"ui-bottom-panel\">\n  <div class=\"ui-bottom-panel-tabs\">\n    @for (tab of parsedTabs; track tab.id) {\n      <div\n        class=\"ui-bottom-panel-tab\"\n        [class.ui-bottom-panel-tab-active]=\"activeTab === tab.id\"\n        (click)=\"handleTabClick(tab.id)\"\n      >\n        {{ tab.label }}\n      </div>\n    }\n  </div>\n  <div class=\"ui-bottom-panel-body\">\n    <ng-content></ng-content>\n    @if (!parsedTabs.length) {\n      <div>No tabs available</div>\n    }\n  </div>\n</div>\n" }]
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
    classes = "";
    showBack = false;
    breadcrumbs = "[]";
    fixed = true;
    navigateBack = new EventEmitter();
    get parsedBreadcrumbs() {
        return parseJsonOrDefault(this.breadcrumbs);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: HeaderComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "22.0.6", type: HeaderComponent, isStandalone: true, selector: "app-header", inputs: { title: "title", subtitle: "subtitle", icon: "icon", classes: "classes", showBack: "showBack", breadcrumbs: "breadcrumbs", fixed: "fixed" }, outputs: { navigateBack: "navigateBack" }, ngImport: i0, template: `
    <header
      class="sticky top-0 z-40 w-full flex items-center justify-between px-4 py-3 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 shadow-sm transition-colors"
    >
      <ng-content select="[slot=brand]" />
      <ng-content select="[slot=actions]" />
    </header>
  `, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: HeaderComponent, decorators: [{
            type: Component,
            args: [{
                    selector: "app-header",
                    standalone: true,
                    imports: [IconComponent],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: `
    <header
      class="sticky top-0 z-40 w-full flex items-center justify-between px-4 py-3 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 shadow-sm transition-colors"
    >
      <ng-content select="[slot=brand]" />
      <ng-content select="[slot=actions]" />
    </header>
  `,
                }]
        }], propDecorators: { title: [{
                type: Input
            }], subtitle: [{
                type: Input
            }], icon: [{
                type: Input
            }], classes: [{
                type: Input
            }], showBack: [{
                type: Input
            }], breadcrumbs: [{
                type: Input
            }], fixed: [{
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
    activeId = "";
    groupedItems = "[]";
    collapseChanged = new EventEmitter();
    itemClicked = new EventEmitter();
    sectionScroll = new EventEmitter();
    get parsedItems() {
        return parseJsonOrDefault(this.items);
    }
    get parsedGroups() {
        return parseJsonOrDefault(this.groupedItems);
    }
    get hasGroups() {
        return this.parsedGroups.length > 0;
    }
    toggleCollapse() {
        this.collapsed = !this.collapsed;
        this.collapseChanged.emit({ collapsed: this.collapsed });
    }
    handleItemClick(item) {
        this.itemClicked.emit(item);
        if (item.id) {
            this.sectionScroll.emit(item.id);
        }
    }
    isActive(item) {
        return !!this.activeId && !!item.id && item.id === this.activeId;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: SidebarComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "22.0.6", type: SidebarComponent, isStandalone: true, selector: "app-sidebar", inputs: { collapsed: "collapsed", items: "items", width: "width", collapsedWidth: "collapsedWidth", activeId: "activeId", groupedItems: "groupedItems" }, outputs: { collapseChanged: "collapseChanged", itemClicked: "itemClicked", sectionScroll: "sectionScroll" }, ngImport: i0, template: `
    <aside
      class="h-full px-4 py-5 overflow-y-auto flex flex-col justify-between"
    >
      <ng-content />
    </aside>
  `, isInline: true });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: SidebarComponent, decorators: [{
            type: Component,
            args: [{
                    selector: "app-sidebar",
                    standalone: true,
                    imports: [],
                    template: `
    <aside
      class="h-full px-4 py-5 overflow-y-auto flex flex-col justify-between"
    >
      <ng-content />
    </aside>
  `,
                }]
        }], propDecorators: { collapsed: [{
                type: Input
            }], items: [{
                type: Input
            }], width: [{
                type: Input
            }], collapsedWidth: [{
                type: Input
            }], activeId: [{
                type: Input
            }], groupedItems: [{
                type: Input
            }], collapseChanged: [{
                type: Output
            }], itemClicked: [{
                type: Output
            }], sectionScroll: [{
                type: Output
            }] } });
registerSchemaComponent("app-sidebar", SidebarComponent);

class FooterComponent {
    text = "";
    links = "[]";
    get parsedLinks() {
        return parseJsonOrDefault(this.links);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: FooterComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.0.6", type: FooterComponent, isStandalone: true, selector: "app-footer", inputs: { text: "text", links: "links" }, ngImport: i0, template: `
    <footer
      class="mt-auto flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-5 bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 text-xs text-neutral-500 transition-colors"
    >
      <p>{{ text }}</p>
      <div class="flex gap-4">
        @for (link of parsedLinks; track link.label) {
          <a [href]="link.href || '#'">{{ link.label }}</a>
        }
      </div>
    </footer>
  `, isInline: true, dependencies: [{ kind: "ngmodule", type: CommonModule }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: FooterComponent, decorators: [{
            type: Component,
            args: [{
                    selector: "app-footer",
                    standalone: true,
                    imports: [CommonModule],
                    template: `
    <footer
      class="mt-auto flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-5 bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 text-xs text-neutral-500 transition-colors"
    >
      <p>{{ text }}</p>
      <div class="flex gap-4">
        @for (link of parsedLinks; track link.label) {
          <a [href]="link.href || '#'">{{ link.label }}</a>
        }
      </div>
    </footer>
  `,
                }]
        }], propDecorators: { text: [{
                type: Input
            }], links: [{
                type: Input
            }] } });
registerSchemaComponent("app-footer", FooterComponent);

class PageContainerComponent {
    title = "";
    padding = 24;
    maxWidth = 0;
    width = "";
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: PageContainerComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.0.6", type: PageContainerComponent, isStandalone: true, selector: "app-page-container", inputs: { title: "title", padding: "padding", maxWidth: "maxWidth", width: "width" }, ngImport: i0, template: "@if (title) {\n  <div class=\"ui-page-header\">\n    <h1>{{ title }}</h1>\n    <ng-content select=\"[slot=header-actions]\"></ng-content>\n  </div>\n}\n<div\n  class=\"ui-page-container\"\n  [style.maxWidth]=\"maxWidth ? maxWidth + 'px' : null\"\n>\n  <ng-content></ng-content>\n</div>\n" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: PageContainerComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-page-container", standalone: true, imports: [], template: "@if (title) {\n  <div class=\"ui-page-header\">\n    <h1>{{ title }}</h1>\n    <ng-content select=\"[slot=header-actions]\"></ng-content>\n  </div>\n}\n<div\n  class=\"ui-page-container\"\n  [style.maxWidth]=\"maxWidth ? maxWidth + 'px' : null\"\n>\n  <ng-content></ng-content>\n</div>\n" }]
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
        return parseJsonOrDefault(this.actions);
    }
    handleAction(action) {
        this.actionClicked.emit(action.action || action.label);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: PageToolbarComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.0.6", type: PageToolbarComponent, isStandalone: true, selector: "app-page-toolbar", inputs: { title: "title", actions: "actions" }, outputs: { actionClicked: "actionClicked" }, ngImport: i0, template: "<div class=\"ui-page-toolbar\">\n  <div class=\"ui-page-toolbar-title\">\n    <h2>{{ title }}</h2>\n    <ng-content select=\"[slot=subtitle]\"></ng-content>\n  </div>\n  <div class=\"ui-page-toolbar-actions\">\n    @for (action of parsedActions; track action.label) {\n      <button\n        class=\"ui-btn\"\n        [class.ui-btn-primary]=\"action.variant === 'primary'\"\n        [class.ui-btn-danger]=\"action.variant === 'danger'\"\n        [class.ui-btn-ghost]=\"action.variant === 'ghost'\"\n        (click)=\"handleAction(action)\"\n      >\n        @if (action.icon) {\n          <app-icon [icon]=\"action.icon\" [size]=\"18\" />\n        }\n        {{ action.label }}\n      </button>\n    }\n  </div>\n</div>\n", dependencies: [{ kind: "component", type: IconComponent, selector: "app-icon", inputs: ["icon", "size", "classes", "spin"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: PageToolbarComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-page-toolbar", standalone: true, imports: [IconComponent], template: "<div class=\"ui-page-toolbar\">\n  <div class=\"ui-page-toolbar-title\">\n    <h2>{{ title }}</h2>\n    <ng-content select=\"[slot=subtitle]\"></ng-content>\n  </div>\n  <div class=\"ui-page-toolbar-actions\">\n    @for (action of parsedActions; track action.label) {\n      <button\n        class=\"ui-btn\"\n        [class.ui-btn-primary]=\"action.variant === 'primary'\"\n        [class.ui-btn-danger]=\"action.variant === 'danger'\"\n        [class.ui-btn-ghost]=\"action.variant === 'ghost'\"\n        (click)=\"handleAction(action)\"\n      >\n        @if (action.icon) {\n          <app-icon [icon]=\"action.icon\" [size]=\"18\" />\n        }\n        {{ action.label }}\n      </button>\n    }\n  </div>\n</div>\n" }]
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: SplitViewComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "22.0.6", type: SplitViewComponent, isStandalone: true, selector: "app-split-view", inputs: { direction: "direction", split: "split", minFirst: "minFirst", minSecond: "minSecond" }, outputs: { splitChanged: "splitChanged" }, viewQueries: [{ propertyName: "containerEl", first: true, predicate: ["container"], descendants: true }], ngImport: i0, template: "<div\n  class=\"ui-split-view\"\n  #container\n  [class.ui-split-view-vertical]=\"direction === 'vertical'\"\n>\n  <div\n    class=\"ui-split-pane-first\"\n    [style]=\"\n      direction === 'horizontal'\n        ? 'height: 100%; width: ' + split + '%; flex-grow: 0'\n        : 'width: 100%; height: ' + split + '%; flex-grow: 0'\n    \"\n  >\n    <ng-content select=\"[slot=first]\"></ng-content>\n  </div>\n  <div\n    class=\"ui-split-divider\"\n    [class.ui-split-divider-dragging]=\"isDragging\"\n    [class.ui-split-divider-horizontal]=\"direction === 'horizontal'\"\n    [class.ui-split-divider-vertical]=\"direction === 'vertical'\"\n    (mousedown)=\"onDividerMouseDown($event)\"\n  ></div>\n  <div\n    class=\"ui-split-pane-second\"\n    [style]=\"\n      direction === 'horizontal'\n        ? 'flex: 1; height: 100%'\n        : 'flex: 1; width: 100%'\n    \"\n  >\n    <ng-content select=\"[slot=second]\"></ng-content>\n  </div>\n</div>\n" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: SplitViewComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-split-view", standalone: true, imports: [], template: "<div\n  class=\"ui-split-view\"\n  #container\n  [class.ui-split-view-vertical]=\"direction === 'vertical'\"\n>\n  <div\n    class=\"ui-split-pane-first\"\n    [style]=\"\n      direction === 'horizontal'\n        ? 'height: 100%; width: ' + split + '%; flex-grow: 0'\n        : 'width: 100%; height: ' + split + '%; flex-grow: 0'\n    \"\n  >\n    <ng-content select=\"[slot=first]\"></ng-content>\n  </div>\n  <div\n    class=\"ui-split-divider\"\n    [class.ui-split-divider-dragging]=\"isDragging\"\n    [class.ui-split-divider-horizontal]=\"direction === 'horizontal'\"\n    [class.ui-split-divider-vertical]=\"direction === 'vertical'\"\n    (mousedown)=\"onDividerMouseDown($event)\"\n  ></div>\n  <div\n    class=\"ui-split-pane-second\"\n    [style]=\"\n      direction === 'horizontal'\n        ? 'flex: 1; height: 100%'\n        : 'flex: 1; width: 100%'\n    \"\n  >\n    <ng-content select=\"[slot=second]\"></ng-content>\n  </div>\n</div>\n" }]
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
    /** Alias for `alt` - accepts a name to display initials */
    name = "";
    size = "md";
    imgError = false;
    get initials() {
        return (this.alt || this.name || "").substring(0, 2).toUpperCase();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: AvatarComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.0.6", type: AvatarComponent, isStandalone: true, selector: "app-avatar", inputs: { src: "src", alt: "alt", name: "name", size: "size" }, ngImport: i0, template: "<div class=\"ui-avatar\">\n  @if (src && !imgError) {\n    <img [src]=\"src\" [alt]=\"alt\" (error)=\"imgError = true\" />\n  } @else {\n    <span class=\"ui-avatar-initials\">{{ initials }}</span>\n  }\n</div>\n" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: AvatarComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-avatar", standalone: true, imports: [], template: "<div class=\"ui-avatar\">\n  @if (src && !imgError) {\n    <img [src]=\"src\" [alt]=\"alt\" (error)=\"imgError = true\" />\n  } @else {\n    <span class=\"ui-avatar-initials\">{{ initials }}</span>\n  }\n</div>\n" }]
        }], propDecorators: { src: [{
                type: Input
            }], alt: [{
                type: Input
            }], name: [{
                type: Input
            }], size: [{
                type: Input
            }] } });
registerSchemaComponent("app-avatar", AvatarComponent);

class ChipComponent {
    label = "";
    icon = "";
    removable = false;
    /** Alias for `removable` */
    closeable = false;
    removed = new EventEmitter();
    handleRemove(e) {
        e.stopPropagation();
        this.removed.emit();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: ChipComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.0.6", type: ChipComponent, isStandalone: true, selector: "app-chip", inputs: { label: "label", icon: "icon", removable: "removable", closeable: "closeable" }, outputs: { removed: "removed" }, ngImport: i0, template: "<span class=\"ui-badge\">\n  @if (icon) {\n    <app-icon [icon]=\"icon\" [size]=\"16\" />\n  }\n  <span>{{ label }}</span>\n  @if (removable || closeable) {\n    <button\n      class=\"ui-chip-remove\"\n      (click)=\"handleRemove($event)\"\n      aria-label=\"Remove\"\n    >\n      &times;\n    </button>\n  }\n</span>\n", dependencies: [{ kind: "component", type: IconComponent, selector: "app-icon", inputs: ["icon", "size", "classes", "spin"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: ChipComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-chip", standalone: true, imports: [IconComponent], template: "<span class=\"ui-badge\">\n  @if (icon) {\n    <app-icon [icon]=\"icon\" [size]=\"16\" />\n  }\n  <span>{{ label }}</span>\n  @if (removable || closeable) {\n    <button\n      class=\"ui-chip-remove\"\n      (click)=\"handleRemove($event)\"\n      aria-label=\"Remove\"\n    >\n      &times;\n    </button>\n  }\n</span>\n" }]
        }], propDecorators: { label: [{
                type: Input
            }], icon: [{
                type: Input
            }], removable: [{
                type: Input
            }], closeable: [{
                type: Input
            }], removed: [{
                type: Output
            }] } });
registerSchemaComponent("app-chip", ChipComponent);

class ModalComponent {
    elementRef;
    cdr;
    // Legacy @Input — required so SchemaRendererService can do `modalElement['open'] = true`
    // (signal-based inputs are not reactive to direct DOM property assignment).
    open = false;
    title = "";
    size = "md";
    closeOnBackdrop = true;
    closeOnEscape = true;
    showCloseButton = true;
    showHeader = true;
    showFooter = true;
    contentPosition = "center";
    closed = output();
    opened = output();
    isVisible = signal(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "isVisible" }] : /* istanbul ignore next */ []));
    isAnimating = signal(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "isAnimating" }] : /* istanbul ignore next */ []));
    previousActiveElement = null;
    openedTimeoutId = null;
    closedTimeoutId = null;
    escapeKeyHandler = (event) => {
        if (event.key === "Escape" && this.closeOnEscape && this.open) {
            this.onClose();
        }
    };
    ngOnInit() {
        if (this.open) {
            this.openModal();
        }
    }
    ngOnDestroy() {
        if (this.openedTimeoutId)
            clearTimeout(this.openedTimeoutId);
        if (this.closedTimeoutId)
            clearTimeout(this.closedTimeoutId);
        this.cleanup();
    }
    ngOnChanges(_changes) {
        if (this.open) {
            this.openModal();
        }
        else {
            this.closeModal();
        }
    }
    openModal() {
        if (this.openedTimeoutId) {
            clearTimeout(this.openedTimeoutId);
            this.openedTimeoutId = null;
        }
        this.previousActiveElement = document.activeElement;
        this.isVisible.set(true);
        this.isAnimating.set(true);
        document.body.style.overflow = "hidden";
        document.addEventListener("keydown", this.escapeKeyHandler);
        this.openedTimeoutId = setTimeout(() => {
            this.openedTimeoutId = null;
            this.isAnimating.set(false);
            this.cdr.markForCheck();
            this.opened.emit();
            this.trapFocus();
        }, 50);
    }
    closeModal() {
        if (this.openedTimeoutId) {
            clearTimeout(this.openedTimeoutId);
            this.openedTimeoutId = null;
        }
        this.isAnimating.set(true);
        document.body.style.overflow = "";
        document.removeEventListener("keydown", this.escapeKeyHandler);
        this.closedTimeoutId = setTimeout(() => {
            this.closedTimeoutId = null;
            this.isVisible.set(false);
            this.isAnimating.set(false);
            this.cdr.markForCheck();
            this.closed.emit();
            this.restoreFocus();
        }, 200);
    }
    onBackdropClick(event) {
        if (this.closeOnBackdrop &&
            event.target.classList.contains("modal-backdrop")) {
            this.onClose();
        }
    }
    onClose() {
        this.closeModal();
    }
    get sizeClasses() {
        const sizes = {
            sm: "max-w-[400px]",
            md: "max-w-[600px]",
            lg: "max-w-[800px]",
            xl: "max-w-[1000px]",
            full: "max-w-[calc(100vw-2rem)] max-h-[calc(100vh-2rem)]",
        };
        return sizes[this.size];
    }
    get contentPositionClasses() {
        return this.contentPosition === "top"
            ? "items-start pt-[10vh]"
            : "items-center";
    }
    trapFocus() {
        const focusableElements = this.elementRef.nativeElement.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (focusableElements.length > 0) {
            focusableElements[0].focus();
        }
    }
    restoreFocus() {
        if (this.previousActiveElement) {
            this.previousActiveElement.focus();
            this.previousActiveElement = null;
        }
    }
    cleanup() {
        document.body.style.overflow = "";
        document.removeEventListener("keydown", this.escapeKeyHandler);
    }
    constructor(elementRef, cdr) {
        this.elementRef = elementRef;
        this.cdr = cdr;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: ModalComponent, deps: [{ token: i0.ElementRef }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.0.6", type: ModalComponent, isStandalone: true, selector: "app-modal", inputs: { open: "open", title: "title", size: "size", closeOnBackdrop: "closeOnBackdrop", closeOnEscape: "closeOnEscape", showCloseButton: "showCloseButton", showHeader: "showHeader", showFooter: "showFooter", contentPosition: "contentPosition" }, outputs: { closed: "closed", opened: "opened" }, usesOnChanges: true, ngImport: i0, template: `
    @if (isVisible()) {
      <div
        class="modal-backdrop fixed inset-0 z-50 flex justify-center backdrop-blur-sm transition-opacity duration-200"
        style="background: var(--bg-backdrop)"
        [class.opacity-0]="isAnimating()"
        [class.opacity-100]="!isAnimating()"
        [class]="contentPositionClasses"
        (click)="onBackdropClick($event)"
      >
        <div
          role="dialog"
          aria-modal="true"
          [attr.aria-labelledby]="'modal-title-' + title"
          class="relative w-full rounded-2xl border shadow-2xl backdrop-blur-md transition-all duration-200"
          style="border-color: var(--border-visible); background: var(--bg-modal)"
          [class.scale-95]="isAnimating()"
          [class.scale-100]="!isAnimating()"
          [class]="sizeClasses"
        >
          @if (showHeader) {
            <div
              class="flex items-center justify-between border-b"
              style="border-color: var(--border-subtle)"
            >
              <h2 [id]="'modal-title-' + title" style="color: var(--text-main)">
                {{ title }}
              </h2>
              @if (showCloseButton) {
                <button
                  type="button"
                  (click)="onClose()"
                  class="transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-white"
                  aria-label="Close modal"
                >
                  <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
              }
            </div>
          }
          <div style="max-height: calc(100vh - 12rem)" class="overflow-y-auto">
            <ng-content></ng-content>
          </div>
          @if (showFooter) {
            <div
              class="flex items-center justify-end gap-3 border-t"
              style="border-color: var(--border-subtle)"
            >
              <ng-content select="[modal-footer]"></ng-content>
            </div>
          }
        </div>
      </div>
    }
  `, isInline: true, dependencies: [{ kind: "ngmodule", type: CommonModule }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: ModalComponent, decorators: [{
            type: Component,
            args: [{
                    selector: "app-modal",
                    standalone: true,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    imports: [CommonModule],
                    template: `
    @if (isVisible()) {
      <div
        class="modal-backdrop fixed inset-0 z-50 flex justify-center backdrop-blur-sm transition-opacity duration-200"
        style="background: var(--bg-backdrop)"
        [class.opacity-0]="isAnimating()"
        [class.opacity-100]="!isAnimating()"
        [class]="contentPositionClasses"
        (click)="onBackdropClick($event)"
      >
        <div
          role="dialog"
          aria-modal="true"
          [attr.aria-labelledby]="'modal-title-' + title"
          class="relative w-full rounded-2xl border shadow-2xl backdrop-blur-md transition-all duration-200"
          style="border-color: var(--border-visible); background: var(--bg-modal)"
          [class.scale-95]="isAnimating()"
          [class.scale-100]="!isAnimating()"
          [class]="sizeClasses"
        >
          @if (showHeader) {
            <div
              class="flex items-center justify-between border-b"
              style="border-color: var(--border-subtle)"
            >
              <h2 [id]="'modal-title-' + title" style="color: var(--text-main)">
                {{ title }}
              </h2>
              @if (showCloseButton) {
                <button
                  type="button"
                  (click)="onClose()"
                  class="transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-white"
                  aria-label="Close modal"
                >
                  <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
              }
            </div>
          }
          <div style="max-height: calc(100vh - 12rem)" class="overflow-y-auto">
            <ng-content></ng-content>
          </div>
          @if (showFooter) {
            <div
              class="flex items-center justify-end gap-3 border-t"
              style="border-color: var(--border-subtle)"
            >
              <ng-content select="[modal-footer]"></ng-content>
            </div>
          }
        </div>
      </div>
    }
  `,
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i0.ChangeDetectorRef }], propDecorators: { open: [{
                type: Input
            }], title: [{
                type: Input
            }], size: [{
                type: Input
            }], closeOnBackdrop: [{
                type: Input
            }], closeOnEscape: [{
                type: Input
            }], showCloseButton: [{
                type: Input
            }], showHeader: [{
                type: Input
            }], showFooter: [{
                type: Input
            }], contentPosition: [{
                type: Input
            }], closed: [{ type: i0.Output, args: ["closed"] }], opened: [{ type: i0.Output, args: ["opened"] }] } });

class ConfirmService {
    resolvePromise = null;
    isOpen = signal(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "isOpen" }] : /* istanbul ignore next */ []));
    options = signal({ message: "" }, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "options" }] : /* istanbul ignore next */ []));
    async confirmDelete(itemName) {
        return this.confirm({
            title: "Delete",
            message: `Are you sure you want to delete this? This action cannot be undone.`,
            itemName,
            confirmText: "Delete",
            confirmClass: "rounded-xl border border-[var(--accent)]/50 bg-transparent px-4 py-3 text-sm font-medium text-[var(--accent)] transition-colors hover:border-[var(--accent)]",
        });
    }
    async confirm(options) {
        this.options.set(options);
        this.isOpen.set(true);
        return new Promise((resolve) => {
            this.resolvePromise = resolve;
        });
    }
    confirmResult(result) {
        this.isOpen.set(false);
        this.resolvePromise?.(result);
        this.resolvePromise = null;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: ConfirmService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: ConfirmService, providedIn: "root" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: ConfirmService, decorators: [{
            type: Injectable,
            args: [{ providedIn: "root" }]
        }] });

class ConfirmDialogComponent {
    confirmService;
    constructor(confirmService) {
        this.confirmService = confirmService;
    }
    get options() {
        return this.confirmService.options();
    }
    get isOpen() {
        return this.confirmService.isOpen();
    }
    onConfirm() {
        this.confirmService.confirmResult(true);
    }
    onCancel() {
        this.confirmService.confirmResult(false);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: ConfirmDialogComponent, deps: [{ token: ConfirmService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.0.6", type: ConfirmDialogComponent, isStandalone: true, selector: "app-confirm-dialog", ngImport: i0, template: "<app-modal\n  [open]=\"isOpen\"\n  [title]=\"options.title || 'Confirm'\"\n  size=\"sm\"\n  [showFooter]=\"true\"\n  [showHeader]=\"true\"\n  [showCloseButton]=\"false\"\n  (closed)=\"onCancel()\"\n>\n  <div style=\"color: var(--text-main)\">\n    <p>{{ options.message }}</p>\n    @if (options.itemName) {\n      <p\n        class=\"sf-font-mono\"\n        style=\"background: var(--bg-elevated); color: var(--accent)\"\n      >\n        {{ options.itemName }}\n      </p>\n    }\n  </div>\n\n  <div modal-footer class=\"sf-flex sf-justify-end sf-gap-3\">\n    <button type=\"button\" (click)=\"onCancel()\" class=\"ui-btn ui-btn-outline\">\n      {{ options.cancelText || \"Cancel\" }}\n    </button>\n    <button\n      type=\"button\"\n      (click)=\"onConfirm()\"\n      [class]=\"options.confirmClass || 'ui-btn ui-btn-primary'\"\n    >\n      {{ options.confirmText || \"Confirm\" }}\n    </button>\n  </div>\n</app-modal>\n", dependencies: [{ kind: "component", type: ModalComponent, selector: "app-modal", inputs: ["open", "title", "size", "closeOnBackdrop", "closeOnEscape", "showCloseButton", "showHeader", "showFooter", "contentPosition"], outputs: ["closed", "opened"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: ConfirmDialogComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-confirm-dialog", standalone: true, imports: [ModalComponent], template: "<app-modal\n  [open]=\"isOpen\"\n  [title]=\"options.title || 'Confirm'\"\n  size=\"sm\"\n  [showFooter]=\"true\"\n  [showHeader]=\"true\"\n  [showCloseButton]=\"false\"\n  (closed)=\"onCancel()\"\n>\n  <div style=\"color: var(--text-main)\">\n    <p>{{ options.message }}</p>\n    @if (options.itemName) {\n      <p\n        class=\"sf-font-mono\"\n        style=\"background: var(--bg-elevated); color: var(--accent)\"\n      >\n        {{ options.itemName }}\n      </p>\n    }\n  </div>\n\n  <div modal-footer class=\"sf-flex sf-justify-end sf-gap-3\">\n    <button type=\"button\" (click)=\"onCancel()\" class=\"ui-btn ui-btn-outline\">\n      {{ options.cancelText || \"Cancel\" }}\n    </button>\n    <button\n      type=\"button\"\n      (click)=\"onConfirm()\"\n      [class]=\"options.confirmClass || 'ui-btn ui-btn-primary'\"\n    >\n      {{ options.confirmText || \"Confirm\" }}\n    </button>\n  </div>\n</app-modal>\n" }]
        }], ctorParameters: () => [{ type: ConfirmService }] });

class PaginationComponent {
    cdr;
    constructor(cdr) {
        this.cdr = cdr;
    }
    totalItems = 0;
    currentPage = 0;
    pageSize = 50;
    pageChange = new EventEmitter();
    pageSizeChange = new EventEmitter();
    get totalPages() {
        return Math.ceil(this.totalItems / this.pageSize) || 1;
    }
    get hasNextPage() {
        return this.currentPage < this.totalPages - 1;
    }
    get hasPrevPage() {
        return this.currentPage > 0;
    }
    get startIndex() {
        return this.currentPage * this.pageSize + 1;
    }
    get endIndex() {
        return Math.min((this.currentPage + 1) * this.pageSize, this.totalItems);
    }
    nextPage() {
        if (this.hasNextPage) {
            this.pageChange.emit(this.currentPage + 1);
        }
    }
    prevPage() {
        if (this.hasPrevPage) {
            this.pageChange.emit(this.currentPage - 1);
        }
    }
    firstPage() {
        this.pageChange.emit(0);
    }
    lastPage() {
        this.pageChange.emit(this.totalPages - 1);
    }
    onPageSizeChange(size) {
        this.pageSizeChange.emit(size);
        this.pageChange.emit(0);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: PaginationComponent, deps: [{ token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "22.0.6", type: PaginationComponent, isStandalone: true, selector: "app-pagination", inputs: { totalItems: "totalItems", currentPage: "currentPage", pageSize: "pageSize" }, outputs: { pageChange: "pageChange", pageSizeChange: "pageSizeChange" }, ngImport: i0, template: "<div\n  class=\"sf-flex sf-w-full sf-items-center sf-justify-between sf-border-t sf-bg-transparent\"\n  style=\"border-color: var(--border-subtle)\"\n>\n  <div class=\"sf-flex sf-items-center sf-gap-6\">\n    <span style=\"color: var(--text-dim)\">\n      Showing\n      <span style=\"color: var(--text-main)\">{{ startIndex }}</span\n      >-<span style=\"color: var(--text-main)\">{{ endIndex }}</span> of\n      <span style=\"color: var(--text-main)\">{{ totalItems }}</span>\n    </span>\n    <div class=\"sf-flex sf-items-center sf-gap-3\">\n      <span style=\"color: var(--text-muted)\">Rows per page:</span>\n      <select\n        class=\"sf-cursor-pointer sf-border sf-bg-transparent sf-text-sm sf-focus-outline-none\"\n        style=\"\n          border-color: var(--border-visible);\n          color: var(--text-main);\n          background: var(--bg-card);\n        \"\n        [value]=\"pageSize\"\n        (change)=\"onPageSizeChange(+$any($event.target).value)\"\n      >\n        <option value=\"10\">10</option>\n        <option value=\"25\">25</option>\n        <option value=\"50\">50</option>\n        <option value=\"100\">100</option>\n      </select>\n    </div>\n  </div>\n\n  <div class=\"sf-flex sf-items-center sf-gap-2\">\n    <button\n      class=\"sf-transition-all sf-disabled-cursor-not-allowed sf-disabled-opacity-30 sf-hover-bg-card sf-hover-text-main\"\n      style=\"color: var(--text-dim)\"\n      [disabled]=\"!hasPrevPage\"\n      (click)=\"firstPage()\"\n      title=\"First page\"\n    >\n      <i class=\"fa fa-angles-left\" style=\"font-size: 14px\"></i>\n    </button>\n    <button\n      class=\"sf-transition-all sf-disabled-cursor-not-allowed sf-disabled-opacity-30 sf-hover-bg-card sf-hover-text-main\"\n      style=\"color: var(--text-dim)\"\n      [disabled]=\"!hasPrevPage\"\n      (click)=\"prevPage()\"\n      title=\"Previous page\"\n    >\n      <i class=\"fa fa-chevron-left\" style=\"font-size: 14px\"></i>\n    </button>\n    <span class=\"sf-text-sm\" style=\"color: var(--text-dim)\"\n      >Page {{ currentPage + 1 }} of {{ totalPages || 1 }}</span\n    >\n    <button\n      class=\"sf-transition-all sf-disabled-cursor-not-allowed sf-disabled-opacity-30 sf-hover-bg-card sf-hover-text-main\"\n      style=\"color: var(--text-dim)\"\n      [disabled]=\"!hasNextPage\"\n      (click)=\"nextPage()\"\n      title=\"Next page\"\n    >\n      <i class=\"fa fa-chevron-right\" style=\"font-size: 14px\"></i>\n    </button>\n    <button\n      class=\"sf-transition-all sf-disabled-cursor-not-allowed sf-disabled-opacity-30 sf-hover-bg-card sf-hover-text-main\"\n      style=\"color: var(--text-dim)\"\n      [disabled]=\"!hasNextPage\"\n      (click)=\"lastPage()\"\n      title=\"Last page\"\n    >\n      <i class=\"fa fa-angles-right\" style=\"font-size: 14px\"></i>\n    </button>\n  </div>\n</div>\n", changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: PaginationComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-pagination", standalone: true, changeDetection: ChangeDetectionStrategy.OnPush, imports: [], template: "<div\n  class=\"sf-flex sf-w-full sf-items-center sf-justify-between sf-border-t sf-bg-transparent\"\n  style=\"border-color: var(--border-subtle)\"\n>\n  <div class=\"sf-flex sf-items-center sf-gap-6\">\n    <span style=\"color: var(--text-dim)\">\n      Showing\n      <span style=\"color: var(--text-main)\">{{ startIndex }}</span\n      >-<span style=\"color: var(--text-main)\">{{ endIndex }}</span> of\n      <span style=\"color: var(--text-main)\">{{ totalItems }}</span>\n    </span>\n    <div class=\"sf-flex sf-items-center sf-gap-3\">\n      <span style=\"color: var(--text-muted)\">Rows per page:</span>\n      <select\n        class=\"sf-cursor-pointer sf-border sf-bg-transparent sf-text-sm sf-focus-outline-none\"\n        style=\"\n          border-color: var(--border-visible);\n          color: var(--text-main);\n          background: var(--bg-card);\n        \"\n        [value]=\"pageSize\"\n        (change)=\"onPageSizeChange(+$any($event.target).value)\"\n      >\n        <option value=\"10\">10</option>\n        <option value=\"25\">25</option>\n        <option value=\"50\">50</option>\n        <option value=\"100\">100</option>\n      </select>\n    </div>\n  </div>\n\n  <div class=\"sf-flex sf-items-center sf-gap-2\">\n    <button\n      class=\"sf-transition-all sf-disabled-cursor-not-allowed sf-disabled-opacity-30 sf-hover-bg-card sf-hover-text-main\"\n      style=\"color: var(--text-dim)\"\n      [disabled]=\"!hasPrevPage\"\n      (click)=\"firstPage()\"\n      title=\"First page\"\n    >\n      <i class=\"fa fa-angles-left\" style=\"font-size: 14px\"></i>\n    </button>\n    <button\n      class=\"sf-transition-all sf-disabled-cursor-not-allowed sf-disabled-opacity-30 sf-hover-bg-card sf-hover-text-main\"\n      style=\"color: var(--text-dim)\"\n      [disabled]=\"!hasPrevPage\"\n      (click)=\"prevPage()\"\n      title=\"Previous page\"\n    >\n      <i class=\"fa fa-chevron-left\" style=\"font-size: 14px\"></i>\n    </button>\n    <span class=\"sf-text-sm\" style=\"color: var(--text-dim)\"\n      >Page {{ currentPage + 1 }} of {{ totalPages || 1 }}</span\n    >\n    <button\n      class=\"sf-transition-all sf-disabled-cursor-not-allowed sf-disabled-opacity-30 sf-hover-bg-card sf-hover-text-main\"\n      style=\"color: var(--text-dim)\"\n      [disabled]=\"!hasNextPage\"\n      (click)=\"nextPage()\"\n      title=\"Next page\"\n    >\n      <i class=\"fa fa-chevron-right\" style=\"font-size: 14px\"></i>\n    </button>\n    <button\n      class=\"sf-transition-all sf-disabled-cursor-not-allowed sf-disabled-opacity-30 sf-hover-bg-card sf-hover-text-main\"\n      style=\"color: var(--text-dim)\"\n      [disabled]=\"!hasNextPage\"\n      (click)=\"lastPage()\"\n      title=\"Last page\"\n    >\n      <i class=\"fa fa-angles-right\" style=\"font-size: 14px\"></i>\n    </button>\n  </div>\n</div>\n" }]
        }], ctorParameters: () => [{ type: i0.ChangeDetectorRef }], propDecorators: { totalItems: [{
                type: Input
            }], currentPage: [{
                type: Input
            }], pageSize: [{
                type: Input
            }], pageChange: [{
                type: Output
            }], pageSizeChange: [{
                type: Output
            }] } });

class TabsComponent {
    tabs = "[]";
    activeTab = "";
    tabChanged = new EventEmitter();
    get parsedTabs() {
        return parseJsonOrDefault(this.tabs);
    }
    selectTab(tab) {
        this.activeTab = tab;
        this.tabChanged.emit(tab);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: TabsComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.0.6", type: TabsComponent, isStandalone: true, selector: "app-tabs", inputs: { tabs: "tabs", activeTab: "activeTab" }, outputs: { tabChanged: "tabChanged" }, ngImport: i0, template: `
    <div class="flex gap-1 border-b border-neutral-200 dark:border-neutral-700">
      @for (tab of parsedTabs; track tab) {
        <button
          class="px-4 py-2 text-sm font-medium transition-colors rounded-t-lg"
          [class.text-indigo-600]="tab === activeTab"
          [class.border-b-2]="tab === activeTab"
          [class.border-indigo-600]="tab === activeTab"
          [class.text-neutral-500]="tab !== activeTab"
          [class.hover:text-neutral-700]="tab !== activeTab"
          (click)="selectTab(tab)"
        >
          {{ tab }}
        </button>
      }
    </div>
  `, isInline: true });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: TabsComponent, decorators: [{
            type: Component,
            args: [{
                    selector: "app-tabs",
                    standalone: true,
                    imports: [],
                    template: `
    <div class="flex gap-1 border-b border-neutral-200 dark:border-neutral-700">
      @for (tab of parsedTabs; track tab) {
        <button
          class="px-4 py-2 text-sm font-medium transition-colors rounded-t-lg"
          [class.text-indigo-600]="tab === activeTab"
          [class.border-b-2]="tab === activeTab"
          [class.border-indigo-600]="tab === activeTab"
          [class.text-neutral-500]="tab !== activeTab"
          [class.hover:text-neutral-700]="tab !== activeTab"
          (click)="selectTab(tab)"
        >
          {{ tab }}
        </button>
      }
    </div>
  `,
                }]
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: ProgressBarComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "22.0.6", type: ProgressBarComponent, isStandalone: true, selector: "app-progress-bar", inputs: { value: "value", max: "max" }, ngImport: i0, template: "<div class=\"ui-progress\">\n  <div\n    class=\"ui-progress-fill\"\n    [class.ui-progress-low]=\"fillClass === 'low'\"\n    [class.ui-progress-medium]=\"fillClass === 'medium'\"\n    [class.ui-progress-high]=\"fillClass === 'high'\"\n    [style.width.%]=\"percentage\"\n  ></div>\n</div>\n" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: ProgressBarComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-progress-bar", standalone: true, imports: [], template: "<div class=\"ui-progress\">\n  <div\n    class=\"ui-progress-fill\"\n    [class.ui-progress-low]=\"fillClass === 'low'\"\n    [class.ui-progress-medium]=\"fillClass === 'medium'\"\n    [class.ui-progress-high]=\"fillClass === 'high'\"\n    [style.width.%]=\"percentage\"\n  ></div>\n</div>\n" }]
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
        return parseJsonOrDefault(this.options);
    }
    selectOption(opt) {
        this.selected = opt;
        this.changed.emit(opt);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: SegmentSelectorComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.0.6", type: SegmentSelectorComponent, isStandalone: true, selector: "app-segment-selector", inputs: { options: "options", selected: "selected" }, outputs: { changed: "changed" }, ngImport: i0, template: "<div class=\"ui-segment-selector\">\n  @for (opt of parsedOptions; track opt) {\n    <div\n      class=\"ui-segment-option\"\n      [class.ui-segment-option-active]=\"opt === selected\"\n      (click)=\"selectOption(opt)\"\n    >\n      {{ opt }}\n    </div>\n  }\n</div>\n" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: SegmentSelectorComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-segment-selector", standalone: true, imports: [], template: "<div class=\"ui-segment-selector\">\n  @for (opt of parsedOptions; track opt) {\n    <div\n      class=\"ui-segment-option\"\n      [class.ui-segment-option-active]=\"opt === selected\"\n      (click)=\"selectOption(opt)\"\n    >\n      {{ opt }}\n    </div>\n  }\n</div>\n" }]
        }], propDecorators: { options: [{
                type: Input
            }], selected: [{
                type: Input
            }], changed: [{
                type: Output
            }] } });
registerSchemaComponent("app-segment-selector", SegmentSelectorComponent);

class TooltipComponent {
    text = "";
    /** Alias for `text` */
    content = "";
    position = "top";
    delay = 200;
    show = false;
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: TooltipComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.0.6", type: TooltipComponent, isStandalone: true, selector: "app-tooltip", inputs: { text: "text", content: "content", position: "position", delay: "delay" }, ngImport: i0, template: "<div\n  class=\"ui-tooltip\"\n  (mouseenter)=\"show = true\"\n  (mouseleave)=\"show = false\"\n  (focus)=\"show = true\"\n  (blur)=\"show = false\"\n  tabindex=\"0\"\n>\n  <ng-content></ng-content>\n  @if (show) {\n    <div\n      class=\"ui-tooltip-bubble\"\n      [class.ui-tooltip-top]=\"!position || position === 'top'\"\n      [class.ui-tooltip-bottom]=\"position === 'bottom'\"\n      [class.ui-tooltip-left]=\"position === 'left'\"\n      [class.ui-tooltip-right]=\"position === 'right'\"\n    >\n      {{ text || content }}\n    </div>\n  }\n</div>\n" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: TooltipComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-tooltip", standalone: true, imports: [], template: "<div\n  class=\"ui-tooltip\"\n  (mouseenter)=\"show = true\"\n  (mouseleave)=\"show = false\"\n  (focus)=\"show = true\"\n  (blur)=\"show = false\"\n  tabindex=\"0\"\n>\n  <ng-content></ng-content>\n  @if (show) {\n    <div\n      class=\"ui-tooltip-bubble\"\n      [class.ui-tooltip-top]=\"!position || position === 'top'\"\n      [class.ui-tooltip-bottom]=\"position === 'bottom'\"\n      [class.ui-tooltip-left]=\"position === 'left'\"\n      [class.ui-tooltip-right]=\"position === 'right'\"\n    >\n      {{ text || content }}\n    </div>\n  }\n</div>\n" }]
        }], propDecorators: { text: [{
                type: Input
            }], content: [{
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: SnackbarComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.0.6", type: SnackbarComponent, isStandalone: true, selector: "app-snackbar", inputs: { message: "message", action: "action", duration: "duration", type: "type", open: "open" }, outputs: { dismissed: "dismissed", actioned: "actioned" }, usesOnChanges: true, ngImport: i0, template: `
    @if (open) {
      <div
        class="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-4 py-3 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 text-sm rounded-2xl shadow-xl transition-colors"
        role="status"
      >
        <span class="font-medium">{{ message }}</span>
        @if (action) {
          <button
            class="text-indigo-400 dark:text-indigo-600 font-semibold hover:underline"
            (click)="handleAction()"
          >
            {{ action }}
          </button>
        }
        <button
          class="ml-2 p-1 hover:bg-white/10 dark:hover:bg-black/10 rounded-full"
          (click)="dismiss()"
          aria-label="Dismiss"
        >
          <span class="material-symbols-rounded text-sm">close</span>
        </button>
      </div>
    }
  `, isInline: true });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: SnackbarComponent, decorators: [{
            type: Component,
            args: [{
                    selector: "app-snackbar",
                    standalone: true,
                    imports: [],
                    template: `
    @if (open) {
      <div
        class="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-4 py-3 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 text-sm rounded-2xl shadow-xl transition-colors"
        role="status"
      >
        <span class="font-medium">{{ message }}</span>
        @if (action) {
          <button
            class="text-indigo-400 dark:text-indigo-600 font-semibold hover:underline"
            (click)="handleAction()"
          >
            {{ action }}
          </button>
        }
        <button
          class="ml-2 p-1 hover:bg-white/10 dark:hover:bg-black/10 rounded-full"
          (click)="dismiss()"
          aria-label="Dismiss"
        >
          <span class="material-symbols-rounded text-sm">close</span>
        </button>
      </div>
    }
  `,
                }]
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: SpinnerComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.0.6", type: SpinnerComponent, isStandalone: true, selector: "app-spinner", inputs: { size: "size", color: "color", label: "label" }, ngImport: i0, template: "<div class=\"ui-spinner\">\n  <div\n    class=\"ui-spinner-icon\"\n    [class.ui-spinner-sm]=\"size === 'sm'\"\n    [class.ui-spinner-md]=\"size === 'md'\"\n    [class.ui-spinner-lg]=\"size === 'lg'\"\n    [style.borderTopColor]=\"color || 'var(--accent)'\"\n  ></div>\n  @if (label) {\n    <span>{{ label }}</span>\n  }\n</div>\n" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: SpinnerComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-spinner", standalone: true, imports: [], template: "<div class=\"ui-spinner\">\n  <div\n    class=\"ui-spinner-icon\"\n    [class.ui-spinner-sm]=\"size === 'sm'\"\n    [class.ui-spinner-md]=\"size === 'md'\"\n    [class.ui-spinner-lg]=\"size === 'lg'\"\n    [style.borderTopColor]=\"color || 'var(--accent)'\"\n  ></div>\n  @if (label) {\n    <span>{{ label }}</span>\n  }\n</div>\n" }]
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: DividerComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "22.0.6", type: DividerComponent, isStandalone: true, selector: "app-divider", inputs: { orientation: "orientation", spacing: "spacing", color: "color" }, ngImport: i0, template: "<div\n  class=\"ui-divider\"\n  [class.ui-divider-vertical]=\"orientation === 'vertical'\"\n  role=\"separator\"\n>\n  <div\n    class=\"ui-divider-line\"\n    [class.ui-divider-line-vertical]=\"orientation === 'vertical'\"\n    [style.background]=\"color || 'var(--divider-color, var(--border-color))'\"\n  ></div>\n</div>\n" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: DividerComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-divider", standalone: true, imports: [], template: "<div\n  class=\"ui-divider\"\n  [class.ui-divider-vertical]=\"orientation === 'vertical'\"\n  role=\"separator\"\n>\n  <div\n    class=\"ui-divider-line\"\n    [class.ui-divider-line-vertical]=\"orientation === 'vertical'\"\n    [style.background]=\"color || 'var(--divider-color, var(--border-color))'\"\n  ></div>\n</div>\n" }]
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: TreeNodeComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.0.6", type: TreeNodeComponent, isStandalone: true, selector: "app-tree-node", inputs: { node: "node", depth: "depth" }, outputs: { selected: "selected" }, ngImport: i0, template: "<div\n  class=\"ui-tree-node\"\n  [style.paddingLeft.px]=\"depth * 20\"\n  [class.ui-tree-node-selected]=\"node.selected\"\n  (click)=\"handleClick()\"\n>\n  @if (node.children?.length) {\n    <span class=\"ui-tree-node-toggle\" (click)=\"toggleExpand($event)\">{{\n      node.expanded ? \"\u25BC\" : \"\u25B6\"\n    }}</span>\n  } @else {\n    <span class=\"ui-tree-node-toggle-placeholder\"></span>\n  }\n  @if (node.icon) {\n    <span class=\"ui-tree-node-icon\">{{ node.icon }}</span>\n  }\n  <span class=\"ui-tree-node-label\">{{ node.label }}</span>\n</div>\n@if (node.expanded && node.children?.length) {\n  @for (child of node.children; track child.id) {\n    <app-tree-node\n      [node]=\"child\"\n      [depth]=\"depth + 1\"\n      (selected)=\"onChildSelected($event)\"\n    ></app-tree-node>\n  }\n}\n", dependencies: [{ kind: "component", type: TreeNodeComponent, selector: "app-tree-node", inputs: ["node", "depth"], outputs: ["selected"] }, { kind: "ngmodule", type: CommonModule }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: TreeNodeComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-tree-node", standalone: true, imports: [CommonModule], template: "<div\n  class=\"ui-tree-node\"\n  [style.paddingLeft.px]=\"depth * 20\"\n  [class.ui-tree-node-selected]=\"node.selected\"\n  (click)=\"handleClick()\"\n>\n  @if (node.children?.length) {\n    <span class=\"ui-tree-node-toggle\" (click)=\"toggleExpand($event)\">{{\n      node.expanded ? \"\u25BC\" : \"\u25B6\"\n    }}</span>\n  } @else {\n    <span class=\"ui-tree-node-toggle-placeholder\"></span>\n  }\n  @if (node.icon) {\n    <span class=\"ui-tree-node-icon\">{{ node.icon }}</span>\n  }\n  <span class=\"ui-tree-node-label\">{{ node.label }}</span>\n</div>\n@if (node.expanded && node.children?.length) {\n  @for (child of node.children; track child.id) {\n    <app-tree-node\n      [node]=\"child\"\n      [depth]=\"depth + 1\"\n      (selected)=\"onChildSelected($event)\"\n    ></app-tree-node>\n  }\n}\n" }]
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
        return parseJsonOrDefault(this.nodes);
    }
    onNodeSelected(node) {
        this.selected.emit(node);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: TreeComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.0.6", type: TreeComponent, isStandalone: true, selector: "app-tree", inputs: { nodes: "nodes", selectable: "selectable" }, outputs: { selected: "selected" }, ngImport: i0, template: "<div class=\"ui-tree\">\n  @for (node of parsedNodes; track node.id) {\n    <app-tree-node\n      [node]=\"node\"\n      [depth]=\"0\"\n      (selected)=\"onNodeSelected($event)\"\n    ></app-tree-node>\n  }\n</div>\n", dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "component", type: TreeNodeComponent, selector: "app-tree-node", inputs: ["node", "depth"], outputs: ["selected"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: TreeComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-tree", standalone: true, imports: [CommonModule, TreeNodeComponent], template: "<div class=\"ui-tree\">\n  @for (node of parsedNodes; track node.id) {\n    <app-tree-node\n      [node]=\"node\"\n      [depth]=\"0\"\n      (selected)=\"onNodeSelected($event)\"\n    ></app-tree-node>\n  }\n</div>\n" }]
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: FormComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.0.6", type: FormComponent, isStandalone: true, selector: "app-form", inputs: { heading: "heading", showActions: "showActions", submitText: "submitText", cancelText: "cancelText" }, outputs: { submitted: "submitted", cancelled: "cancelled" }, ngImport: i0, template: "<form (submit)=\"handleSubmit($event)\">\n  @if (heading) {\n    <h3>{{ heading }}</h3>\n  }\n  <ng-content></ng-content>\n  @if (showActions) {\n    <div class=\"ui-form-actions\">\n      <button type=\"submit\" class=\"ui-btn ui-btn-primary\">\n        {{ submitText }}\n      </button>\n      <button\n        type=\"button\"\n        class=\"ui-btn ui-btn-secondary\"\n        (click)=\"handleCancel()\"\n      >\n        {{ cancelText }}\n      </button>\n    </div>\n  }\n</form>\n" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: FormComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-form", standalone: true, imports: [], template: "<form (submit)=\"handleSubmit($event)\">\n  @if (heading) {\n    <h3>{{ heading }}</h3>\n  }\n  <ng-content></ng-content>\n  @if (showActions) {\n    <div class=\"ui-form-actions\">\n      <button type=\"submit\" class=\"ui-btn ui-btn-primary\">\n        {{ submitText }}\n      </button>\n      <button\n        type=\"button\"\n        class=\"ui-btn ui-btn-secondary\"\n        (click)=\"handleCancel()\"\n      >\n        {{ cancelText }}\n      </button>\n    </div>\n  }\n</form>\n" }]
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: CheckboxComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "22.0.6", type: CheckboxComponent, isStandalone: true, selector: "app-checkbox", inputs: { checked: "checked", label: "label", disabled: "disabled" }, outputs: { changed: "changed" }, ngImport: i0, template: `
    <label class="flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        class="w-5 h-5 text-indigo-600 bg-neutral-100 border-neutral-300 rounded focus:ring-indigo-500 dark:bg-neutral-700 dark:border-neutral-600"
      />
      <span class="text-sm text-neutral-700 dark:text-neutral-300">{{
        label
      }}</span>
    </label>
  `, isInline: true });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: CheckboxComponent, decorators: [{
            type: Component,
            args: [{
                    selector: "app-checkbox",
                    standalone: true,
                    imports: [],
                    template: `
    <label class="flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        class="w-5 h-5 text-indigo-600 bg-neutral-100 border-neutral-300 rounded focus:ring-indigo-500 dark:bg-neutral-700 dark:border-neutral-600"
      />
      <span class="text-sm text-neutral-700 dark:text-neutral-300">{{
        label
      }}</span>
    </label>
  `,
                }]
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
    toast = input.required(/* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "toast" }] : /* istanbul ignore next */ []));
    dismiss = output();
    onDismiss() {
        this.dismiss.emit(this.toast().id);
    }
    onAction() {
        const action = this.toast().action;
        if (action) {
            action.callback();
        }
        this.dismiss.emit(this.toast().id);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: ToastComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.0.6", type: ToastComponent, isStandalone: true, selector: "app-toast", inputs: { toast: { classPropertyName: "toast", publicName: "toast", isSignal: true, isRequired: true, transformFunction: null } }, outputs: { dismiss: "dismiss" }, ngImport: i0, template: "<div\n  class=\"sf-relative sf-flex sf-items-start sf-gap-3 sf-border-l-4 sf-shadow-lg\"\n  style=\"background: var(--bg-toast); color: var(--text-main)\"\n  [style.border-left-color]=\"\n    toast().type === 'success'\n      ? 'var(--success)'\n      : toast().type === 'error'\n        ? 'var(--error)'\n        : toast().type === 'warning'\n          ? 'var(--warning)'\n          : toast().type === 'info'\n            ? 'var(--info)'\n            : 'var(--border)'\n  \"\n  role=\"alert\"\n>\n  <div class=\"sf-mt-0.5 sf-flex-shrink-0\">\n    @switch (toast().type) {\n      @case (\"success\") {\n        <svg\n          class=\"sf-h-5 sf-w-5\"\n          fill=\"none\"\n          viewBox=\"0 0 24 24\"\n          stroke=\"currentColor\"\n          style=\"color: var(--success)\"\n        >\n          <path\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n            stroke-width=\"2\"\n            d=\"M5 13l4 4L19 7\"\n          />\n        </svg>\n      }\n      @case (\"error\") {\n        <svg\n          class=\"sf-h-5 sf-w-5\"\n          fill=\"none\"\n          viewBox=\"0 0 24 24\"\n          stroke=\"currentColor\"\n          style=\"color: var(--error)\"\n        >\n          <path\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n            stroke-width=\"2\"\n            d=\"M6 18L18 6M6 6l12 12\"\n          />\n        </svg>\n      }\n      @case (\"warning\") {\n        <svg\n          class=\"sf-h-5 sf-w-5\"\n          fill=\"none\"\n          viewBox=\"0 0 24 24\"\n          stroke=\"currentColor\"\n          style=\"color: var(--warning)\"\n        >\n          <path\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n            stroke-width=\"2\"\n            d=\"M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z\"\n          />\n        </svg>\n      }\n      @case (\"info\") {\n        <svg\n          class=\"sf-h-5 sf-w-5\"\n          fill=\"none\"\n          viewBox=\"0 0 24 24\"\n          stroke=\"currentColor\"\n          style=\"color: var(--info)\"\n        >\n          <path\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n            stroke-width=\"2\"\n            d=\"M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z\"\n          />\n        </svg>\n      }\n    }\n  </div>\n\n  <div class=\"sf-min-w-0 sf-flex-1\">\n    @if (toast().title) {\n      <p class=\"sf-font-semibold\">{{ toast().title }}</p>\n    }\n    <p [class.sf-font-medium]=\"!toast().title\">\n      {{ toast().message }}\n    </p>\n    @if (toast().action) {\n      <button\n        class=\"sf-mt-2 sf-transition-colors\"\n        style=\"color: var(--success)\"\n      >\n        {{ toast().action!.label }}\n      </button>\n    }\n  </div>\n\n  <button\n    class=\"sf-flex-shrink-0 sf-transition-colors sf-hover-text-main\"\n    style=\"color: var(--text-dim)\"\n    (click)=\"onDismiss()\"\n    aria-label=\"Dismiss\"\n  >\n    <svg\n      class=\"sf-h-4 sf-w-4\"\n      fill=\"none\"\n      viewBox=\"0 0 24 24\"\n      stroke=\"currentColor\"\n    >\n      <path\n        stroke-linecap=\"round\"\n        stroke-linejoin=\"round\"\n        stroke-width=\"2\"\n        d=\"M6 18L18 6M6 6l12 12\"\n      />\n    </svg>\n  </button>\n\n  @if (!toast().persistent && (toast().duration ?? 0) > 0) {\n    <div\n      class=\"sf-absolute sf-right-0 sf-bottom-0 sf-left-0 sf-h-1 sf-overflow-hidden\"\n      style=\"background: var(--bg-elevated)\"\n    >\n      <div\n        class=\"sf-h-full sf-w-full\"\n        [style.background]=\"\n          toast().type === 'success'\n            ? 'var(--success)'\n            : toast().type === 'error'\n              ? 'var(--error)'\n              : toast().type === 'warning'\n                ? 'var(--warning)'\n                : toast().type === 'info'\n                  ? 'var(--info)'\n                  : 'var(--primary)'\n        \"\n      ></div>\n    </div>\n  }\n</div>\n" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: ToastComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-toast", standalone: true, template: "<div\n  class=\"sf-relative sf-flex sf-items-start sf-gap-3 sf-border-l-4 sf-shadow-lg\"\n  style=\"background: var(--bg-toast); color: var(--text-main)\"\n  [style.border-left-color]=\"\n    toast().type === 'success'\n      ? 'var(--success)'\n      : toast().type === 'error'\n        ? 'var(--error)'\n        : toast().type === 'warning'\n          ? 'var(--warning)'\n          : toast().type === 'info'\n            ? 'var(--info)'\n            : 'var(--border)'\n  \"\n  role=\"alert\"\n>\n  <div class=\"sf-mt-0.5 sf-flex-shrink-0\">\n    @switch (toast().type) {\n      @case (\"success\") {\n        <svg\n          class=\"sf-h-5 sf-w-5\"\n          fill=\"none\"\n          viewBox=\"0 0 24 24\"\n          stroke=\"currentColor\"\n          style=\"color: var(--success)\"\n        >\n          <path\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n            stroke-width=\"2\"\n            d=\"M5 13l4 4L19 7\"\n          />\n        </svg>\n      }\n      @case (\"error\") {\n        <svg\n          class=\"sf-h-5 sf-w-5\"\n          fill=\"none\"\n          viewBox=\"0 0 24 24\"\n          stroke=\"currentColor\"\n          style=\"color: var(--error)\"\n        >\n          <path\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n            stroke-width=\"2\"\n            d=\"M6 18L18 6M6 6l12 12\"\n          />\n        </svg>\n      }\n      @case (\"warning\") {\n        <svg\n          class=\"sf-h-5 sf-w-5\"\n          fill=\"none\"\n          viewBox=\"0 0 24 24\"\n          stroke=\"currentColor\"\n          style=\"color: var(--warning)\"\n        >\n          <path\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n            stroke-width=\"2\"\n            d=\"M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z\"\n          />\n        </svg>\n      }\n      @case (\"info\") {\n        <svg\n          class=\"sf-h-5 sf-w-5\"\n          fill=\"none\"\n          viewBox=\"0 0 24 24\"\n          stroke=\"currentColor\"\n          style=\"color: var(--info)\"\n        >\n          <path\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n            stroke-width=\"2\"\n            d=\"M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z\"\n          />\n        </svg>\n      }\n    }\n  </div>\n\n  <div class=\"sf-min-w-0 sf-flex-1\">\n    @if (toast().title) {\n      <p class=\"sf-font-semibold\">{{ toast().title }}</p>\n    }\n    <p [class.sf-font-medium]=\"!toast().title\">\n      {{ toast().message }}\n    </p>\n    @if (toast().action) {\n      <button\n        class=\"sf-mt-2 sf-transition-colors\"\n        style=\"color: var(--success)\"\n      >\n        {{ toast().action!.label }}\n      </button>\n    }\n  </div>\n\n  <button\n    class=\"sf-flex-shrink-0 sf-transition-colors sf-hover-text-main\"\n    style=\"color: var(--text-dim)\"\n    (click)=\"onDismiss()\"\n    aria-label=\"Dismiss\"\n  >\n    <svg\n      class=\"sf-h-4 sf-w-4\"\n      fill=\"none\"\n      viewBox=\"0 0 24 24\"\n      stroke=\"currentColor\"\n    >\n      <path\n        stroke-linecap=\"round\"\n        stroke-linejoin=\"round\"\n        stroke-width=\"2\"\n        d=\"M6 18L18 6M6 6l12 12\"\n      />\n    </svg>\n  </button>\n\n  @if (!toast().persistent && (toast().duration ?? 0) > 0) {\n    <div\n      class=\"sf-absolute sf-right-0 sf-bottom-0 sf-left-0 sf-h-1 sf-overflow-hidden\"\n      style=\"background: var(--bg-elevated)\"\n    >\n      <div\n        class=\"sf-h-full sf-w-full\"\n        [style.background]=\"\n          toast().type === 'success'\n            ? 'var(--success)'\n            : toast().type === 'error'\n              ? 'var(--error)'\n              : toast().type === 'warning'\n                ? 'var(--warning)'\n                : toast().type === 'info'\n                  ? 'var(--info)'\n                  : 'var(--primary)'\n        \"\n      ></div>\n    </div>\n  }\n</div>\n" }]
        }], propDecorators: { toast: [{ type: i0.Input, args: [{ isSignal: true, alias: "toast", required: true }] }], dismiss: [{ type: i0.Output, args: ["dismiss"] }] } });

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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: NavItemComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.0.6", type: NavItemComponent, isStandalone: true, selector: "app-nav-item", inputs: { icon: "icon", label: "label", active: "active", disabled: "disabled" }, outputs: { clicked: "clicked" }, ngImport: i0, template: "<a\n  class=\"nav-item\"\n  [class.active]=\"active\"\n  [class.disabled]=\"disabled\"\n  (click)=\"handleClick()\"\n>\n  @if (icon) {\n    <span class=\"nav-icon\">{{ icon }}</span>\n  }\n  <span class=\"nav-label\"><ng-content></ng-content></span>\n</a>\n", styles: [":host{display:block}.nav-item{display:flex;align-items:center;gap:.75rem;padding:.5rem .75rem;border-radius:.375rem;color:var(--text-secondary);text-decoration:none;cursor:pointer;transition:all .15s}.nav-item:hover{background:var(--bg-hover);color:var(--text-primary)}.nav-item.active{background:var(--accent);color:var(--text-on-accent)}.nav-item.disabled{opacity:.4;cursor:not-allowed}.nav-icon{display:flex;align-items:center;font-size:1.25rem}.nav-label{flex:1}\n"] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: NavItemComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-nav-item", standalone: true, template: "<a\n  class=\"nav-item\"\n  [class.active]=\"active\"\n  [class.disabled]=\"disabled\"\n  (click)=\"handleClick()\"\n>\n  @if (icon) {\n    <span class=\"nav-icon\">{{ icon }}</span>\n  }\n  <span class=\"nav-label\"><ng-content></ng-content></span>\n</a>\n", styles: [":host{display:block}.nav-item{display:flex;align-items:center;gap:.75rem;padding:.5rem .75rem;border-radius:.375rem;color:var(--text-secondary);text-decoration:none;cursor:pointer;transition:all .15s}.nav-item:hover{background:var(--bg-hover);color:var(--text-primary)}.nav-item.active{background:var(--accent);color:var(--text-on-accent)}.nav-item.disabled{opacity:.4;cursor:not-allowed}.nav-icon{display:flex;align-items:center;font-size:1.25rem}.nav-label{flex:1}\n"] }]
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: NavGroupComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.0.6", type: NavGroupComponent, isStandalone: true, selector: "app-nav-group", inputs: { label: "label" }, ngImport: i0, template: "<div class=\"nav-group\">\n  @if (label) {\n    <div class=\"nav-group-title\">{{ label }}</div>\n  }\n  <ng-content></ng-content>\n</div>\n", styles: [":host{display:block}.nav-group{margin-bottom:.5rem}.nav-group-title{padding:.5rem .75rem;font-size:.75rem;font-weight:600;color:var(--text-secondary);text-transform:uppercase;letter-spacing:.05em}\n"] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: NavGroupComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-nav-group", standalone: true, template: "<div class=\"nav-group\">\n  @if (label) {\n    <div class=\"nav-group-title\">{{ label }}</div>\n  }\n  <ng-content></ng-content>\n</div>\n", styles: [":host{display:block}.nav-group{margin-bottom:.5rem}.nav-group-title{padding:.5rem .75rem;font-size:.75rem;font-weight:600;color:var(--text-secondary);text-transform:uppercase;letter-spacing:.05em}\n"] }]
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: CanvasToolbarComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "22.0.6", type: CanvasToolbarComponent, isStandalone: true, selector: "app-canvas-toolbar", inputs: { zoomLevel: "zoomLevel", showGrid: "showGrid", canUndo: "canUndo", canRedo: "canRedo" }, outputs: { action: "action" }, ngImport: i0, template: "<div class=\"ui-canvas-toolbar\">\n  <div class=\"ui-toolbar-group\">\n    <button\n      class=\"ui-icon-btn\"\n      [disabled]=\"!canUndo\"\n      (click)=\"emit('undo')\"\n      title=\"Undo\"\n    >\n      <span>\u21A9</span>\n    </button>\n    <button\n      class=\"ui-icon-btn\"\n      [disabled]=\"!canRedo\"\n      (click)=\"emit('redo')\"\n      title=\"Redo\"\n    >\n      <span>\u21AA</span>\n    </button>\n  </div>\n  <div class=\"ui-toolbar-group\">\n    <button class=\"ui-icon-btn\" (click)=\"emit('zoom-out')\" title=\"Zoom Out\">\n      <span>\u2212</span>\n    </button>\n    <span class=\"ui-zoom-label\">{{ zoomLevel }}%</span>\n    <button class=\"ui-icon-btn\" (click)=\"emit('zoom-in')\" title=\"Zoom In\">\n      <span>+</span>\n    </button>\n    <button class=\"ui-icon-btn\" (click)=\"emit('zoom-reset')\" title=\"Reset Zoom\">\n      <span>\u22A1</span>\n    </button>\n  </div>\n  <div class=\"ui-toolbar-group\">\n    <button\n      class=\"ui-icon-btn\"\n      [class.ui-icon-btn-active]=\"showGrid\"\n      (click)=\"emit('toggle-grid')\"\n      title=\"Toggle Grid\"\n    >\n      <span>\u25A6</span>\n    </button>\n  </div>\n</div>\n" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: CanvasToolbarComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-canvas-toolbar", standalone: true, imports: [], template: "<div class=\"ui-canvas-toolbar\">\n  <div class=\"ui-toolbar-group\">\n    <button\n      class=\"ui-icon-btn\"\n      [disabled]=\"!canUndo\"\n      (click)=\"emit('undo')\"\n      title=\"Undo\"\n    >\n      <span>\u21A9</span>\n    </button>\n    <button\n      class=\"ui-icon-btn\"\n      [disabled]=\"!canRedo\"\n      (click)=\"emit('redo')\"\n      title=\"Redo\"\n    >\n      <span>\u21AA</span>\n    </button>\n  </div>\n  <div class=\"ui-toolbar-group\">\n    <button class=\"ui-icon-btn\" (click)=\"emit('zoom-out')\" title=\"Zoom Out\">\n      <span>\u2212</span>\n    </button>\n    <span class=\"ui-zoom-label\">{{ zoomLevel }}%</span>\n    <button class=\"ui-icon-btn\" (click)=\"emit('zoom-in')\" title=\"Zoom In\">\n      <span>+</span>\n    </button>\n    <button class=\"ui-icon-btn\" (click)=\"emit('zoom-reset')\" title=\"Reset Zoom\">\n      <span>\u22A1</span>\n    </button>\n  </div>\n  <div class=\"ui-toolbar-group\">\n    <button\n      class=\"ui-icon-btn\"\n      [class.ui-icon-btn-active]=\"showGrid\"\n      (click)=\"emit('toggle-grid')\"\n      title=\"Toggle Grid\"\n    >\n      <span>\u25A6</span>\n    </button>\n  </div>\n</div>\n" }]
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: DesignerSidebarComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "22.0.6", type: DesignerSidebarComponent, isStandalone: true, selector: "app-designer-sidebar", inputs: { position: "position", collapsed: "collapsed", header: "header" }, outputs: { collapsedChange: "collapsedChange" }, ngImport: i0, template: "<div class=\"ui-designer-sidebar\">\n  <aside\n    class=\"ui-designer-sidebar-panel\"\n    [class.ui-designer-sidebar-collapsed]=\"collapsed\"\n    [style.border-right]=\"\n      position === 'left' ? '1px solid var(--border-color)' : 'none'\n    \"\n    [style.border-left]=\"\n      position === 'right' ? '1px solid var(--border-color)' : 'none'\n    \"\n  >\n    <div\n      class=\"ui-designer-sidebar-header\"\n      [style.flex-direction]=\"position === 'right' ? 'row-reverse' : 'row'\"\n    >\n      <span>{{ header }}</span>\n    </div>\n    <div class=\"ui-designer-sidebar-content\">\n      <ng-content select=\"[slot=content]\"></ng-content>\n    </div>\n    <div class=\"ui-designer-sidebar-footer\">\n      <ng-content select=\"[slot=footer]\"></ng-content>\n    </div>\n  </aside>\n  <div\n    class=\"ui-designer-sidebar-toggle\"\n    [style.right]=\"position === 'left' ? '-12px' : 'auto'\"\n    [style.left]=\"position === 'right' ? '-12px' : 'auto'\"\n  >\n    <button (click)=\"toggleCollapse()\">\n      {{\n        collapsed\n          ? position === \"left\"\n            ? \"\u25B6\"\n            : \"\u25C0\"\n          : position === \"left\"\n            ? \"\u25C0\"\n            : \"\u25B6\"\n      }}\n    </button>\n  </div>\n</div>\n" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: DesignerSidebarComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-designer-sidebar", standalone: true, imports: [], template: "<div class=\"ui-designer-sidebar\">\n  <aside\n    class=\"ui-designer-sidebar-panel\"\n    [class.ui-designer-sidebar-collapsed]=\"collapsed\"\n    [style.border-right]=\"\n      position === 'left' ? '1px solid var(--border-color)' : 'none'\n    \"\n    [style.border-left]=\"\n      position === 'right' ? '1px solid var(--border-color)' : 'none'\n    \"\n  >\n    <div\n      class=\"ui-designer-sidebar-header\"\n      [style.flex-direction]=\"position === 'right' ? 'row-reverse' : 'row'\"\n    >\n      <span>{{ header }}</span>\n    </div>\n    <div class=\"ui-designer-sidebar-content\">\n      <ng-content select=\"[slot=content]\"></ng-content>\n    </div>\n    <div class=\"ui-designer-sidebar-footer\">\n      <ng-content select=\"[slot=footer]\"></ng-content>\n    </div>\n  </aside>\n  <div\n    class=\"ui-designer-sidebar-toggle\"\n    [style.right]=\"position === 'left' ? '-12px' : 'auto'\"\n    [style.left]=\"position === 'right' ? '-12px' : 'auto'\"\n  >\n    <button (click)=\"toggleCollapse()\">\n      {{\n        collapsed\n          ? position === \"left\"\n            ? \"\u25B6\"\n            : \"\u25C0\"\n          : position === \"left\"\n            ? \"\u25C0\"\n            : \"\u25B6\"\n      }}\n    </button>\n  </div>\n</div>\n" }]
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
    designer = inject(DesignerCanvasService);
    zoomIn() {
        this.designer.setZoom(this.designer.zoom() + 10);
    }
    zoomOut() {
        this.designer.setZoom(this.designer.zoom() - 10);
    }
    deleteSelected() {
        const id = this.designer.selectedId();
        if (id)
            this.designer.deleteElement(id);
    }
    onCanvasClick(e) {
        const target = e.target;
        if (target.closest(".canvas-element"))
            return;
        this.designer.selectElement(null);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: MainEditorComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "22.0.6", type: MainEditorComponent, isStandalone: true, selector: "app-main-editor", ngImport: i0, template: "<div class=\"ui-main-editor\">\n  <div class=\"ui-main-editor-toolbar\">\n    <button\n      class=\"ui-icon-btn\"\n      [disabled]=\"!designer.canUndo()\"\n      (click)=\"designer.undo()\"\n      title=\"Undo\"\n    >\n      <app-icon icon=\"undo\" [size]=\"18\" />\n    </button>\n    <button\n      class=\"ui-icon-btn\"\n      [disabled]=\"!designer.canRedo()\"\n      (click)=\"designer.redo()\"\n      title=\"Redo\"\n    >\n      <app-icon icon=\"redo\" [size]=\"18\" />\n    </button>\n    <div class=\"ui-toolbar-divider\"></div>\n    <button\n      class=\"ui-icon-btn\"\n      [class.ui-icon-btn-active]=\"designer.showGrid()\"\n      (click)=\"designer.toggleGrid()\"\n      title=\"Toggle grid\"\n    >\n      <app-icon icon=\"grid\" [size]=\"18\" />\n    </button>\n    <div class=\"ui-toolbar-divider\"></div>\n    <button class=\"ui-icon-btn\" (click)=\"zoomOut()\" title=\"Zoom out\">\n      <app-icon icon=\"zoom_out\" [size]=\"18\" />\n    </button>\n    <span class=\"ui-zoom-label\">{{ designer.zoom() }}%</span>\n    <button class=\"ui-icon-btn\" (click)=\"zoomIn()\" title=\"Zoom in\">\n      <app-icon icon=\"zoom_in\" [size]=\"18\" />\n    </button>\n    <button\n      class=\"ui-icon-btn\"\n      (click)=\"designer.setZoom(100)\"\n      title=\"Reset zoom\"\n    >\n      <app-icon icon=\"fit_screen\" [size]=\"18\" />\n    </button>\n    <div class=\"ui-toolbar-spacer\"></div>\n    <button\n      class=\"ui-icon-btn\"\n      [disabled]=\"!designer.selectedId()\"\n      (click)=\"deleteSelected()\"\n      title=\"Delete selected\"\n    >\n      <app-icon icon=\"delete\" [size]=\"18\" />\n    </button>\n  </div>\n  <div class=\"ui-main-editor-canvas\" (click)=\"onCanvasClick($event)\">\n    <app-canvas></app-canvas>\n  </div>\n</div>\n", dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "component", type: CanvasComponent, selector: "app-canvas" }, { kind: "component", type: IconComponent, selector: "app-icon", inputs: ["icon", "size", "classes", "spin"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: MainEditorComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-main-editor", standalone: true, schemas: [CUSTOM_ELEMENTS_SCHEMA], imports: [CommonModule, CanvasComponent, IconComponent], template: "<div class=\"ui-main-editor\">\n  <div class=\"ui-main-editor-toolbar\">\n    <button\n      class=\"ui-icon-btn\"\n      [disabled]=\"!designer.canUndo()\"\n      (click)=\"designer.undo()\"\n      title=\"Undo\"\n    >\n      <app-icon icon=\"undo\" [size]=\"18\" />\n    </button>\n    <button\n      class=\"ui-icon-btn\"\n      [disabled]=\"!designer.canRedo()\"\n      (click)=\"designer.redo()\"\n      title=\"Redo\"\n    >\n      <app-icon icon=\"redo\" [size]=\"18\" />\n    </button>\n    <div class=\"ui-toolbar-divider\"></div>\n    <button\n      class=\"ui-icon-btn\"\n      [class.ui-icon-btn-active]=\"designer.showGrid()\"\n      (click)=\"designer.toggleGrid()\"\n      title=\"Toggle grid\"\n    >\n      <app-icon icon=\"grid\" [size]=\"18\" />\n    </button>\n    <div class=\"ui-toolbar-divider\"></div>\n    <button class=\"ui-icon-btn\" (click)=\"zoomOut()\" title=\"Zoom out\">\n      <app-icon icon=\"zoom_out\" [size]=\"18\" />\n    </button>\n    <span class=\"ui-zoom-label\">{{ designer.zoom() }}%</span>\n    <button class=\"ui-icon-btn\" (click)=\"zoomIn()\" title=\"Zoom in\">\n      <app-icon icon=\"zoom_in\" [size]=\"18\" />\n    </button>\n    <button\n      class=\"ui-icon-btn\"\n      (click)=\"designer.setZoom(100)\"\n      title=\"Reset zoom\"\n    >\n      <app-icon icon=\"fit_screen\" [size]=\"18\" />\n    </button>\n    <div class=\"ui-toolbar-spacer\"></div>\n    <button\n      class=\"ui-icon-btn\"\n      [disabled]=\"!designer.selectedId()\"\n      (click)=\"deleteSelected()\"\n      title=\"Delete selected\"\n    >\n      <app-icon icon=\"delete\" [size]=\"18\" />\n    </button>\n  </div>\n  <div class=\"ui-main-editor-canvas\" (click)=\"onCanvasClick($event)\">\n    <app-canvas></app-canvas>\n  </div>\n</div>\n" }]
        }] });
registerSchemaComponent("app-main-editor", MainEditorComponent);

class CommandPaletteComponent {
    commands = [];
    placeholder = "Search commands...";
    triggerShortcut = "Ctrl+K";
    commandSelected = new EventEmitter();
    closed = new EventEmitter();
    isOpen = signal(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "isOpen" }] : /* istanbul ignore next */ []));
    searchQuery = signal("", /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "searchQuery" }] : /* istanbul ignore next */ []));
    selectedIndex = signal(0, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "selectedIndex" }] : /* istanbul ignore next */ []));
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: CommandPaletteComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.0.6", type: CommandPaletteComponent, isStandalone: true, selector: "app-command-palette", inputs: { commands: "commands", placeholder: "placeholder", triggerShortcut: "triggerShortcut" }, outputs: { commandSelected: "commandSelected", closed: "closed" }, host: { listeners: { "document:keydown": "onKeyDown($event)" } }, ngImport: i0, template: "@if (isOpen()) {\n  <div class=\"ui-command-palette-overlay\" (click)=\"close()\">\n    <div class=\"ui-command-palette\" (click)=\"$event.stopPropagation()\">\n      <div class=\"ui-command-palette-search\">\n        <app-icon icon=\"search\" [size]=\"20\" />\n        <input\n          type=\"text\"\n          [placeholder]=\"placeholder\"\n          [value]=\"searchQuery()\"\n          (input)=\"onSearchChange($any($event.target).value)\"\n          autofocus\n        />\n        <kbd>Esc</kbd>\n      </div>\n      <div class=\"ui-command-palette-results\">\n        @if (filteredCommands().length === 0) {\n          <div class=\"ui-command-palette-empty\">\n            <app-icon icon=\"search\" [size]=\"40\" />\n            <span>No commands found</span>\n          </div>\n        } @else {\n          @for (group of groupedCommands(); track group.key) {\n            <div class=\"ui-command-palette-group\">\n              <div class=\"ui-command-palette-group-label\">\n                {{ group.key }}\n              </div>\n              @for (command of group.value; track command.id) {\n                <button\n                  type=\"button\"\n                  class=\"ui-command-palette-item\"\n                  [class.ui-command-palette-item-selected]=\"isSelected(command)\"\n                  [class.ui-command-palette-item-disabled]=\"command.disabled\"\n                  [disabled]=\"command.disabled\"\n                  (click)=\"selectCommand(command)\"\n                >\n                  @if (command.icon) {\n                    <app-icon [icon]=\"command.icon\" [size]=\"20\" />\n                  }\n                  <span>{{ command.label }}</span>\n                  @if (command.shortcut) {\n                    <kbd>{{ command.shortcut }}</kbd>\n                  }\n                </button>\n              }\n            </div>\n          }\n        }\n      </div>\n      <div class=\"ui-command-palette-footer\">\n        <span><kbd>\u2191\u2193</kbd> Navigate</span>\n        <span><kbd>\u21B5</kbd> Select</span>\n        <span><kbd>Esc</kbd> Close</span>\n      </div>\n    </div>\n  </div>\n}\n", dependencies: [{ kind: "component", type: IconComponent, selector: "app-icon", inputs: ["icon", "size", "classes", "spin"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: CommandPaletteComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-command-palette", standalone: true, imports: [IconComponent], template: "@if (isOpen()) {\n  <div class=\"ui-command-palette-overlay\" (click)=\"close()\">\n    <div class=\"ui-command-palette\" (click)=\"$event.stopPropagation()\">\n      <div class=\"ui-command-palette-search\">\n        <app-icon icon=\"search\" [size]=\"20\" />\n        <input\n          type=\"text\"\n          [placeholder]=\"placeholder\"\n          [value]=\"searchQuery()\"\n          (input)=\"onSearchChange($any($event.target).value)\"\n          autofocus\n        />\n        <kbd>Esc</kbd>\n      </div>\n      <div class=\"ui-command-palette-results\">\n        @if (filteredCommands().length === 0) {\n          <div class=\"ui-command-palette-empty\">\n            <app-icon icon=\"search\" [size]=\"40\" />\n            <span>No commands found</span>\n          </div>\n        } @else {\n          @for (group of groupedCommands(); track group.key) {\n            <div class=\"ui-command-palette-group\">\n              <div class=\"ui-command-palette-group-label\">\n                {{ group.key }}\n              </div>\n              @for (command of group.value; track command.id) {\n                <button\n                  type=\"button\"\n                  class=\"ui-command-palette-item\"\n                  [class.ui-command-palette-item-selected]=\"isSelected(command)\"\n                  [class.ui-command-palette-item-disabled]=\"command.disabled\"\n                  [disabled]=\"command.disabled\"\n                  (click)=\"selectCommand(command)\"\n                >\n                  @if (command.icon) {\n                    <app-icon [icon]=\"command.icon\" [size]=\"20\" />\n                  }\n                  <span>{{ command.label }}</span>\n                  @if (command.shortcut) {\n                    <kbd>{{ command.shortcut }}</kbd>\n                  }\n                </button>\n              }\n            </div>\n          }\n        }\n      </div>\n      <div class=\"ui-command-palette-footer\">\n        <span><kbd>\u2191\u2193</kbd> Navigate</span>\n        <span><kbd>\u21B5</kbd> Select</span>\n        <span><kbd>Esc</kbd> Close</span>\n      </div>\n    </div>\n  </div>\n}\n" }]
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

class DesignerTreeNodeComponent {
    node;
    depth = 0;
    select = new EventEmitter();
    toggle(e) {
        e.stopPropagation();
        this.node.expanded = !this.node.expanded;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: DesignerTreeNodeComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.0.6", type: DesignerTreeNodeComponent, isStandalone: true, selector: "app-designer-tree-node", inputs: { node: "node", depth: "depth" }, outputs: { select: "select" }, ngImport: i0, template: "<div\n  class=\"ui-designer-tree-node\"\n  [style.paddingLeft.px]=\"depth * 16 + 8\"\n  [class.ui-designer-tree-node-selected]=\"node.selected\"\n  (click)=\"select.emit(node)\"\n>\n  <span class=\"ui-designer-tree-node-toggle\" (click)=\"toggle($event)\">\n    @if (node.children?.length) {\n      {{ node.expanded ? \"\u25BC\" : \"\u25B6\" }}\n    }\n  </span>\n  <span class=\"ui-designer-tree-node-icon\">{{ node.icon }}</span>\n  <span class=\"ui-designer-tree-node-label\">{{ node.label }}</span>\n  <span class=\"ui-designer-tree-node-id\">{{ node.id }}</span>\n</div>\n@if (node.expanded && node.children?.length) {\n  @for (child of node.children; track child.id) {\n    <app-designer-tree-node\n      [node]=\"child\"\n      [depth]=\"depth + 1\"\n      (select)=\"select.emit($event)\"\n    ></app-designer-tree-node>\n  }\n}\n", dependencies: [{ kind: "component", type: DesignerTreeNodeComponent, selector: "app-designer-tree-node", inputs: ["node", "depth"], outputs: ["select"] }, { kind: "ngmodule", type: CommonModule }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: DesignerTreeNodeComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-designer-tree-node", standalone: true, imports: [CommonModule], template: "<div\n  class=\"ui-designer-tree-node\"\n  [style.paddingLeft.px]=\"depth * 16 + 8\"\n  [class.ui-designer-tree-node-selected]=\"node.selected\"\n  (click)=\"select.emit(node)\"\n>\n  <span class=\"ui-designer-tree-node-toggle\" (click)=\"toggle($event)\">\n    @if (node.children?.length) {\n      {{ node.expanded ? \"\u25BC\" : \"\u25B6\" }}\n    }\n  </span>\n  <span class=\"ui-designer-tree-node-icon\">{{ node.icon }}</span>\n  <span class=\"ui-designer-tree-node-label\">{{ node.label }}</span>\n  <span class=\"ui-designer-tree-node-id\">{{ node.id }}</span>\n</div>\n@if (node.expanded && node.children?.length) {\n  @for (child of node.children; track child.id) {\n    <app-designer-tree-node\n      [node]=\"child\"\n      [depth]=\"depth + 1\"\n      (select)=\"select.emit($event)\"\n    ></app-designer-tree-node>\n  }\n}\n" }]
        }], propDecorators: { node: [{
                type: Input,
                args: [{ required: true }]
            }], depth: [{
                type: Input
            }], select: [{
                type: Output
            }] } });

class DesignerTreeComponent {
    designer = inject(DesignerCanvasService);
    treeNodes = computed(() => this.elementsToTree(this.designer.elements(), this.designer.selectedId()), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "treeNodes" }] : /* istanbul ignore next */ []));
    elementsToTree(els, selectedId) {
        return els.map((el) => ({
            id: el.id,
            label: el.componentId,
            icon: this.getIcon(el.componentId),
            expanded: true,
            selected: el.id === selectedId,
            children: el.children
                ? this.elementsToTree(el.children, selectedId)
                : undefined,
        }));
    }
    selectNode(node) {
        this.designer.selectElement(node.id);
    }
    getIcon(componentId) {
        const icons = {
            "app-button": "▣",
            "app-text": "A",
            "app-block": "⊞",
            "app-icon": "◇",
            "app-text-input": "✎",
            "app-translation-output": "📄",
            "app-language-selector": "🌐",
        };
        return icons[componentId] || "⊡";
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: DesignerTreeComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.0.6", type: DesignerTreeComponent, isStandalone: true, selector: "app-designer-tree", ngImport: i0, template: "<div class=\"ui-designer-tree\">\n  <div class=\"ui-designer-tree-header\">Layers</div>\n  <div class=\"ui-designer-tree-body\">\n    @for (node of treeNodes(); track node.id) {\n      <app-designer-tree-node\n        [node]=\"node\"\n        [depth]=\"0\"\n        (select)=\"selectNode($event)\"\n      ></app-designer-tree-node>\n    }\n    @if (treeNodes().length === 0) {\n      <div class=\"ui-designer-tree-empty\">No elements</div>\n    }\n  </div>\n</div>\n", dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "component", type: DesignerTreeNodeComponent, selector: "app-designer-tree-node", inputs: ["node", "depth"], outputs: ["select"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: DesignerTreeComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-designer-tree", standalone: true, imports: [CommonModule, DesignerTreeNodeComponent], template: "<div class=\"ui-designer-tree\">\n  <div class=\"ui-designer-tree-header\">Layers</div>\n  <div class=\"ui-designer-tree-body\">\n    @for (node of treeNodes(); track node.id) {\n      <app-designer-tree-node\n        [node]=\"node\"\n        [depth]=\"0\"\n        (select)=\"selectNode($event)\"\n      ></app-designer-tree-node>\n    }\n    @if (treeNodes().length === 0) {\n      <div class=\"ui-designer-tree-empty\">No elements</div>\n    }\n  </div>\n</div>\n" }]
        }] });
registerSchemaComponent("app-designer-tree", DesignerTreeComponent);

class LanguageSelectorComponent {
    label = "";
    labelId = "";
    value = "";
    languages = [];
    placeholder = "";
    width = "";
    disabled = false;
    error = "";
    classes = "";
    sourceLang = ""; // for source selector
    targetLang = ""; // for target selector
    changed = new EventEmitter();
    focused = signal(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "focused" }] : /* istanbul ignore next */ []));
    get parsedLanguages() {
        const arr = parseJsonOrDefault(this.languages);
        // Handle string arrays (e.g., ["en", "es", "fr"])
        if (arr.length > 0 && typeof arr[0] === "string") {
            return arr.map((code) => ({
                value: code,
                label: code.toUpperCase(),
            }));
        }
        return arr.map((lang) => ({
            value: lang.value ?? lang.code ?? "",
            label: lang.label ?? lang.name ?? lang.code ?? "",
        }));
    }
    handleChange(e) {
        this.value = e.target.value;
        this.changed.emit(this.value);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: LanguageSelectorComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.0.6", type: LanguageSelectorComponent, isStandalone: true, selector: "app-language-selector", inputs: { label: "label", labelId: "labelId", value: "value", languages: "languages", placeholder: "placeholder", width: "width", disabled: "disabled", error: "error", classes: "classes", sourceLang: "sourceLang", targetLang: "targetLang" }, outputs: { changed: "changed" }, ngImport: i0, template: `
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
  `, isInline: true, styles: [":host{display:block}\n"], dependencies: [{ kind: "component", type: IconComponent, selector: "app-icon", inputs: ["icon", "size", "classes", "spin"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: LanguageSelectorComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-language-selector", standalone: true, imports: [IconComponent], template: `
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
  `, styles: [":host{display:block}\n"] }]
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
            }], disabled: [{
                type: Input
            }], error: [{
                type: Input
            }], classes: [{
                type: Input
            }], sourceLang: [{
                type: Input
            }], targetLang: [{
                type: Input
            }], changed: [{
                type: Output
            }] } });
registerSchemaComponent("app-language-selector", LanguageSelectorComponent);

class SwapButtonComponent {
    ariaLabel = "";
    disabled = false;
    align = "";
    direction = "";
    height = "";
    justify = "";
    layout = "";
    width = "";
    classes = "";
    clicked = new EventEmitter();
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: SwapButtonComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "22.0.6", type: SwapButtonComponent, isStandalone: true, selector: "app-swap-button", inputs: { ariaLabel: "ariaLabel", disabled: "disabled", align: "align", direction: "direction", height: "height", justify: "justify", layout: "layout", width: "width", classes: "classes" }, outputs: { clicked: "clicked" }, ngImport: i0, template: `
    <button
      type="button"
      [disabled]="disabled"
      [attr.aria-label]="ariaLabel || 'Swap'"
      (click)="clicked.emit($event)"
      class="w-10 h-10 rounded-full flex items-center justify-center bg-surface-container-low border border-outline text-on-surface transition-all duration-200 hover:bg-surface-container hover:shadow-1 active:bg-surface-container-high disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <app-icon icon="chevron-down" [size]="20" class="rotate-90" />
    </button>
  `, isInline: true, styles: [":host{display:inline-flex}\n"], dependencies: [{ kind: "component", type: IconComponent, selector: "app-icon", inputs: ["icon", "size", "classes", "spin"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: SwapButtonComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-swap-button", standalone: true, imports: [IconComponent], template: `
    <button
      type="button"
      [disabled]="disabled"
      [attr.aria-label]="ariaLabel || 'Swap'"
      (click)="clicked.emit($event)"
      class="w-10 h-10 rounded-full flex items-center justify-center bg-surface-container-low border border-outline text-on-surface transition-all duration-200 hover:bg-surface-container hover:shadow-1 active:bg-surface-container-high disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <app-icon icon="chevron-down" [size]="20" class="rotate-90" />
    </button>
  `, styles: [":host{display:inline-flex}\n"] }]
        }], propDecorators: { ariaLabel: [{
                type: Input
            }], disabled: [{
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
            }], classes: [{
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
    disabled = false;
    error = "";
    classes = "";
    input = new EventEmitter();
    focused = signal(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "focused" }] : /* istanbul ignore next */ []));
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: TextInputComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.0.6", type: TextInputComponent, isStandalone: true, selector: "app-text-input", inputs: { value: "value", placeholder: "placeholder", clearable: "clearable", maxChars: "maxChars", autofocus: "autofocus", height: "height", label: "label", multiline: "multiline", rows: "rows", width: "width", disabled: "disabled", error: "error", classes: "classes" }, outputs: { input: "input" }, viewQueries: [{ propertyName: "textareaEl", first: true, predicate: ["textareaEl"], descendants: true }], ngImport: i0, template: `
    <div class="flex flex-col gap-1.5">
      @if (label) {
        <label class="text-sm font-medium text-on-surface">{{ label }}</label>
      }
      <div
        class="relative flex items-start rounded-md bg-surface-container-low border transition-colors duration-200"
        [class.border-outline]="!focused() && !error"
        [class.border-primary]="focused() && !error"
        [class.border-error]="!!error"
        [class.ring-1]="focused()"
        [class.ring-primary]="focused() && !error"
        [class.ring-error]="focused() && error"
      >
        <textarea
          #textareaEl
          [placeholder]="placeholder"
          [value]="value"
          [attr.maxlength]="maxChars || null"
          [rows]="rows"
          [disabled]="disabled"
          (input)="handleInput($event)"
          (focus)="focused.set(true)"
          (blur)="focused.set(false)"
          class="flex-1 px-4 py-3 bg-transparent text-on-surface placeholder:text-on-surface-variant outline-none resize-none disabled:opacity-50 disabled:cursor-not-allowed rounded-md"
        ></textarea>
        @if (clearable && value) {
          <button
            type="button"
            class="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-[--state-hover] active:bg-[--state-pressed] transition-colors"
            (click)="clear()"
            aria-label="Clear"
          >
            <span class="text-lg">&times;</span>
          </button>
        }
      </div>
      <div class="flex justify-between items-center">
        @if (error) {
          <span class="text-sm text-error">{{ error }}</span>
        }
        @if (maxChars) {
          <span class="text-sm text-on-surface-variant ml-auto"
            >{{ value.length }}/{{ maxChars }}</span
          >
        }
      </div>
    </div>
  `, isInline: true, styles: [":host{display:block}\n"] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: TextInputComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-text-input", standalone: true, template: `
    <div class="flex flex-col gap-1.5">
      @if (label) {
        <label class="text-sm font-medium text-on-surface">{{ label }}</label>
      }
      <div
        class="relative flex items-start rounded-md bg-surface-container-low border transition-colors duration-200"
        [class.border-outline]="!focused() && !error"
        [class.border-primary]="focused() && !error"
        [class.border-error]="!!error"
        [class.ring-1]="focused()"
        [class.ring-primary]="focused() && !error"
        [class.ring-error]="focused() && error"
      >
        <textarea
          #textareaEl
          [placeholder]="placeholder"
          [value]="value"
          [attr.maxlength]="maxChars || null"
          [rows]="rows"
          [disabled]="disabled"
          (input)="handleInput($event)"
          (focus)="focused.set(true)"
          (blur)="focused.set(false)"
          class="flex-1 px-4 py-3 bg-transparent text-on-surface placeholder:text-on-surface-variant outline-none resize-none disabled:opacity-50 disabled:cursor-not-allowed rounded-md"
        ></textarea>
        @if (clearable && value) {
          <button
            type="button"
            class="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-[--state-hover] active:bg-[--state-pressed] transition-colors"
            (click)="clear()"
            aria-label="Clear"
          >
            <span class="text-lg">&times;</span>
          </button>
        }
      </div>
      <div class="flex justify-between items-center">
        @if (error) {
          <span class="text-sm text-error">{{ error }}</span>
        }
        @if (maxChars) {
          <span class="text-sm text-on-surface-variant ml-auto"
            >{{ value.length }}/{{ maxChars }}</span
          >
        }
      </div>
    </div>
  `, styles: [":host{display:block}\n"] }]
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
            }], disabled: [{
                type: Input
            }], error: [{
                type: Input
            }], classes: [{
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
    error = "";
    rows = 4;
    classes = "";
    copied = new EventEmitter();
    focused = signal(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "focused" }] : /* istanbul ignore next */ []));
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: TranslationOutputComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.0.6", type: TranslationOutputComponent, isStandalone: true, selector: "app-translation-output", inputs: { value: "value", placeholder: "placeholder", loading: "loading", showConfidence: "showConfidence", showCopyButton: "showCopyButton", confidence: "confidence", height: "height", width: "width", error: "error", rows: "rows", classes: "classes" }, outputs: { copied: "copied" }, ngImport: i0, template: `
    <div class="flex flex-col gap-1.5">
      <div
        class="relative flex items-start rounded-md bg-surface-container-low border border-outline transition-colors duration-200"
        [class.ring-1]="focused()"
        [class.ring-primary]="focused()"
      >
        <textarea
          #outputEl
          [value]="value"
          [placeholder]="placeholder || 'Translation will appear here...'"
          [disabled]="true"
          [rows]="rows"
          (focus)="focused.set(true)"
          (blur)="focused.set(false)"
          class="flex-1 px-4 py-3 bg-transparent text-on-surface placeholder:text-on-surface-variant outline-none resize-none rounded-md cursor-default"
        ></textarea>
        @if (loading) {
          <div class="absolute right-3 top-1/2 -translate-y-1/2">
            <div
              class="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"
            ></div>
          </div>
        }
        @if (showCopyButton && value && !loading) {
          <button
            type="button"
            class="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-[--state-hover] active:bg-[--state-pressed] transition-colors"
            (click)="copyToClipboard()"
            aria-label="Copy"
          >
            @if (isCopied) {
              <span class="text-sm text-success font-medium">Copied!</span>
            } @else {
              <app-icon icon="copy" [size]="16" />
            }
          </button>
        }
      </div>
      <div class="flex justify-between items-center">
        @if (showConfidence && confidence) {
          <span class="text-xs text-on-surface-variant">
            Confidence: {{ (confidence * 100).toFixed(0) }}%
          </span>
        }
        @if (error) {
          <span class="text-sm text-error">{{ error }}</span>
        }
      </div>
    </div>
  `, isInline: true, styles: [":host{display:block}textarea:disabled{cursor:default}\n"], dependencies: [{ kind: "component", type: IconComponent, selector: "app-icon", inputs: ["icon", "size", "classes", "spin"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: TranslationOutputComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-translation-output", standalone: true, imports: [IconComponent], template: `
    <div class="flex flex-col gap-1.5">
      <div
        class="relative flex items-start rounded-md bg-surface-container-low border border-outline transition-colors duration-200"
        [class.ring-1]="focused()"
        [class.ring-primary]="focused()"
      >
        <textarea
          #outputEl
          [value]="value"
          [placeholder]="placeholder || 'Translation will appear here...'"
          [disabled]="true"
          [rows]="rows"
          (focus)="focused.set(true)"
          (blur)="focused.set(false)"
          class="flex-1 px-4 py-3 bg-transparent text-on-surface placeholder:text-on-surface-variant outline-none resize-none rounded-md cursor-default"
        ></textarea>
        @if (loading) {
          <div class="absolute right-3 top-1/2 -translate-y-1/2">
            <div
              class="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"
            ></div>
          </div>
        }
        @if (showCopyButton && value && !loading) {
          <button
            type="button"
            class="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-[--state-hover] active:bg-[--state-pressed] transition-colors"
            (click)="copyToClipboard()"
            aria-label="Copy"
          >
            @if (isCopied) {
              <span class="text-sm text-success font-medium">Copied!</span>
            } @else {
              <app-icon icon="copy" [size]="16" />
            }
          </button>
        }
      </div>
      <div class="flex justify-between items-center">
        @if (showConfidence && confidence) {
          <span class="text-xs text-on-surface-variant">
            Confidence: {{ (confidence * 100).toFixed(0) }}%
          </span>
        }
        @if (error) {
          <span class="text-sm text-error">{{ error }}</span>
        }
      </div>
    </div>
  `, styles: [":host{display:block}textarea:disabled{cursor:default}\n"] }]
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
            }], error: [{
                type: Input
            }], rows: [{
                type: Input
            }], classes: [{
                type: Input
            }], copied: [{
                type: Output
            }] } });
registerSchemaComponent("app-translation-output", TranslationOutputComponent);

class MenuButtonComponent {
    isOpen = false;
    classes = "";
    toggle = new EventEmitter();
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: MenuButtonComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "22.0.6", type: MenuButtonComponent, isStandalone: true, selector: "app-menu-button", inputs: { isOpen: "isOpen", classes: "classes" }, outputs: { toggle: "toggle" }, ngImport: i0, template: "<button\n  type=\"button\"\n  class=\"ui-menu-button\"\n  (click)=\"toggle.emit()\"\n  [attr.aria-expanded]=\"isOpen\"\n  aria-label=\"Open menu\"\n>\n  <span class=\"ui-menu-icon\" [class.open]=\"isOpen\">\n    <span class=\"ui-menu-line\"></span>\n    <span class=\"ui-menu-line\"></span>\n    <span class=\"ui-menu-line\"></span>\n  </span>\n</button>\n", dependencies: [{ kind: "ngmodule", type: CommonModule }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: MenuButtonComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-menu-button", standalone: true, imports: [CommonModule], template: "<button\n  type=\"button\"\n  class=\"ui-menu-button\"\n  (click)=\"toggle.emit()\"\n  [attr.aria-expanded]=\"isOpen\"\n  aria-label=\"Open menu\"\n>\n  <span class=\"ui-menu-icon\" [class.open]=\"isOpen\">\n    <span class=\"ui-menu-line\"></span>\n    <span class=\"ui-menu-line\"></span>\n    <span class=\"ui-menu-line\"></span>\n  </span>\n</button>\n" }]
        }], propDecorators: { isOpen: [{
                type: Input
            }], classes: [{
                type: Input
            }], toggle: [{
                type: Output
            }] } });
registerSchemaComponent("app-menu-button", MenuButtonComponent);

class BlockComponent {
    display = "flex";
    direction = "column";
    align = "stretch";
    justify = "start";
    wrap = "nowrap";
    gap = "";
    padding = "";
    width = "";
    height = "";
    flex = "";
    overflow = "";
    inline = false;
    children = [];
    classes = "";
    get alignCss() {
        const map = {
            start: "flex-start",
            center: "center",
            end: "flex-end",
            stretch: "stretch",
            baseline: "baseline",
        };
        return map[this.align] || "stretch";
    }
    get justifyCss() {
        const map = {
            start: "flex-start",
            center: "center",
            end: "flex-end",
            between: "space-between",
            around: "space-around",
            evenly: "space-evenly",
        };
        return map[this.justify] || "flex-start";
    }
    get gapCss() {
        if (!this.gap)
            return "";
        if (/^\d+$/.test(this.gap))
            return `${this.gap}px`;
        return this.gap;
    }
    get paddingCss() {
        if (!this.padding)
            return "";
        if (/^\d+$/.test(this.padding))
            return `${this.padding}px`;
        return this.padding;
    }
    get widthCss() {
        if (!this.width)
            return "";
        if (this.width === "full")
            return "100%";
        if (this.width === "screen")
            return "100vw";
        if (/^\d+$/.test(this.width))
            return `${this.width}px`;
        return this.width;
    }
    get heightCss() {
        if (!this.height)
            return "";
        if (this.height === "full")
            return "100%";
        if (this.height === "screen")
            return "100vh";
        if (/^\d+$/.test(this.height))
            return `${this.height}px`;
        return this.height;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: BlockComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.0.6", type: BlockComponent, isStandalone: true, selector: "app-block", inputs: { display: "display", direction: "direction", align: "align", justify: "justify", wrap: "wrap", gap: "gap", padding: "padding", width: "width", height: "height", flex: "flex", overflow: "overflow", inline: "inline", children: "children", classes: "classes" }, ngImport: i0, template: "<div\n  class=\"ui-block\"\n  [class]=\"classes\"\n  [style.flexDirection]=\"direction\"\n  [style.alignItems]=\"alignCss\"\n  [style.justifyContent]=\"justifyCss\"\n  [style.flexWrap]=\"wrap\"\n  [style.gap]=\"gapCss\"\n  [style.padding]=\"paddingCss\"\n  [style.width]=\"widthCss\"\n  [style.height]=\"heightCss\"\n  [style.flex]=\"flex\"\n  [style.overflow]=\"overflow\"\n>\n  @for (child of children; track child.id) {\n    <app-schema-element\n      [element]=\"child\"\n      [elements]=\"children\"\n    ></app-schema-element>\n  }\n</div>\n", dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "component", type: SchemaElementComponent, selector: "app-schema-element", inputs: ["element", "elements"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: BlockComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-block", standalone: true, imports: [CommonModule, SchemaElementComponent], template: "<div\n  class=\"ui-block\"\n  [class]=\"classes\"\n  [style.flexDirection]=\"direction\"\n  [style.alignItems]=\"alignCss\"\n  [style.justifyContent]=\"justifyCss\"\n  [style.flexWrap]=\"wrap\"\n  [style.gap]=\"gapCss\"\n  [style.padding]=\"paddingCss\"\n  [style.width]=\"widthCss\"\n  [style.height]=\"heightCss\"\n  [style.flex]=\"flex\"\n  [style.overflow]=\"overflow\"\n>\n  @for (child of children; track child.id) {\n    <app-schema-element\n      [element]=\"child\"\n      [elements]=\"children\"\n    ></app-schema-element>\n  }\n</div>\n" }]
        }], propDecorators: { display: [{
                type: Input
            }], direction: [{
                type: Input
            }], align: [{
                type: Input
            }], justify: [{
                type: Input
            }], wrap: [{
                type: Input
            }], gap: [{
                type: Input
            }], padding: [{
                type: Input
            }], width: [{
                type: Input
            }], height: [{
                type: Input
            }], flex: [{
                type: Input
            }], overflow: [{
                type: Input
            }], inline: [{
                type: Input
            }], children: [{
                type: Input
            }], classes: [{
                type: Input
            }] } });
registerSchemaComponent("app-block", BlockComponent);

const FONT_SIZE_MAP = {
    xs: "text-xs",
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
    xl: "text-xl",
    "2xl": "text-2xl",
    "3xl": "text-3xl",
    "4xl": "text-4xl",
};
const FONT_WEIGHT_MAP = {
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
};
const COLOR_MAP = {
    primary: "text-[var(--text-primary)]",
    secondary: "text-[var(--text-secondary)]",
    muted: "text-[var(--text-muted)]",
    accent: "text-[var(--accent)]",
    error: "text-[var(--error)]",
    success: "text-[var(--success)]",
    warning: "text-[var(--warning)]",
    info: "text-[var(--info)]",
};
const TEXT_ALIGN_MAP = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
    justify: "text-justify",
};
const TEXT_TRANSFORM_MAP = {
    none: "normal-case",
    uppercase: "uppercase",
    lowercase: "lowercase",
    capitalize: "capitalize",
};
class TextComponent {
    text = "";
    tag = "span";
    size = "md";
    weight = "normal";
    color = "";
    textAlign = "left";
    textTransform = "none";
    lineHeight = "";
    letterSpacing = "";
    whiteSpace = "";
    truncate = false;
    classes = "";
    get fontSizeClass() {
        return FONT_SIZE_MAP[this.size] || "text-base";
    }
    get fontWeightClass() {
        return FONT_WEIGHT_MAP[this.weight] || "font-normal";
    }
    get colorClass() {
        if (this.color && COLOR_MAP[this.color])
            return COLOR_MAP[this.color];
        return "";
    }
    get textAlignClass() {
        return TEXT_ALIGN_MAP[this.textAlign] || "text-left";
    }
    get textTransformClass() {
        return TEXT_TRANSFORM_MAP[this.textTransform] || "normal-case";
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: TextComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.0.6", type: TextComponent, isStandalone: true, selector: "app-text", inputs: { text: "text", tag: "tag", size: "size", weight: "weight", color: "color", textAlign: "textAlign", textTransform: "textTransform", lineHeight: "lineHeight", letterSpacing: "letterSpacing", whiteSpace: "whiteSpace", truncate: "truncate", classes: "classes" }, ngImport: i0, template: "@if (tag === \"p\") {\n  <p\n    class=\"ui-text\"\n    [style.lineHeight]=\"lineHeight || null\"\n    [style.letterSpacing]=\"letterSpacing || null\"\n    [style.whiteSpace]=\"whiteSpace || null\"\n    [title]=\"truncate && text ? text : ''\"\n  >\n    {{ text }}\n    <ng-content></ng-content>\n  </p>\n} @else {\n  <span\n    class=\"ui-text\"\n    [style.lineHeight]=\"lineHeight || null\"\n    [style.letterSpacing]=\"letterSpacing || null\"\n    [style.whiteSpace]=\"whiteSpace || null\"\n    [title]=\"truncate && text ? text : ''\"\n  >\n    {{ text }}\n    <ng-content></ng-content>\n  </span>\n}\n" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: TextComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-text", standalone: true, imports: [], template: "@if (tag === \"p\") {\n  <p\n    class=\"ui-text\"\n    [style.lineHeight]=\"lineHeight || null\"\n    [style.letterSpacing]=\"letterSpacing || null\"\n    [style.whiteSpace]=\"whiteSpace || null\"\n    [title]=\"truncate && text ? text : ''\"\n  >\n    {{ text }}\n    <ng-content></ng-content>\n  </p>\n} @else {\n  <span\n    class=\"ui-text\"\n    [style.lineHeight]=\"lineHeight || null\"\n    [style.letterSpacing]=\"letterSpacing || null\"\n    [style.whiteSpace]=\"whiteSpace || null\"\n    [title]=\"truncate && text ? text : ''\"\n  >\n    {{ text }}\n    <ng-content></ng-content>\n  </span>\n}\n" }]
        }], propDecorators: { text: [{
                type: Input
            }], tag: [{
                type: Input
            }], size: [{
                type: Input
            }], weight: [{
                type: Input
            }], color: [{
                type: Input
            }], textAlign: [{
                type: Input
            }], textTransform: [{
                type: Input
            }], lineHeight: [{
                type: Input
            }], letterSpacing: [{
                type: Input
            }], whiteSpace: [{
                type: Input
            }], truncate: [{
                type: Input
            }], classes: [{
                type: Input
            }] } });
registerSchemaComponent("app-text", TextComponent);

class ThemeToggleComponent {
    themeService = inject(StyleThemeService);
    subscription;
    classes = "";
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
    getButtonClasses() {
        const base = "w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200";
        const hover = "hover:bg-[--state-hover] active:bg-[--state-pressed]";
        return `${base} ${hover} ${this.classes}`.trim();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: ThemeToggleComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "22.0.6", type: ThemeToggleComponent, isStandalone: true, selector: "app-theme-toggle", inputs: { classes: "classes" }, ngImport: i0, template: `
    <button
      class="p-2.5 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full transition-colors"
      title="Toggle Theme"
    >
      <span class="material-symbols-rounded">{{
        isDark ? "light_mode" : "dark_mode"
      }}</span>
    </button>
  `, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: ThemeToggleComponent, decorators: [{
            type: Component,
            args: [{
                    selector: "app-theme-toggle",
                    standalone: true,
                    imports: [IconComponent],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: `
    <button
      class="p-2.5 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full transition-colors"
      title="Toggle Theme"
    >
      <span class="material-symbols-rounded">{{
        isDark ? "light_mode" : "dark_mode"
      }}</span>
    </button>
  `,
                }]
        }], propDecorators: { classes: [{
                type: Input
            }] } });
registerSchemaComponent("app-theme-toggle", ThemeToggleComponent);

class ShortcutsOverlayComponent {
    visible = false;
    title = "Keyboard Shortcuts";
    shortcuts = "[]";
    closed = new EventEmitter();
    trigger = "";
    hovered = false;
    get parsedShortcuts() {
        return parseJsonOrDefault(this.shortcuts);
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: ShortcutsOverlayComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.0.6", type: ShortcutsOverlayComponent, isStandalone: true, selector: "app-shortcuts-overlay", inputs: { visible: "visible", title: "title", shortcuts: "shortcuts", trigger: "trigger" }, outputs: { closed: "closed" }, host: { listeners: { "window:keydown.escape": "onEscape()" } }, ngImport: i0, template: "@if (visible) {\n  <div class=\"ui-modal-overlay\" (click)=\"close()\">\n    <div class=\"ui-shortcuts-overlay\" (click)=\"$event.stopPropagation()\">\n      <div class=\"ui-shortcuts-header\">\n        <h3>{{ title || \"Keyboard Shortcuts\" }}</h3>\n        <button (click)=\"close()\" aria-label=\"Close\">&times;</button>\n      </div>\n      <div class=\"ui-shortcuts-body\">\n        @for (shortcut of parsedShortcuts; track shortcut.key) {\n          <div class=\"ui-shortcuts-item\">\n            <kbd>{{ shortcut.key }}</kbd>\n            <span>{{ shortcut.description }}</span>\n          </div>\n        }\n      </div>\n    </div>\n  </div>\n}\n" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: ShortcutsOverlayComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-shortcuts-overlay", standalone: true, imports: [], template: "@if (visible) {\n  <div class=\"ui-modal-overlay\" (click)=\"close()\">\n    <div class=\"ui-shortcuts-overlay\" (click)=\"$event.stopPropagation()\">\n      <div class=\"ui-shortcuts-header\">\n        <h3>{{ title || \"Keyboard Shortcuts\" }}</h3>\n        <button (click)=\"close()\" aria-label=\"Close\">&times;</button>\n      </div>\n      <div class=\"ui-shortcuts-body\">\n        @for (shortcut of parsedShortcuts; track shortcut.key) {\n          <div class=\"ui-shortcuts-item\">\n            <kbd>{{ shortcut.key }}</kbd>\n            <span>{{ shortcut.description }}</span>\n          </div>\n        }\n      </div>\n    </div>\n  </div>\n}\n" }]
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

class LocaleSwitcherComponent {
    i18n = inject(I18nService);
    size = "sm";
    variant = "ghost";
    classes = "";
    get currentLocale() {
        return this.i18n.locale();
    }
    get availableLocales() {
        return this.i18n.getAvailableLocales();
    }
    setLocale(locale) {
        this.i18n.setLocale(locale);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: LocaleSwitcherComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.0.6", type: LocaleSwitcherComponent, isStandalone: true, selector: "app-locale-switcher", inputs: { size: "size", variant: "variant", classes: "classes" }, ngImport: i0, template: "<div\n  class=\"ui-locale-switcher ui-locale-switcher-{{ size }} ui-locale-switcher-{{\n    variant\n  }}\"\n>\n  <select\n    class=\"ui-locale-select\"\n    [value]=\"currentLocale\"\n    (change)=\"setLocale($any($event.target).value)\"\n  >\n    @for (locale of availableLocales; track locale) {\n      <option [value]=\"locale\">{{ locale.toUpperCase() }}</option>\n    }\n  </select>\n  <span class=\"ui-locale-icon\">\n    <app-icon icon=\"globe\" [size]=\"16\" />\n  </span>\n</div>\n", dependencies: [{ kind: "component", type: IconComponent, selector: "app-icon", inputs: ["icon", "size", "classes", "spin"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: LocaleSwitcherComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-locale-switcher", standalone: true, imports: [IconComponent], template: "<div\n  class=\"ui-locale-switcher ui-locale-switcher-{{ size }} ui-locale-switcher-{{\n    variant\n  }}\"\n>\n  <select\n    class=\"ui-locale-select\"\n    [value]=\"currentLocale\"\n    (change)=\"setLocale($any($event.target).value)\"\n  >\n    @for (locale of availableLocales; track locale) {\n      <option [value]=\"locale\">{{ locale.toUpperCase() }}</option>\n    }\n  </select>\n  <span class=\"ui-locale-icon\">\n    <app-icon icon=\"globe\" [size]=\"16\" />\n  </span>\n</div>\n" }]
        }], propDecorators: { size: [{
                type: Input
            }], variant: [{
                type: Input
            }], classes: [{
                type: Input
            }] } });
registerSchemaComponent("app-locale-switcher", LocaleSwitcherComponent);

class RowComponent {
    classes = "";
    children = [];
    gap;
    align;
    justify;
    width;
    height;
    responsive = true;
    get layoutClasses() {
        const classes = ["flex"];
        // Row direction (horizontal by default)
        classes.push("flex-row");
        // Gap
        if (this.gap) {
            classes.push(`gap-${this.gap}`);
        }
        // Alignment
        if (this.align) {
            const alignMap = {
                start: "items-start",
                center: "items-center",
                end: "items-end",
                stretch: "items-stretch",
                baseline: "items-baseline",
            };
            if (alignMap[this.align]) {
                classes.push(alignMap[this.align]);
            }
        }
        // Justify
        if (this.justify) {
            const justifyMap = {
                start: "justify-start",
                center: "justify-center",
                end: "justify-end",
                between: "justify-between",
                around: "justify-justify",
                evenly: "justify-evenly",
            };
            if (justifyMap[this.justify]) {
                classes.push(justifyMap[this.justify]);
            }
        }
        // Width
        if (this.width === "full")
            classes.push("w-full");
        else if (this.width === "auto")
            classes.push("w-auto");
        // Height
        if (this.height === "full")
            classes.push("h-full");
        else if (this.height === "auto")
            classes.push("h-auto");
        return classes.join(" ");
    }
    // Mobile: switch to column layout at md breakpoint
    get mobileLayoutClasses() {
        if (!this.responsive)
            return "";
        return "md:flex-col";
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: RowComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "22.0.6", type: RowComponent, isStandalone: true, selector: "app-row", inputs: { classes: "classes", children: "children", gap: "gap", align: "align", justify: "justify", width: "width", height: "height", responsive: "responsive" }, ngImport: i0, template: "<div class=\"ui-row\">\n  <ng-container *ngFor=\"let child of children\">\n    <app-schema-element\n      [element]=\"child\"\n      [elements]=\"children\"\n    ></app-schema-element>\n  </ng-container>\n</div>\n", dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "component", type: SchemaElementComponent, selector: "app-schema-element", inputs: ["element", "elements"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: RowComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-row", standalone: true, imports: [CommonModule, SchemaElementComponent], template: "<div class=\"ui-row\">\n  <ng-container *ngFor=\"let child of children\">\n    <app-schema-element\n      [element]=\"child\"\n      [elements]=\"children\"\n    ></app-schema-element>\n  </ng-container>\n</div>\n" }]
        }], propDecorators: { classes: [{
                type: Input
            }], children: [{
                type: Input
            }], gap: [{
                type: Input
            }], align: [{
                type: Input
            }], justify: [{
                type: Input
            }], width: [{
                type: Input
            }], height: [{
                type: Input
            }], responsive: [{
                type: Input
            }] } });
registerSchemaComponent("app-row", RowComponent);

class ColumnComponent {
    classes = "";
    children = [];
    gap;
    align;
    justify;
    width;
    height;
    get layoutClasses() {
        const classes = ["flex", "flex-col"];
        // Gap
        if (this.gap) {
            classes.push(`gap-${this.gap}`);
        }
        // Alignment
        if (this.align) {
            const alignMap = {
                start: "items-start",
                center: "items-center",
                end: "items-end",
                stretch: "items-stretch",
                baseline: "items-baseline",
            };
            if (alignMap[this.align]) {
                classes.push(alignMap[this.align]);
            }
        }
        // Justify
        if (this.justify) {
            const justifyMap = {
                start: "justify-start",
                center: "justify-center",
                end: "justify-end",
                between: "justify-between",
                around: "justify-justify",
                evenly: "justify-evenly",
            };
            if (justifyMap[this.justify]) {
                classes.push(justifyMap[this.justify]);
            }
        }
        // Width
        if (this.width === "full")
            classes.push("w-full");
        else if (this.width === "auto")
            classes.push("w-auto");
        // Height
        if (this.height === "full")
            classes.push("h-full");
        else if (this.height === "auto")
            classes.push("h-auto");
        return classes.join(" ");
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: ColumnComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "22.0.6", type: ColumnComponent, isStandalone: true, selector: "app-column", inputs: { classes: "classes", children: "children", gap: "gap", align: "align", justify: "justify", width: "width", height: "height" }, ngImport: i0, template: "<div class=\"ui-column\">\n  <ng-container *ngFor=\"let child of children\">\n    <app-schema-element\n      [element]=\"child\"\n      [elements]=\"children\"\n    ></app-schema-element>\n  </ng-container>\n</div>\n", dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "component", type: SchemaElementComponent, selector: "app-schema-element", inputs: ["element", "elements"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: ColumnComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-column", standalone: true, imports: [CommonModule, SchemaElementComponent], template: "<div class=\"ui-column\">\n  <ng-container *ngFor=\"let child of children\">\n    <app-schema-element\n      [element]=\"child\"\n      [elements]=\"children\"\n    ></app-schema-element>\n  </ng-container>\n</div>\n" }]
        }], propDecorators: { classes: [{
                type: Input
            }], children: [{
                type: Input
            }], gap: [{
                type: Input
            }], align: [{
                type: Input
            }], justify: [{
                type: Input
            }], width: [{
                type: Input
            }], height: [{
                type: Input
            }] } });
registerSchemaComponent("app-column", ColumnComponent);

class StackComponent {
    classes = "";
    children = [];
    gap;
    align;
    width;
    height;
    get layoutClasses() {
        const classes = ["flex", "flex-col"];
        // Gap
        if (this.gap) {
            classes.push(`gap-${this.gap}`);
        }
        // Alignment
        if (this.align) {
            const alignMap = {
                start: "items-start",
                center: "items-center",
                end: "items-end",
                stretch: "items-stretch",
                baseline: "items-baseline",
            };
            if (alignMap[this.align]) {
                classes.push(alignMap[this.align]);
            }
        }
        // Width
        if (this.width === "full")
            classes.push("w-full");
        else if (this.width === "auto")
            classes.push("w-auto");
        // Height
        if (this.height === "full")
            classes.push("h-full");
        else if (this.height === "auto")
            classes.push("h-auto");
        return classes.join(" ");
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: StackComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "22.0.6", type: StackComponent, isStandalone: true, selector: "app-stack", inputs: { classes: "classes", children: "children", gap: "gap", align: "align", width: "width", height: "height" }, ngImport: i0, template: "<div class=\"ui-stack\">\n  <ng-container *ngFor=\"let child of children\">\n    <app-schema-element\n      [element]=\"child\"\n      [elements]=\"children\"\n    ></app-schema-element>\n  </ng-container>\n</div>\n", dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "component", type: SchemaElementComponent, selector: "app-schema-element", inputs: ["element", "elements"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: StackComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-stack", standalone: true, imports: [CommonModule, SchemaElementComponent], template: "<div class=\"ui-stack\">\n  <ng-container *ngFor=\"let child of children\">\n    <app-schema-element\n      [element]=\"child\"\n      [elements]=\"children\"\n    ></app-schema-element>\n  </ng-container>\n</div>\n" }]
        }], propDecorators: { classes: [{
                type: Input
            }], children: [{
                type: Input
            }], gap: [{
                type: Input
            }], align: [{
                type: Input
            }], width: [{
                type: Input
            }], height: [{
                type: Input
            }] } });
registerSchemaComponent("app-stack", StackComponent);

class AlertComponent {
    type = "info";
    title = "";
    message = "";
    dismissible = false;
    actions;
    icon = "";
    dismissed = new EventEmitter();
    action = new EventEmitter();
    onActionClick(act) {
        this.action.emit(act.value);
    }
    dismiss() {
        this.dismissed.emit();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: AlertComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.0.6", type: AlertComponent, isStandalone: true, selector: "app-alert", inputs: { type: "type", title: "title", message: "message", dismissible: "dismissible", actions: "actions", icon: "icon" }, outputs: { dismissed: "dismissed", action: "action" }, ngImport: i0, template: `
    <div
      class="flex items-start gap-3 p-4 rounded-3xl transition-colors"
      [class.bg-indigo-50]="type === 'info'"
      [class.text-indigo-800]="type === 'info'"
      [class.border]="type === 'info'"
      [class.border-indigo-100]="type === 'info'"
      [class.bg-emerald-50]="type === 'success'"
      [class.text-emerald-800]="type === 'success'"
      [class.bg-amber-50]="type === 'warning'"
      [class.text-amber-800]="type === 'warning'"
      [class.bg-rose-50]="type === 'danger'"
      [class.text-rose-800]="type === 'danger'"
    >
      @if (title) {
        <div class="font-semibold text-sm">{{ title }}</div>
      }
      @if (message) {
        <p class="text-xs mt-1 opacity-80">{{ message }}</p>
      }
      @if (dismissible) {
        <button
          class="ml-auto p-1 hover:bg-black/10 rounded-full"
          (click)="dismissed.emit()"
        >
          <span class="material-symbols-rounded text-sm">close</span>
        </button>
      }
    </div>
  `, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: AlertComponent, decorators: [{
            type: Component,
            args: [{
                    selector: "app-alert",
                    standalone: true,
                    imports: [IconComponent],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: `
    <div
      class="flex items-start gap-3 p-4 rounded-3xl transition-colors"
      [class.bg-indigo-50]="type === 'info'"
      [class.text-indigo-800]="type === 'info'"
      [class.border]="type === 'info'"
      [class.border-indigo-100]="type === 'info'"
      [class.bg-emerald-50]="type === 'success'"
      [class.text-emerald-800]="type === 'success'"
      [class.bg-amber-50]="type === 'warning'"
      [class.text-amber-800]="type === 'warning'"
      [class.bg-rose-50]="type === 'danger'"
      [class.text-rose-800]="type === 'danger'"
    >
      @if (title) {
        <div class="font-semibold text-sm">{{ title }}</div>
      }
      @if (message) {
        <p class="text-xs mt-1 opacity-80">{{ message }}</p>
      }
      @if (dismissible) {
        <button
          class="ml-auto p-1 hover:bg-black/10 rounded-full"
          (click)="dismissed.emit()"
        >
          <span class="material-symbols-rounded text-sm">close</span>
        </button>
      }
    </div>
  `,
                }]
        }], propDecorators: { type: [{
                type: Input
            }], title: [{
                type: Input
            }], message: [{
                type: Input
            }], dismissible: [{
                type: Input
            }], actions: [{
                type: Input
            }], icon: [{
                type: Input
            }], dismissed: [{
                type: Output
            }], action: [{
                type: Output
            }] } });
registerSchemaComponent("app-alert", AlertComponent);

class FabComponent {
    icon = "add";
    label = "";
    position = "bottom-right";
    items;
    mainClick = new EventEmitter();
    actionSelected = new EventEmitter();
    open = false;
    onMainClick() {
        if (this.items && this.items.length) {
            this.open = !this.open;
        }
        this.mainClick.emit();
    }
    selectItem(item) {
        this.actionSelected.emit(item.value);
        this.open = false;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: FabComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.0.6", type: FabComponent, isStandalone: true, selector: "app-fab", inputs: { icon: "icon", label: "label", position: "position", items: "items" }, outputs: { mainClick: "mainClick", actionSelected: "actionSelected" }, ngImport: i0, template: `
    <div class="fixed bottom-6 right-6 z-40 flex flex-col items-center">
      @if (items && items.length) {
        <div class="flex flex-col items-center hidden mb-4 space-y-2">
          @for (item of items; track item.label) {
            <button
              class="w-12 h-12 bg-white dark:bg-neutral-800 rounded-full border border-neutral-200 dark:border-neutral-700 shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
              (click)="selectItem(item)"
            >
              <span
                class="material-symbols-rounded text-xl text-neutral-600 dark:text-neutral-300"
                >{{ item.icon }}</span
              >
            </button>
          }
        </div>
      }
      <button
        class="w-14 h-14 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-xl flex items-center justify-center transition-all"
        (click)="onMainClick()"
      >
        <span class="material-symbols-rounded text-2xl">{{ icon }}</span>
      </button>
    </div>
  `, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: FabComponent, decorators: [{
            type: Component,
            args: [{
                    selector: "app-fab",
                    standalone: true,
                    imports: [IconComponent],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: `
    <div class="fixed bottom-6 right-6 z-40 flex flex-col items-center">
      @if (items && items.length) {
        <div class="flex flex-col items-center hidden mb-4 space-y-2">
          @for (item of items; track item.label) {
            <button
              class="w-12 h-12 bg-white dark:bg-neutral-800 rounded-full border border-neutral-200 dark:border-neutral-700 shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
              (click)="selectItem(item)"
            >
              <span
                class="material-symbols-rounded text-xl text-neutral-600 dark:text-neutral-300"
                >{{ item.icon }}</span
              >
            </button>
          }
        </div>
      }
      <button
        class="w-14 h-14 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-xl flex items-center justify-center transition-all"
        (click)="onMainClick()"
      >
        <span class="material-symbols-rounded text-2xl">{{ icon }}</span>
      </button>
    </div>
  `,
                }]
        }], propDecorators: { icon: [{
                type: Input
            }], label: [{
                type: Input
            }], position: [{
                type: Input
            }], items: [{
                type: Input
            }], mainClick: [{
                type: Output
            }], actionSelected: [{
                type: Output
            }] } });
registerSchemaComponent("app-fab", FabComponent);

class RatingComponent {
    value = 0;
    max = 5;
    readonly = true;
    size = "md";
    accentColor;
    showLabel = false;
    ratingChange = new EventEmitter();
    get indices() {
        return Array.from({ length: this.max }, (_, i) => i + 1);
    }
    onStarClick(idx) {
        if (this.readonly)
            return;
        this.value = idx;
        this.ratingChange.emit(idx);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: RatingComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.0.6", type: RatingComponent, isStandalone: true, selector: "app-rating", inputs: { value: "value", max: "max", readonly: "readonly", size: "size", accentColor: "accentColor", showLabel: "showLabel" }, outputs: { ratingChange: "ratingChange" }, ngImport: i0, template: `
    <div class="flex items-center gap-1">
      @for (i of indices; track i) {
        <span
          class="material-symbols-rounded cursor-pointer transition-colors"
          [class.text-amber-500]="i <= value"
          [class.text-neutral-300]="i > value"
          >star</span
        >
      }
      @if (showLabel) {
        <span class="text-xs text-neutral-500 ml-2"
          >({{ value }}/{{ max }})</span
        >
      }
    </div>
  `, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: RatingComponent, decorators: [{
            type: Component,
            args: [{
                    selector: "app-rating",
                    standalone: true,
                    imports: [],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: `
    <div class="flex items-center gap-1">
      @for (i of indices; track i) {
        <span
          class="material-symbols-rounded cursor-pointer transition-colors"
          [class.text-amber-500]="i <= value"
          [class.text-neutral-300]="i > value"
          >star</span
        >
      }
      @if (showLabel) {
        <span class="text-xs text-neutral-500 ml-2"
          >({{ value }}/{{ max }})</span
        >
      }
    </div>
  `,
                }]
        }], propDecorators: { value: [{
                type: Input
            }], max: [{
                type: Input
            }], readonly: [{
                type: Input
            }], size: [{
                type: Input
            }], accentColor: [{
                type: Input
            }], showLabel: [{
                type: Input
            }], ratingChange: [{
                type: Output
            }] } });
registerSchemaComponent("app-rating", RatingComponent);

class StepperComponent {
    steps = [];
    current = 0;
    clickable = false;
    stepChange = new EventEmitter();
    getStepClass(i) {
        if (i < this.current)
            return "app-stepper__item--completed";
        if (i === this.current)
            return "app-stepper__item--active";
        return "";
    }
    getConnectorClass(i) {
        return i < this.current ? "app-stepper__connector--completed" : "";
    }
    onStepClick(i) {
        if (!this.clickable)
            return;
        this.stepChange.emit(i);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: StepperComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.0.6", type: StepperComponent, isStandalone: true, selector: "app-stepper", inputs: { steps: "steps", current: "current", clickable: "clickable" }, outputs: { stepChange: "stepChange" }, ngImport: i0, template: `
    <ol class="flex items-center w-full">
      @for (step of steps; track step.label; let i = $index) {
        <li
          class="flex w-full items-center"
          [class.text-indigo-600]="i < current"
          [class.text-neutral-400]="i >= current"
        >
          <span
            class="flex items-center justify-center w-9 h-9 rounded-full shrink-0 text-xs font-bold"
            [class.bg-indigo-100]="i < current"
            [class.bg-neutral-100]="i >= current"
          >
            @if (i < current) {
              <span class="material-symbols-rounded text-sm">done</span>
            } @else {
              {{ i + 1 }}
            }
          </span>
          @if (i < steps.length - 1) {
            <span
              class="w-full h-0.5 bg-neutral-200 dark:bg-neutral-700 mx-2"
            ></span>
          }
        </li>
      }
    </ol>
  `, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: StepperComponent, decorators: [{
            type: Component,
            args: [{
                    selector: "app-stepper",
                    standalone: true,
                    imports: [],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: `
    <ol class="flex items-center w-full">
      @for (step of steps; track step.label; let i = $index) {
        <li
          class="flex w-full items-center"
          [class.text-indigo-600]="i < current"
          [class.text-neutral-400]="i >= current"
        >
          <span
            class="flex items-center justify-center w-9 h-9 rounded-full shrink-0 text-xs font-bold"
            [class.bg-indigo-100]="i < current"
            [class.bg-neutral-100]="i >= current"
          >
            @if (i < current) {
              <span class="material-symbols-rounded text-sm">done</span>
            } @else {
              {{ i + 1 }}
            }
          </span>
          @if (i < steps.length - 1) {
            <span
              class="w-full h-0.5 bg-neutral-200 dark:bg-neutral-700 mx-2"
            ></span>
          }
        </li>
      }
    </ol>
  `,
                }]
        }], propDecorators: { steps: [{
                type: Input
            }], current: [{
                type: Input
            }], clickable: [{
                type: Input
            }], stepChange: [{
                type: Output
            }] } });
registerSchemaComponent("app-stepper", StepperComponent);

class BreadcrumbComponent {
    items = [];
    itemClick = new EventEmitter();
    onItemClick(index, e) {
        this.itemClick.emit(index);
        if (this.items[index]?.href) {
            // allow native navigation; only prevent default when no href
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: BreadcrumbComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.0.6", type: BreadcrumbComponent, isStandalone: true, selector: "app-breadcrumb", inputs: { items: "items" }, outputs: { itemClick: "itemClick" }, ngImport: i0, template: `
    <nav class="flex items-center gap-1 text-xs text-neutral-500">
      @for (item of items; track item.label; let i = $index) {
        @if (i < items.length - 1) {
          <a
            [href]="item.href || '#'"
            class="hover:text-indigo-600 transition-colors"
            >{{ item.label }}</a
          >
          <span class="material-symbols-rounded text-sm">chevron_right</span>
        } @else {
          <span class="font-semibold text-neutral-800 dark:text-neutral-200">{{
            item.label
          }}</span>
        }
      }
    </nav>
  `, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: BreadcrumbComponent, decorators: [{
            type: Component,
            args: [{
                    selector: "app-breadcrumb",
                    standalone: true,
                    imports: [],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: `
    <nav class="flex items-center gap-1 text-xs text-neutral-500">
      @for (item of items; track item.label; let i = $index) {
        @if (i < items.length - 1) {
          <a
            [href]="item.href || '#'"
            class="hover:text-indigo-600 transition-colors"
            >{{ item.label }}</a
          >
          <span class="material-symbols-rounded text-sm">chevron_right</span>
        } @else {
          <span class="font-semibold text-neutral-800 dark:text-neutral-200">{{
            item.label
          }}</span>
        }
      }
    </nav>
  `,
                }]
        }], propDecorators: { items: [{
                type: Input
            }], itemClick: [{
                type: Output
            }] } });
registerSchemaComponent("app-breadcrumb", BreadcrumbComponent);

class ProgressRingComponent {
    value = 0;
    max = 100;
    size = "md";
    label;
    showLabel = true;
    accent = "#6366f1";
    get diameter() {
        return this.size === "sm" ? 48 : this.size === "md" ? 80 : 128;
    }
    get strokeWidth() {
        return this.size === "sm" ? 4 : this.size === "md" ? 6 : 10;
    }
    get radius() {
        return (this.diameter - this.strokeWidth) / 2;
    }
    get center() {
        return this.diameter / 2;
    }
    get circumference() {
        return 2 * Math.PI * this.radius;
    }
    get percent() {
        if (!this.max)
            return 0;
        return Math.round((this.value / this.max) * 100);
    }
    get dashOffset() {
        const clamped = Math.max(0, Math.min(this.value, this.max));
        const ratio = this.max > 0 ? clamped / this.max : 0;
        return this.circumference * (1 - ratio);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: ProgressRingComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.0.6", type: ProgressRingComponent, isStandalone: true, selector: "app-progress-ring", inputs: { value: "value", max: "max", size: "size", label: "label", showLabel: "showLabel", accent: "accent" }, ngImport: i0, template: `
    <div class="relative inline-flex items-center justify-center">
      <svg class="w-full h-full" viewBox="0 0 36 36">
        <path
          class="text-neutral-200 dark:text-neutral-700"
          stroke-width="3"
          stroke="currentColor"
          fill="none"
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <path
          [class]="accent"
          [attr.stroke-dasharray]="(value / max) * 100 + ', 100'"
          stroke-width="3"
          stroke-linecap="round"
          stroke="currentColor"
          fill="none"
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
        />
      </svg>
      @if (showLabel) {
        <span
          class="absolute inset-0 flex items-center justify-center text-[10px] font-bold"
          >{{ value }}%</span
        >
      }
    </div>
  `, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: ProgressRingComponent, decorators: [{
            type: Component,
            args: [{
                    selector: "app-progress-ring",
                    standalone: true,
                    imports: [],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: `
    <div class="relative inline-flex items-center justify-center">
      <svg class="w-full h-full" viewBox="0 0 36 36">
        <path
          class="text-neutral-200 dark:text-neutral-700"
          stroke-width="3"
          stroke="currentColor"
          fill="none"
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <path
          [class]="accent"
          [attr.stroke-dasharray]="(value / max) * 100 + ', 100'"
          stroke-width="3"
          stroke-linecap="round"
          stroke="currentColor"
          fill="none"
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
        />
      </svg>
      @if (showLabel) {
        <span
          class="absolute inset-0 flex items-center justify-center text-[10px] font-bold"
          >{{ value }}%</span
        >
      }
    </div>
  `,
                }]
        }], propDecorators: { value: [{
                type: Input
            }], max: [{
                type: Input
            }], size: [{
                type: Input
            }], label: [{
                type: Input
            }], showLabel: [{
                type: Input
            }], accent: [{
                type: Input
            }] } });
registerSchemaComponent("app-progress-ring", ProgressRingComponent);

class SkeletonComponent {
    variant = "text";
    lines;
    animated = true;
    get linesArray() {
        const count = this.lines ?? (this.variant === "text" ? 1 : 3);
        return Array.from({ length: Math.max(1, count) }, (_, i) => i);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: SkeletonComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.0.6", type: SkeletonComponent, isStandalone: true, selector: "app-skeleton", inputs: { variant: "variant", lines: "lines", animated: "animated" }, ngImport: i0, template: `
    <div class="animate-pulse space-y-3">
      @switch (variant) {
        @case ("circle") {
          <div
            class="h-10 w-10 bg-neutral-200 dark:bg-neutral-700 rounded-full"
          ></div>
        }
        @case ("card") {
          <div
            class="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-3/4"
          ></div>
          <div
            class="h-3 bg-neutral-200 dark:bg-neutral-700 rounded w-full"
          ></div>
          <div
            class="h-3 bg-neutral-200 dark:bg-neutral-700 rounded w-5/6"
          ></div>
        }
        @case ("list") {
          @for (n of linesArray; track n) {
            <div
              class="h-3 bg-neutral-200 dark:bg-neutral-700 rounded w-full"
            ></div>
          }
        }
        @default {
          <div
            class="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-3/4"
          ></div>
          <div
            class="h-3 bg-neutral-200 dark:bg-neutral-700 rounded w-full"
          ></div>
          <div
            class="h-3 bg-neutral-200 dark:bg-neutral-700 rounded w-5/6"
          ></div>
        }
      }
    </div>
  `, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: SkeletonComponent, decorators: [{
            type: Component,
            args: [{
                    selector: "app-skeleton",
                    standalone: true,
                    imports: [],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: `
    <div class="animate-pulse space-y-3">
      @switch (variant) {
        @case ("circle") {
          <div
            class="h-10 w-10 bg-neutral-200 dark:bg-neutral-700 rounded-full"
          ></div>
        }
        @case ("card") {
          <div
            class="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-3/4"
          ></div>
          <div
            class="h-3 bg-neutral-200 dark:bg-neutral-700 rounded w-full"
          ></div>
          <div
            class="h-3 bg-neutral-200 dark:bg-neutral-700 rounded w-5/6"
          ></div>
        }
        @case ("list") {
          @for (n of linesArray; track n) {
            <div
              class="h-3 bg-neutral-200 dark:bg-neutral-700 rounded w-full"
            ></div>
          }
        }
        @default {
          <div
            class="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-3/4"
          ></div>
          <div
            class="h-3 bg-neutral-200 dark:bg-neutral-700 rounded w-full"
          ></div>
          <div
            class="h-3 bg-neutral-200 dark:bg-neutral-700 rounded w-5/6"
          ></div>
        }
      }
    </div>
  `,
                }]
        }], propDecorators: { variant: [{
                type: Input
            }], lines: [{
                type: Input
            }], animated: [{
                type: Input
            }] } });
registerSchemaComponent("app-skeleton", SkeletonComponent);

class ListComponent {
    items = [];
    selectable = false;
    divided = true;
    itemSelected = new EventEmitter();
    onItemClick(item) {
        if (!this.selectable)
            return;
        this.itemSelected.emit(item.value);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: ListComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.0.6", type: ListComponent, isStandalone: true, selector: "app-list", inputs: { items: "items", selectable: "selectable", divided: "divided" }, outputs: { itemSelected: "itemSelected" }, ngImport: i0, template: `
    <ul class="divide-y divide-neutral-100 dark:divide-neutral-800">
      @for (item of items; track item.title) {
        <li class="flex items-start gap-3 py-3">
          @if (item.icon) {
            <div
              class="w-10 h-10 rounded-full bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center shrink-0"
            >
              <span
                class="material-symbols-rounded text-indigo-600 dark:text-indigo-400"
                >{{ item.icon }}</span
              >
            </div>
          }
          <div class="flex-1 min-w-0">
            <p
              class="text-xs font-bold text-neutral-800 dark:text-white truncate"
            >
              {{ item.title }}
            </p>
            @if (item.subtitle) {
              <p class="text-[10px] text-neutral-400 dark:text-neutral-500">
                {{ item.subtitle }}
              </p>
            }
          </div>
          @if (item.timestamp) {
            <span class="text-[10px] text-neutral-400">{{
              item.timestamp
            }}</span>
          }
        </li>
      }
    </ul>
  `, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: ListComponent, decorators: [{
            type: Component,
            args: [{
                    selector: "app-list",
                    standalone: true,
                    imports: [IconComponent],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: `
    <ul class="divide-y divide-neutral-100 dark:divide-neutral-800">
      @for (item of items; track item.title) {
        <li class="flex items-start gap-3 py-3">
          @if (item.icon) {
            <div
              class="w-10 h-10 rounded-full bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center shrink-0"
            >
              <span
                class="material-symbols-rounded text-indigo-600 dark:text-indigo-400"
                >{{ item.icon }}</span
              >
            </div>
          }
          <div class="flex-1 min-w-0">
            <p
              class="text-xs font-bold text-neutral-800 dark:text-white truncate"
            >
              {{ item.title }}
            </p>
            @if (item.subtitle) {
              <p class="text-[10px] text-neutral-400 dark:text-neutral-500">
                {{ item.subtitle }}
              </p>
            }
          </div>
          @if (item.timestamp) {
            <span class="text-[10px] text-neutral-400">{{
              item.timestamp
            }}</span>
          }
        </li>
      }
    </ul>
  `,
                }]
        }], propDecorators: { items: [{
                type: Input
            }], selectable: [{
                type: Input
            }], divided: [{
                type: Input
            }], itemSelected: [{
                type: Output
            }] } });
registerSchemaComponent("app-list", ListComponent);

class ButtonGroupComponent {
    items = [];
    value = null;
    rounded = "full";
    multiple = false;
    valueChange = new EventEmitter();
    isSelected(item) {
        if (this.multiple) {
            return Array.isArray(this.value) && this.value.includes(item.value);
        }
        return this.value === item.value;
    }
    onItemClick(item) {
        if (this.multiple) {
            const current = Array.isArray(this.value) ? [...this.value] : [];
            const idx = current.indexOf(item.value);
            if (idx >= 0) {
                current.splice(idx, 1);
            }
            else {
                current.push(item.value);
            }
            this.value = current;
            this.valueChange.emit(current);
        }
        else {
            this.value = item.value;
            this.valueChange.emit(item.value);
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: ButtonGroupComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.0.6", type: ButtonGroupComponent, isStandalone: true, selector: "app-button-group", inputs: { items: "items", value: "value", rounded: "rounded", multiple: "multiple" }, outputs: { valueChange: "valueChange" }, ngImport: i0, template: `
    <div
      class="inline-flex rounded-full shadow-sm"
      [class.rounded-none]="rounded === 'none'"
      role="group"
    >
      @for (item of items; track item.label) {
        <button
          class="px-4 py-2 text-xs font-medium border transition-colors"
          [class.bg-indigo-600]="item.value === value"
          [class.text-white]="item.value === value"
          [class.bg-white]="item.value !== value"
          [class.text-neutral-700]="item.value !== value"
          [class.border-neutral-200]="true"
          [class.first:rounded-s-full]="rounded === 'full'"
          [class.last:rounded-e-full]="rounded === 'full'"
          (click)="valueChange.emit(item.value)"
        >
          {{ item.label }}
        </button>
      }
    </div>
  `, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: ButtonGroupComponent, decorators: [{
            type: Component,
            args: [{
                    selector: "app-button-group",
                    standalone: true,
                    imports: [IconComponent],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: `
    <div
      class="inline-flex rounded-full shadow-sm"
      [class.rounded-none]="rounded === 'none'"
      role="group"
    >
      @for (item of items; track item.label) {
        <button
          class="px-4 py-2 text-xs font-medium border transition-colors"
          [class.bg-indigo-600]="item.value === value"
          [class.text-white]="item.value === value"
          [class.bg-white]="item.value !== value"
          [class.text-neutral-700]="item.value !== value"
          [class.border-neutral-200]="true"
          [class.first:rounded-s-full]="rounded === 'full'"
          [class.last:rounded-e-full]="rounded === 'full'"
          (click)="valueChange.emit(item.value)"
        >
          {{ item.label }}
        </button>
      }
    </div>
  `,
                }]
        }], propDecorators: { items: [{
                type: Input
            }], value: [{
                type: Input
            }], rounded: [{
                type: Input
            }], multiple: [{
                type: Input
            }], valueChange: [{
                type: Output
            }] } });
registerSchemaComponent("app-button-group", ButtonGroupComponent);

class FileInputComponent {
    label;
    accept;
    placeholder = "Upload file";
    multiple = false;
    filesSelected = new EventEmitter();
    fileName = new EventEmitter();
    isDragOver = false;
    fileEl = inject((ElementRef));
    openPicker() {
        const input = this.fileEl.nativeElement.querySelector("input[type='file']");
        input?.click();
    }
    onFileChange(event) {
        const input = event.target;
        this.emitFiles(input.files);
    }
    onDragOver(event) {
        event.preventDefault();
        this.isDragOver = true;
    }
    onDragLeave(event) {
        event.preventDefault();
        this.isDragOver = false;
    }
    onDrop(event) {
        event.preventDefault();
        this.isDragOver = false;
        this.emitFiles(event.dataTransfer?.files ?? null);
    }
    emitFiles(files) {
        this.filesSelected.emit(files);
        if (files && files.length > 0) {
            const names = [];
            for (let i = 0; i < files.length; i++) {
                names.push(files[i].name);
            }
            this.fileName.emit(names.join(", "));
        }
        else {
            this.fileName.emit("");
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: FileInputComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.0.6", type: FileInputComponent, isStandalone: true, selector: "app-file-input", inputs: { label: "label", accept: "accept", placeholder: "placeholder", multiple: "multiple" }, outputs: { filesSelected: "filesSelected", fileName: "fileName" }, ngImport: i0, template: `
    <div class="w-full">
      @if (label) {
        <label
          class="block mb-2 text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider"
          >{{ label }}</label
        >
      }
      <label
        class="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-neutral-300 dark:border-neutral-700 rounded-2xl cursor-pointer bg-neutral-50 hover:bg-neutral-100 dark:bg-neutral-800 dark:hover:bg-neutral-700 transition-colors"
      >
        <span
          class="material-symbols-rounded text-neutral-500 dark:text-neutral-400 mb-1"
          >cloud_upload</span
        >
        <p
          class="text-[11px] text-neutral-500 dark:text-neutral-400 font-semibold"
        >
          {{ placeholder }}
        </p>
        <input
          type="file"
          class="hidden"
          (change)="onFileChange($event)"
          [accept]="accept"
          [multiple]="multiple"
        />
      </label>
    </div>
  `, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: FileInputComponent, decorators: [{
            type: Component,
            args: [{
                    selector: "app-file-input",
                    standalone: true,
                    imports: [IconComponent],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: `
    <div class="w-full">
      @if (label) {
        <label
          class="block mb-2 text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider"
          >{{ label }}</label
        >
      }
      <label
        class="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-neutral-300 dark:border-neutral-700 rounded-2xl cursor-pointer bg-neutral-50 hover:bg-neutral-100 dark:bg-neutral-800 dark:hover:bg-neutral-700 transition-colors"
      >
        <span
          class="material-symbols-rounded text-neutral-500 dark:text-neutral-400 mb-1"
          >cloud_upload</span
        >
        <p
          class="text-[11px] text-neutral-500 dark:text-neutral-400 font-semibold"
        >
          {{ placeholder }}
        </p>
        <input
          type="file"
          class="hidden"
          (change)="onFileChange($event)"
          [accept]="accept"
          [multiple]="multiple"
        />
      </label>
    </div>
  `,
                }]
        }], propDecorators: { label: [{
                type: Input
            }], accept: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], multiple: [{
                type: Input
            }], filesSelected: [{
                type: Output
            }], fileName: [{
                type: Output
            }] } });
registerSchemaComponent("app-file-input", FileInputComponent);

// Side-effect import: Import ALL Angular components to trigger registerSchemaComponent()
// Each component file calls registerSchemaComponent() on module load,
// which registers the component in SCHEMA_COMPONENT_MAP for dynamic resolution.
// This file MUST be imported before any schema rendering.
// UI Components

// UI Components
const uiComponents = [
    {
        id: "alert",
        name: "AppAlert",
        selector: "app-alert",
        packageType: "shared",
        category: "feedback",
    },
    {
        id: "avatar",
        name: "AppAvatar",
        selector: "app-avatar",
        packageType: "shared",
        category: "forms",
    },
    {
        id: "badge",
        name: "AppBadge",
        selector: "app-badge",
        packageType: "shared",
        category: "forms",
    },
    {
        id: "bottom-panel",
        name: "AppBottomPanel",
        selector: "app-bottom-panel",
        packageType: "shared",
        category: "forms",
    },
    {
        id: "breadcrumb",
        name: "AppBreadcrumb",
        selector: "app-breadcrumb",
        packageType: "shared",
        category: "navigation",
    },
    {
        id: "button",
        name: "AppButton",
        selector: "app-button",
        packageType: "shared",
        category: "forms",
    },
    {
        id: "button-group",
        name: "AppButtonGroup",
        selector: "app-button-group",
        packageType: "shared",
        category: "forms",
    },
    {
        id: "canvas",
        name: "AppCanvas",
        selector: "app-canvas",
        packageType: "shared",
        category: "forms",
    },
    {
        id: "card",
        name: "AppCard",
        selector: "app-card",
        packageType: "shared",
        category: "forms",
    },
    {
        id: "checkbox",
        name: "AppCheckbox",
        selector: "app-checkbox",
        packageType: "shared",
        category: "forms",
    },
    {
        id: "chip",
        name: "AppChip",
        selector: "app-chip",
        packageType: "shared",
        category: "forms",
    },
    {
        id: "component-palette",
        name: "AppComponentPalette",
        selector: "app-component-palette",
        packageType: "shared",
        category: "forms",
    },
    {
        id: "confirm-dialog",
        name: "AppConfirmDialog",
        selector: "app-confirm-dialog",
        packageType: "shared",
        category: "forms",
    },
    {
        id: "data-table",
        name: "AppDataTable",
        selector: "app-data-table",
        packageType: "shared",
        category: "forms",
    },
    {
        id: "dialog",
        name: "AppDialog",
        selector: "app-dialog",
        packageType: "shared",
        category: "forms",
    },
    {
        id: "empty-state",
        name: "AppEmptyState",
        selector: "app-empty-state",
        packageType: "shared",
        category: "forms",
    },
    {
        id: "fab",
        name: "AppFab",
        selector: "app-fab",
        packageType: "shared",
        category: "navigation",
    },
    {
        id: "file-input",
        name: "AppFileInput",
        selector: "app-file-input",
        packageType: "shared",
        category: "forms",
    },
    {
        id: "footer",
        name: "AppFooter",
        selector: "app-footer",
        packageType: "shared",
        category: "forms",
    },
    {
        id: "header",
        name: "AppHeader",
        selector: "app-header",
        packageType: "shared",
        category: "forms",
    },
    {
        id: "input",
        name: "AppInput",
        selector: "app-input",
        packageType: "shared",
        category: "forms",
    },
    {
        id: "json-view",
        name: "AppJsonView",
        selector: "app-json-view",
        packageType: "shared",
        category: "layout",
    },
    {
        id: "list",
        name: "AppList",
        selector: "app-list",
        packageType: "shared",
        category: "layout",
    },
    {
        id: "loading",
        name: "AppLoading",
        selector: "app-loading",
        packageType: "shared",
        category: "forms",
    },
    {
        id: "modal",
        name: "AppModal",
        selector: "app-modal",
        packageType: "shared",
        category: "forms",
    },
    {
        id: "page-container",
        name: "AppPageContainer",
        selector: "app-page-container",
        packageType: "shared",
        category: "forms",
    },
    {
        id: "page-toolbar",
        name: "AppPageToolbar",
        selector: "app-page-toolbar",
        packageType: "shared",
        category: "forms",
    },
    {
        id: "pagination",
        name: "AppPagination",
        selector: "app-pagination",
        packageType: "shared",
        category: "forms",
    },
    {
        id: "progress-bar",
        name: "AppProgressBar",
        selector: "app-progress-bar",
        packageType: "shared",
        category: "forms",
    },
    {
        id: "progress-ring",
        name: "AppProgressRing",
        selector: "app-progress-ring",
        packageType: "shared",
        category: "feedback",
    },
    {
        id: "properties-panel",
        name: "AppPropertiesPanel",
        selector: "app-properties-panel",
        packageType: "shared",
        category: "forms",
    },
    {
        id: "radio",
        name: "AppRadio",
        selector: "app-radio",
        packageType: "shared",
        category: "forms",
    },
    {
        id: "rating",
        name: "AppRating",
        selector: "app-rating",
        packageType: "shared",
        category: "feedback",
    },
    {
        id: "segment-selector",
        name: "AppSegmentSelector",
        selector: "app-segment-selector",
        packageType: "shared",
        category: "forms",
    },
    {
        id: "select",
        name: "AppSelect",
        selector: "app-select",
        packageType: "shared",
        category: "forms",
    },
    {
        id: "sidebar",
        name: "AppSidebar",
        selector: "app-sidebar",
        packageType: "shared",
        category: "forms",
    },
    {
        id: "skeleton",
        name: "AppSkeleton",
        selector: "app-skeleton",
        packageType: "shared",
        category: "feedback",
    },
    {
        id: "slider",
        name: "AppSlider",
        selector: "app-slider",
        packageType: "shared",
        category: "forms",
    },
    {
        id: "split-view",
        name: "AppSplitView",
        selector: "app-split-view",
        packageType: "shared",
        category: "forms",
    },
    {
        id: "spinner",
        name: "AppSpinner",
        selector: "app-spinner",
        packageType: "shared",
        category: "forms",
    },
    {
        id: "stats-card",
        name: "AppStatsCard",
        selector: "app-stats-card",
        packageType: "shared",
        category: "forms",
    },
    {
        id: "stepper",
        name: "AppStepper",
        selector: "app-stepper",
        packageType: "shared",
        category: "navigation",
    },
    {
        id: "switch",
        name: "AppSwitch",
        selector: "app-switch",
        packageType: "shared",
        category: "forms",
    },
    {
        id: "table-view",
        name: "AppTableView",
        selector: "app-table-view",
        packageType: "shared",
        category: "forms",
    },
    {
        id: "tabs",
        name: "AppTabs",
        selector: "app-tabs",
        packageType: "shared",
        category: "forms",
    },
    {
        id: "textarea",
        name: "AppTextarea",
        selector: "app-textarea",
        packageType: "shared",
        category: "forms",
    },
    {
        id: "tooltip",
        name: "AppTooltip",
        selector: "app-tooltip",
        packageType: "shared",
        category: "forms",
    },
    {
        id: "theme-toggle",
        name: "AppThemeToggle",
        selector: "app-theme-toggle",
        packageType: "shared",
        category: "layout",
    },
    {
        id: "icon",
        name: "AppIcon",
        selector: "app-icon",
        packageType: "shared",
        category: "forms",
    },
    {
        id: "text-input",
        name: "AppTextInput",
        selector: "app-text-input",
        packageType: "shared",
        category: "forms",
    },
    {
        id: "language-selector",
        name: "AppLanguageSelector",
        selector: "app-language-selector",
        packageType: "shared",
        category: "forms",
    },
    {
        id: "shortcuts-overlay",
        name: "AppShortcutsOverlay",
        selector: "app-shortcuts-overlay",
        packageType: "shared",
        category: "layout",
    },
    {
        id: "translation-output",
        name: "AppTranslationOutput",
        selector: "app-translation-output",
        packageType: "shared",
        category: "forms",
    },
    {
        id: "tree",
        name: "AppTree",
        selector: "app-tree",
        packageType: "shared",
        category: "forms",
    },
    {
        id: "divider",
        name: "AppDivider",
        selector: "app-divider",
        packageType: "shared",
        category: "forms",
    },
    {
        id: "form",
        name: "AppForm",
        selector: "app-form",
        packageType: "shared",
        category: "forms",
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
    },
    {
        id: "designer-sidebar",
        name: "DesignerSidebar",
        selector: "app-designer-sidebar",
        packageType: "shared",
        category: "forms",
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
    },
    {
        id: "toast",
        name: "AppToast",
        selector: "app-toast",
        packageType: "shared",
        category: "feedback",
    },
    {
        id: "snackbar",
        name: "AppSnackbar",
        selector: "app-snackbar",
        packageType: "shared",
        category: "forms",
    },
];

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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: BaseDestroyableComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "22.0.6", type: BaseDestroyableComponent, isStandalone: true, selector: "lib-base-destroyable", ngImport: i0, template: "", isInline: true });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: BaseDestroyableComponent, decorators: [{
            type: Component,
            args: [{
                    selector: "lib-base-destroyable",
                    standalone: true,
                    template: "",
                }]
        }] });

class SchemaRouteViewerComponent {
    router;
    renderer;
    route = "";
    /** When true, renders schema layoutRegions (header, footer, bottom-nav, overlay) */
    showLayoutRegions = false;
    page = computed(() => {
        const p = this.router.currentPage();
        if (p) {
            console.log(`[SchemaRouteViewer] page() computed: id="${p.id}", name="${p.name}", canvasElements=${p.canvasElements?.length ?? 0}, layouts=${p.layouts?.length ?? 0}`);
        }
        return p;
    }, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "page" }] : /* istanbul ignore next */ []));
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
                styles["gap"] = `${layout.gap * 0.25}rem`;
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
        // Gap: schema value is a spacing token (4 = 1rem)
        const rowGap = layout.rowGap ?? layout.gap;
        const colGap = layout.colGap ?? layout.gap;
        if (rowGap !== undefined || colGap !== undefined) {
            const rg = rowGap ? `${rowGap * 0.25}rem` : "0";
            const cg = colGap ? `${colGap * 0.25}rem` : "0";
            styles["gap"] = `${rg} ${cg}`;
        }
        // Padding
        const px = layout.paddingX;
        const py = layout.paddingY;
        if (px !== undefined || py !== undefined) {
            styles["padding"] = `${py ? py * 0.25 : 0}rem ${px ? px * 0.25 : 0}rem`;
        }
        // Width
        if (layout.width === "full")
            styles["width"] = "100%";
        return styles;
    }, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "gridStyles" }] : /* istanbul ignore next */ []));
    /** CSS classes: schema-page + layout class */
    containerClass = computed(() => {
        const layoutCls = this.page()?.layouts?.[0]?.class ?? "";
        return layoutCls ? `schema-page ${layoutCls}` : "schema-page";
    }, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "containerClass" }] : /* istanbul ignore next */ []));
    // ── Layout region support ───────────────────────────────────────
    /** All layout regions from the renderer, re-computed when route changes */
    rawRegions = computed(() => {
        this.router.currentRoute();
        return this.renderer.getLayoutRegions();
    }, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "rawRegions" }] : /* istanbul ignore next */ []));
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
    headerRegion = computed(() => this.showLayoutRegions ? this.regionByType("header") : null, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "headerRegion" }] : /* istanbul ignore next */ []));
    footerRegion = computed(() => this.showLayoutRegions ? this.regionByType("footer") : null, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "footerRegion" }] : /* istanbul ignore next */ []));
    bottomNavRegion = computed(() => this.showLayoutRegions ? this.regionByType("bottom-nav") : null, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "bottomNavRegion" }] : /* istanbul ignore next */ []));
    overlayRegions = computed(() => this.showLayoutRegions
        ? this.rawRegions().filter((r) => this.isRegionVisible(r) && this.getRegionType(r) === "overlay")
        : [], /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "overlayRegions" }] : /* istanbul ignore next */ []));
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
    /** Returns a comma-separated list of available page routes for the error message */
    getAvailableRoutes() {
        const schema = this.router.schema();
        if (!schema?.pages?.length)
            return "";
        return schema.pages.map((p) => p.route || p.id).join(", ");
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: SchemaRouteViewerComponent, deps: [{ token: SchemaRouterService }, { token: SchemaRendererService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.0.6", type: SchemaRouteViewerComponent, isStandalone: true, selector: "lib-schema-route-viewer", inputs: { route: "route", showLayoutRegions: "showLayoutRegions" }, usesOnChanges: true, ngImport: i0, template: "@if (headerRegion(); as region) {\n  <header class=\"schema-layout-header\">\n    @for (child of region.children || []; track child.id) {\n      <app-schema-element\n        [element]=\"child\"\n        [elements]=\"region.children || []\"\n      />\n    }\n  </header>\n}\n\n@if (page(); as p) {\n  <div [class]=\"containerClass()\" [ngStyle]=\"gridStyles()\">\n    @for (element of p.canvasElements; track element.id) {\n      <app-schema-element\n        [element]=\"element\"\n        [elements]=\"p.canvasElements || []\"\n      ></app-schema-element>\n    }\n  </div>\n} @else if (router.schema() && router.schema()!.pages?.length) {\n  <div class=\"schema-page sf-p-8 sf-text-center\">\n    <div class=\"sf-text-4xl sf-mb-4\">&#9888;</div>\n    <h2 class=\"sf-text-xl sf-font-bold sf-mb-2\">Page Not Found</h2>\n    <p style=\"color: var(--text); opacity: 0.7\">\n      Route \"{{ router.currentRoute() }}\" not found in schema. Available pages:\n      {{ getAvailableRoutes() }}\n    </p>\n  </div>\n} @else {\n  <div class=\"schema-page sf-p-8 sf-text-center\">\n    <div style=\"color: var(--text); opacity: 0.5\">Waiting for schema...</div>\n  </div>\n}\n\n@if (footerRegion(); as region) {\n  <footer class=\"schema-layout-footer\">\n    @for (child of region.children || []; track child.id) {\n      <app-schema-element\n        [element]=\"child\"\n        [elements]=\"region.children || []\"\n      />\n    }\n  </footer>\n}\n\n@if (bottomNavRegion(); as region) {\n  <nav class=\"schema-layout-bottom-nav\">\n    @for (child of region.children || []; track child.id) {\n      <app-schema-element\n        [element]=\"child\"\n        [elements]=\"region.children || []\"\n      />\n    }\n  </nav>\n}\n\n@for (region of overlayRegions(); track region.id) {\n  <div class=\"schema-layout-overlay\">\n    @for (child of region.children || []; track child.id) {\n      <app-schema-element\n        [element]=\"child\"\n        [elements]=\"region.children || []\"\n      />\n    }\n  </div>\n}\n", dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "component", type: SchemaElementComponent, selector: "app-schema-element", inputs: ["element", "elements"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: SchemaRouteViewerComponent, decorators: [{
            type: Component,
            args: [{ selector: "lib-schema-route-viewer", standalone: true, imports: [CommonModule, SchemaElementComponent], schemas: [CUSTOM_ELEMENTS_SCHEMA], template: "@if (headerRegion(); as region) {\n  <header class=\"schema-layout-header\">\n    @for (child of region.children || []; track child.id) {\n      <app-schema-element\n        [element]=\"child\"\n        [elements]=\"region.children || []\"\n      />\n    }\n  </header>\n}\n\n@if (page(); as p) {\n  <div [class]=\"containerClass()\" [ngStyle]=\"gridStyles()\">\n    @for (element of p.canvasElements; track element.id) {\n      <app-schema-element\n        [element]=\"element\"\n        [elements]=\"p.canvasElements || []\"\n      ></app-schema-element>\n    }\n  </div>\n} @else if (router.schema() && router.schema()!.pages?.length) {\n  <div class=\"schema-page sf-p-8 sf-text-center\">\n    <div class=\"sf-text-4xl sf-mb-4\">&#9888;</div>\n    <h2 class=\"sf-text-xl sf-font-bold sf-mb-2\">Page Not Found</h2>\n    <p style=\"color: var(--text); opacity: 0.7\">\n      Route \"{{ router.currentRoute() }}\" not found in schema. Available pages:\n      {{ getAvailableRoutes() }}\n    </p>\n  </div>\n} @else {\n  <div class=\"schema-page sf-p-8 sf-text-center\">\n    <div style=\"color: var(--text); opacity: 0.5\">Waiting for schema...</div>\n  </div>\n}\n\n@if (footerRegion(); as region) {\n  <footer class=\"schema-layout-footer\">\n    @for (child of region.children || []; track child.id) {\n      <app-schema-element\n        [element]=\"child\"\n        [elements]=\"region.children || []\"\n      />\n    }\n  </footer>\n}\n\n@if (bottomNavRegion(); as region) {\n  <nav class=\"schema-layout-bottom-nav\">\n    @for (child of region.children || []; track child.id) {\n      <app-schema-element\n        [element]=\"child\"\n        [elements]=\"region.children || []\"\n      />\n    }\n  </nav>\n}\n\n@for (region of overlayRegions(); track region.id) {\n  <div class=\"schema-layout-overlay\">\n    @for (child of region.children || []; track child.id) {\n      <app-schema-element\n        [element]=\"child\"\n        [elements]=\"region.children || []\"\n      />\n    }\n  </div>\n}\n" }]
        }], ctorParameters: () => [{ type: SchemaRouterService }, { type: SchemaRendererService }], propDecorators: { route: [{
                type: Input
            }], showLayoutRegions: [{
                type: Input
            }] } });

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
    _currentUser = signal(null, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "_currentUser" }] : /* istanbul ignore next */ []));
    _roles = signal([], /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "_roles" }] : /* istanbul ignore next */ []));
    _isAdmin = signal(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "_isAdmin" }] : /* istanbul ignore next */ []));
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: PermissionService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: PermissionService, providedIn: "root" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: PermissionService, decorators: [{
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: GuardService, deps: [{ token: PermissionService }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: GuardService, providedIn: "root" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: GuardService, decorators: [{
            type: Injectable,
            args: [{ providedIn: "root" }]
        }], ctorParameters: () => [{ type: PermissionService }] });

class SchemaRouterService {
    guardService;
    constructor(guardService) {
        this.guardService = guardService;
    }
    _schema = signal(null, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "_schema" }] : /* istanbul ignore next */ []));
    _currentPage = signal(null, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "_currentPage" }] : /* istanbul ignore next */ []));
    _currentLayout = signal(null, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "_currentLayout" }] : /* istanbul ignore next */ []));
    _currentRoute = signal("", /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "_currentRoute" }] : /* istanbul ignore next */ []));
    _params = signal({}, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "_params" }] : /* istanbul ignore next */ []));
    _queryParams = signal({}, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "_queryParams" }] : /* istanbul ignore next */ []));
    _isLoading = signal(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "_isLoading" }] : /* istanbul ignore next */ []));
    _error = signal(null, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "_error" }] : /* istanbul ignore next */ []));
    schema = this._schema.asReadonly();
    currentPage = this._currentPage.asReadonly();
    currentLayout = this._currentLayout.asReadonly();
    currentRoute = this._currentRoute.asReadonly();
    params = this._params.asReadonly();
    queryParams = this._queryParams.asReadonly();
    isLoading = this._isLoading.asReadonly();
    error = this._error.asReadonly();
    hasSchema = computed(() => this._schema() !== null, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "hasSchema" }] : /* istanbul ignore next */ []));
    currentPageId = computed(() => this._currentPage()?.id ?? null, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "currentPageId" }] : /* istanbul ignore next */ []));
    currentPageTitle = computed(() => this._currentPage()?.meta?.title ?? "", /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "currentPageTitle" }] : /* istanbul ignore next */ []));
    setSchema(schema) {
        logger.log("[SchemaRouter] setSchema() called, pages:", schema?.pages?.length ?? 0, "layouts:", schema?.layouts?.length ?? 0);
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
            logger.log(`[SchemaRouter] navigate("${route}") attempting...`);
            let matched = this.resolveRoute(route);
            if (!matched) {
                // Fall back to /404 page if route not found
                const notFoundPage = this.findReservedRoute("/404");
                if (notFoundPage) {
                    matched = { page: notFoundPage, layout: null, params: {} };
                }
            }
            if (!matched) {
                logger.warn(`[SchemaRouter] navigate("${route}") - route NOT FOUND, falling back to /404`);
                this._error.set(`Route not found: ${route}`);
                return false;
            }
            const { page, params } = matched;
            // Run guards if configured
            if (page && this.guardService) {
                const pageGuards = page["guards"];
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
                logger.log(`[SchemaRouter] navigate("${route}") - SUCCESS, page="${page.name}", id="${page.id}"`);
                this._currentPage.set(page);
                // Load layout if specified
                if (page.layout && this._schema()) {
                    const layout = this._schema().layouts.find((l) => l.id === page.layout);
                    this._currentLayout.set(layout ?? null);
                    logger.log(`[SchemaRouter] page "${page.name}" has layout="${page.layout}", found=${!!layout}`);
                }
                else {
                    this._currentLayout.set(null);
                    logger.log(`[SchemaRouter] page "${page.name}" has NO layout`);
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
            if (!p.route)
                continue;
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
        if (schema) {
            const found = schema.pages.find((p) => p.route === route);
            if (found)
                return found;
        }
        // Return a built-in fallback page so /404 and /schema-error always work
        // even when the schema doesn't define them (deduplication: library handles this)
        if (route === "/404") {
            return {
                id: "not-found",
                name: "Not Found",
                route: "/404",
                layouts: [],
                canvasElements: [
                    {
                        id: "not-found-content",
                        componentId: "app-empty-state",
                        props: {
                            title: "Page Not Found",
                            message: "The page you requested does not exist.",
                            variant: "warning",
                        },
                    },
                ],
            };
        }
        if (route === "/schema-error") {
            return {
                id: "schema-error",
                name: "Schema Error",
                route: "/schema-error",
                layouts: [],
                canvasElements: [
                    {
                        id: "schema-error-content",
                        componentId: "app-empty-state",
                        props: {
                            title: "Schema Error",
                            message: this._error() ?? "Failed to load application schema.",
                            variant: "danger",
                            actionLabel: "Retry",
                        },
                    },
                ],
            };
        }
        if (route === "/about") {
            return {
                id: "about-page",
                name: "About",
                route: "/about",
                layouts: [],
                canvasElements: [
                    {
                        id: "about-container",
                        componentId: "app-stack",
                        props: { gap: 16, align: "center", justify: "center" },
                        children: [
                            {
                                id: "about-icon",
                                componentId: "app-icon",
                                props: { icon: "info", size: 64 },
                            },
                            {
                                id: "about-title",
                                componentId: "app-text",
                                props: { text: "Application Name", variant: "h2" },
                            },
                            {
                                id: "about-version",
                                componentId: "app-text",
                                props: { text: "Version 1.0.0" },
                            },
                            {
                                id: "about-desc",
                                componentId: "app-text",
                                props: { text: "A modern desktop application" },
                            },
                        ],
                    },
                ],
            };
        }
        return null;
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
    // ── Auto-Routing from Schema ──────────────────────────────────
    /**
     * Convert all schema pages to Angular Routes.
     * Each route points to SchemaRouteViewerComponent with page data in route data.
     */
    toAngularRoutes() {
        const pages = this.getAllPages();
        if (pages.length === 0)
            return [];
        const routes = pages.map((page) => {
            const path = page.route?.replace(/^\//, "") || page.id;
            const paramPath = path.replace(/:(\w+)/g, (_, param) => `:${param}`);
            return {
                path: paramPath,
                component: SchemaRouteViewerComponent,
                data: { pageId: page.id, page },
            };
        });
        const firstPage = pages[0];
        const firstPath = firstPage?.route?.replace(/^\//, "") || firstPage?.id || "";
        routes.push({ path: "", redirectTo: firstPath, pathMatch: "full" });
        routes.push({ path: "**", redirectTo: firstPath });
        return routes;
    }
    /**
     * Register all schema pages with Angular Router by calling router.resetConfig().
     * Must be called AFTER setSchema().
     */
    registerAngularRoutes(router) {
        const routes = this.toAngularRoutes();
        if (routes.length === 0) {
            logger.warn("[SchemaRouter] no pages to register as Angular routes");
            return;
        }
        logger.log(`[SchemaRouter] registering ${routes.length} Angular routes from schema`);
        router.resetConfig(routes);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: SchemaRouterService, deps: [{ token: GuardService, optional: true }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: SchemaRouterService, providedIn: "root" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: SchemaRouterService, decorators: [{
            type: Injectable,
            args: [{ providedIn: "root" }]
        }], ctorParameters: () => [{ type: GuardService, decorators: [{
                    type: Optional
                }] }] });

const DEFAULT_DURATIONS = {
    success: 3000,
    error: 5000,
    warning: 4000,
    info: 3000,
};
class ToastService {
    toastsSignal = signal([], /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "toastsSignal" }] : /* istanbul ignore next */ []));
    counter = 0;
    autoDismissTimers = new Map();
    toasts = computed(() => this.toastsSignal(), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "toasts" }] : /* istanbul ignore next */ []));
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: ToastService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: ToastService, providedIn: "root" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: ToastService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: "root",
                }]
        }] });

class ToastContainerComponent {
    toastService;
    maxVisible = 5;
    position = "top-right";
    constructor(toastService) {
        this.toastService = toastService;
    }
    visibleToasts = computed(() => {
        return this.toastService.toasts().slice(0, this.maxVisible);
    }, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "visibleToasts" }] : /* istanbul ignore next */ []));
    dismiss(id) {
        this.toastService.dismiss(id);
    }
    get positionClass() {
        switch (this.position) {
            case "top-left":
                return "top-4 left-4";
            case "bottom-right":
                return "bottom-4 right-4";
            case "bottom-left":
                return "bottom-4 left-4";
            case "top-center":
                return "top-4 left-1/2 -translate-x-1/2";
            case "bottom-center":
                return "bottom-4 left-1/2 -translate-x-1/2";
            default:
                return "top-4 right-4";
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: ToastContainerComponent, deps: [{ token: ToastService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.0.6", type: ToastContainerComponent, isStandalone: true, selector: "app-toast-container", inputs: { position: "position" }, ngImport: i0, template: "@if (visibleToasts().length > 0) {\n  <div\n    class=\"sf-fixed sf-z-50 sf-flex sf-w-80 sf-max-w-full sf-flex-col sf-gap-2 sf-p-4\"\n    [ngClass]=\"positionClass\"\n  >\n    @for (toast of visibleToasts(); track toast.id) {\n      <app-toast [toast]=\"toast\" (dismiss)=\"dismiss($event)\"></app-toast>\n    }\n  </div>\n}\n", dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "component", type: ToastComponent, selector: "app-toast", inputs: ["toast"], outputs: ["dismiss"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: ToastContainerComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-toast-container", standalone: true, imports: [CommonModule, ToastComponent], template: "@if (visibleToasts().length > 0) {\n  <div\n    class=\"sf-fixed sf-z-50 sf-flex sf-w-80 sf-max-w-full sf-flex-col sf-gap-2 sf-p-4\"\n    [ngClass]=\"positionClass\"\n  >\n    @for (toast of visibleToasts(); track toast.id) {\n      <app-toast [toast]=\"toast\" (dismiss)=\"dismiss($event)\"></app-toast>\n    }\n  </div>\n}\n" }]
        }], ctorParameters: () => [{ type: ToastService }], propDecorators: { position: [{
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: InvokeWrapperService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: InvokeWrapperService, providedIn: "root" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: InvokeWrapperService, decorators: [{
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: ThemeToggleService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: ThemeToggleService, providedIn: "root" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: ThemeToggleService, decorators: [{
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
    getFallbackSchema(_errorMessage) {
        return {
            version: "1.0.0",
            schemaVersion: "1.0.0",
            pages: [
                {
                    id: "error-page",
                    name: "Schema Error",
                    route: "/schema-error",
                    meta: { title: "Schema Error", icon: undefined },
                    layouts: [],
                    canvasElements: [
                        {
                            id: "error-icon",
                            componentId: "app-empty-state",
                            props: {
                                title: "Schema Error",
                                message: _errorMessage ?? "Failed to load application schema.",
                                variant: "danger",
                                actionLabel: "Retry",
                            },
                            gridPosition: { column: 1, row: 1 },
                        },
                    ],
                },
            ],
            layouts: [],
            components: [],
        };
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: FallbackService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: FallbackService, providedIn: "root" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: FallbackService, decorators: [{
            type: Injectable,
            args: [{ providedIn: "root" }]
        }] });

class HandlerExecutorService {
    invokeWrapper = inject(InvokeWrapperService);
    signalStore = inject(SignalStoreService);
    eventBus = inject(EventBusService);
    dataBindingResolver = inject(DataBindingResolverService);
    router = null;
    handlers = {};
    registeredFunctions = {};
    pendingListeners = [];
    setRouter(router) {
        this.router = router;
    }
    setHandlers(handlers) {
        this.handlers = handlers;
    }
    registerFunction(name, fn) {
        this.registeredFunctions[name] = fn;
    }
    async execute(handlerName, eventData) {
        const def = this.handlers[handlerName];
        if (!def) {
            console.warn(`[HandlerExecutor] Handler not found: "${handlerName}"`);
            return;
        }
        await this.executeHandler(def, eventData);
    }
    async executeHandler(def, eventData) {
        if (def.invoke) {
            await this.handleInvoke(def, eventData);
        }
        else if (def.set) {
            this.handleSet(def.set, eventData);
        }
        else if (def.setMany) {
            this.handleSetMany(def.setMany, eventData);
        }
        else if (def.swap) {
            this.handleSwap(def.swap);
        }
        else if (def.navigate) {
            this.handleNavigate(def.navigate);
        }
        else if (def.call) {
            this.handleCall(def.call);
        }
        else if (def.guard) {
            await this.handleGuard(def, eventData);
        }
        else if (def.openOverlay) {
            this.handleOpenOverlay(def.openOverlay);
        }
        else {
            console.warn("[HandlerExecutor] Unknown handler type", def);
        }
    }
    resolveValue(value, eventData) {
        if (typeof value === "string") {
            if (value.startsWith("$store.")) {
                const path = value.slice(7);
                return this.getStorePath(path);
            }
            if (value.startsWith("$event.detail.")) {
                const path = value.slice(14);
                return this.getNestedValue(eventData, path);
            }
            if (value.startsWith("$event.")) {
                const path = value.slice(7);
                return this.getNestedValue(eventData, path);
            }
            const resolved = this.dataBindingResolver.resolveDataBinding(value);
            return resolved !== value ? resolved : value;
        }
        return value;
    }
    getStorePath(path) {
        const parts = path.split(".");
        let current = this.signalStore.get(parts[0]);
        for (let i = 1; i < parts.length; i++) {
            if (current === null || current === undefined)
                return undefined;
            current = this.getNestedValue(current, parts[i]);
        }
        return current;
    }
    setStorePath(path, value) {
        const parts = path.split(".");
        if (parts.length === 1) {
            this.signalStore.set(parts[0], value);
            return;
        }
        const storeName = parts[0];
        const field = parts.slice(1).join(".");
        const current = this.signalStore.get(storeName);
        if (current && typeof current === "object") {
            current[field] = value;
            this.signalStore.set(storeName, current);
        }
    }
    getNestedValue(obj, path) {
        const parts = path.split(".");
        let current = obj;
        for (const part of parts) {
            if (current === null || current === undefined)
                return undefined;
            current = current[part];
        }
        return current;
    }
    async handleInvoke(def, eventData) {
        const command = def.invoke;
        const rawArgs = def.args || [];
        const resolvedArgs = {};
        for (const raw of rawArgs) {
            if (typeof raw === "string" && raw.startsWith("$")) {
                resolvedArgs[raw] = this.resolveValue(raw, eventData);
            }
            else if (typeof raw === "object" && raw !== null) {
                const entries = Object.entries(raw);
                for (const [k, v] of entries) {
                    resolvedArgs[k] = this.resolveValue(v, eventData);
                }
            }
        }
        if (def.awaitEvent) {
            const result = await new Promise((resolve) => {
                const unlisten = listen(def.awaitEvent, (event) => {
                    resolve(event.payload);
                    unlisten.then((fn) => fn());
                });
                this.invokeWrapper.invoke(command, resolvedArgs).catch((err) => {
                    console.error(`[HandlerExecutor] Invoke failed: ${command}`, err);
                    resolve(null);
                });
            });
            if (result && def.resultTo) {
                this.setStorePath(def.resultTo, result);
            }
        }
        else {
            try {
                const result = await this.invokeWrapper.invoke(command, resolvedArgs);
                if (result !== undefined && def.resultTo) {
                    this.setStorePath(def.resultTo, result);
                }
            }
            catch (err) {
                console.error(`[HandlerExecutor] Invoke failed: ${command}`, err);
            }
        }
    }
    handleSet(setDef, eventData) {
        const value = setDef.from
            ? this.resolveValue(setDef.from, eventData)
            : undefined;
        if (setDef.store && setDef.field) {
            this.setStorePath(`${setDef.store}.${setDef.field}`, value);
        }
    }
    handleSetMany(setManyDef, eventData) {
        for (const [path, rawValue] of Object.entries(setManyDef)) {
            const resolved = this.resolveValue(rawValue, eventData);
            if (path.startsWith("$store.")) {
                this.setStorePath(path.slice(7), resolved);
            }
        }
    }
    handleSwap(swapDef) {
        if (swapDef.length < 2)
            return;
        const valA = this.resolveValue(swapDef[0]);
        const valB = this.resolveValue(swapDef[1]);
        if (swapDef[0].startsWith("$store.")) {
            this.setStorePath(swapDef[0].slice(7), valB);
        }
        if (swapDef[1].startsWith("$store.")) {
            this.setStorePath(swapDef[1].slice(7), valA);
        }
    }
    handleNavigate(path) {
        if (this.router) {
            this.router.navigate(path);
        }
    }
    handleCall(name) {
        const fn = this.registeredFunctions[name];
        if (fn) {
            fn();
        }
        else {
            const resolved = this.dataBindingResolver.resolveDataBinding(`{{functions.${name}}}`);
            if (typeof resolved === "function") {
                resolved();
            }
        }
    }
    async handleGuard(def, eventData) {
        const condition = this.resolveValue(def.guard, eventData);
        if (condition && def.then) {
            const thenDef = this.handlers[def.then];
            if (thenDef) {
                await this.executeHandler(thenDef, eventData);
            }
        }
    }
    handleOpenOverlay(regionId) {
        this.eventBus.emit("open-overlay", { regionId });
    }
    destroy() {
        this.pendingListeners.forEach((fn) => fn());
        this.pendingListeners = [];
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: HandlerExecutorService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: HandlerExecutorService, providedIn: "root" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: HandlerExecutorService, decorators: [{
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
    handlerExecutor;
    signalStore;
    appId = "";
    commandName = "get_ui_schema";
    defaultTheme = "material-design-v3";
    initialRoute = "";
    errorFallbackCommandName = "";
    /** When true, auto-renders app-toast-container and a full-screen loading overlay */
    includeOverlays = true;
    loading = signal(true, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "loading" }] : /* istanbul ignore next */ []));
    error = signal(null, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "error" }] : /* istanbul ignore next */ []));
    themeSubscription;
    /** All raw layout regions from the renderer (unfiltered) */
    rawRegions = computed(() => {
        this.schemaRouter.currentRoute();
        return this.renderer.getLayoutRegions();
    }, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "rawRegions" }] : /* istanbul ignore next */ []));
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
    headerRegion = computed(() => this.regionByType("header"), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "headerRegion" }] : /* istanbul ignore next */ []));
    sidebarLeftRegion = computed(() => this.regionByType("sidebar") ?? this.regionByType("sidebar-left"), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "sidebarLeftRegion" }] : /* istanbul ignore next */ []));
    sidebarRightRegion = computed(() => this.regionByType("sidebar-right"), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "sidebarRightRegion" }] : /* istanbul ignore next */ []));
    footerRegion = computed(() => this.regionByType("footer"), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "footerRegion" }] : /* istanbul ignore next */ []));
    bottomNavRegion = computed(() => this.regionByType("bottom-nav"), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "bottomNavRegion" }] : /* istanbul ignore next */ []));
    overlayRegions = computed(() => this.regionsByType("overlay"), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "overlayRegions" }] : /* istanbul ignore next */ []));
    /** Unrecognized regions rendered in an extra row below the main layout */
    otherRegions = computed(() => {
        return this.rawRegions().filter((r) => this.isRegionVisible(r) && this.getRegionType(r) === "other");
    }, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "otherRegions" }] : /* istanbul ignore next */ []));
    constructor(invokeWrapper, schemaRouter, renderer, themeService, themeToggle, fallbackService, handlerExecutor, signalStore) {
        this.invokeWrapper = invokeWrapper;
        this.schemaRouter = schemaRouter;
        this.renderer = renderer;
        this.themeService = themeService;
        this.themeToggle = themeToggle;
        this.fallbackService = fallbackService;
        this.handlerExecutor = handlerExecutor;
        this.signalStore = signalStore;
        this.handlerExecutor.setRouter(this.schemaRouter);
        effect(() => {
            const route = this.schemaRouter.currentRoute();
            if (route)
                this.renderer.setCurrentRoute(route);
        });
    }
    async ngOnInit() {
        if (!this.appId)
            return;
        this.setupThemeStoreSync();
        this.themeService.loadTheme(this.defaultTheme);
        this.themeToggle.init();
        await this.loadSchema();
    }
    setupThemeStoreSync() {
        this.themeSubscription = this.themeService.themeChanged$.subscribe(({ isDark }) => {
            const settings = this.signalStore.get("translator-settings");
            if (settings && settings["darkMode"] !== isDark) {
                settings["darkMode"] = isDark;
                this.signalStore.set("translator-settings", settings);
            }
        });
    }
    ngOnDestroy() {
        this.themeSubscription?.unsubscribe();
    }
    onWindowToggleDark(event) {
        const e = event;
        if (e.detail?.isDark !== undefined) {
            this.themeService.setDarkMode(e.detail.isDark);
        }
    }
    async loadSchema() {
        logger.log(`[SchemaShell] loadSchema() starting, appId="${this.appId}", command="${this.commandName}"`);
        this.loading.set(true);
        this.error.set(null);
        try {
            const response = await this.invokeWrapper.invoke(this.commandName, {
                id: this.appId,
            });
            logger.log(`[SchemaShell] invoke("${this.commandName}") response:`, response ? `data.pages=${response?.data?.pages?.length}` : "null");
            // Handle both Response envelope (response.data) and direct schema (response.pages)
            let schema;
            if (response?.data !== undefined) {
                schema = response.data; // Response envelope
            }
            else if (response?.pages) {
                schema = response; // Direct schema (no envelope)
            }
            else {
                logger.error(`[SchemaShell] Unexpected response structure:`, response);
                schema = null;
            }
            if (!schema?.pages?.length) {
                logger.warn(`[SchemaShell] schema has no pages, schema=`, schema);
                this.error.set("Schema not found. Create it in the Designer and sync.");
                return;
            }
            logger.log(`[SchemaShell] setSchema() pages=${schema.pages.length}, loadSchema() pages=${schema.pages.length}`);
            this.schemaRouter.setSchema(schema);
            this.renderer.loadSchema(schema);
            this.renderer.registerFunction("toggleThemeDark", () => {
                this.themeService.toggleDarkMode();
            });
            if (schema.handlers) {
                this.handlerExecutor.setHandlers(schema.handlers);
            }
            this.renderer.registerFunction("reloadSchema", () => void this.loadSchema());
            this.themeService.loadTheme(schema.app?.style ?? this.defaultTheme);
            // Load the variant CSS into <head> so CSS variables and class selectors are available
            const variant = schema.app?.style ?? this.defaultTheme;
            await loadStyleVariant(variant);
            // Re-inject dark mode CSS for the newly loaded variant if dark mode is active
            if (this.themeService.isDarkMode()) {
                this.themeService.setDarkMode(true);
            }
            const route = this.initialRoute || schema.pages[0].route || `/${schema.pages[0].id}`;
            logger.log(`[SchemaShell] navigate("${route}")`);
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
                        logger.warn("[SchemaShell] Primary schema failed, using fallback schema");
                        this.schemaRouter.setSchema(fallbackSchema);
                        this.renderer.loadSchema(fallbackSchema);
                        await this.schemaRouter.navigate("/schema-error");
                        this.loading.set(false);
                        return;
                    }
                }
                catch (fallbackErr) {
                    logger.error("[SchemaShell] Fallback schema also failed:", fallbackErr);
                }
            }
            logger.warn(`[SchemaShell] All schema loading failed, using fallback error schema. Original error: ${originalMessage}`);
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
     * Returns CSS classes for a region container by mapping its props to sf-prefixed classes.
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: SchemaShellComponent, deps: [{ token: InvokeWrapperService }, { token: SchemaRouterService }, { token: SchemaRendererService }, { token: StyleThemeService }, { token: ThemeToggleService }, { token: FallbackService }, { token: HandlerExecutorService }, { token: SignalStoreService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.0.6", type: SchemaShellComponent, isStandalone: true, selector: "lib-schema-shell", inputs: { appId: "appId", commandName: "commandName", defaultTheme: "defaultTheme", initialRoute: "initialRoute", errorFallbackCommandName: "errorFallbackCommandName", includeOverlays: "includeOverlays" }, host: { listeners: { "window:toggle-dark": "onWindowToggleDark($event)" } }, ngImport: i0, template: "@if (loading()) {\n  <div\n    class=\"min-h-screen flex flex-col items-center justify-center gap-4 bg-surface text-on-surface\"\n  >\n    <div\n      class=\"w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin\"\n    ></div>\n    <p class=\"text-lg text-on-surface-variant\">Loading application...</p>\n  </div>\n} @else if (error(); as err) {\n  <div\n    class=\"min-h-screen flex flex-col items-center justify-center p-8 bg-surface text-on-surface\"\n  >\n    <div\n      class=\"w-20 h-20 flex items-center justify-center rounded-full bg-error-container text-error text-4xl mb-4\"\n    >\n      &#9888;\n    </div>\n    <h2 class=\"text-2xl font-bold text-on-surface mb-2\">\n      Application Not Available\n    </h2>\n    <p class=\"text-center text-on-surface-variant max-w-md mb-6\">\n      {{ err }}\n    </p>\n    <button\n      class=\"inline-flex items-center justify-center gap-2 h-10 px-4 rounded-md bg-primary text-on-primary shadow-1 hover:shadow-2 transition-shadow\"\n      (click)=\"retry()\"\n    >\n      Retry\n    </button>\n  </div>\n} @else {\n  <!-- Main scaffold: flex column, full viewport height -->\n  <div class=\"min-h-screen flex flex-col bg-surface text-on-surface\">\n    <!-- Header region - fixed height, flex row -->\n    @if (headerRegion(); as region) {\n      <header\n        data-region=\"header\"\n        class=\"flex-shrink-0 h-16 px-6 flex items-center justify-between border-b border-outline-variant bg-surface-container\"\n      >\n        @for (child of region.children || []; track child.id) {\n          <app-schema-element\n            [element]=\"child\"\n            [elements]=\"region.children || []\"\n          />\n        }\n      </header>\n    }\n\n    <!-- Main content area - flex row that fills remaining space -->\n    <div class=\"flex-1 flex flex-row min-h-0\">\n      <!-- Sidebar left -->\n      @if (sidebarLeftRegion(); as region) {\n        <aside\n          data-region=\"sidebar-left\"\n          class=\"hidden lg:flex w-64 flex-shrink-0 flex-col border-r border-outline-variant bg-surface-container-low p-4\"\n        >\n          @for (child of region.children || []; track child.id) {\n            <app-schema-element\n              [element]=\"child\"\n              [elements]=\"region.children || []\"\n            />\n          }\n        </aside>\n      }\n\n      <!-- Content area with M3 surface container -->\n      <main data-region=\"content\" class=\"flex-1 p-4 md:p-6 min-w-0\">\n        <!-- M3 surface container for content -->\n        <div\n          class=\"h-full rounded-xl bg-surface-container-lowest border border-outline-variant p-6 md:p-8 shadow-1\"\n        >\n          <lib-schema-route-viewer />\n        </div>\n      </main>\n\n      <!-- Sidebar right -->\n      @if (sidebarRightRegion(); as region) {\n        <aside\n          data-region=\"sidebar-right\"\n          class=\"hidden lg:flex w-64 flex-shrink-0 flex-col border-l border-outline-variant bg-surface-container-low p-4\"\n        >\n          @for (child of region.children || []; track child.id) {\n            <app-schema-element\n              [element]=\"child\"\n              [elements]=\"region.children || []\"\n            />\n          }\n        </aside>\n      }\n    </div>\n\n    <!-- Footer region -->\n    @if (footerRegion(); as region) {\n      <footer\n        data-region=\"footer\"\n        class=\"flex-shrink-0 h-12 px-6 flex items-center border-t border-outline-variant bg-surface-container text-on-surface-variant text-sm\"\n      >\n        @for (child of region.children || []; track child.id) {\n          <app-schema-element\n            [element]=\"child\"\n            [elements]=\"region.children || []\"\n          />\n        }\n      </footer>\n    }\n\n    <!-- Bottom nav region -->\n    @if (bottomNavRegion(); as region) {\n      <nav\n        data-region=\"bottom-nav\"\n        class=\"flex-shrink-0 h-16 px-4 flex items-center justify-around border-t border-outline-variant bg-surface-container\"\n      >\n        @for (child of region.children || []; track child.id) {\n          <app-schema-element\n            [element]=\"child\"\n            [elements]=\"region.children || []\"\n          />\n        }\n      </nav>\n    }\n\n    <!-- Other regions (rendered below main layout) -->\n    @for (region of otherRegions(); track region.id) {\n      <div data-region=\"other\" class=\"flex-shrink-0 px-6 py-4\">\n        @for (child of region.children || []; track child.id) {\n          <app-schema-element\n            [element]=\"child\"\n            [elements]=\"region.children || []\"\n          />\n        }\n      </div>\n    }\n\n    <!-- Overlay regions (fixed positioning) -->\n    @for (region of overlayRegions(); track region.id) {\n      <div class=\"layout-overlay\" data-region=\"overlay\">\n        @for (child of region.children || []; track child.id) {\n          <app-schema-element\n            [element]=\"child\"\n            [elements]=\"region.children || []\"\n          />\n        }\n      </div>\n    }\n  </div>\n}\n\n@if (includeOverlays) {\n  <app-toast-container position=\"top-right\" />\n}\n", dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "component", type: SchemaRouteViewerComponent, selector: "lib-schema-route-viewer", inputs: ["route", "showLayoutRegions"] }, { kind: "component", type: SchemaElementComponent, selector: "app-schema-element", inputs: ["element", "elements"] }, { kind: "component", type: ToastContainerComponent, selector: "app-toast-container", inputs: ["position"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: SchemaShellComponent, decorators: [{
            type: Component,
            args: [{ selector: "lib-schema-shell", standalone: true, imports: [
                        CommonModule,
                        SchemaRouteViewerComponent,
                        SchemaElementComponent,
                        ToastContainerComponent,
                    ], schemas: [CUSTOM_ELEMENTS_SCHEMA], template: "@if (loading()) {\n  <div\n    class=\"min-h-screen flex flex-col items-center justify-center gap-4 bg-surface text-on-surface\"\n  >\n    <div\n      class=\"w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin\"\n    ></div>\n    <p class=\"text-lg text-on-surface-variant\">Loading application...</p>\n  </div>\n} @else if (error(); as err) {\n  <div\n    class=\"min-h-screen flex flex-col items-center justify-center p-8 bg-surface text-on-surface\"\n  >\n    <div\n      class=\"w-20 h-20 flex items-center justify-center rounded-full bg-error-container text-error text-4xl mb-4\"\n    >\n      &#9888;\n    </div>\n    <h2 class=\"text-2xl font-bold text-on-surface mb-2\">\n      Application Not Available\n    </h2>\n    <p class=\"text-center text-on-surface-variant max-w-md mb-6\">\n      {{ err }}\n    </p>\n    <button\n      class=\"inline-flex items-center justify-center gap-2 h-10 px-4 rounded-md bg-primary text-on-primary shadow-1 hover:shadow-2 transition-shadow\"\n      (click)=\"retry()\"\n    >\n      Retry\n    </button>\n  </div>\n} @else {\n  <!-- Main scaffold: flex column, full viewport height -->\n  <div class=\"min-h-screen flex flex-col bg-surface text-on-surface\">\n    <!-- Header region - fixed height, flex row -->\n    @if (headerRegion(); as region) {\n      <header\n        data-region=\"header\"\n        class=\"flex-shrink-0 h-16 px-6 flex items-center justify-between border-b border-outline-variant bg-surface-container\"\n      >\n        @for (child of region.children || []; track child.id) {\n          <app-schema-element\n            [element]=\"child\"\n            [elements]=\"region.children || []\"\n          />\n        }\n      </header>\n    }\n\n    <!-- Main content area - flex row that fills remaining space -->\n    <div class=\"flex-1 flex flex-row min-h-0\">\n      <!-- Sidebar left -->\n      @if (sidebarLeftRegion(); as region) {\n        <aside\n          data-region=\"sidebar-left\"\n          class=\"hidden lg:flex w-64 flex-shrink-0 flex-col border-r border-outline-variant bg-surface-container-low p-4\"\n        >\n          @for (child of region.children || []; track child.id) {\n            <app-schema-element\n              [element]=\"child\"\n              [elements]=\"region.children || []\"\n            />\n          }\n        </aside>\n      }\n\n      <!-- Content area with M3 surface container -->\n      <main data-region=\"content\" class=\"flex-1 p-4 md:p-6 min-w-0\">\n        <!-- M3 surface container for content -->\n        <div\n          class=\"h-full rounded-xl bg-surface-container-lowest border border-outline-variant p-6 md:p-8 shadow-1\"\n        >\n          <lib-schema-route-viewer />\n        </div>\n      </main>\n\n      <!-- Sidebar right -->\n      @if (sidebarRightRegion(); as region) {\n        <aside\n          data-region=\"sidebar-right\"\n          class=\"hidden lg:flex w-64 flex-shrink-0 flex-col border-l border-outline-variant bg-surface-container-low p-4\"\n        >\n          @for (child of region.children || []; track child.id) {\n            <app-schema-element\n              [element]=\"child\"\n              [elements]=\"region.children || []\"\n            />\n          }\n        </aside>\n      }\n    </div>\n\n    <!-- Footer region -->\n    @if (footerRegion(); as region) {\n      <footer\n        data-region=\"footer\"\n        class=\"flex-shrink-0 h-12 px-6 flex items-center border-t border-outline-variant bg-surface-container text-on-surface-variant text-sm\"\n      >\n        @for (child of region.children || []; track child.id) {\n          <app-schema-element\n            [element]=\"child\"\n            [elements]=\"region.children || []\"\n          />\n        }\n      </footer>\n    }\n\n    <!-- Bottom nav region -->\n    @if (bottomNavRegion(); as region) {\n      <nav\n        data-region=\"bottom-nav\"\n        class=\"flex-shrink-0 h-16 px-4 flex items-center justify-around border-t border-outline-variant bg-surface-container\"\n      >\n        @for (child of region.children || []; track child.id) {\n          <app-schema-element\n            [element]=\"child\"\n            [elements]=\"region.children || []\"\n          />\n        }\n      </nav>\n    }\n\n    <!-- Other regions (rendered below main layout) -->\n    @for (region of otherRegions(); track region.id) {\n      <div data-region=\"other\" class=\"flex-shrink-0 px-6 py-4\">\n        @for (child of region.children || []; track child.id) {\n          <app-schema-element\n            [element]=\"child\"\n            [elements]=\"region.children || []\"\n          />\n        }\n      </div>\n    }\n\n    <!-- Overlay regions (fixed positioning) -->\n    @for (region of overlayRegions(); track region.id) {\n      <div class=\"layout-overlay\" data-region=\"overlay\">\n        @for (child of region.children || []; track child.id) {\n          <app-schema-element\n            [element]=\"child\"\n            [elements]=\"region.children || []\"\n          />\n        }\n      </div>\n    }\n  </div>\n}\n\n@if (includeOverlays) {\n  <app-toast-container position=\"top-right\" />\n}\n" }]
        }], ctorParameters: () => [{ type: InvokeWrapperService }, { type: SchemaRouterService }, { type: SchemaRendererService }, { type: StyleThemeService }, { type: ThemeToggleService }, { type: FallbackService }, { type: HandlerExecutorService }, { type: SignalStoreService }], propDecorators: { appId: [{
                type: Input
            }], commandName: [{
                type: Input
            }], defaultTheme: [{
                type: Input
            }], initialRoute: [{
                type: Input
            }], errorFallbackCommandName: [{
                type: Input
            }], includeOverlays: [{
                type: Input
            }], onWindowToggleDark: [{
                type: HostListener,
                args: ["window:toggle-dark", ["$event"]]
            }] } });

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

const DEFAULT_RETRY_CONFIG = {
    maxAttempts: 3,
    initialDelayMs: 1000,
    maxDelayMs: 30000,
};
const MAX_ERROR_LOG_ENTRIES = 100;
class ErrorHandlerService {
    toastService;
    errorLogSignal = signal([], /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "errorLogSignal" }] : /* istanbul ignore next */ []));
    onlineSignal = signal(navigator.onLine, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "onlineSignal" }] : /* istanbul ignore next */ []));
    retryCounter = 0;
    errorLog = computed(() => this.errorLogSignal(), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "errorLog" }] : /* istanbul ignore next */ []));
    isOnline = computed(() => this.onlineSignal(), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "isOnline" }] : /* istanbul ignore next */ []));
    errorCount = computed(() => this.errorLogSignal().filter((e) => !e.dismissed).length, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "errorCount" }] : /* istanbul ignore next */ []));
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: ErrorHandlerService, deps: [{ token: ToastService }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: ErrorHandlerService, providedIn: "root" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: ErrorHandlerService, decorators: [{
            type: Injectable,
            args: [{ providedIn: "root" }]
        }], ctorParameters: () => [{ type: ToastService }] });

class ApiException extends Error {
    code;
    details;
    constructor(message, code, details) {
        super(message);
        this.code = code;
        this.details = details;
        this.name = "ApiException";
    }
}

class SignalLoggerService {
    _entries = signal([], /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "_entries" }] : /* istanbul ignore next */ []));
    _minLevel = signal("info", /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "_minLevel" }] : /* istanbul ignore next */ []));
    _maxEntries = signal(1000, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "_maxEntries" }] : /* istanbul ignore next */ []));
    entries = computed(() => this._entries(), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "entries" }] : /* istanbul ignore next */ []));
    filteredEntries = computed(() => {
        const level = this._minLevel();
        const levels = ["debug", "info", "warn", "error"];
        const minIndex = levels.indexOf(level);
        return this._entries().filter((e) => levels.indexOf(e.level) >= minIndex);
    }, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "filteredEntries" }] : /* istanbul ignore next */ []));
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
        catch {
            this.error("Failed to import log entries from JSON");
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: SignalLoggerService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: SignalLoggerService, providedIn: "root" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: SignalLoggerService, decorators: [{
            type: Injectable,
            args: [{ providedIn: "root" }]
        }] });

class SignalSyncService {
    http = inject(HttpClient);
    _syncStatus = signal("idle", /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "_syncStatus" }] : /* istanbul ignore next */ []));
    _lastSyncTime = signal(null, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "_lastSyncTime" }] : /* istanbul ignore next */ []));
    _pendingChanges = signal(0, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "_pendingChanges" }] : /* istanbul ignore next */ []));
    _syncEndpoint = signal("", /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "_syncEndpoint" }] : /* istanbul ignore next */ []));
    syncStatus = computed(() => this._syncStatus(), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "syncStatus" }] : /* istanbul ignore next */ []));
    lastSyncTime = computed(() => this._lastSyncTime(), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "lastSyncTime" }] : /* istanbul ignore next */ []));
    pendingChanges = computed(() => this._pendingChanges(), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "pendingChanges" }] : /* istanbul ignore next */ []));
    syncEndpoint = computed(() => this._syncEndpoint(), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "syncEndpoint" }] : /* istanbul ignore next */ []));
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
                .post(`${endpoint}/sync`, { timestamp: new Date().toISOString() })
                .toPromise();
        }
        catch (error) {
            console.error("Sync failed:", error);
            throw error;
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: SignalSyncService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: SignalSyncService, providedIn: "root" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: SignalSyncService, decorators: [{
            type: Injectable,
            args: [{ providedIn: "root" }]
        }] });

class StorageService {
}

class LocalStorageService {
    prefix = "";
    /**
     * Configure a prefix for namespacing keys.
     * Call before using get/set/remove/has with prefixed keys.
     */
    setPrefix(prefix) {
        this.prefix = prefix;
    }
    makeKey(key) {
        return `${this.prefix}${key}`;
    }
    get(key, defaultValue, validator) {
        const item = localStorage.getItem(this.makeKey(key));
        if (!item)
            return defaultValue ?? null;
        try {
            const parsed = JSON.parse(item);
            if (validator && validator(parsed)) {
                return parsed;
            }
            if (!validator) {
                return parsed;
            }
            return defaultValue ?? null;
        }
        catch {
            return defaultValue ?? null;
        }
    }
    set(key, value) {
        localStorage.setItem(this.makeKey(key), JSON.stringify(value));
    }
    remove(key) {
        localStorage.removeItem(this.makeKey(key));
    }
    clear() {
        if (!this.prefix) {
            localStorage.clear();
        }
        else {
            const keysToRemove = [];
            for (let i = 0; i < localStorage.length; i++) {
                const k = localStorage.key(i);
                if (k?.startsWith(this.prefix)) {
                    keysToRemove.push(k);
                }
            }
            keysToRemove.forEach((k) => localStorage.removeItem(k));
        }
    }
    keys() {
        if (!this.prefix) {
            return Object.keys(localStorage);
        }
        const result = [];
        for (let i = 0; i < localStorage.length; i++) {
            const k = localStorage.key(i);
            if (k?.startsWith(this.prefix)) {
                result.push(k.substring(this.prefix.length));
            }
        }
        return result;
    }
    has(key) {
        return localStorage.getItem(this.makeKey(key)) !== null;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: LocalStorageService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: LocalStorageService, providedIn: "root" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: LocalStorageService, decorators: [{
            type: Injectable,
            args: [{ providedIn: "root" }]
        }] });

class IndexedDbService {
    dbName;
    storeName;
    db = null;
    constructor() {
        this.dbName = "tauri-app-db";
        this.storeName = "key-value-store";
        this.initDb();
    }
    initDb() {
        if (typeof indexedDB === "undefined")
            return;
        const request = indexedDB.open(this.dbName, 1);
        request.onerror = () => {
            console.error("IndexedDB error:", request.error);
        };
        request.onupgradeneeded = () => {
            const db = request.result;
            if (!db.objectStoreNames.contains(this.storeName)) {
                db.createObjectStore(this.storeName, { keyPath: "key" });
            }
        };
        this.db = request.result;
    }
    getStore() {
        if (!this.db)
            return null;
        const transaction = this.db.transaction(this.storeName, "readwrite");
        return transaction.objectStore(this.storeName);
    }
    get(key) {
        if (typeof indexedDB === "undefined")
            return null;
        const store = this.getStore();
        if (!store)
            return null;
        const request = store.get(key);
        return new Promise((resolve) => {
            request.onsuccess = () => {
                resolve(request.result?.value ?? null);
            };
            request.onerror = () => {
                resolve(null);
            };
        });
    }
    set(key, value) {
        if (typeof indexedDB === "undefined")
            return;
        const store = this.getStore();
        if (!store)
            return;
        store.put({ key, value });
    }
    remove(key) {
        if (typeof indexedDB === "undefined")
            return;
        const store = this.getStore();
        if (!store)
            return;
        store.delete(key);
    }
    clear() {
        if (typeof indexedDB === "undefined")
            return;
        const store = this.getStore();
        if (!store)
            return;
        store.clear();
    }
    keys() {
        return [];
    }
    async keysAsync() {
        if (typeof indexedDB === "undefined")
            return [];
        const store = this.getStore();
        if (!store)
            return [];
        return new Promise((resolve) => {
            const request = store.getAllKeys();
            request.onsuccess = () => {
                resolve(request.result);
            };
            request.onerror = () => {
                resolve([]);
            };
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: IndexedDbService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: IndexedDbService, providedIn: "root" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: IndexedDbService, decorators: [{
            type: Injectable,
            args: [{ providedIn: "root" }]
        }], ctorParameters: () => [] });

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
    /** Creates an Angular-signal-compatible callable for a store key */
    signal(key, initialValue) {
        if (!this.store.has(key)) {
            this.store.set(key, initialValue);
        }
        const self = this;
        const fn = function () {
            return self.get(key);
        };
        fn.set = function (value) {
            self.set(key, value);
        };
        fn.update = function (updater) {
            self.update(key, updater);
        };
        return fn;
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

const DEFAULT_CACHE_TTL_MS = 5 * 60 * 1000;
const MAX_CACHE_SIZE = 100;
class StorageCacheService {
    shared;
    namespace;
    defaultTtl = DEFAULT_CACHE_TTL_MS;
    cacheInvalidated = signal(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "cacheInvalidated" }] : /* istanbul ignore next */ []));
    constructor() {
        this.shared = {
            cache: new Map(),
            reactiveCache: new Map(),
            cacheTimestamps: new Map(),
            inFlightRequests: new Map(),
        };
        this.namespace = "";
    }
    ns(key) {
        return this.namespace ? `${this.namespace}:${key}` : key;
    }
    // ─── Basic TTL cache ────────────────────────────────────────────────
    get(key) {
        const k = this.ns(key);
        const entry = this.shared.cache.get(k);
        if (!entry)
            return null;
        if (entry.ttl && Date.now() - entry.timestamp > entry.ttl) {
            this.shared.cache.delete(k);
            return null;
        }
        return entry.value;
    }
    set(key, value, ttl) {
        const k = this.ns(key);
        this.shared.cache.set(k, {
            value,
            timestamp: Date.now(),
            ttl: ttl ?? this.defaultTtl,
        });
    }
    setDefaultTtl(ttl) {
        this.defaultTtl = ttl;
    }
    invalidate(key) {
        this.shared.cache.delete(this.ns(key));
    }
    invalidateAll() {
        if (this.namespace) {
            const prefix = `${this.namespace}:`;
            for (const key of this.shared.cache.keys()) {
                if (key.startsWith(prefix))
                    this.shared.cache.delete(key);
            }
        }
        else {
            this.shared.cache.clear();
        }
    }
    has(key) {
        const k = this.ns(key);
        const entry = this.shared.cache.get(k);
        if (!entry)
            return false;
        if (entry.ttl && Date.now() - entry.timestamp > entry.ttl) {
            this.shared.cache.delete(k);
            return false;
        }
        return true;
    }
    delete(key) {
        this.shared.cache.delete(this.ns(key));
    }
    clear() {
        if (this.namespace) {
            const prefix = `${this.namespace}:`;
            for (const key of this.shared.cache.keys()) {
                if (key.startsWith(prefix))
                    this.shared.cache.delete(key);
            }
        }
        else {
            this.shared.cache.clear();
        }
    }
    clearPattern(pattern) {
        const nsPrefix = this.namespace ? `^${this.namespace}:` : "";
        const regex = new RegExp(nsPrefix + pattern);
        for (const key of this.shared.cache.keys()) {
            if (regex.test(key)) {
                this.shared.cache.delete(key);
            }
        }
    }
    // ─── Reactive cache ──────────────────────────────────────────────────
    hasCachedData(key) {
        return this.shared.reactiveCache.has(this.ns(key));
    }
    getReactiveCache(key) {
        return this.shared.reactiveCache.get(this.ns(key));
    }
    setReactiveCache(key, value) {
        this.shared.reactiveCache.set(this.ns(key), value);
    }
    // ─── Timestamp tracking ─────────────────────────────────────────────
    getCacheTimestamp(key) {
        return this.shared.cacheTimestamps.get(this.ns(key));
    }
    setCacheTimestamp(key, timestamp) {
        this.shared.cacheTimestamps.set(this.ns(key), timestamp);
    }
    isCacheValid(key, ttlMs = DEFAULT_CACHE_TTL_MS) {
        const timestamp = this.shared.cacheTimestamps.get(this.ns(key));
        if (!timestamp)
            return false;
        return Date.now() - timestamp < ttlMs;
    }
    // ─── Cache size management ──────────────────────────────────────────
    isCacheFull() {
        return this.shared.reactiveCache.size >= MAX_CACHE_SIZE;
    }
    evictOldestCache() {
        const entries = Array.from(this.shared.cacheTimestamps.entries());
        const nsPrefix = this.namespace ? `${this.namespace}:` : "";
        const filtered = nsPrefix
            ? entries.filter(([key]) => key.startsWith(nsPrefix))
            : entries;
        const sortedKeys = filtered
            .sort((a, b) => a[1] - b[1])
            .slice(0, 10)
            .map(([key]) => key);
        for (const key of sortedKeys) {
            this.shared.reactiveCache.delete(key);
            this.shared.cacheTimestamps.delete(key);
        }
    }
    // ─── Invalidation ───────────────────────────────────────────────────
    invalidateCache() {
        if (this.namespace) {
            const prefix = `${this.namespace}:`;
            for (const key of this.shared.reactiveCache.keys()) {
                if (key.startsWith(prefix))
                    this.shared.reactiveCache.delete(key);
            }
            for (const key of this.shared.cacheTimestamps.keys()) {
                if (key.startsWith(prefix))
                    this.shared.cacheTimestamps.delete(key);
            }
        }
        else {
            this.shared.reactiveCache.clear();
            this.shared.cacheTimestamps.clear();
        }
        this.cacheInvalidated.set(true);
        setTimeout(() => this.cacheInvalidated.set(false), 0);
    }
    clearAll() {
        if (this.namespace) {
            const prefix = `${this.namespace}:`;
            for (const key of this.shared.reactiveCache.keys()) {
                if (key.startsWith(prefix))
                    this.shared.reactiveCache.delete(key);
            }
            for (const key of this.shared.cacheTimestamps.keys()) {
                if (key.startsWith(prefix))
                    this.shared.cacheTimestamps.delete(key);
            }
        }
        else {
            this.shared.reactiveCache.clear();
            this.shared.cacheTimestamps.clear();
        }
        this.cacheInvalidated.set(true);
        setTimeout(() => this.cacheInvalidated.set(false), 0);
    }
    // ─── Request deduplication ───────────────────────────────────────────
    getOrFetch(key, fetchFn) {
        const k = this.ns(key);
        const existing = this.shared.inFlightRequests.get(k);
        if (existing)
            return existing;
        const requestPromise = (async () => {
            try {
                const result = await fetchFn();
                this.setCacheTimestamp(key, Date.now());
                return result;
            }
            finally {
                this.shared.inFlightRequests.delete(k);
            }
        })();
        this.shared.inFlightRequests.set(k, requestPromise);
        return requestPromise;
    }
    hasInFlightRequest(key) {
        return this.shared.inFlightRequests.has(this.ns(key));
    }
    getInFlightRequest(key) {
        return this.shared.inFlightRequests.get(this.ns(key));
    }
    // ─── Sub-cache namespacing ───────────────────────────────────────────
    /**
     * Returns a sub-cache that shares the same underlying storage as this cache
     * but isolates keys under the given namespace.
     *
     * Usage:
     *   const tasksCache = cache.getSubCache('tasks');
     *   const chatsCache = cache.getSubCache('chats');
     *   tasksCache.set('todo:1', data);   // stored as 'tasks:todo:1'
     *   chatsCache.set('msg:1', data);    // stored as 'chats:msg:1'
     */
    getSubCache(name) {
        const subNamespace = this.namespace ? `${this.namespace}:${name}` : name;
        const sub = new StorageCacheService();
        sub.shared = this.shared;
        sub.namespace = subNamespace;
        return sub;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: StorageCacheService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: StorageCacheService, providedIn: "root" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: StorageCacheService, decorators: [{
            type: Injectable,
            args: [{ providedIn: "root" }]
        }], ctorParameters: () => [] });

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

/**
 * Unified CRUD service that maps to Rust define_crud_routes! commands.
 *
 * Naming convention: entity "connection" → Rust command `connection_get`, `connection_get_all`, etc.
 * Custom commands: call `.custom('my_command', { arg: value })` for app-specific Tauri commands.
 */
class ApiCrudService {
    invoke = inject(InvokeWrapperService);
    /** Get a single entity by ID — calls `{entity}_get` */
    async get(entity, id, options) {
        return this.invoke.invoke(`${entity}_get`, { id }, options);
    }
    /** Get all entities with optional filtering/pagination — calls `{entity}_get_all` */
    async getAll(entity, filter, skip, limit, sortBy, sortAsc) {
        return this.invoke.invoke(`${entity}_get_all`, {
            filter,
            skip,
            limit,
            sort_by: sortBy,
            sort_asc: sortAsc,
        });
    }
    /** Create a new entity — calls `{entity}_create` */
    async create(entity, data) {
        return this.invoke.invoke(`${entity}_create`, { data });
    }
    /** Full update of an entity — calls `{entity}_update` */
    async update(entity, id, data) {
        return this.invoke.invoke(`${entity}_update`, { id, data });
    }
    /** Partial update of an entity — calls `{entity}_patch` */
    async patch(entity, id, patch) {
        return this.invoke.invoke(`${entity}_patch`, { id, patch });
    }
    /** Delete an entity — calls `{entity}_delete` */
    async delete(entity, id) {
        return this.invoke.invoke(`${entity}_delete`, { id });
    }
    /**
     * Call any custom Tauri command not covered by standard CRUD.
     * Use for app-specific commands that don't follow the `{entity}_{operation}` pattern.
     */
    async custom(command, args) {
        return this.invoke.invoke(command, args);
    }
    // Retry variants for unreliable operations
    /** Get with automatic retry on failure */
    async getWithRetry(entity, id, retryOptions) {
        return invokeWithRetry(() => this.invoke.invoke(`${entity}_get`, { id }), retryOptions ?? {
            maxAttempts: 3,
            initialDelayMs: 1000,
            maxDelayMs: 30000,
        });
    }
    /** Custom command with automatic retry on failure */
    async customWithRetry(command, args, retryOptions) {
        return invokeWithRetry(() => this.invoke.invoke(command, args), retryOptions ?? {
            maxAttempts: 3,
            initialDelayMs: 1000,
            maxDelayMs: 30000,
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: ApiCrudService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: ApiCrudService, providedIn: "root" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: ApiCrudService, decorators: [{
            type: Injectable,
            args: [{ providedIn: "root" }]
        }] });

class SchemaSetupService {
    invokeWrapper = inject(InvokeWrapperService);
    schemaRouter = inject(SchemaRouterService);
    renderer = inject(SchemaRendererService);
    themeService = inject(StyleThemeService);
    fallbackService = inject(FallbackService);
    handlerExecutor = inject(HandlerExecutorService);
    router = null;
    schemaLoaded = signal(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "schemaLoaded" }] : /* istanbul ignore next */ []));
    setupError = signal(null, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "setupError" }] : /* istanbul ignore next */ []));
    /**
     * Complete schema setup: load, validate, register, navigate.
     * This replaces per-app schema loading boilerplate.
     */
    async setup(appId, options) {
        this.schemaLoaded.set(false);
        this.setupError.set(null);
        this.handlerExecutor.setRouter(this.schemaRouter);
        const commandName = options?.commandName ?? "get_ui_schema";
        const themeVariant = options?.themeVariant ?? "material-design-v3";
        try {
            this.themeService.loadTheme(themeVariant);
            const schema = await this.loadSchema(appId, commandName, options);
            if (!schema)
                return null;
            this.registerFunctions(options);
            this.applyTheme(schema, themeVariant, options);
            const route = options?.initialRoute ||
                schema.pages?.[0]?.route ||
                `/${schema.pages?.[0]?.id || ""}`;
            logger.log(`[SchemaSetup] navigating to "${route}"`);
            await this.schemaRouter.navigate(route);
            if (options?.autoRegisterRoutes === true) {
                this.registerRouter();
            }
            options?.onSchemaLoaded?.(schema);
            this.schemaLoaded.set(true);
            return schema;
        }
        catch (err) {
            const message = err instanceof Error ? err.message : String(err);
            this.setupError.set(message);
            options?.onError?.(err instanceof Error ? err : new Error(message));
            if (options?.errorFallbackCommandName) {
                return this.tryFallback(appId, options);
            }
            return null;
        }
    }
    /**
     * Set the Angular Router instance for route registration.
     * Called automatically if Router is available via DI.
     */
    setRouter(router) {
        this.router = router;
    }
    /**
     * Register all schema pages as Angular Routes pointing to SchemaRouteViewerComponent.
     * Must be called AFTER schema is loaded.
     */
    registerRouter() {
        const activeRouter = this.router ?? inject(Router, { optional: true });
        if (!activeRouter) {
            logger.warn("[SchemaSetup] Router not available for route registration");
            return;
        }
        const routes = this.toAngularRoutes();
        if (routes.length === 0)
            return;
        logger.log(`[SchemaSetup] registering ${routes.length} Angular routes from schema`);
        activeRouter.resetConfig(routes);
    }
    /**
     * Convert all schema pages to Angular Routes.
     * Each route points to SchemaRouteViewerComponent with page data in route data.
     */
    toAngularRoutes() {
        const pages = this.schemaRouter.getAllPages();
        if (pages.length === 0)
            return [];
        const routes = pages.map((page) => {
            const path = page.route?.replace(/^\//, "") || page.id;
            const paramPath = path.replace(/:(\w+)/g, (_, param) => `:${param}`);
            return {
                path: paramPath,
                component: SchemaRouteViewerComponent,
                data: { pageId: page.id, page },
            };
        });
        const firstPage = pages[0];
        const firstPath = firstPage?.route?.replace(/^\//, "") || firstPage?.id || "";
        routes.push({ path: "", redirectTo: firstPath, pathMatch: "full" });
        routes.push({ path: "**", redirectTo: firstPath });
        return routes;
    }
    async loadSchema(appId, commandName, _options) {
        const response = await this.invokeWrapper.invoke(commandName, {
            id: appId,
        });
        logger.log(`[SchemaSetup] invoke("${commandName}") response:`, response ? `pages=${response?.data?.pages?.length}` : "null");
        const schema = response?.data ?? response;
        if (!schema?.pages?.length) {
            this.setupError.set("Schema has no pages. Create it in Designer and sync.");
            return null;
        }
        this.schemaRouter.setSchema(schema);
        this.renderer.loadSchema(schema);
        if (schema.handlers) {
            this.handlerExecutor.setHandlers(schema.handlers);
        }
        return schema;
    }
    async tryFallback(appId, options) {
        try {
            const fallbackResponse = await this.invokeWrapper.invoke(options.errorFallbackCommandName, { id: appId });
            const fallbackSchema = fallbackResponse?.data ?? fallbackResponse;
            if (fallbackSchema?.pages?.length) {
                logger.warn("[SchemaSetup] Primary schema failed, using fallback schema");
                this.schemaRouter.setSchema(fallbackSchema);
                this.renderer.loadSchema(fallbackSchema);
                await this.schemaRouter.navigate("/schema-error");
                this.schemaLoaded.set(true);
                return fallbackSchema;
            }
        }
        catch (fallbackErr) {
            logger.error("[SchemaSetup] Fallback schema also failed:", fallbackErr);
        }
        logger.warn("[SchemaSetup] All schema loading failed, using fallback error schema");
        const fallbackSchema = this.fallbackService.getFallbackSchema(this.setupError() ?? "Unknown error");
        this.schemaRouter.setSchema(fallbackSchema);
        this.renderer.loadSchema(fallbackSchema);
        await this.schemaRouter.navigate("/schema-error");
        this.schemaLoaded.set(true);
        return fallbackSchema;
    }
    registerFunctions(options) {
        this.renderer.registerFunction("toggleThemeDark", () => {
            this.themeService.toggleDarkMode();
        });
        this.renderer.registerFunction("reloadSchema", () => {
            this.setupError.set(null);
        });
        if (options?.handlers) {
            this.handlerExecutor.setHandlers(options.handlers);
        }
    }
    applyTheme(schema, defaultVariant, _options) {
        const variant = schema.app?.style ?? defaultVariant;
        this.themeService.loadTheme(variant);
        loadStyleVariant(variant).then(() => {
            if (this.themeService.isDarkMode()) {
                this.themeService.setDarkMode(true);
            }
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: SchemaSetupService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: SchemaSetupService, providedIn: "root" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: SchemaSetupService, decorators: [{
            type: Injectable,
            args: [{ providedIn: "root" }]
        }] });

const DEFAULT_CONFIG = {
    enableAnimations: false,
    enableHttpClient: false,
    enableBrowserErrorListeners: true,
    enableZoneChangeDetection: true,
};
/**
 * Standardized Angular providers for all Tauri apps.
 *
 * Usage:
 * ```typescript
 * export const appConfig: ApplicationConfig = {
 *   providers: [
 *     ...provideUnifiedApp({ appId: 'my-app' }),
 *     // App-specific providers only
 *   ],
 * };
 * ```
 */
function provideUnifiedApp(config) {
    const cfg = { ...DEFAULT_CONFIG, ...config };
    const providers = [];
    if (cfg.enableBrowserErrorListeners) {
        providers.push(provideBrowserGlobalErrorListeners());
    }
    if (cfg.enableAnimations) {
        providers.push(provideAnimationsAsync());
    }
    if (cfg.enableHttpClient) {
        providers.push(provideHttpClient());
    }
    if (cfg.enableZoneChangeDetection) {
        providers.push(provideZoneChangeDetection({ eventCoalescing: true }));
    }
    if (cfg.extraProviders?.length) {
        providers.push(...cfg.extraProviders);
    }
    return providers;
}

// Note: Response.data uses T | null (not Option<T>).
// Rust's Option<T> serializes as null in JSON for None values,
// which TypeScript correctly interprets as T | null.
// This avoids breaking changes for TypeScript consumers.
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
    ResponseStatus["Info"] = "info";
    ResponseStatus["Warning"] = "warning";
    ResponseStatus["Duplicate"] = "duplicate";
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
function getErrorMessage$1(response) {
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
                message: String(e["message"]),
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

function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}
function lerp(start, end, t) {
    return start + (end - start) * t;
}
function isClose(pos1, pos2, threshold) {
    const dx = pos1.x - pos2.x;
    const dz = pos1.z - pos2.z;
    return dx * dx + dz * dz < threshold * threshold;
}
function calculateDistance3D(pos1, pos2) {
    const dx = pos1.x - pos2.x;
    const dy = pos1.y - pos2.y;
    const dz = pos1.z - pos2.z;
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
}
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function randomChoice(array) {
    return array[Math.floor(Math.random() * array.length)];
}
function randomRange(min, max) {
    return Math.random() * (max - min) + min;
}
function easeOutQuad(t) {
    return t * (2 - t);
}
function easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}
function formatTime$1(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}
function randomInterval(min, max) {
    return Math.floor(randomRange(min, max));
}
function weightedRandom(items) {
    const totalWeight = items.reduce((sum, i) => sum + i.weight, 0);
    let random = Math.random() * totalWeight;
    for (const { item, weight } of items) {
        random -= weight;
        if (random <= 0) {
            return item;
        }
    }
    return items[items.length - 1].item;
}
function randomPitchVariation(variation) {
    return 1 + (Math.random() - 0.5) * variation;
}
function generatePeerId() {
    return Math.floor(Math.random() * 1000000);
}
function lerpVector3D(a, b, t) {
    return [
        a[0] + (b[0] - a[0]) * t,
        a[1] + (b[1] - a[1]) * t,
        a[2] + (b[2] - a[2]) * t,
    ];
}
function lerpAngle(a, b, t) {
    let diff = b - a;
    while (diff > Math.PI)
        diff -= 2 * Math.PI;
    while (diff < -Math.PI)
        diff += 2 * Math.PI;
    return a + diff * t;
}

function truncate(str, maxLength, suffix = "…") {
    if (str.length <= maxLength)
        return str;
    return str.slice(0, maxLength - suffix.length) + suffix;
}
function capitalize(str) {
    if (!str)
        return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
}
function slugify(str) {
    return str
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

function convertLocalToUtc(date) {
    return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
}
function convertUtcToLocal(date, timezone) {
    const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone: timezone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
    });
    const parts = formatter.formatToParts(date);
    const values = {};
    for (const part of parts) {
        values[part.type] = part.value;
    }
    return new Date(parseInt(values["year"]), parseInt(values["month"]) - 1, parseInt(values["day"]), parseInt(values["hour"]), parseInt(values["minute"]), parseInt(values["second"]));
}
function normalizeDateFields(obj, dateFieldNames = ["start_date", "end_date"]) {
    const normalizedValue = { ...obj };
    for (const fieldName of dateFieldNames) {
        if (fieldName in normalizedValue) {
            const fieldValue = normalizedValue[fieldName];
            if (fieldValue === null || fieldValue === undefined) {
                normalizedValue[fieldName] = "";
            }
        }
    }
    return normalizedValue;
}
function formatDateRelative(date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const curDate = new Date();
    const curYear = curDate.getFullYear();
    const curMonth = curDate.getMonth();
    const curDay = curDate.getDate();
    if (day === curDay && month === curMonth && year === curYear) {
        return formatTime(date);
    }
    const yesterday = new Date(curDate);
    yesterday.setDate(curDate.getDate() - 1);
    if (day === yesterday.getDate() &&
        month === yesterday.getMonth() &&
        year === yesterday.getFullYear()) {
        return `Yesterday ${formatTime(date)}`;
    }
    return formatLocaleDate(date);
}
function formatTime(date) {
    if (typeof date === "string") {
        date = new Date(date);
    }
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
}
function formatLocaleDate(date) {
    if (typeof date === "string" && date === "") {
        date = new Date();
    }
    if (typeof date === "string") {
        date = new Date(date);
    }
    return date.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
}
function generateCalendarDays(year, month) {
    const firstDay = new Date(year, month, 1);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    const days = [];
    for (let i = 0; i < 42; i++) {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + i);
        days.push(new Date(date));
    }
    return days;
}
function isSameDay(date1, date2) {
    return date1.toDateString() === date2.toDateString();
}
/**
 * Compare two entities by their created_at timestamp (descending - newest first)
 */
function compareByTimestamp(a, b) {
    const aTime = getLatestTimestamp(a);
    const bTime = getLatestTimestamp(b);
    return bTime - aTime;
}
/**
 * Get the latest timestamp from created_at/updated_at
 */
function getLatestTimestamp(entity) {
    const created = entity.created_at ? new Date(entity.created_at).getTime() : 0;
    const updated = entity.updated_at ? new Date(entity.updated_at).getTime() : 0;
    return Math.max(created, updated);
}

function findById(items, id) {
    return items.find((item) => item.id === id);
}
function findByIdOrThrow(items, id) {
    const item = items.find((item) => item.id === id);
    if (!item)
        throw new Error(`Item ${id} not found`);
    return item;
}
function upsertEntity(items, entity) {
    const index = items.findIndex((item) => item.id === entity.id);
    if (index >= 0) {
        const updated = [...items];
        updated[index] = entity;
        return updated;
    }
    return [...items, entity];
}
function deduplicateById(items, options) {
    const seen = new Set();
    const source = options?.filterDeleted
        ? items.filter((item) => !item.deleted_at)
        : items;
    return source.filter((item) => {
        if (seen.has(item.id))
            return false;
        seen.add(item.id);
        return true;
    });
}
function groupByField(items, field) {
    return items.reduce((groups, item) => {
        const key = String(item[field]);
        if (!groups[key])
            groups[key] = [];
        groups[key].push(item);
        return groups;
    }, {});
}

function trackByRow(index, row) {
    return String(row["_id"] || row["id"] || index);
}
function trackByIndex(index) {
    return index;
}
/**
 * Group entities by a key function, returning Map
 */
function groupByKey(entities, keyFn) {
    const map = new Map();
    for (const entity of entities) {
        const key = keyFn(entity);
        const list = map.get(key) || [];
        list.push(entity);
        map.set(key, list);
    }
    return map;
}

function evictLRU(cache, maxSize) {
    if (cache.size <= maxSize)
        return cache;
    const sorted = Array.from(cache.entries()).sort((a, b) => a[1].lastAccessed - b[1].lastAccessed);
    const toRemove = sorted.slice(0, cache.size - maxSize);
    const newCache = new Map(cache);
    for (const [key] of toRemove) {
        newCache.delete(key);
    }
    return newCache;
}
function evictLRUInPlace(map, maxSize) {
    if (map.size <= maxSize)
        return;
    const entries = Array.from(map.entries());
    entries.sort((a, b) => a[1].lastAccessed - b[1].lastAccessed);
    const toEvict = entries.slice(0, map.size - maxSize);
    for (const [evictKey] of toEvict) {
        map.delete(evictKey);
    }
}
function isStale(timestamp, ttlMs) {
    return Date.now() - timestamp > ttlMs;
}

function generateId(prefix) {
    const id = crypto.randomUUID();
    return prefix ? `${prefix}_${id}` : id;
}
const generateTransactionId = () => generateId("tx");
const generateBatchId = () => generateId("batch");
const generateLogId = () => generateId("log");
const generateQueryId = () => generateId("query");
const generateTabId = () => generateId("tab");

function formatBytes(bytes) {
    if (bytes === 0)
        return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
}
function formatCompactNumber(num) {
    if (num >= 1_000_000)
        return (num / 1_000_000).toFixed(1) + "M";
    if (num >= 1_000)
        return (num / 1_000).toFixed(1) + "K";
    return num.toString();
}

function isNullOrUndefined(value) {
    return value === null || value === undefined;
}
function isPresent(value) {
    return value !== null && value !== undefined;
}
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
function isValidBase64Image(data) {
    if (!data.startsWith("data:image/"))
        return false;
    const parts = data.split(",");
    if (parts.length !== 2)
        return false;
    const mimePart = parts[0];
    const base64Part = parts[1];
    const mimeMatch = mimePart.match(/^data:image\/(\w+);base64$/);
    if (!mimeMatch)
        return false;
    const validMimes = ["png", "jpeg", "gif", "webp", "svg+xml", "bmp"];
    if (!validMimes.includes(mimeMatch[1]))
        return false;
    try {
        atob(base64Part);
        return true;
    }
    catch {
        return false;
    }
}

function escapeSqlValue(value) {
    if (value === null || value === undefined)
        return "NULL";
    if (typeof value === "number")
        return String(value);
    if (typeof value === "boolean")
        return value ? "1" : "0";
    return `'${String(value).replace(/'/g, "''")}'`;
}
function escapeCsvValue(value) {
    if (value === null || value === undefined)
        return "";
    const str = String(value);
    if (str.includes(",") || str.includes('"') || str.includes("\n")) {
        return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
}

function deepClone(obj) {
    if (obj === null || typeof obj !== "object")
        return obj;
    if (obj instanceof Date)
        return new Date(obj.getTime());
    if (obj instanceof Array)
        return obj.map((item) => deepClone(item));
    if (obj instanceof Map) {
        const cloned = new Map();
        obj.forEach((value, key) => cloned.set(key, deepClone(value)));
        return cloned;
    }
    if (obj instanceof Set) {
        const cloned = new Set();
        obj.forEach((value) => cloned.add(deepClone(value)));
        return cloned;
    }
    const cloned = {};
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            cloned[key] = deepClone(obj[key]);
        }
    }
    return cloned;
}
function getNestedValue$1(obj, path) {
    if (!path)
        return obj;
    const parts = path.split(".");
    let current = obj;
    for (const part of parts) {
        if (current === null || current === undefined)
            return undefined;
        if (typeof current !== "object")
            return undefined;
        current = current[part];
    }
    return current;
}
function applyUpdate(target, update) {
    return { ...target, ...update };
}

function debounce(fn, delayMs) {
    let timeoutId = null;
    return (...args) => {
        if (timeoutId)
            clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            fn(...args);
            timeoutId = null;
        }, delayMs);
    };
}
function throttle(fn, delayMs) {
    let lastCall = 0;
    return (...args) => {
        const now = Date.now();
        if (now - lastCall >= delayMs) {
            lastCall = now;
            fn(...args);
        }
    };
}
function withLoading(fn, setLoading) {
    return async (...args) => {
        try {
            setLoading(true);
            return await fn(...args);
        }
        finally {
            setLoading(false);
        }
    };
}

function createState(initialValue) {
    const subject = new BehaviorSubject(initialValue);
    const signalFn = () => subject.getValue();
    signalFn.set = (value) => subject.next(value);
    signalFn.update = (fn) => subject.next(fn(subject.getValue()));
    return signalFn;
}
function createStateSubject(initialValue) {
    const subject = new BehaviorSubject(initialValue);
    return {
        state$: subject.asObservable(),
        set: (value) => subject.next(value),
        update: (fn) => subject.next(fn(subject.getValue())),
    };
}
function createDerivedState(state$, derive) {
    return state$.pipe(map((state) => derive(state)), distinctUntilChanged());
}

class EventListenerManager {
    listeners = new Map();
    add(element, event, handler) {
        element.addEventListener(event, handler);
        if (!this.listeners.has(event)) {
            this.listeners.set(event, new Set());
        }
        this.listeners.get(event).add(handler);
    }
    remove(element, event, handler) {
        element.removeEventListener(event, handler);
        this.listeners.get(event)?.delete(handler);
    }
    removeAll() {
        this.listeners.forEach((handlers) => {
            handlers.clear();
        });
        this.listeners.clear();
    }
}
function createResizeObserver(callback) {
    if (typeof ResizeObserver === "undefined")
        return null;
    return new ResizeObserver(callback);
}
function observeElement(observer, element) {
    observer.observe(element);
}
function unobserveElement(observer, element) {
    observer.unobserve(element);
}

/**
 * Filter array items by search query across multiple fields
 */
function filterBySearch(items, query, fields) {
    if (!query.trim())
        return items;
    const lowerQuery = query.toLowerCase();
    return items.filter((item) => fields.some((field) => {
        const value = getNestedValue(item, field);
        return (typeof value === "string" && value.toLowerCase().includes(lowerQuery));
    }));
}
function getNestedValue(obj, path) {
    if (typeof path === "string" && path.includes(".")) {
        return path.split(".").reduce((o, k) => o?.[k], obj);
    }
    return obj[path];
}

function getErrorMessage(error) {
    if (error instanceof Error)
        return error.message;
    if (typeof error === "string")
        return error;
    return String(error ?? "Unknown error");
}
async function withErrorHandling(fn, onError) {
    try {
        return await fn();
    }
    catch (error) {
        onError?.(error);
        return undefined;
    }
}

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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: RbacHasPermissionDirective, deps: [{ token: PermissionService }, { token: i0.TemplateRef }, { token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "22.0.6", type: RbacHasPermissionDirective, isStandalone: true, selector: "[rbacHasPermission]", inputs: { permission: ["rbacHasPermission", "permission"] }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: RbacHasPermissionDirective, decorators: [{
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: RbacHasRoleDirective, deps: [{ token: PermissionService }, { token: i0.TemplateRef }, { token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "22.0.6", type: RbacHasRoleDirective, isStandalone: true, selector: "[rbacHasRole]", inputs: { role: ["rbacHasRole", "role"] }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.6", ngImport: i0, type: RbacHasRoleDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: "[rbacHasRole]",
                    standalone: true,
                }]
        }], ctorParameters: () => [{ type: PermissionService }, { type: i0.TemplateRef }, { type: i0.ViewContainerRef }], propDecorators: { role: [{
                type: Input,
                args: ["rbacHasRole"]
            }] } });

/**
 * Update service for checking, downloading, and installing app updates via Tauri backend.
 */
class UpdateService {
    /**
     * Check for available updates.
     * Returns UpdateInfo if an update is available, null otherwise.
     */
    async checkForUpdates() {
        try {
            const result = await invoke("check_for_update");
            return result;
        }
        catch {
            return null;
        }
    }
    /**
     * Download an update with optional progress callback.
     * Returns the path to the downloaded installer.
     */
    async downloadUpdate(info, onProgress) {
        if (onProgress) {
            // Subscribe to download progress events if the backend supports them
            await invoke("subscribe_download_progress", {});
            // The Rust backend should emit progress events that the frontend listens to
            // For now, we invoke the download command which may stream progress
            const path = await invoke("download_update", {
                url: info.download_url,
                assetName: info.asset_name,
            });
            return path;
        }
        return invoke("download_update", {
            url: info.download_url,
            assetName: info.asset_name,
        });
    }
    /**
     * Install the update from the given installer path.
     */
    async installUpdate(path) {
        await invoke("install_update", { installerPath: path });
    }
    /**
     * Get the current app version.
     */
    async getCurrentVersion() {
        return invoke("get_current_version");
    }
}

/**
 * Reusable about/check-update pattern for apps that distribute via GitHub Releases.
 * Fetches release info from GitHub API and uses UpdateService for download/install.
 */
class AboutService {
    appName;
    owner;
    repo;
    updateService;
    constructor(appName, owner, repo) {
        this.appName = appName;
        this.owner = owner;
        this.repo = repo;
        this.updateService = new UpdateService();
    }
    /**
     * Check for updates by fetching the latest GitHub release.
     * Returns UpdateInfo if a newer version is available, null otherwise.
     */
    async checkUpdate() {
        try {
            const response = await fetch(`https://api.github.com/repos/${this.owner}/${this.repo}/releases/latest`);
            if (!response.ok) {
                return null;
            }
            const release = await response.json();
            const latestVersion = release.tag_name.startsWith("v")
                ? release.tag_name.slice(1)
                : release.tag_name;
            const currentVersion = await this.updateService.getCurrentVersion();
            // Compare versions - simple semver comparison
            if (this.isNewerVersion(latestVersion, currentVersion)) {
                // Find the primary asset (first non-source asset)
                const asset = release.assets.find((a) => !a.name.endsWith(".tar.gz") && !a.name.endsWith(".zip"));
                const downloadUrl = asset?.browser_download_url ??
                    `https://github.com/${this.owner}/${this.repo}/releases/download/${release.tag_name}/${asset?.name ?? ""}`;
                const assetSize = asset?.size ?? 0;
                return {
                    current_version: currentVersion,
                    latest_version: latestVersion,
                    download_url: downloadUrl,
                    asset_name: asset?.name ?? "",
                    asset_size: assetSize,
                    release_notes: release.body ?? undefined,
                };
            }
            return null;
        }
        catch {
            return null;
        }
    }
    /**
     * Download and install the latest update.
     * Requires checkUpdate() to have been called first to populate cached info.
     */
    async downloadAndInstall(onProgress) {
        const info = await this.checkUpdate();
        if (!info) {
            throw new Error("No update available");
        }
        const path = await this.updateService.downloadUpdate(info, onProgress);
        await this.updateService.installUpdate(path);
    }
    isNewerVersion(latest, current) {
        const latestParts = latest.split(".").map(Number);
        const currentParts = current.split(".").map(Number);
        for (let i = 0; i < Math.max(latestParts.length, currentParts.length); i++) {
            const l = latestParts[i] ?? 0;
            const c = currentParts[i] ?? 0;
            if (l > c)
                return true;
            if (l < c)
                return false;
        }
        return false;
    }
}

// @tauri-front/shared - Unified shared library
// Explicit re-exports to avoid name collisions
// Side-effect import: registers ALL Angular components in SCHEMA_COMPONENT_MAP
// MUST be imported before any schema rendering

/**
 * Generated bundle index. Do not edit.
 */

export { AboutService, AlertComponent, ApiCrudService, ApiException, BaseDestroyableComponent, BreadcrumbComponent, ButtonGroupComponent, ComponentRegistryService, DataBindingResolverService, ErrorHandlerService, ErrorType, EventBusService, EventListenerManager, FabComponent, FileInputComponent, GuardService, HandlerExecutorService, I18nService, IndexedDbService, InvokeWrapperService, LayoutEngineService, ListComponent, LocalStorageService, PaginationComponent, PermissionService, ProgressRingComponent, RatingComponent, RbacHasPermissionDirective, RbacHasRoleDirective, ResponseStatus, SCHEMA_COMPONENT_MAP, SchemaElementComponent, SchemaRendererService, SchemaRouteViewerComponent, SchemaRouterService, SchemaSetupService, SchemaShellComponent, SignalLoggerService, SignalStoreService, SignalSyncService, SkeletonComponent, StepperComponent, StorageCacheService, StorageQueryService, StorageService, StyleThemeService, StyleThemeService as ThemeService, ThemeToggleService, ToastService, TodoPermission, UnifiedStorageService, UpdateService, applyUpdate, calculateDistance3D, capitalize, clamp, compareByTimestamp, createDerivedState, createResizeObserver, createState, createStateSubject, debounce, deduplicateById, deepClone, easeInOutQuad, easeOutQuad, escapeCsvValue, escapeSqlValue, evictLRU, evictLRUInPlace, feedbackComponents, filterBySearch, findById, findByIdOrThrow, formatBytes, formatCompactNumber, formatDateRelative, formatError, formatLocaleDate, formatTime$1 as formatTime, formatTime as formatTimeFromDate, generateBatchId, generateCalendarDays, generateId, generateLogId, generatePeerId, generateQueryId, generateTabId, generateTransactionId, getAllStyleVariants, getComponentStyleClasses, getCurrentStyle, getErrorMessage$1 as getErrorMessage, getErrorMessage as getErrorMessageFromUnknown, getLatestTimestamp, getNestedValue$1 as getNestedValue, getStyleClassPrefix, groupByField, groupByKey, invokeCommand, invokeCommandWithResponse, invokeVoid, invokeWithError, isClose, isError, isNullOrUndefined, isPresent, isSameDay, isStale, isSuccess, isValidBase64Image, isValidEmail, layoutComponents, lerp, lerpAngle, lerpVector3D, loadStyleVariant, loadStyleVariantNoop, mapResponse, observeElement, parseError, parseJsonOrDefault, provideUnifiedApp, randomChoice, randomChoice as randomElement, randomInt, randomInterval, randomPitchVariation, randomRange, rbacGuard, rbacRoleGuard, registerSchemaComponent, setCurrentStyle, setTheme, slugify, sortBy, throttle, trackByIndex, trackByRow, truncate, uiComponents, unobserveElement, unwrapResponse, upsertEntity, weightedRandom, withErrorHandling, withLoading };
//# sourceMappingURL=tauri-front-shared.mjs.map
