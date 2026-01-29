/**
 * useProducts – data fetching for product list (context window: hooks).
 */
import { useState, useEffect } from 'react';
import { getProducts } from '@/api/products';
import type { Product } from '@/types/product';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    getProducts()
      .then((res) => setProducts(res.data ?? []))
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  return { products, loading, error };
}
