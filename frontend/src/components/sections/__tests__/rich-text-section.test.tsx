/**
 * Rich Text Section Tests
 */

import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { RichTextSection } from "../rich-text-section";
import type { SectionRichText } from "@/types/strapi";

describe("RichTextSection", () => {
  const mockSection: SectionRichText = {
    id: 1,
    __component: "sections.rich-text",
    content: "<p>这是一段富文本内容</p>",
    layout: "medium",
  };

  it("should render content", () => {
    render(<RichTextSection section={mockSection} />);
    expect(screen.getByText("这是一段富文本内容")).toBeInTheDocument();
  });

  it("should render with narrow layout", () => {
    const narrowSection: SectionRichText = {
      ...mockSection,
      layout: "narrow",
    };

    const { container } = render(<RichTextSection section={narrowSection} />);
    const contentDiv = container.querySelector(".max-w-3xl");
    expect(contentDiv).toBeInTheDocument();
  });

  it("should render with medium layout", () => {
    const { container } = render(<RichTextSection section={mockSection} />);
    const contentDiv = container.querySelector(".max-w-5xl");
    expect(contentDiv).toBeInTheDocument();
  });

  it("should render with wide layout", () => {
    const wideSection: SectionRichText = {
      ...mockSection,
      layout: "wide",
    };

    const { container } = render(<RichTextSection section={wideSection} />);
    const contentDiv = container.querySelector(".max-w-7xl");
    expect(contentDiv).toBeInTheDocument();
  });

  it("should render with full layout", () => {
    const fullSection: SectionRichText = {
      ...mockSection,
      layout: "full",
    };

    const { container } = render(<RichTextSection section={fullSection} />);
    const contentDiv = container.querySelector(".max-w-full");
    expect(contentDiv).toBeInTheDocument();
  });

  it("should render with custom background color", () => {
    const sectionWithBg: SectionRichText = {
      ...mockSection,
      backgroundColor: "#f0f0f0",
    };

    const { container } = render(<RichTextSection section={sectionWithBg} />);
    const section = container.querySelector("section");
    expect(section).toHaveStyle({ backgroundColor: "#f0f0f0" });
  });

  it("should render complex HTML content", () => {
    const complexSection: SectionRichText = {
      ...mockSection,
      content: "<h2>标题</h2><p>段落1</p><p>段落2</p><ul><li>列表项</li></ul>",
    };

    render(<RichTextSection section={complexSection} />);
    expect(screen.getByText("标题")).toBeInTheDocument();
    expect(screen.getByText("段落1")).toBeInTheDocument();
    expect(screen.getByText("段落2")).toBeInTheDocument();
    expect(screen.getByText("列表项")).toBeInTheDocument();
  });
});
