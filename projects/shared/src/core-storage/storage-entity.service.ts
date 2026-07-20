import { Injectable, WritableSignal, signal } from "@angular/core";

@Injectable({ providedIn: "root" })
export class StorageEntityService {
  // entityName -> id -> entity
  private entityMaps = new Map<string, Map<string, unknown>>();
  // entityName -> WritableSignal<any[]>
  private entitySignals = new Map<string, WritableSignal<unknown[]>>();

  registerEntity<T>(entityName: string): void {
    if (!this.entityMaps.has(entityName)) {
      this.entityMaps.set(entityName, new Map());
      this.entitySignals.set(
        entityName,
        signal([]) as WritableSignal<unknown[]>,
      );
    }
  }

  setEntities<T>(entityName: string, items: T[]): void {
    this.registerEntity(entityName);
    const map = this.entityMaps.get(entityName)!;
    map.clear();
    for (const item of items as unknown as Array<{ id: string }>) {
      map.set(item.id, item);
    }
    this.entitySignals.get(entityName)!.set(items as unknown[]);
  }

  getEntity<T>(entityName: string, id: string): T | undefined {
    return this.entityMaps.get(entityName)?.get(id) as T | undefined;
  }

  upsertEntity<T extends { id: string }>(entityName: string, item: T): void {
    this.registerEntity(entityName);
    const map = this.entityMaps.get(entityName)!;
    map.set(item.id, item);
    this.entitySignals.get(entityName)!.set([...map.values()]);
  }

  upsertBulk<T extends { id: string }>(entityName: string, items: T[]): void {
    this.registerEntity(entityName);
    const map = this.entityMaps.get(entityName)!;
    for (const item of items) map.set(item.id, item);
    this.entitySignals.get(entityName)!.set([...map.values()]);
  }

  /** Merge incoming items into existing array — updates matching ids, adds new ones */
  upsertEntityBulk<T extends { id: string }>(
    existing: T[],
    incoming: T[],
  ): T[] {
    const entityMap = new Map(existing.map((e) => [e.id, e]));
    for (const item of incoming) {
      const existing_item = entityMap.get(item.id);
      entityMap.set(
        item.id,
        existing_item ? { ...existing_item, ...item } : item,
      );
    }
    return [...entityMap.values()];
  }

  deleteEntity(entityName: string, id: string): void {
    const map = this.entityMaps.get(entityName);
    if (!map) return;
    map.delete(id);
    this.entitySignals.get(entityName)!.set([...map.values()]);
  }

  clearEntity(entityName: string): void {
    this.entityMaps.delete(entityName);
    const sig = this.entitySignals.get(entityName);
    if (sig) sig.set([]);
  }

  getSignal(entityName: string): WritableSignal<unknown[]> | undefined {
    return this.entitySignals.get(entityName);
  }

  getAll<T>(entityName: string): T[] {
    return [...(this.entityMaps.get(entityName)?.values() ?? [])] as T[];
  }

  clearAll(): void {
    this.entityMaps.clear();
    this.entitySignals.clear();
  }
}
