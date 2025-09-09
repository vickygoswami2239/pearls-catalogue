'use client';
import { type FilterState, deriveFacets } from '@/lib/filter';
import { Product } from '@/lib/types';


export default function Filters({ value, onChange, products }: { value: FilterState, onChange: (f: FilterState)=>void, products: Product[] }) {
const facets = deriveFacets(products);
const set = (k: keyof FilterState, v: string|undefined) => onChange({ ...value, [k]: v });
return (
<div className="rounded-2xl border p-4 grid md:grid-cols-3 gap-4">
{(['color','type','size','origin','shape','metal'] as const).map(key => (
<div key={key} className="text-sm">
<label className="block font-medium capitalize mb-1">{key}</label>
<select value={value[key] || ''} onChange={e => set(key, e.target.value || undefined)} className="w-full border rounded-xl p-2">
<option value="">All</option>
{facets[key].map(v => <option key={v} value={v}>{v}</option>)}
</select>
</div>
))}
</div>
);
}
