/**
 * Seed Data Script
 * 将旧网站内容迁移到 Strapi CMS
 */

const API_URL = 'http://localhost:1337/api';

// 模拟登录获取 JWT token
// 注意：你需要先在 Strapi 中创建一个管理员账号
// 这里使用的是 Strapi API Token（Settings > API Tokens）
const API_TOKEN = process.env.STRAPI_API_TOKEN || 'YOUR_API_TOKEN_HERE';

const headers = {
  'Content-Type': 'application/json',
  ...(API_TOKEN !== 'YOUR_API_TOKEN_HERE' && {
    'Authorization': `Bearer ${API_TOKEN}`
  })
};

// 主页数据
const homePageData = {
  data: {
    title: '北辰青年发展中心',
    sections: [
      // Hero Section
      {
        __component: 'sections.hero',
        title: '让青年活成自己想要的模样',
        subtitle: '通过社群、行动与对话，陪伴你探索成长的可能性',
        backgroundImage: null, // 使用 Unsplash 图片: photo-1522071820081-009f0129c71c
        ctaButtons: [
          {
            label: '查看活动',
            url: '/activities',
            variant: 'default',
            size: 'lg',
            openInNewTab: false,
          },
          {
            label: '了解北辰',
            url: '/about',
            variant: 'outline',
            size: 'lg',
            openInNewTab: false,
          }
        ],
        alignment: 'center',
        height: 'fullscreen',
        overlay: true,
        overlayOpacity: 50,
      },
      // Feature Grid - 我们的愿景
      {
        __component: 'sections.feature-grid',
        title: '我们的愿景',
        description: '北辰青年发展中心相信，每个青年都有活成自己想要模样的权利和潜力。我们通过搭建有温度的社群、提供多元的成长机会，让更多18-30岁的青年在探索中找到方向，在行动中实现成长。\n\n无论你是刚步入社会的大学生，还是在职场中寻找突破的年轻人，这里都有属于你的成长空间。',
        features: [
          {
            title: '探索成长',
            description: '每个青年都有独特的成长路径，我们陪伴你发现属于自己的方向',
            icon: 'target', // lucide-react icon name
          },
          {
            title: '社群共创',
            description: '在有温度的社群中，与志同道合的伙伴一起行动、对话、成长',
            icon: 'heart',
          },
          {
            title: '行动导向',
            description: '真正的成长来自实践，我们鼓励每一次勇敢的尝试和突破',
            icon: 'lightbulb',
          }
        ],
        columns: 3,
        layout: 'grid',
      },
      // Activity List Section
      {
        __component: 'sections.activity-list',
        title: '探索成长机会',
        description: '从线下工作坊到深度训练营，每一次参与都是成长的契机',
        showFilters: true,
        defaultCategory: 'all',
        itemsPerPage: 6,
        layout: 'grid',
        showFeaturedOnly: false,
      },
      // Rich Text - 影响力统计
      {
        __component: 'sections.rich-text',
        content: '<h2 class="text-4xl font-bold text-center mb-6">我们的影响力</h2><p class="text-xl text-center text-muted-foreground mb-12">用数字见证青年的成长</p><div class="grid grid-cols-2 lg:grid-cols-4 gap-8"><div class="text-center"><div class="text-5xl font-bold text-primary mb-2">30+</div><div class="text-lg">覆盖城市</div></div><div class="text-center"><div class="text-5xl font-bold text-primary mb-2">1000+</div><div class="text-lg">举办活动</div></div><div class="text-center"><div class="text-5xl font-bold text-primary mb-2">100000+</div><div class="text-lg">青年参与</div></div><div class="text-center"><div class="text-5xl font-bold text-primary mb-2">50+</div><div class="text-lg">合作伙伴</div></div></div>',
        layout: 'wide',
      },
    ],
    seo: {
      metaTitle: '北辰青年发展中心 - 让青年活成自己想要的模样',
      metaDescription: '通过社群、行动与对话，陪伴你探索成长的可能性。北辰青年发展中心为18-30岁青年提供多元成长机会。',
      keywords: '青年发展,社群,成长,领导力,职业规划,创新思维',
    }
  }
};

// 活动数据
const activitiesData = [
  {
    title: '青年领导力工作坊',
    slug: 'youth-leadership-workshop',
    description: '通过团队协作、案例分析和实战演练，提升领导力和沟通能力',
    content: '<p>通过团队协作、案例分析和实战演练，提升领导力和沟通能力。</p><h3>活动亮点</h3><ul><li>实战案例分析</li><li>团队协作练习</li><li>个人成长规划</li></ul>',
    category: 'workshop',
    startDate: '2025-01-15T06:00:00.000Z',
    endDate: '2025-01-15T10:00:00.000Z',
    location: '北京·朝阳区创业大街',
    capacity: 30,
    registrationUrl: '#',
    featured: true,
    tags: ['领导力', '团队协作', '实践项目'],
    seo: {
      metaTitle: '青年领导力工作坊 | 北辰青年发展中心',
      metaDescription: '通过团队协作、案例分析和实战演练，提升领导力和沟通能力',
    }
  },
  {
    title: '职业探索分享会',
    slug: 'career-exploration-meetup',
    description: '邀请不同行业的青年导师分享职业经验，帮助你找到适合的方向',
    content: '<p>邀请不同行业的青年导师分享职业经验，帮助你找到适合的方向。</p><h3>分享嘉宾</h3><ul><li>科技行业创业者</li><li>非营利组织负责人</li><li>自由职业者</li></ul>',
    category: 'seminar',
    startDate: '2025-01-22T07:00:00.000Z',
    endDate: '2025-01-22T09:30:00.000Z',
    location: '上海·静安区联合办公空间',
    capacity: 50,
    registrationUrl: '#',
    featured: true,
    tags: ['职业规划', '导师分享', '社群共创'],
    seo: {
      metaTitle: '职业探索分享会 | 北辰青年发展中心',
      metaDescription: '邀请不同行业的青年导师分享职业经验，帮助你找到适合的方向',
    }
  },
  {
    title: '创意思维训练营',
    slug: 'creative-thinking-bootcamp',
    description: '通过设计思维方法论，激发创造力，解决真实问题',
    content: '<p>通过设计思维方法论，激发创造力，解决真实问题。</p><h3>训练营内容</h3><ul><li>设计思维工作坊</li><li>创意头脑风暴</li><li>原型制作与测试</li><li>成果展示与反馈</li></ul>',
    category: 'workshop',
    startDate: '2025-02-05T00:00:00.000Z',
    endDate: '2025-02-06T23:59:00.000Z',
    location: '深圳·南山区创新园',
    capacity: 40,
    registrationUrl: '#',
    featured: false,
    tags: ['创新思维', '设计思维', '两日营'],
    seo: {
      metaTitle: '创意思维训练营 | 北辰青年发展中心',
      metaDescription: '通过设计思维方法论，激发创造力，解决真实问题',
    }
  }
];

// 站点设置数据
const siteSettingsData = {
  data: {
    siteName: '北辰青年发展中心',
    logo: null,
    navigation: {
      links: [
        { label: '首页', url: '/' },
        { label: '活动', url: '/activities' },
        { label: '关于我们', url: '/about' },
      ]
    },
    footer: {
      copyrightText: '© 2025 北辰青年发展中心. All rights reserved.',
      links: [
        { label: '关于我们', url: '/about' },
        { label: '联系我们', url: '/contact' },
        { label: '隐私政策', url: '/privacy' },
      ],
      socialLinks: [
        { platform: 'wechat', url: '#' },
        { platform: 'weibo', url: '#' },
        { platform: 'email', url: 'mailto:contact@polaris-youth.org' },
      ],
      additionalInfo: '<p>北辰青年发展中心致力于为18-30岁青年提供成长支持。</p>',
    },
    contactEmail: 'contact@polaris-youth.org',
    contactPhone: null,
  }
};

// 关于页面数据
const aboutPageData = {
  data: {
    title: '关于我们',
    sections: [
      {
        __component: 'sections.hero',
        title: '关于北辰',
        subtitle: '陪伴青年成长，点亮未来之路',
        alignment: 'center',
        height: 'medium',
      },
      {
        __component: 'sections.rich-text',
        content: '<h2>我们的使命</h2><p>北辰青年发展中心相信，每个青年都有活成自己想要模样的权利和潜力。我们通过搭建有温度的社群、提供多元的成长机会，让更多18-30岁的青年在探索中找到方向，在行动中实现成长。</p><h2>我们的价值观</h2><ul><li><strong>探索成长</strong>：每个青年都有独特的成长路径</li><li><strong>社群共创</strong>：在有温度的社群中共同成长</li><li><strong>行动导向</strong>：真正的成长来自实践</li></ul>',
        layout: 'medium',
      }
    ],
    seo: {
      metaTitle: '关于我们 | 北辰青年发展中心',
      metaDescription: '了解北辰青年发展中心的使命、愿景和价值观',
    }
  }
};

// 辅助函数
async function createEntry(endpoint, data) {
  try {
    const response = await fetch(`${API_URL}/${endpoint}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error(`❌ 创建 ${endpoint} 失败:`, error);
      return null;
    }

    const result = await response.json();
    console.log(`✅ 成功创建 ${endpoint}:`, result.data?.id || result.data?.documentId);
    return result;
  } catch (error) {
    console.error(`❌ 请求 ${endpoint} 时出错:`, error.message);
    return null;
  }
}

async function updateEntry(endpoint, data) {
  try {
    const response = await fetch(`${API_URL}/${endpoint}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error(`❌ 更新 ${endpoint} 失败:`, error);
      return null;
    }

    const result = await response.json();
    console.log(`✅ 成功更新 ${endpoint}`);
    return result;
  } catch (error) {
    console.error(`❌ 请求 ${endpoint} 时出错:`, error.message);
    return null;
  }
}

// 主函数
async function seedData() {
  console.log('🌱 开始导入数据到 Strapi...\n');

  // 检查 API Token
  if (API_TOKEN === 'YOUR_API_TOKEN_HERE') {
    console.log('⚠️  请设置 STRAPI_API_TOKEN 环境变量');
    console.log('   1. 访问 http://localhost:1337/admin');
    console.log('   2. 进入 Settings > API Tokens');
    console.log('   3. 创建一个新的 API Token (Full access)');
    console.log('   4. 运行: STRAPI_API_TOKEN=your_token node scripts/seed-data.js\n');
    process.exit(1);
  }

  // 1. 创建活动
  console.log('📅 创建活动数据...');
  for (const activity of activitiesData) {
    await createEntry('activities', { data: activity });
  }

  // 2. 更新主页
  console.log('\n🏠 更新主页数据...');
  await updateEntry('home-page', homePageData);

  // 3. 更新关于页面
  console.log('\n📖 更新关于页面数据...');
  await updateEntry('about-page', aboutPageData);

  // 4. 更新站点设置
  console.log('\n⚙️  更新站点设置...');
  await updateEntry('site-setting', siteSettingsData);

  console.log('\n✨ 数据导入完成！');
  console.log('🌐 访问 http://localhost:3000 查看效果\n');
}

// 运行
seedData().catch(console.error);
