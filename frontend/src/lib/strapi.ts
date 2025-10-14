/**
 * Strapi API Client
 * Type-safe wrapper for Strapi REST API calls
 */

import { API_CONFIG } from "./constants";
import type { StrapiResponse, StrapiEntity } from "@/types";

interface FetchOptions {
  filters?: Record<string, any>;
  sort?: string | string[];
  pagination?: {
    page?: number;
    pageSize?: number;
    withCount?: boolean;
    limit?: number;
  };
  populate?: string | string[] | Record<string, any> | "*";
  publicationState?: "live" | "preview";
}

/**
 * Build query string from options
 */
function buildQueryString(options: FetchOptions = {}): string {
  const params = new URLSearchParams();

  // Filters
  if (options.filters) {
    Object.entries(options.filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(`filters[${key}][$eq]`, String(value));
      }
    });
  }

  // Sort
  if (options.sort) {
    const sortArray = Array.isArray(options.sort) ? options.sort : [options.sort];
    sortArray.forEach((sort, index) => {
      params.append(`sort[${index}]`, sort);
    });
  }

  // Pagination
  if (options.pagination) {
    const { page, pageSize, withCount, limit } = options.pagination;
    if (page) params.append("pagination[page]", String(page));
    if (pageSize) params.append("pagination[pageSize]", String(pageSize));
    if (withCount !== undefined)
      params.append("pagination[withCount]", String(withCount));
    if (limit) params.append("pagination[limit]", String(limit));
  }

  // Populate
  if (options.populate) {
    if (typeof options.populate === "string") {
      params.append("populate", options.populate);
    } else if (Array.isArray(options.populate)) {
      options.populate.forEach((field, index) => {
        params.append(`populate[${index}]`, field);
      });
    } else if (typeof options.populate === "object") {
      Object.entries(options.populate).forEach(([key, value]) => {
        params.append(`populate[${key}]`, String(value));
      });
    }
  }

  // Publication State
  if (options.publicationState) {
    params.append("publicationState", options.publicationState);
  }

  const queryString = params.toString();
  return queryString ? `?${queryString}` : "";
}

/**
 * Generic fetch function for Strapi API
 */
async function strapiFetch<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const queryString = buildQueryString(options);
  const url = `${API_CONFIG.strapiApiUrl}/${endpoint}${queryString}`;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  // Add authorization token if available
  if (API_CONFIG.strapiToken) {
    headers["Authorization"] = `Bearer ${API_CONFIG.strapiToken}`;
  }

  try {
    const response = await fetch(url, {
      headers,
      next: {
        revalidate: 60, // Revalidate every 60 seconds
      },
    });

    if (!response.ok) {
      throw new Error(
        `Strapi API error: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching from Strapi: ${endpoint}`, error);
    throw error;
  }
}

/**
 * Fetch collection of items
 */
export async function fetchCollection<T>(
  collectionName: string,
  options: FetchOptions = {}
): Promise<StrapiResponse<StrapiEntity<T>[]>> {
  return strapiFetch<StrapiResponse<StrapiEntity<T>[]>>(
    collectionName,
    options
  );
}

/**
 * Fetch single item by ID
 */
export async function fetchSingle<T>(
  collectionName: string,
  id: string | number,
  options: Omit<FetchOptions, "filters" | "pagination"> = {}
): Promise<StrapiResponse<StrapiEntity<T>>> {
  return strapiFetch<StrapiResponse<StrapiEntity<T>>>(
    `${collectionName}/${id}`,
    options
  );
}

/**
 * Fetch single type (e.g., site-settings)
 */
export async function fetchSingleType<T>(
  typeName: string,
  options: Omit<FetchOptions, "filters" | "pagination"> = {}
): Promise<StrapiResponse<T>> {
  return strapiFetch<StrapiResponse<T>>(typeName, options);
}

/**
 * Helper function to get media URL
 */
export function getMediaUrl(url: string): string {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return `${API_CONFIG.strapiUrl}${url}`;
}

/**
 * Helper function to extract attributes from Strapi entity
 */
export function extractAttributes<T>(
  entity: StrapiEntity<T> | undefined | null
): T | null {
  if (!entity) return null;
  return entity.attributes;
}

/**
 * Helper function to extract array of attributes
 */
export function extractAttributesArray<T>(
  entities: StrapiEntity<T>[] | undefined | null
): T[] {
  if (!entities || !Array.isArray(entities)) return [];
  return entities.map((entity) => entity.attributes);
}
