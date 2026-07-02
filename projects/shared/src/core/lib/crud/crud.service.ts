import { Injectable, signal } from "@angular/core";

interface StorageServiceInterface {
  get<T>(key: string): T | null;
  set(key: string, value: unknown): void;
}

export interface CrudFilter {
  field: string;
  operator:
    | "eq"
    | "ne"
    | "gt"
    | "gte"
    | "lt"
    | "lte"
    | "contains"
    | "startsWith"
    | "endsWith";
  value: unknown;
}

export interface CrudQuery {
  filters?: CrudFilter[];
  sortBy?: string;
  sortAsc?: boolean;
  limit?: number;
  offset?: number;
}

export interface CrudPending {
  _op: "create" | "update" | "delete";
  _ts: number;
  id: string;
  data?: Record<string, unknown>;
}

@Injectable({ providedIn: "root" })
export class CrudService {
  private storage = signal<StorageServiceInterface | null>(null);

  init(storage: StorageServiceInterface): void {
    this.storage.set(storage);
  }

  private getStorage(): StorageServiceInterface {
    const s = this.storage();
    if (!s) throw new Error("CrudService not initialized");
    return s;
  }

  private getCollection<T>(collection: string): T[] {
    const data = this.getStorage().get<T[]>(collection);
    return data || [];
  }

  private saveCollection<T>(collection: string, data: T[]): void {
    this.getStorage().set(collection, data);
  }

  create<T extends { id: string }>(collection: string, item: T): void {
    const data = this.getCollection<{ id: string }>(collection);
    const timestamp = Date.now();
    const entity = {
      ...item,
      created_at: timestamp,
      updated_at: timestamp,
    } as T;
    data.push(entity);
    this.saveCollection(collection, data);
    this.addPending({
      _op: "create",
      _ts: timestamp,
      id: entity.id,
    });
  }

  read<T>(collection: string, id: string): T | null {
    const data = this.getCollection<T>(collection);
    return (
      data.find((item: unknown) => (item as { id: string }).id === id) || null
    );
  }

  update<T extends { id: string }>(
    collection: string,
    id: string,
    changes: Partial<T>,
  ): void {
    const data = this.getCollection<T>(collection);
    const index = data.findIndex(
      (item: unknown) => (item as { id: string }).id === id,
    );
    if (index === -1) return;

    const timestamp = Date.now();
    const updated = {
      ...data[index],
      ...changes,
      updated_at: timestamp,
    } as T;
    data[index] = updated;
    this.saveCollection(collection, data);
    this.addPending({
      _op: "update",
      _ts: timestamp,
      id,
      data: changes as Record<string, unknown>,
    });
  }

  delete(collection: string, id: string): void {
    const data = this.getCollection<{ id: string }>(collection);
    const filtered = data.filter(
      (item: unknown) => (item as { id: string }).id !== id,
    );
    this.saveCollection(collection, filtered);
    this.addPending({
      _op: "delete",
      _ts: Date.now(),
      id,
    });
  }

  query<T>(collection: string, q: CrudQuery): T[] {
    let data = this.getCollection<T>(collection);

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

  private applyFilter<T>(data: T[], filter: CrudFilter): T[] {
    return data.filter((item: unknown) => {
      const value = (item as Record<string, unknown>)[filter.field];
      switch (filter.operator) {
        case "eq":
          return value === filter.value;
        case "ne":
          return value !== filter.value;
        case "gt":
          return (value as number) > (filter.value as number);
        case "gte":
          return (value as number) >= (filter.value as number);
        case "lt":
          return (value as number) < (filter.value as number);
        case "lte":
          return (value as number) <= (filter.value as number);
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

  private applySort<T>(data: T[], sortBy: string, asc: boolean): T[] {
    return [...data].sort((a: unknown, b: unknown) => {
      const aVal = (a as Record<string, unknown>)[sortBy];
      const bVal = (b as Record<string, unknown>)[sortBy];
      if (aVal == null) return 1;
      if (bVal == null) return -1;
      const cmp = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
      return asc ? cmp : -cmp;
    });
  }

  private addPending(op: CrudPending): void {
    const pending = this.getStorage().get<CrudPending[]>("_pending_ops") || [];
    pending.push(op);
    this.getStorage().set("_pending_ops", pending);
  }

  batchCreate<T extends { id: string }>(collection: string, items: T[]): void {
    const data = this.getCollection<T>(collection);
    const timestamp = Date.now();
    for (const item of items) {
      const entity = {
        ...item,
        created_at: timestamp,
        updated_at: timestamp,
      } as T;
      data.push(entity);
    }
    this.saveCollection(collection, data);
  }

  batchDelete(collection: string, ids: string[]): void {
    const data = this.getCollection<{ id: string }>(collection);
    const filtered = data.filter(
      (item: unknown) => !ids.includes((item as { id: string }).id),
    );
    this.saveCollection(collection, filtered);
  }
}
