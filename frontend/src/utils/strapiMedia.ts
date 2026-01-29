/**
 * Resolve Strapi media URL (e.g. image). Use base URL when path is relative (e.g. production).
 */
const BASE = import.meta.env.VITE_STRAPI_URL || '';

export function strapiMediaUrl(path: string | undefined | null): string {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  const base = BASE.replace(/\/$/, '');
  const p = path.startsWith('/') ? path : `/${path}`;
  return base ? `${base}${p}` : p;
}
