import { describe, it, expect } from "vitest";
import {
  clamp,
  lerp,
  isClose,
  calculateDistance3D,
  randomInt,
  randomChoice,
  randomRange,
  easeOutQuad,
  easeInOutQuad,
  weightedRandom,
} from "../utils/math";

describe("math utils", () => {
  describe("clamp", () => {
    it("returns value when within range", () => {
      expect(clamp(5, 0, 10)).toBe(5);
    });

    it("returns min when value is below range", () => {
      expect(clamp(-5, 0, 10)).toBe(0);
    });

    it("returns max when value is above range", () => {
      expect(clamp(15, 0, 10)).toBe(10);
    });

    it("handles negative ranges", () => {
      expect(clamp(0, -10, -5)).toBe(-5);
    });

    it("handles value equal to min", () => {
      expect(clamp(0, 0, 10)).toBe(0);
    });

    it("handles value equal to max", () => {
      expect(clamp(10, 0, 10)).toBe(10);
    });
  });

  describe("lerp", () => {
    it("returns start at t=0", () => {
      expect(lerp(0, 10, 0)).toBe(0);
    });

    it("returns end at t=1", () => {
      expect(lerp(0, 10, 1)).toBe(10);
    });

    it("returns midpoint at t=0.5", () => {
      expect(lerp(0, 10, 0.5)).toBe(5);
    });

    it("handles negative values", () => {
      expect(lerp(-10, 10, 0.5)).toBe(0);
    });
  });

  describe("isClose", () => {
    it("returns true when positions are within threshold", () => {
      const pos1 = { x: 0, z: 0 };
      const pos2 = { x: 1, z: 0 };
      expect(isClose(pos1, pos2, 2)).toBe(true);
    });

    it("returns false when positions are beyond threshold", () => {
      const pos1 = { x: 0, z: 0 };
      const pos2 = { x: 5, z: 0 };
      expect(isClose(pos1, pos2, 2)).toBe(false);
    });

    it("uses squared distance comparison", () => {
      // threshold of 2 means sqrt(dx*dx + dz*dz) < 2
      // So squared threshold is 4
      const pos1 = { x: 0, z: 0 };
      const pos2 = { x: 1.5, z: 1.5 }; // distance = sqrt(4.5) ≈ 2.12
      expect(isClose(pos1, pos2, 2)).toBe(false);
    });

    it("returns true for same position", () => {
      const pos = { x: 5, z: 5 };
      expect(isClose(pos, pos, 0.1)).toBe(true);
    });
  });

  describe("calculateDistance3D", () => {
    it("returns 0 for same position", () => {
      const pos = { x: 1, y: 2, z: 3 };
      expect(calculateDistance3D(pos, pos)).toBe(0);
    });

    it("calculates correct distance", () => {
      const pos1 = { x: 0, y: 0, z: 0 };
      const pos2 = { x: 3, y: 4, z: 0 };
      expect(calculateDistance3D(pos1, pos2)).toBe(5);
    });

    it("calculates correct 3D distance", () => {
      const pos1 = { x: 0, y: 0, z: 0 };
      const pos2 = { x: 1, y: 1, z: 1 };
      // sqrt(1 + 1 + 1) = sqrt(3) ≈ 1.732
      expect(calculateDistance3D(pos1, pos2)).toBeCloseTo(1.732, 3);
    });

    it("handles negative coordinates", () => {
      const pos1 = { x: -1, y: -1, z: -1 };
      const pos2 = { x: 1, y: 1, z: 1 };
      expect(calculateDistance3D(pos1, pos2)).toBeCloseTo(3.464, 3);
    });
  });

  describe("randomInt", () => {
    it("returns value within range", () => {
      for (let i = 0; i < 100; i++) {
        const result = randomInt(1, 10);
        expect(result).toBeGreaterThanOrEqual(1);
        expect(result).toBeLessThanOrEqual(10);
      }
    });

    it("can return min value", () => {
      let foundMin = false;
      for (let i = 0; i < 1000; i++) {
        if (randomInt(1, 10) === 1) foundMin = true;
      }
      expect(foundMin).toBe(true);
    });

    it("can return max value", () => {
      let foundMax = false;
      for (let i = 0; i < 1000; i++) {
        if (randomInt(1, 10) === 10) foundMax = true;
      }
      expect(foundMax).toBe(true);
    });
  });

  describe("randomChoice", () => {
    it("returns an element from the array", () => {
      const arr = ["a", "b", "c"];
      const result = randomChoice(arr);
      expect(arr).toContain(result);
    });

    it("returns only element from single-item array", () => {
      expect(randomChoice(["only"])).toBe("only");
    });

    it("handles different types", () => {
      const arr = [1, 2, 3];
      const result = randomChoice(arr);
      expect(typeof result).toBe("number");
    });
  });

  describe("randomRange", () => {
    it("returns value within range", () => {
      for (let i = 0; i < 100; i++) {
        const result = randomRange(1.5, 10.5);
        expect(result).toBeGreaterThanOrEqual(1.5);
        expect(result).toBeLessThan(10.5);
      }
    });
  });

  describe("easeOutQuad", () => {
    it("returns 0 at t=0", () => {
      expect(easeOutQuad(0)).toBe(0);
    });

    it("returns 1 at t=1", () => {
      expect(easeOutQuad(1)).toBe(1);
    });

    it("returns 0.75 at t=0.5", () => {
      expect(easeOutQuad(0.5)).toBe(0.75);
    });
  });

  describe("easeInOutQuad", () => {
    it("returns 0 at t=0", () => {
      expect(easeInOutQuad(0)).toBe(0);
    });

    it("returns 1 at t=1", () => {
      expect(easeInOutQuad(1)).toBe(1);
    });

    it("returns 0.5 at t=0.5", () => {
      expect(easeInOutQuad(0.5)).toBe(0.5);
    });
  });

  describe("weightedRandom", () => {
    it("returns one of the items", () => {
      const items = [
        { item: "a", weight: 1 },
        { item: "b", weight: 1 },
      ];
      const result = weightedRandom(items);
      expect(["a", "b"]).toContain(result);
    });

    it("respects weights over many iterations", () => {
      const items = [
        { item: "a", weight: 9 },
        { item: "b", weight: 1 },
      ];
      let countA = 0;
      const iterations = 1000;
      for (let i = 0; i < iterations; i++) {
        if (weightedRandom(items) === "a") countA++;
      }
      // a should appear roughly 90% of the time
      expect(countA).toBeGreaterThan(700);
      expect(countA).toBeLessThan(990);
    });

    it("returns last item when random is exactly 0", () => {
      const items = [{ item: "only", weight: 1 }];
      expect(weightedRandom(items)).toBe("only");
    });
  });
});
