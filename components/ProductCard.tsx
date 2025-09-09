'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/lib/types';

export default function ProductCard({ product, mode }: { product: Product; mode: 'b2b' | 'b2c' }) {
  return (
    <div className="group rounded-2xl border overflow-hidden bg-white shadow-sm hover:shadow-md transition">
      <Link href={`/product/${product.slug}`} target="_blank" className="block relative">
        <div className="relative w-full aspect-square overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width:768px) 50vw, (max-width:1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            priority={false}
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3">
            <div className="text-white text-sm font-medium line-clamp-1">{product.name}</div>
            <div className="text-white/80 text-[12px]">
              {product.type} • {product.color} • {product.size}mm
            </div>
          </div>
        </div>
      </Link>

      <div className="p-4 flex items-center justify-between">
        {mode === 'b2c' && product.price ? (
          <div className="text-base font-semibold">₹{product.price.toLocaleString('en-IN')}</div>
        ) : (
          <div className="text-xs text-gray-600">MOQ on request • Lead 7–15 days</div>
        )}

        <Link
          href={`/product/${product.slug}`}
          target="_blank"
          className="text-sm px-3 py-1.5 rounded-full border hover:bg-gray-50 transition"
        >
          View
        </Link>
      </div>
    </div>
  );
}
