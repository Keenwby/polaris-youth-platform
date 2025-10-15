/**
 * Feature Grid Section Tests
 */

import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { FeatureGridSection } from "../feature-grid-section";
import type { SectionFeatureGrid } from "@/types/strapi";

describe("FeatureGridSection", () => {
  const mockSection: SectionFeatureGrid = {
    id: 1,
    __component: "sections.feature-grid",
    features: [
      {
        id: 1,
        title: "人生学校",
        description: "系统性地探索人生方向",
      },
      {
        id: 2,
        title: "北辰生活",
        description: "建立有温度的社群",
      },
    ],
    columns: 3,
    layout: "grid",
  };

  it("should render all features", () => {
    render(<FeatureGridSection section={mockSection} />);
    expect(screen.getByText("人生学校")).toBeInTheDocument();
    expect(screen.getByText("北辰生活")).toBeInTheDocument();
  });

  it("should render section title when provided", () => {
    const sectionWithTitle: SectionFeatureGrid = {
      ...mockSection,
      title: "我们的特色",
    };

    render(<FeatureGridSection section={sectionWithTitle} />);
    expect(screen.getByText("我们的特色")).toBeInTheDocument();
  });

  it("should render section description when provided", () => {
    const sectionWithDescription: SectionFeatureGrid = {
      ...mockSection,
      description: "探索北辰青年发展中心的核心项目",
    };

    render(<FeatureGridSection section={sectionWithDescription} />);
    expect(screen.getByText("探索北辰青年发展中心的核心项目")).toBeInTheDocument();
  });

  it("should render feature images when provided", () => {
    const sectionWithImages: SectionFeatureGrid = {
      ...mockSection,
      features: [
        {
          id: 1,
          title: "Feature with Image",
          image: {
            data: {
              id: 1,
              attributes: {
                name: "feature.jpg",
                url: "/uploads/feature.jpg",
                width: 400,
                height: 300,
                hash: "test",
                ext: ".jpg",
                mime: "image/jpeg",
                size: 50,
                provider: "local",
                createdAt: "2025-01-01",
                updatedAt: "2025-01-01",
              },
            },
          },
        },
      ],
    };

    render(<FeatureGridSection section={sectionWithImages} />);
    const img = screen.getByAltText("Feature with Image");
    expect(img).toBeInTheDocument();
  });

  it("should render feature icons when provided", () => {
    const sectionWithIcons: SectionFeatureGrid = {
      ...mockSection,
      features: [
        {
          id: 1,
          title: "Feature with Icon",
          icon: "🎓",
        },
      ],
    };

    render(<FeatureGridSection section={sectionWithIcons} />);
    expect(screen.getByText("🎓")).toBeInTheDocument();
  });

  it("should render feature links when provided", () => {
    const sectionWithLinks: SectionFeatureGrid = {
      ...mockSection,
      features: [
        {
          id: 1,
          title: "Feature with Link",
          link: "/learn-more",
          linkText: "了解更多",
        },
      ],
    };

    render(<FeatureGridSection section={sectionWithLinks} />);
    const link = screen.getByText("了解更多");
    expect(link).toBeInTheDocument();
    expect(link.closest("a")).toHaveAttribute("href", "/learn-more");
  });

  it("should use default link text when not provided", () => {
    const sectionWithDefaultLinkText: SectionFeatureGrid = {
      ...mockSection,
      features: [
        {
          id: 1,
          title: "Feature",
          link: "/learn-more",
        },
      ],
    };

    render(<FeatureGridSection section={sectionWithDefaultLinkText} />);
    expect(screen.getByText("了解更多")).toBeInTheDocument();
  });

  it("should render in list layout when specified", () => {
    const listLayoutSection: SectionFeatureGrid = {
      ...mockSection,
      layout: "list",
    };

    const { container } = render(<FeatureGridSection section={listLayoutSection} />);
    const featuresContainer = container.querySelector(".flex.flex-col");
    expect(featuresContainer).toBeInTheDocument();
  });

  it("should handle empty features array", () => {
    const emptySection: SectionFeatureGrid = {
      ...mockSection,
      features: [],
    };

    const { container } = render(<FeatureGridSection section={emptySection} />);
    const cards = container.querySelectorAll('[class*="Card"]');
    expect(cards).toHaveLength(0);
  });
});
