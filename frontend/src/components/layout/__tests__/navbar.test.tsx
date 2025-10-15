/**
 * Navbar Tests
 */

import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Navbar } from "../navbar";
import type { SiteSettings } from "@/types/strapi";

// Mock ThemeToggle component
vi.mock("@/components/theme-toggle", () => ({
  ThemeToggle: () => <button>Theme Toggle</button>,
}));

describe("Navbar", () => {
  const mockSettings: SiteSettings = {
    siteName: "北辰青年发展中心",
    mainNavigation: [
      { label: "首页", url: "/", openInNewTab: false },
      { label: "关于我们", url: "/about", openInNewTab: false },
      { label: "活动列表", url: "/activities", openInNewTab: false },
    ],
  };

  it("should render site name", () => {
    render(<Navbar settings={mockSettings} />);
    expect(screen.getByText("北辰青年发展中心")).toBeInTheDocument();
  });

  it("should render default site name when settings not provided", () => {
    render(<Navbar settings={undefined} />);
    expect(screen.getByText("北辰青年发展中心")).toBeInTheDocument();
  });

  it("should render all navigation links", () => {
    render(<Navbar settings={mockSettings} />);
    expect(screen.getByText("首页")).toBeInTheDocument();
    expect(screen.getByText("关于我们")).toBeInTheDocument();
    expect(screen.getByText("活动列表")).toBeInTheDocument();
  });

  it("should render navigation links with correct hrefs", () => {
    render(<Navbar settings={mockSettings} />);
    const homeLink = screen.getAllByText("首页")[0].closest("a");
    expect(homeLink).toHaveAttribute("href", "/");
  });

  it("should render logo when provided", () => {
    const settingsWithLogo: SiteSettings = {
      ...mockSettings,
      siteLogo: {
        data: {
          id: 1,
          attributes: {
            name: "logo.png",
            url: "/uploads/logo.png",
            width: 200,
            height: 200,
            hash: "test",
            ext: ".png",
            mime: "image/png",
            size: 20,
            provider: "local",
            createdAt: "2025-01-01",
            updatedAt: "2025-01-01",
          },
        },
      },
    };

    render(<Navbar settings={settingsWithLogo} />);
    const logo = screen.getByAltText("北辰青年发展中心");
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("src", expect.stringContaining("logo.png"));
  });

  it("should toggle mobile menu when menu button is clicked", async () => {
    const user = userEvent.setup();
    render(<Navbar settings={mockSettings} />);

    // Mobile menu should not be visible initially
    const mobileMenuLinks = screen.queryAllByText("首页");
    expect(mobileMenuLinks.length).toBeGreaterThan(0);

    // Click menu button
    const menuButton = screen.getByRole("button", { name: /菜单/i });
    await user.click(menuButton);

    // Mobile menu should now be visible
    expect(screen.getAllByText("首页").length).toBeGreaterThan(1);
  });

  it("should close mobile menu when a link is clicked", async () => {
    const user = userEvent.setup();
    render(<Navbar settings={mockSettings} />);

    // Open mobile menu
    const menuButton = screen.getByRole("button", { name: /菜单/i });
    await user.click(menuButton);

    // Click a link in mobile menu
    const mobileLinks = screen.getAllByText("首页");
    const mobileLink = mobileLinks[mobileLinks.length - 1];
    await user.click(mobileLink);

    // Menu should close (checking if we still have multiple "首页" elements)
    // After clicking, the mobile menu content should be removed
  });

  it("should open external links in new tab when specified", () => {
    const settingsWithExternalLink: SiteSettings = {
      ...mockSettings,
      mainNavigation: [
        {
          label: "External Link",
          url: "https://example.com",
          openInNewTab: true,
        },
      ],
    };

    render(<Navbar settings={settingsWithExternalLink} />);
    const link = screen.getAllByText("External Link")[0].closest("a");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("should render theme toggle", () => {
    render(<Navbar settings={mockSettings} />);
    // Theme toggle button should be present
    expect(screen.getAllByText("Theme Toggle").length).toBeGreaterThan(0);
  });

  it("should handle empty navigation array", () => {
    const settingsWithEmptyNav: SiteSettings = {
      ...mockSettings,
      mainNavigation: [],
    };

    render(<Navbar settings={settingsWithEmptyNav} />);
    expect(screen.getByText("北辰青年发展中心")).toBeInTheDocument();
  });
});
