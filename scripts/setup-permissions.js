/**
 * Setup API Permissions Script
 * 自动配置 Strapi Public 角色的 API 权限
 */

const API_URL = 'http://localhost:1337/api';
const API_TOKEN = process.env.STRAPI_API_TOKEN || 'f9d678a1105770438a339f09c736357f546b040f4bd080c1cf368491268186fc9c88a017ee81b005ac496b9ec1b240257c541b34f30b5364d7f1abf04a9912776c6776aaae771ad068ac3239e41645ab65273c27cacec3353fe7f0d411552565532e02f878f3cd1fd89af550a2f7b6a19a4b7f49647baba102bb6a2ebcc67b32';

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${API_TOKEN}`
};

// 需要设置的权限
const permissions = {
  'api::activity.activity': ['find', 'findOne'],
  'api::home-page.home-page': ['find'],
  'api::about-page.about-page': ['find'],
  'api::site-setting.site-setting': ['find'],
};

async function setupPermissions() {
  console.log('🔐 开始配置 API 权限...\n');

  try {
    // 1. 获取 Public 角色
    console.log('📋 获取 Public 角色信息...');
    const rolesResponse = await fetch(`${API_URL}/users-permissions/roles`, {
      headers
    });

    if (!rolesResponse.ok) {
      throw new Error('无法获取角色列表');
    }

    const rolesData = await rolesResponse.json();
    const publicRole = rolesData.roles.find(role => role.type === 'public');

    if (!publicRole) {
      throw new Error('找不到 Public 角色');
    }

    console.log(`✅ 找到 Public 角色 (ID: ${publicRole.id})\n`);

    // 2. 获取当前权限
    console.log('📋 获取当前权限配置...');
    const roleResponse = await fetch(`${API_URL}/users-permissions/roles/${publicRole.id}`, {
      headers
    });

    if (!roleResponse.ok) {
      throw new Error('无法获取角色详情');
    }

    const roleData = await roleResponse.json();
    const currentPermissions = roleData.role.permissions || {};

    console.log('✅ 当前权限:', Object.keys(currentPermissions).length, '个\n');

    // 3. 更新权限
    console.log('🔧 更新权限配置...');

    // 构建新的权限对象
    const updatedPermissions = { ...currentPermissions };

    for (const [controller, actions] of Object.entries(permissions)) {
      if (!updatedPermissions[controller]) {
        updatedPermissions[controller] = { controllers: {} };
      }

      const controllerName = controller.split('.').pop();

      if (!updatedPermissions[controller].controllers) {
        updatedPermissions[controller].controllers = {};
      }

      if (!updatedPermissions[controller].controllers[controllerName]) {
        updatedPermissions[controller].controllers[controllerName] = {};
      }

      // 设置每个 action 为 enabled
      for (const action of actions) {
        updatedPermissions[controller].controllers[controllerName][action] = {
          enabled: true
        };
        console.log(`  ✅ 启用: ${controller} -> ${action}`);
      }
    }

    // 4. 保存更新
    console.log('\n💾 保存权限配置...');
    const updateResponse = await fetch(`${API_URL}/users-permissions/roles/${publicRole.id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({
        name: publicRole.name,
        description: publicRole.description,
        type: publicRole.type,
        permissions: updatedPermissions
      })
    });

    if (!updateResponse.ok) {
      const error = await updateResponse.json();
      throw new Error(`更新失败: ${JSON.stringify(error)}`);
    }

    console.log('✅ 权限配置已保存\n');
    console.log('🎉 API 权限配置完成！');
    console.log('\n现在可以访问以下端点：');
    console.log('  - GET /api/activities');
    console.log('  - GET /api/activities/:id');
    console.log('  - GET /api/home-page');
    console.log('  - GET /api/about-page');
    console.log('  - GET /api/site-setting\n');

  } catch (error) {
    console.error('❌ 配置权限时出错:', error.message);
    process.exit(1);
  }
}

setupPermissions();
