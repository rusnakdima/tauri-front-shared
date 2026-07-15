import { describe, it, expect, beforeEach } from "vitest";
import { PermissionEvaluator } from "../core/lib/rbac/permission-evaluator";

describe("PermissionEvaluator", () => {
  let evaluator: PermissionEvaluator;

  beforeEach(() => {
    evaluator = new PermissionEvaluator();
  });

  describe("addRule and evaluate", () => {
    it("allows when rule effect is allow", () => {
      evaluator.addRule({
        resource: "document",
        action: "read",
        effect: "allow",
      });

      expect(evaluator.evaluate("document", "read")).toBe(true);
    });

    it("denies when rule effect is deny", () => {
      evaluator.addRule({
        resource: "document",
        action: "delete",
        effect: "deny",
      });

      expect(evaluator.evaluate("document", "delete")).toBe(false);
    });

    it("denies when no matching rule exists", () => {
      evaluator.addRule({
        resource: "document",
        action: "read",
        effect: "allow",
      });

      expect(evaluator.evaluate("document", "write")).toBe(false);
    });

    it("denies when no rules added", () => {
      expect(evaluator.evaluate("any", "any")).toBe(false);
    });

    it("matches on both resource and action", () => {
      evaluator.addRule({
        resource: "document",
        action: "read",
        effect: "allow",
      });

      expect(evaluator.evaluate("document", "read")).toBe(true);
      expect(evaluator.evaluate("document", "write")).toBe(false);
      expect(evaluator.evaluate("file", "read")).toBe(false);
    });

    it("evaluates conditions when present and matched", () => {
      evaluator.addRule({
        resource: "document",
        action: "write",
        effect: "allow",
        conditions: { role: "admin" },
      });

      expect(evaluator.evaluate("document", "write", { role: "admin" })).toBe(
        true,
      );
      expect(evaluator.evaluate("document", "write", { role: "user" })).toBe(
        false,
      );
    });

    it("evaluates multiple conditions (all must match)", () => {
      evaluator.addRule({
        resource: "document",
        action: "delete",
        effect: "allow",
        conditions: { role: "admin", confirmed: true },
      });

      expect(
        evaluator.evaluate("document", "delete", {
          role: "admin",
          confirmed: true,
        }),
      ).toBe(true);
      expect(
        evaluator.evaluate("document", "delete", {
          role: "admin",
          confirmed: false,
        }),
      ).toBe(false);
    });

    it("rule without conditions takes effect even if context provided", () => {
      evaluator.addRule({
        resource: "document",
        action: "read",
        effect: "allow",
      });

      expect(evaluator.evaluate("document", "read", { any: "context" })).toBe(
        true,
      );
    });

    it("evaluates first matching rule with conditions", () => {
      // This tests that if a rule with conditions doesn't match,
      // it continues to check other rules
      evaluator.addRule({
        resource: "document",
        action: "write",
        effect: "deny",
        conditions: { role: "admin" },
      });
      evaluator.addRule({
        resource: "document",
        action: "write",
        effect: "allow",
      });

      expect(evaluator.evaluate("document", "write", { role: "user" })).toBe(
        true,
      );
    });
  });

  describe("clear", () => {
    it("removes all rules", () => {
      evaluator.addRule({
        resource: "document",
        action: "read",
        effect: "allow",
      });

      evaluator.clear();

      expect(evaluator.evaluate("document", "read")).toBe(false);
    });
  });

  describe("multiple rules", () => {
    it("handles multiple rules for same resource/action", () => {
      evaluator.addRule({
        resource: "document",
        action: "read",
        effect: "deny",
      });
      evaluator.addRule({
        resource: "document",
        action: "read",
        effect: "allow",
      });

      // First matching rule (deny) is evaluated, so returns false
      expect(evaluator.evaluate("document", "read")).toBe(false);
    });

    it("processes rules in order of addition", () => {
      evaluator.addRule({
        resource: "file",
        action: "*",
        effect: "deny",
      });
      evaluator.addRule({
        resource: "file",
        action: "read",
        effect: "allow",
      });

      expect(evaluator.evaluate("file", "read")).toBe(true);
      expect(evaluator.evaluate("file", "write")).toBe(false);
    });
  });
});
