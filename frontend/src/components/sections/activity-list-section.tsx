/**
 * Activity List Section Component
 * 活动列表区块 - 显示活动列表并支持筛选
 */

"use client";

import { useState, useEffect } from "react";
import { type SectionActivityList, type Activity } from "@/types/strapi";
import { fetchActivities } from "@/lib/strapi";
import { ActivityCard } from "@/components/activity-card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ActivityListSectionProps {
  section: SectionActivityList;
}

const CATEGORY_LABELS = {
  all: "全部",
  workshop: "工作坊",
  seminar: "讲座",
  community: "社区活动",
  project: "项目",
  other: "其他",
} as const;

export function ActivityListSection({ section }: ActivityListSectionProps) {
  const {
    title = "最新活动",
    description,
    showFilters = true,
    defaultCategory = "all",
    itemsPerPage = 6,
    layout = "grid",
    showFeaturedOnly = false,
  } = section;

  const [selectedCategory, setSelectedCategory] = useState(defaultCategory);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadActivities() {
      try {
        setLoading(true);
        setError(null);

        const filters: Record<string, any> = {};

        // Filter by category
        if (selectedCategory !== "all") {
          filters.category = { $eq: selectedCategory };
        }

        // Filter by featured
        if (showFeaturedOnly) {
          filters.featured = { $eq: true };
        }

        const response = await fetchActivities({
          filters,
          pagination: {
            pageSize: itemsPerPage,
          },
        });

        setActivities(
          response.data.map((item) => item.attributes as Activity)
        );
      } catch (err) {
        setError("加载活动失败");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadActivities();
  }, [selectedCategory, itemsPerPage, showFeaturedOnly]);

  return (
    <section className="px-4 py-16 md:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        {(title || description) && (
          <div className="mb-12 text-center">
            {title && (
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-4 text-lg text-muted-foreground">
                {description}
              </p>
            )}
          </div>
        )}

        {/* Category Filters */}
        {showFilters && (
          <div className="mb-8 flex flex-wrap justify-center gap-2">
            {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
              <Badge
                key={key}
                variant={selectedCategory === key ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setSelectedCategory(key as typeof selectedCategory)}
              >
                {label}
              </Badge>
            ))}
          </div>
        )}

        {/* Activity List */}
        {loading ? (
          <div className="text-center text-muted-foreground">加载中...</div>
        ) : error ? (
          <div className="text-center text-destructive">{error}</div>
        ) : activities.length === 0 ? (
          <div className="text-center text-muted-foreground">暂无活动</div>
        ) : (
          <div
            className={cn(
              layout === "grid"
                ? "grid gap-6 md:grid-cols-2 lg:grid-cols-3"
                : "flex flex-col gap-6"
            )}
          >
            {activities.map((activity, index) => (
              <ActivityCard key={index} activity={activity} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
