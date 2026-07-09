import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class BindingEngine {
  private context: Record<string, unknown> = {};

  setContext(context: Record<string, unknown>): void {
    this.context = context;
  }

  resolveBinding(template: string, context: Record<string, unknown>): string {
    if (!template) return template;

    const bindingPattern = /\{\{([^}]+)\}\}/g;

    return template.replace(bindingPattern, (match, path) => {
      const trimmedPath = path.trim();
      const result = this.resolveValueFromPath(trimmedPath, context);
      return result !== undefined ? String(result) : match;
    });
  }

  resolveValue(value: unknown, context: Record<string, unknown>): unknown {
    if (typeof value !== "string") return value;

    const bindingPattern = /\{\{([^}]+)\}\}/g;
    if (!bindingPattern.test(value)) return value;

    return this.resolveBinding(value, context);
  }

  private resolveValueFromPath(
    path: string,
    context: Record<string, unknown>,
  ): unknown {
    const fnCallMatch = path.match(/^fn\(([^)]*)\)$/);
    if (fnCallMatch) {
      return this.resolveFunctionCall(fnCallMatch[1], context);
    }

    const dotPattern = /^(data|param|config|context)\.(.+)$/;
    const match = path.match(dotPattern);

    if (match) {
      const [, source, rest] = match;
      return this.getNestedValue(context[source], rest);
    }

    return this.getNestedValue(context, path);
  }

  private resolveFunctionCall(
    argsStr: string,
    context: Record<string, unknown>,
  ): unknown {
    const args = this.parseArgs(argsStr);
    const fnName = args[0];
    const fnArgs = args.slice(1);

    const fn = this.getFunction(fnName, context);
    if (typeof fn === "function") {
      const resolvedArgs = fnArgs.map((arg) => this.resolveValue(arg, context));
      return fn(...resolvedArgs);
    }

    return undefined;
  }

  private parseArgs(argsStr: string): string[] {
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

    if (current.trim()) {
      result.push(current.trim());
    }

    return result;
  }

  private getNestedValue(obj: unknown, path: string): unknown {
    const parts = path.split(".");
    let current: unknown = obj;

    for (const part of parts) {
      if (current === null || current === undefined) {
        return undefined;
      }
      if (typeof current === "object") {
        current = (current as Record<string, unknown>)[part];
      } else {
        return undefined;
      }
    }

    return current;
  }

  private getFunction(
    name: string,
    context: Record<string, unknown>,
  ): Function | undefined {
    const fnContext = context["fn"] as Record<string, Function> | undefined;
    if (fnContext && typeof fnContext[name] === "function") {
      return fnContext[name];
    }
    return undefined;
  }
}
