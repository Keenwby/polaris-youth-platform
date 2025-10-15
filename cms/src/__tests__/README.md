# Phase 2 测试文档

## 测试概述

本目录包含 Phase 2（Strapi CMS 配置）的单元测试，确保所有内容类型架构正确配置。

## 运行测试

### 在 Docker 容器中运行

```bash
# 运行所有测试
docker-compose exec strapi npm test

# 监听模式（开发时使用）
docker-compose exec strapi npm run test:watch

# 生成覆盖率报告
docker-compose exec strapi npm run test:coverage
```

### 在本地运行（需要 Node 18-20）

```bash
cd cms
npm test
```

## 测试文件

### `content-types.test.js`
测试所有 Strapi 内容类型和组件的架构配置。

**测试内容：**
- ✅ Collection Types（集合类型）
  - Activity schema 验证

- ✅ Single Types（单例类型）
  - Site Settings schema 验证
  - Home Page schema 验证
  - About Page schema 验证

- ✅ Components（组件）
  - SEO 组件（meta-data）
  - Layout 组件（footer）
  - Section 组件（hero, rich-text, feature-grid, activity-list, image-gallery）
  - Shared 组件（button, feature-item）

- ✅ Dynamic Zone 配置
  - Home Page 可用的 section 组件
  - About Page 可用的 section 组件

### `database-config.test.js`
测试数据库配置的正确性。

**测试内容：**
- ✅ 导出函数验证
- ✅ PostgreSQL 配置验证
- ✅ Debug 标志存在性验证

## 测试结果

```
Test Suites: 2 passed, 2 total
Tests:       20 passed, 20 total
Snapshots:   0 total
Time:        ~0.2s
```

## 测试覆盖的架构

### 内容类型（4个）
1. Activity (Collection Type)
2. Site Settings (Single Type)
3. Home Page (Single Type)
4. About Page (Single Type)

### 组件（9个）
1. SEO - Meta Data
2. Layout - Footer
3. Sections - Hero
4. Sections - Rich Text
5. Sections - Feature Grid
6. Sections - Activity List
7. Sections - Image Gallery
8. Shared - Button
9. Shared - Feature Item

## 添加新测试

在相应的测试文件中添加新的 `test()` 或 `describe()` 块：

```javascript
test('新内容类型 should exist and be valid', () => {
  const schemaPath = path.join(__dirname, '../api/new-type/content-types/new-type/schema.json');
  expect(fs.existsSync(schemaPath)).toBe(true);

  const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
  // 添加你的断言
});
```

## CI/CD 集成

这些测试可以在 CI/CD 流程中运行，确保内容类型配置的完整性：

```yaml
# 示例 GitHub Actions workflow
- name: Run CMS tests
  run: docker-compose exec -T strapi npm test
```
