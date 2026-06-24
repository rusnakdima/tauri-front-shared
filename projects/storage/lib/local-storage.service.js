import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let LocalStorageService = class LocalStorageService {
    get(key) {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    }
    set(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }
    remove(key) {
        localStorage.removeItem(key);
    }
    clear() {
        localStorage.clear();
    }
    keys() {
        return Object.keys(localStorage);
    }
};
LocalStorageService = __decorate([
    Injectable({ providedIn: 'root' })
], LocalStorageService);
export { LocalStorageService };
//# sourceMappingURL=local-storage.service.js.map