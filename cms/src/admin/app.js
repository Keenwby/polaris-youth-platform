/**
 * Strapi Admin Panel Configuration
 * 配置 Strapi 管理面板为中文
 */

export default {
  config: {
    // 启用中文语言（zh-Hans 简体中文）
    locales: ['zh-Hans'],

    // 自定义翻译
    translations: {
      'zh-Hans': {
        'app.components.LeftMenu.navbrand.title': '北辰青年发展中心',
        'app.components.LeftMenu.navbrand.workplace': '内容管理系统',
      },
    },

    // 主题配置
    theme: {
      colors: {
        primary100: '#f0f9ff',
        primary200: '#e0f2fe',
        primary500: '#0ea5e9',
        primary600: '#0284c7',
        primary700: '#0369a1',
      },
    },
  },

  bootstrap(app) {
    console.log('Strapi Admin Panel initialized with Chinese locale support');
  },
};
