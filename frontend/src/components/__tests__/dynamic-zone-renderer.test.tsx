/**
 * Dynamic Zone Renderer Tests
 */

import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { DynamicZoneRenderer } from "../dynamic-zone-renderer";
import type { DynamicZoneSection } from "@/types/strapi";

describe("DynamicZoneRenderer", () => {
  it("should render nothing when sections array is empty", () => {
    const { container } = render(<DynamicZoneRenderer sections={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it("should render hero section", () => {
    const sections: DynamicZoneSection[] = [
      {
        id: 1,
        __component: "sections.hero",
        title: "Test Hero Title",
        alignment: "center",
        height: "large",
      },
    ];

    render(<DynamicZoneRenderer sections={sections} />);
    expect(screen.getByText("Test Hero Title")).toBeInTheDocument();
  });

  it("should render rich text section", () => {
    const sections: DynamicZoneSection[] = [
      {
        id: 2,
        __component: "sections.rich-text",
        content: "<p>Test rich text content</p>",
        layout: "medium",
      },
    ];

    render(<DynamicZoneRenderer sections={sections} />);
    expect(screen.getByText("Test rich text content")).toBeInTheDocument();
  });

  it("should render feature grid section", () => {
    const sections: DynamicZoneSection[] = [
      {
        id: 3,
        __component: "sections.feature-grid",
        title: "Features Title",
        features: [
          {
            id: 1,
            title: "Feature 1",
            description: "Feature 1 description",
          },
        ],
        columns: 3,
        layout: "grid",
      },
    ];

    render(<DynamicZoneRenderer sections={sections} />);
    expect(screen.getByText("Features Title")).toBeInTheDocument();
    expect(screen.getByText("Feature 1")).toBeInTheDocument();
  });

  it("should render image gallery section", () => {
    const sections: DynamicZoneSection[] = [
      {
        id: 4,
        __component: "sections.image-gallery",
        title: "Gallery Title",
        images: {
          data: [
            {
              id: 1,
              attributes: {
                name: "test.jpg",
                url: "/uploads/test.jpg",
                width: 800,
                height: 600,
                hash: "test",
                ext: ".jpg",
                mime: "image/jpeg",
                size: 100,
                provider: "local",
                createdAt: "2025-01-01",
                updatedAt: "2025-01-01",
              },
            },
          ],
        },
        layout: "grid",
        columns: 3,
        aspectRatio: "square",
      },
    ];

    render(<DynamicZoneRenderer sections={sections} />);
    expect(screen.getByText("Gallery Title")).toBeInTheDocument();
  });

  it("should render multiple sections in order", () => {
    const sections: DynamicZoneSection[] = [
      {
        id: 1,
        __component: "sections.hero",
        title: "Hero Section",
        alignment: "center",
        height: "large",
      },
      {
        id: 2,
        __component: "sections.rich-text",
        content: "<p>Rich Text Section</p>",
        layout: "medium",
      },
    ];

    const { container } = render(<DynamicZoneRenderer sections={sections} />);
    const sections_rendered = container.querySelectorAll("section");
    expect(sections_rendered).toHaveLength(2);
  });

  it("should handle unknown component types gracefully", () => {
    const sections: DynamicZoneSection[] = [
      {
        id: 1,
        __component: "sections.unknown" as any,
        title: "Unknown",
      } as any,
    ];

    const { container } = render(<DynamicZoneRenderer sections={sections} />);
    // Should render without crashing, but section should not be rendered
    expect(container.querySelector("section")).toBeNull();
  });
});
