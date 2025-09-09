import { Product } from '@/lib/types';

type Props = { product: Product };

export default function SpecsAccordion({ product }: Props) {
  // rows ko yahan define kar rahe hain — jo value milegi wahi show hogi
  const rows: Array<{ label: string; value?: string | number }> = [
    { label: 'SKU', value: product.sku },
    { label: 'Type', value: product.type },
    { label: 'Shape', value: product.shape },
    { label: 'Size (mm)', value: product.sizeMm ?? (product as any).size }, // backward compat
    { label: 'Color', value: product.color },
    { label: 'Luster', value: product.luster },
    { label: 'Surface Grade', value: product.surfaceGrade },
    { label: 'Nacre', value: product.nacreMm ? `${product.nacreMm} mm` : undefined },
    { label: 'Treatment', value: product.treatment },
    { label: 'Origin', value: product.origin },
    { label: 'Dimensions', value: product.dimensions },
    { label: 'Weight (g)', value: product.weightG },
    { label: 'Metal', value: product.metal },
    { label: 'Clasp', value: product.clasp },
    { label: 'Stock', value: product.stock },
    { label: 'Lead Time (days)', value: product.leadTimeDays },
  ].filter((r) => r.value !== undefined && r.value !== null && r.value !== '');

  if (!rows.length) return null;

  return (
    <div className="rounded-2xl border">
      <details open className="group p-4">
        <summary className="cursor-pointer select-none text-base font-semibold">
          Specifications
        </summary>

        <div className="mt-3 grid grid-cols-1 gap-y-2 sm:grid-cols-2">
          {rows.map((r) => (
            <div key={r.label} className="flex items-start justify-between gap-4 border-t p-3 sm:border-none">
              <div className="text-gray-500 text-sm">{r.label}</div>
              <div className="text-sm font-medium">{r.value}</div>
            </div>
          ))}
        </div>
      </details>
    </div>
  );
}
