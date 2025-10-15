/**
 * Activity Card Component
 * 活动卡片 - 显示单个活动的卡片
 */

import { type Activity } from "@/types/strapi";
import { getMediaUrl } from "@/lib/strapi";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ActivityCardProps {
  activity: Activity;
}

const CATEGORY_LABELS = {
  workshop: "工作坊",
  seminar: "讲座",
  community: "社区活动",
  project: "项目",
  other: "其他",
} as const;

export function ActivityCard({ activity }: ActivityCardProps) {
  const {
    title,
    slug,
    description,
    category,
    featuredImage,
    startDate,
    location,
    featured,
  } = activity;

  const imageUrl = featuredImage?.data?.attributes?.url
    ? getMediaUrl(featuredImage.data.attributes.url)
    : undefined;

  // Format date
  const formattedDate = startDate
    ? new Date(startDate).toLocaleDateString("zh-CN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : undefined;

  return (
    <Card className="overflow-hidden">
      {/* Featured Image */}
      {imageUrl && (
        <div className="relative h-48 w-full overflow-hidden bg-muted">
          <img
            src={imageUrl}
            alt={title}
            className="h-full w-full object-cover transition-transform hover:scale-105"
          />
          {featured && (
            <Badge className="absolute right-2 top-2" variant="destructive">
              精选
            </Badge>
          )}
        </div>
      )}

      <div className="p-6">
        {/* Category Badge */}
        <div className="mb-2">
          <Badge variant="outline">
            {CATEGORY_LABELS[category] || category}
          </Badge>
        </div>

        {/* Title */}
        <h3 className="mb-2 text-xl font-semibold line-clamp-2">{title}</h3>

        {/* Description */}
        {description && (
          <p className="mb-4 text-sm text-muted-foreground line-clamp-3">
            {description}
          </p>
        )}

        {/* Meta Information */}
        <div className="mb-4 space-y-1 text-sm text-muted-foreground">
          {formattedDate && (
            <div className="flex items-center gap-2">
              <span>📅</span>
              <span>{formattedDate}</span>
            </div>
          )}
          {location && (
            <div className="flex items-center gap-2">
              <span>📍</span>
              <span>{location}</span>
            </div>
          )}
        </div>

        {/* CTA Button */}
        <Button asChild variant="outline" size="sm" className="w-full">
          <a href={`/activities/${slug}`}>查看详情</a>
        </Button>
      </div>
    </Card>
  );
}
