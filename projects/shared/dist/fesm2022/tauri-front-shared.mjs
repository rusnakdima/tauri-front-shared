import { __decorate } from "tslib";
import { LitElement, css, html } from "lit";
import { property, customElement, state } from "lit/decorators.js";
import * as i0 from "@angular/core";
import { signal, computed, Injectable, inject, effect } from "@angular/core";
import { invoke } from "@tauri-apps/api/core";
import { HttpClient } from "@angular/common/http";

let AppButton = class AppButton extends LitElement {
  variant = "primary";
  size = "md";
  disabled = false;
  loading = false;
  icon = null;
  iconPosition = "left";
  fullWidth = false;
  type = "button";
  static styles = css`
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
    this.dispatchEvent(
      new CustomEvent("click", { detail: e, bubbles: true, composed: true }),
    );
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
    return html`
      <button
        type="${this.type}"
        class="${classes}"
        ?disabled="${this.disabled || this.loading}"
        @click="${this._handleClick}"
      >
        ${this.loading
          ? html`<span class="app-btn-spinner"></span>`
          : html`
              ${this.icon && this.iconPosition === "left"
                ? html`<i class="material-icons app-btn-icon">${this.icon}</i>`
                : ""}
              <slot></slot>
              ${this.icon && this.iconPosition === "right"
                ? html`<i class="material-icons app-btn-icon">${this.icon}</i>`
                : ""}
            `}
      </button>
    `;
  }
};
__decorate([property()], AppButton.prototype, "variant", void 0);
__decorate([property()], AppButton.prototype, "size", void 0);
__decorate(
  [property({ type: Boolean })],
  AppButton.prototype,
  "disabled",
  void 0,
);
__decorate(
  [property({ type: Boolean })],
  AppButton.prototype,
  "loading",
  void 0,
);
__decorate([property()], AppButton.prototype, "icon", void 0);
__decorate([property()], AppButton.prototype, "iconPosition", void 0);
__decorate(
  [property({ type: Boolean })],
  AppButton.prototype,
  "fullWidth",
  void 0,
);
__decorate([property()], AppButton.prototype, "type", void 0);
AppButton = __decorate([customElement("app-button")], AppButton);

let AppInput = class AppInput extends LitElement {
  type = "text";
  placeholder = "";
  label = null;
  disabled = false;
  error = null;
  icon = null;
  _value = "";
  _focused = false;
  static styles = css`
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
    this.dispatchEvent(
      new CustomEvent("input", {
        detail: this._value,
        bubbles: true,
        composed: true,
      }),
    );
  }
  _handleFocus() {
    this._focused = true;
  }
  _handleBlur() {
    this._focused = false;
    this.dispatchEvent(
      new CustomEvent("blur", { bubbles: true, composed: true }),
    );
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
    return html`
      <div class="app-input-wrapper">
        ${this.label
          ? html`<label class="app-input-label">${this.label}</label>`
          : ""}
        <div
          class="app-input-container ${this._focused
            ? "app-input-focused"
            : ""}"
        >
          ${this.icon
            ? html`<i class="material-icons app-input-icon">${this.icon}</i>`
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
          ? html`<span class="app-input-error-text">${this.error}</span>`
          : ""}
      </div>
    `;
  }
};
__decorate([property()], AppInput.prototype, "type", void 0);
__decorate([property()], AppInput.prototype, "placeholder", void 0);
__decorate([property()], AppInput.prototype, "label", void 0);
__decorate(
  [property({ type: Boolean })],
  AppInput.prototype,
  "disabled",
  void 0,
);
__decorate([property()], AppInput.prototype, "error", void 0);
__decorate([property()], AppInput.prototype, "icon", void 0);
__decorate([state()], AppInput.prototype, "_value", void 0);
__decorate([state()], AppInput.prototype, "_focused", void 0);
AppInput = __decorate([customElement("app-input")], AppInput);

let AppEmptyState = class AppEmptyState extends LitElement {
  icon = null;
  title = "";
  message = "";
  actionLabel = null;
  variant = "default";
  static styles = css`
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
    this.dispatchEvent(
      new CustomEvent("action", { bubbles: true, composed: true }),
    );
  }
  render() {
    return html`
      <div class="icon-container ${this.variant}">
        ${this.icon
          ? html`<span class="icon">${this.icon}</span>`
          : html`<span class="icon">📦</span>`}
      </div>
      ${this.title ? html`<h2 class="title">${this.title}</h2>` : ""}
      ${this.message ? html`<p class="message">${this.message}</p>` : ""}
      ${this.actionLabel
        ? html`
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
__decorate([property()], AppEmptyState.prototype, "icon", void 0);
__decorate([property()], AppEmptyState.prototype, "title", void 0);
__decorate([property()], AppEmptyState.prototype, "message", void 0);
__decorate([property()], AppEmptyState.prototype, "actionLabel", void 0);
__decorate([property()], AppEmptyState.prototype, "variant", void 0);
AppEmptyState = __decorate([customElement("app-empty-state")], AppEmptyState);

class SignalStoreService {
  _state = signal({}, ...(ngDevMode ? [{ debugName: "_state" }] : []));
  state = computed(
    () => this._state(),
    ...(ngDevMode ? [{ debugName: "state" }] : []),
  );
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
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: "12.0.0",
    version: "20.3.25",
    ngImport: i0,
    type: SignalStoreService,
    deps: [],
    target: i0.ɵɵFactoryTarget.Injectable,
  });
  static ɵprov = i0.ɵɵngDeclareInjectable({
    minVersion: "12.0.0",
    version: "20.3.25",
    ngImport: i0,
    type: SignalStoreService,
    providedIn: "root",
  });
}
i0.ɵɵngDeclareClassMetadata({
  minVersion: "12.0.0",
  version: "20.3.25",
  ngImport: i0,
  type: SignalStoreService,
  decorators: [
    {
      type: Injectable,
      args: [{ providedIn: "root" }],
    },
  ],
});

class EventBusService {
  handlers = new Map();
  emit(event, data) {
    const eventHandlers = this.handlers.get(event);
    if (eventHandlers) {
      eventHandlers.forEach((handler) => handler(data));
    }
  }
  on(event, handler) {
    if (!this.handlers.has(event)) {
      this.handlers.set(event, new Set());
    }
    const eventHandlers = this.handlers.get(event);
    eventHandlers.add(handler);
    return () => this.off(event, handler);
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
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: "12.0.0",
    version: "20.3.25",
    ngImport: i0,
    type: EventBusService,
    deps: [],
    target: i0.ɵɵFactoryTarget.Injectable,
  });
  static ɵprov = i0.ɵɵngDeclareInjectable({
    minVersion: "12.0.0",
    version: "20.3.25",
    ngImport: i0,
    type: EventBusService,
    providedIn: "root",
  });
}
i0.ɵɵngDeclareClassMetadata({
  minVersion: "12.0.0",
  version: "20.3.25",
  ngImport: i0,
  type: EventBusService,
  decorators: [
    {
      type: Injectable,
      args: [{ providedIn: "root" }],
    },
  ],
});

let CrudService$1 = class CrudService {
  storage = signal(null, ...(ngDevMode ? [{ debugName: "storage" }] : []));
  init(storage) {
    this.storage.set(storage);
  }
  getStorage() {
    const s = this.storage();
    if (!s) throw new Error("CrudService not initialized");
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
    return data.find((item) => item.id === id) || null;
  }
  update(collection, id, changes) {
    const data = this.getCollection(collection);
    const index = data.findIndex((item) => item.id === id);
    if (index === -1) return;
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
      if (aVal == null) return 1;
      if (bVal == null) return -1;
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
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: "12.0.0",
    version: "20.3.25",
    ngImport: i0,
    type: CrudService,
    deps: [],
    target: i0.ɵɵFactoryTarget.Injectable,
  });
  static ɵprov = i0.ɵɵngDeclareInjectable({
    minVersion: "12.0.0",
    version: "20.3.25",
    ngImport: i0,
    type: CrudService,
    providedIn: "root",
  });
};
i0.ɵɵngDeclareClassMetadata({
  minVersion: "12.0.0",
  version: "20.3.25",
  ngImport: i0,
  type: CrudService$1,
  decorators: [
    {
      type: Injectable,
      args: [{ providedIn: "root" }],
    },
  ],
});

class ComponentRegistryService {
  _componentRegistry = new Map();
  _componentModules = new Map();
  registerComponent(def) {
    this._componentRegistry.set(def.selector, def);
  }
  registerComponents(defs) {
    for (const def of defs) {
      this.registerComponent(def);
    }
  }
  getComponent(selector) {
    return this._componentRegistry.get(selector);
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
      if (constructor) return constructor;
    }
    const def = this.getComponent(selector);
    if (!def) {
      throw new Error(`Component not found: ${selector}`);
    }
    const module = await import(/* @vite-ignore */ def.selector);
    this.registerComponentModule(selector, module);
    const constructor = module["default"];
    if (!constructor) {
      throw new Error(
        `Module ${selector} does not export a default CustomElementConstructor`,
      );
    }
    return constructor;
  }
  getComponentModules() {
    return this._componentModules;
  }
  loadComponentsFromSchema(pages) {
    const registry = new Map();
    for (const page of pages) {
      for (const comp of page.components) {
        registry.set(comp.selector, comp);
      }
    }
    this._componentRegistry = registry;
  }
  hasComponent(selector) {
    return this._componentRegistry.has(selector);
  }
  getRegisteredSelectors() {
    return Array.from(this._componentRegistry.keys());
  }
}

class DataBindingResolverService {
  signalStore;
  crudService;
  constructor(signalStore, crudService) {
    this.signalStore = signalStore;
    this.crudService = crudService;
  }
  resolveDataBinding(binding) {
    if (typeof binding === "string") {
      const pattern = /\{\{data\.([^}]+)\}\}/g;
      const result = binding.replace(pattern, (_, path) => {
        const value = this.getDataBindingValue(path);
        return value !== undefined ? String(value) : binding;
      });
      return result;
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
      if (current === null || current === undefined) return undefined;
      const part = parts[i];
      const arrayMatch = part.match(/^(\w+)\[(\d+)\]$/);
      if (arrayMatch) {
        const [, arrayKey, indexStr] = arrayMatch;
        const arr = this.getNestedValue(current, arrayKey);
        if (Array.isArray(arr)) {
          const index = parseInt(indexStr, 10);
          current = arr[index];
        } else {
          current = undefined;
        }
      } else {
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
      } else if (match[3]) {
        result.push(match[3]);
      }
    }
    return result;
  }
  getNestedValue(obj, key) {
    if (obj === null || obj === undefined) return undefined;
    if (typeof obj !== "object") return undefined;
    return obj[key];
  }
}

class LayoutEngineService {
  resolveClass(layout) {
    if (layout.class) return layout.class;
    const classes = [];
    if (layout.type === "grid") {
      classes.push("grid");
      if (layout.direction === "row") classes.push("grid-flow-col");
      else classes.push("grid-flow-row");
      if (layout.gap) classes.push(`gap-${layout.gap}`);
    } else if (layout.type === "flex") {
      classes.push("flex");
      if (layout.direction === "column") classes.push("flex-col");
      else classes.push("flex-row");
      if (layout.gap) classes.push(`gap-${layout.gap}`);
    } else if (layout.type === "stack") {
      classes.push("flex");
      classes.push("flex-col");
      if (layout.gap) classes.push(`gap-${layout.gap}`);
    }
    return classes.join(" ");
  }
  renderGridLayout(container, layout) {
    container.style.display = "grid";
    if (layout.class) {
      container.className = layout.class;
    } else {
      const classes = ["grid"];
      if (layout.direction === "row") classes.push("grid-flow-col");
      else classes.push("grid-flow-row");
      if (layout.gap) classes.push(`gap-${layout.gap}`);
      container.className = classes.join(" ");
    }
    if (layout.style) {
      Object.assign(container.style, layout.style);
    }
    container.innerHTML = "";
  }
  renderFlexLayout(container, layout) {
    container.style.display = "flex";
    if (layout.class) {
      container.className = layout.class;
    } else {
      const classes = ["flex"];
      if (layout.direction === "column") classes.push("flex-col");
      else classes.push("flex-row");
      if (layout.gap) classes.push(`gap-${layout.gap}`);
      container.className = classes.join(" ");
    }
    if (layout.style) {
      Object.assign(container.style, layout.style);
    }
    container.innerHTML = "";
  }
  resolveGridPosition(layout, componentId) {
    if (!layout || !layout.positions) return null;
    const pos = layout.positions.find((p) => p[componentId] !== undefined);
    if (!pos) return null;
    const position = pos;
    return {
      column: position.column || 1,
      row: position.row || 1,
      colSpan: position.colSpan || 1,
      rowSpan: position.rowSpan || 1,
    };
  }
  resolveGridPositionFromPositions(positions, componentId) {
    if (!positions) return null;
    const pos = positions.find((p) => p[componentId] !== undefined);
    if (!pos) return null;
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
  applyLayoutStyles(
    container,
    layout,
    children,
    getComponentById,
    resolvePosition,
  ) {
    if (layout.children) {
      for (const childId of layout.children) {
        const component = getComponentById(childId);
        if (component) {
          const el = document.createElement(component.selector);
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
}

class SchemaRendererService {
  _pages = signal([], ...(ngDevMode ? [{ debugName: "_pages" }] : []));
  _currentPageId = signal(
    null,
    ...(ngDevMode ? [{ debugName: "_currentPageId" }] : []),
  );
  _navigationStack = signal(
    [],
    ...(ngDevMode ? [{ debugName: "_navigationStack" }] : []),
  );
  componentRegistry;
  dataBindingResolver;
  layoutEngine;
  dataStore;
  crudService;
  eventBus;
  componentResolver = null;
  routeResolver = null;
  pages = this._pages.asReadonly();
  currentPageId = this._currentPageId.asReadonly();
  constructor() {
    this.dataStore = inject(SignalStoreService);
    this.crudService = inject(CrudService$1);
    this.eventBus = inject(EventBusService);
    this.componentRegistry = new ComponentRegistryService();
    this.dataBindingResolver = new DataBindingResolverService(
      this.dataStore,
      this.crudService,
    );
    this.layoutEngine = new LayoutEngineService();
  }
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
    this._pages.set(schema.pages || []);
    this.componentRegistry.loadComponentsFromSchema(schema.pages || []);
  }
  getCurrentPage() {
    const id = this._currentPageId();
    if (!id) return null;
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
  renderGridLayout(container, layout) {
    this.layoutEngine.renderGridLayout(container, layout);
    this.layoutEngine.applyLayoutStyles(
      container,
      layout,
      layout.children || [],
      (childId) =>
        this.getCurrentPage()?.components.find((c) => c.id === childId),
      (l, childId) => this.layoutEngine.resolveGridPosition(l, childId),
    );
  }
  renderFlexLayout(container, layout) {
    this.layoutEngine.renderFlexLayout(container, layout);
    container.innerHTML = "";
    if (layout.children) {
      for (const childId of layout.children) {
        const component = this.getCurrentPage()?.components.find(
          (c) => c.id === childId,
        );
        if (component) {
          const el = document.createElement(component.selector);
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
    if (!page) return null;
    const layout = page.layouts.find((l) => l.id === layoutId);
    return this.layoutEngine.resolveGridPosition(layout, componentId);
  }
  resolveClass(layout) {
    return this.layoutEngine.resolveClass(layout);
  }
  getComponentProps(componentId) {
    const page = this.getCurrentPage();
    if (!page) return {};
    const component = page.components.find((c) => c.id === componentId);
    return component?.props || {};
  }
  generatePage(pageId) {
    const page = this._pages().find((p) => p.id === pageId);
    if (!page) return { layouts: [], components: [] };
    return {
      layouts: page.layouts,
      components: page.components,
    };
  }
  setComponentResolver(resolver) {
    this.componentResolver = resolver;
  }
  async createElement(data) {
    const def = this.componentResolver
      ? this.componentResolver(data.componentId)
      : this.getComponent(data.componentId);
    if (!def) {
      console.warn(`Component not found: ${data.componentId}`);
      return null;
    }
    await customElements.whenDefined(def.selector);
    const el = document.createElement(def.selector);
    if (data.gridPosition) {
      el.style.gridColumn = `${data.gridPosition.column} / span ${data.gridPosition.colSpan || 1}`;
      el.style.gridRow = `${data.gridPosition.row} / span ${data.gridPosition.rowSpan || 1}`;
    } else if (data.position) {
      el.style.position = "absolute";
      el.style.left = `${data.position.x}px`;
      el.style.top = `${data.position.y}px`;
      el.style.width = `${data.position.width}px`;
      el.style.height = `${data.position.height}px`;
    }
    if (data.zIndex) {
      el.style.zIndex = `${data.zIndex}`;
    }
    el.className = this.resolveClasses(data.classes, def.defaultClasses || "");
    const resolvedProps = this.dataBindingResolver.resolveProps(
      {
        ...def.props,
        ...data.props,
      },
      data.id,
    );
    for (const [key, value] of Object.entries(resolvedProps)) {
      if (key === "class" || key === "style" || key === "id") continue;
      if (key.startsWith("on") && typeof value === "function") {
        const eventName = key[2].toLowerCase() + key.slice(3);
        el.addEventListener(eventName, value);
      } else {
        el.setAttribute(key, String(value));
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
      for (const [eventName, emitEvent] of Object.entries(data.events)) {
        el.addEventListener(eventName, (e) => {
          this.eventBus.emit(emitEvent, { elementId: data.id, event: e });
        });
      }
    }
    return el;
  }
  async render(container, pageSchema) {
    container.innerHTML = "";
    if (pageSchema.gridTemplate) {
      const template = this.layoutEngine.parseGridTemplate(
        pageSchema.gridTemplate,
      );
      container.style.display = "grid";
      container.style.gridTemplateColumns = template.gridTemplateColumns;
      container.style.gridTemplateRows = template.gridTemplateRows;
      container.style.gap = template.gap;
    }
    for (const element of pageSchema.elements) {
      const el = await this.createElement(element);
      if (el) {
        container.appendChild(el);
      }
    }
  }
  bindEvents(el, events, elementId) {
    for (const [eventName, handler] of Object.entries(events)) {
      if (typeof handler === "function") {
        el.addEventListener(eventName, handler);
      } else if (typeof handler === "string") {
        const resolvedHandler =
          this.dataBindingResolver.resolveDataBinding(handler);
        if (
          typeof resolvedHandler === "string" &&
          resolvedHandler.startsWith("{{data.")
        ) {
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
      if (current === null || current === undefined) return undefined;
      const part = parts[i];
      const arrayMatch = part.match(/^(\w+)\[(\d+)\]$/);
      if (arrayMatch) {
        const [, arrayKey, indexStr] = arrayMatch;
        const arr = this.getNestedValue(current, arrayKey);
        if (Array.isArray(arr)) {
          const index = parseInt(indexStr, 10);
          current = arr[index];
        } else {
          current = undefined;
        }
      } else {
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
      } else if (match[3]) {
        result.push(match[3]);
      }
    }
    return result;
  }
  getNestedValue(obj, key) {
    if (obj === null || obj === undefined) return undefined;
    if (typeof obj !== "object") return undefined;
    return obj[key];
  }
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: "12.0.0",
    version: "20.3.25",
    ngImport: i0,
    type: SchemaRendererService,
    deps: [],
    target: i0.ɵɵFactoryTarget.Injectable,
  });
  static ɵprov = i0.ɵɵngDeclareInjectable({
    minVersion: "12.0.0",
    version: "20.3.25",
    ngImport: i0,
    type: SchemaRendererService,
    providedIn: "root",
  });
}
i0.ɵɵngDeclareClassMetadata({
  minVersion: "12.0.0",
  version: "20.3.25",
  ngImport: i0,
  type: SchemaRendererService,
  decorators: [
    {
      type: Injectable,
      args: [{ providedIn: "root" }],
    },
  ],
  ctorParameters: () => [],
});

class InvokeWrapperService {
  async invoke(cmd, args) {
    return invoke(cmd, args);
  }
  async invokeWithRetry(cmd, args, options = {}) {
    const { retries = 3, delayMs = 1000, timeoutMs = 30000 } = options;
    let lastError;
    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        return await this.invokeWithTimeout(cmd, args, timeoutMs);
      } catch (error) {
        lastError = error;
        if (attempt < retries) {
          await this.delay(delayMs * Math.pow(2, attempt));
        }
      }
    }
    throw lastError;
  }
  async invokeWithTimeout(cmd, args, timeoutMs) {
    return Promise.race([
      this.invoke(cmd, args),
      new Promise((_, reject) =>
        setTimeout(
          () =>
            reject(new Error(`Invoke ${cmd} timed out after ${timeoutMs}ms`)),
          timeoutMs,
        ),
      ),
    ]);
  }
  delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
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

class ThemeService {
  _mode = signal("system", ...(ngDevMode ? [{ debugName: "_mode" }] : []));
  _accentColor = signal(
    "#3b82f6",
    ...(ngDevMode ? [{ debugName: "_accentColor" }] : []),
  );
  _accentShades = signal(
    null,
    ...(ngDevMode ? [{ debugName: "_accentShades" }] : []),
  );
  _registeredThemes = new Map();
  mode = this._mode.asReadonly();
  accentColor = this._accentColor.asReadonly();
  accentShades = this._accentShades.asReadonly();
  constructor() {
    effect(() => {
      this.applyTheme(this._mode(), this._accentColor());
    });
  }
  setMode(mode) {
    this._mode.set(mode);
    localStorage.setItem("theme-mode", mode);
  }
  setTheme(theme) {
    this.setMode(theme);
  }
  setAccentColor(color) {
    this._accentColor.set(color);
    localStorage.setItem("theme-accent", color);
    this.applyAccentShades(color);
  }
  registerTheme(name, colors) {
    this._registeredThemes.set(name, colors);
  }
  init() {
    const savedMode = localStorage.getItem("theme-mode");
    const savedAccent = localStorage.getItem("theme-accent");
    if (savedMode) this._mode.set(savedMode);
    if (savedAccent) this._accentColor.set(savedAccent);
    const shades = this.calculateShades(savedAccent || "#3b82f6");
    this._accentShades.set(shades);
    this.applyTheme(this._mode(), savedAccent || "#3b82f6");
  }
  toggle() {
    const current = document.documentElement.classList.contains("dark")
      ? "dark"
      : "light";
    this.setMode(current === "dark" ? "light" : "dark");
  }
  applyTheme(mode, accent) {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    const effectiveMode =
      mode === "system"
        ? window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
        : mode;
    root.classList.add(effectiveMode);
    this.applyAccentShades(accent);
  }
  applyAccentShades(accent) {
    const root = document.documentElement;
    root.style.setProperty("--accent", accent);
    const shades = {
      50: `color-mix(in srgb, var(--accent) 10%, white)`,
      100: `color-mix(in srgb, var(--accent) 20%, white)`,
      200: `color-mix(in srgb, var(--accent) 40%, white)`,
      300: `color-mix(in srgb, var(--accent) 60%, white)`,
      400: `color-mix(in srgb, var(--accent) 80%, white)`,
      500: accent,
      600: `color-mix(in srgb, var(--accent) 80%, black)`,
      700: `color-mix(in srgb, var(--accent) 60%, black)`,
      800: `color-mix(in srgb, var(--accent) 40%, black)`,
      900: `color-mix(in srgb, var(--accent) 20%, black)`,
    };
    for (const [key, value] of Object.entries(shades)) {
      root.style.setProperty(`--accent-${key}`, value);
    }
    const computedShades = { ...shades };
    computedShades[500] = accent;
    this._accentShades.set(computedShades);
  }
  calculateShades(hex) {
    const rgb = this.hexToRgb(hex);
    if (!rgb) {
      return {
        50: "#f0f9ff",
        100: "#e0f2fe",
        200: "#bae6fd",
        300: "#7dd3fc",
        400: "#38bdf8",
        500: "#0ea5e9",
        600: "#0284c7",
        700: "#0369a1",
        800: "#075985",
        900: "#0c4a6e",
      };
    }
    const shades = {
      50: this.rgbToHex(
        Math.round(rgb.r * 0.95 + 255 * 0.05),
        Math.round(rgb.g * 0.95 + 255 * 0.05),
        Math.round(rgb.b * 0.95 + 255 * 0.05),
      ),
      100: this.rgbToHex(
        Math.round(rgb.r * 0.9 + 255 * 0.1),
        Math.round(rgb.g * 0.9 + 255 * 0.1),
        Math.round(rgb.b * 0.9 + 255 * 0.1),
      ),
      200: this.rgbToHex(
        Math.round(rgb.r * 0.8 + 255 * 0.2),
        Math.round(rgb.g * 0.8 + 255 * 0.2),
        Math.round(rgb.b * 0.8 + 255 * 0.2),
      ),
      300: this.rgbToHex(
        Math.round(rgb.r * 0.7 + 255 * 0.3),
        Math.round(rgb.g * 0.7 + 255 * 0.3),
        Math.round(rgb.b * 0.7 + 255 * 0.3),
      ),
      400: this.rgbToHex(
        Math.round(rgb.r * 0.6 + 255 * 0.4),
        Math.round(rgb.g * 0.6 + 255 * 0.4),
        Math.round(rgb.b * 0.6 + 255 * 0.4),
      ),
      500: hex,
      600: this.rgbToHex(
        Math.round(rgb.r * 0.8),
        Math.round(rgb.g * 0.8),
        Math.round(rgb.b * 0.8),
      ),
      700: this.rgbToHex(
        Math.round(rgb.r * 0.6),
        Math.round(rgb.g * 0.6),
        Math.round(rgb.b * 0.6),
      ),
      800: this.rgbToHex(
        Math.round(rgb.r * 0.4),
        Math.round(rgb.g * 0.4),
        Math.round(rgb.b * 0.4),
      ),
      900: this.rgbToHex(
        Math.round(rgb.r * 0.2),
        Math.round(rgb.g * 0.2),
        Math.round(rgb.b * 0.2),
      ),
    };
    return shades;
  }
  hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  }
  rgbToHex(r, g, b) {
    return (
      "#" +
      [r, g, b]
        .map((x) => {
          const hex = Math.max(0, Math.min(255, x)).toString(16);
          return hex.length === 1 ? "0" + hex : hex;
        })
        .join("")
    );
  }
  hexToRgba(hex, alpha) {
    const rgb = this.hexToRgb(hex);
    if (!rgb) return `rgba(0, 0, 0, ${alpha})`;
    return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
  }
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: "12.0.0",
    version: "20.3.25",
    ngImport: i0,
    type: ThemeService,
    deps: [],
    target: i0.ɵɵFactoryTarget.Injectable,
  });
  static ɵprov = i0.ɵɵngDeclareInjectable({
    minVersion: "12.0.0",
    version: "20.3.25",
    ngImport: i0,
    type: ThemeService,
    providedIn: "root",
  });
}
i0.ɵɵngDeclareClassMetadata({
  minVersion: "12.0.0",
  version: "20.3.25",
  ngImport: i0,
  type: ThemeService,
  decorators: [
    {
      type: Injectable,
      args: [{ providedIn: "root" }],
    },
  ],
  ctorParameters: () => [],
});

class SignalLoggerService {
  _entries = signal([], ...(ngDevMode ? [{ debugName: "_entries" }] : []));
  _minLevel = signal(
    "info",
    ...(ngDevMode ? [{ debugName: "_minLevel" }] : []),
  );
  _maxEntries = signal(
    1000,
    ...(ngDevMode ? [{ debugName: "_maxEntries" }] : []),
  );
  entries = computed(
    () => this._entries(),
    ...(ngDevMode ? [{ debugName: "entries" }] : []),
  );
  filteredEntries = computed(
    () => {
      const level = this._minLevel();
      const levels = ["debug", "info", "warn", "error"];
      const minIndex = levels.indexOf(level);
      return this._entries().filter((e) => levels.indexOf(e.level) >= minIndex);
    },
    ...(ngDevMode ? [{ debugName: "filteredEntries" }] : []),
  );
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
    } catch (error) {
      this.error("Failed to import log entries from JSON");
    }
  }
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: "12.0.0",
    version: "20.3.25",
    ngImport: i0,
    type: SignalLoggerService,
    deps: [],
    target: i0.ɵɵFactoryTarget.Injectable,
  });
  static ɵprov = i0.ɵɵngDeclareInjectable({
    minVersion: "12.0.0",
    version: "20.3.25",
    ngImport: i0,
    type: SignalLoggerService,
    providedIn: "root",
  });
}
i0.ɵɵngDeclareClassMetadata({
  minVersion: "12.0.0",
  version: "20.3.25",
  ngImport: i0,
  type: SignalLoggerService,
  decorators: [
    {
      type: Injectable,
      args: [{ providedIn: "root" }],
    },
  ],
});

class SignalSyncService {
  http = inject(HttpClient);
  _syncStatus = signal(
    "idle",
    ...(ngDevMode ? [{ debugName: "_syncStatus" }] : []),
  );
  _lastSyncTime = signal(
    null,
    ...(ngDevMode ? [{ debugName: "_lastSyncTime" }] : []),
  );
  _pendingChanges = signal(
    0,
    ...(ngDevMode ? [{ debugName: "_pendingChanges" }] : []),
  );
  _syncEndpoint = signal(
    "",
    ...(ngDevMode ? [{ debugName: "_syncEndpoint" }] : []),
  );
  syncStatus = computed(
    () => this._syncStatus(),
    ...(ngDevMode ? [{ debugName: "syncStatus" }] : []),
  );
  lastSyncTime = computed(
    () => this._lastSyncTime(),
    ...(ngDevMode ? [{ debugName: "lastSyncTime" }] : []),
  );
  pendingChanges = computed(
    () => this._pendingChanges(),
    ...(ngDevMode ? [{ debugName: "pendingChanges" }] : []),
  );
  syncEndpoint = computed(
    () => this._syncEndpoint(),
    ...(ngDevMode ? [{ debugName: "syncEndpoint" }] : []),
  );
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
    if (this._syncStatus() === "syncing") return;
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
    } catch (error) {
      this.markError();
      throw error;
    }
  }
  async performSync() {
    const endpoint = this._syncEndpoint();
    if (!endpoint) return;
    try {
      await this.http
        .post(`${endpoint}/sync`, {
          timestamp: new Date().toISOString(),
        })
        .toPromise();
    } catch (error) {
      console.error("Sync failed:", error);
      throw error;
    }
  }
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: "12.0.0",
    version: "20.3.25",
    ngImport: i0,
    type: SignalSyncService,
    deps: [],
    target: i0.ɵɵFactoryTarget.Injectable,
  });
  static ɵprov = i0.ɵɵngDeclareInjectable({
    minVersion: "12.0.0",
    version: "20.3.25",
    ngImport: i0,
    type: SignalSyncService,
    providedIn: "root",
  });
}
i0.ɵɵngDeclareClassMetadata({
  minVersion: "12.0.0",
  version: "20.3.25",
  ngImport: i0,
  type: SignalSyncService,
  decorators: [
    {
      type: Injectable,
      args: [{ providedIn: "root" }],
    },
  ],
});

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
  return (
    response.status === ResponseStatus.Success ||
    response.status === ResponseStatus.Created ||
    response.status === ResponseStatus.Updated ||
    response.status === ResponseStatus.Deleted
  );
}
function isError(response) {
  return (
    response.status === ResponseStatus.Error ||
    response.status === ResponseStatus.ValidationError ||
    response.status === ResponseStatus.NotFound ||
    response.status === ResponseStatus.Unauthorized ||
    response.status === ResponseStatus.Forbidden
  );
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
  if (
    error &&
    typeof error === "object" &&
    "type" in error &&
    "message" in error
  ) {
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

async function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
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
  const { timeout = 30000, retryCount = 0, retryDelay = 1000 } = options || {};
  let lastError = null;
  for (let attempt = 0; attempt <= retryCount; attempt++) {
    try {
      const result = await invoke(command, args);
      return {
        success: true,
        data: result,
        error: null,
      };
    } catch (error) {
      lastError = parseErrorFromInvoke(error);
      if (attempt < retryCount) {
        await delay(retryDelay * Math.pow(2, attempt));
      }
    }
  }
  return {
    success: false,
    data: null,
    error: lastError,
  };
}
async function invokeCommandWithResponse(command, args, options) {
  const { timeout = 30000, retryCount = 0, retryDelay = 1000 } = options || {};
  let lastResponse = {
    status: ResponseStatus.Error,
    message: "Unknown error",
    data: null,
  };
  for (let attempt = 0; attempt <= retryCount; attempt++) {
    try {
      const result = await invoke(command, args);
      lastResponse = result;
      if (
        result.status !== ResponseStatus.Error &&
        result.status !== ResponseStatus.ValidationError
      ) {
        return result;
      }
      if (attempt < retryCount) {
        await delay(retryDelay * Math.pow(2, attempt));
      }
    } catch (error) {
      lastResponse = {
        status: ResponseStatus.Error,
        message: error instanceof Error ? error.message : String(error),
        data: null,
      };
      if (attempt < retryCount) {
        await delay(retryDelay * Math.pow(2, attempt));
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
    description:
      "Soft raised shadows with clay-like appearance, rounded corners and gradient backgrounds",
  },
  glassmorphism: {
    id: "glassmorphism",
    name: "Glasmorphism",
    cssFile: "./glassmorphism.css",
    classPrefix: "glass-",
    description:
      "Frosted glass effect with backdrop blur, semi-transparent surfaces",
  },
  neumorphism: {
    id: "neumorphism",
    name: "Neumorphism",
    cssFile: "./neumorphism.css",
    classPrefix: "neu-",
    description:
      "Soft inset and outset shadows with muted base color for subtle depth",
  },
  "material-design-v3": {
    id: "material-design-v3",
    name: "Material Design 3",
    cssFile: "./material-design-v3.css",
    classPrefix: "m3-",
    description:
      "Google Material Design 3 with elevation system, state layers, and rounded corners",
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
    link.onerror = () =>
      reject(new Error(`Failed to load style: ${config.cssFile}`));
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
  document.dispatchEvent(
    new CustomEvent("style-changed", {
      detail: { variant, prefix: STYLE_VARIANTS[variant].classPrefix },
    }),
  );
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
    if (
      cls.startsWith("clay-") ||
      cls.startsWith("glass-") ||
      cls.startsWith("neu-") ||
      cls.startsWith("m3-")
    ) {
      element.classList.remove(cls);
    }
  });
  element.classList.add(`${prefix}${element.dataset.baseClass || ""}`);
}

// @tauri-front/shared - Unified shared library
// Explicit re-exports to avoid name collisions
// Lit web components (registered as custom elements)

/**
 * Generated bundle index. Do not edit.
 */

export {
  AppButton,
  AppEmptyState,
  AppInput,
  CrudService,
  EventBusService,
  InvokeWrapperService,
  SchemaRendererService,
  SignalLoggerService,
  SignalStoreService,
  SignalSyncService,
  ThemeService,
  components,
  dataComponents,
  feedbackComponents,
  getCurrentStyle,
  getStyleClassPrefix,
  invokeCommand,
  invokeCommandWithResponse,
  invokeVoid,
  invokeWithError,
  layoutComponents,
  loadStyleVariant,
  uiComponents,
};
//# sourceMappingURL=tauri-front-shared.mjs.map
