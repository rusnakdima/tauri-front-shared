import { CrudFilter } from "../crud/crud.service";

export interface DataBinding {
  entity: string;
  field?: string;
  path?: string;
  operation?: "find" | "create" | "update" | "delete";
  params?: Record<string, unknown>;
}

export interface CrudQuery {
  filters?: CrudFilter[];
  sortBy?: string;
  sortAsc?: boolean;
  limit?: number;
  offset?: number;
}

import { CrudService } from "../crud/crud.service";
import { SignalStoreService } from "../signal-store/signal-store.service";

export class DataBindingResolverService {
  constructor(
    private signalStore: SignalStoreService,
    private crudService: CrudService,
  ) {}

  resolveDataBinding(binding: unknown): unknown {
    if (typeof binding === "string") {
      const pattern = /\{\{data\.([^}]+)\}\}/g;
      const result = binding.replace(pattern, (_, path) => {
        const value = this.getDataBindingValue(path);
        return value !== undefined ? String(value) : binding;
      });
      return result;
    }

    if (binding && typeof binding === "object" && "entity" in binding) {
      const db = binding as DataBinding;
      if (db.operation) {
        return this.executeCrudOperation(db);
      }
      const entityValue = this.signalStore.get(db.entity);
      if (db.field !== undefined) {
        return this.getNestedValue(entityValue, db.field);
      }
      return entityValue;
    }

    return binding;
  }

  resolveProps(
    props: Record<string, unknown>,
    _componentId: string,
  ): Record<string, unknown> {
    const resolved: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(props)) {
      resolved[key] = this.resolveDataBinding(value);
    }
    return resolved;
  }

  private executeCrudOperation(binding: DataBinding): unknown {
    const { entity, operation, params } = binding;
    const resolvedParams = this.resolveParams(params || {});

    switch (operation) {
      case "find": {
        const query = this.buildCrudQuery(resolvedParams);
        return this.crudService.query(entity, query);
      }
      case "create": {
        const item = resolvedParams as { id: string };
        this.crudService.create(entity, item);
        return;
      }
      case "update": {
        const id = (params as Record<string, unknown>)["id"] as string;
        this.crudService.update(entity, id, resolvedParams);
        return;
      }
      case "delete": {
        const id = (params as Record<string, unknown>)["id"] as string;
        this.crudService.delete(entity, id);
        return;
      }
      default:
        return this.signalStore.get(entity);
    }
  }

  private resolveParams(params: Record<string, unknown>): Record<string, unknown> {
    const resolved: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(params)) {
      resolved[key] = this.resolveDataBinding(value);
    }
    return resolved;
  }

  private buildCrudQuery(params: Record<string, unknown>): CrudQuery {
    const query: CrudQuery = {};
    if (params["filter"]) {
      query.filters = this.buildFilters(
        params["filter"] as Record<string, unknown>,
      );
    }
    if (params["sortBy"]) {
      query.sortBy = params["sortBy"] as string;
      query.sortAsc = params["sortAsc"] !== false;
    }
    if (params["limit"]) {
      query.limit = params["limit"] as number;
    }
    if (params["offset"]) {
      query.offset = params["offset"] as number;
    }
    return query;
  }

  private buildFilters(
    filterObj: Record<string, unknown>,
  ): CrudFilter[] {
    const filters: CrudFilter[] = [];
    for (const [field, value] of Object.entries(filterObj)) {
      filters.push({ field, operator: "eq", value });
    }
    return filters;
  }

  private getDataBindingValue(path: string): unknown {
    const parts = this.parseBindingPath(path);
    let current: unknown = this.signalStore.get(parts[0]);

    for (let i = 1; i < parts.length; i++) {
      if (current === null || current === undefined) return undefined;

      const part = parts[i];
      const arrayMatch = part.match(/^(\w+)\[(\d+)\]$/);

      if (arrayMatch) {
        const [, arrayKey, indexStr] = arrayMatch;
        const arr = this.getNestedValue(current, arrayKey);
        if (Array.isArray(arr)) {
          const index = parseInt(indexStr, 10);
          current = arr[index];
        } else {
          current = undefined;
        }
      } else {
        current = this.getNestedValue(current, part);
      }
    }

    return current;
  }

  private parseBindingPath(path: string): string[] {
    const result: string[] = [];
    const regex = /([^\.]+)\[(\d+)\]|([^\.\[\]]+)/g;
    let match;

    while ((match = regex.exec(path)) !== null) {
      if (match[1] && match[2]) {
        result.push(`${match[1]}[${match[2]}]`);
      } else if (match[3]) {
        result.push(match[3]);
      }
    }

    return result;
  }

  private getNestedValue(obj: unknown, key: string): unknown {
    if (obj === null || obj === undefined) return undefined;
    if (typeof obj !== "object") return undefined;
    return (obj as Record<string, unknown>)[key];
  }
}
