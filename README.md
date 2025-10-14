# Polaris Youth Development Center Platform

北辰青年发展中心完整平台 - 包含前端网站和CMS内容管理系统

## 🏗️ 架构设计

```
polaris-youth-platform/
├── frontend/              # Next.js 前端网站
├── cms/                   # Strapi CMS 后台管理
├── shared/               # 共享类型和工具
├── docker-compose.yml    # 本地开发环境
└── README.md
```

## 🛠️ 技术栈

- **Frontend**: Next.js 14 (App Router) + TypeScript + Tailwind CSS
- **CMS**: Strapi 4.x (Headless CMS)  
- **Database**: PostgreSQL
- **部署**: 通用配置 (支持阿里云 + Vercel)

## 🚀 快速开始

### 环境要求
- Node.js 18+
- PostgreSQL 14+
- npm/yarn

### 本地开发

1. **克隆项目**
```bash
git clone <repo-url>
cd polaris-youth-platform
```

2. **启动数据库**
```bash
# macOS (Homebrew)
brew services start postgresql@14
createdb polaris_youth_dev
```

3. **安装依赖并启动**
```bash
# 安装所有依赖
npm install

# 启动开发环境 (并行启动 CMS + 前端)
npm run dev
```

4. **访问应用**
- 🌐 网站: http://localhost:3000
- 🎛️ CMS管理后台: http://localhost:1337/admin

## 📱 功能特性

### 用户端网站
- 🏠 首页展示 (Hero, 愿景, 活动, 数据统计)
- 🎯 活动展示与报名
- 📚 人生学校项目介绍  
- 🤖 北辰生活 AI工具
- 📱 完全响应式设计

### CMS管理后台
- 📝 活动管理 (增删改查, 图片上传)
- 🖼️ 页面内容编辑 (富文本编辑器)
- 📊 统计数据管理
- 🔧 站点设置配置
- 🎨 媒体库管理

## 🗂️ 内容类型设计

### Activities (活动)
- 基本信息: 标题、描述、时间、地点
- 媒体: 主图、相册
- 分类: 标签、状态、推荐设置
- 链接: 报名链接

### Pages (页面)
- 动态页面内容管理
- 富文本编辑
- SEO优化设置

### Site Settings (站点设置)  
- 全局配置信息
- 社交媒体链接
- 联系方式设置

## 🚀 部署指南

### Vercel (快速演示)
```bash
npm run build:frontend
npm run deploy:vercel
```

### 阿里云 (生产环境)
```bash
# 构建项目
npm run build

# 使用Docker部署
docker-compose -f docker-compose.prod.yml up -d
```

## 🤝 开发指南

详见各子项目的README:
- [Frontend开发指南](./frontend/README.md)
- [CMS开发指南](./cms/README.md)

## 📄 许可证

MIT License