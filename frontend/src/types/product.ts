/** Mirrors Strapi Product content type (docs/03-data-modelling-schema.md) */
export interface Product {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  price: number;
  description: string | null;
  image?: { url: string; alternativeText?: string } | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductListResponse {
  data: Product[];
  meta?: { pagination?: { page: number; pageSize: number; pageCount: number; total: number } };
}
