/**
 * Home Page
 * 主页 - 从 Strapi CMS 获取动态内容
 */

import { fetchHomePage } from "@/lib/strapi";
import { DynamicZoneRenderer } from "@/components/dynamic-zone-renderer";

export default async function HomePage() {
  try {
    // Fetch home page data from Strapi
    const response = await fetchHomePage();
    const homePageData = response.data?.attributes;

    // If no sections configured, show placeholder
    if (!homePageData?.sections || homePageData.sections.length === 0) {
      return (
        <main className="min-h-screen p-8 md:p-24 bg-background text-foreground">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
              北辰青年发展中心
            </h1>
            <p className="text-xl text-muted-foreground">
              请在 Strapi CMS 中配置主页内容
            </p>
            <p className="text-sm text-muted-foreground">
              访问{" "}
              <a
                href="http://localhost:1337/admin"
                className="text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                http://localhost:1337/admin
              </a>{" "}
              配置主页内容
            </p>
          </div>
        </main>
      );
    }

    // Render dynamic sections from CMS
    return (
      <main className="min-h-screen bg-background text-foreground">
        <DynamicZoneRenderer sections={homePageData.sections} />
      </main>
    );
  } catch (error) {
    console.error("Error fetching home page:", error);

    // Show error state
    return (
      <main className="min-h-screen p-8 md:p-24 bg-background text-foreground">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
            北辰青年发展中心
          </h1>
          <p className="text-xl text-destructive">
            无法加载页面内容
          </p>
          <p className="text-sm text-muted-foreground">
            请确保 Strapi CMS 正在运行：
            <br />
            <code className="text-xs">docker-compose up</code>
          </p>
        </div>
      </main>
    );
  }
}
