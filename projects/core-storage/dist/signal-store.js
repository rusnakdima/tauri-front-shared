export class SignalStore {
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
        return Object.fromEntries(this.store);
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
export function createSignalStore() {
    return new SignalStore();
}
