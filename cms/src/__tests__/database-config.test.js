/**
 * Database Configuration Tests
 * 验证数据库配置是否正确
 */

const databaseConfig = require('../../config/database');

describe('Database Configuration', () => {
  test('should export a function', () => {
    expect(typeof databaseConfig).toBe('function');
  });

  test('should return PostgreSQL configuration', () => {
    const mockEnv = (key, defaultValue) => {
      const values = {
        'DATABASE_HOST': 'localhost',
        'DATABASE_PORT': 5432,
        'DATABASE_NAME': 'polaris_youth_dev',
        'DATABASE_USERNAME': 'postgres',
        'DATABASE_PASSWORD': 'postgres',
        'DATABASE_SSL': false,
      };
      return values[key] !== undefined ? values[key] : defaultValue;
    };
    mockEnv.int = (key, defaultValue) => parseInt(mockEnv(key, defaultValue));
    mockEnv.bool = (key, defaultValue) => mockEnv(key, defaultValue) === 'true';

    const config = databaseConfig({ env: mockEnv });

    expect(config.connection).toBeDefined();
    expect(config.connection.client).toBe('postgres');
    expect(config.connection.connection).toBeDefined();
    expect(config.connection.connection.host).toBe('localhost');
    expect(config.connection.connection.port).toBe(5432);
    expect(config.connection.connection.database).toBe('polaris_youth_dev');
  });

  test('should have debug flag', () => {
    const mockEnv = (key, defaultValue) => defaultValue;
    mockEnv.int = (key, defaultValue) => defaultValue;
    mockEnv.bool = (key, defaultValue) => defaultValue;

    const config = databaseConfig({ env: mockEnv });

    expect(config.connection.debug).toBeDefined();
    expect(typeof config.connection.debug).toBe('boolean');
  });
});
