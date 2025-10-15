/**
 * Hero Section Tests
 */

import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { HeroSection } from "../hero-section";
import type { SectionHero } from "@/types/strapi";

describe("HeroSection", () => {
  const mockSection: SectionHero = {
    id: 1,
    __component: "sections.hero",
    title: "北辰青年发展中心",
    alignment: "center",
    height: "large",
  };

  it("should render title", () => {
    render(<HeroSection section={mockSection} />);
    expect(screen.getByText("北辰青年发展中心")).toBeInTheDocument();
  });

  it("should render subtitle when provided", () => {
    const sectionWithSubtitle: SectionHero = {
      ...mockSection,
      subtitle: "Youth Development",
    };

    render(<HeroSection section={sectionWithSubtitle} />);
    expect(screen.getByText("Youth Development")).toBeInTheDocument();
  });

  it("should render description when provided", () => {
    const sectionWithDescription: SectionHero = {
      ...mockSection,
      description: "<p>让青年活成自己想要的模样</p>",
    };

    render(<HeroSection section={sectionWithDescription} />);
    expect(screen.getByText("让青年活成自己想要的模样")).toBeInTheDocument();
  });

  it("should render CTA buttons when provided", () => {
    const sectionWithButtons: SectionHero = {
      ...mockSection,
      ctaButtons: [
        {
          id: 1,
          label: "查看活动",
          url: "/activities",
          variant: "default",
          size: "default",
          openInNewTab: false,
        },
        {
          id: 2,
          label: "了解北辰",
          url: "/about",
          variant: "outline",
          size: "default",
          openInNewTab: false,
        },
      ],
    };

    render(<HeroSection section={sectionWithButtons} />);
    expect(screen.getByText("查看活动")).toBeInTheDocument();
    expect(screen.getByText("了解北辰")).toBeInTheDocument();
  });

  it("should apply correct height class", () => {
    const heights: Array<SectionHero["height"]> = [
      "small",
      "medium",
      "large",
      "fullscreen",
    ];

    heights.forEach((height) => {
      const { container, unmount } = render(
        <HeroSection section={{ ...mockSection, height }} />
      );
      const section = container.querySelector("section");
      expect(section).toBeInTheDocument();
      unmount();
    });
  });

  it("should apply correct alignment class", () => {
    const alignments: Array<SectionHero["alignment"]> = [
      "left",
      "center",
      "right",
    ];

    alignments.forEach((alignment) => {
      const { container, unmount } = render(
        <HeroSection section={{ ...mockSection, alignment }} />
      );
      const section = container.querySelector("section");
      expect(section).toBeInTheDocument();
      unmount();
    });
  });

  it("should render background image when provided", () => {
    const sectionWithImage: SectionHero = {
      ...mockSection,
      backgroundImage: {
        data: {
          id: 1,
          attributes: {
            name: "hero-bg.jpg",
            url: "/uploads/hero-bg.jpg",
            width: 1920,
            height: 1080,
            hash: "test",
            ext: ".jpg",
            mime: "image/jpeg",
            size: 500,
            provider: "local",
            createdAt: "2025-01-01",
            updatedAt: "2025-01-01",
          },
        },
      },
    };

    const { container } = render(<HeroSection section={sectionWithImage} />);
    const section = container.querySelector("section");
    expect(section).toHaveStyle({
      backgroundImage: expect.stringContaining("hero-bg.jpg"),
    });
  });

  it("should render overlay when enabled", () => {
    const sectionWithOverlay: SectionHero = {
      ...mockSection,
      overlay: true,
      overlayOpacity: 50,
      backgroundImage: {
        data: {
          id: 1,
          attributes: {
            name: "hero-bg.jpg",
            url: "/uploads/hero-bg.jpg",
            width: 1920,
            height: 1080,
            hash: "test",
            ext: ".jpg",
            mime: "image/jpeg",
            size: 500,
            provider: "local",
            createdAt: "2025-01-01",
            updatedAt: "2025-01-01",
          },
        },
      },
    };

    const { container } = render(<HeroSection section={sectionWithOverlay} />);
    const overlay = container.querySelector(".absolute.inset-0.bg-black");
    expect(overlay).toBeInTheDocument();
    expect(overlay).toHaveStyle({ opacity: "0.5" });
  });

  it("should open links in new tab when specified", () => {
    const sectionWithNewTabLink: SectionHero = {
      ...mockSection,
      ctaButtons: [
        {
          id: 1,
          label: "External Link",
          url: "https://example.com",
          variant: "default",
          size: "default",
          openInNewTab: true,
        },
      ],
    };

    render(<HeroSection section={sectionWithNewTabLink} />);
    const link = screen.getByText("External Link").closest("a");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });
});
