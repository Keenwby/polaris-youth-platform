import type { Schema, Attribute } from '@strapi/strapi';

export interface SharedFeatureItem extends Schema.Component {
  collectionName: 'components_shared_feature_item';
  info: {
    displayName: 'Feature Item';
    description: 'Individual feature or service item';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    description: Attribute.Text;
    icon: Attribute.String;
    image: Attribute.Media<'images'>;
    link: Attribute.String;
    linkText: Attribute.String &
      Attribute.DefaultTo<'\u4E86\u89E3\u66F4\u591A'>;
  };
}

export interface SharedButton extends Schema.Component {
  collectionName: 'components_shared_button';
  info: {
    displayName: 'Button';
    description: 'Call-to-action button';
  };
  attributes: {
    label: Attribute.String & Attribute.Required;
    url: Attribute.String;
    variant: Attribute.Enumeration<
      ['default', 'secondary', 'outline', 'ghost', 'destructive', 'link']
    > &
      Attribute.DefaultTo<'default'>;
    size: Attribute.Enumeration<['sm', 'default', 'lg']> &
      Attribute.DefaultTo<'default'>;
    openInNewTab: Attribute.Boolean & Attribute.DefaultTo<false>;
    icon: Attribute.String;
  };
}

export interface SeoMetaData extends Schema.Component {
  collectionName: 'components_seo_meta_data';
  info: {
    displayName: 'Meta Data';
    description: 'SEO metadata for pages';
  };
  attributes: {
    metaTitle: Attribute.String &
      Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    metaDescription: Attribute.Text &
      Attribute.SetMinMaxLength<{
        maxLength: 160;
      }>;
    keywords: Attribute.Text;
    metaImage: Attribute.Media<'images'>;
    metaRobots: Attribute.String & Attribute.DefaultTo<'index, follow'>;
    structuredData: Attribute.JSON;
    canonicalUrl: Attribute.String;
  };
}

export interface SectionsRichText extends Schema.Component {
  collectionName: 'components_sections_rich_text';
  info: {
    displayName: 'Rich Text Section';
    description: 'Section with rich text content';
  };
  attributes: {
    content: Attribute.RichText & Attribute.Required;
    layout: Attribute.Enumeration<['narrow', 'medium', 'wide', 'full']> &
      Attribute.DefaultTo<'medium'>;
    backgroundColor: Attribute.String;
  };
}

export interface SectionsImageGallery extends Schema.Component {
  collectionName: 'components_sections_image_gallery';
  info: {
    displayName: 'Image Gallery';
    description: 'Photo gallery section';
  };
  attributes: {
    title: Attribute.String;
    images: Attribute.Media<'images', true> & Attribute.Required;
    layout: Attribute.Enumeration<['masonry', 'grid', 'slider']> &
      Attribute.DefaultTo<'grid'>;
    columns: Attribute.Integer &
      Attribute.SetMinMax<
        {
          min: 2;
          max: 6;
        },
        number
      > &
      Attribute.DefaultTo<3>;
    aspectRatio: Attribute.Enumeration<
      ['square', 'landscape', 'portrait', 'original']
    > &
      Attribute.DefaultTo<'original'>;
  };
}

export interface SectionsHero extends Schema.Component {
  collectionName: 'components_sections_hero';
  info: {
    displayName: 'Hero Section';
    description: 'Hero banner section with title, description and CTA';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    subtitle: Attribute.Text;
    description: Attribute.RichText;
    backgroundImage: Attribute.Media<'images' | 'videos'>;
    ctaButtons: Attribute.Component<'shared.button', true>;
    alignment: Attribute.Enumeration<['left', 'center', 'right']> &
      Attribute.DefaultTo<'center'>;
    height: Attribute.Enumeration<['small', 'medium', 'large', 'fullscreen']> &
      Attribute.DefaultTo<'large'>;
    overlay: Attribute.Boolean & Attribute.DefaultTo<false>;
    overlayOpacity: Attribute.Integer &
      Attribute.SetMinMax<
        {
          min: 0;
          max: 100;
        },
        number
      > &
      Attribute.DefaultTo<50>;
  };
}

export interface SectionsFeatureGrid extends Schema.Component {
  collectionName: 'components_sections_feature_grid';
  info: {
    displayName: 'Feature Grid';
    description: 'Grid of features or services';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text;
    features: Attribute.Component<'shared.feature-item', true>;
    columns: Attribute.Integer &
      Attribute.SetMinMax<
        {
          min: 1;
          max: 4;
        },
        number
      > &
      Attribute.DefaultTo<3>;
    layout: Attribute.Enumeration<['grid', 'list']> &
      Attribute.DefaultTo<'grid'>;
  };
}

export interface SectionsActivityList extends Schema.Component {
  collectionName: 'components_sections_activity_list';
  info: {
    displayName: 'Activity List Section';
    description: 'Display list of activities with filters';
  };
  attributes: {
    title: Attribute.String & Attribute.DefaultTo<'\u6700\u65B0\u6D3B\u52A8'>;
    description: Attribute.Text;
    showFilters: Attribute.Boolean & Attribute.DefaultTo<true>;
    defaultCategory: Attribute.Enumeration<
      ['all', 'workshop', 'seminar', 'community', 'project', 'other']
    > &
      Attribute.DefaultTo<'all'>;
    itemsPerPage: Attribute.Integer &
      Attribute.SetMinMax<
        {
          min: 1;
          max: 20;
        },
        number
      > &
      Attribute.DefaultTo<6>;
    layout: Attribute.Enumeration<['grid', 'list']> &
      Attribute.DefaultTo<'grid'>;
    showFeaturedOnly: Attribute.Boolean & Attribute.DefaultTo<false>;
  };
}

export interface LayoutFooter extends Schema.Component {
  collectionName: 'components_layout_footer';
  info: {
    displayName: 'Footer';
    description: 'Website footer configuration';
  };
  attributes: {
    copyrightText: Attribute.String &
      Attribute.DefaultTo<'\u00A9 2025 \u5317\u8FB0\u9752\u5E74\u53D1\u5C55\u4E2D\u5FC3. All rights reserved.'>;
    links: Attribute.JSON & Attribute.DefaultTo<[]>;
    socialLinks: Attribute.JSON & Attribute.DefaultTo<[]>;
    additionalInfo: Attribute.RichText;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'shared.feature-item': SharedFeatureItem;
      'shared.button': SharedButton;
      'seo.meta-data': SeoMetaData;
      'sections.rich-text': SectionsRichText;
      'sections.image-gallery': SectionsImageGallery;
      'sections.hero': SectionsHero;
      'sections.feature-grid': SectionsFeatureGrid;
      'sections.activity-list': SectionsActivityList;
      'layout.footer': LayoutFooter;
    }
  }
}
