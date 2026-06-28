import { __decorate } from 'tslib';
import { LitElement, css, html } from 'lit';
import { property, customElement, state } from 'lit/decorators.js';
import * as i0 from '@angular/core';
import { Injectable, inject, signal, computed, effect, ViewChild, Input, Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { invoke } from '@tauri-apps/api/core';
import * as i1 from '@angular/forms';
import { FormsModule } from '@angular/forms';

let AppButton = class AppButton extends LitElement {
    constructor() {
        super();
        for (const key of ["variant", "size", "disabled", "loading", "icon", "iconPosition", "fullWidth", "type"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                const val = this[key];
                delete this[key];
                this[key] = val;
            }
        }
    }
    connectedCallback() {
        const saved = {};
        for (const key of ["variant", "size", "disabled", "loading", "icon", "iconPosition", "fullWidth", "type"]) {
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

    .app-btn-danger {
      border-color: var(--error);
      background-color: var(--error);
      color: var(--text-on-error);
    }
    .app-btn-danger:hover {
      opacity: 0.9;
    }

    .app-btn-warning {
      border-color: var(--warning);
      background-color: var(--warning);
      color: var(--text-on-warning);
    }
    .app-btn-warning:hover {
      opacity: 0.9;
    }

    .app-btn-success {
      border-color: var(--success);
      background-color: var(--success);
      color: var(--text-on-success);
    }
    .app-btn-success:hover {
      opacity: 0.9;
    }

    .app-btn-ghost {
      border-color: transparent;
      background-color: transparent;
      color: var(--text-secondary);
    }
    .app-btn-ghost:hover {
      background-color: var(--bg-hover);
      color: var(--text-primary);
    }

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
  `;
    _handleClick(e) {
        if (this.disabled || this.loading) {
            e.preventDefault();
            e.stopPropagation();
            return;
        }
        this.dispatchEvent(new CustomEvent("click", { detail: e, bubbles: true, composed: true }));
    }
    render() {
        const classes = [
            "app-btn",
            `app-btn-${this.variant}`,
            `app-btn-${this.size}`,
            this.fullWidth ? "app-btn-full" : "",
            this.disabled || this.loading ? "app-btn-disabled" : "",
        ]
            .filter(Boolean)
            .join(" ");
        return html `
      <button
        type="${this.type}"
        class="${classes}"
        ?disabled="${this.disabled || this.loading}"
        @click="${this._handleClick}"
      >
        ${this.loading
            ? html `<span class="app-btn-spinner"></span>`
            : html `
              ${this.icon && this.iconPosition === "left"
                ? html `<i class="material-icons app-btn-icon">${this.icon}</i>`
                : ""}
              <slot></slot>
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

// Re-export Lit web components from local source files.
// These will be compiled by ng-packagr.

class ComponentRegistryService {
    registry = new Map();
    selectorToId = new Map();
    registerComponents(components) {
        for (const def of components) {
            this.registerComponent(def);
        }
    }
    registerComponent(def) {
        const selector = this.generateSelector(def);
        const registered = {
            def,
            selector,
            inputs: this.extractInputs(def),
            outputs: this.extractOutputs(def),
        };
        this.registry.set(def.id, registered);
        this.selectorToId.set(selector, def.id);
        return registered;
    }
    getComponent(componentId) {
        return this.registry.get(componentId);
    }
    getComponentBySelector(selector) {
        const id = this.selectorToId.get(selector);
        return id ? this.registry.get(id) : undefined;
    }
    hasComponent(componentId) {
        return this.registry.has(componentId);
    }
    getAllComponents() {
        return Array.from(this.registry.values());
    }
    getComponentIds() {
        return Array.from(this.registry.keys());
    }
    clear() {
        this.registry.clear();
        this.selectorToId.clear();
    }
    generateSelector(def) {
        const categoryPrefix = this.getCategoryPrefix(def.category);
        const nameKebab = this.kebabCase(def.name);
        return `${categoryPrefix}-${nameKebab}`;
    }
    getCategoryPrefix(category) {
        const prefixes = {
            ui: "sdui-ui",
            layout: "sdui-layout",
            feedback: "sdui-feedback",
            data: "sdui-data",
            navigation: "sdui-nav",
            media: "sdui-media",
            form: "sdui-form",
            container: "sdui-container",
        };
        return prefixes[category] || "sdui-component";
    }
    kebabCase(str) {
        return str
            .replace(/([a-z])([A-Z])/g, "$1-$2")
            .replace(/[\s_]+/g, "-")
            .toLowerCase();
    }
    extractInputs(def) {
        return Object.keys(def.props).filter((key) => {
            const prop = def.props[key];
            return !prop.required;
        });
    }
    extractOutputs(def) {
        return def.events || [];
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: ComponentRegistryService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: ComponentRegistryService, providedIn: "root" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: ComponentRegistryService, decorators: [{
            type: Injectable,
            args: [{ providedIn: "root" }]
        }] });

class DataBindingResolver {
    context = {
        data: {},
        params: {},
        services: new Map(),
        functions: new Map(),
    };
    bindingPattern = /\{\{([^}]+)\}\}/g;
    contextPattern = /^(data|param|service|fn)\.([^.]+)(?:\.(.+))?$/;
    setContext(context) {
        if (context.data) {
            this.context.data = { ...this.context.data, ...context.data };
        }
        if (context.params) {
            this.context.params = { ...this.context.params, ...context.params };
        }
        if (context.services) {
            context.services.forEach((value, key) => {
                this.context.services.set(key, value);
            });
        }
        if (context.functions) {
            context.functions.forEach((value, key) => {
                this.context.functions.set(key, value);
            });
        }
    }
    resolve(template, context) {
        if (!template)
            return template;
        const ctx = context ? { ...this.context, ...context } : this.context;
        return template.replace(this.bindingPattern, (match, path) => {
            const resolved = this.resolveValue(path.trim(), ctx);
            return resolved !== undefined && resolved !== null ? String(resolved) : match;
        });
    }
    resolveValue(value, context) {
        const ctx = context ? { ...this.context, ...context } : this.context;
        if (typeof value !== "string")
            return value;
        this.bindingPattern.lastIndex = 0;
        if (!this.bindingPattern.test(value))
            return value;
        return this.resolve(value, ctx);
    }
    resolveDataBinding(binding, context) {
        const ctx = context ? { ...this.context, ...context } : this.context;
        const entityData = ctx.data[binding.entity];
        if (!entityData) {
            return undefined;
        }
        if (!binding.field) {
            return entityData;
        }
        return this.getNestedValue(entityData, binding.field);
    }
    bindFunction(name, fn) {
        this.context.functions.set(name, fn);
    }
    getBoundFunction(name) {
        return this.context.functions.get(name);
    }
    hasBinding(template) {
        if (!template)
            return false;
        this.bindingPattern.lastIndex = 0;
        return this.bindingPattern.test(template);
    }
    extractBindingPaths(template) {
        if (!template)
            return [];
        const paths = [];
        const regex = /\{\{([^}]+)\}\}/g;
        let match;
        while ((match = regex.exec(template)) !== null) {
            paths.push(match[1].trim());
        }
        return paths;
    }
    getNestedValue(obj, path) {
        const parts = path.split(".");
        let current = obj;
        for (const part of parts) {
            if (current === null || current === undefined) {
                return undefined;
            }
            if (typeof current === "object") {
                current = current[part];
            }
            else {
                return undefined;
            }
        }
        return current;
    }
    resolveBindingPath(path, ctx) {
        const match = path.match(this.contextPattern);
        if (!match) {
            return this.getNestedValue(ctx.data, path);
        }
        const [, source, name, ...rest] = match;
        switch (source) {
            case "data":
                return this.getNestedValue(ctx.data[name] || {}, rest.join("."));
            case "param":
                return ctx.params[name];
            case "service": {
                const service = ctx.services.get(name);
                if (!service)
                    return undefined;
                return rest.length > 0 ? this.getNestedValue(service, rest.join(".")) : service;
            }
            case "fn": {
                const fn = ctx.functions.get(name);
                if (typeof fn === "function") {
                    return fn();
                }
                return undefined;
            }
            default:
                return this.getNestedValue(ctx.data, path);
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: DataBindingResolver, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: DataBindingResolver, providedIn: "root" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: DataBindingResolver, decorators: [{
            type: Injectable,
            args: [{ providedIn: "root" }]
        }] });

class StyleResolver {
    theme = null;
    colorMode = "system";
    tailwindClassPattern = /^(?:w-|h-|p-|m-|mt-|mb-|ml-|mr-|px-|py-|pt-|pb-|pl-|pr-|gap-|space-|flex|grid|block|inline|hidden|static|relative|absolute|fixed|sticky|inset-|top-|right-|bottom-|left-|z-|text-|bg-|border-|rounded|shadow|opacity|font-|leading-|tracking-|whitespace|overflow|truncate|uppercase|lowercase|capitalize|normal-case|italic|oblique|underline|line-through|no-underline|resize|select|cursor|pointer|not-allowed|animate|transition|transform|rotate|scale|skew|origin|from-|to-|via-|gradient|animate-|duration-|ease-|delay-|repeat|reverse|ping-|pulse-|visible|invisible|opacity-|scale-|rotate-|translate-|skew-|ring-|outline-|appearance-|list-|backdrop-|placeholder-|fill-|stroke-|sr-)/;
    setTheme(theme) {
        this.theme = theme;
    }
    setColorMode(mode) {
        this.colorMode = mode;
    }
    extractStyles(classString) {
        const classes = this.parseClasses(classString);
        const inlineStyles = {};
        const cssVariables = {};
        const tailwindClasses = [];
        const customClasses = [];
        for (const cls of classes) {
            if (this.isTailwindClass(cls)) {
                tailwindClasses.push(cls);
            }
            else if (cls.startsWith("--")) {
                const [varName, value] = this.parseCssVariable(cls);
                cssVariables[varName] = value;
            }
            else {
                customClasses.push(cls);
            }
        }
        if (this.theme) {
            const themeVars = this.resolveCssVariables({}, this.theme);
            Object.assign(cssVariables, themeVars);
        }
        return {
            classes: [...customClasses, ...tailwindClasses],
            inlineStyles,
            cssVariables,
        };
    }
    resolveClasses(baseClasses, overrideClasses, options) {
        const base = this.extractStyles(baseClasses);
        if (!overrideClasses) {
            return base;
        }
        const override = this.extractStyles(overrideClasses);
        const mergedClasses = this.mergeClassLists(base.classes, override.classes);
        const mergedStyles = { ...base.inlineStyles, ...override.inlineStyles };
        const mergedVars = { ...base.cssVariables, ...override.cssVariables };
        return {
            classes: options?.prefix
                ? mergedClasses.map((c) => `${options.prefix}${c}`)
                : mergedClasses,
            inlineStyles: mergedStyles,
            cssVariables: mergedVars,
        };
    }
    resolveCssVariables(css, theme) {
        const resolved = { ...css };
        if (theme) {
            resolved["--theme-name"] = theme.name;
            this.applyThemeColors(resolved, theme.colors);
        }
        return resolved;
    }
    applyStylesToElement(element, resolved) {
        element.className = "";
        if (resolved.classes.length > 0) {
            element.classList.add(...resolved.classes);
        }
        for (const [property, value] of Object.entries(resolved.inlineStyles)) {
            element.style.setProperty(property, value);
        }
        for (const [variable, value] of Object.entries(resolved.cssVariables)) {
            element.style.setProperty(variable, value);
        }
    }
    extractTailwindClasses(classString) {
        const parsed = this.parseClasses(classString);
        return parsed.filter((cls) => this.isTailwindClass(cls));
    }
    buildClassString(classes, prefix) {
        const finalClasses = prefix
            ? classes.map((c) => (c.startsWith(prefix) ? c : `${prefix}${c}`))
            : classes;
        return finalClasses.join(" ");
    }
    parseClasses(classString) {
        if (!classString)
            return [];
        return classString.trim().split(/\s+/).filter(Boolean);
    }
    parseCssVariable(varString) {
        const match = varString.match(/^(--[^:]+):\s*(.+)$/);
        if (match) {
            return [match[1], match[2]];
        }
        return [varString, ""];
    }
    isTailwindClass(className) {
        if (!className)
            return false;
        if (this.tailwindClassPattern.test(className))
            return true;
        if (className.includes(":")) {
            const [base] = className.split(":");
            return this.tailwindClassPattern.test(base);
        }
        return false;
    }
    mergeClassLists(base, override) {
        const result = [...base];
        const overrideSet = new Set(override);
        for (let i = 0; i < result.length; i++) {
            const baseClass = result[i];
            const baseBase = baseClass.split(":")[0];
            const overrideIdx = override.findIndex((oc) => {
                const ocBase = oc.split(":")[0];
                return ocBase === baseBase;
            });
            if (overrideIdx !== -1) {
                result[i] = override[overrideIdx];
                overrideSet.delete(override[overrideIdx]);
            }
        }
        for (const remaining of overrideSet) {
            result.push(remaining);
        }
        return result;
    }
    applyThemeColors(dest, colors) {
        dest["--color-bg-primary"] = colors.bgPrimary;
        dest["--color-bg-secondary"] = colors.bgSecondary;
        dest["--color-bg-tertiary"] = colors.bgTertiary;
        dest["--color-bg-elevated"] = colors.bgElevated;
        dest["--color-bg-hover"] = colors.bgHover;
        dest["--color-text-primary"] = colors.textPrimary;
        dest["--color-text-secondary"] = colors.textSecondary;
        dest["--color-text-muted"] = colors.textMuted;
        dest["--color-border"] = colors.border;
        dest["--color-border-light"] = colors.borderLight;
        dest["--color-primary"] = colors.primary;
        dest["--color-secondary"] = colors.secondary;
        dest["--color-accent"] = colors.accent;
        dest["--color-accent-hover"] = colors.accentHover;
        dest["--color-success"] = colors.success;
        dest["--color-warning"] = colors.warning;
        dest["--color-error"] = colors.error;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: StyleResolver, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: StyleResolver, providedIn: "root" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: StyleResolver, decorators: [{
            type: Injectable,
            args: [{ providedIn: "root" }]
        }] });

class SchemaRendererService {
    componentRegistry = inject(ComponentRegistryService);
    dataBindingResolver = inject(DataBindingResolver);
    styleResolver = inject(StyleResolver);
    _schema = signal(null, ...(ngDevMode ? [{ debugName: "_schema" }] : []));
    _currentPage = signal(null, ...(ngDevMode ? [{ debugName: "_currentPage" }] : []));
    _currentLayout = signal(null, ...(ngDevMode ? [{ debugName: "_currentLayout" }] : []));
    _schemaError = signal(null, ...(ngDevMode ? [{ debugName: "_schemaError" }] : []));
    _isLoading = signal(false, ...(ngDevMode ? [{ debugName: "_isLoading" }] : []));
    _renderContext = signal(null, ...(ngDevMode ? [{ debugName: "_renderContext" }] : []));
    currentPage = this._currentPage.asReadonly();
    schemaError = this._schemaError.asReadonly();
    isLoading = this._isLoading.asReadonly();
    schema = this._schema.asReadonly();
    currentLayout = computed(() => {
        const page = this._currentPage();
        if (!page || !page.layout)
            return null;
        return this._schema()?.layouts.find((l) => l.id === page.layout) ?? null;
    }, ...(ngDevMode ? [{ debugName: "currentLayout" }] : []));
    elementInstances = new Map();
    eventHandlers = new Map();
    setSchema(schema) {
        this._isLoading.set(true);
        this._schemaError.set(null);
        try {
            this.componentRegistry.registerComponents(schema.components);
            this.componentRegistry.registerComponents(schema.sharedComponents);
            this._schema.set(schema);
            this._isLoading.set(false);
        }
        catch (error) {
            this._schemaError.set(error instanceof Error ? error.message : "Failed to set schema");
            this._isLoading.set(false);
        }
    }
    getSchema() {
        return this._schema();
    }
    async render(pageId, container, context) {
        const schema = this._schema();
        if (!schema) {
            throw new Error("No schema loaded");
        }
        const page = schema.pages.find((p) => p.id === pageId);
        if (!page) {
            throw new Error(`Page not found: ${pageId}`);
        }
        this._currentPage.set(page);
        this.updateRenderContext(context);
        container.innerHTML = "";
        this.elementInstances.clear();
        for (const section of Object.values(page.sections)) {
            if (section.visible) {
                await this.renderSection(section, container);
            }
        }
    }
    async renderPage(pageId, container, context) {
        return this.render(pageId, container, context);
    }
    async renderSection(section, container) {
        const page = this._currentPage();
        if (!page)
            return;
        const elements = section.componentId
            ? page.canvasElements.filter((e) => e.id.startsWith(section.componentId || ""))
            : page.canvasElements;
        for (const element of elements) {
            await this.createElement(element, container);
        }
    }
    async createElement(canvasElement, parent, options) {
        const component = this.componentRegistry.getComponent(canvasElement.componentId);
        if (!component) {
            return this.createFallbackElement(canvasElement, parent);
        }
        const element = document.createElement(component.selector);
        this.applyGridPosition(element, canvasElement.gridPosition);
        this.applyClasses(element, canvasElement.classes, component.def);
        await this.applyProps(element, canvasElement, component);
        this.applyDataBinding(element, canvasElement);
        this.applyEvents(element, canvasElement);
        const insertIndex = options?.insertIndex ?? -1;
        if (insertIndex >= 0 && insertIndex < parent.children.length) {
            parent.insertBefore(element, parent.children[insertIndex]);
        }
        else {
            parent.appendChild(element);
        }
        this.elementInstances.set(canvasElement.id, element);
        for (const childId of canvasElement.children) {
            const childElement = this.getCanvasElement(childId);
            if (childElement) {
                await this.createElement(childElement, element);
            }
        }
        return element;
    }
    resolveDataBinding(binding) {
        return this.dataBindingResolver.resolveDataBinding(binding);
    }
    resolveProps(componentId, props) {
        const resolved = {};
        for (const [key, value] of Object.entries(props)) {
            if (typeof value === "string" && this.dataBindingResolver.hasBinding(value)) {
                resolved[key] = this.dataBindingResolver.resolve(value);
            }
            else {
                resolved[key] = value;
            }
        }
        return resolved;
    }
    resolveClasses(baseClasses, overrideClasses) {
        const resolved = this.styleResolver.resolveClasses(baseClasses, overrideClasses);
        return resolved.classes.join(" ");
    }
    extractStylesFromClasses(classString) {
        const resolved = this.styleResolver.extractStyles(classString);
        return resolved.cssVariables;
    }
    updateElement(elementId, updates) {
        const element = this.elementInstances.get(elementId);
        if (!element)
            return;
        if (updates.classes) {
            this.applyClasses(element, updates.classes);
        }
        if (updates.gridPosition) {
            this.applyGridPosition(element, updates.gridPosition);
        }
    }
    destroyElement(elementId) {
        const element = this.elementInstances.get(elementId);
        if (element) {
            element.remove();
            this.elementInstances.delete(elementId);
        }
    }
    clear() {
        for (const element of this.elementInstances.values()) {
            element.remove();
        }
        this.elementInstances.clear();
        this._currentPage.set(null);
        this._currentLayout.set(null);
        this._renderContext.set(null);
    }
    updateRenderContext(partial) {
        const current = this._renderContext() || {
            schema: this._schema(),
            page: null,
            layout: null,
            data: {},
            params: {},
            services: new Map(),
            theme: this.getDefaultTheme(),
            colorMode: "system",
            resolvedElements: new Map(),
            eventHandlers: new Map(),
        };
        this._renderContext.set({
            ...current,
            ...partial,
            page: partial?.page ?? this._currentPage() ?? current.page,
            layout: partial?.layout ?? this.currentLayout() ?? current.layout,
        });
        if (partial?.data || partial?.params) {
            this.dataBindingResolver.setContext({
                data: partial?.data ?? current.data,
                params: partial?.params ?? current.params,
            });
        }
    }
    applyGridPosition(element, position) {
        const style = element.style;
        if (position.colStart !== null) {
            style.gridColumnStart = String(position.colStart);
        }
        else {
            style.gridColumn = `${position.column} / span ${position.colSpan}`;
        }
        if (position.rowStart !== null) {
            style.gridRowStart = String(position.rowStart);
        }
        else {
            style.gridRow = `${position.row} / span ${position.rowSpan}`;
        }
    }
    applyClasses(element, classes, componentDef) {
        const baseClasses = componentDef?.defaultClasses || "";
        const resolved = this.styleResolver.resolveClasses(baseClasses, classes);
        element.classList.add(...resolved.classes);
        for (const [variable, value] of Object.entries(resolved.cssVariables)) {
            element.style.setProperty(variable, value);
        }
    }
    async applyProps(element, canvasElement, component) {
        for (const input of component.inputs) {
            const value = canvasElement[input];
            if (value !== undefined) {
                element[input] = value;
            }
        }
    }
    applyDataBinding(element, canvasElement) {
        if (!canvasElement.dataBinding)
            return;
        const value = this.resolveDataBinding(canvasElement.dataBinding);
        const propName = this.getDataBindingTarget(canvasElement.componentId);
        if (propName && value !== undefined) {
            element[propName] = value;
        }
    }
    applyEvents(element, canvasElement) {
        // Event handling via EventBusService can be added here
    }
    getCanvasElement(id) {
        const page = this._currentPage();
        return page?.canvasElements.find((e) => e.id === id);
    }
    createFallbackElement(canvasElement, parent) {
        const fallback = document.createElement("div");
        fallback.setAttribute("data-sdui-fallback", canvasElement.componentId);
        fallback.setAttribute("data-element-id", canvasElement.id);
        parent.appendChild(fallback);
        return fallback;
    }
    getDataBindingTarget(componentId) {
        const targets = {
            "sdui-input": "value",
            "sdui-select": "value",
            "sdui-checkbox": "checked",
            "sdui-switch": "checked",
            "sdui-slider": "value",
        };
        return targets[componentId] || null;
    }
    getDefaultTheme() {
        return {
            name: "default",
            label: "Default Theme",
            colors: {
                bgPrimary: "#ffffff",
                bgSecondary: "#f3f4f6",
                bgTertiary: "#e5e7eb",
                bgElevated: "#ffffff",
                bgHover: "#f9fafb",
                textPrimary: "#111827",
                textSecondary: "#6b7280",
                textMuted: "#9ca3af",
                border: "#d1d5db",
                borderLight: "#e5e7eb",
                primary: "#3b82f6",
                secondary: "#6366f1",
                accent: "#8b5cf6",
                accentHover: "#7c3aed",
                success: "#10b981",
                warning: "#f59e0b",
                error: "#ef4444",
            },
        };
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: SchemaRendererService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: SchemaRendererService, providedIn: "root" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: SchemaRendererService, decorators: [{
            type: Injectable,
            args: [{ providedIn: "root" }]
        }] });

class SchemaRouterService {
    renderer = inject(SchemaRendererService);
    ngRouter = inject(Router);
    _currentPage = signal(null, ...(ngDevMode ? [{ debugName: "_currentPage" }] : []));
    _currentLayout = signal(null, ...(ngDevMode ? [{ debugName: "_currentLayout" }] : []));
    _currentRoute = signal(null, ...(ngDevMode ? [{ debugName: "_currentRoute" }] : []));
    _routeParams = signal({}, ...(ngDevMode ? [{ debugName: "_routeParams" }] : []));
    currentPage = this._currentPage.asReadonly();
    currentLayout = this._currentLayout.asReadonly();
    currentRoute = this._currentRoute.asReadonly();
    routeParams = this._routeParams.asReadonly();
    schema = null;
    routeRegistry = new Map();
    currentPageSignal = computed(() => this._currentPage(), ...(ngDevMode ? [{ debugName: "currentPageSignal" }] : []));
    currentLayoutSignal = computed(() => this._currentLayout(), ...(ngDevMode ? [{ debugName: "currentLayoutSignal" }] : []));
    setSchema(schema) {
        this.schema = schema;
        this.renderer.setSchema(schema);
        this.buildRouteRegistry();
    }
    async loadSchema(mode, source) {
        switch (mode) {
            case "embedded":
                break;
            case "file":
                break;
            case "cloud":
                break;
        }
    }
    async navigate(route, params) {
        const match = this.resolveRoute(route, params);
        if (!match) {
            return false;
        }
        if (match.page.layout) {
            const layout = this.schema?.layouts.find((l) => l.id === match.page.layout);
            this._currentLayout.set(layout ?? null);
        }
        this._currentPage.set(match.page);
        this._currentRoute.set(route);
        this._routeParams.set(params || {});
        return true;
    }
    setCurrentPage(page) {
        this._currentPage.set(page);
    }
    setCurrentRoute(route) {
        this._currentRoute.set(route);
    }
    getPage(pageId) {
        return this.schema?.pages.find((p) => p.id === pageId);
    }
    getPageByRoute(route) {
        return this.routeRegistry.get(route);
    }
    resolveRoute(route, params) {
        const page = this.routeRegistry.get(route);
        if (!page) {
            return null;
        }
        return {
            page,
            params: params || {},
            guards: [],
        };
    }
    getAllRoutes() {
        return Array.from(this.routeRegistry.entries()).map(([route, page]) => ({
            route,
            page,
        }));
    }
    buildRouteRegistry() {
        if (!this.schema)
            return;
        this.routeRegistry.clear();
        for (const page of this.schema.pages) {
            if (page.route) {
                this.routeRegistry.set(page.route, page);
            }
        }
    }
    updateRouteParam(key, value) {
        this._routeParams.update((params) => ({
            ...params,
            [key]: value,
        }));
    }
    clearRouteParams() {
        this._routeParams.set({});
    }
    generateRoute(pageId, params) {
        const page = this.getPage(pageId);
        if (!page?.route)
            return null;
        if (!params)
            return page.route;
        let route = page.route;
        for (const [key, value] of Object.entries(params)) {
            route = route.replace(`:${key}`, value);
        }
        return route;
    }
    matchRoute(path) {
        if (!this.schema)
            return null;
        for (const page of this.schema.pages) {
            if (!page.route)
                continue;
            const pattern = this.routeToRegex(page.route);
            const match = path.match(pattern);
            if (match) {
                const params = {};
                const paramNames = this.extractParamNames(page.route);
                for (let i = 0; i < paramNames.length; i++) {
                    params[paramNames[i]] = match[i + 1];
                }
                return {
                    page,
                    params,
                    guards: [],
                };
            }
        }
        return null;
    }
    routeToRegex(route) {
        const escaped = route.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const pattern = escaped.replace(/:([^/]+)/g, "([^/]+)");
        return new RegExp(`^${pattern}$`);
    }
    extractParamNames(route) {
        const matches = route.match(/:([^/]+)/g);
        return matches ? matches.map((m) => m.slice(1)) : [];
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: SchemaRouterService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: SchemaRouterService, providedIn: "root" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: SchemaRouterService, decorators: [{
            type: Injectable,
            args: [{ providedIn: "root" }]
        }] });

class GuardService {
    ngRouter = inject(Router);
    guardRegistry = new Map();
    guardFunctions = new Map();
    registerGuard(name, definition) {
        this.guardRegistry.set(name, definition);
    }
    registerGuardFunction(name, fn) {
        this.guardFunctions.set(name, fn);
    }
    async evaluateGuard(guardName) {
        const guardFn = this.guardFunctions.get(guardName);
        if (guardFn) {
            try {
                const passed = guardFn();
                return { guardName, passed };
            }
            catch (error) {
                return {
                    guardName,
                    passed: false,
                    error: error instanceof Error ? error.message : "Guard evaluation failed",
                };
            }
        }
        const guardDef = this.guardRegistry.get(guardName);
        if (!guardDef) {
            return { guardName, passed: true };
        }
        const passed = this.evaluateCondition(guardDef.condition);
        return {
            guardName,
            passed,
            redirectTo: passed ? undefined : guardDef.redirectTo,
        };
    }
    async evaluateGuards(match) {
        const results = [];
        for (const guard of match.guards) {
            const result = await this.evaluateGuard(guard.guardName);
            results.push(result);
        }
        return results;
    }
    canActivateGuard(match) {
        for (const guard of match.guards) {
            const guardDef = this.guardRegistry.get(guard.guardName);
            if (!guardDef)
                continue;
            const result = this.evaluateCondition(guardDef.condition);
            if (!result && guard.redirectTo) {
                return guard.redirectTo;
            }
        }
        return true;
    }
    createGuardFunction(guardName) {
        return async () => {
            const result = await this.evaluateGuard(guardName);
            if (result.passed) {
                return true;
            }
            if (result.redirectTo) {
                await this.ngRouter.navigateByUrl(result.redirectTo);
                return false;
            }
            return this.ngRouter.createUrlTree(["/unauthorized"]);
        };
    }
    evaluateCondition(condition) {
        try {
            const fn = new Function(`return ${condition}`);
            return Boolean(fn());
        }
        catch {
            return false;
        }
    }
    hasGuard(guardName) {
        return this.guardRegistry.has(guardName) || this.guardFunctions.has(guardName);
    }
    clearGuards() {
        this.guardRegistry.clear();
        this.guardFunctions.clear();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: GuardService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: GuardService, providedIn: "root" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: GuardService, decorators: [{
            type: Injectable,
            args: [{ providedIn: "root" }]
        }] });

class SchemaRouteViewerComponent {
    route = "";
    containerRef;
    router = inject(SchemaRouterService);
    renderer = inject(SchemaRendererService);
    isLoading = signal(false, ...(ngDevMode ? [{ debugName: "isLoading" }] : []));
    error = signal(null, ...(ngDevMode ? [{ debugName: "error" }] : []));
    isInitialized = false;
    constructor() {
        effect(() => {
            const currentRoute = this.router.currentRoute();
            if (currentRoute && this.isInitialized) {
                this.renderCurrentRoute();
            }
        });
    }
    ngAfterViewInit() {
        this.isInitialized = true;
        if (this.route) {
            this.loadRoute(this.route);
        }
        else {
            this.renderCurrentRoute();
        }
    }
    ngOnDestroy() {
        this.renderer.clear();
    }
    async loadRoute(route) {
        this.isLoading.set(true);
        this.error.set(null);
        try {
            await this.router.navigate(route);
            await this.renderCurrentRoute();
        }
        catch (err) {
            this.error.set(err instanceof Error ? err.message : "Failed to load route");
        }
        finally {
            this.isLoading.set(false);
        }
    }
    async renderCurrentRoute() {
        const page = this.router.currentPage();
        const container = this.containerRef?.nativeElement;
        if (!page || !container) {
            return;
        }
        try {
            await this.renderer.renderPage(page.id, container);
        }
        catch (err) {
            this.error.set(err instanceof Error ? err.message : "Failed to render page");
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: SchemaRouteViewerComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.25", type: SchemaRouteViewerComponent, isStandalone: true, selector: "lib-schema-route-viewer", inputs: { route: "route" }, viewQueries: [{ propertyName: "containerRef", first: true, predicate: ["container"], descendants: true }], ngImport: i0, template: `
    <div #container class="schema-route-viewer">
      @if (isLoading()) {
        <div class="schema-loading">
          <span>Loading...</span>
        </div>
      }
      @if (error()) {
        <div class="schema-error">
          {{ error() }}
        </div>
      }
    </div>
  `, isInline: true, styles: [":host{display:block;width:100%;height:100%}.schema-route-viewer{width:100%;height:100%;position:relative}.schema-loading,.schema-error{display:flex;align-items:center;justify-content:center;width:100%;height:100%}.schema-error{color:var(--color-error, #ef4444)}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: SchemaRouteViewerComponent, decorators: [{
            type: Component,
            args: [{ selector: "lib-schema-route-viewer", standalone: true, imports: [CommonModule], template: `
    <div #container class="schema-route-viewer">
      @if (isLoading()) {
        <div class="schema-loading">
          <span>Loading...</span>
        </div>
      }
      @if (error()) {
        <div class="schema-error">
          {{ error() }}
        </div>
      }
    </div>
  `, styles: [":host{display:block;width:100%;height:100%}.schema-route-viewer{width:100%;height:100%;position:relative}.schema-loading,.schema-error{display:flex;align-items:center;justify-content:center;width:100%;height:100%}.schema-error{color:var(--color-error, #ef4444)}\n"] }]
        }], ctorParameters: () => [], propDecorators: { route: [{
                type: Input
            }], containerRef: [{
                type: ViewChild,
                args: ["container"]
            }] } });

class SchemaFetcherService {
    currentSchema = null;
    currentOptions = null;
    watchCallback = null;
    async loadSchema(options) {
        switch (options.mode) {
            case "embedded":
                return this.loadEmbeddedSchema(options.source);
            case "file":
                return this.loadFileSchema(options.source);
            case "cloud":
                return this.loadCloudSchema(options.source);
        }
    }
    async reloadSchema() {
        if (!this.currentOptions) {
            return null;
        }
        const schema = await this.loadSchema(this.currentOptions);
        if (this.watchCallback) {
            this.watchCallback({
                schema,
                timestamp: Date.now(),
            });
        }
        return schema;
    }
    watchSchemaChanges(callback) {
        this.watchCallback = callback;
        return () => {
            this.watchCallback = null;
        };
    }
    getCurrentSchema() {
        return this.currentSchema;
    }
    async loadEmbeddedSchema(source) {
        try {
            const response = await fetch(source);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            const schema = await response.json();
            this.currentSchema = schema;
            this.currentOptions = { mode: "embedded", source };
            return schema;
        }
        catch (error) {
            throw new Error(`Failed to load embedded schema from ${source}: ${error}`);
        }
    }
    async loadFileSchema(filePath) {
        try {
            const response = await fetch(filePath);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            const schema = await response.json();
            this.validateSchema(schema);
            this.currentSchema = schema;
            this.currentOptions = { mode: "file", source: filePath };
            return schema;
        }
        catch (error) {
            throw new Error(`Failed to load schema from file ${filePath}: ${error}`);
        }
    }
    async loadCloudSchema(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            const schema = await response.json();
            this.validateSchema(schema);
            this.currentSchema = schema;
            this.currentOptions = { mode: "cloud", source: url };
            return schema;
        }
        catch (error) {
            throw new Error(`Failed to load schema from cloud ${url}: ${error}`);
        }
    }
    validateSchema(schema) {
        if (!schema || typeof schema !== "object") {
            throw new Error("Schema must be an object");
        }
        const s = schema;
        if (!s.pages || !Array.isArray(s.pages)) {
            throw new Error("Schema must have a pages array");
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: SchemaFetcherService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: SchemaFetcherService, providedIn: "root" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: SchemaFetcherService, decorators: [{
            type: Injectable,
            args: [{ providedIn: "root" }]
        }] });

class ThemeService {
    _currentTheme = signal(null, ...(ngDevMode ? [{ debugName: "_currentTheme" }] : []));
    _colorMode = signal("system", ...(ngDevMode ? [{ debugName: "_colorMode" }] : []));
    _systemPrefersDark = signal(this.getSystemPrefersDark(), ...(ngDevMode ? [{ debugName: "_systemPrefersDark" }] : []));
    _overrides = signal({}, ...(ngDevMode ? [{ debugName: "_overrides" }] : []));
    currentTheme = this._currentTheme.asReadonly();
    colorMode = this._colorMode.asReadonly();
    effectiveColorMode = computed(() => {
        const mode = this._colorMode();
        if (mode === "system") {
            return this._systemPrefersDark() ? "dark" : "light";
        }
        return mode;
    }, ...(ngDevMode ? [{ debugName: "effectiveColorMode" }] : []));
    effectiveTheme = computed(() => {
        const theme = this._currentTheme();
        const overrides = this._overrides();
        if (!theme) {
            return this.getDefaultTheme();
        }
        if (!overrides.colors && !overrides.cssVariables) {
            return theme;
        }
        return {
            ...theme,
            colors: overrides.colors
                ? { ...theme.colors, ...overrides.colors }
                : theme.colors,
        };
    }, ...(ngDevMode ? [{ debugName: "effectiveTheme" }] : []));
    constructor() {
        this.initSystemPrefersDarkListener();
    }
    getTheme() {
        return this._currentTheme();
    }
    setTheme(theme) {
        this._currentTheme.set(theme);
        this.applyTheme(theme);
    }
    applyTheme(theme) {
        this._currentTheme.set(theme);
        if (typeof document !== "undefined") {
            document.documentElement.setAttribute("data-theme", theme.name);
            this.applyThemeColors(theme.colors);
            this.applyCssVariables(this._overrides().cssVariables || {});
        }
    }
    setColorMode(mode) {
        this._colorMode.set(mode);
        if (typeof localStorage !== "undefined") {
            localStorage.setItem("sdui-color-mode", mode);
        }
        this.applyColorMode(mode);
    }
    toggleColorMode() {
        const current = this.effectiveColorMode();
        const next = current === "light" ? "dark" : "light";
        this.setColorMode(next);
    }
    overrideColors(colors) {
        this._overrides.update((o) => ({
            ...o,
            colors: { ...o.colors, ...colors },
        }));
        const theme = this._currentTheme();
        if (theme) {
            this.applyTheme({
                ...theme,
                colors: { ...theme.colors, ...colors },
            });
        }
    }
    setCssVariables(variables) {
        this._overrides.update((o) => ({
            ...o,
            cssVariables: { ...o.cssVariables, ...variables },
        }));
        if (typeof document !== "undefined") {
            this.applyCssVariables(variables);
        }
    }
    clearOverrides() {
        this._overrides.set({});
        const theme = this._currentTheme();
        if (theme) {
            this.applyTheme(theme);
        }
    }
    initSystemPrefersDarkListener() {
        if (typeof window === "undefined")
            return;
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const handler = (e) => {
            this._systemPrefersDark.set(e.matches);
        };
        mediaQuery.addEventListener("change", handler);
    }
    getSystemPrefersDark() {
        if (typeof window === "undefined")
            return false;
        return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    applyThemeColors(colors) {
        if (typeof document === "undefined")
            return;
        const root = document.documentElement;
        root.style.setProperty("--color-bg-primary", colors.bgPrimary);
        root.style.setProperty("--color-bg-secondary", colors.bgSecondary);
        root.style.setProperty("--color-bg-tertiary", colors.bgTertiary);
        root.style.setProperty("--color-bg-elevated", colors.bgElevated);
        root.style.setProperty("--color-bg-hover", colors.bgHover);
        root.style.setProperty("--color-text-primary", colors.textPrimary);
        root.style.setProperty("--color-text-secondary", colors.textSecondary);
        root.style.setProperty("--color-text-muted", colors.textMuted);
        root.style.setProperty("--color-border", colors.border);
        root.style.setProperty("--color-border-light", colors.borderLight);
        root.style.setProperty("--color-primary", colors.primary);
        root.style.setProperty("--color-secondary", colors.secondary);
        root.style.setProperty("--color-accent", colors.accent);
        root.style.setProperty("--color-accent-hover", colors.accentHover);
        root.style.setProperty("--color-success", colors.success);
        root.style.setProperty("--color-warning", colors.warning);
        root.style.setProperty("--color-error", colors.error);
    }
    applyCssVariables(variables) {
        if (typeof document === "undefined")
            return;
        const root = document.documentElement;
        for (const [key, value] of Object.entries(variables)) {
            root.style.setProperty(key, value);
        }
    }
    applyColorMode(mode) {
        if (typeof document === "undefined")
            return;
        const effective = mode === "system"
            ? (this._systemPrefersDark() ? "dark" : "light")
            : mode;
        document.documentElement.setAttribute("data-color-mode", effective);
    }
    getDefaultTheme() {
        return {
            name: "default",
            label: "Default Theme",
            colors: {
                bgPrimary: "#ffffff",
                bgSecondary: "#f3f4f6",
                bgTertiary: "#e5e7eb",
                bgElevated: "#ffffff",
                bgHover: "#f9fafb",
                textPrimary: "#111827",
                textSecondary: "#6b7280",
                textMuted: "#9ca3af",
                border: "#d1d5db",
                borderLight: "#e5e7eb",
                primary: "#3b82f6",
                secondary: "#6366f1",
                accent: "#8b5cf6",
                accentHover: "#7c3aed",
                success: "#10b981",
                warning: "#f59e0b",
                error: "#ef4444",
            },
        };
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: ThemeService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: ThemeService, providedIn: "root" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: ThemeService, decorators: [{
            type: Injectable,
            args: [{ providedIn: "root" }]
        }], ctorParameters: () => [] });

class EventBusService {
    handlers = new Map();
    eventHistory = signal([], ...(ngDevMode ? [{ debugName: "eventHistory" }] : []));
    maxHistorySize = 100;
    emit(event, payload, source) {
        const message = {
            type: event,
            payload: payload,
            metadata: {
                timestamp: Date.now(),
                source,
            },
        };
        this.addToHistory(message);
        const eventHandlers = this.handlers.get(event);
        if (eventHandlers) {
            for (const handler of eventHandlers) {
                try {
                    handler(payload);
                }
                catch (error) {
                    console.error(`Error in event handler for '${event}':`, error);
                }
            }
        }
    }
    on(event, handler) {
        if (!this.handlers.has(event)) {
            this.handlers.set(event, new Set());
        }
        this.handlers.get(event).add(handler);
        return {
            unsubscribe: () => {
                this.off(event, handler);
            },
        };
    }
    once(event, handler) {
        const wrapped = (payload) => {
            handler(payload);
            this.off(event, wrapped);
        };
        return this.on(event, wrapped);
    }
    off(event, handler) {
        const eventHandlers = this.handlers.get(event);
        if (eventHandlers) {
            eventHandlers.delete(handler);
            if (eventHandlers.size === 0) {
                this.handlers.delete(event);
            }
        }
    }
    clear(event) {
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
        const handlers = this.handlers.get(event);
        return handlers?.size ?? 0;
    }
    getEventHistory(event) {
        const history = this.eventHistory();
        if (event) {
            return history.filter((m) => m.type === event);
        }
        return [...history];
    }
    clearHistory() {
        this.eventHistory.set([]);
    }
    createEventNamespace(namespace) {
        return new NamespacedEventBus(this, namespace);
    }
    addToHistory(message) {
        this.eventHistory.update((history) => {
            const updated = [...history, message];
            if (updated.length > this.maxHistorySize) {
                return updated.slice(-this.maxHistorySize);
            }
            return updated;
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: EventBusService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: EventBusService, providedIn: "root" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: EventBusService, decorators: [{
            type: Injectable,
            args: [{ providedIn: "root" }]
        }] });
class NamespacedEventBus {
    parent;
    namespace;
    constructor(parent, namespace) {
        this.parent = parent;
        this.namespace = namespace;
    }
    emit(event, payload) {
        this.parent.emit(`${this.namespace}:${event}`, payload, this.namespace);
    }
    on(event, handler) {
        return this.parent.on(`${this.namespace}:${event}`, handler);
    }
    once(event, handler) {
        return this.parent.once(`${this.namespace}:${event}`, handler);
    }
    off(event, handler) {
        this.parent.off(`${this.namespace}:${event}`, handler);
    }
}

class RbacService {
    _currentUser = signal(null, ...(ngDevMode ? [{ debugName: "_currentUser" }] : []));
    _roles = signal([], ...(ngDevMode ? [{ debugName: "_roles" }] : []));
    currentUser = this._currentUser.asReadonly();
    roles = this._roles.asReadonly();
    setUser(user) {
        this._currentUser.set(user);
    }
    setRoles(roles) {
        this._roles.set(roles);
    }
    hasPermission(permission) {
        const user = this._currentUser();
        if (!user)
            return false;
        const roles = this._roles();
        for (const roleName of user.roles) {
            const role = roles.find((r) => r.id === roleName || r.name === roleName);
            if (role?.permissions.includes(permission)) {
                return true;
            }
        }
        return false;
    }
    hasRole(roleId) {
        const user = this._currentUser();
        if (!user)
            return false;
        return user.roles.includes(roleId);
    }
    isAuthenticated() {
        return this._currentUser() !== null;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: RbacService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: RbacService, providedIn: "root" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: RbacService, decorators: [{
            type: Injectable,
            args: [{ providedIn: "root" }]
        }] });

class PermissionEvaluator {
    rules = [];
    addRule(rule) {
        this.rules.push(rule);
    }
    evaluate(resource, action, context) {
        const matchingRules = this.rules.filter((r) => r.resource === resource && r.action === action);
        for (const rule of matchingRules) {
            if (rule.conditions && context) {
                const conditionsMet = this.evaluateConditions(rule.conditions, context);
                if (conditionsMet) {
                    return rule.effect === "allow";
                }
            }
            else if (!rule.conditions) {
                return rule.effect === "allow";
            }
        }
        return false;
    }
    clear() {
        this.rules = [];
    }
    evaluateConditions(conditions, context) {
        for (const [key, expected] of Object.entries(conditions)) {
            if (context[key] !== expected) {
                return false;
            }
        }
        return true;
    }
}

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
            schemaVersion: "1.0.0",
            app: {
                id: "fallback",
                name: "Fallback",
                version: "1.0.0",
                description: errorMessage || "Fallback schema",
                identifier: "com.fallback.app",
                settings: {
                    defaultLocale: "en",
                    supportedLocales: ["en"],
                    tailwindPreset: "default",
                    theme: "default",
                    themes: [],
                    colorMode: "system",
                },
            },
            pages: [
                {
                    id: "error-page",
                    name: "Error",
                    route: "/error",
                    layout: null,
                    meta: { title: "Error", icon: null, breadcrumb: [] },
                    sections: {},
                    canvasElements: [],
                },
            ],
            layouts: [],
            components: [],
            sharedComponents: [],
            services: [],
            modules: [],
            i18N: { locales: {} },
        };
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: FallbackService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: FallbackService, providedIn: "root" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: FallbackService, decorators: [{
            type: Injectable,
            args: [{ providedIn: "root" }]
        }] });

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

class SignalStoreService {
    store = createSignalStore();
    set(key, value) {
        this.store.set(key, value);
    }
    get(key) {
        return this.store.get(key);
    }
    update(key, fn) {
        this.store.update(key, fn);
    }
    delete(key) {
        this.store.delete(key);
    }
    keys() {
        return this.store.keys();
    }
    toJSON() {
        return this.store.toJSON();
    }
    fromJSON(json) {
        this.store.fromJSON(json);
    }
    subscribe(callback) {
        return this.store.subscribe(callback);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: SignalStoreService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: SignalStoreService, providedIn: "root" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: SignalStoreService, decorators: [{
            type: Injectable,
            args: [{ providedIn: "root" }]
        }] });

class LoggerService {
    _logs = [];
    get logs() {
        return this._logs;
    }
    log(level, message, context) {
        const entry = {
            timestamp: new Date(),
            level,
            message,
            context,
        };
        this._logs.push(entry);
        this.writeToConsole(entry);
    }
    debug(message, context) {
        this.log("debug", message, context);
    }
    info(message, context) {
        this.log("info", message, context);
    }
    warn(message, context) {
        this.log("warn", message, context);
    }
    error(message, context) {
        this.log("error", message, context);
    }
    getFilteredLogs(level) {
        if (!level)
            return [...this._logs];
        return this._logs.filter((log) => log.level === level);
    }
    exportLogs() {
        return JSON.stringify(this._logs, null, 2);
    }
    clear() {
        this._logs = [];
    }
    writeToConsole(entry) {
        const prefix = `[${entry.timestamp.toISOString()}] [${entry.level.toUpperCase()}]`;
        const contextStr = entry.context ? ` [${entry.context}]` : "";
        const fullMessage = `${prefix}${contextStr} ${entry.message}`;
        switch (entry.level) {
            case "debug":
                console.debug(fullMessage);
                break;
            case "info":
                console.info(fullMessage);
                break;
            case "warn":
                console.warn(fullMessage);
                break;
            case "error":
                console.error(fullMessage);
                break;
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: LoggerService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: LoggerService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: LoggerService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });

class SignalLoggerService {
    logger = new LoggerService();
    debug(message, context) {
        this.logger.log("debug", message, context);
    }
    info(message, context) {
        this.logger.log("info", message, context);
    }
    warn(message, context) {
        this.logger.log("warn", message, context);
    }
    error(message, context) {
        this.logger.log("error", message, context);
    }
    getLogs() {
        return this.logger.logs;
    }
    clear() {
        this.logger.clear();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: SignalLoggerService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: SignalLoggerService, providedIn: "root" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: SignalLoggerService, decorators: [{
            type: Injectable,
            args: [{ providedIn: "root" }]
        }] });

class SignalSyncService {
    _state = signal({
        lastSyncAt: null,
        isSyncing: false,
        error: null,
    }, ...(ngDevMode ? [{ debugName: "_state" }] : []));
    state = this._state.asReadonly();
    async sync(fn) {
        this._state.update((s) => ({ ...s, isSyncing: true, error: null }));
        try {
            const result = await fn();
            this._state.update((s) => ({
                ...s,
                isSyncing: false,
                lastSyncAt: Date.now(),
            }));
            return result;
        }
        catch (error) {
            this._state.update((s) => ({
                ...s,
                isSyncing: false,
                error: error instanceof Error ? error.message : "Sync failed",
            }));
            throw error;
        }
    }
    clearError() {
        this._state.update((s) => ({ ...s, error: null }));
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: SignalSyncService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: SignalSyncService, providedIn: "root" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: SignalSyncService, decorators: [{
            type: Injectable,
            args: [{ providedIn: "root" }]
        }] });

class ComponentDiscoveryService {
    discovered = new Map();
    discover(components) {
        const results = [];
        for (const def of components) {
            const selector = this.generateSelector(def);
            const discovered = {
                def,
                selector,
                registered: customElements.get(selector) !== undefined,
            };
            this.discovered.set(def.id, discovered);
            results.push(discovered);
        }
        return results;
    }
    getDiscovered(componentId) {
        return this.discovered.get(componentId);
    }
    getAllDiscovered() {
        return Array.from(this.discovered.values());
    }
    getRegisteredComponents() {
        return Array.from(this.discovered.values()).filter((d) => d.registered);
    }
    getUnregisteredComponents() {
        return Array.from(this.discovered.values()).filter((d) => !d.registered);
    }
    generateSelector(def) {
        const nameKebab = def.name
            .replace(/([a-z])([A-Z])/g, "$1-$2")
            .replace(/[\s_]+/g, "-")
            .toLowerCase();
        return `sdui-${nameKebab}`;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: ComponentDiscoveryService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: ComponentDiscoveryService, providedIn: "root" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: ComponentDiscoveryService, decorators: [{
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
    currentColorMode = signal(this.themeService.effectiveColorMode(), ...(ngDevMode ? [{ debugName: "currentColorMode" }] : []));
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
        this.themeService.setColorMode(mode);
        this.currentColorMode.set(this.themeService.effectiveColorMode());
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
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.25", type: UiShowcaseComponent, isStandalone: true, selector: "app-ui-showcase", ngImport: i0, template: "<div class=\"showcase-container\">\n  <header class=\"showcase-header\">\n    <h1 class=\"showcase-title\">UI Showcase</h1>\n\n    <div class=\"showcase-controls\">\n      <div class=\"control-group\">\n        <span class=\"control-label\">Color Mode</span>\n        <div class=\"button-group\">\n          @for (mode of colorModes; track mode) {\n            <button\n              class=\"mode-btn\"\n              [class.active]=\"currentColorMode() === mode\"\n              (click)=\"setColorMode(mode)\"\n            >\n              {{ mode }}\n            </button>\n          }\n        </div>\n      </div>\n\n      <div class=\"control-group\">\n        <span class=\"control-label\">Style</span>\n        <select\n          class=\"style-select\"\n          [value]=\"currentStyleVariant()\"\n          (change)=\"setStyleVariant($any($event.target).value)\"\n        >\n          @for (v of styleVariants; track v.id) {\n            <option [value]=\"v.id\">{{ v.name }}</option>\n          }\n        </select>\n      </div>\n    </div>\n  </header>\n\n  <div class=\"showcase-filters\">\n    <input\n      type=\"text\"\n      class=\"search-input\"\n      placeholder=\"Search components...\"\n      [value]=\"searchQuery()\"\n      (input)=\"searchQuery.set($any($event.target).value)\"\n    />\n\n    <div class=\"category-tabs\">\n      @for (cat of categories(); track cat) {\n        <button\n          class=\"category-tab\"\n          [class.active]=\"selectedCategory() === cat\"\n          (click)=\"selectedCategory.set(cat)\"\n        >\n          {{ cat }}\n        </button>\n      }\n    </div>\n  </div>\n\n  <div class=\"component-grid\">\n    @for (comp of filteredComponents(); track comp.id) {\n      <div class=\"component-card\">\n        <div class=\"card-header\">\n          <span class=\"component-name\">{{ comp.name }}</span>\n          <code class=\"component-selector\">{{ comp.selector }}</code>\n        </div>\n\n        <div\n          class=\"component-preview\"\n          #card\n          [attr.data-selector]=\"comp.selector\"\n          (mouseenter)=\"renderComponent($any($event.target).closest('.component-card'), comp)\"\n        ></div>\n\n        <div class=\"card-footer\">\n          <span class=\"category-badge\">{{ comp.category }}</span>\n          <span class=\"package-badge\">{{ comp.packageType }}</span>\n        </div>\n      </div>\n    }\n  </div>\n</div>", styles: [".showcase-container{min-height:100vh;background-color:var(--color-bg-primary, #f8fafc);color:var(--color-text-primary, #1e293b)}.showcase-header{display:flex;align-items:center;justify-content:space-between;padding:1.5rem 2rem;background-color:var(--color-bg-elevated, #ffffff);border-bottom:1px solid var(--color-border, #e2e8f0);position:sticky;top:0;z-index:10;gap:2rem;flex-wrap:wrap}.showcase-title{margin:0;font-size:1.5rem;font-weight:700;color:var(--color-text-primary, #1e293b)}.showcase-controls{display:flex;align-items:center;gap:2rem;flex-wrap:wrap}.control-group{display:flex;align-items:center;gap:.75rem}.control-label{font-size:.875rem;font-weight:500;color:var(--color-text-secondary, #64748b)}.button-group{display:flex;border:1px solid var(--color-border, #e2e8f0);border-radius:.5rem;overflow:hidden}.mode-btn{padding:.5rem 1rem;border:none;background-color:var(--color-bg-elevated, #ffffff);color:var(--color-text-secondary, #64748b);font-size:.875rem;font-weight:500;cursor:pointer;transition:all .15s;text-transform:capitalize}.mode-btn:not(:last-child){border-right:1px solid var(--color-border, #e2e8f0)}.mode-btn:hover{background-color:var(--color-bg-hover, #f1f5f9)}.mode-btn.active{background-color:var(--color-accent, #8b5cf6);color:var(--color-text-on-accent, #ffffff)}.style-select{padding:.5rem 1rem;border:1px solid var(--color-border, #e2e8f0);border-radius:.5rem;background-color:var(--color-bg-elevated, #ffffff);color:var(--color-text-primary, #1e293b);font-size:.875rem;font-weight:500;cursor:pointer;min-width:160px}.style-select:focus{outline:none;border-color:var(--color-accent, #8b5cf6)}.showcase-filters{padding:1.5rem 2rem;display:flex;flex-direction:column;gap:1rem;background-color:var(--color-bg-secondary, #f1f5f9);border-bottom:1px solid var(--color-border, #e2e8f0)}.search-input{padding:.75rem 1rem;border:1px solid var(--color-border, #e2e8f0);border-radius:.5rem;background-color:var(--color-bg-elevated, #ffffff);color:var(--color-text-primary, #1e293b);font-size:.9375rem;max-width:400px}.search-input::placeholder{color:var(--color-text-muted, #94a3b8)}.search-input:focus{outline:none;border-color:var(--color-accent, #8b5cf6)}.category-tabs{display:flex;gap:.5rem;flex-wrap:wrap}.category-tab{padding:.5rem 1rem;border:1px solid var(--color-border, #e2e8f0);border-radius:2rem;background-color:var(--color-bg-elevated, #ffffff);color:var(--color-text-secondary, #64748b);font-size:.875rem;font-weight:500;cursor:pointer;transition:all .15s;text-transform:capitalize}.category-tab:hover{background-color:var(--color-bg-hover, #f1f5f9)}.category-tab.active{background-color:var(--color-accent, #8b5cf6);border-color:var(--color-accent, #8b5cf6);color:var(--color-text-on-accent, #ffffff)}.component-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:1.5rem;padding:2rem}.component-card{background-color:var(--color-bg-elevated, #ffffff);border:1px solid var(--color-border, #e2e8f0);border-radius:.75rem;overflow:hidden;display:flex;flex-direction:column;transition:box-shadow .15s}.component-card:hover{box-shadow:0 4px 12px #0000001a}.card-header{display:flex;align-items:center;justify-content:space-between;padding:1rem;border-bottom:1px solid var(--color-border-light, #f1f5f9);gap:.5rem}.component-name{font-size:1rem;font-weight:600;color:var(--color-text-primary, #1e293b)}.component-selector{font-size:.75rem;padding:.25rem .5rem;background-color:var(--color-bg-secondary, #f1f5f9);border-radius:.25rem;color:var(--color-text-secondary, #64748b);font-family:monospace}.component-preview{padding:2rem 1rem;min-height:100px;display:flex;align-items:center;justify-content:center;background-color:var(--color-bg-primary, #f8fafc);flex-wrap:wrap;gap:.5rem}.card-footer{display:flex;align-items:center;gap:.5rem;padding:.75rem 1rem;border-top:1px solid var(--color-border-light, #f1f5f9)}.category-badge,.package-badge{font-size:.75rem;padding:.25rem .5rem;border-radius:.25rem;font-weight:500;text-transform:capitalize}.category-badge{background-color:var(--color-bg-secondary, #f1f5f9);color:var(--color-text-secondary, #64748b)}.package-badge{background-color:var(--color-accent, #8b5cf6);color:var(--color-text-on-accent, #ffffff);opacity:.8}@media(max-width:768px){.showcase-header{flex-direction:column;align-items:flex-start}.component-grid{grid-template-columns:1fr;padding:1rem}}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i1.NgSelectOption, selector: "option", inputs: ["ngValue", "value"] }, { kind: "directive", type: i1.ɵNgSelectMultipleOption, selector: "option", inputs: ["ngValue", "value"] }] });
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

export { AppAvatar, AppBadge, AppBottomPanel, AppButton, AppCanvas, AppCard, AppChip, AppComponentPalette, AppConfirmDialog, AppDataTable, AppDialog, AppEmptyState, AppFooter, AppHeader, AppInput, AppJsonView, AppLoading, AppModal, AppPageContainer, AppPageToolbar, AppPagination, AppProgressBar, AppPropertiesPanel, AppRadio, AppSegmentSelector, AppSelect, AppSidebar, AppSlider, AppSplitView, AppStatsCard, AppSwitch, AppTableView, AppTabs, AppTextarea, ComponentDiscoveryService, ComponentRegistryService, CrudService, DataBindingResolver, EventBusService, FallbackService, GuardService, InvokeWrapperService, PermissionEvaluator, RbacService, SchemaFetcherService, SchemaRendererService, SchemaRouteViewerComponent, SchemaRouterService, SignalLoggerService, SignalStoreService, SignalSyncService, StyleResolver, ThemeService, UiShowcaseComponent, components, dataComponents, feedbackComponents, getAllStyleVariants, getCurrentStyle, getStyleClassPrefix, invokeCommand, invokeCommandWithResponse, invokeVoid, invokeWithError, layoutComponents, loadStyleVariant, setCurrentStyle, uiComponents };
//# sourceMappingURL=tauri-front-shared.mjs.map
