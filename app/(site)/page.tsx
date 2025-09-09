'use client';

import Link from 'next/link';
import Image from 'next/image';
import products from '@/data/products.json';

export default function HomePage() {
  const featured = (products as any[]).slice(0, 6);

  return (
    <main className="space-y-16">
      {/* HERO */}
      <section className="relative h-[60vh] min-h-[420px] w-full overflow-hidden rounded-none">
        <Image
          src="/images/hero/pearls-1.jpg"
          alt="Fine pearls"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 container-x h-full flex flex-col items-start justify-center text-white">
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight">
            Sstringz Pearls
          </h1>
          <p className="mt-4 max-w-2xl text-base md:text-lg text-white/90">
            Premium Pearl Jewellery — **Retail** (B2C) aur **Wholesale** (B2B) dono ke liye.
          </p>
          <div className="mt-8 flex gap-3">
            <Link href="/catalogue" className="btn-primary">Shop B2C</Link>
            <Link href="/b2b" className="btn-secondary">Wholesale (B2B)</Link>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="container-x grid gap-6 md:grid-cols-3">
        {[
          { title: 'Crystal-clear Images', body: 'HD photos, zoom & 4K video support.' },
          { title: 'Fast & App-like', body: 'Quick load, responsive, A2HS (PWA) ready.' },
          { title: 'Filters that work', body: 'Color, Type, Size, Origin, Shape, Metal…' },
        ].map((f) => (
          <div key={f.title} className="rounded-2xl border bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold">{f.title}</h3>
            <p className="mt-1 text-gray-600 text-sm">{f.body}</p>
          </div>
        ))}
      </section>

      {/* FEATURED PRODUCTS (demo) */}
      <section className="container-x">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Featured</h2>
          <Link href="/catalogue" className="text-gray-700 hover:underline">View all</Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <Link
              key={p.slug}
              href={`/product/${p.slug}`}
              className="group overflow-hidden rounded-2xl border bg-white shadow-sm hover:shadow-md"
            >
              {/* fallback demo image */}
              <div className="aspect-[4/3] w-full bg-gray-100">
                <Image
                  src={`/images/pearls/${p.images?.[0] ?? 'akoya-classic.jpg'}`}
                  alt={p.title}
                  width={900}
                  height={700}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-4">
                <div className="line-clamp-1 font-medium">{p.title}</div>
                <div className="mt-1 text-sm text-gray-600">
                  {p.type} • {p.color} • {p.size}mm
                </div>
                <div className="mt-2 font-semibold">₹{p.price?.toLocaleString?.('en-IN') ?? p.price}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="container-x rounded-2xl border bg-white p-8 text-center shadow-sm">
        <h3 className="text-lg font-semibold">Need help choosing Pearls?</h3>
        <p className="mt-1 text-gray-600">Message us on WhatsApp for quick guidance & bulk quotes.</p>
        <div className="mt-4 flex justify-center">
          <a
            className="btn-primary"
            href="https://wa.me/919999999999?text=Hi%20Sstringz%20Pearls"
            target="_blank"
          >
            Chat on WhatsApp
          </a>
        </div>
      </section>
    </main>
  );
}
