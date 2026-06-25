import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let IndexedDbService = class IndexedDbService {
    constructor(dbName = 'tauri-app-db', storeName = 'key-value-store') {
        this.db = null;
        this.dbName = dbName;
        this.storeName = storeName;
        this.initDb();
    }
    initDb() {
        if (typeof indexedDB === 'undefined')
            return;
        const request = indexedDB.open(this.dbName, 1);
        request.onerror = () => {
            console.error('IndexedDB error:', request.error);
        };
        request.onupgradeneeded = () => {
            const db = request.result;
            if (!db.objectStoreNames.contains(this.storeName)) {
                db.createObjectStore(this.storeName, { keyPath: 'key' });
            }
        };
        this.db = request.result;
    }
    getStore() {
        if (!this.db)
            return null;
        const transaction = this.db.transaction(this.storeName, 'readwrite');
        return transaction.objectStore(this.storeName);
    }
    get(key) {
        if (typeof indexedDB === 'undefined')
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
        if (typeof indexedDB === 'undefined')
            return;
        const store = this.getStore();
        if (!store)
            return;
        store.put({ key, value });
    }
    remove(key) {
        if (typeof indexedDB === 'undefined')
            return;
        const store = this.getStore();
        if (!store)
            return;
        store.delete(key);
    }
    clear() {
        if (typeof indexedDB === 'undefined')
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
        if (typeof indexedDB === 'undefined')
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
};
IndexedDbService = __decorate([
    Injectable({ providedIn: 'root' })
], IndexedDbService);
export { IndexedDbService };
//# sourceMappingURL=indexed-db.service.js.map