/**
 * Strapi CMS Content Type Definitions
 * 基于 Phase 2 创建的内容类型架构
 */

// ============================================================================
// Base Strapi Types
// ============================================================================

export interface StrapiImage {
  id: number;
  name: string;
  alternativeText?: string;
  caption?: string;
  width: number;
  height: number;
  formats?: {
    thumbnail?: StrapiImageFormat;
    small?: StrapiImageFormat;
    medium?: StrapiImageFormat;
    large?: StrapiImageFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl?: string;
  provider: string;
  createdAt: string;
  updatedAt: string;
}

export interface StrapiImageFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  path?: string;
  url: string;
}

export interface StrapiEntity<T> {
  id: number;
  attributes: T & {
    createdAt: string;
    updatedAt: string;
    publishedAt?: string;
  };
}

export interface StrapiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// ============================================================================
// SEO Component
// ============================================================================

export interface SeoMetaData {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string;
  metaImage?: { data: StrapiEntity<StrapiImage> | null };
  metaRobots?: string;
  structuredData?: Record<string, unknown>;
  canonicalUrl?: string;
}

// ============================================================================
// Shared Components
// ============================================================================

export interface SharedButton {
  id: number;
  label: string;
  url?: string;
  variant?: 'default' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'link';
  size?: 'sm' | 'default' | 'lg';
  openInNewTab?: boolean;
  icon?: string;
}

export interface SharedFeatureItem {
  id: number;
  title: string;
  description?: string;
  icon?: string;
  image?: { data: StrapiEntity<StrapiImage> | null };
  link?: string;
  linkText?: string;
}

// ============================================================================
// Section Components
// ============================================================================

export interface SectionHero {
  id: number;
  __component: 'sections.hero';
  title: string;
  subtitle?: string;
  description?: string;
  backgroundImage?: { data: StrapiEntity<StrapiImage> | null };
  ctaButtons?: SharedButton[];
  alignment?: 'left' | 'center' | 'right';
  height?: 'small' | 'medium' | 'large' | 'fullscreen';
  overlay?: boolean;
  overlayOpacity?: number;
}

export interface SectionRichText {
  id: number;
  __component: 'sections.rich-text';
  content: string;
  layout?: 'narrow' | 'medium' | 'wide' | 'full';
  backgroundColor?: string;
}

export interface SectionFeatureGrid {
  id: number;
  __component: 'sections.feature-grid';
  title?: string;
  description?: string;
  features?: SharedFeatureItem[];
  columns?: number;
  layout?: 'grid' | 'list';
}

export interface SectionActivityList {
  id: number;
  __component: 'sections.activity-list';
  title?: string;
  description?: string;
  showFilters?: boolean;
  defaultCategory?: 'all' | 'workshop' | 'seminar' | 'community' | 'project' | 'other';
  itemsPerPage?: number;
  layout?: 'grid' | 'list';
  showFeaturedOnly?: boolean;
}

export interface SectionImageGallery {
  id: number;
  __component: 'sections.image-gallery';
  title?: string;
  images: { data: StrapiEntity<StrapiImage>[] };
  layout?: 'masonry' | 'grid' | 'slider';
  columns?: number;
  aspectRatio?: 'square' | 'landscape' | 'portrait' | 'original';
}

// Union type for all section components
export type DynamicZoneSection =
  | SectionHero
  | SectionRichText
  | SectionFeatureGrid
  | SectionActivityList
  | SectionImageGallery;

// ============================================================================
// Layout Components
// ============================================================================

export interface SocialLink {
  name: string;
  url: string;
  icon?: string;
}

export interface FooterLink {
  label: string;
  url: string;
  openInNewTab?: boolean;
}

export interface LayoutFooter {
  id: number;
  copyrightText?: string;
  links?: FooterLink[];
  socialLinks?: SocialLink[];
  additionalInfo?: string;
}

// ============================================================================
// Content Types
// ============================================================================

export interface Activity {
  title: string;
  slug: string;
  description?: string;
  content?: string;
  category: 'workshop' | 'seminar' | 'community' | 'project' | 'other';
  featuredImage?: { data: StrapiEntity<StrapiImage> | null };
  startDate?: string;
  endDate?: string;
  location?: string;
  registrationUrl?: string;
  capacity?: number;
  tags?: string[];
  featured?: boolean;
  seo?: SeoMetaData;
}

export interface HomePage {
  seo?: SeoMetaData;
  sections?: DynamicZoneSection[];
}

export interface AboutPage {
  seo?: SeoMetaData;
  sections?: DynamicZoneSection[];
}

export interface SiteSettings {
  siteName: string;
  siteDescription?: string;
  siteLogo?: { data: StrapiEntity<StrapiImage> | null };
  favicon?: { data: StrapiEntity<StrapiImage> | null };
  defaultSeo?: SeoMetaData;
  footer?: LayoutFooter;
  mainNavigation?: {
    label: string;
    url: string;
    openInNewTab?: boolean;
  }[];
  socialLinks?: SocialLink[];
  contactEmail?: string;
  contactPhone?: string;
  address?: string;
}
