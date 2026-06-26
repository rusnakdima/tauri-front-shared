import { invoke } from "@tauri-apps/api/core";

export interface CrudFilter {
  field: string;
  operator: "eq" | "ne" | "gt" | "gte" | "lt" | "lte" | "contains" | "in";
  value: unknown;
}

export interface CrudQuery {
  filter?: CrudFilter[];
  sort?: { field: string; direction: "asc" | "desc" };
  limit?: number;
  offset?: number;
}

export interface CrudResult<T> {
  data: T[];
  total: number;
}

export class CrudService {
  constructor(private entityName: string) {}

  async execute<T>(
    operation: "find" | "create" | "update" | "delete",
    params?: Record<string, unknown>,
  ): Promise<{ data?: T; results?: CrudResult<T> }> {
    return invoke(`crud_${operation}`, {
      entity: this.entityName,
      ...params,
    });
  }

  async find<T>(query?: CrudQuery): Promise<CrudResult<T>> {
    const result = await this.execute<T>("find", { query });
    return result.results ?? { data: [], total: 0 };
  }

  async create<T>(data: Partial<T>): Promise<T> {
    const result = await this.execute<T>("create", { data });
    return result.data as T;
  }

  async update<T>(id: string, data: Partial<T>): Promise<T> {
    const result = await this.execute<T>("update", { id, data });
    return result.data as T;
  }

  async delete(id: string): Promise<void> {
    await this.execute("delete", { id });
  }
}
