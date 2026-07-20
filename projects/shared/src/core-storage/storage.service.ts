import { Injectable, WritableSignal } from "@angular/core";
import { StorageMapService, QueryFilter } from "./storage-map.service";
import { StorageEntityService } from "./storage-entity.service";

@Injectable({ providedIn: "root" })
export class StorageService {
  constructor(
    private map: StorageMapService,
    private entities: StorageEntityService,
  ) {}

  /** Load entity data from backend, cache it, return reactive signal */
  async loadEntity<T>(
    entityName: string,
    invokeFn: () => Promise<T[]>,
  ): Promise<T[]> {
    const data = await this.map.getOrFetch(entityName, "default", invokeFn);
    this.entities.setEntities(entityName, data);
    return data;
  }

  /** Reactive watch — returns WritableSignal that auto-fetches if not cached */
  watch<T>(entityName: string, groupKey: string): WritableSignal<T[]> {
    return this.map.watch(entityName, groupKey);
  }

  /** Ensure data is loaded and cached */
  async ensure<T>(
    entityName: string,
    groupKey: string,
    fetchFn: () => Promise<T[]>,
  ): Promise<T[]> {
    return this.map.getOrFetch(entityName, groupKey, fetchFn);
  }

  /** Query cached data */
  query<T>(entityName: string, groupKey: string, filter: QueryFilter[]): T[] {
    return this.map.query<T>(entityName, groupKey, filter);
  }

  /** Sort cached data */
  sortBy<T>(
    entityName: string,
    groupKey: string,
    field: string,
    dir: "asc" | "desc" = "asc",
  ): T[] {
    return this.map.sortBy<T>(entityName, groupKey, field, dir);
  }

  /** Invalidate cache */
  invalidate(entityName: string, groupKey?: string): void {
    this.map.invalidate(entityName, groupKey);
  }

  /** Invalidate all caches */
  invalidateAll(): void {
    this.map.invalidateAll();
    this.entities.clearAll();
  }

  /** Upsert bulk into entity store */
  upsertBulk<T extends { id: string }>(entityName: string, items: T[]): void {
    const existing = this.entities.getAll<T>(entityName);
    const merged = this.entities.upsertEntityBulk(existing, items);
    this.entities.setEntities(entityName, merged);
  }

  /** Get entity from entity store */
  getEntity<T>(entityName: string, id: string): T | undefined {
    return this.entities.getEntity<T>(entityName, id);
  }

  /** Get all entities from store */
  getAll<T>(entityName: string): T[] {
    return this.entities.getAll<T>(entityName);
  }
}
