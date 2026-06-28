type Subscriber = (key: string, value: unknown) => void;

export class SignalStore {
  private store: Map<string, unknown> = new Map();
  private subscribers: Set<Subscriber> = new Set();

  set(key: string, value: unknown): void {
    this.store.set(key, value);
    this.notify(key, value);
  }

  get(key: string): unknown {
    return this.store.get(key);
  }

  update(key: string, fn: (value: unknown) => unknown): void {
    const current = this.store.get(key);
    const updated = fn(current);
    this.store.set(key, updated);
    this.notify(key, updated);
  }

  delete(key: string): void {
    this.store.delete(key);
    this.notify(key, undefined);
  }

  keys(): string[] {
    return Array.from(this.store.keys());
  }

  toJSON(): Record<string, unknown> {
    const result: Record<string, unknown> = {};
    for (const [key, value] of this.store) {
      result[key] = value;
    }
    return result;
  }

  fromJSON(json: Record<string, unknown>): void {
    this.store.clear();
    for (const [key, value] of Object.entries(json)) {
      this.store.set(key, value);
    }
    this.notifyAll();
  }

  subscribe(callback: Subscriber): () => void {
    this.subscribers.add(callback);
    return () => {
      this.subscribers.delete(callback);
    };
  }

  private notify(key: string, value: unknown): void {
    for (const callback of this.subscribers) {
      callback(key, value);
    }
  }

  private notifyAll(): void {
    for (const [key, value] of this.store) {
      this.notify(key, value);
    }
  }
}

export function createSignalStore(): SignalStore {
  return new SignalStore();
}
