import { __decorate } from 'tslib';
import { LitElement, css, html } from 'lit';
import { property, customElement, state } from 'lit/decorators.js';
import * as i0 from '@angular/core';
import { Input, CUSTOM_ELEMENTS_SCHEMA, Component, Injectable, inject, signal, computed, effect } from '@angular/core';
import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { invoke } from '@tauri-apps/api/core';
import * as i1$1 from '@angular/forms';
import { FormsModule } from '@angular/forms';

let AppButton = class AppButton extends LitElement {
    constructor() {
        super();
        for (const key of ["variant", "buttonStyle", "size", "disabled", "loading", "icon", "iconPosition", "fullWidth", "type", "label"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                const val = this[key];
                delete this[key];
                this[key] = val;
            }
        }
    }
    connectedCallback() {
        const saved = {};
        for (const key of ["variant", "buttonStyle", "size", "disabled", "loading", "icon", "iconPosition", "fullWidth", "type", "label"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                saved[key] = this[key];
                delete this[key];
            }
        }
        super.connectedCallback();
        for (const [key, value] of Object.entries(saved)) {
            this[key] = value;
        }
    }
    static styles = css `
    :host {
      display: inline-flex;
    }

    button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      border-radius: 0.5rem;
      border: 1px solid;
      padding: 0.5rem 1rem;
      text-align: center;
      font-weight: 500;
      transition: all 0.15s;
      cursor: pointer;
      border-width: 1px;
    }

    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    /* ========================================
       SOLID VARIANT (default) - Filled background
       ======================================== */
    .app-btn-solid {
      border-color: var(--accent);
      background-color: var(--accent);
      color: var(--text-on-accent);
    }
    .app-btn-solid:hover {
      background-color: var(--accent-hover);
      border-color: var(--accent-hover);
    }

    .app-btn-solid-danger {
      border-color: var(--error);
      background-color: var(--error);
      color: var(--text-on-error);
    }
    .app-btn-solid-danger:hover {
      opacity: 0.9;
    }

    .app-btn-solid-warning {
      border-color: var(--warning);
      background-color: var(--warning);
      color: var(--text-on-warning);
    }
    .app-btn-solid-warning:hover {
      opacity: 0.9;
    }

    .app-btn-solid-success {
      border-color: var(--success);
      background-color: var(--success);
      color: var(--text-on-success);
    }
    .app-btn-solid-success:hover {
      opacity: 0.9;
    }

    .app-btn-solid-info {
      border-color: var(--info);
      background-color: var(--info);
      color: var(--text-on-info);
    }
    .app-btn-solid-info:hover {
      opacity: 0.9;
    }

    /* ========================================
       OUTLINE VARIANT - Border only, transparent bg
       ======================================== */
    .app-btn-outline {
      border-color: var(--accent);
      background-color: transparent;
      color: var(--accent);
    }
    .app-btn-outline:hover {
      background-color: color-mix(in srgb, var(--accent) 10%, transparent);
    }

    .app-btn-outline-danger {
      border-color: var(--error);
      background-color: transparent;
      color: var(--error);
    }
    .app-btn-outline-danger:hover {
      background-color: color-mix(in srgb, var(--error) 10%, transparent);
    }

    .app-btn-outline-warning {
      border-color: var(--warning);
      background-color: transparent;
      color: var(--warning);
    }
    .app-btn-outline-warning:hover {
      background-color: color-mix(in srgb, var(--warning) 10%, transparent);
    }

    .app-btn-outline-success {
      border-color: var(--success);
      background-color: transparent;
      color: var(--success);
    }
    .app-btn-outline-success:hover {
      background-color: color-mix(in srgb, var(--success) 10%, transparent);
    }

    .app-btn-outline-info {
      border-color: var(--info);
      background-color: transparent;
      color: var(--info);
    }
    .app-btn-outline-info:hover {
      background-color: color-mix(in srgb, var(--info) 10%, transparent);
    }

    /* ========================================
       SOFT VARIANT - Light background tint
       ======================================== */
    .app-btn-soft {
      border-color: transparent;
      background-color: color-mix(in srgb, var(--accent) 10%, transparent);
      color: var(--accent);
    }
    .app-btn-soft:hover {
      background-color: color-mix(in srgb, var(--accent) 20%, transparent);
    }

    .app-btn-soft-danger {
      border-color: transparent;
      background-color: color-mix(in srgb, var(--error) 10%, transparent);
      color: var(--error);
    }
    .app-btn-soft-danger:hover {
      background-color: color-mix(in srgb, var(--error) 20%, transparent);
    }

    .app-btn-soft-warning {
      border-color: transparent;
      background-color: color-mix(in srgb, var(--warning) 10%, transparent);
      color: var(--warning);
    }
    .app-btn-soft-warning:hover {
      background-color: color-mix(in srgb, var(--warning) 20%, transparent);
    }

    .app-btn-soft-success {
      border-color: transparent;
      background-color: color-mix(in srgb, var(--success) 10%, transparent);
      color: var(--success);
    }
    .app-btn-soft-success:hover {
      background-color: color-mix(in srgb, var(--success) 20%, transparent);
    }

    .app-btn-soft-info {
      border-color: transparent;
      background-color: color-mix(in srgb, var(--info) 10%, transparent);
      color: var(--info);
    }
    .app-btn-soft-info:hover {
      background-color: color-mix(in srgb, var(--info) 20%, transparent);
    }

    /* ========================================
       GHOST VARIANT - No border, transparent bg
       ======================================== */
    .app-btn-ghost {
      border-color: transparent;
      background-color: transparent;
      color: var(--accent);
    }
    .app-btn-ghost:hover {
      background-color: color-mix(in srgb, var(--accent) 10%, transparent);
    }

    .app-btn-ghost-danger {
      border-color: transparent;
      background-color: transparent;
      color: var(--error);
    }
    .app-btn-ghost-danger:hover {
      background-color: color-mix(in srgb, var(--error) 10%, transparent);
    }

    .app-btn-ghost-warning {
      border-color: transparent;
      background-color: transparent;
      color: var(--warning);
    }
    .app-btn-ghost-warning:hover {
      background-color: color-mix(in srgb, var(--warning) 10%, transparent);
    }

    .app-btn-ghost-success {
      border-color: transparent;
      background-color: transparent;
      color: var(--success);
    }
    .app-btn-ghost-success:hover {
      background-color: color-mix(in srgb, var(--success) 10%, transparent);
    }

    .app-btn-ghost-info {
      border-color: transparent;
      background-color: transparent;
      color: var(--info);
    }
    .app-btn-ghost-info:hover {
      background-color: color-mix(in srgb, var(--info) 10%, transparent);
    }

    /* ========================================
       SIZE VARIANTS
       ======================================== */
    .app-btn-sm {
      padding: 0.25rem 0.5rem;
      font-size: 0.875rem;
    }

    .app-btn-md {
      padding: 0.5rem 1rem;
      font-size: 1rem;
    }

    .app-btn-lg {
      padding: 0.75rem 1.5rem;
      font-size: 1.125rem;
    }

    .app-btn-full {
      width: 100%;
    }

    .app-btn-disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .app-btn-icon {
      font-size: 1.25rem;
    }

    .app-btn-spinner {
      width: 1rem;
      height: 1rem;
      border: 2px solid currentColor;
      border-top-color: transparent;
      border-radius: 50%;
      animation: spin 0.6s linear infinite;
    }

    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }

    /* ========================================
       LEGACY SUPPORT
       ======================================== */
    .app-btn-primary {
      border-color: var(--accent);
      background-color: var(--accent);
      color: var(--text-on-accent);
    }
    .app-btn-primary:hover {
      background-color: var(--accent-hover);
      border-color: var(--accent-hover);
    }

    .app-btn-secondary {
      border-color: var(--border-color);
      background-color: var(--bg-elevated);
      color: var(--text-primary);
    }
    .app-btn-secondary:hover {
      background-color: var(--bg-hover);
    }
  `;
    _handleClick(e) {
        if (this.disabled || this.loading) {
            e.preventDefault();
            e.stopPropagation();
            return;
        }
        this.dispatchEvent(new CustomEvent("click", { detail: e, bubbles: true, composed: true }));
    }
    getButtonClass() {
        const style = this.buttonStyle || "solid";
        const variant = this.variant || "primary";
        const styleVariant = style === "solid" && variant === "primary"
            ? "app-btn-solid"
            : `app-btn-${style}${variant !== "primary" ? `-${variant}` : ""}`;
        const classes = [
            "app-btn",
            styleVariant,
            `app-btn-${this.size || "md"}`,
            this.fullWidth ? "app-btn-full" : "",
            this.disabled || this.loading ? "app-btn-disabled" : "",
        ]
            .filter(Boolean)
            .join(" ");
        return classes;
    }
    render() {
        return html `
      <button
        type="${this.type || "button"}"
        class="${this.getButtonClass()}"
        ?disabled="${this.disabled || this.loading}"
        @click="${this._handleClick}"
      >
        ${this.loading
            ? html `<span class="app-btn-spinner"></span>`
            : html `
              ${this.icon && this.iconPosition === "left"
                ? html `<i class="material-icons app-btn-icon">${this.icon}</i>`
                : ""}
              ${this.label ? html `<span>${this.label}</span>` : html `<slot></slot>`}
              ${this.icon && this.iconPosition === "right"
                ? html `<i class="material-icons app-btn-icon">${this.icon}</i>`
                : ""}
            `}
      </button>
    `;
    }
};
__decorate([
    property()
], AppButton.prototype, "variant", void 0);
__decorate([
    property()
], AppButton.prototype, "buttonStyle", void 0);
__decorate([
    property()
], AppButton.prototype, "size", void 0);
__decorate([
    property({ type: Boolean })
], AppButton.prototype, "disabled", void 0);
__decorate([
    property({ type: Boolean })
], AppButton.prototype, "loading", void 0);
__decorate([
    property()
], AppButton.prototype, "icon", void 0);
__decorate([
    property()
], AppButton.prototype, "iconPosition", void 0);
__decorate([
    property({ type: Boolean })
], AppButton.prototype, "fullWidth", void 0);
__decorate([
    property()
], AppButton.prototype, "type", void 0);
__decorate([
    property()
], AppButton.prototype, "label", void 0);
AppButton = __decorate([
    customElement("app-button")
], AppButton);

let AppInput = class AppInput extends LitElement {
    constructor() {
        super();
        for (const key of ["type", "placeholder", "label", "disabled", "error", "icon"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                const val = this[key];
                delete this[key];
                this[key] = val;
            }
        }
    }
    connectedCallback() {
        const saved = {};
        for (const key of ["type", "placeholder", "label", "disabled", "error", "icon"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                saved[key] = this[key];
                delete this[key];
            }
        }
        super.connectedCallback();
        for (const [key, value] of Object.entries(saved)) {
            this[key] = value;
        }
    }
    _value = "";
    _focused = false;
    static styles = css `
    :host {
      display: block;
    }

    .app-input-wrapper {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .app-input-label {
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--text-primary);
    }

    .app-input-container {
      position: relative;
      display: flex;
      align-items: center;
    }

    .app-input {
      width: 100%;
      padding: 0.5rem 0.75rem;
      border-radius: 0.5rem;
      border: 1px solid var(--border-color);
      background-color: var(--bg-primary);
      color: var(--text-primary);
      box-sizing: border-box;
      transition: all 0.15s;
      outline: none;
    }

    .app-input::placeholder {
      color: var(--text-muted);
    }

    .app-input:focus {
      border-color: var(--accent);
      box-shadow: 0 0 0 1px var(--accent);
    }

    .app-input-default:focus {
      border-color: var(--accent);
      box-shadow: 0 0 0 1px var(--accent);
    }

    .app-input-error {
      border-color: var(--error);
      box-shadow: 0 0 0 1px var(--error);
    }

    .app-input-with-icon {
      padding-left: 2.5rem;
    }

    .app-input-icon {
      position: absolute;
      left: 0.75rem;
      font-size: 1.25rem;
      color: var(--text-muted);
    }

    .app-input-focused .app-input-icon {
      color: var(--accent);
    }

    .app-input:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      background-color: var(--bg-tertiary);
    }

    .app-input-error-text {
      font-size: 0.75rem;
      color: var(--error);
    }
  `;
    _handleInput(e) {
        const target = e.target;
        this._value = target.value;
        this.dispatchEvent(new CustomEvent("input", {
            detail: this._value,
            bubbles: true,
            composed: true,
        }));
    }
    _handleFocus() {
        this._focused = true;
    }
    _handleBlur() {
        this._focused = false;
        this.dispatchEvent(new CustomEvent("blur", { bubbles: true, composed: true }));
    }
    render() {
        const stateClass = this.error ? "app-input-error" : "app-input-default";
        const classes = [
            "app-input",
            stateClass,
            this.icon ? "app-input-with-icon" : "",
        ]
            .filter(Boolean)
            .join(" ");
        return html `
      <div class="app-input-wrapper">
        ${this.label
            ? html `<label class="app-input-label">${this.label}</label>`
            : ""}
        <div
          class="app-input-container ${this._focused
            ? "app-input-focused"
            : ""}"
        >
          ${this.icon
            ? html `<i class="material-icons app-input-icon">${this.icon}</i>`
            : ""}
          <input
            type="${this.type}"
            class="${classes}"
            placeholder="${this.placeholder}"
            ?disabled="${this.disabled}"
            .value="${this._value}"
            @input="${this._handleInput}"
            @focus="${this._handleFocus}"
            @blur="${this._handleBlur}"
          />
        </div>
        ${this.error
            ? html `<span class="app-input-error-text">${this.error}</span>`
            : ""}
      </div>
    `;
    }
};
__decorate([
    property()
], AppInput.prototype, "type", void 0);
__decorate([
    property()
], AppInput.prototype, "placeholder", void 0);
__decorate([
    property()
], AppInput.prototype, "label", void 0);
__decorate([
    property({ type: Boolean })
], AppInput.prototype, "disabled", void 0);
__decorate([
    property()
], AppInput.prototype, "error", void 0);
__decorate([
    property()
], AppInput.prototype, "icon", void 0);
__decorate([
    state()
], AppInput.prototype, "_value", void 0);
__decorate([
    state()
], AppInput.prototype, "_focused", void 0);
AppInput = __decorate([
    customElement("app-input")
], AppInput);

let AppEmptyState = class AppEmptyState extends LitElement {
    constructor() {
        super();
        for (const key of ["icon", "title", "message", "actionLabel", "variant"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                const val = this[key];
                delete this[key];
                this[key] = val;
            }
        }
    }
    connectedCallback() {
        const saved = {};
        for (const key of ["icon", "title", "message", "actionLabel", "variant"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                saved[key] = this[key];
                delete this[key];
            }
        }
        super.connectedCallback();
        for (const [key, value] of Object.entries(saved)) {
            this[key] = value;
        }
    }
    static styles = css `
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 2rem;
      gap: 1rem;
    }

    .icon-container {
      width: 64px;
      height: 64px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--bg-elevated);
      border: 2px solid var(--border-color);
    }

    .icon-container.danger {
      background: var(--error);
      border-color: var(--error);
    }

    .icon-container.success {
      background: var(--success);
      border-color: var(--success);
    }

    .icon {
      font-size: 2rem;
      width: 2rem;
      height: 2rem;
    }

    .icon-container.danger .icon,
    .icon-container.success .icon {
      color: var(--text-on-error);
    }

    .title {
      font-size: 1.5rem;
      font-weight: 600;
      color: var(--text-primary);
      margin: 0;
    }

    .message {
      font-size: 1rem;
      color: var(--text-secondary);
      margin: 0;
      max-width: 400px;
    }

    .action {
      margin-top: 0.5rem;
    }

    button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      border: 1px solid var(--accent);
      background: var(--accent);
      color: var(--text-on-accent);
      font-weight: 500;
      cursor: pointer;
      transition: all 0.15s;
    }

    button:hover {
      background: var(--accent-hover);
      border-color: var(--accent-hover);
    }
  `;
    _handleAction() {
        this.dispatchEvent(new CustomEvent("action", { bubbles: true, composed: true }));
    }
    render() {
        return html `
      <div class="icon-container ${this.variant}">
        ${this.icon
            ? html `<span class="icon">${this.icon}</span>`
            : html `<span class="icon">📦</span>`}
      </div>
      ${this.title ? html `<h2 class="title">${this.title}</h2>` : ""}
      ${this.message ? html `<p class="message">${this.message}</p>` : ""}
      ${this.actionLabel
            ? html `
            <div class="action">
              <button @click="${this._handleAction}">
                ${this.actionLabel}
              </button>
            </div>
          `
            : ""}
    `;
    }
};
__decorate([
    property()
], AppEmptyState.prototype, "icon", void 0);
__decorate([
    property()
], AppEmptyState.prototype, "title", void 0);
__decorate([
    property()
], AppEmptyState.prototype, "message", void 0);
__decorate([
    property()
], AppEmptyState.prototype, "actionLabel", void 0);
__decorate([
    property()
], AppEmptyState.prototype, "variant", void 0);
AppEmptyState = __decorate([
    customElement("app-empty-state")
], AppEmptyState);

let AppModal = class AppModal extends LitElement {
    constructor() {
        super();
        for (const key of ["open", "title", "size"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                const val = this[key];
                delete this[key];
                this[key] = val;
            }
        }
    }
    connectedCallback() {
        const saved = {};
        for (const key of ["open", "title", "size"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                saved[key] = this[key];
                delete this[key];
            }
        }
        super.connectedCallback();
        for (const [key, value] of Object.entries(saved)) {
            this[key] = value;
        }
    }
    static styles = css `
    :host {
      display: block;
    }

    .overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }

    .modal {
      background: var(--bg-elevated);
      border: 1px solid var(--border-color);
      border-radius: 0.75rem;
      min-width: 320px;
      max-height: 90vh;
      display: flex;
      flex-direction: column;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    }

    .modal-sm {
      width: 320px;
    }

    .modal-md {
      width: 480px;
    }

    .modal-lg {
      width: 640px;
    }

    header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem 1.25rem;
      border-bottom: 1px solid var(--border-color);
    }

    header h3 {
      margin: 0;
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--text-primary);
    }

    .close-btn {
      background: transparent;
      border: none;
      cursor: pointer;
      padding: 0.25rem;
      border-radius: 0.25rem;
      color: var(--text-secondary);
      font-size: 1.25rem;
      line-height: 1;
    }

    .close-btn:hover {
      background: var(--bg-hover);
      color: var(--text-primary);
    }

    .content {
      padding: 1.25rem;
      overflow-y: auto;
      color: var(--text-primary);
    }
  `;
    _handleOverlayClick(e) {
        if (e.target.classList.contains("overlay")) {
            this._close();
        }
    }
    _close() {
        this.open = false;
        this.dispatchEvent(new CustomEvent("close", { bubbles: true, composed: true }));
    }
    render() {
        if (!this.open)
            return html ``;
        return html `
      <div class="overlay" @click="${this._handleOverlayClick}">
        <div class="modal modal-${this.size}">
          <header>
            <h3>${this.title}</h3>
            <button class="close-btn" @click="${this._close}">×</button>
          </header>
          <div class="content">
            <slot></slot>
          </div>
        </div>
      </div>
    `;
    }
};
__decorate([
    property({ type: Boolean })
], AppModal.prototype, "open", void 0);
__decorate([
    property()
], AppModal.prototype, "title", void 0);
__decorate([
    property()
], AppModal.prototype, "size", void 0);
AppModal = __decorate([
    customElement("app-modal")
], AppModal);

let AppDialog = class AppDialog extends LitElement {
    constructor() {
        super();
        for (const key of ["open", "title", "size", "showHeader", "showFooter"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                const val = this[key];
                delete this[key];
                this[key] = val;
            }
        }
    }
    connectedCallback() {
        const saved = {};
        for (const key of ["open", "title", "size", "showHeader", "showFooter"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                saved[key] = this[key];
                delete this[key];
            }
        }
        super.connectedCallback();
        for (const [key, value] of Object.entries(saved)) {
            this[key] = value;
        }
    }
    static styles = css `
    :host {
      display: block;
    }

    .overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.6);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }

    .dialog {
      background: var(--bg-elevated);
      border: 1px solid var(--border-color);
      border-radius: 1rem;
      min-width: 360px;
      max-height: 90vh;
      display: flex;
      flex-direction: column;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4);
    }

    .dialog-sm {
      width: 360px;
    }

    .dialog-md {
      width: 520px;
    }

    .dialog-lg {
      width: 720px;
    }

    header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1.25rem 1.5rem;
      border-bottom: 2px solid var(--border-color);
      background: var(--bg-elevated);
      border-radius: 1rem 1rem 0 0;
    }

    header h2 {
      margin: 0;
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--text-primary);
    }

    .close-btn {
      background: transparent;
      border: none;
      cursor: pointer;
      padding: 0.25rem 0.5rem;
      border-radius: 0.375rem;
      color: var(--text-secondary);
      font-size: 1.5rem;
      line-height: 1;
      font-weight: 300;
    }

    .close-btn:hover {
      background: var(--bg-hover);
      color: var(--text-primary);
    }

    .content {
      padding: 1.5rem;
      overflow-y: auto;
      color: var(--text-primary);
    }
  `;
    _handleOverlayClick(e) {
        if (e.target.classList.contains("overlay")) {
            this._close();
        }
    }
    _close() {
        this.open = false;
        this.dispatchEvent(new CustomEvent("close", { bubbles: true, composed: true }));
    }
    render() {
        if (!this.open)
            return html ``;
        return html `
      <div class="overlay" @click="${this._handleOverlayClick}">
        <div class="dialog dialog-${this.size}">
          <header>
            <h2>${this.title}</h2>
            <button class="close-btn" @click="${this._close}">×</button>
          </header>
          <div class="content">
            <slot></slot>
          </div>
        </div>
      </div>
    `;
    }
};
__decorate([
    property({ type: Boolean })
], AppDialog.prototype, "open", void 0);
__decorate([
    property()
], AppDialog.prototype, "title", void 0);
__decorate([
    property()
], AppDialog.prototype, "size", void 0);
__decorate([
    property({ type: Boolean })
], AppDialog.prototype, "showHeader", void 0);
__decorate([
    property({ type: Boolean })
], AppDialog.prototype, "showFooter", void 0);
AppDialog = __decorate([
    customElement("app-dialog")
], AppDialog);

let AppConfirmDialog = class AppConfirmDialog extends LitElement {
    constructor() {
        super();
        for (const key of ["open", "title", "message", "confirmText", "cancelText"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                const val = this[key];
                delete this[key];
                this[key] = val;
            }
        }
    }
    connectedCallback() {
        const saved = {};
        for (const key of ["open", "title", "message", "confirmText", "cancelText"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                saved[key] = this[key];
                delete this[key];
            }
        }
        super.connectedCallback();
        for (const [key, value] of Object.entries(saved)) {
            this[key] = value;
        }
    }
    static styles = css `
    :host {
      display: block;
    }

    .overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.6);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }

    .dialog {
      background: var(--bg-elevated);
      border: 1px solid var(--border-color);
      border-radius: 1rem;
      width: 400px;
      max-width: 90vw;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4);
    }

    header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1.25rem 1.5rem;
      border-bottom: 1px solid var(--border-color);
    }

    header h2 {
      margin: 0;
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--text-primary);
    }

    .close-btn {
      background: transparent;
      border: none;
      cursor: pointer;
      padding: 0.25rem;
      border-radius: 0.25rem;
      color: var(--text-secondary);
      font-size: 1.25rem;
      line-height: 1;
    }

    .close-btn:hover {
      background: var(--bg-hover);
      color: var(--text-primary);
    }

    .content {
      padding: 1.5rem;
      color: var(--text-secondary);
      font-size: 0.9375rem;
      line-height: 1.5;
    }

    footer {
      display: flex;
      gap: 0.75rem;
      padding: 1rem 1.5rem;
      border-top: 1px solid var(--border-color);
      justify-content: flex-end;
    }

    button {
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      border: 1px solid;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.15s;
    }

    .cancel-btn {
      background: transparent;
      border-color: var(--border-color);
      color: var(--text-secondary);
    }

    .cancel-btn:hover {
      background: var(--bg-hover);
      color: var(--text-primary);
    }

    .confirm-btn {
      background: var(--accent);
      border-color: var(--accent);
      color: var(--text-on-accent);
    }

    .confirm-btn:hover {
      opacity: 0.9;
    }

    .danger-btn {
      background: var(--error);
      border-color: var(--error);
      color: var(--text-on-error);
    }

    .danger-btn:hover {
      opacity: 0.9;
    }
  `;
    _handleCancel() {
        this.open = false;
        this.dispatchEvent(new CustomEvent("cancel", { bubbles: true, composed: true }));
    }
    _handleConfirm() {
        this.open = false;
        this.dispatchEvent(new CustomEvent("confirm", { bubbles: true, composed: true }));
    }
    _handleOverlayClick(e) {
        if (e.target.classList.contains("overlay")) {
            this._handleCancel();
        }
    }
    render() {
        if (!this.open)
            return html ``;
        return html `
      <div class="overlay" @click="${this._handleOverlayClick}">
        <div class="dialog">
          <header>
            <h2>${this.title}</h2>
            <button class="close-btn" @click="${this._handleCancel}">×</button>
          </header>
          <div class="content">
            <slot></slot>
            ${this.message}
          </div>
          <footer>
            <button class="cancel-btn" @click="${this._handleCancel}">
              ${this.cancelText}
            </button>
            <button class="confirm-btn" @click="${this._handleConfirm}">
              ${this.confirmText}
            </button>
          </footer>
        </div>
      </div>
    `;
    }
};
__decorate([
    property({ type: Boolean })
], AppConfirmDialog.prototype, "open", void 0);
__decorate([
    property()
], AppConfirmDialog.prototype, "title", void 0);
__decorate([
    property()
], AppConfirmDialog.prototype, "message", void 0);
__decorate([
    property()
], AppConfirmDialog.prototype, "confirmText", void 0);
__decorate([
    property()
], AppConfirmDialog.prototype, "cancelText", void 0);
AppConfirmDialog = __decorate([
    customElement("app-confirm-dialog")
], AppConfirmDialog);

let AppLoading = class AppLoading extends LitElement {
    constructor() {
        super();
        for (const key of ["size"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                const val = this[key];
                delete this[key];
                this[key] = val;
            }
        }
    }
    connectedCallback() {
        const saved = {};
        for (const key of ["size"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                saved[key] = this[key];
                delete this[key];
            }
        }
        super.connectedCallback();
        for (const [key, value] of Object.entries(saved)) {
            this[key] = value;
        }
    }
    static styles = css `
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    .spinner {
      border: 2px solid var(--border-color);
      border-top-color: var(--accent);
      border-radius: 50%;
      animation: spin 0.7s linear infinite;
    }

    .spinner-sm {
      width: 16px;
      height: 16px;
      border-width: 2px;
    }

    .spinner-md {
      width: 32px;
      height: 32px;
      border-width: 3px;
    }

    .spinner-lg {
      width: 48px;
      height: 48px;
      border-width: 4px;
    }

    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }
  `;
    render() {
        return html `<div class="spinner spinner-${this.size}"></div>`;
    }
};
__decorate([
    property()
], AppLoading.prototype, "size", void 0);
AppLoading = __decorate([
    customElement("app-loading")
], AppLoading);

let AppRadio = class AppRadio extends LitElement {
    constructor() {
        super();
        for (const key of ["name", "value", "checked", "disabled"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                const val = this[key];
                delete this[key];
                this[key] = val;
            }
        }
    }
    connectedCallback() {
        const saved = {};
        for (const key of ["name", "value", "checked", "disabled"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                saved[key] = this[key];
                delete this[key];
            }
        }
        super.connectedCallback();
        for (const [key, value] of Object.entries(saved)) {
            this[key] = value;
        }
    }
    static styles = css `
    :host {
      display: inline-flex;
      align-items: center;
    }

    label {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
    }

    input[type="radio"] {
      width: 1rem;
      height: 1rem;
      accent-color: var(--accent);
      cursor: pointer;
    }

    input[type="radio"]:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }

    .radio-label {
      color: var(--text-primary);
      font-size: 0.875rem;
      user-select: none;
    }

    :host([disabled]) .radio-label {
      color: var(--text-secondary);
      cursor: not-allowed;
    }
  `;
    _handleChange(e) {
        this.checked = e.target.checked;
        this.dispatchEvent(new CustomEvent("change", {
            detail: { value: this.value, checked: this.checked },
            bubbles: true,
            composed: true,
        }));
    }
    render() {
        return html `
      <label>
        <input
          type="radio"
          name="${this.name}"
          value="${this.value}"
          .checked="${this.checked}"
          ?disabled="${this.disabled}"
          @change="${this._handleChange}"
        />
        <span class="radio-label"><slot></slot></span>
      </label>
    `;
    }
};
__decorate([
    property()
], AppRadio.prototype, "name", void 0);
__decorate([
    property()
], AppRadio.prototype, "value", void 0);
__decorate([
    property({ type: Boolean })
], AppRadio.prototype, "checked", void 0);
__decorate([
    property({ type: Boolean })
], AppRadio.prototype, "disabled", void 0);
AppRadio = __decorate([
    customElement("app-radio")
], AppRadio);

let AppSlider = class AppSlider extends LitElement {
    constructor() {
        super();
        for (const key of ["min", "max", "value", "step", "disabled"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                const val = this[key];
                delete this[key];
                this[key] = val;
            }
        }
    }
    connectedCallback() {
        const saved = {};
        for (const key of ["min", "max", "value", "step", "disabled"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                saved[key] = this[key];
                delete this[key];
            }
        }
        super.connectedCallback();
        for (const [key, value] of Object.entries(saved)) {
            this[key] = value;
        }
    }
    static styles = css `
    :host {
      display: block;
      width: 100%;
    }

    .slider-wrapper {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .slider-label {
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--text-primary);
    }

    input[type="range"] {
      width: 100%;
      height: 0.5rem;
      border-radius: 0.25rem;
      background-color: var(--border-color);
      outline: none;
      cursor: pointer;
      -webkit-appearance: none;
      appearance: none;
    }

    input[type="range"]::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 1.25rem;
      height: 1.25rem;
      border-radius: 50%;
      background-color: var(--accent);
      cursor: pointer;
      border: none;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
      transition: transform 0.1s;
    }

    input[type="range"]::-webkit-slider-thumb:hover {
      transform: scale(1.1);
    }

    input[type="range"]::-moz-range-thumb {
      width: 1.25rem;
      height: 1.25rem;
      border-radius: 50%;
      background-color: var(--accent);
      cursor: pointer;
      border: none;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    }

    input[type="range"]:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    input[type="range"]:focus {
      outline: none;
    }

    input[type="range"]:focus::-webkit-slider-thumb {
      box-shadow: 0 0 0 2px var(--accent);
    }

    .slider-value {
      font-size: 0.75rem;
      color: var(--text-secondary);
      text-align: right;
    }
  `;
    _handleInput(e) {
        this.value = Number(e.target.value);
        this.dispatchEvent(new CustomEvent("input", {
            detail: this.value,
            bubbles: true,
            composed: true,
        }));
    }
    render() {
        return html `
      <div class="slider-wrapper">
        <input
          type="range"
          .value="${String(this.value)}"
          min="${String(this.min)}"
          max="${String(this.max)}"
          step="${String(this.step)}"
          ?disabled="${this.disabled}"
          @input="${this._handleInput}"
        />
      </div>
    `;
    }
};
__decorate([
    property({ type: Number })
], AppSlider.prototype, "min", void 0);
__decorate([
    property({ type: Number })
], AppSlider.prototype, "max", void 0);
__decorate([
    property({ type: Number })
], AppSlider.prototype, "value", void 0);
__decorate([
    property({ type: Number })
], AppSlider.prototype, "step", void 0);
__decorate([
    property({ type: Boolean })
], AppSlider.prototype, "disabled", void 0);
AppSlider = __decorate([
    customElement("app-slider")
], AppSlider);

let AppSwitch = class AppSwitch extends LitElement {
    constructor() {
        super();
        for (const key of ["checked", "disabled"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                const val = this[key];
                delete this[key];
                this[key] = val;
            }
        }
    }
    connectedCallback() {
        const saved = {};
        for (const key of ["checked", "disabled"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                saved[key] = this[key];
                delete this[key];
            }
        }
        super.connectedCallback();
        for (const [key, value] of Object.entries(saved)) {
            this[key] = value;
        }
    }
    static styles = css `
    :host {
      display: inline-flex;
      align-items: center;
    }

    .switch-container {
      position: relative;
      display: inline-flex;
      align-items: center;
      cursor: pointer;
    }

    .switch-input {
      position: absolute;
      opacity: 0;
      width: 0;
      height: 0;
    }

    .switch-slider {
      position: relative;
      width: 2.75rem;
      height: 1.5rem;
      background-color: var(--border-color);
      border-radius: 1rem;
      transition: background-color 0.2s;
    }

    .switch-slider::before {
      content: "";
      position: absolute;
      top: 0.125rem;
      left: 0.125rem;
      width: 1.25rem;
      height: 1.25rem;
      background-color: white;
      border-radius: 50%;
      transition: transform 0.2s;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    }

    .switch-input:checked + .switch-slider {
      background-color: var(--accent);
    }

    .switch-input:checked + .switch-slider::before {
      transform: translateX(1.25rem);
    }

    .switch-input:disabled + .switch-slider {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .switch-input:focus + .switch-slider {
      outline: 2px solid var(--accent);
      outline-offset: 2px;
    }
  `;
    _handleChange(e) {
        this.checked = e.target.checked;
        this.dispatchEvent(new CustomEvent("change", {
            detail: this.checked,
            bubbles: true,
            composed: true,
        }));
    }
    render() {
        return html `
      <label class="switch-container">
        <input
          type="checkbox"
          class="switch-input"
          .checked="${this.checked}"
          ?disabled="${this.disabled}"
          @change="${this._handleChange}"
          role="switch"
          aria-checked="${this.checked}"
        />
        <span class="switch-slider"></span>
      </label>
    `;
    }
};
__decorate([
    property({ type: Boolean })
], AppSwitch.prototype, "checked", void 0);
__decorate([
    property({ type: Boolean })
], AppSwitch.prototype, "disabled", void 0);
AppSwitch = __decorate([
    customElement("app-switch")
], AppSwitch);

let AppTextarea = class AppTextarea extends LitElement {
    constructor() {
        super();
        for (const key of ["value", "placeholder", "rows", "disabled"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                const val = this[key];
                delete this[key];
                this[key] = val;
            }
        }
    }
    connectedCallback() {
        const saved = {};
        for (const key of ["value", "placeholder", "rows", "disabled"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                saved[key] = this[key];
                delete this[key];
            }
        }
        super.connectedCallback();
        for (const [key, value] of Object.entries(saved)) {
            this[key] = value;
        }
    }
    static styles = css `
    :host {
      display: block;
    }

    .textarea-wrapper {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .textarea-label {
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--text-primary);
    }

    textarea {
      width: 100%;
      padding: 0.5rem 0.75rem;
      border-radius: 0.5rem;
      border: 1px solid var(--border-color);
      background-color: var(--bg-elevated);
      color: var(--text-primary);
      box-sizing: border-box;
      transition: all 0.15s;
      outline: none;
      resize: vertical;
      font-family: inherit;
      font-size: 0.875rem;
      line-height: 1.5;
    }

    textarea::placeholder {
      color: var(--text-muted);
    }

    textarea:focus {
      border-color: var(--accent);
      box-shadow: 0 0 0 1px var(--accent);
    }

    textarea:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      background-color: var(--bg-tertiary);
    }
  `;
    _handleInput(e) {
        this.value = e.target.value;
        this.dispatchEvent(new CustomEvent("input", {
            detail: this.value,
            bubbles: true,
            composed: true,
        }));
    }
    render() {
        return html `
      <textarea
        .value="${this.value}"
        placeholder="${this.placeholder}"
        rows="${this.rows}"
        ?disabled="${this.disabled}"
        @input="${this._handleInput}"
      ></textarea>
    `;
    }
};
__decorate([
    property()
], AppTextarea.prototype, "value", void 0);
__decorate([
    property()
], AppTextarea.prototype, "placeholder", void 0);
__decorate([
    property({ type: Number })
], AppTextarea.prototype, "rows", void 0);
__decorate([
    property({ type: Boolean })
], AppTextarea.prototype, "disabled", void 0);
AppTextarea = __decorate([
    customElement("app-textarea")
], AppTextarea);

let AppBadge = class AppBadge extends LitElement {
    constructor() {
        super();
        for (const key of ["variant", "size", "label"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                const val = this[key];
                delete this[key];
                this[key] = val;
            }
        }
    }
    connectedCallback() {
        const saved = {};
        for (const key of ["variant", "size", "label"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                saved[key] = this[key];
                delete this[key];
            }
        }
        super.connectedCallback();
        for (const [key, value] of Object.entries(saved)) {
            this[key] = value;
        }
    }
    static styles = css `
    :host {
      display: inline-flex;
    }

    .badge {
      display: inline-flex;
      align-items: center;
      border-radius: 0.25rem;
      font-weight: 500;
      line-height: 1;
    }

    .badge-default {
      background-color: var(--bg-elevated);
      color: var(--text-primary);
      border: 1px solid var(--border-color);
    }

    .badge-primary {
      background-color: var(--accent);
      color: var(--text-on-accent);
    }

    .badge-success {
      background-color: var(--success);
      color: var(--text-on-success);
    }

    .badge-warning {
      background-color: var(--warning);
      color: var(--text-on-warning);
    }

    .badge-danger {
      background-color: var(--error);
      color: var(--text-on-error);
    }

    .badge-sm {
      padding: 0.125rem 0.25rem;
      font-size: 0.625rem;
    }

    .badge-md {
      padding: 0.25rem 0.5rem;
      font-size: 0.75rem;
    }

    .badge-lg {
      padding: 0.375rem 0.75rem;
      font-size: 0.875rem;
    }
  `;
    render() {
        return html `
      <span class="badge badge-${this.variant} badge-${this.size}">${this.label}</span>
    `;
    }
};
__decorate([
    property()
], AppBadge.prototype, "variant", void 0);
__decorate([
    property()
], AppBadge.prototype, "size", void 0);
__decorate([
    property()
], AppBadge.prototype, "label", void 0);
AppBadge = __decorate([
    customElement("app-badge")
], AppBadge);

let AppSelect = class AppSelect extends LitElement {
    constructor() {
        super();
        for (const key of ["options", "value", "placeholder", "disabled"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                const val = this[key];
                delete this[key];
                this[key] = val;
            }
        }
    }
    connectedCallback() {
        const saved = {};
        for (const key of ["options", "value", "placeholder", "disabled"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                saved[key] = this[key];
                delete this[key];
            }
        }
        super.connectedCallback();
        for (const [key, value] of Object.entries(saved)) {
            this[key] = value;
        }
    }
    static styles = css `
    :host {
      display: inline-flex;
    }

    select {
      display: inline-flex;
      align-items: center;
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      border: 1px solid var(--border-color);
      background-color: var(--bg-elevated);
      color: var(--text-primary);
      font-size: 1rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.15s;
      min-width: 150px;
    }

    select:hover:not(:disabled) {
      background-color: var(--bg-hover);
    }

    select:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    select:focus {
      outline: none;
      border-color: var(--accent);
    }
  `;
    _handleChange(e) {
        const select = e.target;
        this.dispatchEvent(new CustomEvent("change", {
            detail: { value: select.value },
            bubbles: true,
            composed: true,
        }));
    }
    render() {
        let parsedOptions = [];
        try {
            parsedOptions = JSON.parse(this.options);
        }
        catch {
            parsedOptions = [];
        }
        return html `
      <select
        .value="${this.value}"
        ?disabled="${this.disabled}"
        placeholder="${this.placeholder}"
        @change="${this._handleChange}"
      >
        <option value="" disabled selected hidden>${this.placeholder}</option>
        ${parsedOptions.map((option) => html `<option value="${option}">${option}</option>`)}
      </select>
    `;
    }
};
__decorate([
    property()
], AppSelect.prototype, "options", void 0);
__decorate([
    property()
], AppSelect.prototype, "value", void 0);
__decorate([
    property()
], AppSelect.prototype, "placeholder", void 0);
__decorate([
    property({ type: Boolean })
], AppSelect.prototype, "disabled", void 0);
AppSelect = __decorate([
    customElement("app-select")
], AppSelect);

let AppCard = class AppCard extends LitElement {
    constructor() {
        super();
        for (const key of ["title", "content", "elevated", "borderRadius", "padding"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                const val = this[key];
                delete this[key];
                this[key] = val;
            }
        }
    }
    connectedCallback() {
        const saved = {};
        for (const key of ["title", "content", "elevated", "borderRadius", "padding"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                saved[key] = this[key];
                delete this[key];
            }
        }
        super.connectedCallback();
        for (const [key, value] of Object.entries(saved)) {
            this[key] = value;
        }
    }
    static styles = css `
    :host {
      display: block;
    }

    .card {
      background-color: var(--bg-elevated);
      border: 1px solid var(--border-color);
      border-radius: 0.5rem;
      overflow: hidden;
      transition: box-shadow 0.15s;
    }

    .card-elevated {
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }

    .card-header {
      padding: 1rem;
      border-bottom: 1px solid var(--border-color);
    }

    .card-title {
      margin: 0;
      font-size: 1rem;
      font-weight: 600;
      color: var(--text-primary);
    }

    .card-content {
      padding: 1rem;
      color: var(--text-secondary);
      font-size: 0.875rem;
      line-height: 1.5;
    }
  `;
    render() {
        return html `
      <div class="card ${this.elevated ? "card-elevated" : ""}">
        ${this.title
            ? html `
              <div class="card-header">
                <h3 class="card-title">${this.title}</h3>
              </div>
            `
            : ""}
        <div class="card-content">${this.content}</div>
      </div>
    `;
    }
};
__decorate([
    property()
], AppCard.prototype, "title", void 0);
__decorate([
    property()
], AppCard.prototype, "content", void 0);
__decorate([
    property({ type: Boolean })
], AppCard.prototype, "elevated", void 0);
__decorate([
    property({ type: Number })
], AppCard.prototype, "borderRadius", void 0);
__decorate([
    property({ type: Number })
], AppCard.prototype, "padding", void 0);
AppCard = __decorate([
    customElement("app-card")
], AppCard);

let AppStatsCard = class AppStatsCard extends LitElement {
    constructor() {
        super();
        for (const key of ["label", "value", "icon"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                const val = this[key];
                delete this[key];
                this[key] = val;
            }
        }
    }
    connectedCallback() {
        const saved = {};
        for (const key of ["label", "value", "icon"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                saved[key] = this[key];
                delete this[key];
            }
        }
        super.connectedCallback();
        for (const [key, value] of Object.entries(saved)) {
            this[key] = value;
        }
    }
    static styles = css `
    :host {
      display: block;
    }

    .stats-card {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      background-color: var(--bg-elevated);
      border: 1px solid var(--border-color);
      border-radius: 0.5rem;
    }

    .stats-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 3rem;
      height: 3rem;
      background-color: var(--accent);
      color: var(--text-on-accent);
      border-radius: 0.5rem;
      font-size: 1.5rem;
    }

    .stats-info {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .stats-value {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--text-primary);
      line-height: 1;
    }

    .stats-label {
      font-size: 0.875rem;
      color: var(--text-muted);
      font-weight: 500;
    }
  `;
    render() {
        return html `
      <div class="stats-card">
        ${this.icon
            ? html `<div class="stats-icon">${this.icon}</div>`
            : ""}
        <div class="stats-info">
          <span class="stats-value">${this.value}</span>
          <span class="stats-label">${this.label}</span>
        </div>
      </div>
    `;
    }
};
__decorate([
    property()
], AppStatsCard.prototype, "label", void 0);
__decorate([
    property()
], AppStatsCard.prototype, "value", void 0);
__decorate([
    property()
], AppStatsCard.prototype, "icon", void 0);
AppStatsCard = __decorate([
    customElement("app-stats-card")
], AppStatsCard);

let AppTableView = class AppTableView extends LitElement {
    constructor() {
        super();
        for (const key of ["columns", "data"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                const val = this[key];
                delete this[key];
                this[key] = val;
            }
        }
    }
    connectedCallback() {
        const saved = {};
        for (const key of ["columns", "data"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                saved[key] = this[key];
                delete this[key];
            }
        }
        super.connectedCallback();
        for (const [key, value] of Object.entries(saved)) {
            this[key] = value;
        }
    }
    _getColumns() {
        try {
            return JSON.parse(this.columns);
        }
        catch {
            return [];
        }
    }
    _getData() {
        try {
            return JSON.parse(this.data);
        }
        catch {
            return [];
        }
    }
    static styles = css `
    :host {
      display: block;
      overflow-x: auto;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.875rem;
    }

    th {
      text-align: left;
      padding: 0.75rem 1rem;
      background-color: var(--bg-secondary);
      color: var(--text-primary);
      font-weight: 600;
      border-bottom: 1px solid var(--border-color);
    }

    td {
      padding: 0.75rem 1rem;
      color: var(--text-primary);
      border-bottom: 1px solid var(--border-color);
    }

    tr:hover td {
      background-color: var(--bg-hover);
    }
  `;
    render() {
        const cols = this._getColumns();
        const rows = this._getData();
        return html `
      <table>
        <thead>
          <tr>
            ${cols.map((col) => html `<th>${col.name}</th>`)}
          </tr>
        </thead>
        <tbody>
          ${rows.map((row) => html `
              <tr>
                ${cols.map((col) => html `<td>${row[col.key] ?? ""}</td>`)}
              </tr>
            `)}
        </tbody>
      </table>
    `;
    }
};
__decorate([
    property()
], AppTableView.prototype, "columns", void 0);
__decorate([
    property()
], AppTableView.prototype, "data", void 0);
AppTableView = __decorate([
    customElement("app-table-view")
], AppTableView);

let AppDataTable = class AppDataTable extends LitElement {
    constructor() {
        super();
        for (const key of ["columns", "data", "selectable"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                const val = this[key];
                delete this[key];
                this[key] = val;
            }
        }
    }
    connectedCallback() {
        const saved = {};
        for (const key of ["columns", "data", "selectable"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                saved[key] = this[key];
                delete this[key];
            }
        }
        super.connectedCallback();
        for (const [key, value] of Object.entries(saved)) {
            this[key] = value;
        }
    }
    _selectedIndex = null;
    _getColumns() {
        try {
            return JSON.parse(this.columns);
        }
        catch {
            return [];
        }
    }
    _getData() {
        try {
            return JSON.parse(this.data);
        }
        catch {
            return [];
        }
    }
    _handleRowClick(index) {
        if (!this.selectable)
            return;
        this._selectedIndex = index;
        this.dispatchEvent(new CustomEvent("rowSelect", {
            detail: { index },
            bubbles: true,
            composed: true,
        }));
        this.requestUpdate();
    }
    static styles = css `
    :host {
      display: block;
      overflow-x: auto;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.875rem;
    }

    th {
      text-align: left;
      padding: 0.75rem 1rem;
      background-color: var(--bg-secondary);
      color: var(--text-primary);
      font-weight: 600;
      border-bottom: 1px solid var(--border-color);
    }

    td {
      padding: 0.75rem 1rem;
      color: var(--text-primary);
      border-bottom: 1px solid var(--border-color);
    }

    tr {
      cursor: default;
    }

    tr:hover td {
      background-color: var(--bg-hover);
    }

    tr.selected td {
      background-color: var(--accent);
      color: var(--text-on-accent);
    }

    tr.selectable {
      cursor: pointer;
    }

    .radio-cell {
      width: 2rem;
    }

    .radio {
      width: 1rem;
      height: 1rem;
      border: 2px solid var(--border-color);
      border-radius: 50%;
      display: inline-block;
    }

    tr.selected .radio {
      border-color: var(--text-on-accent);
      background-color: var(--text-on-accent);
    }
  `;
    render() {
        const cols = this._getColumns();
        const rows = this._getData();
        return html `
      <table>
        <thead>
          <tr>
            ${this.selectable ? html `<th class="radio-cell"></th>` : ""}
            ${cols.map((col) => html `<th>${col.name}</th>`)}
          </tr>
        </thead>
        <tbody>
          ${rows.map((row, index) => html `
              <tr
                class="${this._selectedIndex === index
            ? "selected"
            : ""} ${this.selectable ? "selectable" : ""}"
                @click="${() => this._handleRowClick(index)}"
              >
                ${this.selectable
            ? html `<td class="radio-cell"><span class="radio"></span></td>`
            : ""}
                ${cols.map((col) => html `<td>${row[col.key] ?? ""}</td>`)}
              </tr>
            `)}
        </tbody>
      </table>
    `;
    }
};
__decorate([
    property()
], AppDataTable.prototype, "columns", void 0);
__decorate([
    property()
], AppDataTable.prototype, "data", void 0);
__decorate([
    property({ type: Boolean })
], AppDataTable.prototype, "selectable", void 0);
AppDataTable = __decorate([
    customElement("app-data-table")
], AppDataTable);

let AppJsonView = class AppJsonView extends LitElement {
    constructor() {
        super();
        for (const key of ["data"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                const val = this[key];
                delete this[key];
                this[key] = val;
            }
        }
    }
    connectedCallback() {
        const saved = {};
        for (const key of ["data"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                saved[key] = this[key];
                delete this[key];
            }
        }
        super.connectedCallback();
        for (const [key, value] of Object.entries(saved)) {
            this[key] = value;
        }
    }
    _getFormattedJson() {
        try {
            const parsed = typeof this.data === "string" ? JSON.parse(this.data) : this.data;
            return JSON.stringify(parsed, null, 2);
        }
        catch {
            return String(this.data);
        }
    }
    static styles = css `
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
  `;
    _syntaxHighlight(json) {
        const result = [];
        const lines = json.split("\n");
        lines.forEach((line, lineIndex) => {
            const processed = line.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g, (match) => {
                let cls = "json-number";
                if (/^"/.test(match)) {
                    if (/:$/.test(match)) {
                        cls = "json-key";
                        return `<span class="${cls}">${match}</span>`;
                    }
                    else {
                        cls = "json-string";
                    }
                }
                else if (/true|false/.test(match)) {
                    cls = "json-boolean";
                }
                else if (/null/.test(match)) {
                    cls = "json-null";
                }
                return `<span class="${cls}">${match}</span>`;
            });
            result.push(html `${processed}${lineIndex < lines.length - 1 ? html `<br/>` : ""}`);
        });
        return result;
    }
    render() {
        const formatted = this._getFormattedJson();
        return html `
      <div class="json-container">
        ${this._syntaxHighlight(formatted)}
      </div>
    `;
    }
};
__decorate([
    property()
], AppJsonView.prototype, "data", void 0);
AppJsonView = __decorate([
    customElement("app-json-view")
], AppJsonView);

let AppComponentPalette = class AppComponentPalette extends LitElement {
    constructor() {
        super();
        for (const key of ["categories", "searchable", "_searchQuery", "_collapsedCategories"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                const val = this[key];
                delete this[key];
                this[key] = val;
            }
        }
        if (!this._searchQuery)
            this._searchQuery = "";
        if (!this._collapsedCategories)
            this._collapsedCategories = new Set();
    }
    connectedCallback() {
        const saved = {};
        for (const key of ["categories", "searchable"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                saved[key] = this[key];
                delete this[key];
            }
        }
        super.connectedCallback();
        for (const [key, value] of Object.entries(saved)) {
            this[key] = value;
        }
    }
    _getCategories() {
        try {
            return JSON.parse(this.categories);
        }
        catch {
            return [];
        }
    }
    _toggleCategory(name) {
        if (this._collapsedCategories.has(name)) {
            this._collapsedCategories.delete(name);
        }
        else {
            this._collapsedCategories.add(name);
        }
        this.requestUpdate();
    }
    _filterComponents(components) {
        if (!this._searchQuery)
            return components;
        return components.filter((c) => c.toLowerCase().includes(this._searchQuery.toLowerCase()));
    }
    static styles = css `
    :host {
      display: block;
      background-color: var(--bg-elevated);
      border-right: 1px solid var(--border-color);
      height: 100%;
      overflow-y: auto;
    }

    .palette-header {
      padding: 1rem;
      border-bottom: 1px solid var(--border-color);
    }

    .palette-title {
      font-size: 0.875rem;
      font-weight: 600;
      color: var(--text-primary);
      margin-bottom: 0.75rem;
    }

    .search-input {
      width: 100%;
      padding: 0.5rem 0.75rem;
      border: 1px solid var(--border-color);
      border-radius: 0.5rem;
      background-color: var(--bg-primary);
      color: var(--text-primary);
      font-size: 0.875rem;
      box-sizing: border-box;
    }

    .search-input::placeholder {
      color: var(--text-muted);
    }

    .search-input:focus {
      outline: none;
      border-color: var(--accent);
    }

    .category {
      border-bottom: 1px solid var(--border-color);
    }

    .category-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.75rem 1rem;
      cursor: pointer;
      color: var(--text-primary);
      font-weight: 500;
      font-size: 0.875rem;
    }

    .category-header:hover {
      background-color: var(--bg-hover);
    }

    .category-arrow {
      transition: transform 0.2s;
      font-size: 0.75rem;
    }

    .category-arrow.collapsed {
      transform: rotate(-90deg);
    }

    .category-items {
      padding: 0 1rem 0.75rem;
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .category-items.collapsed {
      display: none;
    }

    .component-item {
      padding: 0.5rem 0.75rem;
      border-radius: 0.375rem;
      font-size: 0.875rem;
      color: var(--text-secondary);
      cursor: grab;
    }

    .component-item:hover {
      background-color: var(--bg-hover);
      color: var(--text-primary);
    }

    .component-item:active {
      cursor: grabbing;
    }
  `;
    render() {
        const categories = this._getCategories();
        return html `
      <div class="palette-header">
        <div class="palette-title">Components</div>
        ${this.searchable
            ? html `
              <input
                type="text"
                class="search-input"
                placeholder="Search components..."
                .value="${this._searchQuery}"
                @input="${(e) => {
                this._searchQuery = e.target.value;
            }}"
              />
            `
            : ""}
      </div>
      <div class="palette-content">
        ${categories.map((cat) => html `
            <div class="category">
              <div
                class="category-header"
                @click="${() => this._toggleCategory(cat.name)}"
              >
                <span>${cat.name}</span>
                <span
                  class="category-arrow ${this._collapsedCategories.has(cat.name)
            ? "collapsed"
            : ""}"
                >▼</span>
              </div>
              <div
                class="category-items ${this._collapsedCategories.has(cat.name)
            ? "collapsed"
            : ""}"
              >
                ${this._filterComponents(cat.components).map((comp) => html `
                    <div class="component-item" draggable="true">${comp}</div>
                  `)}
              </div>
            </div>
          `)}
      </div>
    `;
    }
};
__decorate([
    property()
], AppComponentPalette.prototype, "categories", void 0);
__decorate([
    property({ type: Boolean })
], AppComponentPalette.prototype, "searchable", void 0);
__decorate([
    state()
], AppComponentPalette.prototype, "_searchQuery", void 0);
__decorate([
    state()
], AppComponentPalette.prototype, "_collapsedCategories", void 0);
AppComponentPalette = __decorate([
    customElement("app-component-palette")
], AppComponentPalette);

let AppCanvas = class AppCanvas extends LitElement {
    constructor() {
        super();
        for (const key of ["elements", "gridColumns", "showGrid", "selectedId"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                const val = this[key];
                delete this[key];
                this[key] = val;
            }
        }
    }
    connectedCallback() {
        const saved = {};
        for (const key of ["elements", "gridColumns", "showGrid", "selectedId"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                saved[key] = this[key];
                delete this[key];
            }
        }
        super.connectedCallback();
        for (const [key, value] of Object.entries(saved)) {
            this[key] = value;
        }
    }
    static styles = css `
    :host {
      display: block;
      width: 100%;
      height: 100%;
      background-color: var(--bg-primary);
      position: relative;
      overflow: auto;
    }

    .canvas-area {
      min-width: 100%;
      min-height: 100%;
      position: relative;
    }

    .grid {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      pointer-events: none;
      display: grid;
      grid-template-columns: repeat(var(--grid-cols), 1fr);
      gap: 0;
    }

    .grid-cell {
      border-right: 1px solid var(--border-color);
      border-bottom: 1px solid var(--border-color);
      min-height: 4rem;
    }

    .grid.visible {
      background-color: rgba(0, 0, 0, 0.02);
    }

    .canvas-drop-zone {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }

    .canvas-element {
      position: absolute;
      border: 2px dashed transparent;
      border-radius: 0.5rem;
      padding: 0.5rem;
      cursor: move;
      transition: border-color 0.15s;
    }

    .canvas-element:hover {
      border-color: var(--accent);
    }

    .canvas-element.selected {
      border-color: var(--accent);
      border-style: solid;
      box-shadow: 0 0 0 2px rgba(var(--accent-rgb, 99, 102, 241), 0.2);
    }

    .canvas-placeholder {
      border: 2px dashed var(--border-color);
      border-radius: 0.5rem;
      background-color: var(--bg-secondary);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--text-muted);
      font-size: 0.875rem;
    }
  `;
    render() {
        const gridStyle = `--grid-cols: ${this.gridColumns}`;
        const elements = this.elements || [];
        return html `
      <div class="canvas-area" style="${gridStyle}">
        ${this.showGrid
            ? html `
              <div class="grid visible" style="${gridStyle}">
                ${Array(this.gridColumns * 6)
                .fill(0)
                .map(() => html `
                      <div class="grid-cell"></div>
                    `)}
              </div>
            `
            : ""}
        ${elements.length > 0
            ? elements.map((el) => html `
                <div
                  class="canvas-element ${this.selectedId === el.id ? "selected" : ""}"
                  style="
                    grid-column: ${el.gridPosition?.column || 1} / span ${el.gridPosition?.colSpan || 1};
                    grid-row: ${el.gridPosition?.row || 1} / span ${el.gridPosition?.rowSpan || 1};
                  "
                >
                  <span>${el.icon || "⊡"}</span>
                  <span>${el.name || el.componentId}</span>
                </div>
              `)
            : html `
              <div class="canvas-placeholder">
                <slot></slot>
              </div>
            `}
      </div>
    `;
    }
};
__decorate([
    property({ type: Array })
], AppCanvas.prototype, "elements", void 0);
__decorate([
    property({ type: Number })
], AppCanvas.prototype, "gridColumns", void 0);
__decorate([
    property({ type: Boolean })
], AppCanvas.prototype, "showGrid", void 0);
__decorate([
    property()
], AppCanvas.prototype, "selectedId", void 0);
AppCanvas = __decorate([
    customElement("app-canvas")
], AppCanvas);

let AppPropertiesPanel = class AppPropertiesPanel extends LitElement {
    constructor() {
        super();
        for (const key of ["element", "_properties", "_elementId"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                const val = this[key];
                delete this[key];
                this[key] = val;
            }
        }
        if (!this._properties)
            this._properties = [];
        if (!this._elementId)
            this._elementId = null;
    }
    connectedCallback() {
        const saved = {};
        for (const key of ["element"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                saved[key] = this[key];
                delete this[key];
            }
        }
        super.connectedCallback();
        for (const [key, value] of Object.entries(saved)) {
            this[key] = value;
        }
    }
    _parseElement() {
        try {
            const parsed = JSON.parse(this.element);
            this._elementId = parsed.id || null;
            this._properties = parsed.properties || [];
        }
        catch {
            this._properties = [];
            this._elementId = null;
        }
    }
    updated(changedProperties) {
        if (changedProperties.has("element")) {
            this._parseElement();
        }
    }
    _handlePropertyChange(key, value) {
        this.dispatchEvent(new CustomEvent("propertyChange", {
            detail: { key, value },
            bubbles: true,
            composed: true,
        }));
    }
    static styles = css `
    :host {
      display: block;
      background-color: var(--bg-elevated);
      border-left: 1px solid var(--border-color);
      height: 100%;
      overflow-y: auto;
    }

    .panel-header {
      padding: 1rem;
      border-bottom: 1px solid var(--border-color);
    }

    .panel-title {
      font-size: 0.875rem;
      font-weight: 600;
      color: var(--text-primary);
      margin-bottom: 0.25rem;
    }

    .element-id {
      font-size: 0.75rem;
      color: var(--text-muted);
      font-family: monospace;
    }

    .properties-section {
      padding: 1rem;
    }

    .section-title {
      font-size: 0.75rem;
      font-weight: 600;
      color: var(--text-secondary);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 0.75rem;
    }

    .property-row {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      margin-bottom: 0.75rem;
    }

    .property-label {
      font-size: 0.875rem;
      color: var(--text-primary);
    }

    .property-input {
      padding: 0.5rem 0.75rem;
      border: 1px solid var(--border-color);
      border-radius: 0.5rem;
      background-color: var(--bg-primary);
      color: var(--text-primary);
      font-size: 0.875rem;
    }

    .property-input:focus {
      outline: none;
      border-color: var(--accent);
    }

    .property-input[type="checkbox"] {
      width: 1rem;
      height: 1rem;
    }

    select.property-input {
      cursor: pointer;
    }

    .empty-state {
      padding: 2rem 1rem;
      text-align: center;
      color: var(--text-muted);
      font-size: 0.875rem;
    }
  `;
    render() {
        return html `
      <div class="panel-header">
        <div class="panel-title">Properties</div>
        ${this._elementId
            ? html `<div class="element-id">${this._elementId}</div>`
            : ""}
      </div>
      ${this._properties.length > 0
            ? html `
            <div class="properties-section">
              <div class="section-title">Properties</div>
              ${this._properties.map((prop) => html `
                  <div class="property-row">
                    <label class="property-label">${prop.label}</label>
                    ${prop.type === "boolean"
                ? html `
                          <input
                            type="checkbox"
                            class="property-input"
                            ?checked="${Boolean(prop.value)}"
                            @change="${(e) => this._handlePropertyChange(prop.key, e.target.checked)}"
                          />
                        `
                : prop.type === "select"
                    ? html `
                            <select
                              class="property-input"
                              .value="${String(prop.value)}"
                              @change="${(e) => this._handlePropertyChange(prop.key, e.target.value)}"
                            >
                              ${(prop.options || []).map((opt) => html `
                                  <option value="${opt}">${opt}</option>
                                `)}
                            </select>
                          `
                    : html `
                            <input
                              type="${prop.type === "number"
                        ? "number"
                        : "text"}"
                              class="property-input"
                              .value="${String(prop.value)}"
                              @input="${(e) => this._handlePropertyChange(prop.key, prop.type === "number"
                        ? Number(e.target.value)
                        : e.target.value)}"
                            />
                          `}
                  </div>
                `)}
            </div>
          `
            : html `<div class="empty-state">No element selected</div>`}
    `;
    }
};
__decorate([
    property()
], AppPropertiesPanel.prototype, "element", void 0);
__decorate([
    state()
], AppPropertiesPanel.prototype, "_properties", void 0);
__decorate([
    state()
], AppPropertiesPanel.prototype, "_elementId", void 0);
AppPropertiesPanel = __decorate([
    customElement("app-properties-panel")
], AppPropertiesPanel);

let AppBottomPanel = class AppBottomPanel extends LitElement {
    constructor() {
        super();
        for (const key of ["tabs", "activeTab", "position", "fullWidth", "floating", "borderRadius"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                const val = this[key];
                delete this[key];
                this[key] = val;
            }
        }
    }
    connectedCallback() {
        const saved = {};
        for (const key of ["tabs", "activeTab", "position", "fullWidth", "floating", "borderRadius"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                saved[key] = this[key];
                delete this[key];
            }
        }
        super.connectedCallback();
        for (const [key, value] of Object.entries(saved)) {
            this[key] = value;
        }
    }
    _getTabs() {
        try {
            return JSON.parse(this.tabs);
        }
        catch {
            return [];
        }
    }
    _handleTabClick(tabId) {
        this.dispatchEvent(new CustomEvent("tabChange", {
            detail: { tabId },
            bubbles: true,
            composed: true,
        }));
    }
    static styles = css `
    :host {
      display: flex;
      flex-direction: column;
      background-color: var(--bg-elevated);
      border-top: 1px solid var(--border-color);
      height: 100%;
    }

    .panel-tabs {
      display: flex;
      gap: 0;
      border-bottom: 1px solid var(--border-color);
      padding: 0 0.5rem;
    }

    .panel-tab {
      padding: 0.75rem 1rem;
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--text-secondary);
      cursor: pointer;
      border-bottom: 2px solid transparent;
      margin-bottom: -1px;
      transition: all 0.15s;
    }

    .panel-tab:hover {
      color: var(--text-primary);
    }

    .panel-tab.active {
      color: var(--accent);
      border-bottom-color: var(--accent);
    }

    .panel-content {
      flex: 1;
      overflow: auto;
      padding: 1rem;
    }

    .empty-state {
      color: var(--text-muted);
      font-size: 0.875rem;
      text-align: center;
      padding: 2rem;
    }
  `;
    render() {
        const tabsList = this._getTabs();
        return html `
      <div class="panel-tabs">
        ${tabsList.map((tab) => html `
            <div
              class="panel-tab ${this.activeTab === tab.id ? "active" : ""}"
              @click="${() => this._handleTabClick(tab.id)}"
            >
              ${tab.label}
            </div>
          `)}
      </div>
      <div class="panel-content">
        <slot></slot>
      </div>
    `;
    }
};
__decorate([
    property()
], AppBottomPanel.prototype, "tabs", void 0);
__decorate([
    property()
], AppBottomPanel.prototype, "activeTab", void 0);
__decorate([
    property()
], AppBottomPanel.prototype, "position", void 0);
__decorate([
    property({ type: Boolean })
], AppBottomPanel.prototype, "fullWidth", void 0);
__decorate([
    property({ type: Boolean })
], AppBottomPanel.prototype, "floating", void 0);
__decorate([
    property({ type: Number })
], AppBottomPanel.prototype, "borderRadius", void 0);
AppBottomPanel = __decorate([
    customElement("app-bottom-panel")
], AppBottomPanel);

let AppHeader = class AppHeader extends LitElement {
    constructor() {
        super();
        for (const key of ["title", "showBack", "breadcrumbs"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                const val = this[key];
                delete this[key];
                this[key] = val;
            }
        }
    }
    connectedCallback() {
        const saved = {};
        for (const key of ["title", "showBack", "breadcrumbs"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                saved[key] = this[key];
                delete this[key];
            }
        }
        super.connectedCallback();
        for (const [key, value] of Object.entries(saved)) {
            this[key] = value;
        }
    }
    static styles = css `
    :host {
      display: block;
    }

    header {
      display: flex;
      align-items: center;
      padding: 1rem 1.5rem;
      background: var(--bg-header, var(--bg-elevated));
      border-bottom: 1px solid var(--border-color);
      min-height: 56px;
      gap: 1rem;
    }

    .back-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      border: 1px solid var(--border-color);
      border-radius: 0.5rem;
      background: var(--bg-elevated);
      color: var(--text-primary);
      cursor: pointer;
      transition: all 0.15s;
      padding: 0;
      font-size: 1.25rem;
    }

    .back-btn:hover {
      background: var(--bg-hover);
    }

    .title-area {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    h1 {
      margin: 0;
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--text-primary);
    }

    .breadcrumbs {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.875rem;
      color: var(--text-secondary);
    }

    .breadcrumb-separator {
      color: var(--text-secondary);
      opacity: 0.5;
    }
  `;
    _handleBack() {
        this.dispatchEvent(new CustomEvent("navigate-back", { bubbles: true, composed: true }));
    }
    _getBreadcrumbs() {
        try {
            return JSON.parse(this.breadcrumbs);
        }
        catch {
            return [];
        }
    }
    render() {
        const crumbs = this._getBreadcrumbs();
        return html `
      <header>
        ${this.showBack
            ? html `
              <button class="back-btn" @click="${this._handleBack}">
                ←
              </button>
            `
            : ""}
        <div class="title-area">
          <h1>${this.title}</h1>
          ${crumbs.length > 0
            ? html `
                <div class="breadcrumbs">
                  ${crumbs.map((crumb, i) => html `
                      ${i > 0
                ? html `<span class="breadcrumb-separator">/</span>`
                : ""}
                      <span>${crumb}</span>
                    `)}
                </div>
              `
            : ""}
        </div>
        <slot></slot>
      </header>
    `;
    }
};
__decorate([
    property()
], AppHeader.prototype, "title", void 0);
__decorate([
    property({ type: Boolean })
], AppHeader.prototype, "showBack", void 0);
__decorate([
    property()
], AppHeader.prototype, "breadcrumbs", void 0);
AppHeader = __decorate([
    customElement("app-header")
], AppHeader);

let AppSidebar = class AppSidebar extends LitElement {
    constructor() {
        super();
        for (const key of ["collapsed", "items", "width", "collapsedWidth"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                const val = this[key];
                delete this[key];
                this[key] = val;
            }
        }
    }
    connectedCallback() {
        const saved = {};
        for (const key of ["collapsed", "items", "width", "collapsedWidth"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                saved[key] = this[key];
                delete this[key];
            }
        }
        super.connectedCallback();
        for (const [key, value] of Object.entries(saved)) {
            this[key] = value;
        }
    }
    static styles = css `
    :host {
      display: block;
    }

    aside {
      display: flex;
      flex-direction: column;
      width: var(--sidebar-width, 240px);
      min-width: var(--sidebar-width, 240px);
      height: 100%;
      background: var(--bg-elevated);
      border-right: 1px solid var(--border-color);
      transition: width 0.2s, min-width 0.2s;
      overflow: hidden;
    }

    aside.collapsed {
      width: 64px;
      min-width: 64px;
    }

    .sidebar-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem;
      border-bottom: 1px solid var(--border-color);
      min-height: 56px;
    }

    .collapse-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      border: 1px solid var(--border-color);
      border-radius: 0.5rem;
      background: transparent;
      color: var(--text-secondary);
      cursor: pointer;
      transition: all 0.15s;
      padding: 0;
      font-size: 1.25rem;
    }

    .collapse-btn:hover {
      background: var(--bg-hover);
      color: var(--text-primary);
    }

    nav {
      flex: 1;
      overflow-y: auto;
      overflow-x: hidden;
      padding: 0.5rem;
    }

    .nav-section {
      margin-bottom: 0.5rem;
    }

    .nav-section-title {
      padding: 0.5rem 0.75rem;
      font-size: 0.75rem;
      font-weight: 600;
      color: var(--text-secondary);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    ul {
      list-style: none;
      margin: 0;
      padding: 0;
    }

    li {
      margin: 0;
    }

    .nav-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.625rem 0.75rem;
      border-radius: 0.5rem;
      color: var(--text-secondary);
      text-decoration: none;
      cursor: pointer;
      transition: all 0.15s;
      white-space: nowrap;
      overflow: hidden;
    }

    .nav-item:hover {
      background: var(--bg-hover);
      color: var(--text-primary);
    }

    .nav-item.active {
      background: var(--accent);
      color: var(--text-on-accent);
    }

    .nav-item-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;
      font-size: 1.25rem;
      flex-shrink: 0;
    }

    .nav-item-label {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .nav-item-children {
      margin-left: 1.25rem;
      border-left: 1px solid var(--border-color);
      padding-left: 0.5rem;
    }
  `;
    _toggleCollapse() {
        this.collapsed = !this.collapsed;
        this.dispatchEvent(new CustomEvent("collapse-change", {
            detail: { collapsed: this.collapsed },
            bubbles: true,
            composed: true,
        }));
    }
    _getItems() {
        try {
            return JSON.parse(this.items);
        }
        catch {
            return [];
        }
    }
    _handleItemClick(item) {
        this.dispatchEvent(new CustomEvent("item-click", {
            detail: item,
            bubbles: true,
            composed: true,
        }));
    }
    _renderItem(item, depth = 0) {
        const hasChildren = item.children && item.children.length > 0;
        return html `
      <li>
        <div
          class="nav-item ${depth > 0 ? "nav-item-child" : ""}"
          @click="${() => this._handleItemClick(item)}"
        >
          ${item.icon
            ? html `<span class="nav-item-icon">${item.icon}</span>`
            : ""}
          <span class="nav-item-label">${item.label}</span>
        </div>
        ${hasChildren
            ? html `
              <ul class="nav-item-children">
                ${item.children.map((child) => this._renderItem(child, depth + 1))}
              </ul>
            `
            : ""}
      </li>
    `;
    }
    render() {
        const menuItems = this._getItems();
        return html `
      <aside class="${this.collapsed ? "collapsed" : ""}">
        <div class="sidebar-header">
          <button class="collapse-btn" @click="${this._toggleCollapse}">
            ${this.collapsed ? "→" : "←"}
          </button>
        </div>
        <nav>
          <ul>
            ${menuItems.map((item) => this._renderItem(item))}
          </ul>
        </nav>
        <slot></slot>
      </aside>
    `;
    }
};
__decorate([
    property({ type: Boolean })
], AppSidebar.prototype, "collapsed", void 0);
__decorate([
    property()
], AppSidebar.prototype, "items", void 0);
__decorate([
    property({ type: Number })
], AppSidebar.prototype, "width", void 0);
__decorate([
    property({ type: Number })
], AppSidebar.prototype, "collapsedWidth", void 0);
AppSidebar = __decorate([
    customElement("app-sidebar")
], AppSidebar);

let AppFooter = class AppFooter extends LitElement {
    constructor() {
        super();
        for (const key of ["text"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                const val = this[key];
                delete this[key];
                this[key] = val;
            }
        }
    }
    connectedCallback() {
        const saved = {};
        for (const key of ["text"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                saved[key] = this[key];
                delete this[key];
            }
        }
        super.connectedCallback();
        for (const [key, value] of Object.entries(saved)) {
            this[key] = value;
        }
    }
    static styles = css `
    :host {
      display: block;
    }

    footer {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem;
      background: var(--bg-elevated);
      border-top: 1px solid var(--border-color);
      min-height: 48px;
    }

    .footer-text {
      margin: 0;
      font-size: 0.875rem;
      color: var(--text-secondary);
      text-align: center;
    }
  `;
    render() {
        return html `
      <footer>
        <p class="footer-text">${this.text}</p>
        <slot></slot>
      </footer>
    `;
    }
};
__decorate([
    property()
], AppFooter.prototype, "text", void 0);
AppFooter = __decorate([
    customElement("app-footer")
], AppFooter);

let AppPageContainer = class AppPageContainer extends LitElement {
    constructor() {
        super();
        for (const key of ["title"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                const val = this[key];
                delete this[key];
                this[key] = val;
            }
        }
    }
    connectedCallback() {
        const saved = {};
        for (const key of ["title"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                saved[key] = this[key];
                delete this[key];
            }
        }
        super.connectedCallback();
        for (const [key, value] of Object.entries(saved)) {
            this[key] = value;
        }
    }
    static styles = css `
    :host {
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    .page-header {
      display: flex;
      align-items: center;
      padding: 1rem 1.5rem;
      background: var(--bg-elevated);
      border-bottom: 1px solid var(--border-color);
      min-height: 56px;
      gap: 1rem;
    }

    .page-title {
      margin: 0;
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--text-primary);
    }

    .page-header-actions {
      margin-left: auto;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .page-content {
      flex: 1;
      overflow: auto;
      padding: 1.5rem;
    }
  `;
    render() {
        return html `
      ${this.title
            ? html `
            <div class="page-header">
              <h1 class="page-title">${this.title}</h1>
              <div class="page-header-actions">
                <slot name="header-actions"></slot>
              </div>
            </div>
          `
            : ""}
      <div class="page-content">
        <slot></slot>
      </div>
    `;
    }
};
__decorate([
    property()
], AppPageContainer.prototype, "title", void 0);
AppPageContainer = __decorate([
    customElement("app-page-container")
], AppPageContainer);

let AppPageToolbar = class AppPageToolbar extends LitElement {
    constructor() {
        super();
        for (const key of ["title", "actions"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                const val = this[key];
                delete this[key];
                this[key] = val;
            }
        }
    }
    connectedCallback() {
        const saved = {};
        for (const key of ["title", "actions"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                saved[key] = this[key];
                delete this[key];
            }
        }
        super.connectedCallback();
        for (const [key, value] of Object.entries(saved)) {
            this[key] = value;
        }
    }
    static styles = css `
    :host {
      display: block;
    }

    .toolbar {
      display: flex;
      align-items: center;
      padding: 1rem 1.5rem;
      background: var(--bg-elevated);
      border-bottom: 1px solid var(--border-color);
      gap: 1rem;
      flex-wrap: wrap;
    }

    .toolbar-title-area {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      min-width: 200px;
    }

    .toolbar-title {
      margin: 0;
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--text-primary);
    }

    .toolbar-subtitle {
      margin: 0;
      font-size: 0.875rem;
      color: var(--text-secondary);
    }

    .toolbar-actions {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      flex-wrap: wrap;
    }

    .action-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      border: 1px solid var(--border-color);
      background: var(--bg-elevated);
      color: var(--text-primary);
      font-weight: 500;
      cursor: pointer;
      transition: all 0.15s;
      font-size: 0.875rem;
    }

    .action-btn:hover {
      background: var(--bg-hover);
    }

    .action-btn.primary {
      border-color: var(--accent);
      background: var(--accent);
      color: var(--text-on-accent);
    }

    .action-btn.primary:hover {
      background: var(--accent-hover);
      border-color: var(--accent-hover);
    }

    .action-btn.danger {
      border-color: var(--error);
      background: var(--error);
      color: var(--text-on-error);
    }

    .action-btn.ghost {
      border-color: transparent;
      background: transparent;
      color: var(--text-secondary);
    }

    .action-btn.ghost:hover {
      background: var(--bg-hover);
      color: var(--text-primary);
    }

    .action-icon {
      font-size: 1.125rem;
    }
  `;
    _getActions() {
        try {
            return JSON.parse(this.actions);
        }
        catch {
            return [];
        }
    }
    _handleActionClick(action) {
        this.dispatchEvent(new CustomEvent("action-click", {
            detail: action,
            bubbles: true,
            composed: true,
        }));
    }
    render() {
        const parsedActions = this._getActions();
        return html `
      <div class="toolbar">
        <div class="toolbar-title-area">
          <h2 class="toolbar-title">${this.title}</h2>
          <slot name="subtitle"></slot>
        </div>
        <div class="toolbar-actions">
          ${parsedActions.map((action) => html `
              <button
                class="action-btn ${action.variant || "secondary"}"
                @click="${() => this._handleActionClick(action)}"
              >
                ${action.icon
            ? html `<span class="action-icon">${action.icon}</span>`
            : ""}
                ${action.label}
              </button>
            `)}
          <slot></slot>
        </div>
      </div>
    `;
    }
};
__decorate([
    property()
], AppPageToolbar.prototype, "title", void 0);
__decorate([
    property()
], AppPageToolbar.prototype, "actions", void 0);
AppPageToolbar = __decorate([
    customElement("app-page-toolbar")
], AppPageToolbar);

let AppSplitView = class AppSplitView extends LitElement {
    constructor() {
        super();
        for (const key of ["direction", "split", "minFirst", "minSecond"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                const val = this[key];
                delete this[key];
                this[key] = val;
            }
        }
    }
    connectedCallback() {
        const saved = {};
        for (const key of ["direction", "split", "minFirst", "minSecond"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                saved[key] = this[key];
                delete this[key];
            }
        }
        super.connectedCallback();
        for (const [key, value] of Object.entries(saved)) {
            this[key] = value;
        }
    }
    _isDragging = false;
    static styles = css `
    :host {
      display: block;
      height: 100%;
    }

    .split-container {
      display: flex;
      height: 100%;
      width: 100%;
      overflow: hidden;
    }

    .split-container.vertical {
      flex-direction: column;
    }

    .split-pane {
      overflow: auto;
      min-width: 0;
      min-height: 0;
    }

    .split-pane.first {
      flex-shrink: 0;
    }

    .split-container.horizontal .split-pane.first {
      height: 100%;
    }

    .split-container.vertical .split-pane.first {
      width: 100%;
    }

    .split-divider {
      flex-shrink: 0;
      background: var(--border-color);
      transition: background 0.15s;
      position: relative;
      z-index: 1;
    }

    .split-container.horizontal .split-divider {
      width: 6px;
      cursor: col-resize;
    }

    .split-container.vertical .split-divider {
      height: 6px;
      cursor: row-resize;
    }

    .split-divider:hover,
    .split-divider.dragging {
      background: var(--accent);
    }

    .split-divider::after {
      content: "";
      position: absolute;
      background: transparent;
    }

    .horizontal .split-divider::after {
      top: 0;
      bottom: 0;
      left: -4px;
      right: -4px;
    }

    .vertical .split-divider::after {
      left: 0;
      right: 0;
      top: -4px;
      bottom: -4px;
    }
  `;
    _onDividerMouseDown(e) {
        e.preventDefault();
        this._isDragging = true;
        const onMouseMove = (e) => {
            if (!this._isDragging)
                return;
            const container = this.shadowRoot?.querySelector(".split-container");
            if (!container)
                return;
            const rect = container.getBoundingClientRect();
            if (this.direction === "horizontal") {
                const percentage = ((e.clientX - rect.left) / rect.width) * 100;
                const clamped = Math.max(this.minFirst, Math.min(100 - this.minSecond, percentage));
                this.split = clamped;
            }
            else {
                const percentage = ((e.clientY - rect.top) / rect.height) * 100;
                const clamped = Math.max(this.minFirst, Math.min(100 - this.minSecond, percentage));
                this.split = clamped;
            }
        };
        const onMouseUp = () => {
            this._isDragging = false;
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
        };
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
    }
    render() {
        const firstSize = this.direction === "horizontal" ? "width" : "height";
        const secondSize = this.direction === "horizontal" ? "width" : "height";
        return html `
      <div class="split-container ${this.direction}">
        <div
          class="split-pane first"
          style="${firstSize}: ${this.split}%; flex-grow: 0;"
        >
          <slot name="first"></slot>
        </div>
        <div
          class="split-divider ${this._isDragging ? "dragging" : ""}"
          @mousedown="${this._onDividerMouseDown}"
        ></div>
        <div class="split-pane second" style="${secondSize}: auto; flex: 1;">
          <slot name="second"></slot>
        </div>
      </div>
    `;
    }
};
__decorate([
    property()
], AppSplitView.prototype, "direction", void 0);
__decorate([
    property({ type: Number })
], AppSplitView.prototype, "split", void 0);
__decorate([
    property({ type: Number })
], AppSplitView.prototype, "minFirst", void 0);
__decorate([
    property({ type: Number })
], AppSplitView.prototype, "minSecond", void 0);
__decorate([
    state()
], AppSplitView.prototype, "_isDragging", void 0);
AppSplitView = __decorate([
    customElement("app-split-view")
], AppSplitView);

let AppAvatar = class AppAvatar extends LitElement {
    constructor() {
        super();
        for (const key of ["src", "alt", "size"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                const val = this[key];
                delete this[key];
                this[key] = val;
            }
        }
    }
    connectedCallback() {
        const saved = {};
        for (const key of ["src", "alt", "size"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                saved[key] = this[key];
                delete this[key];
            }
        }
        super.connectedCallback();
        for (const [key, value] of Object.entries(saved)) {
            this[key] = value;
        }
    }
    static styles = css `
    :host {
      display: inline-flex;
    }

    .avatar {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      overflow: hidden;
      background-color: var(--bg-elevated);
      border: 1px solid var(--border-color);
    }

    .avatar-sm {
      width: 2rem;
      height: 2rem;
      font-size: 0.75rem;
    }

    .avatar-md {
      width: 2.5rem;
      height: 2.5rem;
      font-size: 0.875rem;
    }

    .avatar-lg {
      width: 3.5rem;
      height: 3.5rem;
      font-size: 1.25rem;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .initials {
      font-weight: 600;
      color: var(--text-secondary);
      text-transform: uppercase;
    }
  `;
    _getInitials() {
        if (!this.alt)
            return "?";
        return this.alt
            .split(" ")
            .map((w) => w[0])
            .join("")
            .slice(0, 2);
    }
    _handleImageError() {
        this.src = "";
    }
    render() {
        const sizeClass = `avatar-${this.size}`;
        if (this.src) {
            return html `
        <div class="avatar ${sizeClass}">
          <img src="${this.src}" alt="${this.alt}" @error="${this._handleImageError}" />
        </div>
      `;
        }
        return html `
      <div class="avatar ${sizeClass}">
        <span class="initials">${this._getInitials()}</span>
      </div>
    `;
    }
};
__decorate([
    property()
], AppAvatar.prototype, "src", void 0);
__decorate([
    property()
], AppAvatar.prototype, "alt", void 0);
__decorate([
    property()
], AppAvatar.prototype, "size", void 0);
AppAvatar = __decorate([
    customElement("app-avatar")
], AppAvatar);

let AppChip = class AppChip extends LitElement {
    constructor() {
        super();
        for (const key of ["label", "removable", "icon"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                const val = this[key];
                delete this[key];
                this[key] = val;
            }
        }
    }
    connectedCallback() {
        const saved = {};
        for (const key of ["label", "removable", "icon"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                saved[key] = this[key];
                delete this[key];
            }
        }
        super.connectedCallback();
        for (const [key, value] of Object.entries(saved)) {
            this[key] = value;
        }
    }
    static styles = css `
    :host {
      display: inline-flex;
    }

    .chip {
      display: inline-flex;
      align-items: center;
      gap: 0.375rem;
      padding: 0.25rem 0.75rem;
      border-radius: 1rem;
      background-color: var(--bg-elevated);
      border: 1px solid var(--border-color);
      color: var(--text-primary);
      font-size: 0.875rem;
      font-weight: 500;
      transition: background-color 0.15s;
    }

    .chip:hover {
      background-color: var(--bg-hover);
    }

    .chip-icon {
      font-size: 1rem;
    }

    .remove-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 1rem;
      height: 1rem;
      padding: 0;
      border: none;
      background: transparent;
      color: var(--text-secondary);
      cursor: pointer;
      border-radius: 50%;
      transition: background-color 0.15s;
      margin-left: 0.125rem;
    }

    .remove-btn:hover {
      background-color: var(--border-color);
      color: var(--text-primary);
    }
  `;
    _handleRemove(e) {
        e.stopPropagation();
        this.dispatchEvent(new CustomEvent("remove", { bubbles: true, composed: true }));
    }
    render() {
        return html `
      <span class="chip">
        ${this.icon ? html `<i class="material-icons chip-icon">${this.icon}</i>` : ""}
        <span>${this.label}</span>
        ${this.removable
            ? html `<button class="remove-btn" @click="${this._handleRemove}" aria-label="Remove">×</button>`
            : ""}
      </span>
    `;
    }
};
__decorate([
    property()
], AppChip.prototype, "label", void 0);
__decorate([
    property({ type: Boolean })
], AppChip.prototype, "removable", void 0);
__decorate([
    property()
], AppChip.prototype, "icon", void 0);
AppChip = __decorate([
    customElement("app-chip")
], AppChip);

let AppPagination = class AppPagination extends LitElement {
    constructor() {
        super();
        for (const key of ["page", "total", "pageSize"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                const val = this[key];
                delete this[key];
                this[key] = val;
            }
        }
    }
    connectedCallback() {
        const saved = {};
        for (const key of ["page", "total", "pageSize"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                saved[key] = this[key];
                delete this[key];
            }
        }
        super.connectedCallback();
        for (const [key, value] of Object.entries(saved)) {
            this[key] = value;
        }
    }
    static styles = css `
    :host {
      display: block;
    }

    .pagination {
      display: inline-flex;
      align-items: center;
      gap: 0.25rem;
    }

    button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 2rem;
      height: 2rem;
      padding: 0 0.5rem;
      border: 1px solid var(--border-color);
      border-radius: 0.375rem;
      background-color: var(--bg-elevated);
      color: var(--text-primary);
      font-size: 0.875rem;
      cursor: pointer;
      transition: background-color 0.15s;
    }

    button:hover:not(:disabled) {
      background-color: var(--bg-hover);
    }

    button:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }

    button.active {
      background-color: var(--accent);
      border-color: var(--accent);
      color: var(--text-on-accent);
    }

    .ellipsis {
      padding: 0 0.25rem;
      color: var(--text-secondary);
    }
  `;
    get _totalPages() {
        return Math.ceil(this.total / this.pageSize);
    }
    _goTo(page) {
        if (page < 1 || page > this._totalPages || page === this.page)
            return;
        this.dispatchEvent(new CustomEvent("pageChange", { detail: { page }, bubbles: true, composed: true }));
    }
    _getPageNumbers() {
        const total = this._totalPages;
        const current = this.page;
        if (total <= 7) {
            return Array.from({ length: total }, (_, i) => i + 1);
        }
        const pages = [];
        if (current <= 4) {
            for (let i = 1; i <= 5; i++)
                pages.push(i);
            pages.push("...");
            pages.push(total);
        }
        else if (current >= total - 3) {
            pages.push(1);
            pages.push("...");
            for (let i = total - 4; i <= total; i++)
                pages.push(i);
        }
        else {
            pages.push(1);
            pages.push("...");
            pages.push(current - 1);
            pages.push(current);
            pages.push(current + 1);
            pages.push("...");
            pages.push(total);
        }
        return pages;
    }
    render() {
        const total = this._totalPages;
        if (total <= 1)
            return html ``;
        return html `
      <div class="pagination">
        <button @click="${() => this._goTo(this.page - 1)}" ?disabled="${this.page === 1}">
          ‹
        </button>
        ${this._getPageNumbers().map((p) => p === "..."
            ? html `<span class="ellipsis">…</span>`
            : html `<button
                class="${p === this.page ? "active" : ""}"
                @click="${() => this._goTo(p)}"
              >
                ${p}
              </button>`)}
        <button @click="${() => this._goTo(this.page + 1)}" ?disabled="${this.page === total}">
          ›
        </button>
      </div>
    `;
    }
};
__decorate([
    property({ type: Number })
], AppPagination.prototype, "page", void 0);
__decorate([
    property({ type: Number })
], AppPagination.prototype, "total", void 0);
__decorate([
    property({ type: Number })
], AppPagination.prototype, "pageSize", void 0);
AppPagination = __decorate([
    customElement("app-pagination")
], AppPagination);

let AppTabs = class AppTabs extends LitElement {
    constructor() {
        super();
        for (const key of ["tabs", "activeTab"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                const val = this[key];
                delete this[key];
                this[key] = val;
            }
        }
    }
    connectedCallback() {
        const saved = {};
        for (const key of ["tabs", "activeTab"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                saved[key] = this[key];
                delete this[key];
            }
        }
        super.connectedCallback();
        for (const [key, value] of Object.entries(saved)) {
            this[key] = value;
        }
    }
    static styles = css `
    :host {
      display: block;
    }

    .tabs {
      display: flex;
      border-bottom: 1px solid var(--border-color);
    }

    .tab {
      padding: 0.75rem 1.25rem;
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--text-secondary);
      cursor: pointer;
      border-bottom: 2px solid transparent;
      margin-bottom: -1px;
      transition: color 0.15s, border-color 0.15s;
    }

    .tab:hover {
      color: var(--text-primary);
    }

    .tab.active {
      color: var(--accent);
      border-bottom-color: var(--accent);
    }
  `;
    get _parsedTabs() {
        try {
            return JSON.parse(this.tabs);
        }
        catch {
            return [];
        }
    }
    _selectTab(tab) {
        if (tab === this.activeTab)
            return;
        this.dispatchEvent(new CustomEvent("tabChange", { detail: { tab }, bubbles: true, composed: true }));
    }
    render() {
        const tabs = this._parsedTabs;
        return html `
      <div class="tabs">
        ${tabs.map((tab) => html `
            <div
              class="tab ${tab === this.activeTab ? "active" : ""}"
              @click="${() => this._selectTab(tab)}"
            >
              ${tab}
            </div>
          `)}
      </div>
    `;
    }
};
__decorate([
    property()
], AppTabs.prototype, "tabs", void 0);
__decorate([
    property()
], AppTabs.prototype, "activeTab", void 0);
AppTabs = __decorate([
    customElement("app-tabs")
], AppTabs);

let AppProgressBar = class AppProgressBar extends LitElement {
    constructor() {
        super();
        for (const key of ["value", "max"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                const val = this[key];
                delete this[key];
                this[key] = val;
            }
        }
    }
    connectedCallback() {
        const saved = {};
        for (const key of ["value", "max"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                saved[key] = this[key];
                delete this[key];
            }
        }
        super.connectedCallback();
        for (const [key, value] of Object.entries(saved)) {
            this[key] = value;
        }
    }
    static styles = css `
    :host {
      display: block;
    }

    .progress-container {
      width: 100%;
      height: 0.5rem;
      background-color: var(--bg-elevated);
      border-radius: 0.25rem;
      overflow: hidden;
      border: 1px solid var(--border-color);
    }

    .progress-fill {
      height: 100%;
      border-radius: 0.25rem;
      transition: width 0.3s ease;
    }

    .progress-fill.low {
      background-color: var(--warning);
    }

    .progress-fill.medium {
      background-color: var(--accent);
    }

    .progress-fill.high {
      background-color: var(--success);
    }
  `;
    get _percentage() {
        const pct = (this.value / this.max) * 100;
        return Math.min(100, Math.max(0, pct));
    }
    _getFillClass() {
        const pct = this._percentage;
        if (pct < 40)
            return "low";
        if (pct < 75)
            return "medium";
        return "high";
    }
    render() {
        return html `
      <div class="progress-container">
        <div
          class="progress-fill ${this._getFillClass()}"
          style="width: ${this._percentage}%"
        ></div>
      </div>
    `;
    }
};
__decorate([
    property({ type: Number })
], AppProgressBar.prototype, "value", void 0);
__decorate([
    property({ type: Number })
], AppProgressBar.prototype, "max", void 0);
AppProgressBar = __decorate([
    customElement("app-progress-bar")
], AppProgressBar);

let AppSegmentSelector = class AppSegmentSelector extends LitElement {
    constructor() {
        super();
        for (const key of ["options", "selected"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                const val = this[key];
                delete this[key];
                this[key] = val;
            }
        }
    }
    connectedCallback() {
        const saved = {};
        for (const key of ["options", "selected"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                saved[key] = this[key];
                delete this[key];
            }
        }
        super.connectedCallback();
        for (const [key, value] of Object.entries(saved)) {
            this[key] = value;
        }
    }
    static styles = css `
    :host {
      display: inline-flex;
    }

    .segment-container {
      display: inline-flex;
      border: 1px solid var(--border-color);
      border-radius: 0.5rem;
      overflow: hidden;
      background-color: var(--bg-elevated);
    }

    .segment {
      padding: 0.5rem 1rem;
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--text-secondary);
      cursor: pointer;
      transition: background-color 0.15s, color 0.15s;
      border-right: 1px solid var(--border-color);
    }

    .segment:last-child {
      border-right: none;
    }

    .segment:hover:not(.selected) {
      background-color: var(--bg-hover);
      color: var(--text-primary);
    }

    .segment.selected {
      background-color: var(--accent);
      color: var(--text-on-accent);
    }
  `;
    get _parsedOptions() {
        try {
            return JSON.parse(this.options);
        }
        catch {
            return [];
        }
    }
    _select(option) {
        if (option === this.selected)
            return;
        this.dispatchEvent(new CustomEvent("change", { detail: { selected: option }, bubbles: true, composed: true }));
    }
    render() {
        const options = this._parsedOptions;
        return html `
      <div class="segment-container">
        ${options.map((opt) => html `
            <div
              class="segment ${opt === this.selected ? "selected" : ""}"
              @click="${() => this._select(opt)}"
            >
              ${opt}
            </div>
          `)}
      </div>
    `;
    }
};
__decorate([
    property()
], AppSegmentSelector.prototype, "options", void 0);
__decorate([
    property()
], AppSegmentSelector.prototype, "selected", void 0);
AppSegmentSelector = __decorate([
    customElement("app-segment-selector")
], AppSegmentSelector);

const ICONS = new Map([
    [
        "clear",
        `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>`,
    ],
    [
        "copy",
        `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
    </svg>`,
    ],
    [
        "swap",
        `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="17 1 21 5 17 9"></polyline>
      <path d="M3 11V9a4 4 0 0 1 4-4h14"></path>
      <polyline points="7 23 3 19 7 15"></polyline>
      <path d="M21 13v2a4 4 0 0 1-4 4H3"></path>
    </svg>`,
    ],
    [
        "chevron-down",
        `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>`,
    ],
    [
        "translate",
        `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <path d="M2 12h20"></path>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
      <path d="m7 8 2 4 2-4"></path>
    </svg>`,
    ],
    [
        "spinner",
        `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-spinner">
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"></path>
    </svg>`,
    ],
    [
        "keyboard",
        `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" ry="2"></rect>
      <path d="M6 8h.001"></path>
      <path d="M10 8h.001"></path>
      <path d="M14 8h.001"></path>
      <path d="M18 8h.001"></path>
      <path d="M8 12h.001"></path>
      <path d="M12 12h.001"></path>
      <path d="M16 12h.001"></path>
      <path d="M7 16h10"></path>
    </svg>`,
    ],
]);
let AppIcon = class AppIcon extends LitElement {
    constructor() {
        super();
        for (const key of ["name", "svgClass"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                const val = this[key];
                delete this[key];
                this[key] = val;
            }
        }
    }
    connectedCallback() {
        const saved = {};
        for (const key of ["name", "svgClass"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                saved[key] = this[key];
                delete this[key];
            }
        }
        super.connectedCallback();
        for (const [key, value] of Object.entries(saved)) {
            this[key] = value;
        }
    }
    static styles = css `
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 1.25em;
      height: 1.25em;
    }

    svg {
      width: 100%;
      height: 100%;
      color: inherit;
    }

    .icon-spinner {
      animation: icon-spin 1s linear infinite;
    }

    @keyframes icon-spin {
      to {
        transform: rotate(360deg);
      }
    }
  `;
    render() {
        const svg = ICONS.get(this.name);
        if (!svg) {
            return html ``;
        }
        return html `<div class="${this.svgClass || ""}">${svg}</div>`;
    }
};
__decorate([
    property()
], AppIcon.prototype, "name", void 0);
__decorate([
    property()
], AppIcon.prototype, "svgClass", void 0);
AppIcon = __decorate([
    customElement("app-icon")
], AppIcon);

let AppLanguageSelector = class AppLanguageSelector extends LitElement {
    constructor() {
        super();
        for (const key of ["languages", "value", "label", "labelId"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                const val = this[key];
                delete this[key];
                this[key] = val;
            }
        }
    }
    connectedCallback() {
        const saved = {};
        for (const key of ["languages", "value", "label", "labelId"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                saved[key] = this[key];
                delete this[key];
            }
        }
        super.connectedCallback();
        for (const [key, value] of Object.entries(saved)) {
            this[key] = value;
        }
    }
    static styles = css `
    :host {
      display: inline-flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .selector-label {
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--text-primary);
    }

    .select-wrapper {
      position: relative;
      display: inline-flex;
      align-items: center;
    }

    select {
      appearance: none;
      -webkit-appearance: none;
      padding: 0.5rem 2rem 0.5rem 0.75rem;
      border-radius: 0.5rem;
      border: 1px solid var(--border-color);
      background-color: var(--bg-elevated);
      color: var(--text-primary);
      font-size: 0.875rem;
      font-family: inherit;
      cursor: pointer;
      outline: none;
      transition: border-color 0.15s;
    }

    select:focus {
      border-color: var(--accent);
      box-shadow: 0 0 0 1px var(--accent);
    }

    .chevron-icon {
      position: absolute;
      right: 0.5rem;
      pointer-events: none;
      width: 1rem;
      height: 1rem;
      color: var(--text-muted);
    }
  `;
    _handleChange(e) {
        const select = e.target;
        this.value = select.value;
        this.dispatchEvent(new CustomEvent("change", {
            detail: { value: select.value },
            bubbles: true,
            composed: true,
        }));
    }
    _getParsedLanguages() {
        try {
            return JSON.parse(this.languages || "[]");
        }
        catch {
            return [];
        }
    }
    render() {
        const langs = this._getParsedLanguages();
        return html `
      ${this.label
            ? html `<span class="selector-label" id="${this.labelId || ""}">${this.label}</span>`
            : ""}
      <div class="select-wrapper">
        <select
          .value="${this.value || ""}"
          aria-labelledby="${this.labelId || ""}"
          @change="${this._handleChange}"
        >
          ${langs.map((lang) => html `<option value="${lang.code}">${lang.name}</option>`)}
        </select>
        <svg class="chevron-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </div>
    `;
    }
};
__decorate([
    property()
], AppLanguageSelector.prototype, "languages", void 0);
__decorate([
    property()
], AppLanguageSelector.prototype, "value", void 0);
__decorate([
    property()
], AppLanguageSelector.prototype, "label", void 0);
__decorate([
    property()
], AppLanguageSelector.prototype, "labelId", void 0);
AppLanguageSelector = __decorate([
    customElement("app-language-selector")
], AppLanguageSelector);

let AppSwapButton = class AppSwapButton extends LitElement {
    constructor() {
        super();
    }
    static styles = css `
    :host {
      display: inline-flex;
    }

    button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 50%;
      border: 1px solid var(--border-color);
      background-color: var(--bg-elevated);
      color: var(--text-primary);
      cursor: pointer;
      transition: all 0.15s;
      padding: 0;
    }

    button:hover {
      background-color: var(--accent);
      color: var(--text-on-accent);
      border-color: var(--accent);
    }

    svg {
      width: 1.25rem;
      height: 1.25rem;
    }
  `;
    _handleClick() {
        this.dispatchEvent(new CustomEvent("click", {
            bubbles: true,
            composed: true,
        }));
    }
    render() {
        return html `
      <button type="button" @click="${this._handleClick}" title="Swap">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="17 1 21 5 17 9"></polyline>
          <path d="M3 11V9a4 4 0 0 1 4-4h14"></path>
          <polyline points="7 23 3 19 7 15"></polyline>
          <path d="M21 13v2a4 4 0 0 1-4 4H3"></path>
        </svg>
      </button>
    `;
    }
};
AppSwapButton = __decorate([
    customElement("app-swap-button")
], AppSwapButton);

let AppTextInput = class AppTextInput extends LitElement {
    _textarea = null;
    constructor() {
        super();
        for (const key of ["value", "placeholder", "charCount", "maxChars", "id", "clearable"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                const val = this[key];
                delete this[key];
                this[key] = val;
            }
        }
    }
    connectedCallback() {
        const saved = {};
        for (const key of ["value", "placeholder", "charCount", "maxChars", "id", "clearable"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                saved[key] = this[key];
                delete this[key];
            }
        }
        super.connectedCallback();
        for (const [key, value] of Object.entries(saved)) {
            this[key] = value;
        }
    }
    static styles = css `
    :host {
      display: flex;
      flex-direction: column;
      width: 100%;
    }

    .input-container {
      display: flex;
      flex-direction: column;
      border: 1px solid var(--border-color);
      border-radius: 0.5rem;
      background-color: var(--bg-elevated);
      transition: border-color 0.15s;
    }

    .input-container:focus-within {
      border-color: var(--accent);
      box-shadow: 0 0 0 1px var(--accent);
    }

    textarea {
      width: 100%;
      min-height: 2.5rem;
      padding: 0.5rem 0.75rem;
      border: none;
      background: transparent;
      color: var(--text-primary);
      font-family: inherit;
      font-size: 0.875rem;
      line-height: 1.5;
      resize: none;
      outline: none;
      overflow: hidden;
    }

    textarea::placeholder {
      color: var(--text-muted);
    }

    .footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.25rem 0.75rem 0.375rem;
      border-top: 1px solid var(--border-color);
    }

    .char-count {
      font-size: 0.75rem;
      color: var(--text-muted);
    }

    .clear-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 1.5rem;
      height: 1.5rem;
      border-radius: 50%;
      border: none;
      background: transparent;
      color: var(--text-muted);
      cursor: pointer;
      transition: all 0.15s;
      padding: 0;
    }

    .clear-btn:hover {
      background-color: var(--bg-hover);
      color: var(--text-primary);
    }

    .clear-btn svg {
      width: 0.875rem;
      height: 0.875rem;
    }
  `;
    _handleInput(e) {
        const textarea = e.target;
        this.value = textarea.value;
        this._autoResize(textarea);
        this.dispatchEvent(new CustomEvent("input", {
            detail: { value: textarea.value },
            bubbles: true,
            composed: true,
        }));
    }
    _autoResize(textarea) {
        textarea.style.height = "auto";
        textarea.style.height = textarea.scrollHeight + "px";
    }
    _handleClear() {
        this.value = "";
        if (this._textarea) {
            this._textarea.style.height = "auto";
        }
        this.dispatchEvent(new CustomEvent("clear", {
            bubbles: true,
            composed: true,
        }));
    }
    updated(changed) {
        if (changed.has("value") && this._textarea) {
            this._autoResize(this._textarea);
        }
    }
    render() {
        const displayCount = this.charCount || `${this.value?.length || 0}${this.maxChars ? `/${this.maxChars}` : ""}`;
        return html `
      <div class="input-container">
        <textarea
          id="${this.id || ""}"
          .value="${this.value || ""}"
          placeholder="${this.placeholder || ""}"
          @input="${this._handleInput}"
          @textarea="${(e) => this._autoResize(e.target)}"
        ></textarea>
        <div class="footer">
          <span class="char-count">${displayCount}</span>
          ${this.clearable
            ? html `
                <button class="clear-btn" type="button" @click="${this._handleClear}" title="Clear">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              `
            : ""}
        </div>
      </div>
    `;
    }
    firstUpdated() {
        this._textarea = this.shadowRoot?.querySelector("textarea") ?? null;
        if (this._textarea) {
            this._autoResize(this._textarea);
        }
    }
};
__decorate([
    property()
], AppTextInput.prototype, "value", void 0);
__decorate([
    property()
], AppTextInput.prototype, "placeholder", void 0);
__decorate([
    property()
], AppTextInput.prototype, "charCount", void 0);
__decorate([
    property({ type: Number })
], AppTextInput.prototype, "maxChars", void 0);
__decorate([
    property()
], AppTextInput.prototype, "id", void 0);
__decorate([
    property({ type: Boolean })
], AppTextInput.prototype, "clearable", void 0);
AppTextInput = __decorate([
    customElement("app-text-input")
], AppTextInput);

let AppTranslationOutput = class AppTranslationOutput extends LitElement {
    _textarea = null;
    constructor() {
        super();
        for (const key of ["value", "placeholder", "id"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                const val = this[key];
                delete this[key];
                this[key] = val;
            }
        }
    }
    connectedCallback() {
        const saved = {};
        for (const key of ["value", "placeholder", "id"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                saved[key] = this[key];
                delete this[key];
            }
        }
        super.connectedCallback();
        for (const [key, value] of Object.entries(saved)) {
            this[key] = value;
        }
    }
    static styles = css `
    :host {
      display: flex;
      flex-direction: column;
      width: 100%;
    }

    .output-container {
      position: relative;
      display: flex;
      flex-direction: column;
      border: 1px solid var(--border-color);
      border-radius: 0.5rem;
      background-color: var(--bg-elevated);
    }

    textarea {
      width: 100%;
      min-height: 2.5rem;
      padding: 0.5rem 0.75rem;
      padding-right: 2.5rem;
      border: none;
      background: transparent;
      color: var(--text-primary);
      font-family: inherit;
      font-size: 0.875rem;
      line-height: 1.5;
      resize: none;
      outline: none;
      overflow: hidden;
    }

    textarea::placeholder {
      color: var(--text-muted);
    }

    .copy-btn {
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 1.75rem;
      height: 1.75rem;
      border-radius: 0.375rem;
      border: 1px solid var(--border-color);
      background-color: var(--bg-elevated);
      color: var(--text-muted);
      cursor: pointer;
      transition: all 0.15s;
      padding: 0;
    }

    .copy-btn:hover {
      background-color: var(--accent);
      color: var(--text-on-accent);
      border-color: var(--accent);
    }

    .copy-btn svg {
      width: 0.875rem;
      height: 0.875rem;
    }
  `;
    _autoResize(textarea) {
        textarea.style.height = "auto";
        textarea.style.height = textarea.scrollHeight + "px";
    }
    _handleCopy() {
        if (this.value) {
            navigator.clipboard.writeText(this.value).catch(() => { });
        }
        this.dispatchEvent(new CustomEvent("copy", {
            detail: { value: this.value },
            bubbles: true,
            composed: true,
        }));
    }
    updated(changed) {
        if (changed.has("value") && this._textarea) {
            this._autoResize(this._textarea);
        }
    }
    render() {
        return html `
      <div class="output-container">
        <textarea
          id="${this.id || ""}"
          .value="${this.value || ""}"
          placeholder="${this.placeholder || ""}"
          readonly
        ></textarea>
        <button class="copy-btn" type="button" @click="${this._handleCopy}" title="Copy to clipboard">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
        </button>
      </div>
    `;
    }
    firstUpdated() {
        this._textarea = this.shadowRoot?.querySelector("textarea") ?? null;
        if (this._textarea) {
            this._autoResize(this._textarea);
        }
    }
};
__decorate([
    property()
], AppTranslationOutput.prototype, "value", void 0);
__decorate([
    property()
], AppTranslationOutput.prototype, "placeholder", void 0);
__decorate([
    property()
], AppTranslationOutput.prototype, "id", void 0);
AppTranslationOutput = __decorate([
    customElement("app-translation-output")
], AppTranslationOutput);

let AppToast = class AppToast extends LitElement {
    _timeout = null;
    constructor() {
        super();
        for (const key of ["message", "visible", "type"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                const val = this[key];
                delete this[key];
                this[key] = val;
            }
        }
    }
    connectedCallback() {
        const saved = {};
        for (const key of ["message", "visible", "type"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                saved[key] = this[key];
                delete this[key];
            }
        }
        super.connectedCallback();
        for (const [key, value] of Object.entries(saved)) {
            this[key] = value;
        }
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        if (this._timeout) {
            clearTimeout(this._timeout);
            this._timeout = null;
        }
    }
    static styles = css `
    :host {
      position: fixed;
      bottom: 1.5rem;
      right: 1.5rem;
      z-index: 9999;
    }

    .toast {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1rem;
      border-radius: 0.5rem;
      background-color: var(--bg-elevated);
      color: var(--text-primary);
      border: 1px solid var(--border-color);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      font-size: 0.875rem;
      transform: translateY(0);
      opacity: 1;
      transition: all 0.3s ease;
      max-width: 24rem;
    }

    .toast.hidden {
      transform: translateY(1rem);
      opacity: 0;
      pointer-events: none;
    }

    .toast-success {
      border-color: var(--success);
      border-left-width: 3px;
    }

    .toast-error {
      border-color: var(--error);
      border-left-width: 3px;
    }

    .toast-info {
      border-color: var(--info);
      border-left-width: 3px;
    }

    .toast-warning {
      border-color: var(--warning);
      border-left-width: 3px;
    }

    .toast-icon {
      width: 1.25rem;
      height: 1.25rem;
      flex-shrink: 0;
    }

    .toast-success .toast-icon {
      color: var(--success);
    }

    .toast-error .toast-icon {
      color: var(--error);
    }

    .toast-info .toast-icon {
      color: var(--info);
    }

    .toast-warning .toast-icon {
      color: var(--warning);
    }

    .toast-message {
      flex: 1;
    }

    .close-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 1.25rem;
      height: 1.25rem;
      border: none;
      background: transparent;
      color: var(--text-muted);
      cursor: pointer;
      padding: 0;
      flex-shrink: 0;
    }

    .close-btn:hover {
      color: var(--text-primary);
    }

    .close-btn svg {
      width: 0.75rem;
      height: 0.75rem;
    }
  `;
    updated(changed) {
        if (changed.has("visible") && this.visible) {
            if (this._timeout) {
                clearTimeout(this._timeout);
            }
            this._timeout = setTimeout(() => {
                this.visible = false;
                this.dispatchEvent(new CustomEvent("dismiss", {
                    bubbles: true,
                    composed: true,
                }));
            }, 4000);
        }
    }
    _handleClose() {
        this.visible = false;
        if (this._timeout) {
            clearTimeout(this._timeout);
            this._timeout = null;
        }
        this.dispatchEvent(new CustomEvent("dismiss", {
            bubbles: true,
            composed: true,
        }));
    }
    _getIcon() {
        switch (this.type) {
            case "success":
                return html `<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
            case "error":
                return html `<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`;
            case "warning":
                return html `<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`;
            case "info":
            default:
                return html `<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`;
        }
    }
    render() {
        return html `
      <div class="toast toast-${this.type || "info"} ${this.visible ? "" : "hidden"}">
        ${this._getIcon()}
        <span class="toast-message">${this.message}</span>
        <button class="close-btn" type="button" @click="${this._handleClose}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    `;
    }
};
__decorate([
    property()
], AppToast.prototype, "message", void 0);
__decorate([
    property({ type: Boolean })
], AppToast.prototype, "visible", void 0);
__decorate([
    property()
], AppToast.prototype, "type", void 0);
AppToast = __decorate([
    customElement("app-toast")
], AppToast);

let AppThemeToggle = class AppThemeToggle extends LitElement {
    constructor() {
        super();
        for (const key of ["isDark"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                const val = this[key];
                delete this[key];
                this[key] = val;
            }
        }
    }
    connectedCallback() {
        const saved = {};
        for (const key of ["isDark"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                saved[key] = this[key];
                delete this[key];
            }
        }
        super.connectedCallback();
        for (const [key, value] of Object.entries(saved)) {
            this[key] = value;
        }
    }
    static styles = css `
    :host {
      display: inline-flex;
    }

    button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 50%;
      border: 1px solid var(--border-color);
      background-color: var(--bg-elevated);
      color: var(--text-primary);
      cursor: pointer;
      transition: all 0.15s;
      padding: 0;
    }

    button:hover {
      background-color: var(--accent);
      color: var(--text-on-accent);
      border-color: var(--accent);
    }

    svg {
      width: 1.25rem;
      height: 1.25rem;
    }
  `;
    _handleToggle() {
        this.isDark = !this.isDark;
        this.dispatchEvent(new CustomEvent("toggle", {
            detail: { isDark: this.isDark },
            bubbles: true,
            composed: true,
        }));
    }
    render() {
        return html `
      <button
        type="button"
        @click="${this._handleToggle}"
        title="${this.isDark ? "Switch to light" : "Switch to dark"}"
      >
        ${this.isDark
            ? html `
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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
            `
            : html `
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            `}
      </button>
    `;
    }
};
__decorate([
    property({ type: Boolean })
], AppThemeToggle.prototype, "isDark", void 0);
AppThemeToggle = __decorate([
    customElement("app-theme-toggle")
], AppThemeToggle);

let AppShortcutsOverlay = class AppShortcutsOverlay extends LitElement {
    constructor() {
        super();
        for (const key of ["open", "shortcuts"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                const val = this[key];
                delete this[key];
                this[key] = val;
            }
        }
    }
    connectedCallback() {
        const saved = {};
        for (const key of ["open", "shortcuts"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                saved[key] = this[key];
                delete this[key];
            }
        }
        super.connectedCallback();
        for (const [key, value] of Object.entries(saved)) {
            this[key] = value;
        }
    }
    static styles = css `
    :host {
      display: block;
    }

    .overlay {
      position: fixed;
      inset: 0;
      z-index: 10000;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: rgba(0, 0, 0, 0.5);
      opacity: 1;
      transition: opacity 0.2s ease;
    }

    .overlay.hidden {
      opacity: 0;
      pointer-events: none;
    }

    .modal {
      background-color: var(--bg-elevated);
      border: 1px solid var(--border-color);
      border-radius: 0.75rem;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
      width: 100%;
      max-width: 28rem;
      max-height: 80vh;
      overflow-y: auto;
      padding: 1.5rem;
    }

    .modal-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1rem;
    }

    .modal-title {
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--text-primary);
      margin: 0;
    }

    .close-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 2rem;
      height: 2rem;
      border-radius: 0.375rem;
      border: none;
      background: transparent;
      color: var(--text-muted);
      cursor: pointer;
      transition: all 0.15s;
      padding: 0;
    }

    .close-btn:hover {
      background-color: var(--bg-hover);
      color: var(--text-primary);
    }

    .close-btn svg {
      width: 1rem;
      height: 1rem;
    }

    .shortcut-list {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .shortcut-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
    }

    .shortcut-desc {
      font-size: 0.875rem;
      color: var(--text-secondary);
    }

    kbd {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 1.75rem;
      height: 1.75rem;
      padding: 0 0.375rem;
      border-radius: 0.25rem;
      border: 1px solid var(--border-color);
      background-color: var(--bg-tertiary);
      color: var(--text-primary);
      font-family: inherit;
      font-size: 0.75rem;
      font-weight: 500;
      white-space: nowrap;
    }

    .shortcut-keys {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      flex-shrink: 0;
    }

    .shortcut-plus {
      font-size: 0.75rem;
      color: var(--text-muted);
    }
  `;
    _getParsedShortcuts() {
        try {
            return JSON.parse(this.shortcuts || "[]");
        }
        catch {
            return [];
        }
    }
    _handleBackdropClick(e) {
        if (e.target === e.currentTarget) {
            this._close();
        }
    }
    _close() {
        this.open = false;
        this.dispatchEvent(new CustomEvent("close", {
            bubbles: true,
            composed: true,
        }));
    }
    _parseKeys(key) {
        return key.split("+").map((k) => k.trim());
    }
    render() {
        const shortcuts = this._getParsedShortcuts();
        return html `
      <div class="overlay ${this.open ? "" : "hidden"}" @click="${this._handleBackdropClick}">
        <div class="modal">
          <div class="modal-header">
            <h2 class="modal-title">Keyboard Shortcuts</h2>
            <button class="close-btn" type="button" @click="${this._close}">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          <ul class="shortcut-list">
            ${shortcuts.map((s) => html `
                <li class="shortcut-item">
                  <span class="shortcut-desc">${s.description}</span>
                  <span class="shortcut-keys">
                    ${this._parseKeys(s.key).map((k, i, arr) => html `
                        <kbd>${k}</kbd>
                        ${i < arr.length - 1
            ? html `<span class="shortcut-plus">+</span>`
            : ""}
                      `)}
                  </span>
                </li>
              `)}
          </ul>
        </div>
      </div>
    `;
    }
};
__decorate([
    property({ type: Boolean })
], AppShortcutsOverlay.prototype, "open", void 0);
__decorate([
    property()
], AppShortcutsOverlay.prototype, "shortcuts", void 0);
AppShortcutsOverlay = __decorate([
    customElement("app-shortcuts-overlay")
], AppShortcutsOverlay);

class TextComponent {
    tag = "span";
    text = "";
    classes = "";
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: TextComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.25", type: TextComponent, isStandalone: true, selector: "app-text", inputs: { tag: "tag", text: "text", classes: "classes" }, ngImport: i0, template: "@if (tag === 'h1') {\n  <h1 [class]=\"classes\">{{ text }}</h1>\n} @else if (tag === 'h2') {\n  <h2 [class]=\"classes\">{{ text }}</h2>\n} @else if (tag === 'p') {\n  <p [class]=\"classes\">{{ text }}</p>\n} @else if (tag === 'footer') {\n  <footer [class]=\"classes\">{{ text }}</footer>\n} @else {\n  <span [class]=\"classes\">{{ text }}</span>\n}\n", styles: [""] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: TextComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-text", standalone: true, schemas: [CUSTOM_ELEMENTS_SCHEMA], template: "@if (tag === 'h1') {\n  <h1 [class]=\"classes\">{{ text }}</h1>\n} @else if (tag === 'h2') {\n  <h2 [class]=\"classes\">{{ text }}</h2>\n} @else if (tag === 'p') {\n  <p [class]=\"classes\">{{ text }}</p>\n} @else if (tag === 'footer') {\n  <footer [class]=\"classes\">{{ text }}</footer>\n} @else {\n  <span [class]=\"classes\">{{ text }}</span>\n}\n" }]
        }], propDecorators: { tag: [{
                type: Input
            }], text: [{
                type: Input
            }], classes: [{
                type: Input
            }] } });

// Re-export Lit web components from local source files.
// These will be compiled by ng-packagr.

class GuardService {
    guardRegistry = new Map();
    constructor() {
        this.registerBuiltInGuards();
    }
    registerBuiltInGuards() {
        // Auth guard
        this.register("auth", async () => {
            const isAuthenticated = this.checkAuthentication();
            return {
                allowed: isAuthenticated,
                redirectTo: isAuthenticated ? undefined : "/login",
                message: isAuthenticated ? undefined : "Authentication required",
            };
        });
        // Role guard
        this.register("role", async (params) => {
            const requiredRole = params?.role;
            if (!requiredRole) {
                return { allowed: true };
            }
            const hasRole = this.checkRole(requiredRole);
            return {
                allowed: hasRole,
                redirectTo: hasRole ? undefined : "/unauthorized",
                message: hasRole ? undefined : `Role "${requiredRole}" required`,
            };
        });
        // Permission guard
        this.register("permission", async (params) => {
            const permission = params?.permission;
            if (!permission) {
                return { allowed: true };
            }
            const hasPermission = this.checkPermission(permission);
            return {
                allowed: hasPermission,
                redirectTo: hasPermission ? undefined : "/forbidden",
                message: hasPermission ? undefined : `Permission "${permission}" required`,
            };
        });
        // Theme guard
        this.register("theme", async (params) => {
            const allowedTheme = params?.theme;
            if (!allowedTheme) {
                return { allowed: true };
            }
            const currentTheme = this.getCurrentTheme();
            const allowed = currentTheme === allowedTheme;
            return { allowed };
        });
    }
    register(name, guard) {
        this.guardRegistry.set(name, guard);
    }
    unregister(name) {
        this.guardRegistry.delete(name);
    }
    async canActivate(guardType, params) {
        const guard = this.guardRegistry.get(guardType);
        if (!guard) {
            console.warn(`GuardService: Unknown guard "${guardType}"`);
            return true; // Default to allowed for unknown guards
        }
        try {
            const result = await guard(params);
            return result.allowed;
        }
        catch (err) {
            console.error(`GuardService: Error in guard "${guardType}":`, err);
            return false;
        }
    }
    async evaluate(guardType, params) {
        const guard = this.guardRegistry.get(guardType);
        if (!guard) {
            return { allowed: true };
        }
        try {
            return await guard(params);
        }
        catch (err) {
            console.error(`GuardService: Error in guard "${guardType}":`, err);
            return { allowed: false, message: "Guard evaluation failed" };
        }
    }
    hasGuard(name) {
        return this.guardRegistry.has(name);
    }
    getRegisteredGuards() {
        return Array.from(this.guardRegistry.keys());
    }
    checkAuthentication() {
        // Check localStorage or a service
        const token = localStorage.getItem("auth_token");
        return !!token;
    }
    checkRole(role) {
        const userRole = localStorage.getItem("user_role");
        return userRole === role;
    }
    checkPermission(permission) {
        const permissions = JSON.parse(localStorage.getItem("permissions") ?? "[]");
        return Array.isArray(permissions) && permissions.includes(permission);
    }
    getCurrentTheme() {
        return localStorage.getItem("theme-mode") ?? "light";
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: GuardService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: GuardService, providedIn: "root" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: GuardService, decorators: [{
            type: Injectable,
            args: [{ providedIn: "root" }]
        }], ctorParameters: () => [] });

class SchemaRouterService {
    guardService = inject(GuardService, { optional: true });
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
            const matched = this.resolveRoute(route);
            if (!matched) {
                this._error.set(`Route not found: ${route}`);
                return false;
            }
            const { page, params } = matched;
            // Run guards if configured
            if (page && this.guardService) {
                const pageGuards = page.guards;
                if (pageGuards?.length) {
                    for (const guard of pageGuards) {
                        const allowed = await this.guardService.canActivate(guard.type, guard.params);
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
                this._currentPage.set(page);
                // Load layout if specified
                if (page.layout && this._schema()) {
                    const layout = this._schema().layouts.find((l) => l.id === page.layout);
                    this._currentLayout.set(layout ?? null);
                }
                else {
                    this._currentLayout.set(null);
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
                const layout = p.layout ? schema.layouts.find((l) => l.id === p.layout) ?? null : null;
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: SchemaRouterService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: SchemaRouterService, providedIn: "root" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: SchemaRouterService, decorators: [{
            type: Injectable,
            args: [{ providedIn: "root" }]
        }] });

class ComponentRegistryService {
    registry = new Map();
    componentManifest = {};
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
            classSetters: { ...registered.classSetters, ...schemaBehavior.classSetters },
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: ComponentRegistryService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: ComponentRegistryService, providedIn: "root" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: ComponentRegistryService, decorators: [{
            type: Injectable,
            args: [{ providedIn: "root" }]
        }], ctorParameters: () => [] });

class DataBindingResolver {
    functionRegistry = new Map();
    dataStore = new Map();
    registerFunction(name, fn) {
        this.functionRegistry.set(name, fn);
    }
    unregisterFunction(name) {
        this.functionRegistry.delete(name);
    }
    setData(entity, data) {
        this.dataStore.set(entity, data);
    }
    getData(entity) {
        return this.dataStore.get(entity);
    }
    clearData(entity) {
        if (entity) {
            this.dataStore.delete(entity);
        }
        else {
            this.dataStore.clear();
        }
    }
    resolveBinding(binding) {
        if (!binding)
            return null;
        return this.resolve(binding.entity, binding.field);
    }
    resolveDataBinding(binding) {
        return this.resolveBinding(binding);
    }
    resolve(entity, field) {
        const data = this.dataStore.get(entity);
        if (!data)
            return null;
        if (!field)
            return data;
        // Support dot notation: "address.city"
        const parts = field.split(".");
        let value = data;
        for (const part of parts) {
            if (value && typeof value === "object" && part in value) {
                value = value[part];
            }
            else {
                return null;
            }
        }
        return value;
    }
    resolveExpression(expression) {
        // Parse and evaluate simple expressions like {{ user.name }} or {{ users.length }}
        const templateRegex = /\{\{([^}]+)\}\}/g;
        let result = expression;
        let match;
        while ((match = templateRegex.exec(expression)) !== null) {
            const path = match[1].trim();
            const value = this.resolvePath(path);
            result = result.replace(match[0], String(value ?? ""));
        }
        return result;
    }
    resolvePath(path) {
        const parts = path.split(".");
        if (parts.length === 1) {
            // Check if it's a registered function
            if (this.functionRegistry.has(parts[0])) {
                return this.functionRegistry.get(parts[0])?.call(null);
            }
            // Otherwise check data store
            for (const data of this.dataStore.values()) {
                if (parts[0] in data) {
                    return data[parts[0]];
                }
            }
            return null;
        }
        const entity = parts[0];
        const field = parts.slice(1).join(".");
        return this.resolve(entity, field);
    }
    evaluateCondition(condition) {
        // Support simple conditions: "user.age > 18", "user.name == 'John'"
        const match = condition.match(/^(.+?)\s*(==|!=|>=|<=|>|<)\s*(.+)$/);
        if (!match)
            return false;
        const [, left, op, right] = match;
        const leftVal = this.resolveExpression(left.trim());
        const rightVal = this.resolveExpression(right.trim());
        switch (op) {
            case "==": return leftVal == rightVal;
            case "!=": return leftVal != rightVal;
            case ">": return Number(leftVal) > Number(rightVal);
            case "<": return Number(leftVal) < Number(rightVal);
            case ">=": return Number(leftVal) >= Number(rightVal);
            case "<=": return Number(leftVal) <= Number(rightVal);
            default: return false;
        }
    }
    callFunction(fnName, args = []) {
        const fn = this.functionRegistry.get(fnName);
        if (!fn) {
            console.warn(`DataBindingResolver: Function "${fnName}" not found`);
            return null;
        }
        return fn.apply(null, args);
    }
    getRegisteredFunctions() {
        return Array.from(this.functionRegistry.keys());
    }
    hasFunction(fnName) {
        return this.functionRegistry.has(fnName);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: DataBindingResolver, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: DataBindingResolver, providedIn: "root" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: DataBindingResolver, decorators: [{
            type: Injectable,
            args: [{ providedIn: "root" }]
        }] });

class StyleResolver {
    DARK_MODE_PREFIX = "dark:";
    RESPONSIVE_PREFIXES = ["sm:", "md:", "lg:", "xl:", "2xl:"];
    IMPORTANT_PREFIX = "!";
    resolveClasses(classes, options = {}) {
        const { extraClasses = "" } = options;
        const allClasses = `${classes} ${extraClasses}`.trim();
        return {
            classes: this.processClasses(allClasses),
            inlineStyles: {},
        };
    }
    processClasses(classes) {
        const resolved = [];
        const classList = classes.split(/\s+/).filter(Boolean);
        for (const cls of classList) {
            const processed = this.processClass(cls);
            if (processed) {
                resolved.push(processed);
            }
        }
        return resolved.join(" ");
    }
    processClass(cls) {
        // Handle !important prefix (TailwindCSS v4)
        let important = false;
        let className = cls;
        if (className.startsWith(this.IMPORTANT_PREFIX)) {
            important = true;
            className = className.slice(1);
        }
        // If important, wrap in ! prefix (for TailwindCSS v4)
        // But also convert to proper format
        const result = important ? `!${className}` : className;
        return result;
    }
    resolveGridPosition(position) {
        const gridClasses = [];
        if (position.colStart != null) {
            gridClasses.push(`!col-start-${position.colStart}`);
        }
        if (position.rowStart != null) {
            gridClasses.push(`!row-start-${position.rowStart}`);
        }
        if (position.colSpan != null) {
            gridClasses.push(`!col-span-${position.colSpan}`);
        }
        if (position.rowSpan != null) {
            gridClasses.push(`!row-span-${position.rowSpan}`);
        }
        if (position.column != null) {
            gridClasses.push(`!col-${position.column}`);
        }
        if (position.row != null) {
            gridClasses.push(`!row-${position.row}`);
        }
        return gridClasses.join(" ");
    }
    composeClasses(...classGroups) {
        return classGroups.filter(Boolean).join(" ");
    }
    getVariantClasses(baseClass, variant) {
        return `${baseClass}-${variant}`;
    }
    resolveResponsiveClasses(classes, breakpoint) {
        const classList = classes.split(/\s+/).filter(Boolean);
        const prefix = `${breakpoint}:`;
        return classList
            .map((cls) => {
            // If already has a responsive prefix, don't add another
            if (this.RESPONSIVE_PREFIXES.some((p) => cls.startsWith(p))) {
                return cls;
            }
            return `${prefix}${cls}`;
        })
            .join(" ");
    }
    resolveDarkModeClasses(classes) {
        const classList = classes.split(/\s+/).filter(Boolean);
        return classList
            .map((cls) => {
            // If already has dark: prefix, return as-is
            if (cls.startsWith(this.DARK_MODE_PREFIX)) {
                return cls;
            }
            // If it's a color-related class, add dark: variant
            if (this.isColorClass(cls)) {
                return `${this.DARK_MODE_PREFIX}${cls}`;
            }
            return cls;
        })
            .join(" ");
    }
    isColorClass(cls) {
        const colorPrefixes = [
            "text-", "bg-", "border-", "fill-", "stroke-",
            "text-", "bg-", "ring-", "shadow-", "decoration-",
        ];
        return colorPrefixes.some((prefix) => cls.startsWith(prefix));
    }
    buildCssVariables(vars) {
        return Object.entries(vars)
            .map(([k, v]) => `--${k}: ${v}`)
            .join("; ");
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: StyleResolver, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: StyleResolver, providedIn: "root" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: StyleResolver, decorators: [{
            type: Injectable,
            args: [{ providedIn: "root" }]
        }] });

const LIGHT_THEME_CSS = `
  :root {
    --bg-primary: #f8fafc;
    --bg-secondary: #f1f5f9;
    --bg-elevated: #ffffff;
    --bg-hover: #e2e8f0;
    --bg-active: #cbd5e1;
    --text-primary: #1e293b;
    --text-secondary: #475569;
    --text-muted: #94a3b8;
    --text-on-accent: #ffffff;
    --text-on-error: #ffffff;
    --text-on-warning: #ffffff;
    --text-on-success: #ffffff;
    --text-on-info: #ffffff;
    --border-color: #e2e8f0;
    --border-subtle: #f1f5f9;
    --accent: #3b82f6;
    --accent-hover: #2563eb;
    --accent-light: #dbeafe;
    --error: #ef4444;
    --error-light: #fee2e2;
    --warning: #f59e0b;
    --warning-light: #fef3c7;
    --success: #22c55e;
    --success-light: #dcfce7;
    --info: #06b6d4;
    --info-light: #cffafe;
    --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
    --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  }
`;
const DARK_THEME_CSS = `
  [data-theme="dark"] {
    --bg-primary: #0d1117;
    --bg-secondary: #161b22;
    --bg-elevated: #21262d;
    --bg-hover: #30363d;
    --bg-active: #484f58;
    --text-primary: #e6edf3;
    --text-secondary: #8b949e;
    --text-muted: #6e7681;
    --text-on-accent: #ffffff;
    --text-on-error: #ffffff;
    --text-on-warning: #ffffff;
    --text-on-success: #ffffff;
    --text-on-info: #ffffff;
    --border-color: #30363d;
    --border-subtle: #21262d;
    --accent: #58a6ff;
    --accent-hover: #79b8ff;
    --accent-light: #1f3d5c;
    --error: #f85149;
    --error-light: #441b1b;
    --warning: #d29922;
    --warning-light: #3d2e0a;
    --success: #3fb950;
    --success-light: #1a3d2a;
    --info: #39c5cf;
    --info-light: #0d3d40;
    --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.2);
    --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.3), 0 2px 4px -2px rgb(0 0 0 / 0.2);
    --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.4), 0 4px 6px -4px rgb(0 0 0 / 0.3);
  }
`;
class ThemeService {
    _colorMode = signal("system", ...(ngDevMode ? [{ debugName: "_colorMode" }] : []));
    _resolvedMode = signal("light", ...(ngDevMode ? [{ debugName: "_resolvedMode" }] : []));
    _accentColor = signal("#3b82f6", ...(ngDevMode ? [{ debugName: "_accentColor" }] : []));
    _customCssVars = signal({}, ...(ngDevMode ? [{ debugName: "_customCssVars" }] : []));
    styleElement = null;
    mediaQuery = null;
    colorMode = this._colorMode.asReadonly();
    resolvedMode = this._resolvedMode.asReadonly();
    accentColor = this._accentColor.asReadonly();
    isDark = computed(() => this._resolvedMode() === "dark", ...(ngDevMode ? [{ debugName: "isDark" }] : []));
    isLight = computed(() => this._resolvedMode() === "light", ...(ngDevMode ? [{ debugName: "isLight" }] : []));
    constructor() {
        this.initTheme();
        this.setupEffect();
    }
    initTheme() {
        if (typeof window === "undefined")
            return;
        const saved = localStorage.getItem("theme-mode");
        if (saved && ["light", "dark", "system"].includes(saved)) {
            this._colorMode.set(saved);
        }
        const savedAccent = localStorage.getItem("theme-accent");
        if (savedAccent) {
            this._accentColor.set(savedAccent);
        }
        this.mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        this.updateResolvedMode();
    }
    setupEffect() {
        effect(() => {
            const mode = this._colorMode();
            localStorage.setItem("theme-mode", mode);
            this.updateResolvedMode();
            this.applyTheme();
        });
        effect(() => {
            const accent = this._accentColor();
            localStorage.setItem("theme-accent", accent);
            this.applyTheme();
        });
    }
    updateResolvedMode() {
        const mode = this._colorMode();
        if (mode === "system") {
            const prefersDark = this.mediaQuery?.matches ?? false;
            this._resolvedMode.set(prefersDark ? "dark" : "light");
        }
        else {
            this._resolvedMode.set(mode);
        }
    }
    injectStyles() {
        if (typeof document === "undefined")
            return;
        if (!this.styleElement) {
            this.styleElement = document.createElement("style");
            this.styleElement.id = "theme-service-styles";
            document.head.appendChild(this.styleElement);
        }
        let css = LIGHT_THEME_CSS + DARK_THEME_CSS;
        // Apply custom accent color
        const accent = this._accentColor();
        css += `
      :root {
        --accent: ${accent} !important;
        --accent-hover: ${this.darkenColor(accent, 15)} !important;
        --accent-light: ${this.lightenColor(accent, 85)} !important;
      }
      [data-theme="dark"] {
        --accent: ${accent} !important;
        --accent-hover: ${this.lightenColor(accent, 10)} !important;
        --accent-light: ${this.darkenColor(accent, 60)} !important;
      }
    `;
        // Apply custom CSS variables
        const customVars = this._customCssVars();
        if (Object.keys(customVars).length > 0) {
            css += `:root { ${Object.entries(customVars).map(([k, v]) => `--${k}: ${v}`).join("; ")} }`;
        }
        this.styleElement.textContent = css;
    }
    applyTheme() {
        if (typeof document === "undefined")
            return;
        const resolved = this._resolvedMode();
        const mode = this._colorMode();
        document.body.setAttribute("data-theme", resolved);
        if (mode === "system") {
            document.body.removeAttribute("data-theme");
        }
        this.injectStyles();
    }
    toggle() {
        const current = this._resolvedMode();
        this._colorMode.set(current === "light" ? "dark" : "light");
    }
    setMode(mode) {
        this._colorMode.set(mode);
    }
    setAccentColor(color) {
        this._accentColor.set(color);
    }
    setCustomCssVariables(vars) {
        this._customCssVars.set(vars);
        this.applyTheme();
    }
    getThemeIcon() {
        return this.isDark() ? "light_mode" : "dark_mode";
    }
    getCurrentTheme() {
        return {
            mode: this._colorMode(),
            accentColor: this._accentColor(),
            cssVariables: this._customCssVars(),
        };
    }
    applyThemeConfig(config) {
        if (config.mode)
            this._colorMode.set(config.mode);
        if (config.accentColor)
            this._accentColor.set(config.accentColor);
        if (config.cssVariables)
            this._customCssVars.set(config.cssVariables);
    }
    darkenColor(hex, percent) {
        return this.adjustColor(hex, -percent);
    }
    lightenColor(hex, percent) {
        return this.adjustColor(hex, percent);
    }
    adjustColor(hex, percent) {
        const num = parseInt(hex.replace("#", ""), 16);
        const amt = Math.round(2.55 * percent);
        const R = Math.min(255, Math.max(0, (num >> 16) + amt));
        const G = Math.min(255, Math.max(0, ((num >> 8) & 0x00ff) + amt));
        const B = Math.min(255, Math.max(0, (num & 0x0000ff) + amt));
        return "#" + (0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: ThemeService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: ThemeService, providedIn: "root" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: ThemeService, decorators: [{
            type: Injectable,
            args: [{ providedIn: "root" }]
        }], ctorParameters: () => [] });

class EventBusService {
    subscriptions = new Map();
    eventHistory = signal([], ...(ngDevMode ? [{ debugName: "eventHistory" }] : []));
    toastQueue = signal([], ...(ngDevMode ? [{ debugName: "toastQueue" }] : []));
    MAX_HISTORY = 100;
    history = this.eventHistory.asReadonly();
    pendingToasts = this.toastQueue.asReadonly();
    hasToasts = computed(() => this.toastQueue().length > 0, ...(ngDevMode ? [{ debugName: "hasToasts" }] : []));
    emit(event, data) {
        const timestamp = Date.now();
        this.eventHistory.update((h) => [
            ...h,
            { event, data, timestamp },
        ].slice(-this.MAX_HISTORY));
        const subs = this.subscriptions.get(event) ?? [];
        subs.forEach((sub) => {
            try {
                sub.handler.call(sub.context, data);
            }
            catch (err) {
                console.error(`EventBus: Error in handler for "${event}":`, err);
            }
        });
    }
    on(event, handler, context) {
        const id = `${event}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        const sub = { id, event, handler, context };
        const existing = this.subscriptions.get(event) ?? [];
        this.subscriptions.set(event, [...existing, sub]);
        return () => this.off(event, id);
    }
    once(event, handler, context) {
        const id = `${event}-once-${Date.now()}`;
        const wrappedHandler = (data) => {
            handler.call(context, data);
            this.off(event, id);
        };
        const sub = { id, event, handler: wrappedHandler, context };
        const existing = this.subscriptions.get(event) ?? [];
        this.subscriptions.set(event, [...existing, sub]);
        return () => this.off(event, id);
    }
    off(event, subscriptionId) {
        const subs = this.subscriptions.get(event) ?? [];
        const filtered = subs.filter((s) => s.id !== subscriptionId);
        if (filtered.length > 0) {
            this.subscriptions.set(event, filtered);
        }
        else {
            this.subscriptions.delete(event);
        }
    }
    offAll(event) {
        if (event) {
            this.subscriptions.delete(event);
        }
        else {
            this.subscriptions.clear();
        }
    }
    hasListeners(event) {
        const subs = this.subscriptions.get(event) ?? [];
        return subs.length > 0;
    }
    getListenerCount(event) {
        return (this.subscriptions.get(event) ?? []).length;
    }
    // Toast-specific methods
    showToast(message, type = "info", duration = 3000) {
        const id = `toast-${Date.now()}`;
        const toast = { id, message, type, duration };
        this.toastQueue.update((q) => [...q, toast]);
        if (duration > 0) {
            setTimeout(() => this.dismissToast(id), duration);
        }
        this.emit("notification", toast);
        return id;
    }
    success(message, duration = 3000) {
        return this.showToast(message, "success", duration);
    }
    error(message, duration = 5000) {
        return this.showToast(message, "error", duration);
    }
    warning(message, duration = 4000) {
        return this.showToast(message, "warning", duration);
    }
    info(message, duration = 3000) {
        return this.showToast(message, "info", duration);
    }
    dismissToast(id) {
        this.toastQueue.update((q) => q.filter((t) => t.id !== id));
        this.emit("toast-dismissed", id);
    }
    dismissAllToasts() {
        this.toastQueue.set([]);
        this.emit("all-toasts-dismissed", undefined);
    }
    // Convenience: emit notification event (for schema-driven UI)
    notify(notification) {
        return this.showToast(notification.message, notification.type, notification.duration);
    }
    // Get toast by ID
    getToast(id) {
        return this.toastQueue().find((t) => t.id === id);
    }
    // Clear history
    clearHistory() {
        this.eventHistory.set([]);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: EventBusService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: EventBusService, providedIn: "root" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: EventBusService, decorators: [{
            type: Injectable,
            args: [{ providedIn: "root" }]
        }] });

class SchemaRendererService {
    router = inject(SchemaRouterService);
    componentRegistry = inject(ComponentRegistryService);
    bindingResolver = inject(DataBindingResolver);
    styleResolver = inject(StyleResolver);
    themeService = inject(ThemeService);
    eventBus = inject(EventBusService);
    renderContexts = new Map();
    async renderPage(pageId, container) {
        const page = this.router.getPage(pageId);
        if (!page) {
            throw new Error(`Page not found: ${pageId}`);
        }
        await this.render(page, container);
    }
    async render(page, container) {
        const context = this.createRenderContext(page);
        this.renderContexts.set(page.id, context);
        // Clear container
        container.innerHTML = "";
        // Render each canvas element
        for (const element of page.canvasElements) {
            const el = await this.renderElement(element, context);
            if (el) {
                container.appendChild(el);
            }
        }
    }
    async renderLayout(layoutId, container) {
        const layout = this.router.getLayout(layoutId);
        if (!layout) {
            throw new Error(`Layout not found: ${layoutId}`);
        }
        // Render layout slots
        for (const slot of layout.slots ?? []) {
            const slotContainer = container.querySelector(`[data-slot="${slot.name}"]`);
            if (slotContainer) {
                for (const element of slot.elements ?? []) {
                    const el = await this.renderElement(element, this.createRenderContextForLayout(layout));
                    if (el) {
                        slotContainer.appendChild(el);
                    }
                }
            }
        }
    }
    createRenderContext(page) {
        return {
            schema: this.router.schema(),
            page,
            layout: null,
            data: {},
            params: this.router.params(),
            services: new Map(),
            theme: this.themeService.getCurrentTheme(),
            colorMode: this.themeService.resolvedMode(),
            resolvedElements: new Map(),
            eventHandlers: new Map(),
        };
    }
    createRenderContextForLayout(layout) {
        return {
            schema: this.router.schema(),
            page: null,
            layout,
            data: {},
            params: this.router.params(),
            services: new Map(),
            theme: this.themeService.getCurrentTheme(),
            colorMode: this.themeService.resolvedMode(),
            resolvedElements: new Map(),
            eventHandlers: new Map(),
        };
    }
    async renderElement(element, context) {
        const def = this.componentRegistry.get(element.componentId);
        if (!def) {
            console.warn(`SchemaRenderer: Unknown component "${element.componentId}"`);
            return null;
        }
        const el = document.createElement(def.selector);
        // Resolve props with data binding
        const resolvedProps = this.resolveElementProps(element, context);
        this.applyProps(el, resolvedProps);
        // Apply styles
        this.applyStyles(el, element, context);
        // Apply data binding
        if (element.dataBinding) {
            this.applyDataBinding(el, element.dataBinding, context);
        }
        // Apply event handlers
        this.applyEventHandlers(el, element, context);
        // Register in context
        context.resolvedElements.set(element.id, el);
        // Render children
        for (const childId of element.children ?? []) {
            const child = context.page?.canvasElements.find((e) => e.id === childId);
            if (child) {
                const childEl = await this.renderElement(child, context);
                if (childEl) {
                    el.appendChild(childEl);
                }
            }
        }
        return el;
    }
    resolveElementProps(element, context) {
        const props = { ...element.props };
        // Resolve binding expressions in string values
        for (const [key, value] of Object.entries(props)) {
            if (typeof value === "string" && value.includes("{{")) {
                props[key] = this.bindingResolver.resolveExpression(value);
            }
        }
        // Add resolved data binding value
        if (element.dataBinding) {
            const boundValue = this.bindingResolver.resolveBinding(element.dataBinding);
            if (boundValue !== null) {
                props["value"] = boundValue;
            }
        }
        return props;
    }
    applyProps(el, props) {
        for (const [key, value] of Object.entries(props)) {
            if (key === "class") {
                el.className = `${el.className} ${value}`.trim();
                continue;
            }
            if (key.startsWith("data-")) {
                el.setAttribute(key, String(value));
                continue;
            }
            if (key.startsWith("on") && typeof value === "function") {
                const eventName = key.slice(2).toLowerCase();
                el.addEventListener(eventName, value);
                continue;
            }
            if (key.startsWith("--")) {
                el.style.setProperty(key, String(value));
                continue;
            }
            el[key] = value;
        }
    }
    applyStyles(el, element, context) {
        const styleClasses = [];
        // Grid position classes
        if (element.gridPosition) {
            styleClasses.push(this.styleResolver.resolveGridPosition(element.gridPosition));
        }
        // Custom classes
        if (element.classes) {
            styleClasses.push(this.styleResolver.resolveClasses(element.classes).classes);
        }
        if (styleClasses.length > 0) {
            el.className = `${el.className} ${styleClasses.join(" ")}`.trim();
        }
    }
    applyDataBinding(el, binding, context) {
        const value = this.bindingResolver.resolve(binding.entity, binding.field);
        if (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.tagName === "SELECT") {
            const inputEl = el;
            if ("value" in inputEl) {
                inputEl.value = String(value ?? "");
            }
        }
        else if (el.hasAttribute("content")) {
            el.setAttribute("content", String(value ?? ""));
        }
        else {
            el.textContent = String(value ?? "");
        }
        // Subscribe to data changes for reactive updates
        // This would require a more complex implementation with signals
    }
    applyEventHandlers(el, element, context) {
        if (!element.events)
            return;
        for (const [eventName, handlers] of Object.entries(element.events)) {
            for (const handler of handlers) {
                const fn = this.bindingResolver.callFunction(handler.handler, [
                    handler.params,
                ]);
                if (typeof fn === "function") {
                    const wrappedFn = (e) => {
                        this.eventBus.emit(`${element.id}:${eventName}`, {
                            element: element.id,
                            event: eventName,
                            params: handler.params,
                            originalEvent: e,
                        });
                        fn.call(null, e, handler.params);
                    };
                    el.addEventListener(eventName, wrappedFn);
                    context.eventHandlers.set(`${element.id}:${eventName}`, wrappedFn);
                }
            }
        }
    }
    destroyPage(pageId) {
        const context = this.renderContexts.get(pageId);
        if (!context)
            return;
        // Clean up event handlers
        context.eventHandlers.forEach((fn) => {
            // Remove event listeners
        });
        // Clean up resolved elements
        context.resolvedElements.clear();
        this.renderContexts.delete(pageId);
    }
    getRenderContext(pageId) {
        return this.renderContexts.get(pageId);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: SchemaRendererService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: SchemaRendererService, providedIn: "root" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: SchemaRendererService, decorators: [{
            type: Injectable,
            args: [{ providedIn: "root" }]
        }] });

class SchemaElementComponent {
    element;
    elements = [];
    registry = inject(ComponentRegistryService);
    eventBus = inject(EventBusService);
    get tag() {
        const def = this.registry.get(this.element.componentId);
        return def?.selector ?? this.element.componentId;
    }
    get classes() {
        return this.element.classes ?? "";
    }
    get childElements() {
        return (this.element.children ?? [])
            .map(id => this.elements.find(e => e.id === id))
            .filter((e) => e !== undefined);
    }
    get props() {
        return this.element.props ?? {};
    }
    get isKnownComponent() {
        return this.registry.has(this.element.componentId);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: SchemaElementComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.25", type: SchemaElementComponent, isStandalone: true, selector: "app-schema-element", inputs: { element: "element", elements: "elements" }, ngImport: i0, template: "<div [id]=\"element.id\" [class]=\"classes\">\n  @if (tag === 'app-button') {\n    <app-button [label]=\"props['label']\" [buttonStyle]=\"props['buttonStyle']\" [variant]=\"props['variant']\" [size]=\"props['size']\"></app-button>\n  } @else if (tag === 'app-language-selector') {\n    <app-language-selector [labelId]=\"props['labelId']\"></app-language-selector>\n  } @else if (tag === 'app-text-input') {\n    <app-text-input [id]=\"props['id']\" [placeholder]=\"props['placeholder']\" [clearable]=\"props['clearable']\" [maxChars]=\"props['maxChars']\"></app-text-input>\n  } @else if (tag === 'app-translation-output') {\n    <app-translation-output [id]=\"props['id']\" [placeholder]=\"props['placeholder']\"></app-translation-output>\n  } @else if (tag === 'app-swap-button') {\n    <app-swap-button></app-swap-button>\n  } @else if (tag === 'app-theme-toggle') {\n    <app-theme-toggle></app-theme-toggle>\n  } @else if (tag === 'app-shortcuts-overlay') {\n    <app-shortcuts-overlay></app-shortcuts-overlay>\n  } @else if (tag === 'app-loading') {\n    <app-loading></app-loading>\n  } @else if (props['text']) {\n    <!-- Plain element with text content: span, p, h1, h2, footer -->\n    <ng-container [ngSwitch]=\"tag\">\n      <h1 *ngSwitchCase=\"'h1'\">{{ props['text'] }}</h1>\n      <h2 *ngSwitchCase=\"'h2'\">{{ props['text'] }}</h2>\n      <p *ngSwitchCase=\"'p'\">{{ props['text'] }}</p>\n      <footer *ngSwitchCase=\"'footer'\">{{ props['text'] }}</footer>\n      <span *ngSwitchDefault>{{ props['text'] }}</span>\n    </ng-container>\n  }\n  @for (child of childElements; track child.id) {\n    <app-schema-element [element]=\"child\" [elements]=\"elements\"></app-schema-element>\n  }\n</div>\n", styles: [":host{display:contents}\n"], dependencies: [{ kind: "component", type: SchemaElementComponent, selector: "app-schema-element", inputs: ["element", "elements"] }, { kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { kind: "directive", type: i1.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { kind: "directive", type: i1.NgSwitchDefault, selector: "[ngSwitchDefault]" }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: SchemaElementComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-schema-element", standalone: true, imports: [CommonModule], schemas: [CUSTOM_ELEMENTS_SCHEMA], template: "<div [id]=\"element.id\" [class]=\"classes\">\n  @if (tag === 'app-button') {\n    <app-button [label]=\"props['label']\" [buttonStyle]=\"props['buttonStyle']\" [variant]=\"props['variant']\" [size]=\"props['size']\"></app-button>\n  } @else if (tag === 'app-language-selector') {\n    <app-language-selector [labelId]=\"props['labelId']\"></app-language-selector>\n  } @else if (tag === 'app-text-input') {\n    <app-text-input [id]=\"props['id']\" [placeholder]=\"props['placeholder']\" [clearable]=\"props['clearable']\" [maxChars]=\"props['maxChars']\"></app-text-input>\n  } @else if (tag === 'app-translation-output') {\n    <app-translation-output [id]=\"props['id']\" [placeholder]=\"props['placeholder']\"></app-translation-output>\n  } @else if (tag === 'app-swap-button') {\n    <app-swap-button></app-swap-button>\n  } @else if (tag === 'app-theme-toggle') {\n    <app-theme-toggle></app-theme-toggle>\n  } @else if (tag === 'app-shortcuts-overlay') {\n    <app-shortcuts-overlay></app-shortcuts-overlay>\n  } @else if (tag === 'app-loading') {\n    <app-loading></app-loading>\n  } @else if (props['text']) {\n    <!-- Plain element with text content: span, p, h1, h2, footer -->\n    <ng-container [ngSwitch]=\"tag\">\n      <h1 *ngSwitchCase=\"'h1'\">{{ props['text'] }}</h1>\n      <h2 *ngSwitchCase=\"'h2'\">{{ props['text'] }}</h2>\n      <p *ngSwitchCase=\"'p'\">{{ props['text'] }}</p>\n      <footer *ngSwitchCase=\"'footer'\">{{ props['text'] }}</footer>\n      <span *ngSwitchDefault>{{ props['text'] }}</span>\n    </ng-container>\n  }\n  @for (child of childElements; track child.id) {\n    <app-schema-element [element]=\"child\" [elements]=\"elements\"></app-schema-element>\n  }\n</div>\n", styles: [":host{display:contents}\n"] }]
        }], propDecorators: { element: [{
                type: Input,
                args: [{ required: true }]
            }], elements: [{
                type: Input,
                args: [{ required: true }]
            }] } });

class SchemaRouteViewerComponent {
    route = "";
    router = inject(SchemaRouterService);
    page = computed(() => this.router.currentPage(), ...(ngDevMode ? [{ debugName: "page" }] : []));
    ngOnInit() {
        if (this.route)
            this.router.navigate(this.route);
    }
    ngOnChanges(changes) {
        if (changes["route"])
            this.router.navigate(this.route);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: SchemaRouteViewerComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.25", type: SchemaRouteViewerComponent, isStandalone: true, selector: "lib-schema-route-viewer", inputs: { route: "route" }, usesOnChanges: true, ngImport: i0, template: "@if (page(); as p) {\n  <div class=\"schema-page\">\n    @for (element of p.canvasElements; track element.id) {\n      <app-schema-element [element]=\"element\" [elements]=\"p.canvasElements\"></app-schema-element>\n    }\n  </div>\n}\n", styles: [":host{display:block}.schema-page{display:contents}\n"], dependencies: [{ kind: "component", type: SchemaElementComponent, selector: "app-schema-element", inputs: ["element", "elements"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: SchemaRouteViewerComponent, decorators: [{
            type: Component,
            args: [{ selector: "lib-schema-route-viewer", standalone: true, imports: [SchemaElementComponent], schemas: [CUSTOM_ELEMENTS_SCHEMA], template: "@if (page(); as p) {\n  <div class=\"schema-page\">\n    @for (element of p.canvasElements; track element.id) {\n      <app-schema-element [element]=\"element\" [elements]=\"p.canvasElements\"></app-schema-element>\n    }\n  </div>\n}\n", styles: [":host{display:block}.schema-page{display:contents}\n"] }]
        }], propDecorators: { route: [{
                type: Input
            }] } });

class SchemaFetcherService {
    http = inject(HttpClient, { optional: true });
    async loadSchema(options) {
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
        return (typeof s.schemaVersion === "string" &&
            typeof s.app === "object" &&
            Array.isArray(s.pages));
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: SchemaFetcherService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: SchemaFetcherService, providedIn: "root" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: SchemaFetcherService, decorators: [{
            type: Injectable,
            args: [{ providedIn: "root" }]
        }] });

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
    async invoke(cmd, args) {
        return invoke(cmd, args);
    }
    async invokeWithRetry(cmd, args, options = { maxAttempts: 3, initialDelayMs: 1000, maxDelayMs: 30000 }) {
        return invokeWithRetry(() => this.invokeWithTimeout(cmd, args, options.maxDelayMs), options);
    }
    async invokeWithTimeout(cmd, args, timeoutMs) {
        return Promise.race([
            this.invoke(cmd, args),
            new Promise((_, reject) => setTimeout(() => reject(new Error(`Invoke ${cmd} timed out after ${timeoutMs}ms`)), timeoutMs)),
        ]);
    }
}

class CrudService {
    entityName;
    constructor(entityName) {
        this.entityName = entityName;
    }
    async execute(operation, params) {
        return invoke(`crud_${operation}`, {
            entity: this.entityName,
            ...params,
        });
    }
    async find(query) {
        const result = await this.execute("find", { query });
        return result.results ?? { data: [], total: 0 };
    }
    async create(data) {
        const result = await this.execute("create", { data });
        return result.data;
    }
    async update(id, data) {
        const result = await this.execute("update", { id, data });
        return result.data;
    }
    async delete(id) {
        await this.execute("delete", { id });
    }
}

const uiComponents = [
    {
        id: "button",
        name: "Button",
        selector: "app-button",
        packageType: "ui",
        category: "forms",
        props: [
            {
                name: "variant",
                type: "select",
                default: "primary",
                options: ["primary", "secondary", "danger"],
            },
            {
                name: "size",
                type: "select",
                default: "md",
                options: ["sm", "md", "lg"],
            },
            { name: "disabled", type: "boolean", default: false },
        ],
        template: "<button>Button</button>",
        css: ":host { display: inline-flex; }",
    },
    {
        id: "badge",
        name: "Badge",
        selector: "app-badge",
        packageType: "ui",
        category: "display",
        props: [
            {
                name: "variant",
                type: "select",
                default: "default",
                options: ["default", "primary", "success", "warning", "danger"],
            },
            {
                name: "size",
                type: "select",
                default: "md",
                options: ["sm", "md", "lg"],
            },
        ],
        template: "<span>Badge</span>",
        css: ":host { display: inline-flex; }",
    },
    {
        id: "avatar",
        name: "Avatar",
        selector: "app-avatar",
        packageType: "ui",
        category: "display",
        props: [
            { name: "src", type: "string", default: "" },
            { name: "alt", type: "string", default: "Avatar" },
            {
                name: "size",
                type: "select",
                default: "md",
                options: ["sm", "md", "lg"],
            },
        ],
        template: '<img alt="Avatar" />',
        css: ":host { display: inline-flex; }",
    },
    {
        id: "chip",
        name: "Chip",
        selector: "app-chip",
        packageType: "ui",
        category: "display",
        props: [
            { name: "label", type: "string", default: "" },
            { name: "removable", type: "boolean", default: false },
        ],
        template: "<span>Chip</span>",
        css: ":host { display: inline-flex; }",
    },
    {
        id: "input",
        name: "Input",
        selector: "app-input",
        packageType: "ui",
        category: "forms",
        props: [
            {
                name: "type",
                type: "select",
                default: "text",
                options: ["text", "email", "password", "number"],
            },
            { name: "placeholder", type: "string", default: "" },
            { name: "disabled", type: "boolean", default: false },
        ],
        template: '<input type="text" />',
        css: ":host { display: block; }",
    },
    {
        id: "checkbox",
        name: "Checkbox",
        selector: "app-checkbox",
        packageType: "ui",
        category: "forms",
        props: [
            { name: "checked", type: "boolean", default: false },
            { name: "label", type: "string", default: "" },
        ],
        template: '<label><input type="checkbox" /> Checkbox</label>',
        css: ":host { display: block; }",
    },
    {
        id: "radio",
        name: "Radio",
        selector: "app-radio",
        packageType: "ui",
        category: "forms",
        props: [
            { name: "name", type: "string", default: "" },
            { name: "value", type: "string", default: "" },
        ],
        template: '<label><input type="radio" /> Radio</label>',
        css: ":host { display: block; }",
    },
    {
        id: "tabs",
        name: "Tabs",
        selector: "app-tabs",
        packageType: "ui",
        category: "layout",
        props: [{ name: "tabs", type: "string", default: '["Tab 1", "Tab 2"]' }],
        template: "<div><button>Tab 1</button><button>Tab 2</button></div>",
        css: ":host { display: block; }",
    },
    {
        id: "empty-state",
        name: "Empty State",
        selector: "app-empty-state",
        packageType: "ui",
        category: "display",
        props: [
            { name: "title", type: "string", default: "No data" },
            { name: "message", type: "string", default: "" },
        ],
        template: "<div><p>No data</p></div>",
        css: ":host { display: block; }",
    },
    {
        id: "loading",
        name: "Loading",
        selector: "app-loading",
        packageType: "ui",
        category: "feedback",
        props: [
            {
                name: "size",
                type: "select",
                default: "md",
                options: ["sm", "md", "lg"],
            },
        ],
        template: "<div>Loading...</div>",
        css: ":host { display: block; }",
    },
    {
        id: "pagination",
        name: "Pagination",
        selector: "app-pagination",
        packageType: "ui",
        category: "navigation",
        props: [
            { name: "page", type: "number", default: 1 },
            { name: "total", type: "number", default: 10 },
        ],
        template: "<div>Pagination</div>",
        css: ":host { display: block; }",
    },
    {
        id: "tooltip",
        name: "Tooltip",
        selector: "app-tooltip",
        packageType: "ui",
        category: "feedback",
        props: [
            { name: "text", type: "string", default: "" },
            {
                name: "position",
                type: "select",
                default: "top",
                options: ["top", "bottom", "left", "right"],
            },
        ],
        template: "<span>Tooltip</span>",
        css: ":host { display: inline-flex; }",
    },
    {
        id: "progress-bar",
        name: "Progress Bar",
        selector: "app-progress-bar",
        packageType: "ui",
        category: "feedback",
        props: [
            { name: "value", type: "number", default: 0 },
            { name: "max", type: "number", default: 100 },
        ],
        template: "<div><div>Progress</div></div>",
        css: ":host { display: block; }",
    },
    {
        id: "slider",
        name: "Slider",
        selector: "app-slider",
        packageType: "ui",
        category: "forms",
        props: [
            { name: "min", type: "number", default: 0 },
            { name: "max", type: "number", default: 100 },
            { name: "value", type: "number", default: 50 },
        ],
        template: '<input type="range" />',
        css: ":host { display: block; }",
    },
    {
        id: "select",
        name: "Select",
        selector: "app-select",
        packageType: "ui",
        category: "forms",
        props: [
            { name: "options", type: "string", default: "[]" },
            { name: "placeholder", type: "string", default: "Select..." },
        ],
        template: "<select><option>Option</option></select>",
        css: ":host { display: block; }",
    },
    {
        id: "switch",
        name: "Switch",
        selector: "app-switch",
        packageType: "ui",
        category: "forms",
        props: [{ name: "checked", type: "boolean", default: false }],
        template: '<label><input type="checkbox" /> Switch</label>',
        css: ":host { display: block; }",
    },
];
const layoutComponents = [
    {
        id: "split-view",
        name: "Split View",
        selector: "app-split-view",
        packageType: "layout",
        category: "layout",
        props: [
            {
                name: "direction",
                type: "select",
                default: "horizontal",
                options: ["horizontal", "vertical"],
            },
            { name: "split", type: "number", default: 50 },
        ],
        template: "<div><div>Left</div><div>Right</div></div>",
        css: ":host { display: block; }",
    },
    {
        id: "page-container",
        name: "Page Container",
        selector: "app-page-container",
        packageType: "layout",
        category: "layout",
        props: [{ name: "title", type: "string", default: "" }],
        template: "<div><h1>Page</h1><ng-content></ng-content></div>",
        css: ":host { display: block; }",
    },
    {
        id: "page-toolbar",
        name: "Page Toolbar",
        selector: "app-page-toolbar",
        packageType: "layout",
        category: "layout",
        props: [{ name: "title", type: "string", default: "" }],
        template: "<div><span>Toolbar</span></div>",
        css: ":host { display: block; }",
    },
    {
        id: "header",
        name: "Header",
        selector: "app-header",
        packageType: "layout",
        category: "layout",
        props: [
            { name: "title", type: "string", default: "" },
            { name: "breadcrumbs", type: "string", default: "" },
        ],
        template: "<header><nav>Header</nav></header>",
        css: ":host { display: block; }",
    },
    {
        id: "sidebar",
        name: "Sidebar",
        selector: "app-sidebar",
        packageType: "layout",
        category: "layout",
        props: [
            { name: "collapsed", type: "boolean", default: false },
            { name: "items", type: "string", default: "[]" },
        ],
        template: "<nav><ul><li>Item</li></ul></nav>",
        css: ":host { display: block; }",
    },
    {
        id: "footer",
        name: "Footer",
        selector: "app-footer",
        packageType: "layout",
        category: "layout",
        props: [{ name: "text", type: "string", default: "" }],
        template: "<footer><span>Footer</span></footer>",
        css: ":host { display: block; }",
    },
    {
        id: "main-editor",
        name: "Main Editor",
        selector: "app-main-editor",
        packageType: "layout",
        category: "layout",
        props: [],
        template: "<div><span>Canvas</span></div>",
        css: ":host { display: block; }",
    },
    {
        id: "bottom-panel",
        name: "Bottom Panel",
        selector: "app-bottom-panel",
        packageType: "layout",
        category: "layout",
        props: [
            { name: "tabs", type: "string", default: "[]" },
            { name: "activeTab", type: "string", default: "pages" },
        ],
        template: "<div><span>Bottom Panel</span></div>",
        css: ":host { display: block; }",
    },
    {
        id: "designer-sidebar",
        name: "Designer Sidebar",
        selector: "app-designer-sidebar",
        packageType: "layout",
        category: "designer",
        props: [
            {
                name: "position",
                type: "select",
                default: "left",
                options: ["left", "right"],
            },
            { name: "collapsed", type: "boolean", default: false },
            { name: "header", type: "string", default: "" },
        ],
        template: '<aside><slot name="content"></slot></aside>',
        css: ":host { display: block; }",
    },
    {
        id: "component-palette",
        name: "Component Palette",
        selector: "app-component-palette",
        packageType: "layout",
        category: "designer",
        props: [
            { name: "selectedCategory", type: "string", default: "all" },
            { name: "searchable", type: "boolean", default: true },
        ],
        template: "<div><span>Palette</span></div>",
        css: ":host { display: block; }",
    },
    {
        id: "canvas",
        name: "Canvas",
        selector: "app-canvas",
        packageType: "layout",
        category: "designer",
        props: [
            { name: "gridColumns", type: "number", default: 12 },
            { name: "showGrid", type: "boolean", default: true },
            { name: "selectedId", type: "string", default: "" },
        ],
        template: "<div><span>Canvas</span></div>",
        css: ":host { display: block; }",
    },
    {
        id: "canvas-toolbar",
        name: "Canvas Toolbar",
        selector: "app-canvas-toolbar",
        packageType: "layout",
        category: "designer",
        props: [],
        template: "<div></div>",
        css: ":host { display: inline-flex; }",
    },
];
const feedbackComponents = [
    {
        id: "dialog",
        name: "Dialog",
        selector: "app-dialog",
        packageType: "feedback",
        category: "feedback",
        props: [
            { name: "open", type: "boolean", default: false },
            { name: "title", type: "string", default: "" },
            {
                name: "size",
                type: "select",
                default: "md",
                options: ["sm", "md", "lg"],
            },
        ],
        template: "<div><h2>Dialog</h2><p>Content</p></div>",
        css: ":host { display: block; }",
    },
    {
        id: "confirm-dialog",
        name: "Confirm Dialog",
        selector: "app-confirm-dialog",
        packageType: "feedback",
        category: "feedback",
        props: [
            { name: "open", type: "boolean", default: false },
            { name: "title", type: "string", default: "Confirm" },
            { name: "message", type: "string", default: "Are you sure?" },
        ],
        template: "<div><h2>Confirm</h2><p>Message</p></div>",
        css: ":host { display: block; }",
    },
    {
        id: "toast",
        name: "Toast",
        selector: "app-toast",
        packageType: "feedback",
        category: "feedback",
        props: [
            { name: "message", type: "string", default: "" },
            {
                name: "type",
                type: "select",
                default: "info",
                options: ["info", "success", "warning", "error"],
            },
            { name: "duration", type: "number", default: 3000 },
        ],
        template: "<div>Toast</div>",
        css: ":host { display: block; }",
    },
    {
        id: "snackbar",
        name: "Snackbar",
        selector: "app-snackbar",
        packageType: "feedback",
        category: "feedback",
        props: [
            { name: "message", type: "string", default: "" },
            { name: "action", type: "string", default: "" },
        ],
        template: "<div>Snackbar</div>",
        css: ":host { display: block; }",
    },
    {
        id: "command-palette",
        name: "Command Palette",
        selector: "app-command-palette",
        packageType: "feedback",
        category: "feedback",
        props: [
            { name: "open", type: "boolean", default: false },
            { name: "commands", type: "string", default: "[]" },
        ],
        template: "<div>Command Palette</div>",
        css: ":host { display: block; }",
    },
    {
        id: "modal",
        name: "Modal",
        selector: "app-modal",
        packageType: "feedback",
        category: "feedback",
        props: [
            { name: "open", type: "boolean", default: false },
            { name: "title", type: "string", default: "" },
        ],
        template: "<div><h2>Modal</h2><p>Content</p></div>",
        css: ":host { display: block; }",
    },
];
const dataComponents = [
    {
        id: "card",
        name: "Card",
        selector: "app-card",
        packageType: "data",
        category: "display",
        props: [
            { name: "title", type: "string", default: "" },
            { name: "content", type: "string", default: "" },
            { name: "elevated", type: "boolean", default: false },
        ],
        template: "<div><h3>Card Title</h3><p>Card content</p></div>",
        css: ":host { display: block; }",
    },
    {
        id: "stats-card",
        name: "Stats Card",
        selector: "app-stats-card",
        packageType: "data",
        category: "display",
        props: [
            { name: "label", type: "string", default: "" },
            { name: "value", type: "string", default: "" },
            { name: "icon", type: "string", default: "" },
        ],
        template: "<div><span>0</span><span>Label</span></div>",
        css: ":host { display: block; }",
    },
    {
        id: "table-view",
        name: "Table View",
        selector: "app-table-view",
        packageType: "data",
        category: "display",
        props: [
            { name: "columns", type: "string", default: "[]" },
            { name: "data", type: "string", default: "[]" },
        ],
        template: "<table><thead></thead><tbody></tbody></table>",
        css: ":host { display: block; }",
    },
    {
        id: "data-table",
        name: "Data Table",
        selector: "app-data-table",
        packageType: "data",
        category: "display",
        props: [
            { name: "columns", type: "string", default: "[]" },
            { name: "data", type: "string", default: "[]" },
            { name: "selectable", type: "boolean", default: false },
        ],
        template: "<table><thead></thead><tbody></tbody></table>",
        css: ":host { display: block; }",
    },
    {
        id: "json-view",
        name: "JSON View",
        selector: "app-json-view",
        packageType: "data",
        category: "display",
        props: [{ name: "data", type: "string", default: "{}" }],
        template: "<pre>{}</pre>",
        css: ":host { display: block; }",
    },
    {
        id: "segment-selector",
        name: "Segment Selector",
        selector: "app-segment-selector",
        packageType: "data",
        category: "forms",
        props: [
            { name: "options", type: "string", default: "[]" },
            { name: "selected", type: "string", default: "" },
        ],
        template: "<div><button>Option</button></div>",
        css: ":host { display: block; }",
    },
];
const components = uiComponents;

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
        const result = await invokeWithRetry(() => invoke(command, args), { maxAttempts: retryCount + 1, initialDelayMs: retryDelay, maxDelayMs: 60000 });
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

const STYLE_VARIANTS = {
    claymorphism: {
        id: "claymorphism",
        name: "Claymorphism",
        cssFile: "./claymorphism.css",
        classPrefix: "clay-",
        description: "Soft raised shadows with clay-like appearance, rounded corners and gradient backgrounds",
    },
    glassmorphism: {
        id: "glassmorphism",
        name: "Glasmorphism",
        cssFile: "./glassmorphism.css",
        classPrefix: "glass-",
        description: "Frosted glass effect with backdrop blur, semi-transparent surfaces",
    },
    neumorphism: {
        id: "neumorphism",
        name: "Neumorphism",
        cssFile: "./neumorphism.css",
        classPrefix: "neu-",
        description: "Soft inset and outset shadows with muted base color for subtle depth",
    },
    "material-design-v3": {
        id: "material-design-v3",
        name: "Material Design 3",
        cssFile: "./material-design-v3.css",
        classPrefix: "m3-",
        description: "Google Material Design 3 with elevation system, state layers, and rounded corners",
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
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = config.cssFile;
    link.id = `style-${variant}`;
    link.dataset.styleVariant = variant;
    await new Promise((resolve, reject) => {
        link.onload = () => resolve();
        link.onerror = () => reject(new Error(`Failed to load style: ${config.cssFile}`));
        document.head.appendChild(link);
    });
    LOADED_STYLES.add(variant);
    STYLE_ELEMENTS.set(variant, link);
}
function unloadStyleVariant(variant) {
    if (!LOADED_STYLES.has(variant)) {
        return;
    }
    const link = STYLE_ELEMENTS.get(variant);
    if (link && link.parentNode) {
        link.parentNode.removeChild(link);
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

class UiShowcaseComponent {
    themeService = inject(ThemeService);
    colorModes = ["light", "dark", "system"];
    styleVariants = getAllStyleVariants();
    currentColorMode = signal(this.themeService.colorMode(), ...(ngDevMode ? [{ debugName: "currentColorMode" }] : []));
    currentStyleVariant = signal(getCurrentStyle(), ...(ngDevMode ? [{ debugName: "currentStyleVariant" }] : []));
    searchQuery = signal("", ...(ngDevMode ? [{ debugName: "searchQuery" }] : []));
    selectedCategory = signal("all", ...(ngDevMode ? [{ debugName: "selectedCategory" }] : []));
    allComponents = [
        ...uiComponents,
        ...layoutComponents,
        ...feedbackComponents,
        ...dataComponents,
    ];
    categories = computed(() => {
        const cats = new Set(this.allComponents.map((c) => c.category));
        return ["all", ...Array.from(cats)];
    }, ...(ngDevMode ? [{ debugName: "categories" }] : []));
    filteredComponents = computed(() => {
        let result = this.allComponents;
        const cat = this.selectedCategory();
        const query = this.searchQuery().toLowerCase();
        if (cat !== "all") {
            result = result.filter((c) => c.category === cat);
        }
        if (query) {
            result = result.filter((c) => c.name.toLowerCase().includes(query) ||
                c.selector.toLowerCase().includes(query));
        }
        return result;
    }, ...(ngDevMode ? [{ debugName: "filteredComponents" }] : []));
    setColorMode(mode) {
        this.themeService.setMode(mode);
        this.currentColorMode.set(this.themeService.colorMode());
    }
    async setStyleVariant(variant) {
        await loadStyleVariant(variant);
        setCurrentStyle(variant);
        this.currentStyleVariant.set(variant);
    }
    getComponentDemoContent(comp) {
        switch (comp.id) {
            case "button":
                return "Button";
            case "badge":
                return "Badge";
            case "avatar":
                return "";
            case "chip":
                return "Chip";
            case "input":
                return "";
            case "checkbox":
                return "";
            case "radio":
                return "";
            case "tabs":
                return "";
            case "empty-state":
                return "";
            case "loading":
                return "";
            case "pagination":
                return "";
            case "tooltip":
                return "";
            case "progress-bar":
                return "";
            case "slider":
                return "";
            case "select":
                return "";
            case "switch":
                return "";
            case "card":
                return "";
            case "stats-card":
                return "";
            case "table-view":
                return "";
            case "data-table":
                return "";
            case "json-view":
                return "";
            case "segment-selector":
                return "";
            case "dialog":
                return "";
            case "confirm-dialog":
                return "";
            case "toast":
                return "";
            case "snackbar":
                return "";
            case "command-palette":
                return "";
            case "modal":
                return "";
            case "split-view":
                return "";
            case "page-container":
                return "";
            case "page-toolbar":
                return "";
            case "header":
                return "";
            case "sidebar":
                return "";
            case "footer":
                return "";
            case "main-editor":
                return "";
            case "bottom-panel":
                return "";
            case "designer-sidebar":
                return "";
            case "component-palette":
                return "";
            case "canvas":
                return "";
            case "canvas-toolbar":
                return "";
            default:
                return "";
        }
    }
    getComponentProps(comp) {
        const props = {};
        for (const p of comp.props) {
            switch (p.name) {
                case "variant":
                    if (p.options && p.options.length > 0) {
                        props[p.name] = p.options[0];
                    }
                    break;
                case "size":
                    if (p.options && p.options.length > 0) {
                        props[p.name] = p.options[0];
                    }
                    break;
                case "checked":
                    props[p.name] = false;
                    break;
                case "disabled":
                    props[p.name] = false;
                    break;
                case "title":
                    props[p.name] = comp.name;
                    break;
                case "label":
                    props[p.name] = comp.name;
                    break;
                case "text":
                    props[p.name] = comp.name;
                    break;
                case "placeholder":
                    props[p.name] = "Enter text...";
                    break;
                case "type":
                    props[p.name] = "text";
                    break;
                case "value":
                    props[p.name] = 50;
                    break;
                case "page":
                    props[p.name] = 1;
                    break;
                case "total":
                    props[p.name] = 10;
                    break;
                case "min":
                    props[p.name] = 0;
                    break;
                case "max":
                    props[p.name] = 100;
                    break;
                case "open":
                    props[p.name] = false;
                    break;
                case "options":
                    props[p.name] = '["Option 1", "Option 2"]';
                    break;
                case "tabs":
                    props[p.name] = '["Tab 1", "Tab 2"]';
                    break;
                case "columns":
                    props[p.name] = '["Name", "Status"]';
                    break;
                case "data":
                    props[p.name] = '[]';
                    break;
                case "src":
                    props[p.name] = "";
                    break;
                case "alt":
                    props[p.name] = "Avatar";
                    break;
                default:
                    if (p.default !== undefined) {
                        props[p.name] = p.default;
                    }
            }
        }
        return props;
    }
    setComponentProps(el, props) {
        for (const [key, value] of Object.entries(props)) {
            if (value !== undefined) {
                el[key] = value;
            }
        }
    }
    async renderComponent(card, comp) {
        const container = card.querySelector(".component-preview");
        if (!container)
            return;
        container.innerHTML = "";
        try {
            await customElements.whenDefined(comp.selector);
            const el = document.createElement(comp.selector);
            const props = this.getComponentProps(comp);
            this.setComponentProps(el, props);
            container.appendChild(el);
        }
        catch (e) {
            container.textContent = comp.selector;
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: UiShowcaseComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.25", type: UiShowcaseComponent, isStandalone: true, selector: "app-ui-showcase", ngImport: i0, template: "<div class=\"showcase-container\">\n  <header class=\"showcase-header\">\n    <h1 class=\"showcase-title\">UI Showcase</h1>\n\n    <div class=\"showcase-controls\">\n      <div class=\"control-group\">\n        <span class=\"control-label\">Color Mode</span>\n        <div class=\"button-group\">\n          @for (mode of colorModes; track mode) {\n            <button\n              class=\"mode-btn\"\n              [class.active]=\"currentColorMode() === mode\"\n              (click)=\"setColorMode(mode)\"\n            >\n              {{ mode }}\n            </button>\n          }\n        </div>\n      </div>\n\n      <div class=\"control-group\">\n        <span class=\"control-label\">Style</span>\n        <select\n          class=\"style-select\"\n          [value]=\"currentStyleVariant()\"\n          (change)=\"setStyleVariant($any($event.target).value)\"\n        >\n          @for (v of styleVariants; track v.id) {\n            <option [value]=\"v.id\">{{ v.name }}</option>\n          }\n        </select>\n      </div>\n    </div>\n  </header>\n\n  <div class=\"showcase-filters\">\n    <input\n      type=\"text\"\n      class=\"search-input\"\n      placeholder=\"Search components...\"\n      [value]=\"searchQuery()\"\n      (input)=\"searchQuery.set($any($event.target).value)\"\n    />\n\n    <div class=\"category-tabs\">\n      @for (cat of categories(); track cat) {\n        <button\n          class=\"category-tab\"\n          [class.active]=\"selectedCategory() === cat\"\n          (click)=\"selectedCategory.set(cat)\"\n        >\n          {{ cat }}\n        </button>\n      }\n    </div>\n  </div>\n\n  <div class=\"component-grid\">\n    @for (comp of filteredComponents(); track comp.id) {\n      <div class=\"component-card\">\n        <div class=\"card-header\">\n          <span class=\"component-name\">{{ comp.name }}</span>\n          <code class=\"component-selector\">{{ comp.selector }}</code>\n        </div>\n\n        <div\n          class=\"component-preview\"\n          #card\n          [attr.data-selector]=\"comp.selector\"\n          (mouseenter)=\"renderComponent($any($event.target).closest('.component-card'), comp)\"\n        ></div>\n\n        <div class=\"card-footer\">\n          <span class=\"category-badge\">{{ comp.category }}</span>\n          <span class=\"package-badge\">{{ comp.packageType }}</span>\n        </div>\n      </div>\n    }\n  </div>\n</div>", styles: [".showcase-container{min-height:100vh;background-color:var(--color-bg-primary, #f8fafc);color:var(--color-text-primary, #1e293b)}.showcase-header{display:flex;align-items:center;justify-content:space-between;padding:1.5rem 2rem;background-color:var(--color-bg-elevated, #ffffff);border-bottom:1px solid var(--color-border, #e2e8f0);position:sticky;top:0;z-index:10;gap:2rem;flex-wrap:wrap}.showcase-title{margin:0;font-size:1.5rem;font-weight:700;color:var(--color-text-primary, #1e293b)}.showcase-controls{display:flex;align-items:center;gap:2rem;flex-wrap:wrap}.control-group{display:flex;align-items:center;gap:.75rem}.control-label{font-size:.875rem;font-weight:500;color:var(--color-text-secondary, #64748b)}.button-group{display:flex;border:1px solid var(--color-border, #e2e8f0);border-radius:.5rem;overflow:hidden}.mode-btn{padding:.5rem 1rem;border:none;background-color:var(--color-bg-elevated, #ffffff);color:var(--color-text-secondary, #64748b);font-size:.875rem;font-weight:500;cursor:pointer;transition:all .15s;text-transform:capitalize}.mode-btn:not(:last-child){border-right:1px solid var(--color-border, #e2e8f0)}.mode-btn:hover{background-color:var(--color-bg-hover, #f1f5f9)}.mode-btn.active{background-color:var(--color-accent, #8b5cf6);color:var(--color-text-on-accent, #ffffff)}.style-select{padding:.5rem 1rem;border:1px solid var(--color-border, #e2e8f0);border-radius:.5rem;background-color:var(--color-bg-elevated, #ffffff);color:var(--color-text-primary, #1e293b);font-size:.875rem;font-weight:500;cursor:pointer;min-width:160px}.style-select:focus{outline:none;border-color:var(--color-accent, #8b5cf6)}.showcase-filters{padding:1.5rem 2rem;display:flex;flex-direction:column;gap:1rem;background-color:var(--color-bg-secondary, #f1f5f9);border-bottom:1px solid var(--color-border, #e2e8f0)}.search-input{padding:.75rem 1rem;border:1px solid var(--color-border, #e2e8f0);border-radius:.5rem;background-color:var(--color-bg-elevated, #ffffff);color:var(--color-text-primary, #1e293b);font-size:.9375rem;max-width:400px}.search-input::placeholder{color:var(--color-text-muted, #94a3b8)}.search-input:focus{outline:none;border-color:var(--color-accent, #8b5cf6)}.category-tabs{display:flex;gap:.5rem;flex-wrap:wrap}.category-tab{padding:.5rem 1rem;border:1px solid var(--color-border, #e2e8f0);border-radius:2rem;background-color:var(--color-bg-elevated, #ffffff);color:var(--color-text-secondary, #64748b);font-size:.875rem;font-weight:500;cursor:pointer;transition:all .15s;text-transform:capitalize}.category-tab:hover{background-color:var(--color-bg-hover, #f1f5f9)}.category-tab.active{background-color:var(--color-accent, #8b5cf6);border-color:var(--color-accent, #8b5cf6);color:var(--color-text-on-accent, #ffffff)}.component-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:1.5rem;padding:2rem}.component-card{background-color:var(--color-bg-elevated, #ffffff);border:1px solid var(--color-border, #e2e8f0);border-radius:.75rem;overflow:hidden;display:flex;flex-direction:column;transition:box-shadow .15s}.component-card:hover{box-shadow:0 4px 12px #0000001a}.card-header{display:flex;align-items:center;justify-content:space-between;padding:1rem;border-bottom:1px solid var(--color-border-light, #f1f5f9);gap:.5rem}.component-name{font-size:1rem;font-weight:600;color:var(--color-text-primary, #1e293b)}.component-selector{font-size:.75rem;padding:.25rem .5rem;background-color:var(--color-bg-secondary, #f1f5f9);border-radius:.25rem;color:var(--color-text-secondary, #64748b);font-family:monospace}.component-preview{padding:2rem 1rem;min-height:100px;display:flex;align-items:center;justify-content:center;background-color:var(--color-bg-primary, #f8fafc);flex-wrap:wrap;gap:.5rem}.card-footer{display:flex;align-items:center;gap:.5rem;padding:.75rem 1rem;border-top:1px solid var(--color-border-light, #f1f5f9)}.category-badge,.package-badge{font-size:.75rem;padding:.25rem .5rem;border-radius:.25rem;font-weight:500;text-transform:capitalize}.category-badge{background-color:var(--color-bg-secondary, #f1f5f9);color:var(--color-text-secondary, #64748b)}.package-badge{background-color:var(--color-accent, #8b5cf6);color:var(--color-text-on-accent, #ffffff);opacity:.8}@media(max-width:768px){.showcase-header{flex-direction:column;align-items:flex-start}.component-grid{grid-template-columns:1fr;padding:1rem}}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i1$1.NgSelectOption, selector: "option", inputs: ["ngValue", "value"] }, { kind: "directive", type: i1$1.ɵNgSelectMultipleOption, selector: "option", inputs: ["ngValue", "value"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: UiShowcaseComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-ui-showcase", standalone: true, imports: [CommonModule, FormsModule], template: "<div class=\"showcase-container\">\n  <header class=\"showcase-header\">\n    <h1 class=\"showcase-title\">UI Showcase</h1>\n\n    <div class=\"showcase-controls\">\n      <div class=\"control-group\">\n        <span class=\"control-label\">Color Mode</span>\n        <div class=\"button-group\">\n          @for (mode of colorModes; track mode) {\n            <button\n              class=\"mode-btn\"\n              [class.active]=\"currentColorMode() === mode\"\n              (click)=\"setColorMode(mode)\"\n            >\n              {{ mode }}\n            </button>\n          }\n        </div>\n      </div>\n\n      <div class=\"control-group\">\n        <span class=\"control-label\">Style</span>\n        <select\n          class=\"style-select\"\n          [value]=\"currentStyleVariant()\"\n          (change)=\"setStyleVariant($any($event.target).value)\"\n        >\n          @for (v of styleVariants; track v.id) {\n            <option [value]=\"v.id\">{{ v.name }}</option>\n          }\n        </select>\n      </div>\n    </div>\n  </header>\n\n  <div class=\"showcase-filters\">\n    <input\n      type=\"text\"\n      class=\"search-input\"\n      placeholder=\"Search components...\"\n      [value]=\"searchQuery()\"\n      (input)=\"searchQuery.set($any($event.target).value)\"\n    />\n\n    <div class=\"category-tabs\">\n      @for (cat of categories(); track cat) {\n        <button\n          class=\"category-tab\"\n          [class.active]=\"selectedCategory() === cat\"\n          (click)=\"selectedCategory.set(cat)\"\n        >\n          {{ cat }}\n        </button>\n      }\n    </div>\n  </div>\n\n  <div class=\"component-grid\">\n    @for (comp of filteredComponents(); track comp.id) {\n      <div class=\"component-card\">\n        <div class=\"card-header\">\n          <span class=\"component-name\">{{ comp.name }}</span>\n          <code class=\"component-selector\">{{ comp.selector }}</code>\n        </div>\n\n        <div\n          class=\"component-preview\"\n          #card\n          [attr.data-selector]=\"comp.selector\"\n          (mouseenter)=\"renderComponent($any($event.target).closest('.component-card'), comp)\"\n        ></div>\n\n        <div class=\"card-footer\">\n          <span class=\"category-badge\">{{ comp.category }}</span>\n          <span class=\"package-badge\">{{ comp.packageType }}</span>\n        </div>\n      </div>\n    }\n  </div>\n</div>", styles: [".showcase-container{min-height:100vh;background-color:var(--color-bg-primary, #f8fafc);color:var(--color-text-primary, #1e293b)}.showcase-header{display:flex;align-items:center;justify-content:space-between;padding:1.5rem 2rem;background-color:var(--color-bg-elevated, #ffffff);border-bottom:1px solid var(--color-border, #e2e8f0);position:sticky;top:0;z-index:10;gap:2rem;flex-wrap:wrap}.showcase-title{margin:0;font-size:1.5rem;font-weight:700;color:var(--color-text-primary, #1e293b)}.showcase-controls{display:flex;align-items:center;gap:2rem;flex-wrap:wrap}.control-group{display:flex;align-items:center;gap:.75rem}.control-label{font-size:.875rem;font-weight:500;color:var(--color-text-secondary, #64748b)}.button-group{display:flex;border:1px solid var(--color-border, #e2e8f0);border-radius:.5rem;overflow:hidden}.mode-btn{padding:.5rem 1rem;border:none;background-color:var(--color-bg-elevated, #ffffff);color:var(--color-text-secondary, #64748b);font-size:.875rem;font-weight:500;cursor:pointer;transition:all .15s;text-transform:capitalize}.mode-btn:not(:last-child){border-right:1px solid var(--color-border, #e2e8f0)}.mode-btn:hover{background-color:var(--color-bg-hover, #f1f5f9)}.mode-btn.active{background-color:var(--color-accent, #8b5cf6);color:var(--color-text-on-accent, #ffffff)}.style-select{padding:.5rem 1rem;border:1px solid var(--color-border, #e2e8f0);border-radius:.5rem;background-color:var(--color-bg-elevated, #ffffff);color:var(--color-text-primary, #1e293b);font-size:.875rem;font-weight:500;cursor:pointer;min-width:160px}.style-select:focus{outline:none;border-color:var(--color-accent, #8b5cf6)}.showcase-filters{padding:1.5rem 2rem;display:flex;flex-direction:column;gap:1rem;background-color:var(--color-bg-secondary, #f1f5f9);border-bottom:1px solid var(--color-border, #e2e8f0)}.search-input{padding:.75rem 1rem;border:1px solid var(--color-border, #e2e8f0);border-radius:.5rem;background-color:var(--color-bg-elevated, #ffffff);color:var(--color-text-primary, #1e293b);font-size:.9375rem;max-width:400px}.search-input::placeholder{color:var(--color-text-muted, #94a3b8)}.search-input:focus{outline:none;border-color:var(--color-accent, #8b5cf6)}.category-tabs{display:flex;gap:.5rem;flex-wrap:wrap}.category-tab{padding:.5rem 1rem;border:1px solid var(--color-border, #e2e8f0);border-radius:2rem;background-color:var(--color-bg-elevated, #ffffff);color:var(--color-text-secondary, #64748b);font-size:.875rem;font-weight:500;cursor:pointer;transition:all .15s;text-transform:capitalize}.category-tab:hover{background-color:var(--color-bg-hover, #f1f5f9)}.category-tab.active{background-color:var(--color-accent, #8b5cf6);border-color:var(--color-accent, #8b5cf6);color:var(--color-text-on-accent, #ffffff)}.component-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:1.5rem;padding:2rem}.component-card{background-color:var(--color-bg-elevated, #ffffff);border:1px solid var(--color-border, #e2e8f0);border-radius:.75rem;overflow:hidden;display:flex;flex-direction:column;transition:box-shadow .15s}.component-card:hover{box-shadow:0 4px 12px #0000001a}.card-header{display:flex;align-items:center;justify-content:space-between;padding:1rem;border-bottom:1px solid var(--color-border-light, #f1f5f9);gap:.5rem}.component-name{font-size:1rem;font-weight:600;color:var(--color-text-primary, #1e293b)}.component-selector{font-size:.75rem;padding:.25rem .5rem;background-color:var(--color-bg-secondary, #f1f5f9);border-radius:.25rem;color:var(--color-text-secondary, #64748b);font-family:monospace}.component-preview{padding:2rem 1rem;min-height:100px;display:flex;align-items:center;justify-content:center;background-color:var(--color-bg-primary, #f8fafc);flex-wrap:wrap;gap:.5rem}.card-footer{display:flex;align-items:center;gap:.5rem;padding:.75rem 1rem;border-top:1px solid var(--color-border-light, #f1f5f9)}.category-badge,.package-badge{font-size:.75rem;padding:.25rem .5rem;border-radius:.25rem;font-weight:500;text-transform:capitalize}.category-badge{background-color:var(--color-bg-secondary, #f1f5f9);color:var(--color-text-secondary, #64748b)}.package-badge{background-color:var(--color-accent, #8b5cf6);color:var(--color-text-on-accent, #ffffff);opacity:.8}@media(max-width:768px){.showcase-header{flex-direction:column;align-items:flex-start}.component-grid{grid-template-columns:1fr;padding:1rem}}\n"] }]
        }] });

// @tauri-front/shared - Unified shared library
// Explicit re-exports to avoid name collisions
// Disable Lit dev mode warnings and class field shadowing errors
// Must be set before Lit imports
const global = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : {};
Object.defineProperty(global, 'litDevMode', { value: false, writable: true, configurable: true });
// Suppress unhandled promise rejections from Lit class field warnings
if (typeof window !== 'undefined') {
    const originalHandler = window.onunhandledrejection;
    window.onunhandledrejection = (event) => {
        const reason = event?.reason;
        if (reason?.message?.includes('class fields') || reason?.message?.includes('Lit is in dev mode')) {
            event.preventDefault();
            return;
        }
        if (originalHandler)
            originalHandler(event);
    };
}

/**
 * Generated bundle index. Do not edit.
 */

export { AppAvatar, AppBadge, AppBottomPanel, AppButton, AppCanvas, AppCard, AppChip, AppComponentPalette, AppConfirmDialog, AppDataTable, AppDialog, AppEmptyState, AppFooter, AppHeader, AppIcon, AppInput, AppJsonView, AppLanguageSelector, AppLoading, AppModal, AppPageContainer, AppPageToolbar, AppPagination, AppProgressBar, AppPropertiesPanel, AppRadio, AppSegmentSelector, AppSelect, AppShortcutsOverlay, AppSidebar, AppSlider, AppSplitView, AppStatsCard, AppSwapButton, AppSwitch, AppTableView, AppTabs, AppTextInput, AppTextarea, AppThemeToggle, AppToast, AppTranslationOutput, ComponentRegistryService, CrudService, DataBindingResolver, EventBusService, GuardService, InvokeWrapperService, SchemaFetcherService, SchemaRendererService, SchemaRouteViewerComponent, SchemaRouterService, StyleResolver, TextComponent, ThemeService, UiShowcaseComponent, components, dataComponents, feedbackComponents, getAllStyleVariants, getCurrentStyle, getStyleClassPrefix, invokeCommand, invokeCommandWithResponse, invokeVoid, invokeWithError, layoutComponents, loadStyleVariant, setCurrentStyle, uiComponents };
//# sourceMappingURL=tauri-front-shared.mjs.map
