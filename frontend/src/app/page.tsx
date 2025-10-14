import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme-toggle";

export default function HomePage() {
  return (
    <main className="min-h-screen p-8 md:p-24 bg-background text-foreground">
      <ThemeToggle />
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Hero Section */}
        <section className="text-center space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
            北辰青年发展中心
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            让青年活成自己想要的模样
          </p>
          <div className="flex items-center justify-center gap-4 pt-4">
            <Button size="lg">查看活动</Button>
            <Button size="lg" variant="outline">
              了解北辰
            </Button>
          </div>
        </section>

        {/* UI Component Showcase */}
        <section className="space-y-8">
          <h2 className="text-3xl font-semibold">设计系统预览</h2>

          {/* Buttons */}
          <div className="space-y-4">
            <h3 className="text-xl font-medium">按钮组件</h3>
            <div className="flex flex-wrap gap-4">
              <Button>默认按钮</Button>
              <Button variant="secondary">次要按钮</Button>
              <Button variant="outline">轮廓按钮</Button>
              <Button variant="ghost">幽灵按钮</Button>
              <Button variant="destructive">危险按钮</Button>
              <Button variant="link">链接按钮</Button>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button size="sm">小型</Button>
              <Button size="default">默认</Button>
              <Button size="lg">大型</Button>
            </div>
          </div>

          {/* Badges */}
          <div className="space-y-4">
            <h3 className="text-xl font-medium">标签组件</h3>
            <div className="flex flex-wrap gap-4">
              <Badge>默认标签</Badge>
              <Badge variant="secondary">次要标签</Badge>
              <Badge variant="outline">轮廓标签</Badge>
              <Badge variant="destructive">警告标签</Badge>
            </div>
          </div>

          {/* Cards */}
          <div className="space-y-4">
            <h3 className="text-xl font-medium">卡片组件</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="hover-elevate">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Badge>活动</Badge>
                    <Badge variant="secondary">线下</Badge>
                  </div>
                  <CardTitle>青年领导力工作坊</CardTitle>
                  <CardDescription>
                    通过团队协作、案例分析和实战演练，提升领导力和沟通能力
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>📅 2025年1月15日 周六 14:00-18:00</p>
                    <p>📍 北京·朝阳区创业大街</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover-elevate">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Badge>项目</Badge>
                    <Badge variant="secondary">12周</Badge>
                  </div>
                  <CardTitle>人生学校</CardTitle>
                  <CardDescription>
                    系统性地探索人生方向，建立有温度的社群，培养持续行动的能力
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">立即申请</Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Colors */}
          <div className="space-y-4">
            <h3 className="text-xl font-medium">色彩系统</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <div className="h-20 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-medium">
                  Primary
                </div>
                <p className="text-sm text-muted-foreground">主色 - 活力蓝</p>
              </div>
              <div className="space-y-2">
                <div className="h-20 rounded-lg bg-secondary flex items-center justify-center text-secondary-foreground font-medium">
                  Secondary
                </div>
                <p className="text-sm text-muted-foreground">次要色</p>
              </div>
              <div className="space-y-2">
                <div className="h-20 rounded-lg bg-accent flex items-center justify-center text-accent-foreground font-medium">
                  Accent
                </div>
                <p className="text-sm text-muted-foreground">强调色</p>
              </div>
              <div className="space-y-2">
                <div className="h-20 rounded-lg bg-muted flex items-center justify-center text-muted-foreground font-medium">
                  Muted
                </div>
                <p className="text-sm text-muted-foreground">柔和色</p>
              </div>
            </div>
          </div>

          {/* Typography */}
          <div className="space-y-4">
            <h3 className="text-xl font-medium">排版系统</h3>
            <div className="space-y-4">
              <div>
                <h1 className="text-5xl font-bold mb-2">标题 1 - 5XL</h1>
                <p className="text-muted-foreground">用于主标题和 Hero 区域</p>
              </div>
              <div>
                <h2 className="text-4xl font-semibold mb-2">标题 2 - 4XL</h2>
                <p className="text-muted-foreground">用于页面主要区块标题</p>
              </div>
              <div>
                <h3 className="text-2xl font-medium mb-2">标题 3 - 2XL</h3>
                <p className="text-muted-foreground">用于卡片标题和子区块</p>
              </div>
              <div>
                <p className="text-lg leading-relaxed mb-2">
                  正文文字 - 经过中文排版优化，行高设置为 1.75 (leading-relaxed)，
                  确保中文阅读的舒适度。使用 PingFang SC 字体系列，
                  在 macOS 和 iOS 上呈现最佳效果。
                </p>
                <p className="text-muted-foreground">标准段落文字</p>
              </div>
            </div>
          </div>
        </section>

        {/* Status */}
        <section className="border-t pt-8">
          <p className="text-center text-sm text-muted-foreground">
            ✅ Phase 1.2: 设计系统迁移完成
          </p>
        </section>
      </div>
    </main>
  );
}
