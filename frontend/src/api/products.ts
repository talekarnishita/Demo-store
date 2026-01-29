/**
 * Product API – all Strapi product calls live here (context window: api layer).
 */
import { apiFetch } from './client';
import type { Product, ProductListResponse } from '@/types/product';

export async function getProducts(): Promise<ProductListResponse> {
  return apiFetch<ProductListResponse>('/api/products?populate=image');
}

export async function getProductBySlug(slug: string): Promise<{ data: Product }> {
  return apiFetch<{ data: Product[] }>(
    `/api/products?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=image`
  ).then((res) => {
    const product = res.data?.[0];
    if (!product) throw new Error('Product not found');
    return { data: product };
  });
}

export async function getProductById(id: number): Promise<{ data: Product }> {
  return apiFetch<{ data: Product }>(`/api/products/${id}?populate=image`);
}
