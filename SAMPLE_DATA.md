# Strapi 示例数据导入指南

## 方法1: 在 Strapi Admin 中手动创建（推荐）

### 1. 创建活动 (Activities)

访问 http://localhost:1337/admin > Content Manager > Activity > Create new entry

#### 活动 1: 青年领导力工作坊
```
标题: 青年领导力工作坊
Slug: youth-leadership-workshop
描述: 通过团队协作、案例分析和实战演练，提升领导力和沟通能力
内容:
<p>通过团队协作、案例分析和实战演练，提升领导力和沟通能力。</p>
<h3>活动亮点</h3>
<ul>
  <li>实战案例分析</li>
  <li>团队协作练习</li>
  <li>个人成长规划</li>
</ul>

分类: workshop
开始日期: 2025-01-15 14:00
结束日期: 2025-01-15 18:00
地点: 北京·朝阳区创业大街
容量: 30
报名链接: #
特色: ✅ (勾选)
标签: 领导力,团队协作,实践项目
状态: Published (发布)
```

#### 活动 2: 职业探索分享会
```
标题: 职业探索分享会
Slug: career-exploration-meetup
描述: 邀请不同行业的青年导师分享职业经验，帮助你找到适合的方向
内容:
<p>邀请不同行业的青年导师分享职业经验，帮助你找到适合的方向。</p>
<h3>分享嘉宾</h3>
<ul>
  <li>科技行业创业者</li>
  <li>非营利组织负责人</li>
  <li>自由职业者</li>
</ul>

分类: seminar
开始日期: 2025-01-22 15:00
结束日期: 2025-01-22 17:30
地点: 上海·静安区联合办公空间
容量: 50
报名链接: #
特色: ✅ (勾选)
标签: 职业规划,导师分享,社群共创
状态: Published (发布)
```

#### 活动 3: 创意思维训练营
```
标题: 创意思维训练营
Slug: creative-thinking-bootcamp
描述: 通过设计思维方法论，激发创造力，解决真实问题
内容:
<p>通过设计思维方法论，激发创造力，解决真实问题。</p>
<h3>训练营内容</h3>
<ul>
  <li>设计思维工作坊</li>
  <li>创意头脑风暴</li>
  <li>原型制作与测试</li>
  <li>成果展示与反馈</li>
</ul>

分类: workshop
开始日期: 2025-02-05 00:00
结束日期: 2025-02-06 23:59
地点: 深圳·南山区创新园
容量: 40
报名链接: #
特色: ❌ (不勾选)
标签: 创新思维,设计思维,两日营
状态: Published (发布)
```

### 2. 配置主页 (Home Page)

访问 http://localhost:1337/admin > Content Manager > Home Page

#### 添加 Hero Section
```
Component: Hero Section
标题: 让青年活成自己想要的模样
副标题: 通过社群、行动与对话，陪伴你探索成长的可能性
对齐: center
高度: fullscreen
覆盖层: ✅
覆盖层透明度: 50

CTA Buttons:
- 按钮 1:
  标签: 查看活动
  URL: /activities
  变体: default
  大小: lg

- 按钮 2:
  标签: 了解北辰
  URL: /about
  变体: outline
  大小: lg
```

#### 添加 Feature Grid Section
```
Component: Feature Grid
标题: 我们的愿景
描述:
北辰青年发展中心相信，每个青年都有活成自己想要模样的权利和潜力。我们通过搭建有温度的社群、提供多元的成长机会，让更多18-30岁的青年在探索中找到方向，在行动中实现成长。

无论你是刚步入社会的大学生，还是在职场中寻找突破的年轻人，这里都有属于你的成长空间。

列数: 3
布局: grid

Features:
- 特性 1:
  标题: 探索成长
  描述: 每个青年都有独特的成长路径，我们陪伴你发现属于自己的方向
  图标: target

- 特性 2:
  标题: 社群共创
  描述: 在有温度的社群中，与志同道合的伙伴一起行动、对话、成长
  图标: heart

- 特性 3:
  标题: 行动导向
  描述: 真正的成长来自实践，我们鼓励每一次勇敢的尝试和突破
  图标: lightbulb
```

#### 添加 Activity List Section
```
Component: Activity List Section
标题: 探索成长机会
描述: 从线下工作坊到深度训练营，每一次参与都是成长的契机
显示过滤器: ✅
默认分类: all
每页项目数: 6
布局: grid
仅显示特色: ❌
```

#### 添加 Rich Text Section (影响力统计)
```
Component: Rich Text Section
布局: wide
内容:
<h2 class="text-4xl font-bold text-center mb-6">我们的影响力</h2>
<p class="text-xl text-center text-muted-foreground mb-12">用数字见证青年的成长</p>
<div class="grid grid-cols-2 lg:grid-cols-4 gap-8">
  <div class="text-center">
    <div class="text-5xl font-bold text-primary mb-2">30+</div>
    <div class="text-lg">覆盖城市</div>
  </div>
  <div class="text-center">
    <div class="text-5xl font-bold text-primary mb-2">1000+</div>
    <div class="text-lg">举办活动</div>
  </div>
  <div class="text-center">
    <div class="text-5xl font-bold text-primary mb-2">100000+</div>
    <div class="text-lg">青年参与</div>
  </div>
  <div class="text-center">
    <div class="text-5xl font-bold text-primary mb-2">50+</div>
    <div class="text-lg">合作伙伴</div>
  </div>
</div>
```

**记得点击右上角 "Publish" 发布主页！**

### 3. 配置站点设置 (Site Setting)

访问 http://localhost:1337/admin > Content Manager > Site Setting

```
站点名称: 北辰青年发展中心
联系邮箱: contact@polaris-youth.org

导航 (Navigation):
{
  "links": [
    { "label": "首页", "url": "/" },
    { "label": "活动", "url": "/activities" },
    { "label": "关于我们", "url": "/about" }
  ]
}

页脚 (Footer):
{
  "copyrightText": "© 2025 北辰青年发展中心. All rights reserved.",
  "links": [
    { "label": "关于我们", "url": "/about" },
    { "label": "联系我们", "url": "/contact" },
    { "label": "隐私政策", "url": "/privacy" }
  ],
  "socialLinks": [
    { "platform": "wechat", "url": "#" },
    { "platform": "weibo", "url": "#" },
    { "platform": "email", "url": "mailto:contact@polaris-youth.org" }
  ],
  "additionalInfo": "<p>北辰青年发展中心致力于为18-30岁青年提供成长支持。</p>"
}
```

**记得点击 "Save" 保存站点设置！**

### 4. 配置关于页面 (About Page)

访问 http://localhost:1337/admin > Content Manager > About Page

#### 添加 Hero Section
```
Component: Hero Section
标题: 关于北辰
副标题: 陪伴青年成长，点亮未来之路
对齐: center
高度: medium
```

#### 添加 Rich Text Section
```
Component: Rich Text Section
布局: medium
内容:
<h2>我们的使命</h2>
<p>北辰青年发展中心相信，每个青年都有活成自己想要模样的权利和潜力。我们通过搭建有温度的社群、提供多元的成长机会，让更多18-30岁的青年在探索中找到方向，在行动中实现成长。</p>

<h2>我们的价值观</h2>
<ul>
  <li><strong>探索成长</strong>：每个青年都有独特的成长路径</li>
  <li><strong>社群共创</strong>：在有温度的社群中共同成长</li>
  <li><strong>行动导向</strong>：真正的成长来自实践</li>
</ul>
```

**记得点击 "Publish" 发布关于页面！**

### 5. 配置 API 权限（重要！）

访问 http://localhost:1337/admin > Settings > Users & Permissions plugin > Roles > Public

勾选以下权限：
- **Activity**: find, findOne
- **Home-page**: find
- **About-page**: find
- **Site-setting**: find

点击 "Save" 保存

---

## 完成后验证

访问以下页面查看效果：
- http://localhost:3000 - 主页
- http://localhost:3000/activities - 活动列表
- http://localhost:3000/about - 关于页面

如果内容没有显示，检查：
1. 所有内容是否已发布 (Published)
2. API 权限是否已配置
3. Frontend 服务是否正常运行
