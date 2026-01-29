/**
 * Order API – all Strapi order calls (context window: api layer).
 */
import { apiFetch } from './client';
import type { Order } from '@/types/order';

export async function getOrders(): Promise<{ data: Order[] }> {
  return apiFetch<{ data: Order[] }>('/api/orders?populate=product');
}

export async function getOrderById(id: number): Promise<{ data: Order }> {
  return apiFetch<{ data: Order }>(`/api/orders/${id}?populate=product`);
}
