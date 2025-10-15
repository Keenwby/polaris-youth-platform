/**
 * Activities List Page
 * 活动列表页面 - 显示所有活动
 */

import { fetchActivities } from "@/lib/strapi";
import { ActivityCard } from "@/components/activity-card";
import type { Activity } from "@/types/strapi";

export default async function ActivitiesPage() {
  try {
    // Fetch all activities
    const response = await fetchActivities({
      pagination: {
        pageSize: 50,
      },
    });

    const activities: Activity[] = response.data.map(
      (item) => item.attributes as Activity
    );

    return (
      <main className="min-h-screen bg-background text-foreground">
        <div className="px-4 py-16 md:px-8">
          <div className="mx-auto max-w-7xl">
            {/* Page Header */}
            <div className="mb-12 text-center">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                活动列表
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                探索北辰青年发展中心的各类活动
              </p>
            </div>

            {/* Activities Grid */}
            {activities.length === 0 ? (
              <div className="text-center">
                <p className="text-muted-foreground">暂无活动</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  请在 Strapi CMS 中添加活动内容
                </p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {activities.map((activity, index) => (
                  <ActivityCard key={index} activity={activity} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    );
  } catch (error) {
    console.error("Error fetching activities:", error);

    return (
      <main className="min-h-screen bg-background text-foreground">
        <div className="px-4 py-16 text-center md:px-8">
          <h1 className="text-4xl font-bold tracking-tight">活动列表</h1>
          <p className="mt-4 text-destructive">无法加载活动列表</p>
          <p className="mt-2 text-sm text-muted-foreground">
            请确保 Strapi CMS 正在运行
          </p>
        </div>
      </main>
    );
  }
}
