import { Injectable, signal, computed } from "@angular/core";

@Injectable({ providedIn: "root" })
export class SignalStoreService {
  private _state = signal<Record<string, unknown>>({});

  state = computed(() => this._state());

  set(key: string, value: unknown): void {
    this._state.update((state) => ({
      ...state,
      [key]: value,
    }));
  }

  get(key: string): unknown {
    return this._state()[key];
  }

  update(key: string, fn: (value: unknown) => unknown): void {
    const current = this.get(key);
    this.set(key, fn(current));
  }

  delete(key: string): void {
    this._state.update((state) => {
      const { [key]: _, ...rest } = state as Record<string, unknown>;
      return rest;
    });
  }

  keys(): string[] {
    return Object.keys(this._state());
  }

  has(key: string): boolean {
    return key in this._state();
  }

  clear(): void {
    this._state.set({});
  }

  toJSON(): Record<string, unknown> {
    return this._state();
  }

  fromJSON(json: Record<string, unknown>): void {
    this._state.set(json);
  }

  patch(patch: Record<string, unknown>): void {
    this._state.update((state) => ({
      ...state,
      ...patch,
    }));
  }
}
