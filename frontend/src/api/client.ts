/**
 * Central API client – all HTTP calls use this base URL.
 * Set VITE_STRAPI_URL in .env (e.g. https://api.yourproject.com).
 */
const BASE = import.meta.env.VITE_STRAPI_URL || '';

export function apiUrl(path: string): string {
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${BASE.replace(/\/$/, '')}${p}`;
}

export async function apiFetch<T>(
  path: string,
  options?: RequestInit
): Promise<T> {
  const url = apiUrl(path);
  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API ${res.status}: ${text || res.statusText}`);
  }
  return res.json() as Promise<T>;
}
