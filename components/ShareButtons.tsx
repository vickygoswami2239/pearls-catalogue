'use client';
import { Product } from '@/lib/types';
import { buildShareUrl } from '@/lib/referral';

export default function ShareButtons({ product }: { product: Product }) {
  const url = typeof window !== 'undefined' ? buildShareUrl(`/product/${product.slug}`) : '';
  const text = encodeURIComponent(`Check this ${product.name} on Sstringz Pearls. Buy from my link & support me!`);
  const wa = `https://wa.me/?text=${text}%20${encodeURIComponent(url)}`;

  return (
    <a className="btn" target="_blank" rel="noreferrer" href={wa}>
      Share on WhatsApp
    </a>
  );
}
