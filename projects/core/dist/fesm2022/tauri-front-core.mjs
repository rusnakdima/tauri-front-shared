import * as i0 from '@angular/core';
import { signal, computed, Injectable, inject, effect } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

class SignalSyncService {
    http = inject(HttpClient);
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: SignalSyncService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: SignalSyncService, providedIn: "root" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: SignalSyncService, decorators: [{
            type: Injectable,
            args: [{ providedIn: "root" }]
        }] });

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

class CrudService {
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
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: CrudService, decorators: [{
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: EventBusService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: EventBusService, providedIn: "root" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: EventBusService, decorators: [{
            type: Injectable,
            args: [{ providedIn: "root" }]
        }] });

class SchemaRendererService {
    _pages = signal([], ...(ngDevMode ? [{ debugName: "_pages" }] : []));
    _currentPageId = signal(null, ...(ngDevMode ? [{ debugName: "_currentPageId" }] : []));
    _componentRegistry = signal(new Map(), ...(ngDevMode ? [{ debugName: "_componentRegistry" }] : []));
    _navigationStack = signal([], ...(ngDevMode ? [{ debugName: "_navigationStack" }] : []));
    _componentModules = signal(new Map(), ...(ngDevMode ? [{ debugName: "_componentModules" }] : []));
    dataStore = inject(SignalStoreService);
    crudService = inject(CrudService);
    eventBus = inject(EventBusService);
    signalStore = this.dataStore;
    componentResolver = null;
    routeResolver = null;
    pages = this._pages.asReadonly();
    currentPageId = this._currentPageId.asReadonly();
    registerComponent(def) {
        const registry = new Map(this._componentRegistry());
        registry.set(def.selector, def);
        this._componentRegistry.set(registry);
    }
    registerComponents(defs) {
        for (const def of defs) {
            this.registerComponent(def);
        }
    }
    getComponent(selector) {
        return this._componentRegistry().get(selector);
    }
    loadSchema(schema) {
        this._pages.set(schema.pages || []);
        const allComponents = [];
        for (const page of schema.pages || []) {
            allComponents.push(...page.components);
        }
        const registry = new Map();
        for (const comp of allComponents) {
            registry.set(comp.selector, comp);
        }
        this._componentRegistry.set(registry);
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
    renderGridLayout(container, layout) {
        container.style.display = "grid";
        if (layout.class) {
            container.className = layout.class;
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
        if (layout.style) {
            Object.assign(container.style, layout.style);
        }
        container.innerHTML = "";
        if (layout.children) {
            for (const childId of layout.children) {
                const component = this.getCurrentPage()?.components.find((c) => c.id === childId);
                if (component) {
                    const el = document.createElement(component.selector);
                    const position = layout.positions?.find((p) => p[childId] !== undefined);
                    if (position) {
                        const pos = position;
                        const colStart = pos.colStart ?? pos.column ?? 1;
                        const rowStart = pos.rowStart ?? pos.row ?? 1;
                        el.style.gridColumn = `${colStart} / span ${pos.colSpan || 1}`;
                        el.style.gridRow = `${rowStart} / span ${pos.rowSpan || 1}`;
                    }
                    container.appendChild(el);
                }
            }
        }
    }
    renderFlexLayout(container, layout) {
        container.style.display = "flex";
        if (layout.class) {
            container.className = layout.class;
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
        if (layout.style) {
            Object.assign(container.style, layout.style);
        }
        container.innerHTML = "";
        if (layout.children) {
            for (const childId of layout.children) {
                const component = this.getCurrentPage()?.components.find((c) => c.id === childId);
                if (component) {
                    const el = document.createElement(component.selector);
                    container.appendChild(el);
                }
            }
        }
    }
    async loadComponentModule(selector) {
        const cached = this._componentModules().get(selector);
        if (cached) {
            const constructor = cached
                .default;
            if (constructor)
                return constructor;
        }
        const def = this.getComponent(selector);
        if (!def) {
            throw new Error(`Component not found: ${selector}`);
        }
        const module = (await import(/* @vite-ignore */ def.selector));
        this.registerComponentModule(selector, module);
        const constructor = module
            .default;
        if (!constructor) {
            throw new Error(`Module ${selector} does not export a default CustomElementConstructor`);
        }
        return constructor;
    }
    registerComponentModule(selector, module) {
        const modules = new Map(this._componentModules());
        modules.set(selector, module);
        this._componentModules.set(modules);
    }
    resolveGridPosition(layoutId, componentId) {
        const page = this.getCurrentPage();
        if (!page)
            return null;
        const layout = page.layouts.find((l) => l.id === layoutId);
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
        }
        else if (layout.type === "flex") {
            classes.push("flex");
            if (layout.direction === "column")
                classes.push("flex-col");
            else
                classes.push("flex-row");
            if (layout.gap)
                classes.push(`gap-${layout.gap}`);
        }
        else if (layout.type === "stack") {
            classes.push("flex");
            classes.push("flex-col");
            if (layout.gap)
                classes.push(`gap-${layout.gap}`);
        }
        return classes.join(" ");
    }
    getComponentProps(componentId) {
        const page = this.getCurrentPage();
        if (!page)
            return {};
        const component = page.components.find((c) => c.id === componentId);
        return component?.props || {};
    }
    generatePage(pageId) {
        const page = this._pages().find((p) => p.id === pageId);
        if (!page)
            return { layouts: [], components: [] };
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
        el.className = this.resolveClasses(data.classes, def.defaultClasses || "");
        const resolvedProps = this.resolveProps({
            ...def.props,
            ...data.props,
        }, data.id);
        for (const [key, value] of Object.entries(resolvedProps)) {
            if (key === "class" || key === "style" || key === "id")
                continue;
            if (key.startsWith("on") && typeof value === "function") {
                const eventName = key[2].toLowerCase() + key.slice(3);
                el.addEventListener(eventName, value);
            }
            else {
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
            container.style.display = "grid";
            container.style.gridTemplateColumns =
                pageSchema.gridTemplate.columns.join(" ");
            container.style.gridTemplateRows = pageSchema.gridTemplate.rows.join(" ");
            container.style.gap = pageSchema.gridTemplate.gap;
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
            }
            else if (typeof handler === "string") {
                const resolvedHandler = this.resolveDataBinding(handler);
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
    resolveProps(props, componentId) {
        const resolved = {};
        for (const [key, value] of Object.entries(props)) {
            resolved[key] = this.resolveDataBinding(value);
        }
        return resolved;
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: SchemaRendererService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: SchemaRendererService, providedIn: "root" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: SchemaRendererService, decorators: [{
            type: Injectable,
            args: [{ providedIn: "root" }]
        }] });

class ThemeService {
    _mode = signal("system", ...(ngDevMode ? [{ debugName: "_mode" }] : []));
    _accentColor = signal("#3b82f6", ...(ngDevMode ? [{ debugName: "_accentColor" }] : []));
    _accentShades = signal(null, ...(ngDevMode ? [{ debugName: "_accentShades" }] : []));
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
        if (savedMode)
            this._mode.set(savedMode);
        if (savedAccent)
            this._accentColor.set(savedAccent);
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
        const effectiveMode = mode === "system"
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
            50: this.rgbToHex(Math.round(rgb.r * 0.95 + 255 * 0.05), Math.round(rgb.g * 0.95 + 255 * 0.05), Math.round(rgb.b * 0.95 + 255 * 0.05)),
            100: this.rgbToHex(Math.round(rgb.r * 0.9 + 255 * 0.1), Math.round(rgb.g * 0.9 + 255 * 0.1), Math.round(rgb.b * 0.9 + 255 * 0.1)),
            200: this.rgbToHex(Math.round(rgb.r * 0.8 + 255 * 0.2), Math.round(rgb.g * 0.8 + 255 * 0.2), Math.round(rgb.b * 0.8 + 255 * 0.2)),
            300: this.rgbToHex(Math.round(rgb.r * 0.7 + 255 * 0.3), Math.round(rgb.g * 0.7 + 255 * 0.3), Math.round(rgb.b * 0.7 + 255 * 0.3)),
            400: this.rgbToHex(Math.round(rgb.r * 0.6 + 255 * 0.4), Math.round(rgb.g * 0.6 + 255 * 0.4), Math.round(rgb.b * 0.6 + 255 * 0.4)),
            500: hex,
            600: this.rgbToHex(Math.round(rgb.r * 0.8), Math.round(rgb.g * 0.8), Math.round(rgb.b * 0.8)),
            700: this.rgbToHex(Math.round(rgb.r * 0.6), Math.round(rgb.g * 0.6), Math.round(rgb.b * 0.6)),
            800: this.rgbToHex(Math.round(rgb.r * 0.4), Math.round(rgb.g * 0.4), Math.round(rgb.b * 0.4)),
            900: this.rgbToHex(Math.round(rgb.r * 0.2), Math.round(rgb.g * 0.2), Math.round(rgb.b * 0.2)),
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
        return ("#" +
            [r, g, b]
                .map((x) => {
                const hex = Math.max(0, Math.min(255, x)).toString(16);
                return hex.length === 1 ? "0" + hex : hex;
            })
                .join(""));
    }
    hexToRgba(hex, alpha) {
        const rgb = this.hexToRgb(hex);
        if (!rgb)
            return `rgba(0, 0, 0, ${alpha})`;
        return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: ThemeService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: ThemeService, providedIn: "root" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: ThemeService, decorators: [{
            type: Injectable,
            args: [{ providedIn: "root" }]
        }], ctorParameters: () => [] });

// Angular-specific services (keep local implementations)

/**
 * Generated bundle index. Do not edit.
 */

export { CrudService, DataPatchService, EventBusService, SchemaRendererService, SignalLoggerService, SignalStoreService, SignalSyncService, ThemeService };
//# sourceMappingURL=tauri-front-core.mjs.map
