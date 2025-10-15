/**
 * Footer Tests
 */

import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Footer } from "../footer";
import type { LayoutFooter } from "@/types/strapi";

describe("Footer", () => {
  const mockFooter: LayoutFooter = {
    id: 1,
    copyrightText: "© 2025 北辰青年发展中心. All rights reserved.",
    links: [
      { label: "关于我们", url: "/about", openInNewTab: false },
      { label: "活动列表", url: "/activities", openInNewTab: false },
    ],
    socialLinks: [
      { name: "微信公众号", url: "https://weixin.qq.com", icon: "📱" },
      { name: "微博", url: "https://weibo.com", icon: "🐦" },
    ],
  };

  it("should render copyright text", () => {
    render(<Footer footer={mockFooter} />);
    expect(
      screen.getByText("© 2025 北辰青年发展中心. All rights reserved.")
    ).toBeInTheDocument();
  });

  it("should render all footer links", () => {
    render(<Footer footer={mockFooter} />);
    expect(screen.getByText("关于我们")).toBeInTheDocument();
    expect(screen.getByText("活动列表")).toBeInTheDocument();
  });

  it("should render footer links with correct hrefs", () => {
    render(<Footer footer={mockFooter} />);
    const aboutLink = screen.getByText("关于我们").closest("a");
    const activitiesLink = screen.getByText("活动列表").closest("a");

    expect(aboutLink).toHaveAttribute("href", "/about");
    expect(activitiesLink).toHaveAttribute("href", "/activities");
  });

  it("should render social links", () => {
    render(<Footer footer={mockFooter} />);
    expect(screen.getByText("微信公众号")).toBeInTheDocument();
    expect(screen.getByText("微博")).toBeInTheDocument();
  });

  it("should render social link icons", () => {
    render(<Footer footer={mockFooter} />);
    expect(screen.getByText("📱")).toBeInTheDocument();
    expect(screen.getByText("🐦")).toBeInTheDocument();
  });

  it("should open social links in new tab", () => {
    render(<Footer footer={mockFooter} />);
    const wechatLink = screen.getByText("微信公众号").closest("a");
    expect(wechatLink).toHaveAttribute("target", "_blank");
    expect(wechatLink).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("should render additional info when provided", () => {
    const footerWithInfo: LayoutFooter = {
      ...mockFooter,
      additionalInfo: "<p>我们致力于青年发展</p>",
    };

    render(<Footer footer={footerWithInfo} />);
    expect(screen.getByText("我们致力于青年发展")).toBeInTheDocument();
  });

  it("should not render when footer prop is undefined", () => {
    const { container } = render(<Footer footer={undefined} />);
    expect(container.firstChild).toBeNull();
  });

  it("should handle empty links array", () => {
    const footerWithEmptyLinks: LayoutFooter = {
      ...mockFooter,
      links: [],
    };

    render(<Footer footer={footerWithEmptyLinks} />);
    expect(screen.getByText("© 2025 北辰青年发展中心. All rights reserved.")).toBeInTheDocument();
  });

  it("should open external links in new tab when specified", () => {
    const footerWithExternalLink: LayoutFooter = {
      ...mockFooter,
      links: [
        {
          label: "External Link",
          url: "https://example.com",
          openInNewTab: true,
        },
      ],
    };

    render(<Footer footer={footerWithExternalLink} />);
    const link = screen.getByText("External Link").closest("a");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });
});
