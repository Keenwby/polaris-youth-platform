/**
 * Activity Detail Page
 * 活动详情页面 - 显示单个活动的详细信息
 */

import { fetchActivityBySlug, getMediaUrl } from "@/lib/strapi";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";

interface ActivityDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const CATEGORY_LABELS = {
  workshop: "工作坊",
  seminar: "讲座",
  community: "社区活动",
  project: "项目",
  other: "其他",
} as const;

export default async function ActivityDetailPage({
  params,
}: ActivityDetailPageProps) {
  const { slug } = await params;

  try {
    // Fetch activity by slug
    const activityEntity = await fetchActivityBySlug(slug);

    if (!activityEntity) {
      notFound();
    }

    const activity = activityEntity.attributes;

    // Get image URL
    const imageUrl = activity.featuredImage?.data?.attributes?.url
      ? getMediaUrl(activity.featuredImage.data.attributes.url)
      : undefined;

    // Format date
    const formattedStartDate = activity.startDate
      ? new Date(activity.startDate).toLocaleDateString("zh-CN", {
          year: "numeric",
          month: "long",
          day: "numeric",
          weekday: "long",
          hour: "2-digit",
          minute: "2-digit",
        })
      : undefined;

    const formattedEndDate = activity.endDate
      ? new Date(activity.endDate).toLocaleDateString("zh-CN", {
          hour: "2-digit",
          minute: "2-digit",
        })
      : undefined;

    return (
      <main className="min-h-screen bg-background text-foreground">
        {/* Hero Section with Image */}
        {imageUrl && (
          <div className="relative h-[400px] w-full">
            <img
              src={imageUrl}
              alt={activity.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
          </div>
        )}

        {/* Content */}
        <div className="mx-auto max-w-4xl px-4 py-12 md:px-8">
          {/* Back Button */}
          <Button asChild variant="ghost" size="sm" className="mb-6">
            <a href="/activities">← 返回活动列表</a>
          </Button>

          {/* Header */}
          <div className="mb-8">
            <div className="mb-4 flex flex-wrap gap-2">
              <Badge>
                {CATEGORY_LABELS[activity.category] || activity.category}
              </Badge>
              {activity.featured && (
                <Badge variant="destructive">精选</Badge>
              )}
              {activity.tags?.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>

            <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
              {activity.title}
            </h1>

            {activity.description && (
              <p className="text-xl text-muted-foreground">
                {activity.description}
              </p>
            )}
          </div>

          {/* Meta Information */}
          <div className="mb-8 rounded-lg border bg-muted/50 p-6">
            <div className="grid gap-4 md:grid-cols-2">
              {formattedStartDate && (
                <div>
                  <div className="mb-1 text-sm font-medium">开始时间</div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <span>📅</span>
                    <span>{formattedStartDate}</span>
                  </div>
                </div>
              )}

              {formattedEndDate && (
                <div>
                  <div className="mb-1 text-sm font-medium">结束时间</div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <span>⏰</span>
                    <span>{formattedEndDate}</span>
                  </div>
                </div>
              )}

              {activity.location && (
                <div>
                  <div className="mb-1 text-sm font-medium">活动地点</div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <span>📍</span>
                    <span>{activity.location}</span>
                  </div>
                </div>
              )}

              {activity.capacity && (
                <div>
                  <div className="mb-1 text-sm font-medium">活动人数</div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <span>👥</span>
                    <span>{activity.capacity} 人</span>
                  </div>
                </div>
              )}
            </div>

            {activity.registrationUrl && (
              <div className="mt-6">
                <Button asChild size="lg" className="w-full">
                  <a
                    href={activity.registrationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    立即报名
                  </a>
                </Button>
              </div>
            )}
          </div>

          {/* Content */}
          {activity.content && (
            <div
              className="prose prose-lg dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: activity.content }}
            />
          )}
        </div>
      </main>
    );
  } catch (error) {
    console.error("Error fetching activity:", error);

    return (
      <main className="min-h-screen bg-background text-foreground">
        <div className="px-4 py-16 text-center md:px-8">
          <h1 className="text-4xl font-bold tracking-tight">活动详情</h1>
          <p className="mt-4 text-destructive">无法加载活动详情</p>
          <p className="mt-2 text-sm text-muted-foreground">
            请确保 Strapi CMS 正在运行
          </p>
          <Button asChild variant="outline" className="mt-6">
            <a href="/activities">返回活动列表</a>
          </Button>
        </div>
      </main>
    );
  }
}
