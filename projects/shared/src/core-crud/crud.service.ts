import { Injectable } from "@angular/core";
import { invoke } from "@tauri-apps/api/core";
import { CrudFilter, CrudQuery, CrudResult } from "./crud.types";

export type { CrudFilter, CrudQuery, CrudResult } from "./crud.types";

@Injectable({ providedIn: "root" })
export abstract class CrudService {
  abstract execute<T>(
    operation: string,
    entity: string,
    params?: Record<string, unknown>,
  ): Promise<T>;

  async find<T>(entity: string, id: string): Promise<T | null> {
    const result = await this.execute<{ data?: T }>("find", entity, {
      filter: { id },
    });
    return result.data ?? null;
  }

  async findAll<T>(entity: string, filter?: unknown): Promise<T[]> {
    const result = await this.execute<CrudResult<T>>("find", entity, {
      filter: filter as Record<string, unknown>,
    });
    return result.data ?? [];
  }

  async create<T>(entity: string, data: unknown): Promise<T> {
    const result = await this.execute<{ data: T }>("create", entity, { data });
    return result.data;
  }

  async update<T>(entity: string, id: string, data: unknown): Promise<T> {
    const result = await this.execute<{ data: T }>("update", entity, {
      id,
      data,
    });
    return result.data;
  }

  async patch<T>(entity: string, id: string, data: unknown): Promise<T> {
    const result = await this.execute<{ data: T }>("patch", entity, {
      id,
      data,
    });
    return result.data;
  }

  async delete(entity: string, id: string): Promise<void> {
    await this.execute("delete", entity, { id });
  }

  async count(entity: string): Promise<number> {
    const result = await this.execute<{ count: number }>("count", entity);
    return result.count;
  }

  async exists(entity: string, id: string): Promise<boolean> {
    const result = await this.execute<{ exists: boolean }>("exists", entity, {
      id,
    });
    return result.exists;
  }
}
