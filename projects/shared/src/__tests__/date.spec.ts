import { describe, it, expect } from "vitest";
import {
  convertLocalToUtc,
  convertUtcToLocal,
  normalizeDateFields,
  formatDateRelative,
  formatTime,
  formatLocaleDate,
  generateCalendarDays,
  isSameDay,
  compareByTimestamp,
  getLatestTimestamp,
} from "../utils/date";

describe("date utils", () => {
  describe("convertLocalToUtc", () => {
    it("converts local date to UTC", () => {
      const local = new Date(2024, 5, 15, 12, 30, 0); // June 15, 2024 12:30
      const utc = convertLocalToUtc(local);
      expect(utc.getUTCFullYear()).toBe(2024);
      expect(utc.getUTCMonth()).toBe(5); // June
      expect(utc.getUTCDate()).toBe(15);
    });
  });

  describe("convertUtcToLocal", () => {
    it("converts UTC date to local in a given timezone", () => {
      const utcDate = new Date("2024-06-15T12:00:00Z");
      const local = convertUtcToLocal(utcDate, "America/New_York");
      // The exact result depends on the test environment's offset
      expect(local).toBeInstanceOf(Date);
    });
  });

  describe("normalizeDateFields", () => {
    it("returns empty string for null date fields", () => {
      const input = { name: "test", start_date: null, end_date: null };
      const result = normalizeDateFields(input);
      expect(result["start_date"]).toBe("");
      expect(result["end_date"]).toBe("");
    });

    it("returns empty string for undefined date fields", () => {
      const input = { name: "test", start_date: undefined };
      const result = normalizeDateFields(input);
      expect(result["start_date"]).toBe("");
    });

    it("preserves non-date fields", () => {
      const input = { name: "test", start_date: null };
      const result = normalizeDateFields(input);
      expect(result["name"]).toBe("test");
    });

    it("uses default field names", () => {
      const input = { start_date: null };
      const result = normalizeDateFields(input);
      expect(result["start_date"]).toBe("");
    });

    it("uses custom field names", () => {
      const input = { created_at: null };
      const result = normalizeDateFields(input, ["created_at"]);
      expect(result["created_at"]).toBe("");
    });
  });

  describe("formatTime", () => {
    it("formats date object to HH:MM", () => {
      const date = new Date(2024, 5, 15, 9, 5);
      expect(formatTime(date)).toBe("09:05");
    });

    it("formats date object with single digit hour and minute", () => {
      const date = new Date(2024, 5, 15, 1, 1);
      expect(formatTime(date)).toBe("01:01");
    });

    it("handles string date input", () => {
      expect(formatTime("2024-06-15T14:30:00")).toBe("14:30");
    });
  });

  describe("formatLocaleDate", () => {
    it("formats date using locale date string", () => {
      const date = new Date(2024, 5, 15); // June 15, 2024
      const result = formatLocaleDate(date);
      expect(result).toContain("2024");
      expect(result).toContain("15");
    });

    it("handles empty string by returning current date", () => {
      const result = formatLocaleDate("");
      expect(result).toBeDefined();
      expect(typeof result).toBe("string");
    });

    it("handles string date input", () => {
      const result = formatLocaleDate("2024-06-15");
      expect(result).toContain("2024");
    });
  });

  describe("generateCalendarDays", () => {
    it("generates 42 days for a month", () => {
      const days = generateCalendarDays(2024, 5); // June 2024
      expect(days).toHaveLength(42);
    });

    it("starts from the Sunday before the first of the month", () => {
      const days = generateCalendarDays(2024, 5); // June 1, 2024 was a Saturday
      // June 1 - 6 days = May 26 (Sunday before)
      expect(days[0].getDate()).toBe(26); // May 26
      expect(days[0].getMonth()).toBe(4); // May
    });

    it("includes days from next month to fill 42 slots", () => {
      const days = generateCalendarDays(2024, 5); // June 2024
      // June has 30 days, starts Saturday, so we get 2 days from prev month
      // and need 42 - (30 + 2) = 10 days from July
      const lastDay = days[days.length - 1];
      expect(lastDay.getMonth()).toBe(6); // July
    });
  });

  describe("isSameDay", () => {
    it("returns true for same day", () => {
      const d1 = new Date(2024, 5, 15, 10, 30);
      const d2 = new Date(2024, 5, 15, 20, 45);
      expect(isSameDay(d1, d2)).toBe(true);
    });

    it("returns false for different days", () => {
      const d1 = new Date(2024, 5, 15);
      const d2 = new Date(2024, 5, 16);
      expect(isSameDay(d1, d2)).toBe(false);
    });

    it("returns false for same day different month", () => {
      const d1 = new Date(2024, 5, 15);
      const d2 = new Date(2024, 4, 15);
      expect(isSameDay(d1, d2)).toBe(false);
    });
  });

  describe("compareByTimestamp", () => {
    it("returns positive when b is newer (for descending sort)", () => {
      const a = { created_at: "2024-01-01T00:00:00Z" };
      const b = { created_at: "2024-01-02T00:00:00Z" };
      // Returns bTime - aTime, so positive when b is newer
      expect(compareByTimestamp(a, b)).toBeGreaterThan(0);
    });

    it("uses updated_at when newer than created_at", () => {
      const a = {
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-03T00:00:00Z",
      };
      const b = { created_at: "2024-01-02T00:00:00Z" };
      // a is newer due to updated_at, so result is negative (aTime > bTime)
      expect(compareByTimestamp(a, b)).toBeLessThan(0);
    });

    it("treats missing timestamps as epoch (0)", () => {
      const a = {};
      const b = { created_at: "2024-01-01T00:00:00Z" };
      // aTime = 0, bTime > 0, so bTime - aTime > 0
      expect(compareByTimestamp(a, b)).toBeGreaterThan(0);
    });
  });

  describe("getLatestTimestamp", () => {
    it("returns created_at when only created_at exists", () => {
      const entity = { created_at: "2024-06-15T10:00:00Z" };
      expect(getLatestTimestamp(entity)).toBe(
        new Date("2024-06-15T10:00:00Z").getTime(),
      );
    });

    it("returns max of created_at and updated_at", () => {
      const entity = {
        created_at: "2024-06-15T10:00:00Z",
        updated_at: "2024-06-16T10:00:00Z",
      };
      expect(getLatestTimestamp(entity)).toBe(
        new Date("2024-06-16T10:00:00Z").getTime(),
      );
    });

    it("returns 0 when neither exists", () => {
      expect(getLatestTimestamp({})).toBe(0);
    });
  });
});
