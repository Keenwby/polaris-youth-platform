/**
 * Strapi Admin Panel Configuration
 * 配置 Strapi 管理面板为中文
 */

export default {
  config: {
    // 设置默认语言为中文
    locales: ['zh-Hans'],

    // 翻译配置
    translations: {
      'zh-Hans': {
        'app.components.LeftMenu.navbrand.title': '北辰青年发展中心 CMS',
        'app.components.LeftMenu.navbrand.workplace': '管理面板',
      },
    },

    // 主题配置
    theme: {
      light: {},
      dark: {},
    },
  },

  bootstrap() {},
};
