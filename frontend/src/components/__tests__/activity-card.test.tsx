/**
 * Activity Card Tests
 */

import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ActivityCard } from "../activity-card";
import type { Activity } from "@/types/strapi";

describe("ActivityCard", () => {
  const mockActivity: Activity = {
    title: "青年领导力工作坊",
    slug: "youth-leadership-workshop",
    description: "提升领导力和沟通能力",
    category: "workshop",
    startDate: "2025-01-15T14:00:00.000Z",
    location: "北京·朝阳区创业大街",
    featured: false,
  };

  it("should render activity title", () => {
    render(<ActivityCard activity={mockActivity} />);
    expect(screen.getByText("青年领导力工作坊")).toBeInTheDocument();
  });

  it("should render activity description", () => {
    render(<ActivityCard activity={mockActivity} />);
    expect(screen.getByText("提升领导力和沟通能力")).toBeInTheDocument();
  });

  it("should render category badge with correct label", () => {
    render(<ActivityCard activity={mockActivity} />);
    expect(screen.getByText("工作坊")).toBeInTheDocument();
  });

  it("should render location", () => {
    render(<ActivityCard activity={mockActivity} />);
    expect(screen.getByText("北京·朝阳区创业大街")).toBeInTheDocument();
  });

  it("should render formatted date", () => {
    render(<ActivityCard activity={mockActivity} />);
    expect(screen.getByText(/2025/)).toBeInTheDocument();
  });

  it("should render featured badge when activity is featured and has image", () => {
    const featuredActivity: Activity = {
      ...mockActivity,
      featured: true,
      featuredImage: {
        data: {
          id: 1,
          attributes: {
            name: "featured.jpg",
            url: "/uploads/featured.jpg",
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
      },
    };

    render(<ActivityCard activity={featuredActivity} />);
    expect(screen.getByText("精选")).toBeInTheDocument();
  });

  it("should not render featured badge when activity is not featured", () => {
    render(<ActivityCard activity={mockActivity} />);
    expect(screen.queryByText("精选")).not.toBeInTheDocument();
  });

  it("should render featured image when provided", () => {
    const activityWithImage: Activity = {
      ...mockActivity,
      featuredImage: {
        data: {
          id: 1,
          attributes: {
            name: "workshop.jpg",
            url: "/uploads/workshop.jpg",
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
      },
    };

    render(<ActivityCard activity={activityWithImage} />);
    const img = screen.getByAltText("青年领导力工作坊");
    expect(img).toBeInTheDocument();
  });

  it("should render correct link to activity detail page", () => {
    render(<ActivityCard activity={mockActivity} />);
    const link = screen.getByRole("link", { name: "查看详情" });
    expect(link).toHaveAttribute("href", "/activities/youth-leadership-workshop");
  });

  it("should render all category types correctly", () => {
    const categories: Array<Activity["category"]> = [
      "workshop",
      "seminar",
      "community",
      "project",
      "other",
    ];

    const expectedLabels = ["工作坊", "讲座", "社区活动", "项目", "其他"];

    categories.forEach((category, index) => {
      const { unmount } = render(
        <ActivityCard activity={{ ...mockActivity, category }} />
      );
      expect(screen.getByText(expectedLabels[index])).toBeInTheDocument();
      unmount();
    });
  });

  it("should handle activity without optional fields", () => {
    const minimalActivity: Activity = {
      title: "最简活动",
      slug: "minimal-activity",
      category: "other",
      featured: false,
    };

    render(<ActivityCard activity={minimalActivity} />);
    expect(screen.getByText("最简活动")).toBeInTheDocument();
    expect(screen.getByText("其他")).toBeInTheDocument();
  });
});
