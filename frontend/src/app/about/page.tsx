/**
 * About Page
 * 关于页面 - 从 Strapi CMS 获取动态内容
 */

import { fetchAboutPage } from "@/lib/strapi";
import { DynamicZoneRenderer } from "@/components/dynamic-zone-renderer";

export default async function AboutPage() {
  try {
    // Fetch about page data from Strapi
    const response = await fetchAboutPage();
    const aboutPage = response.data;

    // If no sections configured, show placeholder
    if (!aboutPage?.sections || aboutPage.sections.length === 0) {
      return (
        <main className="min-h-screen p-8 md:p-24 bg-background text-foreground">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
              关于我们
            </h1>
            <p className="text-xl text-muted-foreground">
              请在 Strapi CMS 中配置关于页面内容
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
              配置关于页面内容
            </p>
          </div>
        </main>
      );
    }

    // Render dynamic sections from CMS
    return (
      <main className="min-h-screen bg-background text-foreground">
        <DynamicZoneRenderer sections={aboutPage.sections} />
      </main>
    );
  } catch (error) {
    console.error("Error fetching about page:", error);

    // Show error state
    return (
      <main className="min-h-screen p-8 md:p-24 bg-background text-foreground">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
            关于我们
          </h1>
          <p className="text-xl text-destructive">无法加载页面内容</p>
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
