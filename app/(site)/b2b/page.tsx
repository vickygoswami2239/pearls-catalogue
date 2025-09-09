'use client';
import ProductGrid from '@/components/ProductGrid';
import products from '@/data/products.json';
import Filters from '@/components/Filters';
import { useState } from 'react';
import { applyFilters, type FilterState } from '@/lib/filter';
import HeroSlider from '@/components/HeroSlider';   // <-- add this line

export default function B2BPage() {
  const [filters, setFilters] = useState<FilterState>({});
  const filtered = applyFilters(products, filters);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Pearl Catalogue — Wholesale (B2B)</h1>
      <p className="text-sm text-gray-600">Wholesale queries create a lead with desired specs & MOQ.</p>

      <HeroSlider />  {/* <-- slider yahan aayega (Filters se upar) */}

      <Filters value={filters} onChange={setFilters} products={products} />
      <ProductGrid products={filtered} mode="b2b" />
    </div>
  );
}
