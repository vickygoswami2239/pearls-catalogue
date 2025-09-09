'use client';

import { useState } from 'react';
import productsData from '@/data/products.json';
import Filters from '@/components/Filters';
import ProductGrid from '@/components/ProductGrid';
import { applyFilters, type FilterState } from '@/lib/filter';

export default function CatalogueClient() {
  const products = productsData as any[];
  const [filters, setFilters] = useState<FilterState>({});
  const filtered = applyFilters(products, filters);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Pearl Catalogue</h1>
        <p className="text-sm text-gray-600">
          Retail (B2C): filter karke products dekho aur Buy Now se order karo.
        </p>
      </div>

      <Filters value={filters} onChange={setFilters} products={products} />
      <ProductGrid products={filtered} mode="b2c" />
    </div>
  );
}
