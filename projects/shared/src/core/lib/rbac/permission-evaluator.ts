export interface PermissionRule {
  resource: string;
  action: string;
  effect: "allow" | "deny";
  conditions?: Record<string, unknown>;
}

export class PermissionEvaluator {
  private rules: PermissionRule[] = [];

  addRule(rule: PermissionRule): void {
    this.rules.push(rule);
  }

  evaluate(
    resource: string,
    action: string,
    context?: Record<string, unknown>,
  ): boolean {
    const matchingRules = this.rules.filter(
      (r) => r.resource === resource && r.action === action,
    );

    for (const rule of matchingRules) {
      if (rule.conditions && context) {
        const conditionsMet = this.evaluateConditions(rule.conditions, context);
        if (conditionsMet) {
          return rule.effect === "allow";
        }
      } else if (!rule.conditions) {
        return rule.effect === "allow";
      }
    }

    return false;
  }

  clear(): void {
    this.rules = [];
  }

  private evaluateConditions(
    conditions: Record<string, unknown>,
    context: Record<string, unknown>,
  ): boolean {
    for (const [key, expected] of Object.entries(conditions)) {
      if (context[key] !== expected) {
        return false;
      }
    }
    return true;
  }
}
