/**
 * Content Type Schema Tests
 * 验证所有 Strapi 内容类型的架构是否正确配置
 */

const fs = require('fs');
const path = require('path');

describe('Content Type Schemas', () => {
  describe('Collection Types', () => {
    test('Activity schema should exist and be valid', () => {
      const schemaPath = path.join(__dirname, '../api/activity/content-types/activity/schema.json');
      expect(fs.existsSync(schemaPath)).toBe(true);

      const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));

      expect(schema.kind).toBe('collectionType');
      expect(schema.collectionName).toBe('activities');
      expect(schema.info.singularName).toBe('activity');
      expect(schema.attributes).toBeDefined();
      expect(schema.attributes.title).toBeDefined();
      expect(schema.attributes.title.required).toBe(true);
    });
  });

  describe('Single Types', () => {
    test('Site Setting schema should exist and be valid', () => {
      const schemaPath = path.join(__dirname, '../api/site-setting/content-types/site-setting/schema.json');
      expect(fs.existsSync(schemaPath)).toBe(true);

      const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));

      expect(schema.kind).toBe('singleType');
      expect(schema.collectionName).toBe('site_setting');
      expect(schema.info.singularName).toBe('site-setting');
      expect(schema.attributes).toBeDefined();
      expect(schema.attributes.siteName).toBeDefined();
      expect(schema.attributes.seo).toBeDefined();
    });

    test('Home Page schema should exist and be valid', () => {
      const schemaPath = path.join(__dirname, '../api/home-page/content-types/home-page/schema.json');
      expect(fs.existsSync(schemaPath)).toBe(true);

      const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));

      expect(schema.kind).toBe('singleType');
      expect(schema.collectionName).toBe('home_page');
      expect(schema.info.singularName).toBe('home-page');
      expect(schema.attributes.sections).toBeDefined();
      expect(schema.attributes.sections.type).toBe('dynamiczone');
    });

    test('About Page schema should exist and be valid', () => {
      const schemaPath = path.join(__dirname, '../api/about-page/content-types/about-page/schema.json');
      expect(fs.existsSync(schemaPath)).toBe(true);

      const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));

      expect(schema.kind).toBe('singleType');
      expect(schema.collectionName).toBe('about_page');
      expect(schema.info.singularName).toBe('about-page');
      expect(schema.attributes.sections).toBeDefined();
      expect(schema.attributes.sections.type).toBe('dynamiczone');
    });
  });

  describe('Components', () => {
    describe('SEO Components', () => {
      test('Meta Data component should exist', () => {
        const componentPath = path.join(__dirname, '../components/seo/meta-data.json');
        expect(fs.existsSync(componentPath)).toBe(true);

        const component = JSON.parse(fs.readFileSync(componentPath, 'utf8'));
        expect(component.collectionName).toBe('components_seo_meta_data');
        expect(component.attributes.metaTitle).toBeDefined();
        expect(component.attributes.metaDescription).toBeDefined();
      });
    });

    describe('Layout Components', () => {
      test('Footer component should exist', () => {
        const componentPath = path.join(__dirname, '../components/layout/footer.json');
        expect(fs.existsSync(componentPath)).toBe(true);

        const component = JSON.parse(fs.readFileSync(componentPath, 'utf8'));
        expect(component.collectionName).toBe('components_layout_footer');
        expect(component.attributes.copyrightText).toBeDefined();
      });
    });

    describe('Section Components', () => {
      const sectionComponents = [
        { name: 'hero', collectionName: 'components_sections_hero' },
        { name: 'rich-text', collectionName: 'components_sections_rich_text' },
        { name: 'feature-grid', collectionName: 'components_sections_feature_grid' },
        { name: 'activity-list', collectionName: 'components_sections_activity_list' },
        { name: 'image-gallery', collectionName: 'components_sections_image_gallery' },
      ];

      sectionComponents.forEach(({ name, collectionName }) => {
        test(`${name} section component should exist`, () => {
          const componentPath = path.join(__dirname, `../components/sections/${name}.json`);
          expect(fs.existsSync(componentPath)).toBe(true);

          const component = JSON.parse(fs.readFileSync(componentPath, 'utf8'));
          expect(component.collectionName).toBe(collectionName);
        });
      });

      test('Hero component should have required fields', () => {
        const componentPath = path.join(__dirname, '../components/sections/hero.json');
        const component = JSON.parse(fs.readFileSync(componentPath, 'utf8'));

        expect(component.attributes.title).toBeDefined();
        expect(component.attributes.title.required).toBe(true);
        expect(component.attributes.alignment).toBeDefined();
        expect(component.attributes.height).toBeDefined();
      });

      test('Activity List component should have filters config', () => {
        const componentPath = path.join(__dirname, '../components/sections/activity-list.json');
        const component = JSON.parse(fs.readFileSync(componentPath, 'utf8'));

        expect(component.attributes.showFilters).toBeDefined();
        expect(component.attributes.defaultCategory).toBeDefined();
        expect(component.attributes.itemsPerPage).toBeDefined();
      });
    });

    describe('Shared Components', () => {
      test('Button component should exist', () => {
        const componentPath = path.join(__dirname, '../components/shared/button.json');
        expect(fs.existsSync(componentPath)).toBe(true);

        const component = JSON.parse(fs.readFileSync(componentPath, 'utf8'));
        expect(component.collectionName).toBe('components_shared_button');
        expect(component.attributes.label).toBeDefined();
        expect(component.attributes.label.required).toBe(true);
      });

      test('Feature Item component should exist', () => {
        const componentPath = path.join(__dirname, '../components/shared/feature-item.json');
        expect(fs.existsSync(componentPath)).toBe(true);

        const component = JSON.parse(fs.readFileSync(componentPath, 'utf8'));
        expect(component.collectionName).toBe('components_shared_feature_item');
        expect(component.attributes.title).toBeDefined();
      });
    });
  });

  describe('Dynamic Zone Configuration', () => {
    test('Home Page should have all section components available', () => {
      const schemaPath = path.join(__dirname, '../api/home-page/content-types/home-page/schema.json');
      const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));

      const expectedComponents = [
        'sections.hero',
        'sections.rich-text',
        'sections.feature-grid',
        'sections.activity-list',
        'sections.image-gallery',
      ];

      expect(schema.attributes.sections.components).toEqual(expect.arrayContaining(expectedComponents));
    });

    test('About Page should have appropriate section components', () => {
      const schemaPath = path.join(__dirname, '../api/about-page/content-types/about-page/schema.json');
      const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));

      const expectedComponents = [
        'sections.hero',
        'sections.rich-text',
        'sections.feature-grid',
        'sections.image-gallery',
      ];

      expect(schema.attributes.sections.components).toEqual(expect.arrayContaining(expectedComponents));
    });
  });
});
