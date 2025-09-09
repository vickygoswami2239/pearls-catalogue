'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import dynamic from 'next/dynamic';

import products from '@/data/products.json';
import { Product } from '@/lib/types';

import MediaGallery from '@/components/MediaGallery';
import ShareButtons from '@/components/ShareButtons';
import QtyStepper from '@/components/QtyStepper';
// ⬇️ CouponBox only on client to avoid SSR/client text mismatches
const CouponBox = dynamic(() => import('@/components/CouponBox'), { ssr: false });

import SpecsAccordion from '@/components/SpecsAccordion';
import StickyCTA from '@/components/StickyCTA';
import EnquiryForm from '@/components/EnquiryForm';

import SocialProof from '@/components/SocialProof';
import TrustBar from '@/components/TrustBar';
import ShippingReturns from '@/components/ShippingReturns';
import FAQ from '@/components/FAQ';
import RelatedProducts from '@/components/RelatedProducts';
import ProductSEO from '@/components/ProductSEO';

import { saveFavorite, isFavorite } from '@/lib/storage';
import { buyNowWithAmount } from '@/lib/razorpay';
import { applyCoupon, calcDiscount, firstPurchaseDone } from '@/lib/coupon';
import { getOrCreateRID } from '@/lib/referral';
import { readMode, type Mode } from '@/lib/mode';

import { Tag } from 'lucide-react';

/** Stable INR formatter */
function formatINR(n: number) {
  try {
    return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(n);
  } catch {
    return Math.round(n).toString();
  }
}

export default function ProductPage() {
  const { slug } = useParams() as { slug: string };

  const product = useMemo<Product | undefined>(
    () => (products as Product[]).find((p) => p.slug === slug),
    [slug]
  );

  const [qty, setQty] = useState(1);
  const [fav, setFav] = useState(false);
  const [mode, setMode] = useState<Mode>('b2c');

  // Hydration guard — tells us when we're on the client
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);

  // CouponBox se mirror hua price state (client only)
  const [priceState, setPriceState] = useState<{ final: number; off: number; percent: number }>({
    final: 0,
    off: 0,
    percent: 0,
  });

  const enquiryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMode(readMode());
  }, []);

  useEffect(() => {
    if (product) setFav(isFavorite(product.id));
  }, [product]);

  // B2C: Auto FIRST5 & referral SHARE10 claim (client-only side effects)
  useEffect(() => {
    if (!product || mode !== 'b2c') return;

    // Auto FIRST5 if first-time
    if (!firstPurchaseDone()) {
      applyCoupon('FIRST5');
      const tot = calcDiscount((product.price ?? 0) * qty);
      setPriceState(tot);
    }

    // Referral reward claim
    const rid = getOrCreateRID();
    fetch(`/api/referral/status?rid=${encodeURIComponent(rid)}&claim=1`)
      .then((r) => r.json())
      .then((d) => {
        if (d?.reward10) {
          applyCoupon(`SHARE10-${rid}`);
          const tot = calcDiscount((product.price ?? 0) * qty);
          setPriceState(tot);
        }
      })
      .catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  if (!product) return <div>Not found</div>;

  const base = product.price ?? 0;
  const galleryImages = product.images?.length
    ? product.images
    : [
        product.image,
        `https://picsum.photos/seed/${product.slug}-2/1200/1200`,
        `https://picsum.photos/seed/${product.slug}-3/1200/1200`,
      ];

  // Server-safe computation (coupon na lage)
  const serverComputed = useMemo(() => calcDiscount(base * qty), [base, qty]);

  // Client par real coupon values; server par safe fallback
  const offDisplay = hydrated ? (priceState.off || serverComputed.off) : serverComputed.off;
  const finalDisplay = hydrated ? (priceState.final || serverComputed.final) : serverComputed.final;
  const percentDisplay = hydrated ? priceState.percent : 0;

  const scrollToEnquiry = () =>
    enquiryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <>
      {/* SEO snippet for product rich results */}
      <ProductSEO
        p={{
          name: product.name,
          description: product.description,
          price: base,
          images: galleryImages,
          sku: product.sku,
          brand: 'Sstringz Pearls',
        }}
      />

      <div className="has-sticky grid md:grid-cols-12 gap-10">
        {/* LEFT: Media */}
        <div className="md:col-span-7">
          <MediaGallery images={galleryImages} videoUrl={product.videoUrl} />
          <div className="mt-3 text-xs text-gray-500">
            Images are for visual reference; actual hue may vary slightly.
          </div>
        </div>

        {/* RIGHT: Details */}
        <div className="md:col-span-5 space-y-5">
          <div className="text-xs text-gray-500">
            Catalogue &rsaquo; {product.type} &rsaquo; {product.shape}
          </div>

          <h1 className="text-3xl font-bold tracking-tight">{product.name}</h1>

          {/* Social proof */}
          <SocialProof
            rating={product.rating ?? 4.8}
            reviews={product.reviews ?? 1200}
            stock={product.stock ?? 3}
          />

          {product.tags?.length ? (
            <div className="flex gap-2 flex-wrap">
              {product.tags.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full border"
                >
                  <Tag className="h-3 w-3" /> {t}
                </span>
              ))}
            </div>
          ) : null}

          <p className="text-gray-700">{product.description}</p>

          {/* Pricing Card */}
          <div className="rounded-2xl border p-4 space-y-4 bg-white">
            <div className="flex items-end justify-between">
              <div>
                <div className="text-xs text-gray-500">MRP</div>
                <div className="text-lg line-through text-gray-400">
                  ₹
                  <span suppressHydrationWarning>
                    {formatINR(base * qty)}
                  </span>
                </div>
              </div>
              <QtyStepper value={qty} onChange={setQty} />
            </div>

            {/* Client-only CouponBox; server par render nahi hoga */}
            <CouponBox
              baseAmount={base}
              qty={qty}
              onChangeFinal={(r) =>
                setPriceState({ final: r.final, off: r.off, percent: r.percent })
              }
            />

            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-gray-500">
                  Coupon Discount {percentDisplay ? `(${percentDisplay}%)` : ''}
                </div>
                <div className="text-base text-green-600">
                  − ₹
                  <span suppressHydrationWarning>
                    {formatINR(offDisplay)}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-gray-500">Final Payable</div>
                <div className="text-2xl font-bold">
                  ₹
                  <span suppressHydrationWarning>
                    {formatINR(finalDisplay)}
                  </span>
                </div>
              </div>
            </div>

            {/* Desktop CTAs */}
            <div className="hidden md:flex flex-wrap gap-3">
              <button
                onClick={() => buyNowWithAmount(product, finalDisplay)}
                className="btn btn-primary"
              >
                Buy Now
              </button>

              <button
                onClick={() => {
                  saveFavorite(product.id);
                  setFav(true);
                }}
                className="btn"
              >
                {fav ? 'Saved' : 'Save'}
              </button>

              {mode === 'b2c' && <ShareButtons product={product} />}
              {mode === 'b2b' && (
                <button onClick={scrollToEnquiry} className="btn">
                  Enquire
                </button>
              )}
            </div>

            <div className="text-xs text-gray-500">
              {mode === 'b2c'
                ? 'FIRST5: 5% off for your first order. Share on WhatsApp—when your link converts, your next order gets 10% off automatically.'
                : 'Wholesale support: MOQ-based pricing and custom specs available.'}
            </div>

            {/* Trust badges under price card */}
            <TrustBar />
          </div>

          {/* Specs Accordion */}
          <SpecsAccordion product={product} />

          {/* Shipping / Returns & FAQs */}
          <div className="grid md:grid-cols-2 gap-5">
            <ShippingReturns />
            <FAQ />
          </div>

          {/* B2B Enquiry */}
          {mode === 'b2b' && (
            <div ref={enquiryRef} className="mt-4">
              <div className="text-sm text-gray-500 mb-2">
                Need wholesale pricing? Send us your requirements.
              </div>
              <EnquiryForm product={product} qty={qty} />
            </div>
          )}
        </div>

        {/* Related products row */}
        <div className="md:col-span-12">
          <RelatedProducts slug={product.slug} type={product.type} />
        </div>
      </div>

      {/* Sticky Mobile CTA (Enquire only if B2B) */}
      <StickyCTA
        finalAmount={finalDisplay}
        qty={qty}
        onQtyChange={setQty}
        onBuy={() => buyNowWithAmount(product, finalDisplay)}
        onEnquire={mode === 'b2b' ? scrollToEnquiry : undefined}
        showEnquire={mode === 'b2b'}
      />
    </>
  );
}
