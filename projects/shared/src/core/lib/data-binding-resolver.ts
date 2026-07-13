import { Injectable, inject } from "@angular/core";
import type { DataBinding } from "./types";

@Injectable({ providedIn: "root" })
export class DataBindingExpressionResolver {
  private functionRegistry = new Map<string, Function>();
  private dataStore = new Map<string, Record<string, unknown>>();

  registerFunction(name: string, fn: Function): void {
    this.functionRegistry.set(name, fn);
  }

  unregisterFunction(name: string): void {
    this.functionRegistry.delete(name);
  }

  setData(entity: string, data: Record<string, unknown>): void {
    this.dataStore.set(entity, data);
  }

  getData(entity: string): Record<string, unknown> | undefined {
    return this.dataStore.get(entity);
  }

  clearData(entity?: string): void {
    if (entity) {
      this.dataStore.delete(entity);
    } else {
      this.dataStore.clear();
    }
  }

  resolveBinding(binding: DataBinding | null): unknown {
    if (!binding) return null;
    return this.resolve(binding.entity, binding.field ?? null);
  }

  resolveDataBinding(binding: DataBinding | null): unknown {
    return this.resolveBinding(binding);
  }

  resolve(entity: string, field: string | null): unknown {
    const data = this.dataStore.get(entity);
    if (!data) return null;

    if (!field) return data;

    // Support dot notation: "address.city"
    const parts = field.split(".");
    let value: unknown = data;

    for (const part of parts) {
      if (value && typeof value === "object" && part in value) {
        value = (value as Record<string, unknown>)[part];
      } else {
        return null;
      }
    }

    return value;
  }

  resolveExpression(expression: string): unknown {
    // Parse and evaluate simple expressions like {{ user.name }} or {{ users.length }}
    const templateRegex = /\{\{([^}]+)\}\}/g;
    let result = expression;
    let match;

    while ((match = templateRegex.exec(expression)) !== null) {
      const path = match[1].trim();
      const value = this.resolvePath(path);
      result = result.replace(match[0], String(value ?? ""));
    }

    return result;
  }

  private resolvePath(path: string): unknown {
    const parts = path.split(".");
    if (parts.length === 1) {
      // Check if it's a registered function
      if (this.functionRegistry.has(parts[0])) {
        return this.functionRegistry.get(parts[0])?.call(null);
      }
      // Otherwise check data store
      for (const data of this.dataStore.values()) {
        if (parts[0] in data) {
          return data[parts[0]];
        }
      }
      return null;
    }

    const entity = parts[0];
    const field = parts.slice(1).join(".");
    return this.resolve(entity, field);
  }

  evaluateCondition(condition: string): boolean {
    // Support simple conditions: "user.age > 18", "user.name == 'John'"
    const match = condition.match(/^(.+?)\s*(==|!=|>=|<=|>|<)\s*(.+)$/);
    if (!match) return false;

    const [, left, op, right] = match;
    const leftVal = this.resolveExpression(left.trim());
    const rightVal = this.resolveExpression(right.trim());

    switch (op) {
      case "==":
        return leftVal == rightVal;
      case "!=":
        return leftVal != rightVal;
      case ">":
        return Number(leftVal) > Number(rightVal);
      case "<":
        return Number(leftVal) < Number(rightVal);
      case ">=":
        return Number(leftVal) >= Number(rightVal);
      case "<=":
        return Number(leftVal) <= Number(rightVal);
      default:
        return false;
    }
  }

  callFunction(fnName: string, args: unknown[] = []): unknown {
    const fn = this.functionRegistry.get(fnName);
    if (!fn) {
      console.warn(
        `DataBindingExpressionResolver: Function "${fnName}" not found`,
      );
      return null;
    }
    return fn.apply(null, args);
  }

  getRegisteredFunctions(): string[] {
    return Array.from(this.functionRegistry.keys());
  }

  hasFunction(fnName: string): boolean {
    return this.functionRegistry.has(fnName);
  }
}
