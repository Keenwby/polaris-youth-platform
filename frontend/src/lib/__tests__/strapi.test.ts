import { describe, it, expect } from "vitest";
import { getMediaUrl, extractAttributes, extractAttributesArray } from "../strapi";
import type { StrapiEntity } from "@/types";

describe("strapi helpers", () => {
  describe("getMediaUrl", () => {
    it("should return empty string for empty input", () => {
      expect(getMediaUrl("")).toBe("");
    });

    it("should return full URL unchanged", () => {
      const url = "https://example.com/image.jpg";
      expect(getMediaUrl(url)).toBe(url);
    });

    it("should prepend Strapi URL to relative path", () => {
      const relativePath = "/uploads/image.jpg";
      const result = getMediaUrl(relativePath);
      expect(result).toContain("/uploads/image.jpg");
      expect(result).toMatch(/^http/);
    });

    it("should handle paths starting with http", () => {
      const httpUrl = "http://example.com/image.jpg";
      expect(getMediaUrl(httpUrl)).toBe(httpUrl);
    });
  });

  describe("extractAttributes", () => {
    it("should extract attributes from Strapi entity", () => {
      const entity: StrapiEntity<{ title: string }> = {
        id: 1,
        attributes: {
          title: "Test",
          createdAt: "2025-01-01",
          updatedAt: "2025-01-01",
        },
      };
      const result = extractAttributes(entity);
      expect(result?.title).toBe("Test");
    });

    it("should return null for undefined entity", () => {
      const result = extractAttributes(undefined);
      expect(result).toBeNull();
    });

    it("should return null for null entity", () => {
      const result = extractAttributes(null);
      expect(result).toBeNull();
    });

    it("should handle complex attributes", () => {
      const entity: StrapiEntity<{ title: string; nested: { value: number } }> = {
        id: 1,
        attributes: {
          title: "Test",
          nested: { value: 42 },
          createdAt: "2025-01-01",
          updatedAt: "2025-01-01",
        },
      };
      const result = extractAttributes(entity);
      expect(result?.title).toBe("Test");
      expect(result?.nested.value).toBe(42);
    });
  });

  describe("extractAttributesArray", () => {
    it("should extract attributes from array of entities", () => {
      const entities: StrapiEntity<{ title: string }>[] = [
        { id: 1, attributes: { title: "First", createdAt: "2025-01-01", updatedAt: "2025-01-01" } },
        { id: 2, attributes: { title: "Second", createdAt: "2025-01-01", updatedAt: "2025-01-01" } },
      ];
      const result = extractAttributesArray(entities);
      expect(result[0]?.title).toBe("First");
      expect(result[1]?.title).toBe("Second");
    });

    it("should return empty array for undefined", () => {
      const result = extractAttributesArray(undefined);
      expect(result).toEqual([]);
    });

    it("should return empty array for null", () => {
      const result = extractAttributesArray(null);
      expect(result).toEqual([]);
    });

    it("should return empty array for non-array input", () => {
      const result = extractAttributesArray({} as any);
      expect(result).toEqual([]);
    });

    it("should handle empty array", () => {
      const result = extractAttributesArray([]);
      expect(result).toEqual([]);
    });
  });
});
