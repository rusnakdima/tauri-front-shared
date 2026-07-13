import { Injectable } from "@angular/core";
import { SignalStore, Signal } from "../core-storage/signal-store";

export interface BaseEntity {
  id: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface BaseServiceConfig {
  /** API endpoint name (e.g., 'scene', 'source', 'profile') */
  endpoint: string;
  /** Entity name for notifications (e.g., 'Scene', 'Source', 'Profile') */
  entityName: string;
  /** Default filter object for load operations */
  defaultFilter?: Record<string, unknown>;
  /** Whether to show success notifications on create/update/delete */
  showNotifications?: boolean;
  /** Custom error messages */
  errorMessages?: {
    load?: string;
    create?: string;
    update?: string;
    delete?: string;
  };
}

/** Minimal MainService interface for BaseCrudService */
export interface MainServiceForCrud {
  invoke<T>(cmd: string, args?: Record<string, unknown>): Promise<T>;
  getAll<T>(apiName: string, filter?: Record<string, unknown>): Promise<T>;
  get<T>(apiName: string, filter?: Record<string, unknown>): Promise<T>;
  create<T>(apiName: string, data: unknown): Promise<T>;
  update<T>(apiName: string, id: string, data: unknown): Promise<T>;
  patch<T>(apiName: string, id: string, data: unknown): Promise<T>;
  delete(apiName: string, id: string): Promise<void>;
}

/** Minimal StorageCacheService interface for BaseCrudService */
export interface StorageCacheServiceForCrud {
  isCacheValid(key: string, ttlMs?: number): boolean;
  getReactiveCache<T>(key: string): (() => T) | undefined;
  setCacheTimestamp(key: string, timestamp: number): void;
  invalidateCache(): void;
}

/** Minimal StorageQueryService interface for BaseCrudService */
export interface StorageQueryServiceForCrud {
  // Reserved for future use
}

@Injectable()
export abstract class BaseCrudService<T extends BaseEntity> {
  protected readonly config: BaseServiceConfig;
  protected readonly mainService: MainServiceForCrud;
  protected readonly cacheService: StorageCacheServiceForCrud;
  protected readonly queryService: StorageQueryServiceForCrud;

  protected readonly entitiesSignal: Signal<T[]>;
  protected readonly activeEntitySignal: Signal<T | null>;
  protected readonly activeEntityIdSignal: Signal<string | null>;

  /** Call as a function: entities() returns T[] */
  readonly entities: () => T[];
  readonly activeEntity: () => T | null;
  readonly activeEntityId: () => string | null;

  constructor(
    config: BaseServiceConfig,
    mainService: MainServiceForCrud,
    cacheService: StorageCacheServiceForCrud,
    queryService: StorageQueryServiceForCrud,
  ) {
    this.config = {
      showNotifications: true,
      defaultFilter: {},
      ...config,
    };
    this.mainService = mainService;
    this.cacheService = cacheService;
    this.queryService = queryService;

    const store = new SignalStore();
    this.entitiesSignal = store.signal<T[]>("entities", []);
    this.activeEntitySignal = store.signal<T | null>("activeEntity", null);
    this.activeEntityIdSignal = store.signal<string | null>(
      "activeEntityId",
      null,
    );

    this.entities = this.entitiesSignal;
    this.activeEntity = this.activeEntitySignal;
    this.activeEntityId = this.activeEntityIdSignal;
  }

  protected getEntityName(): string {
    return this.config.entityName.toLowerCase();
  }

  protected getEndpoint(): string {
    return this.config.endpoint;
  }

  async load(filter?: Record<string, unknown>): Promise<T[]> {
    const effectiveFilter = { ...this.config.defaultFilter, ...filter };
    const cacheKey = `${this.config.endpoint}_list`;
    if (this.cacheService.isCacheValid(cacheKey)) {
      const cached = this.cacheService.getReactiveCache<T[]>(cacheKey);
      if (cached) {
        return cached();
      }
    }
    try {
      const entities = await this.mainService.getAll<T[]>(
        this.config.endpoint,
        effectiveFilter,
      );
      this.setEntities(entities || []);
      this.cacheService.setCacheTimestamp(cacheKey, Date.now());
      return entities || [];
    } catch (error) {
      return [];
    }
  }

  async get(filter: Record<string, unknown>): Promise<T | null> {
    try {
      const entity = await this.mainService.get<T>(
        this.config.endpoint,
        filter,
      );
      return entity || null;
    } catch (error) {
      return null;
    }
  }

  async create(
    data: Omit<T, "id" | "createdAt" | "updatedAt">,
    _showSuccess?: boolean,
  ): Promise<T | null> {
    try {
      const entity = await this.mainService.create<T>(
        this.config.endpoint,
        data,
      );
      if (entity) {
        this.addEntity(entity);
        this.invalidateEndpointCache();
      }
      return entity || null;
    } catch (error) {
      return null;
    }
  }

  async update(
    id: string,
    updates: Partial<T>,
    _showSuccess?: boolean,
  ): Promise<T | null> {
    try {
      const entity = await this.mainService.update<T>(
        this.config.endpoint,
        id,
        updates,
      );
      if (entity) {
        this.updateEntity(entity);
        this.invalidateEndpointCache();
      }
      return entity || null;
    } catch (error) {
      return null;
    }
  }

  async patch(
    id: string,
    updates: Partial<T>,
    _showSuccess?: boolean,
  ): Promise<T | null> {
    try {
      const entity = await this.mainService.patch<T>(
        this.config.endpoint,
        id,
        updates,
      );
      if (entity) {
        this.updateEntity(entity);
        this.invalidateEndpointCache();
      }
      return entity || null;
    } catch (error) {
      return null;
    }
  }

  async delete(id: string, _showSuccess?: boolean): Promise<boolean> {
    try {
      await this.mainService.delete(this.config.endpoint, id);
      this.removeEntity(id);
      this.invalidateEndpointCache();
      if (this.activeEntityId() === id) {
        this.setActiveEntityId(null);
      }
      return true;
    } catch (error) {
      return false;
    }
  }

  setActiveEntityId(id: string | null): void {
    this.activeEntityIdSignal.set(id);
    if (id) {
      const entity = this.entities().find((e) => e.id === id) || null;
      this.setActiveEntity(entity);
    } else {
      this.setActiveEntity(null);
    }
  }

  private invalidateEndpointCache(): void {
    this.cacheService.invalidateCache();
  }

  protected setEntities(entities: T[]): void {
    this.entitiesSignal.set(entities);
  }

  protected addEntity(entity: T): void {
    this.entitiesSignal.update((current) => [...current, entity]);
  }

  protected updateEntity(entity: T): void {
    this.entitiesSignal.update((current) => {
      const index = current.findIndex((e) => e.id === entity.id);
      if (index !== -1) {
        const updated = [...current];
        updated[index] = entity;
        return updated;
      }
      return current;
    });
    if (this.activeEntity()?.id === entity.id) {
      this.setActiveEntity(entity);
    }
  }

  protected removeEntity(id: string): void {
    this.entitiesSignal.update((current) => current.filter((e) => e.id !== id));
  }

  protected setActiveEntity(entity: T | null): void {
    this.activeEntitySignal.set(entity);
  }

  public async updateOrder(items: T[]): Promise<void> {
    const data = items.map((item, index) => ({
      id: item.id,
      positionIndex: items.length - 1 - index,
    }));
    try {
      await this.mainService.invoke(`${this.config.endpoint}_update_order`, {
        data,
      });
      await this.load();
    } catch (error) {}
  }
}
