'use client';
import ProductGrid from '@/components/ProductGrid';
import products from '@/data/products.json';
import Filters from '@/components/Filters';
import { useState } from 'react';
import { applyFilters, type FilterState } from '@/lib/filter';


export default function B2CPage() {
const [filters, setFilters] = useState<FilterState>({});
const filtered = applyFilters(products, filters);
return (
<div className="space-y-6">
<h1 className="text-2xl font-semibold">Pearl Catalogue — Retail (B2C)</h1>
<Filters value={filters} onChange={setFilters} products={products} />
<ProductGrid products={filtered} mode="b2c" />
</div>
);
}
