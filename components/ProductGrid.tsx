'use client';
import { Product } from '@/lib/types';
import ProductCard from './ProductCard';


export default function ProductGrid({ products, mode }: { products: Product[], mode: 'b2b'|'b2c' }) {
return (
<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
{products.map(p => <ProductCard key={p.id} product={p} mode={mode} />)}
</div>
);
}
