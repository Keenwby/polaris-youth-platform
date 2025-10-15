'use strict';

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application gets started.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   * 自动导入默认数据
   */
  async bootstrap({ strapi }) {
    console.log('🌱 检查是否需要导入默认数据...');

    try {
      // 检查是否已有活动数据
      const existingActivities = await strapi.db.query('api::activity.activity').findMany({
        limit: 1,
      });

      if (existingActivities && existingActivities.length > 0) {
        console.log('✅ 数据已存在，跳过导入');
        return;
      }

      console.log('📦 开始导入默认数据...');

      // 1. 创建活动
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
          tags: '领导力,团队协作,实践项目',
          publishedAt: new Date(),
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
          tags: '职业规划,导师分享,社群共创',
          publishedAt: new Date(),
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
          tags: '创新思维,设计思维,两日营',
          publishedAt: new Date(),
        },
      ];

      console.log('📅 创建活动数据...');
      for (const activityData of activitiesData) {
        await strapi.db.query('api::activity.activity').create({
          data: activityData,
        });
        console.log(`  ✅ 创建活动: ${activityData.title}`);
      }

      console.log('✨ 默认数据导入完成！');
    } catch (error) {
      console.error('❌ 导入数据时出错:', error.message);
    }
  },
};