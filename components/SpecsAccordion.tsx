import { Product } from '@/lib/types';
import { AccordionItem } from './Accordion';

export default function SpecsAccordion({ product }: { product: Product }) {
  const rows = [
    ['SKU', product.sku ?? '—'],
    ['Type', product.type],
    ['Shape', product.shape],
    ['Size (mm)', String(product.size)],
    ['Color', product.color],
    ['Origin', product.origin],
    ['Metal', product.metal],
  ];
  return (
    <div className="space-y-3">
      <AccordionItem title="Specifications" defaultOpen>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          {rows.map(([k, v]) => (
            <div key={k} className="flex items-center justify-between border-b py-2">
              <span className="text-gray-500">{k}</span>
              <span className="font-medium">{v}</span>
            </div>
          ))}
        </div>
      </AccordionItem>

      <AccordionItem title="Care & Warranty">
        <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
          <li>Soft cloth se clean karein; chemicals se door rakhein.</li>
          <li>Free re-stringing within 6 months (standard use).</li>
          <li>1-year manufacturing warranty on clasps & findings.</li>
        </ul>
      </AccordionItem>

      <AccordionItem title="Shipping & Returns">
        <p className="text-sm text-gray-700">
          Pan-India insured shipping 2–5 days. 7-day easy return (unused, tags intact).
        </p>
      </AccordionItem>
    </div>
  );
}
