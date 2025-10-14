/**
 * Core TypeScript type definitions
 */

// Base Strapi Response Types
export interface StrapiMedia {
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
  url: string;
}

export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiEntity<T> {
  id: number;
  attributes: T & {
    createdAt: string;
    updatedAt: string;
    publishedAt?: string;
  };
}

// Content Type Interfaces
export interface Activity {
  title: string;
  description: string;
  image: { data: StrapiEntity<StrapiMedia> };
  date: string;
  location: string;
  tags: string[];
  registrationLink?: string;
  featured: boolean;
}

export interface ImpactStats {
  cities: number;
  activitiesCount: number;
  participants: number;
  partners: number;
}

export interface SiteSettings {
  heroTitle: string;
  heroSubtitle: string;
  heroImage: { data: StrapiEntity<StrapiMedia> };
  contactEmail: string;
  contactAddress: string;
  socialLinks: {
    wechat?: string;
    weibo?: string;
    bilibili?: string;
  };
}

export interface LifeSchoolModule {
  title: string;
  description: string;
  duration: string;
}

export interface Mentor {
  name: string;
  role: string;
  bio: string;
  image: { data: StrapiEntity<StrapiMedia> };
}

export interface LifeSchool {
  title: string;
  description: string;
  modules: LifeSchoolModule[];
  mentors: { data: StrapiEntity<Mentor>[] };
  applicationLink?: string;
}

export interface AITool {
  name: string;
  description: string;
  icon: string;
  status: "available" | "developing" | "planned";
  available: boolean;
}

// UI Component Props
export interface NavLink {
  href: string;
  label: string;
}

export interface PageProps {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
}
