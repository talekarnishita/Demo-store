/** Mirrors Strapi Order content type (docs/03-data-modelling-schema.md) */
export type OrderStatus = 'pending' | 'paid' | 'failed';

export interface Order {
  id: number;
  documentId: string;
  stripeSessionId: string | null;
  status: OrderStatus;
  amount: number;
  customerEmail: string | null;
  product?: { id: number; name: string } | null;
  createdAt?: string;
  updatedAt?: string;
}
