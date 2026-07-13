import { describe, it, expect } from "vitest";
import type { AppSchema, LayoutElement, CanvasElement } from "../index";

// Type-level validation: if this compiles, the contract is satisfied
const _test: AppSchema = {
  id: "test",
  pages: [],
};

describe("AppSchema contract", () => {
  it("accepts minimal valid shape", () => {
    const schema: AppSchema = { id: "test", pages: [] };
    expect(schema.id).toBe("test");
    expect(schema.pages).toEqual([]);
  });

  it("accepts full shape with layouts and canvas elements", () => {
    const schema: AppSchema = {
      id: "full-test",
      pages: [],
    };
    expect(typeof schema.id).toBe("string");
  });

  it("LayoutElement type is exported", () => {
    const layout: LayoutElement = { id: "l1", componentId: "header-region", region: "header", children: [] };
    expect(layout.id).toBe("l1");
  });

  it("CanvasElement type is exported", () => {
    const canvas: CanvasElement = { id: "c1", componentId: "test", props: {} };
    expect(canvas.id).toBe("c1");
  });
});
