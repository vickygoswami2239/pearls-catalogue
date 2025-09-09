import Link from 'next/link';
import products from '@/data/products.json';
import { Product } from '@/lib/types';

type Props = { slug: string; type?: string };

export default function RelatedProducts({ slug, type }: Props) {
  const list = (products as Product[])
    .filter((p) => p.slug !== slug && (!type || p.type === type))
    .slice(0, 4);

  if (!list.length) return null;

  return (
    <section className="mt-10">
      <h3 className="mb-3 text-lg font-semibold">You may also like</h3>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
        {list.map((p) => (
          <Link
            key={p.slug}
            href={`/product/${p.slug}`}
            className="group rounded-2xl border overflow-hidden hover:shadow-sm"
          >
            <div className="aspect-square overflow-hidden bg-gray-50">
              <img
                src={p.image}
                alt={p.name}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="p-3">
              <div className="line-clamp-1 text-sm font-medium">{p.name}</div>
              {typeof p.price === 'number' && (
                <div className="text-xs text-gray-600 mt-1">
                  From ₹{p.price.toLocaleString('en-IN')}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
