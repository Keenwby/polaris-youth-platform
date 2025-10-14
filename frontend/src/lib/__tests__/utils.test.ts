import { describe, it, expect } from "vitest";
import { cn, formatDate } from "../utils";

describe("utils", () => {
  describe("cn", () => {
    it("should merge class names correctly", () => {
      const result = cn("px-2 py-1", "px-4");
      expect(result).toBe("py-1 px-4");
    });

    it("should handle conditional classes", () => {
      const result = cn("base-class", true && "conditional-class", false && "hidden");
      expect(result).toBe("base-class conditional-class");
    });

    it("should handle undefined and null", () => {
      const result = cn("base", undefined, null, "other");
      expect(result).toBe("base other");
    });

    it("should merge Tailwind classes with conflicts", () => {
      const result = cn("text-sm", "text-lg");
      expect(result).toBe("text-lg");
    });
  });

  describe("formatDate", () => {
    it("should format date string correctly", () => {
      const result = formatDate("2025-01-15");
      expect(result).toMatch(/2025/);
      expect(result).toMatch(/1/);
      // Date parsing might shift timezone, so we check for month instead
      expect(result).toMatch(/1月/);
    });

    it("should format Date object correctly", () => {
      const date = new Date("2025-01-15");
      const result = formatDate(date);
      expect(result).toMatch(/2025/);
    });

    it("should include weekday in Chinese format", () => {
      const result = formatDate("2025-01-15");
      // Should include weekday (星期)
      expect(result).toMatch(/星期/);
    });

    it("should use Chinese locale format", () => {
      const result = formatDate("2025-01-15");
      // Chinese format typically includes 年 or 月
      expect(result).toMatch(/年|月/);
    });
  });
});
