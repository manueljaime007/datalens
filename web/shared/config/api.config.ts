/**
 * Centralized API configuration.
 *
 * The base URL is intentionally read from an env var so the production
 * domain is not hardcoded in the source. The Flask API exposes its routes
 * under a /api prefix.
 *
 * Required env vars (web/.env.local):
 *   NEXT_PUBLIC_API_BASE_URL=https://datalens-api-baz4.onrender.com
 */

// const DEFAULT_BASE_URL = "http://localhost:8000";
const DEFAULT_BASE_URL = "https://datalens-api-baz4.onrender.com";

export const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL ?? DEFAULT_BASE_URL,
  prefix: "/api",
  timeoutMs: 15_000,
} as const;

/**
 * Build a full URL for an API path.
 * Example: apiUrl("/analyses") -> "https://.../api/analyses"
 */
export function apiUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${API_CONFIG.baseUrl}${API_CONFIG.prefix}${normalized}`;
}
