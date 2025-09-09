'use client';
import Head from 'next/head';

type Props = {
  p: {
    name: string;
    description?: string;
    price?: number;
    images?: string[];
    sku?: string;
    brand?: string;
  };
};

export default function ProductSEO({ p }: Props) {
  const jsonLd = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: p.name,
    image: p.images || [],
    description: p.description || '',
    sku: p.sku || '',
    brand: { '@type': 'Brand', name: p.brand || 'Brand' },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'INR',
      price: p.price || 0,
      availability: 'https://schema.org/InStock',
    },
  };
  return (
    <Head>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </Head>
  );
}
