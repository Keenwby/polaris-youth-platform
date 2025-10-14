/**
 * Application-wide constants
 */

// Site Configuration
export const SITE_CONFIG = {
  name: "北辰青年发展中心",
  tagline: "让青年活成自己想要的模样",
  description: "通过社群、行动与对话，陪伴你探索成长的可能性",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
} as const;

// Navigation Links
export const NAV_LINKS = [
  { href: "/", label: "首页" },
  { href: "/life-school", label: "人生学校" },
  { href: "/past-activities", label: "过往活动" },
  { href: "/beichen-life", label: "北辰生活" },
] as const;

// Social Media Links
export const SOCIAL_LINKS = {
  wechat: "#",
  email: "contact@beichen.org",
  address: "北京市朝阳区",
} as const;

// API Configuration
export const API_CONFIG = {
  strapiUrl: process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337",
  strapiApiUrl:
    process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337/api",
  strapiToken: process.env.STRAPI_API_TOKEN || "",
} as const;

// Pagination
export const PAGINATION = {
  defaultPageSize: 12,
  activitiesPerPage: 9,
} as const;

// Animation Durations (ms)
export const ANIMATION = {
  fast: 150,
  normal: 300,
  slow: 500,
} as const;
