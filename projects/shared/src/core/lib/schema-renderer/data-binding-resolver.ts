import { Injectable } from "@angular/core";
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

@Injectable({ providedIn: "root" })
export class DataBindingResolverService {
  private _params: Record<string, string> = {};
  private _functions: Record<string, Function> = {};

  constructor(
    private signalStore: SignalStoreService,
    private crudService: CrudService,
  ) {}

  setParams(params: Record<string, string>): void {
    this._params = params;
  }

  registerFunction(name: string, fn: Function): void {
    this._functions[name] = fn;
  }

  registerFunctions(fns: Record<string, Function>): void {
    this._functions = { ...this._functions, ...fns };
  }

  resolveDataBinding(binding: unknown): unknown {
    if (typeof binding === "string") {
      // Resolve {{functions.name(args)}} pattern
      const fnPattern = /\{\{functions\.([^}]+)\}\}/g;
      const fnResult = binding.replace(fnPattern, (_, callExpr) => {
        const value = this.resolveFunctionCall(callExpr);
        return value !== undefined ? String(value) : binding;
      });
      if (fnResult !== binding) return fnResult;

      // Resolve {{params.*}} pattern
      const paramsPattern = /\{\{params\.([^}]+)\}\}/g;
      const paramsResult = binding.replace(paramsPattern, (_, path) => {
        const value = this.resolveParamsPath(path);
        return value !== undefined ? String(value) : binding;
      });
      if (paramsResult !== binding) return paramsResult;

      // Resolve {{data.*}} pattern
      const dataPattern = /\{\{data\.([^}]+)\}\}/g;
      const dataResult = binding.replace(dataPattern, (_, path) => {
        const value = this.getDataBindingValue(path);
        return value !== undefined ? String(value) : binding;
      });
      return dataResult;
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

  private resolveFunctionCall(callExpr: string): unknown {
    // Parse "name(arg1, arg2)" or "name(arg1, 'string', key: value)"
    const match = callExpr.match(/^(\w+)\((.*)\)$/);
    if (!match) {
      // No args — treat as property access on functions registry
      return this._functions[callExpr];
    }

    const [, fnName, argsStr] = match;
    const fn = this._functions[fnName];
    if (typeof fn !== "function") return undefined;

    const args = this.parseCallArgs(argsStr);
    // Resolve each argument (may contain nested bindings)
    const resolvedArgs = args.map((arg) => this.resolveDataBinding(arg));
    return fn(...resolvedArgs);
  }

  private parseCallArgs(argsStr: string): string[] {
    if (!argsStr.trim()) return [];
    const result: string[] = [];
    let current = "";
    let depth = 0;
    let inString = false;
    let stringChar = "";

    for (const char of argsStr) {
      if ((char === '"' || char === "'") && !inString) {
        inString = true;
        stringChar = char;
        current += char;
      } else if (char === stringChar && inString) {
        inString = false;
        stringChar = "";
        current += char;
      } else if (char === "(" && !inString) {
        depth++;
        current += char;
      } else if (char === ")" && !inString) {
        depth--;
        current += char;
      } else if (char === "," && depth === 0 && !inString) {
        result.push(current.trim());
        current = "";
      } else {
        current += char;
      }
    }

    if (current.trim()) result.push(current.trim());
    return result;
  }

  private resolveParamsPath(path: string): unknown {
    return this.getNestedValue(this._params, path);
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
